// Recipe Registry - Central registration for all style recipes

import type { StyleRecipes, ComponentRecipe } from "./types";
import { neoBrutalistRecipes } from "./neo-brutalist";

// Recipe registry
const recipeRegistry: Record<string, StyleRecipes> = {
  "neo-brutalist": neoBrutalistRecipes,
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
