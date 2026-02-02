import { Skeleton, NavSkeleton, CardGridSkeleton } from "@/components/ui/skeleton";

export default function StylesLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <NavSkeleton />

      {/* Page header skeleton */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-12 w-48 mb-4" />
          <Skeleton className="h-6 w-full max-w-lg" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Filter skeleton */}
        <div className="flex flex-wrap items-center gap-4 mb-8 md:mb-12">
          <Skeleton className="h-4 w-12" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-8 w-16" />
          ))}
        </div>

        {/* Cards skeleton */}
        <CardGridSkeleton count={6} />
      </div>

      {/* CTA skeleton */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-48 mx-auto mb-6" />
          <Skeleton className="h-12 w-40 mx-auto" />
        </div>
      </div>
    </div>
  );
}
