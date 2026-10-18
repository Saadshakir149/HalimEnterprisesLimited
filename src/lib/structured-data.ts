import type { QuestionAnswer } from "@/content/faqs";
import { confirmedServices } from "@/content/services";
import { canonicalSiteUrl, companiesHouseUrl, site } from "@/content/site";

export type Crumb = { name: string; href: string };

/**
 * schema.org BreadcrumbList. It needs absolute URLs, so it is left out (null)
 * until the production domain is confirmed.
 */
export function breadcrumbList(crumbs: readonly Crumb[]) {
  if (!canonicalSiteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${canonicalSiteUrl}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };
}

/** schema.org FAQPage. Only use it where the same questions are visible on the page. */
export function faqPage(faqs: readonly QuestionAnswer[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
    })),
  };
}

/**
 * schema.org Organization for the homepage, from verified facts only: no
 * address (the registered office is not a place to visit), no ratings, no
 * credentials. Organization rather than a LocalBusiness type, which would
 * expect premises and opening hours the company does not have.
 */
export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    legalName: site.legalName,
    ...(canonicalSiteUrl && { url: canonicalSiteUrl }),
    description: `${site.brandName} provides bookkeeping, VAT returns and accounting services for small businesses and individuals across the UK.`,
    foundingDate: site.incorporated,
    identifier: { "@type": "PropertyValue", propertyID: "Companies House company number", value: site.companyNumber },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    knowsAbout: confirmedServices.map((service) => service.title),
    sameAs: [companiesHouseUrl()],
  };
}
