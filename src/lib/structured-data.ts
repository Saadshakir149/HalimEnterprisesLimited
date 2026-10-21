import type { QuestionAnswer } from "@/content/faqs";
import { confirmedServices } from "@/content/services";
import { companiesHouseUrl, isPlaceholder, site, siteUrl } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

export type Crumb = { name: string; href: string };

/** schema.org BreadcrumbList, with absolute URLs on the production address */
export function breadcrumbList(crumbs: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.href === "/" ? "" : crumb.href}`,
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
 * Contact points from confirmed values only: the business email and WhatsApp.
 * No telephone, because it is unconfirmed whether the WhatsApp number takes calls.
 */
function contactPoints() {
  const email = isPlaceholder(site.email) ? null : site.email;
  const whatsapp = whatsappHref();
  return [
    ...(email ? [{ "@type": "ContactPoint", contactType: "customer service", email, areaServed: "GB", availableLanguage: "English" }] : []),
    ...(whatsapp ? [{ "@type": "ContactPoint", contactType: "customer service", name: "WhatsApp", url: whatsapp, areaServed: "GB", availableLanguage: "English" }] : []),
  ];
}

/**
 * schema.org Organization for the homepage, from verified facts only: no
 * address (the registered office is not a place to visit), no ratings, no
 * credentials. Organization rather than a LocalBusiness type, which would
 * expect premises and opening hours the company does not have.
 */
export function organization() {
  const contactPoint = contactPoints();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    legalName: site.legalName,
    url: siteUrl,
    description: `${site.brandName} provides bookkeeping, VAT returns and accounting services for small businesses and individuals across the UK.`,
    foundingDate: site.incorporated,
    identifier: { "@type": "PropertyValue", propertyID: "Companies House company number", value: site.companyNumber },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    knowsAbout: confirmedServices.map((service) => service.title),
    ...(isPlaceholder(site.email) ? {} : { email: site.email }),
    ...(contactPoint.length > 0 && { contactPoint }),
    sameAs: [companiesHouseUrl()],
  };
}
