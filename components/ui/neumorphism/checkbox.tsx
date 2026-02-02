"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuCheckbox - 复选框
// ============================================
export interface NeuCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const NeuCheckbox = React.forwardRef<HTMLInputElement, NeuCheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
      <label
        htmlFor={checkboxId}
        className={cn("flex items-center gap-3 cursor-pointer group", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            "w-6 h-6 bg-[#e0e5ec] rounded-lg",
            NEU_SHADOWS.pressed,
            "peer-checked:bg-[#6d5dfc]",
            "peer-checked:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]",
            "transition-all duration-200"
          )} />
          <svg
            className="absolute inset-0 w-6 h-6 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
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
NeuCheckbox.displayName = "NeuCheckbox";

// ============================================
// NeuRadio - 单选框
// ============================================
export interface NeuRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const NeuRadio = React.forwardRef<HTMLInputElement, NeuRadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id ?? generatedId;

    return (
      <label
        htmlFor={radioId}
        className={cn("flex items-center gap-3 cursor-pointer group", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            "w-6 h-6 bg-[#e0e5ec] rounded-full",
            NEU_SHADOWS.pressed,
            "transition-all duration-200"
          )} />
          <div className={cn(
            "absolute inset-1 bg-[#6d5dfc] rounded-full",
            "scale-0 peer-checked:scale-100",
            "shadow-[2px_2px_4px_rgba(0,0,0,0.2)]",
            "transition-transform duration-200"
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
NeuRadio.displayName = "NeuRadio";
