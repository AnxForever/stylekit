import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  getAlternateLocalePath,
  getBaseUrl,
  isLocale,
} from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/translations";

export type AiIntentPageKey =
  | "ai-ui-design"
  | "claude-code-ui-design"
  | "codex-ui-design";

interface AiIntentCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
  includedTitle: string;
  included: Array<{ title: string; body: string }>;
  workflowTitle: string;
  workflow: string[];
  stylesTitle: string;
  stylesBody: string;
  relatedTitle: string;
  related: Array<{ label: string; href: string; body: string }>;
  faq: Array<{ question: string; answer: string }>;
}

const TOOL_LABELS: Record<AiIntentPageKey, string> = {
  "ai-ui-design": "AI coding tools",
  "claude-code-ui-design": "Claude Code",
  "codex-ui-design": "Codex",
};

function getCopy(key: AiIntentPageKey, locale: Locale): AiIntentCopy {
  const isZh = locale === "zh";
  const tool = TOOL_LABELS[key];

  if (isZh) {
    const toolName = key === "ai-ui-design" ? "AI 编码工具" : tool;
    return {
      title: key === "ai-ui-design"
        ? "AI UI 设计风格与前端提示词"
        : `${tool} UI 设计风格与提示词`,
      description: key === "ai-ui-design"
        ? "为 ChatGPT、Claude Code 和 Codex 选择网页 UI 风格，获取设计 tokens、组件约束和可直接改写的前端提示词。"
        : `为 ${tool} 准备更稳定的网页 UI 生成 brief：从 StyleKit 选择视觉风格、设计 tokens、组件配方和可复制的前端提示词。`,
      h1: key === "ai-ui-design"
        ? "AI UI 设计：先选风格，再让 AI 写界面"
        : `${tool} UI 设计风格与前端提示词`,
      intro: key === "ai-ui-design"
        ? "StyleKit 把视觉方向翻译成 AI 能执行的约束：色板、字体、间距、圆角、阴影、交互和响应式规则。你可以先选风格，再把同一份 brief 交给不同的 AI 编码工具。"
        : `${toolName} 负责生成代码，StyleKit 负责把“看起来像什么”说清楚。先锁定风格和页面场景，再给 ${tool} 明确的 tokens、组件边界、状态和验收标准。`,
      eyebrow: "AI-FIRST DESIGN WORKFLOW",
      primaryCta: "浏览 UI 设计风格",
      secondaryCta: "查看 UI 提示词",
      includedTitle: "一份可执行的 UI 设计 brief 包含什么？",
      included: [
        { title: "视觉规则", body: "颜色、字体层级、间距基线、圆角、边框、阴影和明暗模式，不只是一句风格形容词。" },
        { title: "组件约束", body: "把导航、卡片、按钮、表单、表格和空状态写成可复用的组件行为，减少 AI 每次自由发挥。" },
        { title: "验收条件", body: "补上响应式断点、可访问性、交互状态和不能出现的元素，让生成结果更接近你的目标。" },
      ],
      workflowTitle: `用 ${toolName} 开始一个项目的顺序`,
      workflow: [
        "先从风格目录选择一个视觉方向，并打开它的颜色、tokens 和组件说明。",
        "把页面目标、用户、内容结构和风格约束合并成一段 brief，不要只说“做得高级一点”。",
        `让 ${toolName} 先搭建信息架构和组件骨架，再逐块实现视觉效果，最后用移动端和键盘操作验收。`,
      ],
      stylesTitle: "从风格约束开始，而不是从随机灵感开始",
      stylesBody: "每个风格页面都可以作为 AI 的上下文来源。选择一个方向后，再按页面场景调整密度和组件，而不是把多个互相冲突的风格词堆在同一个 prompt 里。",
      relatedTitle: "继续深入",
      related: [
        { label: "UI 提示词库", href: "/ui-prompts", body: "按页面类型和视觉主题寻找可复制的前端 prompt。" },
        { label: "Tailwind UI 提示词", href: "/tailwind-ui-prompts", body: "把风格约束落到 Tailwind CSS 类名和组件结构。" },
        { label: "开发者资源", href: "/developers", body: "查看 shadcn registry、tokens 和适合 React 项目的资源。" },
      ],
      faq: [
        { question: `${toolName} 能直接使用 StyleKit 吗？`, answer: `可以把 StyleKit 页面中的设计规则和提示词复制到 ${toolName} 的上下文中使用。StyleKit 不依赖某一个模型，重点是让设计约束可读、可复用、可验证。` },
        { question: "为什么只写一个风格名称不够？", answer: "“玻璃拟态”或“极简”只能表达方向，不能约束实现。颜色、字体、间距、组件状态和响应式规则越具体，AI 越不容易生成一套换个页面就崩掉的界面。" },
        { question: "StyleKit 适合什么项目？", answer: "适合落地页、SaaS、仪表盘、作品集、后台和组件库等需要统一视觉语言的网页项目，尤其适合在 AI 辅助编码时作为设计上下文。" },
      ],
    };
  }

  return {
    title: key === "ai-ui-design"
      ? "AI UI Design Styles & Frontend Prompts"
      : `${tool} UI Design Styles & Prompts`,
    description: key === "ai-ui-design"
      ? "Choose web UI styles for ChatGPT, Claude Code, and Codex. Get design tokens, component constraints, and reusable frontend prompts for consistent interfaces."
      : `Create more consistent web interfaces with ${tool}: choose a StyleKit direction, then use its design tokens, component recipes, and frontend prompt constraints.`,
    h1: key === "ai-ui-design"
      ? "AI UI design: choose the style before the AI writes the interface"
      : `${tool} UI design styles and frontend prompts`,
    intro: key === "ai-ui-design"
      ? "StyleKit turns visual direction into constraints an AI coding tool can execute: palette, typography, spacing, radii, shadows, interaction, and responsive rules. Choose a style first, then reuse the same brief across different coding tools."
      : `${tool} can generate the code; StyleKit helps define what the interface should feel like. Lock the style and page intent first, then give ${tool} explicit tokens, component boundaries, states, and acceptance criteria.`,
    eyebrow: "AI-FIRST DESIGN WORKFLOW",
    primaryCta: "Browse UI design styles",
    secondaryCta: "Explore UI prompts",
    includedTitle: "What belongs in an executable UI design brief?",
    included: [
      { title: "Visual rules", body: "Palette, type scale, spacing baseline, radii, borders, shadows, and light/dark behavior—not just an adjective like modern." },
      { title: "Component constraints", body: "Describe navigation, cards, buttons, forms, tables, and empty states as reusable behavior so the AI has fewer chances to drift." },
      { title: "Acceptance criteria", body: "Add responsive breakpoints, accessibility, interaction states, and things to avoid so the result has a measurable target." },
    ],
    workflowTitle: `A practical ${tool} workflow`,
    workflow: [
      "Choose one visual direction from the style catalog and open its colors, tokens, and component guidance.",
      "Combine the page goal, audience, content structure, and style constraints into one brief instead of asking for something merely ‘premium’.\n",
      `Ask ${tool} to build the information architecture and component skeleton first, then implement visual details and verify mobile and keyboard behavior.`,
    ],
    stylesTitle: "Start with constraints, not random inspiration",
    stylesBody: "Each style page can become context for an AI coding session. Pick one direction, then adapt density and components to the page scenario instead of stacking conflicting style adjectives into one prompt.",
    relatedTitle: "Continue exploring",
    related: [
      { label: "UI prompt library", href: "/ui-prompts", body: "Find reusable frontend prompts by page type and visual theme." },
      { label: "Tailwind UI prompts", href: "/tailwind-ui-prompts", body: "Translate style constraints into Tailwind CSS classes and component structure." },
      { label: "Developer resources", href: "/developers", body: "Explore the shadcn registry, tokens, and React-oriented resources." },
    ],
    faq: [
      { question: `Can ${tool} use StyleKit directly?`, answer: `Copy the design rules and prompt guidance from StyleKit into your ${tool} context. StyleKit is not tied to one model; its purpose is to make design constraints readable, reusable, and testable.` },
      { question: "Why is a style name alone not enough?", answer: "‘Glassmorphism’ or ‘minimal’ expresses a direction, not an implementation. Specific colors, type, spacing, component states, and responsive rules make the output less likely to drift from page to page." },
      { question: "What projects is StyleKit useful for?", answer: "Landing pages, SaaS products, dashboards, portfolios, admin tools, and component libraries that need a consistent visual language—especially when AI assists with implementation." },
    ],
  };
}

