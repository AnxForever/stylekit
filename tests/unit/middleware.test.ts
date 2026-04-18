import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.fn();
const nextMock = vi.fn();

vi.mock("next/server", () => ({
  NextResponse: {
    redirect: (url: URL, status?: number) => {
      redirectMock(url, status);
      return { type: "redirect", url, status };
    },
    next: () => {
      nextMock();
      return { type: "next" };
    },
  },
}));

import { middleware } from "@/middleware";

type FakeCookie = { value: string } | undefined;

function buildRequest(options: {
  pathname: string;
  search?: string;
  cookie?: FakeCookie;
  acceptLanguage?: string | null;
}) {
  const url = new URL(
    `https://stylekit.top${options.pathname}${options.search ?? ""}`,
  );
  return {
    nextUrl: {
      pathname: url.pathname,
      search: url.search,
      clone: () => new URL(url.toString()),
    },
    cookies: {
      get: (_name: string) => options.cookie,
    },
    headers: {
      get: (name: string) => {
        if (name.toLowerCase() === "accept-language") {
          return options.acceptLanguage ?? null;
        }
        return null;
      },
    },
  } as unknown as import("next/server").NextRequest;
}

describe("locale middleware", () => {
  beforeEach(() => {
    redirectMock.mockClear();
    nextMock.mockClear();
  });

  it("redirects unprefixed path to default locale when no cookie and no header", () => {
    middleware(buildRequest({ pathname: "/blog" }));
    expect(redirectMock).toHaveBeenCalledTimes(1);
    const [url, status] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en/blog");
    expect(status).toBe(308);
  });

  it("redirects unprefixed path using cookie locale when set", () => {
    middleware(
      buildRequest({ pathname: "/blog", cookie: { value: "zh" } }),
    );
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/zh/blog");
  });

  it("falls back to Accept-Language when cookie is invalid", () => {
    middleware(
      buildRequest({
        pathname: "/blog",
        cookie: { value: "fr" },
        acceptLanguage: "zh-CN,en;q=0.9",
      }),
    );
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/zh/blog");
  });

  it("falls back to default locale when Accept-Language has no zh", () => {
    middleware(
      buildRequest({ pathname: "/blog", acceptLanguage: "en-US,en;q=0.9" }),
    );
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en/blog");
  });

  it("redirects root path to locale root", () => {
    middleware(buildRequest({ pathname: "/" }));
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en");
  });

  it("preserves query string when redirecting", () => {
    middleware(buildRequest({ pathname: "/blog", search: "?topic=x" }));
    const [url] = redirectMock.mock.calls[0];
    expect(url.pathname).toBe("/en/blog");
    expect(url.search).toBe("?topic=x");
  });

  it("passes through already-localized /en/blog", () => {
    middleware(buildRequest({ pathname: "/en/blog" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("passes through already-localized /zh/blog", () => {
    middleware(buildRequest({ pathname: "/zh/blog" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /api/* routes", () => {
    middleware(buildRequest({ pathname: "/api/agent/chat" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("bypasses /admin/* routes", () => {
    middleware(buildRequest({ pathname: "/admin/users" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /favicon.ico", () => {
    middleware(buildRequest({ pathname: "/favicon.ico" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /sitemap.xml", () => {
    middleware(buildRequest({ pathname: "/sitemap.xml" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /robots.txt", () => {
    middleware(buildRequest({ pathname: "/robots.txt" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses arbitrary file extensions", () => {
    middleware(buildRequest({ pathname: "/og-image.svg" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses /opengraph-image", () => {
    middleware(buildRequest({ pathname: "/opengraph-image" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("bypasses nested generated image routes", () => {
    middleware(buildRequest({ pathname: "/styles/glassmorphism/opengraph-image" }));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });
});
