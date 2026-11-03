import type { Metadata } from "next";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BRAND_ASSETS } from "@/lib/brand/assets";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { serializeJsonLd } from "@/lib/security/json-ld";

type Locale = "zh" | "en";

/**
 * A roundup page for the "frontend style prompt sites" query. Each entry states
 * what the site actually gives you and where it stops, because a comparison
 * that only lists strengths reads as advertising and loses the citation it was
 * built for. Counts are approximate and dated; every catalog changes.
 */
interface PromptSite {
  slug: string;
  name: string;
  url: string;
  styles: Record<Locale, string>;
  promptForm: Record<Locale, string>;
  extra: Record<Locale, string>;
  fit: Record<Locale, string>;
  limit: Record<Locale, string>;
}

const SITES: PromptSite[] = [
  {
    slug: "stylekit",
    name: "StyleKit（stylekit.top）",
    url: "https://www.stylekit.top/zh/styles",
    styles: { zh: "149 种", en: "149" },
    promptForm: {
      zh: "每个风格页内可直接复制提示词，并给出设计 tokens 与组件配方",
      en: "Copy-ready prompts on each style page, alongside design tokens and component recipes",
    },
    extra: {
      zh: "Tailwind preset、shadcn 主题、CSS 变量导出，MCP 与 CLI，中英双语",
      en: "Tailwind preset, shadcn theme, CSS variable export, MCP and CLI, bilingual",
    },
    fit: { zh: "要把风格真正落到代码里的前端项目", en: "Frontend work where the style has to reach real code" },
    limit: {
      zh: "信息密度高，第一次使用需要几分钟熟悉；整体偏工程向",
      en: "Dense interface that takes a few minutes to learn; aimed at engineers rather than mood boards",
    },
  },
  {
    slug: "designprompts",
    name: "DesignPrompts",
    url: "https://www.designprompts.dev/",
    styles: { zh: "约 31 种", en: "About 31" },
    promptForm: {
      zh: "同一份页面数据换不同风格渲染，右上角 Get Prompt 复制",
      en: "One page rendered in every style, with a Get Prompt button per style",
    },
    extra: {
      zh: "并排对比最直观",
      en: "The clearest side-by-side comparison of any catalog here",
    },
    fit: { zh: "先快速确定方向，再决定怎么实现", en: "Picking a direction fast before deciding how to build it" },
    limit: {
      zh: "只有提示词，没有 tokens 与代码导出；界面纯英文",
      en: "Prompts only, no tokens or code export; English only",
    },
  },
  {
    slug: "uiprompt",
    name: "UI Prompt（uiprompt.art / uiprompt.site）",
    url: "https://uiprompt.art/",
    styles: { zh: "70 种以上", en: "70+" },
    promptForm: {
      zh: "仓库式提示词模板，按风格挑一条整段复制",
      en: "A repository of prompt templates, copied whole per style",
    },
    extra: {
      zh: "每个风格带整站演示",
      en: "Each style ships a full-site demo",
    },
    fit: { zh: "想一次拿到一整套风格模板的人", en: "People who want a complete set of prompts in one go" },
    limit: {
      zh: "以仓库与演示为主，筛选和检索较弱；页面依赖脚本渲染",
      en: "Repository-first; weak filtering, and the site depends on client-side rendering",
    },
  },
  {
    slug: "motionsites",
    name: "MotionSites",
    url: "https://motionsites.ai/",
    styles: { zh: "按站点收录", en: "Catalogued per site" },
    promptForm: {
      zh: "以整站为单位给出提示词，偏动效与首屏表现",
      en: "Whole-site prompts with an emphasis on motion and hero treatment",
    },
    extra: { zh: "动效与视觉趋势参考", en: "Motion and visual-trend reference" },
    fit: { zh: "复刻某个具体网站的整体观感", en: "Reproducing the overall feel of one specific site" },
    limit: {
      zh: "不是组件级风格库，覆盖面窄于风格目录",
      en: "Not a component-level style library; narrower than a catalog",
    },
  },
  {
    slug: "huggingpt",
    name: "HuggingPT UI Prompts",
    url: "https://huggingpt.com/ui-prompts",
    styles: { zh: "230 种以上", en: "230+" },
    promptForm: {
      zh: "中文提示词，拿到后可以直接改",
      en: "Chinese prompts you can edit directly after copying",
    },
    extra: { zh: "中文原生，改起来门槛低", en: "Native Chinese, low barrier to editing" },
    fit: { zh: "需要中文提示词的团队", en: "Teams that need Chinese prompts" },
    limit: {
      zh: "更新节奏慢，示例质量参差",
      en: "Slow updates and uneven quality across examples",
    },
  },
  {
    slug: "vibeprompt",
    name: "VibePrompt",
    url: "https://vibeprompt.app/",
    styles: { zh: "286 条 / 15 类", en: "286 prompts across 15 categories" },
    promptForm: {
      zh: "提示词与 Tailwind 代码成对给出",
      en: "Prompts paired with Tailwind code",
    },
    extra: { zh: "直接给出可用的代码产物", en: "Ships usable code output" },
    fit: { zh: "要现成 Tailwind 组件的人", en: "People who want ready Tailwind components" },
    limit: {
      zh: "偏模板集合，整套风格体系不成体系",
      en: "Closer to a template collection than a coherent style system",
    },
  },
  {
    slug: "prompt-genius",
    name: "Prompt Genius",
    url: "https://www.aipromptgenius.app/",
    styles: { zh: "通用提示词库", en: "General prompt library" },
    promptForm: {
      zh: "以浏览器扩展检索并在对话里直接插入",
      en: "Search and insert prompts from a browser extension",
    },
    extra: { zh: "扩展生态，随手取用", en: "Extension ecosystem, available wherever you chat" },
    fit: { zh: "在 ChatGPT 里随手取提示词", en: "Grabbing prompts inside ChatGPT as you work" },
    limit: {
      zh: "不是前端风格专用，风格覆盖依赖用户上传",
      en: "Not frontend-specific; style coverage depends on user uploads",
    },
  },
  {
    slug: "lexica",
    name: "Lexica",
    url: "https://lexica.art/?q=UI",
    styles: { zh: "图像库", en: "Image library" },
    promptForm: {
      zh: "搜 UI 参考图，少数结果带图像提示词",
      en: "Search UI references; some results carry image prompts",
    },
    extra: { zh: "找视觉方向最快", en: "Fastest way to find a visual direction" },
    fit: { zh: "定风格之前找参考", en: "Reference hunting before the style is chosen" },
    limit: {
      zh: "不产出可直接交给编码工具的前端提示词",
      en: "Does not produce frontend prompts a coding tool can execute",
    },
  },
  {
    slug: "ui-ux-pro-max",
    name: "UI UX Pro Max Skill",
    url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    styles: { zh: "57 种风格", en: "57 styles" },
    promptForm: {
      zh: "作为 Agent Skill 装进 Claude Code、Cursor 或 Windsurf",
      en: "Installed as an agent skill in Claude Code, Cursor, or Windsurf",
    },
    extra: { zh: "附带配色、字体搭配与 UX 规则", en: "Palettes, font pairings, and UX rules included" },
    fit: { zh: "想让编辑器直接套用规则的人", en: "People who want rules applied inside the editor" },
    limit: {
      zh: "依赖客户端支持，定制空间有限",
      en: "Depends on client support; limited room to customize",
    },
  },
];

const COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    intro: string;
    definition: string;
    tableTitle: string;
    tableNote: string;
    columns: [string, string, string, string, string];
    pickTitle: string;
    pick: Array<{ title: string; body: string }>;
    faqTitle: string;
    faq: Array<{ question: string; answer: string }>;
    ctaTitle: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  zh: {
    title: "前端风格提示词网站推荐：9 个可直接复制提示词的站点对比",
    description:
      "前端风格提示词网站有哪些？对比 StyleKit、DesignPrompts、UI Prompt、MotionSites 等 9 个站点，看各自给什么、适合什么场景、短板在哪，并附直接可复制的风格提示词入口。",
    eyebrow: "风格提示词站点对比",
    h1: "前端风格提示词网站：9 个站点各自的取舍",
    intro:
      "这份对比回答两个问题：前端风格提示词网站到底该看什么，以及每个站点在什么时候值得打开。每一条都写了它不给什么——只看优点的推荐没有参考价值。",
    definition:
      "前端风格提示词网站，指的是把某种视觉风格拆成一段可以直接粘贴给 AI 编码工具的结构化提示词，并提供一个复制入口的站点。它与 UI 灵感站的区别在于：灵感站给你看结果，提示词站给你能复现结果的描述。",
    tableTitle: "九个站点横向对比",
    tableNote: "风格数量与功能为 2026 年 10 月的观察，各站会变动，以站点当前页面为准。",
    columns: ["站点", "风格数量", "提示词形态", "额外能力", "适合与不适合"],
    pickTitle: "怎么选：三个判断标准",
    pick: [
      {
        title: "够不够具体",
        body: "只写「赛博朋克风」的提示词等于没写。能落到颜色、字号、间距、圆角、阴影和组件状态的，才会让输出稳定下来。",
      },
      {
        title: "给不给落地物",
        body: "如果最终要写进代码，看它是否同时给 token、Tailwind 或 shadcn 配置。只给提示词的站点，风格会在第二次迭代时漂移。",
      },
      {
        title: "对不匹配你的工具",
        body: "Claude Code、Cursor、v0 对上下文长度和格式的偏好不同。优先选明确说明适配方式、并提供可粘贴片段的站点。",
      },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        question: "前端风格提示词网站和 UI 灵感站有什么区别？",
        answer:
          "灵感站展示结果，用于找方向；提示词站给出可以复现结果的文字描述，用于让 AI 编码工具产出接近该方向界面的代码。前者解决「要什么风格」，后者解决「怎么让 AI 做出来」。",
      },
      {
        question: "把提示词直接复制给 Claude Code 或 Cursor 就能复刻风格吗？",
        answer:
          "能接近，但不保证一致。提示词决定方向，最终结果还受页面结构、组件粒度和你后续修改影响。补上设计 tokens、组件规则和禁止项，一致性会明显提升。",
      },
      {
        question: "这些站点都免费吗？",
        answer:
          "这里列出的站点都有免费可用的部分。差别在于免费额度覆盖多少风格、是否允许导出到代码、是否需要登录。以各站当前说明为准。",
      },
      {
        question: "中文项目该选哪个？",
        answer:
          "优先看是否提供中文提示词。StyleKit 与 HuggingPT 提供中文提示词；其余多为英文，需要自行翻译，翻译时容易丢掉具体的数值约束。",
      },
    ],
    ctaTitle: "从 149 种风格里挑一个开始",
    ctaBody: "每种风格都带可直接复制的提示词、设计 tokens 与组件配方，选好后可以导出到 Tailwind 或 shadcn。",
    ctaPrimary: "浏览风格库",
    ctaSecondary: "打开提示词库",
  },
  en: {
    title: "Frontend Style Prompt Sites: 9 Copy-Ready Prompt Libraries Compared",
    description:
      "Compare nine frontend style prompt sites — StyleKit, DesignPrompts, UI Prompt, MotionSites and more — by what they give you, where they fit, and where they stop.",
    eyebrow: "Style prompt sites",
    h1: "Frontend style prompt sites: what each one is actually for",
    intro:
      "This comparison answers two questions: what to look for in a frontend style prompt site, and when each one is worth opening. Every entry also says what it does not give you, because a list of strengths is an advertisement.",
    definition:
      "A frontend style prompt site turns a visual style into a structured prompt you can paste into an AI coding tool, with a copy button next to it. It differs from a UI inspiration gallery: a gallery shows finished results, a prompt site gives the description that reproduces them.",
    tableTitle: "Nine sites side by side",
    tableNote: "Counts and features reflect October 2026 and change often; trust the live pages.",
    columns: ["Site", "Styles", "Prompt format", "Extras", "Best for / limit"],
    pickTitle: "How to choose: three tests",
    pick: [
      {
        title: "Is it specific?",
        body: "A prompt that says cyberpunk is not a prompt. One that pins color, type scale, spacing, radii, shadows, and component states is what keeps output stable.",
      },
      {
        title: "Does it ship anything executable?",
        body: "If the style has to reach code, check for tokens and Tailwind or shadcn config. Prompt-only sites drift by the second iteration.",
      },
      {
        title: "Does it match your tool?",
        body: "Claude Code, Cursor, and v0 differ in context length and format. Prefer sites that state how their material is meant to be pasted.",
      },
    ],
    faqTitle: "Common questions",
    faq: [
      {
        question: "How is a style prompt site different from a UI inspiration gallery?",
        answer:
          "A gallery shows results for finding direction. A prompt site gives the written description that reproduces a direction, so a coding tool can build it. One answers what style, the other answers how to get it built.",
      },
      {
        question: "Can copying a prompt reproduce the style exactly?",
        answer:
          "Close, not exact. The prompt sets direction; the result also depends on page structure, component granularity, and later edits. Adding design tokens, component rules, and an avoid list improves consistency noticeably.",
      },
      {
        question: "Are these sites free?",
        answer:
          "All listed sites offer a free tier. What differs is how many styles it covers, whether export to code is included, and whether an account is required. Check each site's current terms.",
      },
      {
        question: "Which one should a Chinese-language project use?",
        answer:
          "Prefer sites that ship Chinese prompts. StyleKit and HuggingPT do; most others are English-first, and translation tends to drop the numeric constraints that make a prompt work.",
      },
    ],
    ctaTitle: "Start from one of 149 styles",
    ctaBody: "Each style ships copy-ready prompts, design tokens, and component recipes, exportable to Tailwind or shadcn.",
    ctaPrimary: "Browse the style catalog",
    ctaSecondary: "Open the prompt library",
  },
};

