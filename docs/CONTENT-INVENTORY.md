# Halim Accountants website: content inventory

Every piece of text on the website, page by page and section by section, plus the text that only appears in certain situations (form messages, emails, features that are switched off), and a list of what is missing and why.

**Status of all wording: DRAFT.** The developer drafted all copy, as CLAUDE.md sets out ("Developer drafts, client reviews and approves"). None of it has been approved by the client yet. Business facts (company name and number, director, WhatsApp number, services, software) come from `src/content/site.ts` and are verified against Companies House and the client's answers.

## 1. How this was produced and how to read it

- **Extracted, not retyped.** Sections 2 and 3 were captured automatically from the production build running locally on 18 October 2026, by visiting every page linked from the homepage at desktop width (1440 px). Every FAQ answer and every "Who we help" tab was opened first, so hidden-until-clicked text is included. So the wording below is exactly what a visitor sees.
- **Left out of the capture:** screen-reader-only text (for example "(opens in a new tab)"), decorative elements, and the duplicate copy of the software names used to make the moving strip loop. The mobile menu repeats the header menu and is not listed twice.
- **Sections 4 to 7** were compiled from the content files and `docs/OPEN-ITEMS.md`.

**Key to the markers:**

| Marker | Meaning |
|---|---|
| **[H1]**, **[H2]**, **[H3]**, **[H4]** | A heading and its level (each page has exactly one H1) |
| `- item` | A list item |
| **Q:** | A frequently asked question; the answer follows it |
| [Link] text → `/path` | A link or button-styled link, and where it goes |
| [Button] / [Menu] | A button that does something on the page (opens a menu, a tab, or sends a form) |
| [Field] / [Options] / [Placeholder] | A form field label, the choices in a drop-down, or hint text inside a field |
| Plain line | A paragraph, small label or other text |

**Where each page's wording lives** (so the client's edits touch one place):

| Text | File |
|---|---|
| Business facts, contact details, placeholders, feature switches | `src/content/site.ts` |
| Homepage | `src/content/home.ts` (FAQ preview from `faqs.ts`) |
| Service pages | `src/content/services.ts` (shared parts in `pages.ts`) |
| Who we help pages | `src/content/audiences.ts` |
| About, contact, book a consultation, send documents, quote box, WhatsApp messages | `src/content/pages.ts` |
| FAQs | `src/content/faqs.ts` |
| Legal pages | `src/content/legal.ts` |
| Menus and footer links | `src/content/navigation.ts` |
| Form labels and messages | `src/content/forms.ts` and `src/lib/validation.ts` |
| Emails | `src/content/emails.ts` |

**Pages on the site (23, plus the "page not found" page):**

- **Main:** `/` (home), `/services`, `/who-we-help`, `/about`, `/contact`, `/book-consultation`, `/faqs`
- **Seven service pages:** bookkeeping, VAT returns, annual accounts, payroll, company formation, business plans and forecasts, Capital Gains Tax
- **Five audience pages:** sole traders, startups, eCommerce sellers, hospitality and restaurants, individuals
- **Four legal pages:** privacy policy, cookie policy, complaints, terms of use
- **`/send-documents`:** linked from the contact page only, hidden from search engines
- `/contact?service=…` links (from each service page) open the same contact page with that service pre-selected, so they are not listed separately.
- `/styleguide` is a developer reference page, not linked from the site and hidden from search engines, so it is not included.

## 2. On every page

### Header

[Link] Halim Accountants wordmark → `/`

[Menu] Services

[Link] Bookkeeping — Records kept accurate and up to date → `/services/bookkeeping`

[Link] VAT returns — Prepared and filed through MTD software → `/services/vat-returns`

[Link] Annual accounts — Year-end accounts prepared and explained → `/services/annual-accounts`

[Link] Payroll — Payslips and payroll submissions handled → `/services/payroll`

[Link] Company formation — Set up a limited company the right way → `/services/company-formation`

[Link] Business plans and forecasts — Plans and cash-flow forecasts for lenders or your own planning → `/services/business-plans-and-forecasts`

[Link] Capital Gains Tax — Gains worked out and reported to HMRC → `/services/capital-gains-tax`

[Link] All services → `/services`

[Menu] Who we help

[Link] Sole traders — Records and VAT without the evening paperwork → `/who-we-help/sole-traders`

[Link] Startups — Set up properly from day one → `/who-we-help/startups`

[Link] eCommerce sellers — Marketplace payouts, fees and VAT made clear → `/who-we-help/ecommerce-sellers`

[Link] Hospitality and restaurants — Takings, supplier bills and VAT handled → `/who-we-help/hospitality`

[Link] Individuals — Capital Gains Tax and clear personal records → `/who-we-help/individuals`

[Link] Everyone we help → `/who-we-help`

[Link] About → `/about`

[Link] Contact → `/contact`

[Button] Book a free consultation → `/book-consultation`

### Floating WhatsApp button

Chat with us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`

### Footer

Bookkeeping, VAT and accounting support for UK small businesses and individuals.

**[H2]** Contact
- WhatsApp +44 7884 607135
- Consultations by phone or video across the UK

**[H2]** Services
- Bookkeeping
- VAT returns
- Annual accounts
- Payroll
- Company formation
- Business plans and forecasts
- Capital Gains Tax
- All services

**[H2]** Who we help
- Sole traders
- Startups
- eCommerce sellers
- Hospitality and restaurants
- Individuals

**[H2]** Company
- About
- Contact
- Book a consultation
- FAQs

**[H2]** Legal
- Privacy policy
- Cookie policy
- Complaints
- Terms of use

Halim Accountants is a trading name of Halim Enterprises Limited. Registered in England and Wales, company number 17491527. Registered office: Flat 41, Shaftesbury Point, High Street, London, E13 0AB.

© 2026 Halim Enterprises Limited

## 3. Page by page

23 pages and the "page not found" page, in site order. The header and footer above appear on each one and are not repeated.

### Page: `/`

- **Browser title:** Halim Accountants
- **Search description:** Bookkeeping, VAT and accounting support for UK small businesses and individuals.

#### Section 1: Clear accounts. Confident decisions.

Bookkeeping · VAT returns · Accounting

**[H1]** Clear accounts. Confident decisions.

Practical bookkeeping, VAT returns and year-round accounting support for UK small businesses and individuals, with everything explained in plain English.

[Link] Book a free consultation → `/book-consultation`

[Link] Explore our services → `/services`
- Free initial consultation by phone or video
- For clients anywhere in the UK

#### Section 2: Software we support

Software

**[H2]** Software we support

Not using any software yet? We can talk through what might suit you.
- Xero
- QuickBooks
- Sage
- FreeAgent
- Dext
- Hubdoc

Xero is a trademark of Xero Limited. QuickBooks is a registered trademark of Intuit Inc. Sage is a trademark of The Sage Group plc. FreeAgent, Dext and Hubdoc are trademarks of their respective owners. Halim Accountants is independent: we are not affiliated with, endorsed by or approved by these companies.

#### Section 3: Accounting support for the whole year, not just year-end

Services

**[H2]** Accounting support for the whole year, not just year-end

Most small businesses start with bookkeeping or VAT. Add more as your business grows.

**[H3]** Bookkeeping

Always know where your business stands

Your income and spending recorded, matched to your bank and kept up to date, so the numbers are ready whenever you need them.
- Every transaction recorded and matched to your bank
- Kept in Xero, QuickBooks, Sage or FreeAgent
- Questions answered in plain English

[Link] About bookkeeping → `/services/bookkeeping`

**[H3]** VAT returns

VAT returns, prepared and explained

Returns prepared from your records and submitted through MTD software, with the figures explained before you approve them.
- Prepared from your records
- Submitted through Making Tax Digital software
- Nothing sent until you approve it

[Link] About VAT returns → `/services/vat-returns`

**[H3]** More ways we can help
- Annual accounts Year-end accounts prepared and explained
- Payroll Payslips and payroll submissions handled
- Company formation Set up a limited company the right way
- Business plans and forecasts Plans and cash-flow forecasts for lenders or your own planning
- Capital Gains Tax Gains worked out and reported to HMRC
- See all services

#### Section 4: Does this sound like you?

Who we help

**[H2]** Does this sound like you?

We work with small businesses and individuals across the UK. Choose the situation closest to yours.

[Link] Everyone we help → `/who-we-help`

[Button] Sole traders

[Button] Startups

[Button] eCommerce sellers

[Button] Hospitality and restaurants

[Button] Individuals

Receipts piling up, VAT on your mind and no time in the evenings to sort it out.

Running your own business means doing every job yourself. We take the bookkeeping and VAT off your list, so you can get on with the work you are paid for.

**[H3]** How we can help
- Bookkeeping Your income and expenses kept up to date in Xero, QuickBooks or Sage.
- VAT returns If you are VAT registered, returns prepared and submitted through MTD-compatible software.
- Annual accounts A clear set of year-end figures showing what the business made.
- Company formation If you are thinking of becoming a limited company, help setting it up.

[Link] Book a free consultation → `/book-consultation`

[Link] More for sole traders → `/who-we-help/sole-traders`

Setting up for the first time and unsure which records you need to keep.

Starting a business means making a lot of decisions quickly. We help you set things up properly, so the numbers support your plans from day one.

**[H3]** How we can help
- Company formation Help setting up a limited company with the right details from the start.
- Bookkeeping A simple system from day one, so records never pile up.
- Business plans and forecasts A plan and cash-flow forecast you can explain to a lender, an investor or yourself.
- Payroll When you take on your first employee, payroll set up and run for you.

[Link] Book a free consultation → `/book-consultation`

[Link] More for startups → `/who-we-help/startups`

Payouts from several platforms, fees netted off and VAT that is hard to follow.

Selling online brings a constant stream of payouts, fees and refunds. We turn them into clear records and carefully prepared VAT returns.

**[H3]** How we can help
- Bookkeeping Each payout split into sales, fees and refunds, so your figures are real.
- VAT returns VAT returns built from those broken-down figures and submitted through MTD software.
- Annual accounts Year-end accounts that reflect stock and cost of sales properly.
- Business plans and forecasts Forecasts for stock buying and seasonal peaks.

[Link] Book a free consultation → `/book-consultation`

[Link] More for eCommerce sellers → `/who-we-help/ecommerce-sellers`

Daily takings, supplier invoices and staff wages, all moving at once.

Hospitality runs on long hours and tight margins. We keep your takings, supplier bills, staff pay and VAT in order, so you can focus on your customers.

**[H3]** How we can help
- Bookkeeping Takings and supplier bills recorded and reconciled, week in, week out.
- Payroll Pay worked out for staff on variable hours, with payslips and RTI submissions.
- VAT returns Returns prepared with the VAT treatment of your sales checked.
- Business plans and forecasts Cash-flow forecasts for a new site, a refit or the quiet months.

[Link] Book a free consultation → `/book-consultation`

[Link] More for hospitality and restaurants → `/who-we-help/hospitality`

You have sold property or shares and need to know whether Capital Gains Tax is due.

Not every tax question comes from a business. If you have sold property or investments, or want your personal records in order, talk to us about your situation.

**[H3]** How we can help
- Capital Gains Tax Gains worked out and reported, with every figure explained.

[Link] Book a free consultation → `/book-consultation`

[Link] More for individuals → `/who-we-help/individuals`

#### Section 5: Three steps to getting started

How it works

**[H2]** Three steps to getting started

It starts with a free conversation. There is nothing to pay to find out whether we can help.

[Link] Book your free call → `/book-consultation`

**[H3]** Book a free call

Tell us about your business and what you need, by phone or video.

**[H3]** Get a clear quote

We send you a quote that sets out the work and the cost before anything starts.

**[H3]** We handle the work and keep you on track

We take care of the work we have agreed and let you know what we need from you, and when.

#### Section 6: What you can expect from us

Why work with us

**[H2]** What you can expect from us

A small, personal practice: you speak to someone who knows your business and explains things clearly.

**[H3]** Wherever you are in the UK

We work remotely. Consultations are by phone or video, and you can message us on WhatsApp from anywhere in the UK.

Phone

Video

WhatsApp

Anywhere in the UK

**[H3]** Plain English

We explain your figures and deadlines without jargon, so you know what is happening and why.
- **Jargon**
  Bank reconciliation
- **In plain English**
  Checking your records match your bank statements

**[H3]** A personal point of contact

You have one person to speak to, who gets to know you and your business.

Saad Haleem

Your point of contact

**[H3]** A quote before any work starts

You know the cost up front. We only start once you have agreed the quote.
- We send a quote
- You agree it
- Work starts

#### Section 7: A personal practice, led by Saad Haleem

About us

**[H2]** A personal practice, led by Saad Haleem

Halim Accountants is a new practice, set up in 2026 to give small businesses and individuals a straightforward, personal accounting service.

Whether you are just starting out or moving from another accountant, we take the time to understand your situation before we suggest anything.

[Link] More about us → `/about`

Practice at a glance
- **Director**
  Saad Haleem
- **Company**
  Halim Enterprises Limited
- **Company number**
  17491527
- **Registered in**
  England and Wales
- **Incorporated**
  30 September 2026
- **Working model**
  Remote, across the UK
- **Consultations**
  Free, by phone or video

[Link] View our Companies House record → `https://find-and-update.company-information.service.gov.uk/company/17491527`

