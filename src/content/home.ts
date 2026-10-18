/*
 * DRAFT – awaiting client approval
 *
 * All homepage copy lives here so the client can review it in one place.
 * Written to CLAUDE.md section 4: no qualifications, experience, client
 * numbers, results, ratings, reviews or guarantees. Business facts come from
 * site.ts. Revised 18 October 2026 (brand: Halim Enterprises Limited).
 */

import type { IconName } from "@/components/ui/Icon";
import { consultationLabel } from "@/content/navigation";
import { site } from "@/content/site";
import { listWithAnd, listWithOr } from "@/lib/lists";

const brand = site.brandName;
/** e.g. "September 2026", from site.incorporated */
const incorporatedMonth = new Date(site.incorporated).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export const hero = {
  /** Small line above the headline */
  eyebrow: "Accountancy services · Remote across the UK",
  /**
   * The h1 reads as one sentence; the accent part is set on its own line in light teal.
   * Alternatives for the client: "Bookkeeping and VAT returns for small businesses and individuals",
   * "Bookkeeping, VAT and year-end accounts for UK businesses".
   */
  headline: { main: "Bookkeeping, VAT and accounting", accent: "for UK small businesses" },
  lead: `${brand} keeps your books up to date, prepares your VAT returns and handles payroll and year-end accounts for small businesses and individuals across the UK.`,
  primaryCta: consultationLabel,
  secondaryCta: "View our services",
  /**
   * The hero photograph (Pexels, free licence; see docs/ASSETS.md): an empty boardroom with a
   * city view, used as a tinted backdrop. Not the company's office (it works remotely).
   */
  image: {
    src: "/images/hero-boardroom.jpg",
    width: 2400,
    height: 1600,
    alt: "An empty meeting room with a long table and chairs facing tall windows over a city",
    /**
     * A visible image credit, for photos whose licence requires one (e.g. Magnific's free
     * licence). The Pexels licence does not, so none is shown.
     */
    credit: null as { text: string; href: string } | null,
  },
  /* Describes the service, not a client base: the company was incorporated in September 2026 */
  reassurance: ["Free initial consultation by phone or video", "Remote service, available anywhere in the UK"],
  consultationCard: {
    eyebrow: "Free · by phone or video",
    title: "Your first consultation",
    intro: "What we cover in the first conversation:",
    // Also used on /book-consultation
    points: [
      "Your business and what you need help with",
      "How your bookkeeping is kept at the moment",
      "Your VAT position and deadlines",
      "The services that fit, and the next steps",
    ],
  },
};

export const software = {
  label: "Software",
  /** The visible names are site.software then site.tools, set as text wordmarks (no logos: see docs/ASSETS.md) */
  title: "Software we work with",
  text: `We work with ${listWithAnd([...site.software, ...site.tools])}.`,
  note: "Not using accounting software yet? We can recommend a package during your consultation.",
  /**
   * Trademark attribution and the "not approved by" disclaimer Intuit asks for in plain-text
   * references. Owners named only where verified; the rest are covered by the general sentence.
   */
  trademarks: `Xero is a trademark of Xero Limited. QuickBooks is a registered trademark of Intuit Inc. Sage is a trademark of The Sage Group plc. FreeAgent, Dext and Hubdoc are trademarks of their respective owners. ${brand} is independent: we are not affiliated with, endorsed by or approved by these companies.`,
};

export const servicesIntro = {
  eyebrow: "Services",
  title: "Accounting services for small businesses",
  lead: "Bookkeeping and VAT returns are at the centre of what we do. Payroll, year-end accounts, company formation, forecasting and Capital Gains Tax are available as you need them.",
  otherTitle: "Other services",
  allLink: "View all services",
};

/** Copy for the two priority services, keyed by slug */
export const priorityServices: Record<string, { headline: string; text: string; points: readonly string[]; link: string }> = {
  bookkeeping: {
    headline: "Records kept up to date, monthly or quarterly",
    text: "We record your sales and expenses, reconcile your bank accounts and keep your books ready for VAT returns and year-end accounts.",
    points: [
      "Bank and card accounts reconciled",
      `Kept in ${listWithOr(site.software)}`,
      "Missing receipts and open queries listed for you",
    ],
    link: "Bookkeeping services",
  },
  "vat-returns": {
    headline: "VAT returns prepared and submitted under Making Tax Digital",
    text: "We prepare each return from your records, show you the figures and the transactions behind them, and submit it once you have approved it.",
    points: ["Prepared from your bookkeeping records", "Figures reviewed with you before submission", "Submitted through MTD-compatible software"],
    link: "VAT return services",
  },
};

