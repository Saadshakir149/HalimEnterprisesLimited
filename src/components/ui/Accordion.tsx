import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

/**
 * Accordion built on native <details>/<summary>: keyboard and screen-reader
 * support come from the browser, it works without JavaScript, and the
 * browser's find-in-page can open matching panels.
 */
export function Accordion({ items, className }: { items: readonly AccordionItem[]; className?: string }) {
  return (
    // data-accordion enables the height/opacity transition in globals.css where supported
    <div data-accordion="" className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group border-b border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-body font-semibold text-navy transition-colors duration-150 hover:text-teal focus-visible:text-teal [&::-webkit-details-marker]:hidden">
            {item.title}
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-teal transition-[rotate,border-color] duration-200 ease-out group-open:rotate-45 group-hover:border-teal"
            >
              <Icon name="plus" size={18} />
            </span>
          </summary>
          <div className="flex max-w-measure flex-col gap-3 pb-6 text-ink">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