#### Section 8: Common questions

Questions

**[H2]** Common questions

Short answers to questions you may have before getting in touch.

[Link] All FAQs → `/faqs`

Can’t see your question? Ask us on WhatsApp

**Q:** Is the first consultation really free?

Yes. The initial consultation is free and takes place by phone or video. We use it to understand your situation and what you need.

If you would like us to help afterwards, we send you a quote. There is nothing to pay unless you agree to it.

**Q:** Can you work with me if I’m not in London?

Yes. We work remotely with clients anywhere in the UK. Consultations are by phone or video, and you can message us on WhatsApp.

**Q:** Which accounting software do you use?

We work with Xero, QuickBooks, Sage and FreeAgent. If you already use one of these, let us know which when you get in touch.

If you are not using any software yet, we can talk through which might suit your business during your consultation.

**Q:** How do I send you my documents?

Once we start working together, we send you a secure way to share your documents.

Please don’t send bank statements, ID or other sensitive documents by email or WhatsApp.

**Q:** Why don’t you list your prices?

Every business is different, so we quote for the work you actually need. After your free consultation we send you a quote, and we only start once you have agreed it.

#### Section 9: Let’s talk about your books

**[H2]** Let’s talk about your books

Book a free initial consultation by phone or video. We’ll listen, answer your questions and, if we’re a good fit, send you a quote.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services`

- **Browser title:** Accounting Services for Small Businesses | Halim Accountants
- **Search description:** Bookkeeping, VAT returns, annual accounts, payroll, company formation, business plans and Capital Gains Tax help, delivered remotely across the UK.

#### Part 1: Our services

- Home
- Services

Services

**[H1]** Our services

Practical accounting support for small businesses and individuals across the UK. Start with what you need now and add more as you grow.

[Link] Book a free consultation → `/book-consultation`

#### Part 2: Our main services

**[H2]** Our main services

**[H3]** Bookkeeping

Always know where your business stands

Your income and spending recorded, matched to your bank and kept up to date, so the numbers are ready whenever you need them.
- Every transaction recorded and matched to your bank
- Kept in Xero, QuickBooks, Sage or FreeAgent
- Questions answered in plain English

[Link] About bookkeeping → `/services/bookkeeping`

**[H3]** VAT returns

VAT returns, prepared and explained

Returns prepared from your records and submitted through MTD software, with the figures explained before you approve them.
- Prepared from your records
- Submitted through Making Tax Digital software
- Nothing sent until you approve it

[Link] About VAT returns → `/services/vat-returns`

**[H2]** More services
- Annual accounts Year-end and statutory accounts prepared from your records, with the figures explained in plain English.
- Payroll Payroll run for you and your staff each pay period, with payslips and the submissions HMRC expects.
- Company formation Help setting up a limited company and getting the first steps right, from registration to your first set of records.
- Business plans and forecasts Business plans and cash-flow forecasts built on realistic assumptions, for a lender, an investor or your own planning.
- Capital Gains Tax Help calculating and reporting gains when you sell property, shares or other assets.

#### Part 3: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services/bookkeeping`

- **Browser title:** Bookkeeping for UK Small Businesses | Halim Accountants
- **Search description:** Bookkeeping kept up to date in Xero, QuickBooks or Sage for UK sole traders and small businesses. Remote service. Book a free consultation.

#### Part 3: Bookkeeping

- Home
- Services
- Bookkeeping

Services

**[H1]** Bookkeeping

We keep your books up to date throughout the year, so you always know where your business stands and year-end starts from records that are already in order.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Who it’s for

**[H2]** Who it’s for

Sole traders and small businesses who would rather spend their time running the business than matching receipts to bank statements.

It suits you whether your records already live in accounting software and just need keeping up, or are spread across receipts, spreadsheets and statements and need bringing together first.

**[H2]** What’s included
- Recording sales, purchases and expenses in your accounting software
- Reconciling your business bank accounts and credit cards
- Keeping track of who owes you money and who you owe
- Matching receipts and invoices to the transactions they belong to
- Flagging anything unusual or missing so it can be sorted early
- A regular summary of how the business is doing, in plain English
- Records kept ready for VAT returns and year-end accounts

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=bookkeeping#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Bookkeeping.`

**[H2]** How it works

**[H3]** Free consultation

We talk about your business, how you keep records now and how often you would like them updated.

**[H3]** Set-up or catch-up

We set your software up properly, or bring existing records up to date, so we start from a clean position.

**[H3]** Regular bookkeeping

We keep your books up to date on the schedule we agree, usually monthly or quarterly.

**[H3]** Check-ins

We send you a short update and raise questions as they come up, rather than saving them for year-end.

**[H2]** What we’ll need from you
- Access to your accounting software, or the name of the one you would like to use
- Business bank and credit card statements, or a bank feed connection
- Sales invoices, plus receipts for purchases and expenses
- Details of any loans, finance or hire purchase agreements
- A note of anything unusual, such as a large one-off payment

**[H2]** Questions about this service

**Q:** How often will you update my books?

That is up to you. Monthly or quarterly are the usual choices. We suggest a schedule in your consultation, based on how busy your accounts are and whether you are VAT registered.

**Q:** My records are behind. Can you help me catch up?

