import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { getStyleBySlug, styles } from "@/lib/styles";
import { getStyleTokens, hasStyleTokens } from "@/lib/styles/tokens-registry";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { scoreStyle } from "@/lib/accessibility";
import { getCurrentVersion, getChangelog } from "@/lib/versioning";
import { serializeJsonLd } from "@/lib/security/json-ld";
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
  const style = getStyleBySlug(slug);
  if (!style) {
    return { title: "Style Not Found — StyleKit" };
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";
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
  const style = getStyleBySlug(slug);

  if (!style) {
    notFound();
  }

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
  const enhancedRules = hasStyleTokens(slug)
    ? generateEnhancedAIRules({
        style,
        tokens: getStyleTokens(slug)!,
        format: "full",
      })
    : null;

  // Pre-compute accessibility score
  const accessibilityScore = scoreStyle(slug);

  // Pre-compute version info
  const version = getCurrentVersion(slug);
  const changelog = getChangelog(slug);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";

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
