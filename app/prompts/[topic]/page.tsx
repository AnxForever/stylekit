import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { promptTopics, getTopicBySlug } from "@/lib/prompts";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { PromptTopicContent } from "./_content";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";

// ISR: revalidate daily
export const revalidate = 86400;

export function generateStaticParams() {
  return promptTopics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Topic Not Found" };

  const url = `${BASE_URL}/prompts/${slug}`;

  return {
    title: topic.titleEn,
    description: topic.descriptionEn,
    keywords: topic.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${topic.titleEn} | StyleKit`,
      description: topic.descriptionEn,
      url,
      siteName: "StyleKit",
      type: "article",
      images: [
        {
          url: `${BASE_URL}/prompts/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${topic.titleEn} prompts preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.titleEn} | StyleKit`,
      description: topic.descriptionEn,
      images: [`${BASE_URL}/prompts/${slug}/opengraph-image`],
    },
  };
}

export default async function PromptTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  // Resolve related styles metadata
  const allStyles = getAllStylesMeta();
  const relatedStyles = topic.relatedStyleSlugs
    .map((s) => allStyles.find((st) => st.slug === s))
    .filter(Boolean);

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.faq.map((f) => ({
      "@type": "Question",
      name: f.questionEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answerEn,
      },
    })),
  };

  // Breadcrumb Schema
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
        item: `${BASE_URL}/prompts/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "UI Prompts", href: "/ui-prompts" },
            { label: topic.titleEn },
          ]}
        />
      </div>
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(breadcrumbSchema),
          }}
        />
        <PromptTopicContent topic={topic} relatedStyles={relatedStyles} />
      </main>
      <Footer />
    </div>
  );
}
