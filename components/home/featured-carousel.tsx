"use client";

import { useState } from "react";
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

  const nextStyle = () => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i + 1) % styles.length);
    }
  };

  const prevStyle = () => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i - 1 + styles.length) % styles.length);
    }
  };

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
        <Link href={`/styles/${featuredStyle.slug}`} className="group">
          <p className="text-sm font-medium group-hover:text-accent transition-colors">
            {featuredStyle.name}
          </p>
          <p className="text-xs text-muted">{featuredStyle.nameEn}</p>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={prevStyle}
            className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors"
            aria-label="Previous style"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted tabular-nums">
            {featuredIndex + 1}/{styles.length}
          </span>
          <button
            onClick={nextStyle}
            className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors"
            aria-label="Next style"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
