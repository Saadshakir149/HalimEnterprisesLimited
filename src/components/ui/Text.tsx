import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type TextProps = ComponentPropsWithoutRef<"p"> & {
  size?: "body" | "small" | "caption";
  muted?: boolean;
};

const sizes = {
  body: "text-body",
  small: "text-small",
  caption: "text-caption",
} as const;

export function Text({ size = "body", muted = false, className, ...props }: TextProps) {
  return (
    <p
      className={cn(
        sizes[size],
        muted && "text-muted in-data-[tone=navy]:text-on-navy-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "max-w-measure text-lead text-ink in-data-[tone=navy]:text-on-navy-muted",
        className,
      )}
      {...props}
    />
  );
}
