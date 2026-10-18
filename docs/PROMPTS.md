# Claude Code prompts: Halim Accountants website

Ten iterations, run one at a time. Before you start, put `CLAUDE.md` in the project root and this file in `docs/`. Claude Code loads `CLAUDE.md` automatically, so every prompt can rely on it.

**Workflow for each iteration**
1. Start a fresh Claude Code session (or `/clear`) so old context doesn't leak in.
2. Paste the prompt.
3. When it finishes, read its completion report, run `npm run dev` and review the pages yourself on desktop and on a phone-width window.
4. Fix anything you dislike with short follow-up messages *in the same session*.
5. Commit (`git add -A && git commit -m "Iteration N: …"`), then move to the next prompt.

Never paste two iterations at once. If an iteration goes badly wrong, `git reset --hard` to the last commit and rerun it with clearer instructions.

| # | Iteration | You review |
|---|---|---|
| 1 | Inspection, scaffold, design system, content config | `/styleguide` page |
| 2 | Shared layout: header, mobile nav, footer, WhatsApp | Every page frame, mobile menu, footer legal text |
| 3 | Homepage | Home at 375 px, 768 px, 1280 px |
| 4 | Motion and visual polish | Feel, plus reduced-motion mode |
| 5 | Service and audience pages | 7 service pages + 5 audience pages |
| 6 | About, contact, consultation, FAQ, legal pages | All supporting pages |
| 7 | Enquiry and callback forms + email | Real test submissions |
| 8 | Booking, WhatsApp, documents, reviews integrations | Each integration's on/off states |
| 9 | SEO, accessibility, security, performance audit | Lighthouse, keyboard-only walkthrough |
| 10 | Tests, launch gate, Hostinger deployment docs | Green test run + DEPLOYMENT.md |

---

## Prompt 1: Inspection, foundation and design system

```text
ITERATION 1 — Repository inspection, project foundation and design system

OBJECTIVE
Set up a clean, production-grade Next.js foundation for the Halim Accountants website, with a complete design-token system, base UI components, the central content config, and a /styleguide page so I can review the visual direction before any real pages are built.

CONTEXT
Read CLAUDE.md in full first. It holds every confirmed business fact, the hard content rules, the stack (Next.js App Router + TypeScript + Tailwind v4, hosted on Hostinger), the design direction and the working rules. Follow it over your own assumptions. This is the first iteration: nothing beyond the foundation should be built yet.

TASKS
1. Inspect before touching anything
   - List the current directory, including hidden files. Report what exists: package.json, lockfile, git status, node version (node -v), any existing app code.
   - If a Next.js project already exists, do NOT re-scaffold. Adapt it to CLAUDE.md and explain each change.
   - If the folder only holds CLAUDE.md and docs/, scaffold with:
     npx create-next-app@latest . --ts --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm
     If it refuses because the folder isn't empty, scaffold into a temporary sibling folder, move the generated files into the root WITHOUT overwriting CLAUDE.md or docs/, then delete the temporary folder.
   - Initialise git if there is no repository. Make sure .gitignore covers .env*, .next and node_modules.
   - Add "engines": { "node": ">=20.9" } to package.json. Hostinger will run Node 22.

2. Strip the starter
   - Remove the create-next-app demo content, images and styles. Keep a minimal placeholder home page that says the site is under construction, using the brand wordmark.

3. Design tokens (src/app/globals.css)
   - Use the Tailwind v4 @theme block for every token in CLAUDE.md section 8: colours (navy, ink, paper, surface, teal, teal-soft, line, muted plus any hover/active shades you derive), font families (serif display and sans body), a type scale (display, h1–h4, lead, body, small, caption with line-heights), a spacing rhythm, radii (small set: sm, md, lg — restrained), shadows (at most two subtle levels), a container max width and section vertical padding.
   - Body: paper background, ink text, comfortable line-height. Headings use the serif with text-wrap: balance.
   - A global :focus-visible style: a 2px teal outline with offset, clearly visible on paper, surface and navy backgrounds.
   - A prefers-reduced-motion media query that neutralises transitions and animations site-wide.
   - Enable font-variant-numeric: tabular-nums via a utility for aligned figures.

4. Fonts
   - Load Source Serif 4 (headings) and Manrope (body/UI) with next/font/google in src/app/layout.tsx, exposed as CSS variables wired into the @theme font tokens. Use display: swap and only the weights you need.

5. Content config (src/content/site.ts)
   - A typed `site` object holding: brand name (PROVISIONAL), legal name, company number, registration jurisdiction, registered office (structured lines), director, domain (PROVISIONAL), WhatsApp number in both display and wa.me formats, email (PLACEHOLDER_EMAIL), phone (null until confirmed), response-time wording ("within one working day", flagged as provisional), the ICO number (PLACEHOLDER_ICO), the AML line (null, hidden), supported software, consultation offer ("free initial consultation by phone or video") and policy URLs.
   - `features` flags: callback true, booking false, documentUpload false, reviews false.
   - Export a helper `isPlaceholder(value)` and a TypeScript type that makes placeholders explicit.
   - Create src/content/services.ts and src/content/audiences.ts with typed entries (slug, title, short summary, status: "confirmed" | "pending", icon name). Only titles and summaries for now; full page copy comes in iteration 5. Include the three pending services with status "pending".
   - Create docs/OPEN-ITEMS.md mirroring CLAUDE.md section 11.

6. Base UI components (src/components/ui/)
   - Container, Section (with optional tone: paper | surface | navy), Heading (semantic level independent of visual size), Text/Lead, Button (variants: primary, secondary, ghost, on-dark; sizes: md, lg; renders <a> via next/link when href is given, otherwise <button>; visible focus; min 44px target height), Card (bordered, no shadow by default), Badge, Divider (hairline), Icon wrapper for lucide-react, and Wordmark (an original SVG typographic logo: "Halim" in the serif + "ACCOUNTANTS" in small caps sans with letter-spacing; accepts a tone prop for light/dark backgrounds; easy to replace later).
   - Form primitives for later: Field (label, hint, error, required marker with aria wiring), Input, Textarea, Select. No form logic yet.
   - Keep components small and server-safe. Only add "use client" where unavoidable.

7. Style guide page (src/app/styleguide/page.tsx)
   - Shows: the colour tokens with names, hex values and AA contrast notes; the type scale with sample UK-English text about bookkeeping; every Button variant and state (hover, focus, disabled); Card, Badge and Divider; form primitives in default, focused, error and disabled states; the Wordmark on light and navy backgrounds; and section tones.
   - Add metadata robots: noindex for this page.

8. Utilities
   - src/lib/utils.ts with a small cn() class-merging helper (add clsx + tailwind-merge only if you judge them worth it, and say why).
   - Install lucide-react. Do NOT install motion, react-hook-form or zod yet; they come in later iterations.

VISUAL REQUIREMENTS
- Calm, precise, approachable: a well-kept ledger, not a fintech startup. Warm off-white page, navy headings, a single restrained teal accent, hairline dividers, generous whitespace.
- Avoid a generic template look: no gradient blobs, no glassmorphism, no shadow-and-rounded-corner on every block, no emoji.
- The style guide itself should look tidy and professional, because I will judge the direction from it.
- Works from 360px to 1440px wide with no horizontal scroll.

TECHNICAL CONSTRAINTS
- TypeScript strict. No `any`.
- Server Components by default.
- No database, CMS, state library or animation library in this iteration.
- Follow every content rule in CLAUDE.md section 4, even in sample text (no fake stats, no "Chartered", no ACCA).
- UK English.

ACCEPTANCE CRITERIA
- npm run dev serves / (placeholder) and /styleguide without console errors or hydration warnings.
- All tokens are defined once in globals.css and used through Tailwind utilities; no stray hex values in components.
- Every text/background pairing on the style guide meets WCAG AA (state the ratios you checked).
- Keyboard Tab through /styleguide shows a clearly visible focus ring on every interactive element.
- site.ts contains every fact from CLAUDE.md section 2 exactly, and placeholders are explicit.
- docs/OPEN-ITEMS.md exists.
- lint, type-check and production build all pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm run build

COMPLETION REPORT
Finish with: (1) what you found during inspection, (2) files created or changed, (3) dependencies added and why, (4) contrast ratios checked, (5) results of each verification command, (6) any assumptions or placeholders added, (7) the recommended next iteration. Do not claim anything works that you did not run.
```

