import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StyleCard } from "@/components/home/style-card";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { getAvatarImageSrc } from "@/lib/avatar";
import {
  getContributorBySeqId,
  getFollowState,
} from "@/lib/community/contributor";
import { listCommunityStylesByUser } from "@/lib/styles/community-runtime";
import { getServerUser } from "@/lib/auth/supabase-server";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { FollowButton } from "./_follow-button";

// Contributor standing changes as work is submitted and promoted, so the page
// resolves per request rather than being frozen at build time.
export const dynamic = "force-dynamic";

const COPY = {
  en: {
    home: "Home",
    community: "Community",
    published: "Published",
    promoted: "Promoted to curated",
    styles: "Styles",
    empty: "No published styles yet.",
    memberNo: "Member",
    profileDescription: (name: string, count: number) =>
      `${name} is a StyleKit Community contributor with ${count} publicly published design ${count === 1 ? "style" : "styles"}.`,
    titleSuffix: "Community Contributor",
    keywords: ["community contributor", "UI design styles", "StyleKit"],
  },
  zh: {
    home: "首页",
    community: "社区",
    published: "已发布",
    promoted: "晋升精选库",
    styles: "作品",
    empty: "还没有已发布的风格。",
    memberNo: "编号",
    profileDescription: (name: string, count: number) =>
      `${name} 是 StyleKit 社区贡献者，已公开发布 ${count} 个设计风格作品。`,
    titleSuffix: "社区贡献者",
    keywords: ["社区贡献者", "UI 设计风格", "StyleKit"],
  },
} as const;

type PageLocale = keyof typeof COPY;

function parseSeqId(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function getPageLocale(locale: string): PageLocale {
  return locale === "zh" ? "zh" : "en";
}

function getAbsoluteImageUrl(src: string | null, baseUrl: string): string | null {
  if (!src) return null;

  try {
    const url = new URL(src, baseUrl);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seqId: string }>;
}): Promise<Metadata> {
  const { seqId } = await params;
  const parsed = parseSeqId(seqId);
  if (!parsed) {
    return {
      title: "Contributor Not Found",
      robots: { index: false, follow: true },
    };
  }

  const contributor = await getContributorBySeqId(parsed);
  if (!contributor) {
    return {
      title: "Contributor Not Found",
      robots: { index: false, follow: true },
    };
  }

  const styles = await listCommunityStylesByUser(contributor.userId);
  const { locale, canonicalUrl, languageAlternates, openGraphLocale, baseUrl } =
    await getRequestLocaleContext();
  const pageLocale = getPageLocale(locale);
  const t = COPY[pageLocale];
  const title = `${contributor.displayName} — ${t.titleSuffix}`;
  const description = t.profileDescription(contributor.displayName, styles.length);
  const avatar = getAbsoluteImageUrl(
    getAvatarImageSrc(contributor.avatarUrl),
    baseUrl
  );

  return {
    title,
    description,
    keywords: [...t.keywords],
    // An empty profile remains reachable for an existing member, but does not
    // become a thin search result until it has public work to substantiate it.
    robots: { index: styles.length > 0, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title: `${title} | StyleKit`,
      description,
      url: canonicalUrl,
      siteName: "StyleKit",
      type: "profile",
      locale: openGraphLocale,
      ...(avatar ? { images: [{ url: avatar, alt: contributor.displayName }] } : {}),
    },
    twitter: {
      card: avatar ? "summary_large_image" : "summary",
      title: `${title} | StyleKit`,
      description,
      ...(avatar ? { images: [avatar] } : {}),
    },
  };
}

