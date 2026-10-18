"use client";

import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** The wrappers render a div, ul or ol; a ref typed as all three fits any of them. */
export type RevealElement = HTMLDivElement & HTMLUListElement & HTMLOListElement;

/* Calm and exact: short, ease-out, small distance (CLAUDE.md section 8) */
export const revealEase = [0.22, 1, 0.36, 1] as const;
const DISTANCE = 10; // px
const DURATION = 0.28; // s

/**
 * Reveals content once as it scrolls into view, without ever hiding content
 * that is already on screen or waiting for JavaScript:
 *
 * - The server renders everything fully visible.
 * - After hydration, only content that starts below the viewport is set to
 *   its "before" state. The user cannot see that change.
 * - When it scrolls into view, it fades and lifts into place, once.
 * - With reduced motion, nothing is hidden or animated.
 * - While armed, the scope carries `data-armed`, so CSS-only details inside it
 *   (styled with [data-armed] …) can start from their "before" state too and
 *   play when the attribute is removed.
 *
 * @param targets  null to animate the scope element itself, or a selector
 *                 (resolved inside the scope) such as ":scope > *"
 * @param interval seconds between targets; 0 for no stagger
 */
export function useOffscreenReveal<T extends HTMLElement>(targets: string | null, interval: number) {
  const [scope, animate] = useAnimate<T>();
  const reduceMotion = useReducedMotion();
  const inView = useInView(scope, { once: true, margin: "0px 0px -8% 0px" });
  const armed = useRef(false);

  // Arm: hide only if the element starts below the fold
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const target = targets ?? el;
    if (reduceMotion) {
      if (armed.current) {
        armed.current = false;
        el.removeAttribute("data-armed");
        animate(target, { opacity: 1, y: 0 }, { duration: 0 });
      }
      return;
    }
    if (armed.current || el.getBoundingClientRect().top < window.innerHeight) return;
    armed.current = true;
    el.setAttribute("data-armed", "");
    animate(target, { opacity: 0, y: DISTANCE }, { duration: 0 });
  }, [animate, reduceMotion, scope, targets]);

  // Reveal once in view
  useEffect(() => {
    const el = scope.current;
    if (!inView || !armed.current || !el) return;
    armed.current = false;
    el.removeAttribute("data-armed");
    animate(
      targets ?? el,
      { opacity: 1, y: 0 },
      { duration: DURATION, ease: revealEase, delay: interval > 0 ? stagger(interval) : 0 },
    );
  }, [animate, inView, interval, scope, targets]);

  return scope;
}
