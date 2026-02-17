import Link from "next/link";

export default function ShowcaseContent() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-pink-200">StyleKit</p>
        <h1 className="mb-6 text-5xl font-black tracking-tight text-pink-300 sm:text-6xl">
          Gothic Lolita Showcase
        </h1>
        <p className="max-w-2xl text-zinc-300">
          Elegant Victorian silhouettes, lace textures, and moody contrast tuned for modern web
          interfaces.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Palette", "Rose, charcoal, porcelain ivory"],
            ["Mood", "Dark romance with delicate ornament"],
            ["Use Cases", "Fashion promos, lookbooks, editorial sites"],
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-pink-300/30 bg-zinc-900/70 p-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-pink-200">
                {title}
              </h2>
              <p className="text-sm text-zinc-300">{text}</p>
            </article>
          ))}
        </div>
        <Link
          href="/styles/gothic-lolita"
          className="mt-10 inline-flex rounded-md border border-pink-300 px-4 py-2 text-sm font-semibold text-pink-200 transition hover:bg-pink-300/10"
        >
          Back to style details
        </Link>
      </section>
    </main>
  );
}
