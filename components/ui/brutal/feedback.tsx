"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info, Check, AlertTriangle, X } from "lucide-react";

// ============================================
// Neo-Brutalist Alert
// ============================================
export interface BrutalAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
}

export const BrutalAlert = React.forwardRef<HTMLDivElement, BrutalAlertProps>(
  ({ className, variant = "default", title, children, ...props }, ref) => {
    const variants = {
      default: "bg-white border-black",
      success: "bg-brutal-green border-black",
      warning: "bg-brutal-yellow border-black",
      error: "bg-brutal-pink border-black text-white",
      info: "bg-brutal-blue border-black",
    };

    const icons = {
      default: <Info className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />,
      success: <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />,
      warning: <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />,
      error: <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />,
      info: <Info className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "p-4 md:p-6 border-2 md:border-4",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex gap-3 md:gap-4">
          <span className="font-black">{icons[variant]}</span>
          <div className="flex-1">
            {title && (
              <h4 className="font-black text-base md:text-lg mb-1">{title}</h4>
            )}
            <div className="font-mono text-sm md:text-base">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);
BrutalAlert.displayName = "BrutalAlert";

// ============================================
// Neo-Brutalist Progress
// ============================================
export interface BrutalProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "black" | "pink" | "green" | "blue" | "yellow";
  showValue?: boolean;
}

export const BrutalProgress = React.forwardRef<HTMLDivElement, BrutalProgressProps>(
  ({ className, value, max = 100, variant = "pink", showValue, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const variants = {
      black: "bg-black",
      pink: "bg-brutal-pink",
      green: "bg-brutal-green",
      blue: "bg-brutal-blue",
      yellow: "bg-brutal-yellow",
    };

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className="w-full h-6 md:h-8 border-2 md:border-4 border-black bg-white">
          <div
            className={cn("h-full transition-all duration-300", variants[variant])}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <p className="font-mono font-bold text-sm md:text-base text-right">
            {Math.round(percentage)}%
          </p>
        )}
      </div>
    );
  }
);
BrutalProgress.displayName = "BrutalProgress";

// ============================================
// Neo-Brutalist Toast
// ============================================
export interface BrutalToastProps {
  message: string;
  variant?: "default" | "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

export const BrutalToast: React.FC<BrutalToastProps> = ({
  message,
  variant = "default",
  isVisible,
  onClose,
}) => {
  const variants = {
    default: "bg-white",
    success: "bg-brutal-green",
    error: "bg-brutal-pink text-white",
  };

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-[slideIn_0.3s_ease-out]">
      <div
        className={cn(
          "px-4 py-3 md:px-6 md:py-4 border-2 md:border-4 border-black",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          "flex items-center gap-3",
          variants[variant]
        )}
      >
        <span className="font-mono text-sm md:text-base">{message}</span>
        <button
          onClick={onClose}
          className="font-black hover:text-brutal-pink transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
