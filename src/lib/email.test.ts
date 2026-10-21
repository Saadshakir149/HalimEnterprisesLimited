import { afterEach, describe, expect, it, vi } from "vitest";
import { alignedFrom, mailConfig } from "@/lib/email";

describe("alignedFrom", () => {
  it("keeps MAIL_FROM when its address is the SMTP mailbox", () => {
    expect(alignedFrom("Halim Enterprises <info@halimenterpriseslimited.com>", "info@halimenterpriseslimited.com")).toBe(
      "Halim Enterprises <info@halimenterpriseslimited.com>",
    );
    expect(alignedFrom('"Halim Enterprises" <INFO@halimenterpriseslimited.com>', "info@halimenterpriseslimited.com")).toBe(
      '"Halim Enterprises" <INFO@halimenterpriseslimited.com>',
    );
    expect(alignedFrom("info@halimenterpriseslimited.com", "info@halimenterpriseslimited.com")).toBe("info@halimenterpriseslimited.com");
  });

  it("moves a different address onto the SMTP mailbox, keeping the display name (SPF/DKIM alignment)", () => {
    expect(alignedFrom("Halim Enterprises <hello@gmail.com>", "info@halimenterpriseslimited.com")).toBe("Halim Enterprises <info@halimenterpriseslimited.com>");
    expect(alignedFrom("someone@example.com", "info@halimenterpriseslimited.com")).toBe("info@halimenterpriseslimited.com");
  });
});

describe("mailConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const full = {
    SMTP_HOST: "smtp.hostinger.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "true",
    SMTP_USER: "info@halimenterpriseslimited.com",
    SMTP_PASS: "not-a-real-password",
    MAIL_FROM: "Halim Enterprises <info@halimenterpriseslimited.com>",
    MAIL_TO: "info@halimenterpriseslimited.com",
  };

  it("reads the Hostinger settings, with From aligned to the mailbox", () => {
    for (const [key, value] of Object.entries({ ...full, MAIL_FROM: "Halim Enterprises <other@example.com>" })) vi.stubEnv(key, value);
    expect(mailConfig()).toMatchObject({ host: "smtp.hostinger.com", port: 465, secure: true, from: "Halim Enterprises <info@halimenterpriseslimited.com>", to: full.MAIL_TO });
  });

  it("returns null when any required variable is missing", () => {
    for (const [key, value] of Object.entries({ ...full, SMTP_PASS: "" })) vi.stubEnv(key, value);
    expect(mailConfig()).toBeNull();
  });
});
