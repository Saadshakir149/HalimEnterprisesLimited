import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type ControlProps = {
  id: string;
  required?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  /** Receives the id and aria attributes to spread onto the control */
  children: (control: ControlProps) => ReactNode;
};

/**
 * Label, hint and error wired to a single control.
 *
 *   <Field id="email" label="Email" required>
 *     {(control) => <Input type="email" {...control} />}
 *   </Field>
 */
export function Field({ id, label, hint, error, required, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
        {required && <span className="ml-1.5 font-normal text-muted">(required)</span>}
      </label>
      {hint && (
        <p id={hintId} className="-mt-1 text-small text-muted">
          {hint}
        </p>
      )}
      {children({
        id,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
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
