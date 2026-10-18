import Link from "next/link";
import { Stagger } from "@/components/motion/Stagger";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/content/navigation";
import type { ConfirmedService } from "@/content/services";
import { cn } from "@/lib/utils";

type ServiceListProps = {
  services: readonly ConfirmedService[];
  /** "tagline" for a compact one-liner (homepage); "summary" for the fuller sentence (/services) */
  text?: "tagline" | "summary";
  /** "rows": ledger-style rows (/services). "grid": a lighter three-column grid (homepage). */
  layout?: "rows" | "grid";
  /** Grid only: a final tile linking to the full list */
  allLink?: string;
};

/** Links to each service, as ledger rows or a scannable grid. */
export function ServiceList({ services, text = "tagline", layout = "rows", allLink }: ServiceListProps) {
  if (layout === "grid") {
    return (
      <Stagger as="ul" interval={0.05} className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="border-t border-line">
            <Link
              href={`${routes.services}/${service.slug}`}
              className="group flex h-full items-start gap-4 py-6 transition-colors duration-150 sm:pr-4"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal-hover transition-colors duration-200 ease-out group-hover:bg-teal group-hover:text-on-navy group-focus-visible:bg-teal group-focus-visible:text-on-navy">
                <Icon name={service.icon} size={20} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-body font-semibold text-navy decoration-teal underline-offset-4 group-hover:underline group-focus-visible:underline">
                  {service.title}
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="text-teal transition-transform duration-150 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  />
                </span>
                <span className="text-body text-muted">{text === "tagline" ? service.tagline : service.summary}</span>
              </span>
            </Link>
          </li>
        ))}
        {allLink && (
          <li className="border-t border-line">
            <Link
              href={routes.services}
              className="group flex h-full min-h-24 items-center justify-between gap-4 py-6 text-body font-semibold text-teal-hover underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current focus-visible:decoration-current"
            >
              {allLink}
              <span className="flex size-11 items-center justify-center rounded-full border border-teal-hover transition-colors duration-200 group-hover:bg-teal-hover group-hover:text-on-navy group-focus-visible:bg-teal-hover group-focus-visible:text-on-navy">
                <Icon name="arrow-right" size={20} />
              </span>
            </Link>
          </li>
        )}
      </Stagger>
    );
  }

  return (
    <Stagger as="ul" interval={0.05} className="border-t border-line">
      {services.map((service) => (
        <li key={service.slug} className="border-b border-line">
          <Link
            href={`${routes.services}/${service.slug}`}
            className={cn(
              "group grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-5 transition-colors duration-150 hover:bg-paper focus-visible:bg-paper sm:px-2",
              text === "tagline" ? "items-center md:grid-cols-[auto_16rem_minmax(0,1fr)_auto]" : "items-start md:grid-cols-[auto_16rem_minmax(0,1fr)_auto]",
            )}
          >
            <Icon name={service.icon} size={22} className={cn("text-teal", text === "summary" && "mt-0.5")} />
            <span className="font-semibold text-navy decoration-teal underline-offset-4 group-hover:underline group-focus-visible:underline">
              {service.title}
            </span>
            <span className="col-start-2 max-w-measure text-small text-muted md:col-start-auto">
              {text === "tagline" ? service.tagline : service.summary}
            </span>
            <Icon
              name="arrow-right"
              size={18}
              className="col-start-3 row-span-2 row-start-1 text-teal transition-transform duration-150 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 md:col-start-auto md:row-span-1"
            />
          </Link>
        </li>
      ))}
    </Stagger>
  );
}
