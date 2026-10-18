import { describe, expect, it } from "vitest";
import type { Review } from "@/content/site";
import { checkHttpsUrl, resolveBooking, resolveDocumentPortal, resolveGoogleProfile, resolveReviews } from "@/lib/integrations";

const domain = "halimaccountants.co.uk";
const calendly = "https://calendly.com/halim-test/free-consultation";

describe("checkHttpsUrl", () => {
  it.each([
    ["missing", null],
    ["empty", "   "],
    ["placeholder", "PLACEHOLDER_BOOKING_URL"],
    ["not a URL", "calendly.com/halim"],
    ["http", "http://calendly.com/halim"],
    ["javascript:", "javascript:alert(1)"],
    ["data:", "data:text/html,<script>alert(1)</script>"],
    ["credentials", "https://user:pass@calendly.com/halim"],
    ["custom port", "https://calendly.com:8443/halim"],
    ["no public domain", "https://localhost/halim"],
  ])("rejects %s", (_label, raw) => {
    expect(checkHttpsUrl(raw).ok).toBe(false);
  });

  it("accepts a plain https URL", () => {
    expect(checkHttpsUrl("https://example.co.uk/upload").ok).toBe(true);
  });

  it.each([
    "https://calendly.com.evil.example/halim",
    "https://evilcalendly.com/halim",
    "https://sub.calendly.com.attacker.io/x",
    "https://calendly.co/halim",
  ])("rejects look-alike host %s", (raw) => {
    expect(checkHttpsUrl(raw, ["calendly.com"]).ok).toBe(false);
  });

  it("matches hosts case-insensitively", () => {
    expect(checkHttpsUrl("https://CALENDLY.com/halim", ["calendly.com"]).ok).toBe(true);
  });
});

describe("resolveBooking", () => {
  it("is off while the flag is off, whatever the config", () => {
    expect(resolveBooking(false, { provider: "calendly", url: calendly }, domain)).toEqual({ value: null, issue: null });
  });

  it("is off, with a reason, when the flag is on but details are missing", () => {
    const result = resolveBooking(true, { provider: null, url: null }, domain);
    expect(result.value).toBeNull();
    expect(result.issue).toMatch(/provider is not set/);
  });

  it("accepts a Calendly event URL and builds an inline embed URL", () => {
    const { value, issue } = resolveBooking(true, { provider: "calendly", url: calendly }, domain);
    expect(issue).toBeNull();
    expect(value?.providerName).toBe("Calendly");
    expect(value?.url).toBe(calendly);
    const embed = new URL(value!.embedUrl);
    expect(embed.hostname).toBe("calendly.com");
    expect(embed.searchParams.get("embed_domain")).toBe(domain);
    expect(embed.searchParams.get("embed_type")).toBe("Inline");
  });

  it.each([
    "https://outlook.office.com/book/HalimAccountants@halim.onmicrosoft.com/",
    "https://outlook.office365.com/owa/calendar/HalimAccountants@halim.onmicrosoft.com/bookings/",
    "https://bookings.cloud.microsoft/book/HalimAccountants@halim.onmicrosoft.com/",
  ])("accepts a Microsoft Bookings page %s", (url) => {
    const { value } = resolveBooking(true, { provider: "microsoft-bookings", url }, domain);
    expect(value?.providerName).toBe("Microsoft Bookings");
    expect(value?.embedUrl).toBe(url);
  });

  it.each([
    ["the wrong provider's domain", "calendly" as const, "https://outlook.office.com/book/x@y.com/"],
    ["a Calendly URL for Microsoft Bookings", "microsoft-bookings" as const, calendly],
    ["http", "calendly" as const, "http://calendly.com/halim-test/free-consultation"],
    ["the provider home page", "calendly" as const, "https://calendly.com/"],
    ["a look-alike domain", "calendly" as const, "https://calendly.com.evil.example/halim"],
    ["javascript:", "calendly" as const, "javascript:alert(document.cookie)"],
  ])("rejects %s", (_label, provider, url) => {
    const result = resolveBooking(true, { provider, url }, domain);
    expect(result.value).toBeNull();
    expect(result.issue).toBeTruthy();
  });
});

describe("resolveDocumentPortal", () => {
  const portal = { name: "Example Portal", url: "https://portal.example.co.uk/halim" };

  it("is off while the flag is off", () => {
    expect(resolveDocumentPortal(false, portal).value).toBeNull();
  });

  it("accepts a named https portal", () => {
    expect(resolveDocumentPortal(true, portal).value).toEqual({ name: "Example Portal", url: "https://portal.example.co.uk/halim" });
  });

  it.each([
    ["no portal", null],
    ["no name", { name: " ", url: portal.url }],
    ["placeholder name", { name: "PLACEHOLDER_PORTAL", url: portal.url }],
    ["http", { name: "Portal", url: "http://portal.example.co.uk" }],
    ["mailto", { name: "Portal", url: "mailto:documents@example.co.uk" }],
  ])("rejects %s", (_label, config) => {
    const result = resolveDocumentPortal(true, config);
    expect(result.value).toBeNull();
    expect(result.issue).toBeTruthy();
  });
});

describe("resolveGoogleProfile", () => {
  it("is hidden, without a warning, while unset", () => {
    expect(resolveGoogleProfile(null)).toEqual({ value: null, issue: null });
  });

  it.each(["https://g.page/r/abc123/review", "https://maps.app.goo.gl/abc123", "https://www.google.com/maps/place/Halim"])("accepts %s", (url) => {
    expect(resolveGoogleProfile(url).value).toBe(url);
  });

  it.each(["https://google.com.evil.example/maps", "http://g.page/r/abc", "https://trustpilot.com/review/halim"])("rejects %s", (url) => {
    expect(resolveGoogleProfile(url).value).toBeNull();
  });
});

describe("resolveReviews", () => {
  const review: Review = { author: "A. Tester", text: "Test review text.", date: "2026-11-03", source: "google", permission: true };

  it("shows nothing while the flag is off, even with reviews", () => {
    expect(resolveReviews(false, [review]).value).toEqual([]);
  });

  it("shows nothing, with a warning, when the flag is on but the list is empty", () => {
    const result = resolveReviews(true, []);
    expect(result.value).toEqual([]);
    expect(result.issue).toBeTruthy();
  });

  it("shows approved reviews, with or without a rating", () => {
    expect(resolveReviews(true, [review, { ...review, author: "B", rating: 5 }]).value).toHaveLength(2);
  });

  it.each([
    ["no permission", { ...review, permission: false }],
    ["permission as a string", { ...review, permission: "true" }],
    ["no author", { ...review, author: "" }],
    ["no text", { ...review, text: "  " }],
    ["a bad date", { ...review, date: "last week" }],
    ["a rating out of range", { ...review, rating: 6 }],
    ["a fractional rating", { ...review, rating: 4.5 }],
    ["another source", { ...review, source: "trustpilot" }],
  ])("drops a review with %s", (_label, bad) => {
    const result = resolveReviews(true, [bad as unknown as Review]);
    expect(result.value).toEqual([]);
  });

  it("keeps good reviews and reports dropped ones", () => {
    const result = resolveReviews(true, [review, { ...review, permission: false } as unknown as Review]);
    expect(result.value).toHaveLength(1);
    expect(result.issue).toMatch(/1 review\(s\) dropped/);
  });
});
