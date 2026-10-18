/*
 * Documentation data for /styleguide only. The hex values here are labels that
 * mirror src/app/globals.css (the single source of truth); styling always goes
 * through the Tailwind classes. Update both together.
 *
 * Contrast ratios are WCAG 2.x relative-luminance ratios, calculated from the
 * hex values below. Text needs 4.5:1 (AA) or 7:1 (AAA); large text and UI
 * boundaries such as borders and focus rings need 3:1.
 */

export type ColourToken = {
  name: string;
  token: string;
  hex: string;
  swatch: string;
  use: string;
};

export const colourGroups: { title: string; colours: ColourToken[] }[] = [
  {
    title: "Brand and text (CLAUDE.md section 8)",
    colours: [
      { name: "Navy", token: "navy", hex: "#172B4D", swatch: "bg-navy", use: "Headings, primary buttons, footer" },
      { name: "Ink", token: "ink", hex: "#1B2433", swatch: "bg-ink", use: "Body text" },
      { name: "Muted", token: "muted", hex: "#5A6472", swatch: "bg-muted", use: "Secondary text, hints, captions" },
      { name: "Teal", token: "teal", hex: "#287D72", swatch: "bg-teal", use: "Links, eyebrows, focus ring" },
    ],
  },
  {
    title: "Surfaces and rules (CLAUDE.md section 8)",
    colours: [
      { name: "Paper", token: "paper", hex: "#FAF8F4", swatch: "bg-paper", use: "Page background" },
      { name: "Surface", token: "surface", hex: "#FFFFFF", swatch: "bg-surface", use: "Alternate sections, cards, form fields" },
      { name: "Line", token: "line", hex: "#E4E1D9", swatch: "bg-line", use: "Hairline dividers, card borders" },
      { name: "Teal soft", token: "teal-soft", hex: "#D9E6E2", swatch: "bg-teal-soft", use: "Accent fills, ledger margin rule" },
    ],
  },
  {
    title: "Derived shades",
    colours: [
      { name: "Navy hover", token: "navy-hover", hex: "#22396A", swatch: "bg-navy-hover", use: "Primary button hover" },
      { name: "Teal hover", token: "teal-hover", hex: "#1F6359", swatch: "bg-teal-hover", use: "Link hover; text on teal soft" },
      { name: "Teal on dark", token: "teal-on-dark", hex: "#8DD3C8", swatch: "bg-teal-on-dark", use: "Focus ring and accents on navy" },
      { name: "Line strong", token: "line-strong", hex: "#867E71", swatch: "bg-line-strong", use: "Form field borders (3:1)" },
      { name: "Disabled", token: "disabled", hex: "#E9E5DD", swatch: "bg-disabled", use: "Disabled fills" },
    ],
  },
  {
    title: "On navy",
    colours: [
      { name: "On navy", token: "on-navy", hex: "#F7F5F0", swatch: "bg-on-navy", use: "Text on navy" },
      { name: "On navy muted", token: "on-navy-muted", hex: "#BCC6D6", swatch: "bg-on-navy-muted", use: "Secondary text and outlines on navy" },
      { name: "On navy line", token: "on-navy-line", hex: "#33476B", swatch: "bg-on-navy-line", use: "Hairlines on navy (decorative)" },
    ],
  },
  {
    title: "Feedback",
    colours: [
      { name: "Danger", token: "danger", hex: "#A3361F", swatch: "bg-danger", use: "Error text and borders" },
      { name: "Danger soft", token: "danger-soft", hex: "#F7E7E2", swatch: "bg-danger-soft", use: "Error field tint (at 40%)" },
    ],
  },
];

export type ContrastRow = {
  sample: string;
  pairing: string;
  use: string;
  ratio: number;
  kind: "text" | "ui";
  /** A pairing deliberately avoided; listed to explain a design decision */
  avoided?: boolean;
};

