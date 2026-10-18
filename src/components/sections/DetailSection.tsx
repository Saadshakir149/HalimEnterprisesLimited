import type { ReactNode } from "react";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

type DetailSectionProps = {
  id: string;
  title: string;
  /** The first block on the page has no rule above it */
  first?: boolean;
  children: ReactNode;
};

/** One hairline-separated block of a detail page, with its own h2. */
export function DetailSection({ id, title, first = false, children }: DetailSectionProps) {
  return (
    <section aria-labelledby={id} className={cn("flex flex-col gap-6", !first && "border-t border-line pt-10")}>
      <Heading level={2} size="h3" id={id}>
        {title}
      </Heading>
      {children}
    </section>
  );
}
