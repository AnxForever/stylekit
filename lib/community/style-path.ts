/** Resolve a community contribution to the page that actually renders it. */
export function getCommunityStylePath(style: {
  slug: string;
  curated?: boolean;
}): string {
  return `${getCommunityStyleBasePath(style)}/${style.slug}`;
}

export function getCommunityStyleBasePath(style: {
  curated?: boolean;
}): "/styles" | "/community" {
  return style.curated ? "/styles" : "/community";
}
