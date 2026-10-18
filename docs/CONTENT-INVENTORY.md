# Halim Enterprises Limited website: content inventory

Every piece of text on the website, page by page and section by section, plus the text that only appears in certain situations (form messages, emails, features that are switched off), and a list of what is missing and why.

**Status of all wording: DRAFT** (revised 18 October 2026: public name changed to Halim Enterprises Limited and all copy rewritten; see `docs/CONTENT-SEO-AUDIT.md`). The developer drafted all copy, as CLAUDE.md sets out ("Developer drafts, client reviews and approves"). None of it has been approved by the client yet. Business facts (company name and number, director, WhatsApp number, services, software) come from `src/content/site.ts` and are verified against Companies House and the client's answers.

## 1. How this was produced and how to read it

- **Extracted, not retyped.** Sections 2 and 3 were captured automatically from the production build running locally on 18 October 2026, after the revision, by visiting every page linked from the homepage at desktop width (1440 px). Every FAQ answer and every "Who we help" tab was opened first, so hidden-until-clicked text is included. So the wording below is exactly what a visitor sees.
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

[Link] Halim Enterprises Limited wordmark → `/`

[Menu] Services

[Link] Bookkeeping — Records kept up to date in your accounting software → `/services/bookkeeping`

[Link] VAT returns — Prepared and submitted through MTD-compatible software → `/services/vat-returns`

[Link] Annual accounts — Year-end accounts prepared from your records → `/services/annual-accounts`

[Link] Payroll — Pay calculations, payslips and RTI submissions → `/services/payroll`

[Link] Company formation — Help setting up a limited company → `/services/company-formation`

[Link] Business plans and forecasts — Cash-flow forecasts and business plans → `/services/business-plans-and-forecasts`

[Link] Capital Gains Tax — Gains calculated and reporting explained → `/services/capital-gains-tax`

[Link] All services → `/services`

[Menu] Who we help

[Link] Sole traders — Bookkeeping and VAT for the self-employed → `/who-we-help/sole-traders`

[Link] Startups — Company set-up, records and forecasts → `/who-we-help/startups`

[Link] eCommerce sellers — Platform payouts, fees and VAT recorded properly → `/who-we-help/ecommerce-sellers`

[Link] Hospitality and restaurants — Takings, supplier bills, payroll and VAT → `/who-we-help/hospitality`

[Link] Individuals — Capital Gains Tax on property and investments → `/who-we-help/individuals`

[Link] Everyone we help → `/who-we-help`

[Link] About → `/about`

[Link] Contact → `/contact`

[Button] Request a free consultation → `/book-consultation`

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
- Free consultation
- FAQs

**[H2]** Legal
- Privacy policy
- Cookie policy
- Complaints
- Terms of use

Halim Enterprises Limited is registered in England and Wales, company number 17491527. Registered office: Flat 41, Shaftesbury Point, High Street, London, E13 0AB.

© 2026 Halim Enterprises Limited

## 3. Page by page

23 pages and the "page not found" page, in site order. The header and footer above appear on each one and are not repeated.

### Page: `/`

- **Browser title:** Bookkeeping, VAT and Accounting Services | Halim Enterprises Limited
- **Search description:** Halim Enterprises Limited provides bookkeeping, VAT returns, payroll and year-end accounts for UK small businesses and individuals, remotely across the UK. Free initial consultation.

#### Section 2: Bookkeeping, VAT and accounting for UK small businesses

Accountancy services · Remote across the UK

**[H1]** Bookkeeping, VAT and accounting for UK small businesses

Halim Enterprises Limited keeps your books up to date, prepares your VAT returns and handles payroll and year-end accounts for small businesses and individuals across the UK.

[Link] Request a free consultation → `/book-consultation`

[Link] View our services → `/services`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

#### Section 3: Software we work with

Software

**[H2]** Software we work with

Not using accounting software yet? We can recommend a package during your consultation.
- Xero
- QuickBooks
- Sage
- FreeAgent
- Dext
- Hubdoc

Xero is a trademark of Xero Limited. QuickBooks is a registered trademark of Intuit Inc. Sage is a trademark of The Sage Group plc. FreeAgent, Dext and Hubdoc are trademarks of their respective owners. Halim Enterprises Limited is independent: we are not affiliated with, endorsed by or approved by these companies.

#### Section 4: Accounting services for small businesses

Services

**[H2]** Accounting services for small businesses

Bookkeeping and VAT returns are at the centre of what we do. Payroll, year-end accounts, company formation, forecasting and Capital Gains Tax are available as you need them.

**[H3]** Bookkeeping

Records kept up to date, monthly or quarterly

We record your sales and expenses, reconcile your bank accounts and keep your books ready for VAT returns and year-end accounts.
- Bank and card accounts reconciled
- Kept in Xero, QuickBooks, Sage or FreeAgent
- Missing receipts and open queries listed for you

[Link] Bookkeeping services → `/services/bookkeeping`

**[H3]** VAT returns

VAT returns prepared and submitted under Making Tax Digital

We prepare each return from your records, show you the figures and the transactions behind them, and submit it once you have approved it.
- Prepared from your bookkeeping records
- Figures reviewed with you before submission
- Submitted through MTD-compatible software

[Link] VAT return services → `/services/vat-returns`

**[H3]** Other services
- Annual accounts Year-end accounts prepared from your records
- Payroll Pay calculations, payslips and RTI submissions
- Company formation Help setting up a limited company
- Business plans and forecasts Cash-flow forecasts and business plans
- Capital Gains Tax Gains calculated and reporting explained
- View all services

#### Section 5: Who we work with

Who we help

**[H2]** Who we work with

Choose the description closest to your situation to see the services that usually apply.

[Link] All client types → `/who-we-help`

[Button] Sole traders

[Button] Startups

[Button] eCommerce sellers

[Button] Hospitality and restaurants

[Button] Individuals

Receipts and bank statements to record, and a VAT threshold to keep an eye on.

As a sole trader you are responsible for every part of the business, including its records. We take on the bookkeeping and VAT returns, so that work no longer falls to your evenings and weekends.

**[H3]** Services that usually apply
- Bookkeeping Your income and expenses kept up to date in Xero, QuickBooks, Sage or FreeAgent.
- VAT returns If you are VAT registered, returns prepared and submitted through MTD-compatible software.
- Annual accounts Year-end figures showing the profit the business made.
- Company formation If you are thinking of becoming a limited company, help setting it up.

[Link] Request a free consultation → `/book-consultation`

[Link] More for sole traders → `/who-we-help/sole-traders`

A new business to register, records to start and cash to plan before income is steady.

A new business has registrations to make, records to start and cash to plan before income is steady. We help you set up the company, the bookkeeping and a forecast from the outset.

**[H3]** Services that usually apply
- Company formation Help setting up a limited company with the right details from the start.
- Bookkeeping A bookkeeping system from the first transaction, so records do not build up.
- Business plans and forecasts A plan and cash-flow forecast you can present to a lender or an investor.
- Payroll When you take on your first employee, payroll set up and run for you.

