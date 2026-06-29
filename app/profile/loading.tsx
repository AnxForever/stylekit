import { NavSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavSkeleton />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="animate-pulse space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-muted/20 shrink-0" />
              <div className="space-y-3 flex-1">
                <div className="h-7 w-48 bg-muted/20 rounded" />
                <div className="h-4 w-32 bg-muted/20 rounded" />
                <div className="h-4 w-56 bg-muted/20 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-muted/20 rounded-lg" />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-6 w-40 bg-muted/20 rounded" />
              <div className="h-32 bg-muted/20 rounded" />
            </div>
            <div className="space-y-4">
              <div className="h-6 w-40 bg-muted/20 rounded" />
              <div className="h-48 bg-muted/20 rounded" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
