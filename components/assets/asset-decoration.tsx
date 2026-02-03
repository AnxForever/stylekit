"use client";

import React from "react";
import Image from "next/image";
import type { AssetMeta } from "@/lib/assets/meta";

interface AssetDecorationProps {
  asset: AssetMeta;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  size?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  rotation?: number;
  className?: string;
}

const sizeMap = {
  sm: "w-16 h-16 md:w-20 md:h-20",
  md: "w-24 h-24 md:w-32 md:h-32",
  lg: "w-32 h-32 md:w-48 md:h-48",
  xl: "w-48 h-48 md:w-64 md:h-64",
};

const positionMap = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export const AssetDecoration = React.forwardRef<
  HTMLDivElement,
  AssetDecorationProps
>(
  (
    {
      asset,
      position = "top-right",
      size = "md",
      opacity = 0.8,
      rotation = 0,
      className,
    },
    ref
  ) => {
    const sizeClass = sizeMap[size];
    const positionClass = positionMap[position];

    return (
      <div
        ref={ref}
        className={`absolute ${positionClass} pointer-events-none ${className || ""}`}
        style={{
          opacity,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div className={`relative ${sizeClass}`}>
          <Image
            src={asset.image}
            alt={asset.name}
            fill
            className="object-contain"
            sizes={
              size === "sm"
                ? "80px"
                : size === "md"
                  ? "128px"
                  : size === "lg"
                    ? "192px"
                    : "256px"
            }
            priority={false}
          />
        </div>
      </div>
    );
  }
);

AssetDecoration.displayName = "AssetDecoration";
