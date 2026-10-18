import { Commitments } from "@/components/sections/Commitments";
import { DetailHero } from "@/components/sections/DetailHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reviews } from "@/components/sections/Reviews";
import { SoftwareStrip } from "@/components/sections/SoftwareStrip";
import { Container } from "@/components/ui/Container";
import { DevWarning } from "@/components/ui/DevWarning";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Portrait } from "@/components/ui/Portrait";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { consultationCta, routes } from "@/content/navigation";
import { aboutPage as copy, detailCta } from "@/content/pages";
import { site } from "@/content/site";
import { isDev } from "@/lib/env";
import { fill } from "@/lib/template";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: routes.about });

const values = {
  brand: site.brandName,
  year: site.incorporated.slice(0, 4),
  name: site.director,
  legalName: site.legalName,
};

function Director() {
  const { role, bio, qualifications, linkedIn, photo, quote } = site.directorProfile;
  const missing = [
    !photo && "photo",
    !bio && "bio",
    !quote && "quote",
    !qualifications && "qualifications",
    !linkedIn && "LinkedIn",
  ].filter(Boolean);

  return (
    <Section tone="paper" aria-labelledby="director-title">
      <Container className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 lg:col-span-4">
          <Portrait className="max-w-72 md:max-w-none" />
        </div>
        <div className="flex flex-col gap-6 md:col-span-7 lg:col-span-6 lg:col-start-6 md:self-center">
          <div className="flex flex-col gap-2">
            <Eyebrow>{copy.directorEyebrow}</Eyebrow>
            <Heading level={2} id="director-title">
              {site.director}
            </Heading>
            <p className="text-body font-semibold text-muted">{role}</p>
          </div>

          {quote ? (
            <blockquote className="border-l-2 border-teal pl-6">
              <p className="font-serif text-h3 text-navy">“{quote}”</p>
            </blockquote>
          ) : (
            // Development only: shows where the director's own words will sit, in the final style
            isDev && (
              <blockquote className="border-l-2 border-dashed border-danger pl-6">
                <p className="font-serif text-h3 text-muted">“The director’s own words will appear here once supplied.”</p>
                <DevWarning className="mt-3">pull quote placeholder, hidden in production</DevWarning>
              </blockquote>
            )
          )}

          <div className="flex max-w-measure flex-col gap-4">
            {(bio ?? [fill(copy.directorFallback, values)]).map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </div>

          {qualifications && qualifications.length > 0 && (
            <div className="flex flex-col gap-3">
              <Heading level={3} size="h4">
                {copy.qualificationsTitle}
              </Heading>
              <ul className="flex flex-col gap-2">
                {qualifications.map((item) => (
                  <li key={item} className="text-body text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {linkedIn && (
            <a href={linkedIn} className="link-body inline-flex w-fit items-center gap-1.5 font-semibold" target="_blank" rel="noopener noreferrer">
              {fill(copy.linkedIn, values)}
              <ExternalMark />
            </a>
          )}

          {missing.length > 0 && <DevWarning>Director {missing.join(", ")} not supplied: hidden</DevWarning>}
        </div>
      </Container>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <DetailHero
        crumbs={[
          { name: "Home", href: routes.home },
          { name: "About", href: routes.about },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={fill(copy.intro, values)}
        cta={consultationCta.label}
      />

      <Section tone="surface" aria-labelledby="story-title">
        <Container className="grid gap-8 lg:grid-cols-12">
          <Heading level={2} id="story-title" className="lg:col-span-4">
            {copy.storyTitle}
          </Heading>
          <div className="flex max-w-measure flex-col gap-5 lg:col-span-7 lg:col-start-6">
            {copy.story.map((paragraph) => (
              <Text key={paragraph} className="text-lead">
                {paragraph}
              </Text>
            ))}
          </div>
        </Container>
      </Section>

      <Director />

      {/* No eyebrow: "About us" already heads the page */}
      <Commitments eyebrow="" title={copy.valuesTitle} tone="surface" />

      {/* Renders nothing unless features.reviews is on and approved reviews exist */}
      <Reviews tone="paper" />

      <SoftwareStrip />

      <FinalCta title={detailCta.title} text={detailCta.text} />
    </>
  );
}
