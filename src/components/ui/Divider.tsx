import { cn } from "@/lib/utils";

type DividerProps = {
  /** "double" is the ledger total rule; use it sparingly */
  variant?: "single" | "double";
  className?: string;
};

/** Hairline rule. Decorative, so hidden from assistive technology. */
export function Divider({ variant = "single", className }: DividerProps) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        "border-0 border-t border-line in-data-[tone=navy]:border-on-navy-line",
        variant === "double" && "h-0.75 border-b",
        className,
      )}
    />
  );
}
