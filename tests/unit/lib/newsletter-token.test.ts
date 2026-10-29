import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildUnsubscribeUrl,
  createUnsubscribeToken,
  readUnsubscribeToken,
} from "@/lib/newsletter/token";

const SECRET = "placeholder-newsletter-signing-secret";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("newsletter unsubscribe tokens", () => {
  it("round-trips the address and locale", () => {
    const token = createUnsubscribeToken("Reader@Example.com", "en", SECRET);
    expect(token).toBeTruthy();
    expect(readUnsubscribeToken(token, SECRET)).toEqual({
      email: "reader@example.com",
      locale: "en",
    });
  });

  it("defaults unknown locales to Chinese copy", () => {
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET);
    const payload = readUnsubscribeToken(token, SECRET);
    expect(payload?.locale).toBe("zh");
  });

  it("rejects a token signed with a different secret", () => {
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET);
    expect(readUnsubscribeToken(token, "another-secret")).toBeNull();
  });

  it("rejects a tampered payload", () => {
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET)!;
    const [version, , signature] = token.split(".");
    const forgedPayload = Buffer.from(
      JSON.stringify({ e: "attacker@example.com", l: "zh" }),
      "utf8",
    ).toString("base64url");
    expect(readUnsubscribeToken(`${version}.${forgedPayload}.${signature}`, SECRET)).toBeNull();
  });

  it("rejects malformed tokens", () => {
    expect(readUnsubscribeToken("", SECRET)).toBeNull();
    expect(readUnsubscribeToken("v1.only-two-parts", SECRET)).toBeNull();
    expect(readUnsubscribeToken("v2.a.b", SECRET)).toBeNull();
    expect(readUnsubscribeToken(null, SECRET)).toBeNull();
  });

  it("returns null when no secret is configured", () => {
    expect(createUnsubscribeToken("reader@example.com", "zh", null)).toBeNull();
    expect(readUnsubscribeToken("v1.a.b", null)).toBeNull();
  });

  it("falls back to the admin session secret for production links", () => {
    vi.stubEnv("NEWSLETTER_SECRET", "");
    vi.stubEnv("ADMIN_SESSION_SECRET", SECRET);
    const url = buildUnsubscribeUrl("reader@example.com", "zh", "https://www.stylekit.top/");
    expect(url).toBe(
      `https://www.stylekit.top/api/newsletter/unsubscribe?token=${encodeURIComponent(
        createUnsubscribeToken("reader@example.com", "zh", SECRET)!,
      )}`,
    );
  });

  it("builds no url when no secret exists", () => {
    vi.stubEnv("NEWSLETTER_SECRET", "");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");
    vi.stubEnv("EMAIL_OTP_SECRET", "");
    expect(buildUnsubscribeUrl("reader@example.com", "zh", "https://www.stylekit.top")).toBeNull();
  });
});
