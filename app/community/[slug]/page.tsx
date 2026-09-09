import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import {
  getCommunityAttribution,
  isPromotedCommunityStyle,
  listCommunityStylesMeta,
} from "@/lib/styles/community-runtime";
import { getSeqIdForUser } from "@/lib/community/contributor";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { localizedList, localizedString } from "@/lib/styles/locale-content";
import { serializeJsonLd } from "@/lib/security/json-ld";
import {
  generateBreadcrumbJsonLd,
  generateCommunityStyleJsonLd,
} from "@/lib/seo/json-ld";
import { StyleDetailContent } from "@/app/styles/[slug]/_content";
import { StyleReadinessSection } from "@/app/styles/[slug]/_readiness-section";
import { ReportButton } from "./_report-button";

// Community styles come from approved submissions, so the route resolves at
// request time. Curated slugs are redirected to /styles rather than rendered
// twice, which keeps one canonical URL per style.
export const dynamic = "force-dynamic";

const COPY = {
  en: { home: "Home", community: "Community", by: "Submitted by" },
  zh: { home: "首页", community: "社区", by: "投稿者" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const delivery = await resolveStyleDelivery(slug);
  if (!delivery || delivery.source !== "community") {
    return { title: "Style Not Found", robots: { index: false } };
  }

  const { locale, canonicalUrl, languageAlternates, openGraphLocale, baseUrl } =
    await getRequestLocaleContext();
  const { style } = delivery;
  // Promotion is the moment a maintainer vouches for the work, so it is also
  // the moment the page becomes worth indexing. Everything else in /community
  // stays out of search results.
  const promoted = await isPromotedCommunityStyle(style.slug);
  const localizedName = localizedString(locale, style.name, style.nameEn);
  const localizedDescription = localizedString(
    locale,
    style.description,
    style.descriptionEn
  );
  const title = promoted
    ? locale === "zh"
      ? `${localizedName} — 社区 UI 风格与 AI 提示词`
      : `${localizedName} — Community UI Style & AI Prompts`
    : locale === "zh"
      ? `${localizedName} — 社区风格`
      : `${localizedName} — Community Style`;
  const description = localizedDescription;
  const imageUrl = `${baseUrl}/styles/${style.slug}/opengraph-image`;
  const imageAlt =
    locale === "zh"
      ? `${localizedName} 社区设计风格预览`
      : `${localizedName} community design style preview`;

  return {
    title,
    description,
    keywords: [
      ...localizedList(locale, style.keywords, style.keywordsEn),
      ...style.tags,
      locale === "zh" ? "社区设计风格" : "community design style",
    ],
    robots: { index: promoted, follow: true },
    alternates: { canonical: canonicalUrl, languages: languageAlternates },
    openGraph: {
      title: `${title} — StyleKit`,
      description,
      url: canonicalUrl,
      siteName: "StyleKit",
      type: "article",
      locale: openGraphLocale,
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — StyleKit`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CommunityStylePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { locale, canonicalUrl, baseUrl } = await getRequestLocaleContext();
  const t = COPY[locale === "zh" ? "zh" : "en"];

  const delivery = await resolveStyleDelivery(slug);
  if (!delivery) {
    notFound();
  }

  // A curated style is not community content; send it to its canonical page.
  if (delivery.source !== "community") {
    redirect(`/styles/${slug}`);
  }

  const { style, capabilities } = delivery;
  const promoted = await isPromotedCommunityStyle(style.slug);
  const communityMeta = promoted
    ? (await listCommunityStylesMeta()).find((item) => item.slug === style.slug)
    : undefined;
  const attribution = await getCommunityAttribution(style.slug);
  // A byline links to the contributor page only when the account has a seq id;
  // submissions from before seq assignment stay plain text.
  const contributorSeqId = attribution?.userId
    ? await getSeqIdForUser(attribution.userId)
    : null;

  const enhancedRules = capabilities.tokens
    ? generateEnhancedAIRules({
        style,
        tokens: capabilities.tokens,
        format: "full",
        locale,
      })
    : null;

  const specTokens = capabilities.tokens
    ? {
        section: capabilities.tokens.spacing.section,
        container: capabilities.tokens.spacing.container,
        card: capabilities.tokens.spacing.card,
        gap: capabilities.tokens.spacing.gap.md,
        radius: capabilities.tokens.border.radius,
        transition: capabilities.tokens.interaction.transition,
        hover:
          capabilities.tokens.interaction.hoverTranslate ??
          capabilities.tokens.interaction.hoverScale ??
          capabilities.tokens.interaction.hoverOpacity ??
          undefined,
        active: capabilities.tokens.interaction.active ?? undefined,
        focus: capabilities.tokens.shadow.focus,
      }
    : undefined;

  const localizedName = localizedString(locale, style.name, style.nameEn);
  const localizedDescription = localizedString(
    locale,
    style.description,
    style.descriptionEn
  );
  const localizedKeywords = localizedList(locale, style.keywords, style.keywordsEn);
  const detailUrl = canonicalUrl;
  const language = locale === "zh" ? "zh-CN" : "en";
  const breadcrumbJsonLd = promoted
    ? generateBreadcrumbJsonLd([
        {
          name: t.home,
          url: `${baseUrl}${getAlternateLocalePath("/", locale)}`,
        },
        {
          name: t.community,
          url: `${baseUrl}${getAlternateLocalePath("/community", locale)}`,
        },
        { name: localizedName, url: detailUrl },
      ])
    : null;
  const communityJsonLd = promoted
    ? generateCommunityStyleJsonLd({
        name: localizedName,
        description: localizedDescription,
        keywords: [...localizedKeywords, ...style.tags],
        category: style.category,
        url: detailUrl,
        language,
        ...(attribution?.authorName
          ? {
              author: {
                name: attribution.authorName,
                ...(contributorSeqId
                  ? {
                      url: `${baseUrl}${getAlternateLocalePath(
                        `/community/u/${contributorSeqId}`,
                        locale
                      )}`,
                    }
                  : {}),
              },
            }
          : {}),
        ...(communityMeta?.publishedAt
          ? { datePublished: communityMeta.publishedAt }
          : {}),
        isPromoted: true,
      })
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      {communityJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(communityJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
        />
      ) : null}
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 md:px-12">
        <Breadcrumb
          items={[
            { label: t.home, href: "/" },
            { label: t.community, href: "/community" },
            { label: localizedName },
          ]}
        />
        {attribution?.authorName ? (
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.by}{" "}
            {contributorSeqId ? (
              <LocalizedLink
                href={`/community/u/${contributorSeqId}`}
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {attribution.authorName}
              </LocalizedLink>
            ) : (
              attribution.authorName
            )}
          </p>
        ) : null}
      </div>

      <DisableAutoScroll>
        <main className="flex-1">
          <StyleDetailContent
            style={style}
            hasIdeExports={capabilities.exports.ideConfigs}
            compatibleStyles={[]}
            compatibleLayouts={[]}
            enhancedRules={enhancedRules}
            specTokens={specTokens}
            accessibilityScore={capabilities.accessibility}
            readinessSection={
              <StyleReadinessSection
                readiness={capabilities.readiness}
                locale={locale}
              />
            }
            ssrLocale={locale}
          />
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 md:px-12">
            <ReportButton slug={slug} locale={locale === "zh" ? "zh" : "en"} />
          </div>
        </main>
      </DisableAutoScroll>

      <Footer />
    </div>
  );
}
