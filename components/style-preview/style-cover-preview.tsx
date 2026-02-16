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
  const [renderer, setRenderer] = React.useState<(() => React.ReactNode) | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    styleComponentsPromise.then(components => {
      const r = components[styleSlug]?.coverPreview;
      if (r) setRenderer(() => r);
      setLoaded(true);
    });
  }, [styleSlug]);

  if (!loaded) {
    return (
      <div className={cn("w-full h-full bg-zinc-100 dark:bg-zinc-800 animate-pulse", className)} />
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
