import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptClusterLinks } from "@/components/seo/prompt-cluster-links";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { dashboardTemplates } from "@/lib/seo/prompt-template-previews";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { generatePromptPageSchemas } from "@/lib/seo/prompt-schema";

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
    images: [{ url: "/social-preview-home-v2.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard Prompts | StyleKit",
    description:
      "Copyable dashboard UI prompts for analytics, admin panels, KPI cards, charts, tables, and responsive data-heavy interfaces.",
  },
};

export default async function DashboardPromptsPage() {
  const topic = getTopicBySlug(TOPIC_SLUG);
  if (!topic) notFound();
  const { locale } = await getRequestLocaleContext();

  const allStyles = getAllStylesMeta();
  const relatedStyles = topic.relatedStyleSlugs
    .map((slug) => allStyles.find((style) => style.slug === slug))
    .filter(Boolean);

  const { faq: faqSchema, breadcrumb: breadcrumbSchema } =
    generatePromptPageSchemas(topic, locale, "/dashboard-prompts");

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
            description="Use these examples to anchor your dashboard prompt in real KPI cards, charts, tables, and filter layouts instead of vague dashboard language."
            templates={dashboardTemplates}
          />
        </PromptTopicContent>
        <PromptClusterLinks current="/dashboard-prompts" locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