export const audiencesIntro = {
  eyebrow: "Who we help",
  title: "Who we work with",
  // Avoids implying a track record: the company is newly established
  lead: "Choose the description closest to your situation to see the services that usually apply.",
  allLink: "All client types",
  /** Accessible name for the tab list */
  tablist: "Who we help",
  helpTitle: "Services that usually apply",
  /** {audience} becomes the audience name, first letter lower-cased */
  more: "More for {audience}",
};

/** The typical situation each audience brings, keyed by slug */
export const audienceProblems: Record<string, string> = {
  "sole-traders": "Receipts and bank statements to record, and a VAT threshold to keep an eye on.",
  startups: "A new business to register, records to start and cash to plan before income is steady.",
  "ecommerce-sellers": "Payouts from several platforms, with fees and refunds already deducted.",
  hospitality: "Daily takings, weekly supplier invoices and staff on changing hours.",
  individuals: "A property or share sale, and a question about Capital Gains Tax.",
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "How we start working together",
  lead: "The first conversation is free. You receive a quote before any work begins.",
  /*
   * The brief suggested "a clear, fixed quote". Fixed fees are not confirmed
   * in CLAUDE.md, so "fixed" is left out until the client confirms it.
   */
  steps: [
    {
      icon: "video",
      title: "Free consultation",
      text: "We discuss your business, how your records are kept and what you need, by phone or video.",
    },
    {
      icon: "file-text",
      title: "Your quote",
      text: "We send you a quote setting out the work involved and the cost. Nothing starts until you accept it.",
    },
    {
      icon: "check",
      title: "Set-up and regular work",
      text: "We arrange access to your records, agree a schedule and tell you what we need from you, and by when.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
  cta: consultationLabel,
  stepLabel: "Step",
};

export const commitments = {
  eyebrow: "Working with us",
  title: "What to expect",
  // Client to confirm: implies the director handles each client's work
  lead: "A small company working remotely, with the same person handling your work from the first conversation onwards.",
  items: [
    {
      icon: "laptop",
      title: "Remote, anywhere in the UK",
      // No "call us": whether the WhatsApp number also takes calls is unconfirmed
      text: "Consultations take place by phone or video, and you can message us on WhatsApp. There is no office to travel to.",
    },
    {
      icon: "messages-square",
      title: "Figures you can follow",
      text: "Before you approve a VAT return or a set of accounts, we show you the figures and the records behind them.",
    },
    {
      icon: "user",
      // Client to confirm: implies the director is each client's contact
      title: "One point of contact",
      text: "You deal with the same person throughout, who knows your records and your deadlines.",
    },
    {
      icon: "file-check",
      title: "A quote before work starts",
      text: "You see the scope and the cost in advance. We start once you have accepted the quote.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
  /* Small, truthful visuals for the bento tiles on the homepage (same order as items) */
  visuals: {
    channels: ["Phone", "Video", "WhatsApp"],
    channelsNote: "Anywhere in the UK",
    review: {
      label: "Before you approve a VAT return",
      items: ["The VAT due or reclaimable", "The sales and purchases behind it", "Anything that needs your attention"],
    },
    contactRole: "Director",
    quoteSteps: ["Quote sent", "You accept", "Work begins"],
  },
};

export const aboutTeaser = {
  eyebrow: "About us",
  title: `A UK accountancy company led by ${site.director}`,
  paragraphs: [
    `${brand} was incorporated in ${site.registeredIn} in ${incorporatedMonth} to provide bookkeeping, VAT and accounting services to small businesses and individuals.`,
    // Client to confirm: implies the director is each client's contact
    "Clients deal directly with the director. Whether you are starting a business or moving from another accountant, the first step is a free consultation about your records and what you need.",
  ],
  link: "About the company",
  /**
   * The "at a glance" panel beside the copy: verified facts only (site.ts), no claims.
   * The registered office is deliberately left out (CLAUDE.md: footer and legal pages only).
   */
  facts: {
    label: "Company at a glance",
    rows: [
      { term: "Director", value: site.director },
      { term: "Company", value: site.legalName },
      { term: "Company number", value: site.companyNumber, figures: true },
      { term: "Registered in", value: site.registeredIn },
      {
        term: "Incorporated",
        value: new Date(site.incorporated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
        figures: true,
      },
      { term: "Working model", value: "Remote, across the UK" },
      { term: "Consultations", value: "Free, by phone or video" },
    ] satisfies { term: string; value: string; figures?: boolean }[],
    link: "View our Companies House record",
  },
};

export const faqPreview = {
  eyebrow: "Questions",
  title: "Frequently asked questions",
  lead: "Answers to common questions about consultations, fees and how we work.",
  allLink: "All FAQs",
  askPrompt: "Question not covered?",
  askLink: "Ask us on WhatsApp",
};

export const finalCta = {
  title: "Arrange your free consultation",
  text: "Tell us about your business and what you need. We will arrange a call or video meeting and, if we can help, send you a quote.",
  primary: consultationLabel,
  whatsapp: "Message us on WhatsApp",
};
