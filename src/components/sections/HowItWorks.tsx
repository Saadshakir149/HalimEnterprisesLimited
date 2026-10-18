import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Text } from "@/components/ui/Text";
import { howItWorks } from "@/content/home";
import { routes } from "@/content/navigation";

/**
 * Pinned steps (desktop, motion allowed): the intro stays in view while the
 * three step cards stick and stack in order as you scroll. Pure CSS
 * (position: sticky), so there are no scroll handlers and nothing can trap the
 * page; scrolling simply carries on past the last card. On small screens and
 * with reduced motion it is an ordinary list. A genuine sequence, so an <ol>.
 */
export function HowItWorks() {
  return (
    <Section tone="paper" aria-labelledby="how-title">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <SectionIntro id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} lead={howItWorks.lead} />
            <Button href={routes.consultation} size="lg" className="w-full sm:w-fit">
              {howItWorks.cta}
              <Icon name="arrow-right" size={20} className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </div>

        <ol className="flex flex-col gap-5 lg:col-span-7 lg:gap-0">
          {howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              // Each card pins a little lower than the one before, so the stack shows every step number
              style={{ "--pin": `calc(7rem + ${index} * 1.5rem)` } as CSSProperties}
              // The scroll gap sits above each later card (not below the earlier ones): a sticky card's own
              // bottom margin counts against its limit, which would un-pin it before the stack is complete
              className={
                "rounded-lg border border-line bg-surface p-7 shadow-md sm:p-10 " +
                "motion-safe:lg:sticky motion-safe:lg:top-(--pin) " +
                (index > 0 ? "lg:mt-[24vh]" : "")
              }
            >
              <div className="flex items-start justify-between gap-6">
                <span className="figures font-serif text-[clamp(3rem,2rem+3vw,4.5rem)] leading-none font-semibold text-teal" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-navy text-navy">
                  <Icon name={step.icon} size={24} />
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <span className="text-caption font-semibold tracking-[0.14em] text-teal uppercase" aria-hidden="true">
                  {howItWorks.stepLabel} {index + 1} / {howItWorks.steps.length}
                </span>
                <Heading level={3} size="h3">
                  <span className="sr-only">
                    {howItWorks.stepLabel} {index + 1}:{" "}
                  </span>
                  {step.title}
                </Heading>
                <Text className="max-w-[42ch] text-ink">{step.text}</Text>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
