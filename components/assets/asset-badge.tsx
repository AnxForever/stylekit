"use client";

import React from "react";
import Image from "next/image";
import type { AssetMeta } from "@/lib/assets/meta";

interface AssetBadgeProps {
  asset?: AssetMeta;
  label: string;
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  assetPosition?: "left" | "right";
  className?: string;
}

const variantMap = {
  primary: "bg-foreground text-background",
  secondary: "bg-zinc-100 dark:bg-zinc-800 text-foreground",
  accent: "bg-accent text-background",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
  error: "bg-red-500 text-white",
};

const sizeMap = {
  sm: { container: "w-5 h-5", padding: "px-2 py-1 text-xs" },
  md: { container: "w-6 h-6", padding: "px-3 py-1.5 text-sm" },
  lg: { container: "w-8 h-8", padding: "px-4 py-2 text-base" },
};

export const AssetBadge = React.forwardRef<HTMLDivElement, AssetBadgeProps>(
  (
    {
      asset,
      label,
      variant = "primary",
      size = "md",
      assetPosition = "left",
      className,
    },
    ref
  ) => {
    const variantClass = variantMap[variant];
    const sizeConfig = sizeMap[size];

    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-1.5 ${sizeConfig.padding} ${variantClass} rounded-full font-medium ${className || ""}`}
      >
        {asset && assetPosition === "left" && (
          <div className={`relative ${sizeConfig.container} flex-shrink-0`}>
            <Image
              src={asset.thumbnail || asset.image}
              alt={asset.name}
              fill
              className="object-cover rounded-full"
              sizes={size === "sm" ? "20px" : size === "md" ? "24px" : "32px"}
            />
          </div>
        )}

        <span className="whitespace-nowrap">{label}</span>

        {asset && assetPosition === "right" && (
          <div className={`relative ${sizeConfig.container} flex-shrink-0`}>
            <Image
              src={asset.thumbnail || asset.image}
              alt={asset.name}
              fill
              className="object-cover rounded-full"
              sizes={size === "sm" ? "20px" : size === "md" ? "24px" : "32px"}
            />
          </div>
        )}
      </div>
    );
  }
);

AssetBadge.displayName = "AssetBadge";
