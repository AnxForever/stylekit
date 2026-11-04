import type { DesignSpec } from "../types";

/**
 * Gold-standard sample: the Editorial style, backfilled by hand from
 * `lib/styles/editorial.ts` and `lib/styles/editorial-tokens.ts`.
 *
 * This file is the reference shape every later backfill copies. If a field feels
 * awkward here, fix it here first — 148 more specs will inherit the decision.
 */
export const editorialSpec: DesignSpec = {
  slug: "editorial",
  name: "编辑杂志风",
  nameEn: "Editorial",
  cover: "/styles/editorial.svg",
  theme: "light",
  northStar: {
    zh: "暖米纸上的衬线杂志版面，秩序来自留白与一条发丝线，而不是分栏装饰。",
    en: "A serif magazine spread on warm paper — order carried by whitespace and a single hairline, not by panels.",
  },
  summary: {
    zh: "编辑部风格来自印刷媒体：高端杂志与报纸的版面语言。它把全部表现力放在字号级差、衬线标题与留白的呼吸感上，颜色退到只剩一个柔和的墨黑与一层暖米底。层次靠透明度（文字 /60、/40，边框 /10）和字距（标题收紧，标签放开）建立；深度靠留白与 1px 细线，不用阴影、不用圆角、不用渐变。整套系统只有一个暖色点缀，出现面积控制在一屏的 2% 以内，用于引文标记与选中态。",
    en: "Editorial borrows its logic from print: the layout language of high-end magazines and newspapers. All expression sits in size steps, a serif headline face and the breathing room between blocks. Color retreats to one soft black on a warm cream canvas. Hierarchy is built from opacity (text at /60 and /40, borders at /10) and tracking (tight headlines, open labels), while depth comes from whitespace and 1px rules — no shadows, no radii, no gradients. A single warm accent is allowed as long as it stays under two percent of a viewport, for quote marks and selection states.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink",
      value: "#1c1c1c",
      group: "brand",
      role: {
        zh: "正文、标题、1px 边框与反色区块的底色。全站唯一的深色，替代纯黑以免印刷感过硬。",
        en: "Body copy, headings, 1px rules and the fill of inverted bands. The only dark in the system; a softer black than #000 to keep the print feel from turning harsh.",
      },
      token: "--color-ink",
    },
    {
      name: "暖米纸",
      nameEn: "Paper",
      value: "#f9f8f6",
      group: "surface",
      role: {
        zh: "页面画布。所有默认背景都用它，比冷白更接近纸张，也避免长时间阅读的刺目感。",
        en: "The page canvas. Every default background uses it; warmer than white, closer to paper, easier to read for long stretches.",
      },
      token: "--color-paper",
    },
    {
      name: "石墨",
      nameEn: "Graphite",
      value: "#6b7280",
      group: "neutral",
      role: {
        zh: "次要文字、题注、日期与辅助说明。层级需要后退时用它，而不是缩小字号。",
        en: "Secondary copy, captions, dates and supporting notes. Reach for it when hierarchy needs to recede instead of shrinking the type.",
      },
      token: "--color-graphite",
    },
    {
      name: "陈玫",
      nameEn: "Mauve",
      value: "#816d70",
      group: "accent",
      role: {
        zh: "全站唯一暖色点缀。只出现在引文标记与选中态，面积不得超过一屏的 2%。",
        en: "The only warm accent. Restricted to quote marks and selection states, never more than two percent of a viewport.",
      },
      token: "--color-mauve",
    },
  ],
  fonts: [
    {
      family: "serif",
      substitute: "Georgia, 'Times New Roman', 'Songti SC', serif",
      weights: [400, 500],
      sizes: [28, 36, 48, 60, 72],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.7 },
      tracking: { display: "-0.02em", label: "0.2em" },
      role: {
        zh: "所有标题、引文与数字。衬线是这套风格的识别核心，缺了它就只剩一页灰底文字。",
        en: "Every heading, pull quote and figure. The serif is the identifying move; without it the page collapses into grey text on cream.",
      },
      token: "--font-serif",
    },
    {
      family: "sans-serif",
      substitute: "Inter, system-ui, -apple-system, sans-serif",
      weights: [400, 500, 700],
      sizes: [12, 14, 16],
      lineHeight: { display: 1.05, heading: 1.2, body: 1.7 },
      tracking: { display: "-0.01em", label: "0.2em" },
      role: {
        zh: "正文、按钮、标签与导航。始终与衬线标题成对出现，承担所有功能性文本。",
        en: "Body copy, buttons, labels and navigation. Always paired with the serif headline face; carries all functional text.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "serif", weight: 400, size: 72, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", font: "serif", weight: 400, size: 48, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", font: "serif", weight: 400, size: 36, lineHeight: 1.2, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", font: "serif", weight: 400, size: 28, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "sans-serif", weight: 400, size: 16, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", font: "sans-serif", weight: 400, size: 14, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "sans-serif", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128, 160],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "images", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#f9f8f6", purpose: "默认页面画布" },
    { level: 1, name: "Ink Band", value: "#1c1c1c", purpose: "反色区块：页脚、CTA 条、引文段" },
  ],
  elevation: [
    { name: "None", value: "none" },
    { name: "Hairline", value: "1px solid rgba(28,28,28,0.1)" },
  ],
  components: [
    {
      name: "Contrast Lockup Button",
      role: { zh: "主行动按钮，例：Read Story、Subscribe", en: "Primary action: Read Story, Subscribe" },
      construction: {
        zh: "墨黑填充、暖米纸色文字、1px 墨黑描边、直角。字级 12px、字重 500、全大写、字距 0.2em；padding 16px 32px。hover 时填充与文字互换，过渡 200ms。",
        en: "Ink fill, paper text, 1px ink border, square corners. Type at 12px / weight 500 / uppercase / 0.2em tracking; padding 16px 32px. On hover the fill and text swap, 200ms ease.",
      },
      sizes: "padding 16px 32px; label 12px",
      states: "rest: ink on paper inverted; hover: paper fill, ink text; focus-visible: 2px ink outline, 2px offset",
    },
    {
      name: "Underline Text Link",
      role: { zh: "次级行动与导航，例：View All", en: "Secondary action and navigation: View All" },
      construction: {
        zh: "无填充无边框，12px 全大写 0.2em 字距。下划线是一条 1px 当前色线，从右向左以 scale-x 0 起步，hover 时从左展开到 1，时长 500ms，缓动 cubic-bezier(0.16, 1, 0.3, 1)。",
        en: "No fill, no border, 12px uppercase at 0.2em tracking. The underline is a 1px rule in the current color, parked at scale-x 0 from the right and sweeping in from the left on hover over 500ms with cubic-bezier(0.16, 1, 0.3, 1).",
      },
      states: "hover: underline scale-x 0 to 1; focus-visible: 2px outline, no underline",
    },
    {
      name: "Hairline Card",
      role: { zh: "文章卡片与列表项", en: "Article card and list row" },
      construction: {
        zh: "顶部 1px 墨黑 /10 边线，padding-top 24px，无圆角无阴影无背景。hover 时边线加深到 /40，过渡 500ms；内部图片以 1.02 倍慢速放大，时长 600ms。",
        en: "A 1px ink rule at /10 across the top, 24px padding above the content, no radius, no shadow, no background. Hover deepens the rule to /40 over 500ms; the inner image scales to 1.02 over 600ms.",
      },
      states: "hover: rule /10 to /40, image 1 to 1.02",
    },
    {
      name: "Section Label",
      role: { zh: "区块分类与栏目名", en: "Section classification and column name" },
      construction: {
        zh: "12px 全大写、0.2em 字距、石墨色；前面接一条 24px 长、1px 宽的墨黑横线，线与文字间距 12px。不加大写以外任何装饰。",
        en: "12px uppercase at 0.2em tracking in graphite, preceded by a 24px long, 1px ink rule with 12px of air between rule and text. No decoration beyond the uppercase treatment.",
      },
    },
    {
      name: "Pull Quote",
      role: { zh: "段落中的引文强调", en: "Pull quote inside long-form copy" },
      construction: {
        zh: "28 至 36px 衬线斜体、行高 1.3、左右各缩进 24px、左侧 2px 墨黑竖线、上下留白 32px。引号用陈玫色，字号为正文的 1.5 倍。",
        en: "28 to 36px serif italic at 1.3 line height, indented 24px on both sides, hanging off a 2px ink rule on the left, 32px of air above and below. Quote marks take the mauve accent at 1.5x the body size.",
      },
    },
  ],
  imagery: {
    zh: "以摄影为主，低饱和、暖调、full-bleed 满幅裁切，人物与静物都可以，但必须能读成杂志跨页。不使用插画、图形纹样与图标系统；需要图示时用 1px 墨黑线框代替，保持纸面感。",
    en: "Photography first: low saturation, warm cast, full-bleed crops. People or still life both work as long as the image reads as a magazine spread. No illustration, no patterns, no icon system; when a diagram is needed, draw it in 1px ink rules so the page still reads as paper.",
  },
  layout: {
    zh: "单栏 1200px 上限，内部 8 栏网格。hero 为 45/55 左右分栏（文字 / 图像），正文区块单栏或 2 栏，栏间距 48px。区块间距 96 至 128px，容器内边距 24px（移动）到 48px（桌面）。"
      + "阅读宽度控制在 34em 以内，超过就断行，不做三栏以上的密集排版。",
    en: "Single column capped at 1200px over an eight-column grid. The hero splits 45/55 (text / image); body sections run one or two columns with a 48px gutter. Section rhythm is 96 to 128px, container padding 24px on mobile and 48px on desktop. Reading measure stays under 34em; break the line rather than adding a third column.",
  },
  dos: [
    {
      zh: "标题用衬线、正文用无衬线，两者始终成对出现",
      en: "Serif for headings, sans-serif for body — always as a pair",
    },
    {
      zh: "用透明度构建灰度：文字 /60 与 /40，边框 /10，而不是引入新颜色",
      en: "Build greys from opacity: text at /60 and /40, borders at /10, instead of introducing new colors",
    },
    {
      zh: "区块间距至少 96px，容器内边距 24px 到 48px",
      en: "Keep section spacing at 96px or more, container padding between 24px and 48px",
    },
    {
      zh: "标签统一 12px 全大写 0.2em 字距，不加粗",
      en: "Labels stay at 12px uppercase with 0.2em tracking, never bold",
    },
    {
      zh: "斜体只用于副标题与引文，不用于正文强调",
      en: "Reserve italic for subtitles and pull quotes, never for inline emphasis",
    },
    {
      zh: "交互只用下划线展开与颜色反转，时长 500ms 上下",
      en: "Interaction is underline reveal or color inversion, around 500ms",
    },
  ],
  donts: [
    {
      zh: "不要引入任何彩色强调（红、蓝、绿），整页保持单色",
      en: "Do not introduce any chromatic accent; the page stays monochrome",
    },
    {
      zh: "不要用阴影表达层次，深度只来自留白与 1px 线",
      en: "No shadows for depth — whitespace and 1px rules carry it",
    },
    {
      zh: "不要用纯黑 #0a0a0a 或冷白 #fafafa 做主色",
      en: "Never use pure black #0a0a0a or cool white #fafafa as the base",
    },
    {
      zh: "标题不得使用无衬线字体",
      en: "Headings must not fall back to sans-serif",
    },
    {
      zh: "不要用任何圆角，包括卡片、按钮与输入框",
      en: "No border radius anywhere: cards, buttons, inputs, images",
    },
    {
      zh: "不要用渐变、背景图案或装饰性几何",
      en: "No gradients, background patterns or decorative geometry",
    },
    {
      zh: "不要堆叠元素，宁可多留一屏白",
      en: "Do not crowd; a spare screen beats a packed one",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#1c1c1c",
      background: "#f9f8f6",
      muted: "#6b7280",
      accent: "#816d70",
      border: "rgba(28,28,28,0.1)",
    },
    prompts: [
      {
        zh: "做一个杂志式 hero：1200px 容器，左 45% 放 12px 全大写 0.2em 石墨色栏目名加一条 24px 横线，下面是 72px 衬线标题（行高 1.05，字距 -0.02em，墨黑），再接 16px 无衬线导语（行高 1.7，宽 34em 以内），底部一个墨黑填充直角按钮（12px 全大写 0.2em，padding 16px 32px）。右 55% 放一张低饱和暖调满幅照片，直角，无阴影。",
        en: "Build a magazine hero: 1200px container, left 45% starts with a 12px uppercase 0.2em graphite label behind a 24px ink rule, then a 72px serif headline at 1.05 line height and -0.02em tracking in ink, then a 16px sans-serif standfirst at 1.7 line height capped at 34em, and an ink-filled square button (12px uppercase, 0.2em, 16px 32px padding) underneath. Right 55% is a low-saturation warm photograph, square corners, no shadow.",
      },
      {
        zh: "做一个文章列表：每行顶部 1px rgba(28,28,28,0.1) 边线，内边距上方 24px，行间 64px。行内左侧 48px 石墨色日期（12px 全大写 0.2em），右侧 28px 衬线标题与 14px 无衬线摘要（行高 1.7，颜色 #6b7280），摘要不超过两行。hover 时边线加深到 rgba(28,28,28,0.4)，过渡 500ms。",
        en: "Build an article list: each row opens with a 1px rgba(28,28,28,0.1) rule, 24px of padding above the content, 64px between rows. On the left a 48px graphite date (12px uppercase, 0.2em), on the right a 28px serif title and a 14px sans-serif summary at 1.7 line height in #6b7280, clamped to two lines. Hover deepens the rule to rgba(28,28,28,0.4) over 500ms.",
      },
    ],
  },
  similar: [
    {
      name: "Kinfolk",
      why: {
        zh: "同样的暖米底、衬线标题与极低的信息密度，几乎不用颜色",
        en: "Same warm cream base, serif headings and deliberately low information density, almost no color",
      },
    },
    {
      name: "The Gentlewoman",
      why: {
        zh: "把杂志栏目名做成 12px 全大写标签，用一条细线分隔区块",
        en: "Turns magazine section names into 12px uppercase labels separated by a single hairline",
      },
    },
    {
      name: "Aesop",
      why: {
        zh: "单色系统加克制的斜体引文，深度靠留白与细线而非阴影",
        en: "Monochrome system with restrained italic quotes; depth from whitespace and rules rather than shadow",
      },
    },
  ],
  completeness: "full",
};
