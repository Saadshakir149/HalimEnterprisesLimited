import { DetailSection } from "@/components/sections/DetailSection";
import { Button } from "@/components/ui/Button";
import { DevWarning } from "@/components/ui/DevWarning";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { documentsPage as copy } from "@/content/pages";
import { getDocumentPortal, integrationIssues } from "@/lib/integrations";
import { fill } from "@/lib/template";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * How clients send documents. We never accept files on this website: when
 * features.documentUpload is on and site.documentPortal is valid, this links
 * out to the client's chosen portal; until then it says a secure upload link
 * follows the consultation. It never suggests email or WhatsApp for documents.
 */
export function SendDocuments() {
  const portal = getDocumentPortal();
  const issue = integrationIssues.documentPortal();
  const whatsapp = whatsappHref("documents");
  const name = { name: portal?.name ?? "" };
  const steps = portal ? copy.steps.portal.map((step) => fill(step, name)) : copy.steps.pending;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-start-1">
        <aside aria-labelledby="documents-how-title" className="flex flex-col gap-5 rounded-md border border-navy bg-paper p-6 sm:p-8">
          <span className="flex size-12 items-center justify-center rounded-md bg-navy text-on-navy">
            <Icon name={portal ? "upload" : "shield-check"} size={24} />
          </span>
          <div className="flex flex-col gap-2">
            <Heading level={2} size="h3" id="documents-how-title">
              {portal ? copy.portal.title : copy.pending.title}
            </Heading>
            <Text muted>{portal ? fill(copy.portal.text, name) : copy.pending.text}</Text>
          </div>
          {portal && (
            <Button href={portal.url} external size="lg" className="w-full">
              {fill(copy.portal.cta, name)}
            </Button>
          )}
          {issue && <DevWarning>{issue}. Showing the “secure link after your consultation” message.</DevWarning>}
        </aside>
      </div>

      <div className="flex min-w-0 flex-col gap-10 lg:col-span-7 lg:row-start-1">
        <DetailSection id="documents-steps" title={copy.stepsTitle} first>
          <ol className="flex flex-col border-t border-line">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4 border-b border-line py-4 text-body text-ink">
                <span
                  aria-hidden="true"
                  className="figures flex size-8 shrink-0 items-center justify-center rounded-full border border-navy font-serif text-navy"
                >
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </DetailSection>

        <section aria-labelledby="documents-dont-title" className="flex gap-4 rounded-md border border-line bg-paper p-6">
          <Icon name="circle-alert" size={24} className="mt-0.5 text-navy" />
          <div className="flex flex-col gap-2">
            <Heading level={2} size="h4" id="documents-dont-title">
              {copy.dontTitle}
            </Heading>
            <Text muted>{copy.dont}</Text>
          </div>
        </section>

        {whatsapp && (
          <div className="flex flex-col gap-3">
            <Text muted>{copy.questions}</Text>
            <Button href={whatsapp} external variant="secondary" className="w-full sm:w-fit">
              <Icon name="message-circle" size={18} />
              {copy.whatsappCta}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
