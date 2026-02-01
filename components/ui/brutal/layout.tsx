"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Section
// ============================================
export interface BrutalSectionProps extends React.HTMLAttributes<HTMLElement> {
  bgColor?: "white" | "pink" | "green" | "blue" | "yellow" | "black";
  noBorder?: boolean;
}

export const BrutalSection = React.forwardRef<HTMLElement, BrutalSectionProps>(
  ({ className, bgColor = "white", noBorder = false, children, ...props }, ref) => {
    const bgColors = {
      white: "bg-white",
      pink: "bg-brutal-pink",
      green: "bg-brutal-green",
      blue: "bg-brutal-blue",
      yellow: "bg-brutal-yellow",
      black: "bg-black text-white",
    };

    return (
      <section
        ref={ref}
        className={cn(
          !noBorder && "border-b-2 md:border-b-4 border-black",
          "py-12 md:py-32 px-4 md:px-8",
          bgColors[bgColor],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
BrutalSection.displayName = "BrutalSection";

// ============================================
// Neo-Brutalist Nav
// ============================================
export interface BrutalNavProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
}

export const BrutalNav = React.forwardRef<HTMLElement, BrutalNavProps>(
  ({ className, fixed = true, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          fixed ? "fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-50" : "",
          "bg-white border-2 md:border-4 border-black",
          "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "px-3 md:px-8 py-2 md:py-4",
          "flex justify-between items-center",
          "max-w-7xl mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    );
  }
);
BrutalNav.displayName = "BrutalNav";

// ============================================
// Neo-Brutalist Logo
// ============================================
export interface BrutalLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  rotate?: boolean;
}

export const BrutalLogo = React.forwardRef<HTMLAnchorElement, BrutalLogoProps>(
  ({ className, href = "/", rotate = true, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "text-base md:text-2xl font-black",
          "bg-black text-white px-2 py-1",
          rotate && "rotate-[-2deg]",
          "hover:scale-105 transition-transform",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
BrutalLogo.displayName = "BrutalLogo";

// ============================================
// Neo-Brutalist Divider
// ============================================
export interface BrutalDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: "solid" | "dashed" | "thick";
}

export const BrutalDivider = React.forwardRef<HTMLHRElement, BrutalDividerProps>(
  ({ className, variant = "solid", ...props }, ref) => {
    const variants = {
      solid: "border-t-2 md:border-t-4 border-black",
      dashed: "border-t-2 md:border-t-4 border-black border-dashed",
      thick: "border-t-4 md:border-t-8 border-black",
    };

    return (
      <hr
        ref={ref}
        className={cn("w-full", variants[variant], className)}
        {...props}
      />
    );
  }
);
BrutalDivider.displayName = "BrutalDivider";
