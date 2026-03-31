import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { styleGuides } from "@/lib/seo/style-guides";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Style Guides - StyleKit",
  description:
    "Learn the history, philosophy, and best practices of popular design styles. Comprehensive guides to help you choose the right design direction for your project.",
  keywords: [
    "design guide",
    "design history",
    "design philosophy",
    "design styles",
    "UI design",
  ],
};

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
              {guides.map((guide) => (
                <LocalizedLink
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group border border-border rounded-lg p-6 hover:border-foreground hover:shadow-sm hover:bg-muted/2 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:underline">
                        {guide.nameEn}
                      </h3>
                      {guide.name !== guide.nameEn && (
                        <p className="text-sm text-muted">{guide.name}</p>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted group-hover:translate-x-1 transition-transform" />
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                    {guide.descriptionEn}
                  </p>

                  {guide.influencedBy && guide.influencedBy.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.influencedBy.map((style) => (
                        <span
                          key={style}
                          className="text-xs px-2 py-0.5 bg-muted/20 text-muted rounded"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>
                      {guide.useCases.length} use case
                      {guide.useCases.length !== 1 ? "s" : ""}
                    </span>
                    <span>•</span>
                    <span>
                      {guide.references.length} reference
                      {guide.references.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </LocalizedLink>
              ))}
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
