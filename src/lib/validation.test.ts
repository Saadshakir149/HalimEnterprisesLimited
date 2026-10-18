import { describe, expect, it } from "vitest";
import {
  callbackRequestSchema,
  callbackSchema,
  enquiryRequestSchema,
  enquirySchema,
  looksLikeBot,
  MIN_FILL_TIME_MS,
  NOT_SURE,
} from "@/lib/validation";

const slugs = ["bookkeeping", "vat-returns", "payroll"];
const enquiry = enquirySchema(slugs);

const validEnquiry = {
  name: "Jane Smith",
  email: "jane@example.co.uk",
  phone: "07700 900123",
  businessName: "Smith Plumbing",
  businessType: "Sole trader",
  annualTurnover: "£50k–£90k",
  serviceNeeded: "bookkeeping",
  message: "I need help keeping my books up to date each month.",
  consent: true,
};

const validCallback = {
  name: "Jane Smith",
  phone: "+44 7700 900123",
  preferredTime: "Morning",
  topic: "VAT registration",
  consent: true,
};

/** The first error message for a field, or undefined if it passed */
function messageFor(result: ReturnType<typeof enquiry.safeParse> | ReturnType<typeof callbackSchema.safeParse>, field: string) {
  return result.success ? undefined : result.error.issues.find((issue) => issue.path[0] === field)?.message;
}

describe("enquiry schema", () => {
  it("accepts a complete, valid enquiry", () => {
    expect(enquiry.safeParse(validEnquiry).success).toBe(true);
  });

  it("accepts the minimum: optional fields left empty", () => {
    const result = enquiry.safeParse({ ...validEnquiry, phone: "", businessName: "", annualTurnover: "" });
    expect(result.success).toBe(true);
  });

  it("fills in missing optional fields as empty strings", () => {
    const required = Object.fromEntries(
      Object.entries(validEnquiry).filter(([key]) => !["phone", "businessName", "annualTurnover"].includes(key)),
    );
    const result = enquiry.safeParse(required);
    expect(result.success && [result.data.phone, result.data.businessName, result.data.annualTurnover]).toEqual(["", "", ""]);
  });

  it("trims whitespace from text fields", () => {
    const result = enquiry.safeParse({ ...validEnquiry, name: "  Jane Smith  ", email: "  jane@example.co.uk " });
    expect(result.success && [result.data.name, result.data.email]).toEqual(["Jane Smith", "jane@example.co.uk"]);
  });

  it("rejects an empty submission with a clear message for every required field", () => {
    const result = enquiry.safeParse({});
    expect(result.success).toBe(false);
    for (const field of ["name", "email", "businessType", "serviceNeeded", "message", "consent"]) {
      expect(messageFor(result, field), field).toBeTruthy();
    }
  });

  it("treats whitespace-only names as missing", () => {
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, name: "   " }), "name")).toBe("Enter your name");
  });

  it("rejects an invalid email address", () => {
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, email: "jane@" }), "email")).toMatch(/correct format/);
  });

  it.each(["07700 900123", "+44 7700 900123", "(020) 7946 0000", "02079460000", "+44 (0)20 7946 0000"])("accepts the phone number %s", (phone) => {
    expect(enquiry.safeParse({ ...validEnquiry, phone }).success).toBe(true);
  });

  it.each(["0770", "call me", "07700-900-123-456-789", "07700 9001ab"])("rejects the phone number %s with a helpful message", (phone) => {
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, phone }), "phone")).toMatch(/Enter a phone number, like/);
  });

  it("requires a message of at least 20 characters", () => {
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, message: "x".repeat(19) }), "message")).toMatch(/at least 20/);
    expect(enquiry.safeParse({ ...validEnquiry, message: "x".repeat(20) }).success).toBe(true);
  });

  it("counts the message length after trimming", () => {
    expect(enquiry.safeParse({ ...validEnquiry, message: `   ${"x".repeat(19)}   ` }).success).toBe(false);
  });

  it("caps the message at 2,000 characters", () => {
    expect(enquiry.safeParse({ ...validEnquiry, message: "x".repeat(2000) }).success).toBe(true);
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, message: "x".repeat(2001) }), "message")).toMatch(/2,000/);
  });

  it.each([
    ["name", 101],
    ["businessName", 121],
  ])("enforces a maximum length on %s", (field, length) => {
    expect(enquiry.safeParse({ ...validEnquiry, [field]: "x".repeat(length) }).success).toBe(false);
  });

  it("only accepts the listed business types", () => {
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, businessType: "Charity" }), "businessType")).toBeTruthy();
  });

  it("only accepts the listed turnover bands, or none", () => {
    expect(enquiry.safeParse({ ...validEnquiry, annualTurnover: "About £1" }).success).toBe(false);
  });

  it("only accepts confirmed services, or 'Not sure yet'", () => {
    expect(enquiry.safeParse({ ...validEnquiry, serviceNeeded: NOT_SURE }).success).toBe(true);
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, serviceNeeded: "self-assessment" }), "serviceNeeded")).toMatch(/Choose the service/);
  });

  it("requires the privacy policy to be acknowledged", () => {
    expect(messageFor(enquiry.safeParse({ ...validEnquiry, consent: false }), "consent")).toMatch(/privacy policy/);
  });

  it("drops fields it does not know about, such as anything sensitive", () => {
    const result = enquiry.safeParse({ ...validEnquiry, utr: "1234567890", bankAccount: "12345678" });
    expect(result.success && Object.keys(result.data)).not.toContain("utr");
    expect(result.success && Object.keys(result.data)).not.toContain("bankAccount");
  });
});

