import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

export type RelatedItem = {
  href: string;
  title: string;
  text: string;
  icon: IconName;
};

/** Hairline-ruled links to related pages, with a short line on each. */
export function RelatedLinks({ items }: { items: readonly RelatedItem[] }) {
  return (
    <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
      {items.map((item) => (
        <li key={item.href} className="border-b border-line">
          <Link
            href={item.href}
            className="group grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 py-4 transition-colors duration-150 hover:bg-paper focus-visible:bg-paper sm:px-2"
          >
            <Icon name={item.icon} size={20} className="mt-0.5 text-teal" />
            <span className="font-semibold text-navy underline-offset-4 group-hover:underline group-focus-visible:underline">
              {item.title}
            </span>
            <Icon
              name="arrow-right"
              size={18}
              className="row-span-2 mt-1 text-teal transition-transform duration-150 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
            />
            <span className="col-start-2 text-small text-muted">{item.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
