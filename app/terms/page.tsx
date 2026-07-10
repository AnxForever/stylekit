import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = canonicalizeEnglishMetadata({
  title: "Terms of Use",
  description:
    "Basic terms for using StyleKit's public site, downloadable assets, and community features.",
}, "/terms");

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Terms</p>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">Terms of Use</h1>
            <p className="text-lg text-muted leading-relaxed max-w-3xl">
              StyleKit is an open-source product and reference library. These terms describe the basic rules for using the site, its downloads, and any community contribution flows.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 grid gap-8">
            <article>
              <h2 className="text-2xl mb-3">Acceptable use</h2>
              <p className="text-muted leading-relaxed">
                Do not abuse the site, attempt to bypass rate limits, scrape protected areas, upload unlawful material, or submit harmful content to any public feature.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Content and downloads</h2>
              <p className="text-muted leading-relaxed">
                StyleKit provides prompts, templates, design tokens, and examples for reference and implementation support. You remain responsible for how you use generated or exported output in your own product.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Community submissions</h2>
              <p className="text-muted leading-relaxed">
                If you submit content, you confirm that you have the right to share it and that StyleKit may review, reject, remove, or display it in public galleries or moderation tools.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">No warranty</h2>
              <p className="text-muted leading-relaxed">
                The site is provided as-is. We aim for accuracy and availability, but we do not guarantee uninterrupted access, perfect completeness, or fitness for a specific commercial use case.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