Yes. We can bring your records up to date before regular bookkeeping starts. We look at what is outstanding during your consultation and include the catch-up work in your quote.

**Q:** Do I need to use accounting software?

We work with Xero, QuickBooks and Sage, and keeping your records in one of them makes things simpler for both of us. If you are VAT registered, Making Tax Digital rules mean your VAT records need to be kept digitally anyway.

Not using any software yet? We can talk through which might suit you.

**Q:** Will I still be able to see my figures?

Yes. Your records are kept in accounting software you can log in to whenever you like, so you are never waiting on us to see how things stand.

**[H2]** Related services
- VAT returns Prepared and filed through MTD software
- Annual accounts Year-end accounts prepared and explained
- Payroll Payslips and payroll submissions handled

**[H2]** Who this helps
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services/vat-returns`

- **Browser title:** VAT Returns for UK Small Businesses | Halim Accountants
- **Search description:** VAT returns prepared from your records and submitted through Making Tax Digital-compatible software. Remote help across the UK. Free consultation.

#### Part 3: VAT returns

- Home
- Services
- VAT returns

Services

**[H1]** VAT returns

We prepare your VAT returns from your records and submit them through Making Tax Digital-compatible software, explaining the figures before anything is sent.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Who it’s for

**[H2]** Who it’s for

VAT-registered businesses that want each return prepared carefully and explained clearly, rather than pieced together late at night before it is due.

It also suits businesses about to register for VAT that want to understand what changes once they do.

**[H2]** What’s included
- Checking the VAT treatment of your sales and purchases
- Preparing each return from your bookkeeping records
- Reconciling your VAT account so the return ties back to your books
- Talking you through the figures before the return is submitted
- Submitting the return through Making Tax Digital-compatible software
- Confirming how much VAT is due, or how much you can reclaim
- A reminder as each return period comes round

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=vat-returns#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20VAT%20returns.`

**[H2]** How it works

**[H3]** Review your position

We look at your VAT registration, the scheme you use and how your records are kept.

**[H3]** Prepare the return

We prepare the return from your records and look into anything that seems out of line.

**[H3]** You approve it

We explain the figures and answer your questions. Nothing is submitted until you are happy.

**[H3]** Submit and keep a record

The approved return is submitted through MTD-compatible software, and you keep a copy of what was filed.

**[H2]** What we’ll need from you
- Your VAT registration number and the dates of your return periods
- Access to your accounting software, or your bookkeeping records for the period
- Sales and purchase invoices for the period
- Details of any VAT scheme you use, such as the Flat Rate Scheme
- Any letters or notices from HMRC about your VAT

**[H2]** Questions about this service

**Q:** What is Making Tax Digital for VAT?

**Q:** Should I register for VAT?

**Q:** Can you help me choose a VAT scheme?

**Q:** Can you help if a VAT return was late or wrong?

**[H2]** Related services
- Bookkeeping Records kept accurate and up to date
- Annual accounts Year-end accounts prepared and explained

**[H2]** Who this helps
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services/annual-accounts`

- **Browser title:** Annual Accounts for Small Businesses | Halim Accountants
- **Search description:** Year-end and statutory accounts prepared from your records and explained in plain English, for UK limited companies and sole traders.

#### Part 3: Annual accounts

- Home
- Services
- Annual accounts

Services

**[H1]** Annual accounts

We prepare your year-end accounts from your records and walk you through what the figures say about your business.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Who it’s for

**[H2]** Who it’s for

Limited companies, which must prepare statutory accounts every year and file them with Companies House.

Sole traders who want a clear set of year-end figures, whether to understand the year, to support a loan or mortgage application, or to work out their profit.

**[H2]** What’s included
- Reviewing your bookkeeping records for the year
- Year-end adjustments such as accruals, prepayments and depreciation
- A profit and loss account and balance sheet
- Statutory accounts in the format required for limited companies
- A plain-English walk-through of the figures before they are finalised
- Accounts prepared ready to file, with the filing steps explained

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=annual-accounts#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Annual%20accounts.`

**[H2]** How it works

**[H3]** Agree the year-end

We confirm your accounting period and which records are available.

**[H3]** Review and adjust

We check the year’s records and make the year-end adjustments.

**[H3]** Draft and discuss

We prepare draft accounts and go through them with you, line by line if you like.

**[H3]** Approve and file

Once the accounts are approved they are ready to file, and we explain exactly how that is done.

**[H2]** What we’ll need from you
- Your bookkeeping records for the year, or access to your accounting software
- Bank statements covering the whole accounting period
- Details of equipment, vehicles or other assets bought or sold during the year
- Loan, lease and hire purchase agreements
- A list of money owed to and by the business at the year-end
- Last year’s accounts, if you have them

**[H2]** Questions about this service

**Q:** When are my company’s accounts due?

**Q:** Do sole traders need annual accounts?

**Q:** Can you prepare accounts if my bookkeeping is not up to date?

**[H2]** Related services
- Bookkeeping Records kept accurate and up to date
- VAT returns Prepared and filed through MTD software
- Business plans and forecasts Plans and cash-flow forecasts for lenders or your own planning

**[H2]** Who this helps
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services/payroll`

- **Browser title:** Payroll Services for Small Employers | Halim Accountants
- **Search description:** Payroll run for you each pay period: payslips, Real Time Information submissions to HMRC and workplace pension figures. Remote, across the UK.

#### Part 3: Payroll

- Home
- Services
- Payroll

Services

**[H1]** Payroll

We run your payroll each pay period, so your team’s pay is worked out with care and HMRC receives the information it needs.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Who it’s for

**[H2]** Who it’s for

Small employers, from a business taking on its first member of staff to a team with regular weekly or monthly pay runs.

Directors of limited companies who pay themselves a salary through payroll.

**[H2]** What’s included
- Calculating pay, tax and National Insurance for each pay period
- Payslips for every employee
- Real Time Information (RTI) submissions to HMRC each time you pay staff
- Workplace pension deductions, and the figures your pension provider needs
- Statutory payments such as sick pay and maternity pay
- New starters and leavers, including P45s
- Year-end payroll tasks, including P60s for your employees

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=payroll#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Payroll.`

**[H2]** How it works

**[H3]** Set up

We set up payroll for your business, or take over from your current arrangement, and help you register as an employer if you have not already.

**[H3]** Each pay period

You tell us about hours, overtime, starters and leavers, and we calculate the payroll.

**[H3]** Review and pay

We send you payslips and a summary of what to pay your staff and HMRC, for you to check and pay.

**[H3]** Report

We make the RTI submissions to HMRC and keep your payroll records up to date.

**[H2]** What we’ll need from you
- Your PAYE reference and Accounts Office reference, if you are already registered as an employer
- Each employee’s details, including their National Insurance number and starter information
- Pay rates, hours, overtime, bonuses or commission for each pay period
- Details of your workplace pension scheme
- P45s from new starters who have them

**[H2]** Questions about this service

**Q:** I’m taking on my first employee. Where do I start?

**Q:** Can you run payroll for just one director?

**Q:** What do I need to tell you each pay period?

**Q:** Do you handle workplace pensions?

**[H2]** Related services
- Bookkeeping Records kept accurate and up to date
- Company formation Set up a limited company the right way
- Annual accounts Year-end accounts prepared and explained

**[H2]** Who this helps
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services/company-formation`

- **Browser title:** Help Setting Up a Limited Company | Halim Accountants
- **Search description:** Practical help setting up a UK limited company, from the details Companies House needs to getting your records and registrations in order afterwards.

#### Part 3: Company formation

- Home
- Services
- Company formation

Services

**[H1]** Company formation

We help you set up a limited company with the right details from the start, then get the first months of records and registrations in order.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Who it’s for

**[H2]** Who it’s for

Sole traders thinking about becoming a limited company, and people starting a new business who have decided a company is the right structure.

If you are not yet sure whether a company suits you, your free consultation is a good place to talk it through.

**[H2]** What’s included
- Talking through the information Companies House needs
- Help choosing a company name and checking it is available
- Guidance on directors, shareholders and how the shares are split
- Choosing a registered office address and the right business activity (SIC) code
- Explaining identity verification for directors and people with significant control
- A checklist of what to set up once the company is registered
- Bookkeeping set up from day one

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=company-formation#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Company%20formation.`

**[H2]** How it works

**[H3]** Plan

We talk through your plans and what the company needs: a name, directors, shareholders and addresses.

**[H3]** Prepare

We help you gather the details and prepare the application to Companies House.

**[H3]** Registration

Once Companies House registers the company, you receive a certificate of incorporation and your company number.

**[H3]** Next steps

We help with what comes next: a business bank account, registering with HMRC and setting up your bookkeeping.

**[H2]** What we’ll need from you
- Your preferred company name, plus a back-up in case it is taken
- Names, addresses and dates of birth of the directors and shareholders
- How the shares will be divided between shareholders
- An address to use as the company’s registered office
- A short description of what the business will do
- Confirmation that each director has verified their identity with Companies House, or is ready to

**[H2]** Questions about this service

**Q:** Do you register the company for me?

**Q:** Should I set up a limited company?

**Q:** What happens after the company is set up?

**[H2]** Related services
- Bookkeeping Records kept accurate and up to date
- Payroll Payslips and payroll submissions handled
- Business plans and forecasts Plans and cash-flow forecasts for lenders or your own planning

