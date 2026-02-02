import { Skeleton, NavSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <NavSkeleton />

      {/* Hero skeleton */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left content */}
            <div>
              <Skeleton className="h-3 w-24 mb-4" />
              <Skeleton className="h-14 w-full max-w-md mb-2" />
              <Skeleton className="h-14 w-3/4 mb-2" />
              <Skeleton className="h-14 w-1/2 mb-6" />
              <Skeleton className="h-6 w-full max-w-sm mb-8" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-28" />
              </div>
            </div>

            {/* Right preview */}
            <Skeleton className="aspect-[4/3] w-full" />
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <Skeleton className="h-3 w-20 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-7 w-32 mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style grid skeleton */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border">
                <Skeleton className="aspect-[16/9]" />
                <div className="p-4 md:p-6">
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-6 w-16" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
