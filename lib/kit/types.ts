// Kit Builder - unified asset addressing across the whole library.
// A KitItem is a typed pointer ({type}:{slug}) into one of the asset registries.

export const KIT_ITEM_TYPES = [
  "style",
  "animation",
  "font-pairing",
  "gradient",
  "shadow",
  "background",
] as const;

export type KitItemType = (typeof KIT_ITEM_TYPES)[number];

export interface KitItem {
  type: KitItemType;
  slug: string;
  addedAt: string;
  note?: string;
}

/** A single named kit. The first style in `items` is the base style. */
export interface Kit {
  id: string;
  name: string;
  items: KitItem[];
  updatedAt: string;
}

/** Legacy single-kit snapshot (localStorage key stylekit-kit-v1). */
export interface KitSnapshot {
  version: 1;
  items: KitItem[];
}

/** Multi-kit snapshot (localStorage key stylekit-kits-v2). */
export interface KitCollectionSnapshot {
  version: 2;
  kits: Kit[];
  activeKitId: string;
}

export function kitItemKey(item: Pick<KitItem, "type" | "slug">): string {
  return `${item.type}:${item.slug}`;
}