**[H2]** Who this helps
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services/business-plans-and-forecasts`

- **Browser title:** Business Plans and Cash-Flow Forecasts | Halim Accountants
- **Search description:** Business plans and cash-flow forecasts built on realistic assumptions, for lenders, investors or your own planning. Remote help across the UK.

#### Part 3: Business plans and forecasts

- Home
- Services
- Business plans and forecasts

Services

**[H1]** Business plans and forecasts

We help you turn your plans into clear numbers: a business plan and cash-flow forecast built on assumptions you understand and can explain.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Who it’s for

**[H2]** Who it’s for

Businesses applying for a loan or investment that need a plan and forecast to support the application.

Owners planning a new hire, a second site or a quieter season who want to see what it means for cash before committing.

**[H2]** What’s included
- A conversation about your goals, your market and your plans
- Agreeing the assumptions behind the numbers with you
- A month-by-month cash-flow forecast
- A projected profit and loss account
- A written business plan, or help structuring your own
- Scenarios showing what happens if sales come in higher or lower
- A walk-through, so you can explain the figures yourself

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=business-plans-and-forecasts#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Business%20plans%20and%20forecasts.`

**[H2]** How it works

**[H3]** Understand the goal

We find out who the plan is for and what it needs to show.

**[H3]** Agree the assumptions

We work through sales, costs and timing with you, so the numbers reflect how your business really runs.

**[H3]** Build the forecast

We prepare the forecast and plan, and check that the figures hang together.

**[H3]** Review together

We go through it with you and adjust it until you are comfortable presenting it.

**[H2]** What we’ll need from you
- Any recent accounts or bookkeeping records
- Your plans: what you want to do, and when
- Expected prices, sales volumes and main costs
- Details of existing loans, finance and other commitments
- Any format or information the lender or investor has asked for

**[H2]** Questions about this service

**Q:** Will a business plan get me a loan?

Nobody can promise that. Lenders and investors make their own decisions. A clear plan with realistic numbers helps you present your case well.

**Q:** I’m a new business with no figures yet. Can you still help?

Yes. We build the forecast from your plans and research, and set out the assumptions clearly so anyone reading it can see where the numbers come from.

**Q:** Can you update the forecast later?

Yes. A forecast is most useful when it is compared with what actually happens. We can update yours as the business develops.

**[H2]** Related services
- Bookkeeping Records kept accurate and up to date
- Company formation Set up a limited company the right way
- Annual accounts Year-end accounts prepared and explained

**[H2]** Who this helps
- Startups Set up properly from day one, with records that are easy to keep tidy.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/services/capital-gains-tax`

- **Browser title:** Capital Gains Tax Help for Individuals | Halim Accountants
- **Search description:** Help working out and reporting Capital Gains Tax when you sell property, shares or other assets. Clear calculations, explained in plain English.

#### Part 3: Capital Gains Tax

- Home
- Services
- Capital Gains Tax

Services

**[H1]** Capital Gains Tax

We help you work out whether Capital Gains Tax is due when you sell or give away an asset, how much it may be, and how to report it.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Who it’s for

**[H2]** Who it’s for

People who have sold, or are about to sell, a property that is not their main home, such as a buy-to-let or a second home.

Anyone who has sold shares, investments or other valuable assets and wants to know where they stand.

**[H2]** What’s included
- Working out the gain from your purchase and sale records
- Including allowable costs, such as buying and selling fees and improvements
- Checking which reliefs and exemptions may apply
- Calculating how much tax may be due
- Explaining how and when the gain needs to be reported to HMRC
- A clear record of the calculation for your files

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=capital-gains-tax#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Capital%20Gains%20Tax.`

**[H2]** How it works

**[H3]** Tell us about the sale

We find out what you sold, when you bought it and how you have used it.

**[H3]** Gather the figures

We collect the purchase and sale details, costs and any spending on improvements.

**[H3]** Calculate

We work out the gain and any tax due, and explain each figure.

**[H3]** Report

We explain how and when to report and pay, and help you with the report itself.

**[H2]** What we’ll need from you
- Completion statements for the purchase and the sale
- Records of buying and selling costs, such as legal and estate agent fees
- Receipts for improvements, such as an extension (repairs and maintenance do not count)
- For shares, contract notes or statements showing purchase and sale prices
- The dates of any periods you lived in the property, if it was ever your home

**[H2]** Questions about this service

**Q:** When do I need to report a gain on a UK property?

If you sell a UK residential property and Capital Gains Tax is due, you usually need to report it and pay within 60 days of completion. Getting in touch as soon as a sale is agreed gives the most time to prepare.

**Q:** Do I pay Capital Gains Tax when I sell my home?

Usually not, if it has been your main home for the whole time you owned it. It can be more complicated if you let it out, used part of it only for business, or had more than one home. Talk to us about your situation.

**Q:** Can you reduce the tax I pay?

We include every cost and relief you are entitled to claim, but we cannot promise a particular result. The tax due depends on the facts of your sale.

**Q:** I sold something in an earlier year and did not report it. What now?

Talk to us. We can look at what happened and explain the options for putting it right with HMRC.

**[H2]** Related services
- Bookkeeping Records kept accurate and up to date
- Annual accounts Year-end accounts prepared and explained

**[H2]** Who this helps
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Individuals Help with Capital Gains Tax and keeping clear records of your personal finances.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/who-we-help`

- **Browser title:** Who We Help | Halim Accountants
- **Search description:** Accounting support for sole traders, startups, eCommerce sellers, hospitality businesses and individuals, delivered remotely across the UK.

#### Part 1: Support shaped around how you work

- Home
- Who we help

Who we help

**[H1]** Support shaped around how you work

Every business has its own paperwork and pressures. Find the page that sounds most like you, or talk to us about your situation.

[Link] Book a free consultation → `/book-consultation`

#### Part 2: Who we help

[Link] Sole traders Keep on top of your records and VAT without it eating into your evenings. Services that help Bookkeeping · VAT returns · Annual accounts · Company formation → `/who-we-help/sole-traders`

[Link] Startups Set up properly from day one, with records that are easy to keep tidy. Services that help Company formation · Bookkeeping · Business plans and forecasts · Payroll → `/who-we-help/startups`

[Link] eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on. Services that help Bookkeeping · VAT returns · Annual accounts · Business plans and forecasts → `/who-we-help/ecommerce-sellers`

[Link] Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service. Services that help Bookkeeping · Payroll · VAT returns · Business plans and forecasts → `/who-we-help/hospitality`

[Link] Individuals Help with Capital Gains Tax and keeping clear records of your personal finances. Services that help Capital Gains Tax → `/who-we-help/individuals`

#### Part 3: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/who-we-help/sole-traders`

- **Browser title:** Accountants for Sole Traders | Halim Accountants
- **Search description:** Bookkeeping, VAT returns and year-end accounts for UK sole traders, handled remotely by phone, video and WhatsApp. Book a free consultation.

#### Part 3: Sole traders

- Home
- Who we help
- Sole traders

Who we help

**[H1]** Sole traders

Running your own business means doing every job yourself. We take the bookkeeping and VAT off your list, so you can get on with the work you are paid for.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Sound familiar?

**[H2]** Sound familiar?

As a sole trader, the business and its paperwork are all yours. Receipts collect in the van or on the kitchen table, statements pile up, and the books get pushed to evenings and weekends.

Keeping on top of it through the year makes everything easier: you know how the business is doing, and the figures are ready whenever they are needed.

**[H2]** Common challenges
- Finding time for bookkeeping around paying work
- Keeping business and personal spending apart
- Knowing which costs count as business expenses
- Deciding whether, and when, to register for VAT
- Seeing what your profit actually is

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20sole%20traders.`

**[H2]** How we can help
- Bookkeeping Your income and expenses kept up to date in Xero, QuickBooks or Sage.
- VAT returns If you are VAT registered, returns prepared and submitted through MTD-compatible software.
- Annual accounts A clear set of year-end figures showing what the business made.
- Company formation If you are thinking of becoming a limited company, help setting it up.

**[H2]** Working with us remotely

There is no office to visit. We talk by phone or video, you can message us on WhatsApp, and we agree a secure way to share your records. It fits around a working day that is rarely nine to five.

**[H2]** Questions

**Q:** Do I need an accountant as a sole trader?

**Q:** Can you help me move from sole trader to limited company?

**Q:** I have only just started. Is it too early to get help?

**[H2]** Others we help
- Startups Set up properly from day one, with records that are easy to keep tidy.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.
- Individuals Help with Capital Gains Tax and keeping clear records of your personal finances.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/who-we-help/startups`

- **Browser title:** Accounting Support for Startups | Halim Accountants
- **Search description:** Company set-up, bookkeeping, payroll and cash-flow forecasts for UK startups, with plain-English support from day one. Free initial consultation.

#### Part 3: Startups

- Home
- Who we help
- Startups

Who we help

**[H1]** Startups

Starting a business means making a lot of decisions quickly. We help you set things up properly, so the numbers support your plans from day one.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Sound familiar?

**[H2]** Sound familiar?

In the first months there is a lot to get right at once: choosing a structure, opening a bank account, registering with HMRC and working out how much cash you will need before sales pick up.

