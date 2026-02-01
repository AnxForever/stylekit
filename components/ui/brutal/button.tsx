"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Button
// ============================================
export interface BrutalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pink" | "green" | "blue" | "yellow" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles =
      "font-black border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0";

    const variants = {
      primary: "bg-black text-white hover:bg-brutal-pink",
      secondary: "bg-white text-black hover:bg-brutal-green",
      pink: "bg-brutal-pink text-white",
      green: "bg-brutal-green text-black",
      blue: "bg-brutal-blue text-black",
      yellow: "bg-brutal-yellow text-black",
      outline: "bg-transparent text-black hover:bg-black hover:text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm",
      md: "px-4 py-2 text-sm md:px-6 md:py-3 md:text-base",
      lg: "px-6 py-3 text-base md:px-8 md:py-4 md:text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
            加载中...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
BrutalButton.displayName = "BrutalButton";
