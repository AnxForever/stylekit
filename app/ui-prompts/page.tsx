import type { Metadata } from "next";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { promptTopics } from "@/lib/prompts";
import { uiPromptTemplates } from "@/lib/seo/prompt-template-previews";
import { getRequestLocaleContext } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "UI Design Prompts Library",
  description:
    "Copy-ready UI design prompts for websites, dashboards, landing pages, dark mode, and Tailwind UI — ready for ChatGPT, Claude, Claude Code, and Codex.",
  keywords: [
    "UI design prompts",
    "web UI prompts",
    "AI UI prompts",
    "website design prompts",
    "frontend design prompts",
    "Tailwind UI prompts",
  ],
  openGraph: {
    title: "UI Design Prompts Library | StyleKit",
    description:
      "Copy-ready UI design prompts for websites, dashboards, landing pages, dark mode, and more.",
    siteName: "StyleKit",
    images: [{ url: "/social-preview-home-v2.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Design Prompts Library | StyleKit",
    description:
      "Copy-ready UI design prompts for websites, dashboards, landing pages, dark mode, and more.",
  },
};

const featuredTopicDescriptions: Record<string, string> = {
  "dashboard-design": "Structured prompts for analytics dashboards, admin panels, KPI cards, charts, and dense data views.",
  "landing-page": "Conversion-focused prompts for product launches, SaaS homepages, waitlists, pricing sections, and CTA flow.",
  "tailwind-ui": "Implementation-oriented prompts for React, Tailwind CSS, shadcn/ui, and utility-first component generation.",
  "dark-mode": "Dark-first prompts for dashboards, product UIs, media apps, and readable low-light interface systems.",
};

function getTopicHref(slug: string) {
  if (slug === "dashboard-design") return "/dashboard-prompts";
  if (slug === "landing-page") return "/landing-page-prompts";
  if (slug === "tailwind-ui") return "/tailwind-ui-prompts";
  if (slug === "dark-mode") return "/dark-mode-ui-prompts";
  return `/prompts/${slug}`;
}

export default async function UiPromptsPage() {
  const { locale } = await getRequestLocaleContext();
  const isZh = locale === "zh";
  const featuredTopics = promptTopics;

  const toolCards = [
    {
      name: "ChatGPT / Claude",
      description: isZh
        ? "适合在实现前梳理页面结构、视觉方向和更完整的提示词说明。"
        : "Best for shaping page structure, visual direction, and richer prompt briefs before implementation.",
    },
    {
      name: "Claude Code",
      description: isZh
        ? "适合把提示词说明转成真实组件、重构任务和代码级 UI 迭代。"
        : "Best for converting prompt briefs into real components, refactors, and code-level UI iterations.",
    },
    {
      name: "Codex",
      description: isZh
        ? "适合在代码库中执行完整的 UI 实现、修改和验证。"
        : "Best for implementing, editing, and verifying a complete UI inside a codebase.",
    },
    {
      name: isZh ? "Tailwind 优先工作流" : "Tailwind-first workflows",
      description: isZh
        ? "适合生成带有明确设计约束、可继续实现的 HTML、React 或 Next.js UI。"
        : "Best when you need implementation-ready HTML, React, or Next.js UI with explicit design constraints.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {isZh ? "提示词库" : "Prompt Library"}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {isZh ? "UI 与前端设计提示词库" : "UI Design Prompts Library"}
            </h1>
            <p className="text-lg text-muted max-w-3xl mb-8 leading-relaxed">
              {isZh
                ? "这里汇总适用于 UI 与前端设计的通用提示词。你可以从这里进入落地页、仪表盘、Tailwind UI 和暗色模式等专题，并将提示词用于 ChatGPT、Claude、Claude Code 或 Codex。"
                : "StyleKit is an open-source library of copy-ready UI design prompts for AI coding. Start with a broad brief, then choose a focused collection for landing pages, dashboards, Tailwind UI, or dark mode in ChatGPT, Claude, Claude Code, or Codex."}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted">
              <span className="border border-border px-3 py-1">
                {promptTopics.length} {isZh ? "个主题" : "topics"}
              </span>
              <span className="border border-border px-3 py-1">
                {isZh ? "UI / 落地页 / 仪表盘" : "UI / landing / dashboard"}
              </span>
              <span className="border border-border px-3 py-1">ChatGPT / Claude / Claude Code / Codex</span>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {isZh ? "提示词主题" : "Prompt Topics"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">
              {isZh ? "按具体任务选择提示词" : "Search-friendly prompt topics"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTopics.map((topic) => (
                <LocalizedLink
                  key={topic.slug}
                  href={getTopicHref(topic.slug)}
                  className="group border border-border p-6 hover:border-foreground transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                    {isZh ? topic.titleZh : topic.titleEn}
                  </h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed">
                    {isZh
                      ? topic.descriptionZh
                      : featuredTopicDescriptions[topic.slug] ?? topic.descriptionEn}
                  </p>
                  <div className="flex gap-3 text-xs text-muted">
                    <span>{topic.prompts.length} {isZh ? "条提示词" : "prompts"}</span>
                    <span>{topic.relatedStyleSlugs.length} {isZh ? "种风格" : "styles"}</span>
                  </div>
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {isZh ? "AI 工具" : "AI Tools"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">
              {isZh ? "这些提示词适合哪些工具" : "Where these prompts work best"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {toolCards.map((tool) => (
                <article key={tool.name} className="border border-border p-5">
                  <h3 className="text-lg mb-3">{tool.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{tool.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PromptTemplatePreviewSection
          title={isZh ? "示例预览与起步模板" : "Example previews and starter templates"}
          description={isZh
            ? "把这些模板当作结构参考，再把区块、布局和交互状态写回提示词，让输出更明确、更稳定。"
            : "Use these templates as structural references, then feed their sections, layouts, and interaction states back into your prompt for more reliable output."}
          templates={uiPromptTemplates}
        />

        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
            <h2 className="text-2xl md:text-3xl mb-4">
              {isZh ? "需要更具体的提示词分类？" : "Need a more specific prompt category?"}
            </h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              {isZh
                ? "如果任务已经明确，可以直接选择落地页、仪表盘、Tailwind UI 或暗色模式。针对具体页面类型的提示词通常比宽泛描述更容易得到清晰结果。"
                : "Start with landing pages, dashboards, Tailwind UI, or dark mode if your search intent is already narrow. Specific prompt pages usually outperform generic briefs in both AI output quality and search clarity."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <LocalizedLink
                href="/landing-page-prompts"
                className="inline-flex items-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                {isZh ? "落地页提示词" : "Landing Page Prompts"}
              </LocalizedLink>
              <LocalizedLink
                href="/dashboard-prompts"
                className="inline-flex items-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                {isZh ? "仪表盘提示词" : "Dashboard Prompts"}
              </LocalizedLink>
              <LocalizedLink
                href="/tailwind-ui-prompts"
                className="inline-flex items-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                {isZh ? "Tailwind UI 提示词" : "Tailwind UI Prompts"}
              </LocalizedLink>
              <LocalizedLink
                href="/dark-mode-ui-prompts"
                className="inline-flex items-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                {isZh ? "暗色模式提示词" : "Dark Mode UI Prompts"}
              </LocalizedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
