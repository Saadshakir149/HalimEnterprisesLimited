import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Lead } from "@/components/ui/Text";
import { routes } from "@/content/navigation";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Section>
      <Container width="measure" className="flex flex-col gap-6">
        <Eyebrow className="figures">Error 404</Eyebrow>
        <Heading level={1}>We can’t find that page</Heading>
        <Lead>
          The page may have moved, or the address may be mistyped. These are good places to pick up
          from.
        </Lead>
        <Divider variant="double" />
        <div className="flex flex-wrap gap-3">
          <Button href={routes.services}>
            Explore our services
            <Icon name="arrow-right" size={18} />
          </Button>
          <Button href={routes.contact} variant="secondary">
            Contact us
          </Button>
          <Button href={routes.home} variant="ghost">
            Back to the homepage
          </Button>
        </div>
      </Container>
    </Section>
  );
}
