"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Avatar
// ============================================
export interface BrutalAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export const BrutalAvatar = React.forwardRef<HTMLDivElement, BrutalAvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const sizes = {
      sm: "w-8 h-8 md:w-10 md:h-10 text-sm",
      md: "w-12 h-12 md:w-16 md:h-16 text-lg",
      lg: "w-16 h-16 md:w-24 md:h-24 text-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative border-2 md:border-4 border-black bg-brutal-yellow overflow-hidden",
          "flex items-center justify-center font-black",
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || ""}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <span>{fallback || "?"}</span>
        )}
      </div>
    );
  }
);
BrutalAvatar.displayName = "BrutalAvatar";

// ============================================
// Neo-Brutalist Link
// ============================================
export interface BrutalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "underline" | "button";
}

export const BrutalLink = React.forwardRef<HTMLAnchorElement, BrutalLinkProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "text-black hover:text-brutal-pink font-black transition-colors",
      underline:
        "text-black underline decoration-4 decoration-brutal-pink underline-offset-4 hover:bg-brutal-pink hover:text-white transition-all",
      button:
        "inline-block px-4 py-2 bg-black text-white font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all",
    };

    return (
      <a ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </a>
    );
  }
);
BrutalLink.displayName = "BrutalLink";

// ============================================
// Neo-Brutalist Skeleton (加载占位)
// ============================================
export interface BrutalSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "avatar";
}

export const BrutalSkeleton = React.forwardRef<HTMLDivElement, BrutalSkeletonProps>(
  ({ className, variant = "text", ...props }, ref) => {
    const variants = {
      text: "h-4 md:h-5 w-full",
      card: "h-32 md:h-48 w-full",
      avatar: "w-12 h-12 md:w-16 md:h-16",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-gray-200 border-2 border-black animate-pulse",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
BrutalSkeleton.displayName = "BrutalSkeleton";

// ============================================
// Neo-Brutalist Marquee (滚动文字)
// ============================================
export interface BrutalMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: "slow" | "normal" | "fast";
}

export const BrutalMarquee = React.forwardRef<HTMLDivElement, BrutalMarqueeProps>(
  ({ className, speed = "normal", children, ...props }, ref) => {
    const speeds = {
      slow: "animate-[marquee_30s_linear_infinite]",
      normal: "animate-[marquee_20s_linear_infinite]",
      fast: "animate-[marquee_10s_linear_infinite]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden border-y-2 md:border-y-4 border-black py-2 md:py-4 bg-brutal-yellow",
          className
        )}
        {...props}
      >
        <div className={cn("flex whitespace-nowrap", speeds[speed])}>
          <span className="font-black text-lg md:text-2xl mx-4">{children}</span>
          <span className="font-black text-lg md:text-2xl mx-4">{children}</span>
          <span className="font-black text-lg md:text-2xl mx-4">{children}</span>
          <span className="font-black text-lg md:text-2xl mx-4">{children}</span>
        </div>
      </div>
    );
  }
);
BrutalMarquee.displayName = "BrutalMarquee";

// ============================================
// Neo-Brutalist Code Block
// ============================================
export interface BrutalCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
}

export const BrutalCodeBlock = React.forwardRef<HTMLPreElement, BrutalCodeBlockProps>(
  ({ className, code, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative">
        <pre
          ref={ref}
          className={cn(
            "p-4 md:p-6 bg-black text-white font-mono text-sm md:text-base",
            "border-2 md:border-4 border-black overflow-x-auto",
            className
          )}
          {...props}
        >
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-2 right-2 md:top-4 md:right-4",
            "px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-black",
            "border-2 border-white transition-colors",
            copied
              ? "bg-brutal-green text-black"
              : "bg-transparent text-white hover:bg-white hover:text-black"
          )}
        >
          {copied ? "已复制!" : "复制"}
        </button>
      </div>
    );
  }
);
BrutalCodeBlock.displayName = "BrutalCodeBlock";
