import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Wrap the real sendMail in a spy, so we can see whether anything was sent
vi.mock("@/lib/email", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/email")>();
  return { ...actual, sendMail: vi.fn(actual.sendMail) };
});

const { sendMail, escapeHtml, safeSubject, renderMail } = await import("@/lib/email");
const { handleFormPost } = await import("@/lib/form-handler");
const { callbackMails, enquiryMails } = await import("@/lib/form-mail");
const { SlidingWindowRateLimiter } = await import("@/lib/rate-limit");
const { callbackRequestSchema, enquiryRequestSchema } = await import("@/lib/validation");
const { serverMessages } = await import("@/content/forms");

const human = { website: "", renderedAt: 1_000, submittedAt: 20_000 };
const validCallback = { name: "Jane Smith", phone: "07700 900123", preferredTime: "Morning", topic: "", consent: true, ...human };
const validEnquiry = {
  name: "Jane <b>Smith</b>",
  email: "jane@example.co.uk",
  phone: "",
  businessName: "",
  businessType: "Sole trader",
  annualTurnover: "",
  serviceNeeded: "bookkeeping",
  message: "Please help with my bookkeeping & VAT <script>alert(1)</script>",
  consent: true,
  ...human,
};

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/form", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const callbackOptions = () => ({
  schema: callbackRequestSchema,
  buildMails: callbackMails,
  messages: serverMessages,
  limiter: new SlidingWindowRateLimiter(5, 600_000),
});

