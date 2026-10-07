export const RESOURCE_SECTION_IDS = [
  "typography",
  "gradients",
  "shadows",
  "backgrounds",
  "shaders",
] as const;

export type ResourceSectionId = (typeof RESOURCE_SECTION_IDS)[number];

const RESOURCE_SECTION_ID_SET: ReadonlySet<string> = new Set(RESOURCE_SECTION_IDS);

export function parseResourceSectionId(value: string | null): ResourceSectionId | null {
  return value && RESOURCE_SECTION_ID_SET.has(value)
    ? (value as ResourceSectionId)
    : null;
}

export function getResourceSectionFromSearch(search: string): ResourceSectionId {
  return parseResourceSectionId(new URLSearchParams(search).get("tab")) ?? "typography";
}

/**
 * Convert a legacy section fragment to `?tab=`, while preserving unrelated
 * query parameters. A valid query tab always wins over an old fragment.
 */
export function getCanonicalResourceUrl(url: URL): URL | null {
  const querySection = parseResourceSectionId(url.searchParams.get("tab"));
  const hashSection = parseResourceSectionId(url.hash.slice(1));
  const canonical = new URL(url.href);

  if (querySection) {
    if (!hashSection) return null;
    canonical.hash = "";
  } else if (hashSection) {
    canonical.searchParams.set("tab", hashSection);
    canonical.hash = "";
  } else if (canonical.searchParams.has("tab")) {
    canonical.searchParams.delete("tab");
  } else {
    return null;
  }

  return canonical.href === url.href ? null : canonical;
}

/** Build an in-app destination for a tab, preserving all other query values. */
export function getResourceTabHref(
  currentUrl: URL,
  section: ResourceSectionId,
): string {
  const destination = new URL(currentUrl.href);
  destination.searchParams.set("tab", section);
  if (parseResourceSectionId(destination.hash.slice(1))) destination.hash = "";
  return `${destination.pathname}${destination.search}${destination.hash}`;
}
