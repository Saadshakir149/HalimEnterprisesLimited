import { features, isPlaceholder, site, siteUrl, type BookingProvider, type Review } from "@/content/site";
import { isDev } from "@/lib/env";

/*
 * Validation for the third-party integrations configured in site.ts.
 *
 * Every integration is off unless its feature flag is on AND its details are
 * valid. Anything invalid is treated as switched off, so a typo can never put
 * a broken or unsafe link on the site; in development the reason is logged and
 * shown as a dev-only chip instead.
 *
 * The resolve* functions are pure (they take the config as arguments) so they
 * can be unit-tested; the get* functions apply them to site.ts.
 */

type Checked = { ok: true; url: URL } | { ok: false; reason: string };

/**
 * Accepts only an absolute https URL with no credentials or custom port, and,
 * when hosts are given, a hostname in that list (exact match, so
 * "calendly.com.evil.example" and "evilcalendly.com" are both rejected).
 */
export function checkHttpsUrl(raw: string | null | undefined, hosts?: readonly string[]): Checked {
  if (!raw || raw.trim() === "") return { ok: false, reason: "no URL set" };
  if (isPlaceholder(raw)) return { ok: false, reason: "URL is still a placeholder" };
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return { ok: false, reason: `"${raw}" is not a valid URL` };
  }
  if (url.protocol !== "https:") return { ok: false, reason: `URL must use https (got ${url.protocol})` };
  if (url.username || url.password) return { ok: false, reason: "URL must not contain a username or password" };
  if (url.port) return { ok: false, reason: "URL must not set a port" };
  if (!url.hostname.includes(".")) return { ok: false, reason: `"${url.hostname}" is not a public domain` };
  if (hosts && !hosts.includes(url.hostname.toLowerCase())) {
    return { ok: false, reason: `${url.hostname} is not an expected domain (${hosts.join(", ")})` };
  }
  return { ok: true, url };
}

/* ---------- Booking ---------- */

export const bookingProviders: Record<BookingProvider, { name: string; hosts: readonly string[] }> = {
  calendly: { name: "Calendly", hosts: ["calendly.com"] },
  /* Public Bookings pages: outlook.office.com/book/… and outlook.office365.com/owa/calendar/…/bookings/ (older).
     Both now redirect to bookings.cloud.microsoft, so links on that host are accepted too. */
  "microsoft-bookings": { name: "Microsoft Bookings", hosts: ["outlook.office.com", "outlook.office365.com", "bookings.cloud.microsoft"] },
};

export type Booking = {
  provider: BookingProvider;
  providerName: string;
  /** Opened in a new tab by the "Choose a time" button */
  url: string;
  /** Loaded in an iframe only after the visitor asks for it */
  embedUrl: string;
};

type Resolved<T> = { value: T | null; issue: string | null };

export function resolveBooking(
  enabled: boolean,
  config: { provider: BookingProvider | null; url: string | null },
  embedDomain: string,
): Resolved<Booking> {
  if (!enabled) return { value: null, issue: null };
  if (!config.provider || !(config.provider in bookingProviders)) {
    return { value: null, issue: "features.booking is on but site.booking.provider is not set" };
  }
  const provider = bookingProviders[config.provider];
  const checked = checkHttpsUrl(config.url, provider.hosts);
  if (!checked.ok) return { value: null, issue: `site.booking.url rejected: ${checked.reason}` };
  if (checked.url.pathname.replace(/\/+$/, "") === "") {
    return { value: null, issue: "site.booking.url must point at a booking page, not the provider's home page" };
  }

  const embed = new URL(checked.url);
  if (config.provider === "calendly") {
    // The parameters Calendly's own inline widget adds; no Calendly script is needed for a plain iframe
    embed.searchParams.set("embed_domain", embedDomain);
    embed.searchParams.set("embed_type", "Inline");
  }
  return {
    value: { provider: config.provider, providerName: provider.name, url: checked.url.href, embedUrl: embed.href },
    issue: null,
  };
}

