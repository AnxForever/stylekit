/**
 * Umami constants shared by the browser and the server.
 *
 * Kept in its own module because `lib/analytics/umami-api.ts` is `server-only`
 * (it holds the login path), while the tracker script tag is rendered from a
 * client component and may only import from a client-safe file.
 */

/** Host serving both the site and its self-hosted Umami instance. */
export const UMAMI_HOST = "www.stylekit.top";

/**
 * Tracker script. The instance is mounted under `/umami`, so the script lives
 * there too and derives its own `/umami/api/send` endpoint from that path.
 */
export const UMAMI_SCRIPT_URL = `https://${UMAMI_HOST}/umami/script.js`;

/**
 * Hostnames the tracker is allowed to record, so preview deploys and localhost
 * never pollute production analytics. Both the apex and the `www` host are
 * listed because the tracker matches `window.location.hostname` exactly.
 */
export const UMAMI_TRACKING_HOSTS = ["stylekit.top", "www.stylekit.top"] as const;

/** Rendered value of the tracker's `data-domains` attribute. */
export const UMAMI_TRACKING_DOMAINS = UMAMI_TRACKING_HOSTS.join(", ");

/** Asia/Shanghai matches every other date bucket the admin surfaces render. */
export const UMAMI_TIMEZONE = "Asia/Shanghai";
