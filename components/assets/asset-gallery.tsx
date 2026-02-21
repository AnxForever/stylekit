"use client";

import React, { useState } from "react";
import { AssetCard } from "./asset-card";
import { useAssetFavorites } from "@/lib/assets/hooks";
import type { AssetMeta, AssetCategory } from "@/lib/assets/meta";

interface AssetGalleryProps {
  assets: AssetMeta[];
  title?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  variant?: "default" | "compact" | "mini";
  onDownload?: (asset: AssetMeta) => void;
}

export function AssetGallery({
  assets,
  title,
  showSearch = true,
  showFilter = true,
  variant = "default",
  onDownload,
}: AssetGalleryProps) {
  const { toggleFavorite, isFavorite } = useAssetFavorites();
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | "all">("all");
  const [query, setQuery] = useState("");

  // Filter by search query
  const searchedAssets = query.trim()
    ? assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(query.toLowerCase()) ||
          asset.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : assets;

  // Filter by category
  const filteredAssets =
    selectedCategory === "all"
      ? searchedAssets
      : searchedAssets.filter((asset) => asset.category === selectedCategory);

  // Get unique categories from passed assets
  const categories = Array.from(
    new Set(assets.map((asset) => asset.category))
  ) as AssetCategory[];

  return (
    <div className="space-y-6">
      {/* Header */}
      {title && (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
      )}

      {/* Search and Filter */}
      {(showSearch || showFilter) && (
        <div className="space-y-4">
          {showSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="搜索素材..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-foreground transition-colors"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}

          {showFilter && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedCategory === "all"
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground"
                }`}
              >
                全部
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded transition-colors capitalize ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "border border-border hover:border-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted">
        找到 {filteredAssets.length} 个素材
      </div>

      {/* Gallery Grid */}
      {filteredAssets.length > 0 ? (
        <div
          className={`grid gap-4 ${
            variant === "mini"
              ? "grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
              : variant === "compact"
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              variant={variant}
              onFavorite={toggleFavorite}
              isFavorite={isFavorite(asset.id)}
              onDownload={onDownload}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted">未找到匹配的素材</p>
        </div>
      )}
    </div>
  );
}
