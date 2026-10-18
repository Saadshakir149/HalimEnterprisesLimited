import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Field } from "@/components/ui/Field";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Section, type SectionTone } from "@/components/ui/Section";
import { Lead, Text } from "@/components/ui/Text";
import { Wordmark } from "@/components/ui/Wordmark";
import { confirmedServices, services } from "@/content/services";
import { cn } from "@/lib/utils";
import { colourGroups, contrastRows, typeScale, type ContrastRow } from "./tokens";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const contents = [
  { id: "colour", label: "Colour" },
  { id: "contrast", label: "Contrast" },
  { id: "type", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "objects", label: "Cards, badges, rules" },
  { id: "forms", label: "Forms" },
  { id: "wordmark", label: "Wordmark" },
  { id: "tones", label: "Section tones" },
];

function number(id: string): string {
  return String(contents.findIndex((c) => c.id === id) + 1).padStart(2, "0");
}

function GuideSection({ id, title, intro, children }: { id: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6 border-t border-line py-section-sm">
      <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        <header className="flex flex-col gap-3 lg:sticky lg:top-8 lg:self-start">
          <Eyebrow className="figures">{number(id)}</Eyebrow>
          <Heading level={2} size="h3" id={`${id}-title`}>
            {title}
          </Heading>
          <Text size="small" muted>
            {intro}
          </Text>
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <Heading level={3} size="h4" className="mb-4 font-sans text-small font-bold tracking-[0.08em] text-ink uppercase">
      {children}
    </Heading>
  );
}

function StateLabel({ children }: { children: ReactNode }) {
  return <span className="text-caption text-muted in-data-[tone=navy]:text-on-navy-muted">{children}</span>;
}

function grade(row: ContrastRow): string {
  if (row.avoided) return "Fails · avoided";
  if (row.kind === "ui") return row.ratio >= 3 ? "Pass · UI 3:1" : "Fail";
  if (row.ratio >= 7) return "AAA";
  return row.ratio >= 4.5 ? "AA" : "Fail";
}

/* Static renderings of hover and focus, so every state can be compared side by side */
const hoverClasses: Record<ButtonVariant, string> = {
  primary: "border-navy-hover bg-navy-hover",
  secondary: "bg-navy/6",
  ghost: "text-teal-hover underline",
  "on-dark": "border-surface bg-surface",
  "outline-on-dark": "border-on-navy bg-on-navy/10",
};

function ButtonStates({ variant, label }: { variant: ButtonVariant; label: string }) {
  const ring = variant === "on-dark" || variant === "outline-on-dark" ? "outline-teal-on-dark" : "outline-teal";
  return (
    <div className="flex flex-col gap-4 border-b border-line py-6 first:pt-0 last:border-b-0 in-data-[tone=navy]:border-on-navy-line">
      <p className="text-small font-semibold">{label}</p>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-5">
        <div className="flex flex-col items-start gap-2">
          <Button variant={variant}>Book a consultation</Button>
          <StateLabel>Default (interactive)</StateLabel>
        </div>
        <div className="flex flex-col items-start gap-2" aria-hidden="true">
          <span className={cn(buttonClasses({ variant }), hoverClasses[variant])}>Book a consultation</span>
          <StateLabel>Hover</StateLabel>
        </div>
        <div className="flex flex-col items-start gap-2" aria-hidden="true">
          <span className={cn(buttonClasses({ variant }), "outline-2 outline-offset-3", ring)}>
            Book a consultation
          </span>
          <StateLabel>Focus</StateLabel>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Button variant={variant} disabled>
            Book a consultation
          </Button>
          <StateLabel>Disabled</StateLabel>
        </div>
      </div>
    </div>
  );
}

const iconSet: IconName[] = [
  "book-open", "receipt", "building", "trending-up", "file-text", "calculator", "user",
  "briefcase", "rocket", "shopping-bag", "utensils", "clipboard-list", "check", "arrow-right",
];

const toneDemos: { tone: SectionTone; title: string; body: string }[] = [
  { tone: "paper", title: "Paper", body: "The default page tone. Most content sits here, separated by hairline rules rather than boxes." },
  { tone: "surface", title: "Surface", body: "A slightly deeper warm tone to separate alternating sections without adding borders or shadows." },
  { tone: "navy", title: "Navy", body: "Reserved for one or two moments per page, such as the closing call to action and the footer." },
];