Putting the basics in place early, with a simple bookkeeping system and a realistic forecast, means fewer surprises later and better answers when a lender or investor asks questions.

**[H2]** Common challenges
- Choosing between being a sole trader and a limited company
- Knowing which registrations you need, and when
- Setting up bookkeeping before the paperwork builds up
- Planning cash flow before income is steady
- Preparing numbers for a loan or an investor

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20startups.`

**[H2]** How we can help
- Company formation Help setting up a limited company with the right details from the start.
- Bookkeeping A simple system from day one, so records never pile up.
- Business plans and forecasts A plan and cash-flow forecast you can explain to a lender, an investor or yourself.
- Payroll When you take on your first employee, payroll set up and run for you.

**[H2]** Working with us remotely

We work remotely, so you get the same support wherever you are based in the UK, by phone, video or WhatsApp, at the pace your business is moving.

**[H2]** Questions

**Q:** When should I speak to an accountant?

**Q:** Can you help with a forecast for a bank or an investor?

**[H2]** Others we help
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.
- Individuals Help with Capital Gains Tax and keeping clear records of your personal finances.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/who-we-help/ecommerce-sellers`

- **Browser title:** Accountants for eCommerce Sellers | Halim Accountants
- **Search description:** Bookkeeping and VAT for online sellers, with marketplace payouts, fees and refunds broken down properly. Remote support across the UK.

#### Part 3: eCommerce sellers

- Home
- Who we help
- eCommerce sellers

Who we help

**[H1]** eCommerce sellers

Selling online brings a constant stream of payouts, fees and refunds. We turn them into clear records and carefully prepared VAT returns.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Sound familiar?

**[H2]** Sound familiar?

Marketplaces and payment providers rarely pay you what you actually sold. Payouts arrive with fees, refunds and adjustments already taken off, often from several platforms at once.

Unless each payout is broken down properly, it is hard to see your real sales, costs and margins, and harder still to get VAT right.

**[H2]** Common challenges
- Reconciling payouts from several platforms and payment providers
- Recording marketplace and payment fees correctly
- Handling refunds, returns and chargebacks
- Keeping track of stock and the cost of what you sell
- Working out the VAT on different kinds of sale

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20eCommerce%20sellers.`

**[H2]** How we can help
- Bookkeeping Each payout split into sales, fees and refunds, so your figures are real.
- VAT returns VAT returns built from those broken-down figures and submitted through MTD software.
- Annual accounts Year-end accounts that reflect stock and cost of sales properly.
- Business plans and forecasts Forecasts for stock buying and seasonal peaks.

**[H2]** Working with us remotely

Your business already runs online, and so do we. We work in your accounting software and talk by phone, video or WhatsApp, wherever you are in the UK.

**[H2]** Questions

**Q:** Can you handle sales from more than one platform?

**Q:** Do I need to register for VAT as an online seller?

**[H2]** Others we help
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.
- Individuals Help with Capital Gains Tax and keeping clear records of your personal finances.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/who-we-help/hospitality`

- **Browser title:** Accountants for Hospitality Businesses | Halim Accountants
- **Search description:** Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses, handled remotely across the UK. Book a free consultation.

#### Part 3: Hospitality and restaurants

- Home
- Who we help
- Hospitality and restaurants

Who we help

**[H1]** Hospitality and restaurants

Hospitality runs on long hours and tight margins. We keep your takings, supplier bills, staff pay and VAT in order, so you can focus on your customers.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Sound familiar?

**[H2]** Sound familiar?

Takings come in through cash, card machines and delivery platforms. Supplier invoices arrive every week, staff work changing shifts, and busy and quiet seasons make cash flow hard to predict.

With so much going on, the books are often the last job on the list, until a VAT return or a payday comes round.

**[H2]** Common challenges
- Reconciling cash, card and delivery platform takings
- Keeping on top of frequent supplier invoices
- Running payroll for staff on changing hours
- Treating tips and service charges properly
- Getting the VAT right on different kinds of food and drink
- Planning for seasonal ups and downs

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20hospitality%20and%20restaurants.`

**[H2]** How we can help
- Bookkeeping Takings and supplier bills recorded and reconciled, week in, week out.
- Payroll Pay worked out for staff on variable hours, with payslips and RTI submissions.
- VAT returns Returns prepared with the VAT treatment of your sales checked.
- Business plans and forecasts Cash-flow forecasts for a new site, a refit or the quiet months.

**[H2]** Working with us remotely

You cannot easily step away from the kitchen or the floor. We fit around your hours by phone, video or WhatsApp, with no office visits.

**[H2]** Questions

**Q:** Can you run payroll for staff on variable hours?

**Q:** How do tips affect payroll?

**[H2]** Others we help
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Individuals Help with Capital Gains Tax and keeping clear records of your personal finances.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/who-we-help/individuals`

- **Browser title:** Accounting Help for Individuals | Halim Accountants
- **Search description:** Help with Capital Gains Tax and personal financial records for individuals across the UK. Talk to us about your situation in a free consultation.

#### Part 3: Individuals

- Home
- Who we help
- Individuals

Who we help

**[H1]** Individuals

Not every tax question comes from a business. If you have sold property or investments, or want your personal records in order, talk to us about your situation.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Sound familiar?

**[H2]** Sound familiar?

Selling a second property, a buy-to-let or a portfolio of shares can raise questions about Capital Gains Tax: whether it is due, how much it might be and how to report it.

Good personal records make those questions much easier to answer, whether you are dealing with a sale now or expect one in the future.

**[H2]** Common challenges
- Working out whether Capital Gains Tax is due on a sale
- Finding records of what you paid and what you spent on improvements
- Understanding the reporting deadlines for property sales
- Keeping clear records of investments and other assets

**[H2]** Get a quote

Tell us what you need. We send you a quote before any work starts, and there’s nothing to pay unless you agree to it.

[Link] Book a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20individuals.`

**[H2]** How we can help
- Capital Gains Tax Gains worked out and reported, with every figure explained.

**[H2]** Working with us remotely

We work remotely, so you can speak to us by phone or video from anywhere in the UK, without visiting an office.

**[H2]** Questions

**Q:** Can you help with other personal tax questions?

Talk to us about your situation. We will tell you plainly what we can help with, and what we cannot.

**Q:** I have sold a property. How soon should I get in touch?

As soon as you can, ideally when the sale is agreed. Gains on UK residential property usually have to be reported within a short time of completion, so an early start helps.

**[H2]** Others we help
- Sole traders Keep on top of your records and VAT without it eating into your evenings.
- Startups Set up properly from day one, with records that are easy to keep tidy.
- eCommerce sellers Make sense of marketplace payouts, fees and VAT across the platforms you sell on.
- Hospitality and restaurants Daily takings, supplier bills and VAT handled, so you can focus on service.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/about`

- **Browser title:** About Us | Halim Accountants
- **Search description:** Halim Accountants is a new, remote-first UK accounting practice offering a personal service and clear, plain-English communication.

#### Part 1: A personal practice, working remotely across the UK

- Home
- About

About us

**[H1]** A personal practice, working remotely across the UK

Halim Accountants is a new accounting practice, set up in 2026 to give small businesses and individuals a straightforward, personal service, wherever they are in the UK.

[Link] Book a free consultation → `/book-consultation`

#### Part 2: Why we work the way we do

**[H2]** Why we work the way we do

We are a new practice, and we would rather say so than pretend otherwise. Working with us means working with a small practice that takes the time to understand your business and explain things properly.

We work remotely. Consultations are by phone or video and you can message us on WhatsApp, so it makes no difference whether you are in London, Leeds or the Highlands.

We keep things plain. You will know what we are doing, why, and what we need from you, without jargon.

#### Part 3: Saad Haleem

The director

**[H2]** Saad Haleem

Director

Saad Haleem is the director of Halim Enterprises Limited, the company behind Halim Accountants.

#### Part 4: How we work

**[H2]** How we work

A small, personal practice: you speak to someone who knows your business and explains things clearly.

**[H3]** Wherever you are in the UK

We work remotely. Consultations are by phone or video, and you can message us on WhatsApp from anywhere in the UK.

Phone

Video

WhatsApp

Anywhere in the UK

**[H3]** Plain English

We explain your figures and deadlines without jargon, so you know what is happening and why.
- **Jargon**
  Bank reconciliation
- **In plain English**
  Checking your records match your bank statements

**[H3]** A personal point of contact

You have one person to speak to, who gets to know you and your business.

Saad Haleem

Your point of contact

**[H3]** A quote before any work starts

You know the cost up front. We only start once you have agreed the quote.
- We send a quote
- You agree it
- Work starts

#### Part 5: Software we support

Software

**[H2]** Software we support

Not using any software yet? We can talk through what might suit you.
- Xero
- QuickBooks
- Sage
- FreeAgent
- Dext
- Hubdoc

Xero is a trademark of Xero Limited. QuickBooks is a registered trademark of Intuit Inc. Sage is a trademark of The Sage Group plc. FreeAgent, Dext and Hubdoc are trademarks of their respective owners. Halim Accountants is independent: we are not affiliated with, endorsed by or approved by these companies.

#### Part 6: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/contact`

- **Browser title:** Contact Us | Halim Accountants
- **Search description:** Book a free consultation, request a callback or message us on WhatsApp. We work remotely with clients across the UK, by phone or video.

