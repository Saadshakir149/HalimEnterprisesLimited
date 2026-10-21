import Link from "next/link";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Container } from "@/components/ui/Container";
import { DevWarning } from "@/components/ui/DevWarning";
import { Divider } from "@/components/ui/Divider";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  audienceNav,
  companyLinks,
  legalLinks,
  routes,
  serviceNav,
  type NavLink,
} from "@/content/navigation";
import { isPlaceholder, legalStatement, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { whatsappDisplay, whatsappHref } from "@/lib/whatsapp";

const columns: { title: string; links: readonly NavLink[] }[] = [
  { title: "Services", links: [...serviceNav, { href: routes.services, label: "All services" }] },
  { title: "Who we help", links: audienceNav },
  { title: "Company", links: companyLinks },
  { title: "Legal", links: legalLinks },
];

const linkClass =
  "inline-flex min-h-6 items-center gap-2 py-1 text-small text-on-navy underline decoration-transparent underline-offset-4 " +
  "transition-[color,text-decoration-color] duration-150 ease-out " +
  "hover:text-teal-on-dark hover:decoration-current focus-visible:text-teal-on-dark focus-visible:decoration-current";

const labelClass = "font-sans text-caption font-semibold tracking-[0.14em] text-teal-on-dark uppercase";

function ContactBlock() {
  const waHref = whatsappHref();
  const waDisplay = whatsappDisplay();
  const email = isPlaceholder(site.email) ? null : site.email;

  /*
   * Missing values render nothing at all: no <li>, icon or label. The dev-only
   * warnings sit outside the list (DevWarning renders nothing in production,
   * so wrapping one in an <li> would leave an empty list item).
   */
  return (
    <div className="flex flex-col gap-3">
      <h2 className={labelClass}>Contact</h2>
      <ul className="flex flex-col gap-1">
        {waHref && waDisplay && (
          <li>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Icon name="message-circle" size={18} className="text-teal-on-dark" />
              WhatsApp {waDisplay}
              <ExternalMark size={14} />
            </a>
          </li>
        )}
        {email && (
          <li>
            <a href={`mailto:${email}`} className={cn(linkClass, "break-all")}>
              <Icon name="mail" size={18} className="text-teal-on-dark" />
              {email}
            </a>
          </li>
        )}
        <li className="flex items-start gap-2 py-1 text-small text-on-navy-muted">
          <Icon name="video" size={18} className="mt-0.5 text-teal-on-dark" />
          <span className="text-balance">Consultations by phone or video across the UK</span>
        </li>
      </ul>
      {!(waHref && waDisplay) && <DevWarning>WhatsApp number missing</DevWarning>}
      {!email && <DevWarning>Email address missing</DevWarning>}
    </div>
  );
}

export function Footer() {
  const ico = isPlaceholder(site.icoNumber) ? null : site.icoNumber;

  return (
    <footer
      data-tone="navy"
      className="border-t border-on-navy-line bg-navy pt-section-sm pb-28 text-on-navy lg:pb-12"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Link href="/" className="w-fit rounded-sm">
                <Wordmark tone="dark" className="h-11" />
                <span className="sr-only">, home</span>
              </Link>
              <p className="max-w-xs text-small text-on-navy-muted">
                Bookkeeping, VAT and accounting support for UK small businesses and individuals.
              </p>
            </div>
            <ContactBlock />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h2 className={labelClass}>{column.title}</h2>
                <ul className="flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Divider className="mt-12" />

        <div className="mt-8 flex max-w-3xl flex-col gap-2 text-caption text-on-navy-muted">
          <p>{legalStatement()}</p>
          {ico ? (
            <p>Registered with the Information Commissioner’s Office, registration number {ico}.</p>
          ) : (
            <DevWarning>ICO registration number missing, so the ICO line is hidden</DevWarning>
          )}
          {!isPlaceholder(site.amlSupervision) && <p>{site.amlSupervision}</p>}
          <p>
            © <CopyrightYear /> {site.legalName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
