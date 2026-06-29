/**
 * @module lib/registry/registry-index
 *
 * Builds the top-level shadcn `registry.json` index that lists every StyleKit
 * style available for `npx shadcn add`. The index carries lightweight metadata
 * per item; the full registry-item (with cssVars) is served from
 * `/r/<name>.json` — see {@link toRegistryItem}.
 *
 * Reference: https://ui.shadcn.com/docs/registry/registry-json
 */

import type { DesignStyle } from "@/lib/styles/types";
import { toRegistryItem } from "./to-registry-item";

export const REGISTRY_SCHEMA = "https://ui.shadcn.com/schema/registry.json";

export const DEFAULT_REGISTRY_HOMEPAGE = "https://stylekit.top";

export interface RegistryIndexItem {
  name: string;
  type: "registry:theme";
  title: string;
  description: string;
}

export interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryIndexItem[];
}

/**
 * Assemble the registry index from a list of styles. Each entry is the metadata
 * subset of its full registry-item, keeping the index small.
 */
export function toRegistryIndex(
  styles: DesignStyle[],
  homepage: string = DEFAULT_REGISTRY_HOMEPAGE,
): RegistryIndex {
  return {
    $schema: REGISTRY_SCHEMA,
    name: "stylekit",
    homepage,
    items: styles.map((style) => {
      const { name, type, title, description } = toRegistryItem(style);
      return { name, type, title, description };
    }),
  };
}
