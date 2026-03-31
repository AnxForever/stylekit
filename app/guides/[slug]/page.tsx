import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { styleGuides, generateStyleGuideMetadata } from "@/lib/seo/style-guides";
import { LocalizedLink } from "@/components/i18n/localized-link";

interface StyleGuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: StyleGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = styleGuides[slug as keyof typeof styleGuides];

  if (!guide) {
    return {
      title: "Guide Not Found",
      description: "The design guide you are looking for does not exist.",
    };
  }

  return generateStyleGuideMetadata(guide);
}

export default async function StyleGuidePage({ params }: StyleGuidePageProps) {
  const { slug } = await params;
  const guide = styleGuides[slug as keyof typeof styleGuides];

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20">
            <div className="mb-4">
              <LocalizedLink
                href="/guides"
                className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
              >
                ← Back to Guides
              </LocalizedLink>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {guide.nameEn}
            </h1>

            {guide.name !== guide.nameEn && (
              <p className="text-lg text-muted mb-6">{guide.name}</p>
            )}

            <p className="text-lg text-muted leading-relaxed max-w-2xl mb-8">
              {guide.descriptionEn}
            </p>

            {guide.influencedBy && guide.influencedBy.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-muted">Influenced by:</span>
                {guide.influencedBy.map((style) => (
                  <span
                    key={style}
                    className="px-3 py-1 bg-muted/20 text-sm rounded-full"
                  >
                    {style}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <h2 className="text-3xl font-bold mb-4">Design Philosophy</h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              {guide.philosophyEn}
            </p>

            <div className="prose prose-invert max-w-none">
              {/* Additional philosophy content can be added here */}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <h2 className="text-3xl font-bold mb-4">Design History</h2>
            <p className="text-lg text-muted leading-relaxed">{guide.historyEn}</p>
          </div>
        </section>

        {/* Use Cases */}
        {guide.useCases.length > 0 && (
          <section className="border-b border-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
              <h2 className="text-3xl font-bold mb-8">Use Cases</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guide.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-lg p-6 hover:border-foreground transition-colors"
                  >
                    <h3 className="font-bold text-lg mb-2">{useCase.titleEn}</h3>
                    <p className="text-sm text-muted mb-3">
                      {useCase.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 bg-muted/20 rounded">
                        {useCase.industry}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* References */}
        {guide.references.length > 0 && (
          <section className="border-b border-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
              <h2 className="text-3xl font-bold mb-6">References & Resources</h2>

              <div className="space-y-3">
                {guide.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 border border-border rounded-lg hover:border-foreground hover:bg-muted/5 transition-colors group"
                  >
                    <span className="text-xs px-2 py-1 bg-muted/20 rounded shrink-0 mt-0.5">
                      {ref.type}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium group-hover:underline">
                        {ref.title}
                      </p>
                      <p className="text-xs text-muted truncate">{ref.url}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Styles */}
        {guide.influenced && guide.influenced.length > 0 && (
          <section className="border-b border-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
              <h2 className="text-3xl font-bold mb-6">Related Design Styles</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guide.influenced.map((style) => (
                  <LocalizedLink
                    key={style}
                    href={`/styles/${style.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-foreground hover:bg-muted/5 transition-colors"
                  >
                    <span className="font-medium">{style}</span>
                    <span className="text-muted">→</span>
                  </LocalizedLink>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

/**
 * Generate static params for all available style guides
 */
export function generateStaticParams() {
  return Object.keys(styleGuides).map((slug) => ({ slug }));
}
