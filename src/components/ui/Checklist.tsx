import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type ChecklistProps = {
  items: readonly string[];
  /** "check" for what's included; "document" for things to gather; "point" for neutral points */
  variant?: "check" | "document" | "point";
  columns?: 1 | 2;
  className?: string;
};

const icons: Record<"check" | "document", IconName> = {
  check: "check",
  document: "file-text",
};

/** A hairline-ruled list with a leading icon on each item. */
export function Checklist({ items, variant = "check", columns = 1, className }: ChecklistProps) {
  return (
    <ul
      className={cn(
        "grid border-t border-line",
        columns === 2 && "sm:grid-cols-2 sm:gap-x-8",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 border-b border-line py-3.5 text-body text-ink">
          {variant === "point" ? (
            <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-[1px] bg-teal" />
          ) : (
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm",
                variant === "check" ? "bg-teal-soft text-teal-hover" : "border border-line text-teal",
              )}
            >
              <Icon name={icons[variant]} size={16} />
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
