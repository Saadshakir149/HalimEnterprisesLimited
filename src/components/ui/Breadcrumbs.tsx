import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Crumb } from "@/lib/structured-data";

/** Home › Section › Page. The last crumb is the current page and is not a link. */
export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-teal hover:decoration-current focus-visible:text-teal"
                  >
                    {crumb.name}
                  </Link>
                  <Icon name="chevron-right" size={14} className="text-line-strong" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
