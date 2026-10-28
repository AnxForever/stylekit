import {
  ANALYTICS_PRODUCTION_HOSTS,
  hasAnalyticsOptOutCookie,
  hasAnalyticsOptOutQuery,
  hasExplicitAutomationSignature,
  isAnalyticsAdminPath,
} from "@/lib/analytics/collection-policy";

export type AnalyticsCollectionSkipReason =
  | "internal"
  | "automation"
  | "non-production-host";

const canonicalHosts = new Set<string>(ANALYTICS_PRODUCTION_HOSTS);
const nonBrowserClientPattern =
  /(?:curl\/|wget\/|python-requests|python-urllib|httpx\/|aiohttp\/|node-fetch\/|go-http-client\/)/i;

/**
 * Decide whether a syntactically valid analytics event should be collected.
 * The runtime host comes from the request and trusted proxy headers, never the
 * hostname property in the client event payload.
 */
export function getServerAnalyticsCollectionSkipReason(
  request: Request,
  eventData?: unknown,
): AnalyticsCollectionSkipReason | null {
  if (hasAnalyticsExclusionCookie(request)) return "internal";

  const requestUrl = tryParseUrl(request.url);
  if (requestUrl && hasAnalyticsOptOutQuery(requestUrl.search)) {
    return "internal";
  }

  const eventPath = readEventPath(eventData);
  if (eventPath && isInternalAnalyticsPath(eventPath)) return "internal";
  if (eventPath && hasAnalyticsOffQueryFromPath(eventPath)) return "internal";

  if (isAutomatedClient(request.headers)) return "automation";
  if (!getCanonicalAnalyticsRuntimeHost(request)) return "non-production-host";

  return null;
}

/** Returns the canonical runtime hostname used for stored page-view data. */
export function getCanonicalAnalyticsRuntimeHost(request: Request): string | null {
  const requestUrl = tryParseUrl(request.url);
  const requestHost = getHostname(request.headers.get("host"));
  const urlHost = requestUrl?.hostname.toLowerCase() ?? null;

  // Prefer the URL/Host values established by the application server or
  // reverse proxy. A mismatch with an unknown non-loopback host is rejected;
  // the client event's hostname is never consulted.
  const directHosts = [urlHost, requestHost].filter(
    (candidate): candidate is string => candidate !== null,
  );
  const publicDirectHosts = directHosts.filter(
    (candidate) => !isLoopbackHostname(candidate),
  );
  if (publicDirectHosts.length > 0) {
    if (!publicDirectHosts.every((candidate) => canonicalHosts.has(candidate))) {
      return null;
    }
    return publicDirectHosts[0] ?? null;
  }

  // Some reverse proxies expose their loopback upstream URL to Next.js while
  // forwarding the public host separately. Only honor that forwarded host when
  // both direct host values are loopback and the proxy reports HTTPS. The
  // production site runs behind a local reverse proxy; arbitrary preview hosts
  // and externally supplied X-Forwarded-Host values remain excluded.
  const forwardedHost = getHostname(request.headers.get("x-forwarded-host"));
  const forwardedProto = firstHeaderValue(request.headers.get("x-forwarded-proto"))
    ?.toLowerCase();
  if (
    directHosts.length > 0 &&
    directHosts.every(isLoopbackHostname) &&
    forwardedProto === "https" &&
    forwardedHost &&
    canonicalHosts.has(forwardedHost)
  ) {
    return forwardedHost;
  }

  return null;
}

export function hasAnalyticsExclusionCookie(request: Request): boolean {
  return hasAnalyticsOptOutCookie(request.headers.get("cookie"));
}

export function isAnalyticsAutomationRequest(request: Request): boolean {
  return isAutomatedClient(request.headers);
}

function isAutomatedClient(headers: Headers): boolean {
  const userAgent = headers.get("user-agent") ?? "";
  const clientHints = headers.get("sec-ch-ua") ?? "";
  const signature = `${userAgent}\n${clientHints}`;
  return (
    hasExplicitAutomationSignature(signature) ||
    nonBrowserClientPattern.test(signature)
  );
}

function readEventPath(eventData: unknown): string | null {
  if (!eventData || typeof eventData !== "object" || Array.isArray(eventData)) {
    return null;
  }
  const path = (eventData as { path?: unknown }).path;
  return typeof path === "string" ? path : null;
}

function isInternalAnalyticsPath(value: string): boolean {
  const url = tryParseUrl(value);
  return url ? isAnalyticsAdminPath(url.pathname) : false;
}

function hasAnalyticsOffQueryFromPath(value: string): boolean {
  const url = tryParseUrl(value);
  return url ? hasAnalyticsOptOutQuery(url.search) : false;
}

function getHostname(value: string | null): string | null {
  const candidate = firstHeaderValue(value);
  if (!candidate || /[\s/\\@]/.test(candidate)) return null;

  try {
    const url = new URL(`http://${candidate}`);
    return url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  } catch {
    return null;
  }
}

function firstHeaderValue(value: string | null): string | null {
  const first = value?.split(",", 1)[0]?.trim();
  return first || null;
}

function isLoopbackHostname(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "::1" ||
    hostname === "[::1]" ||
    /^127(?:\.\d{1,3}){3}$/.test(hostname)
  );
}

function tryParseUrl(value: string): URL | null {
  try {
    return new URL(value, "https://www.stylekit.top");
  } catch {
    return null;
  }
}
