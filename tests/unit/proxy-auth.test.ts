import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  getClaims: vi.fn(),
  getUser: vi.fn(),
  isAdminUserId: vi.fn(),
  verifyAdminSessionCookieValue: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getClaims: mocks.getClaims,
      getUser: mocks.getUser,
    },
  })),
}));

vi.mock("@/lib/auth/admin-policy", () => ({
  isAdminUserId: mocks.isAdminUserId,
}));

vi.mock("@/lib/auth/admin-session", () => ({
  ADMIN_SESSION_COOKIE_NAME: "stylekit-admin-session",
  verifyAdminSessionCookieValue: mocks.verifyAdminSessionCookieValue,
}));

import { proxy } from "@/proxy";

function request(pathname: string, cookie?: string) {
  return new NextRequest(`https://www.stylekit.top${pathname}`, {
    headers: cookie ? { cookie } : undefined,
  });
}

describe("proxy Supabase session refresh", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
    mocks.verifyAdminSessionCookieValue.mockResolvedValue(false);
    mocks.getClaims.mockResolvedValue({
      data: {
        claims: { sub: "user-123" },
        header: {},
        signature: new Uint8Array(),
      },
      error: null,
    });
  });

  it("validates an auth cookie with getClaims instead of getUser", async () => {
    const response = await proxy(
      request("/en/styles", "sb-project-auth-token=session"),
    );

    expect(response.status).toBe(200);
    expect(mocks.getClaims).toHaveBeenCalledTimes(1);
    expect(mocks.getUser).not.toHaveBeenCalled();
  });

  it("recognizes chunked Supabase session cookies", async () => {
    await proxy(
      request("/en/styles", "sb-project-auth-token.0=session-part"),
    );

    expect(mocks.getClaims).toHaveBeenCalledTimes(1);
  });

  it("does not refresh sessions for anonymous analytics ingestion", async () => {
    const response = await proxy(
      request("/api/analytics", "sb-project-auth-token=stale-session"),
    );

    expect(response.status).toBe(200);
    expect(mocks.getClaims).not.toHaveBeenCalled();
    expect(mocks.getUser).not.toHaveBeenCalled();
  });

  it("uses verified JWT claims to authorize admin routes", async () => {
    mocks.isAdminUserId.mockReturnValue(true);

    const response = await proxy(
      request("/admin/operations", "sb-project-auth-token=session"),
    );

    expect(mocks.isAdminUserId).toHaveBeenCalledWith("user-123");
    expect(response.status).toBe(200);
  });

  it("redirects admin requests when claim validation is rate limited", async () => {
    mocks.getClaims.mockResolvedValue({
      data: null,
      error: {
        status: 429,
        code: "over_request_rate_limit",
      },
    });

    const response = await proxy(
      request("/admin/operations", "sb-project-auth-token=expired-session"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/admin-login");
  });
});

