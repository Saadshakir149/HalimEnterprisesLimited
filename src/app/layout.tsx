import type { Metadata, Viewport } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppAutoHide } from "@/components/layout/WhatsAppAutoHide";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { site, siteUrl } from "@/content/site";
import { indexingAllowed } from "@/lib/env";
import "./globals.css";

/*
 * Both are variable fonts: one file each covers every weight in use
 * (serif 400–600, sans 400–700), which is lighter than separate static weights.
 */
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Relative canonical URLs and og:url resolve against the production address
  metadataBase: new URL(siteUrl),
  // Preview deployments (VERCEL_ENV=preview) are kept out of search results; see indexingAllowed()
  ...(!indexingAllowed() && { robots: { index: false, follow: false } }),
  // Google Search Console HTML-tag verification, only if GOOGLE_SITE_VERIFICATION is set (DNS TXT verification needs no code)
  ...(process.env.GOOGLE_SITE_VERIFICATION && { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }),
  title: {
    default: site.brandName,
    template: `%s | ${site.brandName}`,
  },
  description: `${site.brandName} provides bookkeeping, VAT returns and accounting services for small businesses and individuals across the UK.`,
  applicationName: site.brandName,
};

/* viewport-fit=cover makes env(safe-area-inset-*) available to the WhatsApp button */
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${sourceSerif.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        {/* Reads the pathname, so it needs a Suspense boundary under Cache Components */}
        <Suspense fallback={null}>
          <WhatsAppAutoHide />
        </Suspense>
      </body>
    </html>
  );
}
