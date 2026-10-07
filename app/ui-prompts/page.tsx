import type { Metadata } from "next";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { PromptCopyButton } from "@/app/prompts/[topic]/_prompt-copy-button";
import { promptTopics } from "@/lib/prompts";
import { uiPromptTemplates } from "@/lib/seo/prompt-template-previews";
import { UI_PROMPT_EXAMPLES } from "@/lib/seo/ui-prompt-examples";
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
                ? "复制包含布局、配色、响应式行为和交互状态的前端提示词，用于 ChatGPT、Claude、Claude Code 或 Codex。先从下面三个完整示例开始，再按页面类型或视觉风格查找更多提示词。"
                : "Copy frontend prompts that specify layout, colors, responsive behavior, and UI states for ChatGPT, Claude, Claude Code, or Codex. Start with the three complete examples below, then explore prompts by page type or visual style."}
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

        <section aria-labelledby="prompt-examples-title" className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {isZh ? "可复制示例" : "Copyable Examples"}
            </p>
            <h2 id="prompt-examples-title" className="text-2xl md:text-3xl mb-4">
              {isZh ? "选一个任务，复制完整提示词" : "Choose a task and copy the complete prompt"}
            </h2>
            <p className="text-muted mb-8 max-w-3xl leading-relaxed">
              {isZh
                ? "这些是可按需求修改的提示词示例。复制后补充你的产品内容和已有代码；生成结果需要在项目中检查和测试。每条示例都链接到对应专题，便于继续调整。"
                : "These are prompt examples to adapt to your project. Add your product content and existing code, then review and test the generated result. Each example links to its source collection for further guidance."}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {UI_PROMPT_EXAMPLES.map((example) => (
                <article key={example.id} className="min-w-0 border border-border p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold">{example.title[locale]}</h3>
                    <PromptCopyButton
                      targetId={`ui-example-${example.id}`}
                      copyLabel={isZh ? "复制提示词" : "Copy prompt"}
                      copiedLabel={isZh ? "已复制" : "Copied"}
                    />
                  </div>
                  <pre id={`ui-example-${example.id}`} className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-muted">
                    {example.prompt[locale]}
                  </pre>
                  <LocalizedLink
                    href={example.sourceHref}
                    className="mt-5 inline-flex text-sm underline underline-offset-4 hover:text-muted transition-colors"
                  >
                    {example.sourceLabel[locale]}
                  </LocalizedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {isZh ? "提示词主题" : "Prompt Topics"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">
              {isZh ? "按具体任务选择提示词" : "Choose prompts for the page you are building"}
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
            ? "这些模板提供页面结构参考。选出需要的区块、布局和交互状态，再把它们补充到提示词中。"
            : "Use these templates as references for page structure. Choose the sections, layouts, and interaction states you need, then add them to your prompt."}
          templates={uiPromptTemplates}
        />

      </main>
      <Footer />
    </div>
  );
}
