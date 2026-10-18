"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type AudienceTab = {
  slug: string;
  title: string;
  icon: IconName;
  /** The situation the visitor recognises */
  problem: string;
  intro: string;
  services: { href: string; title: string; why: string }[];
  href: string;
};

type AudienceTabsProps = {
  tabs: AudienceTab[];
  labels: { tablist: string; helpTitle: string; more: string; consultation: string; consultationHref: string };
};

/**
 * WAI-ARIA tabs: the selected tab is the only one in the Tab order; Left,
 * Right, Home and End move between tabs and select them. Every panel is in
 * the HTML; unselected ones carry `hidden`. Every audience also has its own
 * page, linked from each panel and from the navigation.
 */
export function AudienceTabs({ tabs, labels }: AudienceTabsProps) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(selected + 1),
      ArrowDown: () => select(selected + 1),
      ArrowLeft: () => select(selected - 1),
      ArrowUp: () => select(selected - 1),
      Home: () => select(0),
      End: () => select(tabs.length - 1),
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div role="tablist" aria-label={labels.tablist} aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-2 lg:col-span-4">
        {tabs.map((tab, index) => {
          const active = index === selected;
          return (
            <button
              key={tab.slug}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`audience-tab-${tab.slug}`}
              aria-selected={active}
              aria-controls={`audience-panel-${tab.slug}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(index)}
              className={cn(
                "group flex min-h-14 w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-body font-semibold transition-[background-color,border-color,color] duration-200 ease-out",
                active ? "border-navy bg-navy text-on-navy" : "border-line bg-surface text-navy hover:border-line-strong hover:bg-paper",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                  active ? "bg-on-navy/10 text-teal-on-dark" : "bg-teal-soft text-teal-hover",
                )}
              >
                <Icon name={tab.icon} size={18} />
              </span>
              <span className="flex-1">{tab.title}</span>
              <Icon name="chevron-right" size={18} className={cn("transition-transform duration-200", active ? "translate-x-0.5 text-teal-on-dark" : "text-muted")} />
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.slug}
          role="tabpanel"
          id={`audience-panel-${tab.slug}`}
          aria-labelledby={`audience-tab-${tab.slug}`}
          hidden={index !== selected}
          tabIndex={0}
          className="rounded-lg border border-line bg-surface p-6 sm:p-10 lg:col-span-8"
        >
          <div className="flex flex-col gap-6">
            <p className="max-w-[28ch] font-serif text-h2 text-navy">{tab.problem}</p>
            <p className="max-w-measure text-body text-ink">{tab.intro}</p>
            <div className="flex flex-col gap-3 border-t border-line pt-6">
              <h3 className="font-sans text-caption font-semibold tracking-[0.14em] text-teal uppercase">{labels.helpTitle}</h3>
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {tab.services.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className="group/s flex flex-col gap-1">
                      <span className="flex items-center gap-2 font-semibold text-navy underline-offset-4 group-hover/s:underline group-focus-visible/s:underline">
                        {service.title}
                        <Icon name="arrow-right" size={16} className="text-teal transition-transform duration-150 group-hover/s:translate-x-1 group-focus-visible/s:translate-x-1" />
                      </span>
                      <span className="text-small text-muted">{service.why}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={labels.consultationHref}>
                {labels.consultation}
                <Icon name="arrow-right" size={18} className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
              </Button>
              <Button href={tab.href} variant="ghost">
                {/* Lower-case only the first letter, so "eCommerce sellers" keeps its casing */}
                {labels.more.replace("{audience}", tab.title.charAt(0).toLowerCase() + tab.title.slice(1))}
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
