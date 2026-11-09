import { brandPreviewUrl } from "@/lib/brand/assets";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { getStyleBySlug, styles } from "@/lib/styles";
import { getDesignSpec } from "@/lib/design-spec/registry";
import { renderDesignMd } from "@/lib/design-spec";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateStyleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildStyleFaq, generateFaqJsonLd } from "@/lib/seo/style-faq";
import { getStyleSeoOverride } from "@/lib/seo/style-seo-overrides";
import { getSiteBaseUrl } from "@/lib/site-url";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { localizedString, localizedList } from "@/lib/styles/locale-content";
import type { Locale } from "@/lib/i18n/translations";
import { StyleDetailContent } from "./_content";
import { StyleFaqSection } from "./_faq-section";

// 生成静态参数
export function generateStaticParams() {
  return styles.map((style) => ({
    slug: style.slug,
  }));
}

// ISR: revalidate every 24 hours
export const revalidate = 86400;
export const dynamicParams = false;

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
}: {
  params: Promise<{ slug: string; locale?: Locale }>;
}) {
  const { slug, locale = "en" } = await params;
  const delivery = await resolveStyleDelivery(slug);
  if (!delivery) {
    return { title: "Style Not Found" };
  }
  const style = delivery.style;

  const BASE_URL = getSiteBaseUrl();
  const primaryStyleName = locale === "zh" ? style.name : style.nameEn || style.name;
  const secondaryStyleName = locale === "zh" ? style.nameEn : style.name;
  const intentSuffix =
    style.styleType === "layout"
      ? "Layout — AI Prompts & Tokens"
      : "UI Style — AI Prompts & Tokens";
  const title =
    locale === "zh"
      ? secondaryStyleName && secondaryStyleName !== primaryStyleName
        ? `${primaryStyleName} (${secondaryStyleName})`
        : primaryStyleName
      : `${primaryStyleName} ${intentSuffix}`;
  const localizedDescription = localizedString(locale, style.description, style.descriptionEn);
  const description =
    locale === "zh"
      ? `${localizedDescription} 包含设计 tokens、组件配方和 AI 提示词指南，便于稳定落地同一套 UI 风格。`
      : `${localizedDescription} Includes design tokens, component recipes, and AI prompt guidance for consistent UI implementation.`;
  const keywords = localizedList(locale, style.keywords, style.keywordsEn);
  const override = getStyleSeoOverride(slug, locale);
  const finalTitle = override.title ?? title;
  const finalDescription = override.description ?? description;
  const metaDescription = truncateForMeta(finalDescription);

  return {
    title: finalTitle,
    description: metaDescription,
    keywords,
    openGraph: {
      title: `${finalTitle} — StyleKit`,
      description: finalDescription,
      type: "article",
      images: [
        {
          url: brandPreviewUrl(`${BASE_URL}/styles/${slug}/opengraph-image`),
          width: 1200,
          height: 630,
          alt: `${style.nameEn} design style preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${finalTitle} — StyleKit`,
      description: finalDescription,
      images: [brandPreviewUrl(`${BASE_URL}/styles/${slug}/opengraph-image`)],
    },
  };
}

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale?: Locale }>;
}) {
  const { slug, locale = "en" } = await params;
  const delivery = await resolveStyleDelivery(slug);

  if (!delivery) {
    notFound();
  }
  const { style, capabilities } = delivery;

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

  // Pre-compute related styles for the sideways-link block. Google knows
  // roughly half of the localized style pages but never crawls them, so each
  // detail page links to its nearest siblings. A shared tag counts for more
  // than a shared category.
  const ownTags = new Set(style.tags ?? []);
  const rankedSiblings = styles
    .filter((candidate) => candidate.slug !== style.slug)
    .map((candidate) => ({
      style: candidate,
      score:
        (candidate.category === style.category ? 2 : 0) +
        (candidate.tags ?? []).filter((tag) => ownTags.has(tag)).length * 3,
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.style.slug.localeCompare(b.style.slug)
    );
  const relatedStyles = rankedSiblings.slice(0, 6).map(({ style: sibling }) => ({
    slug: sibling.slug,
    name: sibling.name,
    nameEn: sibling.nameEn,
  }));

  // The nearest sibling, spelled out. A card grid shows that two styles exist
  // side by side; a reader deciding between them needs the difference stated,
  // and that stated difference is what a quote can carry.
  const nearestSibling = rankedSiblings[0]?.style;
  const comparison = nearestSibling
    ? {
        slug: nearestSibling.slug,
        name: nearestSibling.name,
        nameEn: nearestSibling.nameEn,
        colors: nearestSibling.colors,
        keywords: localizedList(
          locale,
          nearestSibling.keywords,
          nearestSibling.keywordsEn
        ),
        tags: nearestSibling.tags ?? [],
      }
    : null;

  // Render the complete document once for preview, copy and download, including
  // before hydration and for crawlers.
  const designSpec = getDesignSpec(style.slug);
  const designMarkdown = designSpec
    ? renderDesignMd(designSpec, { locale })
    : "";

  const version = capabilities.versioning?.current;
  const changelog = capabilities.versioning?.versions ?? [];
  const BASE_URL = getSiteBaseUrl();

  // Pre-compute localized content for server-side rendering (SEO)
  const ssrDescription = localizedString(locale, style.description, style.descriptionEn);
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

  const faqs = buildStyleFaq(style, locale);
  const faqSchema = generateFaqJsonLd(faqs, canonicalUrl);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
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
            compatibleStyles={compatibleStyles}
            compatibleLayouts={compatibleLayouts}
            relatedStyles={relatedStyles}
            comparison={comparison}
            designMarkdown={designMarkdown}
            hasDesignSpec={Boolean(designSpec)}
            faqSection={
              <StyleFaqSection
                faqs={faqs}
                styleName={localizedName}
                locale={locale}
              />
            }
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
