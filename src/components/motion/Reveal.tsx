"use client";

import type { ReactNode } from "react";
import { useOffscreenReveal, type RevealElement } from "@/components/motion/useOffscreenReveal";

type RevealProps = {
  as?: "div" | "ul" | "ol";
  className?: string;
  children: ReactNode;
};

/**
 * Fades and lifts its content 10px into place, once, when it scrolls into
 * view. Server-rendered visible; see useOffscreenReveal for the rules.
 */
export function Reveal({ as: Tag = "div", className, children }: RevealProps) {
  const scope = useOffscreenReveal<RevealElement>(null, 0);
  return (
    <Tag ref={scope} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
