/*
 * DRAFT – awaiting client approval (page copy)
 *
 * Who we help, from CLAUDE.md section 3: exactly five audiences, one page
 * each. Each page links only to confirmed services. Individuals: Self
 * Assessment is pending, so that page focuses on Capital Gains Tax and record
 * keeping and invites people to talk about their situation.
 */

import type { IconName } from "@/components/ui/Icon";
import type { QuestionAnswer } from "@/content/faqs";
import type { ContentStatus, ServiceSlug } from "@/content/services";
import { site } from "@/content/site";
import { listWithOr } from "@/lib/lists";

export type AudienceSlug = "sole-traders" | "startups" | "ecommerce-sellers" | "hospitality" | "individuals";

export type AudiencePage = {
  /** The page topic for the <title>, without the brand (the layout adds it) */
  readonly metaTitle: string;
  /** Around 150 characters */
  readonly metaDescription: string;
  readonly intro: string;
  /** The typical situation, as short paragraphs */
  readonly situation: readonly string[];
  readonly challenges: readonly string[];
  /** Confirmed services that help, and why, in this audience's terms */
  readonly services: readonly { readonly slug: ServiceSlug; readonly why: string }[];
  /** How working remotely suits them */
  readonly remote: string;
  /** 2–3 questions */
  readonly faqs: readonly QuestionAnswer[];
};

export type Audience = {
  readonly slug: AudienceSlug;
  readonly title: string;
  /** One line, used in navigation panels */
  readonly tagline: string;
  readonly summary: string;
  readonly status: ContentStatus;
  readonly icon: IconName;
  readonly page: AudiencePage;
};

