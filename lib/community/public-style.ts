import { getAllStylesMeta, getStyleMetaBySlug } from "@/lib/styles/meta";
import { listCommunityStylesMeta, resolveStyleBySlug } from "@/lib/styles/community-runtime";

export interface PublicDiscussionStyle {
  slug: string;
  name: string;
  nameEn: string;
  href: string;
}

export async function getPublicDiscussionStyle(slug: string): Promise<PublicDiscussionStyle | null> {
  const curated = getStyleMetaBySlug(slug);
  if (curated) return { slug, name: curated.name, nameEn: curated.nameEn, href: `/styles/${slug}` };
  const resolved = await resolveStyleBySlug(slug);
  if (!resolved) return null;
  return { slug, name: resolved.style.name, nameEn: resolved.style.nameEn, href: `/community/${slug}` };
}

/** Do not swallow DB failure: a private inbox must not use a stale visibility list. */
export async function getPublicDiscussionStyles(): Promise<Map<string, PublicDiscussionStyle>> {
  const community = await listCommunityStylesMeta();
  const map = new Map<string, PublicDiscussionStyle>();
  for (const style of community) map.set(style.slug, { slug: style.slug, name: style.name, nameEn: style.nameEn, href: `/community/${style.slug}` });
  for (const style of getAllStylesMeta()) map.set(style.slug, { slug: style.slug, name: style.name, nameEn: style.nameEn, href: `/styles/${style.slug}` });
  return map;
}
