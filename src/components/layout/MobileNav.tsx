"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import type { NavLink } from "@/content/navigation";
import { isActive, type NavPanel } from "@/components/layout/DesktopNav";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  pathname: string | null;
  panels: readonly NavPanel[];
  links: readonly NavLink[];
  cta: NavLink;
  /** null while the number is a placeholder */
  whatsapp: { href: string; display: string } | null;
  /** Shown in development only, when WhatsApp is missing */
  devWhatsAppNote: boolean;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Menu for screens below 1024px. A modal <dialog> makes the rest of the page
 * inert and handles Escape; on top of that we keep Tab cycling inside the
 * panel, lock page scroll, hide the WhatsApp button and return focus to the
 * menu button on close.
 */
export function MobileNav({ pathname, panels, links, cta, whatsapp, devWhatsAppNote }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => dialogRef.current?.close();

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    document.documentElement.dataset.menuOpen = "true";
    document.documentElement.style.overflow = "hidden";
  };

  const onClose = () => {
    setOpen(false);
    delete document.documentElement.dataset.menuOpen;
    document.documentElement.style.overflow = "";
    triggerRef.current?.focus();
  };

  // Close if the viewport grows past the breakpoint while the menu is open
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = () => {
      if (query.matches) dialogRef.current?.close();
    };
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
      delete document.documentElement.dataset.menuOpen;
      document.documentElement.style.overflow = "";
    };
  }, []);

  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    // A click on the dialog element itself is a click on the backdrop
    if (event.target === dialogRef.current) close();
    else if ((event.target as HTMLElement).closest("a")) close();
  };

  const linkClass =
    "flex min-h-11 items-center justify-between gap-3 py-2 text-body text-ink transition-colors duration-150 hover:text-teal focus-visible:text-teal active:text-teal-hover aria-[current=page]:font-semibold aria-[current=page]:text-navy";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={openMenu}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong px-3.5 text-small font-semibold text-navy transition-colors duration-150 hover:bg-surface focus-visible:bg-surface active:bg-line lg:hidden"
      >
        <Icon name="menu" size={20} />
        Menu
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        data-mobile-menu=""
        aria-label="Site menu"
        onClose={onClose}
        onKeyDown={trapFocus}
        onClick={onDialogClick}
        className="fixed inset-0 m-0 ml-auto h-dvh max-h-none w-full max-w-none flex-col border-0 border-line bg-paper p-0 text-ink open:flex sm:max-w-md sm:border-l"
      >
        <div className="flex h-18 shrink-0 items-center justify-between gap-4 border-b border-line px-gutter">
          <Link href="/">
            <Wordmark className="h-9" />
            <span className="sr-only">, home</span>
          </Link>
          <button
            type="button"
            onClick={close}
            autoFocus
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong px-3.5 text-small font-semibold text-navy transition-colors duration-150 hover:bg-surface focus-visible:bg-surface active:bg-line"
          >
            <Icon name="x" size={20} />
            Close
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-gutter py-6">
          <div className="flex flex-col gap-8">
            {/* data-menu-group + --i: the groups settle in one after another on open (globals.css) */}
            {panels.map((panel, index) => (
              <div key={panel.id} data-menu-group="" style={{ "--i": index } as CSSProperties}>
                <h2 className="mb-2 font-sans text-caption font-semibold tracking-[0.14em] text-teal uppercase">
                  {panel.label}
                </h2>
                <ul className="divide-y divide-line border-y border-line">
                  {panel.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={linkClass}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={panel.href}
                      aria-current={pathname === panel.href ? "page" : undefined}
                      className={cn(linkClass, "font-semibold text-teal")}
                    >
                      {panel.allLabel}
                      <Icon name="arrow-right" size={18} />
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
            <ul
              data-menu-group=""
              style={{ "--i": panels.length } as CSSProperties}
              className="divide-y divide-line border-y border-line"
            >
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={cn(linkClass, "font-serif text-h4 text-navy")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div
          data-menu-group=""
          style={{ "--i": panels.length + 1 } as CSSProperties}
          className="flex shrink-0 flex-col gap-3 border-t border-line bg-surface px-gutter pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <Button href={cta.href} size="lg" className="w-full">
            {cta.label}
          </Button>
          {whatsapp && (
            <Button href={whatsapp.href} external variant="secondary" size="lg" className="w-full">
              <Icon name="message-circle" size={20} />
              WhatsApp {whatsapp.display}
            </Button>
          )}
          {devWhatsAppNote && (
            <p className="text-center text-caption font-semibold text-danger">
              Dev only: WhatsApp link hidden until the number is confirmed.
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}

/** Reads the current path. Must sit inside <Suspense> (see Header). */
export function MobileNavWithPath(props: Omit<MobileNavProps, "pathname">) {
  return <MobileNav {...props} pathname={usePathname()} />;
}