describe("proxy locale negotiation for /colors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
    mocks.verifyAdminSessionCookieValue.mockResolvedValue(false);
    mocks.getClaims.mockResolvedValue({
      data: null,
      error: null,
    });
  });

  function requestWith(pathname: string, headers: Record<string, string>) {
    return new NextRequest(`https://www.stylekit.top${pathname}`, {
      headers,
    });
  }

  it("answers search bots on unprefixed /colors paths with a permanent redirect", async () => {
    const response = await proxy(
      requestWith("/colors/22c55e", {
        "user-agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      }),
    );

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://www.stylekit.top/en/colors/22c55e",
    );
  });

  it("serves language-less humans content in place without pinning a locale", async () => {
    const response = await proxy(
      requestWith("/colors/22c55e", {
        "user-agent": "Mozilla/5.0 (Macintosh) regular-browser",
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("only matches the /colors path segment, not longer prefixes", async () => {
    const response = await proxy(
      requestWith("/colorscheme-guide", {
        "user-agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      }),
    );

    expect(response.status).not.toBe(308);
  });

  it("does not let a prefetch write the locale cookie", async () => {
    const response = await proxy(
      requestWith("/styles", {
        "user-agent": "Mozilla/5.0 (Macintosh) regular-browser",
        "next-router-prefetch": "1",
        cookie: "stylekit-locale=zh",
      }),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("sets the locale cookie only when the persisted value differs", async () => {
    const unchanged = await proxy(
      requestWith("/zh/styles", {
        "user-agent": "Mozilla/5.0 (Macintosh) regular-browser",
        cookie: "stylekit-locale=zh",
      }),
    );
    expect(unchanged.headers.get("set-cookie")).toBeNull();

    const changed = await proxy(
      requestWith("/zh/styles", {
        "user-agent": "Mozilla/5.0 (Macintosh) regular-browser",
        cookie: "stylekit-locale=en",
      }),
    );
    expect(changed.headers.get("set-cookie")).toContain("stylekit-locale=zh");
  });

  it("does not renegotiate a localized path after its internal rewrite", async () => {
    const response = await proxy(
      requestWith("/community", {
        "accept-language": "en-US,en;q=0.9",
        "x-stylekit-locale": "en",
        "x-stylekit-visible-path": "/en/community",
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("does not redirect an internally rewritten localized color for search bots", async () => {
    const response = await proxy(
      requestWith("/colors/22c55e", {
        "user-agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "x-stylekit-locale": "en",
        "x-stylekit-visible-path": "/en/colors/22c55e",
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("does not trust a locale rewrite marker for a different path", async () => {
    const response = await proxy(
      requestWith("/community", {
        "accept-language": "en-US,en;q=0.9",
        "x-stylekit-locale": "en",
        "x-stylekit-visible-path": "/en/privacy",
      }),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://www.stylekit.top/en/community",
    );
  });
});

describe("proxy canonical routing for style details", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    mocks.verifyAdminSessionCookieValue.mockResolvedValue(false);
  });

  const canonicalRequestHeaders: Record<string, string>[] = [
    { "user-agent": "Googlebot" },
    { "user-agent": "Google-InspectionTool", "accept-language": "zh-CN" },
    { "user-agent": "ClaudeBot" },
    { "user-agent": "Twitterbot" },
    { "user-agent": "Mozilla/5.0" },
    {},
  ];

  it.each(canonicalRequestHeaders)("consolidates unprefixed details for crawlers or requests without a language preference: %j", async (headers) => {
    const response = await proxy(
      new NextRequest("https://www.stylekit.top/styles/swiss-style?utm_source=link", {
        headers,
      }),
    );

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://www.stylekit.top/en/styles/swiss-style?utm_source=link",
    );
    expect(response.headers.get("vary")).toBe("Accept-Language, Cookie, User-Agent");
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  const browserPreferences: {
    headers: Record<string, string>;
    locale: "en" | "zh";
  }[] = [
    { headers: { "accept-language": "zh-CN,zh;q=0.9" }, locale: "zh" },
    { headers: { "accept-language": "en-US,en;q=0.9" }, locale: "en" },
    { headers: { "accept-language": "en-US", cookie: "stylekit-locale=zh" }, locale: "zh" },
  ];

  it.each(browserPreferences)("keeps browser language negotiation temporary: %j", async ({ headers, locale }) => {
    const response = await proxy(
      new NextRequest("https://www.stylekit.top/styles/swiss-style", { headers }),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      `https://www.stylekit.top/${locale}/styles/swiss-style`,
    );
  });

  it.each([
    "/",
    "/styles",
    "/en/styles/swiss-style",
    "/zh/styles/swiss-style",
    "/styles/swiss-style/showcase",
    "/styles/swiss-style.md",
    "/styles/swiss-style/opengraph-image",
    "/api/design/swiss-style/design.md",
    "/llms.txt",
    "/mcp",
  ])("preserves the existing route handling for %s", async (pathname) => {
    const response = await proxy(
      new NextRequest(`https://www.stylekit.top${pathname}`, {
        headers: { "user-agent": "Googlebot" },
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("does not redirect a detail after an internal locale rewrite", async () => {
    const response = await proxy(
      new NextRequest("https://www.stylekit.top/styles/swiss-style", {
        headers: {
          "user-agent": "Googlebot",
          "x-stylekit-locale": "en",
          "x-stylekit-visible-path": "/en/styles/swiss-style",
        },
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });
});
