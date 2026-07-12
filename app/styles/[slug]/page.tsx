import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { getFrontendReadiness, getStyleBySlug, styles } from "@/lib/styles";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { scoreStyle } from "@/lib/accessibility";
import { getCurrentVersion, getChangelog } from "@/lib/versioning";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateStyleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getSiteBaseUrl } from "@/lib/site-url";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { localizedString, localizedList } from "@/lib/styles/locale-content";
import type { Locale } from "@/lib/i18n/translations";
import { StyleDetailContent } from "./_content";

// 生成静态参数
export function generateStaticParams() {
  return styles.map((style) => ({
    slug: style.slug,
  }));
}

// ISR: revalidate every 24 hours
export const revalidate = 86400;

// Google truncates meta descriptions around 155-160 chars; keep the SERP snippet
// tight while the full description still renders in the page body.
const META_DESCRIPTION_LIMIT = 155;
function truncateForMeta(text: string, limit = META_DESCRIPTION_LIMIT): string {
  if (text.length <= limit) return text;
  const slice = text.slice(0, limit - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const clipped = lastSpace > 60 ? slice.slice(0, lastSpace) : slice;
  return `${clipped.replace(/[\s,;.]+$/, "")}…`;
}

// 动态 metadata
export async function generateMetadata({
  params,
  locale = "en",
}: {
  params: Promise<{ slug: string }>;
  locale?: Locale;
}) {
  const { slug } = await params;
  const resolved = await resolveStyleBySlug(slug);
  if (!resolved) {
    return { title: "Style Not Found" };
  }
  const style = resolved.style;

  const BASE_URL = getSiteBaseUrl();
  const primaryStyleName = locale === "zh" ? style.name : style.nameEn || style.name;
  const secondaryStyleName = locale === "zh" ? style.nameEn : style.name;
  const title =
    secondaryStyleName && secondaryStyleName !== primaryStyleName
      ? `${primaryStyleName} (${secondaryStyleName})`
      : primaryStyleName;
  const localizedDescription = localizedString(locale, style.description, style.descriptionEn);
  const description =
    locale === "zh"
      ? `${localizedDescription} 包含设计 tokens、组件配方和 AI 提示词指南，便于稳定落地同一套 UI 风格。`
      : `${localizedDescription} Includes design tokens, component recipes, and AI prompt guidance for consistent UI implementation.`;
  const keywords = localizedList(locale, style.keywords, style.keywordsEn);
  const metaDescription = truncateForMeta(description);

  return {
    title,
    description: metaDescription,
    keywords,
    openGraph: {
      title: `${title} — StyleKit`,
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
      title: `${title} — StyleKit`,
      description,
      images: [`${BASE_URL}/styles/${slug}/opengraph-image`],
    },
  };
}

export default async function StyleDetailPage({
  params,
  locale = "en",
}: {
  params: Promise<{ slug: string }>;
  locale?: Locale;
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
          .map(({ slug, name, nameEn }) => ({ slug, name, nameEn }))
      : [];

  // Pre-compute compatible layouts for visual styles
  const compatibleLayouts =
    style.styleType === "visual"
      ? styles.filter(
          (s) => s.styleType === "layout" && s.compatibleWith?.includes(style.slug)
        ).map(({ slug, name, nameEn }) => ({ slug, name, nameEn }))
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
  const readiness = getFrontendReadiness(style);
  const BASE_URL = getSiteBaseUrl();

  // Pre-compute localized content for server-side rendering (SEO)
  const ssrDescription = localizedString(locale, style.description, style.descriptionEn);
  const ssrPhilosophy = localizedString(locale, style.philosophy, style.philosophyEn);
  const ssrDos = localizedList(locale, style.doList, style.doListEn);
  const ssrDonts = localizedList(locale, style.dontList, style.dontListEn);
  const localizedName = locale === "zh" ? style.name : style.nameEn || style.name;
  const localizedKeywords = localizedList(locale, style.keywords, style.keywordsEn);
  const canonicalUrl = `${BASE_URL}${getAlternateLocalePath(`/styles/${slug}`, locale)}`;
  const localizedHomeUrl = `${BASE_URL}${getAlternateLocalePath("/", locale)}`;
  const localizedStylesUrl = `${BASE_URL}${getAlternateLocalePath("/styles", locale)}`;

  const jsonLd = generateStyleJsonLd({
    name: localizedName,
    description: ssrDescription,
    keywords: localizedKeywords,
    category: style.category,
    url: canonicalUrl,
    language: locale === "zh" ? "zh-CN" : "en",
  });

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: locale === "zh" ? "首页" : "Home", url: localizedHomeUrl },
    { name: locale === "zh" ? "风格" : "Styles", url: localizedStylesUrl },
    { name: localizedName, url: canonicalUrl },
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
            readiness={readiness}
            version={version}
            changelog={changelog}
            ssrLocale={locale}
          />
        </main>
      </DisableAutoScroll>

      <Footer />
    </div>
  );
}
