/*
 * DRAFT – awaiting client approval
 *
 * Frequently asked questions. Shared by the homepage preview and /faqs.
 * Business facts come from site.ts; nothing here may promise more than
 * CLAUDE.md allows (no prices, guarantees, durations or response times).
 * Revised 18 October 2026: the reply-time question is removed until the
 * client confirms a commitment (site.responseTime).
 */

import { site } from "@/content/site";
import { listWithAnd, listWithOr } from "@/lib/lists";

/** A question with plain-text answer paragraphs. Used by page-level FAQs too. */
export type QuestionAnswer = {
  readonly question: string;
  readonly answer: readonly string[];
};

export type FaqCategory = "Getting started" | "Working together" | "Services" | "Documents and data";

export type Faq = QuestionAnswer & {
  readonly id: string;
  readonly category: FaqCategory;
  /** Shown in the homepage preview */
  readonly featured?: boolean;
};


export const faqs: readonly Faq[] = [
  {
    id: "free-consultation",
    category: "Getting started",
    question: "Is the first consultation really free?",
    answer: [
      "Yes. The initial consultation is free and takes place by phone or video. We use it to understand your situation and the services you need.",
      "If you would like us to act for you afterwards, we send you a quote. There is nothing to pay unless you accept it.",
    ],
    featured: true,
  },
  {
    id: "outside-london",
    category: "Working together",
    question: "Can you work with me if I’m not in London?",
    answer: [
      "Yes. We work remotely with clients anywhere in the UK. Consultations are by phone or video, and you can message us on WhatsApp.",
    ],
    featured: true,
  },
  {
    id: "software",
    category: "Services",
    question: "Which accounting software do you use?",
    answer: [
      `We work with ${listWithAnd(site.software)}, and with ${listWithOr(site.tools)} for capturing receipts. If you already use one of these, tell us which when you get in touch.`,
      "If you do not use accounting software yet, we can recommend a package during your consultation.",
    ],
    featured: true,
  },
  {
    id: "documents",
    category: "Documents and data",
    question: "How do I send you my documents?",
    answer: [
      "Once we start working together, we send you a secure way to share your documents.",
      "Please don’t send bank statements, ID or other sensitive documents by email or WhatsApp.",
    ],
    featured: true,
  },
  {
    id: "prices",
    category: "Getting started",
    question: "Why don’t you list your prices?",
    answer: [
      "The work varies from one business to the next, so we quote for what you actually need. After your free consultation we send you a quote, and we only start once you have accepted it.",
    ],
    featured: true,
  },
  {
    id: "consultation-cover",
    category: "Getting started",
    question: "What happens in the free consultation?",
    answer: [
      "We discuss your business or situation, how your records are kept now and what you need help with, and answer your questions. If we can help, we explain which services apply and follow up with a quote.",
    ],
  },
  {
    id: "consultation-prepare",
    category: "Getting started",
    question: "Do I need to prepare anything for the consultation?",
    answer: [
      "Nothing formal. It helps to know which accounting software you use, if any, and to have an approximate figure for your income and a note of any deadlines. Please do not send documents before we have agreed how to share them.",
    ],
  },
  {
    id: "keeping-in-touch",
    category: "Working together",
    question: "How do we keep in touch?",
    answer: [
      "Consultations are by phone or video, and you can message us on WhatsApp. We agree the best way to stay in touch when we start working together.",
    ],
  },
  {
    id: "switching",
    category: "Working together",
    question: "Can you take over from my current accountant?",
    answer: [
      "Yes. With your permission, we contact your current accountant for the records and information we need to take over the work.",
    ],
  },
  {
    id: "not-listed",
    category: "Services",
    question: "Can you help with something that isn’t on your services page?",
    answer: [
      "Our services page lists what we offer. If you need something else, ask us and we will tell you whether we can help.",
    ],
  },
  {
    id: "not-vat-registered",
    category: "Services",
    question: "Can you help if I’m not VAT registered?",
    answer: [
      "Yes. Bookkeeping, annual accounts, payroll and our other services do not depend on VAT registration. If you are considering registering, we can review that with you as well.",
    ],
  },
  {
    id: "software-access",
    category: "Documents and data",
    question: "Will you need access to my accounting software?",
    answer: [
      "Usually, yes. Most packages let you invite your accountant as a separate user, so you stay in control and can remove access at any time. We never need your own login details.",
    ],
  },
  {
    id: "information-security",
    category: "Documents and data",
    question: "How do you look after my information?",
    answer: [
      "We only ask for the information we need, and we agree a secure way to share documents rather than using email or WhatsApp. Our privacy policy explains what we collect and why.",
    ],
  },
];

export const faqCategories: readonly FaqCategory[] = ["Getting started", "Working together", "Services", "Documents and data"];

export const featuredFaqs = faqs.filter((faq) => faq.featured);
