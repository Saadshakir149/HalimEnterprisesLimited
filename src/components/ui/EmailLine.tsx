import { isPlaceholder, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "Or email us at info@…": the business email as a visible mailto: link.
 * Renders nothing at all while the address is a placeholder.
 */
export function EmailLine({ prefix, className }: { prefix: string; className?: string }) {
  if (isPlaceholder(site.email)) return null;
  return (
    <p className={cn("text-small text-muted", className)}>
      {prefix}{" "}
      <a href={`mailto:${site.email}`} className="link-body font-semibold break-all">
        {site.email}
      </a>
    </p>
  );
}