export default function StyleGuidePage() {
  const pendingService = services.find((s) => s.status === "pending");

  return (
    <>
      <Container>
        <header className="flex flex-col gap-10 pt-10 pb-section-sm sm:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Wordmark className="max-w-full h-11" />
            <Badge>Internal · not indexed</Badge>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow>Design system · Iteration 1</Eyebrow>
            <Heading level={1} size="display">
              Style guide
            </Heading>
            <Lead>
              The tokens and base components the site is built from. Calm, precise and approachable:
              a well-kept ledger, with warm paper, navy type, one teal accent and hairline rules.
            </Lead>
          </div>
          <nav aria-label="Style guide contents">
            <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {contents.map((item) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={`#${item.id}`}
                    className="flex min-h-11 items-baseline gap-3 py-3 text-small text-ink transition-colors duration-150 hover:text-teal"
                  >
                    <span className="figures text-caption font-semibold text-teal">{number(item.id)}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        <GuideSection
          id="colour"
          title="Colour"
          intro="The CLAUDE.md section 8 palette (provisional until the client supplies branding), plus derived shades for states and dark backgrounds. Every value is a token in globals.css."
        >
          <div className="flex flex-col gap-10">
            {colourGroups.map((group) => (
              <div key={group.title}>
                <SubHeading>{group.title}</SubHeading>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {group.colours.map((c) => (
                    <li key={c.token} className="overflow-hidden rounded-md border border-line bg-paper">
                      <div className={cn("h-16 border-b border-line", c.swatch)} />
                      <div className="flex flex-col gap-0.5 p-3">
                        <span className="text-small font-semibold text-ink">{c.name}</span>
                        <code className="figures text-caption text-muted">{c.hex}</code>
                        <code className="text-caption text-muted">{c.token}</code>
                        <span className="mt-1 text-caption text-ink">{c.use}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GuideSection>

        <GuideSection
          id="contrast"
          title="Contrast"
          intro="Every text and background pairing used on this page, checked against WCAG 2.2. Text needs 4.5:1; borders and focus rings need 3:1."
        >
          <div
            role="region"
            aria-label="Contrast ratios table"
            tabIndex={0}
            className="overflow-x-auto rounded-md border border-line"
          >
            <table className="figures w-full min-w-xl border-collapse text-left text-small">
              <thead className="bg-surface">
                <tr className="text-caption font-semibold tracking-[0.08em] text-muted uppercase">
                  <th scope="col" className="w-16 px-4 py-3">Sample</th>
                  <th scope="col" className="px-4 py-3">Pairing</th>
                  <th scope="col" className="px-4 py-3 text-right">Ratio</th>
                  <th scope="col" className="px-4 py-3">Result</th>
                </tr>
              </thead>
              <tbody>
                {contrastRows.map((row) => (
                  <tr key={row.pairing + row.use} className="border-t border-line">
                    <td className="px-4 py-2.5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-8 w-12 items-center justify-center rounded-sm font-serif text-body font-semibold",
                          row.kind === "text" && "border border-line",
                          row.sample,
                        )}
                      >
                        {row.kind === "text" ? "Aa" : ""}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="block font-semibold text-ink">{row.pairing}</span>
                      <span className="text-caption text-muted">{row.use}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right whitespace-nowrap text-ink">{row.ratio.toFixed(2)}:1</td>
                    <td className={cn("px-4 py-2.5 font-semibold whitespace-nowrap", row.avoided ? "text-danger" : "text-teal")}>
                      {grade(row)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection
          id="type"
          title="Typography"
          intro="Source Serif 4 for headings, Manrope for text and interface. Sizes are fluid between 360px and 1440px; headings balance their lines."
        >
          <dl className="flex flex-col">
            {typeScale.map((t) => (
              <div
                key={t.token}
                className="grid gap-2 border-b border-line py-6 first:pt-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="flex flex-col gap-0.5">
                  <code className="text-small font-semibold text-ink">text-{t.token}</code>
                  <span className="figures text-caption text-muted">{t.spec}</span>
                </dt>
                <dd className={cn("max-w-measure text-balance", t.className)}>{t.sample}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <SubHeading>Links in running text</SubHeading>
            <Text className="max-w-measure">
              Links keep a light underline at rest, so they never rely on colour alone. It firms up
              on hover and focus: for example, read about{" "}
              <a href="#buttons" className="link-body">
                button states
              </a>{" "}
              or{" "}
              <a href="#forms" className="link-body">
                form fields
              </a>
              .
            </Text>
          </div>
          <div className="mt-10">
            <SubHeading>Tabular figures</SubHeading>
            <Text size="small" muted className="mb-4">
              The <code>figures</code> utility lines numbers up in columns. Illustrative values only.
            </Text>
            <table className="figures w-full max-w-sm text-small">
              <caption className="sr-only">Example of tabular figures</caption>
              <tbody>
                {[
                  ["Sales", "12,480.00"],
                  ["Purchases", "3,915.50"],
                  ["Expenses", "1,102.25"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-line">
                    <th scope="row" className="py-2 text-left font-normal text-ink">{label}</th>
                    <td className="py-2 text-right text-ink">£{value}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="pt-2 text-left font-semibold text-navy">Total</th>
                  <td className="border-b-[3px] border-double border-navy pt-2 text-right font-semibold text-navy">
                    £17,497.75
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection
          id="buttons"
          title="Buttons"
          intro="Four variants, two sizes, at least 44px tall. Hover and focus are shown as static copies; tab to the interactive defaults to see the live ring."
        >
          <div className="flex flex-col">
            <ButtonStates variant="primary" label="Primary" />
            <ButtonStates variant="secondary" label="Secondary" />
            <ButtonStates variant="ghost" label="Ghost" />
          </div>
          <div data-tone="navy" className="mt-6 rounded-md bg-navy p-6 text-on-navy sm:p-8">
            <ButtonStates variant="on-dark" label="On dark" />
            <ButtonStates variant="outline-on-dark" label="Outline on dark" />
          </div>
          <div className="mt-10">
            <SubHeading>Sizes and links</SubHeading>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button href="#forms" variant="secondary" size="lg">
                Link styled as a button
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>
          </div>
        </GuideSection>

        <GuideSection
          id="objects"
          title="Cards, badges, rules"
          intro="Cards are bordered, never shadowed by default. Rules carry most of the structure; the double rule is a ledger total, used sparingly."
        >
          <div className="flex flex-col gap-12">
            <div>
              <SubHeading>Cards</SubHeading>
              <div className="grid gap-4 md:grid-cols-2">
                {confirmedServices.slice(0, 2).map((service) => (
                  <Card key={service.slug} className="flex flex-col gap-4">
                    <Icon name={service.icon} size={24} className="text-teal" />
                    <Heading level={4} className="text-h4">
                      {service.title}
                    </Heading>
                    <Text size="small" muted>
                      {service.summary}
                    </Text>
                  </Card>
                ))}
                {pendingService && (
                  <Card className="flex flex-col gap-4 bg-surface">
                    <div className="flex items-center justify-between gap-4">
                      <Icon name={pendingService.icon} size={24} className="text-muted" />
                      <Badge>Pending</Badge>
                    </div>
                    <Heading level={4}>{pendingService.title}</Heading>
                    <Text size="small" muted>
                      Pending services are kept in the content file but never shown in navigation or
                      listings.
                    </Text>
                  </Card>
                )}
                <Card padding="lg" className="flex flex-col gap-4 md:col-span-2">
                  <Eyebrow>Large padding</Eyebrow>
                  <Heading level={4} size="h3">
                    Your first consultation
                  </Heading>
                  <Divider />
                  <ul className="flex flex-col gap-3 text-small">
                    {["Your business and goals", "Your current bookkeeping setup", "Next steps and a tailored quote"].map(
                      (item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Icon name="check" size={18} className="mt-0.5 text-teal" />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </Card>
              </div>
            </div>

            <div>
              <SubHeading>Badges</SubHeading>
              <div className="flex flex-wrap gap-3">
                <Badge>Neutral</Badge>
                <Badge tone="accent">Accent</Badge>
                <Badge tone="navy">Navy</Badge>
              </div>
            </div>

            <div>
              <SubHeading>Rules</SubHeading>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <StateLabel>Single hairline</StateLabel>
                  <Divider />
                </div>
                <div className="flex flex-col gap-2">
                  <StateLabel>Double rule (ledger total)</StateLabel>
                  <Divider variant="double" />
                </div>
                <div data-tone="navy" className="flex flex-col gap-2 rounded-md bg-navy p-6">
                  <StateLabel>Hairline on navy</StateLabel>
                  <Divider />
                </div>
              </div>
            </div>

            <div>
              <SubHeading>Icons</SubHeading>
              <Text size="small" muted className="mb-4">
                Lucide, 1.5px stroke at every size. Decorative by default.
              </Text>
              <ul className="flex flex-wrap gap-2 text-navy">
                {iconSet.map((name) => (
                  <li key={name} className="flex size-12 items-center justify-center rounded-md border border-line" title={name}>
                    <Icon name={name} size={22} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GuideSection>

        <GuideSection
          id="forms"
          title="Forms"
          intro="Labels are always visible, hints and errors are linked to their field, and errors use colour, an icon and text together."
        >
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
            <Field id="sg-name" label="Full name" hint="As you’d like us to address you." required>
              {(control) => <Input autoComplete="name" {...control} />}
            </Field>
            <Field id="sg-email" label="Email address (shown focused)" required>
              {(control) => (
                <Input
                  type="email"
                  defaultValue="you@example.co.uk"
                  className="border-teal outline-2 outline-offset-3 outline-teal"
                  {...control}
                />
              )}
            </Field>
            <Field id="sg-phone" label="Phone number" error="Enter a UK phone number, like 07700 900123.">
              {(control) => <Input type="tel" defaultValue="0770" {...control} />}
            </Field>
            <Field id="sg-business" label="Business name" hint="Not editable in this example.">
              {(control) => <Input defaultValue="Example Trading Ltd" disabled {...control} />}
            </Field>
            <Field id="sg-service" label="What do you need help with?">
              {(control) => (
                <Select defaultValue="" {...control}>
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {confirmedServices.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                  <option value="not-sure">Not sure yet</option>
                </Select>
              )}
            </Field>
            <Field id="sg-select-disabled" label="Preferred time">
              {(control) => (
                <Select disabled defaultValue="any" {...control}>
                  <option value="any">Any time</option>
                </Select>
              )}
            </Field>
            <Field
              id="sg-message"
              label="How can we help?"
              hint="A few lines about your business is plenty."
              className="md:col-span-2"
            >
              {(control) => <Textarea {...control} />}
            </Field>
          </div>
        </GuideSection>

        <GuideSection
          id="wordmark"
          title="Wordmark"
          intro="An original typographic mark: the name in the serif over a ledger total rule. Live SVG text, so a supplied logo can replace it in one file."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex min-h-40 flex-col items-start justify-between gap-6 rounded-md border border-line bg-paper p-6">
              <Wordmark className="max-w-full h-12" />
              <StateLabel>On paper</StateLabel>
            </div>
            <div className="flex min-h-40 flex-col items-start justify-between gap-6 rounded-md bg-surface p-6">
              <Wordmark className="max-w-full h-12" />
              <StateLabel>On surface</StateLabel>
            </div>
            <div data-tone="navy" className="flex min-h-40 flex-col items-start justify-between gap-6 rounded-md bg-navy p-6">
              <Wordmark tone="dark" className="max-w-full h-12" />
              <StateLabel>On navy</StateLabel>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-8 rounded-md border border-line p-6">
            <Wordmark className="max-w-full h-8" />
            <Wordmark className="max-w-full h-11" />
            <Wordmark className="max-w-full h-16" />
          </div>
        </GuideSection>
      </Container>

      <div id="tones" className="scroll-mt-6 border-t border-line">
        <Container className="pt-section-sm pb-10">
          <div className="flex max-w-measure flex-col gap-3">
            <Eyebrow className="figures">{number("tones")}</Eyebrow>
            <Heading level={2} size="h3">
              Section tones
            </Heading>
            <Text size="small" muted>
              Full-width bands. Tones alternate to create rhythm; navy is used sparingly.
            </Text>
          </div>
        </Container>
        {toneDemos.map((demo) => (
          <Section key={demo.tone} tone={demo.tone} spacing="compact" aria-labelledby={`tone-${demo.tone}`}>
            <Container className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="flex flex-col gap-3">
                <Eyebrow>tone=&quot;{demo.tone}&quot;</Eyebrow>
                <Heading level={3} id={`tone-${demo.tone}`}>
                  {demo.title}
                </Heading>
                <Lead>{demo.body}</Lead>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant={demo.tone === "navy" ? "on-dark" : "primary"}>Book a consultation</Button>
                {demo.tone !== "navy" && <Button variant="ghost">Explore our services</Button>}
              </div>
            </Container>
          </Section>
        ))}
      </div>

      <Container>
        <p className="py-10 text-caption text-muted">
          Tokens live in src/app/globals.css. Components live in src/components/ui.
        </p>
      </Container>
    </>
  );
}
