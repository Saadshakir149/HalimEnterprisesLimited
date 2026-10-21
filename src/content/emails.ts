/*
 * DRAFT – awaiting client approval
 *
 * Email copy for the enquiry and callback forms. The acknowledgement is short
 * and honest: thanks, and the reply-time wording from site.ts. No promises
 * beyond that. Every email carries the statutory company details, which UK
 * companies must show on business correspondence.
 */

import { legalStatement, site, siteUrl } from "@/content/site";

const brand = site.brandName;

export const emailCopy = {
  enquiryNotification: {
    subject: "New website enquiry from {name}",
    heading: "New enquiry from the website",
    intro: "Reply to this email to answer them directly.",
  },
  callbackNotification: {
    subject: "Callback request from {name}",
    heading: "New callback request from the website",
    intro: "They would like a call back on the number below.",
  },
  enquiryAcknowledgement: {
    subject: `Thank you for contacting ${brand}`,
    greeting: "Hello {firstName},",
    body: [
      site.responseTime
        ? `Thank you for contacting us. Your enquiry has been received, and we aim to reply ${site.responseTime}.`
        : "Thank you for contacting us. Your enquiry has been received, and we will reply to you by email.",
      "Please do not send bank statements, identity documents or other sensitive records by email. If we need documents from you, we will agree a secure way to share them.",
    ],
    signOff: brand,
  },
  /** Shown at the foot of every email */
  footer: `${legalStatement()} ${siteUrl}`,
  /** Labels for the fields, in the order they appear in the notification */
  labels: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    businessName: "Business name",
    businessType: "Type of business",
    annualTurnover: "Annual turnover",
    serviceNeeded: "Service needed",
    message: "Message",
    preferredTime: "Preferred time",
    topic: "Topic",
  },
  notProvided: "Not provided",
};
