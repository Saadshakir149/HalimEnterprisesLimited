import { Stagger } from "@/components/motion/Stagger";
import { DetailHero } from "@/components/sections/DetailHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceFeature } from "@/components/sections/ServiceFeature";
import { ServiceList } from "@/components/sections/ServiceList";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { consultationCta, routes } from "@/content/navigation";
import { detailCta, servicesIndex as copy } from "@/content/pages";
import { confirmedServices } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: routes.services });

export default function ServicesPage() {
  const priority = confirmedServices.filter((s) => s.priority);
  const others = confirmedServices.filter((s) => !s.priority);

  return (
    <>
      <DetailHero
        crumbs={[
          { name: "Home", href: routes.home },
          { name: "Services", href: routes.services },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        cta={consultationCta.label}
      />

      <Section tone="surface" aria-labelledby="featured-title">
        <Container className="flex flex-col gap-section-sm">
          <div className="flex flex-col gap-8">
            <Heading level={2} size="h3" id="featured-title">
              {copy.featuredTitle}
            </Heading>
            <Stagger as="div" interval={0.06} className="grid gap-6 lg:grid-cols-12">
              {priority.map((service, index) => (
                <ServiceFeature key={service.slug} service={service} large={index === 0} />
              ))}
            </Stagger>
          </div>

          <section aria-labelledby="more-title" className="flex flex-col gap-8">
            <Heading level={2} size="h3" id="more-title">
              {copy.otherTitle}
            </Heading>
            <ServiceList services={others} text="summary" />
          </section>
        </Container>
      </Section>

      <FinalCta title={detailCta.title} text={detailCta.text} />
    </>
  );
}
