/*
 * Email delivery for the contact forms: Nodemailer over SMTP, using the
 * Hostinger mailbox on the client's domain (CLAUDE.md section 6). Everything
 * provider-specific is in this file, so another provider (e.g. Resend) can
 * replace it behind sendMail().
 *
 * Server only: this module reads SMTP secrets and must never reach the browser.
 */

import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

export type Mail = {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  /** Label/value pairs for the development preview, which shows them redacted (never the body) */
  preview: readonly (readonly [label: string, value: string])[];
};

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

/** Thrown when SMTP isn't configured in production, so the route can answer 503 */
export class MailNotConfiguredError extends Error {
  constructor() {
    super("Email delivery is not configured");
    this.name = "MailNotConfiguredError";
  }
}

const isProduction = () => process.env.NODE_ENV === "production";

/** Reads the SMTP settings. Returns null if any are missing. */
export function mailConfig(): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !MAIL_TO) return null;
  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port) || port <= 0) return null;
  return {
    host: SMTP_HOST,
    port,
    // Hostinger: 465 uses implicit TLS (secure true); 587 uses STARTTLS (secure false)
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: MAIL_FROM,
    to: MAIL_TO,
  };
}

/** The business inbox that receives notifications, if configured */
export function notificationAddress(): string | null {
  return mailConfig()?.to ?? null;
}

let transporter: Transporter | null = null;

function getTransporter(config: MailConfig): Transporter {
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  return transporter;
}

/**
 * Sends the emails for one submission.
 * - Configured: sends them through SMTP.
 * - Not configured, development: logs a clear warning and a redacted preview.
 * - Not configured, production: throws MailNotConfiguredError (the route returns 503).
 */
export async function sendMail(mails: readonly Mail[]): Promise<"sent" | "previewed"> {
  const config = mailConfig();

  if (!config) {
    if (isProduction()) throw new MailNotConfiguredError();
    console.warn(
      "\n[email] SMTP is not configured (see .env.example), so nothing was sent. Redacted preview:\n" +
        mails.map(previewMail).join("\n"),
    );
    return "previewed";
  }

  const transport = getTransporter(config);
  for (const mail of mails) {
    await transport.sendMail({
      from: config.from,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  }
  return "sent";
}

/* ---------- Building emails ---------- */

/** Escapes user content for HTML email bodies */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Removes line breaks (header injection) and caps the length of a subject line */
export function safeSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 150);
}

type Row = readonly [label: string, value: string];

/** Plain-text and simple HTML versions of the same content */
export function renderMail(options: { heading: string; intro?: string; rows?: readonly Row[]; paragraphs?: readonly string[]; footer: string }): {
  text: string;
  html: string;
} {
  const { heading, intro, rows = [], paragraphs = [], footer } = options;

  const text = [
    heading,
    "",
    ...(intro ? [intro, ""] : []),
    ...rows.map(([label, value]) => `${label}:\n${value}\n`),
    ...paragraphs.flatMap((paragraph) => [paragraph, ""]),
    "—",
    footer,
  ].join("\n");

  const cell = "padding:8px 12px;border-bottom:1px solid #e4e1d9;vertical-align:top;font-size:15px;line-height:1.5;";
  const html = `<!doctype html>
<html lang="en-GB"><body style="margin:0;padding:24px;background:#faf8f4;font-family:Arial,Helvetica,sans-serif;color:#1b2433;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e4e1d9;border-radius:4px;padding:24px;">
<h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:22px;color:#172b4d;">${escapeHtml(heading)}</h1>
${intro ? `<p style="margin:0 0 16px;font-size:15px;line-height:1.5;color:#5a6472;">${escapeHtml(intro)}</p>` : ""}
${
  rows.length
    ? `<table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 16px;">${rows
        .map(
          ([label, value]) =>
            `<tr><th scope="row" style="${cell}text-align:left;width:34%;color:#5a6472;font-weight:600;">${escapeHtml(label)}</th><td style="${cell}white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}</table>`
    : ""
}
${paragraphs.map((paragraph) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">${escapeHtml(paragraph)}</p>`).join("\n")}
<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e4e1d9;font-size:12px;line-height:1.5;color:#5a6472;">${escapeHtml(footer)}</p>
</div></body></html>`;

  return { text, html };
}

/* ---------- Development preview ---------- */

/** "Saad Haleem" → "S*** H***"; keeps structure, hides content */
function redact(value: string): string {
  if (!value) return "(empty)";
  if (value.includes("@")) {
    const [local, domain] = value.split("@");
    return `${local.charAt(0)}***@${domain.charAt(0)}***`;
  }
  if (/^[+\d\s()-]+$/.test(value)) return `${"*".repeat(Math.max(0, value.length - 3))}${value.slice(-3)}`;
  if (value.length > 40) return `[${value.length} characters]`;
  return value
    .split(/\s+/)
    .map((word) => `${word.charAt(0)}***`)
    .join(" ");
}

/** Structure only: recipients, subject and field labels, with every value redacted. The body is never printed. */
function previewMail(mail: Mail): string {
  return [
    "  ────────────────────────────────────────",
    `  To:       ${redact(mail.to)}`,
    `  Reply-To: ${mail.replyTo ? redact(mail.replyTo) : "-"}`,
    `  Subject:  ${mail.subject.replace(/(from|with) (.+)$/, (_, word: string, rest: string) => `${word} ${redact(rest)}`)}`,
    ...mail.preview.map(([label, value]) => `  ${`${label}:`.padEnd(18)}${redact(value)}`),
    `  (${mail.text.length} characters of plain text and an HTML version, not shown)`,
  ].join("\n");
}
