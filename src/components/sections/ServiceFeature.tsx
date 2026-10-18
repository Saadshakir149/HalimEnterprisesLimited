import { ArrowLink } from "@/components/ui/ArrowLink";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { priorityServices } from "@/content/home";
import { routes } from "@/content/navigation";
import type { ConfirmedService } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * A fully clickable feature block for a priority service (homepage and /services).
 * The lead service sits on navy; the second on a soft teal tint, so the pair
 * reads as one deliberate composition rather than two identical cards.
 */
export function ServiceFeature({ service, large }: { service: ConfirmedService; large: boolean }) {
  const copy = priorityServices[service.slug];
  if (!copy) return null;
  return (
    <article
      aria-labelledby={`service-${service.slug}`}
      {...(large && { "data-tone": "navy" })}
      className={cn(
        // The link stretches over the whole block; hover lifts it and focus outlines it
        "group relative flex flex-col gap-6 rounded-lg p-7 sm:p-10",
        "transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-teal",
        large ? "bg-navy text-on-navy lg:col-span-7 lg:p-12" : "bg-teal-soft/60 text-ink lg:col-span-5 lg:p-10",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-md transition-colors duration-200 ease-out",
            large
              ? "bg-on-navy/10 text-teal-on-dark group-hover:bg-teal-on-dark group-hover:text-navy group-has-[a:focus-visible]:bg-teal-on-dark group-has-[a:focus-visible]:text-navy"
              : "bg-surface text-teal-hover group-hover:bg-teal-hover group-hover:text-on-navy group-has-[a:focus-visible]:bg-teal-hover group-has-[a:focus-visible]:text-on-navy",
          )}
        >
          <Icon name={service.icon} size={24} />
        </span>
        <Heading
          level={3}
          size="h4"
          id={`service-${service.slug}`}
          className={cn("font-sans text-small font-bold tracking-[0.1em] uppercase", large ? "text-teal-on-dark" : "text-teal-hover")}
        >
          {service.title}
        </Heading>
      </div>
      {/* One size smaller on phones, where the full size made four-line headlines */}
      <p className={cn("max-w-[18ch] font-serif text-balance", large ? "text-h2 text-on-navy sm:text-h1" : "text-h3 text-navy sm:text-h2")}>{copy.headline}</p>
      <p className={cn("max-w-measure", large ? "text-body text-on-navy-muted sm:text-lead" : "text-body text-ink")}>{copy.text}</p>
      {/* The checklist repeats the paragraph above; on phones it is left out to keep the card short */}
      <ul className="flex flex-col gap-3 max-sm:hidden">
        {copy.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-body">
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                large ? "bg-teal-on-dark/15 text-teal-on-dark" : "bg-surface text-teal-hover",
              )}
            >
              <Icon name="check" size={14} />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <ArrowLink
        href={`${routes.services}/${service.slug}`}
        className={cn("mt-auto text-body", !large && "text-teal-hover")}
        stretched
      >
        {copy.link}
      </ArrowLink>
    </article>
  );
}
