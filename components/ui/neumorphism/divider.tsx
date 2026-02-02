"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// NeuDivider - 分割线
// ============================================
export interface NeuDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const NeuDivider = React.forwardRef<HTMLDivElement, NeuDividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#e0e5ec]",
          orientation === "horizontal"
            ? "h-1 w-full shadow-[inset_0_1px_2px_#b8bcc2,inset_0_-1px_2px_#ffffff]"
            : "w-1 h-full shadow-[inset_1px_0_2px_#b8bcc2,inset_-1px_0_2px_#ffffff]",
          "rounded-full",
          className
        )}
        {...props}
      />
    );
  }
);
NeuDivider.displayName = "NeuDivider";
