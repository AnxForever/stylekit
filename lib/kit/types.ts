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

export interface KitSnapshot {
  version: 1;
  items: KitItem[];
}

export function kitItemKey(item: Pick<KitItem, "type" | "slug">): string {
  return `${item.type}:${item.slug}`;
}