#### Part 1: Get in touch

- Home
- Contact

Contact

**[H1]** Get in touch

We work remotely with clients across the UK; consultations are by phone or video.

#### Part 2: Ways to contact us

**[H2]** Book a free consultation

The best place to start. A free conversation by phone or video about your business and what would help.

[Link] Book a free consultation → `/book-consultation`

We aim to reply within one working day.

**[H3]** Request a callback

Leave your number and a good time, and we will call you.

[Link] Request a callback → `#callback`

**[H3]** WhatsApp

Send us a message whenever suits you.

+44 7884 607135

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`

Already working with us? How to send us documents securely

#### Part 3: Forms

**[H2]** Send an enquiry

Tell us a little about your business and what you need, and we will get back to you.

[Field] Your name (required)

[Field] Email address (required)

[Field] Phone number (optional)

[Field] Business name (optional)

[Field] Which best describes you? (required)

[Options] Choose an option | Sole trader | Limited company | Startup | eCommerce seller | Hospitality or restaurant | Individual | Other

[Field] Approximate annual turnover (optional)

[Options] Choose an option | Under £50k | £50k–£90k | £90k–£250k | £250k–£1m | Over £1m | Prefer not to say

[Field] What do you need help with? (required)

[Options] Choose an option | Bookkeeping | VAT returns | Annual accounts | Payroll | Company formation | Business plans and forecasts | Capital Gains Tax | Not sure yet

[Field] How can we help? (required)

A few lines about your business and what you need. Please don’t include bank details or tax references.

[Field] I’ve read the privacy policy (required)

[Button] Send enquiry

We only use these details to respond to you. Read our privacy policy to see how we handle your information.

**[H2]** Request a callback

Leave your number and a good time, and we will call you.

[Field] Your name (required)

[Field] Phone number (required)

[Field] When is best to call? (required)

[Options] Choose an option | Morning | Afternoon | Any time

[Field] What would you like to talk about? (optional)

A few words is plenty.

[Field] I’ve read the privacy policy (required)

[Button] Request a callback

We only use these details to respond to you. Read our privacy policy to see how we handle your information.

### Page: `/book-consultation`

- **Browser title:** Book a Free Consultation | Halim Accountants
- **Search description:** Book a free initial consultation by phone or video. Find out what it covers, what to prepare and what happens next. No obligation to go ahead.

#### Part 1: Book a free consultation

- Home
- Book a consultation

Free consultation

**[H1]** Book a free consultation

A free, no-pressure conversation by phone or video about your business, your records and what would help. If we can help, we follow up with a quote.

#### Part 2: Request a consultation

**[H2]** Request a consultation

Leave your name, number and a good time to call, and we will get in touch to arrange your free consultation.

[Field] Your name (required)

[Field] Phone number (required)

[Field] When is best to call? (required)

[Options] Choose an option | Morning | Afternoon | Any time

[Field] What would you like to talk about? (optional)

A few words is plenty.

[Field] I’ve read the privacy policy (required)

[Button] Request a callback

We only use these details to respond to you. Read our privacy policy to see how we handle your information.

Prefer to write? Message us instead.

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20book%20a%20free%20consultation.`

**[H2]** What we’ll cover
- Your business and your goals
- Your current bookkeeping setup
- What you need for VAT
- Agreeing the next steps

**[H2]** How it works
- The consultation is by phone or video, whichever you prefer.
- We arrange a time with you when you get in touch.
- There is nothing to pay, and no obligation to go ahead afterwards.

**[H2]** Useful to have to hand
- The name of any accounting software you use
- A rough idea of your turnover or income
- Any deadlines or HMRC letters you have questions about
- A short list of the questions you want to ask

No need to send documents beforehand. We agree a secure way to share them if you decide to go ahead.

**[H2]** What happens afterwards

If you would like our help, we send you a quote setting out the work and the cost. Nothing starts until you have agreed it.

### Page: `/faqs`

- **Browser title:** Frequently Asked Questions | Halim Accountants
- **Search description:** Answers to common questions about our free consultation, working together remotely, our services and how we handle your documents.

#### Part 3: Frequently asked questions

- Home
- FAQs

FAQs

**[H1]** Frequently asked questions

Straight answers to the questions people ask before getting in touch. If yours isn’t here, just ask.

[Link] Book a free consultation → `/book-consultation`

#### Part 4: Getting started

Topics
- Getting started 4
- Working together 4
- Services 3
- Documents and data 3

**[H2]** Getting started

**Q:** Is the first consultation really free?

Yes. The initial consultation is free and takes place by phone or video. We use it to understand your situation and what you need.

If you would like us to help afterwards, we send you a quote. There is nothing to pay unless you agree to it.

**Q:** Why don’t you list your prices?

Every business is different, so we quote for the work you actually need. After your free consultation we send you a quote, and we only start once you have agreed it.

**Q:** What happens in the free consultation?

We talk about your business or situation, how you keep records now and what you need help with. You can ask as many questions as you like. If we can help, we explain how and follow up with a quote.

**Q:** Do I need to prepare anything for the consultation?

Nothing formal. It helps to know which accounting software you use, if any, and to have a rough idea of your income and any deadlines on your mind. Please don’t send documents before we have agreed how to share them.

**[H2]** Working together

**Q:** Can you work with me if I’m not in London?

Yes. We work remotely with clients anywhere in the UK. Consultations are by phone or video, and you can message us on WhatsApp.

**Q:** How do we keep in touch?

Consultations are by phone or video, and you can message us on WhatsApp. We agree the best way to stay in touch when we start working together.

**Q:** How quickly will you reply?

We aim to reply to new enquiries within one working day.

**Q:** Can you take over from my current accountant?

Yes. With your permission, we contact your current accountant for the records and information we need, so the handover is as smooth as possible.

**[H2]** Services

**Q:** Which accounting software do you use?

We work with Xero, QuickBooks, Sage and FreeAgent. If you already use one of these, let us know which when you get in touch.

If you are not using any software yet, we can talk through which might suit your business during your consultation.

**Q:** Can you help with something that isn’t on your services page?

Our services page lists what we offer. If you need something else, ask anyway: we will tell you plainly whether we can help.

**Q:** Can you help if I’m not VAT registered?

Yes. Bookkeeping, annual accounts, payroll and our other services do not depend on VAT registration. If you are thinking about registering, we can talk that through too.

**[H2]** Documents and data

**Q:** How do I send you my documents?

Once we start working together, we send you a secure way to share your documents.

Please don’t send bank statements, ID or other sensitive documents by email or WhatsApp.

**Q:** Will you need access to my accounting software?

Usually, yes. Most packages let you invite your accountant as a separate user, so you stay in control and can remove access at any time. We never need your own login details.

**Q:** How do you look after my information?

We only ask for the information we need, and we agree a secure way to share documents rather than using email or WhatsApp. Our privacy policy explains what we collect and why.

#### Part 5: Ready to talk it through?

**[H2]** Ready to talk it through?

Book a free initial consultation by phone or video. We’ll listen, answer your questions and send you a quote before any work starts.

[Link] Book a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- For clients anywhere in the UK

### Page: `/send-documents`

- **Browser title:** Sending Us Documents | Halim Accountants
- **Search description:** How clients send documents to Halim Accountants securely, and why we never ask for them by email or WhatsApp.
- **Search engines:** hidden from search (noindex)

#### Part 1: Sending us your documents

- Home
- Sending documents

For clients

**[H1]** Sending us your documents

When we work together, we will need records such as bank statements, receipts and invoices. Here is how to share them safely.

#### Part 2: We’ll send you a secure upload link

**[H2]** We’ll send you a secure upload link

We’ll send you a secure upload link after your consultation. There is nothing to send before then.

**[H2]** How it works
- We tell you exactly which documents we need.
- We send you a secure upload link.
- We let you know when we have everything, or if anything is missing.

**[H2]** Please don’t send documents by email or WhatsApp

Email and messaging apps are not the right place for bank statements, identity documents, payslips or tax letters. If you are not sure how to send something, ask us first.

Questions about what to send? Message us on WhatsApp, without attaching any documents.

