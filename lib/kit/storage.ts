import type { Kit, KitCollectionSnapshot, KitItem, KitItemType, KitSnapshot } from "./types";
import { KIT_ITEM_TYPES, kitItemKey } from "./types";

/** Legacy single-kit key (v1). Read for one-time migration, then left alone. */
export const KIT_STORAGE_KEY = "stylekit-kit-v1";
/** Multi-kit collection key (v2). */
export const KIT_COLLECTION_KEY = "stylekit-kits-v2";

const SLUG_RE = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;
const KIT_ID_RE = /^[a-z0-9]+$/;
const MAX_KITS = 20;

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

export function newKitId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function makeKit(name: string, items: KitItem[] = []): Kit {
  return {
    id: newKitId(),
    name: sanitizeKitName(name),
    items,
    updatedAt: new Date().toISOString(),
  };
}

export function sanitizeKitName(name: string): string {
  const trimmed = name.trim().slice(0, 60);
  return trimmed || "Untitled kit";
}

function normalizeKit(value: unknown): Kit | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Record<string, unknown>;
  const id = typeof candidate.id === "string" && KIT_ID_RE.test(candidate.id) ? candidate.id : null;
  if (!id) return null;
  return {
    id,
    name: sanitizeKitName(typeof candidate.name === "string" ? candidate.name : ""),
    items: normalizeKitItems(candidate.items),
    updatedAt:
      typeof candidate.updatedAt === "string" ? candidate.updatedAt : new Date(0).toISOString(),
  };
}

/**
 * Reads the multi-kit collection, migrating a legacy v1 single-kit snapshot
 * on first run. Always returns at least one kit and a valid activeKitId.
 */
export function readKitCollection(): { kits: Kit[]; activeKitId: string } {
  try {
    const savedV2 = localStorage.getItem(KIT_COLLECTION_KEY);
    if (savedV2) {
      const parsed = JSON.parse(savedV2) as Partial<KitCollectionSnapshot>;
      const kits = Array.isArray(parsed.kits)
        ? parsed.kits.map(normalizeKit).filter((k): k is Kit => k !== null).slice(0, MAX_KITS)
        : [];
      if (kits.length > 0) {
        const activeKitId =
          typeof parsed.activeKitId === "string" && kits.some((k) => k.id === parsed.activeKitId)
            ? parsed.activeKitId
            : kits[0].id;
        return { kits, activeKitId };
      }
    }
  } catch {
    // fall through to migration / default
  }

  // Migrate legacy v1 single kit if present.
  const migrated = readLegacyKit();
  const kit = makeKit("My kit", migrated);
  return { kits: [kit], activeKitId: kit.id };
}

function readLegacyKit(): KitItem[] {
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

export function writeKitCollection(kits: Kit[], activeKitId: string) {
  try {
    const snapshot: KitCollectionSnapshot = {
      version: 2,
      kits: kits.slice(0, MAX_KITS),
      activeKitId,
    };
    localStorage.setItem(KIT_COLLECTION_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage full or unavailable; in-memory state still works this session.
  }
}

export { MAX_KITS };

/**
 * Moves one item to the front of the list. The export engine and the
 * combination preview both treat the first style in insertion order as
 * the primary/base style, so "set as primary" is a reorder.
 */
export function moveKitItemToFront(
  items: KitItem[],
  type: KitItem["type"],
  slug: string
): KitItem[] {
  const target = items.find((item) => item.type === type && item.slug === slug);
  if (!target) return items;
  return [target, ...items.filter((item) => item !== target)];
}

export { kitItemKey };
