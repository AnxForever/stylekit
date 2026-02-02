"use client";

import { useFavorites } from "@/lib/favorites/context";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({ slug, className, size = "md" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(slug);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      className={cn(
        "flex items-center justify-center rounded-full transition-all",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/20",
        sizeClasses[size],
        className
      )}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "transition-colors",
          favorited ? "text-red-500" : "text-muted hover:text-foreground"
        )}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
