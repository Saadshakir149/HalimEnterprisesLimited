/*
 * Central business facts. Every page reads from here; never hard-code a fact
 * in a component.
 *
 * Source: CLAUDE.md sections 2 and 5. Keep the two in step.
 *
 * Conventions
 * - A value that is unknown is a Placeholder string ("PLACEHOLDER_...").
 *   Use isPlaceholder() before rendering, and never show one to visitors.
 * - A value that is known but not yet signed off is wrapped in Provisional<T>.
 * - A value that is deliberately absent (not to be shown) is null.
 */

export type Placeholder = `PLACEHOLDER_${string}`;

export type Provisional<T> = {
  readonly value: T;
  readonly provisional: true;
};

export type EmailAddress = `${string}@${string}`;

export type WhatsApp = {
  /** Human-readable, e.g. "+44 7700 900000" */
  readonly display: string;
  /** Digits only, international format without "+", for wa.me links */
  readonly waMe: string;
};

/** Accounting packages the client works in (Xero, QuickBooks, Sage confirmed at the start; FreeAgent confirmed 18 October 2026) */
export type SupportedSoftware = "Xero" | "QuickBooks" | "Sage" | "FreeAgent";

/** Receipt and document capture apps the client works with (confirmed 18 October 2026) */
export type SupportedTool = "Dext" | "Hubdoc";

export type BookingProvider = "calendly" | "microsoft-bookings";

/**
 * A review shown on the site.
 *
 * Every entry MUST be a genuine review, copied word for word from its source,
 * that the reviewer has agreed we can reproduce, and that the client has
 * approved. Never invent, edit, combine or paraphrase a review, and never add
 * a rating the reviewer did not give (CLAUDE.md section 4; misleading reviews
 * are unlawful under the DMCC Act 2024).
 */
export type Review = {
  /** As the reviewer wants to be named, e.g. "Amira K." */
  readonly author: string;
  /** The review text, exactly as written */
  readonly text: string;
  /** Only if the reviewer gave a star rating. Shown for that review alone, never averaged or totalled. */
  readonly rating?: 1 | 2 | 3 | 4 | 5;
  /** ISO date the review was posted, e.g. "2026-11-03" */
  readonly date: string;
  readonly source: "google";
  /** Recorded permission to reproduce this review on the website */
  readonly permission: true;
};

export function isPlaceholder(value: unknown): value is Placeholder {
  return typeof value === "string" && value.startsWith("PLACEHOLDER_");
}

function provisional<T>(value: T): Provisional<T> {
  return { value, provisional: true };
}

type Site = {
  /**
   * The public-facing name. Since 18 October 2026 this is the company's own
   * registered name (it was the provisional trading name "Halim Accountants").
   */
  readonly brandName: string;
  readonly legalName: string;
  readonly companyNumber: string;
  readonly registeredIn: string;
  readonly registeredOffice: readonly string[];
  /** ISO date */
  readonly incorporated: string;
  readonly director: string;
  /** Not VAT registered: never show a VAT number */
  readonly vatRegistered: boolean;
  readonly domain: Provisional<string>;
  readonly whatsapp: WhatsApp | Placeholder;
  readonly email: EmailAddress | Placeholder;
  /** Unconfirmed whether the WhatsApp number also takes calls; hidden while null */
  readonly phone: string | null;
  /**
   * Reply-time commitment shown to visitors. null until the client confirms one:
   * no page, form message or email promises a response time while it is null.
   */
  readonly responseTime: string | null;
  readonly icoNumber: string | Placeholder;
  /** AML supervision line. Hidden while it is a placeholder. */
  readonly amlSupervision: string | Placeholder;
  /** Accounting packages: used in sentences such as "Kept in Xero, QuickBooks, Sage or FreeAgent" */
  readonly software: readonly SupportedSoftware[];
  /** Capture apps: shown in the software strip alongside the packages, not in "kept in" sentences */
  readonly tools: readonly SupportedTool[];
  readonly consultationOffer: string;
  /** Director profile. Every field stays null until the client supplies it; never invent. */
  readonly directorProfile: {
    readonly role: string;
    readonly bio: readonly string[] | null;
    /** Only qualifications the client confirms in writing (CLAUDE.md section 4) */
    readonly qualifications: readonly string[] | null;
    readonly linkedIn: `https://${string}` | null;
    /** Path under /public/images once a real photo is supplied */
    readonly photo: string | null;
    /** The director's own words, shown as a pull quote */
    readonly quote: string | null;
  };
  /** Complaints procedure details, for the complaints page */
  readonly complaints: {
    readonly acknowledgeWithin: string | Placeholder;
    readonly respondWithin: string | Placeholder;
  };
  readonly legal: {
    /** While true, legal pages still marked as drafts are noindexed */
    readonly noindexDraftPages: boolean;
  };
  readonly policies: {
    readonly privacy: string;
    readonly cookies: string;
    readonly complaints: string;
    readonly terms: string;
  };
  /**
   * Online booking, used when features.booking is true. The url must be https
   * and on the provider's own domain (see src/lib/integrations.ts), or booking
   * stays off.
   */
  readonly booking: {
    readonly provider: BookingProvider | null;
    /** e.g. "https://calendly.com/halim-accountants/free-consultation" */
    readonly url: string | null;
  };
  /**
   * The client's secure document portal, used when features.documentUpload is
   * true. We never build upload or storage ourselves; we only link to it.
   */
  readonly documentPortal: { readonly name: string; readonly url: string } | null;
  /** Public Google Business Profile link, for "Read our reviews on Google" */
  readonly googleBusinessProfileUrl: string | null;
  /** Genuine, approved reviews only. Shown when features.reviews is true. */
  readonly reviews: readonly Review[];
};

