import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import {
  GOOGLE_ANALYTICS_BOOTSTRAP_SCRIPT,
  GOOGLE_ANALYTICS_ID,
} from "@/lib/analytics/google-analytics";
import { isAnalyticsCollectionExcluded } from "@/lib/analytics/collection-policy";

function createBrowser(hostname = "www.stylekit.top", pathname = "/") {
  const scripts: Array<{ id?: string; async?: boolean; src?: string }> = [];
  const window = {
    location: {
      hostname,
      pathname,
      search: "",
      protocol: "https:",
      href: `https://${hostname}${pathname}`,
    },
    doNotTrack: "",
    dataLayer: [] as IArguments[],
    localStorage: { getItem: () => null, setItem: () => {} },
  };
  const navigator = {
    doNotTrack: "",
    globalPrivacyControl: false,
    webdriver: false,
    userAgent: "Mozilla/5.0 Chrome/130.0",
  };
  const document = {
    cookie: "",
    getElementById: (id: string) => scripts.find((script) => script.id === id),
    createElement: () => ({}),
    head: { appendChild: (script: (typeof scripts)[number]) => scripts.push(script) },
  };
  (window as typeof window & { __stylekitIsAnalyticsExcluded: () => boolean })
    .__stylekitIsAnalyticsExcluded = () => isAnalyticsCollectionExcluded({
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      search: window.location.search,
      nodeEnv: "production",
      analyticsDisabled: false,
      cookie: document.cookie,
      userAgent: navigator.userAgent,
      webdriver: navigator.webdriver,
      doNotTrack: navigator.doNotTrack || window.doNotTrack,
      globalPrivacyControl: navigator.globalPrivacyControl,
    });
  const context = { window, navigator, document };
  return { ...context, scripts, run: () => runInNewContext(GOOGLE_ANALYTICS_BOOTSTRAP_SCRIPT, context) };
}

describe("Google Analytics bootstrap", () => {
  it.each(["stylekit.top", "www.stylekit.top"])("initializes once on %s", (hostname) => {
    const browser = createBrowser(hostname);
    browser.run();
    browser.run();

    expect(browser.scripts).toEqual([{
      id: "google-analytics-tag",
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`,
    }]);
    const commands = browser.window.dataLayer.map((args) => Array.from(args));
    expect(commands).toHaveLength(2);
    expect(commands[0][0]).toBe("js");
    expect(commands[1]).toEqual(["config", "G-NVTV523BK9", {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    }]);
  });

  it.each(["localhost", "127.0.0.1", "stylekit-preview.vercel.app", "stylekit.top.example.com"])(
    "does not load or queue measurement on %s",
    (hostname) => {
      const browser = createBrowser(hostname);
      browser.run();
      expect(browser.scripts).toEqual([]);
      expect(browser.window.dataLayer).toEqual([]);
    },
  );

  it.each(["navigator", "window", "gpc"])("respects the %s privacy signal", (signal) => {
    const browser = createBrowser();
    if (signal === "navigator") browser.navigator.doNotTrack = "1";
    if (signal === "window") browser.window.doNotTrack = "1";
    if (signal === "gpc") browser.navigator.globalPrivacyControl = true;
    browser.run();
    expect(browser.scripts).toEqual([]);
    expect(browser.window.dataLayer).toEqual([]);
  });

  it("preserves an existing data layer", () => {
    const browser = createBrowser();
    const dataLayer = browser.window.dataLayer;
    browser.run();
    expect(browser.window.dataLayer).toBe(dataLayer);
  });

  it("disables an already loaded tag before an admin route sends more data", () => {
    const browser = createBrowser("www.stylekit.top");
    browser.run();

    browser.window.location.pathname = "/admin/analytics";
    browser.run();

    expect((browser.window as unknown as Record<string, unknown>)[
      `ga-disable-${GOOGLE_ANALYTICS_ID}`
    ]).toBe(true);
    expect(browser.scripts).toHaveLength(1);
  });
});
