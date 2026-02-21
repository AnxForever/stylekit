import { NavSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavSkeleton />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-14">
            <div className="mb-10">
              <div className="h-3 w-20 bg-muted/20 rounded mb-3" />
              <div className="h-10 w-64 bg-muted/20 rounded mb-3" />
              <div className="h-5 w-96 bg-muted/20 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-border animate-pulse">
                  <div className="aspect-[16/10] bg-muted/20" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted/20 w-3/4 rounded" />
                    <div className="h-3 bg-muted/20 w-full rounded" />
                    <div className="h-3 bg-muted/20 w-2/3 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
