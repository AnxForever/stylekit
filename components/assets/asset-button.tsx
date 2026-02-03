"use client";

import React from "react";
import Image from "next/image";
import type { AssetMeta } from "@/lib/assets/meta";

interface AssetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asset?: AssetMeta;
  assetPosition?: "left" | "right" | "top" | "bottom";
  assetSize?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

const sizeMap = {
  sm: { container: "w-6 h-6", button: "px-3 py-1.5 text-sm" },
  md: { container: "w-8 h-8", button: "px-4 py-2 text-base" },
  lg: { container: "w-10 h-10", button: "px-6 py-3 text-lg" },
};

const variantMap = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 transition-colors",
  secondary:
    "bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors",
  outline:
    "border border-border text-foreground hover:border-foreground transition-colors",
};

export const AssetButton = React.forwardRef<
  HTMLButtonElement,
  AssetButtonProps
>(
  (
    {
      asset,
      assetPosition = "left",
      assetSize = "md",
      variant = "primary",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeMap[assetSize];
    const variantClass = variantMap[variant];

    const buttonContent = (
      <>
        {asset && (assetPosition === "left" || assetPosition === "top") && (
          <div className={`relative ${sizeConfig.container} flex-shrink-0`}>
            <Image
              src={asset.image}
              alt={asset.name}
              fill
              className="object-cover"
              sizes={assetSize === "sm" ? "24px" : assetSize === "md" ? "32px" : "40px"}
            />
          </div>
        )}

        <span>{children}</span>

        {asset && (assetPosition === "right" || assetPosition === "bottom") && (
          <div className={`relative ${sizeConfig.container} flex-shrink-0`}>
            <Image
              src={asset.image}
              alt={asset.name}
              fill
              className="object-cover"
              sizes={assetSize === "sm" ? "24px" : assetSize === "md" ? "32px" : "40px"}
            />
          </div>
        )}
      </>
    );

    const flexDirection =
      assetPosition === "top" || assetPosition === "bottom"
        ? "flex-col"
        : "flex-row";

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 ${flexDirection} ${sizeConfig.button} ${variantClass} rounded transition-all hover:scale-105 ${className || ""}`}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

AssetButton.displayName = "AssetButton";
