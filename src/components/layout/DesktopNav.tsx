"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import type { NavEntry, NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

export type NavPanel = {
  id: "services" | "audiences";
  label: string;
  href: string;
  allLabel: string;
  items: readonly NavEntry[];
};

type DesktopNavProps = {
  pathname: string | null;
  panels: readonly NavPanel[];
  links: readonly NavLink[];
};

export function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* data-nav-item (globals.css) adds the teal bar that grows in on hover, focus and the current page */
const itemClass =
  "inline-flex min-h-11 items-center gap-1.5 rounded-sm px-3 text-small font-semibold text-ink " +
  "transition-colors duration-150 hover:text-teal " +
  "focus-visible:text-teal active:text-teal-hover aria-expanded:text-teal";

/**
 * Desktop navigation (1024px and up). Services and Who we help are disclosure
 * panels: they open on click, close on Escape (returning focus to the trigger),
 * on an outside click, when focus leaves them, and after a link is chosen.
 */
export function DesktopNav({ pathname, panels, links }: DesktopNavProps) {
  const [openId, setOpenId] = useState<NavPanel["id"] | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef(new Map<NavPanel["id"], HTMLButtonElement>());

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenId(null);
  }

  useEffect(() => {
    if (!openId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenId(null);
      triggers.current.get(openId)?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openId]);

  const closeOnLink = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) setOpenId(null);
  };

  return (
    <nav ref={navRef} aria-label="Main" className="relative hidden self-stretch lg:flex">
      <ul className="flex items-center gap-1">
        {panels.map((panel) => {
          const open = openId === panel.id;
          const panelId = `nav-panel-${panel.id}`;
          return (
            <li
              key={panel.id}
              onBlur={(event) => {
                const next = event.relatedTarget as Node | null;
                if (next && !event.currentTarget.contains(next)) {
                  setOpenId((current) => (current === panel.id ? null : current));
                }
              }}
            >
              <button
                ref={(el) => {
                  if (el) triggers.current.set(panel.id, el);
                }}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : panel.id)}
                data-nav-item=""
                data-current={isActive(pathname, panel.href) ? "" : undefined}
                className={cn(itemClass, isActive(pathname, panel.href) && "text-navy")}
              >
                {panel.label}
                <Icon
                  name="chevron-down"
                  size={16}
                  className={cn("transition-transform duration-150", open && "rotate-180")}
                />
              </button>
              <div
                id={panelId}
                hidden={!open}
                data-nav-panel=""
                onClick={closeOnLink}
                className="absolute top-full left-0 w-[min(44rem,calc(100vw-2*var(--spacing-gutter)))] rounded-b-md border border-line bg-surface p-4 shadow-sm"
              >
                <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line">
                  {panel.items.map((item) => (
                    <li key={item.href} className="bg-surface odd:last:col-span-2">
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="group flex h-full items-start gap-3 p-4 transition-colors duration-150 hover:bg-paper focus-visible:bg-paper aria-[current=page]:bg-teal-soft"
                      >
                        <Icon name={item.icon} size={20} className="mt-0.5 text-teal" />
                        <span className="flex flex-col gap-0.5">
                          <span className="text-small font-semibold text-navy underline-offset-4 group-hover:underline group-focus-visible:underline">
                            {item.label}
                          </span>
                          <span className="text-caption text-muted">{item.tagline}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={panel.href}
                  aria-current={pathname === panel.href ? "page" : undefined}
                  className="group/all mt-3 inline-flex min-h-11 items-center gap-2 px-1 text-small font-semibold text-teal underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-teal-hover hover:decoration-current focus-visible:text-teal-hover focus-visible:decoration-current"
                >
                  {panel.allLabel}
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-150 ease-out group-hover/all:translate-x-1 group-focus-visible/all:translate-x-1"
                  />
                </Link>
              </div>
            </li>
          );
        })}
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              data-nav-item=""
              className={cn(itemClass, "aria-[current=page]:text-navy")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Reads the current path. Must sit inside <Suspense> (see Header). */
export function DesktopNavWithPath(props: Omit<DesktopNavProps, "pathname">) {
  return <DesktopNav {...props} pathname={usePathname()} />;
}
