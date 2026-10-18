import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type DetailLayoutProps = {
  /** The opening blocks, shown before the quote box on mobile */
  lead: ReactNode;
  /** The quote box: a sticky sidebar from 1024px, inline between the two halves below that */
  aside: ReactNode;
  /** The remaining blocks */
  rest: ReactNode;
};

/**
 * Two-column guide layout for service and audience pages. On desktop the
 * sidebar spans both rows and sticks; on mobile it sits inline after the
 * opening blocks, where a reader deciding what to do next will meet it.
 */
export function DetailLayout({ lead, aside, rest }: DetailLayoutProps) {
  return (
    <Section tone="surface">
      <Container className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-12 lg:col-span-8 lg:col-start-1 lg:row-start-1">{lead}</div>
        <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-28">{aside}</div>
        </div>
        <div className="flex min-w-0 flex-col gap-12 border-t border-line pt-12 lg:col-span-8 lg:col-start-1 lg:row-start-2">
          {rest}
        </div>
      </Container>
    </Section>
  );
}
