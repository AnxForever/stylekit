import { afterEach, describe, expect, it, vi } from "vitest";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

describe("rate-limit utility", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("blocks requests after limit is reached", () => {
    const namespace = `test:${Date.now()}`;
    const key = "127.0.0.1:ua";

    const first = checkRateLimit({
      namespace,
      key,
      limit: 2,
      windowMs: 60_000,
    });
    const second = checkRateLimit({
      namespace,
      key,
      limit: 2,
      windowMs: 60_000,
    });
    const third = checkRateLimit({
      namespace,
      key,
      limit: 2,
      windowMs: 60_000,
    });

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it("builds rate limit headers", () => {
    const result = checkRateLimit({
      namespace: `header-test:${Date.now()}`,
      key: "ip:ua",
      limit: 1,
      windowMs: 5_000,
    });

    const headers = createRateLimitHeaders(result);
    expect(headers["x-ratelimit-limit"]).toBe("1");
    expect(headers["x-ratelimit-remaining"]).toBe("0");
    expect(Number(headers["x-ratelimit-reset"])).toBeGreaterThan(0);
    expect(Number(headers["retry-after"])).toBeGreaterThan(0);
  });

  it("extracts client key from request headers", () => {
    vi.stubEnv("TRUSTED_CLIENT_IP_HEADER", "x-forwarded-for");
    const request = new Request("https://example.com/api/test", {
      headers: {
        "x-forwarded-for": "203.0.113.10, 203.0.113.11",
        "user-agent": "StyleKit-Test/1.0",
      },
    });

    const key = getRequestClientKey(request);
    expect(key).toBe("ip:203.0.113.11");
  });

  it("does not trust client IP headers until a proxy header is configured", () => {
    const request = new Request("https://example.com/api/test", {
      headers: { "x-forwarded-for": "203.0.113.10" },
    });

    expect(getRequestClientKey(request)).toBe("ip:unknown");
  });
});
