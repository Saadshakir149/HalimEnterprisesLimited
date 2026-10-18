import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  tone?: "light" | "dark";
  className?: string;
};

/*
 * Original typographic logo for Halim Enterprises Limited: "Halim
 * Enterprises" in the serif, a ledger "total" double rule, then "LIMITED" in
 * spaced capitals, so the full registered name reads clearly on two lines.
 * Set in live SVG text with the site fonts, so it stays crisp and is easy to
 * replace with a supplied logo. Size it with a height class, e.g.
 * className="h-10 w-auto"; the width follows from the 300:60 viewBox.
 */
export function Wordmark({ tone = "light", className }: WordmarkProps) {
  const words = site.brandName.split(" ");
  const suffix = words.at(-1) ?? "";
  const name = words.slice(0, -1).join(" ");
  const ink = tone === "light" ? "fill-navy" : "fill-on-navy";
  const rule = tone === "light" ? "fill-teal" : "fill-teal-on-dark";

  return (
    <svg viewBox="0 0 300 60" role="img" aria-label={site.brandName} className={cn("h-10 w-auto overflow-visible", className)}>
      <text x="0" y="28" className={cn("font-serif", ink)} fontSize="34" fontWeight="600" textLength="298" lengthAdjust="spacing">
        {name}
      </text>
      <rect x="1" y="35.5" width="298" height="1.2" className={rule} />
      <rect x="1" y="38.6" width="298" height="1.2" className={rule} />
      <text x="1" y="58" className={cn("font-sans", ink)} fontSize="16" fontWeight="700" letterSpacing="7">
        {suffix.toUpperCase()}
      </text>
    </svg>
  );
}
