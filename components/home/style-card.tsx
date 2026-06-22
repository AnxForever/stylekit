"use client";

import React from "react";
import { FavoriteButton } from "@/components/favorite-button";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { useI18n } from "@/lib/i18n/context";
import type { StyleMeta } from "@/lib/styles/meta";
import { getScenarioLabel, getStyleScenarios } from "@/lib/styles/scenarios";

interface StyleCardProps {
  style: StyleMeta;
  variant?: "default" | "compact";
}

/**
 * 风格卡片组件（已优化）
 * 使用 React.memo 避免不必要的重渲染
 */
export const StyleCard = React.memo(function StyleCard({
  style,
  variant = "default",
}: StyleCardProps) {
  const { locale } = useI18n();
  const isCompact = variant === "compact";
  const scenarios = getStyleScenarios(style, isCompact ? 2 : 3);
  const cardClassName = "group relative border border-border motion-safe:transition-[border-color,transform,box-shadow] motion-safe:duration-200 hover:border-foreground focus-within:border-foreground motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md";

  // 保存当前滚动位置和过滤器状态，用于返回时恢复
  const handleClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("styles-scroll-position", window.scrollY.toString());
      // 保存当前URL中的过滤器参数，以便返回时恢复
      const currentUrl = window.location.href;
      sessionStorage.setItem("styles-return-url", currentUrl);
    }
  };

  return (
    <div className="relative">
      <div className={cardClassName}>
        <LocalizedLink
          href={`/styles/${style.slug}`}
          onClick={handleClick}
          aria-label={`${locale === "zh" ? style.name : style.nameEn || style.name} ${locale === "zh" ? "详情" : "details"}`}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        <div className={`relative overflow-hidden ${isCompact ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
          <StyleCoverPreview styleSlug={style.slug} interactive={false} />

          {style.styleType === "layout" && (
            <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-black/60 text-white uppercase tracking-wider">
              Layout
            </span>
          )}
        </div>

        {style.colors && (
          <div className="h-1.5 flex">
            <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
            <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
            {style.colors.accent?.slice(0, 2).map((color, i) => (
              <div key={color || i} className="flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
        )}

        <div className={isCompact ? "p-3 sm:p-4 md:p-5" : "p-4 md:p-6"}>
          <div className={`flex items-center gap-2 mb-2 ${isCompact ? "min-w-0" : ""}`}>
            <h3 className={`group-hover:text-accent group-focus-visible:text-accent transition-colors truncate leading-snug ${isCompact ? "text-base" : "text-lg md:text-xl"}`}>
              {style.name}
            </h3>
            <span className={`text-sm text-muted shrink-0 ${isCompact ? "hidden sm:inline" : ""}`}>
              {style.nameEn}
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {style.description}
          </p>
          {scenarios.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {scenarios.map((scenario) => (
                <span
                  key={scenario}
                  className="text-[10px] px-2 py-0.5 border border-border text-muted"
                >
                  {getScenarioLabel(scenario, locale)}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {style.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 z-20">
        <FavoriteButton
          slug={style.slug}
          size={isCompact ? "sm" : "md"}
          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        />
      </div>
    </div>
  );
});

StyleCard.displayName = "StyleCard";
