import { DetailHero } from "@/components/sections/DetailHero";
import { SendDocuments } from "@/components/sections/SendDocuments";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/content/navigation";
import { documentsPage as copy } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

/* For existing clients, so kept out of search results and the main navigation */
export const metadata = pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: routes.documents, noindex: true });

export default function SendDocumentsPage() {
  return (
    <>
      <DetailHero
        crumbs={[
          { name: "Home", href: routes.home },
          { name: "Sending documents", href: routes.documents },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <Section tone="surface">
        <Container>
          <SendDocuments />
        </Container>
      </Section>
    </>
  );
}