export const audiences: readonly Audience[] = [
  {
    slug: "sole-traders",
    title: "Sole traders",
    tagline: "Bookkeeping and VAT for the self-employed",
    summary: "Bookkeeping, VAT returns and year-end figures for self-employed people running their own business.",
    status: "confirmed",
    icon: "user",
    page: {
      metaTitle: "Accountancy Services for Sole Traders",
      metaDescription:
        "Bookkeeping, VAT returns and year-end accounts for UK sole traders, handled remotely by phone, video and WhatsApp. Free initial consultation.",
      intro:
        "As a sole trader you are responsible for every part of the business, including its records. We take on the bookkeeping and VAT returns, so that work no longer falls to your evenings and weekends.",
      situation: [
        "As a sole trader, the business and its paperwork are all yours. Receipts collect in the van or on the kitchen table, statements pile up, and the books get pushed to evenings and weekends.",
        "Recording transactions regularly through the year means your profit is known before the tax year ends, and the figures are ready when a VAT return or tax return is due.",
      ],
      challenges: [
        "Finding time for bookkeeping around paying work",
        "Keeping business and personal spending apart",
        "Knowing which costs count as business expenses",
        "Deciding whether, and when, to register for VAT",
        "Seeing what your profit actually is",
      ],
      services: [
        { slug: "bookkeeping", why: `Your income and expenses kept up to date in ${listWithOr(site.software)}.` },
        { slug: "vat-returns", why: "If you are VAT registered, returns prepared and submitted through MTD-compatible software." },
        { slug: "annual-accounts", why: "Year-end figures showing the profit the business made." },
        { slug: "company-formation", why: "If you are thinking of becoming a limited company, help setting it up." },
      ],
      remote:
        "There is no office to visit. Consultations take place by phone or video, you can message us on WhatsApp, and we agree a secure way to share your records, so the work fits around your own hours.",
      faqs: [
        {
          question: "Do I need an accountant as a sole trader?",
          answer: [
            "There is no legal requirement to have one, and many sole traders keep their own records. An accountant takes that work on and keeps the records consistent, which matters more as the business grows or once you are VAT registered.",
          ],
        },
        {
          question: "Can you help me move from sole trader to limited company?",
          answer: [
            "Yes. We can review whether a company suits your circumstances and then help you set one up. Our company formation page explains the process.",
          ],
        },
        {
          question: "I have only just started. Is it too early to get help?",
          answer: [
            "No. Setting up a bookkeeping system from the first transaction is far easier than reconstructing records later.",
          ],
        },
      ],
    },
  },
  {
    slug: "startups",
    title: "Startups",
    tagline: "Company set-up, records and forecasts",
    summary: "Company formation, bookkeeping from the first transaction and cash-flow forecasts for new businesses.",
    status: "confirmed",
    icon: "rocket",
    page: {
      metaTitle: "Accounting Support for Startups",
      metaDescription:
        "Company formation, bookkeeping, payroll and cash-flow forecasts for UK startups, from the first registration onwards. Free initial consultation.",
      intro:
        "A new business has registrations to make, records to start and cash to plan before income is steady. We help you set up the company, the bookkeeping and a forecast from the outset.",
      situation: [
        "In the first months there is a lot to get right at once: choosing a structure, opening a bank account, registering with HMRC and working out how much cash you will need before sales pick up.",
        "Putting the basics in place early, with a simple bookkeeping system and a realistic forecast, means fewer surprises later and better answers when a lender or investor asks questions.",
      ],
      challenges: [
        "Choosing between being a sole trader and a limited company",
        "Knowing which registrations you need, and when",
        "Setting up bookkeeping before the paperwork builds up",
        "Planning cash flow before income is steady",
        "Preparing numbers for a loan or an investor",
      ],
      services: [
        { slug: "company-formation", why: "Help setting up a limited company with the right details from the start." },
        { slug: "bookkeeping", why: "A bookkeeping system from the first transaction, so records do not build up." },
        { slug: "business-plans-and-forecasts", why: "A plan and cash-flow forecast you can present to a lender or an investor." },
        { slug: "payroll", why: "When you take on your first employee, payroll set up and run for you." },
      ],
      remote:
        "We work remotely, so the service is the same wherever you are based in the UK, by phone, video or WhatsApp.",
      faqs: [
        {
          question: "When should I speak to an accountant?",
          answer: [
            "Ideally before you start trading or register a company, so decisions about your structure and records are made with full information.",
          ],
        },
        {
          question: "Can you help with a forecast for a bank or an investor?",
          answer: [
            "Yes. We build business plans and cash-flow forecasts on assumptions you have agreed, so you can explain the numbers yourself.",
          ],
        },
      ],
    },
  },
  {
    slug: "ecommerce-sellers",
    title: "eCommerce sellers",
    tagline: "Platform payouts, fees and VAT recorded properly",
    summary: "Bookkeeping and VAT for online sellers, with each payout broken down into sales, fees and refunds.",
    status: "confirmed",
    icon: "shopping-bag",
    page: {
      metaTitle: "Accounting for eCommerce Sellers",
      metaDescription:
        "Bookkeeping and VAT returns for online sellers, with marketplace and payment-provider payouts broken down into sales, fees and refunds. Remote, UK-wide.",
      intro:
        "Marketplace and payment-provider payouts combine sales, fees and refunds in a single figure. We break each payout down so your records and VAT returns reflect what you actually sold.",
      situation: [
        "Marketplaces and payment providers rarely pay you what you actually sold. Payouts arrive with fees, refunds and adjustments already taken off, often from several platforms at once.",
        "Unless each payout is broken down properly, it is hard to see your real sales, costs and margins, and harder still to get VAT right.",
      ],
      challenges: [
        "Reconciling payouts from several platforms and payment providers",
        "Recording marketplace and payment fees correctly",
        "Handling refunds, returns and chargebacks",
        "Keeping track of stock and the cost of what you sell",
        "Working out the VAT on different kinds of sale",
      ],
      services: [
        { slug: "bookkeeping", why: "Each payout split into sales, fees and refunds, so your records show actual sales and costs." },
        { slug: "vat-returns", why: "VAT returns built from those broken-down figures and submitted through MTD software." },
        { slug: "annual-accounts", why: "Year-end accounts that reflect stock and cost of sales properly." },
        { slug: "business-plans-and-forecasts", why: "Forecasts for stock buying and seasonal peaks." },
      ],
      remote:
        "Your business already runs online, and so does ours. We work in your accounting software and speak by phone, video or WhatsApp, wherever you are in the UK.",
      faqs: [
        {
          question: "Can you handle sales from more than one platform?",
          answer: [
            "Yes. We bring the payouts from each platform and payment provider into your bookkeeping, so you can see all your sales and fees in one place.",
          ],
        },
        {
          question: "Do I need to register for VAT as an online seller?",
          answer: [
            "It depends on your turnover, what you sell and where your customers are. Selling to customers outside the UK can bring extra rules. We look at your situation in your consultation.",
          ],
        },
      ],
    },
  },
  {
    slug: "hospitality",
    title: "Hospitality and restaurants",
    tagline: "Takings, supplier bills, payroll and VAT",
    summary: "Bookkeeping, payroll and VAT for cafés, restaurants and other hospitality businesses.",
    status: "confirmed",
    icon: "utensils",
    page: {
      metaTitle: "Accounting for Hospitality Businesses",
      metaDescription:
        "Bookkeeping, payroll and VAT returns for cafés, restaurants and other hospitality businesses, handled remotely across the UK. Free initial consultation.",
      intro:
        "Hospitality businesses deal with takings from several sources, frequent supplier invoices and staff on changing hours. We keep the bookkeeping, payroll and VAT up to date, so they are not left until a deadline.",
      situation: [
        "Takings come in through cash, card machines and delivery platforms. Supplier invoices arrive every week, staff work changing shifts, and busy and quiet seasons make cash flow hard to predict.",
        "With so much going on, the books are often the last job on the list, until a VAT return or a payday comes round.",
      ],
      challenges: [
        "Reconciling cash, card and delivery platform takings",
        "Keeping on top of frequent supplier invoices",
        "Running payroll for staff on changing hours",
        "Treating tips and service charges properly",
        "Getting the VAT right on different kinds of food and drink",
        "Planning for seasonal ups and downs",
      ],
      services: [
        { slug: "bookkeeping", why: "Takings and supplier bills recorded and reconciled, week in, week out." },
        { slug: "payroll", why: "Pay worked out for staff on variable hours, with payslips and RTI submissions." },
        { slug: "vat-returns", why: "Returns prepared with the VAT treatment of your sales checked." },
        { slug: "business-plans-and-forecasts", why: "Cash-flow forecasts for a new site, a refit or the quiet months." },
      ],
      remote:
        "Stepping away from the kitchen or the floor is difficult. We arrange calls and video meetings around your opening hours, and you can message us on WhatsApp.",
      faqs: [
        {
          question: "Can you run payroll for staff on variable hours?",
          answer: [
            "Yes. Each pay period you tell us about hours, overtime, starters and leavers, and we calculate the pay and send you the payslips.",
          ],
        },
        {
          question: "How do tips affect payroll?",
          answer: [
            "It depends on how tips are collected and shared. There are rules on passing tips to staff and on how they are taxed, so we review how your business handles them before setting up payroll.",
          ],
        },
      ],
    },
  },
  {
    slug: "individuals",
    title: "Individuals",
    tagline: "Capital Gains Tax on property and investments",
    summary: "Help with Capital Gains Tax when you sell property, shares or other assets.",
    status: "confirmed",
    icon: "clipboard-list",
    page: {
      metaTitle: "Capital Gains Tax Help for Individuals",
      metaDescription:
        "Help for individuals working out and reporting Capital Gains Tax on property, shares and other assets, with remote consultations across the UK.",
      intro:
        "If you have sold, or plan to sell, a second property, a buy-to-let or investments, we can work out whether Capital Gains Tax is due and explain how and when to report it.",
      situation: [
        "Selling a second property, a buy-to-let or a portfolio of shares can raise questions about Capital Gains Tax: whether it is due, how much it might be and how to report it.",
        "Records of what you paid, what you spent on improvements and when you lived in a property make those questions far easier to answer, whether the sale is now or in the future.",
      ],
      challenges: [
        "Working out whether Capital Gains Tax is due on a sale",
        "Finding records of what you paid and what you spent on improvements",
        "Understanding the reporting deadlines for property sales",
        "Keeping clear records of investments and other assets",
      ],
      services: [
        { slug: "capital-gains-tax", why: "The gain and any tax due calculated, with the working for each figure." },
      ],
      remote:
        "We work remotely, so you can speak to us by phone or video from anywhere in the UK, without visiting an office.",
      faqs: [
        {
          question: "Can you help with other personal tax questions?",
          answer: [
            "Contact us with the details of your situation. We will tell you whether it falls within the services we provide.",
          ],
        },
        {
          question: "I have sold a property. How soon should I get in touch?",
          answer: [
            "As soon as you can, ideally when the sale is agreed. Gains on UK residential property usually have to be reported within a short time of completion, so an early start helps.",
          ],
        },
      ],
    },
  },
];

export const confirmedAudiences = audiences.filter((a) => a.status === "confirmed");

export function findConfirmedAudience(slug: string): Audience | undefined {
  return confirmedAudiences.find((audience) => audience.slug === slug);
}
