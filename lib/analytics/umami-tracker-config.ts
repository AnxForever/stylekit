import "server-only";

/**
 * Umami tracker tag configuration, resolved on the server at render time.
 *
 * `NEXT_PUBLIC_*` variables are inlined into the bundle by `next build`, so a
 * build machine without them silently tree-shakes the tracker `<Script>` out of
 * every page — which is how tracking disappeared from production once already.
 * Reading plain server variables instead means `.env.production` + a service
 * restart is enough for dynamic routes and for any page that revalidates. The
 * `NEXT_PUBLIC_*` names stay supported as a fallback so existing deployments
 * keep working unchanged.
 *
 * Pages prerendered without a revalidate window are still rendered during the
 * build and never refresh afterwards, so those keep whatever the build machine
 * had. That is why the deploy runbook checks the built HTML, and why CI — which
 * has no analytics values — produces a deliberately untracked artifact.
 *
 * Not a secret: the website id and script URL end up in the rendered HTML, and
 * Umami's tag requires both in the browser.
 */
export type UmamiTrackerConfig = {
  scriptUrl: string;
  websiteId: string;
};

function readFirst(...values: Array<string | undefined>): string {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return "";
}

/**
 * Returns null when either value is missing, which disables the tracker.
 */
export function getUmamiTrackerConfig(): UmamiTrackerConfig | null {
  const scriptUrl = readFirst(
    process.env.UMAMI_SCRIPT_URL,
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL,
  );
  const websiteId = readFirst(
    process.env.UMAMI_WEBSITE_ID,
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  );

  if (!scriptUrl || !websiteId) return null;
  return { scriptUrl, websiteId };
}
