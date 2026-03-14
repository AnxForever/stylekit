export default function AnimationDetailLoading() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="h-3 w-24 bg-muted/40 animate-pulse mb-6" />
          <div className="h-10 w-72 bg-muted/40 animate-pulse mb-2" />
          <div className="h-3 w-40 bg-muted/40 animate-pulse mb-3" />
          <div className="h-4 w-96 bg-muted/40 animate-pulse mb-4" />
          <div className="flex gap-3">
            <div className="h-6 w-16 border border-border animate-pulse" />
            <div className="h-6 w-16 border border-border animate-pulse" />
            <div className="h-6 w-16 border border-border animate-pulse" />
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="h-3 w-12 bg-muted/40 animate-pulse mb-4" />
          <div className="h-48 w-full bg-muted/20 animate-pulse mb-12" />
          <div className="h-3 w-12 bg-muted/40 animate-pulse mb-4" />
          <div className="h-64 w-full bg-muted/20 animate-pulse" />
        </div>
      </section>
    </div>
  );
}
