import { AudienceTabs, type AudienceTab } from "@/components/sections/AudienceTabs";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { confirmedAudiences } from "@/content/audiences";
import { audienceProblems, audiencesIntro } from "@/content/home";
import { consultationCta, routes } from "@/content/navigation";
import { confirmedServices } from "@/content/services";

/*
 * Plain data for the client tabs: confirmed audiences only, and only the
 * confirmed services each audience page already links to. Nothing new is
 * claimed here; it is the existing audience copy, brought onto the homepage.
 */
const tabs: AudienceTab[] = confirmedAudiences.map((audience) => ({
  slug: audience.slug,
  title: audience.title,
  icon: audience.icon,
  problem: audienceProblems[audience.slug],
  intro: audience.page.intro,
  href: `${routes.audiences}/${audience.slug}`,
  services: audience.page.services.flatMap(({ slug, why }) => {
    const service = confirmedServices.find((s) => s.slug === slug);
    return service ? [{ href: `${routes.services}/${slug}`, title: service.title, why }] : [];
  }),
}));

/** Who we help: one tab per confirmed audience, each showing the situation and how we help. */
export function AudiencesOverview() {
  return (
    <Section tone="surface" aria-labelledby="audiences-title">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionIntro
            id="audiences-title"
            eyebrow={audiencesIntro.eyebrow}
            title={audiencesIntro.title}
            lead={audiencesIntro.lead}
            className="lg:col-span-8"
          />
          <ArrowLink href={routes.audiences} className="text-body lg:col-span-4 lg:justify-self-end">
            {audiencesIntro.allLink}
          </ArrowLink>
        </div>
        <AudienceTabs
          tabs={tabs}
          labels={{
            tablist: audiencesIntro.tablist,
            helpTitle: audiencesIntro.helpTitle,
            more: audiencesIntro.more,
            consultation: consultationCta.label,
            consultationHref: consultationCta.href,
          }}
        />
      </Container>
    </Section>
  );
}
