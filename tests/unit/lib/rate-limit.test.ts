import { describe, expect, it } from "vitest";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

describe("rate-limit utility", () => {
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

  it("keys on the proxy-appended X-Forwarded-For entry, not the client-supplied one", () => {
    const request = new Request("https://example.com/api/test", {
      headers: {
        // A client can prepend anything; the reverse proxy appends the real
        // peer, so only the rightmost entry is trustworthy.
        "x-forwarded-for": "203.0.113.10, 198.51.100.7",
        "user-agent": "StyleKit-Test/1.0",
      },
    });

    const key = getRequestClientKey(request);
    expect(key).toBe("ip:198.51.100.7");
    expect(key).not.toContain("203.0.113.10");
  });

  it("ignores client-settable IP headers so the limit cannot be reset at will", () => {
    const spoofed = new Request("https://example.com/api/test", {
      headers: {
        "cf-connecting-ip": "203.0.113.10",
        "x-real-ip": "203.0.113.11",
        "user-agent": "StyleKit-Test/1.0",
      },
    });
    const otherSpoof = new Request("https://example.com/api/test", {
      headers: {
        "cf-connecting-ip": "203.0.113.99",
        "x-real-ip": "203.0.113.98",
        "user-agent": "Different-UA/2.0",
      },
    });

    // Without a trusted proxy header both land in the same bucket rather than
    // each minting a fresh one.
    expect(getRequestClientKey(spoofed)).toBe("ip:unknown");
    expect(getRequestClientKey(otherSpoof)).toBe("ip:unknown");
  });

  it("honours TRUSTED_CLIENT_IP_HEADER when a CDN publishes the client IP", () => {
    const original = process.env.TRUSTED_CLIENT_IP_HEADER;
    process.env.TRUSTED_CLIENT_IP_HEADER = "cf-connecting-ip";

    try {
      const request = new Request("https://example.com/api/test", {
        headers: { "cf-connecting-ip": "203.0.113.10" },
      });
      expect(getRequestClientKey(request)).toBe("ip:203.0.113.10");
    } finally {
      if (original === undefined) delete process.env.TRUSTED_CLIENT_IP_HEADER;
      else process.env.TRUSTED_CLIENT_IP_HEADER = original;
    }
  });
});
