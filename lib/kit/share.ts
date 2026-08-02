// Share-link codec for kits. The whole kit is encoded in query params -
// no backend, no expiry, nothing to moderate:
//   /kit/shared?s=glassmorphism,neo-brutalist&a=fade-in-up&f=gallery-gloock
// `s` keeps insertion order; the first style is the base (matches the
// export engine and the combination preview).

import type { KitItem, KitItemType } from "./types";
import { normalizeKitItems } from "./storage";

const PARAM_BY_TYPE: Record<KitItemType, string> = {
  style: "s",
  animation: "a",
  "font-pairing": "f",
};

export function encodeKitToSearch(items: KitItem[]): string {
  const params = new URLSearchParams();
  for (const [type, key] of Object.entries(PARAM_BY_TYPE) as [KitItemType, string][]) {
    const slugs = items.filter((item) => item.type === type).map((item) => item.slug);
    if (slugs.length > 0) params.set(key, slugs.join(","));
  }
  return params.toString();
}

export function parseKitFromSearch(search: URLSearchParams): KitItem[] {
  const stampedAt = new Date(0).toISOString();
  const candidates: unknown[] = [];
  for (const [type, key] of Object.entries(PARAM_BY_TYPE) as [KitItemType, string][]) {
    const raw = search.get(key);
    if (!raw) continue;
    for (const slug of raw.split(",").slice(0, 50)) {
      candidates.push({ type, slug: slug.trim(), addedAt: stampedAt });
    }
  }
  // normalizeKitItems enforces slug shape, known types and dedup.
  return normalizeKitItems(candidates);
}