---

## Prompt 2: Shared layout

```text
ITERATION 2 — Shared layout: header, navigation, footer, WhatsApp control

OBJECTIVE
Build the site frame every page will share: an accessible responsive header with navigation and a booking CTA, a mobile menu, a complete footer with the required legal disclosures, a skip link, a WhatsApp contact control and a 404 page.

CONTEXT
Read CLAUDE.md first. Iteration 1 created the design tokens, base UI components, src/content/site.ts, services.ts and audiences.ts, and a /styleguide page. Inspect them and reuse them; don't duplicate them. Read every business fact from src/content/site.ts; never hard-code one.

TASKS
1. Root layout (src/app/layout.tsx): html lang="en-GB", fonts applied, a SkipLink to #main as the first focusable element, Header, <main id="main">, Footer. Default metadata with a title template "%s | Halim Accountants" using the brand name from site.ts.
2. Header (src/components/layout/Header.tsx)
   - Left: the Wordmark linking home. Centre/right: Services, Who we help, About, Contact. Far right: a primary "Book a free consultation" button linking to /book-consultation.
   - "Services" opens an accessible disclosure panel (button with aria-expanded and aria-controls; opens on click, not hover only; closes on Escape and on outside click; focus returns to the trigger) listing only confirmed services from services.ts, with the two priority services visually first. Same pattern for "Who we help" with audiences.ts.
   - Sticky, with a subtle background and hairline once scrolled. Keep it lightweight; do not hide on scroll.
   - Mark the active page with aria-current="page".
3. Mobile navigation (below 1024px): a menu button opening a full-height panel with grouped links (Services, Who we help, About, Contact), the consultation CTA and a WhatsApp link. Trap focus while open, close on Escape, lock body scroll, restore focus on close, and give it a proper label for screen readers.
4. Footer (src/components/layout/Footer.tsx), navy tone:
   - Wordmark (light), a one-line description, columns for Services (confirmed only), Who we help, Company (About, Contact, Book a consultation, FAQs) and Legal (Privacy policy, Cookie policy, Complaints, Terms of use).
   - Contact block: WhatsApp (display format, linking to wa.me), email if not a placeholder, "Consultations by phone or video across the UK". Never show the registered office as a contact address.
   - Legal block, small but readable (AA on navy): "Halim Accountants is a trading name of Halim Enterprises Limited. Registered in England and Wales, company number 17491527. Registered office: Flat 41, Shaftesbury Point, High Street, London, E13 0AB." ICO line: render only if the value isn't a placeholder; in development show a visible dev-only warning chip when it is. Do not render the AML line while it is null.
   - © current year, Halim Enterprises Limited.
5. WhatsApp control (src/components/layout/WhatsAppButton.tsx): a restrained floating button, bottom-right, respecting safe-area insets, with a clear accessible name ("Chat with us on WhatsApp"), opening wa.me in a new tab with rel="noopener noreferrer" and a short prefilled message ("Hello, I'd like to ask about your accounting services."). On mobile it must not cover form submit buttons, the final CTA band's buttons or footer links (add bottom padding to the page where needed). Hide it while the mobile menu is open. Use an original simple chat icon from lucide (no WhatsApp trademark artwork unless an official asset is supplied).
6. Pages for routing: create stub pages for every nav destination (/services, /services/[slug], /who-we-help, /who-we-help/[slug], /about, /contact, /book-consultation, /faqs, /privacy-policy, /cookie-policy, /complaints, /terms) with an h1 and a "Content coming in a later iteration" note, so links never 404. [slug] pages use generateStaticParams from the content files (confirmed entries only) and call notFound() for unknown or pending slugs.
7. Custom 404 (src/app/not-found.tsx): helpful, on-brand, linking to Services and Contact.

VISUAL REQUIREMENTS
- The header feels quiet and confident: generous horizontal spacing, serif wordmark, sans nav labels, a single teal or navy primary button.
- Dropdown panels: clean two-column lists with short one-line summaries under each service name, hairline separators, no heavy shadows.
- The footer is dense but orderly, with clear column headings and small-caps labels.
- Test at 360, 768, 1024 and 1440px. No horizontal scroll at any width.

TECHNICAL CONSTRAINTS
- Interactive parts ("use client") only where necessary: menu toggles and the WhatsApp visibility logic. Header and Footer markup stays server-rendered where possible.
- No new UI libraries. Build the disclosure and focus trap yourself, or add one tiny, well-maintained dependency only if you justify it.
- Every fact comes from site.ts. Follow the content rules in CLAUDE.md section 4.

ACCEPTANCE CRITERIA
- Every nav and footer link resolves (no 404s except intentionally unknown slugs).
- Pending services appear nowhere: nav, footer or generated routes.
- Keyboard-only: you can open and close both dropdowns and the mobile menu, Escape works, focus is never lost, and the skip link works.
- Screen-reader names exist for the menu button, WhatsApp button and dropdown triggers.
- The legal footer text matches CLAUDE.md section 5 exactly.
- lint, type-check and build pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm run build

COMPLETION REPORT
List files changed, how keyboard and focus behaviour was verified, results of each command, placeholders still showing, any open questions, and the recommended next iteration.
```

