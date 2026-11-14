// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_OPT_OUT_KEY,
  canCollectClientAnalytics,
  shouldExcludeAnalyticsRequest,
} from "@/lib/analytics/collection-policy";

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DISABLED", "");
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubGlobal("window", {
    location: { hostname: "www.stylekit.top", pathname: "/en/styles" },
    localStorage: { getItem: vi.fn().mockReturnValue(null) },
  });
  vi.stubGlobal("navigator", { userAgent: "Mozilla/5.0 Chrome/130" });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function serverRequest(headers: Record<string, string> = {}): Request {
  // happy-dom strips browser-forbidden Origin headers from Request. This is
  // the already-received server request, where Origin must remain visible.
  return {
    url: "https://www.stylekit.top/api/analytics",
    headers: new Headers({ origin: "https://www.stylekit.top", ...headers }),
  } as Request;
}

describe("collection exclusions", () => {
  it("collects public production traffic", () => expect(canCollectClientAnalytics()).toBe(true));

  it("excludes embedded showcase previews", () => {
    vi.stubGlobal("window", { ...window, self: {}, top: {} });
    expect(canCollectClientAnalytics()).toBe(false);
  });

  it.each(["/admin", "/zh/admin/analytics", "/en/login", "/api/auth", "/auth/callback", "/umami"])("excludes %s", (pathname) => {
    window.location.pathname = pathname;
    expect(canCollectClientAnalytics()).toBe(false);
  });

  it.each(["localhost", "preview.stylekit.top", "stylekit.top.evil.test"])("excludes host %s", (hostname) => {
    window.location.hostname = hostname;
    expect(canCollectClientAnalytics()).toBe(false);
  });

  it.each([{ doNotTrack: "1" }, { globalPrivacyControl: true }, { webdriver: true }, { userAgent: "HeadlessChrome" }])("respects browser exclusion %j", (value) => {
    vi.stubGlobal("navigator", value);
    expect(canCollectClientAnalytics()).toBe(false);
  });

  it("respects the local opt-out before generating identities", () => {
    vi.mocked(window.localStorage.getItem).mockReturnValue("1");
    expect(canCollectClientAnalytics()).toBe(false);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(ANALYTICS_OPT_OUT_KEY);
  });

  it("allows unidentified telemetry when local storage is blocked", () => {
    vi.mocked(window.localStorage.getItem).mockImplementation(() => { throw new Error("denied"); });
    expect(canCollectClientAnalytics()).toBe(true);
  });

  it.each<Record<string, string>>([
    { dnt: "1" }, { "sec-gpc": "1" }, { "user-agent": "Googlebot" },
    { referer: "https://www.stylekit.top/zh/admin" }, { origin: "https://preview.stylekit.top" },
    { "sec-fetch-site": "cross-site" },
  ])("also excludes request headers %j server-side", (headers) => {
    const request = serverRequest(headers);
    expect(shouldExcludeAnalyticsRequest(request)).toBe(true);
  });

  it("excludes forged admin or development page metadata", () => {
    const request = serverRequest();
    expect(shouldExcludeAnalyticsRequest(request)).toBe(false);
    expect(shouldExcludeAnalyticsRequest(request, { path: "/admin" })).toBe(true);
    expect(shouldExcludeAnalyticsRequest(request, { hostname: "localhost" })).toBe(true);
  });
});
