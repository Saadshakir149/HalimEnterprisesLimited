import { Button } from "@/components/ui/Button";
import { EmailLine } from "@/components/ui/EmailLine";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/content/navigation";
import { quoteBox } from "@/content/pages";
import { features } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

type QuoteBoxProps = {
  /** Used in the prefilled WhatsApp message */
  topic: string;
  /** Pre-selects the service on the contact form */
  serviceSlug?: string;
};

/**
 * A calm "Get a quote" box: one primary action and two quieter alternatives.
 * Sticky beside the content on desktop, inline on mobile. Only enabled
 * channels are shown, so there are never dead buttons. The consultation page
 * always works: it offers online booking or, while that is off, the callback form.
 */
export function QuoteBox({ topic, serviceSlug }: QuoteBoxProps) {
  const whatsapp = whatsappHref({ topic });
  const callbackHref = serviceSlug ? `${routes.contact}?service=${serviceSlug}#callback` : `${routes.contact}#callback`;

  return (
    <aside
      aria-labelledby="quote-title"
      className="flex flex-col gap-5 rounded-md border border-line bg-paper p-6 sm:p-8"
      data-hide-whatsapp=""
    >
      <div className="flex flex-col gap-2">
        <Heading level={2} size="h4" id="quote-title">
          {quoteBox.title}
        </Heading>
        <p className="text-small text-muted">{quoteBox.text}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button href={routes.consultation} className="w-full">
          {quoteBox.consultation}
          <Icon name="arrow-right" size={18} className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
        </Button>
        {features.callback && (
          <Button href={callbackHref} variant="secondary" className="w-full">
            <Icon name="phone" size={18} />
            {quoteBox.callback}
          </Button>
        )}
        {whatsapp && (
          <Button href={whatsapp} external variant="ghost" className="w-full">
            <Icon name="message-circle" size={18} />
            {quoteBox.whatsapp}
          </Button>
        )}
      </div>
      <EmailLine prefix={quoteBox.email} className="border-t border-line pt-4 text-center" />
    </aside>
  );
}
