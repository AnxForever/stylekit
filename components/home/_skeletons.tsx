/**
 * Skeleton placeholder for the TrendingStyles client island while it
 * lazy-loads. Rendered server-side via the dynamic() loader's
 * loading option, so it must not import any client-only hooks.
 */
export function TrendingStylesSkeleton() {
  return (
    <section id="home-trending" className="border-b border-border scroll-mt-24" aria-busy="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
        <div className="mb-6 sm:mb-8 space-y-2">
          <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
          <h2 className="sr-only">Trending</h2>
          <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 [content-visibility:auto] [contain-intrinsic-size:1px_560px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border border-border p-3 sm:p-4 animate-pulse">
              <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-900 mb-3" />
              <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
              <div className="h-1.5 rounded bg-zinc-100 dark:bg-zinc-900" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}