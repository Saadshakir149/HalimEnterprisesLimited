import { whatsappMessages } from "@/content/pages";
import { isPlaceholder, site } from "@/content/site";
import { fill } from "@/lib/template";

/*
 * The one place wa.me links are built. https://wa.me/<number>?text=<message>
 * is WhatsApp's documented click-to-chat format: on a phone it opens the app,
 * and on a computer it offers WhatsApp Desktop or falls back to WhatsApp Web.
 * Nothing loads from WhatsApp until the visitor clicks.
 */

/** A fixed message ("general", "consultation", "documents"), or one about a topic */
export type WhatsAppContext = Exclude<keyof typeof whatsappMessages, "topic"> | { topic: string };

/** wa.me wants the full international number, digits only, no "+" or leading zeros */
const WA_NUMBER = /^[1-9]\d{6,14}$/;

/** Builds a wa.me link, or returns null if the number is not in the right format. */
export function buildWhatsAppUrl(number: string, message?: string): string | null {
  if (!WA_NUMBER.test(number)) return null;
  const text = message?.trim();
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function whatsappMessage(context: WhatsAppContext = "general"): string {
  return typeof context === "string" ? whatsappMessages[context] : fill(whatsappMessages.topic, { topic: context.topic });
}

/** wa.me link with a prefilled message for the context, or null while the number is missing or invalid. */
export function whatsappHref(context: WhatsAppContext = "general"): string | null {
  if (isPlaceholder(site.whatsapp)) return null;
  return buildWhatsAppUrl(site.whatsapp.waMe, whatsappMessage(context));
}

/** Display format of the number, or null while it is a placeholder. */
export function whatsappDisplay(): string | null {
  return isPlaceholder(site.whatsapp) ? null : site.whatsapp.display;
}
