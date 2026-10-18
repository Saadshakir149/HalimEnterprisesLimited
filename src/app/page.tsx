import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { AudiencesOverview } from "@/components/sections/AudiencesOverview";
import { Commitments } from "@/components/sections/Commitments";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SoftwareStrip } from "@/components/sections/SoftwareStrip";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { organization } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: `Bookkeeping, VAT and Accounting Services | ${site.brandName}`,
  absoluteTitle: true,
  description: `${site.brandName} provides bookkeeping, VAT returns, payroll and year-end accounts for UK small businesses and individuals, remotely across the UK. Free initial consultation.`,
  path: "/",
});

/*
 * Section rhythm: paper hero → surface software strip → paper services →
 * surface audience tabs → paper pinned steps → navy "why us" band →
 * surface about → paper FAQ → navy closing panel.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={organization()} />
      <Hero />
      <SoftwareStrip />
      <ServicesOverview />
      <AudiencesOverview />
      <HowItWorks />
      <Commitments tone="navy" />
      <AboutTeaser />
      {/* Renders nothing unless features.reviews is on and approved reviews exist.
          Paper like the FAQ below, so a hairline separates the two. */}
      <Reviews tone="paper" className="border-b border-line" />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
