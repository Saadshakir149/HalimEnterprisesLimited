import Link from "next/link";
import { Suspense } from "react";
import { DesktopNav, DesktopNavWithPath, type NavPanel } from "@/components/layout/DesktopNav";
import { MobileNav, MobileNavWithPath } from "@/components/layout/MobileNav";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  audienceNav,
  consultationCta,
  routes,
  serviceNav,
  type NavLink,
} from "@/content/navigation";
import { isDev } from "@/lib/env";
import { whatsappDisplay, whatsappHref } from "@/lib/whatsapp";

const panels: NavPanel[] = [
  { id: "services", label: "Services", href: routes.services, allLabel: "All services", items: serviceNav },
  { id: "audiences", label: "Who we help", href: routes.audiences, allLabel: "Everyone we help", items: audienceNav },
];

const links: NavLink[] = [
  { href: routes.about, label: "About" },
  { href: routes.contact, label: "Contact" },
];

export function Header() {
  const href = whatsappHref();
  const display = whatsappDisplay();
  const whatsapp = href && display ? { href, display } : null;
  const mobileProps = { panels, links, cta: consultationCta, whatsapp, devWhatsAppNote: isDev && !whatsapp };

  return (
    <StickyHeader>
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        {/* Name comes from the wordmark itself, so it matches the visible text (WCAG 2.5.3 Label in Name) */}
        <Link href="/" className="shrink-0 rounded-sm">
          <Wordmark className="h-9 sm:h-10" />
          <span className="sr-only">, home</span>
        </Link>

        {/* usePathname suspends on unknown slugs; the fallback is the same nav without active states */}
        <Suspense fallback={<DesktopNav pathname={null} panels={panels} links={links} />}>
          <DesktopNavWithPath panels={panels} links={links} />
        </Suspense>

        <div className="flex items-center gap-3">
          <Button href={consultationCta.href} className="hidden sm:inline-flex">
            {consultationCta.label}
          </Button>
          <Suspense fallback={<MobileNav pathname={null} {...mobileProps} />}>
            <MobileNavWithPath {...mobileProps} />
          </Suspense>
        </div>
      </Container>
    </StickyHeader>
  );
}
