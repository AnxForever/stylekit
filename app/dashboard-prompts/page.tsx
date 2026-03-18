import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { dashboardTemplates } from "@/lib/seo/prompt-template-previews";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";
const TOPIC_SLUG = "dashboard-design";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Dashboard Prompts",
  description:
    "Copyable dashboard UI prompts for analytics, admin panels, KPI cards, charts, tables, and responsive data-heavy interfaces.",
  keywords: [
    "dashboard prompts",
    "dashboard UI prompt",
    "analytics dashboard prompt",
    "admin dashboard design prompt",
    "SaaS dashboard prompt",
  ],
  openGraph: {
    title: "Dashboard Prompts | StyleKit",
    description:
      "Copyable dashboard UI prompts for analytics, admin panels, KPI cards, charts, tables, and responsive data-heavy interfaces.",
    siteName: "StyleKit",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard Prompts | StyleKit",
    description:
      "Copyable dashboard UI prompts for analytics, admin panels, KPI cards, charts, tables, and responsive data-heavy interfaces.",
  },
};

export default function DashboardPromptsPage() {
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
        item: `${BASE_URL}/dashboard-prompts`,
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
            description="Use these examples to anchor your dashboard prompt in real KPI cards, charts, tables, and filter layouts instead of vague dashboard language."
            templates={dashboardTemplates}
          />
        </PromptTopicContent>
      </main>
      <Footer />
    </div>
  );
}
