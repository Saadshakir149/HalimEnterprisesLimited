import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Shared look for text inputs, textareas and selects. */
export const controlClasses =
  "w-full rounded-md border border-line-strong bg-surface px-3.5 text-body text-ink " +
  "transition-colors duration-150 ease-out placeholder:text-muted " +
  "hover:border-ink focus:border-teal " +
  "aria-invalid:border-danger aria-invalid:bg-danger-soft/40 " +
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-disabled disabled:text-muted";

export function Input({ className, type = "text", ...props }: ComponentPropsWithoutRef<"input">) {
  return <input type={type} className={cn(controlClasses, "min-h-12 py-2.5", className)} {...props} />;
}

export function Textarea({ className, rows = 5, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea rows={rows} className={cn(controlClasses, "min-h-32 resize-y py-3", className)} {...props} />
  );
}

/** Native select with a consistent chevron. */
export function Select({ className, children, ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(controlClasses, "min-h-12 appearance-none py-2.5 pr-11", className)}
        {...props}
      >
        {children}
      </select>
      <Icon
        name="chevron-down"
        size={18}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
