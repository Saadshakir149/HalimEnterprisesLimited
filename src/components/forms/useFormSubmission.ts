"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { serverMessages } from "@/content/forms";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type Result = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Posts a form to its Route Handler. Adds the bot-screening fields (the time
 * the form appeared and the time it was sent, both on this device's clock),
 * blocks double submission, and reports field errors from the server.
 */
export function useFormSubmission(endpoint: string) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState("");
  const renderedAt = useRef(0);
  const inFlight = useRef(false);

  // Set after mount, never during render, so the prerendered HTML is unaffected
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const submit = useCallback(
    async (values: Record<string, unknown>, honeypot: string): Promise<Result> => {
      if (inFlight.current) return { ok: false, error: "" };
      inFlight.current = true;
      setStatus("submitting");
      setError("");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, website: honeypot, renderedAt: renderedAt.current, submittedAt: Date.now() }),
        });
        const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
        if (response.ok && data.ok) {
          setStatus("success");
          return { ok: true };
        }
        const message = data.error || serverMessages.failed;
        // Field errors are shown on the fields themselves; other failures get the error panel
        setStatus(data.fieldErrors ? "idle" : "error");
        setError(data.fieldErrors ? "" : message);
        return { ok: false, error: message, fieldErrors: data.fieldErrors };
      } catch {
        setStatus("error");
        setError(serverMessages.failed);
        return { ok: false, error: serverMessages.failed };
      } finally {
        inFlight.current = false;
      }
    },
    [endpoint],
  );

  return { status, error, submit };
}
