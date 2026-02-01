"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuButton - 按钮
// ============================================
export interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "flat";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant = "default", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles = "bg-[#e0e5ec] font-medium rounded-xl transition-all duration-200 focus:outline-none";

    const variantStyles = {
      default: `text-gray-700 ${NEU_SHADOWS.raised} hover:${NEU_SHADOWS.hover} active:${NEU_SHADOWS.pressed}`,
      primary: `bg-[#6d5dfc] text-white ${NEU_SHADOWS.raised} hover:${NEU_SHADOWS.hover} active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]`,
      flat: "text-gray-700 hover:bg-[#d1d9e6]",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const disabledStyles = disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          disabledStyles,
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            加载中...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
NeuButton.displayName = "NeuButton";

// ============================================
// NeuIconButton - 图标按钮
// ============================================
export interface NeuIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "raised" | "flat";
}

export const NeuIconButton = React.forwardRef<HTMLButtonElement, NeuIconButtonProps>(
  ({ className, size = "md", variant = "raised", children, ...props }, ref) => {
    const sizeStyles = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    const variantStyles = {
      raised: `${NEU_SHADOWS.raised} hover:${NEU_SHADOWS.hover} active:${NEU_SHADOWS.pressed}`,
      flat: "hover:bg-[#d1d9e6]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] rounded-xl flex items-center justify-center",
          "text-gray-600 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#6d5dfc]/30",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
NeuIconButton.displayName = "NeuIconButton";
