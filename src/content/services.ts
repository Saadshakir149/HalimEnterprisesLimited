/*
 * DRAFT – awaiting client approval (page copy)
 *
 * Services, from CLAUDE.md section 3. Only "confirmed" services may appear in
 * navigation, listings, routes, the sitemap or forms. "pending" services stay
 * here, unrendered, until the client confirms them. Do not add services that
 * CLAUDE.md does not list.
 *
 * Copy rules (CLAUDE.md section 4): no guarantees, qualifications, client
 * numbers or results. Tax statements stay general. Any figure or deadline is
 * marked `// VERIFY`.
 *
 * Filing on a client's behalf: Companies House now expects third parties who
 * file for others to be registered Authorised Corporate Service Providers,
 * which depends on AML supervision (unconfirmed, CLAUDE.md section 11). So
 * copy says "we help you prepare" rather than "we file for you" until the
 * client confirms their status. See docs/OPEN-ITEMS.md.
 *
 * Revised 18 October 2026: each page rewritten for its own purpose; page
 * titles carry no brand (the layout adds " | Halim Enterprises Limited").
 */

import type { IconName } from "@/components/ui/Icon";
import type { AudienceSlug } from "@/content/audiences";
import type { QuestionAnswer } from "@/content/faqs";
import { site } from "@/content/site";
import { listWithAnd, listWithOr } from "@/lib/lists";

export type ContentStatus = "confirmed" | "pending";

export type ServiceSlug =
  | "bookkeeping"
  | "vat-returns"
  | "annual-accounts"
  | "payroll"
  | "company-formation"
  | "business-plans-and-forecasts"
  | "capital-gains-tax";

export type PendingServiceSlug = "self-assessment" | "corporation-tax" | "making-tax-digital";

export type ProcessStep = {
  readonly title: string;
  readonly text: string;
};

export type ServicePage = {
  /** The page topic for the <title>, without the brand (the layout adds it) */
  readonly metaTitle: string;
  /** Around 150 characters */
  readonly metaDescription: string;
  /** One or two sentences under the h1 */
  readonly intro: string;
  readonly whoFor: readonly string[];
  /** 5–8 concrete items */
  readonly included: readonly string[];
  /** 3–4 steps */
  readonly steps: readonly ProcessStep[];
  /** Practical document checklist */
  readonly needFromYou: readonly string[];
  /** 3–4 service-specific questions */
  readonly faqs: readonly QuestionAnswer[];
  readonly relatedServices: readonly ServiceSlug[];
  readonly relatedAudiences: readonly AudienceSlug[];
};

type ServiceBase = {
  readonly title: string;
  /** One line, used in navigation panels and compact lists */
  readonly tagline: string;
  readonly summary: string;
  readonly icon: IconName;
  /** Bookkeeping and VAT returns are shown first and larger. */
  readonly priority?: boolean;
};

export type ConfirmedService = ServiceBase & {
  readonly slug: ServiceSlug;
  readonly status: "confirmed";
  readonly page: ServicePage;
};

export type PendingService = ServiceBase & {
  readonly slug: PendingServiceSlug;
  readonly status: "pending";
};

export type Service = ConfirmedService | PendingService;

const packages = listWithAnd(site.software);
const packagesOr = listWithOr(site.software);
const captureApps = listWithOr(site.tools);

