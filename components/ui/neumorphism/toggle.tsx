"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuToggle - 开关
// ============================================
export interface NeuToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const NeuToggle = React.forwardRef<HTMLInputElement, NeuToggleProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const toggleId = id ?? generatedId;

    return (
      <label
        htmlFor={toggleId}
        className={cn("flex items-center gap-3 cursor-pointer group", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            "w-12 h-7 bg-[#e0e5ec] rounded-full",
            NEU_SHADOWS.pressed,
            "peer-checked:bg-[#6d5dfc]/20",
            "transition-all duration-300"
          )} />
          <div className={cn(
            "absolute top-0.5 left-0.5 w-6 h-6 bg-[#e0e5ec] rounded-full",
            NEU_SHADOWS.raised,
            "peer-checked:translate-x-5",
            "peer-checked:bg-[#6d5dfc]",
            "transition-all duration-300"
          )} />
        </div>
        {label && (
          <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
NeuToggle.displayName = "NeuToggle";
