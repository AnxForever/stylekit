import { Header } from "@/components/layout/header";

export default function StyleDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="border-b border-border animate-pulse">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <div className="h-12 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
              <div className="h-6 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mb-6" />
              <div className="space-y-3 mb-6">
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
              <div className="flex gap-2 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
                ))}
              </div>
              <div className="flex gap-4">
                <div className="h-11 w-36 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-11 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-[16/10] bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
