"use client";

import { useKit } from "@/lib/kit/context";
import type { KitItemType } from "@/lib/kit/types";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

interface AddToKitButtonProps {
  type: KitItemType;
  slug: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "labeled";
}

/**
 * "+ Kit" collector button. Semantically distinct from FavoriteButton:
 * favorite = "I like this", kit = "I'm going to use this in my project".
 */
export function AddToKitButton({
  type,
  slug,
  className,
  size = "md",
  variant = "icon",
}: AddToKitButtonProps) {
  const { hasItem, toggleItem } = useKit();
  const { locale } = useI18n();
  const inKit = hasItem(type, slug);

  const label = inKit
    ? locale === "zh"
      ? "从工具箱移除"
      : "Remove from kit"
    : locale === "zh"
      ? "加入工具箱"
      : "Add to kit";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(type, slug);
  };

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={inKit}
        className={cn(
          "inline-flex items-center gap-1.5 border px-2 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors",
          inKit
            ? "border-foreground text-foreground"
            : "border-border text-muted hover:border-foreground hover:text-foreground",
          className
        )}
      >
        <KitIcon inKit={inKit} px={12} />
        {inKit ? (locale === "zh" ? "已加入" : "In Kit") : "+ Kit"}
      </button>
    );
  }

  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-10 h-10" };
  const iconSizes = { sm: 14, md: 18, lg: 22 };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={inKit}
      aria-label={label}
      title={label}
      className={cn(
        "flex items-center justify-center rounded-full transition-colors",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/20",
        sizeClasses[size],
        className
      )}
    >
      <KitIcon inKit={inKit} px={iconSizes[size]} />
    </button>
  );
}

function KitIcon({ inKit, px }: { inKit: boolean; px: number }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "transition-colors",
        inKit ? "text-accent" : "text-muted hover:text-foreground"
      )}
    >
      {/* Toolbox outline */}
      <path d="M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Z" />
      <path d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
      {inKit ? (
        <path d="m9 14.5 2 2 4-4" />
      ) : (
        <path d="M12 12.5v5M9.5 15h5" />
      )}
    </svg>
  );
}
