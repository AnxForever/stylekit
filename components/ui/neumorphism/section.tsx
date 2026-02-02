"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuSection - 区域容器
// ============================================
export interface NeuSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "raised" | "pressed";
}

export const NeuSection = React.forwardRef<HTMLElement, NeuSectionProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "",
      raised: NEU_SHADOWS.raisedLg,
      pressed: NEU_SHADOWS.pressedMd,
    };

    return (
      <section
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] px-6 py-12 md:py-20",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
NeuSection.displayName = "NeuSection";
