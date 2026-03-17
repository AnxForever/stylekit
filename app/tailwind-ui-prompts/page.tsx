import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { tailwindUiTemplates } from "@/lib/seo/prompt-template-previews";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";
const TOPIC_SLUG = "tailwind-ui";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Tailwind UI Prompts",
  description:
    "Copyable Tailwind UI prompts for React, Next.js, shadcn/ui, dashboards, forms, navigation, and utility-first component generation.",
  keywords: [
    "Tailwind UI prompts",
    "Tailwind CSS prompt",
    "shadcn ui prompt",
    "Next.js Tailwind prompt",
    "React Tailwind UI prompt",
  ],
  alternates: {
    canonical: `${BASE_URL}/tailwind-ui-prompts`,
  },
  openGraph: {
    title: "Tailwind UI Prompts | StyleKit",
    description:
      "Copyable Tailwind UI prompts for React, Next.js, shadcn/ui, dashboards, forms, navigation, and utility-first component generation.",
    url: `${BASE_URL}/tailwind-ui-prompts`,
    siteName: "StyleKit",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailwind UI Prompts | StyleKit",
    description:
      "Copyable Tailwind UI prompts for React, Next.js, shadcn/ui, dashboards, forms, navigation, and utility-first component generation.",
  },
};

export default function TailwindUiPromptsPage() {
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
        item: `${BASE_URL}/tailwind-ui-prompts`,
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
            description="把这些模板当作 Tailwind prompt 的结构提示：组件名、布局类、断点、状态和 design token 一起说，生成结果通常会更稳定。"
            templates={tailwindUiTemplates}
          />
        </PromptTopicContent>
      </main>
      <Footer />
    </div>
  );
}
