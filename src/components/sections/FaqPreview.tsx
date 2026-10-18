import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { featuredFaqs } from "@/content/faqs";
import { faqPreview } from "@/content/home";
import { routes } from "@/content/navigation";
import { whatsappHref } from "@/lib/whatsapp";
import { ExternalMark } from "@/components/ui/ExternalMark";

export function FaqPreview() {
  const whatsapp = whatsappHref();
  const items = featuredFaqs.map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    content: faq.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
  }));

  return (
    <Section tone="paper" aria-labelledby="faq-title">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <SectionIntro
          id="faq-title"
          eyebrow={faqPreview.eyebrow}
          title={faqPreview.title}
          lead={faqPreview.lead}
          className="lg:col-span-4"
        >
          <ArrowLink href={routes.faqs}>{faqPreview.allLink}</ArrowLink>
          {whatsapp && (
            <p className="mt-2 flex flex-col gap-1 border-t border-line pt-5 text-body text-ink">
              {faqPreview.askPrompt}
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-body inline-flex w-fit items-center gap-1.5 font-semibold"
              >
                {faqPreview.askLink}
                <ExternalMark />
              </a>
            </p>
          )}
        </SectionIntro>
        <Accordion items={items} className="lg:col-span-7 lg:col-start-6" />
      </Container>
    </Section>
  );
}
