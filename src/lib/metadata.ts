import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataOptions = {
  /** The page topic, without the brand: the layout's title template adds " | Halim Enterprises Limited" */
  title: string;
  description: string;
  /** The route, e.g. "/services/bookkeeping" */
  path: string;
  /** Use the title exactly as given (the homepage, whose title already includes the brand) */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

/** "Topic | Halim Enterprises Limited", as the browser and search results show it */
export function fullTitle(title: string, absolute = false): string {
  return absolute ? title : `${title} | ${site.brandName}`;
}

/**
 * Metadata for one page. The canonical link and og:url are relative paths;
 * the layout's metadataBase (siteUrl) makes them absolute on the production
 * address. A page-level noindex (draft legal pages, /send-documents) applies
 * on every deployment; preview deployments are noindexed site-wide by the layout.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false, noindex = false }: PageMetadataOptions): Metadata {
  const shown = fullTitle(title, absoluteTitle);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.brandName,
      title: shown,
      description,
      url: path,
    },
    twitter: { card: "summary", title: shown, description },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
