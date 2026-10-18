"use client";

import { useEffect, useRef } from "react";

/**
 * Lights up elements matching `selector` (inside this component's parent) with
 * a soft glow that follows the pointer, via the `spotlight` utility in
 * globals.css. It only sets three CSS variables per element (--px, --py,
 * --spot), batched to one update per frame, and only while a mouse or pen
 * moves over the parent. Touch, reduced motion and no JavaScript: no glow.
 */
export function CursorSpotlight({ selector }: { selector: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const targets = [...host.querySelectorAll<HTMLElement>(selector)];
    let raf = 0;
    let point: { x: number; y: number } | null = null;

    const apply = () => {
      raf = 0;
      for (const el of targets) {
        if (!point) {
          el.style.setProperty("--spot", "0");
          continue;
        }
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", `${point.x - r.left}px`);
        el.style.setProperty("--py", `${point.y - r.top}px`);
        el.style.setProperty("--spot", "1");
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      point = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      point = null;
      schedule();
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [selector]);

  return <span ref={ref} hidden />;
}
