/**
 * Shared client collection policy for internal events, Umami, and Google Analytics.
 *
 * Keep this module browser-safe. The server analytics route applies its own
 * authorization and intake rules; this policy prevents opted-out, test, admin,
 * preview, and clearly automated browsers from emitting client events.
 */

export const ANALYTICS_PRODUCTION_HOSTS = [
  "stylekit.top",
  "www.stylekit.top",
] as const;

/** Both the browser preference and the readable exclusion cookie use this name. */
export const ANALYTICS_EXCLUSION_STORAGE_KEY = "stylekit-analytics-excluded";
export const ANALYTICS_EXCLUSION_COOKIE_NAME = "stylekit-analytics-excluded";

export const ANALYTICS_EXCLUSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
export const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-NVTV523BK9";

const AUTOMATION_USER_AGENT =
  /headlesschrome|headlessfirefox|phantomjs|playwright|puppeteer|selenium|webdriver|cypress|lighthouse|google-inspectiontool|googlebot|bingbot|duckduckbot|yandex(?:bot|images)|applebot|facebookexternalhit|twitterbot|slackbot|linkedinbot|discordbot|telegrambot|crawler|spider|\bbot\b/i;

export interface AnalyticsCollectionContext {
  hostname: string;
  pathname: string;
  search?: string;
  nodeEnv: string;
  analyticsDisabled?: boolean;
  optOutStorageValue?: string | null;
  cookie?: string | null;
  userAgent?: string | null;
  webdriver?: boolean;
  doNotTrack?: string | null;
  globalPrivacyControl?: boolean;
}

export interface AnalyticsCollectionBuildOptions {
  nodeEnv?: string;
  analyticsDisabled?: boolean;
}

export function isAnalyticsProductionHost(hostname: string): boolean {
  return (ANALYTICS_PRODUCTION_HOSTS as readonly string[]).includes(
    hostname.trim().toLowerCase(),
  );
}

export function isAnalyticsAdminPath(pathname: string): boolean {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.toLowerCase());

  if (segments[0] === "zh" || segments[0] === "en" || segments[0] === "zh-cn") {
    segments.shift();
  }

  return segments[0] === "admin" || segments[0] === "admin-login";
}

export function hasExplicitAutomationSignature(
  userAgent: string | null | undefined,
  webdriver = false,
): boolean {
  return webdriver || AUTOMATION_USER_AGENT.test(userAgent ?? "");
}

export function hasAnalyticsOptOutCookie(cookie: string | null | undefined): boolean {
  if (!cookie) return false;

  return cookie.split(";").some((part) => {
    const separator = part.indexOf("=");
    if (separator < 0) return false;

    const name = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    return name === ANALYTICS_EXCLUSION_COOKIE_NAME && value === "1";
  });
}

export function hasAnalyticsOptOutQuery(search: string | null | undefined): boolean {
  if (!search) return false;

  try {
    return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      .get("analytics") === "off";
  } catch {
    return false;
  }
}

export function isAnalyticsCollectionExcluded(
  context: AnalyticsCollectionContext,
): boolean {
  return (
    context.nodeEnv !== "production" ||
    context.analyticsDisabled === true ||
    !isAnalyticsProductionHost(context.hostname) ||
    isAnalyticsAdminPath(context.pathname) ||
    hasAnalyticsOptOutQuery(context.search) ||
    context.optOutStorageValue === "1" ||
    hasAnalyticsOptOutCookie(context.cookie) ||
    context.doNotTrack === "1" ||
    context.globalPrivacyControl === true ||
    hasExplicitAutomationSignature(context.userAgent, context.webdriver)
  );
}

