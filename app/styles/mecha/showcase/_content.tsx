import Link from "next/link";

export default function ShowcaseContent() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-sky-300">StyleKit</p>
        <h1 className="mb-6 text-5xl font-black tracking-tight text-sky-300 sm:text-6xl">
          Mecha Showcase
        </h1>
        <p className="max-w-2xl text-slate-300">
          Industrial panels, tactical HUD accents, and heavy machinery rhythm for product pages and
          sci-fi control interfaces.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Palette", "Steel blue, warning orange, graphite"],
            ["Mood", "Precision engineering under pressure"],
            ["Use Cases", "Game dashboards, robotics brands, hero sections"],
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-sky-400/30 bg-slate-900/70 p-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-sky-300">
                {title}
              </h2>
              <p className="text-sm text-slate-300">{text}</p>
            </article>
          ))}
        </div>
        <Link
          href="/styles/mecha"
          className="mt-10 inline-flex rounded-md border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-300/10"
        >
          Back to style details
        </Link>
      </section>
    </main>
  );
}