[Link] Request a free consultation → `/book-consultation`

[Link] More for startups → `/who-we-help/startups`

Payouts from several platforms, with fees and refunds already deducted.

Marketplace and payment-provider payouts combine sales, fees and refunds in a single figure. We break each payout down so your records and VAT returns reflect what you actually sold.

**[H3]** Services that usually apply
- Bookkeeping Each payout split into sales, fees and refunds, so your records show actual sales and costs.
- VAT returns VAT returns built from those broken-down figures and submitted through MTD software.
- Annual accounts Year-end accounts that reflect stock and cost of sales properly.
- Business plans and forecasts Forecasts for stock buying and seasonal peaks.

[Link] Request a free consultation → `/book-consultation`

[Link] More for eCommerce sellers → `/who-we-help/ecommerce-sellers`

Daily takings, weekly supplier invoices and staff on changing hours.

Hospitality businesses deal with takings from several sources, frequent supplier invoices and staff on changing hours. We keep the bookkeeping, payroll and VAT up to date, so they are not left until a deadline.

**[H3]** Services that usually apply
- Bookkeeping Takings and supplier bills recorded and reconciled, week in, week out.
- Payroll Pay worked out for staff on variable hours, with payslips and RTI submissions.
- VAT returns Returns prepared with the VAT treatment of your sales checked.
- Business plans and forecasts Cash-flow forecasts for a new site, a refit or the quiet months.

[Link] Request a free consultation → `/book-consultation`

[Link] More for hospitality and restaurants → `/who-we-help/hospitality`

A property or share sale, and a question about Capital Gains Tax.

If you have sold, or plan to sell, a second property, a buy-to-let or investments, we can work out whether Capital Gains Tax is due and explain how and when to report it.

**[H3]** Services that usually apply
- Capital Gains Tax The gain and any tax due calculated, with the working for each figure.

[Link] Request a free consultation → `/book-consultation`

[Link] More for individuals → `/who-we-help/individuals`

#### Section 6: How we start working together

How it works

**[H2]** How we start working together

The first conversation is free. You receive a quote before any work begins.

[Link] Request a free consultation → `/book-consultation`

**[H3]** Free consultation

We discuss your business, how your records are kept and what you need, by phone or video.

**[H3]** Your quote

We send you a quote setting out the work involved and the cost. Nothing starts until you accept it.

**[H3]** Set-up and regular work

We arrange access to your records, agree a schedule and tell you what we need from you, and by when.

#### Section 7: What to expect

Working with us

**[H2]** What to expect

A small company working remotely, with the same person handling your work from the first conversation onwards.

**[H3]** Remote, anywhere in the UK

Consultations take place by phone or video, and you can message us on WhatsApp. There is no office to travel to.

Phone

Video

WhatsApp

Anywhere in the UK

**[H3]** Figures you can follow

Before you approve a VAT return or a set of accounts, we show you the figures and the records behind them.

Before you approve a VAT return
- The VAT due or reclaimable
- The sales and purchases behind it
- Anything that needs your attention

**[H3]** One point of contact

You deal with the same person throughout, who knows your records and your deadlines.

Saad Haleem

Director

**[H3]** A quote before work starts

You see the scope and the cost in advance. We start once you have accepted the quote.
- Quote sent
- You accept
- Work begins

#### Section 8: A UK accountancy company led by Saad Haleem

About us

**[H2]** A UK accountancy company led by Saad Haleem

Halim Enterprises Limited was incorporated in England and Wales in September 2026 to provide bookkeeping, VAT and accounting services to small businesses and individuals.

Clients deal directly with the director. Whether you are starting a business or moving from another accountant, the first step is a free consultation about your records and what you need.

[Link] About the company → `/about`

Company at a glance
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

#### Section 9: Frequently asked questions

Questions

**[H2]** Frequently asked questions

Answers to common questions about consultations, fees and how we work.

[Link] All FAQs → `/faqs`

Question not covered? Ask us on WhatsApp

**Q:** Is the first consultation really free?

Yes. The initial consultation is free and takes place by phone or video. We use it to understand your situation and the services you need.

If you would like us to act for you afterwards, we send you a quote. There is nothing to pay unless you accept it.

**Q:** Can you work with me if I’m not in London?

Yes. We work remotely with clients anywhere in the UK. Consultations are by phone or video, and you can message us on WhatsApp.

**Q:** Which accounting software do you use?

We work with Xero, QuickBooks, Sage and FreeAgent, and with Dext or Hubdoc for capturing receipts. If you already use one of these, tell us which when you get in touch.

If you do not use accounting software yet, we can recommend a package during your consultation.

**Q:** How do I send you my documents?

Once we start working together, we send you a secure way to share your documents.

Please don’t send bank statements, ID or other sensitive documents by email or WhatsApp.

**Q:** Why don’t you list your prices?

The work varies from one business to the next, so we quote for what you actually need. After your free consultation we send you a quote, and we only start once you have accepted it.

#### Section 10: Arrange your free consultation

**[H2]** Arrange your free consultation

Tell us about your business and what you need. We will arrange a call or video meeting and, if we can help, send you a quote.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services`

- **Browser title:** Accounting Services for UK Small Businesses | Halim Enterprises Limited
- **Search description:** Bookkeeping, VAT returns, annual accounts, payroll, company formation, business plans and Capital Gains Tax, provided remotely across the UK.

#### Part 1: Accounting services

- Home
- Services

Services

**[H1]** Accounting services

Bookkeeping and VAT returns for UK small businesses, with payroll, year-end accounts, company formation, forecasting and Capital Gains Tax available as you need them.

[Link] Request a free consultation → `/book-consultation`

#### Part 2: Core services

**[H2]** Core services

**[H3]** Bookkeeping

Records kept up to date, monthly or quarterly

We record your sales and expenses, reconcile your bank accounts and keep your books ready for VAT returns and year-end accounts.
- Bank and card accounts reconciled
- Kept in Xero, QuickBooks, Sage or FreeAgent
- Missing receipts and open queries listed for you

[Link] Bookkeeping services → `/services/bookkeeping`

**[H3]** VAT returns

VAT returns prepared and submitted under Making Tax Digital

We prepare each return from your records, show you the figures and the transactions behind them, and submit it once you have approved it.
- Prepared from your bookkeeping records
- Figures reviewed with you before submission
- Submitted through MTD-compatible software

[Link] VAT return services → `/services/vat-returns`

**[H2]** Further services
- Annual accounts Year-end accounts, and statutory accounts for limited companies, prepared from your records and reviewed with you before approval.
- Payroll Payroll run each pay period, with payslips, RTI submissions to HMRC and the figures your pension provider needs.
- Company formation Help preparing a limited company application for Companies House, and with the registrations and records that follow.
- Business plans and forecasts Business plans and month-by-month cash-flow forecasts, built on assumptions agreed with you, for a lender, an investor or your own planning.
- Capital Gains Tax Help calculating Capital Gains Tax and reporting gains when you sell property, shares or other assets.

#### Part 3: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services/bookkeeping`

