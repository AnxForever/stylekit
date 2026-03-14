export default function AnimationsLoading() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="h-3 w-20 bg-muted/40 animate-pulse mb-3" />
          <div className="h-10 w-48 bg-muted/40 animate-pulse mb-2" />
          <div className="h-4 w-96 bg-muted/40 animate-pulse" />
        </div>
      </section>
      <section>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
          <div className="h-10 w-72 border border-border animate-pulse mb-8" />
          <div className="space-y-3 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2">
                <div className="h-7 w-16 bg-muted/40 animate-pulse" />
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-7 w-20 bg-muted/40 animate-pulse" />
                ))}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-border overflow-hidden">
                <div className="h-32 bg-muted/20 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-32 bg-muted/40 animate-pulse" />
                  <div className="h-3 w-full bg-muted/30 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-muted/40 animate-pulse" />
                    <div className="h-5 w-14 bg-muted/40 animate-pulse" />
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
