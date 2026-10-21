# Open items

Mirrors CLAUDE.md section 11; keep the two in step. Values marked `PLACEHOLDER_` in `src/content/site.ts` are never shown to visitors. `npm run check:launch` lists everything still outstanding; the dashboard steps for going live are in `docs/LAUNCH-CHECKLIST.md`.

## From CLAUDE.md section 11

| Item | Status | In the code |
|---|---|---|
| Public name and domain | **Done.** Halim Enterprises Limited, live at https://www.halimenterpriseslimited.com (21 October 2026) | `site.brandName`, `site.domain`, `siteUrl` |
| Business email and enquiry recipient | **Done.** info@halimenterpriseslimited.com (21 October 2026). Real delivery still to be tested on the live site | `site.email`; `SMTP_USER`/`MAIL_FROM`/`MAIL_TO` in Vercel |
| Hosting | **Changed** to Vercel (Pro plan needed for commercial use); domain, DNS and email stay at Hostinger | `docs/DEPLOYMENT.md` |
| Is the WhatsApp number also the call number? | Unconfirmed | `site.phone` is `null`; copy says "message us on WhatsApp", never "call" |
| Response-time promise (same day vs 24 h) | Unconfirmed: none shown anywhere | `site.responseTime` is `null` |
| Professional body / ACCA status | Unconfirmed: mention nothing | — |
| AML supervisor and number | Unconfirmed: hidden | `PLACEHOLDER_AML`, hidden |
| ICO registration number | Client registering before launch | `PLACEHOLDER_ICO`, hidden |
| Self Assessment / Corporation Tax / MTD | Pending | `status: "pending"` in `services.ts`, never rendered |
| Logo and brand colours | Missing: provisional wordmark and palette | `Wordmark`, `globals.css` |
| Director photo, bio, qualifications, LinkedIn | Missing | Monogram tile on the homepage |
| Booking provider (Calendly recommended) | Missing | `features.booking: false`, `site.booking` null (iteration 8) |
| Secure document upload provider | Missing: link out, never build storage | `features.documentUpload: false`, `site.documentPortal` null (iteration 8) |
| Google Business Profile link and reviews | Profile reportedly exists; no reviews yet | `features.reviews: false`, `site.googleBusinessProfileUrl` null, `site.reviews` empty (iteration 8) |
| Client's existing policies | Not received | Legal pages are stubs |
| Budget and launch date | Missing | — |

## Launch preparation (21 October 2026)

- [x] Domain confirmed: www.halimenterpriseslimited.com (apex redirects to www). Hosting moved to Vercel; DNS and email stay at Hostinger.
- [x] Business email confirmed: info@halimenterpriseslimited.com. Shown in the footer, on /contact (its own card), on /book-consultation, in the service-page quote box, in the privacy policy (for data-protection requests) and the complaints procedure, and in the homepage JSON-LD `contactPoint`.
- [ ] **Create the mailbox before deploying** (otherwise mail to the address shown on the site bounces), then test with `npm run email:test` and on the live forms. Steps: `docs/LAUNCH-CHECKLIST.md`.
- [ ] **Vercel Pro plan.** The Hobby plan forbids commercial use.
- [ ] **ICO registration** (client): once the number arrives, set `site.icoNumber`; the footer line and privacy-policy sentence then appear.
- [ ] **Domain-registration email** sent to saad.haleem02@gmail.com: the client must verify it, or the domain can be suspended.
- [ ] **Google Search Console:** add a Domain property, verify with a DNS TXT record in Hostinger, submit the sitemap.

## Website revision (18 October 2026)

Brand changed to Halim Enterprises Limited and all copy rewritten (details in `docs/CONTENT-SEO-AUDIT.md`). Questions for the client:

- [ ] **Limited companies as an audience.** The brief's five audiences don't include limited companies, but annual/statutory accounts and company formation (both selected) serve them, and the payroll page addresses company directors. Should "Limited companies" become a sixth audience page, or stay covered within the services only?
- [x] **Domain for the new name.** Done: www.halimenterpriseslimited.com (21 October 2026). Every absolute URL now uses it.
- [ ] **Reply-time commitment.** No response time is shown anywhere now. If the client wants one (for example "within one working day"), set `site.responseTime` and it reappears on the contact page, in form confirmations and in the acknowledgement email.
- [ ] **"Clients deal directly with the director" / "one point of contact"** (homepage, about page). Confirm this is how the company will work.
- [ ] **New headline:** "Bookkeeping, VAT and accounting for UK small businesses". Alternatives are in `src/content/home.ts`.
- [ ] **Email to the visitor** now says "we will reply to you by email". Confirm email is the channel the client will reply through.
- [ ] **Legal pages** still say only "This website is run by Halim Enterprises Limited" (the "trading as Halim Accountants" wording is removed). Their substance is unchanged and still a draft for professional review.
- [ ] **No social-sharing image** exists yet. Pages share a title and description only. A branded image (1200 × 630) can be added once there is a logo.

