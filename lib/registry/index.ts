/**
 * @module lib/registry
 *
 * shadcn-compatible registry surface for StyleKit styles. Powers the
 * `/r/<name>.json` item endpoints and the `/registry.json` index so any
 * shadcn project can install a StyleKit style with `npx shadcn add`.
 */

export {
  REGISTRY_ITEM_SCHEMA,
  toRegistryItem,
  toRegistryItemJSON,
  type RegistryItem,
  type RegistryItemFile,
} from "./to-registry-item";

export {
  REGISTRY_SCHEMA,
  DEFAULT_REGISTRY_HOMEPAGE,
  toRegistryIndex,
  type RegistryIndex,
  type RegistryIndexItem,
} from "./registry-index";
