import type { IconName } from "@/components/ui/Icon";
import { confirmedAudiences } from "@/content/audiences";
import { confirmedServices } from "@/content/services";
import { features, site } from "@/content/site";

export type NavLink = {
  readonly href: string;
  readonly label: string;
};

export type NavEntry = NavLink & {
  readonly tagline: string;
  readonly icon: IconName;
};

/** Confirmed services only, with the priority services first. */
export const serviceNav: readonly NavEntry[] = [...confirmedServices]
  .sort((a, b) => Number(Boolean(b.priority)) - Number(Boolean(a.priority)))
  .map((s) => ({ href: `/services/${s.slug}`, label: s.title, tagline: s.tagline, icon: s.icon }));

export const audienceNav: readonly NavEntry[] = confirmedAudiences.map((a) => ({
  href: `/who-we-help/${a.slug}`,
  label: a.title,
  tagline: a.tagline,
  icon: a.icon,
}));

export const routes = {
  home: "/",
  services: "/services",
  audiences: "/who-we-help",
  about: "/about",
  contact: "/contact",
  consultation: "/book-consultation",
  faqs: "/faqs",
  /** For clients; noindexed and not in the main navigation */
  documents: "/send-documents",
} as const;

/*
 * Consultation labels follow what the page really offers: while online booking
 * is off (features.booking), visitors request a consultation through the
 * callback form, so nothing says "Book" until a booking tool is switched on.
 */
export const consultationLabel = features.booking ? "Book a free consultation" : "Request a free consultation";
const consultationShort = features.booking ? "Book a consultation" : "Free consultation";

export const consultationCta: NavLink = {
  href: routes.consultation,
  label: consultationLabel,
};

export const companyLinks: readonly NavLink[] = [
  { href: routes.about, label: "About" },
  { href: routes.contact, label: "Contact" },
  { href: routes.consultation, label: consultationShort },
  { href: routes.faqs, label: "FAQs" },
];

export const legalLinks: readonly NavLink[] = [
  { href: site.policies.privacy, label: "Privacy policy" },
  { href: site.policies.cookies, label: "Cookie policy" },
  { href: site.policies.complaints, label: "Complaints" },
  { href: site.policies.terms, label: "Terms of use" },
];