## Software strip marquee (iteration 14)

- [ ] **Updated trademark line** (draft): adds "FreeAgent, Dext and Hubdoc are trademarks of their respective owners."
- [ ] **Hard-coded software mentions still name only Xero, QuickBooks and Sage** (service and audience copy in `src/content/services.ts` and `src/content/audiences.ts`, e.g. "We work with Xero, QuickBooks and Sage"). Still true, but incomplete now FreeAgent is confirmed; update with the client's next copy review. Sentences built from `site.software` (homepage, FAQs) already include FreeAgent.

## Full-width photo hero (iteration 13)

Supersedes the iteration 11 hero items. DRAFT in `src/content/home.ts`:

- [ ] **Headline:** "Clear accounts. Confident decisions." (second sentence in light teal). Earlier options are kept in `hero.headlineOptions`.
- [ ] **Lead:** "Practical bookkeeping, VAT returns and year-round accounting support for UK small businesses and individuals, with everything explained in plain English."
- [ ] **Reassurance:** "Free initial consultation by phone or video" and "For clients anywhere in the UK". The brief suggested "Clients across the UK", which implies an existing client base the newly incorporated practice can't yet claim.
- [ ] **Hero photo.** A Pexels stock photo of an empty boardroom with a city view, under a navy wash (free licence, no credit needed; see `docs/ASSETS.md`). It is not the firm's office (it works remotely), so nothing may caption or describe it as "our office". The boardroom look leans more corporate than CLAUDE.md's "calm, approachable" direction; the developer chose it to match a reference. Replace with a photo of the director once supplied.
- The consultation card no longer appears in the hero; its four points still appear on /book-consultation.

## Brand assets (iteration 12)

Details and sources in `docs/ASSETS.md`.

- [ ] **WhatsApp mark.** Download Meta's official WhatsApp brand pack (requires accepting Meta's brand guidelines), choose the glyph and confirm the floating button complies (official colours unmodified, not the most prominent element). Until then the button uses a generic Lucide icon.
- [ ] **Software logos.** Not usable now: Xero restricts its logo to partner-programme accountants with their badge, Intuit requires a written licence, and Sage gives no general permission. Revisit only if the client joins a partner programme or gets written permission.
- [ ] **Trademark line under the software strip** (draft, for client approval): "Xero is a trademark of Xero Limited. QuickBooks is a registered trademark of Intuit Inc. Sage is a trademark of The Sage Group plc. Halim Accountants is independent: we are not affiliated with, endorsed by or approved by these companies."

## Hero and software strip (iteration 11)

Supersedes the hero items in the iteration 10 list below. DRAFT in `src/content/home.ts`:

- [ ] **Hero headline:** "Know where your business stands. Know what comes next." (second sentence in teal).
- [ ] **Hero lead:** "Bookkeeping, VAT returns and year-round accounting for small businesses and individuals across the UK, with everything explained in plain English."
- [ ] **Consultation card points** (also used on /book-consultation): "Your business and your goals", "Your current bookkeeping setup", "What you need for VAT", "Agreeing the next steps".
- [ ] **Software strip heading:** "Software we support". Names are shown as plain text, not logos (see the logo item below).
- [ ] **Hero photo.** A temporary Unsplash photo (see `docs/ASSETS.md`), not the director. Replace it with a real photo of the director once supplied. There's no model release, so it must never be captioned or presented as staff or a client.
- The "What happens next" note from iteration 10 has been removed from the hero.

## Homepage redesign (iteration 10)

All new wording is DRAFT in `src/content/home.ts`, for the client to approve:

