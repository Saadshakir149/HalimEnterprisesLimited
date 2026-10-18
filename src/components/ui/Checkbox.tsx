import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type CheckboxFieldProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  id: string;
  label: ReactNode;
  error?: string;
  requiredText?: string;
};

/**
 * A checkbox with its label and error wired together. The whole row is the
 * click target (well over 24×24px), and the error uses colour, an icon and text.
 */
export function CheckboxField({ id, label, error, required, requiredText, className, ...props }: CheckboxFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-sm border border-line-strong accent-navy aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-danger"
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-body text-ink">
          {label}
          {required && requiredText && <span className="ml-1.5 text-small text-muted">{requiredText}</span>}
        </label>
      </div>
      {error && (
        <p id={errorId} className="flex items-start gap-2 text-small font-medium text-danger">
          <Icon name="circle-alert" size={18} className="mt-0.5" />
          <span>
            <span className="sr-only">Error: </span>
            {error}
          </span>
        </p>
      )}
    </div>
  );
}