/** Persist an explicit browser opt-out for future page loads and server checks. */
export function persistAnalyticsOptOut(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ANALYTICS_EXCLUSION_STORAGE_KEY, "1");
  } catch {
    // Storage can be disabled independently of the analytics choice.
  }

  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${ANALYTICS_EXCLUSION_COOKIE_NAME}=1; Path=/; Max-Age=${ANALYTICS_EXCLUSION_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  } catch {
    // Analytics must remain non-blocking if cookies are unavailable.
  }
}

function readClientContext(
  target?: Pick<Location, "hostname" | "pathname" | "search">,
): AnalyticsCollectionContext | null {
  if (typeof window === "undefined") return null;

  const location = target ?? window.location;
  if (hasAnalyticsOptOutQuery(location.search)) {
    persistAnalyticsOptOut();
  }

  const browserNavigator =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as Navigator & { globalPrivacyControl?: boolean });
  const browserWindow = window as Window & { doNotTrack?: string };

  let optOutStorageValue: string | null = null;
  try {
    optOutStorageValue = window.localStorage.getItem(ANALYTICS_EXCLUSION_STORAGE_KEY);
  } catch {
    // Continue with the cookie and current-page checks.
  }

  let cookie: string | null = null;
  try {
    cookie = document.cookie;
  } catch {
    // Continue without cookie state when the browser blocks access.
  }

  return {
    hostname: location.hostname,
    pathname: location.pathname,
    search: location.search,
    nodeEnv: process.env.NODE_ENV,
    analyticsDisabled: process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "true",
    optOutStorageValue,
    cookie,
    userAgent: browserNavigator?.userAgent,
    webdriver: browserNavigator?.webdriver === true,
    doNotTrack: browserNavigator?.doNotTrack ?? browserWindow.doNotTrack ?? null,
    globalPrivacyControl: browserNavigator?.globalPrivacyControl === true,
  };
}

export function isClientAnalyticsCollectionExcluded(
  target?: Pick<Location, "hostname" | "pathname" | "search">,
): boolean {
  const context = readClientContext(target);
  return context ? isAnalyticsCollectionExcluded(context) : true;
}

/**
 * Re-evaluate after client navigation and update GA's supported global kill
 * switch before browser-history pageview listeners can emit a hit.
 */
export function refreshClientAnalyticsCollectionPolicy(): boolean {
  if (typeof window === "undefined") return false;

  const excluded = isClientAnalyticsCollectionExcluded();
  const browserWindow = window as Window & {
    [key: `ga-disable-${string}`]: boolean | undefined;
    __stylekitAnalyticsExcluded?: boolean;
    __stylekitEnsureGoogleAnalytics?: () => void;
  };

  browserWindow[`ga-disable-${GOOGLE_ANALYTICS_MEASUREMENT_ID}`] = excluded;
  browserWindow.__stylekitAnalyticsExcluded = excluded;

  if (!excluded) {
    browserWindow.__stylekitEnsureGoogleAnalytics?.();
  }

  return !excluded;
}

/**
 * Install after the App Router hydrates so this guard wraps its History API
 * patch. The early inline bootstrap installs the same protection before any
 * analytics script can attach its own history listeners.
 */
