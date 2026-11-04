import type { DesignSpec } from "../types";

export const warmDashboardSpec: DesignSpec = {
  slug: "warm-dashboard",
  name: "暖色仪表盘",
  nameEn: "Warm Dashboard",
  cover: "/styles/warm-dashboard.svg",
  theme: "light",
  northStar: {
    zh: "陶土色底配奶油白卡片：数据界面也可以有体温。",
    en: "Terracotta ground under cream cards — a data surface that still has a body temperature.",
  },
  summary: {
    zh: "暖色仪表盘要解决一个矛盾：仪表盘通常冷、硬、蓝，但团队每天要盯八小时。解法是把底色换成陶土（#d4a088），卡片用奶油白，阴影是柔和漫射的而不是硬边，圆角放大到 24px。数据本身用青绿（#4a9d9a）与金黄（#e8b86d）两条序列，避免蓝红这种「系统告警」配色。层次靠卡片提亮与漫射阴影，绝不靠边框加粗——这套风格禁止 2px 以上的边框。",
    en: "Warm Dashboard resolves a contradiction: dashboards are usually cool, hard and blue, yet teams stare at them for eight hours. The answer is a terracotta ground (#d4a088), cream cards, diffuse rather than hard shadows, and radius opened up to 24px. Data uses two series in teal (#4a9d9a) and gold (#e8b86d), avoiding the blue-red pairing that reads as system alarm. Depth comes from brighter cards and diffuse light, never from heavier borders — anything above 1px is banned here.",
  },
  colors: [
    {
      name: "陶土",
      nameEn: "Terracotta",
      value: "#d4a088",
      group: "surface",
      role: {
        zh: "页面底色。整套风格的体温来源，比任何强调色都重要。",
        en: "The page ground and the source of the whole style's warmth — more important than any accent.",
      },
      token: "--color-terracotta",
    },
    {
      name: "奶油白",
      nameEn: "Cream",
      value: "#faf8f5",
      group: "surface",
      role: {
        zh: "卡片与面板。比陶土亮很多，靠明度差把内容托起来。",
        en: "Cards and panels, far brighter than the ground so luminance alone lifts the content.",
      },
      token: "--color-cream",
    },
    {
      name: "青绿",
      nameEn: "Teal",
      value: "#4a9d9a",
      group: "brand",
      role: {
        zh: "主行动与图表第一序列。是暖底上唯一冷静的锚。",
        en: "Primary actions and the lead chart series — the one calm anchor on a warm ground.",
      },
      token: "--color-teal",
    },
    {
      name: "金黄",
      nameEn: "Gold",
      value: "#e8b86d",
      group: "accent",
      role: {
        zh: "图表第二序列与高亮。与陶土同色系，比它更亮。",
        en: "The second chart series and highlights, in the same family as terracotta but brighter.",
      },
      token: "--color-gold",
    },
    {
      name: "砖红",
      nameEn: "Brick",
      value: "#c17767",
      group: "accent",
      role: {
        zh: "负向指标与提醒。比纯红温和，仍能传达下降。",
        en: "Negative metrics and warnings — softer than pure red while still reading as decline.",
      },
      token: "--color-brick",
    },
    {
      name: "灰青",
      nameEn: "Slate Teal",
      value: "#6b8e8e",
      group: "accent",
      role: {
        zh: "次要数据与说明，用于不需要被主动读的序列。",
        en: "Secondary data and captions, for series that should not call attention.",
      },
      token: "--color-slate-teal",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 13, 15, 18, 24, 32],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.55 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。数字用 tabular-nums，标题 600、正文 400。",
        en: "The only face. Figures use tabular-nums, headings at 600 and body at 400.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 32, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 24, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 18, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 15, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64],
    maxWidth: 1440,
    sectionGap: 32,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "dots", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Terracotta", value: "#d4a088", purpose: "页面底" },
    { level: 1, name: "Cream", value: "#faf8f5", purpose: "卡片与面板" },
    { level: 2, name: "Glass White", value: "rgba(255,255,255,0.80)", purpose: "侧栏与浮层" },
  ],
  elevation: [
    { name: "Card", value: "0 8px 24px rgba(0,0,0,0.04)" },
    { name: "Card hover", value: "0 16px 40px rgba(0,0,0,0.08)" },
    { name: "Button", value: "0 4px 12px rgba(74,157,154,0.20)" },
  ],
  components: [
    {
      name: "Warm Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "青绿填充、白字、12px 圆角、无描边，15px/500、padding 12px 24px，阴影 0 4px 12px 青绿 20%。hover 时填充加深到 #3d8380、阴影扩到 20px、上浮 2px；按下缩放 0.98 并收阴影。过渡 200ms ease-out。",
        en: "Teal fill, white text, 12px radius, no border, 15px/500, 12px 24px padding, shadow 0 4px 12px at 20% teal. Hover deepens the fill to #3d8380, widens the shadow to 20px and lifts 2px; press scales 0.98 and pulls the shadow in. 200ms ease-out.",
      },
      sizes: "padding 12px 24px; label 15px",
      states: "hover: darker fill, lift 2px; active: scale 0.98",
    },
    {
      name: "Cream Card",
      role: { zh: "指标卡与图表容器", en: "Metric cards and chart containers" },
      construction: {
        zh: "奶油白填充、24px 圆角、无描边、内边距 32px，阴影 0 8px 24px 黑 4%。hover 时阴影扩到 40px、上浮 4px、出现 1px 极浅描边。数值 32px/700 用等宽数字，变化率右侧带一个 12px 的青绿圆点（正向）或砖红圆点（负向）。",
        en: "Cream fill, 24px radius, no border, 32px padding, shadow 0 8px 24px at 4% black. Hover widens the shadow to 40px, lifts 4px and introduces a 1px very light border. Figures run 32px/700 in tabular numerals, with a 12px teal dot for positive change or a brick dot for negative on the right.",
      },
    },
    {
      name: "Warm Input",
      role: { zh: "筛选与搜索", en: "Filters and search" },
      construction: {
        zh: "白 80% 填充、12px 圆角、1px 陶土 25% 描边、padding 10px 16px、13px 字。聚焦时描边转青绿并加 3px 青绿 20% 外环，不改变尺寸。",
        en: "80% white fill, 12px radius, a 1px terracotta border at 25%, 10px 16px padding at 13px. Focus turns the border teal and adds a 3px ring at 20% teal without resizing.",
      },
    },
    {
      name: "Glass Sidebar",
      role: { zh: "侧边导航", en: "Side navigation" },
      construction: {
        zh: "白 80% 填充、12px 模糊、右侧 1px 陶土 20% 描边、宽 240px。项目高 40px、12px 圆角、13px 字；选中项用青绿 12% 底配青绿文字，hover 用白 60% 底。",
        en: "80% white fill with a 12px blur, a 1px terracotta border at 20% on the right, 240px wide. Items are 40px tall on a 12px radius at 13px; selection uses a 12% teal ground with teal text, and hover a 60% white ground.",
      },
    },
    {
      name: "Series Palette",
      role: { zh: "图表配色规则", en: "The chart palette rule" },
      construction: {
        zh: "第一序列青绿 #4a9d9a、第二金黄 #e8b86d、第三砖红 #c17767、第四灰青 #6b8e8e。只允许这四色，且必须按此顺序使用。网格线用陶土 15%，坐标轴文字用灰青。禁止蓝紫红三原色组合。",
        en: "Series one is teal #4a9d9a, two gold #e8b86d, three brick #c17767, four slate teal #6b8e8e — only these four, applied in this order. Grid lines use terracotta at 15% and axis labels slate teal. The blue-violet-red triad is banned.",
      },
    },
  ],
  imagery: {
    zh: "以图表与图标为主，几乎不用照片。允许头像与产品缩略图。图表本身是主要视觉，配色必须取自四色序列。",
    en: "Charts and icons lead; photography is nearly absent. Avatars and product thumbnails are fine. The charts are the imagery, and their colors must come from the four series.",
  },
  layout: {
    zh: "上限 1440px、容器内边距 24px，卡片间距 24px，区块间距 32px。左侧 240px 玻璃侧栏加右侧内容区，顶部一排指标卡（每张最小 240px 宽），下方图表两栏。整体留白比数据密集宽一档。",
    en: "Capped at 1440px with 24px padding, 24px between cards and 32px between sections. A 240px glass rail sits beside the content, with a row of metric cards on top (240px minimum each) and charts in two columns below. Whitespace runs one step wider than a dense dashboard.",
  },
  dos: [
    { zh: "陶土底、奶油白卡", en: "Terracotta ground, cream cards" },
    { zh: "阴影柔和漫射，不用硬边", en: "Shadows stay diffuse, never hard-edged" },
    { zh: "圆角 12 到 24px", en: "Radius runs 12 to 24px" },
    { zh: "图表只用四色序列且按序使用", en: "Charts use only the four series, in order" },
    { zh: "数值用等宽数字并对齐", en: "Figures use tabular numerals and align" },
    { zh: "边框不超过 1px", en: "Borders never exceed 1px" },
  ],
  donts: [
    { zh: "不要用冷色背景（蓝、紫）", en: "No cool grounds: blue or violet" },
    { zh: "不要用纯黑文字", en: "No pure black text" },
    { zh: "不要用硬边阴影", en: "No hard-edged shadows" },
    { zh: "不要用高饱和霓虹色", en: "No saturated neon color" },
    { zh: "不要用 2px 及以上的边框", en: "No borders at 2px or above" },
    { zh: "不要在图表里用蓝紫红三原色", en: "Do not use blue-violet-red in charts" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3a3330",
      background: "#d4a088",
      card: "#faf8f5",
      primary: "#4a9d9a",
      secondary: "#e8b86d",
      muted: "#6b8e8e",
    },
    prompts: [
      {
        zh: "做一个暖色仪表盘指标卡：奶油白 #faf8f5 填充、24px 圆角、无边框、内边距 32px、阴影 0 8px 24px rgba(0,0,0,0.04)。顶部 12px #6b8e8e 标签，下面 32px/700 数值（tabular-nums），右侧 12px 的青绿圆点表示正向。hover 时阴影扩到 0 16px 40px rgba(0,0,0,0.08)、translateY(-4px)。页面底色 #d4a088。",
        en: "Build a warm dashboard metric card: cream #faf8f5 fill, 24px radius, no border, 32px padding, shadow 0 8px 24px rgba(0,0,0,0.04). A 12px label in #6b8e8e sits above a 32px/700 figure in tabular-nums, with a 12px teal dot for positive change on the right. Hover widens the shadow to 0 16px 40px rgba(0,0,0,0.08) and translates -4px. The page ground is #d4a088.",
      },
    ],
  },
  similar: [
    { name: "Dashboard Layout", why: { zh: "同属仪表盘，但那边是中性蓝、密度更高", en: "Also a dashboard, though that one is neutral blue and denser" } },
    { name: "Terracotta", why: { zh: "同一支陶土色，但那个风格更偏品牌表达", en: "Shares the terracotta tone, though that style leans toward brand expression" } },
  ],
  completeness: "full",
};
