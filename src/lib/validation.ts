/*
 * Form schemas, shared by the browser (React Hook Form) and the server
 * (Route Handlers). Every string is trimmed and has a maximum length. Nothing
 * sensitive is asked for: no UTR, National Insurance number, bank details or
 * documents.
 *
 * The service list is passed in rather than imported, so the client bundle
 * doesn't pull in all the service page copy: the server passes the confirmed
 * slugs from services.ts, and the page passes the same slugs to the form.
 */

import { z } from "zod";

export const businessTypes = [
  "Sole trader",
  "Limited company",
  "Startup",
  "eCommerce seller",
  "Hospitality or restaurant",
  "Individual",
  "Other",
] as const;

export const turnoverBands = [
  "Under £50k",
  "£50k–£90k",
  "£90k–£250k",
  "£250k–£1m",
  "Over £1m",
  "Prefer not to say",
] as const;

export const callbackTimes = ["Morning", "Afternoon", "Any time"] as const;

export const NOT_SURE = "not-sure";

/** Minimum time between the form appearing and being sent, below which it's treated as a bot */
export const MIN_FILL_TIME_MS = 3000;

/* z.string(message): the message also covers a missing field (e.g. a bare API
   call), not just an empty one, so the server never answers "Invalid input". */
const requiredText = (label: string, max: number) =>
  z
    .string(`Enter your ${label}`)
    .trim()
    .min(1, `Enter your ${label}`)
    .max(max, `Your ${label} must be ${max} characters or fewer`);

/* Optional fields accept "" (an untouched input) inside one schema rather than
   a union, so validation messages stay specific instead of "Invalid input". */
const optionalText = (label: string, max: number) =>
  z.string().trim().max(max, `Your ${label} must be ${max} characters or fewer`).default("");

/*
 * UK-friendly but lenient: digits, spaces, brackets, dashes and an optional
 * leading +, with 10–15 digits in total. Accepts 07700 900123, +44 7700 900123,
 * (020) 7946 0000 and similar; rejects letters and obviously short numbers.
 */
const phonePattern = /^\+?[\d\s()-]+$/;
const digitCount = (value: string) => value.replace(/\D/g, "").length;
const phoneMessage = "Enter a phone number, like 07700 900123 or +44 7700 900123";

const isPhone = (v: string) => phonePattern.test(v) && digitCount(v) >= 10 && digitCount(v) <= 15;

const requiredPhone = z.string("Enter your phone number").trim().min(1, "Enter your phone number").max(25, phoneMessage).refine(isPhone, phoneMessage);

const optionalPhone = z
  .string()
  .trim()
  .max(25, phoneMessage)
  .refine((v) => v === "" || isPhone(v), phoneMessage)
  .default("");

const consent = z.literal(true, "Confirm that you have read the privacy policy");

/** Fields sent alongside every form so the server can screen out bots. Never shown to people. */
export const botFields = {
  /** Honeypot: a hidden field people never see or fill in */
  website: z.string().max(500).optional(),
  /** When the form appeared, in the visitor's own clock (ms) */
  renderedAt: z.number().int().nonnegative(),
  /** When it was sent, in the same clock, so clock differences between devices don't matter */
  submittedAt: z.number().int().nonnegative(),
};

export function enquirySchema(serviceSlugs: readonly string[]) {
  const services = [...serviceSlugs, NOT_SURE];
  return z.object({
    name: requiredText("name", 100),
    email: z
      .string("Enter your email address")
      .trim()
      .min(1, "Enter your email address")
      .max(254, "Your email address must be 254 characters or fewer")
      .pipe(z.email("Enter an email address in the correct format, like name@example.co.uk")),
    phone: optionalPhone,
    businessName: optionalText("business name", 120),
    businessType: z.enum(businessTypes, "Choose the option that best describes you"),
    annualTurnover: z
      .string()
      .refine((v) => v === "" || (turnoverBands as readonly string[]).includes(v), "Choose a turnover band, or leave it blank")
      .default(""),
    serviceNeeded: z
      .string("Choose the service you need, or ‘Not sure yet’")
      .refine((value) => services.includes(value), "Choose the service you need, or ‘Not sure yet’"),
    message: z
      .string("Tell us how we can help")
      .trim()
      .min(20, "Tell us a little more: at least 20 characters")
      .max(2000, "Your message must be 2,000 characters or fewer"),
    consent,
  });
}

export const callbackSchema = z.object({
  name: requiredText("name", 100),
  phone: requiredPhone,
  preferredTime: z.enum(callbackTimes, "Choose a preferred time"),
  topic: optionalText("topic", 200),
  consent,
});

/** What the server accepts: the form fields plus the bot-screening fields */
export function enquiryRequestSchema(serviceSlugs: readonly string[]) {
  return enquirySchema(serviceSlugs).extend(botFields);
}

export const callbackRequestSchema = callbackSchema.extend(botFields);

export type EnquiryValues = z.infer<ReturnType<typeof enquirySchema>>;
export type EnquiryInput = z.input<ReturnType<typeof enquirySchema>>;
export type CallbackValues = z.infer<typeof callbackSchema>;
export type CallbackInput = z.input<typeof callbackSchema>;

/**
 * Bot screening, done after validation. A filled honeypot or a form sent in
 * under three seconds gets a normal-looking success response, so bots learn
 * nothing, but nothing is sent.
 */
export function looksLikeBot(fields: { website?: string; renderedAt: number; submittedAt: number }): boolean {
  if (fields.website && fields.website.trim() !== "") return true;
  const elapsed = fields.submittedAt - fields.renderedAt;
  return elapsed < MIN_FILL_TIME_MS;
}
