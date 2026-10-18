/*
 * DRAFT – awaiting client approval
 *
 * Shared copy for the service and audience pages and their index pages:
 * section headings, the quote box and closing calls to action. Page-specific
 * copy lives in services.ts and audiences.ts. Page titles carry no brand: the
 * layout adds " | Halim Enterprises Limited". Revised 18 October 2026.
 */

import { consultationLabel } from "@/content/navigation";
import { features, site } from "@/content/site";

const brand = site.brandName;

export const serviceDetailCopy = {
  eyebrow: "Services",
  whoFor: "Who this service is for",
  included: "What the service covers",
  steps: "How it works",
  needFromYou: "Information we need from you",
  faqs: "Common questions",
  relatedServices: "Related services",
  relatedAudiences: "Who this service suits",
};

export const audienceDetailCopy = {
  eyebrow: "Who we help",
  situation: "Your situation",
  challenges: "Typical challenges",
  services: "Services that help",
  remote: "Working with us remotely",
  faqs: "Common questions",
  otherAudiences: "Other client types",
};

/**
 * Prefilled WhatsApp messages, by context. The visitor can edit or delete the
 * text before sending; it only saves them typing. Built into links by
 * src/lib/whatsapp.ts.
 */
export const whatsappMessages = {
  general: "Hello, I’d like to ask about your accounting services.",
  consultation: "Hello, I’d like to arrange a free consultation.",
  documents: "Hello, I have a question about sending documents.",
  /** {topic} becomes the service title, e.g. "Bookkeeping" */
  topic: "Hello, I’d like to ask about {topic}.",
};

export const quoteBox = {
  title: "Request a quote",
  text: "Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.",
  consultation: consultationLabel,
  callback: "Request a callback",
  whatsapp: "Ask on WhatsApp",
};

export const servicesIndex = {
  metaTitle: "Accounting Services for UK Small Businesses",
  metaDescription: "Bookkeeping, VAT returns, annual accounts, payroll, company formation, business plans and Capital Gains Tax, provided remotely across the UK.",
  eyebrow: "Services",
  title: "Accounting services",
  intro:
    "Bookkeeping and VAT returns for UK small businesses, with payroll, year-end accounts, company formation, forecasting and Capital Gains Tax available as you need them.",
  featuredTitle: "Core services",
  otherTitle: "Further services",
};

export const audiencesIndex = {
  metaTitle: "Who We Help",
  metaDescription:
    "Accountancy services for sole traders, startups, eCommerce sellers, hospitality businesses and individuals, delivered remotely across the UK.",
  eyebrow: "Who we help",
  title: "Who we work with",
  intro:
    "Each type of client brings different records and deadlines. Choose the page closest to your situation to see the services that usually apply.",
  servicesLabel: "Relevant services",
};

export const faqsPage = {
  metaTitle: "Frequently Asked Questions",
  metaDescription: `Answers about free consultations, fees, working remotely, software and sharing documents with ${brand}.`,
  eyebrow: "FAQs",
  title: "Frequently asked questions",
  intro: "Answers about consultations, fees, working remotely and sharing documents. If your question is not covered here, contact us.",
  topics: "Topics",
};

export const aboutPage = {
  metaTitle: "About Us",
  metaDescription: `${brand} is a UK accountancy company, incorporated in 2026, providing bookkeeping, VAT and accounting services remotely across the UK.`,
  eyebrow: "About us",
  title: `About ${brand}`,
  // {year} comes from site.incorporated
  intro:
    "{brand} provides bookkeeping, VAT returns and accounting services to small businesses and individuals. The company was incorporated in England and Wales in {year} and works remotely across the UK.",
  storyTitle: "How we work",
  story: [
    // Client to confirm: implies the director handles each client's work
    "We are a newly established company. Clients work directly with the director, from the first consultation to the regular work that follows.",
    "We work remotely. Consultations take place by phone or video and you can message us on WhatsApp, so your location in the UK makes no difference to the service.",
    "Before any work begins, you receive a quote setting out what is included. As the work progresses, we tell you what has been done, what we need from you and when the next deadline falls.",
  ],
  directorEyebrow: "The director",
  /** Shown when no bio has been supplied: a statement of fact only */
  directorFallback: "{name} is the director of {legalName}.",
  qualificationsTitle: "Qualifications",
  linkedIn: "View {name} on LinkedIn",
  valuesTitle: "What to expect",
  softwareTitle: "Software",
};

export const contactPage = {
  metaTitle: "Contact Us",
  metaDescription: `Request a free consultation, ask for a callback or message ${brand} on WhatsApp. Remote accountancy services across the UK.`,
  eyebrow: "Contact",
  title: "Contact us",
  intro: "We work remotely with clients across the UK. Consultations take place by phone or video.",
  /** {time} comes from site.responseTime; the line is hidden while that is null */
  responseTime: "We aim to reply {time}.",
  primary: {
    title: "Free initial consultation",
    text: "The best starting point: a conversation by phone or video about your business and the services you need.",
    cta: consultationLabel,
  },
  callback: {
    title: "Request a callback",
    text: "Leave your number and a convenient time, and we will call you.",
    cta: "Request a callback",
  },
  whatsapp: {
    title: "WhatsApp",
    text: "Send us a message at any time.",
    cta: "Message us on WhatsApp",
  },
  email: {
    title: "Email",
    text: "For anything you would rather put in writing.",
    cta: "Send an email",
  },
  documents: {
    prefix: "Already working with us? ",
    link: "How to send us documents securely",
  },
  enquiryTitle: "Send an enquiry",
  enquiryText: "Tell us about your business and what you need. We will reply using the details you provide.",
  callbackTitle: "Request a callback",
};