export const metadata: Metadata = {
  title: COPY.en.title,
  description: COPY.en.description,
  keywords: [
    "frontend style prompt sites",
    "UI prompt library",
    "AI design prompts",
    "copy ready prompts",
    "web design styles",
  ],
  openGraph: {
    title: `${COPY.en.title} | StyleKit`,
    description: COPY.en.description,
    siteName: "StyleKit",
    images: [{ url: BRAND_ASSETS.socialPreview, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COPY.en.title} | StyleKit`,
    description: COPY.en.description,
  },
};

export default async function PromptSitesPage() {
  const { locale } = await getRequestLocaleContext();
  const copy = COPY[locale];

  // FAQPage rich results were retired by Google in May 2026 and AI retrieval
  // reads visible text, not JSON-LD, so the questions below stay as plain
  // markup. ItemList remains because it describes the page's actual shape.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.title,
    itemListElement: SITES.map((site, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: site.name,
      url: site.url,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">{copy.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">{copy.h1}</h1>
            <p className="text-lg text-muted max-w-3xl leading-relaxed mb-6">{copy.intro}</p>
            <p className="text-base max-w-3xl leading-relaxed border-l-2 border-foreground pl-4">
              {copy.definition}
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{copy.tableTitle}</h2>
            <p className="text-sm text-muted mb-8">{copy.tableNote}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-foreground">
                    {copy.columns.map((column) => (
                      <th key={column} scope="col" className="py-3 pr-6 font-mono text-[11px] uppercase tracking-wider text-muted">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SITES.map((site) => (
                    <tr key={site.slug} className="border-b border-border align-top">
                      <th scope="row" className="py-4 pr-6 font-semibold whitespace-nowrap">
                        <a href={site.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:no-underline">
                          {site.name}
                        </a>
                      </th>
                      <td className="py-4 pr-6 whitespace-nowrap">{site.styles[locale]}</td>
                      <td className="py-4 pr-6">{site.promptForm[locale]}</td>
                      <td className="py-4 pr-6">{site.extra[locale]}</td>
                      <td className="py-4">
                        <p>{site.fit[locale]}</p>
                        <p className="text-muted mt-1">{site.limit[locale]}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{copy.pickTitle}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {copy.pick.map((entry, index) => (
                <div key={entry.title} className="border border-border p-6">
                  <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold mt-3 mb-2">{entry.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{entry.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{copy.faqTitle}</h2>
            <dl className="space-y-8">
              {copy.faq.map((entry) => (
                <div key={entry.question}>
                  <dt className="font-semibold mb-2">{entry.question}</dt>
                  <dd className="text-sm text-muted leading-relaxed">{entry.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
            <div className="border border-foreground p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{copy.ctaTitle}</h2>
              <p className="text-muted max-w-2xl leading-relaxed mb-6">{copy.ctaBody}</p>
              <div className="flex flex-wrap gap-3">
                <LocalizedLink
                  href="/styles"
                  className="inline-flex items-center border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  {copy.ctaPrimary}
                </LocalizedLink>
                <LocalizedLink
                  href="/ui-prompts"
                  className="inline-flex items-center border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                >
                  {copy.ctaSecondary}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }}
      />
    </div>
  );
}
