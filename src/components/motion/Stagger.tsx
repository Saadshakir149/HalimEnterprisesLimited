"use client";

import type { ReactNode } from "react";
import { useOffscreenReveal, type RevealElement } from "@/components/motion/useOffscreenReveal";

type StaggerProps = {
  /** Renders the list element itself, so the semantics stay with the server markup */
  as?: "div" | "ul" | "ol";
  /** Seconds between children: 0.04–0.06 for lists; longer for a sequence */
  interval?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Reveals each direct child in turn, once, when the group scrolls into view.
 * The children stay server components; only this wrapper runs on the client.
 */
export function Stagger({ as: Tag = "ul", interval = 0.05, className, children }: StaggerProps) {
  const scope = useOffscreenReveal<RevealElement>(":scope > *", interval);
  return (
    <Tag ref={scope} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
