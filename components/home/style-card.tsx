"use client";

import React from "react";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import type { StyleMeta } from "@/lib/styles/meta";

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
  const isCompact = variant === "compact";

  return (
    <Link
      href={`/styles/${style.slug}`}
      className="group block border border-border hover:border-foreground transition-colors"
    >
      {/* Cover preview */}
      <div className={`relative overflow-hidden ${isCompact ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
        <StyleCoverPreview styleSlug={style.slug} />

        {/* Type badge for layout styles */}
        {style.styleType === "layout" && (
          <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-black/60 text-white uppercase tracking-wider">
            Layout
          </span>
        )}

        {/* Favorite button */}
        <div
          className="absolute top-2 right-2"
          onClick={(e) => e.preventDefault()}
        >
          <FavoriteButton
            slug={style.slug}
            size={isCompact ? "sm" : "md"}
            className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Color bar */}
      {style.colors && (
        <div className="h-1.5 flex">
          <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
          <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
          {style.colors.accent?.slice(0, 2).map((color, i) => (
            <div key={color || i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      )}

      {/* Card content */}
      <div className={isCompact ? "p-4 md:p-5" : "p-4 md:p-6"}>
        <div className="flex items-center gap-2 mb-2">
          <h3 className={`group-hover:text-accent transition-colors ${isCompact ? "text-lg" : "text-lg md:text-xl"}`}>
            {style.name}
          </h3>
          <span className="text-sm text-muted">
            {style.nameEn}
          </span>
        </div>
        <p className="text-sm text-muted line-clamp-2">
          {style.description}
        </p>
        {/* Tags */}
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
    </Link>
  );
});

StyleCard.displayName = "StyleCard";
