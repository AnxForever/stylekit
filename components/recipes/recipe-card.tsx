"use client";

import { ArrowRight, Layers, Layout, Sparkles } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import type { StyleRecipe } from "@/lib/styles/recipes";

interface RecipeCardProps {
  recipe: StyleRecipe;
  variant?: "default" | "compact" | "featured";
}

export function RecipeCard({ recipe, variant = "default" }: RecipeCardProps) {
  const { locale } = useI18n();
  
  const name = locale === "zh" ? recipe.nameZh : recipe.name;
  const description = locale === "zh" ? recipe.descriptionZh : recipe.description;
  const reasoning = locale === "zh" ? recipe.reasoningZh : recipe.reasoning;

  if (variant === "compact") {
    return (
      <div className="group border border-border hover:border-foreground transition-colors p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1 truncate">{name}</h4>
            <p className="text-xs text-muted line-clamp-2">{description}</p>
          </div>
          <div 
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"} shrink-0`}
            aria-hidden="true"
          />
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {recipe.visualStyle}
          </span>
          <span>+</span>
          <span className="flex items-center gap-1">
            <Layout className="w-3 h-3" />
            {recipe.layout}
          </span>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <LocalizedLink
        href={`/recipes/${recipe.id}`}
        className="group relative block border border-border hover:border-foreground transition-all overflow-hidden"
      >
        {/* Gradient preview */}
        <div 
          className={`h-32 bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"}`}
          aria-hidden="true"
        />
        
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-medium mb-1 group-hover:text-accent transition-colors">
                {name}
              </h3>
              <p className="text-sm text-muted">{description}</p>
            </div>
            {recipe.featured && (
              <span className="shrink-0 text-[10px] uppercase tracking-widest px-2 py-1 bg-accent text-accent-foreground">
                {locale === "zh" ? "精选" : "Featured"}
              </span>
            )}
          </div>
          
          {/* Recipe components */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800">
              <Sparkles className="w-3 h-3" />
              {recipe.visualStyle}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800">
              <Layout className="w-3 h-3" />
              {recipe.layout}
            </span>
            {recipe.animations && recipe.animations.length > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800">
                <Layers className="w-3 h-3" />
                {recipe.animations.length} {locale === "zh" ? "动画" : "animations"}
              </span>
            )}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {recipe.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Reasoning */}
          <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
            {reasoning}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">
              {locale === "zh" ? "适用场景：" : "Use case: "}
              <span className="text-foreground">{recipe.useCase}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted group-hover:text-foreground transition-colors">
              {locale === "zh" ? "查看详情" : "View Details"}
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </LocalizedLink>
    );
  }

  // Default variant
  return (
    <LocalizedLink
      href={`/recipes/${recipe.id}`}
      className="group block border border-border hover:border-foreground transition-all p-5"
    >
      <div className="flex items-start gap-4 mb-4">
        <div 
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"} shrink-0`}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium mb-1 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted line-clamp-2">{description}</p>
        </div>
      </div>
      
      {/* Recipe components */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800">
          <Sparkles className="w-3 h-3" />
          {recipe.visualStyle}
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800">
          <Layout className="w-3 h-3" />
          {recipe.layout}
        </span>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {recipe.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 border border-border text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </LocalizedLink>
  );
}