export const contrastRows: ContrastRow[] = [
  { sample: "text-ink bg-paper", pairing: "Ink on paper", use: "Body text", ratio: 14.7, kind: "text" },
  { sample: "text-ink bg-surface", pairing: "Ink on surface", use: "Body text, input text", ratio: 15.59, kind: "text" },
  { sample: "text-navy bg-paper", pairing: "Navy on paper", use: "Headings", ratio: 13.29, kind: "text" },
  { sample: "text-navy bg-surface", pairing: "Navy on surface", use: "Headings, on-dark button hover", ratio: 14.1, kind: "text" },
  { sample: "text-muted bg-paper", pairing: "Muted on paper", use: "Secondary text", ratio: 5.66, kind: "text" },
  { sample: "text-muted bg-surface", pairing: "Muted on surface", use: "Secondary text, placeholders", ratio: 6.0, kind: "text" },
  { sample: "text-teal bg-paper", pairing: "Teal on paper", use: "Links, eyebrows", ratio: 4.64, kind: "text" },
  { sample: "text-teal bg-surface", pairing: "Teal on surface", use: "Links, eyebrows", ratio: 4.92, kind: "text" },
  { sample: "text-teal-hover bg-paper", pairing: "Teal hover on paper", use: "Link hover", ratio: 6.63, kind: "text" },
  { sample: "text-teal-hover bg-teal-soft", pairing: "Teal hover on teal soft", use: "Accent badge", ratio: 5.48, kind: "text" },
  { sample: "text-teal bg-teal-soft", pairing: "Teal on teal soft", use: "Not used for text: why badges use teal hover", ratio: 3.84, kind: "text", avoided: true },
  { sample: "text-on-navy bg-navy", pairing: "On navy on navy", use: "Primary button, dark sections", ratio: 12.94, kind: "text" },
  { sample: "text-on-navy bg-navy-hover", pairing: "On navy on navy hover", use: "Primary button hover", ratio: 10.35, kind: "text" },
  { sample: "text-on-navy-muted bg-navy", pairing: "On navy muted on navy", use: "Secondary text on navy", ratio: 8.18, kind: "text" },
  { sample: "text-teal-on-dark bg-navy", pairing: "Teal on dark on navy", use: "Eyebrows and links on navy", ratio: 8.25, kind: "text" },
  { sample: "text-navy bg-on-navy", pairing: "Navy on on-navy", use: "On-dark button", ratio: 12.94, kind: "text" },
  { sample: "text-danger bg-paper", pairing: "Danger on paper", use: "Error messages", ratio: 6.38, kind: "text" },
  { sample: "text-ink bg-danger-soft/40", pairing: "Ink on error tint", use: "Input text, error state", ratio: 14.47, kind: "text" },
  { sample: "text-muted bg-disabled", pairing: "Muted on disabled", use: "Disabled controls (exempt, still passes)", ratio: 4.78, kind: "text" },
  { sample: "border-2 border-line-strong bg-surface", pairing: "Line strong on surface", use: "Input border", ratio: 4.01, kind: "ui" },
  { sample: "border-2 border-line-strong bg-paper", pairing: "Line strong on paper", use: "Input border on paper", ratio: 3.78, kind: "ui" },
  { sample: "border-2 border-on-navy-muted bg-navy", pairing: "On navy muted on navy", use: "Outline-on-dark button border", ratio: 8.18, kind: "ui" },
  { sample: "border-2 border-teal bg-paper", pairing: "Teal on paper", use: "Focus ring", ratio: 4.64, kind: "ui" },
  { sample: "border-2 border-teal-on-dark bg-navy", pairing: "Teal on dark on navy", use: "Focus ring on navy", ratio: 8.25, kind: "ui" },
  { sample: "border-2 border-teal bg-navy", pairing: "Teal on navy", use: "Not used: why the ring switches on navy", ratio: 2.87, kind: "ui", avoided: true },
];

export const typeScale = [
  { token: "display", spec: "40–68px · 1.05 · Serif 600", className: "font-serif text-display text-navy", sample: "Books in order, all year round" },
  { token: "h1", spec: "34–52px · 1.1 · Serif 600", className: "font-serif text-h1 text-navy", sample: "Bookkeeping that keeps pace with your business" },
  { token: "h2", spec: "28–40px · 1.15 · Serif 600", className: "font-serif text-h2 text-navy", sample: "VAT returns, prepared and explained" },
  { token: "h3", spec: "22–28px · 1.25 · Serif 600", className: "font-serif text-h3 text-navy", sample: "What we’ll need from you" },
  { token: "h4", spec: "20px · 1.35 · Serif 600", className: "font-serif text-h4 text-navy", sample: "Bank statements, receipts and invoices" },
  { token: "lead", spec: "18–21px · 1.6 · Sans 400", className: "text-lead text-ink", sample: "We keep your records tidy throughout the year, so quarter-end and year-end become routine rather than a scramble." },
  { token: "body", spec: "17px · 1.65 · Sans 400", className: "text-body text-ink", sample: "Each month we reconcile your bank feeds, categorise transactions and flag anything that needs your attention. You get a short summary of income, expenses and anything still outstanding." },
  { token: "small", spec: "15px · 1.55 · Sans 400", className: "text-small text-ink", sample: "Records are kept in Xero, QuickBooks or Sage, whichever suits your business." },
  { token: "caption", spec: "13px · 1.45 · Sans 600", className: "text-caption font-semibold tracking-[0.14em] text-teal uppercase", sample: "Free initial consultation by phone or video" },
] as const;
