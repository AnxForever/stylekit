// UI Plan Validator - Validates a UI Plan against available recipes and archetypes

import type { UIPlan, UIPlanValidation, UIPlanError, UIPlanWarning } from "./ui-plan";
import { getStyleRecipes, getRecipe } from "../recipes";
import { getArchetype } from "../archetypes";

/**
 * Validate a UI Plan
 */
export function validateUIPlan(plan: UIPlan): UIPlanValidation {
  const errors: UIPlanError[] = [];
  const warnings: UIPlanWarning[] = [];

  // Validate meta
  if (!plan.meta.style) {
    errors.push({
      path: "meta.style",
      message: "Style is required",
      code: "MISSING_STYLE",
    });
  }

  if (!plan.meta.archetype) {
    errors.push({
      path: "meta.archetype",
      message: "Archetype is required",
      code: "MISSING_ARCHETYPE",
    });
  }

  // Check if style has recipes
  const recipes = getStyleRecipes(plan.meta.style);
  if (!recipes) {
    warnings.push({
      path: "meta.style",
      message: `No recipes found for style "${plan.meta.style}". Code will use generic patterns.`,
      suggestion: "Use a style with defined recipes for better results.",
    });
  }

  // Check if archetype exists
  const archetype = getArchetype(plan.meta.archetype);
  if (!archetype) {
    warnings.push({
      path: "meta.archetype",
      message: `Unknown archetype "${plan.meta.archetype}". Layout will use generic structure.`,
      suggestion: "Use a defined archetype for structured layout.",
    });
  }

  // Validate sections
  if (!plan.sections || plan.sections.length === 0) {
    errors.push({
      path: "sections",
      message: "At least one section is required",
      code: "NO_SECTIONS",
    });
  }

  plan.sections.forEach((section, sIndex) => {
    if (!section.id) {
      errors.push({
        path: `sections[${sIndex}].id`,
        message: "Section ID is required",
        code: "MISSING_SECTION_ID",
      });
    }

    // Validate components in section
    section.components.forEach((comp, cIndex) => {
      const path = `sections[${sIndex}].components[${cIndex}]`;

      if (!comp.type) {
        errors.push({
          path: `${path}.type`,
          message: "Component type is required",
          code: "MISSING_COMPONENT_TYPE",
        });
      }

      if (!comp.variant) {
        errors.push({
          path: `${path}.variant`,
          message: "Component variant is required",
          code: "MISSING_VARIANT",
        });
      }

      // Validate against recipe if available
      if (recipes && comp.recipe) {
        const recipe = getRecipe(plan.meta.style, comp.recipe);
        if (!recipe) {
          warnings.push({
            path: `${path}.recipe`,
            message: `Recipe "${comp.recipe}" not found for style "${plan.meta.style}"`,
          });
        } else {
          // Check variant exists
          if (comp.variant && !recipe.variants[comp.variant]) {
            warnings.push({
              path: `${path}.variant`,
              message: `Variant "${comp.variant}" not found in recipe "${comp.recipe}". Available: ${Object.keys(recipe.variants).join(", ")}`,
            });
          }

          // Check required slots
          for (const slot of recipe.slots) {
            if (slot.required && !comp.slots[slot.id]) {
              warnings.push({
                path: `${path}.slots.${slot.id}`,
                message: `Required slot "${slot.id}" not provided for "${comp.recipe}"`,
                suggestion: `Add "${slot.id}" to slots with appropriate content`,
              });
            }
          }
        }
      }
    });
  });

  // Validate globals
  const validColorSchemes = ["light", "dark", "auto"];
  if (!validColorSchemes.includes(plan.globals.colorScheme)) {
    errors.push({
      path: "globals.colorScheme",
      message: `Invalid color scheme. Must be one of: ${validColorSchemes.join(", ")}`,
      code: "INVALID_COLOR_SCHEME",
    });
  }

  const validSpacings = ["compact", "normal", "spacious"];
  if (!validSpacings.includes(plan.globals.spacing)) {
    errors.push({
      path: "globals.spacing",
      message: `Invalid spacing. Must be one of: ${validSpacings.join(", ")}`,
      code: "INVALID_SPACING",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Generate a sample UI Plan for a given style and archetype
 */
export function generateSamplePlan(
  styleSlug: string,
  archetypeId: string
): UIPlan | null {
  const archetype = getArchetype(archetypeId);
  if (!archetype) return null;

  const recipes = getStyleRecipes(styleSlug);

  const sections = archetype.sections
    .filter((s) => s.required)
    .map((section) => ({
      id: section.id,
      archetype: section.id,
      components: section.components.slice(0, 3).map((compType) => {
        const recipe = recipes?.recipes[compType];
        const variant = recipe
          ? Object.keys(recipe.variants)[0]
          : "default";

        const defaultSlots: Record<string, string> = {};
        if (recipe) {
          for (const slot of recipe.slots) {
            if (slot.default) {
              defaultSlots[slot.id] = slot.default;
            }
          }
        }

        return {
          type: compType,
          recipe: compType,
          variant,
          params: {},
          slots: defaultSlots,
        };
      }),
    }));

  return {
    meta: {
      style: styleSlug,
      archetype: archetypeId,
      pageType: archetype.category,
      timestamp: new Date().toISOString(),
    },
    sections,
    globals: {
      colorScheme: "light",
      maxWidth: "7xl",
      spacing: "normal",
    },
  };
}
