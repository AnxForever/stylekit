"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuProgress - 进度条
// ============================================
export interface NeuProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  showValue?: boolean;
  color?: "default" | "primary" | "success";
}

export const NeuProgress = React.forwardRef<HTMLDivElement, NeuProgressProps>(
  ({ className, value, showValue, color = "default", ...props }, ref) => {
    const colorStyles = {
      default: "bg-gray-400",
      primary: "bg-[#6d5dfc]",
      success: "bg-[#4ecdc4]",
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className={cn(
          "h-4 bg-[#e0e5ec] rounded-full overflow-hidden",
          NEU_SHADOWS.pressed
        )}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              colorStyles[color],
              "shadow-[2px_0_4px_rgba(0,0,0,0.1)]"
            )}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
        {showValue && (
          <span className="absolute right-0 -top-6 text-sm text-gray-600">
            {value}%
          </span>
        )}
      </div>
    );
  }
);
NeuProgress.displayName = "NeuProgress";

// ============================================
// NeuSlider - 滑块
// ============================================
export interface NeuSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValue?: boolean;
}

export const NeuSlider = React.forwardRef<HTMLInputElement, NeuSliderProps>(
  ({ className, showValue, value, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <input
          ref={ref}
          type="range"
          value={value}
          className={cn(
            "w-full h-3 bg-[#e0e5ec] rounded-full appearance-none cursor-pointer",
            NEU_SHADOWS.pressed,
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6",
            "[&::-webkit-slider-thumb]:bg-[#e0e5ec] [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:transition-shadow",
            "[&::-webkit-slider-thumb]:hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff]"
          )}
          {...props}
        />
        {showValue && (
          <span className="absolute right-0 -top-6 text-sm text-gray-600">
            {value}
          </span>
        )}
      </div>
    );
  }
);
NeuSlider.displayName = "NeuSlider";