- **Browser title:** Bookkeeping Services for Small Businesses | Halim Enterprises Limited
- **Search description:** Bookkeeping for UK sole traders and small businesses: transactions recorded and bank accounts reconciled in Xero, QuickBooks, Sage or FreeAgent.

#### Part 2: Bookkeeping

- Home
- Services
- Bookkeeping

Services

**[H1]** Bookkeeping

We record your income and expenses, reconcile your bank accounts and keep your books up to date through the year, so your records are ready when a VAT return or year-end falls due.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Who this service is for

**[H2]** Who this service is for

Sole traders and small businesses who want their bookkeeping done regularly by someone else, rather than in the evenings or the week before a deadline.

We can take over records already kept in accounting software, or bring together receipts, spreadsheets and bank statements and set up a system first.

**[H2]** What the service covers
- Recording sales, purchases and expenses in your accounting software
- Reconciling business bank and credit card accounts
- Tracking money owed to you and bills you owe
- Matching receipts and invoices to transactions, including those captured with Dext or Hubdoc
- Listing missing receipts and unexplained transactions for you to resolve
- A periodic summary of income, expenses and outstanding items
- Records kept ready for VAT returns and year-end accounts

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=bookkeeping#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Bookkeeping.`

**[H2]** How it works

**[H3]** Free consultation

We look at how your records are kept now, how many transactions you have and how often you want them updated.

**[H3]** Set-up or catch-up

We set up your accounting software, or bring existing records up to date, before regular work begins.

**[H3]** Regular bookkeeping

We update your books on the agreed schedule, usually monthly or quarterly.

**[H3]** Summary and queries

After each update we send a short summary and a list of anything we need from you.

**[H2]** Information we need from you
- Access to your accounting software, or the name of the one you would like to use
- Business bank and credit card statements, or a bank feed connection
- Sales invoices, plus receipts for purchases and expenses
- Details of any loans, finance or hire purchase agreements
- A note of anything unusual, such as a large one-off payment

**[H2]** Common questions

**Q:** How often will you update my books?

Monthly or quarterly are the usual choices. We suggest a schedule in your consultation, based on the number of transactions and whether you are VAT registered.

**Q:** My records are behind. Can you help me catch up?

Yes. We can bring your records up to date before regular bookkeeping starts. We assess what is outstanding during your consultation and include the catch-up work in your quote.

**Q:** Do I need to use accounting software?

We work with Xero, QuickBooks, Sage and FreeAgent. If you are VAT registered, Making Tax Digital rules already require your VAT records to be kept digitally.

If you do not use accounting software yet, we can recommend a package during your consultation.

**Q:** Will I still be able to see my figures?

Yes. Your records are kept in accounting software you can log in to at any time, so you can see your figures without waiting for us.

**[H2]** Related services
- VAT returns Prepared and submitted through MTD-compatible software
- Annual accounts Year-end accounts prepared from your records
- Payroll Pay calculations, payslips and RTI submissions

**[H2]** Who this service suits
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services/vat-returns`

- **Browser title:** VAT Return Services for UK Businesses | Halim Enterprises Limited
- **Search description:** VAT returns prepared from your records, reviewed with you before submission and filed through Making Tax Digital-compatible software. Remote, UK-wide.

#### Part 2: VAT returns

- Home
- Services
- VAT returns

Services

**[H1]** VAT returns

We prepare each VAT return from your bookkeeping records, go through the figures with you and submit the return through Making Tax Digital-compatible software once you have approved it.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Who this service is for

**[H2]** Who this service is for

VAT-registered businesses that want each return prepared from reconciled records and checked before it is submitted.

Businesses approaching the registration threshold, or newly registered, that need to understand what changes once they charge VAT.

**[H2]** What the service covers
- Checking the VAT treatment of your sales and purchases
- Preparing each return from your bookkeeping records
- Reconciling your VAT account so the return ties back to your books
- Reviewing the figures with you before the return is submitted
- Submitting the return through Making Tax Digital-compatible software
- Confirming the VAT due, or the amount you can reclaim
- A reminder as each return period comes round

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=vat-returns#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20VAT%20returns.`

**[H2]** How it works

**[H3]** Review your position

We look at your VAT registration, the scheme you use and how your records are kept.

**[H3]** Prepare the return

We prepare the return from your records and investigate anything that looks out of line.

**[H3]** You approve it

We send you the figures and the transactions behind them. Nothing is submitted until you approve the return.

**[H3]** Submit and keep a record

The approved return is submitted through MTD-compatible software, and you keep a copy of what was filed.

**[H2]** Information we need from you
- Your VAT registration number and the dates of your return periods
- Access to your accounting software, or your bookkeeping records for the period
- Sales and purchase invoices for the period
- Details of any VAT scheme you use, such as the Flat Rate Scheme
- Any letters or notices from HMRC about your VAT

**[H2]** Common questions

**Q:** What is Making Tax Digital for VAT?

**Q:** Should I register for VAT?

**Q:** Can you help me choose a VAT scheme?

**Q:** Can you help if a VAT return was late or wrong?

**[H2]** Related services
- Bookkeeping Records kept up to date in your accounting software
- Annual accounts Year-end accounts prepared from your records

**[H2]** Who this service suits
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services/annual-accounts`

- **Browser title:** Annual Accounts for Small Businesses | Halim Enterprises Limited
- **Search description:** Year-end and statutory accounts prepared from your bookkeeping records, reviewed with you before approval and prepared ready to file. Remote, UK-wide.

#### Part 2: Annual accounts

- Home
- Services
- Annual accounts

Services

**[H1]** Annual accounts

We prepare your year-end accounts from your bookkeeping records, make the necessary adjustments and go through the results with you before the accounts are finalised.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Who this service is for

**[H2]** Who this service is for

Limited companies, which must prepare statutory accounts every year and file them with Companies House.

Sole traders who need a reliable set of year-end figures, to work out their profit or to support a loan or mortgage application.

**[H2]** What the service covers
- Reviewing your bookkeeping records for the year
- Year-end adjustments such as accruals, prepayments and depreciation
- A profit and loss account and balance sheet
- Statutory accounts in the format required for limited companies
- A review of the draft accounts with you before they are finalised
- Accounts prepared ready to file, with the filing steps explained

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=annual-accounts#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Annual%20accounts.`

**[H2]** How it works

**[H3]** Agree the year-end

We confirm your accounting period and which records are available.

**[H3]** Review and adjust

We check the year’s records and make the year-end adjustments.

**[H3]** Draft and review

We prepare draft accounts and go through them with you, including any figure you want to question.

**[H3]** Approve and file

Once you approve the accounts they are ready to file, and we explain how the filing is done.

**[H2]** Information we need from you
- Your bookkeeping records for the year, or access to your accounting software
- Bank statements covering the whole accounting period
- Details of equipment, vehicles or other assets bought or sold during the year
- Loan, lease and hire purchase agreements
- A list of money owed to and by the business at the year-end
- Last year’s accounts, if you have them

**[H2]** Common questions

