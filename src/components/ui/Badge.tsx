import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "neutral" | "accent" | "navy";
};

const tones = {
  neutral: "border-line-strong text-muted",
  accent: "border-teal-soft bg-teal-soft text-teal-hover",
  navy: "border-navy bg-navy text-on-navy",
} as const;

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-caption font-semibold tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