beforeEach(() => {
  vi.mocked(sendMail).mockClear();
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  for (const key of ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "MAIL_TO"]) vi.stubEnv(key, "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("handleFormPost", () => {
  it("rejects an empty submission with 400 and a message for each field", async () => {
    const response = await handleFormPost(post({}), callbackOptions());
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(Object.keys(body.fieldErrors)).toEqual(expect.arrayContaining(["name", "phone", "preferredTime", "consent"]));
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON with 400", async () => {
    expect((await handleFormPost(post("{not json"), callbackOptions())).status).toBe(400);
  });

  it("rejects non-JSON requests with 415", async () => {
    expect((await handleFormPost(post(validCallback, { "content-type": "text/plain" }), callbackOptions())).status).toBe(415);
  });

  it("rejects oversized bodies with 413", async () => {
    expect((await handleFormPost(post({ ...validCallback, topic: "x".repeat(20_000) }), callbackOptions())).status).toBe(413);
  });

  it("quietly accepts but discards a filled honeypot", async () => {
    const response = await handleFormPost(post({ ...validCallback, website: "http://spam.example" }), callbackOptions());
    expect(response.status).toBe(200);
    expect((await response.json()).ok).toBe(true);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("quietly accepts but discards a form sent in under three seconds", async () => {
    const response = await handleFormPost(post({ ...validCallback, renderedAt: 1_000, submittedAt: 2_500 }), callbackOptions());
    expect(response.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("sends a valid submission (development preview when SMTP is not set)", async () => {
    const response = await handleFormPost(post(validCallback), callbackOptions());
    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(await vi.mocked(sendMail).mock.results[0].value).toBe("previewed");
  });

  it("rate limits: the sixth request in ten minutes gets 429 with Retry-After", async () => {
    const options = callbackOptions();
    const statuses: number[] = [];
    let last: Response | undefined;
    for (let i = 0; i < 6; i++) {
      last = await handleFormPost(post({}), options);
      statuses.push(last.status);
    }
    expect(statuses).toEqual([400, 400, 400, 400, 400, 429]);
    expect(Number(last?.headers.get("retry-after"))).toBeGreaterThan(0);
  });

  describe("in production", () => {
    beforeEach(() => vi.stubEnv("NODE_ENV", "production"));

    it("rejects a request from another origin with 403", async () => {
      const response = await handleFormPost(post(validCallback, { origin: "https://evil.example" }), callbackOptions());
      expect(response.status).toBe(403);
      expect(sendMail).not.toHaveBeenCalled();
    });

    it("rejects a request with no Origin header with 403", async () => {
      expect((await handleFormPost(post(validCallback), callbackOptions())).status).toBe(403);
    });

    it("returns 503 with a friendly message when SMTP is not configured", async () => {
      const response = await handleFormPost(post(validCallback, { origin: "https://www.halimenterpriseslimited.com" }), callbackOptions());
      const body = await response.json();
      expect(response.status).toBe(503);
      expect(body.error).toBe(serverMessages.unavailable);
    });

    it("never logs the submission when sending fails", async () => {
      const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
      await handleFormPost(post(validCallback, { origin: "https://www.halimenterpriseslimited.com" }), callbackOptions());
      const logged = JSON.stringify(errorLog.mock.calls);
      expect(logged).not.toContain("Jane");
      expect(logged).not.toContain("07700");
    });

    it("accepts extra origins from FORM_ALLOWED_ORIGINS", async () => {
      vi.stubEnv("FORM_ALLOWED_ORIGINS", "https://temp.example.com");
      const response = await handleFormPost(post(validCallback, { origin: "https://temp.example.com" }), callbackOptions());
      expect(response.status).toBe(503); // passed the origin check; stopped only because SMTP isn't set
    });

    it("accepts a Vercel preview deployment's own URL, but only on that preview", async () => {
      vi.stubEnv("VERCEL_URL", "halim-abc123.vercel.app");
      vi.stubEnv("VERCEL_ENV", "preview");
      const preview = await handleFormPost(post(validCallback, { origin: "https://halim-abc123.vercel.app" }), callbackOptions());
      expect(preview.status).toBe(503);
      vi.stubEnv("VERCEL_ENV", "production");
      const production = await handleFormPost(post(validCallback, { origin: "https://halim-abc123.vercel.app" }), callbackOptions());
      expect(production.status).toBe(403);
    });
  });
});

describe("emails", () => {
  const enquiry = enquiryRequestSchema(["bookkeeping"]).parse(validEnquiry);

  it("sends the enquiry to the inbox with reply-to set to the sender, plus an acknowledgement", () => {
    const [notification, acknowledgement] = enquiryMails(enquiry, "inbox@example.com");
    expect(notification.to).toBe("inbox@example.com");
    expect(notification.replyTo).toBe("jane@example.co.uk");
    expect(acknowledgement.to).toBe("jane@example.co.uk");
    // No reply-time promise until the client confirms one (site.responseTime is null)
    expect(acknowledgement.text).toContain("Your enquiry has been received, and we will reply to you by email.");
    expect(acknowledgement.text).not.toContain("working day");
    expect(acknowledgement.subject).toBe("Thank you for contacting Halim Enterprises Limited");
  });

  it("escapes user content in the HTML version", () => {
    const [notification] = enquiryMails(enquiry, "inbox@example.com");
    expect(notification.html).not.toContain("<script>");
    expect(notification.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(notification.html).toContain("Jane &lt;b&gt;Smith&lt;/b&gt;");
    expect(notification.html).toContain("bookkeeping &amp; VAT");
  });

  it("shows the service title, not its slug", () => {
    expect(enquiryMails(enquiry, "inbox@example.com")[0].text).toContain("Bookkeeping");
  });

  it("carries the statutory company details in every email", () => {
    for (const mail of [...enquiryMails(enquiry, "i@example.com"), ...callbackMails(callbackRequestSchema.parse(validCallback), "i@example.com")]) {
      expect(mail.text).toContain("company number 17491527");
    }
  });

  it("only notifies the inbox for a callback (no email address to acknowledge)", () => {
    const mails = callbackMails(callbackRequestSchema.parse(validCallback), "inbox@example.com");
    expect(mails).toHaveLength(1);
    expect(mails[0].subject).toBe("Callback request from Jane Smith");
  });

  it("guards against header injection in subjects", () => {
    expect(safeSubject("Hello\r\nBcc: victim@example.com")).toBe("Hello Bcc: victim@example.com");
    expect(safeSubject("x".repeat(500))).toHaveLength(150);
  });

  it("escapes all HTML special characters", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
    expect(renderMail({ heading: "<h1>", footer: "f" }).html).toContain("&lt;h1&gt;");
  });
});