export const services: readonly Service[] = [
  {
    slug: "bookkeeping",
    title: "Bookkeeping",
    tagline: "Records kept up to date in your accounting software",
    summary:
      "Sales, expenses and bank transactions recorded and reconciled monthly or quarterly, ready for VAT returns and year-end accounts.",
    status: "confirmed",
    icon: "book-open",
    priority: true,
    page: {
      metaTitle: "Bookkeeping Services for Small Businesses",
      metaDescription: `Bookkeeping for UK sole traders and small businesses: transactions recorded and bank accounts reconciled in ${packagesOr}.`,
      intro:
        "We record your income and expenses, reconcile your bank accounts and keep your books up to date through the year, so your records are ready when a VAT return or year-end falls due.",
      whoFor: [
        "Sole traders and small businesses who want their bookkeeping done regularly by someone else, rather than in the evenings or the week before a deadline.",
        "We can take over records already kept in accounting software, or bring together receipts, spreadsheets and bank statements and set up a system first.",
      ],
      included: [
        "Recording sales, purchases and expenses in your accounting software",
        "Reconciling business bank and credit card accounts",
        "Tracking money owed to you and bills you owe",
        `Matching receipts and invoices to transactions, including those captured with ${captureApps}`,
        "Listing missing receipts and unexplained transactions for you to resolve",
        "A periodic summary of income, expenses and outstanding items",
        "Records kept ready for VAT returns and year-end accounts",
      ],
      steps: [
        {
          title: "Free consultation",
          text: "We look at how your records are kept now, how many transactions you have and how often you want them updated.",
        },
        {
          title: "Set-up or catch-up",
          text: "We set up your accounting software, or bring existing records up to date, before regular work begins.",
        },
        {
          title: "Regular bookkeeping",
          text: "We update your books on the agreed schedule, usually monthly or quarterly.",
        },
        {
          title: "Summary and queries",
          text: "After each update we send a short summary and a list of anything we need from you.",
        },
      ],
      needFromYou: [
        "Access to your accounting software, or the name of the one you would like to use",
        "Business bank and credit card statements, or a bank feed connection",
        "Sales invoices, plus receipts for purchases and expenses",
        "Details of any loans, finance or hire purchase agreements",
        "A note of anything unusual, such as a large one-off payment",
      ],
      faqs: [
        {
          question: "How often will you update my books?",
          answer: [
            "Monthly or quarterly are the usual choices. We suggest a schedule in your consultation, based on the number of transactions and whether you are VAT registered.",
          ],
        },
        {
          question: "My records are behind. Can you help me catch up?",
          answer: [
            "Yes. We can bring your records up to date before regular bookkeeping starts. We assess what is outstanding during your consultation and include the catch-up work in your quote.",
          ],
        },
        {
          question: "Do I need to use accounting software?",
          answer: [
            `We work with ${packages}. If you are VAT registered, Making Tax Digital rules already require your VAT records to be kept digitally.`,
            "If you do not use accounting software yet, we can recommend a package during your consultation.",
          ],
        },
        {
          question: "Will I still be able to see my figures?",
          answer: [
            "Yes. Your records are kept in accounting software you can log in to at any time, so you can see your figures without waiting for us.",
          ],
        },
      ],
      relatedServices: ["vat-returns", "annual-accounts", "payroll"],
      relatedAudiences: ["sole-traders", "startups", "ecommerce-sellers", "hospitality"],
    },
  },
  {
    slug: "vat-returns",
    title: "VAT returns",
    tagline: "Prepared and submitted through MTD-compatible software",
    summary:
      "VAT returns prepared from your records, reviewed with you and submitted through Making Tax Digital-compatible software.",
    status: "confirmed",
    icon: "receipt",
    priority: true,
    page: {
      metaTitle: "VAT Return Services for UK Businesses",
      metaDescription:
        "VAT returns prepared from your records, reviewed with you before submission and filed through Making Tax Digital-compatible software. Remote, UK-wide.",
      intro:
        "We prepare each VAT return from your bookkeeping records, go through the figures with you and submit the return through Making Tax Digital-compatible software once you have approved it.",
      whoFor: [
        "VAT-registered businesses that want each return prepared from reconciled records and checked before it is submitted.",
        "Businesses approaching the registration threshold, or newly registered, that need to understand what changes once they charge VAT.",
      ],
      included: [
        "Checking the VAT treatment of your sales and purchases",
        "Preparing each return from your bookkeeping records",
        "Reconciling your VAT account so the return ties back to your books",
        "Reviewing the figures with you before the return is submitted",
        "Submitting the return through Making Tax Digital-compatible software",
        "Confirming the VAT due, or the amount you can reclaim",
        "A reminder as each return period comes round",
      ],
      steps: [
        {
          title: "Review your position",
          text: "We look at your VAT registration, the scheme you use and how your records are kept.",
        },
        {
          title: "Prepare the return",
          text: "We prepare the return from your records and investigate anything that looks out of line.",
        },
        {
          title: "You approve it",
          text: "We send you the figures and the transactions behind them. Nothing is submitted until you approve the return.",
        },
        {
          title: "Submit and keep a record",
          text: "The approved return is submitted through MTD-compatible software, and you keep a copy of what was filed.",
        },
      ],
      needFromYou: [
        "Your VAT registration number and the dates of your return periods",
        "Access to your accounting software, or your bookkeeping records for the period",
        "Sales and purchase invoices for the period",
        "Details of any VAT scheme you use, such as the Flat Rate Scheme",
        "Any letters or notices from HMRC about your VAT",
      ],
      faqs: [
        {
          question: "What is Making Tax Digital for VAT?",
          answer: [
            `Making Tax Digital is HMRC’s requirement for VAT-registered businesses to keep digital records and submit VAT returns using compatible software. ${packages} all support it.`,
          ],
        },
        {
          question: "Should I register for VAT?",
          answer: [
            "Registration becomes compulsory once your taxable turnover exceeds the VAT registration threshold, and some businesses choose to register earlier. Whether that makes sense depends on who your customers are and what you buy. We can review your position during your consultation.",
          ],
        },
        {
          question: "Can you help me choose a VAT scheme?",
          answer: [
            "We can explain how schemes such as the Flat Rate Scheme and cash accounting work, and set out the figures so you can see whether one might suit you. The decision is yours.",
          ],
        },
        {
          question: "Can you help if a VAT return was late or wrong?",
          answer: [
            "Yes. Tell us what happened and we will look at the correct way to put it right, including whether an error can be corrected on a later return.",
          ],
        },
      ],
      relatedServices: ["bookkeeping", "annual-accounts"],
      relatedAudiences: ["sole-traders", "ecommerce-sellers", "hospitality", "startups"],
    },
  },
  {
    slug: "annual-accounts",
    title: "Annual accounts",
    tagline: "Year-end accounts prepared from your records",
    summary:
      "Year-end accounts, and statutory accounts for limited companies, prepared from your records and reviewed with you before approval.",
    status: "confirmed",
    icon: "file-text",
    page: {
      metaTitle: "Annual Accounts for Small Businesses",
      metaDescription:
        "Year-end and statutory accounts prepared from your bookkeeping records, reviewed with you before approval and prepared ready to file. Remote, UK-wide.",
      intro:
        "We prepare your year-end accounts from your bookkeeping records, make the necessary adjustments and go through the results with you before the accounts are finalised.",
      // Client to confirm: limited companies are not one of the brief's five audiences (docs/OPEN-ITEMS.md)
      whoFor: [
        "Limited companies, which must prepare statutory accounts every year and file them with Companies House.",
        "Sole traders who need a reliable set of year-end figures, to work out their profit or to support a loan or mortgage application.",
      ],
      included: [
        "Reviewing your bookkeeping records for the year",
        "Year-end adjustments such as accruals, prepayments and depreciation",
        "A profit and loss account and balance sheet",
        "Statutory accounts in the format required for limited companies",
        "A review of the draft accounts with you before they are finalised",
        "Accounts prepared ready to file, with the filing steps explained",
      ],
      steps: [
        {
          title: "Agree the year-end",
          text: "We confirm your accounting period and which records are available.",
        },
        {
          title: "Review and adjust",
          text: "We check the year’s records and make the year-end adjustments.",
        },
        {
          title: "Draft and review",
          text: "We prepare draft accounts and go through them with you, including any figure you want to question.",
        },
        {
          title: "Approve and file",
          text: "Once you approve the accounts they are ready to file, and we explain how the filing is done.",
        },
      ],
      needFromYou: [
        "Your bookkeeping records for the year, or access to your accounting software",
        "Bank statements covering the whole accounting period",
        "Details of equipment, vehicles or other assets bought or sold during the year",
        "Loan, lease and hire purchase agreements",
        "A list of money owed to and by the business at the year-end",
        "Last year’s accounts, if you have them",
      ],
      faqs: [
        {
          question: "When are my company’s accounts due?",
          answer: [
            // VERIFY: 9-month filing deadline for private companies (first accounts can differ)
            "A private limited company usually has nine months from the end of its financial year to file accounts with Companies House. A company’s first accounts can have a different deadline. We confirm your dates when we start.",
          ],
        },
        {
          question: "Do sole traders need annual accounts?",
          answer: [
            "Sole traders do not file accounts with Companies House, but they still need accurate figures for the year to work out their profit. A full set of accounts also helps with a loan or mortgage application.",
          ],
        },
        {
          question: "Can you prepare accounts if my bookkeeping is not up to date?",
          answer: [
            "Yes. We bring the records up to date first, then prepare the accounts. We assess what is needed during your consultation and include it in your quote.",
          ],
        },
      ],
      relatedServices: ["bookkeeping", "vat-returns", "business-plans-and-forecasts"],
      relatedAudiences: ["sole-traders", "startups", "ecommerce-sellers", "hospitality"],
    },
  },
  {
    slug: "payroll",
    title: "Payroll",
    tagline: "Pay calculations, payslips and RTI submissions",
    summary:
      "Payroll run each pay period, with payslips, RTI submissions to HMRC and the figures your pension provider needs.",
    status: "confirmed",
    icon: "wallet",
    page: {
      metaTitle: "Payroll Services for Small Employers",
      metaDescription:
        "Payroll for small employers: pay, tax and National Insurance calculated each pay period, payslips issued and RTI submissions made to HMRC. Remote, UK-wide.",
      intro:
        "We calculate your payroll each pay period, issue payslips and make the Real Time Information submissions HMRC requires.",
      whoFor: [
        "Small employers, from a business taking on its first member of staff to a team with regular weekly or monthly pay runs.",
        "Directors of limited companies who pay themselves a salary through payroll.",
      ],
      included: [
        "Calculating pay, tax and National Insurance for each pay period",
        "Payslips for every employee",
        "Real Time Information (RTI) submissions to HMRC each time you pay staff",
        "Workplace pension deductions, and the figures your pension provider needs",
        "Statutory payments such as sick pay and maternity pay",
        "New starters and leavers, including P45s",
        "Year-end payroll tasks, including P60s for your employees",
      ],
      steps: [
        {
          title: "Set up",
          text: "We set up payroll for your business, or take over from your current arrangement, and help you register as an employer if you have not already.",
        },
        {
          title: "Each pay period",
          text: "You tell us about hours, overtime, starters and leavers, and we calculate the payroll.",
        },
        {
          title: "Review and pay",
          text: "We send you payslips and a summary of what to pay your staff and HMRC, for you to check and pay.",
        },
        {
          title: "Report",
          text: "We make the RTI submissions to HMRC and keep your payroll records up to date.",
        },
      ],
      needFromYou: [
        "Your PAYE reference and Accounts Office reference, if you are already registered as an employer",
        "Each employee’s details, including their National Insurance number and starter information",
        "Pay rates, hours, overtime, bonuses or commission for each pay period",
        "Details of your workplace pension scheme",
        "P45s from new starters who have them",
      ],
      faqs: [
        {
          question: "I’m taking on my first employee. Where do I start?",
          answer: [
            "You will usually need to register as an employer with HMRC before the first payday, set up payroll and check your workplace pension duties. We can take you through each step.",
          ],
        },
        {
          question: "Can you run payroll for just one director?",
          answer: [
            "Yes. If you pay yourself a salary from your company, we can set up payroll for you alone and run it on the schedule that suits you.",
          ],
        },
        {
          question: "What do I need to tell you each pay period?",
          answer: [
            "Anything that has changed: new starters, leavers, pay rises, overtime, sickness or holiday. If nothing has changed, a short confirmation is enough.",
          ],
        },
        {
          question: "Do you handle workplace pensions?",
          answer: [
            "We calculate pension deductions in payroll and give you the figures your pension provider needs. The pension scheme itself stays with the provider you choose.",
          ],
        },
      ],
      relatedServices: ["bookkeeping", "company-formation", "annual-accounts"],
      relatedAudiences: ["hospitality", "startups", "sole-traders"],
    },
  },
  {
    slug: "company-formation",
    title: "Company formation",
    tagline: "Help setting up a limited company",
    summary:
      "Help preparing a limited company application for Companies House, and with the registrations and records that follow.",
    status: "confirmed",
    icon: "building",
    page: {
      metaTitle: "Help Setting Up a Limited Company",
      metaDescription:
        "Help preparing your limited company application for Companies House, then putting bank, HMRC and bookkeeping arrangements in place. Remote, UK-wide.",
      intro:
        "We help you prepare the information Companies House needs to register your company, then help you put the bank account, HMRC registrations and bookkeeping in place.",
      whoFor: [
        "Sole traders considering a move to a limited company, and people starting a new business who have decided a company is the right structure.",
        "If you are not yet sure whether a company suits you, we can discuss the options in your free consultation.",
      ],
      included: [
        "Going through the information Companies House needs",
        "Help choosing a company name and checking it is available",
        "Guidance on directors, shareholders and how the shares are split",
        "Choosing a registered office address and the right business activity (SIC) code",
        // VERIFY: Companies House identity verification for directors and PSCs
        "Explaining identity verification for directors and people with significant control",
        "A checklist of what to set up once the company is registered",
        "Bookkeeping set up from the first transaction",
      ],
      steps: [
        {
          title: "Plan",
          text: "We go through your plans and what the company needs: a name, directors, shareholders and addresses.",
        },
        {
          title: "Prepare",
          text: "We help you gather the details and prepare the application to Companies House.",
        },
        {
          title: "Registration",
          text: "Once Companies House registers the company, you receive a certificate of incorporation and your company number.",
        },
        {
          title: "Next steps",
          text: "We help with what follows: a business bank account, HMRC registrations and your bookkeeping.",
        },
      ],
      needFromYou: [
        "Your preferred company name, plus an alternative in case it is taken",
        "Names, addresses and dates of birth of the directors and shareholders",
        "How the shares will be divided between shareholders",
        "An address to use as the company’s registered office",
        "A short description of what the business will do",
        // VERIFY: Companies House identity verification requirement
        "Confirmation that each director has verified their identity with Companies House, or is ready to",
      ],
      faqs: [
        {
          question: "Do you register the company for me?",
          answer: [
            "We help you prepare everything Companies House needs and take you through the application step by step. You see and approve every detail before it is submitted.",
          ],
        },
        {
          question: "Should I set up a limited company?",
          answer: [
            "It depends on your income, your plans and your circumstances. A company gives you limited liability, but it also brings more administration and legal responsibilities as a director. We can review your situation in your free consultation.",
          ],
        },
        {
          question: "What happens after the company is set up?",
          answer: [
            "You will need a business bank account, registrations with HMRC and a bookkeeping system. We give you a checklist and can help with each step.",
          ],
        },
      ],
      relatedServices: ["bookkeeping", "payroll", "business-plans-and-forecasts"],
      relatedAudiences: ["startups", "sole-traders"],
    },
  },
  {
    slug: "business-plans-and-forecasts",
    title: "Business plans and forecasts",
    tagline: "Cash-flow forecasts and business plans",
    summary:
      "Business plans and month-by-month cash-flow forecasts, built on assumptions agreed with you, for a lender, an investor or your own planning.",
    status: "confirmed",
    icon: "presentation",
    page: {
      metaTitle: "Business Plans and Cash-Flow Forecasts",
      metaDescription:
        "Business plans and month-by-month cash-flow forecasts built on assumptions agreed with you, for lenders, investors or internal planning. Remote, UK-wide.",
      intro:
        "We prepare business plans and cash-flow forecasts that show the financial effect of your plans, built on assumptions you have agreed and can explain.",
      whoFor: [
        "Businesses applying for a loan or investment that need a plan and forecast to support the application.",
        "Owners planning a new hire, a second site or a quieter season who want to see the effect on cash before committing.",
      ],
      included: [
        "A discussion of your goals, your market and your plans",
        "Agreeing the assumptions behind the numbers with you",
        "A month-by-month cash-flow forecast",
        "A projected profit and loss account",
        "A written business plan, or help structuring your own",
        "Scenarios showing the effect of higher or lower sales",
        "A walk-through of the figures, so you can present them yourself",
      ],
      steps: [
        {
          title: "Understand the purpose",
          text: "We find out who the plan is for and what it needs to show.",
        },
        {
          title: "Agree the assumptions",
          text: "We work through sales, costs and timing with you, so the numbers reflect how your business operates.",
        },
        {
          title: "Build the forecast",
          text: "We prepare the forecast and plan, and check that the figures are consistent with each other.",
        },
        {
          title: "Review together",
          text: "We go through it with you and adjust it until you are ready to present it.",
        },
      ],
      needFromYou: [
        "Any recent accounts or bookkeeping records",
        "Your plans: what you want to do, and when",
        "Expected prices, sales volumes and main costs",
        "Details of existing loans, finance and other commitments",
        "Any format or information the lender or investor has asked for",
      ],
      faqs: [
        {
          question: "Will a business plan get me a loan?",
          answer: [
            "No one can promise that. Lenders and investors make their own decisions. A well-prepared plan with realistic numbers helps you present your case.",
          ],
        },
        {
          question: "I’m a new business with no figures yet. Can you still help?",
          answer: [
            "Yes. We build the forecast from your plans and research, and set out the assumptions so anyone reading it can see where the numbers come from.",
          ],
        },
        {
          question: "Can you update the forecast later?",
          answer: [
            "Yes. A forecast is most useful when it is compared with actual results. We can update yours as the business develops.",
          ],
        },
      ],
      relatedServices: ["bookkeeping", "company-formation", "annual-accounts"],
      relatedAudiences: ["startups", "hospitality", "ecommerce-sellers"],
    },
  },
  {
    slug: "capital-gains-tax",
    title: "Capital Gains Tax",
    tagline: "Gains calculated and reporting explained",
    summary: "Help calculating Capital Gains Tax and reporting gains when you sell property, shares or other assets.",
    status: "confirmed",
    icon: "trending-up",
    page: {
      metaTitle: "Capital Gains Tax Help",
      metaDescription:
        "Help calculating and reporting Capital Gains Tax when you sell or give away property, shares or other assets, with every figure documented.",
      intro:
        "We help you work out whether Capital Gains Tax is due when you sell or give away an asset, how much it may be, and how and when to report it.",
      whoFor: [
        "People who have sold, or are about to sell, a property that is not their main home, such as a buy-to-let or a second home.",
        "Anyone who has sold shares, investments or other valuable assets and needs to know whether tax is due.",
      ],
      included: [
        "Working out the gain from your purchase and sale records",
        "Including allowable costs, such as buying and selling fees and improvements",
        "Checking which reliefs and exemptions may apply",
        "Calculating how much tax may be due",
        "Explaining how and when the gain needs to be reported to HMRC",
        "A documented record of the calculation for your files",
      ],
      steps: [
        {
          title: "Tell us about the sale",
          text: "We find out what you sold, when you bought it and how you have used it.",
        },
        {
          title: "Gather the figures",
          text: "We collect the purchase and sale details, costs and any spending on improvements.",
        },
        {
          title: "Calculate",
          text: "We work out the gain and any tax due, and set out how each figure was reached.",
        },
        {
          title: "Report",
          text: "We explain how and when to report and pay, and help you with the report itself.",
        },
      ],
      needFromYou: [
        "Completion statements for the purchase and the sale",
        "Records of buying and selling costs, such as legal and estate agent fees",
        "Receipts for improvements, such as an extension (repairs and maintenance do not count)",
        "For shares, contract notes or statements showing purchase and sale prices",
        "The dates of any periods you lived in the property, if it was ever your home",
      ],
      faqs: [
        {
          question: "When do I need to report a gain on a UK property?",
          answer: [
            // VERIFY: 60-day reporting and payment window for UK residential property
            "If you sell a UK residential property and Capital Gains Tax is due, you usually need to report it and pay within 60 days of completion. Contacting us as soon as a sale is agreed gives the most time to prepare.",
          ],
        },
        {
          question: "Do I pay Capital Gains Tax when I sell my home?",
          answer: [
            "Usually not, if it has been your main home for the whole time you owned it. It can be more complicated if you let it out, used part of it only for business, or had more than one home. Contact us with the details of your situation.",
          ],
        },
        {
          question: "Can you reduce the tax I pay?",
          answer: [
            "We include every cost and relief you are entitled to claim, but we cannot promise a particular result. The tax due depends on the facts of your sale.",
          ],
        },
        {
          question: "I sold something in an earlier year and did not report it. What now?",
          answer: [
            "Contact us. We can review what happened and explain the options for putting it right with HMRC.",
          ],
        },
      ],
      relatedServices: ["bookkeeping", "annual-accounts"],
      relatedAudiences: ["individuals", "sole-traders"],
    },
  },

  // Pending client confirmation: never rendered
  {
    slug: "self-assessment",
    title: "Self Assessment tax returns",
    tagline: "Personal tax returns, prepared and filed",
    summary: "Personal tax returns for sole traders, landlords and individuals.",
    status: "pending",
    icon: "user",
  },
  {
    slug: "corporation-tax",
    title: "Corporation Tax",
    tagline: "Company tax returns prepared and filed",
    summary: "Corporation Tax computations and returns for limited companies.",
    status: "pending",
    icon: "landmark",
  },
  {
    slug: "making-tax-digital",
    title: "Making Tax Digital",
    tagline: "Digital records and quarterly updates",
    summary: "Help getting ready for, and keeping up with, Making Tax Digital.",
    status: "pending",
    icon: "calculator",
  },
];

export const confirmedServices = services.filter((s): s is ConfirmedService => s.status === "confirmed");

export function findConfirmedService(slug: string): ConfirmedService | undefined {
  return confirmedServices.find((service) => service.slug === slug);
}
