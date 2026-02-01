export default function StylesLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="h-6 w-24 bg-zinc-200 animate-pulse rounded" />
        </div>
      </div>

      {/* Page header skeleton */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="h-4 w-32 bg-zinc-200 animate-pulse rounded mb-4" />
          <div className="h-12 w-48 bg-zinc-200 animate-pulse rounded mb-4" />
          <div className="h-6 w-96 bg-zinc-200 animate-pulse rounded" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-16 bg-zinc-200 animate-pulse rounded" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-border">
              <div className="aspect-[4/3] bg-zinc-200 animate-pulse" />
              <div className="p-4 md:p-5">
                <div className="h-5 w-32 bg-zinc-200 animate-pulse rounded mb-2" />
                <div className="h-4 w-full bg-zinc-200 animate-pulse rounded mb-3" />
                <div className="flex gap-2">
                  <div className="h-5 w-12 bg-zinc-200 animate-pulse rounded" />
                  <div className="h-5 w-12 bg-zinc-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
