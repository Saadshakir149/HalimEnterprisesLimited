import "server-only";
import { emailCopy as copy } from "@/content/emails";
import { findConfirmedService } from "@/content/services";
import { renderMail, safeSubject, type Mail } from "@/lib/email";
import { fill } from "@/lib/template";
import { NOT_SURE, type CallbackValues, type EnquiryValues } from "@/lib/validation";

type Row = readonly [string, string];

const orNotProvided = (value: string | undefined) => (value && value.trim() !== "" ? value : copy.notProvided);

function serviceTitle(slug: string): string {
  if (slug === NOT_SURE) return "Not sure yet";
  return findConfirmedService(slug)?.title ?? slug;
}

/** Notification to the business inbox, plus an acknowledgement to the sender */
export function enquiryMails(data: EnquiryValues, inbox: string): Mail[] {
  const rows: Row[] = [
    [copy.labels.name, data.name],
    [copy.labels.email, data.email],
    [copy.labels.phone, orNotProvided(data.phone)],
    [copy.labels.businessName, orNotProvided(data.businessName)],
    [copy.labels.businessType, data.businessType],
    [copy.labels.annualTurnover, orNotProvided(data.annualTurnover)],
    [copy.labels.serviceNeeded, serviceTitle(data.serviceNeeded)],
    [copy.labels.message, data.message],
  ];
  const notification = renderMail({
    heading: copy.enquiryNotification.heading,
    intro: copy.enquiryNotification.intro,
    rows,
    footer: copy.footer,
  });

  const firstName = data.name.split(/\s+/)[0] ?? data.name;
  const acknowledgement = renderMail({
    heading: copy.enquiryAcknowledgement.subject,
    paragraphs: [
      fill(copy.enquiryAcknowledgement.greeting, { firstName }),
      ...copy.enquiryAcknowledgement.body,
      copy.enquiryAcknowledgement.signOff,
    ],
    footer: copy.footer,
  });

  return [
    {
      to: inbox,
      replyTo: data.email,
      subject: safeSubject(fill(copy.enquiryNotification.subject, { name: data.name })),
      ...notification,
      preview: rows,
    },
    {
      to: data.email,
      subject: safeSubject(copy.enquiryAcknowledgement.subject),
      ...acknowledgement,
      preview: [["Greeting name", firstName]],
    },
  ];
}

/** Notification only: the callback form collects no email address to acknowledge */
export function callbackMails(data: CallbackValues, inbox: string): Mail[] {
  const rows: Row[] = [
    [copy.labels.name, data.name],
    [copy.labels.phone, data.phone],
    [copy.labels.preferredTime, data.preferredTime],
    [copy.labels.topic, orNotProvided(data.topic)],
  ];
  return [
    {
      to: inbox,
      subject: safeSubject(fill(copy.callbackNotification.subject, { name: data.name })),
      ...renderMail({ heading: copy.callbackNotification.heading, intro: copy.callbackNotification.intro, rows, footer: copy.footer }),
      preview: rows,
    },
  ];
}
