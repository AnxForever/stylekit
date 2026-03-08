import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptTemplatePreviewSection } from "@/components/seo/prompt-template-preview-section";
import { promptTopics } from "@/lib/prompts";
import { uiPromptTemplates } from "@/lib/seo/prompt-template-previews";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";

export const metadata: Metadata = {
  title: "UI Design Prompts Library",
  description:
    "Copy-ready UI design prompts for websites, dashboards, landing pages, dark mode, Tailwind UI, and more. Browse prompts optimized for ChatGPT, Claude, Cursor, v0, and frontend codegen workflows.",
  keywords: [
    "UI design prompts",
    "web UI prompts",
    "AI UI prompts",
    "website design prompts",
    "frontend design prompts",
    "Tailwind UI prompts",
  ],
  alternates: {
    canonical: `${BASE_URL}/ui-prompts`,
  },
  openGraph: {
    title: "UI Design Prompts Library | StyleKit",
    description:
      "Copy-ready UI design prompts for websites, dashboards, landing pages, dark mode, and more.",
    url: `${BASE_URL}/ui-prompts`,
    siteName: "StyleKit",
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

export default function UiPromptsPage() {
  const featuredTopics = promptTopics.filter((topic) =>
    ["dashboard-design", "landing-page", "tailwind-ui", "dark-mode", "glassmorphism", "neo-brutalist"].includes(topic.slug)
  );

  const toolCards = [
    {
      name: "ChatGPT / Claude",
      description: "Best for shaping page structure, visual direction, and richer prompt briefs before implementation.",
    },
    {
      name: "Cursor / Claude Code",
      description: "Best for converting prompt briefs into real components, refactors, and code-level UI iterations.",
    },
    {
      name: "v0",
      description: "Best for rapid layout generation when your prompt clearly defines sections, hierarchy, and states.",
    },
    {
      name: "Tailwind-first workflows",
      description: "Best when you need implementation-ready HTML, React, or Next.js UI with explicit design constraints.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Prompt Library
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              UI Design Prompts Library
            </h1>
            <p className="text-lg text-muted max-w-3xl mb-8 leading-relaxed">
              这是 StyleKit 面向广义搜索意图的 UI prompt hub。你可以从这里进入 landing page prompts、dashboard prompts、Tailwind UI prompts、dark mode prompts 等专题，把更具体的 prompt 直接带进 ChatGPT、Claude、Cursor、Claude Code 或 v0。
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted">
              <span className="border border-border px-3 py-1">{promptTopics.length} topics</span>
              <span className="border border-border px-3 py-1">UI / landing / dashboard</span>
              <span className="border border-border px-3 py-1">ChatGPT / Claude / Cursor / v0</span>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Featured Topics
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">Search-friendly prompt topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={getTopicHref(topic.slug)}
                  className="group border border-border p-6 hover:border-foreground transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                    {topic.titleEn}
                  </h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed">
                    {featuredTopicDescriptions[topic.slug] ?? topic.descriptionEn}
                  </p>
                  <div className="flex gap-3 text-xs text-muted">
                    <span>{topic.prompts.length} prompts</span>
                    <span>{topic.relatedStyleSlugs.length} styles</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              AI Tools
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">Where these prompts work best</h2>
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
          title="Example previews and starter templates"
          description="除了直接复制 prompt，你也可以先从现成模板反推结构，再把这些 section、layout、states 写回自己的 prompt 里。"
          templates={uiPromptTemplates}
        />

        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
            <h2 className="text-2xl md:text-3xl mb-4">Need a more specific prompt category?</h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Start with landing pages, dashboards, Tailwind UI, or dark mode if your search intent is already narrow. Specific prompt pages usually outperform generic briefs in both AI output quality and search clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/landing-page-prompts"
                className="inline-flex items-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                Landing Page Prompts
              </Link>
              <Link
                href="/dashboard-prompts"
                className="inline-flex items-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                Dashboard Prompts
              </Link>
              <Link
                href="/tailwind-ui-prompts"
                className="inline-flex items-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                Tailwind UI Prompts
              </Link>
              <Link
                href="/dark-mode-ui-prompts"
                className="inline-flex items-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                Dark Mode UI Prompts
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
