import type { Metadata } from "next";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { promptTopics } from "@/lib/prompts";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "UI Design Prompts Library",
  description:
    "Curated AI prompts for generating beautiful web interfaces. Browse dashboard, landing page, dark mode, glassmorphism, anime, and more design prompts optimized for v0, Cursor, and Claude.",
  keywords: [
    "UI design prompts",
    "web design prompts",
    "AI UI prompts",
    "design prompt library",
    "v0 prompts",
    "Cursor prompts",
    "Claude prompts",
    "Tailwind UI prompts",
    "frontend design prompts",
  ],
  openGraph: {
    title: "UI Design Prompts Library | StyleKit",
    description:
      `Curated AI prompts for generating web interfaces across StyleKit's ${CURATED_STYLE_COUNT} design styles. Optimized for v0, Cursor, Claude, and more.`,
    siteName: "StyleKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Design Prompts Library | StyleKit",
    description:
      `Curated AI prompts covering StyleKit's ${CURATED_STYLE_COUNT} design styles.`,
  },
};

export default function PromptsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              AI Design Prompts
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              UI Design Prompts Library
            </h1>
            <p className="text-lg text-muted max-w-2xl mb-8">
              Curated AI prompts for generating beautiful web interfaces.
              Each topic includes ready-to-copy prompts optimized for v0,
              Cursor, Claude, and more AI coding tools.
            </p>
            <div className="flex gap-4 text-sm text-muted">
              <span className="border border-border px-3 py-1">
                {promptTopics.length} topics
              </span>
              <span className="border border-border px-3 py-1">
                {promptTopics.reduce((n, t) => n + t.prompts.length, 0)}+ prompts
              </span>
              <span className="border border-border px-3 py-1">
                v0 / Cursor / Claude
              </span>
            </div>
          </div>
        </section>

        {/* Topic Grid */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptTopics.map((topic) => (
                <LocalizedLink
                  key={topic.slug}
                  href={`/prompts/${topic.slug}`}
                  className="group border border-border p-6 hover:border-foreground transition-colors"
                >
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                    {topic.titleEn}
                  </h2>
                  <p className="text-sm text-muted mb-4 line-clamp-2">
                    {topic.descriptionEn}
                  </p>
                  <div className="flex gap-3 text-xs text-muted">
                    <span>{topic.prompts.length} prompts</span>
                    <span>{topic.relatedStyleSlugs.length} styles</span>
                  </div>
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
            <h2 className="text-2xl md:text-3xl mb-4">
              Looking for complete design systems?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Each prompt topic links to StyleKit styles with full design
              tokens, component recipes, and exportable AI Rules.
            </p>
            <LocalizedLink
              href="/styles"
              className="inline-block border-2 border-foreground px-6 py-3 font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Browse {CURATED_STYLE_COUNT} Styles
            </LocalizedLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
