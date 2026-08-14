import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { tailwindUiTemplates } from "@/lib/seo/prompt-template-previews";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { generatePromptPageSchemas } from "@/lib/seo/prompt-schema";

const TOPIC_SLUG = "tailwind-ui";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Tailwind CSS UI Prompts for React and Next.js",
  description:
    "Copy-ready Tailwind CSS UI prompts for React, Next.js, shadcn/ui, dashboards, forms, navigation, responsive layouts, and accessible component generation.",
  keywords: [
    "Tailwind UI prompts",
    "Tailwind CSS prompt",
    "shadcn ui prompt",
    "Next.js Tailwind prompt",
    "React Tailwind UI prompt",
  ],
  openGraph: {
    title: "Tailwind CSS UI Prompts for React and Next.js | StyleKit",
    description:
      "Copy-ready Tailwind CSS UI prompts for React, Next.js, shadcn/ui, dashboards, forms, navigation, and responsive components.",
    siteName: "StyleKit",
    images: [{ url: "/social-preview-home-v2.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailwind CSS UI Prompts for React and Next.js | StyleKit",
    description:
      "Copy-ready Tailwind CSS UI prompts for React, Next.js, shadcn/ui, dashboards, forms, navigation, and responsive components.",
  },
};

export default async function TailwindUiPromptsPage() {
  const topic = getTopicBySlug(TOPIC_SLUG);
  if (!topic) notFound();
  const { locale } = await getRequestLocaleContext();

  const allStyles = getAllStylesMeta();
  const relatedStyles = topic.relatedStyleSlugs
    .map((slug) => allStyles.find((style) => style.slug === slug))
    .filter(Boolean);

  const { faq: faqSchema, breadcrumb: breadcrumbSchema } =
    generatePromptPageSchemas(topic, locale, "/tailwind-ui-prompts");

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
            description="Use these templates as Tailwind CSS prompt references by naming components, layout classes, breakpoints, states, and design tokens together."
            templates={tailwindUiTemplates}
          />
        </PromptTopicContent>
      </main>
      <Footer />
    </div>
  );
}
