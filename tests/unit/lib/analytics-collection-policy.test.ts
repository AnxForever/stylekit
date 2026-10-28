import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import {
  ANALYTICS_COLLECTION_POLICY_BOOTSTRAP_SCRIPT,
  ANALYTICS_EXCLUSION_COOKIE_NAME,
  ANALYTICS_EXCLUSION_STORAGE_KEY,
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  buildAnalyticsCollectionPolicyBootstrapScript,
  hasAnalyticsOptOutCookie,
  hasAnalyticsOptOutQuery,
  hasExplicitAutomationSignature,
  isAnalyticsAdminPath,
  isAnalyticsCollectionExcluded,
  isAnalyticsProductionHost,
} from "@/lib/analytics/collection-policy";

function productionContext(
  overrides: Partial<Parameters<typeof isAnalyticsCollectionExcluded>[0]> = {},
) {
  return {
    hostname: "www.stylekit.top",
    pathname: "/styles",
    search: "",
    nodeEnv: "production",
    analyticsDisabled: false,
    userAgent: "Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36",
    webdriver: false,
    doNotTrack: "",
    globalPrivacyControl: false,
    ...overrides,
  };
}

function createBrowser(url: string) {
  const initial = new URL(url);
  const location = {
    hostname: initial.hostname,
    pathname: initial.pathname,
    search: initial.search,
    protocol: initial.protocol,
    href: initial.href,
  };
  const values = new Map<string, string>();
  const listeners = new Map<string, Array<(...args: unknown[]) => void>>();
  const navigator = {
    doNotTrack: "",
    globalPrivacyControl: false,
    webdriver: false,
    userAgent: "Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36",
  };
  const history = {
    pushState(_state: unknown, _title: string, path?: string | URL | null) {
      if (path != null) updateLocation(String(path));
    },
    replaceState(_state: unknown, _title: string, path?: string | URL | null) {
      if (path != null) updateLocation(String(path));
    },
  };
  const window = {
    location,
    navigator,
    history,
    localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
    doNotTrack: "",
    addEventListener: (name: string, listener: (...args: unknown[]) => void) => {
      const group = listeners.get(name) ?? [];
      group.push(listener);
      listeners.set(name, group);
    },
  };
  const document = {
    cookie: "",
  };

  function updateLocation(nextUrl: string) {
    const next = new URL(nextUrl, location.href);
    Object.assign(location, {
      hostname: next.hostname,
      pathname: next.pathname,
      search: next.search,
      protocol: next.protocol,
      href: next.href,
    });
  }

  runInNewContext(
    buildAnalyticsCollectionPolicyBootstrapScript({
      nodeEnv: "production",
      analyticsDisabled: false,
    }),
    { window, navigator, document, URL, URLSearchParams },
  );

  return {
    window,
    document,
    values,
    listeners,
    navigate: (path: string) => window.history.pushState({}, "", path),
    runPopstate: () => listeners.get("popstate")?.forEach((listener) => listener()),
  };
}

