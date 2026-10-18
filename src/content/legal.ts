/*
 * DRAFT legal pages – to be replaced with the client's approved policies
 *
 * The client has their own privacy, cookie and complaints policies but has not
 * sent them yet (CLAUDE.md section 11). These templates describe what this
 * website actually does, using facts from site.ts. They are not legal advice
 * and must be reviewed before launch.
 *
 * While a document's status is "draft", its page shows a DRAFT banner and (if
 * site.legal.noindexDraftPages is true) is noindexed.
 *
 * Any sentence that depends on a missing value (ICO number, email, complaint
 * timescales) is left out until the value exists, and a dev-only note is shown
 * instead, so no placeholder ever reaches visitors.
 */

import { routes } from "@/content/navigation";
import { isPlaceholder, site } from "@/content/site";
import { getBooking, getDocumentPortal } from "@/lib/integrations";

/** Inline text: plain strings, or links */
export type Inline = string | { readonly href: string; readonly label: string };

export type LegalBlock =
  | { readonly kind: "p"; readonly text: readonly Inline[] }
  | { readonly kind: "list"; readonly items: readonly string[] };

export type LegalSection = {
  readonly id: string;
  readonly title: string;
  readonly blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  readonly slug: "privacy-policy" | "cookie-policy" | "complaints" | "terms";
  readonly title: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly status: "draft" | "approved";
  readonly intro: string;
  readonly sections: readonly LegalSection[];
  /** Missing information, shown only in development */
  readonly devNotes: readonly string[];
};

const p = (...text: Inline[]): LegalBlock => ({ kind: "p", text });
const list = (...items: string[]): LegalBlock => ({ kind: "list", items });
/** Include blocks only when a condition holds (e.g. a value is no longer a placeholder) */
const when = (condition: boolean, ...blocks: LegalBlock[]): LegalBlock[] => (condition ? blocks : []);

const brand = site.brandName;
/* Since 18 October 2026 the public name is the company's own name, so there is no "trading as" */
const company = site.legalName;
const registered = `Registered in ${site.registeredIn}, company number ${site.companyNumber}. Registered office: ${site.registeredOffice.join(", ")}.`;
const email = isPlaceholder(site.email) ? null : site.email;
const ico = isPlaceholder(site.icoNumber) ? null : site.icoNumber;
const contactLink = { href: routes.contact, label: "contact page" } as const;
/* Integrations are described only once they are switched on (iteration 8) */
const booking = getBooking();
const portal = getDocumentPortal();
const howToContact: Inline[] = email
  ? ["You can contact us by email at ", { href: `mailto:${email}`, label: email }, " or through our ", contactLink, "."]
  : ["You can contact us using the options on our ", contactLink, "."];

