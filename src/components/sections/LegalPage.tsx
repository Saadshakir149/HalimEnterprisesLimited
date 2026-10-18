import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DevWarning } from "@/components/ui/DevWarning";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Lead } from "@/components/ui/Text";
import { draftBannerText, type Inline, type LegalDocument } from "@/content/legal";
import { routes } from "@/content/navigation";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

/** Metadata for a legal page: noindexed while it is a draft and the site flag is on. */
export function legalMetadata(doc: LegalDocument): Metadata {
  const noindex = doc.status === "draft" && site.legal.noindexDraftPages;
  return pageMetadata({ title: doc.metaTitle, description: doc.metaDescription, path: `/${doc.slug}`, noindex });
}

function RichText({ parts }: { parts: readonly Inline[] }) {
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <Fragment key={index}>{part}</Fragment>
        ) : part.href.startsWith("http") ? (
          <a key={index} href={part.href} className="link-body" target="_blank" rel="noopener noreferrer">
            {part.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link key={index} href={part.href} className="link-body">
            {part.label}
          </Link>
        ),
      )}
    </>
  );
}

/** The DRAFT notice. It renders for as long as the document's status is "draft". */
function DraftBanner() {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-md border border-danger/40 bg-danger-soft px-5 py-4 text-small font-semibold text-danger"
    >
      <Icon name="circle-alert" size={20} className="mt-0.5" />
      <p>{draftBannerText}</p>
    </div>
  );
}

/** Long-form legal page: a readable measure, clear headings and a sticky table of contents on desktop. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-line bg-paper pt-8 pb-section-sm sm:pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: routes.home },
              { name: doc.title, href: `/${doc.slug}` },
            ]}
          />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>Legal</Eyebrow>
            <Heading level={1} id="page-title">
              {doc.title}
            </Heading>
            <Lead>{doc.intro}</Lead>
          </div>
          {doc.status === "draft" && <DraftBanner />}
          {doc.devNotes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {doc.devNotes.map((note) => (
                <DevWarning key={note}>{note}</DevWarning>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Section tone="surface">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 text-caption font-semibold tracking-[0.14em] text-muted uppercase">On this page</p>
              <ol className="border-t border-line">
                {doc.sections.map((section, index) => (
                  <li key={section.id} className="border-b border-line">
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-11 items-baseline gap-3 py-2.5 text-small text-ink transition-colors duration-150 hover:text-teal focus-visible:text-teal"
                    >
                      <span className="figures text-caption font-semibold text-teal">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="flex max-w-measure min-w-0 flex-col gap-12 lg:col-span-8 lg:col-start-5">
            {doc.sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="flex scroll-mt-28 flex-col gap-4">
                <Heading level={2} size="h3" id={`${section.id}-title`} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="figures font-sans text-small font-semibold text-teal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </Heading>
                {section.blocks.map((block, blockIndex) =>
                  block.kind === "p" ? (
                    <p key={blockIndex} className="text-body text-ink">
                      <RichText parts={block.text} />
                    </p>
                  ) : (
                    <ul key={blockIndex} className="flex flex-col gap-2 pl-1">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-body text-ink">
                          <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-[1px] bg-teal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </article>
        </Container>
      </Section>
    </>
  );
}
