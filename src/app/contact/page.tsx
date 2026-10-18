import Link from "next/link";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { DetailHero } from "@/components/sections/DetailHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { DevWarning } from "@/components/ui/DevWarning";
import { Heading } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { routes } from "@/content/navigation";
import { contactPage as copy } from "@/content/pages";
import { confirmedServices } from "@/content/services";
import { features, isPlaceholder, site } from "@/content/site";
import { fill } from "@/lib/template";
import { cn } from "@/lib/utils";
import { whatsappDisplay, whatsappHref } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: routes.contact });

type Alternative = {
  icon: IconName;
  title: string;
  text: string;
  detail?: string;
  action: { href: string; label: string; external?: boolean };
};

/** A secondary contact option: quieter than the primary card */
function AlternativeCard({ option }: { option: Alternative }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line text-teal">
          <Icon name={option.icon} size={20} />
        </span>
        <div className="flex flex-col gap-1">
          <Heading level={3} size="h4">
            {option.title}
          </Heading>
          <Text size="small" muted>
            {option.text}
          </Text>
          {option.detail && <p className="figures text-small font-semibold text-ink">{option.detail}</p>}
        </div>
      </div>
      {option.action.external ? (
        <Button href={option.action.href} external variant="secondary" className="w-full sm:w-fit">
          {option.action.label}
        </Button>
      ) : (
        <Button href={option.action.href} variant="secondary" className="w-full sm:w-fit">
          {option.action.label}
        </Button>
      )}
    </Card>
  );
}

/* Only slugs and titles reach the browser, not the service page copy */
const serviceOptions = confirmedServices.map(({ slug, title }) => ({ slug, title }));

export default function ContactPage() {
  const whatsapp = whatsappHref();
  const whatsappNumber = whatsappDisplay();
  const email = isPlaceholder(site.email) ? null : site.email;

  const alternatives: Alternative[] = [
    ...(features.callback
      ? [{ icon: "phone" as const, title: copy.callback.title, text: copy.callback.text, action: { href: "#callback", label: copy.callback.cta } }]
      : []),
    ...(whatsapp && whatsappNumber
      ? [
          {
            icon: "message-circle" as const,
            title: copy.whatsapp.title,
            text: copy.whatsapp.text,
            detail: whatsappNumber,
            action: { href: whatsapp, label: copy.whatsapp.cta, external: true },
          },
        ]
      : []),
    ...(email
      ? [{ icon: "mail" as const, title: copy.email.title, text: copy.email.text, detail: email, action: { href: `mailto:${email}`, label: copy.email.cta } }]
      : []),
  ];

  return (
    <>
      <DetailHero
        crumbs={[
          { name: "Home", href: routes.home },
          { name: "Contact", href: routes.contact },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />

      <Section tone="surface" aria-label="Ways to contact us">
        <Container className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* One obvious primary action */}
          <Card padding="lg" className="flex flex-col gap-6 border-navy lg:col-span-7">
            <span className="flex size-12 items-center justify-center rounded-md bg-navy text-on-navy">
              <Icon name="video" size={24} />
            </span>
            <div className="flex flex-col gap-3">
              <Heading level={2}>{copy.primary.title}</Heading>
              <Text className="max-w-measure text-lead">{copy.primary.text}</Text>
            </div>
            <Button href={routes.consultation} size="lg" className="w-full sm:w-fit">
              {copy.primary.cta}
              <Icon name="arrow-right" size={20} className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
            </Button>
            {/* Only once the client has confirmed a reply-time commitment */}
            {site.responseTime && (
              <p className="flex items-center gap-2 border-t border-line pt-5 text-small text-muted">
                <Icon name="clock" size={18} className="text-teal" />
                {fill(copy.responseTime, { time: site.responseTime })}
              </p>
            )}
          </Card>

          <div className="flex flex-col gap-4 lg:col-span-5">
            {alternatives.map((option) => (
              <AlternativeCard key={option.title} option={option} />
            ))}
            {!email && <DevWarning>Email card hidden: business email not confirmed</DevWarning>}
            <p className="text-small text-muted">
              {copy.documents.prefix}
              <Link href={routes.documents} className="link-body">
                {copy.documents.link}
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" aria-label="Forms">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          {/* data-hide-whatsapp: the floating button never covers a submit button */}
          <section
            id="enquiry"
            aria-labelledby="enquiry-title"
            data-hide-whatsapp=""
            className={cn("flex scroll-mt-28 flex-col gap-6", features.callback ? "lg:col-span-7" : "lg:col-span-8")}
          >
            <div className="flex flex-col gap-3">
              <Heading level={2} size="h3" id="enquiry-title">
                {copy.enquiryTitle}
              </Heading>
              <Text muted className="max-w-measure">
                {copy.enquiryText}
              </Text>
            </div>
            <EnquiryForm services={serviceOptions} whatsapp={whatsapp} />
          </section>
          {features.callback && (
            <section
              id="callback"
              aria-labelledby="callback-title"
              data-hide-whatsapp=""
              className="flex scroll-mt-28 flex-col gap-6 lg:col-span-4 lg:col-start-9"
            >
              <div className="flex flex-col gap-3">
                <Heading level={2} size="h3" id="callback-title">
                  {copy.callbackTitle}
                </Heading>
                <Text muted>{copy.callback.text}</Text>
              </div>
              <CallbackForm services={serviceOptions} whatsapp={whatsapp} />
            </section>
          )}
        </Container>
      </Section>
    </>
  );
}