/** The company's public record on Companies House, built from the verified company number */
export function companiesHouseUrl(): string {
  return `https://find-and-update.company-information.service.gov.uk/company/${site.companyNumber}`;
}

export const site: Site = {
  brandName: "Halim Enterprises Limited",
  legalName: "Halim Enterprises Limited",
  companyNumber: "17491527",
  registeredIn: "England and Wales",
  registeredOffice: ["Flat 41", "Shaftesbury Point", "High Street", "London", "E13 0AB"],
  incorporated: "2026-09-30",
  director: "Saad Haleem",
  vatRegistered: false,
  // Provisional and not purchased. Chosen under the old trading name: the client to confirm the domain for the new name.
  domain: provisional("halimaccountants.co.uk"),
  whatsapp: { display: "+44 7884 607135", waMe: "447884607135" },
  email: "PLACEHOLDER_EMAIL",
  phone: null,
  // Not confirmed by the client (18 October 2026: removed from the site until it is)
  responseTime: null,
  icoNumber: "PLACEHOLDER_ICO",
  amlSupervision: "PLACEHOLDER_AML",
  software: ["Xero", "QuickBooks", "Sage", "FreeAgent"],
  tools: ["Dext", "Hubdoc"],
  consultationOffer: "free initial consultation by phone or video",
  directorProfile: {
    role: "Director",
    bio: null,
    qualifications: null,
    linkedIn: null,
    photo: null,
    quote: null,
  },
  complaints: {
    acknowledgeWithin: "PLACEHOLDER_COMPLAINT_ACKNOWLEDGEMENT_TIME",
    respondWithin: "PLACEHOLDER_COMPLAINT_RESPONSE_TIME",
  },
  legal: {
    noindexDraftPages: true,
  },
  policies: {
    privacy: "/privacy-policy",
    cookies: "/cookie-policy",
    complaints: "/complaints",
    terms: "/terms",
  },
  // Not chosen yet (Calendly recommended). Hidden until provider and url are set and features.booking is true.
  booking: { provider: null, url: null },
  // Not chosen yet. /send-documents says a secure link follows the consultation.
  documentPortal: null,
  // Profile reportedly exists; link not supplied yet
  googleBusinessProfileUrl: null,
  // No reviews yet. Add only genuine reviews the reviewer and client have approved.
  reviews: [],
};

/**
 * The statutory company disclosure, used in the footer and in every business
 * email (UK companies must show their name, number and registered office).
 */
export function legalStatement(): string {
  return (
    `${site.legalName} is registered in ${site.registeredIn}, company number ${site.companyNumber}. ` +
    `Registered office: ${site.registeredOffice.join(", ")}.`
  );
}

/**
 * The confirmed public address of the site, from NEXT_PUBLIC_SITE_URL (e.g.
 * "https://www.example.co.uk"). null until the production domain is set.
 * Canonical links, og:url, the sitemap, absolute URLs in structured data and
 * the address in emails are produced only from this, so the site never points
 * search engines at a provisional domain or localhost.
 */
export const canonicalSiteUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "") : null;

/**
 * The site's own origin for internal checks (the form origin check and the
 * booking embed's parent domain): the confirmed URL, or the provisional
 * domain until one is set. Never used for anything shown to search engines.
 */
export const siteUrl = canonicalSiteUrl ?? `https://${site.domain.value}`;

/*
 * Switch an integration on only once its details above are filled in. An
 * integration whose details are missing or invalid stays hidden even when its
 * flag is true (with a warning in development).
 */
export const features = {
  callback: true,
  booking: false,
  documentUpload: false,
  reviews: false,
} as const satisfies Record<string, boolean>;
