import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { indexingAllowed } from "@/lib/env";

/*
 * Production: crawlers may visit every page; pages that should stay out of
 * search results (draft legal pages, /send-documents, /styleguide) say so with
 * their own noindex tag, which crawlers can only read if they are allowed in.
 * The API routes only accept form posts.
 * Preview deployments (*.vercel.app, VERCEL_ENV=preview): nothing may be crawled.
 */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
