import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Text } from "@/components/ui/Text";
import { aboutTeaser } from "@/content/home";
import { routes } from "@/content/navigation";
import { companiesHouseUrl } from "@/content/site";

/**
 * "Company at a glance": a navy ledger card of verified company facts, in
 * place of a portrait (the client prefers no photo here). A soft teal glow
 * sits behind it (static, decorative), and on desktop a light follows the
 * pointer across the card (the shared spotlight utility; off for touch and
 * reduced motion). The Companies House link lets visitors check the
 * company for themselves.
 */
function PracticeFacts() {
  const { facts } = aboutTeaser;
  return (
    // isolate keeps the glow (-z-10) behind the card but in front of the section's background
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-teal)_60%,transparent)_35%,transparent)] blur-2xl sm:-inset-12"
      />
      <div
        data-tone="navy"
        data-spotlight=""
        className="spotlight rounded-lg border border-on-navy-line bg-navy p-6 shadow-lg sm:p-8"
      >
        <p className="text-caption font-semibold tracking-[0.14em] text-teal-on-dark uppercase">{facts.label}</p>
        <dl className="mt-5 border-t border-on-navy-line">
          {facts.rows.map((row) => (
            <div key={row.term} className="grid gap-1 border-b border-on-navy-line py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-small text-on-navy-muted">{row.term}</dt>
              <dd className={"text-small font-semibold text-on-navy " + ("figures" in row && row.figures ? "figures" : "")}>{row.value}</dd>
            </div>
          ))}
        </dl>
        <a
          href={companiesHouseUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-6 items-center gap-1.5 text-small font-semibold text-teal-on-dark underline decoration-teal-on-dark/40 underline-offset-4 transition-colors duration-150 hover:decoration-current"
        >
          {facts.link}
          <ExternalMark size={14} />
        </a>
      </div>
      <CursorSpotlight selector="[data-spotlight]" />
    </div>
  );
}

export function AboutTeaser() {
  return (
    // overflow-x-clip: the glow spreads past the card and must never widen the page on small screens
    <Section tone="surface" aria-labelledby="about-title" className="overflow-x-clip">
      <Container className="grid gap-12 md:grid-cols-12 md:items-center md:gap-8 lg:gap-12">
        <SectionIntro id="about-title" eyebrow={aboutTeaser.eyebrow} title={aboutTeaser.title} className="md:col-span-6">
          {aboutTeaser.paragraphs.map((paragraph) => (
            <Text key={paragraph} className="max-w-measure">
              {paragraph}
            </Text>
          ))}
          <ArrowLink href={routes.about}>{aboutTeaser.link}</ArrowLink>
        </SectionIntro>
        <Reveal className="md:col-span-6 lg:col-span-5 lg:col-start-8">
          <PracticeFacts />
        </Reveal>
      </Container>
    </Section>
  );
}