---

## Prompt 3: Homepage

```text
ITERATION 3 — Homepage

OBJECTIVE
Build a distinctive, conversion-focused homepage structured around the visitor's decision: understand what's offered, recognise "this is for me", trust the firm, choose how to get in touch.

CONTEXT
Read CLAUDE.md first, especially sections 4 (content rules) and 8 (design direction). Iterations 1–2 built the tokens, UI components, content config and site frame. Reuse them. Put all homepage copy in a content file (src/content/home.ts), not in JSX, so the client can review it in one place. The client asked us to write the copy for their review, so write strong, plain, honest UK-English copy, and mark the file header "DRAFT – awaiting client approval".

TASKS
Create these sections in src/components/sections/ and compose them in src/app/page.tsx:
1. Hero
   - Headline (h1) and a two-sentence lead positioning the firm: bookkeeping, VAT and year-round accounting support for UK small businesses and individuals, handled remotely with a personal approach. Write two or three headline options in home.ts and use the first; I'll pick with the client.
   - A primary CTA "Book a free consultation" (/book-consultation) and a secondary "Explore our services" (/services).
   - A small reassurance line: "Free initial consultation by phone or video · Clients across the UK".
   - Right side (desktop): an original, honest UI composition, NOT a stock photo and NOT fake data. For example, a refined "Your first consultation" card listing what the call covers (your business and goals, current bookkeeping setup, VAT position, next steps and a tailored quote), set on a subtle ledger-ruled background panel. On mobile it stacks under the text.
2. Software strip: "We work with Xero, QuickBooks and Sage". Text only, no logos, styled as a quiet hairline-bordered band.
3. Services: the two priority services (Bookkeeping, VAT returns) as larger feature blocks with a benefit-led summary and a link each; the other five as a compact, scannable list or grid with one-line benefits. Link to /services/[slug]. Confirmed services only.
4. Who we help: the five audiences with a short line each on the typical problem they face, linking to /who-we-help/[slug]. Make visitors recognise themselves quickly.
5. How it works: a genuine three-step process (1 Book a free call → 2 Get a clear, fixed quote → 3 We handle the work and keep you on track). Numbered, because it really is a sequence.
6. Why work with us: three or four honest commitments that need no unverifiable proof, e.g. working remotely so you can reach us wherever you are in the UK; plain-English explanations; a personal point of contact; quotes before any work starts. Do NOT claim qualifications, experience length, ratings or results.
7. About teaser: a short introduction to the director, Saad Haleem, with a portrait placeholder area, using a neutral, clearly replaceable placeholder (a monogram tile), never a stock face presented as him. Link to /about.
8. FAQ preview: 4–5 practical questions (e.g. "Is the first consultation really free?", "Can you work with me if I'm not in London?", "Which accounting software do you use?", "How do I send you my documents?" — answer the last one generically until the provider is chosen). Store them in src/content/faqs.ts for reuse on /faqs. Use an accessible accordion built on native <details>/<summary> or a fully ARIA-compliant disclosure.
9. Final CTA band (navy): a confident closing line, consultation button and WhatsApp link.
- Do NOT add a testimonials or reviews section. features.reviews is false.

VISUAL REQUIREMENTS
- Custom-designed, not a stack of identical cards. Vary rhythm: a full-width hero, a quiet band, an asymmetric feature layout for the priority services, a dense list for the rest, alternating paper and surface tones, and one navy band at the end.
- Strong typographic hierarchy: a large serif hero headline (clamp-based fluid sizing), restrained sans body, small-caps eyebrow labels used only where they add meaning.
- Hairline rules and grid alignment carry the structure. Borders only where an element is genuinely a separate object.
- Images: if you add any photograph, it must come from Unsplash or Pexels under their free licence, be downloaded to public/images/, be optimised, be rendered with next/image with real alt text (or alt="" if decorative), and be logged in docs/ASSETS.md (source URL, author, licence). Prefer no photo over a clichéd one.
- Check the page at 360, 768, 1024 and 1440px.

TECHNICAL CONSTRAINTS
- Server Components throughout, except the accordion if it needs client state (prefer native details/summary).
- No animation yet; that's iteration 4. The page must look finished without motion.
- Follow CLAUDE.md section 4 strictly. When unsure whether a claim is supportable, leave it out and list it in the report.

ACCEPTANCE CRITERIA
- One h1; logical h2/h3 structure; landmark regions correct.
- Every CTA goes to a real route.
- Only confirmed services and audiences appear.
- No invented facts, figures, reviews, qualifications or logos.
- Looks complete and balanced at all four widths, with no overflow.
- Homepage copy lives in content files, marked DRAFT.
- lint, type-check and build pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm run build

COMPLETION REPORT
Report files changed, headline options written, any claims you deliberately left out, images used (with licence), check results, open questions for the client, and the recommended next iteration.
```

