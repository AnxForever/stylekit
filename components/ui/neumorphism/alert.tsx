"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuAlert - 提示
// ============================================
export interface NeuAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
}

export const NeuAlert = React.forwardRef<HTMLDivElement, NeuAlertProps>(
  ({ className, variant = "default", title, children, ...props }, ref) => {
    const variantStyles = {
      default: "border-l-4 border-gray-400",
      success: "border-l-4 border-[#4ecdc4]",
      warning: "border-l-4 border-[#ffe66d]",
      error: "border-l-4 border-[#ff6b6b]",
      info: "border-l-4 border-[#6d5dfc]",
    };

    const iconMap = {
      default: "ℹ️",
      success: "✓",
      warning: "⚠",
      error: "✕",
      info: "ℹ",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "bg-[#e0e5ec] rounded-xl p-4",
          NEU_SHADOWS.raised,
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="text-lg">{iconMap[variant]}</span>
          <div>
            {title && <p className="font-semibold text-gray-800 mb-1">{title}</p>}
            <div className="text-gray-600 text-sm">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);
NeuAlert.displayName = "NeuAlert";

// ============================================
// NeuBadge - 徽章
// ============================================
export interface NeuBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "error";
}

export const NeuBadge = React.forwardRef<HTMLSpanElement, NeuBadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-gray-200 text-gray-700",
      primary: "bg-[#6d5dfc] text-white",
      success: "bg-[#4ecdc4] text-white",
      warning: "bg-[#ffe66d] text-gray-800",
      error: "bg-[#ff6b6b] text-white",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full",
          "text-xs font-medium",
          "shadow-[2px_2px_4px_rgba(0,0,0,0.1)]",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
NeuBadge.displayName = "NeuBadge";
