import type { ReactNode } from "react";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { NetworkMesh } from "@/components/ui/NetworkMesh";
import { Section, type SectionTone } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Lead } from "@/components/ui/Text";
import { commitments } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type CommitmentsProps = {
  /** Defaults to the homepage wording; /about reuses the same commitments under its own heading */
  eyebrow?: string;
  title?: string;
  tone?: SectionTone;
};

function initials(name: string): string {
  return name.split(/\s+/).map((part) => part[0]).join("").toUpperCase();
}

/**
 * Honest commitments only: nothing here needs outside proof. A bento layout:
 * one wide tile, one tall tile and two small ones, each with a small visual
 * built from facts we already state (channels, what you see before approving a return, the
 * director's name, the quote-first order of work). Works on navy or light.
 */
export function Commitments({ eyebrow = commitments.eyebrow, title = commitments.title, tone = "paper" }: CommitmentsProps) {
  const dark = tone === "navy";
  const { items, visuals } = commitments;
  const tile = cn(
    "flex h-full flex-col gap-4 rounded-lg border p-6 sm:p-8",
    // Solid (a 5% on-navy tint mixed into navy, not see-through), so the decorative mesh never runs behind text
    // On navy each tile also carries a cursor spotlight (see CursorSpotlight)
    dark
      ? "spotlight border-on-navy-line bg-[color-mix(in_srgb,var(--color-on-navy)_5%,var(--color-navy))]"
      : tone === "surface"
        ? "border-line bg-paper"
        : "border-line bg-surface",
  );
  const iconCircle = cn("flex size-11 items-center justify-center rounded-full", dark ? "bg-teal-on-dark/15 text-teal-on-dark" : "bg-teal-soft text-teal-hover");
  const textClass = dark ? "text-on-navy-muted" : "text-ink";
  const chip = cn("rounded-full border px-3 py-1 text-small font-semibold", dark ? "border-on-navy-line text-on-navy" : "border-line text-navy");

  const tileBody = (index: number, extra: ReactNode) => (
    <div className={tile} {...(dark && { "data-spotlight": "" })}>
      <span className={iconCircle}>
        <Icon name={items[index].icon} size={20} />
      </span>
      <Heading level={3} size="h4">
        {items[index].title}
      </Heading>
      <p className={cn("text-body", textClass)}>{items[index].text}</p>
      <div className="mt-auto pt-2">{extra}</div>
    </div>
  );

  return (
    <Section tone={tone} aria-labelledby="commitments-title" className="relative overflow-hidden">
      {dark && <NetworkMesh className="text-teal-on-dark" base={0.12} />}
      <Container className="relative flex flex-col gap-12">
        {dark && <CursorSpotlight selector="[data-spotlight]" />}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionIntro id="commitments-title" eyebrow={eyebrow} title={title} className="lg:col-span-7" />
          <Lead className="lg:col-span-5">{commitments.lead}</Lead>
        </div>

        {/* Revealed as one block, so the tiles never flash in at different times */}
        <Reveal as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {/* Wide: where we work */}
          <li className="sm:col-span-2">
            {tileBody(
              0,
              <div className="flex flex-wrap items-center gap-2">
                {visuals.channels.map((channel) => (
                  <span key={channel} className={chip}>
                    {channel}
                  </span>
                ))}
                <span className={cn("ml-1 text-small", dark ? "text-teal-on-dark" : "text-teal-hover")}>{visuals.channelsNote}</span>
              </div>,
            )}
          </li>
          {/* Tall: what you see before approving a return */}
          <li className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            {tileBody(
              1,
              <div className={cn("flex flex-col gap-3 rounded-md p-5", dark ? "bg-navy/60" : "bg-teal-soft/50")}>
                <p className={cn("text-caption font-semibold tracking-[0.12em] uppercase", dark ? "text-teal-on-dark" : "text-teal-hover")}>{visuals.review.label}</p>
                <ul className="flex flex-col gap-2">
                  {visuals.review.items.map((item) => (
                    <li key={item} className={cn("flex items-start gap-2 text-small", dark ? "text-on-navy" : "text-navy")}>
                      <Icon name="check" size={16} className={cn("mt-0.5", dark ? "text-teal-on-dark" : "text-teal")} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>,
            )}
          </li>
          {/* Small: a person, not a queue */}
          <li>
            {tileBody(
              2,
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn("flex size-11 items-center justify-center rounded-full font-serif text-small font-semibold", dark ? "bg-on-navy text-navy" : "bg-navy text-on-navy")}
                >
                  {initials(site.director)}
                </span>
                <span className="flex flex-col">
                  <span className={cn("text-small font-semibold", dark ? "text-on-navy" : "text-navy")}>{site.director}</span>
                  <span className={cn("text-caption", dark ? "text-on-navy-muted" : "text-muted")}>{visuals.contactRole}</span>
                </span>
              </div>,
            )}
          </li>
          {/* Small: quote first */}
          <li>
            {tileBody(
              3,
              <ol className="flex flex-col gap-2">
                {visuals.quoteSteps.map((step, index) => (
                  <li key={step} className={cn("flex items-center gap-3 text-small", dark ? "text-on-navy" : "text-ink")}>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "figures flex size-6 shrink-0 items-center justify-center rounded-full border text-caption font-semibold",
                        dark ? "border-teal-on-dark text-teal-on-dark" : "border-teal-hover text-teal-hover",
                      )}
                    >
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>,
            )}
          </li>
        </Reveal>
      </Container>
    </Section>
  );
}
