# Launch checklist: www.halimenterpriseslimited.com

The dashboard steps to take the site live, in order. Nothing here is done by the code; each step is a manual action in Hostinger, Vercel, Google or by the client. Tick each box as you go.

Reference: `docs/DEPLOYMENT.md` (how hosting works) and `.env.example` (every variable).

---

## a) Hostinger: create the mailbox (BEFORE deploying the email change)

The site now shows **info@halimenterpriseslimited.com** in the footer, on /contact, /book-consultation, the service pages and the legal pages. If the mailbox does not exist when this is deployed, mail sent to it bounces.

- [ ] hPanel → **Emails** → choose `halimenterpriseslimited.com` → **Email accounts** → create **info@halimenterpriseslimited.com** with a strong password. Store the password in a password manager.
- [ ] Open the mailbox → **Connect apps & devices** (or "Configuration settings") and note the **outgoing (SMTP)** settings. Expected: server `smtp.hostinger.com`, port `465`, SSL/TLS. If hPanel shows something different, use hPanel's values in steps b and c.
- [ ] **Do not touch** any existing email DNS record (MX, SPF `TXT`, DKIM, DMARC, `autodiscover`/`autoconfig` CNAMEs). Only `A @` and `CNAME www` point at Vercel.

## b) Local: test SMTP before touching Vercel

- [ ] Copy `.env.example` to `.env.local` (it is gitignored).
- [ ] Fill in `SMTP_PASS` with the mailbox password. Check the other values match step a.
- [ ] Run `npm run email:test`. It refuses to run if any variable is missing. It logs in, then sends one test email to `MAIL_TO`.
- [ ] Open Hostinger webmail (hPanel → Emails → info@ → **Webmail**, or https://mail.hostinger.com) and confirm the test email arrived. Check spam too.
  - `EAUTH`: wrong password or user.
  - `ETIMEDOUT` / `ECONNECTION`: wrong host, port or `SMTP_SECURE` (465 → `true`, 587 → `false`).

## c) Vercel: environment variables (Production), then redeploy

Vercel → the project → **Settings** → **Environment Variables**. Add each for the **Production** environment. Enter values without quotes.

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.halimenterpriseslimited.com` |
| `SMTP_HOST` | `smtp.hostinger.com` (or hPanel's value) |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `info@halimenterpriseslimited.com` |
| `SMTP_PASS` | the mailbox password (mark it **Sensitive**) |
| `MAIL_FROM` | `Halim Enterprises <info@halimenterpriseslimited.com>` |
| `MAIL_TO` | `info@halimenterpriseslimited.com` |
| `GOOGLE_SITE_VERIFICATION` | *optional*, only if you use the HTML-tag method in step f |

Indexing needs **no variable**. The code uses Vercel's own `VERCEL_ENV`: production is indexed, previews are not.

- [ ] Check that **Settings → Environment Variables → "Automatically expose System Environment Variables"** is on (it is by default). Indexing depends on it.
- [ ] Push this change to `main` (or **Deployments** → latest production → ⋯ → **Redeploy**) so the variables take effect. They are read at build time.

## d) Vercel: upgrade to Pro

- [ ] Team **Settings → Billing** → upgrade the team to **Pro** (Vercel's Hobby plan is for personal, non-commercial use only).

## e) Live tests (after the redeploy)

- [ ] **Enquiry form** (/contact), sent from a phone: success message shown.
  - The notification arrives at info@.
  - Replying to it addresses the **visitor** (Reply-To).
  - The visitor receives the acknowledgement email. Check spam on both sides.
- [ ] **Callback form** (/contact and /book-consultation): success message shown; the notification arrives at info@.
- [ ] **mailto links:** tap the email in the footer, on /contact, /book-consultation, a service page's quote box, /privacy-policy and /complaints. Each should open a new email to info@halimenterpriseslimited.com.
- [ ] **WhatsApp:** tap one link on a phone and one on a computer; both open a chat with +44 7884 607135.
- [ ] **Redirect:** `http://halimenterpriseslimited.com` and `https://halimenterpriseslimited.com` both end at `https://www.halimenterpriseslimited.com/` (308).
- [ ] **HTTPS:** padlock shown, no certificate warning.
- [ ] **https://www.halimenterpriseslimited.com/robots.txt** shows `Allow: /` and `Sitemap: https://www.halimenterpriseslimited.com/sitemap.xml`.
- [ ] **https://www.halimenterpriseslimited.com/sitemap.xml** lists only `https://www.halimenterpriseslimited.com/...` URLs (19 pages).
- [ ] **View source** on the homepage contains:
  - `<link rel="canonical" href="https://www.halimenterpriseslimited.com"`;
  - **no** `noindex`.
- [ ] A **preview deployment** (any `*.vercel.app` URL) shows `noindex` in view-source, and its `/robots.txt` says `Disallow: /`.

## f) Google Search Console

- [ ] https://search.google.com/search-console → **Add property** → **Domain** → `halimenterpriseslimited.com`.
- [ ] Copy the `google-site-verification=…` TXT value. In Hostinger DNS add a **TXT** record: name `@`, value as copied.
  - This is the preferred method and needs **no code**.
  - The email TXT records stay as they are.
- [ ] Wait for DNS (minutes to a few hours), then click **Verify**.
  - *Alternative, only if DNS isn't possible:* use a URL-prefix property with the HTML tag. Set `GOOGLE_SITE_VERIFICATION` in Vercel to the tag's `content` value, redeploy, then verify.
- [ ] **Sitemaps** → submit `https://www.halimenterpriseslimited.com/sitemap.xml`.
- [ ] **URL inspection** → `https://www.halimenterpriseslimited.com/` → **Request indexing**.

## g) Client actions (Saad Haleem)

- [ ] **Domain registration:** verify the email Hostinger sent to **saad.haleem02@gmail.com**. Unverified domains can be suspended.
- [ ] **Mailbox access:** log in to info@ (Hostinger webmail, or add the account on his phone using the settings from step a). Enquiries arrive there.
- [ ] **ICO:** register with the Information Commissioner's Office and send the registration number. It goes into `site.icoNumber` in `src/content/site.ts`, which turns on the footer ICO line and the privacy-policy sentence.
- [ ] Send the remaining items in `docs/OPEN-ITEMS.md`:
  - the real policies;
  - the complaint timescales;
  - the AML supervisor, if any;
  - approval of the website copy.

## h) Final clean-up (after the ICO number and real policies arrive)

- [ ] Replace each legal page with the client's approved policy and set its `status: "approved"` (`src/content/legal.ts`). This removes the DRAFT banner.
- [ ] Set `site.legal.noindexDraftPages` to `false`.
- [ ] Fill in `site.icoNumber`, the complaint timescales and `site.amlSupervision` (if confirmed).
- [ ] Remove the "DRAFT – awaiting client approval" marker from each content file once the client approves it, and resolve every `// VERIFY` comment.
- [ ] Run `npm run check:launch` until it reports **Outstanding: none**. Also run `npm run check:launch -- --env` with the production values in `.env.local` to check the variables.
- [ ] Commit, push to `main`, and repeat the robots.txt, sitemap and canonical checks from step e.
