import type { MetadataRoute } from "next";
import { legalDocuments } from "@/content/legal";
import { routes } from "@/content/navigation";
import { confirmedAudiences } from "@/content/audiences";
import { confirmedServices } from "@/content/services";
import { site, siteUrl } from "@/content/site";

/*
 * Indexable pages only: confirmed services and audiences (never pending
 * ones), the main pages, and legal pages once approved. /send-documents and
 * /styleguide are noindexed and left out. URLs use the production address
 * (siteUrl), whichever deployment serves the file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const legal = Object.values(legalDocuments)
    .filter((doc) => !(doc.status === "draft" && site.legal.noindexDraftPages))
    .map((doc) => `/${doc.slug}`);
  const paths = [
    routes.home,
    routes.services,
    ...confirmedServices.map((service) => `${routes.services}/${service.slug}`),
    routes.audiences,
    ...confirmedAudiences.map((audience) => `${routes.audiences}/${audience.slug}`),
    routes.about,
    routes.contact,
    routes.consultation,
    routes.faqs,
    ...legal,
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}` }));
}
