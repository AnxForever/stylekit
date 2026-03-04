import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
    return { title: "Style Not Found — StyleKit" };
  }
  const style = resolved.style;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";
  const url = `${BASE_URL}/styles/${slug}`;

  return {
    title: `${style.name} (${style.nameEn})`,
    description: style.description,
    keywords: style.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${style.name} (${style.nameEn}) — StyleKit`,
      description: style.description,
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
      description: style.description,
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

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Header />

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
