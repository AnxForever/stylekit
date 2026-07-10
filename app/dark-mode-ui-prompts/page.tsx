import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { darkModeTemplates } from "@/lib/seo/prompt-template-previews";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { generatePromptPageSchemas } from "@/lib/seo/prompt-schema";

const TOPIC_SLUG = "dark-mode";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Dark Mode UI Prompts",
  description:
    "Copyable dark mode UI prompts for dashboards, SaaS apps, media interfaces, and dark-first design systems with strong contrast and readable surfaces.",
  keywords: [
    "dark mode UI prompts",
    "dark theme design prompt",
    "dark mode dashboard prompt",
    "dark UI design system",
    "dark mode Tailwind prompt",
  ],
  openGraph: {
    title: "Dark Mode UI Prompts | StyleKit",
    description:
      "Copyable dark mode UI prompts for dashboards, SaaS apps, media interfaces, and dark-first design systems with strong contrast and readable surfaces.",
    siteName: "StyleKit",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dark Mode UI Prompts | StyleKit",
    description:
      "Copyable dark mode UI prompts for dashboards, SaaS apps, media interfaces, and dark-first design systems with strong contrast and readable surfaces.",
  },
};

export default async function DarkModeUiPromptsPage() {
  const topic = getTopicBySlug(TOPIC_SLUG);
  if (!topic) notFound();
  const { locale } = await getRequestLocaleContext();

  const allStyles = getAllStylesMeta();
  const relatedStyles = topic.relatedStyleSlugs
    .map((slug) => allStyles.find((style) => style.slug === slug))
    .filter(Boolean);

  const { faq: faqSchema, breadcrumb: breadcrumbSchema } =
    generatePromptPageSchemas(topic, locale, "/dark-mode-ui-prompts");

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
            description="Use these templates to reverse-engineer dark UI hierarchy: base surfaces, elevated panels, borders, readable contrast, and accent rhythm."
            templates={darkModeTemplates}
          />
        </PromptTopicContent>
      </main>
      <Footer />
    </div>
  );
}
