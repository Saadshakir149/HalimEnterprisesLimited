import type { MetadataRoute } from "next";
import { canonicalSiteUrl } from "@/content/site";

/*
 * Crawlers may visit every page; pages that should stay out of search results
 * (draft legal pages, /send-documents, /styleguide) say so with their own
 * noindex tag, which crawlers can only read if they are allowed in. The API
 * routes only accept form posts. The sitemap is listed once the production
 * domain is confirmed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(canonicalSiteUrl && { sitemap: `${canonicalSiteUrl}/sitemap.xml` }),
  };
}
