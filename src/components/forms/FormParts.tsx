"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent, type RefObject } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { shared } from "@/content/forms";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export type SummaryItem = { field: string; id: string; message: string };

/**
 * Lists every error at the top of the form. It receives focus after a failed
 * submit, so screen readers announce it, and each link moves focus to its field.
 */
export function ErrorSummary({
  items,
  summaryRef,
  onSelect,
}: {
  items: readonly SummaryItem[];
  summaryRef: RefObject<HTMLDivElement | null>;
  onSelect: (field: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      role="alert"
      aria-labelledby={`${items[0].id}-summary-title`}
      className="flex flex-col gap-3 rounded-md border-2 border-danger bg-danger-soft/40 p-5"
    >
      <h3 id={`${items[0].id}-summary-title`} className="flex items-center gap-2 font-sans text-body font-bold text-danger">
        <Icon name="circle-alert" size={20} />
        {shared.errorSummaryTitle}
      </h3>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.field}>
            <a
              href={`#${item.id}`}
              onClick={(event: MouseEvent) => {
                event.preventDefault();
                onSelect(item.field);
              }}
              className="text-small font-semibold text-danger underline underline-offset-4 hover:decoration-2 focus-visible:decoration-2"
            >
              {item.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Submit button with a loading state; disabled while sending to stop double submission */
export function SubmitButton({ busy, label }: { busy: boolean; label: string }) {
  return (
    <Button type="submit" size="lg" disabled={busy} aria-busy={busy} className="w-full sm:w-fit">
      {busy && <Icon name="loader" size={20} className="animate-spin" />}
      {busy ? shared.sending : label}
    </Button>
  );
}

/**
 * Honeypot: hidden from people (off-screen, out of the tab order, hidden from
 * screen readers) but visible to naive bots, which fill in every field.
 */
export function Honeypot({ id, inputRef }: { id: string; inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>{shared.honeypotLabel}</label>
      <input ref={inputRef} id={id} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function PrivacyNotice() {
  return (
    <p className="text-small text-muted">
      {shared.privacyNotice.before}
      <Link href={site.policies.privacy} className="link-body">
        {shared.privacyNotice.link}
      </Link>
      {shared.privacyNotice.after}
    </p>
  );
}

/** Replaces the form after a successful send. Focus moves to its heading. */
export function FormSuccess({ title, body, whatsapp }: { title: string; body: readonly string[]; whatsapp: string | null }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className="flex flex-col gap-5 rounded-md border border-teal bg-teal-soft/40 p-6 sm:p-8">
      <span className="flex size-12 items-center justify-center rounded-full bg-teal text-on-navy">
        <Icon name="circle-check" size={26} />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="text-h3 focus:outline-none">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {body.map((paragraph) => (
          <p key={paragraph} className="text-body text-ink">
            {paragraph}
          </p>
        ))}
      </div>
      {whatsapp && (
        <Button href={whatsapp} external variant="secondary" className="w-full sm:w-fit">
          <Icon name="message-circle" size={18} />
          {shared.whatsapp}
        </Button>
      )}
    </div>
  );
}

/** Network or server failure: polite, with a retry and WhatsApp as an alternative */
export function FormError({
  message,
  onRetry,
  whatsapp,
  className,
}: {
  message: string;
  onRetry?: () => void;
  whatsapp: string | null;
  className?: string;
}) {
  return (
    <div role="alert" className={cn("flex flex-col gap-4 rounded-md border border-danger/50 bg-danger-soft/40 p-5", className)}>
      <p className="flex items-start gap-2 text-body font-semibold text-danger">
        <Icon name="circle-alert" size={20} className="mt-0.5" />
        {message}
      </p>
      <div className="flex flex-wrap gap-3">
        {onRetry && (
          <Button variant="secondary" onClick={onRetry}>
            {shared.retry}
          </Button>
        )}
        {whatsapp && (
          <Button href={whatsapp} external variant="ghost">
            <Icon name="message-circle" size={18} />
            {shared.whatsapp}
          </Button>
        )}
      </div>
    </div>
  );
}
