import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

// Use the project's design tokens rather than hardcoded zinc shades so
// the placeholder color tracks the active theme. `bg-foreground/10` is
// the same neutral used by Progress for its track.
const SKELETON_BASE =
  "bg-foreground/10 animate-pulse motion-reduce:animate-none";

const SKELETON_VARIANT: Record<NonNullable<SkeletonProps["variant"]>, string> = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded",
};

/**
 * Generic skeleton placeholder. Wrap collections of Skeletons in a
 * parent that carries `role="status"` and `aria-live="polite"` (e.g.
 * the page-level Suspense fallback) so screen readers announce the
 * loading state without re-announcing each individual placeholder.
 *
 * Forwards refs to match every other primitive in components/ui/.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { className, variant = "rectangular", width, height, style, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(SKELETON_BASE, SKELETON_VARIANT[variant], className)}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

/**
 * Page header skeleton — title + lede bar.
 */
export function PageHeaderSkeleton() {
  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-12 w-64 md:w-96 mb-4" />
        <Skeleton className="h-6 w-full max-w-lg" />
      </div>
    </div>
  );
}

/**
 * Card grid skeleton — N placeholder cards in a 1/2/3 column layout.
 */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-border">
          <Skeleton className="aspect-[4/3]" />
          <div className="p-4 md:p-5">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Component-section skeleton — title + lede + preview rectangle + CTA bar.
 */
export function ComponentSectionSkeleton() {
  return (
    <div className="border border-border rounded-lg p-6">
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-48 mb-6" />
      <Skeleton className="h-32 w-full mb-4" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

/**
 * Top-nav skeleton — logo + N link bars.
 */
export function NavSkeleton() {
  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}