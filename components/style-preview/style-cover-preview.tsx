"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  loadStylePreview,
  preloadStylePreviews,
} from "@/lib/style-preview/delivery";

interface StyleCoverPreviewProps {
  styleSlug: string;
  className?: string;
  interactive?: boolean;
}

export function StyleCoverPreview({
  styleSlug,
  className,
  interactive = true,
}: StyleCoverPreviewProps) {
  const [resolvedPreview, setResolvedPreview] = React.useState<{
    slug: string;
    renderer: (() => React.ReactNode) | null;
  } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasResolvedPreview = resolvedPreview?.slug === styleSlug;
  const renderer = hasResolvedPreview ? resolvedPreview.renderer : null;

  React.useEffect(() => {
    let cancelled = false;
    let started = false;

    const loadPreview = () => {
      if (started) return;
      started = true;

      loadStylePreview(styleSlug).then((preview) => {
        if (cancelled) return;
        const nextRenderer = preview?.coverPreview ?? null;
        setResolvedPreview({ slug: styleSlug, renderer: nextRenderer });
      });
    };

    const node = containerRef.current;

    const isVisualBaselineRoute =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("visual-baseline");
    if (isVisualBaselineRoute) {
      preloadStylePreviews().then(loadPreview);
      return () => {
        cancelled = true;
      };
    }

    if (!node || typeof IntersectionObserver === "undefined") {
      loadPreview();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadPreview();
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [styleSlug]);

  if (!hasResolvedPreview) {
    return (
      <div
        ref={containerRef}
        data-preview-ready="false"
        className={cn("w-full h-full bg-zinc-100 dark:bg-zinc-800 animate-pulse", className)}
      />
    );
  }

  if (!renderer) {
    return (
      <div
        ref={containerRef}
        data-preview-ready="error"
        className={cn(
          "w-full h-full bg-zinc-100 flex items-center justify-center",
          className
        )}
      >
        <span className="text-zinc-400 text-sm">暂无预览</span>
      </div>
    );
  }

  const content = renderer();

  return (
    <div
      ref={containerRef}
      data-preview-ready="true"
      className={cn("w-full h-full", !interactive && "pointer-events-none", className)}
      aria-hidden={!interactive}
      inert={interactive ? undefined : true}
    >
      {content}
    </div>
  );
}
