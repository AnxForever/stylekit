import { scoreStyle } from "@/lib/accessibility";
import { getStyleRecipes, hasRecipes } from "@/lib/recipes";
import { getFrontendReadiness } from "./readiness";
import type { DesignStyle } from "./types";
import { getStyleTokens } from "./tokens-registry";

export type StyleQualityTier = "curated" | "baseline";
export type CapabilityStatus = "complete" | "partial" | "fallback" | "missing";

export interface StyleCapabilities {
  tokens: CapabilityStatus;
  recipes: CapabilityStatus;
  componentCode: CapabilityStatus;
  variants: CapabilityStatus;
  readiness: "curated" | "fallback";
  darkMode: CapabilityStatus;
  accessibility: "scored" | "unavailable";
}

export interface StyleQuality {
  tier: StyleQualityTier;
  capabilities: StyleCapabilities;
  accessibilityScore: number | null;
  flags: string[];
}

const REQUIRED_COMPONENTS = ["button", "card", "input"] as const;

/**
 * Derive machine-readable quality and capability signals from canonical style
 * data. These signals describe coverage, not a guarantee of production
 * accessibility or visual quality.
 */
export function getStyleQuality(style: DesignStyle): StyleQuality {
  const tokens = getStyleTokens(style.slug);
  const recipes = getStyleRecipes(style.slug);
  const readiness = getFrontendReadiness(style);
  const accessibility = scoreStyle(style.slug);
  const componentCount = REQUIRED_COMPONENTS.filter((id) =>
    style.components[id]?.code?.trim(),
  ).length;
  const variantCount = style.variants?.length ?? 0;
  const flags: string[] = [];

  if (readiness.source === "fallback") flags.push("readiness-fallback");
  if (readiness.darkMode.support === "missing") flags.push("dark-mode-review-needed");
  if (variantCount === 0) flags.push("no-variants");
  if (accessibility && accessibility.overall < 60) {
    flags.push("accessibility-review-needed");
  }

  return {
    tier: readiness.source === "curated" ? "curated" : "baseline",
    capabilities: {
      tokens: tokens ? "complete" : "missing",
      recipes: !recipes || !hasRecipes(style.slug) ? "missing" : "complete",
      componentCode:
        componentCount === REQUIRED_COMPONENTS.length
          ? "complete"
          : componentCount > 0
            ? "partial"
            : "missing",
      variants: variantCount > 0 ? "complete" : "missing",
      readiness: readiness.source,
      darkMode: readiness.darkMode.support,
      accessibility: accessibility ? "scored" : "unavailable",
    },
    accessibilityScore: accessibility?.overall ?? null,
    flags,
  };
}
