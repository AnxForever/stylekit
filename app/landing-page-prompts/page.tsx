import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { landingPageTemplates } from "@/lib/seo/prompt-template-previews";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";
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
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Page Prompts | StyleKit",
    description:
      "Copyable landing page prompts for SaaS products, startup launches, waitlists, and conversion-focused website design.",
  },
};

export default function LandingPagePromptsPage() {
  const topic = getTopicBySlug(TOPIC_SLUG);
  if (!topic) notFound();

  const allStyles = getAllStylesMeta();
  const relatedStyles = topic.relatedStyleSlugs
    .map((slug) => allStyles.find((style) => style.slug === slug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.faq.map((faq) => ({
      "@type": "Question",
      name: faq.questionEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerEn,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "UI Prompts",
        item: `${BASE_URL}/ui-prompts`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: topic.titleEn,
        item: `${BASE_URL}/landing-page-prompts`,
      },
    ],
  };

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
