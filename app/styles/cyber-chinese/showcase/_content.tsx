import Link from "next/link";

export default function ShowcaseContent() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-300">StyleKit</p>
        <h1 className="mb-6 text-5xl font-black tracking-tight text-red-400 sm:text-6xl">
          Cyber Chinese Showcase
        </h1>
        <p className="max-w-2xl text-zinc-300">
          Traditional architecture silhouettes, neon signage, and holographic motifs in one
          practical reference page.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Palette", "Red, jade, cyan, and deep ink black"],
            ["Mood", "Sacred heritage meets dense urban night"],
            ["Use Cases", "Games, posters, immersive landing pages"],
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-cyan-500/30 bg-zinc-900/60 p-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-300">
                {title}
              </h2>
              <p className="text-sm text-zinc-300">{text}</p>
            </article>
          ))}
        </div>
        <Link
          href="/styles/cyber-chinese"
          className="mt-10 inline-flex rounded-md border border-red-400 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
        >
          Back to style details
        </Link>
      </section>
    </main>
  );
}
