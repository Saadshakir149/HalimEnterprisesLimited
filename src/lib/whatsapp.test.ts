import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, whatsappHref, whatsappMessage } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link with a URL-encoded message", () => {
    expect(buildWhatsAppUrl("447884607135", "Hello, I’d like to ask about Bookkeeping.")).toBe(
      "https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Bookkeeping.",
    );
  });

  it("encodes characters that would break the query string", () => {
    const url = new URL(buildWhatsAppUrl("447884607135", "VAT & payroll? 50% #1 + more")!);
    expect(url.searchParams.get("text")).toBe("VAT & payroll? 50% #1 + more");
    expect(url.hash).toBe("");
  });

  it("leaves out an empty message", () => {
    expect(buildWhatsAppUrl("447884607135", "  ")).toBe("https://wa.me/447884607135");
  });

  it.each(["+447884607135", "07884607135", "44 7884 607135", "4478846071x5", "", "12345"])("rejects the number %s", (number) => {
    expect(buildWhatsAppUrl(number, "Hello")).toBeNull();
  });
});

describe("whatsappHref", () => {
  it("uses the site number with the general message by default", () => {
    const url = new URL(whatsappHref()!);
    expect(url.origin + url.pathname).toBe("https://wa.me/447884607135");
    expect(url.searchParams.get("text")).toBe(whatsappMessage("general"));
  });

  it("fills a topic into the message", () => {
    const url = new URL(whatsappHref({ topic: "Bookkeeping" })!);
    expect(url.searchParams.get("text")).toBe("Hello, I’d like to ask about Bookkeeping.");
  });

  it("has a message for each fixed context", () => {
    for (const context of ["general", "consultation", "documents"] as const) {
      expect(whatsappMessage(context)).toMatch(/^Hello, /);
    }
  });
});