describe("callback schema", () => {
  it("accepts a valid callback request", () => {
    expect(callbackSchema.safeParse(validCallback).success).toBe(true);
  });

  it("accepts a request without a topic", () => {
    expect(callbackSchema.safeParse({ ...validCallback, topic: "" }).success).toBe(true);
  });

  it("requires a name, phone number, preferred time and consent", () => {
    const result = callbackSchema.safeParse({});
    for (const field of ["name", "phone", "preferredTime", "consent"]) {
      expect(messageFor(result, field), field).toBeTruthy();
    }
    expect(messageFor(result, "phone")).toBe("Enter your phone number");
  });

  it("rejects an invalid phone number", () => {
    expect(messageFor(callbackSchema.safeParse({ ...validCallback, phone: "12345" }), "phone")).toMatch(/Enter a phone number, like/);
  });

  it("only accepts Morning, Afternoon or Any time", () => {
    expect(callbackSchema.safeParse({ ...validCallback, preferredTime: "Midnight" }).success).toBe(false);
  });

  it("caps the topic at 200 characters", () => {
    expect(callbackSchema.safeParse({ ...validCallback, topic: "x".repeat(201) }).success).toBe(false);
  });
});

describe("request schemas (form fields plus bot screening)", () => {
  const timing = { website: "", renderedAt: 1_000, submittedAt: 9_000 };

  it("require the timing fields that only a real browser sends", () => {
    expect(enquiryRequestSchema(slugs).safeParse(validEnquiry).success).toBe(false);
    expect(enquiryRequestSchema(slugs).safeParse({ ...validEnquiry, ...timing }).success).toBe(true);
    expect(callbackRequestSchema.safeParse({ ...validCallback, ...timing }).success).toBe(true);
  });

  it("still accept a filled honeypot, so the server can quietly discard it", () => {
    expect(callbackRequestSchema.safeParse({ ...validCallback, ...timing, website: "http://spam.example" }).success).toBe(true);
  });
});

describe("looksLikeBot", () => {
  it("passes a person who took their time", () => {
    expect(looksLikeBot({ website: "", renderedAt: 0, submittedAt: MIN_FILL_TIME_MS + 5_000 })).toBe(false);
  });

  it("flags a filled honeypot", () => {
    expect(looksLikeBot({ website: "http://spam.example", renderedAt: 0, submittedAt: 60_000 })).toBe(true);
  });

  it("ignores a honeypot that only contains spaces", () => {
    expect(looksLikeBot({ website: "   ", renderedAt: 0, submittedAt: 60_000 })).toBe(false);
  });

  it("flags a form sent in under three seconds", () => {
    expect(looksLikeBot({ renderedAt: 10_000, submittedAt: 10_000 + MIN_FILL_TIME_MS - 1 })).toBe(true);
    expect(looksLikeBot({ renderedAt: 10_000, submittedAt: 10_000 + MIN_FILL_TIME_MS })).toBe(false);
  });

  it("flags timestamps that go backwards", () => {
    expect(looksLikeBot({ renderedAt: 50_000, submittedAt: 10_000 })).toBe(true);
  });
});
