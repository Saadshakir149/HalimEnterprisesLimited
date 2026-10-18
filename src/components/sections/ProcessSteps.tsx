import { Stagger } from "@/components/motion/Stagger";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ProcessStep } from "@/content/services";

/** A numbered, vertical process with a ledger-style rule joining the steps. */
export function ProcessSteps({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <Stagger as="ol" interval={0.12} className="flex flex-col">
      {steps.map((step, index) => (
        <li key={step.title} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0">
          {/* The connecting rule, stopping at the last step */}
          {index < steps.length - 1 && (
            <span aria-hidden="true" className="absolute top-12 bottom-0 left-6 w-px bg-line" />
          )}
          <span
            aria-hidden="true"
            className="figures flex size-12 items-center justify-center rounded-full border border-navy bg-surface font-serif text-h4 text-navy"
          >
            {index + 1}
          </span>
          <div className="flex flex-col gap-1.5 pt-2.5">
            <Heading level={3} size="h4">
              <span className="sr-only">Step {index + 1}: </span>
              {step.title}
            </Heading>
            <Text muted>{step.text}</Text>
          </div>
        </li>
      ))}
    </Stagger>
  );
}
