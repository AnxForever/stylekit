import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StyleCard } from "@/components/home/style-card";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getAvatarImageSrc } from "@/lib/avatar";
import { getContributorBySeqId } from "@/lib/community/contributor";
import { listCommunityStylesByUser } from "@/lib/styles/community-runtime";
import { getServerUser } from "@/lib/auth/supabase-server";
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
  },
  zh: {
    home: "首页",
    community: "社区",
    published: "已发布",
    promoted: "晋升精选库",
    styles: "作品",
    empty: "还没有已发布的风格。",
    memberNo: "编号",
  },
} as const;

function parseSeqId(value: string): number | null {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seqId: string }>;
}): Promise<Metadata> {
  const { seqId } = await params;
  const parsed = parseSeqId(seqId);
  const contributor = parsed ? await getContributorBySeqId(parsed) : null;

  return {
    title: contributor
      ? `${contributor.displayName} — Community Contributor`
      : "Contributor Not Found",
    // Contributor pages follow the community catalog: out of the index until
    // the work behind them is promoted.
    robots: { index: false, follow: true },
  };
}

export default async function ContributorPage({
  params,
}: {
  params: Promise<{ seqId: string }>;
}) {
  const { seqId } = await params;
  const { locale } = await getRequestLocaleContext();
  const t = COPY[locale === "zh" ? "zh" : "en"];

  const parsed = parseSeqId(seqId);
  const contributor = parsed ? await getContributorBySeqId(parsed) : null;
  if (!contributor) {
    notFound();
  }

  const styles = await listCommunityStylesByUser(contributor.userId);
  const viewer = await getServerUser().catch(() => null);
  const avatar = getAvatarImageSrc(contributor.avatarUrl);
  const tierLabel =
    locale === "zh" ? contributor.tier.labelZh : contributor.tier.labelEn;

  return (
    <div className="min-h-screen flex flex-col">
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
                  seqId={contributor.seqId ?? 0}
                  locale={locale === "zh" ? "zh" : "en"}
                  isSelf={viewer?.id === contributor.userId}
                />
              </div>

              <dl className="mt-5 flex flex-wrap gap-8">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {t.published}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">
                    {contributor.stats.published}
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
