import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { StyleCard } from "@/components/home/style-card";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { listCommunityStylesMeta } from "@/lib/styles/community-runtime";

export const metadata: Metadata = {
  title: "Community Styles",
  description:
    "Browse design styles submitted by the StyleKit community — AI-ready prompts and design tokens contributed by developers.",
  robots: { index: false, follow: true },
};

// Community styles are DB-driven (approved submissions). Rendering must stay
// dynamic so a newly approved style appears without a rebuild.
export const dynamic = "force-dynamic";

const COPY = {
  en: {
    home: "Home",
    community: "Community",
    title: "Community Styles",
    intro:
      "Design styles submitted by the community. Approved styles show up here; the best get promoted into the curated library.",
    submit: "Submit a style",
    emptyTitle: "No community styles yet",
    emptyBody: "Be the first to contribute a style to the StyleKit community.",
    count: (n: number) => `${n} community ${n === 1 ? "style" : "styles"}`,
  },
  zh: {
    home: "首页",
    community: "社区",
    title: "社区风格库",
    intro:
      "由社区投稿的设计风格。通过审核的风格会出现在这里，其中最好的会被晋升进精选库。",
    submit: "投稿风格",
    emptyTitle: "还没有社区风格",
    emptyBody: "来做第一个给 StyleKit 社区贡献风格的人。",
    count: (n: number) => `${n} 个社区风格`,
  },
} as const;

export default async function CommunityPage() {
  const { locale } = await getRequestLocaleContext();
  const t = COPY[locale === "zh" ? "zh" : "en"];
  const styles = await listCommunityStylesMeta();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-10">
          <Breadcrumb
            items={[{ label: t.home, href: "/" }, { label: t.community }]}
          />

          <header className="mb-8 mt-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl leading-tight sm:text-4xl">
                  {t.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  {t.intro}
                </p>
              </div>
              <LocalizedLink
                href="/submit"
                className="inline-flex h-10 shrink-0 items-center rounded-md border border-foreground px-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
              >
                {t.submit}
              </LocalizedLink>
            </div>
            {styles.length > 0 ? (
              <p className="mt-4 text-xs text-muted-foreground">
                {t.count(styles.length)}
              </p>
            ) : null}
          </header>

          {styles.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
              <h2 className="font-serif text-xl">{t.emptyTitle}</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {t.emptyBody}
              </p>
              <LocalizedLink
                href="/submit"
                className="mt-6 inline-flex h-10 items-center rounded-md border border-foreground px-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
              >
                {t.submit}
              </LocalizedLink>
            </div>
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
