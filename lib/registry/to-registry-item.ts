/**
 * @module lib/registry/to-registry-item
 *
 * Converts a StyleKit {@link DesignStyle} into a Tailwind v4 shadcn-compatible
 * `registry-item.json` payload. The registry contract carries CSS color values,
 * while {@link generateShadcnTheme} keeps bare HSL components for the legacy
 * `hsl(var(--token))` stylesheet. This boundary wraps valid HSL values in
 * `hsl(...)` and preserves their alpha channel. Tailwind v3 consumers should use
 * the Style Pack's v3 preset and variables stylesheet instead.
 *
 * Reference: https://ui.shadcn.com/docs/registry/registry-item-json
 */

import type { DesignStyle } from "@/lib/styles/types";
import { generateShadcnTheme } from "@/lib/export/shadcn-theme";

export const REGISTRY_ITEM_SCHEMA =
  "https://ui.shadcn.com/schema/registry-item.json";

/** Max length for the item description (kept brief per registry conventions). */
const MAX_DESCRIPTION_LENGTH = 240;

export interface RegistryItemFile {
  path: string;
  type: string;
  target?: string;
}

export interface RegistryItem {
  $schema: string;
  name: string;
  type: "registry:theme";
  title: string;
  description: string;
  cssVars: {
    theme?: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  files: RegistryItemFile[];
}

function pickDescription(style: DesignStyle): string {
  const raw = (style.descriptionEn ?? style.description ?? "").trim();
  return raw.length > MAX_DESCRIPTION_LENGTH
    ? `${raw.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd()}…`
    : raw;
}

/**
 * Registry `cssVars.light/dark` values are inserted as CSS color values. The
 * shadcn theme generator keeps HSL components for the legacy `hsl(var(...))`
 * contract, so project valid bare HSL triplets as CSS `hsl(...)` functions at
 * this boundary. Drop malformed values rather than emitting invalid CSS.
 */
const HSL_COMPONENT_RE = /^\d{1,3}(?:\.\d+)? \d{1,3}(?:\.\d+)?% \d{1,3}(?:\.\d+)?%(?: \/ (?:0(?:\.\d+)?|1(?:\.0+)?|(?:\d{1,2}(?:\.\d+)?|100)%))?$/;

function projectRegistryCssVars(vars: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (value.includes("NaN")) continue;
    out[key] = HSL_COMPONENT_RE.test(value) ? `hsl(${value})` : value;
  }
  return out;
}

/**
 * Lightweight item metadata (name/type/title/description, no cssVars). Used by
 * the registry index so it doesn't run full theme generation per style.
 */
export function registryItemMeta(style: DesignStyle): {
  name: string;
  type: "registry:theme";
  title: string;
  description: string;
} {
  return {
    name: style.slug,
    type: "registry:theme",
    title: style.nameEn?.trim() || style.name,
    description: pickDescription(style),
  };
}

/** Build a v4 `registry:theme` item for one style. */
export function toRegistryItem(style: DesignStyle): RegistryItem {
  const theme = generateShadcnTheme(style);

  return {
    $schema: REGISTRY_ITEM_SCHEMA,
    ...registryItemMeta(style),
    cssVars: {
      light: projectRegistryCssVars(theme.cssVars.light),
      dark: projectRegistryCssVars(theme.cssVars.dark),
    },
    // A theme-only item ships no source files; shadcn injects cssVars directly.
    files: [],
  };
}

/**
 * Serialize a single style's registry item to pretty-printed JSON, ready to be
 * returned from the `/r/[name].json` endpoint.
 */
export function toRegistryItemJSON(style: DesignStyle): string {
  return JSON.stringify(toRegistryItem(style), null, 2);
}
