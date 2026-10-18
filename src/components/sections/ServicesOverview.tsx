import { Stagger } from "@/components/motion/Stagger";
import { ServiceFeature } from "@/components/sections/ServiceFeature";
import { ServiceList } from "@/components/sections/ServiceList";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Lead } from "@/components/ui/Text";
import { servicesIntro } from "@/content/home";
import { confirmedServices } from "@/content/services";

/**
 * Priority services first and largest (bookkeeping on navy, VAT on a soft
 * tint), then the other confirmed services as a lighter grid. Pending
 * services never appear: confirmedServices filters them out.
 */
export function ServicesOverview() {
  const priority = confirmedServices.filter((s) => s.priority);
  const others = confirmedServices.filter((s) => !s.priority);

  return (
    <Section tone="paper" aria-labelledby="services-title">
      <Container className="flex flex-col gap-12 lg:gap-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionIntro id="services-title" eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} className="lg:col-span-7" />
          <Lead className="lg:col-span-5">{servicesIntro.lead}</Lead>
        </div>

        <Stagger as="div" interval={0.08} className="grid gap-6 lg:grid-cols-12">
          {priority.map((service, index) => (
            <ServiceFeature key={service.slug} service={service} large={index === 0} />
          ))}
        </Stagger>

        <div className="flex flex-col gap-2">
          <Heading level={3} size="h3">
            {servicesIntro.otherTitle}
          </Heading>
          <ServiceList services={others} layout="grid" allLink={servicesIntro.allLink} />
        </div>
      </Container>
    </Section>
  );
}
