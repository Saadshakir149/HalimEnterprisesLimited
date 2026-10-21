import { CallbackForm } from "@/components/forms/CallbackForm";
import { BookingEmbed } from "@/components/sections/BookingEmbed";
import { Button } from "@/components/ui/Button";
import { DevWarning } from "@/components/ui/DevWarning";
import { EmailLine } from "@/components/ui/EmailLine";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/content/navigation";
import { consultationPage as copy } from "@/content/pages";
import { features, isPlaceholder, site } from "@/content/site";
import { getBooking, integrationIssues, type Booking } from "@/lib/integrations";
import { fill } from "@/lib/template";
import { whatsappHref } from "@/lib/whatsapp";

const boxClass = "flex flex-col gap-6 rounded-md border border-navy bg-paper p-6 sm:p-8";

/** The written alternatives: WhatsApp (if configured) and the business email (if set). Renders nothing if neither is available. */
function WriteOptions({ whatsapp }: { whatsapp: string | null }) {
  const email = isPlaceholder(site.email) ? null : site.email;
  if (!whatsapp && !email) return null;
  return (
    <div className="flex flex-col gap-3 border-t border-line pt-5">
      {whatsapp && (
        <>
          <p className="text-small text-muted">{copy.whatsappIntro}</p>
          <Button href={whatsapp} external variant="secondary" className="w-full">
            <Icon name="message-circle" size={20} />
            {copy.whatsappCta}
          </Button>
        </>
      )}
      <EmailLine prefix={copy.emailIntro} />
    </div>
  );
}

/** features.booking on, with a valid provider URL */
function OnlineBooking({ booking, whatsapp }: { booking: Booking; whatsapp: string | null }) {
  const provider = { provider: booking.providerName };
  return (
    <aside aria-labelledby="booking-title" className={boxClass} data-hide-whatsapp="">
      <div className="flex flex-col gap-2">
        <Heading level={2} size="h3" id="booking-title">
          {copy.online.title}
        </Heading>
        <p className="text-body text-muted">{copy.online.text}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button href={booking.url} external size="lg" className="w-full">
          <Icon name="calendar" size={20} />
          {copy.online.cta}
        </Button>
        <p className="text-small text-muted">{fill(copy.online.handledBy, provider)}</p>
      </div>
      <BookingEmbed
        embedUrl={booking.embedUrl}
        title={fill(copy.online.embedTitle, provider)}
        intro={copy.online.embedIntro}
        notice={{ ...copy.online.embedNotice, before: fill(copy.online.embedNotice.before, provider) }}
        cookiePolicyHref={site.policies.cookies}
        cta={copy.online.embedCta}
      />
      {(features.callback || whatsapp) && (
        <div className="flex flex-col gap-3 border-t border-line pt-5">
          <p className="text-small font-semibold text-ink">{copy.online.fallbackTitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {features.callback && (
              <Button href={`${routes.contact}#callback`} variant="secondary">
                <Icon name="phone" size={18} />
                {copy.online.fallbackCallback}
              </Button>
            )}
            {whatsapp && (
              <Button href={whatsapp} external variant="ghost">
                <Icon name="message-circle" size={18} />
                {copy.whatsappCta}
              </Button>
            )}
          </div>
          <EmailLine prefix={copy.emailIntro} />
        </div>
      )}
    </aside>
  );
}

/**
 * How visitors arrange their consultation on /book-consultation.
 * - Booking on and valid: "Choose a time" (new tab) and an optional
 *   click-to-load calendar, with callback and WhatsApp as fallbacks.
 * - Otherwise: the callback form from iteration 7, plus WhatsApp. The floating
 *   WhatsApp button hides over it so it never covers the submit button.
 */
export function BookingPanel() {
  const booking = getBooking();
  const whatsapp = whatsappHref("consultation");
  const issue = integrationIssues.booking();

  if (booking) return <OnlineBooking booking={booking} whatsapp={whatsapp} />;

  return (
    <aside aria-labelledby="booking-title" className={boxClass} data-hide-whatsapp="">
      <div className="flex flex-col gap-2">
        <Heading level={2} size="h3" id="booking-title">
          {copy.bookingTitle}
        </Heading>
        <p className="text-body text-muted">{features.callback ? copy.bookingText : copy.bookingTextNoForm}</p>
      </div>
      {issue && <DevWarning>{issue}. Showing the fallback.</DevWarning>}
      {features.callback ? (
        <CallbackForm whatsapp={whatsapp} idPrefix="consultation" />
      ) : (
        <Button href={routes.contact} className="w-full">
          {copy.contactLink}
        </Button>
      )}
      <WriteOptions whatsapp={whatsapp} />
    </aside>
  );
}
