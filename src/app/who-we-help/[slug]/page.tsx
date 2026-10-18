import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailHero } from "@/components/sections/DetailHero";
import { DetailLayout } from "@/components/sections/DetailLayout";
import { DetailSection } from "@/components/sections/DetailSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteBox } from "@/components/sections/QuoteBox";
import { RelatedLinks, type RelatedItem } from "@/components/sections/RelatedLinks";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/ui/Checklist";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Text } from "@/components/ui/Text";
import { confirmedAudiences, findConfirmedAudience } from "@/content/audiences";
import { consultationCta, routes } from "@/content/navigation";
import { audienceDetailCopy as copy, detailCta } from "@/content/pages";
import { findConfirmedService } from "@/content/services";
import { breadcrumbList, faqPage } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

/* Confirmed audiences only; anything else is rejected with notFound() below. */
export function generateStaticParams() {
  return confirmedAudiences.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const audience = findConfirmedAudience((await params).slug);
  if (!audience) return {};
  return pageMetadata({ title: audience.page.metaTitle, description: audience.page.metaDescription, path: `${routes.audiences}/${audience.slug}` });
}

/** "Hospitality and restaurants" → "hospitality and restaurants", for use mid-sentence */
function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export default async function AudiencePage({ params }: Props) {
  const audience = findConfirmedAudience((await params).slug);
  if (!audience) notFound();
  const { page } = audience;
  const path = `${routes.audiences}/${audience.slug}`;

  const crumbs = [
    { name: "Home", href: routes.home },
    { name: "Who we help", href: routes.audiences },
    { name: audience.title, href: path },
  ];

  // Confirmed services only: findConfirmedService returns nothing for anything else
  const services: RelatedItem[] = page.services.flatMap(({ slug, why }) => {
    const service = findConfirmedService(slug);
    return service
      ? [{ href: `${routes.services}/${service.slug}`, title: service.title, text: why, icon: service.icon }]
      : [];
  });

  const others: RelatedItem[] = confirmedAudiences
    .filter((other) => other.slug !== audience.slug)
    .map((other) => ({
      href: `${routes.audiences}/${other.slug}`,
      title: other.title,
      text: other.summary,
      icon: other.icon,
    }));

  const faqItems = page.faqs.map((faq, index) => ({
    id: `faq-${index + 1}`,
    title: faq.question,
    content: faq.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
  }));

  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      {/* The same questions are visible in the accordion below */}
      <JsonLd data={faqPage(page.faqs)} />

      <DetailHero
        crumbs={crumbs}
        eyebrow={copy.eyebrow}
        title={audience.title}
        intro={page.intro}
        icon={audience.icon}
        cta={consultationCta.label}
      />

      <DetailLayout
        lead={
          <>
            <DetailSection id="situation" title={copy.situation} first>
              <div className="flex max-w-measure flex-col gap-4">
                {page.situation.map((paragraph) => (
                  <Text key={paragraph}>{paragraph}</Text>
                ))}
              </div>
            </DetailSection>
            <DetailSection id="challenges" title={copy.challenges}>
              <Checklist items={page.challenges} variant="point" />
            </DetailSection>
          </>
        }
        aside={<QuoteBox topic={`your services for ${lowerFirst(audience.title)}`} />}
        rest={
          <>
            <DetailSection id="how-we-help" title={copy.services} first>
              <RelatedLinks items={services} />
            </DetailSection>
            <DetailSection id="remote" title={copy.remote}>
              <div className="flex max-w-measure items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-teal-soft text-teal-hover">
                  <Icon name="laptop" size={22} />
                </span>
                <Text>{page.remote}</Text>
              </div>
            </DetailSection>
            <DetailSection id="questions" title={copy.faqs}>
              <Accordion items={faqItems} />
            </DetailSection>
            <DetailSection id="others" title={copy.otherAudiences}>
              <RelatedLinks items={others} />
            </DetailSection>
          </>
        }
      />

      <FinalCta title={detailCta.title} text={detailCta.text} />
    </>
  );
}
