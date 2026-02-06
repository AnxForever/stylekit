// Recipe Registry - Central registration for all style recipes

import type { StyleRecipes, ComponentRecipe } from "./types";
import { neoBrutalistRecipes } from "./neo-brutalist";
import { glassmorphismRecipes } from "./glassmorphism";
import { editorialRecipes } from "./editorial";
import { neumorphismRecipes } from "./neumorphism";
import { claymorphismRecipes } from "./claymorphism";
import { appleStyleRecipes } from "./apple-style";
import { pixelArtRecipes } from "./pixel-art";
import { vaporwaveRecipes } from "./vaporwave";
import { materialDesignRecipes } from "./material-design";
import { swissStyleRecipes } from "./swiss-style";
import { ghibliStyleRecipes } from "./ghibli-style";
import { darkModeRecipes } from "./dark-mode";
import { stripeStyleRecipes } from "./stripe-style";
import { notionStyleRecipes } from "./notion-style";
import { bentoGridRecipes } from "./bento-grid";
import { corporateCleanRecipes } from "./corporate-clean";
import { minimalistFlatRecipes } from "./minimalist-flat";
import { softUIRecipes } from "./soft-ui";
import { naturalOrganicRecipes } from "./natural-organic";
import { modernGradientRecipes } from "./modern-gradient";
import { retroVintageRecipes } from "./retro-vintage";
import { geometricBoldRecipes } from "./geometric-bold";
import { y2kRecipes } from "./y2k";
import { memphisRecipes } from "./memphis";
import { artDecoRecipes } from "./art-deco";
import { bauhausRecipes } from "./bauhaus";
import { skeuomorphismRecipes } from "./skeuomorphism";
import { fluentDesignRecipes } from "./fluent-design";
import { comicStyleRecipes } from "./comic-style";
import { sketchStyleRecipes } from "./sketch-style";
import { watercolorStyleRecipes } from "./watercolor-style";
import { cyberpunkNeonRecipes } from "./cyberpunk-neon";
import { synthwaveRecipes } from "./synthwave";
import { neoBrutalistSoftRecipes } from "./neo-brutalist-soft";
import { neoBrutalistPlayfulRecipes } from "./neo-brutalist-playful";
import { masonryFlowRecipes } from "./masonry-flow";
import { splitScreenRecipes } from "./split-screen";
import { fullPageScrollRecipes } from "./full-page-scroll";
import { timelineVerticalRecipes } from "./timeline-vertical";
import { cardStackRecipes } from "./card-stack";
import { sidebarFixedRecipes } from "./sidebar-fixed";
import { magazineGridRecipes } from "./magazine-grid";
import { heroFullscreenRecipes } from "./hero-fullscreen";
import { fPatternLayoutRecipes } from "./f-pattern-layout";
import { zPatternLayoutRecipes } from "./z-pattern-layout";
import { holyGrailLayoutRecipes } from "./holy-grail-layout";
import { dashboardLayoutRecipes } from "./dashboard-layout";

// Recipe registry
const recipeRegistry: Record<string, StyleRecipes> = {
  "neo-brutalist": neoBrutalistRecipes,
  "glassmorphism": glassmorphismRecipes,
  "editorial": editorialRecipes,
  "neumorphism": neumorphismRecipes,
  "claymorphism": claymorphismRecipes,
  "apple-style": appleStyleRecipes,
  "pixel-art": pixelArtRecipes,
  "vaporwave": vaporwaveRecipes,
  "material-design": materialDesignRecipes,
  "swiss-style": swissStyleRecipes,
  "ghibli-style": ghibliStyleRecipes,
  "dark-mode": darkModeRecipes,
  "stripe-style": stripeStyleRecipes,
  "notion-style": notionStyleRecipes,
  "bento-grid": bentoGridRecipes,
  "corporate-clean": corporateCleanRecipes,
  "minimalist-flat": minimalistFlatRecipes,
  "soft-ui": softUIRecipes,
  "natural-organic": naturalOrganicRecipes,
  "modern-gradient": modernGradientRecipes,
  "retro-vintage": retroVintageRecipes,
  "geometric-bold": geometricBoldRecipes,
  "y2k": y2kRecipes,
  "memphis": memphisRecipes,
  "art-deco": artDecoRecipes,
  "bauhaus": bauhausRecipes,
  "skeuomorphism": skeuomorphismRecipes,
  "fluent-design": fluentDesignRecipes,
  "comic-style": comicStyleRecipes,
  "sketch-style": sketchStyleRecipes,
  "watercolor-style": watercolorStyleRecipes,
  "cyberpunk-neon": cyberpunkNeonRecipes,
  "synthwave": synthwaveRecipes,
  "neo-brutalist-soft": neoBrutalistSoftRecipes,
  "neo-brutalist-playful": neoBrutalistPlayfulRecipes,
  "masonry-flow": masonryFlowRecipes,
  "split-screen": splitScreenRecipes,
  "full-page-scroll": fullPageScrollRecipes,
  "timeline-vertical": timelineVerticalRecipes,
  "card-stack": cardStackRecipes,
  "sidebar-fixed": sidebarFixedRecipes,
  "magazine-grid": magazineGridRecipes,
  "hero-fullscreen": heroFullscreenRecipes,
  "f-pattern-layout": fPatternLayoutRecipes,
  "z-pattern-layout": zPatternLayoutRecipes,
  "holy-grail-layout": holyGrailLayoutRecipes,
  "dashboard-layout": dashboardLayoutRecipes,
};

/**
 * Get all recipes for a style
 */
export function getStyleRecipes(styleSlug: string): StyleRecipes | undefined {
  return recipeRegistry[styleSlug];
}

/**
 * Get a specific recipe for a style
 */
export function getRecipe(
  styleSlug: string,
  recipeId: string
): ComponentRecipe | undefined {
  const styleRecipes = recipeRegistry[styleSlug];
  if (!styleRecipes) return undefined;
  return styleRecipes.recipes[recipeId];
}

/**
 * Get all recipe IDs for a style
 */
export function getRecipeIds(styleSlug: string): string[] {
  const styleRecipes = recipeRegistry[styleSlug];
  if (!styleRecipes) return [];
  return Object.keys(styleRecipes.recipes);
}

/**
 * Get all styles that have recipes
 */
export function getStylesWithRecipes(): string[] {
  return Object.keys(recipeRegistry);
}

/**
 * Check if a style has recipes
 */
export function hasRecipes(styleSlug: string): boolean {
  return styleSlug in recipeRegistry;
}

/**
 * Register recipes for a style (for runtime extension)
 */
export function registerRecipes(recipes: StyleRecipes): void {
  recipeRegistry[recipes.styleSlug] = recipes;
}

// Re-export types and utilities
export * from "./types";
export * from "./renderer";
