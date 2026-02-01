"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// NeuNav - 导航栏
// ============================================
export type NeuNavProps = React.HTMLAttributes<HTMLElement>;

export const NeuNav = React.forwardRef<HTMLElement, NeuNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] px-6 py-4",
          "shadow-[0_4px_12px_#b8bcc2]",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {children}
        </div>
      </nav>
    );
  }
);
NeuNav.displayName = "NeuNav";

// ============================================
// NeuLogo - Logo
// ============================================
export type NeuLogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const NeuLogo = React.forwardRef<HTMLAnchorElement, NeuLogoProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "text-gray-800 font-bold text-xl",
          "hover:text-[#6d5dfc] transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NeuLogo.displayName = "NeuLogo";
