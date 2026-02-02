"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuAvatar - 头像
// ============================================
export interface NeuAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export const NeuAvatar = React.forwardRef<HTMLDivElement, NeuAvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const sizeStyles = {
      sm: "w-10 h-10 text-sm",
      md: "w-14 h-14 text-base",
      lg: "w-20 h-20 text-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] rounded-full overflow-hidden flex items-center justify-center",
          NEU_SHADOWS.raised,
          sizeStyles[size],
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
          <span className="text-gray-500 font-medium">{fallback || "?"}</span>
        )}
      </div>
    );
  }
);
NeuAvatar.displayName = "NeuAvatar";
