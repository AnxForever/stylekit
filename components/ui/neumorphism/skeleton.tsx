"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuSkeleton - 骨架屏
// ============================================
export interface NeuSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export const NeuSkeleton = React.forwardRef<HTMLDivElement, NeuSkeletonProps>(
  ({ className, variant = "text", ...props }, ref) => {
    const variantStyles = {
      text: "h-4 w-full rounded",
      circular: "w-12 h-12 rounded-full",
      rectangular: "h-24 w-full rounded-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#d1d9e6] animate-pulse",
          NEU_SHADOWS.pressed,
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
NeuSkeleton.displayName = "NeuSkeleton";