**Q:** When are my company’s accounts due?

**Q:** Do sole traders need annual accounts?

**Q:** Can you prepare accounts if my bookkeeping is not up to date?

**[H2]** Related services
- Bookkeeping Records kept up to date in your accounting software
- VAT returns Prepared and submitted through MTD-compatible software
- Business plans and forecasts Cash-flow forecasts and business plans

**[H2]** Who this service suits
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services/payroll`

- **Browser title:** Payroll Services for Small Employers | Halim Enterprises Limited
- **Search description:** Payroll for small employers: pay, tax and National Insurance calculated each pay period, payslips issued and RTI submissions made to HMRC. Remote, UK-wide.

#### Part 2: Payroll

- Home
- Services
- Payroll

Services

**[H1]** Payroll

We calculate your payroll each pay period, issue payslips and make the Real Time Information submissions HMRC requires.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Who this service is for

**[H2]** Who this service is for

Small employers, from a business taking on its first member of staff to a team with regular weekly or monthly pay runs.

Directors of limited companies who pay themselves a salary through payroll.

**[H2]** What the service covers
- Calculating pay, tax and National Insurance for each pay period
- Payslips for every employee
- Real Time Information (RTI) submissions to HMRC each time you pay staff
- Workplace pension deductions, and the figures your pension provider needs
- Statutory payments such as sick pay and maternity pay
- New starters and leavers, including P45s
- Year-end payroll tasks, including P60s for your employees

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

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

**[H2]** Information we need from you
- Your PAYE reference and Accounts Office reference, if you are already registered as an employer
- Each employee’s details, including their National Insurance number and starter information
- Pay rates, hours, overtime, bonuses or commission for each pay period
- Details of your workplace pension scheme
- P45s from new starters who have them

**[H2]** Common questions

**Q:** I’m taking on my first employee. Where do I start?

**Q:** Can you run payroll for just one director?

**Q:** What do I need to tell you each pay period?

**Q:** Do you handle workplace pensions?

**[H2]** Related services
- Bookkeeping Records kept up to date in your accounting software
- Company formation Help setting up a limited company
- Annual accounts Year-end accounts prepared from your records

**[H2]** Who this service suits
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services/company-formation`

- **Browser title:** Help Setting Up a Limited Company | Halim Enterprises Limited
- **Search description:** Help preparing your limited company application for Companies House, then putting bank, HMRC and bookkeeping arrangements in place. Remote, UK-wide.

#### Part 2: Company formation

- Home
- Services
- Company formation

Services

**[H1]** Company formation

We help you prepare the information Companies House needs to register your company, then help you put the bank account, HMRC registrations and bookkeeping in place.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Who this service is for

**[H2]** Who this service is for

Sole traders considering a move to a limited company, and people starting a new business who have decided a company is the right structure.

If you are not yet sure whether a company suits you, we can discuss the options in your free consultation.

**[H2]** What the service covers
- Going through the information Companies House needs
- Help choosing a company name and checking it is available
- Guidance on directors, shareholders and how the shares are split
- Choosing a registered office address and the right business activity (SIC) code
- Explaining identity verification for directors and people with significant control
- A checklist of what to set up once the company is registered
- Bookkeeping set up from the first transaction

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=company-formation#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Company%20formation.`

**[H2]** How it works

**[H3]** Plan

We go through your plans and what the company needs: a name, directors, shareholders and addresses.

**[H3]** Prepare

We help you gather the details and prepare the application to Companies House.

**[H3]** Registration

Once Companies House registers the company, you receive a certificate of incorporation and your company number.

**[H3]** Next steps

We help with what follows: a business bank account, HMRC registrations and your bookkeeping.

**[H2]** Information we need from you
- Your preferred company name, plus an alternative in case it is taken
- Names, addresses and dates of birth of the directors and shareholders
- How the shares will be divided between shareholders
- An address to use as the company’s registered office
- A short description of what the business will do
- Confirmation that each director has verified their identity with Companies House, or is ready to

**[H2]** Common questions

**Q:** Do you register the company for me?

**Q:** Should I set up a limited company?

**Q:** What happens after the company is set up?

**[H2]** Related services
- Bookkeeping Records kept up to date in your accounting software
- Payroll Pay calculations, payslips and RTI submissions
- Business plans and forecasts Cash-flow forecasts and business plans

**[H2]** Who this service suits
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services/business-plans-and-forecasts`

- **Browser title:** Business Plans and Cash-Flow Forecasts | Halim Enterprises Limited
- **Search description:** Business plans and month-by-month cash-flow forecasts built on assumptions agreed with you, for lenders, investors or internal planning. Remote, UK-wide.

#### Part 2: Business plans and forecasts

- Home
- Services
- Business plans and forecasts

Services

**[H1]** Business plans and forecasts

We prepare business plans and cash-flow forecasts that show the financial effect of your plans, built on assumptions you have agreed and can explain.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Who this service is for

**[H2]** Who this service is for

Businesses applying for a loan or investment that need a plan and forecast to support the application.

Owners planning a new hire, a second site or a quieter season who want to see the effect on cash before committing.

**[H2]** What the service covers
- A discussion of your goals, your market and your plans
- Agreeing the assumptions behind the numbers with you
- A month-by-month cash-flow forecast
- A projected profit and loss account
- A written business plan, or help structuring your own
- Scenarios showing the effect of higher or lower sales
- A walk-through of the figures, so you can present them yourself

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=business-plans-and-forecasts#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Business%20plans%20and%20forecasts.`

**[H2]** How it works

**[H3]** Understand the purpose

We find out who the plan is for and what it needs to show.

**[H3]** Agree the assumptions

We work through sales, costs and timing with you, so the numbers reflect how your business operates.

**[H3]** Build the forecast

We prepare the forecast and plan, and check that the figures are consistent with each other.

**[H3]** Review together

We go through it with you and adjust it until you are ready to present it.

**[H2]** Information we need from you
- Any recent accounts or bookkeeping records
- Your plans: what you want to do, and when
- Expected prices, sales volumes and main costs
- Details of existing loans, finance and other commitments
- Any format or information the lender or investor has asked for

**[H2]** Common questions

**Q:** Will a business plan get me a loan?

**Q:** I’m a new business with no figures yet. Can you still help?

**Q:** Can you update the forecast later?

**[H2]** Related services
- Bookkeeping Records kept up to date in your accounting software
- Company formation Help setting up a limited company
- Annual accounts Year-end accounts prepared from your records

**[H2]** Who this service suits
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/services/capital-gains-tax`

- **Browser title:** Capital Gains Tax Help | Halim Enterprises Limited
- **Search description:** Help calculating and reporting Capital Gains Tax when you sell or give away property, shares or other assets, with every figure documented.

#### Part 2: Capital Gains Tax

- Home
- Services
- Capital Gains Tax

Services

**[H1]** Capital Gains Tax

We help you work out whether Capital Gains Tax is due when you sell or give away an asset, how much it may be, and how and when to report it.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Who this service is for

**[H2]** Who this service is for

People who have sold, or are about to sell, a property that is not their main home, such as a buy-to-let or a second home.

Anyone who has sold shares, investments or other valuable assets and needs to know whether tax is due.

**[H2]** What the service covers
- Working out the gain from your purchase and sale records
- Including allowable costs, such as buying and selling fees and improvements
- Checking which reliefs and exemptions may apply
- Calculating how much tax may be due
- Explaining how and when the gain needs to be reported to HMRC
- A documented record of the calculation for your files

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact?service=capital-gains-tax#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Capital%20Gains%20Tax.`

