import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Makes the whole positioned parent clickable (the parent needs `relative`) */
  stretched?: boolean;
};

/** A text link with a trailing arrow that nudges right on hover and focus. */
export function ArrowLink({ href, children, className, stretched = false }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex min-h-11 w-fit items-center gap-2 text-small font-semibold text-teal",
        "underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-out",
        "hover:text-teal-hover hover:decoration-current focus-visible:text-teal-hover focus-visible:decoration-current",
        "in-data-[tone=navy]:text-teal-on-dark",
        stretched && "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none",
        className,
      )}
    >
      {children}
      <Icon
        name="arrow-right"
        size={18}
        className="transition-transform duration-150 ease-out group-hover/arrow:translate-x-1 group-focus-visible/arrow:translate-x-1"
      />
    </Link>
  );
}
