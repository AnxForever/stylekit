/** Shared collection boundaries. Identifiers are never used to bypass an opt-out. */
export const ANALYTICS_OPT_OUT_KEY = "stylekit-analytics-excluded";

export function isAnalyticsHostname(hostname: string): boolean {
  return ["stylekit.top", "www.stylekit.top"].includes(hostname.toLowerCase());
}

export function isExcludedAnalyticsPath(pathname: string): boolean {
  const path = pathname.replace(/^\/(?:en|zh)(?=\/|$)/, "") || "/";
  return /^\/(?:admin|admin-login|api|auth|login|umami)(?:\/|$)/i.test(path);
}

export function isAnalyticsBot(userAgent: string): boolean {
  return /bot\b|crawler|spider|headless|playwright|puppeteer|selenium|curl\b|wget\b|preview/i.test(userAgent);
}

export function isAnalyticsDisabled(): boolean {
  return ["1", "true"].includes(process.env.NEXT_PUBLIC_ANALYTICS_DISABLED ?? "");
}

export function canCollectClientAnalytics(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  if (window.self !== window.top) return false;
  if (process.env.NODE_ENV !== "production" || isAnalyticsDisabled()) return false;
  if (!isAnalyticsHostname(window.location.hostname) || isExcludedAnalyticsPath(window.location.pathname)) return false;
  const privacyNavigator = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || privacyNavigator.globalPrivacyControl) return false;
  if (navigator.webdriver || isAnalyticsBot(navigator.userAgent ?? "")) return false;
  try {
    const excluded = window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY);
    if (excluded !== null && excluded !== "0" && excluded !== "false") return false;
  } catch {
    // A blocked store means unidentified telemetry, not a newly invented visitor.
  }
  return true;
}

export function shouldExcludeAnalyticsRequest(
  request: Request,
  page?: Record<string, unknown>,
): boolean {
  if (isAnalyticsDisabled() || process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") return true;
  if (request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1") return true;
  if (isAnalyticsBot(request.headers.get("user-agent") ?? "")) return true;
  if (request.headers.get("sec-fetch-site") === "cross-site") return true;
  try {
    const origin = new URL(request.headers.get("origin") ?? "");
    const requestHost = (request.headers.get("x-forwarded-host")?.split(",")[0]?.trim()
      || request.headers.get("host") || new URL(request.url).host).toLowerCase();
    if (!isAnalyticsHostname(origin.hostname) || origin.host.toLowerCase() !== requestHost) return true;
    const referrer = request.headers.get("referer");
    if (referrer) {
      const url = new URL(referrer);
      if (!isAnalyticsHostname(url.hostname) || isExcludedAnalyticsPath(url.pathname)) return true;
    }
    if (typeof page?.hostname === "string" && (page.hostname.toLowerCase() !== origin.hostname.toLowerCase() || !isAnalyticsHostname(page.hostname))) return true;
    if (typeof page?.path === "string" && isExcludedAnalyticsPath(page.path)) return true;
  } catch {
    return true;
  }
  return false;
}