**[H2]** How it works

**[H3]** Tell us about the sale

We find out what you sold, when you bought it and how you have used it.

**[H3]** Gather the figures

We collect the purchase and sale details, costs and any spending on improvements.

**[H3]** Calculate

We work out the gain and any tax due, and set out how each figure was reached.

**[H3]** Report

We explain how and when to report and pay, and help you with the report itself.

**[H2]** Information we need from you
- Completion statements for the purchase and the sale
- Records of buying and selling costs, such as legal and estate agent fees
- Receipts for improvements, such as an extension (repairs and maintenance do not count)
- For shares, contract notes or statements showing purchase and sale prices
- The dates of any periods you lived in the property, if it was ever your home

**[H2]** Common questions

**Q:** When do I need to report a gain on a UK property?

If you sell a UK residential property and Capital Gains Tax is due, you usually need to report it and pay within 60 days of completion. Contacting us as soon as a sale is agreed gives the most time to prepare.

**Q:** Do I pay Capital Gains Tax when I sell my home?

Usually not, if it has been your main home for the whole time you owned it. It can be more complicated if you let it out, used part of it only for business, or had more than one home. Contact us with the details of your situation.

**Q:** Can you reduce the tax I pay?

We include every cost and relief you are entitled to claim, but we cannot promise a particular result. The tax due depends on the facts of your sale.

**Q:** I sold something in an earlier year and did not report it. What now?

Contact us. We can review what happened and explain the options for putting it right with HMRC.

**[H2]** Related services
- Bookkeeping Records kept up to date in your accounting software
- Annual accounts Year-end accounts prepared from your records

**[H2]** Who this service suits
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Individuals Help with Capital Gains Tax when you sell property, shares or other assets.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/who-we-help`

- **Browser title:** Who We Help | Halim Enterprises Limited
- **Search description:** Accountancy services for sole traders, startups, eCommerce sellers, hospitality businesses and individuals, delivered remotely across the UK.

#### Part 1: Who we work with

- Home
- Who we help

Who we help

**[H1]** Who we work with

Each type of client brings different records and deadlines. Choose the page closest to your situation to see the services that usually apply.

[Link] Request a free consultation → `/book-consultation`

#### Part 2: Who we help

[Link] Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business. Relevant services Bookkeeping · VAT returns · Annual accounts · Company formation → `/who-we-help/sole-traders`

[Link] Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses. Relevant services Company formation · Bookkeeping · Business plans and forecasts · Payroll → `/who-we-help/startups`

[Link] eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds. Relevant services Bookkeeping · VAT returns · Annual accounts · Business plans and forecasts → `/who-we-help/ecommerce-sellers`

[Link] Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses. Relevant services Bookkeeping · Payroll · VAT returns · Business plans and forecasts → `/who-we-help/hospitality`

[Link] Individuals Help with Capital Gains Tax when you sell property, shares or other assets. Relevant services Capital Gains Tax → `/who-we-help/individuals`

#### Part 3: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/who-we-help/sole-traders`

- **Browser title:** Accountancy Services for Sole Traders | Halim Enterprises Limited
- **Search description:** Bookkeeping, VAT returns and year-end accounts for UK sole traders, handled remotely by phone, video and WhatsApp. Free initial consultation.

#### Part 2: Sole traders

- Home
- Who we help
- Sole traders

Who we help

**[H1]** Sole traders

As a sole trader you are responsible for every part of the business, including its records. We take on the bookkeeping and VAT returns, so that work no longer falls to your evenings and weekends.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Your situation

**[H2]** Your situation

As a sole trader, the business and its paperwork are all yours. Receipts collect in the van or on the kitchen table, statements pile up, and the books get pushed to evenings and weekends.

Recording transactions regularly through the year means your profit is known before the tax year ends, and the figures are ready when a VAT return or tax return is due.

**[H2]** Typical challenges
- Finding time for bookkeeping around paying work
- Keeping business and personal spending apart
- Knowing which costs count as business expenses
- Deciding whether, and when, to register for VAT
- Seeing what your profit actually is

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20sole%20traders.`

**[H2]** Services that help
- Bookkeeping Your income and expenses kept up to date in Xero, QuickBooks, Sage or FreeAgent.
- VAT returns If you are VAT registered, returns prepared and submitted through MTD-compatible software.
- Annual accounts Year-end figures showing the profit the business made.
- Company formation If you are thinking of becoming a limited company, help setting it up.

**[H2]** Working with us remotely

There is no office to visit. Consultations take place by phone or video, you can message us on WhatsApp, and we agree a secure way to share your records, so the work fits around your own hours.

**[H2]** Common questions

**Q:** Do I need an accountant as a sole trader?

**Q:** Can you help me move from sole trader to limited company?

**Q:** I have only just started. Is it too early to get help?

**[H2]** Other client types
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.
- Individuals Help with Capital Gains Tax when you sell property, shares or other assets.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/who-we-help/startups`

- **Browser title:** Accounting Support for Startups | Halim Enterprises Limited
- **Search description:** Company formation, bookkeeping, payroll and cash-flow forecasts for UK startups, from the first registration onwards. Free initial consultation.

#### Part 2: Startups

- Home
- Who we help
- Startups

Who we help

**[H1]** Startups

A new business has registrations to make, records to start and cash to plan before income is steady. We help you set up the company, the bookkeeping and a forecast from the outset.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Your situation

**[H2]** Your situation

In the first months there is a lot to get right at once: choosing a structure, opening a bank account, registering with HMRC and working out how much cash you will need before sales pick up.

Putting the basics in place early, with a simple bookkeeping system and a realistic forecast, means fewer surprises later and better answers when a lender or investor asks questions.

**[H2]** Typical challenges
- Choosing between being a sole trader and a limited company
- Knowing which registrations you need, and when
- Setting up bookkeeping before the paperwork builds up
- Planning cash flow before income is steady
- Preparing numbers for a loan or an investor

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20startups.`

**[H2]** Services that help
- Company formation Help setting up a limited company with the right details from the start.
- Bookkeeping A bookkeeping system from the first transaction, so records do not build up.
- Business plans and forecasts A plan and cash-flow forecast you can present to a lender or an investor.
- Payroll When you take on your first employee, payroll set up and run for you.

**[H2]** Working with us remotely

We work remotely, so the service is the same wherever you are based in the UK, by phone, video or WhatsApp.

**[H2]** Common questions

**Q:** When should I speak to an accountant?

Ideally before you start trading or register a company, so decisions about your structure and records are made with full information.

**Q:** Can you help with a forecast for a bank or an investor?

Yes. We build business plans and cash-flow forecasts on assumptions you have agreed, so you can explain the numbers yourself.

**[H2]** Other client types
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.
- Individuals Help with Capital Gains Tax when you sell property, shares or other assets.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/who-we-help/ecommerce-sellers`

