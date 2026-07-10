import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { styleGuides } from "@/lib/seo/style-guides";
import { BookOpen, ArrowRight, Sparkles, History } from "lucide-react";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

// Color scheme for each guide
const guideColors: Record<string, string> = {
  neumorphism: "from-rose-500/20 to-orange-500/20",
  "minimalist-flat": "from-zinc-400/20 to-slate-500/20",
  glassmorphism: "from-blue-500/20 to-purple-500/20",
  "neo-brutalism": "from-yellow-400/20 to-pink-500/20",
  editorial: "from-stone-400/20 to-amber-500/20",
  "cyber-wafuu": "from-red-500/20 to-cyan-500/20",
};

export const metadata: Metadata = canonicalizeEnglishMetadata({
  title: "Design Style Guides",
  description:
    "Learn the history, philosophy, and best practices of popular design styles. Comprehensive guides to help you choose the right design direction for your project.",
  keywords: [
    "design guide",
    "design history",
    "design philosophy",
    "design styles",
    "UI design",
  ],
}, "/guides");

export default function GuidesPage() {
  const guides = Object.values(styleGuides);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-muted" />
                <span className="text-xs tracking-widest uppercase text-muted">
                  Design Education
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Design Style Guides
              </h1>

              <p className="text-lg text-muted leading-relaxed mb-6">
                Deep dive into the history, philosophy, and practical applications of popular web design styles. Learn what influenced each style, when to use it, and real-world examples from leading companies.
              </p>

              <p className="text-base text-muted/70">
                These comprehensive guides are designed to help you understand design trends, make informed choices for your projects, and improve your design literacy.
              </p>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => {
                const colorScheme = guideColors[guide.slug] || "from-gray-400/20 to-gray-500/20";
                
                return (
                  <LocalizedLink
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group relative border border-border rounded-xl overflow-hidden hover:border-foreground hover:shadow-lg transition-all"
                  >
                    {/* Gradient header */}
                    <div className={`h-24 bg-gradient-to-br ${colorScheme} relative`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-0.5 group-hover:text-accent transition-colors">
                            {guide.nameEn}
                          </h3>
                          {guide.name !== guide.nameEn && (
                            <p className="text-sm text-muted">{guide.name}</p>
                          )}
                        </div>
                        <div className="p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                        {guide.descriptionEn}
                      </p>

                      {/* Influenced by tags */}
                      {guide.influencedBy && guide.influencedBy.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <History className="w-3.5 h-3.5 text-muted shrink-0" />
                          <div className="flex flex-wrap gap-1.5">
                            {guide.influencedBy.map((style) => (
                              <span
                                key={style}
                                className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted rounded-full"
                              >
                                {style}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex items-center gap-3 text-xs text-muted">
                          <span className="inline-flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {guide.useCases.length} use case{guide.useCases.length !== 1 ? "s" : ""}
                          </span>
                          <span>•</span>
                          <span>
                            {guide.references.length} reference{guide.references.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </LocalizedLink>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to apply these styles?</h2>
              <p className="text-muted mb-6">
                Browse our full design style collection and start building beautiful interfaces today.
              </p>
              <LocalizedLink
                href="/styles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-lg font-medium"
              >
                Browse All Styles
                <ArrowRight className="w-4 h-4" />
              </LocalizedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
