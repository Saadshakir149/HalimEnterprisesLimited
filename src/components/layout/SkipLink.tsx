/** First focusable element on every page. Hidden until focused. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-navy px-5 py-3 text-small font-semibold text-on-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to main content
    </a>
  );
}