- **Browser title:** Accounting for eCommerce Sellers | Halim Enterprises Limited
- **Search description:** Bookkeeping and VAT returns for online sellers, with marketplace and payment-provider payouts broken down into sales, fees and refunds. Remote, UK-wide.

#### Part 2: eCommerce sellers

- Home
- Who we help
- eCommerce sellers

Who we help

**[H1]** eCommerce sellers

Marketplace and payment-provider payouts combine sales, fees and refunds in a single figure. We break each payout down so your records and VAT returns reflect what you actually sold.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Your situation

**[H2]** Your situation

Marketplaces and payment providers rarely pay you what you actually sold. Payouts arrive with fees, refunds and adjustments already taken off, often from several platforms at once.

Unless each payout is broken down properly, it is hard to see your real sales, costs and margins, and harder still to get VAT right.

**[H2]** Typical challenges
- Reconciling payouts from several platforms and payment providers
- Recording marketplace and payment fees correctly
- Handling refunds, returns and chargebacks
- Keeping track of stock and the cost of what you sell
- Working out the VAT on different kinds of sale

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20eCommerce%20sellers.`

**[H2]** Services that help
- Bookkeeping Each payout split into sales, fees and refunds, so your records show actual sales and costs.
- VAT returns VAT returns built from those broken-down figures and submitted through MTD software.
- Annual accounts Year-end accounts that reflect stock and cost of sales properly.
- Business plans and forecasts Forecasts for stock buying and seasonal peaks.

**[H2]** Working with us remotely

Your business already runs online, and so does ours. We work in your accounting software and speak by phone, video or WhatsApp, wherever you are in the UK.

**[H2]** Common questions

**Q:** Can you handle sales from more than one platform?

**Q:** Do I need to register for VAT as an online seller?

**[H2]** Other client types
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.
- Individuals Help with Capital Gains Tax when you sell property, shares or other assets.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/who-we-help/hospitality`

- **Browser title:** Accounting for Hospitality Businesses | Halim Enterprises Limited
- **Search description:** Bookkeeping, payroll and VAT returns for cafés, restaurants and other hospitality businesses, handled remotely across the UK. Free initial consultation.

#### Part 2: Hospitality and restaurants

- Home
- Who we help
- Hospitality and restaurants

Who we help

**[H1]** Hospitality and restaurants

Hospitality businesses deal with takings from several sources, frequent supplier invoices and staff on changing hours. We keep the bookkeeping, payroll and VAT up to date, so they are not left until a deadline.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Your situation

**[H2]** Your situation

Takings come in through cash, card machines and delivery platforms. Supplier invoices arrive every week, staff work changing shifts, and busy and quiet seasons make cash flow hard to predict.

With so much going on, the books are often the last job on the list, until a VAT return or a payday comes round.

**[H2]** Typical challenges
- Reconciling cash, card and delivery platform takings
- Keeping on top of frequent supplier invoices
- Running payroll for staff on changing hours
- Treating tips and service charges properly
- Getting the VAT right on different kinds of food and drink
- Planning for seasonal ups and downs

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20hospitality%20and%20restaurants.`

**[H2]** Services that help
- Bookkeeping Takings and supplier bills recorded and reconciled, week in, week out.
- Payroll Pay worked out for staff on variable hours, with payslips and RTI submissions.
- VAT returns Returns prepared with the VAT treatment of your sales checked.
- Business plans and forecasts Cash-flow forecasts for a new site, a refit or the quiet months.

**[H2]** Working with us remotely

Stepping away from the kitchen or the floor is difficult. We arrange calls and video meetings around your opening hours, and you can message us on WhatsApp.

**[H2]** Common questions

**Q:** Can you run payroll for staff on variable hours?

**Q:** How do tips affect payroll?

**[H2]** Other client types
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Individuals Help with Capital Gains Tax when you sell property, shares or other assets.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/who-we-help/individuals`

- **Browser title:** Capital Gains Tax Help for Individuals | Halim Enterprises Limited
- **Search description:** Help for individuals working out and reporting Capital Gains Tax on property, shares and other assets, with remote consultations across the UK.

#### Part 2: Individuals

- Home
- Who we help
- Individuals

Who we help

**[H1]** Individuals

If you have sold, or plan to sell, a second property, a buy-to-let or investments, we can work out whether Capital Gains Tax is due and explain how and when to report it.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Your situation

**[H2]** Your situation

Selling a second property, a buy-to-let or a portfolio of shares can raise questions about Capital Gains Tax: whether it is due, how much it might be and how to report it.

Records of what you paid, what you spent on improvements and when you lived in a property make those questions far easier to answer, whether the sale is now or in the future.

**[H2]** Typical challenges
- Working out whether Capital Gains Tax is due on a sale
- Finding records of what you paid and what you spent on improvements
- Understanding the reporting deadlines for property sales
- Keeping clear records of investments and other assets

**[H2]** Request a quote

Tell us what you need. We send a quote before any work starts, with no obligation to go ahead.

[Link] Request a free consultation → `/book-consultation`

[Link] Request a callback → `/contact#callback`

[Link] Ask on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20services%20for%20individuals.`

**[H2]** Services that help
- Capital Gains Tax The gain and any tax due calculated, with the working for each figure.

**[H2]** Working with us remotely

We work remotely, so you can speak to us by phone or video from anywhere in the UK, without visiting an office.

**[H2]** Common questions

**Q:** Can you help with other personal tax questions?

**Q:** I have sold a property. How soon should I get in touch?

**[H2]** Other client types
- Sole traders Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.
- Startups Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.
- eCommerce sellers Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.
- Hospitality and restaurants Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/about`

- **Browser title:** About Us | Halim Enterprises Limited
- **Search description:** Halim Enterprises Limited is a UK accountancy company, incorporated in 2026, providing bookkeeping, VAT and accounting services remotely across the UK.

#### Part 1: About Halim Enterprises Limited

- Home
- About

About us

**[H1]** About Halim Enterprises Limited

Halim Enterprises Limited provides bookkeeping, VAT returns and accounting services to small businesses and individuals. The company was incorporated in England and Wales in 2026 and works remotely across the UK.

[Link] Request a free consultation → `/book-consultation`

#### Part 2: How we work

**[H2]** How we work

We are a newly established company. Clients work directly with the director, from the first consultation to the regular work that follows.

We work remotely. Consultations take place by phone or video and you can message us on WhatsApp, so your location in the UK makes no difference to the service.

Before any work begins, you receive a quote setting out what is included. As the work progresses, we tell you what has been done, what we need from you and when the next deadline falls.

#### Part 3: Saad Haleem

The director

**[H2]** Saad Haleem

Director

Saad Haleem is the director of Halim Enterprises Limited.

