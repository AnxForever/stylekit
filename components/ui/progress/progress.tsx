"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative h-4 w-full overflow-hidden bg-foreground/10",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const indicatorVariants = cva("h-full w-full flex-1 transition-transform", {
  variants: {
    variant: {
      default: "bg-foreground",
      accent: "bg-accent",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof indicatorVariants> {
  showValue?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, max = 100, size, variant, showValue, ...props }, ref) => {
  // Clamp value to a finite number within [0, max] so the indicator
  // transform never produces NaN or out-of-range offsets. Radix uses
  // these to populate aria-valuenow / aria-valuemin / aria-valuemax
  // automatically, so screen readers get correct progress updates.
  const safeValue =
    typeof value === "number" && Number.isFinite(value)
      ? Math.max(0, Math.min(value, max))
      : 0;
  const offsetPercent = 100 - (safeValue / max) * 100;

  return (
    <div className="w-full">
      <ProgressPrimitive.Root
        ref={ref}
        value={safeValue}
        max={max}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(indicatorVariants({ variant }))}
          style={{ transform: `translateX(-${offsetPercent}%)` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <p className="text-xs text-muted mt-1 text-right">
          {Math.round((safeValue / max) * 100)}%
        </p>
      )}
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants };
