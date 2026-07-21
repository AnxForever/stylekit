import { afterEach, describe, expect, it, vi } from "vitest";

import {
  isSemanticBackLabel,
  navigateBackOrFallback,
} from "@/lib/navigation/smart-back";

function installBrowserState({
  pathname,
  historyLength,
  referrer = "",
  cookie = "",
  historyState = null,
  savedEntries = {},
}: {
  pathname: string;
  historyLength: number;
  referrer?: string;
  cookie?: string;
  historyState?: unknown;
  savedEntries?: Record<string, string>;
}) {
  const storage = new Map(Object.entries(savedEntries));

  vi.stubGlobal("window", {
    location: {
      origin: "https://stylekit.dev",
      pathname,
    },
    history: { length: historyLength, state: historyState },
  });
  vi.stubGlobal("document", { referrer, cookie });
  vi.stubGlobal("sessionStorage", {
    getItem: (key: string) => storage.get(key) ?? null,
    removeItem: (key: string) => storage.delete(key),
    setItem: (key: string, value: string) => storage.set(key, value),
  });

  return storage;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("navigateBackOrFallback", () => {
  it("returns through browser history before using a fixed or saved destination", () => {
    const storage = installBrowserState({
      pathname: "/zh/styles/neo-brutalist/showcase",
      historyLength: 3,
      referrer: "https://stylekit.dev/zh/styles/neo-brutalist?category=bold",
      savedEntries: {
        "styles-return-url": "/zh/styles?category=bold&sort=popular",
      },
    });
    const router = { back: vi.fn(), push: vi.fn() };

    navigateBackOrFallback(router, {
      href: "/styles",
      savedReturnUrlKey: "styles-return-url",
      fallbackHref: "/styles",
    });

    expect(router.back).toHaveBeenCalledOnce();
    expect(router.push).not.toHaveBeenCalled();
    expect(storage.get("styles-return-url")).toBe(
      "/zh/styles?category=bold&sort=popular"
    );
  });

  it("uses a locale-preserving fallback for a direct entry", () => {
    installBrowserState({
      pathname: "/zh/styles/neo-brutalist/showcase",
      historyLength: 1,
    });
    const router = { back: vi.fn(), push: vi.fn() };

    navigateBackOrFallback(router, {
      fallbackHref: "/styles/neo-brutalist",
    });

    expect(router.back).not.toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/zh/styles/neo-brutalist");
  });

  it("does not leave the site when the only previous document is cross-origin", () => {
    installBrowserState({
      pathname: "/en/templates/pricing-page",
      historyLength: 2,
      referrer: "https://x.com/some-post",
    });
    const router = { back: vi.fn(), push: vi.fn() };

    navigateBackOrFallback(router, { fallbackHref: "/templates" });

    expect(router.back).not.toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/en/templates");
  });

  it("returns to an app-owned history entry even when the initial referrer is external", () => {
    installBrowserState({
      pathname: "/styles/neo-brutalist/showcase",
      historyLength: 4,
      referrer: "https://x.com/some-post",
      historyState: { __stylekitAppHistoryIndex: 2 },
    });
    const router = { back: vi.fn(), push: vi.fn() };

    navigateBackOrFallback(router, {
      fallbackHref: "/styles/neo-brutalist",
    });

    expect(router.back).toHaveBeenCalledOnce();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("uses the locale cookie for an unprefixed Showcase fallback", () => {
    installBrowserState({
      pathname: "/styles/neo-brutalist/showcase",
      historyLength: 1,
      cookie: "stylekit-locale=zh",
    });
    const router = { back: vi.fn(), push: vi.fn() };

    navigateBackOrFallback(router, {
      fallbackHref: "/styles/neo-brutalist",
    });

    expect(router.push).toHaveBeenCalledWith("/zh/styles/neo-brutalist");
  });
});

describe("isSemanticBackLabel", () => {
  it.each(["Back", "Back to Blog", "返回", "返回目录", "← StyleKit", "← 全部合集"])(
    "recognizes %s as a back control",
    (label) => {
      expect(isSemanticBackLabel(label)).toBe(true);
    }
  );

  it.each(["All Styles", "Documentation", "StyleKit", "View Showcase"])(
    "keeps %s as ordinary navigation",
    (label) => {
      expect(isSemanticBackLabel(label)).toBe(false);
    }
  );
});
