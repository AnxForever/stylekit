"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Checkbox
// ============================================
export interface BrutalCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const BrutalCheckbox = React.forwardRef<HTMLInputElement, BrutalCheckboxProps>(
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
          <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-4 border-black bg-white peer-checked:bg-brutal-green transition-colors" />
          <svg
            className="absolute inset-0 w-5 h-5 md:w-6 md:h-6 text-black opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="square"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {label && (
          <span className="font-mono text-sm md:text-base group-hover:text-brutal-pink transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
BrutalCheckbox.displayName = "BrutalCheckbox";

// ============================================
// Neo-Brutalist Radio
// ============================================
export interface BrutalRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const BrutalRadio = React.forwardRef<HTMLInputElement, BrutalRadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedRadioId = React.useId();
    const radioId = id ?? generatedRadioId;

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
          <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-4 border-black bg-white peer-checked:bg-brutal-pink transition-colors" />
          <div className="absolute inset-1 md:inset-1.5 bg-black opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {label && (
          <span className="font-mono text-sm md:text-base group-hover:text-brutal-pink transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
BrutalRadio.displayName = "BrutalRadio";

// ============================================
// Neo-Brutalist Toggle/Switch
// ============================================
export interface BrutalToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const BrutalToggle = React.forwardRef<HTMLInputElement, BrutalToggleProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedToggleId = React.useId();
    const toggleId = id ?? generatedToggleId;

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
          <div className="w-12 h-6 md:w-14 md:h-7 border-2 md:border-4 border-black bg-white peer-checked:bg-brutal-green transition-colors" />
          <div className="absolute left-0.5 top-0.5 md:left-0.5 md:top-0 w-4 h-4 md:w-5 md:h-5 bg-black peer-checked:translate-x-6 md:peer-checked:translate-x-7 transition-transform" />
        </div>
        {label && (
          <span className="font-mono text-sm md:text-base group-hover:text-brutal-pink transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
BrutalToggle.displayName = "BrutalToggle";