---

## Prompt 4: Motion and visual polish

```text
ITERATION 4 — Motion, interaction feedback and visual polish

OBJECTIVE
Make the site feel polished and alive through restrained, purposeful motion and refined interaction states, without hurting performance, accessibility or the no-JavaScript experience.

CONTEXT
Read CLAUDE.md first (section 8 covers motion). Iterations 1–3 built the design system, layout and homepage. Inspect the current components before changing them. Content must already be fully visible without JavaScript; keep it that way.

TASKS
1. Install `motion` and use only `motion/react`. Create a small set of reusable client wrappers in src/components/motion/:
   - Reveal: fades and lifts content 8–12px into place once, when it enters the viewport (once: true). Content must render visible on the server; animate from a near-visible state, or use initial={false} logic so nothing stays at opacity 0 if JS fails or is slow.
   - Stagger: staggers children (e.g. service items) at 40–60ms intervals.
   - Both respect useReducedMotion() and render static content when reduced motion is preferred.
2. Apply motion deliberately:
   - Hero: a short entrance for the headline, lead and CTAs (total under 600ms), and the consultation card arriving slightly after.
   - Services and audiences: staggered reveals.
   - How-it-works steps: a sequential reveal that reinforces the order.
   - Leave the footer, legal text, forms and navigation static.
3. CSS interaction polish (no JS):
   - Buttons: colour and underline transitions at 150–200ms, a pressed state, and a clear focus-visible ring.
   - Linked cards and list rows: a 2–3px lift or border-colour change on hover, an arrow icon nudging right, and a matching focus-within style.
   - Links in body copy: an animated underline that keeps the underline visible at rest (don't rely on colour alone).
   - The accordion: smooth height or opacity transition where supported, with an instant fallback.
   - Dropdowns and mobile menu: a short fade/slide (150–200ms), no layout shift.
4. Visual polish pass across all built pages: spacing rhythm, alignment to the grid, widows in headings (text-wrap: balance), line lengths around 60–75 characters, consistent icon sizes and stroke widths, and hover/focus parity.

VISUAL REQUIREMENTS
- Motion should feel calm and exact, like a well-run office, not a product launch. Ease-out curves, short durations, small distances.
- Nothing loops, parallaxes, scroll-jacks, or moves behind text.
- With prefers-reduced-motion enabled the site is fully static and still looks finished.

TECHNICAL CONSTRAINTS
- Motion wrappers are the only new client components. Do not convert whole sections or pages to client components; wrap leaf content instead.
- Measure the JS added: report the change in First Load JS from `npm run build` before and after. If it grows by more than ~40 kB, simplify.
- No other new dependencies.

ACCEPTANCE CRITERIA
- With JS disabled, every section is fully visible.
- With reduced motion, there are no entrance animations and only instant state changes.
- No layout shift caused by animation (check that CLS is near zero in Lighthouse).
- Hover, focus and active states exist for every interactive element.
- lint, type-check and build pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm run build
(Then: npm run start and run a Lighthouse mobile check on / in Chrome DevTools; report Performance, Accessibility, CLS.)

COMPLETION REPORT
Report files changed, where motion was applied and why, the bundle size before and after, the reduced-motion and no-JS checks done, Lighthouse figures if run, and the recommended next iteration.
```

---

## Prompt 5: Service and audience pages

```text
ITERATION 5 — Service pages, audience pages and their index pages

OBJECTIVE
Create useful, distinct, SEO-friendly pages for the seven confirmed services and five audiences, driven by typed content files and a shared page template.

CONTEXT
Read CLAUDE.md first. Stub routes /services, /services/[slug], /who-we-help and /who-we-help/[slug] exist from iteration 2. Content types exist in src/content/services.ts and audiences.ts. Reuse the UI, section and motion components from iterations 1–4. All copy is a DRAFT for client approval.

TASKS
1. Extend the content model in services.ts. For each confirmed service:
   - slug, title, metaTitle (under 60 characters), metaDescription (under 155 characters), a one-sentence intro, "Who it's for", "What's included" (5–8 concrete items), "How it works" (3–4 steps), "What we'll need from you" (practical document checklist), 3–4 service-specific FAQs, relatedServices (slugs) and relatedAudiences (slugs).
   - Write accurate, plain-English UK content. Keep tax statements general and correct, without specific thresholds, rates or deadlines unless you are certain and they are stable. Mark any figure you include with a `// VERIFY` comment and list it in the report.
   - Each page must be genuinely different. No find-and-replace paragraphs.
   - VAT returns: explain that returns are submitted through Making Tax Digital-compatible software (Xero, QuickBooks, Sage) without claiming we offer the separate "MTD for Income Tax" service, which is pending.
   - Company formation: describe helping clients set up a limited company and what happens next. Do not imply we are a formation agent with special status.
   - Capital Gains Tax: general help calculating and reporting gains. No promises about reducing tax.
