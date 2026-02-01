"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Tag
// ============================================
export interface BrutalTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "black" | "pink" | "green" | "blue" | "yellow" | "orange";
  size?: "sm" | "md";
}

export const BrutalTag = React.forwardRef<HTMLSpanElement, BrutalTagProps>(
  ({ className, variant = "black", size = "md", children, ...props }, ref) => {
    const variants = {
      black: "bg-black text-white",
      pink: "bg-brutal-pink text-white border-2 border-black",
      green: "bg-brutal-green text-black border-2 border-black",
      blue: "bg-brutal-blue text-black border-2 border-black",
      yellow: "bg-brutal-yellow text-black border-2 border-black",
      orange: "bg-brutal-orange text-white border-2 border-black",
    };

    const sizes = {
      sm: "px-1.5 py-0.5 text-[10px] md:px-2 md:py-1 md:text-xs",
      md: "px-2 py-1 text-xs md:text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "font-bold inline-block",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
BrutalTag.displayName = "BrutalTag";

// ============================================
// Neo-Brutalist Badge (圆形数字徽章)
// ============================================
export interface BrutalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "black" | "pink" | "green" | "blue" | "yellow";
}

export const BrutalBadge = React.forwardRef<HTMLSpanElement, BrutalBadgeProps>(
  ({ className, variant = "pink", children, ...props }, ref) => {
    const variants = {
      black: "bg-black text-white",
      pink: "bg-brutal-pink text-white",
      green: "bg-brutal-green text-black",
      blue: "bg-brutal-blue text-black",
      yellow: "bg-brutal-yellow text-black",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "min-w-[20px] h-5 md:min-w-[24px] md:h-6",
          "px-1.5 text-xs md:text-sm font-black",
          "border-2 border-black",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
BrutalBadge.displayName = "BrutalBadge";
