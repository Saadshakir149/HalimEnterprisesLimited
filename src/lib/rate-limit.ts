/*
 * A simple in-memory sliding-window rate limiter for the contact forms.
 *
 * It suits a single Node.js instance, which is how the site runs on Hostinger.
 * Counts live in this process's memory: they reset on restart and are not
 * shared between instances. If the site is ever scaled to several instances,
 * replace this with a shared store (e.g. Redis) behind the same interface.
 */

export type RateLimitResult = {
  allowed: boolean;
  /** How long until the oldest counted request leaves the window (0 when allowed) */
  retryAfterMs: number;
};

export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    /** Prune old keys once the map grows past this, so memory stays bounded */
    private readonly maxKeys = 10_000,
  ) {}

  check(key: string, now: number = Date.now()): RateLimitResult {
    const cutoff = now - this.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((time) => time > cutoff);

    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      return { allowed: false, retryAfterMs: recent[0] + this.windowMs - now };
    }

    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > this.maxKeys) this.prune(now);
    return { allowed: true, retryAfterMs: 0 };
  }

  /** Drop keys whose requests have all left the window */
  prune(now: number = Date.now()): void {
    const cutoff = now - this.windowMs;
    for (const [key, times] of this.hits) {
      if (times.every((time) => time <= cutoff)) this.hits.delete(key);
    }
  }

  get size(): number {
    return this.hits.size;
  }
}

/** 5 form submissions per 10 minutes per IP, shared by the enquiry and callback forms */
export const formRateLimiter = new SlidingWindowRateLimiter(5, 10 * 60 * 1000);

/**
 * The visitor's IP. Hostinger's Node.js hosting sits behind a proxy, which
 * puts the original address first in X-Forwarded-For.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}
