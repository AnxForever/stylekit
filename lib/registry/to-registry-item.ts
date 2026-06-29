/**
 * @module lib/registry/to-registry-item
 *
 * Converts a StyleKit {@link DesignStyle} into a shadcn-compatible
 * `registry-item.json` payload so any shadcn project can install a StyleKit
 * style with `npx shadcn add https://stylekit.top/r/<slug>.json`.
 *
 * The color tokens are sourced from {@link generateShadcnTheme}, which today
 * derives only primary/secondary/accent per style. Improving per-style theme
 * fidelity (background, radius, border, fonts) is tracked separately — see the
 * "提升 shadcn theme 保真度" task.
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
 * Drop any cssVar whose value failed to parse (e.g. "0 NaN% NaN%"), which
 * happens when {@link generateShadcnTheme} is fed a non-hex color such as the
 * `rgba(...)` / partial-hex values some styles use. Emitting `--accent: NaN`
 * would corrupt the consumer's stylesheet after `shadcn add`, so we omit the
 * token and let shadcn keep its framework default. Root-cause color derivation
 * is handled by the theme-fidelity task.
 */
function sanitizeVars(vars: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (!value.includes("NaN")) out[key] = value;
  }
  return out;
}

/**
 * Build a shadcn `registry:theme` item for a single style.
 */
export function toRegistryItem(style: DesignStyle): RegistryItem {
  const theme = generateShadcnTheme(style);

  return {
    $schema: REGISTRY_ITEM_SCHEMA,
    name: style.slug,
    type: "registry:theme",
    title: style.nameEn?.trim() || style.name,
    description: pickDescription(style),
    cssVars: {
      light: sanitizeVars(theme.cssVars.light),
      dark: sanitizeVars(theme.cssVars.dark),
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
