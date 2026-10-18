"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky header shell. Adds a hairline and a soft shadow once the page has scrolled by setting a
 * data attribute directly, so scrolling never re-renders the header.
 */
export function StickyHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.dataset.scrolled = window.scrollY > 4 ? "true" : "false";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      ref={ref}
      // Once scrolled: slightly translucent with a light blur, a hairline and a soft shadow (still 4.5:1+ for nav text over any content)
      className="sticky top-0 z-40 border-b border-transparent bg-paper transition-[border-color,box-shadow,background-color] duration-200 ease-out data-[scrolled=true]:border-line data-[scrolled=true]:bg-paper/92 data-[scrolled=true]:shadow-sm data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
