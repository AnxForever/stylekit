import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loadingVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    color: {
      default: "text-foreground",
      accent: "text-accent",
      muted: "text-muted",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export interface LoadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof loadingVariants> {
  label?: string;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size, color, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <svg
          className={cn(loadingVariants({ size, color }))}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && <span className="text-sm">{label}</span>}
        <span className="sr-only">{label || "Loading..."}</span>
      </div>
    );
  }
);
Loading.displayName = "Loading";

export interface LoadingOverlayProps extends LoadingProps {
  visible?: boolean;
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ visible = true, className, ...props }, ref) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm",
          className
        )}
      >
        <Loading {...props} />
      </div>
    );
  }
);
LoadingOverlay.displayName = "LoadingOverlay";

export { Loading, LoadingOverlay, loadingVariants };
