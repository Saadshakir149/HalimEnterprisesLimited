"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Hides the floating WhatsApp button while any element marked
 * `data-hide-whatsapp` is on screen (the final call-to-action band, and forms
 * later), so it never sits on top of their buttons. It sets
 * `data-hide-whatsapp` on <html>; WhatsAppButton reacts to that in CSS.
 * It also sets `data-wa-expanded` once the first section has scrolled away,
 * which widens the button into a labelled pill from 640px.
 */
export function WhatsAppAutoHide() {
  const pathname = usePathname();

  // Expand the button into a labelled pill once the page's first section has scrolled away
  useEffect(() => {
    const root = document.documentElement;
    // The first *visible* section: Next keeps the previous page mounted but hidden
    const first = [...document.querySelectorAll("main > section, main > div > section")].find((el) => el.checkVisibility());
    if (!first) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) delete root.dataset.waExpanded;
      else root.dataset.waExpanded = "true";
    });
    observer.observe(first);
    return () => {
      observer.disconnect();
      delete root.dataset.waExpanded;
    };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll("[data-hide-whatsapp]");
    if (targets.length === 0) return;

    // data-hide-whatsapp="below-lg" only applies under 1024px, where the floating button would sit on full-width buttons
    const narrow = window.matchMedia("(max-width: 1023.98px)");
    const applies = (el: Element) => el.getAttribute("data-hide-whatsapp") !== "below-lg" || narrow.matches;

    const visible = new Set<Element>();
    const update = () => {
      if ([...visible].some(applies)) root.dataset.hideWhatsapp = "true";
      else delete root.dataset.hideWhatsapp;
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      update();
    });
    targets.forEach((target) => observer.observe(target));
    narrow.addEventListener("change", update);

    return () => {
      observer.disconnect();
      narrow.removeEventListener("change", update);
      delete root.dataset.hideWhatsapp;
    };
  }, [pathname]);

  return null;
}
