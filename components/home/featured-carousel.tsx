"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import type { StyleMeta } from "@/lib/styles/meta";

interface FeaturedCarouselProps {
  styles: StyleMeta[];
}

export function FeaturedCarousel({ styles }: FeaturedCarouselProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredStyle = styles.length > 0 ? styles[featuredIndex] : null;

  const nextStyle = useCallback(() => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i + 1) % styles.length);
    }
  }, [styles.length]);

  const prevStyle = useCallback(() => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i - 1 + styles.length) % styles.length);
    }
  }, [styles.length]);

  // Keyboard arrow support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextStyle();
      if (e.key === "ArrowLeft") prevStyle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStyle, prevStyle]);

  if (!featuredStyle) {
    return null;
  }

  return (
    <div className="relative">
      <Link
        href={`/styles/${featuredStyle.slug}`}
        className="block aspect-[4/3] border border-border overflow-hidden hover:border-foreground transition-colors"
      >
        <StyleCoverPreview styleSlug={featuredStyle.slug} />
      </Link>
      {/* Style name + navigation */}
      <div className="flex items-center justify-between mt-3">
        <Link href={`/styles/${featuredStyle.slug}`} className="group min-w-0">
          <p className="text-sm font-medium group-hover:text-accent transition-colors truncate">
            {featuredStyle.name}
          </p>
          <p className="text-xs text-muted truncate">{featuredStyle.nameEn}</p>
        </Link>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={prevStyle}
            className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 transition-colors"
            aria-label="Previous style"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-muted tabular-nums min-w-[3.5rem] text-center">
            {featuredIndex + 1} / {styles.length}
          </span>
          <button
            onClick={nextStyle}
            className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 transition-colors"
            aria-label="Next style"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
