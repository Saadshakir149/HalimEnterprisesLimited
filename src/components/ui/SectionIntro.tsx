import type { ReactNode } from "react";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Lead } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  /** id for the h2, so the section can be labelled with aria-labelledby */
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  children?: ReactNode;
};

/** Eyebrow, h2 and optional lead that open a page section. */
export function SectionIntro({ id, eyebrow, title, lead, className, children }: SectionIntroProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading level={2} id={id}>
        {title}
      </Heading>
      {lead && <Lead>{lead}</Lead>}
      {children}
    </div>
  );
}
