"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { RecipeCard } from "./recipe-card";
import { useI18n } from "@/lib/i18n/context";
import {
  getFeaturedRecipes,
  getAllUseCases,
  getRecipesByUseCase,
  type StyleRecipe,
  type UseCase,
} from "@/lib/styles/recipes";

interface RecipeShowcaseProps {
  variant?: "home" | "full";
  maxItems?: number;
}

export function RecipeShowcase({ variant = "home", maxItems = 6 }: RecipeShowcaseProps) {
  const { locale } = useI18n();
  const [activeUseCase, setActiveUseCase] = useState<UseCase | "featured">("featured");
  
  const useCases = getAllUseCases();
  const featuredRecipes = getFeaturedRecipes();
  
  const displayRecipes: StyleRecipe[] = 
    activeUseCase === "featured" 
      ? featuredRecipes 
      : getRecipesByUseCase(activeUseCase);

  const limitedRecipes = variant === "home" 
    ? displayRecipes.slice(0, maxItems) 
    : displayRecipes;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-2">
              {locale === "zh" ? "设计配方" : "Design Recipes"}
            </p>
            <h2 className="text-3xl md:text-4xl font-medium">
              {locale === "zh" ? "开箱即用的风格组合" : "Ready-to-Use Style Combinations"}
            </h2>
            <p className="text-muted mt-2 max-w-xl">
              {locale === "zh"
                ? "我们精心策划的视觉风格 + 布局 + 动画组合，针对特定使用场景优化。"
                : "Curated combinations of visual style + layout + animations, optimized for specific use cases."}
            </p>
          </div>
          
          {variant === "home" && (
            <LocalizedLink
              href="/recipes"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors shrink-0"
            >
              {locale === "zh" ? "查看全部配方" : "View All Recipes"}
              <ChevronRight className="w-4 h-4" />
            </LocalizedLink>
          )}
        </div>

        {/* Use Case Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <button
            onClick={() => setActiveUseCase("featured")}
            className={`shrink-0 px-4 py-2 text-sm border transition-colors ${
              activeUseCase === "featured"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {locale === "zh" ? "精选" : "Featured"}
          </button>
          {useCases.slice(0, variant === "home" ? 6 : undefined).map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActiveUseCase(uc.id)}
              className={`shrink-0 px-4 py-2 text-sm border transition-colors ${
                activeUseCase === uc.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {locale === "zh" ? uc.labelZh : uc.label}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        {limitedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                variant={variant === "home" ? "default" : "featured"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted">
            {locale === "zh"
              ? "此场景暂无配方，敬请期待..."
              : "No recipes for this use case yet. Stay tuned..."}
          </div>
        )}

        {/* View All Link (for home variant) */}
        {variant === "home" && displayRecipes.length > maxItems && (
          <div className="text-center mt-8">
            <LocalizedLink
              href="/recipes"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm hover:border-foreground transition-colors"
            >
              {locale === "zh"
                ? `查看全部 ${displayRecipes.length} 个配方`
                : `View All ${displayRecipes.length} Recipes`}
              <ChevronRight className="w-4 h-4" />
            </LocalizedLink>
          </div>
        )}
      </div>
    </section>
  );
}
