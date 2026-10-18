import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { hero } from "@/content/home";
import { routes } from "@/content/navigation";

/** The arrow nudges forward on hover and on keyboard focus, in step with the button's own 150ms transition */
const arrow = "transition-transform duration-200 ease-out group-hover/btn:translate-x-1 group-focus-visible/btn:translate-x-1";

/**
 * Full-width photographic hero on a navy surface.
 *
 * The photo, an empty boardroom with a table running towards tall windows
 * and a city view, is full-bleed behind the whole hero at every width, under
 * an even navy wash (hero-scrim in globals.css) that is deepest behind the
 * text. Navy shows while the image loads, so the text is readable from
 * first paint. The photo is licensed stock (docs/ASSETS.md), never presented
 * as the company's office, its director or a client.
 *
 * Motion reuses the CSS entrance (animate-enter, 280ms, staggered 40ms) and
 * the photo's settle (450ms); the reduced-motion override shows everything at once.
 */
export function Hero() {
  const { main, accent } = hero.headline;

  return (
    <section aria-labelledby="hero-title" data-tone="navy" className="relative isolate overflow-hidden bg-navy">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          // The largest element above the fold, so fetch it early (Next 16 guidance: eager + high priority, not preload)
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          // Keeps the table running towards the windows in frame at every crop
          className="animate-settle object-cover object-[55%_60%]"
        />
        {/* Navy wash (globals.css hero-scrim): even on small screens, deepest behind the text from 1024px */}
        <div aria-hidden="true" className="absolute inset-0 hero-scrim" />
      </div>

      {/*
        Sizing: the hero follows the screen. From 1024px it fills the space under the header (between
        28rem and 43rem). On short desktop screens (laptops, zoomed browsers: the "short" variant) the
        headline also scales with the screen height and the spacing tightens, so the headline, text and
        both buttons sit in the first view. On phones the eyebrow shortens and the text steps down a size.
      */}
      <Container className="flex items-center py-12 sm:py-20 lg:min-h-[clamp(28rem,calc(100svh-5rem),43rem)] lg:py-20 short:py-10">
        {/* CSS entrance (animate-enter): runs from first paint, needs no JavaScript, done by about 450ms */}
        <div className="flex max-w-[40rem] flex-col xl:max-w-[44rem]">
          {/* Muted rather than teal, so the light-teal accent is kept for the headline's second line */}
          <Eyebrow className="animate-enter in-data-[tone=navy]:text-on-navy-muted">
            {hero.eyebrow.main}
            <span className="max-sm:hidden"> · {hero.eyebrow.extra}</span>
          </Eyebrow>
          <Heading
            level={1}
            id="hero-title"
            className="mt-4 animate-enter text-[clamp(2rem,1.4rem+2.8vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.02em] [animation-delay:40ms] sm:mt-5 short:mt-3 short:text-[clamp(2rem,1rem+5.6svh,3rem)]"
          >
            {/* One sentence for search engines and screen readers; the accent sits on its own line */}
            <span className="block text-balance">{main}</span> <span className="block text-balance text-teal-on-dark">{accent}</span>
          </Heading>
          <p className="mt-5 max-w-[33rem] animate-enter text-body text-pretty text-on-navy [animation-delay:90ms] sm:mt-6 sm:text-lead xl:max-w-[38rem] short:mt-4">
            {hero.lead}
          </p>
          {/* Below 1024px the floating WhatsApp button would cover these full-width buttons, so it steps aside while they are on screen */}
          <div
            data-hide-whatsapp="below-lg"
            className="mt-7 flex animate-enter flex-col gap-3 [animation-delay:140ms] sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4 short:mt-6"
          >
            <Button href={routes.consultation} variant="on-dark" size="lg">
              {hero.primaryCta}
              <Icon name="arrow-right" size={20} className={arrow} />
            </Button>
            <Button href={routes.services} variant="outline-on-dark" size="lg">
              {hero.secondaryCta}
            </Button>
          </div>
          <ul className="mt-5 flex animate-enter flex-col gap-2 text-small text-on-navy [animation-delay:190ms] sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-x-8 short:mt-4">
            {hero.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="check" size={16} className="text-teal-on-dark" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/*
        Image credit, when the photo's licence requires one (docs/ASSETS.md). Bottom right, on navy at
        every width. After the content in the DOM, so keyboard users reach the hero buttons first.
      */}
      {hero.image.credit && (
        <p className="absolute right-[max(1rem,env(safe-area-inset-right))] bottom-3 z-10 rounded-sm bg-navy/80 px-2 py-0.5 text-caption text-on-navy-muted max-sm:right-auto max-sm:left-4">
          <a href={hero.image.credit.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center gap-1 underline-offset-2 hover:text-on-navy hover:underline">
            {hero.image.credit.text}
            <ExternalMark size={12} />
          </a>
        </p>
      )}
    </section>
  );
}
