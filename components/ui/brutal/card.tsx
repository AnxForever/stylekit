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
    const hoverColors = {
      pink: "hover:shadow-[6px_6px_0px_0px_#ff006e] md:hover:shadow-[12px_12px_0px_0px_#ff006e]",
      green: "hover:shadow-[6px_6px_0px_0px_#ccff00] md:hover:shadow-[12px_12px_0px_0px_#ccff00]",
      blue: "hover:shadow-[6px_6px_0px_0px_#00d9ff] md:hover:shadow-[12px_12px_0px_0px_#00d9ff]",
      yellow: "hover:shadow-[6px_6px_0px_0px_#ff9500] md:hover:shadow-[12px_12px_0px_0px_#ff9500]",
      orange: "hover:shadow-[6px_6px_0px_0px_#ff6b00] md:hover:shadow-[12px_12px_0px_0px_#ff6b00]",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white p-4 md:p-8 border-2 md:border-4 border-black",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          hoverColors[hoverColor],
          hoverColor !== "none" && "hover:-translate-y-1 md:hover:-translate-y-2",
          "transition-all duration-300",
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