- [ ] **Hero headline.** In use: "Know where your business stands, and what comes next". Alternatives: "Clear books, clear deadlines, one person to ask", "Accounting that makes running your business clearer", plus the three earlier options (all in `hero.headlineOptions`; the first is used).
- [ ] **Hero eyebrow and lead.** Eyebrow: "Bookkeeping · VAT returns · Accounting". Lead: "Bookkeeping, VAT returns and year-round accounting for small businesses and individuals across the UK. Personal support by phone and video, with everything explained in plain English."
- [ ] **"What happens next" note in the hero:** "Talk it through / Get a clear quote / We get started", and "No obligation to go ahead".
- [ ] **Priority services.** Bookkeeping: "Always know where your business stands", with "…so the numbers are ready whenever you need them". VAT: "VAT returns, prepared and explained", with "Nothing sent until you approve it" (confirm this matches how the client works).
- [ ] **Services lead:** "Most small businesses start with bookkeeping or VAT. Add more as your business grows." (Deliberately general, not "most clients": the practice is new.)
- [ ] **Commitments lead:** "A small, personal practice: you speak to someone who knows your business and explains things clearly."
- [ ] **Software brand logos.** The strip shows the names in the site's own type. CLAUDE.md section 4 forbids Xero, QuickBooks and Sage logos. If the client wants the official marks, that rule needs changing in writing, and each brand's logo-use guidelines must be checked (some limit use to accredited partners).

## Production audit (iteration 9)

Found in the audit and not yet built. All are developer tasks (the Iteration 9 build items in docs/PROMPTS.md):

