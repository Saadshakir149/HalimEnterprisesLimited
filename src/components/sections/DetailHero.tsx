import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Lead } from "@/components/ui/Text";
import { routes } from "@/content/navigation";
import type { Crumb } from "@/lib/structured-data";

type DetailHeroProps = {
  crumbs: readonly Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  icon?: IconName;
  /** Show the consultation button (detail pages), or not (index pages) */
  cta?: string;
};

/** Page hero for service, audience and index pages: breadcrumb, h1, intro and a consultation CTA. */
export function DetailHero({ crumbs, eyebrow, title, intro, icon, cta }: DetailHeroProps) {
  return (
    <section aria-labelledby="page-title" className="border-b border-line bg-paper pt-8 pb-section-sm sm:pt-10">
      <Container className="flex flex-col gap-10">
        <Breadcrumbs crumbs={crumbs} />
        <div className="flex max-w-3xl flex-col gap-5">
          <Eyebrow className="flex items-center gap-2">
            {icon && <Icon name={icon} size={18} />}
            {eyebrow}
          </Eyebrow>
          <Heading level={1} id="page-title" className="animate-enter">
            {title}
          </Heading>
          <Lead className="animate-enter [animation-delay:60ms]">{intro}</Lead>
          {cta && (
            <div className="mt-2 animate-enter [animation-delay:120ms]">
              <Button href={routes.consultation} size="lg">
                {cta}
                <Icon name="arrow-right" size={20} className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