describe("analytics collection policy", () => {
  it("uses the same opt-out key for the browser preference and cookie", () => {
    expect(ANALYTICS_EXCLUSION_STORAGE_KEY).toBe("stylekit-analytics-excluded");
    expect(ANALYTICS_EXCLUSION_COOKIE_NAME).toBe("stylekit-analytics-excluded");
  });

  it.each(["stylekit.top", "www.stylekit.top"])(
    "accepts only canonical production host %s",
    (hostname) => {
      expect(isAnalyticsProductionHost(hostname)).toBe(true);
      expect(isAnalyticsCollectionExcluded(productionContext({ hostname }))).toBe(false);
    },
  );

  it.each([
    "localhost",
    "127.0.0.1",
    "preview.stylekit.top",
    "stylekit-preview.vercel.app",
    "stylekit.top.example.com",
  ])("rejects non-production host %s", (hostname) => {
    expect(isAnalyticsProductionHost(hostname)).toBe(false);
    expect(isAnalyticsCollectionExcluded(productionContext({ hostname }))).toBe(true);
  });

  it.each(["/admin", "/admin/analytics", "/zh/admin", "/zh-CN/admin-login"])(
    "excludes admin path %s",
    (pathname) => {
      expect(isAnalyticsAdminPath(pathname)).toBe(true);
      expect(isAnalyticsCollectionExcluded(productionContext({ pathname }))).toBe(true);
    },
  );

  it("does not infer an admin path from an unrelated nested route", () => {
    expect(isAnalyticsAdminPath("/styles/admin-dashboard" )).toBe(false);
    expect(isAnalyticsCollectionExcluded(productionContext({
      pathname: "/styles/admin-dashboard",
    }))).toBe(false);
  });

  it.each(["development", "test", "preview"])(
    "excludes NODE_ENV=%s",
    (nodeEnv) => {
      expect(isAnalyticsCollectionExcluded(productionContext({ nodeEnv }))).toBe(true);
    },
  );

  it("honors the global analytics-disabled flag", () => {
    expect(isAnalyticsCollectionExcluded(productionContext({ analyticsDisabled: true }))).toBe(true);
  });

  it("persists only an explicit analytics=off query and opt-out state", () => {
    expect(hasAnalyticsOptOutQuery("?analytics=off&utm_source=test")).toBe(true);
    expect(hasAnalyticsOptOutQuery("?analytics=on")).toBe(false);
    expect(hasAnalyticsOptOutQuery("?utm_source=test")).toBe(false);
    expect(isAnalyticsCollectionExcluded(productionContext({ search: "?analytics=off" }))).toBe(true);
    expect(isAnalyticsCollectionExcluded(productionContext({ search: "?analytics=on" }))).toBe(false);
    expect(isAnalyticsCollectionExcluded(productionContext({
      optOutStorageValue: "1",
    }))).toBe(true);
    expect(hasAnalyticsOptOutCookie("other=1; stylekit-analytics-excluded=1")).toBe(true);
    expect(hasAnalyticsOptOutCookie("other-stylekit-analytics-excluded=1")).toBe(false);
    expect(isAnalyticsCollectionExcluded(productionContext({
      cookie: "stylekit-analytics-excluded=1",
    }))).toBe(true);
  });

  it.each([
    ["navigator.webdriver", { webdriver: true }],
    ["HeadlessChrome UA", { userAgent: "Mozilla/5.0 HeadlessChrome/130.0" }],
    ["Playwright UA", { userAgent: "Playwright/1.58.0" }],
    ["crawler UA", { userAgent: "Googlebot/2.1" }],
  ])("excludes explicit automation signature: %s", (_label, overrides) => {
    expect(isAnalyticsCollectionExcluded(productionContext(overrides))).toBe(true);
  });

  it("keeps normal fast browsing and unknown user agents eligible", () => {
    expect(hasExplicitAutomationSignature("Mozilla/5.0 Chrome/130.0" )).toBe(false);
    expect(isAnalyticsCollectionExcluded(productionContext({
      userAgent: "Fast Chrome/130.0 page load",
    }))).toBe(false);
  });

  it.each([
    ["DNT", { doNotTrack: "1" }],
    ["GPC", { globalPrivacyControl: true }],
  ])("respects the existing %s privacy signal", (_label, overrides) => {
    expect(isAnalyticsCollectionExcluded(productionContext(overrides))).toBe(true);
  });

  it("registers Umami's named before-send callback before its script is loaded", () => {
    expect(ANALYTICS_COLLECTION_POLICY_BOOTSTRAP_SCRIPT).toContain(
      "window.stylekitAnalyticsBeforeSend",
    );
    expect(ANALYTICS_COLLECTION_POLICY_BOOTSTRAP_SCRIPT).toContain(
      "window.__stylekitInstallAnalyticsHistoryGuard = installHistoryGuard",
    );
  });

  it("updates Umami and GA exclusion on SPA navigation and persists analytics=off", () => {
    const browser = createBrowser("https://www.stylekit.top/styles");
    const beforeSend = (browser.window as unknown as {
      stylekitAnalyticsBeforeSend: (type: string, payload: object) => object | false;
    }).stylekitAnalyticsBeforeSend;
    const allowedPayload = { page: "/styles" };

    expect(beforeSend("pageview", allowedPayload)).toBe(allowedPayload);
    expect((browser.window as unknown as Record<string, unknown>)[
      `ga-disable-${GOOGLE_ANALYTICS_MEASUREMENT_ID}`
    ]).toBe(false);

    browser.navigate("/admin/analytics");
    expect(beforeSend("pageview", { page: "/admin/analytics" })).toBe(false);
    expect((browser.window as unknown as Record<string, unknown>)[
      `ga-disable-${GOOGLE_ANALYTICS_MEASUREMENT_ID}`
    ]).toBe(true);

    browser.navigate("/styles?analytics=off");
    expect(browser.values.get(ANALYTICS_EXCLUSION_STORAGE_KEY)).toBe("1");
    expect(browser.document.cookie).toContain("stylekit-analytics-excluded=1");
    expect(beforeSend("pageview", { page: "/styles" })).toBe(false);
  });

  it("re-evaluates back navigation against the current pathname", () => {
    const browser = createBrowser("https://www.stylekit.top/styles");
    browser.navigate("/admin");
    browser.window.history.replaceState({}, "", "/styles");

    expect((browser.window as unknown as Record<string, unknown>)[
      `ga-disable-${GOOGLE_ANALYTICS_MEASUREMENT_ID}`
    ]).toBe(false);

    browser.window.history.replaceState({}, "", "/admin");
    browser.runPopstate();
    expect((browser.window as unknown as Record<string, unknown>)[
      `ga-disable-${GOOGLE_ANALYTICS_MEASUREMENT_ID}`
    ]).toBe(true);
  });
});
