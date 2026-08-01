import type { KitItem, KitItemType, KitSnapshot } from "./types";
import { KIT_ITEM_TYPES, kitItemKey } from "./types";

export const KIT_STORAGE_KEY = "stylekit-kit-v1";

const SLUG_RE = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

function isKitItemType(value: unknown): value is KitItemType {
  return typeof value === "string" && (KIT_ITEM_TYPES as readonly string[]).includes(value);
}

export function normalizeKitItems(values: unknown): KitItem[] {
  if (!Array.isArray(values)) return [];

  const normalized: KitItem[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    if (typeof value !== "object" || value === null) continue;
    const candidate = value as Record<string, unknown>;
    if (!isKitItemType(candidate.type)) continue;
    if (typeof candidate.slug !== "string") continue;
    const slug = candidate.slug.trim();
    if (!SLUG_RE.test(slug)) continue;

    const key = `${candidate.type}:${slug}`;
    if (seen.has(key)) continue;
    seen.add(key);

    normalized.push({
      type: candidate.type,
      slug,
      addedAt:
        typeof candidate.addedAt === "string" ? candidate.addedAt : new Date(0).toISOString(),
      ...(typeof candidate.note === "string" && candidate.note.trim()
        ? { note: candidate.note.slice(0, 500) }
        : {}),
    });
  }

  return normalized;
}

export function readKitFromStorage(): KitItem[] {
  try {
    const saved = localStorage.getItem(KIT_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved) as Partial<KitSnapshot> | unknown;
    if (typeof parsed === "object" && parsed !== null && "items" in parsed) {
      return normalizeKitItems((parsed as KitSnapshot).items);
    }
    return normalizeKitItems(parsed);
  } catch {
    return [];
  }
}

export function writeKitToStorage(items: KitItem[]) {
  try {
    const snapshot: KitSnapshot = { version: 1, items };
    localStorage.setItem(KIT_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage full or unavailable; the in-memory state still works for the session.
  }
}

export { kitItemKey };
