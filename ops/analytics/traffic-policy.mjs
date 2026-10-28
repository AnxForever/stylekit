export const ANALYTICS_POLICY_VERSION = "2026-10-22-v1";
export const ANALYTICS_TIMEZONE = "Asia/Shanghai";
export const CANONICAL_HOSTS = ["stylekit.top", "www.stylekit.top"];

export const INTERNAL_TAGS = ["internal-test", "qa"];
export const AUTOMATION_TAGS = ["automated-test", "bot", "automation"];
export const AUTOMATION_BROWSERS = ["headlesschrome", "phantomjs", "bot"];

const ADMIN_PATH_PATTERN = /^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?(?:admin|admin-login)(?:\/|$)/i;
const TECHNICAL_PATH_PATTERN = /^\/(?:api|_next|umami)(?:\/|$)|^\/(?:robots\.txt|sitemap\.xml)$/i;

function normalizeHostname(hostname) {
  return String(hostname ?? "")
    .trim()
    .toLowerCase()
    .replace(/:[0-9]+$/, "");
}

function normalizePath(pathname) {
  const path = String(pathname ?? "").split(/[?#]/, 1)[0].trim();
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function normalizeTag(tag) {
  return String(tag ?? "").trim().toLowerCase();
}

function hasExplicitQaQuery(urlQuery) {
  const query = String(urlQuery ?? "").replace(/^\?/, "");
  return query.split("&").some((part) => {
    const separator = part.indexOf("=");
    if (separator < 0) return false;
    return part.slice(0, separator) === "analytics" && part.slice(separator + 1) === "off";
  });
}

/**
 * Return one exclusion reason for a pageview, or null when it is eligible.
 * Rule order is deliberate so every excluded pageview contributes to one
 * reason only: host/technical path, internal traffic, then automation.
 */
export function classifyPageview(event) {
  const hostname = normalizeHostname(event?.hostname);
  if (!CANONICAL_HOSTS.includes(hostname)) return "non_production";

  const pathname = normalizePath(event?.urlPath ?? event?.url_path);
  if (TECHNICAL_PATH_PATTERN.test(pathname)) return "non_production";

  const tag = normalizeTag(event?.tag);
  if (
    ADMIN_PATH_PATTERN.test(pathname) ||
    hasExplicitQaQuery(event?.urlQuery ?? event?.url_query) ||
    INTERNAL_TAGS.includes(tag)
  ) {
    return "internal";
  }

  const browser = normalizeTag(event?.browser);
  if (AUTOMATION_TAGS.includes(tag) || AUTOMATION_BROWSERS.includes(browser)) {
    return "automation";
  }

  return null;
}

function sqlText(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

/** Build the SQL CASE expression from the same policy constants as the JS classifier. */
export function buildExclusionReasonSql(eventAlias = "we", sessionAlias = "s") {
  const hostname = `regexp_replace(lower(trim(coalesce(${eventAlias}.hostname, ''))), ':[0-9]+$', '')`;
  const tag = `lower(trim(coalesce(${eventAlias}.tag, '')))`;
  const browser = `lower(trim(coalesce(${sessionAlias}.browser, '')))`;
  const hostList = CANONICAL_HOSTS.map(sqlText).join(", ");
  const internalTags = INTERNAL_TAGS.map(sqlText).join(", ");
  const automationTags = AUTOMATION_TAGS.map(sqlText).join(", ");
  const automationBrowsers = AUTOMATION_BROWSERS.map(sqlText).join(", ");

  return `CASE
    WHEN ${hostname} <> ALL (ARRAY[${hostList}]::text[]) THEN 'non_production'
    WHEN coalesce(${eventAlias}.url_path, '') ~* '^/(?:api|_next|umami)(?:/|$)|^/(?:robots\\.txt|sitemap\\.xml)$' THEN 'non_production'
    WHEN coalesce(${eventAlias}.url_path, '') ~* '^/(?:[a-z]{2}(?:-[a-z]{2})?/)?(?:admin|admin-login)(?:/|$)'
      OR coalesce(${eventAlias}.url_query, '') ~ '(^|[?&])analytics=off(&|$)'
      OR ${tag} = ANY (ARRAY[${internalTags}]::text[]) THEN 'internal'
    WHEN ${browser} = ANY (ARRAY[${automationBrowsers}]::text[])
      OR ${tag} = ANY (ARRAY[${automationTags}]::text[]) THEN 'automation'
    ELSE NULL
  END`;
}
