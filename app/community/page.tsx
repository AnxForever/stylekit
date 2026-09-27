import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { CommunityCatalog } from "@/components/community/community-catalog";
import { CommunityDiscussions } from "@/components/community/community-discussions";
import { CommunityParticipation } from "@/components/community/community-participation";
import { CommunityRetryButton } from "@/components/community/community-retry-button";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getCommunityCatalog } from "@/lib/community/catalog";
import { getRecentDiscussions } from "@/lib/community/discussions";
import { filterCommunityStyles, readCommunityCatalogFilters } from "@/lib/community/catalog-query";
import { getCommunityStylePath } from "@/lib/community/style-path";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { serializeJsonLd } from "@/lib/security/json-ld";
import {
  generateBreadcrumbJsonLd,
  generateCommunityCollectionJsonLd,
} from "@/lib/seo/json-ld";
import { generateFaqJsonLd, type StyleFaqItem } from "@/lib/seo/style-faq";

// Community styles are DB-driven (approved submissions). Rendering must stay
// dynamic so a newly approved style appears without a rebuild.
export const dynamic = "force-dynamic";

const COPY = {
  en: {
    home: "Home",
    community: "Community",
    title: "StyleKit Community",
    intro:
      "Discuss UI design styles, share implementation notes, and contribute original work. Start with an existing style or submit your own for review.",
    submit: "Submit a style",
    emptyTitle: "No community styles yet",
    emptyBody: "Have a visual direction worth sharing? Add a description, palette, and examples. Your work appears here after review.",
    count: (n: number) => `${n} community ${n === 1 ? "style" : "styles"}`,
    sortLabel: "Sort",
    promoted: "Promoted",
    curated: "In curated library",
    searchLabel: "Search community styles",
    searchPlaceholder: "Search names, descriptions, tags, or keywords",
    categoryLabel: "Category",
    tagLabel: "Tag",
    all: "All",
    clearFilters: "Clear filters",
    filteredEmptyTitle: "No styles match those filters",
    filteredEmptyBody: "Try a broader search or clear the filters to browse every approved contribution.",
    faqTitle: "About the community catalog",
    faqs: [
      {
        question: "What is StyleKit Community?",
        answer:
          "StyleKit Community connects public style discussions with a moderated catalog of creator-submitted design styles. You can discuss existing styles without submitting a new one; approved contributions appear with author attribution.",
      },
      {
        question: "What does an approved community style include?",
        answer:
          "An approved style can include its visual description, category, tags, color palette, keywords, and AI-oriented interface guidance. The exact fields depend on the submitted style and its review outcome.",
      },
      {
        question: "What do approved, curated, and promoted mean?",
        answer:
          "Approved means a submission is visible in the community catalog. In curated library means the work now has a canonical page in StyleKit's built-in collection while its creator credit remains here. Promoted means a maintainer has approved an original community detail page for search indexing.",
      },
    ] satisfies StyleFaqItem[],
  },
  zh: {
    home: "首页",
    community: "社区",
    title: "风格社区",
    intro:
      "交流设计取舍，分享实现经验，也让原创风格被看见。从已有风格的讨论开始，或提交自己的作品，审核通过后加入社区风格库。",
    submit: "投稿风格",
    emptyTitle: "还没有社区风格",
    emptyBody: "有想分享的视觉方向？准备描述、配色和示例，审核通过后，你的作品就会出现在这里。",
    count: (n: number) => `${n} 个社区风格`,
    sortLabel: "排序",
    promoted: "已晋升",
    curated: "已收录精选",
    searchLabel: "搜索社区风格",
    searchPlaceholder: "搜索名称、描述、标签或关键词",
    categoryLabel: "分类",
    tagLabel: "标签",
    all: "全部",
    clearFilters: "清除筛选",
    filteredEmptyTitle: "没有匹配这些筛选条件的风格",
    filteredEmptyBody: "尝试扩大搜索范围，或清除筛选以浏览所有通过审核的投稿。",
    faqTitle: "关于社区风格库",
    faqs: [
      {
        question: "什么是 StyleKit 社区？",
        answer:
          "StyleKit 社区提供公开的风格讨论和经过审核的原创风格目录。不投稿也可以参与已有风格的讨论；通过审核的作品会展示作者署名和风格信息。",
      },
      {
        question: "通过审核的社区风格包含什么？",
        answer:
          "通过审核的风格可以包含视觉描述、分类、标签、配色、关键词以及面向 AI 的界面指导。具体字段取决于投稿内容和审核结果。",
      },
      {
        question: "通过审核、收录精选和晋升分别是什么意思？",
        answer:
          "通过审核表示投稿可以在社区目录中公开展示；收录精选表示作品已有 StyleKit 内置风格页，同时社区继续保留作者署名；晋升表示维护者允许一个独立的社区详情页被搜索引擎收录。",
      },
    ] satisfies StyleFaqItem[],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, canonicalUrl, languageAlternates, openGraphLocale } =
    await getRequestLocaleContext();
  const t = COPY[locale === "zh" ? "zh" : "en"];
  const title = locale === "zh" ? "社区风格与 UI 设计讨论" : "Community Styles & UI Design Discussions";

  return {
    // This page shares a segment with its legacy root layout; Next only
    // applies title templates to child segments. Pin one brand explicitly.
    title: { absolute: `${title} | StyleKit` },
    description: t.intro,
    keywords:
      locale === "zh"
        ? ["社区设计风格", "UI 设计风格", "AI 界面提示词", "设计系统"]
        : ["community design styles", "UI design styles", "AI UI prompts", "design systems"],
    // A partial data outage must not deindex this permanent public hub. The
    // page still provides participation guidance and links to curated styles.
    robots: { index: true, follow: true },
    alternates: { canonical: canonicalUrl, languages: languageAlternates },
    openGraph: {
      title: `${title} | StyleKit`,
      description: t.intro,
      url: canonicalUrl,
      siteName: "StyleKit",
      type: "website",
      locale: openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | StyleKit`,
      description: t.intro,
    },
  };
}

export default async function CommunityPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const catalogPromise = getCommunityCatalog();
  const discussionsPromise = getRecentDiscussions(
    catalogPromise.then(({ styles }) => styles)
  );
  const [context, catalog, query, discussions] = await Promise.all([
    getRequestLocaleContext(),
    catalogPromise,
    searchParams,
    discussionsPromise,
  ]);
  const { locale, canonicalUrl, baseUrl } = context;
  const pageLocale = locale === "zh" ? "zh" : "en";
  const isZh = pageLocale === "zh";
  const t = COPY[pageLocale];
  const { styles } = catalog;
  const language = isZh ? "zh-CN" : "en";
  const localizedPath = (path: string) => `${baseUrl}${getAlternateLocalePath(path, locale)}`;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (typeof value === "string") params.set(key, value);
    else if (value?.[0]) params.set(key, value[0]);
  }
  const visibleStyles = filterCommunityStyles(styles, readCommunityCatalogFilters(params));
  const collectionJsonLd = generateCommunityCollectionJsonLd({
    name: t.title,
    description: t.intro,
    url: canonicalUrl,
    language,
    items: visibleStyles.map((style) => ({
      name: isZh ? style.name : style.nameEn || style.name,
      description: isZh ? style.description : style.descriptionEn || style.description,
      url: localizedPath(getCommunityStylePath(style)),
    })),
  });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: t.home, url: localizedPath("/") },
    { name: t.community, url: canonicalUrl },
  ]);
  const faqJsonLd = generateFaqJsonLd(t.faqs, canonicalUrl);

  return (
    <div className="min-h-screen flex flex-col">
      {catalog.status === "ready" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-12 md:py-10">
          <Breadcrumb items={[{ label: t.home, href: "/" }, { label: t.community }]} />
          <header className="mb-12 mt-7 border-b border-border pb-8 md:mb-14 md:pb-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="font-serif text-3xl leading-tight sm:text-4xl">{t.title}</h1>
                <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{t.intro}</p>
              </div>
              <LocalizedLink href="/submit" className="inline-flex min-h-11 shrink-0 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85">
                {t.submit}
              </LocalizedLink>
            </div>
            <nav aria-label={isZh ? "社区导航" : "Community sections"} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="#discussions" className="inline-flex min-h-10 items-center underline-offset-4 hover:underline">{isZh ? "参与讨论" : "Join a discussion"}</a>
              <a href="#contributions" className="inline-flex min-h-10 items-center underline-offset-4 hover:underline">{isZh ? "浏览社区作品" : "Browse contributions"}</a>
              <LocalizedLink href="/profile" className="inline-flex min-h-10 items-center text-muted underline-offset-4 hover:text-foreground hover:underline">{isZh ? "我的投稿与评论" : "My contributions & comments"}</LocalizedLink>
            </nav>
          </header>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <CommunityDiscussions result={discussions} locale={pageLocale} />
            <CommunityParticipation locale={pageLocale} />
          </div>

          <section id="contributions" aria-labelledby="contributions-title" className="mt-14 scroll-mt-24 border-t border-border pt-9 md:mt-20">
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h2 id="contributions-title" className="font-serif text-2xl sm:text-3xl">{isZh ? "社区作品" : "Community contributions"}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{isZh ? "创作者提交、经过审核的设计风格。" : "Original design styles, submitted by creators and reviewed before publication."}</p>
              </div>
              {styles.length > 0 ? <p className="text-xs text-muted">{t.count(styles.length)}</p> : null}
            </div>
            {catalog.status === "unavailable" ? (
              <div className="border border-border p-6" role="status">
                <h3 className="font-medium">{isZh ? "社区作品暂时无法加载" : "Contributions are temporarily unavailable"}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{isZh ? "请稍后重试，已有投稿不会因此消失。你仍然可以浏览精选风格。" : "Please retry. This does not mean contributions were removed. You can still browse curated styles."}</p>
                <CommunityRetryButton locale={pageLocale} />
              </div>
            ) : (
              <CommunityCatalog
                styles={styles}
                locale={pageLocale}
                copy={{
                  submit: t.submit, emptyTitle: t.emptyTitle, emptyBody: t.emptyBody,
                  sortLabel: t.sortLabel, promoted: t.promoted, curated: t.curated,
                  searchLabel: t.searchLabel,
                  searchPlaceholder: t.searchPlaceholder, categoryLabel: t.categoryLabel,
                  tagLabel: t.tagLabel, all: t.all, clearFilters: t.clearFilters,
                  filteredEmptyTitle: t.filteredEmptyTitle, filteredEmptyBody: t.filteredEmptyBody,
                }}
              />
            )}
          </section>

          <section className="mt-14 max-w-3xl border-t border-border pt-8" aria-labelledby="community-faq-title">
            <h2 id="community-faq-title" className="mb-5 font-serif text-xl">{t.faqTitle}</h2>
            <div className="divide-y divide-border">
              {t.faqs.map((faq) => (
                <details key={faq.question} className="py-4">
                  <summary className="cursor-pointer text-sm font-medium leading-6">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
