/*
 * Shared request handling for the contact form Route Handlers.
 *
 * Order of checks:
 *   1. Origin matches the site (production only)
 *   2. JSON content type and a size limit
 *   3. Rate limit per IP
 *   4. Validation with the shared zod schema (400 with field messages)
 *   5. Bot screening: honeypot or too-fast submissions get a normal-looking
 *      success, so bots learn nothing, and nothing is sent
 *   6. Send the emails (503 if SMTP isn't configured in production)
 *
 * Personal data is never logged in production.
 */

import "server-only";
import { z } from "zod";
import { siteUrl } from "@/content/site";
import { MailNotConfiguredError, notificationAddress, sendMail, type Mail } from "@/lib/email";
import { clientIp, formRateLimiter, type SlidingWindowRateLimiter } from "@/lib/rate-limit";
import { looksLikeBot } from "@/lib/validation";

const MAX_BODY_BYTES = 16 * 1024;

/** The bot-screening fields every request schema includes (see botFields in validation.ts) */
type BotFields = { website?: string; renderedAt: number; submittedAt: number };

export type FormMessages = {
  success: string;
  invalid: string;
  rateLimited: string;
  unavailable: string;
  failed: string;
};

type HandlerOptions<S extends z.ZodType<BotFields>> = {
  schema: S;
  /** Builds the emails for a valid, human submission */
  buildMails: (data: z.output<S>, inbox: string) => Mail[];
  messages: FormMessages;
  /** Injectable for tests */
  limiter?: SlidingWindowRateLimiter;
};

const isProduction = () => process.env.NODE_ENV === "production";

/**
 * Origins allowed to post to the forms in production: the site URL, plus any
 * extra origins in FORM_ALLOWED_ORIGINS (comma-separated), for example a
 * Hostinger temporary domain before the real domain is connected.
 */
function allowedOrigins(): string[] {
  const extra = (process.env.FORM_ALLOWED_ORIGINS ?? "").split(",").map((o) => o.trim()).filter(Boolean);
  return [new URL(siteUrl).origin, ...extra.map((o) => new URL(o).origin)];
}

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function handleFormPost<S extends z.ZodType<BotFields>>(request: Request, options: HandlerOptions<S>): Promise<Response> {
  const { schema, buildMails, messages, limiter = formRateLimiter } = options;

  // 1. Origin
  if (isProduction()) {
    const origin = request.headers.get("origin");
    if (!origin || !allowedOrigins().includes(origin)) {
      return json({ ok: false, error: messages.failed }, 403);
    }
  }

  // 2. Content type and size
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: messages.invalid }, 415);
  }
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json({ ok: false, error: messages.invalid }, 413);
  }

  // 3. Rate limit
  const limit = limiter.check(clientIp(request.headers));
  if (!limit.allowed) {
    return json({ ok: false, error: messages.rateLimited }, 429, { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) });
  }

  // 4. Validate
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: messages.invalid }, 400);
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    return json({ ok: false, error: messages.invalid, fieldErrors }, 400);
  }

  // 5. Bots get a normal-looking success, and nothing is sent
  if (looksLikeBot(result.data)) {
    return json({ ok: true, message: messages.success }, 200);
  }

  // 6. Send
  try {
    const inbox = notificationAddress() ?? "preview@localhost";
    await sendMail(buildMails(result.data, inbox));
    return json({ ok: true, message: messages.success }, 200);
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      console.error("[forms] Email is not configured: set the SMTP_* and MAIL_* environment variables.");
      return json({ ok: false, error: messages.unavailable }, 503);
    }
    // Log the failure type and SMTP error code only (e.g. EAUTH, ECONNECTION), never the submission
    const code = typeof error === "object" && error !== null && "code" in error ? String(error.code) : "";
    console.error("[forms] Sending failed:", error instanceof Error ? error.name : "unknown error", code);
    return json({ ok: false, error: messages.failed }, 502);
  }
}