export const consultationPage = {
  metaTitle: features.booking ? "Book a Free Consultation" : "Request a Free Consultation",
  metaDescription: `${features.booking ? "Book" : "Request"} a free initial consultation with ${brand} by phone or video: what it covers, what to prepare and what happens afterwards.`,
  eyebrow: "Free consultation",
  title: consultationLabel,
  intro:
    "A free initial conversation by phone or video about your business, your records and the services you need. If we can help, we follow up with a quote.",
  coversTitle: "What the consultation covers",
  formatTitle: "How it works",
  format: [
    "The consultation takes place by phone or video, whichever you prefer.",
    "We arrange a time with you once you get in touch.",
    "There is nothing to pay, and no obligation to go ahead afterwards.",
  ],
  prepareTitle: "Useful to have to hand",
  prepare: [
    "The name of any accounting software you use",
    "An approximate figure for your turnover or income",
    "Any deadlines or HMRC letters you have questions about",
    "A short list of the questions you want to ask",
  ],
  prepareNote: "There is no need to send documents beforehand. If you decide to go ahead, we agree a secure way to share them.",
  afterTitle: "What happens afterwards",
  after: "If you would like us to act for you, we send you a quote setting out the work and the cost. Nothing starts until you have accepted it.",
  /* While online booking is off (features.booking false): the callback form */
  bookingTitle: "Request your consultation",
  bookingText: "Leave your name, phone number and a convenient time. We will call you to arrange the consultation.",
  /** If the callback form is also switched off */
  bookingTextNoForm: "Message us on WhatsApp or use the contact page, and we will arrange a time for your free consultation.",
  contactLink: "Go to the contact page",
  whatsappIntro: "Prefer to write? Send us a message instead.",
  whatsappCta: "Message us on WhatsApp",
  /* When online booking is on. {provider} is e.g. "Calendly" */
  online: {
    title: "Choose a time",
    text: "Choose a time for your free consultation by phone or video.",
    cta: "Choose a time",
    handledBy: "Booking is handled by {provider} and opens in a new tab.",
    embedIntro: "Or see available times on this page.",
    embedNotice: {
      before: "The calendar is provided by {provider}, which may set its own cookies once it loads. Nothing loads until you ask. See our ",
      link: "cookie policy",
      after: ".",
    },
    embedCta: "Show available times here",
    embedTitle: "Available consultation times, provided by {provider}",
    fallbackTitle: "Prefer not to book online?",
    fallbackCallback: "Request a callback",
  },
};

/** /send-documents: for clients. Noindexed. */
export const documentsPage = {
  metaTitle: "Sending Us Documents",
  metaDescription: `How clients of ${brand} share documents securely, and why documents should not be sent by email or WhatsApp.`,
  eyebrow: "For clients",
  title: "Sending us your documents",
  intro:
    "Once we are working together, we will need records such as bank statements, receipts and invoices. This page explains how to share them securely.",
  /* When a portal is configured. {name} is the portal's name */
  portal: {
    title: "Upload to our secure portal",
    text: "Send us documents through {name}, so they go straight to a secure portal instead of sitting in an inbox.",
    cta: "Open {name}",
  },
  /* Until a portal is chosen */
  pending: {
    title: "We will send you a secure upload link",
    text: "After your consultation, once we have agreed to work together, we send you a secure upload link. There is nothing to send before then.",
  },
  stepsTitle: "How it works",
  steps: {
    portal: [
      "We tell you exactly which documents we need.",
      "You upload them through {name}.",
      "We confirm when we have everything, or tell you what is missing.",
    ],
    pending: [
      "We tell you exactly which documents we need.",
      "We send you a secure upload link.",
      "We confirm when we have everything, or tell you what is missing.",
    ],
  },
  dontTitle: "Please do not send documents by email or WhatsApp",
  dont: "Email and messaging apps are not suitable for bank statements, identity documents, payslips or tax letters. If you are unsure how to send something, ask us first.",
  questions: "Questions about what to send? Message us on WhatsApp, without attaching any documents.",
  whatsappCta: "Ask a question on WhatsApp",
};

/** Reviews section (shown only when features.reviews is on and approved reviews exist) */
export const reviewsSection = {
  eyebrow: "Reviews",
  title: "What clients say",
  lead: "Reviews from our Google Business Profile, shared with the reviewers’ permission.",
  googleLink: "Read our reviews on Google",
  source: "Google review",
  /** {rating} is the reviewer's own rating, e.g. "5" */
  rating: "Rated {rating} out of 5",
};

export const detailCta = {
  title: "Discuss your requirements",
  text: "Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.",
};