#### Part 4: What to expect

**[H2]** What to expect

A small company working remotely, with the same person handling your work from the first conversation onwards.

**[H3]** Remote, anywhere in the UK

Consultations take place by phone or video, and you can message us on WhatsApp. There is no office to travel to.

Phone

Video

WhatsApp

Anywhere in the UK

**[H3]** Figures you can follow

Before you approve a VAT return or a set of accounts, we show you the figures and the records behind them.

Before you approve a VAT return
- The VAT due or reclaimable
- The sales and purchases behind it
- Anything that needs your attention

**[H3]** One point of contact

You deal with the same person throughout, who knows your records and your deadlines.

Saad Haleem

Director

**[H3]** A quote before work starts

You see the scope and the cost in advance. We start once you have accepted the quote.
- Quote sent
- You accept
- Work begins

#### Part 5: Software we work with

Software

**[H2]** Software we work with

Not using accounting software yet? We can recommend a package during your consultation.
- Xero
- QuickBooks
- Sage
- FreeAgent
- Dext
- Hubdoc

Xero is a trademark of Xero Limited. QuickBooks is a registered trademark of Intuit Inc. Sage is a trademark of The Sage Group plc. FreeAgent, Dext and Hubdoc are trademarks of their respective owners. Halim Enterprises Limited is independent: we are not affiliated with, endorsed by or approved by these companies.

#### Part 6: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/contact`

- **Browser title:** Contact Us | Halim Enterprises Limited
- **Search description:** Request a free consultation, ask for a callback or message Halim Enterprises Limited on WhatsApp. Remote accountancy services across the UK.

#### Part 1: Contact us

- Home
- Contact

Contact

**[H1]** Contact us

We work remotely with clients across the UK. Consultations take place by phone or video.

#### Part 2: Ways to contact us

**[H2]** Free initial consultation

The best starting point: a conversation by phone or video about your business and the services you need.

[Link] Request a free consultation → `/book-consultation`

**[H3]** Request a callback

Leave your number and a convenient time, and we will call you.

[Link] Request a callback → `#callback`

**[H3]** WhatsApp

Send us a message at any time.

+44 7884 607135

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`

Already working with us? How to send us documents securely

#### Part 3: Forms

**[H2]** Send an enquiry

Tell us about your business and what you need. We will reply using the details you provide.

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

Leave your number and a convenient time, and we will call you.

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

- **Browser title:** Request a Free Consultation | Halim Enterprises Limited
- **Search description:** Request a free initial consultation with Halim Enterprises Limited by phone or video: what it covers, what to prepare and what happens afterwards.

#### Part 1: Request a free consultation

- Home
- Book a consultation

Free consultation

**[H1]** Request a free consultation

A free initial conversation by phone or video about your business, your records and the services you need. If we can help, we follow up with a quote.

#### Part 2: Request your consultation

**[H2]** Request your consultation

Leave your name, phone number and a convenient time. We will call you to arrange the consultation.

[Field] Your name (required)

[Field] Phone number (required)

[Field] When is best to call? (required)

[Options] Choose an option | Morning | Afternoon | Any time

[Field] What would you like to talk about? (optional)

A few words is plenty.

[Field] I’ve read the privacy policy (required)

[Button] Request a callback

We only use these details to respond to you. Read our privacy policy to see how we handle your information.

Prefer to write? Send us a message instead.

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20arrange%20a%20free%20consultation.`

**[H2]** What the consultation covers
- Your business and what you need help with
- How your bookkeeping is kept at the moment
- Your VAT position and deadlines
- The services that fit, and the next steps

**[H2]** How it works
- The consultation takes place by phone or video, whichever you prefer.
- We arrange a time with you once you get in touch.
- There is nothing to pay, and no obligation to go ahead afterwards.

**[H2]** Useful to have to hand
- The name of any accounting software you use
- An approximate figure for your turnover or income
- Any deadlines or HMRC letters you have questions about
- A short list of the questions you want to ask

There is no need to send documents beforehand. If you decide to go ahead, we agree a secure way to share them.

**[H2]** What happens afterwards

If you would like us to act for you, we send you a quote setting out the work and the cost. Nothing starts until you have accepted it.

### Page: `/faqs`

- **Browser title:** Frequently Asked Questions | Halim Enterprises Limited
- **Search description:** Answers about free consultations, fees, working remotely, software and sharing documents with Halim Enterprises Limited.

#### Part 2: Frequently asked questions

- Home
- FAQs

FAQs

**[H1]** Frequently asked questions

Answers about consultations, fees, working remotely and sharing documents. If your question is not covered here, contact us.

[Link] Request a free consultation → `/book-consultation`

#### Part 3: Getting started

Topics
- Getting started 4
- Working together 3
- Services 3
- Documents and data 3

**[H2]** Getting started

**Q:** Is the first consultation really free?

**Q:** Why don’t you list your prices?

**Q:** What happens in the free consultation?

**Q:** Do I need to prepare anything for the consultation?

**[H2]** Working together

**Q:** Can you work with me if I’m not in London?

**Q:** How do we keep in touch?

**Q:** Can you take over from my current accountant?

**[H2]** Services

**Q:** Which accounting software do you use?

**Q:** Can you help with something that isn’t on your services page?

**Q:** Can you help if I’m not VAT registered?

**[H2]** Documents and data

**Q:** How do I send you my documents?

**Q:** Will you need access to my accounting software?

**Q:** How do you look after my information?

#### Part 4: Discuss your requirements

**[H2]** Discuss your requirements

Request a free initial consultation by phone or video. If we can help, we send you a quote before any work starts.

[Link] Request a free consultation → `/book-consultation`

[Link] Message us on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%E2%80%99d%20like%20to%20ask%20about%20your%20accounting%20services.`
- Free initial consultation by phone or video
- Remote service, available anywhere in the UK

### Page: `/send-documents`

- **Browser title:** Sending Us Documents | Halim Enterprises Limited
- **Search description:** How clients of Halim Enterprises Limited share documents securely, and why documents should not be sent by email or WhatsApp.
- **Search engines:** hidden from search (noindex)

#### Part 1: Sending us your documents

- Home
- Sending documents

For clients

**[H1]** Sending us your documents

Once we are working together, we will need records such as bank statements, receipts and invoices. This page explains how to share them securely.

#### Part 2: We will send you a secure upload link

**[H2]** We will send you a secure upload link

After your consultation, once we have agreed to work together, we send you a secure upload link. There is nothing to send before then.

**[H2]** How it works
- We tell you exactly which documents we need.
- We send you a secure upload link.
- We confirm when we have everything, or tell you what is missing.

**[H2]** Please do not send documents by email or WhatsApp

Email and messaging apps are not suitable for bank statements, identity documents, payslips or tax letters. If you are unsure how to send something, ask us first.

Questions about what to send? Message us on WhatsApp, without attaching any documents.

[Link] Ask a question on WhatsApp → `https://wa.me/447884607135?text=Hello%2C%20I%20have%20a%20question%20about%20sending%20documents.`

