# Halim Enterprises Limited website — project context

This file is the single source of truth for this project. Read it fully at the start of every session and follow it over any assumption of your own. If a prompt conflicts with this file, stop and ask.

## 1. What we are building

A premium, fast, accessible marketing website for a newly incorporated UK accountancy and bookkeeping business. Its job is to turn visitors into enquiries, callback requests, WhatsApp chats and booked free consultations.

It is **not** a client portal, dashboard or web app. No user accounts, no database, no file storage.

- Developer: Saad Shakir (building remotely from Pakistan)
- Client: Saad Haleem, sole director
- Audience: UK sole traders, startups, eCommerce sellers, hospitality businesses and individuals, served remotely anywhere in the UK
- Language: **UK English** everywhere (organisation, colour, enquiry, licence, programme)

## 2. Confirmed business facts

These are verified against the Companies House record and the client's answers. Use them exactly as written.

| Fact | Value |
|---|---|
| Legal name | Halim Enterprises Limited |
| Company number | 17491527 |
| Registered in | England and Wales |
| Incorporated | 30 September 2026 |
| Registered office | Flat 41, Shaftesbury Point, High Street, London, E13 0AB |
| Director | Saad Haleem |
| Brand spelling | **Halim** (never "Haleem" for the business) |
| WhatsApp | +44 7884 607135 → `https://wa.me/447884607135` |
| VAT | Not VAT registered (do not show a VAT number) |
| Chartered status | **No** |
| Registered auditor | **No** |
| Probate / reserved legal activities | **No** |
| Working model | Remote, UK-wide. Consultations by phone or video only |
| Free initial consultation | Yes, by phone or video |
| Prices on site | No. Quotes on enquiry only |
| Software supported | Xero, QuickBooks, Sage, FreeAgent (accounting packages); Dext, Hubdoc (receipt capture). FreeAgent, Dext and Hubdoc confirmed 18 October 2026 |
| Public-facing name | **Halim Enterprises Limited** (the company's own name; decided 18 October 2026, replacing the provisional trading name "Halim Accountants"). Use it in full; never shorten it to "Halim Accountants" |
| Who writes copy | Developer drafts, client reviews and approves |
| Client policies | Client says privacy, cookie, complaints and client care policies exist. Not yet received |

**Provisional (use, but mark as `PROVISIONAL` in config):**
- Domain: `halimaccountants.co.uk` (not yet purchased; chosen under the old trading name, so the client should confirm the domain for the new name). Canonical URLs, the sitemap and og:url use only `NEXT_PUBLIC_SITE_URL`, never this provisional value.
- Tone of voice: professional but friendly

## 3. Services and audiences

**Confirmed services. Build a page for each. Do not add others.**
1. Bookkeeping (priority)
2. VAT returns (priority)
3. Annual / statutory accounts
4. Payroll
5. Company formation
6. Business plans and forecasts
7. Capital Gains Tax

**Pending client confirmation. Define in config with `status: "pending"`. They must NOT render or appear in navigation, sitemap or forms until confirmed:**
- Self Assessment tax returns
- Corporation Tax
- Making Tax Digital

**Audiences. One page each:** Sole traders · Startups · eCommerce sellers · Hospitality and restaurants · Individuals

There are no branch or location pages. The business is remote. Do not create town or city pages.

## 4. Hard content rules (legal and honesty)

The firm is new and its professional status is unconfirmed. Breaking these rules creates legal risk for the client.

Never write, imply or display:
- "Chartered", "Certified", "Chartered Certified", "regulated by", "authorised by", "registered auditor", "HMRC approved" or "HMRC recognised"
- ACCA, ICAEW, AAT or any professional-body name, logo or badge (membership is unconfirmed)
- "qualified accountant", years of experience, client counts, success rates, savings figures, star ratings, awards
- Testimonials or reviews of any kind until genuine, permitted ones are supplied
- Guarantees ("we'll save you money", "never miss a deadline", "money back")
- Xero, QuickBooks or Sage logos, unless that vendor's published terms clearly permit use by a non-partner firm like this one (decided 18 October 2026; reviewed the same day: none of the three permit it, see `docs/ASSETS.md`). The same applies to every other software brand named on the site. Never words like "partner", "certified" or "advisor". Plain text is allowed: "We work with Xero, QuickBooks and Sage."
- The registered office presented as somewhere to visit. It appears **only** in the legal footer and legal pages, labelled "Registered office".
- Invented email addresses, phone numbers, booking links, opening hours, team members or qualifications

When information is missing, use a clearly named placeholder from the content config (Section 7). Never write a plausible-looking fake.

## 5. Required legal disclosures

These appear in the footer on every page:

- Halim Enterprises Limited is registered in England and Wales, company number 17491527
- Registered office: Flat 41, Shaftesbury Point, High Street, London, E13 0AB
- Links to: Privacy policy · Cookie policy · Complaints · Terms of use
- ICO registration number: `PLACEHOLDER_ICO` (the client will register before launch)
- AML supervision line: hidden until confirmed (`PLACEHOLDER_AML`)

## 6. Stack and hosting

- **Next.js** (latest stable, App Router), **React**, **TypeScript** in strict mode
- **Tailwind CSS v4**: CSS-first config, with design tokens in `@theme` inside `src/app/globals.css`. No v3-style `tailwind.config.js` unless the scaffold created one.
- **Motion** (`motion` package, import from `motion/react`). Only where CSS transitions aren't enough.
- **lucide-react** icons
- **React Hook Form + Zod**. Zod schemas are shared between client and server.
- **Next.js Route Handlers** for form submissions
- **Nodemailer over SMTP** using the Hostinger mailbox on the client's domain. Hide it behind `src/lib/email.ts` so another provider (e.g. Resend) can replace it.
- **Hosting: Hostinger Business Web Hosting**, as a managed Node.js web app deployed from GitHub on Node 22. Vercel is not used: its free plan forbids commercial use.
- No database, no CMS, no Redux, no auth, no separate Express server
- Package manager: use whatever the repo already uses; default to **npm**

Server Components by default. Use `"use client"` only for interactive parts (menu, accordion, forms, motion wrappers).

## 7. Code conventions

```
src/
  app/                    routes (App Router)
  components/
    layout/               Header, Footer, MobileNav, SkipLink, WhatsAppButton
    sections/             homepage and page sections
    ui/                   Button, Container, Section, Heading, Card, Badge, Field…
    forms/                EnquiryForm, CallbackForm
  content/
    site.ts               ALL business facts, contact details, placeholders, feature flags
    services.ts           service data + page copy
    audiences.ts          audience data + page copy
    faqs.ts
  lib/                    email.ts, rate-limit.ts, validation schemas, utils
public/images/            optimised, licensed images only
docs/                     PROMPTS.md, ASSETS.md, DEPLOYMENT.md, OPEN-ITEMS.md
```

- **Every business fact lives in `src/content/site.ts`.** Components never hard-code names, numbers, addresses or links.
- Placeholders are typed constants whose value starts with `PLACEHOLDER_`. Missing optional items use `null` and the UI hides them.
- Feature flags in `site.ts` (`features.booking`, `features.reviews`, `features.documentUpload`, `features.callback`) control what renders.
- Copy is written in the content files, not inside JSX, so the client's edits touch one place.
- Name things plainly. No barrel files unless they help. No premature abstraction.

## 8. Design direction (provisional until the client supplies branding)

Personality: **calm, precise, approachable.** It should feel like a well-kept ledger, not a fintech startup or a corporate bank.

- **Palette tokens** (check every pairing meets WCAG AA):
  - `navy` #172B4D (primary, headings, footer)
  - `ink` #1B2433 (body text)
  - `paper` #FAF8F4 (warm off-white page background)
  - `surface` #FFFFFF
  - `teal` #287D72 (single restrained accent: links, focus, key CTAs; 4.9:1 on white)
  - `teal-soft` #D9E6E2
  - `line` #E4E1D9 (hairlines)
  - `muted` #5A6472 (secondary text)
- **Type:** a sturdy serif for headings (provisional: Source Serif 4) and a clean sans for body and UI (provisional: Manrope), both via `next/font/google`. Keep them as tokens so they can be swapped. Use tabular numerals wherever figures align.
- **Signature details:** hairline rules, generous whitespace, a disciplined 12-column grid, and an occasional ledger-style ruled background used sparingly. Do not put rounded corners and shadows on everything; cards earn their border.
- **Logo:** until a real logo exists, use an original typographic wordmark ("Halim" + small-caps "ACCOUNTANTS") as a replaceable SVG component `<Wordmark />`.
- **Imagery:** prefer real photos of the director when supplied. Until then, use licensed Unsplash or Pexels images saved in `public/images/` and logged in `docs/ASSETS.md`. Avoid clichés: piles of cash, handshakes, staged meetings, calculators everywhere.
- **Motion:** subtle and purposeful. Short transitions (150–250 ms), reveal content once, never hide content waiting for JavaScript, and respect `prefers-reduced-motion`. The site must look complete with motion disabled.

## 9. Quality bar

- WCAG 2.2 AA: keyboard navigation, visible focus, a skip link, labelled fields, accessible errors, 24×24 px minimum targets, contrast and reduced motion
- Semantic HTML, one `h1` per page, logical heading order
- Unique metadata per page, canonical URLs, sitemap, robots, Open Graph
- No non-essential cookies or trackers at launch, so no cookie banner is needed. Any embed that sets cookies (e.g. Calendly) is linked out or loaded only after a click.
- Secrets only in environment variables, never sent to the client. Forms are validated on the server, rate-limited and protected by a honeypot. Never log form contents in production.

## 10. Working rules for every task

1. Inspect existing code before changing anything. Reuse what is there and preserve what works.
2. Write complete, working code. Don't just describe the code.
3. Add a dependency only when it earns its place, and say why.
4. Never pretend an integration works. If you couldn't test it (missing credentials or client info), say so plainly.
5. Before claiming a task is done, run `npm run lint`, `npx tsc --noEmit` and `npm run build`, plus tests once they exist.
6. Update `docs/OPEN-ITEMS.md` whenever you add a placeholder or discover missing information.
7. Finish every task with a completion report: files changed, requirements met, checks run and their results, outstanding issues, and the recommended next step.

## 11. Open items (keep in sync with docs/OPEN-ITEMS.md)

| Item | Status |
|---|---|
| Public name and domain | Name decided: Halim Enterprises Limited (18 October 2026). Domain still provisional (halimaccountants.co.uk, not purchased): client to confirm |
| Business email and enquiry recipient | Missing |
| Is the WhatsApp number also the call number? | Unconfirmed |
| Response-time promise (same day vs 24 h) | Unconfirmed. Since 18 October 2026, publish no reply time at all until the client confirms one (`site.responseTime` is null) |
| Professional body / ACCA status | Unconfirmed: mention nothing |
| AML supervisor and number | Unconfirmed: hidden |
| ICO registration number | Client registering before launch |
| Self Assessment / Corporation Tax / MTD | Pending |
| Logo and brand colours | Missing: provisional wordmark and palette |
| Director photo, bio, qualifications, LinkedIn | Missing |
| Booking provider (Calendly recommended) | Missing |
| Secure document upload provider | Missing: link out to the chosen provider, never build storage |
| Google Business Profile link and reviews | Profile reportedly exists; no reviews yet |
| Client's existing policies | Not received |
| Budget and launch date | Missing |
