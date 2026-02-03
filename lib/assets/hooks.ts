"use client";

import { useState, useCallback } from "react";
import type { AssetMeta, AssetCategory, AssetTag } from "./meta";
import {
  assetsMeta,
  getAssetsByCategory,
  getAssetsByTag,
  searchAssets,
  getAssetsForStyle,
} from "./meta";

/**
 * Hook to get all assets
 */
export function useAssets() {
  return assetsMeta;
}

/**
 * Hook to filter assets by category
 */
export function useAssetsByCategory(category: AssetCategory) {
  return getAssetsByCategory(category);
}

/**
 * Hook to filter assets by tag
 */
export function useAssetsByTag(tag: AssetTag) {
  return getAssetsByTag(tag);
}

/**
 * Hook to search assets with debouncing
 */
export function useAssetSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<AssetMeta[]>(assetsMeta);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      setResults(searchAssets(searchQuery));
    } else {
      setResults(assetsMeta);
    }
  }, []);

  return { query, results, handleSearch };
}

/**
 * Hook to get assets for a specific style
 */
export function useAssetsForStyle(styleSlug: string) {
  return getAssetsForStyle(styleSlug);
}

/**
 * Hook to manage asset favorites
 */
export function useAssetFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback((assetId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(assetId)) {
        next.delete(assetId);
      } else {
        next.add(assetId);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (assetId: string) => favorites.has(assetId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
