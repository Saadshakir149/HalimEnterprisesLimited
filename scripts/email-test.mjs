/*
 * npm run email:test
 *
 * Sends ONE test email to MAIL_TO through the SMTP settings in .env.local, so
 * the Hostinger mailbox can be tested locally before the same variables are
 * set in Vercel. It uses the same settings as the site (src/lib/email.ts):
 * the From address is always the SMTP mailbox, with the same timeouts.
 *
 * It refuses to run if .env.local is missing or any required variable is
 * empty, and it never prints the password or any message content.
 */
import nodemailer from "nodemailer";

const REQUIRED = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "MAIL_TO"];

function fail(message) {
  console.error(`\n✖ email:test refused: ${message}\n`);
  process.exit(1);
}

try {
  process.loadEnvFile(".env.local");
} catch (error) {
  if (error && error.code === "ENOENT") fail("no .env.local file. Copy .env.example to .env.local and fill in the mailbox details.");
  throw error;
}

const missing = REQUIRED.filter((name) => !process.env[name]?.trim());
if (missing.length) fail(`these variables are empty in .env.local: ${missing.join(", ")}.`);

const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
const port = Number(SMTP_PORT);
if (!Number.isInteger(port) || port <= 0) fail(`SMTP_PORT must be a number (465 or 587), not "${SMTP_PORT}".`);
const secure = SMTP_SECURE ? SMTP_SECURE === "true" : port === 465;

/* Same rule as alignedFrom() in src/lib/email.ts: the From address must be the SMTP mailbox */
const match = MAIL_FROM.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
const fromAddress = (match ? match[2] : MAIL_FROM).trim();
let from = MAIL_FROM.trim();
if (fromAddress.toLowerCase() !== SMTP_USER.toLowerCase()) {
  const name = match ? match[1].trim().replace(/"/g, "") : "";
  from = name ? `${name} <${SMTP_USER}>` : SMTP_USER;
  console.warn(`! MAIL_FROM's address (${fromAddress}) is not SMTP_USER: the site sends as ${from} instead. Set MAIL_FROM to use ${SMTP_USER}.`);
}

console.log(`Connecting to ${SMTP_HOST}:${port} (${secure ? "SSL/TLS" : "STARTTLS"}) as ${SMTP_USER}…`);
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  connectionTimeout: 8_000,
  greetingTimeout: 8_000,
  socketTimeout: 12_000,
});

try {
  await transport.verify();
  console.log("✔ Logged in to the SMTP server.");
  const info = await transport.sendMail({
    from,
    to: MAIL_TO,
    subject: "SMTP test: Halim Enterprises Limited website",
    text: [
      "This is a test email from npm run email:test.",
      "",
      "If it arrived, the website's contact forms can send email with these settings.",
      "Set the same SMTP_* and MAIL_* variables in Vercel (Production), then redeploy.",
      "",
      `Sent ${new Date().toISOString()} from ${SMTP_HOST}:${port}.`,
    ].join("\n"),
  });
  console.log(`✔ Sent to ${MAIL_TO} (message id ${info.messageId}). Check the inbox in Hostinger webmail, including spam.`);
} catch (error) {
  const code = error && typeof error === "object" && "code" in error ? ` (${error.code})` : "";
  console.error(`\n✖ Sending failed${code}: ${error instanceof Error ? error.message : String(error)}`);
  console.error("  EAUTH: wrong SMTP_USER or SMTP_PASS. ESOCKET/ETIMEDOUT/ECONNECTION: check SMTP_HOST, SMTP_PORT and SMTP_SECURE (465 → true, 587 → false).\n");
  process.exit(1);
} finally {
  transport.close();
}