/* ---------- Document portal ---------- */

export type DocumentPortal = { name: string; url: string };

/** Any https host is allowed: the client may choose any reputable portal. */
export function resolveDocumentPortal(enabled: boolean, portal: { name: string; url: string } | null): Resolved<DocumentPortal> {
  if (!enabled) return { value: null, issue: null };
  if (!portal) return { value: null, issue: "features.documentUpload is on but site.documentPortal is not set" };
  if (portal.name.trim() === "" || isPlaceholder(portal.name)) return { value: null, issue: "site.documentPortal.name is missing" };
  const checked = checkHttpsUrl(portal.url);
  if (!checked.ok) return { value: null, issue: `site.documentPortal.url rejected: ${checked.reason}` };
  return { value: { name: portal.name.trim(), url: checked.url.href }, issue: null };
}

/* ---------- Reviews ---------- */

/** Where a Google Business Profile link can legitimately point */
export const googleProfileHosts = [
  "g.page",
  "maps.app.goo.gl",
  "www.google.com",
  "google.com",
  "www.google.co.uk",
  "google.co.uk",
  "maps.google.com",
  "search.google.com",
] as const;

export function resolveGoogleProfile(url: string | null): Resolved<string> {
  if (url === null) return { value: null, issue: null };
  const checked = checkHttpsUrl(url, googleProfileHosts);
  return checked.ok ? { value: checked.url.href, issue: null } : { value: null, issue: `site.googleBusinessProfileUrl rejected: ${checked.reason}` };
}

function isValidReview(review: Review): boolean {
  return (
    // permission is typed as `true`, but check at runtime too: this gate must never be bypassed
    (review.permission as unknown) === true &&
    review.source === "google" &&
    review.author.trim() !== "" &&
    review.text.trim() !== "" &&
    /^\d{4}-\d{2}-\d{2}$/.test(review.date) &&
    !Number.isNaN(Date.parse(review.date)) &&
    (review.rating === undefined || (Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5))
  );
}

/** Reviews to show: none unless the flag is on, and only complete entries with permission. */
export function resolveReviews(enabled: boolean, reviews: readonly Review[]): { value: Review[]; issue: string | null } {
  if (!enabled) return { value: [], issue: null };
  const valid = reviews.filter(isValidReview);
  const dropped = reviews.length - valid.length;
  if (valid.length === 0) return { value: [], issue: "features.reviews is on but there are no complete, approved reviews in site.reviews" };
  return { value: valid, issue: dropped > 0 ? `${dropped} review(s) dropped: missing permission or incomplete` : null };
}

/* ---------- Applied to site.ts ---------- */

const warned = new Set<string>();
/** Logs each problem once per server process, in development only. Never logs in production. */
function warn(issue: string | null): void {
  if (!isDev || !issue || warned.has(issue)) return;
  warned.add(issue);
  console.warn(`[integrations] ${issue}`);
}

function applied<T>(result: Resolved<T>): T | null {
  warn(result.issue);
  return result.value;
}

export function getBooking(): Booking | null {
  return applied(resolveBooking(features.booking, site.booking, new URL(siteUrl).hostname));
}

export function getDocumentPortal(): DocumentPortal | null {
  return applied(resolveDocumentPortal(features.documentUpload, site.documentPortal));
}

export function getGoogleProfileUrl(): string | null {
  return applied(resolveGoogleProfile(site.googleBusinessProfileUrl));
}

export function getReviews(): Review[] {
  const result = resolveReviews(features.reviews, site.reviews);
  warn(result.issue);
  return result.value;
}

/** Problems to show as dev-only chips beside the integration */
export const integrationIssues = {
  booking: () => resolveBooking(features.booking, site.booking, new URL(siteUrl).hostname).issue,
  documentPortal: () => resolveDocumentPortal(features.documentUpload, site.documentPortal).issue,
  googleProfile: () => resolveGoogleProfile(site.googleBusinessProfileUrl).issue,
  reviews: () => resolveReviews(features.reviews, site.reviews).issue,
};
