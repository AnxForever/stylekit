"use client";

import { ArrowRight, Layers, Layout, Sparkles, Check } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import type { StyleRecipe } from "@/lib/styles/recipes";

interface RecipeCardProps {
  recipe: StyleRecipe;
  variant?: "default" | "compact" | "featured";
}

export function RecipeCard({ recipe, variant = "default" }: RecipeCardProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  
  const name = isZh ? recipe.nameZh : recipe.name;
  const description = isZh ? recipe.descriptionZh : recipe.description;
  const reasoning = isZh ? recipe.reasoningZh : recipe.reasoning;

  if (variant === "compact") {
    return (
      <LocalizedLink
        href={`/recipes/${recipe.id}`}
        className="group relative block border border-border hover:border-foreground transition-all p-4 overflow-hidden"
      >
        {/* Subtle gradient overlay on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"} opacity-0 group-hover:opacity-5 transition-opacity`}
          aria-hidden="true"
        />
        
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1.5 truncate group-hover:text-foreground transition-colors">
              {name}
            </h4>
            <p className="text-xs text-muted line-clamp-2 leading-relaxed">{description}</p>
          </div>
          <div 
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"} shrink-0 shadow-sm`}
            aria-hidden="true"
          />
        </div>
        
        <div className="relative flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">
            <Sparkles className="w-2.5 h-2.5" />
            {recipe.visualStyle}
          </span>
          <span className="text-muted text-[10px]">+</span>
          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">
            <Layout className="w-2.5 h-2.5" />
            {recipe.layout}
          </span>
        </div>
      </LocalizedLink>
    );
  }

  if (variant === "featured") {
    return (
      <LocalizedLink
        href={`/recipes/${recipe.id}`}
        className="group relative block border border-border hover:border-foreground transition-all overflow-hidden rounded-xl"
      >
        {/* Gradient preview with overlay */}
        <div className="relative h-36">
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"}`}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Featured badge */}
          {recipe.featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-1 bg-amber-500/90 text-white rounded-full shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                {isZh ? "精选" : "Featured"}
              </span>
            </div>
          )}
          
          {/* Popularity indicator */}
          {recipe.popularity && recipe.popularity > 85 && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-muted">{recipe.popularity}%</span>
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1.5 group-hover:text-accent transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          </div>
          
          {/* Recipe components */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              <Sparkles className="w-3 h-3 text-purple-500" />
              {recipe.visualStyle}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              <Layout className="w-3 h-3 text-blue-500" />
              {recipe.layout}
            </span>
            {recipe.animations && recipe.animations.length > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                <Layers className="w-3 h-3 text-emerald-500" />
                {recipe.animations.length} {isZh ? "动画" : "animations"}
              </span>
            )}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {recipe.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-border text-muted rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Reasoning */}
          <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4 italic">
            &ldquo;{reasoning}&rdquo;
          </p>
          
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <span className="text-xs text-muted">
              {isZh ? "适用场景：" : "Use case: "}
              <span className="text-foreground font-medium">{recipe.useCase}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted group-hover:text-foreground transition-colors">
              {isZh ? "查看详情" : "View Details"}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
      className="group relative block border border-border hover:border-foreground transition-all p-5 overflow-hidden"
    >
      {/* Hover gradient effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"} opacity-0 group-hover:opacity-[0.03] transition-opacity`}
        aria-hidden="true"
      />
      
      <div className="relative flex items-start gap-4 mb-4">
        <div 
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${recipe.previewGradient || "from-gray-400 to-gray-600"} shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Recipe components */}
      <div className="relative flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">
          <Sparkles className="w-3 h-3 text-purple-500" />
          {recipe.visualStyle}
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">
          <Layout className="w-3 h-3 text-blue-500" />
          {recipe.layout}
        </span>
        {recipe.animations && recipe.animations.length > 0 && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">
            <Layers className="w-3 h-3 text-emerald-500" />
            +{recipe.animations.length}
          </span>
        )}
      </div>
      
      {/* Tags */}
      <div className="relative flex flex-wrap gap-1">
        {recipe.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 border border-border text-muted rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Arrow indicator */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-4 h-4 text-muted" />
      </div>
    </LocalizedLink>
  );
}
