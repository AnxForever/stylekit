import type { DesignSpec } from "../types";

/**
 * Eighth sample. Layout styles are the ones a token model usually fails on:
 * the identity lives in the grid, not in the palette. The spec has to state the
 * column contract as a rule, not as a suggestion.
 */
export const bentoGridSpec: DesignSpec = {
  slug: "bento-grid",
  name: "便当盒布局",
  nameEn: "Bento Grid",
  cover: "/styles/bento-grid.svg",
  theme: "light",
  northStar: {
    zh: "大小不一的卡片在同一张网格里，用尺寸而不是颜色分出主次。",
    en: "Uneven cards on one shared grid, ranking themselves by size rather than by color.",
  },
  summary: {
    zh: "便当盒布局把页面当成一张 4 栏网格，卡片跨 1 列、2 列或 2 行，尺寸本身就是信息层级：最大的格子放主功能，最小的格子放补充说明。所有间隙必须一致（16px 或 24px），否则整张网格会散。卡片统一 24px 圆角、极浅描边、一层几乎看不见的阴影；hover 时上浮 4px、放大 1% 并把阴影扩到 0 8px 30px，像把一个真实的盒子往上提了一下。允许在少数卡片用渐变做视觉锚点，但整屏不超过两张。",
    en: "Bento treats the page as a four-column grid where cards span one column, two columns or two rows, and size itself is the hierarchy: the largest cell holds the main feature, the smallest the footnote. Gaps must stay uniform (16px or 24px) or the grid falls apart. Cards share a 24px radius, a hairline border and a shadow you can barely see; hover lifts 4px, scales 1% and widens the shadow to 0 8px 30px, like lifting a real box. A few cards may carry a gradient as a visual anchor, never more than two per screen.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink",
      value: "#18181b",
      group: "brand",
      role: {
        zh: "标题、主按钮与深色锚点卡。也是整张网格的对比基准。",
        en: "Headings, primary buttons and the dark anchor card — the contrast baseline for the whole grid.",
      },
      token: "--color-ink",
    },
    {
      name: "雪白",
      nameEn: "Snow",
      value: "#fafafa",
      group: "surface",
      role: {
        zh: "页面画布。卡片比它亮一档，靠明度差浮起。",
        en: "Page canvas. Cards sit one step brighter so luminance does the lifting.",
      },
      token: "--color-snow",
    },
    {
      name: "卡面白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "所有卡片填充。不使用灰卡，层级只由尺寸与内容决定。",
        en: "Every card fill. No grey cards; level is decided by size and content alone.",
      },
      token: "--color-card",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "主要强调与图标底。用于一张锚点卡片或一组图标。",
        en: "Primary emphasis and icon grounds, used on one anchor card or one icon set.",
      },
      token: "--color-sky",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#8b5cf6",
      group: "accent",
      role: {
        zh: "第二强调，只与天蓝搭配出现在渐变锚点卡上。",
        en: "Second accent, appearing only beside sky inside a gradient anchor card.",
      },
      token: "--color-violet",
    },
    {
      name: "橙",
      nameEn: "Tangerine",
      value: "#f97316",
      group: "accent",
      role: {
        zh: "数据与提醒。全屏最多一处，用在小格子里。",
        en: "Figures and alerts. One per screen, placed in a small cell.",
      },
      token: "--color-tangerine",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 24, 32],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.02em" },
      role: {
        zh: "全站唯一字体。卡片标题用 600，网格标题用 700，正文 400。",
        en: "The only face: 600 for card titles, 700 for section titles, 400 for body.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 32, lineHeight: 1.15, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 600, size: 24, lineHeight: 1.25, token: "--text-heading" },
    { role: "body-lg", weight: 500, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1152,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "icons", value: "16px" },
  ],
  surfaces: [
    { level: 0, name: "Snow", value: "#fafafa", purpose: "页面画布" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "标准卡片" },
    { level: 2, name: "Ink Anchor", value: "#18181b", purpose: "主功能卡，全屏不超过一张" },
  ],
  elevation: [
    { name: "Card rest", value: "0 2px 10px rgba(0,0,0,0.02)" },
    { name: "Card hover", value: "0 8px 30px rgba(0,0,0,0.08)" },
    { name: "Anchor card hover", value: "0 12px 40px rgba(59,130,246,0.30)" },
  ],
  components: [
    {
      name: "Bento Cell",
      role: { zh: "网格中的任意一张卡片", en: "Any single card in the grid" },
      construction: {
        zh: "白底、24px 圆角、1px #f4f4f5 描边、内边距 24px（大格 32px）、阴影 0 2px 10px 2%。卡片默认跨 1 列，可按需跨 2 列或 2 行。hover 上浮 4px、缩放 1.01、阴影扩到 0 8px 30px 8%，过渡 300ms ease-out。",
        en: "White fill, 24px radius, 1px #f4f4f5 border, 24px padding (32px in large cells), shadow 0 2px 10px at 2%. Cells default to one column and may span two columns or two rows. Hover lifts 4px, scales 1.01 and widens the shadow to 0 8px 30px at 8%, over 300ms ease-out.",
      },
      sizes: "1x1, 2x1, 2x2; padding 24px or 32px",
      states: "hover: lift 4px, scale 1.01, shadow widens",
    },
    {
      name: "Anchor Card",
      role: { zh: "主功能卡，通常是 2x2 大格", en: "The main feature cell, usually 2x2" },
      construction: {
        zh: "墨黑填充或天蓝到紫的 135 度渐变、白字、32px 内边距。标题 24px/600，正文 14px 白 80%。图标 48px 见方、16px 圆角、白色 12% 底。hover 时阴影带主色（天蓝 30%）并上浮 4px。整屏只允许一张。",
        en: "Ink fill or a 135-degree sky-to-violet gradient, white text, 32px padding. Title at 24px/600, body at 14px in 80% white. The icon tile is 48px square with a 16px radius on 12% white. Hover carries a tinted shadow (30% sky) and lifts 4px. One per screen.",
      },
    },
    {
      name: "Bento Grid Container",
      role: { zh: "页面级网格容器", en: "Page-level grid container" },
      construction: {
        zh: "移动端 1 列、平板 2 列、桌面 4 列；间隙统一 16px（紧凑）或 24px（宽松），全页只选一种。行高用 grid-auto-rows 固定为 180px 的倍数，保证跨行卡片的比例稳定。",
        en: "One column on mobile, two on tablet, four on desktop; gaps are a single value per page, 16px or 24px. Rows use grid-auto-rows pinned to multiples of 180px so spanning cards keep their proportions.",
      },
    },
    {
      name: "Bento Tile Action",
      role: { zh: "卡片内的按钮与链接", en: "Buttons and links inside a cell" },
      construction: {
        zh: "墨黑填充、白字、12px 圆角、字级 14px/500、padding 8px 18px，阴影一级。hover 换成墨黑 80% 并上浮 2px；按下缩放 0.95。深色卡内改用白底墨黑字。",
        en: "Ink fill, white text, 12px radius, 14px type at weight 500, 8px 18px padding, one shadow step. Hover shifts to 80% ink and lifts 2px; press scales to 0.95. Inside a dark card, invert to a white fill with ink text.",
      },
    },
  ],
  imagery: {
    zh: "卡片里以产品截图、数据图表、图标网格和小段动效为主。允许在一张锚点卡上使用渐变作为图像替代。不使用大幅人物摄影或装饰性插画，它们会撑破网格。",
    en: "Cells hold product shots, small charts, icon grids and short loops. One anchor card may substitute a gradient for imagery. No large people photography or decorative illustration — both break the grid.",
  },
  layout: {
    zh: "4 栏网格、上限 1152px、间隙 16px 或 24px、行高基准 180px。跨列与跨行必须成对出现：有 2x2 就至少配两个 1x1，避免整行只有一张卡。移动端退化为单列顺序流，保持同样的间隙值与内边距。",
    en: "Four columns capped at 1152px, gaps of 16px or 24px, rows based on 180px. Spans must pair up: a 2x2 needs at least two 1x1 neighbours so no row is a single card. On mobile the grid collapses to a single ordered column with the same gap and padding.",
  },
  dos: [
    {
      zh: "卡片尺寸必须有差异，尺寸就是层级",
      en: "Card sizes must differ; size is the hierarchy",
    },
    {
      zh: "全页只用一个间隙值",
      en: "One gap value for the whole page",
    },
    {
      zh: "圆角统一 24px，不混用 12px 与 32px",
      en: "Keep radius at 24px; never mix 12px and 32px",
    },
    {
      zh: "hover 上浮 4px、放大 1%，300ms 内完成",
      en: "Hover lifts 4px and scales 1% within 300ms",
    },
    {
      zh: "锚点卡（渐变或墨黑）全屏不超过一张",
      en: "One anchor card per screen — gradient or ink, not both",
    },
    {
      zh: "移动端退化为单列，保留原有顺序",
      en: "Collapse to a single column on mobile, preserving order",
    },
  ],
  donts: [
    {
      zh: "不要让所有卡片同样大小",
      en: "Never make every card the same size",
    },
    {
      zh: "不要在页面里混用两种间隙",
      en: "Do not mix two gap values on one page",
    },
    {
      zh: "不要用直角",
      en: "No sharp corners",
    },
    {
      zh: "不要用硬偏移阴影（neo-brutalist 那一套）",
      en: "No hard offset shadows — that belongs to neo-brutalist",
    },
    {
      zh: "不要在一张卡片里塞三段以上内容",
      en: "No more than three content blocks inside one cell",
    },
    {
      zh: "不要让某一行只剩一张卡",
      en: "Never leave a row with a single card",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#18181b",
      background: "#fafafa",
      card: "#ffffff",
      accent: "#3b82f6",
      secondary: "#8b5cf6",
      border: "#f4f4f5",
    },
    prompts: [
      {
        zh: "做一个便当盒网格：桌面 4 栏、间隙 16px、行高基准 180px。第一张卡片跨 2 列 2 行、墨黑填充、白字、32px 内边距、24px 圆角；其余为白底 24px 圆角卡片，1px #f4f4f5 描边，内边距 24px。所有卡片 hover 上浮 4px、缩放 1.01、阴影从 0 2px 10px rgba(0,0,0,0.02) 扩到 0 8px 30px rgba(0,0,0,0.08)，300ms ease-out。",
        en: "Build a bento grid: four columns on desktop, 16px gaps, rows based on 180px. The first card spans 2x2 with an ink fill, white text, 32px padding and a 24px radius; the rest are white cards on 24px radii with a 1px #f4f4f5 border and 24px padding. Every card lifts 4px on hover, scales 1.01 and expands its shadow from 0 2px 10px rgba(0,0,0,0.02) to 0 8px 30px rgba(0,0,0,0.08), over 300ms ease-out.",
      },
    ],
  },
  similar: [
    {
      name: "Apple",
      why: {
        zh: "同样的不等尺寸卡片网格，但苹果更克制，几乎不用彩色卡片",
        en: "Same unequal card grid, though Apple is more restrained and rarely colours the cells",
      },
    },
    {
      name: "Linear",
      why: {
        zh: "用卡片尺寸与留白组织信息，不在卡片里加边框装饰",
        en: "Organises information by cell size and whitespace rather than ornament",
      },
    },
  ],
  completeness: "full",
};