- [ ] **No security headers.** `npm run start` sends no Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy or frame-ancestors, and does send `X-Powered-By: Next.js`.
- [ ] **No robots.txt, sitemap.xml or Open Graph/Twitter metadata.** All three return 404 or are absent on every page. The sitemap must leave out `/send-documents`, `/styleguide`, draft legal pages and pending services.
- [ ] **No homepage Organization/AccountingService JSON-LD.**
- [ ] **No `/favicon.ico`** (only `/icon.svg`). Some browsers and crawlers request it directly and get a 404.
- [ ] **`/styleguide` is public in production** (noindexed, unlinked). Decide whether to remove it from production builds.
- [ ] **Rate-limit key on Vercel.** `clientIp()` uses the first `X-Forwarded-For` value. On Vercel that header is set by Vercel's edge from the connecting client, so it should not be spoofable; confirm on the live site (send two test enquiries and check both are counted against the same address) rather than assuming it.
- [ ] **Real email delivery** is still untested (see the forms section below).
- [ ] **Not tested:** real Safari (only Playwright's WebKit engine on Windows), real iOS or Android devices, and a screen reader.

## Integrations (iteration 8)

All three integrations are built and tested with test values, and all are **switched off**. Each one turns on in `src/content/site.ts`: fill in its details, then set its flag to `true`. If the details are missing or invalid, the integration stays hidden even with its flag on, and `next dev` shows why. Validation is in `src/lib/integrations.ts`.

### Booking (`features.booking`, `site.booking`)

- [ ] **Choose a booking tool.** Calendly is recommended; Microsoft Bookings also works if the client has Microsoft 365. Then set `site.booking = { provider: "calendly", url: "https://calendly.com/…" }`. The URL must be https, on the provider's own domain (`calendly.com`, or `outlook.office.com`, `outlook.office365.com` or `bookings.cloud.microsoft`), and point at a booking page.
- [ ] **Confirm the consultation length** before creating the event type (still unconfirmed, so no duration appears on the site).
- [ ] **Test with the real link once it exists.** It has only been tested with made-up URLs: the button, the new tab and the click-to-load behaviour all work, but the provider shows its own "not found" page inside the calendar. Microsoft Bookings refuses to be framed by non-https pages, so its embed can only be checked on the live https site.
- [ ] **Cookie policy wording.** When booking is on, the cookie policy gains a section explaining that the calendar loads only after a click, and the privacy policy names the provider. Both are drafts for the client's review.
- [ ] **Don't use the provider's embed script or popup widget.** The site uses a plain iframe after a click, so nothing from the provider loads or sets cookies on page view.

### Secure document upload (`features.documentUpload`, `site.documentPortal`)

- [ ] **Choose a portal.** Until then, `/send-documents` says "We’ll send you a secure upload link after your consultation". Options to discuss with the client:
  - **A practice-management client portal.** Many accounting practice-management tools include a client portal with secure document requests and e-signatures. This is the best fit once the practice has a few clients, because documents, requests and engagement letters live in one place.
  - **A secure file-request link from the business Microsoft 365 or Google Workspace account.** OneDrive or SharePoint "Request files", or a Google Drive folder that accepts uploads. Low cost, and it uses the business's own storage and access controls. Requires a business account on the domain, not a personal one.
  - **A dedicated secure file-transfer service**, if neither of the above suits.
- [ ] **Then set** `site.documentPortal = { name: "…", url: "https://…" }` and `features.documentUpload = true`. Any https URL is accepted, because the provider is the client's choice.
- [ ] **Recommendation: do not build a custom upload feature.** A custom build would need authentication for every client, private encrypted storage, encryption in transit and at rest, malware scanning of every file, file type and size limits, access logging, a retention and deletion policy, backups, and handling of UK GDPR rights requests. That is a security-critical system to run and maintain, and CLAUDE.md rules out a database and file storage. A reputable portal already does all of this.
- [ ] **`/send-documents` copy** (DRAFT in `pages.ts`): check that the three steps ("We tell you exactly which documents we need…") match how the client works. The page is noindexed, linked from /contact only, and not in the navigation or (future) sitemap.

### Reviews (`features.reviews`, `site.reviews`, `site.googleBusinessProfileUrl`)

- [ ] **Google Business Profile link.** Supply the public profile or review link (`g.page`, `maps.app.goo.gl` or `google.com/maps`). Other domains are rejected.
- [ ] **Reviews: only genuine ones, with permission.** Each entry must be copied word for word from Google, with the reviewer's agreement and the client's approval (`permission: true`). A star rating is shown only for a review whose author gave one; there is never an average or a count. Fake or edited reviews are unlawful under the DMCC Act 2024, as well as against CLAUDE.md section 4.
- [ ] **Section copy** (DRAFT in `pages.ts`): "What clients say" and "Reviews from our Google Business Profile, shared with the reviewers’ permission."

### WhatsApp

- [ ] **Prefilled messages** (DRAFT, `whatsappMessages` in `pages.ts`): general, consultation, documents, and "Hello, I’d like to ask about {topic}." on service and audience pages. Visitors can edit the text before sending.
- [ ] **Tested by link format only.** Every link is `https://wa.me/447884607135?text=…`, WhatsApp's documented click-to-chat format: it opens the app on a phone, and on a computer it offers WhatsApp Desktop or falls back to WhatsApp Web. Opening it on a real phone was not tested. The client should tap one link from a phone and one from a computer before launch.

## Forms and email (iteration 7)

- [ ] **Business mailbox and SMTP settings.** Mailbox: info@halimenterpriseslimited.com (Hostinger). Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` and `MAIL_TO` in Vercel (Production; values in `.env.example`), after testing them locally with `npm run email:test`. Until they are set the forms return a friendly 503 in production.
- [ ] **Real email delivery is untested.** No mailbox exists yet. Once the variables are in `.env.local`, send a test enquiry and a test callback, and check both the notification and the acknowledgement arrive (and not in spam). Check SPF, DKIM and DMARC are set for the domain.
- [ ] **Agree the email copy** in `src/content/emails.ts` and the form copy in `src/content/forms.ts` (both DRAFT).
- [ ] **The 3-second bot threshold** (`MIN_FILL_TIME_MS`): anyone who sends a form within 3 seconds of it appearing gets a success message but nothing is sent. That is unlikely for the enquiry form, but a visitor using browser autofill on the short callback form could get close. Review once real traffic is seen.
- [ ] **Rate limiting is in memory** (5 per 10 minutes per IP). On Vercel the forms are serverless functions, so counts live in one warm instance and reset on cold starts: it stops bursts but is not a firm limit. If spam becomes a problem, move it to a shared store (e.g. Upstash Redis via the Vercel Marketplace) behind the same interface. The honeypot and timing checks apply regardless.
- [x] **Testing before the domain is live.** Vercel preview deployments are allowed to post to the forms automatically (their own `VERCEL_URL`); other test origins can go in `FORM_ALLOWED_ORIGINS`.
- [ ] **Dev-only audit advisories (iteration 9).** `npm audit` reports 5 high advisories in ESLint tooling (`braces` via `eslint-config-next`). Nothing that runs on the server or in the browser is affected; `npm audit --omit=dev` reports 0. The suggested `--force` fix would downgrade `eslint-config-next` to v14, so it has not been applied.

## Supporting pages (iteration 6)

Placeholders and drafts added in `src/content/site.ts`, `legal.ts` and `pages.ts`. None of them is visible to visitors except the deliberate DRAFT banners on the legal pages. Dev-only warnings show in `next dev`.

- [ ] **Client's own policies** (privacy, cookies, complaints, terms and client care) are not received. The four legal pages are DRAFT templates in `src/content/legal.ts`. To launch, replace each one, set its `status` to `"approved"` (which removes the banner), and set `site.legal.noindexDraftPages` to `false`.
- [ ] **Privacy policy draft**: describes the enquiry and callback forms, email delivery through the hosting provider's mailbox, WhatsApp (Meta) as a third party, and server logs. It needs legal review. Retention is described in general terms only.
- [ ] **Cookie policy draft**: "This website does not set any cookies." Verified in iterations 6 and 8: no cookies or browser storage, and no third-party requests on any page load. If booking is switched on, the policy adds a section on the click-to-load calendar.
- [ ] **ICO registration number** (`PLACEHOLDER_ICO`): the ICO sentence in the privacy policy is hidden until it is supplied.
- [ ] **Complaints timescales**: `PLACEHOLDER_COMPLAINT_ACKNOWLEDGEMENT_TIME` and `PLACEHOLDER_COMPLAINT_RESPONSE_TIME`. Until they are supplied, the page says "promptly" with no timescale.
- [ ] **Business email**: the email card on /contact and the email lines in the privacy and complaints pages are hidden. Everything falls back to the contact page.
- [ ] **Director profile** (`site.directorProfile`): photo, bio, qualifications, LinkedIn and the director's own words for a pull quote are all `null`. /about shows only the factual line "Saad Haleem is the director of Halim Enterprises Limited, the company behind Halim Accountants." and a monogram tile.
- [ ] **Consultation length**: no duration is stated anywhere until the client confirms one.
- [ ] **Booking**: `features.booking` is false, so /book-consultation offers "Request a consultation" (to the callback form) and WhatsApp. The provider integration is built (iteration 8) and waits for a booking link.
- [ ] **About page copy**: "We are a new practice, and we would rather say so than pretend otherwise" and "London, Leeds or the Highlands". Confirm the client is comfortable with this tone.
- [ ] **New FAQs** (`faqs.ts`): taking over from a current accountant ("we contact your current accountant"), and access to accounting software ("invite your accountant as a separate user"). Confirm these match how the client works.

## Filing on clients' behalf (iteration 5)

- [ ] **Does the firm file with Companies House and HMRC as an agent?** Companies House now expects third parties who file for others to be registered Authorised Corporate Service Providers (ACSPs), and HMRC agent services also involve AML supervision, which is unconfirmed. Until the client confirms:
  - Company formation and annual accounts say "we help you prepare" and "ready to file", never "we file for you".
  - VAT returns and payroll say returns and RTI submissions are submitted through MTD or payroll software. This assumes the client can act as an HMRC agent. Confirm, or reword to "we prepare it and you submit it".

## Figures and deadlines marked `// VERIFY` (iteration 5)

These are in `src/content/services.ts`. Check each one before launch.

- [ ] Annual accounts: "A private limited company usually has nine months from the end of its financial year to file accounts with Companies House" (first accounts can differ).
- [ ] Capital Gains Tax: "report it and pay within 60 days of completion" for UK residential property.
- [ ] Company formation: Companies House identity verification for directors and people with significant control (in "What's included" and "What we'll need from you").

## Service and audience copy for client approval (iteration 5)

All of `services.ts`, `audiences.ts` and `pages.ts` is marked DRAFT. Points to confirm specifically:

- [ ] Each service's "How it works" steps match how the client actually works (e.g. bookkeeping "monthly or quarterly", VAT "nothing is submitted until you are happy").
- [ ] Payroll includes statutory payments (SSP, SMP) and year-end P60s.
- [ ] Individuals: the FAQ "Can you help with other personal tax questions?" stays deliberately general, because Self Assessment is pending.
- [ ] The quote box on desktop hides the floating WhatsApp button, because the box has its own WhatsApp link. Confirm this is acceptable.

## Homepage copy for client approval (iteration 3)

All homepage copy is in `src/content/home.ts`, and the FAQs are in `src/content/faqs.ts`. Both are marked DRAFT.

- [ ] Choose a hero headline. The first of these is in use:
  1. "Your books, kept in order all year round"
  2. "Clear, steady accounting support for UK small businesses"
  3. "Bookkeeping and VAT, handled personally, wherever you are"
- [ ] "A personal point of contact: you have one person to speak to." Confirm that the director is each client's contact.
- [ ] "Get a clear quote". The brief said "fixed quote". Confirm whether fees are fixed before adding "fixed".
- [ ] "For clients anywhere in the UK". Used instead of "Clients across the UK", which implies an existing client base.
- [ ] "Transactions recorded and reconciled against your bank" and "The figures explained before you approve them". Confirm these match how the client works.
- [ ] About teaser: "a new practice, set up in 2026". Confirm the client is happy to say this.
