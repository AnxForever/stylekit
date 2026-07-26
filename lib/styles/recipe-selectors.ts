/**
 * Lightweight recipe selectors for client surfaces that only need recipe
 * metadata. Keep this module independent from the full style registry so a
 * detail page does not download every style's components, CSS, and AI rules.
 */

import { styleRecipes } from "./recipe-registry";
import type { StyleRecipe, UseCase } from "./recipe-types";

export function getRecipesByVisualStyle(styleSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((recipe) => recipe.visualStyle === styleSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

export function getRecipesByLayout(layoutSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((recipe) => recipe.layout === layoutSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

export function getRecipesByUseCase(useCase: UseCase): StyleRecipe[] {
  return styleRecipes
    .filter((recipe) => recipe.useCase === useCase)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

export function getFeaturedRecipes(): StyleRecipe[] {
  return styleRecipes
    .filter((recipe) => recipe.featured)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

// Keep in sync with getAllUseCases in ./recipes.ts.
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
