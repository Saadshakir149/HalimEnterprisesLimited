import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  padding?: "md" | "lg";
};

/** A bordered object on the page. No shadow by default. */
export function Card({ padding = "md", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-line bg-surface text-ink",
        padding === "md" ? "p-6" : "p-8 sm:p-10",
        className,
      )}
      {...props}
    />
  );
}
