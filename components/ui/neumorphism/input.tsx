"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuInput - 输入框
// ============================================
export interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const NeuInput = React.forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-[#e0e5ec] text-gray-700 rounded-xl",
          "px-4 py-3",
          NEU_SHADOWS.pressed,
          "focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]",
          "focus:outline-none focus:ring-2 focus:ring-[#6d5dfc]/30",
          "placeholder:text-gray-400",
          "transition-shadow duration-200",
          error && "ring-2 ring-red-400",
          className
        )}
        {...props}
      />
    );
  }
);
NeuInput.displayName = "NeuInput";

// ============================================
// NeuTextarea - 文本域
// ============================================
export interface NeuTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const NeuTextarea = React.forwardRef<HTMLTextAreaElement, NeuTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-[#e0e5ec] text-gray-700 rounded-xl",
          "px-4 py-3 resize-none",
          NEU_SHADOWS.pressed,
          "focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]",
          "focus:outline-none focus:ring-2 focus:ring-[#6d5dfc]/30",
          "placeholder:text-gray-400",
          "transition-shadow duration-200",
          error && "ring-2 ring-red-400",
          className
        )}
        {...props}
      />
    );
  }
);
NeuTextarea.displayName = "NeuTextarea";
