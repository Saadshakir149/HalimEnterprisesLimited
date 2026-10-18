/*
 * DRAFT – awaiting client approval
 *
 * Copy for the enquiry and callback forms: labels, hints, states and the
 * messages the server returns. Validation messages live with the schemas in
 * src/lib/validation.ts.
 */

import { site } from "@/content/site";

/*
 * Revised 18 October 2026: no reply-time promise (site.responseTime is null
 * until the client confirms one), and confirmations say only what is true.
 */
export const serverMessages = {
  success: "Thank you. Your details have been received.",
  invalid: "Some details need checking. Please review the form and try again.",
  rateLimited: "You’ve sent several messages in a short time. Please wait a few minutes and try again, or message us on WhatsApp.",
  unavailable: "Our online form isn’t available at the moment. Please message us on WhatsApp, or try again later.",
  failed: "Something went wrong and your message wasn’t sent. Please try again, or message us on WhatsApp.",
};

export const shared = {
  required: "(required)",
  optional: "(optional)",
  sending: "Sending…",
  errorSummaryTitle: "There is a problem",
  /** Rendered with a link to the privacy policy */
  privacyNotice: {
    before: "We only use these details to respond to you. Read our ",
    link: "privacy policy",
    after: " to see how we handle your information.",
  },
  consentLabel: "I’ve read the privacy policy",
  retry: "Try again",
  whatsapp: "Message us on WhatsApp",
  honeypotLabel: "Leave this field empty",
  chooseOption: "Choose an option",
};

export const enquiryForm = {
  /* Short fields sit side by side on wider screens, so they have no hints:
     a hint on one field of a pair would push its input out of line. */
  fields: {
    name: { label: "Your name" },
    email: { label: "Email address" },
    phone: { label: "Phone number" },
    businessName: { label: "Business name" },
    businessType: { label: "Which best describes you?" },
    annualTurnover: { label: "Approximate annual turnover" },
    serviceNeeded: { label: "What do you need help with?" },
    message: { label: "How can we help?", hint: "A few lines about your business and what you need. Please don’t include bank details or tax references." },
  },
  notSure: "Not sure yet",
  submit: "Send enquiry",
  success: {
    title: "Thank you for your enquiry",
    body: [
      ...(site.responseTime ? [`Your details have been received. We aim to reply ${site.responseTime}.`] : ["Your details have been received. We will reply using the contact details you provided."]),
      "A confirmation has been sent to your email address. If your question is urgent, you can message us on WhatsApp.",
    ],
  },
};

export const callbackForm = {
  fields: {
    name: { label: "Your name" },
    phone: { label: "Phone number" },
    preferredTime: { label: "When is best to call?" },
    topic: { label: "What would you like to talk about?", hint: "A few words is plenty." },
  },
  submit: "Request a callback",
  success: {
    title: "Thank you, your callback request has been received",
    body: [
      ...(site.responseTime ? [`We aim to call you ${site.responseTime}, at your preferred time where possible.`] : ["We will call you on the number you provided, at your preferred time where possible."]),
      "If anything changes, you can message us on WhatsApp.",
    ],
  },
};
