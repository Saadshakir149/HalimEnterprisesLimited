import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { NetworkMesh } from "@/components/ui/NetworkMesh";
import { Lead } from "@/components/ui/Text";
import { finalCta, hero } from "@/content/home";
import { routes } from "@/content/navigation";
import { whatsappHref } from "@/lib/whatsapp";

type FinalCtaProps = {
  /** Defaults to the homepage wording in home.ts */
  title?: string;
  text?: string;
};

/**
 * Closing call to action: a contained navy panel with a ledger double rule,
 * rather than another full-width band. The floating WhatsApp button hides
 * while it is on screen (data-hide-whatsapp), since the panel has its own.
 */
export function FinalCta({ title = finalCta.title, text = finalCta.text }: FinalCtaProps) {
  const whatsapp = whatsappHref();

  return (
    <section aria-labelledby="cta-title" data-hide-whatsapp="" className="bg-paper py-section-sm">
      <Container>
        <div data-tone="navy" className="relative overflow-hidden rounded-lg bg-navy px-6 py-12 text-on-navy sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <NetworkMesh className="text-teal-on-dark" base={0.14} />
          {/* The ledger "total" double rule, the wordmark's motif, across the top */}
          <span aria-hidden="true" className="absolute inset-x-6 top-6 flex flex-col gap-1 sm:inset-x-12 lg:inset-x-16">
            <span className="h-px bg-teal-on-dark/60" />
            <span className="h-px bg-teal-on-dark/60" />
          </span>
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="flex flex-col gap-5 lg:col-span-7">
              <Heading level={2} size="h1" id="cta-title" className="max-w-[16ch]">
                {title}
              </Heading>
              <Lead>{text}</Lead>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
              <Button href={routes.consultation} variant="on-dark" size="lg" className="w-full">
                {finalCta.primary}
                <Icon name="arrow-right" size={20} className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
              </Button>
              {whatsapp && (
                <Button href={whatsapp} external variant="outline-on-dark" size="lg" className="w-full">
                  <Icon name="message-circle" size={20} />
                  {finalCta.whatsapp}
                </Button>
              )}
              <ul className="mt-2 flex flex-col gap-2 text-small text-on-navy-muted">
                {hero.reassurance.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Icon name="check" size={16} className="text-teal-on-dark" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
