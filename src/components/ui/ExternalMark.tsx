import { Icon } from "@/components/ui/Icon";

/**
 * Signposts a link that leaves the site in a new tab: a small external-link
 * icon for sighted users and "(opens in a new tab)" for screen readers.
 */
export function ExternalMark({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <>
      <Icon name="external-link" size={size} className={className} />
      <span className="sr-only">(opens in a new tab)</span>
    </>
  );
}