export default async function ContributorPage({
  params,
}: {
  params: Promise<{ seqId: string }>;
}) {
  const { seqId } = await params;
  const parsed = parseSeqId(seqId);
  if (!parsed) {
    notFound();
  }

  const { locale, canonicalUrl, baseUrl } = await getRequestLocaleContext();
  const pageLocale = getPageLocale(locale);
  const t = COPY[pageLocale];
  const contributor = await getContributorBySeqId(parsed);
  if (!contributor || !contributor.seqId) {
    notFound();
  }

  const styles = await listCommunityStylesByUser(contributor.userId);
  const viewer = await getServerUser().catch(() => null);
  const followState = await getFollowState(
    contributor.userId,
    viewer?.id ?? null
  ).catch(() => ({ followers: 0, following: false }));
  const avatar = getAvatarImageSrc(contributor.avatarUrl);
  const socialAvatar = getAbsoluteImageUrl(avatar, baseUrl);
  const tierLabel =
    pageLocale === "zh" ? contributor.tier.labelZh : contributor.tier.labelEn;
  const profileDescription = t.profileDescription(
    contributor.displayName,
    styles.length
  );
  const language = pageLocale === "zh" ? "zh-CN" : "en";
  const personId = `${canonicalUrl}#person`;
  const localizedPath = (path: string) =>
    `${baseUrl}${getAlternateLocalePath(path, pageLocale)}`;
  const publishedStyles = styles.map((style) => ({
    name: pageLocale === "zh" ? style.name : style.nameEn || style.name,
    description:
      pageLocale === "zh"
        ? style.description
        : style.descriptionEn || style.description,
    url: localizedPath(`/community/${style.slug}`),
  }));

  // Do not emit a profile graph for an empty/noindex page. For public profiles,
  // every work and count below comes from the same server-resolved data shown
  // in the page, keeping the graph aligned with the rendered profile.
  const profileJsonLd =
    styles.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${canonicalUrl}#profile-page`,
          name: contributor.displayName,
          description: profileDescription,
          url: canonicalUrl,
          inLanguage: language,
          mainEntity: {
            "@type": "Person",
            "@id": personId,
            name: contributor.displayName,
            url: canonicalUrl,
            ...(socialAvatar ? { image: socialAvatar } : {}),
            interactionStatistic: {
              "@type": "InteractionCounter",
              interactionType: { "@type": "FollowAction" },
              userInteractionCount: followState.followers,
            },
          },
          hasPart: publishedStyles.map((style) => ({
            "@type": "CreativeWork",
            name: style.name,
            description: style.description,
            url: style.url,
            author: { "@id": personId },
          })),
        }
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      {profileJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileJsonLd) }}
        />
      ) : null}
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-10">
          <Breadcrumb
            items={[
              { label: t.home, href: "/" },
              { label: t.community, href: "/community" },
              { label: contributor.displayName },
            ]}
          />

          <header className="mb-10 mt-6 flex flex-wrap items-start gap-6">
            {avatar ? (
              <Image
                src={avatar}
                alt=""
                width={72}
                height={72}
                className="h-18 w-18 shrink-0 rounded-full"
                unoptimized
              />
            ) : (
              <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-muted/20 text-xl text-muted-foreground">
                {contributor.displayName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h1 className="font-serif text-3xl leading-tight sm:text-4xl">
                {contributor.displayName}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {profileDescription}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-foreground px-3 py-0.5 font-mono text-[11px] uppercase tracking-wider">
                  {tierLabel}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {t.memberNo} #{contributor.seqId}
                </span>
              </div>

              <div className="mt-4">
                <FollowButton
                  key={`${contributor.seqId}:${followState.followers}:${followState.following ? "following" : "not-following"}`}
                  seqId={contributor.seqId}
                  locale={pageLocale}
                  isSelf={viewer?.id === contributor.userId}
                  initialFollowers={followState.followers}
                  initialFollowing={followState.following}
                />
              </div>

              <dl className="mt-5 flex flex-wrap gap-8">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {t.published}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">
                    {styles.length}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {t.promoted}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">
                    {contributor.stats.promoted}
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {t.styles}
          </h2>

          {styles.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              {t.empty}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 lg:grid-cols-3">
              {styles.map((style) => (
                <StyleCard
                  key={style.slug}
                  style={style}
                  variant="compact"
                  basePath="/community"
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
