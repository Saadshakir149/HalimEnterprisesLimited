import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  /** Semantic level: decides the element (h1–h6) */
  level: Level;
  /** Visual size: defaults to match the level */
  size?: HeadingSize;
};

const defaultSize: Record<Level, HeadingSize> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h4",
  6: "h4",
};

const sizes: Record<HeadingSize, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(sizes[size ?? defaultSize[level]], className)} {...props} />;
}

/** Small-caps label above a heading. Use only where it adds meaning. */
export function Eyebrow({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-caption font-semibold tracking-[0.14em] text-teal uppercase in-data-[tone=navy]:text-teal-on-dark",
        className,
      )}
      {...props}
    />
  );
}
