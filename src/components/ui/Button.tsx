import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-dark" | "outline-on-dark";
export type ButtonSize = "md" | "lg";

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsLink = StyleProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof StyleProps> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
    external?: false;
  };

/** A link that leaves the site: opens in a new tab and is signposted as doing so */
type ButtonAsExternal = StyleProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof StyleProps | "href" | "target" | "rel"> & {
    href: string;
    external: true;
  };

type ButtonAsButton = StyleProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps> & {
    href?: undefined;
    external?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsExternal | ButtonAsButton;

/* Labels stay on one line from 640px; below that they may wrap, so long labels never push a 320px screen sideways (WCAG 1.4.10 Reflow) */
const base =
  // group/btn lets an icon inside respond to the button's hover (e.g. an arrow nudging forward)
  "group/btn inline-flex items-center justify-center gap-2 rounded-md border font-semibold whitespace-nowrap max-sm:whitespace-normal max-sm:text-center select-none " +
  "transition-[color,background-color,border-color,text-decoration-color,translate] duration-150 ease-out " +
  "active:translate-y-px " +
  "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-muted disabled:active:translate-y-0";

/* Every hover state has a matching pressed (active) state; focus uses the global ring */
const variants: Record<ButtonVariant, string> = {
  primary:
    "border-navy bg-navy text-on-navy hover:border-navy-hover hover:bg-navy-hover active:border-ink active:bg-ink",
  secondary: "border-navy bg-transparent text-navy hover:bg-navy/6 active:bg-navy/12",
  ghost:
    "border-transparent bg-transparent text-teal underline decoration-transparent underline-offset-4 " +
    "hover:text-teal-hover hover:decoration-current active:text-navy",
  "on-dark":
    "border-on-navy bg-on-navy text-navy hover:border-surface hover:bg-surface active:border-line active:bg-line",
  "outline-on-dark":
    "border-on-navy-muted bg-transparent text-on-navy hover:border-on-navy hover:bg-on-navy/10 active:bg-on-navy/20",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-small",
  lg: "min-h-13 px-7 text-body",
};

export function buttonClasses({ variant = "primary", size = "md" }: StyleProps = {}): string {
  return cn(
    base,
    variants[variant],
    sizes[size],
    variant === "ghost" && "px-3 disabled:border-transparent disabled:bg-transparent",
  );
}

/**
 * Renders a Next.js link when `href` is given, a new-tab link with an
 * external-link icon when `external` is set, otherwise a native button.
 */
export function Button({ external, ...props }: ButtonProps) {
  if (external) {
    const { variant, size, className, children, ...rest } = props as Omit<ButtonAsExternal, "external">;
    return (
      <a className={cn(buttonClasses({ variant, size }), className)} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <ExternalMark />
      </a>
    );
  }
  if (props.href !== undefined) {
    const { variant, size, className, ...rest } = props as Omit<ButtonAsLink, "external">;
    return <Link className={cn(buttonClasses({ variant, size }), className)} {...rest} />;
  }
  const { variant, size, className, type = "button", ...rest } = props as Omit<ButtonAsButton, "external">;
  return (
    <button type={type} className={cn(buttonClasses({ variant, size }), className)} {...rest} />
  );
}
