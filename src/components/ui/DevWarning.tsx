import type { ReactNode } from "react";
import { isDev } from "@/lib/env";
import { cn } from "@/lib/utils";

/**
 * A loud chip that flags missing information during development.
 * Renders nothing in production, so it can never reach visitors.
 */
export function DevWarning({ children, className }: { children: ReactNode; className?: string }) {
  if (!isDev) return null;
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-sm border border-dashed border-danger bg-danger-soft px-2 py-0.5 text-caption font-semibold text-danger",
        className,
      )}
    >
      Dev only: {children}
    </span>
  );
}