### Page: `/privacy-policy`

- **Browser title:** Privacy Policy | Halim Enterprises Limited
- **Search description:** How Halim Enterprises Limited collects, uses and protects the personal information you share through this website.
- **Search engines:** hidden from search (noindex)

#### Part 1: Privacy policy

- Home
- Privacy policy

Legal

**[H1]** Privacy policy

This policy explains what personal information Halim Enterprises Limited collects through this website, why, and the choices you have.

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

This website is run by Halim Enterprises Limited. We are the data controller for the personal information described in this policy.

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

- **Browser title:** Cookie Policy | Halim Enterprises Limited
- **Search description:** Which cookies the Halim Enterprises Limited website uses: none for analytics or tracking.
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

- **Browser title:** Complaints Procedure | Halim Enterprises Limited
- **Search description:** How to raise a concern with Halim Enterprises Limited, and how we will handle it.
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

- **Browser title:** Website Terms of Use | Halim Enterprises Limited
- **Search description:** The terms that apply when you use the Halim Enterprises Limited website.
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

This website is run by Halim Enterprises Limited. Registered in England and Wales, company number 17491527. Registered office: Flat 41, Shaftesbury Point, High Street, London, E13 0AB.

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

- **Browser title:** Page not found | Halim Enterprises Limited
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
- Success: "Thank you for your enquiry". "Your details have been received. We will reply using the contact details you provided." "A confirmation has been sent to your email address. If your question is urgent, you can message us on WhatsApp."

**Callback form (`/contact` and `/book-consultation`)**

- Choices for "When is best to call?": Morning, Afternoon, Any time
- Send button: "Request a callback"
- Success: "Thank you, your callback request has been received". "We will call you on the number you provided, at your preferred time where possible." "If anything changes, you can message us on WhatsApp."

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

- "Thank you. Your details have been received."
- "Some details need checking. Please review the form and try again."
- "You’ve sent several messages in a short time. Please wait a few minutes and try again, or message us on WhatsApp."
- "Our online form isn’t available at the moment. Please message us on WhatsApp, or try again later." (This is what visitors see today on the live site, because the business mailbox does not exist yet; see section 5.)
- "Something went wrong and your message wasn’t sent. Please try again, or message us on WhatsApp."

### 4.2 Emails sent by the forms (`emails.ts`)

None of these has been sent for real yet (no mailbox).

- **To the business, for an enquiry.** Subject "New website enquiry from {name}". Heading "New enquiry from the website". Intro "Reply to this email to answer them directly."
- **To the business, for a callback.** Subject "Callback request from {name}". Heading "New callback request from the website". Intro "They would like a call back on the number below."
- **Field labels in those emails:** Name, Email, Phone, Business name, Type of business, Annual turnover, Service needed, Message, Preferred time, Topic. Empty fields show "Not provided".
- **To the visitor, after an enquiry.** Subject "Thank you for contacting Halim Enterprises Limited". Body:
  - "Hello {first name},"
  - "Thank you for contacting us. Your enquiry has been received, and we will reply to you by email."
  - "Please do not send bank statements, identity documents or other sensitive records by email. If we need documents from you, we will agree a secure way to share them."
  - Signed "Halim Enterprises Limited".
- **Footer of every email:** the company details line (company name, number and registered office), plus the website address once the production domain is set, as UK law requires on business correspondence.

### 4.3 WhatsApp messages typed in for the visitor (`pages.ts`)

When someone taps a WhatsApp link, WhatsApp opens with one of these messages ready to send. The visitor can edit it first.

- General: "Hello, I’d like to ask about your accounting services."
- From a consultation link: "Hello, I’d like to arrange a free consultation."
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
| Response-time promise | Not confirmed (same day or 24 hours) | No reply time is stated anywhere (removed 18 October 2026) | Client |
| ICO registration number | The client is registering before launch | The ICO sentence is hidden in the privacy policy | Client |
| Anti-money-laundering (AML) supervisor and number | Unconfirmed | Not mentioned anywhere | Client |
| Professional body membership and qualifications (e.g. ACCA) | Unconfirmed, and claiming them falsely is a legal risk | Nothing about qualifications, memberships or experience appears | Client, with proof |
| Director's photo, biography, qualifications, LinkedIn, own words | Not supplied | Homepage: a "Company at a glance" panel of verified company facts. /about: a factual line ("Saad Haleem is the director of Halim Enterprises Limited.") and a monogram tile | Client |
| Online booking | No booking tool chosen (Calendly recommended) | /book-consultation offers a callback form and WhatsApp instead, and every button says "Request a free consultation" (it switches to "Book" automatically once booking is on) | Client: choose a tool and send the link |
| Consultation length | Not confirmed | No duration is stated anywhere | Client |
| Secure document upload | No portal chosen. A custom upload system is ruled out (security risk, and no database or file storage is allowed) | /send-documents says "We’ll send you a secure upload link after your consultation" | Client: choose a portal |
| Reviews and Google Business Profile link | No reviews yet; profile link not supplied | No reviews section. Nothing hints at reviews | Client: genuine reviews with permission |
| Self Assessment, Corporation Tax, Making Tax Digital | Client has not confirmed these services | Not on any page, menu or form | Client |
| Client's own policies (privacy, cookies, complaints, terms, client care) | Client says they exist; not received | The four legal pages are draft templates with a "Draft" banner, hidden from search engines | Client |
| Complaints timescales | Not supplied | The complaints page says "promptly" with no timescale | Client |
| Logo and brand colours | Not supplied | A provisional typographic wordmark ("Halim / ACCOUNTANTS") and the provisional navy, paper and teal palette | Client |
| Domain | Provisional (halimaccountants.co.uk, chosen under the old name; not bought) | No canonical links, sitemap entries or website address in emails until `NEXT_PUBLIC_SITE_URL` is set | Client |
| Official software logos (Xero, QuickBooks, Sage and others) | Each vendor restricts logo use to partners or written licences; the client is not a confirmed partner | Names shown as plain text, with a trademark line | Client, only via partner programmes or written permission |
| Official WhatsApp logo | Meta's brand pack needs its terms accepted, which the developer did not do on the client's behalf | A generic chat icon with the word "WhatsApp" | Client or developer: download the pack and accept the terms |
| Social sharing image; canonical URLs and sitemap entries | No image or logo yet; canonical URLs and the sitemap need the confirmed domain | robots.txt, sitemap.xml, Open Graph titles and descriptions and organisation data are in place | Client (domain, logo) |
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

- **Homepage hero:** headline "Bookkeeping, VAT and accounting for UK small businesses", the lead, and "Remote service, available anywhere in the UK".
- **"Incorporated in England and Wales in September 2026" and "a newly established company":** on the homepage and /about. Confirm the client is happy to say so.
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
- **The "Company at a glance" panel:** its facts are verified, but confirm the client is happy to show them.
- **Limited companies:** not one of the five audiences, but annual accounts, company formation and payroll address them. Confirm whether a sixth audience page is wanted.
- **All emails, form messages and WhatsApp messages** in section 4.
