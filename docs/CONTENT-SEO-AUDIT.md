# Content and SEO audit (18 October 2026)

Phase A of the full website revision. It records the state of the site before the revision, the problems found, and the decisions taken. The revision itself is described at the end ("What was changed").

## Decisions confirmed by the developer before the revision

| Question | Decision |
|---|---|
| Public-facing name | **Halim Enterprises Limited** replaces "Halim Accountants" everywhere. CLAUDE.md sections 2 and 5 updated; the "trading name" sentence is removed from the footer and emails. |
| Software list | **All six stay**: Xero, QuickBooks, Sage and FreeAgent (accounting packages), Dext and Hubdoc (receipt capture), as confirmed on 18 October 2026. Every list on the site is made consistent. |
| Response-time promise | **Removed** until the client confirms a commitment. Form confirmations become neutral. CLAUDE.md section 11 updated. |

## 1. Brand references found

"Halim Accountants" appeared in 41 places in `src/`:

| Where | Count | Type |
|---|---|---|
| `site.ts` (`brandName`, `legalStatement()`) | 2 | Source of truth: wordmark, page titles, footer disclosure, emails, about page, legal pages and the trademark line all read from here |
| Hard-coded page titles (`metaTitle`) in `services.ts`, `audiences.ts`, `pages.ts`, `legal.ts` | 24 | User-facing (browser tabs, search results) |
| About and send-documents descriptions in `pages.ts` | 2 | User-facing |
| `legal.ts`: "Halim Enterprises Limited, trading as Halim Accountants" | 1 | Legal |
| `globals.css` comment | 1 | Technical |
| Tests and fixtures (`integrations.test.ts` booking URLs) | 3 | Technical: example URLs only, not shown to visitors |

## 2. Content problems

### 2.1 Formulaic, repeated phrasing

| Phrase | Occurrences before | Problem | Replacement approach |
|---|---|---|---|
| "plain English", "plain-English", "without jargon", "We keep things plain" | 11 (hero lead, priority-service points, bookkeeping, annual accounts, CGT, startups, about page, the "Jargon / In plain English" tile) | Says the same thing in place of saying anything specific | Say what the client actually receives: the figures and the transactions behind them before approving a return, a list of outstanding items, what is needed and by when |
| "talk it through", "Ready to talk it through?" | 5 page CTAs + 3 answers | Vague; the same heading closes 22 pages | Specific CTAs ("Discuss your requirements", "Arrange your free consultation"); answers say what happens in the consultation |
| "Clear accounts. Confident decisions." | Hero headline | Slogan; does not say what the business does | Headline states the offer: "Bookkeeping, VAT and accounting for UK small businesses" |
| "know where your business stands", "keep you on track" | 4 | Generic promise | Describe the output (reconciled records, a summary of income, expenses and outstanding items) |
| "straightforward, personal service", "a personal practice" | 4 | Repeated self-description | Facts: newly incorporated company, works remotely, client deals with the director |
| "practice" | 12 | Reads as a chartered/accountancy-practice term and no longer matches the company name | "company", "we" |

### 2.2 Messages that do not match how the site works

| Item | Before | Problem |
|---|---|---|
| "Book a free consultation" (header, hero, 20+ CTAs, page title of /book-consultation) | Online booking is switched off (`features.booking: false`); the page shows a callback form | The label implies choosing an appointment. Labels now follow the real state: "Request a free consultation" while booking is off, "Book…" automatically once a booking tool is switched on |
| "We aim to reply within one working day" (contact page, FAQ, both form confirmations, acknowledgement email) | Provisional, unconfirmed | Removed until the client confirms |
| Footer and emails: "Halim Accountants is a trading name of Halim Enterprises Limited" | Wrong after the brand decision | Replaced with "Halim Enterprises Limited is registered in England and Wales, company number 17491527. Registered office: …" |
| Software lists | Homepage and FAQs listed four packages; bookkeeping FAQ, VAT FAQ, sole-traders page and two meta descriptions listed only three | Lists now built from `site.software` and `site.tools` everywhere |

### 2.3 Business-scope inconsistency (needs the client)

- **Limited companies.** The client brief's audiences are sole traders, startups, eCommerce sellers, hospitality and individuals. "Limited companies" is not one of them, yet the client selected **annual/statutory accounts** and **company formation**, which serve limited companies, and the annual accounts and payroll pages address company directors. The copy keeps describing what those services involve for a company, but no "limited companies" audience is created. Recorded in `docs/OPEN-ITEMS.md` as a question for the client.
- **"One point of contact" / "you work directly with the director"** remains an assumption awaiting confirmation (already in OPEN-ITEMS).

## 3. SEO findings (before)

| Area | Finding |
|---|---|
| Page titles | Each title hard-coded with "\| Halim Accountants"; homepage title was only the brand name ("Halim Accountants"), with no description of the business |
| Meta descriptions | Present on every page; several repeated "plain-English" and "Book a free consultation" |
| Canonical URLs | Built from `siteUrl`, which falls back to the **provisional, unpurchased** domain `halimaccountants.co.uk`. Canonicals pointing at a domain that is not live (and no longer matches the brand) would mislead search engines |
| Sitemap / robots | **None** (`/sitemap.xml` and `/robots.txt` returned 404) |
| Open Graph / social sharing | **None** |
| Structured data | Breadcrumbs and FAQ markup only, with breadcrumb URLs on the provisional domain; no organisation data |
| Headings | One H1 per page (verified in earlier iterations). Homepage H1 was a slogan, not the subject of the page |
| Internal links | Sound; link labels such as "About bookkeeping" were vague |
| Image alt text | Present and descriptive |
| Not-found page | Returns 404 with links onwards (fine) |

## 4. Approach taken

- Brand moves to one place (`site.brandName`), and every title and description is assembled from it; titles in content files no longer carry the brand.
- Copy is rewritten in the content files only (`home.ts`, `services.ts`, `audiences.ts`, `pages.ts`, `faqs.ts`, `forms.ts`, `emails.ts`, brand references in `legal.ts`). Components change only where the content structure changed (hero headline, the "figures you can follow" tile).
- Canonical URLs, the sitemap, `og:url` and absolute URLs in structured data are produced **only when `NEXT_PUBLIC_SITE_URL` is set** to the confirmed production domain. Until then the site emits no canonical links rather than wrong ones.
- `robots.txt` and `sitemap.xml` are added. The sitemap lists only indexable pages (no draft legal pages, no `/send-documents`, no `/styleguide`).
- Open Graph and Twitter-card metadata, and an organisation JSON-LD block on the homepage, use verified facts only (no address, ratings or credentials).

## 5. What was changed

See the completion report in the conversation and `docs/OPEN-ITEMS.md` ("Website revision, 18 October 2026") for the remaining client decisions. A regenerated `docs/CONTENT-INVENTORY.md` shows every piece of text after the revision.
