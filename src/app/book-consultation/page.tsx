import { BookingPanel } from "@/components/sections/BookingPanel";
import { DetailHero } from "@/components/sections/DetailHero";
import { DetailSection } from "@/components/sections/DetailSection";
import { Checklist } from "@/components/ui/Checklist";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { hero } from "@/content/home";
import { routes } from "@/content/navigation";
import { consultationPage as copy } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: routes.consultation });

export default function BookConsultationPage() {
  return (
    <>
      <DetailHero
        crumbs={[
          { name: "Home", href: routes.home },
          { name: "Book a consultation", href: routes.consultation },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* The booking box comes first on mobile, so the action is never far away */}
          <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <div className="lg:sticky lg:top-28">
              <BookingPanel />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-10 lg:col-span-7 lg:row-start-1">
            <DetailSection id="covers" title={copy.coversTitle} first>
              {/* Same points as the homepage consultation card, so the two never drift apart */}
              <Checklist items={hero.consultationCard.points} />
            </DetailSection>
            <DetailSection id="format" title={copy.formatTitle}>
              <Checklist items={copy.format} variant="point" />
            </DetailSection>
            <DetailSection id="prepare" title={copy.prepareTitle}>
              <Checklist items={copy.prepare} variant="document" />
              <Text size="small" muted>
                {copy.prepareNote}
              </Text>
            </DetailSection>
            <DetailSection id="after" title={copy.afterTitle}>
              <Text className="max-w-measure text-lead">{copy.after}</Text>
            </DetailSection>
          </div>
        </Container>
      </Section>
    </>
  );
}