2. Extend audiences.ts similarly: the typical situation and challenges, which confirmed services help (linking), how working remotely suits them, and 2–3 FAQs. Individuals: be careful, since Self Assessment is pending; focus on CGT and general record-keeping and say "talk to us about your situation".
3. Templates
   - /services/[slug]: breadcrumb (Home › Services › Title), hero with h1 and intro plus consultation CTA, sections for each content block, an FAQ accordion, related services, a sidebar or inline "Get a quote" box (desktop sticky sidebar; inline on mobile) with consultation, callback and WhatsApp options, and a final CTA band.
   - /who-we-help/[slug]: the same structure adapted to audience content.
   - generateStaticParams from confirmed entries only; generateMetadata per page with a canonical URL from site.ts; notFound() for pending or unknown slugs.
4. Index pages
   - /services: an intro plus the priority services featured and the rest listed, each with a summary and link.
   - /who-we-help: the five audiences as an orderly, scannable set.
5. Add BreadcrumbList JSON-LD on detail pages, and a FAQPage JSON-LD only where the FAQs are visible on that page.

VISUAL REQUIREMENTS
- Detail pages read like a well-designed guide: a clear hierarchy, hairline-separated sections, a checklist styling for "What's included" and "What we'll need", and a numbered process for "How it works".
- The sidebar quote box is calm and useful, not a pushy sales widget.
- Strong internal linking between services and audiences.
- Check 360, 768, 1024 and 1440px.

TECHNICAL CONSTRAINTS
- Server Components and static generation for all of these pages.
- No CMS or MDX. Typed TS content is enough for now.
- CLAUDE.md section 4 applies to every word.

ACCEPTANCE CRITERIA
- Seven service pages and five audience pages build statically; pending services return 404.
- Each page has a unique title, description, h1 and canonical URL.
- No duplicated body paragraphs between pages (spot-check and report).
- All internal links resolve.
- lint, type-check and build pass (report the generated routes from the build output).

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm run build

COMPLETION REPORT
Report files changed, the routes generated, any // VERIFY items for me to check, content the client must approve, check results, and the recommended next iteration.
```

---

## Prompt 6: About, contact, consultation, FAQ and legal pages

```text
ITERATION 6 — About, Contact, Book a consultation, FAQs and legal pages

OBJECTIVE
Complete every supporting page with honest content and clearly managed placeholders, so the full site can be clicked through end to end.

CONTEXT
Read CLAUDE.md first. Stub routes exist from iteration 2. FAQ data exists in src/content/faqs.ts. Forms are built in iteration 7 and integrations in iteration 8, so this iteration prepares their slots. Several details (email, booking provider, ICO number, the director's bio and photo, the client's own policies) are still missing; see docs/OPEN-ITEMS.md.

TASKS
1. /about
   - An introduction to Halim Accountants as a new, remote-first UK practice, with honest positioning (newly established; personal service; clear communication). Write it as a DRAFT.
   - Director section for Saad Haleem: a portrait slot with a replaceable monogram placeholder, plus bio, qualifications and LinkedIn fields driven by site.ts (null → hidden; never invented).
   - "How we work" values (consistent with the homepage commitments), the software line, and a CTA.
