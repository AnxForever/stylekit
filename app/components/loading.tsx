import {
  Skeleton,
  NavSkeleton,
  ComponentSectionSkeleton,
} from "@/components/ui/skeleton";

export default function ComponentsLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <NavSkeleton />

      {/* Hero skeleton */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <Skeleton className="h-4 w-16 mb-4" />
          <Skeleton className="h-12 w-48 mb-6" />
          <Skeleton className="h-6 w-full max-w-lg" />
        </div>
      </section>

      {/* Style switcher skeleton */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-28" />
            ))}
          </div>
        </div>
      </section>

      {/* Components grid skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid gap-12 md:gap-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ComponentSectionSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer skeleton */}
      <div className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
