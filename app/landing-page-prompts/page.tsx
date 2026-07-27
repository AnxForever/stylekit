import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { landingPageTemplates } from "@/lib/seo/prompt-template-previews";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { generatePromptPageSchemas } from "@/lib/seo/prompt-schema";

const TOPIC_SLUG = "landing-page";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Landing Page Prompts",
  description:
    "Copyable landing page prompts for SaaS products, startup launches, waitlists, pricing sections, and conversion-focused website design.",
  keywords: [
    "landing page prompts",
    "website landing page prompt",
    "SaaS landing page prompt",
    "AI landing page design prompt",
    "startup landing page prompt",
  ],
  openGraph: {
    title: "Landing Page Prompts | StyleKit",
    description:
      "Copyable landing page prompts for SaaS products, startup launches, waitlists, and conversion-focused website design.",
    siteName: "StyleKit",
    images: [{ url: "/social-preview-home-v1.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Page Prompts | StyleKit",
    description:
      "Copyable landing page prompts for SaaS products, startup launches, waitlists, and conversion-focused website design.",
  },
};

export default async function LandingPagePromptsPage() {
  const topic = getTopicBySlug(TOPIC_SLUG);
  if (!topic) notFound();
  const { locale } = await getRequestLocaleContext();

  const allStyles = getAllStylesMeta();
  const relatedStyles = topic.relatedStyleSlugs
    .map((slug) => allStyles.find((style) => style.slug === slug))
    .filter(Boolean);

  const { faq: faqSchema, breadcrumb: breadcrumbSchema } =
    generatePromptPageSchemas(topic, locale, "/landing-page-prompts");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
        />
        <PromptTopicContent
          topic={topic}
          relatedStyles={relatedStyles}
          curatedStyleCount={CURATED_STYLE_COUNT}
          topicIndexHref="/ui-prompts"
        >
          <PromptTemplatePreviewSection
            title="Example previews and starter templates"
            description="Treat these templates as landing page structure references: hero, social proof, pricing, FAQ, and CTA rhythm usually produce better prompts than a generic landing page brief."
            templates={landingPageTemplates}
          />
        </PromptTopicContent>
      </main>
      <Footer />
    </div>
  );
}
