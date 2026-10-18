import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailHero } from "@/components/sections/DetailHero";
import { DetailLayout } from "@/components/sections/DetailLayout";
import { DetailSection } from "@/components/sections/DetailSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuoteBox } from "@/components/sections/QuoteBox";
import { RelatedLinks, type RelatedItem } from "@/components/sections/RelatedLinks";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/ui/Checklist";
import { JsonLd } from "@/components/ui/JsonLd";
import { Text } from "@/components/ui/Text";
import { confirmedAudiences } from "@/content/audiences";
import { consultationCta, routes } from "@/content/navigation";
import { detailCta, serviceDetailCopy as copy } from "@/content/pages";
import { confirmedServices, findConfirmedService } from "@/content/services";
import { breadcrumbList, faqPage } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

/* Confirmed services only. Cache Components forbids `dynamicParams`, so
   unknown and pending slugs are rejected with notFound() below. */
export function generateStaticParams() {
  return confirmedServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = findConfirmedService((await params).slug);
  if (!service) return {};
  return pageMetadata({ title: service.page.metaTitle, description: service.page.metaDescription, path: `${routes.services}/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const service = findConfirmedService((await params).slug);
  if (!service) notFound();
  const { page } = service;
  const path = `${routes.services}/${service.slug}`;

  const crumbs = [
    { name: "Home", href: routes.home },
    { name: "Services", href: routes.services },
    { name: service.title, href: path },
  ];

  const relatedServices: RelatedItem[] = page.relatedServices.flatMap((slug) => {
    const related = findConfirmedService(slug);
    return related
      ? [{ href: `${routes.services}/${related.slug}`, title: related.title, text: related.tagline, icon: related.icon }]
      : [];
  });

  const relatedAudiences: RelatedItem[] = confirmedAudiences
    .filter((audience) => page.relatedAudiences.includes(audience.slug))
    .map((audience) => ({
      href: `${routes.audiences}/${audience.slug}`,
      title: audience.title,
      text: audience.summary,
      icon: audience.icon,
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
        title={service.title}
        intro={page.intro}
        icon={service.icon}
        cta={consultationCta.label}
      />

      <DetailLayout
        lead={
          <>
            <DetailSection id="who-for" title={copy.whoFor} first>
              <div className="flex max-w-measure flex-col gap-4">
                {page.whoFor.map((paragraph) => (
                  <Text key={paragraph}>{paragraph}</Text>
                ))}
              </div>
            </DetailSection>
            <DetailSection id="included" title={copy.included}>
              <Checklist items={page.included} />
            </DetailSection>
          </>
        }
        aside={<QuoteBox topic={service.title} serviceSlug={service.slug} />}
        rest={
          <>
            <DetailSection id="how-it-works" title={copy.steps} first>
              <ProcessSteps steps={page.steps} />
            </DetailSection>
            <DetailSection id="need-from-you" title={copy.needFromYou}>
              <Checklist items={page.needFromYou} variant="document" />
            </DetailSection>
            <DetailSection id="questions" title={copy.faqs}>
              <Accordion items={faqItems} />
            </DetailSection>
            {relatedServices.length > 0 && (
              <DetailSection id="related-services" title={copy.relatedServices}>
                <RelatedLinks items={relatedServices} />
              </DetailSection>
            )}
            {relatedAudiences.length > 0 && (
              <DetailSection id="related-audiences" title={copy.relatedAudiences}>
                <RelatedLinks items={relatedAudiences} />
              </DetailSection>
            )}
          </>
        }
      />

      <FinalCta title={detailCta.title} text={detailCta.text} />
    </>
  );
}
