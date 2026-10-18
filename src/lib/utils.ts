import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge has to be told about our custom token names. Without this,
 * it reads `text-h1` as a colour and silently drops it when combined with
 * `text-navy`. Keep these lists in step with the @theme block in globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "h4", "lead", "body", "small", "caption"],
      spacing: ["gutter", "section", "section-sm"],
      container: ["site", "measure"],
    },
  },
});

/** Joins class names and lets later Tailwind classes override earlier ones. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