[Link] Ask a question on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%20have%20a%20question%20about%20sending%20documents.`

### Page: `/privacy-policy`

- **Browser title:** Privacy Policy | Halim Accountants
- **Search description:** How Halim Accountants collects, uses and protects the personal information you share through this website.
- **Search engines:** hidden from search (noindex)

#### Part 1: Privacy policy

- Home
- Privacy policy

Legal

**[H1]** Privacy policy

This policy explains what personal information Halim Accountants collects through this website, why, and the choices you have.

Draft — to be replaced with the client’s approved policy before launch.

#### Part 2: 01 Who we are

On this page
- 01 Who we are
- 02 Information we collect
- 03 How we use your information
- 04 Our lawful basis
- 05 Who we share it with
- 06 How long we keep it
- 07 Your rights
- 08 Cookies
- 09 Changes to this policy

**[H2]** Who we are

This website is run by Halim Enterprises Limited, trading as Halim Accountants. We are the data controller for the personal information described in this policy.

Registered in England and Wales, company number 17491527. Registered office: Flat 41, Shaftesbury Point, High Street, London, E13 0AB.

**[H2]** Information we collect

We only collect information you choose to give us, plus the basic technical information any website needs to work.

When you send an enquiry, we ask for:
- your name and email address
- your phone number, if you choose to give it
- your business name and type of business, if relevant
- an approximate turnover band, if you choose to give it
- the service you are interested in, and your message

When you request a callback, we ask for your name, phone number, a preferred time and, optionally, what you would like to discuss.

If you message us on WhatsApp, we receive your phone number, your WhatsApp profile name and the messages you send.

Our hosting provider keeps standard server logs, such as IP addresses, browser type and the pages requested, to keep the website running securely.

Please do not send us sensitive documents, bank details or identity documents through the website or WhatsApp.

**[H2]** How we use your information
- to reply to your enquiry or call you back
- to arrange and hold your free consultation
- to prepare a quote if you ask for one
- to keep the website secure and working properly

We do not use your information for marketing unless you ask us to, and we never sell it.

**[H2]** Our lawful basis

We use your information because you have asked us to respond to you or to take steps before entering into a contract with you, and because we have a legitimate interest in replying to enquiries and keeping our website secure.

**[H2]** Who we share it with

We only share your information with providers who help us run the website and our business, and only as far as they need it:
- our website and email hosting provider, which stores the website and delivers enquiry emails to our business mailbox
- WhatsApp (part of Meta), if you choose to contact us there. WhatsApp’s own privacy policy applies to messages sent through it

We may also share information where the law requires us to.

**[H2]** How long we keep it

We keep enquiry and callback details for as long as we need them to respond to you. If you become a client, we keep your information for as long as the law requires for our records. We delete information we no longer need.

**[H2]** Your rights

Under UK data protection law you have the right to:
- ask for a copy of the information we hold about you
- ask us to correct information that is wrong
- ask us to delete your information
- object to, or ask us to restrict, how we use it
- ask for your information in a portable format

You can contact us using the options on our contact page .

If you are unhappy with how we have handled your information, you can complain to the Information Commissioner’s Office at ico.org.uk . We would appreciate the chance to put things right first.

**[H2]** Cookies

This website does not use analytics or tracking cookies. Our cookie policy explains more.

**[H2]** Changes to this policy

We may update this policy from time to time. The current version is always on this page.

### Page: `/cookie-policy`

- **Browser title:** Cookie Policy | Halim Accountants
- **Search description:** Which cookies the Halim Accountants website uses: none for analytics or tracking.
- **Search engines:** hidden from search (noindex)

#### Part 1: Cookie policy

- Home
- Cookie policy

Legal

**[H1]** Cookie policy

Cookies are small files a website can store on your device. This page explains how this website uses them.

Draft — to be replaced with the client’s approved policy before launch.

#### Part 2: 01 Cookies on this website

On this page
- 01 Cookies on this website
- 02 Other websites
- 03 If this changes
- 04 Managing cookies

**[H2]** Cookies on this website

This website does not set any cookies. We do not use analytics, advertising or tracking tools, so we do not need to ask for your consent.

**[H2]** Other websites

Some links take you to other services, such as WhatsApp. Once you leave this website, that service’s own cookie and privacy policies apply.

**[H2]** If this changes

If we add a feature that uses cookies, such as an online booking calendar, we will update this policy first and ask for your consent wherever the law requires it.

**[H2]** Managing cookies

You can block or delete cookies in your browser settings. This website works fully without them.

### Page: `/complaints`

- **Browser title:** Complaints Procedure | Halim Accountants
- **Search description:** How to raise a concern with Halim Accountants, and how we will handle it.
- **Search engines:** hidden from search (noindex)

#### Part 1: Complaints procedure

- Home
- Complaints procedure

Legal

**[H1]** Complaints procedure

We want to get things right. If you are unhappy with any part of our service, please tell us so we can put it right.

Draft — to be replaced with the client’s approved policy before launch.

#### Part 2: 01 How to raise a complaint

On this page
- 01 How to raise a complaint
- 02 What happens next
- 03 If you are not satisfied

**[H2]** How to raise a complaint

Please tell us what went wrong and what you would like us to do about it. Include any dates, names or documents that will help us understand.

You can contact us using the options on our contact page .

**[H2]** What happens next
- We acknowledge your complaint promptly.
- We look into it carefully and fairly, and may ask you for more information.
- We give you a full written response explaining what we found and what we will do.

**[H2]** If you are not satisfied

If you are unhappy with our response, tell us and we will review the complaint again.

If your complaint is about how we have handled your personal information, you can also contact the Information Commissioner’s Office at ico.org.uk .

### Page: `/terms`

- **Browser title:** Website Terms of Use | Halim Accountants
- **Search description:** The terms that apply when you use the Halim Accountants website.
- **Search engines:** hidden from search (noindex)

#### Part 1: Terms of use

- Home
- Terms of use

Legal

**[H1]** Terms of use

These terms apply when you use this website. They do not cover the services we provide to clients, which are agreed separately in writing.

Draft — to be replaced with the client’s approved policy before launch.

#### Part 2: 01 About us

On this page
- 01 About us
- 02 Information, not advice
- 03 Using this website
- 04 Intellectual property
- 05 Links to other websites
- 06 Our liability
- 07 Governing law
- 08 Changes to these terms

**[H2]** About us

This website is run by Halim Enterprises Limited, trading as Halim Accountants. Registered in England and Wales, company number 17491527. Registered office: Flat 41, Shaftesbury Point, High Street, London, E13 0AB.

**[H2]** Information, not advice

The content on this website is general information only. It is not financial, tax or legal advice for your situation, and you should not rely on it as such. Tax rules change and depend on individual circumstances, so please talk to us before acting on anything you read here.

**[H2]** Using this website

You may use this website for your own information. Please do not misuse it, for example by trying to gain unauthorised access, introducing harmful code or copying content in bulk.

We try to keep the website available and accurate but cannot promise that it will always be available, error-free or up to date.

**[H2]** Intellectual property

The content and design of this website belong to Halim Enterprises Limited unless stated otherwise. You may not reuse them without our permission.

**[H2]** Links to other websites

Links to other websites, such as WhatsApp or HMRC, are provided for convenience. We are not responsible for their content or how they handle your information.

**[H2]** Our liability

We are not liable for any loss arising from your use of this website or from relying on its content, except where the law does not allow us to exclude liability.

**[H2]** Governing law

These terms are governed by the law of England and Wales, and its courts have jurisdiction over any dispute.

**[H2]** Changes to these terms

We may update these terms from time to time. The current version is always on this page.

### Page: page not found (any unknown address)

- **Browser title:** Page not found | Halim Accountants
- **Status:** 404

Error 404

**[H1]** We can’t find that page

The page may have moved, or the address may be mistyped. These are good places to pick up from.

[Link] Explore our services → `/services`

[Link] Contact us → `/contact`

[Link] Back to the homepage → `/`

## 4. Text that only appears in certain situations

This wording exists in the site but is not on screen when a page first loads, so the page capture above cannot show it.

### 4.1 Form messages

**Shared across both forms** (`forms.ts`):

- Field markers: "(required)", "(optional)"
- While sending: "Sending…"
- Error summary heading: "There is a problem"
- Privacy line: "We only use these details to respond to you. Read our privacy policy to see how we handle your information."
- Consent tick box: "I’ve read the privacy policy"
- Buttons: "Try again", "Message us on WhatsApp"
- Drop-down prompt: "Choose an option"
- Hidden anti-spam field (never seen by people): "Leave this field empty"

**Enquiry form (`/contact`)**

- Choices for "Which best describes you?": Sole trader, Limited company, Startup, eCommerce seller, Hospitality or restaurant, Individual, Other
- Choices for "Approximate annual turnover": Under £50k, £50k–£90k, £90k–£250k, £250k–£1m, Over £1m, Prefer not to say
- "What do you need help with?" lists the seven confirmed services plus "Not sure yet"
- Send button: "Send enquiry"
- Success: "Thanks, we’ve got your enquiry". "We aim to reply within one working day. We’ve also sent a confirmation to your email address." "If anything is urgent, you can message us on WhatsApp in the meantime."

**Callback form (`/contact` and `/book-consultation`)**

- Choices for "When is best to call?": Morning, Afternoon, Any time
- Send button: "Request a callback"
- Success: "Thanks, we’ll call you back". "We aim to get back to you within one working day, at the time you chose where we can." "If anything changes, you can message us on WhatsApp."

**Error messages when a field is wrong** (`validation.ts`):

- "Enter your name" / "Your name must be … characters or fewer"
- "Enter your email address" / "Enter an email address in the correct format, like name@example.co.uk" / "Your email address must be 254 characters or fewer"
- "Enter your phone number" / "Enter a phone number, like 07700 900123 or +44 7700 900123"
- "Choose the option that best describes you"
- "Choose a turnover band, or leave it blank"
- "Choose the service you need, or ‘Not sure yet’"
- "Tell us how we can help" / "Tell us a little more: at least 20 characters" / "Your message must be 2,000 characters or fewer"
- "Choose a preferred time"
- "Confirm that you have read the privacy policy"

**Messages from the server after sending:**

- "Thanks, your message has been sent."
- "Some details need checking. Please review the form and try again."
- "You’ve sent several messages in a short time. Please wait a few minutes and try again, or message us on WhatsApp."
- "Our online form isn’t available at the moment. Please message us on WhatsApp, or try again later." (This is what visitors see today on the live site, because the business mailbox does not exist yet; see section 5.)
- "Something went wrong and your message wasn’t sent. Please try again, or message us on WhatsApp."

### 4.2 Emails sent by the forms (`emails.ts`)

None of these has been sent for real yet (no mailbox).

- **To the business, for an enquiry.** Subject "New website enquiry from {name}". Heading "New enquiry from the website". Intro "Reply to this email to answer them directly."
- **To the business, for a callback.** Subject "Callback request from {name}". Heading "New callback request from the website". Intro "They would like a call back on the number below."
- **Field labels in those emails:** Name, Email, Phone, Business name, Type of business, Annual turnover, Service needed, Message, Preferred time, Topic. Empty fields show "Not provided".
- **To the visitor, after an enquiry.** Subject "Thanks for getting in touch with Halim Accountants". Body:
  - "Hello {first name},"
  - "Thanks for getting in touch. We aim to reply within one working day."
  - "Please don’t send bank statements, ID or other sensitive documents by email. If we need anything like that, we’ll agree a secure way to share it."
  - Signed "Halim Accountants".
- **Footer of every email:** the company details line (trading name, company number, registered office) and the website address, as UK law requires on business correspondence.

### 4.3 WhatsApp messages typed in for the visitor (`pages.ts`)

When someone taps a WhatsApp link, WhatsApp opens with one of these messages ready to send. The visitor can edit it first.

- General: "Hello, I’d like to ask about your accounting services."
- From a consultation link: "Hello, I’d like to book a free consultation."
- From the send-documents page: "Hello, I have a question about sending documents."
- From a service or audience page: "Hello, I’d like to ask about {service name}."

### 4.4 Wording written but switched off

This wording is ready in the code but hidden until the client supplies what it needs (see section 5).

- **Online booking** (`/book-consultation`, needs a booking link):
  - "Choose a time"
  - "Pick a time that suits you for your free consultation by phone or video."
  - "Booking is handled by {provider} and opens in a new tab."
  - "Or see available times on this page."
  - "Show available times here"
  - A note that the calendar provider may set its own cookies once it loads, plus extra sections in the cookie and privacy policies.
- **Secure document portal** (`/send-documents`, needs a portal):
  - "Upload to our secure portal"
  - "Send us documents through {name}, so they go straight to a secure portal instead of sitting in an inbox."
  - "Open {name}"
  - Steps: "We tell you exactly which documents we need." / "You upload them through {name}." / "We let you know when we have everything, or if anything is missing."
- **Reviews** (needs genuine Google reviews with permission):
  - "Reviews"
  - "What clients say"
  - "Reviews from our Google Business Profile, shared with the reviewers’ permission."
  - "Read our reviews on Google"
  - "Google review"
  - "Rated {rating} out of 5" (only the reviewer's own rating, never an average)
- **Hero image credit:** "Designed by Magnific". Only for a photo whose licence requires a credit. The current Pexels photo does not need one.
- **Three pending services, with titles and short descriptions only.** They appear nowhere on the site until the client confirms them:
  - Self Assessment tax returns ("Personal tax returns, prepared and filed")
  - Corporation Tax ("Company tax returns prepared and filed")
  - Making Tax Digital ("Digital records and quarterly updates")

## 5. What is missing, and why

| Missing | Why | What the site does meanwhile | Needed from |
|---|---|---|---|
| Business email address | No mailbox has been set up on the domain yet | No email shown anywhere: the email card on /contact and the email lines in the privacy and complaints pages are hidden. The forms show the "isn't available" message in production | Client: create the Hostinger mailbox; developer: add the settings |
| Phone number for calls | Unconfirmed whether the WhatsApp number also takes calls | Only WhatsApp is shown. Wording says "message us", never "call us" | Client |
| Response-time promise | Not confirmed (same day or 24 hours) | "Within one working day", used only in form success messages and emails; marked provisional | Client |
| ICO registration number | The client is registering before launch | The ICO sentence is hidden in the privacy policy | Client |
| Anti-money-laundering (AML) supervisor and number | Unconfirmed | Not mentioned anywhere | Client |
| Professional body membership and qualifications (e.g. ACCA) | Unconfirmed, and claiming them falsely is a legal risk | Nothing about qualifications, memberships or experience appears | Client, with proof |
| Director's photo, biography, qualifications, LinkedIn, own words | Not supplied | Homepage: a "Practice at a glance" panel of verified company facts. /about: a factual line ("Saad Haleem is the director of Halim Enterprises Limited, the company behind Halim Accountants.") and a monogram tile | Client |
| Online booking | No booking tool chosen (Calendly recommended) | /book-consultation offers a callback form and WhatsApp instead | Client: choose a tool and send the link |
| Consultation length | Not confirmed | No duration is stated anywhere | Client |
| Secure document upload | No portal chosen. A custom upload system is ruled out (security risk, and no database or file storage is allowed) | /send-documents says "We’ll send you a secure upload link after your consultation" | Client: choose a portal |
| Reviews and Google Business Profile link | No reviews yet; profile link not supplied | No reviews section. Nothing hints at reviews | Client: genuine reviews with permission |
| Self Assessment, Corporation Tax, Making Tax Digital | Client has not confirmed these services | Not on any page, menu or form | Client |
| Client's own policies (privacy, cookies, complaints, terms, client care) | Client says they exist; not received | The four legal pages are draft templates with a "Draft" banner, hidden from search engines | Client |
| Complaints timescales | Not supplied | The complaints page says "promptly" with no timescale | Client |
| Logo and brand colours | Not supplied | A provisional typographic wordmark ("Halim / ACCOUNTANTS") and the provisional navy, paper and teal palette | Client |
| Final trading name and domain | Provisional; domain not yet bought | "Halim Accountants" and halimaccountants.co.uk are used, marked provisional | Client |
| Official software logos (Xero, QuickBooks, Sage and others) | Each vendor restricts logo use to partners or written licences; the client is not a confirmed partner | Names shown as plain text, with a trademark line | Client, only via partner programmes or written permission |
| Official WhatsApp logo | Meta's brand pack needs its terms accepted, which the developer did not do on the client's behalf | A generic chat icon with the word "WhatsApp" | Client or developer: download the pack and accept the terms |
| Search-engine extras (sitemap, robots file, social sharing previews, business data for Google) | Not built yet (planned developer work) | Pages work, but search engines and social sites get less information | Developer |
| Real photo of the business | None supplied | Hero uses a licensed stock photo of an empty meeting room. It must never be captioned "our office" (the firm works remotely) | Client |

## 6. Deliberately never on the site

These are not gaps. CLAUDE.md rules them out for legal or honesty reasons, or the business model makes them irrelevant.

- **Prices or fees:** quotes are given on enquiry only.
- **Testimonials, star ratings, client numbers, success rates, savings figures, years of experience, awards:** the practice is new, and inventing any of these would be unlawful.
- **"Chartered", "Certified", "regulated by", "HMRC approved", "qualified accountant", or any professional-body name or badge:** the firm's status is unconfirmed.
- **Guarantees** (for example "never miss a deadline" or "we'll save you money").
- **"Partner", "certified" or "advisor" next to software names.**
- **The registered office as a place to visit:** it appears only in the footer and legal pages, labelled "Registered office".
- **Town or city pages:** the firm works remotely across the UK.
- **A VAT number:** the company is not VAT registered.
- **"We file for you" for Companies House:** filing for others may need registration as an Authorised Corporate Service Provider, which is unconfirmed. The wording says "we help you prepare" and "ready to file" instead.
- **Cookie banner:** none needed, because the site sets no cookies and loads no trackers.

## 7. Wording that especially needs the client's approval

All wording above is draft, but these points state how the client works and must be checked before launch. The full checklist is in `docs/OPEN-ITEMS.md`.

- **Homepage hero:** headline "Clear accounts. Confident decisions.", the lead, and "For clients anywhere in the UK".
- **"A new practice, set up in 2026":** on the homepage and /about. Confirm the client is happy to say so.
- **"One person to speak to" / "your point of contact":** confirm the director is each client's contact.
- **"Nothing sent until you approve it" (VAT) and "Transactions recorded and reconciled against your bank" (bookkeeping):** confirm this is how the work is done.
- **"Get a clear quote":** the brief said "fixed quote". Confirm whether fees are fixed before saying so.
- **Each service's "How it works" steps,** such as monthly or quarterly bookkeeping, and payroll including statutory pay and P60s.
- **Submitting VAT returns and payroll (RTI) submissions to HMRC:** assumes the client can act as an HMRC agent. Confirm, or reword to "we prepare it and you submit it".
- **Dates and figures marked for checking:**
  - nine months to file annual accounts;
  - 60 days to report and pay Capital Gains Tax on UK residential property;
  - Companies House identity verification.
- **Software mentions:** some service and audience pages still name only Xero, QuickBooks and Sage. That's still true but incomplete, now that FreeAgent, Dext and Hubdoc are confirmed.
- **The trademark line** under the software strip.
- **The FAQs about switching accountants and software access.**
- **The "Practice at a glance" panel:** its facts are verified, but confirm the client is happy to show them.
- **All emails, form messages and WhatsApp messages** in section 4.
