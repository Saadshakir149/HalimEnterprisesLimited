"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type BookingEmbedProps = {
  embedUrl: string;
  /** Accessible title for the iframe */
  title: string;
  intro: string;
  notice: { before: string; link: string; after: string };
  cookiePolicyHref: string;
  cta: string;
};

/**
 * Click-to-load booking calendar. Until the visitor clicks, nothing from the
 * provider is requested: no script, no iframe, no cookies. Afterwards it is a
 * plain sandboxed iframe (the provider's own embed script is never used).
 */
export function BookingEmbed({ embedUrl, title, intro, notice, cookiePolicyHref, cta }: BookingEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Keyboard and screen reader users continue inside the calendar they asked for
  useEffect(() => {
    if (loaded) frameRef.current?.focus();
  }, [loaded]);

  if (loaded) {
    return (
      <iframe
        ref={frameRef}
        src={embedUrl}
        title={title}
        className="h-[44rem] w-full rounded-md border border-line bg-surface"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border border-dashed border-line bg-surface p-5">
      <p className="text-small font-semibold text-ink">{intro}</p>
      <p className="text-small text-muted">
        {notice.before}
        <Link href={cookiePolicyHref} className="link-body">
          {notice.link}
        </Link>
        {notice.after}
      </p>
      <Button variant="secondary" className="w-full whitespace-normal sm:w-fit" onClick={() => setLoaded(true)}>
        <Icon name="calendar" size={18} />
        {cta}
      </Button>
    </div>
  );
}
