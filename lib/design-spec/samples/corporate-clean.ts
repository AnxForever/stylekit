import type { DesignSpec } from "../types";

/**
 * Fourth gold-standard sample: the most common commercial register in the
 * catalogue. Its job is to look trustworthy rather than distinctive, so the
 * spec has to describe restraint — small radii, one blue, motion under 200ms.
 */
export const corporateCleanSpec: DesignSpec = {
  slug: "corporate-clean",
  name: "企业简洁风",
  nameEn: "Corporate Clean",
  cover: "/styles/corporate-clean.svg",
  theme: "light",
  northStar: {
    zh: "克制的商务蓝，一切为可读性与信任感让路。",
    en: "Restrained business blue, with readability and trust taking priority over personality.",
  },
  summary: {
    zh: "企业简洁风是一套被大量 B2B 产品验证过的默认解：浅灰蓝底、一个主蓝、白色卡片配极浅描边、12px 圆角。它不追求记忆点，追求的是零风险——任何人打开都不会觉得奇怪。层次靠 1px 边框与两级阴影（sm 与 md）建立，交互只做两件事：hover 时元素上浮半像素级并加深阴影，active 时缩小 2% 给出按压反馈。焦点环必须带 offset，这是无障碍底线。所有动效不超过 200ms，超过就开始显得轻浮。",
    en: "Corporate Clean is the default solution that B2B products have already validated: a pale slate ground, one primary blue, white cards with a hairline border and 12px radius. It aims for zero risk rather than memorability — nobody should find it strange. Depth comes from 1px borders and two shadow steps (sm and md), and interaction does only two things: hover lifts the element and deepens the shadow, active shrinks it by two percent. Focus rings always carry an offset, which is the accessibility floor. Nothing animates longer than 200ms; past that it starts to look frivolous.",
  },
  colors: [
    {
      name: "企业蓝",
      nameEn: "Corporate Blue",
      value: "#1e40af",
      group: "brand",
      role: {
        zh: "主行动按钮、链接与关键图标。只用一个蓝，避免同一页面出现两种蓝。",
        en: "Primary buttons, links and key icons. One blue only; never two blues on the same page.",
      },
      token: "--color-corporate-blue",
    },
    {
      name: "雾白",
      nameEn: "Slate Mist",
      value: "#f8fafc",
      group: "surface",
      role: {
        zh: "页面画布与区块交替底色。比纯白低一档，让白色卡片能浮起来。",
        en: "Page canvas and alternating section ground, one step below white so cards can lift off it.",
      },
      token: "--color-slate-mist",
    },
    {
      name: "亮蓝",
      nameEn: "Action Blue",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "焦点环、选中态与数据高亮。不用于大面积填充。",
        en: "Focus rings, selected states and data highlights. Never used as a large fill.",
      },
      token: "--color-action-blue",
    },
    {
      name: "石板灰",
      nameEn: "Slate",
      value: "#64748b",
      group: "neutral",
      role: {
        zh: "次要文字、说明与图标描边。层级后退时用它，而不是缩小字号。",
        en: "Secondary copy, captions and icon strokes. Reach for it when hierarchy recedes instead of shrinking type.",
      },
      token: "--color-slate",
    },
    {
      name: "确认绿",
      nameEn: "Confirm Green",
      value: "#10b981",
      group: "accent",
      role: {
        zh: "成功状态与正向指标。仅在状态语义明确时出现。",
        en: "Success states and positive metrics, only where the status meaning is explicit.",
      },
      token: "--color-confirm-green",
    },
    {
      name: "提示紫",
      nameEn: "Hint Violet",
      value: "#c559f0",
      group: "accent",
      role: {
        zh: "极少使用的第四强调，用于新产品标签与实验性功能。",
        en: "The rarely used fourth accent, reserved for new-product badges and experimental features.",
      },
      token: "--color-hint-violet",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 30, 36, 60],
      lineHeight: { display: 1.1, heading: 1.25, body: 1.65 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。层级靠 400/500/600/700 四档字重与字号建立。",
        en: "The only face. Hierarchy comes from four weights (400/500/600/700) and size.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 60, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 36, lineHeight: 1.2, tracking: "-0.01em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 30, lineHeight: 1.25, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.65, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body-sm" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 12, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "badges", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Slate Mist", value: "#f8fafc", purpose: "页面画布" },
    { level: 1, name: "White Card", value: "#ffffff", purpose: "卡片、面板、弹层" },
  ],
  elevation: [
    { name: "Rest", value: "0 1px 2px rgba(15,23,42,0.06)" },
    { name: "Hover", value: "0 4px 12px rgba(15,23,42,0.08)" },
    { name: "Focus ring", value: "0 0 0 2px #f8fafc, 0 0 0 4px #3b82f6" },
  ],
  components: [
    {
      name: "Primary Button",
      role: { zh: "主行动，例：Get Started", en: "Primary action, e.g. Get Started" },
      construction: {
        zh: "企业蓝填充、白字、8px 圆角、无描边。字级 14px、字重 500、padding 8px 16px。阴影 rest 为 0 1px 2px。hover 时换成更深的蓝并上浮 2px、阴影升到 0 4px 12px；active 时缩放 0.98 且去掉上浮。过渡 150ms ease-out。",
        en: "Corporate blue fill, white text, 8px radius, no border. 14px type at weight 500, 8px 16px padding. The resting shadow is 0 1px 2px. Hover swaps to a deeper blue, lifts 2px and raises the shadow to 0 4px 12px; active scales to 0.98 and drops the lift. 150ms ease-out.",
      },
      sizes: "padding 8px 16px; label 14px",
      states: "hover: lift 2px + deeper fill; active: scale 0.98; focus: 2px ring with 2px offset",
    },
    {
      name: "Feature Card",
      role: { zh: "功能卡与内容容器", en: "Feature card and content container" },
      construction: {
        zh: "白底、1px #e5e7eb 描边、12px 圆角、1px 高度阴影、内边距 24px。标题 20px/600、正文 14px/石板灰。hover 时阴影升到 0 4px 12px 并上浮 2px。图标容器 40px 见方、12px 圆角、浅蓝底，hover 时填充企业蓝、图标转白、放大 1.1。",
        en: "White fill, 1px #e5e7eb border, 12px radius, a 1px resting shadow, 24px padding. Title at 20px/600, body at 14px in slate. Hover raises the shadow to 0 4px 12px and lifts 2px. The icon tile is 40px square with a 12px radius on a pale blue ground; on hover it fills corporate blue, the icon turns white and scales to 1.1.",
      },
      states: "hover: lift 2px, shadow md; icon: fill, white glyph, scale 1.1",
    },
    {
      name: "Form Input",
      role: { zh: "表单输入与搜索", en: "Form input and search" },
      construction: {
        zh: "白底、1px #d1d5db 描边、8px 圆角、16px 字级、padding 8px 12px。标签 14px/500 深灰，帮助文字 12px 石板灰。聚焦时描边转企业蓝并加 2px 焦点环，环与元素之间留 2px offset；不改变盒子尺寸。",
        en: "White fill, 1px #d1d5db border, 8px radius, 16px type, 8px 12px padding. Label at 14px/500 in near-black, help text at 12px in slate. Focus turns the border corporate blue and adds a 2px ring with a 2px offset, without resizing the box.",
      },
      states: "focus: blue border + 2px ring, 2px offset",
    },
    {
      name: "Top Navigation",
      role: { zh: "全站顶部导航", en: "Site-wide top navigation" },
      construction: {
        zh: "高 64px，白底、底部 1px 浅灰描边、无阴影。字标 18px/600 深灰；链接 14px/500 石板灰、间距 24px、hover 转深灰并上浮 1px；右侧一个主按钮。",
        en: "64px tall, white fill, a 1px light border along the bottom, no shadow. Wordmark at 18px/600 in near-black; links at 14px/500 in slate, 24px apart, shifting darker and lifting 1px on hover; a primary button on the right.",
      },
    },
    {
      name: "Status Badge",
      role: { zh: "状态与分类标签", en: "Status and category tag" },
      construction: {
        zh: "全圆角、12px 字号、500 字重、padding 4px 10px。默认浅蓝底配企业蓝字；成功用浅绿底配确认绿；提示用 1px 描边而不用填充。永远带一行小圆点或图标，不只靠颜色传达状态。",
        en: "Fully rounded, 12px type at weight 500, 4px 10px padding. Default is a pale blue ground with corporate-blue text; success uses a pale green ground with confirm green; hints use a 1px border instead of a fill. Always pair with a dot or icon so status never rests on color alone.",
      },
    },
  ],
  imagery: {
    zh: "产品截图与界面局部为主，白底或浅灰底、干净的设备外框、无人物特写。允许灰度图标与线稿示意。不使用抽象渐变、夸张插画或高饱和摄影。",
    en: "Product screenshots and interface crops: white or pale grey grounds, clean device frames, no close-up people. Grey icons and line diagrams are fine. No abstract gradients, exaggerated illustration or saturated photography.",
  },
  layout: {
    zh: "12 栏、上限 1120px，容器内边距 16px 到 32px。区块间距 96px，卡片间距 24px，栅格用 24px 间距。hero 居中或左文右图，左右比例 1:1 或 6:6。表单与设置页用单栏，宽度不超过 640px。",
    en: "Twelve columns capped at 1120px, container padding 16px to 32px. Section rhythm 96px, 24px between cards and in gutters. The hero is either centred or split 6:6 with text left. Forms and settings pages stay single-column and never wider than 640px.",
  },
  dos: [
    {
      zh: "只用一种蓝，主色与链接色同源",
      en: "Use a single blue family for primary actions and links",
    },
    {
      zh: "卡片用 1px 描边加一级浅阴影，不要用重阴影",
      en: "Cards take a 1px border plus one shallow shadow, never a heavy one",
    },
    {
      zh: "焦点态必须带 2px offset 的焦点环",
      en: "Focus states always carry a 2px offset ring",
    },
    {
      zh: "hover 上浮不超过 2px，active 缩放不小于 0.98",
      en: "Hover lifts no more than 2px; active scales no less than 0.98",
    },
    {
      zh: "动效不超过 200ms，用 ease-out",
      en: "Motion stays under 200ms and uses ease-out",
    },
    {
      zh: "正文 16px 起，行高 1.65，行长控制在 70 字符内",
      en: "Body starts at 16px, line height 1.65, measure under 70 characters",
    },
  ],
  donts: [
    {
      zh: "不要在同一页面出现两种主色蓝",
      en: "Never put two primary blues on one page",
    },
    {
      zh: "不要用渐变按钮",
      en: "No gradient buttons",
    },
    {
      zh: "不要用直角或大于 16px 的圆角",
      en: "No sharp corners and no radius above 16px",
    },
    {
      zh: "不要用重阴影（shadow-2xl 一类）",
      en: "No heavy shadows such as shadow-2xl",
    },
    {
      zh: "不要省略 focus 环的 offset",
      en: "Never omit the offset on the focus ring",
    },
    {
      zh: "不要让按钮缺少 active 反馈，否则按钮像装饰",
      en: "Do not ship a button without active feedback; it reads as decoration",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#0f172a",
      background: "#f8fafc",
      card: "#ffffff",
      primary: "#1e40af",
      muted: "#64748b",
      border: "#e5e7eb",
    },
    prompts: [
      {
        zh: "做一个企业 SaaS 卡片：白底、1px #e5e7eb 描边、12px 圆角、阴影 0 1px 2px rgba(15,23,42,0.06)、内边距 24px。左上 40px 见方的浅蓝图标块（12px 圆角），下面是 20px/600 标题和 14px #64748b 正文。hover 时阴影变 0 4px 12px 并上浮 2px。",
        en: "Build a B2B SaaS card: white fill, 1px #e5e7eb border, 12px radius, shadow 0 1px 2px rgba(15,23,42,0.06), 24px padding. A 40px pale-blue icon tile (12px radius) sits top-left above a 20px/600 title and 14px body in #64748b. On hover the shadow becomes 0 4px 12px and the card lifts 2px.",
      },
    ],
  },
  similar: [
    {
      name: "Stripe",
      why: {
        zh: "同一套克制蓝、白卡加极浅描边的组合，动效短促",
        en: "Same restrained blue, white cards with hairline borders, and short motion",
      },
    },
    {
      name: "Linear",
      why: {
        zh: "单一主色加多层浅阴影构建层级，不用装饰性图形",
        en: "A single primary plus layered shallow shadows for hierarchy, with no decorative graphics",
      },
    },
  ],
  completeness: "full",
};
