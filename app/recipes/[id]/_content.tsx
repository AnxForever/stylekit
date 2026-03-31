"use client";

import { ArrowRight, Copy, Check, Sparkles, Layout, Layers, ExternalLink } from "lucide-react";
import { useState } from "react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { useI18n } from "@/lib/i18n/context";
import {
  type StyleRecipe,
  getRecipesByUseCase,
  getRecipesByVisualStyle,
} from "@/lib/styles/recipes";
import type { DesignStyle } from "@/lib/styles";

interface Props {
  recipe: StyleRecipe;
  visualStyle: DesignStyle | undefined;
  layoutStyle: DesignStyle | undefined;
}

export function RecipeDetailContent({ recipe, visualStyle, layoutStyle }: Props) {
  const { locale } = useI18n();
  const [copied, setCopied] = useState(false);

  const name = locale === "zh" ? recipe.nameZh : recipe.name;
  const description = locale === "zh" ? recipe.descriptionZh : recipe.description;
  const reasoning = locale === "zh" ? recipe.reasoningZh : recipe.reasoning;

  // Related recipes
  const relatedByUseCase = getRecipesByUseCase(recipe.useCase)
    .filter((r) => r.id !== recipe.id)
    .slice(0, 3);
  const relatedByStyle = getRecipesByVisualStyle(recipe.visualStyle)
    .filter((r) => r.id !== recipe.id)
    .slice(0, 3);

  // Generate prompt for this recipe
  const generatePrompt = () => {
    const parts = [
      `Design Style: ${recipe.visualStyle}`,
      `Layout Pattern: ${recipe.layout}`,
      recipe.animations?.length
        ? `Animations: ${recipe.animations.join(", ")}`
        : null,
      `Use Case: ${recipe.useCase}`,
      `Tags: ${recipe.tags.join(", ")}`,
    ].filter(Boolean);

    return `Create a ${recipe.useCase.replace("-", " ")} using the following design specifications:

${parts.join("\n")}

${reasoning}`;
  };

  const handleCopyPrompt = async () => {
    const prompt = generatePrompt();
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {recipe.featured && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-accent text-accent-foreground">
                    {locale === "zh" ? "精选配方" : "Featured Recipe"}
                  </span>
                )}
                <span className="text-xs text-muted uppercase tracking-wider">
                  {recipe.useCase}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-medium mb-4">{name}</h1>
              <p className="text-xl text-muted mb-6">{description}</p>

              {/* Recipe Components */}
              <div className="flex flex-wrap gap-3 mb-8">
                <LocalizedLink
                  href={`/styles/${recipe.visualStyle}`}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">{recipe.visualStyle}</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </LocalizedLink>
                <LocalizedLink
                  href={`/styles/${recipe.layout}`}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors"
                >
                  <Layout className="w-4 h-4" />
                  <span className="text-sm">{recipe.layout}</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </LocalizedLink>
                {recipe.animations && recipe.animations.length > 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-border">
                    <Layers className="w-4 h-4" />
                    <span className="text-sm">
                      {recipe.animations.length}{" "}
                      {locale === "zh" ? "个动画" : "animations"}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-wider px-2 py-1 border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reasoning */}
              <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-border mb-8">
                <p className="text-xs uppercase tracking-widest text-muted mb-2">
                  {locale === "zh" ? "为什么这个组合有效" : "Why This Combination Works"}
                </p>
                <p className="leading-relaxed">{reasoning}</p>
              </div>

              {/* Quick Copy Prompt */}
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {locale === "zh" ? "已复制提示词" : "Prompt Copied"}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {locale === "zh" ? "复制 AI 提示词" : "Copy AI Prompt"}
                  </>
                )}
              </button>
            </div>

            {/* Right: Preview */}
            <div className="space-y-6">
              {/* Visual Style Preview */}
              {visualStyle && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-3">
                    {locale === "zh" ? "视觉风格预览" : "Visual Style Preview"}
                  </p>
                  <LocalizedLink
                    href={`/styles/${recipe.visualStyle}/showcase`}
                    className="group block border border-border hover:border-foreground transition-colors overflow-hidden"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <StyleCoverPreview styleSlug={recipe.visualStyle} />
                    </div>
                    <div className="p-4 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="font-medium">{visualStyle.name}</p>
                        <p className="text-sm text-muted">{visualStyle.nameEn}</p>
                      </div>
                      <span className="text-xs text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
                        {locale === "zh" ? "查看展示" : "View Showcase"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </LocalizedLink>
                </div>
              )}

              {/* Layout Preview */}
              {layoutStyle && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-3">
                    {locale === "zh" ? "布局风格预览" : "Layout Pattern Preview"}
                  </p>
                  <LocalizedLink
                    href={`/styles/${recipe.layout}/showcase`}
                    className="group block border border-border hover:border-foreground transition-colors overflow-hidden"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <StyleCoverPreview styleSlug={recipe.layout} />
                    </div>
                    <div className="p-4 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="font-medium">{layoutStyle.name}</p>
                        <p className="text-sm text-muted">{layoutStyle.nameEn}</p>
                      </div>
                      <span className="text-xs text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
                        {locale === "zh" ? "查看展示" : "View Showcase"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </LocalizedLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      {recipe.animations && recipe.animations.length > 0 && (
        <section className="py-12 md:py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <p className="text-xs uppercase tracking-widest text-muted mb-4">
              {locale === "zh" ? "推荐动画" : "Recommended Animations"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">
              {locale === "zh" ? "为此配方精选的动画效果" : "Curated Animations for This Recipe"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recipe.animations.map((anim) => (
                <LocalizedLink
                  key={anim}
                  href={`/animations?search=${anim}`}
                  className="group p-4 border border-border hover:border-foreground transition-colors"
                >
                  <p className="font-mono text-sm mb-1">{anim}</p>
                  <p className="text-xs text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
                    {locale === "zh" ? "查看动画" : "View Animation"}
                    <ArrowRight className="w-3 h-3" />
                  </p>
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Recipes */}
      {(relatedByUseCase.length > 0 || relatedByStyle.length > 0) && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            {relatedByUseCase.length > 0 && (
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  {locale === "zh" ? "同类使用场景" : "Same Use Case"}
                </p>
                <h2 className="text-2xl md:text-3xl mb-8">
                  {locale === "zh"
                    ? `其他 ${recipe.useCase} 配方`
                    : `Other ${recipe.useCase} Recipes`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedByUseCase.map((r) => (
                    <RecipeCard key={r.id} recipe={r} />
                  ))}
                </div>
              </div>
            )}

            {relatedByStyle.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  {locale === "zh" ? "相同视觉风格" : "Same Visual Style"}
                </p>
                <h2 className="text-2xl md:text-3xl mb-8">
                  {locale === "zh"
                    ? `其他使用 ${recipe.visualStyle} 的配方`
                    : `Other Recipes Using ${recipe.visualStyle}`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedByStyle.map((r) => (
                    <RecipeCard key={r.id} recipe={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
