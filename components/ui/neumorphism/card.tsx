"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuCard - 卡片
// ============================================
export interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "raised" | "flat" | "pressed";
}

export const NeuCard = React.forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, variant = "raised", children, ...props }, ref) => {
    const variantStyles = {
      raised: NEU_SHADOWS.raisedMd,
      flat: "shadow-none border border-[#d1d9e6]",
      pressed: NEU_SHADOWS.pressedMd,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] rounded-2xl p-6",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NeuCard.displayName = "NeuCard";
