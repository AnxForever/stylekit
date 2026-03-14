export default function AnimationsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-3" />
        <div className="h-8 w-64 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-2" />
        <div className="h-4 w-96 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      </div>

      {/* Search skeleton */}
      <div className="h-10 w-80 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-6" />

      {/* Filter rows skeleton */}
      <div className="space-y-3 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2">
            <div className="h-7 w-16 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="h-7 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="h-32 bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