export function getAiIntentMetadata(
  key: AiIntentPageKey,
  locale: string,
): Metadata {
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getCopy(key, resolvedLocale);
  return localizeMetadata(
    {
      title: copy.title,
      description: copy.description,
      keywords: [
        "AI UI design",
        "frontend prompts",
        "web design styles",
        TOOL_LABELS[key],
        "design tokens",
        "Tailwind CSS",
      ],
      openGraph: {
        title: `${copy.title} | StyleKit`,
        description: copy.description,
        type: "website",
      },
    },
    resolvedLocale,
    `/${key}`,
  );
}

function getStyleName(style: ReturnType<typeof getAllStylesMeta>[number], locale: Locale) {
  return locale === "zh" ? style.name : style.nameEn;
}

export function AiIntentPage({
  keyName,
  locale: rawLocale,
}: {
  keyName: AiIntentPageKey;
  locale: string;
}) {
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = getCopy(keyName, locale);
  const baseUrl = getBaseUrl();
  const pagePath = `/${keyName}`;
  const pageUrl = `${baseUrl}${getAlternateLocalePath(pagePath, locale)}`;
  const styles = getAllStylesMeta().slice(0, 6);
  const breadcrumbHome = locale === "zh" ? "首页" : "Home";
  const breadcrumbCurrent = keyName === "ai-ui-design"
    ? locale === "zh" ? "AI UI 设计" : "AI UI Design"
    : copy.h1;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: breadcrumbHome, url: `${baseUrl}${getAlternateLocalePath("/", locale)}` },
    { name: breadcrumbCurrent, url: pageUrl },
  ]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const linkFor = (href: string) => getAlternateLocalePath(href, locale);

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: breadcrumbHome, href: "/" }, { label: breadcrumbCurrent }]} />
      </div>
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:px-12 md:pt-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-muted">{copy.eyebrow}</p>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{copy.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">{copy.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={linkFor("/styles")} className="inline-flex min-h-12 items-center border border-foreground bg-foreground px-5 text-sm text-background transition-opacity hover:opacity-80">{copy.primaryCta}</Link>
              <Link href={linkFor("/ui-prompts")} className="inline-flex min-h-12 items-center border border-border px-5 text-sm transition-colors hover:border-foreground">{copy.secondaryCta}</Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/5">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.includedTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.included.map((item, index) => (
                <article key={item.title} className="border border-border bg-background p-6">
                  <p className="text-xs tracking-[0.18em] text-muted">0{index + 1}</p>
                  <h3 className="mt-8 text-lg font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.workflowTitle}</h2>
            <ol className="mt-8 space-y-6">
              {copy.workflow.map((step, index) => (
                <li key={step} className="flex gap-4 border-b border-border pb-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-foreground text-xs">{index + 1}</span>
                  <p className="text-sm leading-7 text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="border border-border bg-foreground p-6 text-background md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] opacity-60">Prompt skeleton</p>
            <pre className="mt-6 whitespace-pre-wrap font-mono text-sm leading-7">{`Build a ${keyName === "ai-ui-design" ? "responsive web page" : `${TOOL_LABELS[keyName]} interface`} using one StyleKit visual direction.\n\nInclude:\n- explicit colors, typography, spacing, radii, and shadows\n- reusable components with hover, focus, loading, and empty states\n- responsive behavior and keyboard-accessible controls\n- a short list of visual choices that must not drift`}</pre>
          </div>
        </section>

        <section className="border-y border-border bg-muted/5">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.stylesTitle}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{copy.stylesBody}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {styles.map((style) => (
                <Link key={style.slug} href={linkFor(`/styles/${style.slug}`)} className="group border border-border bg-background p-4 transition-colors hover:border-foreground">
                  <p className="text-sm font-medium group-hover:underline">{getStyleName(style, locale)}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-6 text-muted">{locale === "zh" ? style.description : style.descriptionEn}</p>
                </Link>
              ))}
            </div>
            <Link href={linkFor("/styles")} className="mt-6 inline-flex text-sm underline underline-offset-4">{copy.primaryCta} →</Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.relatedTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.related.map((item) => (
              <Link key={item.href} href={linkFor(item.href)} className="border border-border p-6 transition-colors hover:border-foreground">
                <h3 className="font-medium">{item.label} →</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 md:px-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {copy.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-base font-medium marker:hidden">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