export function installAnalyticsHistoryGuard(): void {
  if (typeof window === "undefined") return;

  const browserWindow = window as Window & {
    __stylekitAnalyticsHistoryGuardInstalled?: boolean;
    __stylekitInstallAnalyticsHistoryGuard?: () => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
    __stylekitAnalyticsExcluded?: boolean;
    __stylekitEnsureGoogleAnalytics?: () => void;
  };

  const applyPolicy = (
    target?: Pick<Location, "hostname" | "pathname" | "search">,
  ): boolean => {
    const excluded = isClientAnalyticsCollectionExcluded(target);
    browserWindow[`ga-disable-${GOOGLE_ANALYTICS_MEASUREMENT_ID}`] = excluded;
    browserWindow.__stylekitAnalyticsExcluded = excluded;
    return !excluded;
  };

  if (browserWindow.__stylekitInstallAnalyticsHistoryGuard) {
    browserWindow.__stylekitInstallAnalyticsHistoryGuard();
    refreshClientAnalyticsCollectionPolicy();
    return;
  }

  const history = window.history;
  if (history) {
    for (const method of ["pushState", "replaceState"] as const) {
      const original = history[method] as typeof history.pushState & {
        __stylekitAnalyticsGuard?: boolean;
      };
      if (original.__stylekitAnalyticsGuard) continue;

      const wrapped = function (
        this: History,
        ...args: Parameters<History[typeof method]>
      ) {
        const url = args[2];
        let nextLocation: URL | Location = window.location;
        if (typeof url === "string") {
          try {
            nextLocation = new URL(url, window.location.href);
          } catch {
            nextLocation = window.location;
          }
        }

        applyPolicy(nextLocation);
        const result = original.apply(this, args);
        if (applyPolicy()) {
          browserWindow.__stylekitEnsureGoogleAnalytics?.();
        }
        return result;
      } as typeof history[typeof method] & { __stylekitAnalyticsGuard?: boolean };
      wrapped.__stylekitAnalyticsGuard = true;
      history[method] = wrapped;
    }
  }

  if (!browserWindow.__stylekitAnalyticsHistoryGuardInstalled) {
    window.addEventListener("popstate", () => {
      if (applyPolicy()) {
        browserWindow.__stylekitEnsureGoogleAnalytics?.();
      }
    }, true);
    browserWindow.__stylekitAnalyticsHistoryGuardInstalled = true;
  }

  refreshClientAnalyticsCollectionPolicy();
}

/**
 * Run before the provider scripts. Umami calls the named `window` hook on
 * every send, while the history guard keeps GA disabled across excluded SPA
 * routes even when its script was loaded on an earlier public page.
 */
