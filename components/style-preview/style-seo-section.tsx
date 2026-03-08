"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────

interface StyleSEOSectionProps {
  styleName: string;
  styleNameEn: string;
  styleSlug: string;
  description: string;
  keywords: string[];
  philosophy?: { en: string; zh: string };
  dosEn?: string[];
  dosZh?: string[];
  dontsEn?: string[];
  dontsZh?: string[];
}

// ── FAQ Accordion ──────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const contentId = `faq-${question.slice(0, 20).replace(/\s/g, "-")}`;

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex items-center justify-between py-4 text-left hover:text-foreground transition-colors"
      >
        <span className="font-medium text-sm md:text-base pr-4">{question}</span>
        <span
          className={cn(
            "text-muted shrink-0 transition-transform duration-200",
            open && "rotate-45"
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div id={contentId} className="pb-4 text-sm text-muted leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

// ── Prompt Card ────────────────────────────────────────

function PromptCard({
  title,
  prompt,
  toolLabel,
}: {
  title: string;
  prompt: string;
  toolLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const el = document.createElement("textarea");
      el.value = prompt;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border p-4 hover:border-foreground transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <span className="inline-block text-[10px] tracking-wider uppercase text-muted mt-1 border border-border px-1.5 py-0.5">
            {toolLabel}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 px-2 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-colors"
        >
          {copied ? t("seo.copiedPrompt") : t("seo.copyPrompt")}
        </button>
      </div>
      <div className="text-xs text-muted bg-zinc-50 dark:bg-zinc-900 p-3 mt-3 max-h-28 overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono">{prompt}</pre>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────

export function StyleSEOSection({
  styleName,
  styleNameEn,
  styleSlug,
  description,
  keywords,
}: StyleSEOSectionProps) {
  const { locale, t } = useI18n();
  const displayName = locale === "zh" ? styleName : styleNameEn;

  // Generate FAQ from style metadata
  const faqEntries = generateFAQ(styleName, styleNameEn, description, keywords, locale);

  // Generate prompt examples
  const promptExamples = generatePromptExamples(styleNameEn, styleSlug, locale);

  // Generate use cases
  const useCaseEntries = generateUseCases(styleNameEn, locale);

  return (
    <>
      {/* What is [Style]? */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("seo.whatIs")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-6">
            {locale === "zh"
              ? `${styleName} (${styleNameEn})`
              : `What is ${styleNameEn}?`}
          </h2>
          <div className="text-muted max-w-3xl leading-relaxed space-y-4">
            <p>{description}</p>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {keywords.slice(0, 8).map((kw) => (
                  <span
                    key={kw}
                    className="text-xs border border-border px-2 py-1 text-muted"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Prompt Examples */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("seo.promptExamples")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">
            {t("seo.promptExamplesTitle")}
          </h2>
          <p className="text-muted mb-8 max-w-2xl">
            {(t("seo.promptExamplesDesc") as string).replace("{style}", displayName)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promptExamples.map((pe, i) => (
              <PromptCard
                key={i}
                title={pe.title}
                prompt={pe.prompt}
                toolLabel={pe.toolLabel}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("seo.useCases")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">
            {t("seo.useCasesTitle")}
          </h2>
          <p className="text-muted mb-8 max-w-2xl">
            {t("seo.useCasesDesc")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCaseEntries.map((uc, i) => (
              <div
                key={i}
                className="border border-border p-4 hover:border-foreground transition-colors"
              >
                <h4 className="font-medium text-sm mb-2">{uc.title}</h4>
                <p className="text-xs text-muted">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("seo.faq")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-8">
            {t("seo.faqTitle")}
          </h2>
          <div className="max-w-3xl">
            {faqEntries.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── Content Generators ─────────────────────────────────
// These generate SEO-friendly content from style metadata

function generateFAQ(
  name: string,
  nameEn: string,
  description: string,
  keywords: string[],
  locale: string
) {
  if (locale === "zh") {
    return [
      {
        question: `什么是${name}设计风格？`,
        answer: description,
      },
      {
        question: `如何在 Tailwind CSS 中实现${name}风格？`,
        answer: `StyleKit 提供了${name}的完整 design tokens（颜色、间距、圆角、阴影等），可以直接导出到 Tailwind 配置中使用。同时提供组件级的代码片段和 AI Rules，帮助你快速在项目中实现该风格。`,
      },
      {
        question: `哪些 AI 工具支持${name}提示词？`,
        answer: `v0（Vercel）、Cursor、Claude 等 AI 编码工具都可以使用${name}风格的提示词。StyleKit 提供预格式化的 AI Rules，可直接导出为 Cursor Rules、Claude Code 配置等格式，确保 AI 生成的代码遵循该风格规范。`,
      },
      {
        question: `${name}适合什么类型的网站？`,
        answer: `${name}风格${keywords.length > 0 ? `以${keywords.slice(0, 3).join("、")}等特点著称` : ""}，适合追求该视觉效果的网站项目。具体适用场景取决于项目的品牌调性和目标受众。`,
      },
      {
        question: `如何将${name}风格与其他设计风格混搭？`,
        answer: `StyleKit 支持风格混搭功能。你可以在 Compare 页面对比不同风格，在 Blend 页面融合多种风格的 tokens。建议先确定主风格，再选择性地引入其他风格的配色或排版元素。`,
      },
    ];
  }

  return [
    {
      question: `What is ${nameEn} design style?`,
      answer: description,
    },
    {
      question: `How to implement ${nameEn} with Tailwind CSS?`,
      answer: `StyleKit provides complete design tokens for ${nameEn} (colors, spacing, border-radius, shadows, and more) that you can export directly into your Tailwind configuration. It also offers component-level code snippets and AI Rules to quickly implement this style in your project.`,
    },
    {
      question: `Which AI tools support ${nameEn} prompts?`,
      answer: `AI coding tools like v0 (Vercel), Cursor, and Claude can all use ${nameEn} style prompts. StyleKit provides pre-formatted AI Rules that can be exported as Cursor Rules, Claude Code configs, and other formats to ensure AI-generated code follows the style guidelines.`,
    },
    {
      question: `What types of websites suit ${nameEn}?`,
      answer: `${nameEn} is characterized by ${keywords.slice(0, 3).join(", ")}${keywords.length > 3 ? " and more" : ""}. It works well for projects that want this visual direction. The specific use cases depend on your brand identity and target audience.`,
    },
    {
      question: `How to combine ${nameEn} with other design styles?`,
      answer: `StyleKit supports style mixing. You can compare different styles on the Compare page and blend tokens from multiple styles on the Blend page. Start with a primary style, then selectively introduce color or typography elements from complementary styles.`,
    },
  ];
}

function generatePromptExamples(
  nameEn: string,
  slug: string,
  locale: string
) {
  const isZh = locale === "zh";
  return [
    {
      title: isZh ? `${nameEn} 通用提示词` : `${nameEn} General Prompt`,
      tool: "general",
      toolLabel: isZh ? "通用" : "General",
      prompt: `Design a web page using the ${nameEn} design style. Apply the visual language, color palette, typography, and component patterns that define ${nameEn}. Ensure the design is responsive, accessible, and uses Tailwind CSS. Refer to StyleKit (stylekit.top/styles/${slug}) for design tokens and component recipes.`,
    },
    {
      title: isZh ? `v0 适用提示词` : `${nameEn} for v0`,
      tool: "v0",
      toolLabel: "v0",
      prompt: `Create a web page using shadcn/ui components styled in the ${nameEn} design language. Use the visual patterns, color scheme, and spacing conventions defined by ${nameEn}. Include a hero section, feature grid, and footer. Make it responsive with Tailwind CSS. Design tokens: see stylekit.top/styles/${slug} for colors, typography, and border-radius values.`,
    },
    {
      title: isZh ? `Cursor 适用提示词` : `${nameEn} for Cursor`,
      tool: "cursor",
      toolLabel: "Cursor",
      prompt: `Build a Next.js page with Tailwind CSS following the ${nameEn} design style. Apply the correct color palette, typography scale, border-radius, and shadow values. Create responsive, accessible components. For the complete ${nameEn} design tokens and AI rules, reference: stylekit.top/styles/${slug}`,
    },
    {
      title: isZh ? `Claude 适用提示词` : `${nameEn} for Claude`,
      tool: "claude",
      toolLabel: "Claude",
      prompt: `Generate React components with TypeScript using the ${nameEn} visual style. Apply design tokens for colors, spacing, typography, and effects that characterize ${nameEn}. Components should be responsive, accessible (WCAG AA), and use Tailwind CSS. Reference StyleKit (stylekit.top/styles/${slug}) for the complete style specification and component recipes.`,
    },
  ];
}

function generateUseCases(nameEn: string, locale: string) {
  const isZh = locale === "zh";
  return [
    {
      title: isZh ? "企业官网" : "Corporate Website",
      description: isZh
        ? `使用${nameEn}风格构建品牌一致的企业网站。`
        : `Build a brand-consistent corporate site with ${nameEn} styling.`,
    },
    {
      title: isZh ? "SaaS 产品" : "SaaS Product",
      description: isZh
        ? `将${nameEn}应用于产品界面和营销页面。`
        : `Apply ${nameEn} to product interfaces and marketing pages.`,
    },
    {
      title: isZh ? "个人作品集" : "Portfolio",
      description: isZh
        ? `用${nameEn}风格展示你的创意作品。`
        : `Showcase your creative work with ${nameEn} aesthetics.`,
    },
    {
      title: isZh ? "博客与内容站" : "Blog & Content",
      description: isZh
        ? `为内容平台打造${nameEn}风格的阅读体验。`
        : `Create a ${nameEn}-styled reading experience for content platforms.`,
    },
    {
      title: isZh ? "电商平台" : "E-commerce",
      description: isZh
        ? `将${nameEn}视觉语言应用于产品展示和购物流程。`
        : `Apply ${nameEn} visual language to product displays and checkout flows.`,
    },
    {
      title: isZh ? "移动端应用" : "Mobile App",
      description: isZh
        ? `${nameEn}的响应式设计 tokens 同样适用于移动端。`
        : `${nameEn} responsive tokens work seamlessly for mobile interfaces.`,
    },
  ];
}