2. /contact
   - Contact options as clear cards: book a free consultation, request a callback, WhatsApp, and email (hidden while it's a placeholder, with a dev-only warning).
   - A slot for the enquiry form (EnquiryFormSlot) showing a temporary static notice "Enquiry form coming soon" that iteration 7 will replace.
   - The response-time line from site.ts.
   - "We work remotely with clients across the UK; consultations are by phone or video." Do NOT list the registered office as a contact address here. It appears in the footer only.
3. /book-consultation
   - Explain what the free consultation covers, that it happens by phone or video (state no fixed duration until the client confirms one), what to prepare, and what happens after (a quote).
   - A booking slot controlled by features.booking: when false, show "Request a consultation" (linking to the callback form) and a WhatsApp option; when true (iteration 8), show the provider integration.
4. /faqs: all FAQs grouped (Getting started, Working together, Services, Documents and data), with an accessible accordion and FAQPage JSON-LD.
5. Legal pages: /privacy-policy, /cookie-policy, /complaints, /terms
   - The client says they have their own policies, but we haven't received them. Build properly structured pages that render a clearly marked DRAFT template. Each page has a banner: "Draft — to be replaced with the client's approved policy before launch." Keep the banner rendering until the content is replaced, so it's never forgotten.
   - The privacy policy draft must reflect what the site actually collects (enquiry, callback, email delivery via the business mailbox, WhatsApp as a third party, no analytics or tracking cookies at launch), with the legal name, registered office and PLACEHOLDER_ICO pulled from site.ts.
   - The cookie policy draft states that only strictly necessary cookies are used (or none, if that is true; verify by checking the code) and that no analytics are used.
   - Complaints: a simple, fair process template with placeholders for contact email and response time.
   - Terms of use: a standard website terms template (not client engagement terms).
   - Add robots noindex to these pages while they're drafts, controlled by a single flag in site.ts.
6. Update docs/OPEN-ITEMS.md with everything still missing.

VISUAL REQUIREMENTS
- About feels personal and credible without fake credentials: generous whitespace, a large portrait slot and pull-quote styling for the director's own words (placeholder until supplied).
- Contact and consultation pages are calm and decisive: one obvious primary action, with alternatives clearly secondary.
- Legal pages: a readable long-form layout with a sticky table of contents on desktop, a comfortable measure and clear headings.

TECHNICAL CONSTRAINTS
- Server Components. Reuse existing accordion, cards and sections.
- Everything factual comes from site.ts. Follow CLAUDE.md section 4.

ACCEPTANCE CRITERIA
- Every page is reachable from the nav or footer and has unique metadata.
- No placeholder value is visible to visitors except the deliberate DRAFT banners. Dev-only warnings appear only in development.
- Drafts are noindexed through the flag.
- lint, type-check and build pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm run build

COMPLETION REPORT
Report files changed, every placeholder and draft created, items added to OPEN-ITEMS.md, check results, and the recommended next iteration.
```

---

## Prompt 7: Enquiry and callback forms with email

```text
ITERATION 7 — Enquiry and callback forms, server handling and email

OBJECTIVE
Make the enquiry and callback forms real: accessible, validated on both client and server, protected against spam, and delivering emails to the business inbox with an acknowledgement to the sender.

CONTEXT
Read CLAUDE.md first, especially sections 6 (Nodemailer via the Hostinger mailbox), 9 and 10. Form UI primitives exist from iteration 1. /contact has an EnquiryFormSlot from iteration 6; /book-consultation links to a callback option. The business email address is NOT confirmed yet, so everything must work from environment variables and fail gracefully when they're missing.

TASKS
1. Install react-hook-form, zod, @hookform/resolvers and nodemailer (+ @types/nodemailer). Say why each is needed.
2. Schemas (src/lib/validation.ts), shared by client and server:
   - Enquiry: name (required), email (required, valid), phone (optional, UK-friendly but lenient), businessName (optional), businessType (select: Sole trader, Limited company, Startup, eCommerce seller, Hospitality or restaurant, Individual, Other), annualTurnover (optional select in bands: Under £50k, £50k–£90k, £90k–£250k, £250k–£1m, Over £1m, Prefer not to say), serviceNeeded (select from confirmed services + "Not sure yet"), message (required, 20–2000 characters), consent acknowledgement (required checkbox: "I've read the privacy policy"), plus a hidden honeypot field and a hidden render timestamp.
   - Callback: name, phone (required), preferred time (Morning, Afternoon, Any time), short topic (optional), consent, honeypot, timestamp.
   - Sensible max lengths on every field. Trim input. Ask for nothing sensitive (no UTR, NI number, bank details or documents).
3. Server
   - Route Handlers: src/app/api/enquiry/route.ts and src/app/api/callback/route.ts (POST only, JSON).
   - Re-validate with zod. Reject if the honeypot is filled or the form was submitted under 3 seconds after render, returning a generic success so bots learn nothing.
   - Rate limit per IP: a simple in-memory sliding window (e.g. 5 requests per 10 minutes) in src/lib/rate-limit.ts, with a comment that it suits a single Node instance on Hostinger and would need a shared store if scaled.
   - Check the Origin header matches the site URL in production.
   - src/lib/email.ts: create the Nodemailer transport from env vars (SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO). Send (a) a notification to MAIL_TO with all fields in a clean plain-text + simple HTML layout, with reply-to set to the sender, and (b) an acknowledgement to the sender: short and honest ("Thanks for getting in touch. We aim to reply within one working day." using the site.ts wording), with no promises beyond that. Escape all user content in HTML.
   - If the env vars are missing: in development, log a clear warning and print a redacted preview of the email to the console instead of sending; in production, return 503 with a friendly message and never log field contents.
   - Create .env.example documenting every variable, with Hostinger notes (the SMTP host and port are shown in Hostinger's email settings for the mailbox). Never commit real values.
4. Client forms (src/components/forms/EnquiryForm.tsx, CallbackForm.tsx)
   - React Hook Form + zodResolver. Labels always visible (no placeholder-as-label), hints, required markers, inline errors linked with aria-describedby, and an error summary on submit that receives focus and links to the fields.
   - A submit button with a loading state (disabled, spinner, aria-busy) and protection against double submission.
   - Success state replaces the form with a confirmation that says what happens next and offers the WhatsApp link. Focus moves to the confirmation heading.
   - Network or server error state: a polite message with retry, and WhatsApp offered as an alternative.
   - A privacy notice under the submit button linking to /privacy-policy.
5. Wire them in: the enquiry form replaces EnquiryFormSlot on /contact; the callback form goes on /contact (secondary) and /book-consultation (while features.booking is false); service pages' quote box links to /contact?service=slug and the form pre-selects that service.
6. Tests: add Vitest (dev dependency) with unit tests for both schemas (valid, invalid, edge cases, honeypot) and for the rate limiter. Add an npm "test" script.

VISUAL REQUIREMENTS
- The forms feel calm and trustworthy: single-column on mobile, two columns for short fields on desktop, generous spacing, large touch targets, and clear error colour plus icon plus text (never colour alone).
- The success state feels reassuring and on-brand.

TECHNICAL CONSTRAINTS
- Secrets only on the server. Nothing SMTP-related is imported into client components.
- No database. No third-party form services.
- No console.log of personal data in production.

ACCEPTANCE CRITERIA
- Client and server reject invalid input with clear messages.
- Honeypot, timing and rate limit all work (prove it with tests and a manual curl).
- Without SMTP env vars, dev shows the redacted console preview and production returns 503 gracefully.
- With SMTP env vars set (I'll add them to .env.local when the mailbox exists), both emails arrive. If you can't test real delivery, say so explicitly.
- Fully operable by keyboard; errors announced to screen readers.
- lint, type-check, test and build pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm test
npm run build
Manual: curl -X POST http://localhost:3000/api/enquiry -H "Content-Type: application/json" -d '{}'   (expect 400)

COMPLETION REPORT
Report dependencies and why, files changed, test results, what you verified manually, what could NOT be verified (real email delivery), the env vars I must set, and the recommended next iteration.
```

---

## Prompt 8: Integrations

```text
ITERATION 8 — Booking, WhatsApp, document upload and reviews integrations

OBJECTIVE
Add the remaining requested features as safe, configurable integrations that switch on through site.ts when the client supplies the details, without building anything risky ourselves.

CONTEXT
Read CLAUDE.md first. Feature flags exist in src/content/site.ts (booking, documentUpload, reviews: all false). WhatsApp already exists from iteration 2. The client has NOT yet chosen a booking tool, a document portal, or supplied review content. Calendly is our recommended booking tool. There are no non-essential cookies on the site, and we want to keep it that way.

TASKS
1. Booking (features.booking + site.booking: { provider: "calendly" | "microsoft-bookings" | null, url: string | null })
   - Build a BookingPanel for /book-consultation that, when enabled, shows a clear "Choose a time" button opening the provider URL in a new tab. Optionally offer a click-to-load inline embed: nothing from the provider loads (no script, no iframe, no cookies) until the visitor clicks "Show available times here", with a short notice that the provider may set cookies and a link to the cookie policy.
   - When disabled, keep the callback fallback from iteration 7.
   - Validate that url is https and on the expected provider domain; otherwise treat booking as disabled and warn in development.
2. WhatsApp: review the existing button and links. Centralise the wa.me URL builder in src/lib/whatsapp.ts with an optional, URL-encoded prefilled message per context (e.g. on a service page: "Hello, I'd like to ask about Bookkeeping."). Check it opens correctly on mobile and desktop (wa.me falls back to WhatsApp Web).
3. Secure document upload (features.documentUpload + site.documentPortal: { name, url } | null)
   - Do NOT build file upload or storage. Create a SendDocuments component and a /send-documents page (noindex) explaining how clients send documents securely, linking out to the client's chosen portal when configured. Until then, say "We'll send you a secure upload link after your consultation" and never suggest emailing sensitive documents.
   - Add a short note in docs/OPEN-ITEMS.md listing suitable portal options to discuss with the client (e.g. a practice-management client portal, or a secure file-request link from their business Microsoft 365 or Google Workspace) and the security requirements a custom build would need (authentication, private storage, encryption, malware scanning, retention). Recommend against a custom build.
4. Reviews (features.reviews + site.reviews: an array of { author, text, rating?, date, source: "google", permission: true } | empty)
   - Build a Reviews section that renders ONLY when features.reviews is true AND at least one review has permission: true. No third-party widgets or Google scripts. Static, client-approved text with a "Read our reviews on Google" link to site.googleBusinessProfileUrl.
   - Never render ratings, stars or counts that aren't in the supplied data. Add a type-level comment that entries must be genuine and approved.
   - Place the section on the homepage (above the FAQ) and on /about, both hidden while disabled.
5. Update /contact and the services quote box to use whichever channels are enabled, so no dead buttons ever show.

VISUAL REQUIREMENTS
- Integrations look native to the site. External hand-offs are clearly signposted with an external-link icon and "opens in a new tab" for screen readers.
- Disabled features leave no gaps or empty sections.

TECHNICAL CONSTRAINTS
- No third-party scripts load on page view. Anything external loads only after an explicit click.
- No new dependencies unless clearly necessary.

ACCEPTANCE CRITERIA
- Toggling each flag in site.ts with test values switches the UI correctly; switching back hides it cleanly. Restore all flags to false (or to real confirmed values) before finishing.
- Network tab on page load shows no requests to Calendly, Google or WhatsApp domains.
- Invalid integration URLs are rejected safely.
- lint, type-check, test and build pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm test
npm run build

COMPLETION REPORT
Report files changed, how each integration was tested with test values, what stays disabled and why, the client decisions still needed, check results, and the recommended next iteration.
```

---

## Prompt 9: SEO, accessibility, security and performance audit

```text
ITERATION 9 — SEO, accessibility, security and performance audit and fixes

OBJECTIVE
Audit the whole site against the quality bar in CLAUDE.md section 9 and fix what you find, so it's ready for real visitors and search engines.

CONTEXT
Read CLAUDE.md first. All pages, forms and integrations exist from iterations 1–8. Inspect the actual code and build output; don't assume earlier iterations got everything right.

TASKS
1. SEO
   - The root layout's metadataBase uses the site URL from site.ts (env override NEXT_PUBLIC_SITE_URL). Every page has a unique title, description, canonical URL and Open Graph/Twitter metadata.
   - src/app/sitemap.ts includes only indexable, confirmed pages (no styleguide, drafts, pending services or send-documents). src/app/robots.ts allows crawling in production, disallows /styleguide and /api, references the sitemap, and blocks all crawling when NEXT_PUBLIC_SITE_ENV !== "production" (so a staging deploy is never indexed).
   - A default Open Graph image generated with next/og (wordmark + tagline on navy), plus a favicon/app icon set derived from the wordmark monogram.
   - JSON-LD: an Organization / AccountingService entity on the homepage with legal name, brand name, URL, areaServed "GB", contactPoint (WhatsApp and email only if confirmed), and sameAs (Google Business Profile, LinkedIn only if supplied). Do NOT include a street address (the registered office isn't a visitable office), ratings or opening hours. Validate the shape.
   - Check the heading hierarchy on every page, internal links, and image alt text.
2. Accessibility (WCAG 2.2 AA)
   - Add @axe-core/playwright with Playwright (dev only) and an automated test that loads every route and fails on any serious or critical violation.
   - Manually check and fix: keyboard order, focus visible everywhere, focus not obscured by the sticky header (scroll-padding-top), the mobile menu focus trap, accordion semantics, form error handling, target sizes ≥ 24px, contrast in every state including hover and disabled, reduced motion, 200% zoom and 320px reflow.
3. Security
   - In next.config: strict security headers: Content-Security-Policy (self + only what is needed; allow the booking provider only when enabled), Referrer-Policy strict-origin-when-cross-origin, X-Content-Type-Options nosniff, frame-ancestors 'none', Permissions-Policy denying camera, microphone, geolocation and so on, and Strict-Transport-Security for production. Make sure next/font, next/image and inline JSON-LD still work (use nonces or hashes as appropriate, and explain your choice).
   - Re-review the API routes: method restrictions, payload size limit, validation, rate limiting, origin check, no secrets in client bundles (grep the .next output for SMTP_ and env names), and no personal data in logs.
   - Run npm audit and address high or critical issues sensibly.
4. Performance
   - Run a production build and report First Load JS per route. Remove unused code and client components that could be server components.
   - Images: correct sizes, priority only for the LCP image, modern formats, and no oversized originals in public/.
   - Fonts: only the weights used, with display swap.
   - Run Lighthouse (mobile) on /, a service page and /contact against `npm run start`, report the scores and fix the main opportunities. Explain that field data (CrUX, Search Console) will matter after launch.

TECHNICAL CONSTRAINTS
- Fix issues properly rather than suppressing warnings. Don't weaken the CSP just to silence errors without explaining why.
- Dev-only dependencies for testing.

ACCEPTANCE CRITERIA
- The axe test passes on every route.
- sitemap.xml and robots.txt are correct for both production and non-production envs.
- Security headers are present in `npm run start` responses (show curl -I output).
- No secrets appear in the client bundle.
- Lighthouse mobile on the three pages: Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95, with Performance reported and the main opportunities addressed (these are targets, not guarantees).
- lint, type-check, test and build pass.

VERIFICATION COMMANDS
npm run lint
npx tsc --noEmit
npm test
npm run build
npm run start  (separate terminal), then: npx playwright test ; curl -I http://localhost:3000

COMPLETION REPORT
Report each issue found and how it was fixed, Lighthouse scores, the axe results, the headers output, anything deliberately left as-is (with the reason), and the recommended next iteration.
```

---

## Prompt 10: Testing, launch gate and Hostinger deployment

```text
ITERATION 10 — Final testing, launch gate and Hostinger deployment preparation

OBJECTIVE
Make the project production-ready: a full test pass, an automated check that blocks launch while placeholders remain, and clear deployment documentation for Hostinger Business Web Hosting.

CONTEXT
Read CLAUDE.md first. The site is feature-complete after iterations 1–9. Hosting is Hostinger Business Web Hosting as a managed Node.js web app deployed from a GitHub repository (Node 22). The domain and mailbox will be set up in Hostinger. Some client information may still be missing; see docs/OPEN-ITEMS.md.

TASKS
1. Playwright end-to-end smoke tests (extend the existing setup): every route returns 200 (pending and unknown slugs return 404); the mobile menu opens and closes and traps focus; the enquiry form shows validation errors, then submits successfully against a mocked email layer (inject a test transport via env, e.g. MAIL_TRANSPORT=test, that records instead of sending); the callback form likewise; and the WhatsApp links have the correct wa.me URL.
2. Launch gate script (scripts/check-launch.ts, run with `npm run check:launch`):
   - Fails (non-zero exit) and lists every problem if: any value in site.ts starts with PLACEHOLDER_; a legal page still shows the DRAFT banner or the drafts-noindex flag is on; the brand or domain is still marked PROVISIONAL; MAIL_TO or the SMTP env vars are missing; NEXT_PUBLIC_SITE_URL isn't the production https URL; homepage copy is still marked DRAFT; or any // VERIFY comment remains.
   - Passes cleanly when everything is resolved. Do NOT wire it into `build`; it's a manual pre-launch check, so staging builds still work.
3. Production config
   - package.json scripts: dev, build, start (next start, honouring the PORT env var Hostinger provides), lint, typecheck, test, test:e2e, check:launch.
   - engines.node ">=20.9". Remove leftover console logs. Make sure there are no build warnings.
   - A complete .env.example with comments.
4. Documentation
   - docs/DEPLOYMENT.md, step by step for Hostinger, written for me (the developer): push to a private GitHub repo; in hPanel add a Node.js web app (Business plan) from GitHub, select the repo and branch, Node 22, and the build and start commands; set environment variables in hPanel (list each one); connect the domain; check that SSL is active; create the mailbox (e.g. hello@ or info@ on the domain) and use its SMTP settings; check that the SPF, DKIM and DMARC records exist for email deliverability; and redeploy on push.
   - Post-deploy checklist: send real test enquiries from a phone; check both emails arrive and aren't in spam; check the headers, sitemap, robots and canonical URLs on the live domain; add the site to Google Search Console with DNS verification and submit the sitemap; run Lighthouse on the live site; and confirm no third-party requests on page load.
   - docs/HANDOVER.md for the client in plain English: where content lives (src/content/*.ts), how to request changes, which accounts they own (domain, hosting, mailbox, Google Business Profile, Search Console), and the renewal dates to watch (domain, hosting, ICO fee).
   - Make sure docs/OPEN-ITEMS.md and docs/ASSETS.md are up to date.
5. Run everything and fix failures.

TECHNICAL CONSTRAINTS
- Don't add hosting-specific code beyond what's needed; the app must also run anywhere `next start` works.
- Never commit secrets.

ACCEPTANCE CRITERIA
- lint, typecheck, unit tests, e2e tests and build all pass.
- npm run check:launch runs and lists the remaining client-dependent items (it is expected to FAIL until the client supplies them). Show its output.
- The deployment and handover docs are complete and accurate to this codebase.

VERIFICATION COMMANDS
npm run lint
npm run typecheck
npm test
npm run build
npm run start  (separate terminal), then: npm run test:e2e
npm run check:launch

COMPLETION REPORT
Report final test results, the launch-gate output (the remaining blockers), files added, deployment steps I need to do by hand, and anything you could not verify.
```

---

## After iteration 10

When the client sends missing information, use a short prompt like this:

```text
The client has confirmed the following. Update src/content/site.ts (and any related content), remove the matching placeholders and PROVISIONAL marks, update CLAUDE.md section 11 and docs/OPEN-ITEMS.md, then run lint, typecheck, tests, build and check:launch, and report what is still blocking launch:

- [paste confirmed details here]
```