export function buildAnalyticsCollectionPolicyBootstrapScript(
  options: AnalyticsCollectionBuildOptions = {},
): string {
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV;
  const analyticsDisabled =
    options.analyticsDisabled ??
    process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "true";

  return `
(() => {
  if (typeof window === "undefined") return;

  const productionBuild = ${JSON.stringify(nodeEnv === "production")};
  const analyticsDisabled = ${JSON.stringify(analyticsDisabled)};
  const storageKey = ${JSON.stringify(ANALYTICS_EXCLUSION_STORAGE_KEY)};
  const cookieName = ${JSON.stringify(ANALYTICS_EXCLUSION_COOKIE_NAME)};
  const cookieMaxAge = ${JSON.stringify(ANALYTICS_EXCLUSION_COOKIE_MAX_AGE_SECONDS)};
  const measurementId = ${JSON.stringify(GOOGLE_ANALYTICS_MEASUREMENT_ID)};
  const allowedHosts = ${JSON.stringify(ANALYTICS_PRODUCTION_HOSTS)};
  const automationUserAgent = /${AUTOMATION_USER_AGENT.source}/${AUTOMATION_USER_AGENT.flags};

  const persistOptOut = () => {
    try { window.localStorage.setItem(storageKey, "1"); } catch {}
    try {
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = cookieName + "=1; Path=/; Max-Age=" + cookieMaxAge + "; SameSite=Lax" + secure;
    } catch {}
  };

  const readCookieOptOut = () => {
    try {
      return document.cookie.split(";").some((part) => {
        const separator = part.indexOf("=");
        return separator >= 0 && part.slice(0, separator).trim() === cookieName && part.slice(separator + 1).trim() === "1";
      });
    } catch { return false; }
  };

  const isAdminPath = (pathname) => {
    const segments = String(pathname || "/").split("/").filter(Boolean).map((segment) => segment.toLowerCase());
    if (["zh", "en", "zh-cn"].includes(segments[0])) segments.shift();
    return segments[0] === "admin" || segments[0] === "admin-login";
  };

  const resolveTarget = (url) => {
    if (url && typeof url === "object" && typeof url.pathname === "string") return url;
    if (url == null) return window.location;
    try { return new URL(String(url), window.location.href); } catch { return window.location; }
  };

  const isExcluded = (url) => {
    const target = resolveTarget(url);
    const search = target.search || "";
    let queryOptOut = false;
    try { queryOptOut = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("analytics") === "off"; } catch {}
    if (queryOptOut) persistOptOut();

    const browserNavigator = window.navigator || {};
    let storageOptOut = false;
    try { storageOptOut = window.localStorage.getItem(storageKey) === "1"; } catch {}
    const browserDnt = browserNavigator.doNotTrack === "1" || window.doNotTrack === "1";
    const globalPrivacyControl = browserNavigator.globalPrivacyControl === true;
    const automation = browserNavigator.webdriver === true || automationUserAgent.test(browserNavigator.userAgent || "");

    return !productionBuild || analyticsDisabled ||
      !allowedHosts.includes(String(target.hostname || "").toLowerCase()) ||
      isAdminPath(target.pathname) || queryOptOut || storageOptOut || readCookieOptOut() ||
      browserDnt || globalPrivacyControl || automation;
  };

  const setGaDisabled = (excluded) => {
    window["ga-disable-" + measurementId] = excluded;
    window.__stylekitAnalyticsExcluded = excluded;
  };

  const refresh = () => {
    const excluded = isExcluded(window.location);
    setGaDisabled(excluded);
    return excluded;
  };

  const afterNavigation = () => {
    const excluded = refresh();
    if (!excluded && typeof window.__stylekitEnsureGoogleAnalytics === "function") {
      window.__stylekitEnsureGoogleAnalytics();
    }
    return excluded;
  };

  const applyBeforeNavigation = (url) => {
    const excluded = isExcluded(resolveTarget(url));
    setGaDisabled(excluded);
    return excluded;
  };

  window.__stylekitIsAnalyticsExcluded = () => refresh();
  window.__stylekitRefreshAnalyticsPolicy = afterNavigation;
  window.stylekitAnalyticsBeforeSend = (type, payload) => {
    void type;
    return refresh() ? false : payload;
  };

  const installHistoryGuard = () => {
    if (!window.history) return;
    ["pushState", "replaceState"].forEach((method) => {
      const original = window.history[method];
      if (typeof original !== "function" || original.__stylekitAnalyticsGuard) return;
      const wrapped = function () {
        const url = arguments.length > 2 ? arguments[2] : null;
        applyBeforeNavigation(url);
        const result = original.apply(this, arguments);
        afterNavigation();
        return result;
      };
      wrapped.__stylekitAnalyticsGuard = true;
      window.history[method] = wrapped;
    });
    if (!window.__stylekitAnalyticsPopstateGuardInstalled) {
      window.addEventListener("popstate", afterNavigation, true);
      window.__stylekitAnalyticsPopstateGuardInstalled = true;
    }
  };

  window.__stylekitInstallAnalyticsHistoryGuard = installHistoryGuard;
  installHistoryGuard();
  refresh();
})();
`;
}

export const ANALYTICS_COLLECTION_POLICY_BOOTSTRAP_SCRIPT =
  buildAnalyticsCollectionPolicyBootstrapScript();

declare global {
  interface Window {
    stylekitAnalyticsBeforeSend?: (
      type: string,
      payload: Record<string, unknown>,
    ) => Record<string, unknown> | false;
    __stylekitIsAnalyticsExcluded?: () => boolean;
    __stylekitRefreshAnalyticsPolicy?: () => boolean;
    __stylekitInstallAnalyticsHistoryGuard?: () => void;
    __stylekitAnalyticsHistoryGuardInstalled?: boolean;
    __stylekitAnalyticsPopstateGuardInstalled?: boolean;
    __stylekitAnalyticsExcluded?: boolean;
    __stylekitEnsureGoogleAnalytics?: () => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
