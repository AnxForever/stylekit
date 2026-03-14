"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StyleCoverPreviewProps {
  styleSlug: string;
  className?: string;
}

// Lazy-load the heavy style-components module (154KB)
const styleComponentsPromise = import("@/lib/style-components").then(m => m.styleComponents);

export function StyleCoverPreview({
  styleSlug,
  className,
}: StyleCoverPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = React.useState<(() => React.ReactNode) | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const element = containerRef.current;
    if (!element) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    styleComponentsPromise.then(components => {
      const r = components[styleSlug]?.coverPreview;
      if (r) setRenderer(() => r);
      setLoaded(true);
    });
  }, [shouldLoad, styleSlug]);

  if (!shouldLoad || !loaded) {
    return (
      <div
        ref={containerRef}
        className={cn("w-full h-full bg-zinc-100 dark:bg-zinc-800 animate-pulse", className)}
      />
    );
  }

  if (!renderer) {
    return (
      <div
        className={cn(
          "w-full h-full bg-zinc-100 flex items-center justify-center",
          className
        )}
      >
        <span className="text-zinc-400 text-sm">暂无预览</span>
      </div>
    );
  }

  return <div className={cn("w-full h-full", className)}>{renderer()}</div>;
}
