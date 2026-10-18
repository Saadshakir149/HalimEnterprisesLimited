import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "paper" | "surface" | "navy";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  spacing?: "default" | "compact";
};

const tones: Record<SectionTone, string> = {
  paper: "bg-paper",
  surface: "bg-surface",
  navy: "bg-navy text-on-navy",
};

export function Section({ tone = "paper", spacing = "default", className, ...props }: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        tones[tone],
        spacing === "default" ? "py-section" : "py-section-sm",
        className,
      )}
      {...props}
    />
  );
}
