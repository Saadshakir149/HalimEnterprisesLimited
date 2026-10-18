import { DetailHero } from "@/components/sections/DetailHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { faqCategories, faqs } from "@/content/faqs";
import { consultationCta, routes } from "@/content/navigation";
import { detailCta, faqsPage as copy } from "@/content/pages";
import { breadcrumbList, faqPage } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: routes.faqs });

const slug = (category: string) => category.toLowerCase().replace(/[^a-z]+/g, "-");

export default function FaqsPage() {
  const crumbs = [
    { name: "Home", href: routes.home },
    { name: "FAQs", href: routes.faqs },
  ];
  const groups = faqCategories
    .map((category) => ({ category, items: faqs.filter((faq) => faq.category === category) }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      {/* Every question below is visible on the page */}
      <JsonLd data={faqPage(groups.flatMap((group) => group.items))} />

      <DetailHero crumbs={crumbs} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} cta={consultationCta.label} />

      <Section tone="surface">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="Question topics" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 text-caption font-semibold tracking-[0.14em] text-muted uppercase">{copy.topics}</p>
              <ul className="border-t border-line">
                {groups.map((group) => (
                  <li key={group.category} className="border-b border-line">
                    <a
                      href={`#${slug(group.category)}`}
                      className="flex min-h-11 items-center justify-between gap-3 py-2.5 text-small text-ink transition-colors duration-150 hover:text-teal focus-visible:text-teal"
                    >
                      {group.category}
                      <span className="figures text-caption text-muted">{group.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex min-w-0 flex-col gap-14 lg:col-span-8 lg:col-start-5">
            {groups.map((group) => (
              <section
                key={group.category}
                id={slug(group.category)}
                aria-labelledby={`${slug(group.category)}-title`}
                className="flex scroll-mt-28 flex-col gap-4"
              >
                <Heading level={2} size="h3" id={`${slug(group.category)}-title`}>
                  {group.category}
                </Heading>
                <Accordion
                  items={group.items.map((faq) => ({
                    id: `faq-${faq.id}`,
                    title: faq.question,
                    content: faq.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
                  }))}
                />
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta title={detailCta.title} text={detailCta.text} />
    </>
  );
}
