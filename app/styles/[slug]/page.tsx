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
import { generateStyleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getSiteBaseUrl } from "@/lib/site-url";
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

  const BASE_URL = getSiteBaseUrl();
  const description = `${style.description} Includes design tokens, component recipes, and AI prompt guidance for consistent UI implementation.`;

  return {
    title: `${style.name} (${style.nameEn})`,
    description,
    keywords: style.keywords,
    openGraph: {
      title: `${style.name} (${style.nameEn}) — StyleKit`,
      description,
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
  const BASE_URL = getSiteBaseUrl();

  const jsonLd = generateStyleJsonLd({
    slug,
    nameEn: style.nameEn,
    description: style.description,
    keywords: style.keywords,
    category: style.category,
  });

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Styles", url: `${BASE_URL}/styles` },
    { name: style.nameEn, url: `${BASE_URL}/styles/${slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
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
          />
        </main>
      </DisableAutoScroll>

      <Footer />
    </div>
  );
}
