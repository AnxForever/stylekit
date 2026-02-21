"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useAssets } from "@/lib/assets/hooks";
import type { AssetMeta, AssetCategory } from "@/lib/assets/meta";

interface AssetPickerProps {
  category?: AssetCategory;
  onSelect?: (asset: AssetMeta) => void;
  selectedAssetId?: string;
  placeholder?: string;
}

export function AssetPicker({
  category,
  onSelect,
  selectedAssetId,
  placeholder = "选择素材...",
}: AssetPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const allAssets = useAssets();

  // Filter by category using useMemo instead of conditional hook
  const assets = useMemo(() => {
    if (!category) return allAssets;
    return allAssets.filter((asset) => asset.category === category);
  }, [allAssets, category]);

  const selectedAsset = assets.find((a) => a.id === selectedAssetId);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-border rounded flex items-center justify-between hover:border-foreground transition-colors"
      >
        <span className="flex items-center gap-2">
          {selectedAsset ? (
            <>
              <div className="relative w-6 h-6">
                <Image
                  src={selectedAsset.thumbnail || selectedAsset.image}
                  alt={selectedAsset.name}
                  fill
                  className="object-cover rounded"
                  sizes="24px"
                />
              </div>
              <span className="text-sm">{selectedAsset.name}</span>
            </>
          ) : (
            <span className="text-sm text-muted">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-border bg-background rounded shadow-lg z-50 max-h-64 overflow-y-auto">
          {assets.length > 0 ? (
            assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => {
                  onSelect?.(asset);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left border-b border-border last:border-b-0"
              >
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src={asset.thumbnail || asset.image}
                    alt={asset.name}
                    fill
                    className="object-cover rounded"
                    sizes="32px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{asset.name}</p>
                  <p className="text-xs text-muted truncate">{asset.nameEn}</p>
                </div>
                {selectedAssetId === asset.id && (
                  <svg
                    className="w-4 h-4 text-accent flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted">
              没有可用的素材
            </div>
          )}
        </div>
      )}
    </div>
  );
}
