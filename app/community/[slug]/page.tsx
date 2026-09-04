import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import { getCommunityAttribution } from "@/lib/styles/community-runtime";
import { getSeqIdForUser } from "@/lib/community/contributor";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getRequestLocaleContext } from "@/lib/i18n/request";
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

  const { style } = delivery;
  return {
    title: `${style.nameEn || style.name} — Community Style`,
    description: style.descriptionEn || style.description,
    // Community styles stay out of the index until a maintainer promotes them
    // into the curated library.
    robots: { index: false, follow: true },
  };
}

export default async function CommunityStylePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { locale } = await getRequestLocaleContext();
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
  const attribution = await getCommunityAttribution(slug);
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

  const localizedName = locale === "zh" ? style.name : style.nameEn || style.name;

  return (
    <div className="min-h-screen flex flex-col">
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
