// Style Recipe System
// Curated combinations of visual style + layout + animations for specific use cases

import { styles } from "./registry";
import { styleRecipes } from "./recipe-registry";
import type { RecipeTag, StyleRecipe, UseCase } from "./recipe-types";
import type { DesignStyle } from "./types";

export type { RecipeTag, StyleRecipe, UseCase } from "./recipe-types";
export { styleRecipes } from "./recipe-registry";

/**
 * Get all recipes
 */
export function getAllRecipes(): StyleRecipe[] {
  return styleRecipes;
}

/**
 * Get recipes by use case
 */
export function getRecipesByUseCase(useCase: UseCase): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.useCase === useCase)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get featured recipes
 */
export function getFeaturedRecipes(): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.featured)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get recipes by tag
 */
export function getRecipesByTag(tag: RecipeTag): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.tags.includes(tag))
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get recipe by ID
 */
export function getRecipeById(id: string): StyleRecipe | undefined {
  return styleRecipes.find((r) => r.id === id);
}

/**
 * Get recipes that use a specific visual style
 */
export function getRecipesByVisualStyle(styleSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.visualStyle === styleSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get recipes that use a specific layout
 */
export function getRecipesByLayout(layoutSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.layout === layoutSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get the full style objects for a recipe
 */
export function resolveRecipeStyles(recipe: StyleRecipe): {
  visual: DesignStyle | undefined;
  layout: DesignStyle | undefined;
} {
  return {
    visual: styles.find((s) => s.slug === recipe.visualStyle),
    layout: styles.find((s) => s.slug === recipe.layout),
  };
}

/**
 * Validate that a recipe's referenced styles exist
 */
export function validateRecipe(recipe: StyleRecipe): {
  valid: boolean;
  missingVisual: boolean;
  missingLayout: boolean;
  missingAnimations: string[];
} {
  const visualExists = styles.some((s) => s.slug === recipe.visualStyle);
  const layoutExists = styles.some((s) => s.slug === recipe.layout);
  const missingAnimations = (recipe.animations || []).filter(
    (anim) => !styles.some((s) => s.slug === anim)
  );

  return {
    valid: visualExists && layoutExists && missingAnimations.length === 0,
    missingVisual: !visualExists,
    missingLayout: !layoutExists,
    missingAnimations,
  };
}

/**
 * Get only valid recipes (with existing style references)
 */
export function getValidRecipes(): StyleRecipe[] {
  return styleRecipes.filter((recipe) => {
    const validation = validateRecipe(recipe);
    return validation.valid || (!validation.missingVisual && !validation.missingLayout);
  });
}

/**
 * Search recipes by query
 */
export function searchRecipes(query: string, maxResults = 10): StyleRecipe[] {
  const lowerQuery = query.toLowerCase();
  
  return styleRecipes
    .map((recipe) => {
      let score = 0;
      
      // Name match
      if (recipe.name.toLowerCase().includes(lowerQuery)) score += 10;
      if (recipe.nameZh.includes(query)) score += 10;
      
      // Description match
      if (recipe.description.toLowerCase().includes(lowerQuery)) score += 5;
      if (recipe.descriptionZh.includes(query)) score += 5;
      
      // Use case match
      if (recipe.useCase.includes(lowerQuery)) score += 8;
      
      // Tag match
      recipe.tags.forEach((tag) => {
        if (tag.includes(lowerQuery)) score += 3;
      });
      
      // Style match
      if (recipe.visualStyle.includes(lowerQuery)) score += 6;
      if (recipe.layout.includes(lowerQuery)) score += 6;
      
      // Boost featured
      if (recipe.featured) score += 2;
      
      return { recipe, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.recipe);
}

/**
 * Get all use cases
 */
export function getAllUseCases(): { id: UseCase; label: string; labelZh: string }[] {
  return [
    { id: "saas-landing", label: "SaaS Landing Page", labelZh: "SaaS落地页" },
    { id: "saas-dashboard", label: "SaaS Dashboard", labelZh: "SaaS仪表盘" },
    { id: "ecommerce", label: "E-commerce", labelZh: "电子商务" },
    { id: "portfolio", label: "Portfolio", labelZh: "作品集" },
    { id: "blog", label: "Blog", labelZh: "博客" },
    { id: "agency", label: "Agency", labelZh: "代理商/工作室" },
    { id: "startup", label: "Startup", labelZh: "初创公司" },
    { id: "enterprise", label: "Enterprise", labelZh: "企业官网" },
    { id: "creative", label: "Creative Project", labelZh: "创意项目" },
    { id: "personal", label: "Personal Website", labelZh: "个人网站" },
    { id: "documentation", label: "Documentation", labelZh: "文档网站" },
    { id: "mobile-app", label: "Mobile App Landing", labelZh: "移动应用落地页" },
  ];
}

/**
 * Get all tags
 */
export function getAllRecipeTags(): { id: RecipeTag; label: string; labelZh: string }[] {
  return [
    { id: "modern", label: "Modern", labelZh: "现代" },
    { id: "retro", label: "Retro", labelZh: "复古" },
    { id: "minimal", label: "Minimal", labelZh: "极简" },
    { id: "bold", label: "Bold", labelZh: "大胆" },
    { id: "elegant", label: "Elegant", labelZh: "优雅" },
    { id: "playful", label: "Playful", labelZh: "趣味" },
    { id: "professional", label: "Professional", labelZh: "专业" },
    { id: "dark", label: "Dark Mode", labelZh: "暗色" },
    { id: "light", label: "Light Mode", labelZh: "亮色" },
    { id: "animated", label: "Animated", labelZh: "动画丰富" },
    { id: "high-conversion", label: "High Conversion", labelZh: "高转化" },
    { id: "developer-friendly", label: "Developer Friendly", labelZh: "开发者友好" },
    { id: "creative", label: "Creative", labelZh: "创意" },
  ];
}
