/*
 * npm run check:launch
 *
 * Lists everything that still stands between the site and a finished launch,
 * and exits with code 1 while anything is outstanding. It reads the project
 * files directly (no build needed):
 *
 *   - placeholders (PLACEHOLDER_…) left in src/content/site.ts
 *   - the production domain and business email in site.ts
 *   - legal pages still marked "draft", and the draft-noindex flag
 *   - content files still marked "DRAFT – awaiting client approval"
 *   - figures and deadlines still marked // VERIFY
 *
 * Environment variables live in Vercel, not in the repo. To check a set of
 * them as well (e.g. your .env.local, or a copy of the Production values),
 * run:  npm run check:launch -- --env
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const LIVE_URL = "https://www.halimenterpriseslimited.com";
const read = (path) => readFileSync(join(ROOT, path), "utf8");
const lineOf = (text, index) => text.slice(0, index).split("\n").length;

const blockers = [];
const notes = [];

/* ---------- site.ts ---------- */
const site = read("src/content/site.ts");

for (const match of site.matchAll(/^\s*(\w+):\s*"(PLACEHOLDER_\w+)"/gm)) {
  const explain = {
    PLACEHOLDER_ICO: "ICO registration number: the client registers with the ICO, then set site.icoNumber (turns on the footer line and the privacy policy sentence)",
    PLACEHOLDER_AML: "Anti-money-laundering supervisor and number: set site.amlSupervision once confirmed",
    PLACEHOLDER_COMPLAINT_ACKNOWLEDGEMENT_TIME: "Complaints: how quickly complaints are acknowledged (site.complaints.acknowledgeWithin)",
    PLACEHOLDER_COMPLAINT_RESPONSE_TIME: "Complaints: how quickly a full response is sent (site.complaints.respondWithin)",
  }[match[2]];
  blockers.push(`${explain ?? `site.${match[1]} is still ${match[2]}`} [src/content/site.ts:${lineOf(site, match.index)}]`);
}

if (/provisional\(/.test(site)) blockers.push("site.ts still marks a value as provisional()");
const domain = site.match(/domain:\s*"([^"]+)"/)?.[1];
if (`https://${domain}` !== LIVE_URL) blockers.push(`site.domain is "${domain}", expected "${LIVE_URL.replace("https://", "")}"`);
const email = site.match(/^\s*email:\s*"([^"]+)"/m)?.[1];
if (!email || email.startsWith("PLACEHOLDER_")) blockers.push("site.email (the business email) is not set");

if (/booking:\s*false/.test(site)) notes.push("Online booking is off (features.booking): visitors request a consultation by callback form. Fine for launch.");
if (/documentUpload:\s*false/.test(site)) notes.push("Secure document upload is off (features.documentUpload): clients are told a secure link follows the consultation.");
if (/reviews:\s*false/.test(site)) notes.push("Reviews are off (features.reviews) until genuine reviews exist.");
if (/responseTime:\s*null/.test(site)) notes.push("No reply-time promise is shown (site.responseTime is null) until the client confirms one.");
if (/phone:\s*null/.test(site)) notes.push("No phone number is shown (site.phone is null): WhatsApp only.");

/* ---------- Legal pages ---------- */
const legal = read("src/content/legal.ts");
const draftSlugs = new Set();
for (const match of legal.matchAll(/slug:\s*"([\w-]+)",\s*\n[\s\S]*?status:\s*"(draft|approved)"/g)) {
  if (match[2] === "draft") draftSlugs.add(match[1]);
}
for (const slug of draftSlugs) {
  blockers.push(`Legal page /${slug} is still a DRAFT template: replace it with the client's approved policy and set status: "approved" [src/content/legal.ts]`);
}
if (/noindexDraftPages:\s*true/.test(site)) blockers.push("site.legal.noindexDraftPages is true: set it to false once every legal page is approved");

/* ---------- Copy awaiting approval, and figures to verify ---------- */
const contentDir = join(ROOT, "src/content");
const drafts = [];
const verifies = [];
for (const file of readdirSync(contentDir).filter((name) => name.endsWith(".ts")).sort()) {
  const text = readFileSync(join(contentDir, file), "utf8");
  if (/DRAFT – awaiting client approval/.test(text)) drafts.push(file);
  // Real markers only: a comment line that starts with "// VERIFY" (not prose that mentions it)
  for (const match of text.matchAll(/^[ \t]*\/\/ VERIFY:?\s*(.*)/gm)) verifies.push(`${match[1].trim() || "figure or deadline"} [src/content/${file}:${lineOf(text, match.index)}]`);
}
if (drafts.length) blockers.push(`Copy still marked "DRAFT – awaiting client approval": ${drafts.join(", ")} (remove the marker once the client approves each file)`);
for (const item of verifies) blockers.push(`Check and confirm: ${item}`);

/* ---------- Environment (only with --env) ---------- */
if (process.argv.includes("--env")) {
  if (existsSync(join(ROOT, ".env.local"))) process.loadEnvFile(join(ROOT, ".env.local"));
  const env = process.env;
  for (const name of ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "MAIL_TO", "NEXT_PUBLIC_SITE_URL"]) {
    if (!env[name]?.trim()) blockers.push(`Environment variable ${name} is not set`);
  }
  if (env.NEXT_PUBLIC_SITE_URL && env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "") !== LIVE_URL) {
    blockers.push(`NEXT_PUBLIC_SITE_URL is "${env.NEXT_PUBLIC_SITE_URL}", expected "${LIVE_URL}"`);
  }
  const fromAddress = env.MAIL_FROM?.match(/<([^>]+)>/)?.[1] ?? env.MAIL_FROM;
  if (fromAddress && env.SMTP_USER && fromAddress.toLowerCase() !== env.SMTP_USER.toLowerCase()) {
    blockers.push(`MAIL_FROM's address (${fromAddress}) should be SMTP_USER (${env.SMTP_USER}) for SPF/DKIM alignment`);
  }
} else {
  notes.push("Environment variables were not checked (they live in Vercel). Run `npm run check:launch -- --env` to check .env.local or exported values.");
}

/* ---------- Report ---------- */
console.log(`\nLaunch check: ${LIVE_URL}\n`);
console.log(`Confirmed: domain ${domain}, business email ${email}\n`);
if (blockers.length) {
  console.log(`Outstanding (${blockers.length}):`);
  blockers.forEach((item, index) => console.log(`  ${String(index + 1).padStart(2)}. ${item}`));
} else {
  console.log("Outstanding: none");
}
if (notes.length) {
  console.log("\nNotes (not blockers):");
  notes.forEach((item) => console.log(`   - ${item}`));
}
console.log("");
process.exit(blockers.length ? 1 : 0);
