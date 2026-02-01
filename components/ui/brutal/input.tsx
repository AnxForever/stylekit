"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Input
// ============================================
export interface BrutalInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  inputSize?: "sm" | "md" | "lg";
}

export const BrutalInput = React.forwardRef<HTMLInputElement, BrutalInputProps>(
  ({ className, error, inputSize = "md", ...props }, ref) => {
    const sizes = {
      sm: "py-2 px-3 text-sm md:py-2 md:px-4 md:text-base",
      md: "py-3 px-4 text-base md:py-4 md:px-6 md:text-xl",
      lg: "py-4 px-5 text-lg md:py-5 md:px-8 md:text-2xl",
    };

    return (
      <input
        ref={ref}
        className={cn(
          "w-full font-mono",
          sizes[inputSize],
          "border-2 md:border-4 border-black bg-white",
          "focus:outline-none focus:ring-0",
          error
            ? "focus:shadow-[4px_4px_0px_0px_#ff006e] md:focus:shadow-[8px_8px_0px_0px_#ff006e] border-brutal-pink"
            : "focus:shadow-[4px_4px_0px_0px_#00d9ff] md:focus:shadow-[8px_8px_0px_0px_#00d9ff]",
          "transition-shadow placeholder:text-gray-400",
          className
        )}
        {...props}
      />
    );
  }
);
BrutalInput.displayName = "BrutalInput";

// ============================================
// Neo-Brutalist Textarea
// ============================================
export interface BrutalTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const BrutalTextarea = React.forwardRef<HTMLTextAreaElement, BrutalTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full py-3 md:py-4 px-4 md:px-6",
          "text-base md:text-xl font-mono",
          "border-2 md:border-4 border-black bg-white",
          "focus:outline-none focus:ring-0",
          error
            ? "focus:shadow-[4px_4px_0px_0px_#ff006e] md:focus:shadow-[8px_8px_0px_0px_#ff006e] border-brutal-pink"
            : "focus:shadow-[4px_4px_0px_0px_#00d9ff] md:focus:shadow-[8px_8px_0px_0px_#00d9ff]",
          "transition-shadow placeholder:text-gray-400 resize-none",
          className
        )}
        {...props}
      />
    );
  }
);
BrutalTextarea.displayName = "BrutalTextarea";

// ============================================
// Neo-Brutalist Select
// ============================================
export interface BrutalSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const BrutalSelect = React.forwardRef<HTMLSelectElement, BrutalSelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full py-3 md:py-4 px-4 md:px-6 pr-10",
            "text-base md:text-xl font-mono",
            "border-2 md:border-4 border-black bg-white",
            "focus:outline-none focus:ring-0",
            "focus:shadow-[4px_4px_0px_0px_#00d9ff] md:focus:shadow-[8px_8px_0px_0px_#00d9ff]",
            "transition-shadow appearance-none cursor-pointer",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="square" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);
BrutalSelect.displayName = "BrutalSelect";
