import { Icon } from "@/components/ui/Icon";
import { isDev } from "@/lib/env";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/whatsapp";

/*
 * Floating WhatsApp control. A server component: it hides itself in CSS while
 * the mobile menu is open (data-menu-open, set by MobileNav) and while a
 * marked call-to-action is on screen (data-hide-whatsapp, set by
 * WhatsAppAutoHide). From 640px it widens into a labelled pill once the page
 * has scrolled past its first section (data-wa-expanded, also set by
 * WhatsAppAutoHide with an IntersectionObserver, not a scroll listener).
 * The footer carries bottom padding on small screens so this button never
 * covers footer links.
 */
const position =
  "fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 print:hidden " +
  // Fades and shrinks away rather than vanishing; visibility flips at the end, so it also leaves the tab order
  "transition-[background-color,opacity,scale,visibility] duration-200 ease-out " +
  "in-data-menu-open:pointer-events-none in-data-menu-open:invisible in-data-menu-open:scale-90 in-data-menu-open:opacity-0 " +
  "in-data-hide-whatsapp:pointer-events-none in-data-hide-whatsapp:invisible in-data-hide-whatsapp:scale-90 in-data-hide-whatsapp:opacity-0";

export function WhatsAppButton() {
  const href = whatsappHref();

  if (!href) {
    if (!isDev) return null;
    // Development stand-in, so placement can be reviewed before the number is confirmed
    return (
      <span
        className={cn(
          position,
          "flex size-14 items-center justify-center rounded-full border-2 border-dashed border-danger bg-danger-soft text-danger",
        )}
        title="Dev only: WhatsApp number missing"
      >
        <Icon name="message-circle" size={26} />
        <span className="sr-only">Dev only: WhatsApp number missing</span>
      </span>
    );
  }

  // Its own small landmark, so screen reader users moving by landmarks can find it (it sits outside <main>)
  return (
    <aside aria-label="WhatsApp">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          position,
          // The button itself is always a 56px circle, so expanding never moves it (no layout shift).
          // The paper border keeps it distinct over navy (teal on navy alone is 2.87:1).
          "group/wa flex size-14 items-center justify-center rounded-full border-2 border-paper bg-teal text-on-navy shadow-md hover:bg-teal-hover active:scale-95",
        )}
      >
        {/*
          The label slides out from behind the circle as its own layer (opacity and transform only, which
          never count as layout shift). It is always in the link, so the accessible name never changes;
          below 640px it is visually hidden and the button stays a circle.
        */}
        <span
          className={cn(
            "max-sm:sr-only",
            "sm:pointer-events-none sm:absolute sm:top-[-2px] sm:right-[calc(100%-1.75rem)] sm:-z-10 sm:flex sm:h-14 sm:items-center sm:rounded-l-full sm:border-2 sm:border-r-0 sm:border-paper sm:bg-teal sm:pr-10 sm:pl-5",
            "sm:text-small sm:font-semibold sm:whitespace-nowrap sm:opacity-0 sm:shadow-md sm:transition-[opacity,translate,background-color] sm:duration-250 sm:ease-out sm:translate-x-4",
            "sm:group-hover/wa:bg-teal-hover sm:in-data-wa-expanded:pointer-events-auto sm:in-data-wa-expanded:translate-x-0 sm:in-data-wa-expanded:opacity-100",
          )}
        >
          Chat with us on WhatsApp
        </span>
        <Icon name="message-circle" size={26} />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </aside>
  );
}
