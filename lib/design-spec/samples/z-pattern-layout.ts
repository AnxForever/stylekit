import type { DesignSpec } from "../types";

export const zPatternLayoutSpec: DesignSpec = {
  slug: "z-pattern-layout",
  name: "Z 型布局",
  nameEn: "Z-Pattern Layout",
  cover: "/styles/z-pattern-layout.svg",
  theme: "light",
  northStar: {
    zh: "视线走 Z 字形：左上到右上，斜穿到左下，再落到右下。",
    en: "The eye travels a Z: top-left to top-right, diagonally down to the left, then across to the right.",
  },
  summary: {
    zh: "Z 型布局把营销页的注意力路径画出来：第一笔是页头（左 logo、右 CTA），第二笔是斜穿首屏的对角线，第三笔是底部区域的横向扫过并落在右侧 CTA。所以规则很硬——Z 路径上只能放必须被看到的内容，CTA 必须在路径的终点，任何打断流动的元素（大段正文、无关图片、双列卡片）都不允许。视觉上它需要高对比与强主色，因为路径靠对比被牵引。",
    en: "Z-Pattern draws the attention path of a marketing page: the first stroke is the header (logo left, CTA right), the second is a diagonal across the hero, the third sweeps the lower band and lands on a CTA at the right. The rules are rigid — only content that must be seen belongs on the path, the CTA must sit at its terminus, and anything that interrupts the flow (long copy, unrelated imagery, two-column card walls) is excluded. Visually it needs high contrast and a strong primary, because contrast is what pulls the eye along the path.",
  },
  colors: [
    {
      name: "深板岩",
      nameEn: "Deep Slate",
      value: "#0f172a",
      group: "brand",
      role: {
        zh: "标题与正文。在白色页面上提供最高对比，牵引视线。",
        en: "Headings and body — the highest contrast on white, pulling the eye forward.",
      },
      token: "--color-deep-slate",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "页面画布。保持干净，让 Z 路径不被噪音干扰。",
        en: "The canvas, kept clean so nothing clutters the Z.",
      },
      token: "--color-white",
    },
    {
      name: "靛蓝",
      nameEn: "Indigo",
      value: "#6366f1",
      group: "accent",
      role: {
        zh: "路径终点的 CTA 与链接。全页最强的视觉锚点。",
        en: "The CTA and links at the path's terminus — the strongest anchor on the page.",
      },
      token: "--color-indigo",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#06b6d4",
      group: "accent",
      role: {
        zh: "次级强调与图形点缀，用于对角线的右侧。",
        en: "Secondary emphasis and graphic accents on the right side of the diagonal.",
      },
      token: "--color-cyan",
    },
    {
      name: "橙",
      nameEn: "Amber",
      value: "#f59e0b",
      group: "accent",
      role: {
        zh: "徽标与稀缺提示，用于路径起点附近吸引初始注意。",
        en: "Badges and scarcity cues near the path's start, catching the first glance.",
      },
      token: "--color-amber",
    },
    {
      name: "粉",
      nameEn: "Pink",
      value: "#ec4899",
      group: "accent",
      role: {
        zh: "第二 CTA 或情绪化强调，出现频率最低。",
        en: "The secondary CTA or emotional emphasis, used least.",
      },
      token: "--color-pink",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 28, 40, 56],
      lineHeight: { display: 1.05, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.03em", label: "0.06em" },
      role: {
        zh: "全站唯一字体。首屏标题 56px/700 配紧字距，其余迅速回落，保持路径简洁。",
        en: "The only face. The hero headline runs 56px/700 on tight tracking and everything else falls away quickly, keeping the path clean.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 56, lineHeight: 1.05, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 40, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.2, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 128,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "badges", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "页面画布" },
    { level: 1, name: "Slate Band", value: "#0f172a", purpose: "反色区块（通常在中段）" },
  ],
  elevation: [
    { name: "CTA", value: "0 4px 14px rgba(99,102,241,0.30)" },
    { name: "CTA hover", value: "0 8px 25px rgba(99,102,241,0.50)" },
    { name: "Card", value: "0 2px 8px rgba(15,23,42,0.06)" },
  ],
  components: [
    {
      name: "Path CTA",
      role: { zh: "路径终点的主行动", en: "The CTA at the path's terminus" },
      construction: {
        zh: "靛蓝填充、白字、12px 圆角、无描边，18px/700、padding 16px 40px，阴影 0 4px 14px 靛蓝 30%。hover 时阴影扩到 25px、上浮 4px、放大 1.02；按下缩放 0.95 并下移 2px。过渡 200ms ease-out。全页最多两处，且都在 Z 路径上。",
        en: "Indigo fill, white text, 12px radius, no border, 18px/700, 16px 40px padding, shadow 0 4px 14px at 30% indigo. Hover widens the shadow to 25px, lifts 4px and scales 1.02; press scales 0.95 and drops 2px. 200ms ease-out. Two per page at most, both on the Z.",
      },
      sizes: "padding 16px 40px; label 18px",
      states: "hover: lift 4px, shadow 25px; active: scale 0.95",
    },
    {
      name: "Diagonal Lead",
      role: { zh: "首屏对角区的主视觉块", en: "The hero's diagonal lead block" },
      construction: {
        zh: "标题左对齐置于左上，使视线从左下扫到右上；右侧放一个视觉块（截图、产品图或抽象图形），高度不超过视口 60%。两者之间不加分隔线。副标题最多两行，紧贴标题下方 16px。",
        en: "The headline sits flush left so the eye sweeps from lower-left to upper-right, with a visual block on the right (screenshot, product shot or abstract form) no taller than sixty percent of the viewport. No divider between them, and the subhead runs two lines at most, 16px under the headline.",
      },
    },
    {
      name: "Header Bar",
      role: { zh: "路径起点：页头", en: "The path's origin: the header" },
      construction: {
        zh: "高 72px、白底、无边框。左侧 20px/700 字标，右侧一个 Path CTA 与最多三个链接。中间留空——中间放导航会打断第一笔横线。",
        en: "72px tall, white, no border. A 20px/700 wordmark sits left with one path CTA and up to three links on the right. The middle stays empty; navigation there would break the first stroke.",
      },
    },
    {
      name: "Bottom Band",
      role: { zh: "路径终点区域", en: "The path's terminus band" },
      construction: {
        zh: "深板岩底或白底，横向排列：左侧一句话结论，右侧一个 CTA 与一个邮箱输入框。整块高度不超过 240px，不放卡片网格。",
        en: "A slate or white band with one closing sentence on the left and a CTA plus email field on the right. It stays under 240px tall and carries no card grid.",
      },
    },
    {
      name: "Trust Row",
      role: { zh: "信任条（logo 或数据）", en: "The trust row of logos or figures" },
      construction: {
        zh: "紧贴首屏下方的一条横带，高 80px，放 4 到 6 个灰度 logo 或三个关键数字。文字 12px 全大写 0.06em，透明度 60%。它是 Z 第二笔的支撑，不打断路径。",
        en: "A band directly under the hero, 80px tall, holding four to six greyscale logos or three key figures at 12px uppercase 0.06em and 60% opacity. It supports the second stroke without interrupting the path.",
      },
    },
  ],
  imagery: {
    zh: "右对齐的产品截图或抽象图形，用于承接对角线。允许设备的干净外框。不使用大幅人物摄影与背景图，它们会把视线拉离路径。",
    en: "Right-aligned product shots or abstract forms catch the diagonal, optionally in a clean device frame. No large people photography or background images — both pull the eye off the path.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 128px。结构固定三段：页头横线 → 对角线区 → 底部终点带。每段只放一个主张，中段不允许出现双列卡片墙。",
    en: "Capped at 1120px with 24px padding, sections 128px apart. The structure is three fixed parts: the header stroke, the diagonal block, the closing band. Each holds one claim, and no two-column card wall appears in the middle.",
  },
  dos: [
    { zh: "Z 路径上只放必须被看到的内容", en: "Only must-see content sits on the Z" },
    { zh: "CTA 放在路径终点（右下）", en: "Put the CTA at the terminus, bottom-right" },
    { zh: "标题左对齐，视觉块右置", en: "Headline flush left, visual block right" },
    { zh: "首屏一个主张，不堆信息", en: "One claim in the hero, never a pile" },
    { zh: "保持高对比与单一主色", en: "Keep high contrast and one primary" },
    { zh: "页头中间留空", en: "Leave the header's middle empty" },
  ],
  donts: [
    { zh: "不要在路径上放次要内容", en: "No secondary content on the path" },
    { zh: "不要打断 Z 的流动", en: "Do not interrupt the Z flow" },
    { zh: "不要堆过多内容干扰路径", en: "Do not crowd the path with content" },
    { zh: "不要把 CTA 放在路径之外", en: "Never place the CTA off the path" },
    { zh: "不要让页面过于复杂", en: "Do not overcomplicate the page" },
    { zh: "不要在中段放双列卡片墙", en: "No two-column card walls in the middle" },
  ],
  promptGuide: {
    quickColors: {
      text: "#0f172a",
      background: "#ffffff",
      accent: "#6366f1",
      secondary: "#06b6d4",
      badge: "#f59e0b",
      muted: "#64748b",
    },
    prompts: [
      {
        zh: "做一个 Z 型营销页首屏：页头 72px 白底，左 logo 20px/700、右侧一个 #6366f1 圆角按钮（18px/700、padding 16px 40px、阴影 0 4px 14px rgba(99,102,241,0.3)）。中段左对齐 56px/700 标题（字距 -0.03em）与两行副标题，右侧放产品截图。底部横带左侧一句话，右侧 CTA 与邮箱输入框。区块间距 128px。",
        en: "Build a Z-pattern marketing hero: a 72px white header with a 20px/700 logo left and a #6366f1 rounded button right (18px/700, 16px 40px padding, shadow 0 4px 14px rgba(99,102,241,0.3)). The middle holds a flush-left 56px/700 headline at -0.03em tracking with a two-line subhead, and a product shot on the right. The bottom band puts one sentence left, a CTA and an email field right. Sections sit 128px apart.",
      },
    ],
  },
  similar: [
    { name: "F-Pattern Layout", why: { zh: "同样基于眼动，但 F 型服务于长文扫读，Z 型服务于单页转化", en: "Also eye-tracking based, though F serves long reading while Z drives a single conversion" } },
    { name: "Apple Style", why: { zh: "同样一屏一个主张，但苹果更克制、少强调色", en: "Also one claim per screen, though Apple stays more restrained with fewer accents" } },
  ],
  completeness: "full",
};
