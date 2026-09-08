import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { CommunityCatalog } from "./_content";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { listCommunityStylesMeta } from "@/lib/styles/community-runtime";
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
    title: "Community Styles",
    intro:
      "StyleKit Community is a public catalog of design styles submitted by independent creators. Each approved style documents a visual direction, reusable design vocabulary, and AI-ready UI guidance; promoted styles have also been reviewed for inclusion in the curated library.",
    submit: "Submit a style",
    emptyTitle: "No community styles yet",
    emptyBody: "Be the first to contribute a style to the StyleKit community.",
    count: (n: number) => `${n} community ${n === 1 ? "style" : "styles"}`,
    sortLabel: "Sort",
    promoted: "Promoted",
    searchLabel: "Search community styles",
    searchPlaceholder: "Search names, descriptions, tags, or keywords",
    categoryLabel: "Category",
    tagLabel: "Tag",
    all: "All",
    clearFilters: "Clear filters",
    resultCount: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    filteredEmptyTitle: "No styles match those filters",
    filteredEmptyBody: "Try a broader search or clear the filters to browse every approved contribution.",
    faqTitle: "About the community catalog",
    faqs: [
      {
        question: "What is StyleKit Community?",
        answer:
          "StyleKit Community is a moderated catalog for design styles submitted by creators. Approved submissions appear in the catalog with their author attribution and style metadata.",
      },
      {
        question: "What does an approved community style include?",
        answer:
          "An approved style can include its visual description, category, tags, color palette, keywords, and AI-oriented interface guidance. The exact fields depend on the submitted style and its review outcome.",
      },
      {
        question: "What is the difference between an approved and promoted style?",
        answer:
          "Approved means a submission is visible in the community catalog. Promoted means a maintainer has selected it for the curated StyleKit library; promoted community detail pages are also eligible for search indexing.",
      },
    ] satisfies StyleFaqItem[],
  },
  zh: {
    home: "首页",
    community: "社区",
    title: "社区风格库",
    intro:
      "StyleKit 社区是由独立创作者投稿的公开设计风格目录。每个通过审核的风格都会记录视觉方向、可复用的设计词汇和适合 AI 使用的界面指导；被晋升的风格还经过维护者复核，并进入精选库。",
    submit: "投稿风格",
    emptyTitle: "还没有社区风格",
    emptyBody: "来做第一个给 StyleKit 社区贡献风格的人。",
    count: (n: number) => `${n} 个社区风格`,
    sortLabel: "排序",
    promoted: "已晋升",
    searchLabel: "搜索社区风格",
    searchPlaceholder: "搜索名称、描述、标签或关键词",
    categoryLabel: "分类",
    tagLabel: "标签",
    all: "全部",
    clearFilters: "清除筛选",
    resultCount: (n: number) => `${n} 个结果`,
    filteredEmptyTitle: "没有匹配这些筛选条件的风格",
    filteredEmptyBody: "尝试扩大搜索范围，或清除筛选以浏览所有通过审核的投稿。",
    faqTitle: "关于社区风格库",
    faqs: [
      {
        question: "什么是 StyleKit 社区？",
        answer:
          "StyleKit 社区是一个面向创作者的设计风格投稿目录。通过审核的投稿会与作者署名和风格元数据一起展示。",
      },
      {
        question: "通过审核的社区风格包含什么？",
        answer:
          "通过审核的风格可以包含视觉描述、分类、标签、配色、关键词以及面向 AI 的界面指导。具体字段取决于投稿内容和审核结果。",
      },
      {
        question: "通过审核和被晋升有什么区别？",
        answer:
          "通过审核表示投稿可以在社区目录中公开展示；被晋升表示维护者将其选入 StyleKit 精选库，被晋升的社区详情页也具备搜索索引资格。",
      },
    ] satisfies StyleFaqItem[],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, canonicalUrl, languageAlternates, openGraphLocale } =
    await getRequestLocaleContext();
  const t = COPY[locale === "zh" ? "zh" : "en"];
  const title = locale === "zh" ? "社区风格库 — StyleKit" : "Community Styles — StyleKit";

  return {
    title,
    description: t.intro,
    keywords:
      locale === "zh"
        ? ["社区设计风格", "UI 设计风格", "AI 界面提示词", "设计系统"]
        : ["community design styles", "UI design styles", "AI UI prompts", "design systems"],
    robots: { index: true, follow: true },
    alternates: { canonical: canonicalUrl, languages: languageAlternates },
    openGraph: {
      title,
      description: t.intro,
      url: canonicalUrl,
      siteName: "StyleKit",
      type: "website",
      locale: openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.intro,
    },
  };
}

export default async function CommunityPage() {
  const { locale, canonicalUrl, baseUrl } = await getRequestLocaleContext();
  const isZh = locale === "zh";
  const t = COPY[isZh ? "zh" : "en"];
  const styles = await listCommunityStylesMeta();
  const language = isZh ? "zh-CN" : "en";
  const localizedPath = (path: string) => `${baseUrl}${getAlternateLocalePath(path, locale)}`;

  const collectionJsonLd = generateCommunityCollectionJsonLd({
    name: t.title,
    description: t.intro,
    url: canonicalUrl,
    language,
    items: styles.map((style) => ({
      name: isZh ? style.name : style.nameEn || style.name,
      description: isZh ? style.description : style.descriptionEn || style.description,
      url: localizedPath(`/community/${style.slug}`),
    })),
  });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: t.home, url: localizedPath("/") },
    { name: t.community, url: canonicalUrl },
  ]);
  const faqJsonLd = generateFaqJsonLd(t.faqs, canonicalUrl);

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
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
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
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

          <CommunityCatalog
            styles={styles}
            locale={isZh ? "zh" : "en"}
            copy={{
              submit: t.submit,
              emptyTitle: t.emptyTitle,
              emptyBody: t.emptyBody,
              sortLabel: t.sortLabel,
              promoted: t.promoted,
              searchLabel: t.searchLabel,
              searchPlaceholder: t.searchPlaceholder,
              categoryLabel: t.categoryLabel,
              tagLabel: t.tagLabel,
              all: t.all,
              clearFilters: t.clearFilters,
              resultCount: t.resultCount,
              filteredEmptyTitle: t.filteredEmptyTitle,
              filteredEmptyBody: t.filteredEmptyBody,
            }}
          />

          <section className="mt-16 max-w-3xl" aria-labelledby="community-faq-title">
            <h2
              id="community-faq-title"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {t.faqTitle}
            </h2>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              {t.faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <dt className="font-serif text-lg">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
