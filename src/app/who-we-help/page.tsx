import Link from "next/link";
import { Stagger } from "@/components/motion/Stagger";
import { DetailHero } from "@/components/sections/DetailHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { confirmedAudiences } from "@/content/audiences";
import { consultationCta, routes } from "@/content/navigation";
import { audiencesIndex as copy, detailCta } from "@/content/pages";
import { findConfirmedService } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: routes.audiences });

export default function WhoWeHelpPage() {
  return (
    <>
      <DetailHero
        crumbs={[
          { name: "Home", href: routes.home },
          { name: "Who we help", href: routes.audiences },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        cta={consultationCta.label}
      />

      <Section tone="surface" aria-label="Who we help">
        <Container>
          <Stagger as="ul" interval={0.05} className="border-t border-line">
            {confirmedAudiences.map((audience) => {
              const serviceNames = audience.page.services
                .map(({ slug }) => findConfirmedService(slug)?.title)
                .filter((title): title is string => Boolean(title));
              return (
                <li key={audience.slug} className="border-b border-line">
                  <Link
                    href={`${routes.audiences}/${audience.slug}`}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-5 gap-y-3 py-8 transition-colors duration-150 hover:bg-paper focus-visible:bg-paper sm:px-4 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] lg:gap-x-10"
                  >
                    <span className="flex size-11 items-center justify-center rounded-md bg-teal-soft text-teal-hover">
                      <Icon name={audience.icon} size={22} />
                    </span>
                    <span className="flex flex-col gap-2">
                      <h2 className="text-h3 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                        {audience.title}
                      </h2>
                      <span className="max-w-measure text-body text-muted">{audience.summary}</span>
                    </span>
                    <span className="col-start-2 flex flex-col gap-1 text-small lg:col-start-3">
                      <span className="font-semibold tracking-[0.08em] text-ink uppercase text-caption">
                        {copy.servicesLabel}
                      </span>
                      <span className="text-muted">{serviceNames.join(" · ")}</span>
                    </span>
                    <Icon
                      name="arrow-right"
                      size={20}
                      className="col-start-3 row-span-2 row-start-1 self-center text-teal transition-transform duration-150 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 lg:col-start-4 lg:row-span-1"
                    />
                  </Link>
                </li>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <FinalCta title={detailCta.title} text={detailCta.text} />
    </>
  );
}
