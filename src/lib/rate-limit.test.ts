import { describe, expect, it } from "vitest";
import { clientIp, SlidingWindowRateLimiter } from "@/lib/rate-limit";

const MINUTE = 60_000;

describe("SlidingWindowRateLimiter", () => {
  it("allows up to the limit, then blocks", () => {
    const limiter = new SlidingWindowRateLimiter(5, 10 * MINUTE);
    const results = Array.from({ length: 6 }, (_, i) => limiter.check("1.2.3.4", 1_000 + i));
    expect(results.map((r) => r.allowed)).toEqual([true, true, true, true, true, false]);
  });

  it("tells a blocked caller when the oldest request leaves the window", () => {
    const limiter = new SlidingWindowRateLimiter(2, 10 * MINUTE);
    limiter.check("ip", 0);
    limiter.check("ip", 2 * MINUTE);
    expect(limiter.check("ip", 3 * MINUTE)).toEqual({ allowed: false, retryAfterMs: 7 * MINUTE });
  });

  it("slides: requests older than the window stop counting", () => {
    const limiter = new SlidingWindowRateLimiter(5, 10 * MINUTE);
    for (let i = 0; i < 5; i++) limiter.check("ip", i * MINUTE);
    expect(limiter.check("ip", 9 * MINUTE).allowed).toBe(false);
    // At 10 minutes and 1ms, the first request (at 0) has left the window
    expect(limiter.check("ip", 10 * MINUTE + 1).allowed).toBe(true);
  });

  it("does not count blocked attempts", () => {
    const limiter = new SlidingWindowRateLimiter(1, 10 * MINUTE);
    limiter.check("ip", 0);
    for (let i = 1; i < 20; i++) limiter.check("ip", i * 1_000);
    expect(limiter.check("ip", 10 * MINUTE + 1).allowed).toBe(true);
  });

  it("keeps separate counts per key", () => {
    const limiter = new SlidingWindowRateLimiter(1, 10 * MINUTE);
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 1).allowed).toBe(false);
    expect(limiter.check("b", 2).allowed).toBe(true);
  });

  it("prunes keys whose requests have all expired, keeping memory bounded", () => {
    const limiter = new SlidingWindowRateLimiter(5, 10 * MINUTE, 3);
    for (let i = 0; i < 3; i++) limiter.check(`old-${i}`, 0);
    limiter.check("new", 11 * MINUTE); // pushes the map past maxKeys, triggering a prune
    expect(limiter.size).toBe(1);
  });
});

describe("clientIp", () => {
  it("uses the first address in X-Forwarded-For (the original client behind Hostinger's proxy)", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }))).toBe("203.0.113.7");
  });

  it("falls back to X-Real-IP, then 'unknown'", () => {
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
