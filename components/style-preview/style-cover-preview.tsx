"use client";

import * as React from "react";
import { styleComponents } from "@/lib/style-components";
import { cn } from "@/lib/utils";

interface StyleCoverPreviewProps {
  styleSlug: string;
  className?: string;
}

export function StyleCoverPreview({
  styleSlug,
  className,
}: StyleCoverPreviewProps) {
  const renderer = styleComponents[styleSlug]?.coverPreview;

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