const privacy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy policy",
  metaTitle: "Privacy Policy",
  metaDescription: `How ${brand} collects, uses and protects the personal information you share through this website.`,
  status: "draft",
  intro: `This policy explains what personal information ${brand} collects through this website, why, and the choices you have.`,
  devNotes: [
    ...(ico ? [] : ["ICO registration number missing: the ICO sentence is hidden"]),
    ...(email ? [] : ["Business email missing: contact falls back to the contact page"]),
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        p(`This website is run by ${company}. We are the data controller for the personal information described in this policy.`),
        p(registered),
        ...when(ico !== null, p(`We are registered with the Information Commissioner’s Office under registration number ${ico}.`)),
      ],
    },
    {
      id: "what-we-collect",
      title: "Information we collect",
      blocks: [
        p("We only collect information you choose to give us, plus the basic technical information any website needs to work."),
        p("When you send an enquiry, we ask for:"),
        list(
          "your name and email address",
          "your phone number, if you choose to give it",
          "your business name and type of business, if relevant",
          "an approximate turnover band, if you choose to give it",
          "the service you are interested in, and your message",
        ),
        p("When you request a callback, we ask for your name, phone number, a preferred time and, optionally, what you would like to discuss."),
        p("If you message us on WhatsApp, we receive your phone number, your WhatsApp profile name and the messages you send."),
        p(
          "Our hosting provider keeps standard server logs, such as IP addresses, browser type and the pages requested, to keep the website running securely.",
        ),
        p("Please do not send us sensitive documents, bank details or identity documents through the website or WhatsApp."),
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use your information",
      blocks: [
        list(
          "to reply to your enquiry or call you back",
          "to arrange and hold your free consultation",
          "to prepare a quote if you ask for one",
          "to keep the website secure and working properly",
        ),
        p("We do not use your information for marketing unless you ask us to, and we never sell it."),
      ],
    },
    {
      id: "lawful-basis",
      title: "Our lawful basis",
      blocks: [
        p(
          "We use your information because you have asked us to respond to you or to take steps before entering into a contract with you, and because we have a legitimate interest in replying to enquiries and keeping our website secure.",
        ),
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      blocks: [
        p("We only share your information with providers who help us run the website and our business, and only as far as they need it:"),
        list(
          "our website and email hosting provider, which stores the website and delivers enquiry emails to our business mailbox",
          "WhatsApp (part of Meta), if you choose to contact us there. WhatsApp’s own privacy policy applies to messages sent through it",
          ...(booking
            ? [`${booking.providerName}, which runs our online booking calendar, if you book a consultation online. ${booking.providerName}’s own privacy policy applies to the details you give it`]
            : []),
          ...(portal ? [`${portal.name}, our secure document portal, if you are a client and send us documents through it`] : []),
        ),
        p("We may also share information where the law requires us to."),
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      blocks: [
        p(
          "We keep enquiry and callback details for as long as we need them to respond to you. If you become a client, we keep your information for as long as the law requires for our records. We delete information we no longer need.",
        ),
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        p("Under UK data protection law you have the right to:"),
        list(
          "ask for a copy of the information we hold about you",
          "ask us to correct information that is wrong",
          "ask us to delete your information",
          "object to, or ask us to restrict, how we use it",
          "ask for your information in a portable format",
        ),
        p(...howToContact),
        p(
          "If you are unhappy with how we have handled your information, you can complain to the Information Commissioner’s Office at ",
          { href: "https://ico.org.uk", label: "ico.org.uk" },
          ". We would appreciate the chance to put things right first.",
        ),
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [p("This website does not use analytics or tracking cookies. Our ", { href: site.policies.cookies, label: "cookie policy" }, " explains more.")],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [p("We may update this policy from time to time. The current version is always on this page.")],
    },
  ],
};

const cookies: LegalDocument = {
  slug: "cookie-policy",
  title: "Cookie policy",
  metaTitle: "Cookie Policy",
  metaDescription: `Which cookies the ${brand} website uses: none for analytics or tracking.`,
  status: "draft",
  intro: "Cookies are small files a website can store on your device. This page explains how this website uses them.",
  devNotes: [],
  sections: [
    {
      id: "our-cookies",
      title: "Cookies on this website",
      blocks: [
        // Verified in iterations 6 and 8: the site sets no cookies and uses no browser storage
        p("This website does not set any cookies. We do not use analytics, advertising or tracking tools, so we do not need to ask for your consent."),
      ],
    },
    ...(booking
      ? [
          {
            id: "booking-calendar",
            title: "Our booking calendar",
            blocks: [
              p(
                `On our `,
                { href: routes.consultation, label: "consultation page" },
                `, you can choose to show available times from ${booking.providerName} on the page itself. Nothing from ${booking.providerName} loads until you click “Show available times here”. Once it loads, ${booking.providerName} may set its own cookies, and its own cookie policy applies. If you would rather it did not, use the “Choose a time” button instead, which opens ${booking.providerName} in a new tab.`,
              ),
            ],
          },
        ]
      : []),
    {
      id: "third-parties",
      title: "Other websites",
      blocks: [
        p(
          "Some links take you to other services, such as WhatsApp. Once you leave this website, that service’s own cookie and privacy policies apply.",
        ),
      ],
    },
    {
      id: "changes",
      title: "If this changes",
      blocks: [
        p(
          "If we add a feature that uses cookies, such as an online booking calendar, we will update this policy first and ask for your consent wherever the law requires it.",
        ),
      ],
    },
    {
      id: "managing-cookies",
      title: "Managing cookies",
      blocks: [p("You can block or delete cookies in your browser settings. This website works fully without them.")],
    },
  ],
};

const ack = isPlaceholder(site.complaints.acknowledgeWithin) ? null : site.complaints.acknowledgeWithin;
const respond = isPlaceholder(site.complaints.respondWithin) ? null : site.complaints.respondWithin;

const complaints: LegalDocument = {
  slug: "complaints",
  title: "Complaints procedure",
  metaTitle: "Complaints Procedure",
  metaDescription: `How to raise a concern with ${brand}, and how we will handle it.`,
  status: "draft",
  intro: "We want to get things right. If you are unhappy with any part of our service, please tell us so we can put it right.",
  devNotes: [
    ...(email ? [] : ["Business email missing: complaints fall back to the contact page"]),
    ...(ack ? [] : ["Complaint acknowledgement time missing: the timescale is hidden"]),
    ...(respond ? [] : ["Complaint response time missing: the timescale is hidden"]),
  ],
  sections: [
    {
      id: "raise",
      title: "How to raise a complaint",
      blocks: [
        p("Please tell us what went wrong and what you would like us to do about it. Include any dates, names or documents that will help us understand."),
        p(...howToContact),
      ],
    },
    {
      id: "what-happens",
      title: "What happens next",
      blocks: [
        list(
          ack ? `We acknowledge your complaint within ${ack}.` : "We acknowledge your complaint promptly.",
          "We look into it carefully and fairly, and may ask you for more information.",
          respond
            ? `We give you a full written response within ${respond}, explaining what we found and what we will do.`
            : "We give you a full written response explaining what we found and what we will do.",
        ),
      ],
    },
    {
      id: "not-satisfied",
      title: "If you are not satisfied",
      blocks: [
        p("If you are unhappy with our response, tell us and we will review the complaint again."),
        p(
          "If your complaint is about how we have handled your personal information, you can also contact the Information Commissioner’s Office at ",
          { href: "https://ico.org.uk", label: "ico.org.uk" },
          ".",
        ),
      ],
    },
  ],
};

const terms: LegalDocument = {
  slug: "terms",
  title: "Terms of use",
  metaTitle: "Website Terms of Use",
  metaDescription: `The terms that apply when you use the ${brand} website.`,
  status: "draft",
  intro: "These terms apply when you use this website. They do not cover the services we provide to clients, which are agreed separately in writing.",
  devNotes: [],
  sections: [
    {
      id: "about",
      title: "About us",
      blocks: [p(`This website is run by ${company}. ${registered}`)],
    },
    {
      id: "not-advice",
      title: "Information, not advice",
      blocks: [
        p(
          "The content on this website is general information only. It is not financial, tax or legal advice for your situation, and you should not rely on it as such. Tax rules change and depend on individual circumstances, so please talk to us before acting on anything you read here.",
        ),
      ],
    },
    {
      id: "using-the-site",
      title: "Using this website",
      blocks: [
        p("You may use this website for your own information. Please do not misuse it, for example by trying to gain unauthorised access, introducing harmful code or copying content in bulk."),
        p("We try to keep the website available and accurate but cannot promise that it will always be available, error-free or up to date."),
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [p(`The content and design of this website belong to ${site.legalName} unless stated otherwise. You may not reuse them without our permission.`)],
    },
    {
      id: "links",
      title: "Links to other websites",
      blocks: [p("Links to other websites, such as WhatsApp or HMRC, are provided for convenience. We are not responsible for their content or how they handle your information.")],
    },
    {
      id: "liability",
      title: "Our liability",
      blocks: [
        p(
          "We are not liable for any loss arising from your use of this website or from relying on its content, except where the law does not allow us to exclude liability.",
        ),
      ],
    },
    {
      id: "law",
      title: "Governing law",
      blocks: [p(`These terms are governed by the law of ${site.registeredIn}, and its courts have jurisdiction over any dispute.`)],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [p("We may update these terms from time to time. The current version is always on this page.")],
    },
  ],
};

export const legalDocuments = { privacy, cookies, complaints, terms } as const;

export const draftBannerText = "Draft — to be replaced with the client’s approved policy before launch.";
