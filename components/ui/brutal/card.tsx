"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Card
// ============================================
export interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverColor?: "pink" | "green" | "blue" | "yellow" | "orange" | "none";
}

export const BrutalCard = React.forwardRef<HTMLDivElement, BrutalCardProps>(
  ({ className, hoverColor = "pink", children, ...props }, ref) => {
    // Reference the semantic brutal shadow tokens defined in
    // app/globals.css @theme block. Using a token instead of an
    // arbitrary-value `shadow-[…#ff006e]` means future palette
    // changes only need to update the CSS variable, not every
    // card / button / input site.
    const hoverColors = {
      pink: "hover:shadow-brutal-pink-card md:hover:shadow-brutal-pink-card-lg",
      green: "hover:shadow-brutal-green-card md:hover:shadow-brutal-green-card-lg",
      blue: "hover:shadow-brutal-blue-card md:hover:shadow-brutal-blue-card-lg",
      yellow: "hover:shadow-brutal-yellow-card md:hover:shadow-brutal-yellow-card-lg",
      orange: "hover:shadow-brutal-orange-card md:hover:shadow-brutal-orange-card-lg",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white p-4 md:p-8 border-2 md:border-4 border-black",
          "shadow-brutal-black md:shadow-brutal-black-lg",
          hoverColors[hoverColor],
          hoverColor !== "none" && "hover:-translate-y-1 md:hover:-translate-y-2",
          "transition-[box-shadow,transform] duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BrutalCard.displayName = "BrutalCard";
