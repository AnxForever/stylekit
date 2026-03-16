import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { getStyleBySlug, styles } from "@/lib/styles";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { scoreStyle } from "@/lib/accessibility";
import { getCurrentVersion, getChangelog } from "@/lib/versioning";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { listCommunityFeed, type CommunityFeedItem } from "@/lib/community/feed";
import { StyleDetailContent } from "./_content";

// 生成静态参数
export function generateStaticParams() {
  return styles.map((style) => ({
    slug: style.slug,
  }));
}

// ISR: revalidate every 24 hours
export const revalidate = 86400;

// 动态 metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = await resolveStyleBySlug(slug);
  if (!resolved) {
    return { title: "Style Not Found" };
  }
  const style = resolved.style;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";
  const url = `${BASE_URL}/styles/${slug}`;
  const description = `${style.description} Includes design tokens, component recipes, and AI prompt guidance for consistent UI implementation.`;

  return {
    title: `${style.name} (${style.nameEn})`,
    description,
    keywords: style.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${style.name} (${style.nameEn}) — StyleKit`,
      description,
      url,
      type: "article",
      images: [
        {
          url: `${BASE_URL}/styles/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${style.nameEn} design style preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${style.name} (${style.nameEn}) — StyleKit`,
      description,
      images: [`${BASE_URL}/styles/${slug}/opengraph-image`],
    },
  };
}

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolveStyleBySlug(slug);

  if (!resolved) {
    notFound();
  }
  const { style } = resolved;

  // When built-in style exists, also fetch community versions for the same slug
  const communityVersions: CommunityFeedItem[] =
    resolved.source === "static"
      ? (await listCommunityFeed({ slug, limit: 48, offset: 0 })).items
      : [];

  // Pre-compute compatible styles for layout patterns
  const compatibleStyles =
    style.styleType === "layout" && style.compatibleWith
      ? style.compatibleWith
          .map((s) => getStyleBySlug(s))
          .filter((s): s is NonNullable<typeof s> => s !== undefined)
      : [];

  // Pre-compute compatible layouts for visual styles
  const compatibleLayouts =
    style.styleType === "visual"
      ? styles.filter(
          (s) => s.styleType === "layout" && s.compatibleWith?.includes(style.slug)
        )
      : [];

  // Pre-compute enhanced rules
  const enhancedRules = resolved.tokens
    ? generateEnhancedAIRules({
        style,
        tokens: resolved.tokens,
        format: "full",
      })
    : null;

  // Pre-compute accessibility score
  const accessibilityScore =
    resolved.source === "static" ? scoreStyle(slug) : null;

  // Pre-compute version info
  const version =
    resolved.source === "static" ? getCurrentVersion(slug) : undefined;
  const changelog =
    resolved.source === "static" ? getChangelog(slug) : [];
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${style.nameEn} - StyleKit`,
    description: style.description,
    url: `${BASE_URL}/styles/${slug}`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "StyleKit",
    },
    keywords: style.keywords.join(", "),
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${style.nameEn} design style?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: style.description,
        },
      },
      {
        "@type": "Question",
        name: `How to implement ${style.nameEn} with Tailwind CSS?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `StyleKit provides complete design tokens for ${style.nameEn} (colors, spacing, border-radius, shadows, and more) that you can export directly into your Tailwind configuration. It also offers component-level code snippets and AI Rules to quickly implement this style in your project.`,
        },
      },
      {
        "@type": "Question",
        name: `Which AI tools support ${style.nameEn} prompts?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `AI coding tools like v0 (Vercel), Cursor, and Claude can all use ${style.nameEn} style prompts. StyleKit provides pre-formatted AI Rules that can be exported as Cursor Rules, Claude Code configs, and other formats.`,
        },
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Styles", item: `${BASE_URL}/styles` },
      { "@type": "ListItem", position: 3, name: style.nameEn, item: `${BASE_URL}/styles/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Styles", href: "/styles" },
            { label: style.nameEn },
          ]}
        />
      </div>

      <DisableAutoScroll>
        <main className="flex-1">
          <StyleDetailContent
            style={style}
            styleSource={resolved.source}
            compatibleStyles={compatibleStyles}
            compatibleLayouts={compatibleLayouts}
            enhancedRules={enhancedRules}
            accessibilityScore={accessibilityScore}
            version={version}
            changelog={changelog}
            communityVersions={communityVersions}
          />
        </main>
      </DisableAutoScroll>

      <Footer />
    </div>
  );
}
