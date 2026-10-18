import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Heading";
import { software } from "@/content/home";
import { site } from "@/content/site";

const names = [...site.software, ...site.tools];

/** One copy of the names, each followed by a small teal ledger mark as a separator */
function NameList({ copy }: { copy: "first" | "duplicate" }) {
  return (
    <ul
      // The duplicate exists only to make the loop seamless: hidden from assistive technology, and
      // not shown at all with reduced motion, where the first copy becomes a static, wrapping row
      aria-label={copy === "first" ? software.text : undefined}
      aria-hidden={copy === "duplicate" ? true : undefined}
      className={
        "flex shrink-0 items-center " +
        (copy === "duplicate" ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3")
      }
    >
      {names.map((name) => (
        <li key={name} className="flex items-center">
          <span className="px-6 font-sans text-[clamp(1.0625rem,0.9rem+0.8vw,1.375rem)] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap text-navy sm:px-9">
            {name}
          </span>
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-teal motion-reduce:hidden" />
        </li>
      ))}
    </ul>
  );
}

/**
 * The software we support: the heading and note on the left, the names as
 * text wordmarks drifting slowly in a seamless loop on the right, and the
 * trademark line held still beneath.
 *
 * Text, not logos: Xero restricts its logo to partner-programme firms, Intuit
 * requires a written licence and Sage gives no general permission (reviewed
 * in docs/ASSETS.md); the other names are text for consistency. Intuit's
 * plain-text conditions are why the names stay smaller than the site's own
 * wordmark, avoid the brands' colours and carry the trademark line. Nothing
 * here suggests a partnership.
 *
 * Motion is pure CSS (no JavaScript): the track moves by one copy's width in
 * 32s and repeats. It pauses on hover and while anything inside has focus;
 * with reduced motion there is no movement and only one copy, as a centred
 * row. Edges fade with a mask, and the window clips the track, so the page
 * never scrolls sideways.
 */
export function SoftwareStrip() {
  return (
    <section aria-labelledby="software-title" className="border-b border-line bg-surface">
      <Container className="pt-9 pb-8 sm:pt-11 sm:pb-9">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="flex flex-col gap-2 lg:col-span-4">
            <Eyebrow>{software.label}</Eyebrow>
            <h2 id="software-title" className="font-serif text-h3 text-navy">
              {software.title}
            </h2>
            <p className="max-w-[26rem] text-small text-muted">{software.note}</p>
          </div>

          <div className="group/marquee overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none] lg:col-span-8">
            <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:justify-center">
              <NameList copy="first" />
              <NameList copy="duplicate" />
            </div>
          </div>
        </div>

        <p className="mt-7 border-t border-line pt-4 text-caption text-muted">{software.trademarks}</p>
      </Container>
    </section>
  );
}
