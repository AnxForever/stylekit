"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { AssetMeta } from "@/lib/assets/meta";

interface AssetCardProps {
  asset: AssetMeta;
  variant?: "default" | "compact" | "mini";
  onFavorite?: (assetId: string) => void;
  isFavorite?: boolean;
  onDownload?: (asset: AssetMeta) => void;
}

export const AssetCard = React.memo(function AssetCard({
  asset,
  variant = "default",
  onFavorite,
  isFavorite = false,
  onDownload,
}: AssetCardProps) {
  const isCompact = variant === "compact";
  const isMini = variant === "mini";

  // Mini variant - 极简展示
  if (isMini) {
    return (
      <div className="group relative border border-border hover:border-foreground transition-colors overflow-hidden">
        <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 aspect-square">
          <Image
            src={asset.image}
            alt={asset.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="120px"
          />
        </div>
        <div className="p-2">
          <h3 className="text-xs truncate">{asset.name}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative border border-border hover:border-foreground transition-colors overflow-hidden">
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 ${
          isCompact ? "aspect-square" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={asset.image}
          alt={asset.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={isCompact ? "200px" : "300px"}
        />

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          {onDownload && (
            <button
              onClick={() => onDownload(asset)}
              className="p-2 bg-white/90 hover:bg-white text-foreground rounded transition-colors"
              title="下载素材"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          )}
          {onFavorite && (
            <button
              onClick={() => onFavorite(asset.id)}
              className="p-2 bg-white/90 hover:bg-white text-foreground rounded transition-colors"
              title={isFavorite ? "取消收藏" : "收藏素材"}
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>

        {/* Category badge */}
        <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-black/60 text-white uppercase tracking-wider">
          {asset.category}
        </span>

        {/* Favorite indicator */}
        {isFavorite && (
          <div className="absolute top-2 right-2">
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={isCompact ? "p-3" : "p-4"}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className={`group-hover:text-accent transition-colors ${isCompact ? "text-sm" : "text-base"}`}>
              {asset.name}
            </h3>
            <p className="text-xs text-muted">{asset.nameEn}</p>
          </div>
        </div>

        <p className={`text-muted line-clamp-2 ${isCompact ? "text-xs" : "text-sm"}`}>
          {asset.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {asset.tags.slice(0, isCompact ? 2 : 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Color palette */}
        {asset.colors && asset.colors.length > 0 && (
          <div className="flex gap-1 mt-2">
            {asset.colors.map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded border border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

AssetCard.displayName = "AssetCard";
