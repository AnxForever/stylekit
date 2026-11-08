import type { DesignSpec } from "../types";

export const dashboardLayoutSpec: DesignSpec = {
  slug: "dashboard-layout",
  name: "仪表盘布局",
  nameEn: "Dashboard Layout",
  cover: "/styles/dashboard-layout.svg",
  theme: "light",
  northStar: {
    zh: "指标先行：先给数字，再给图，最后才给细节。",
    en: "Metrics first: the number, then the chart, then the detail.",
  },
  summary: {
    zh: "仪表盘布局解决的是「一眼看懂」：顶部一排 KPI 卡（3 到 4 张），下面是图表区与明细表。每张 KPI 卡只放三个元素——指标名、数字、变化率，变化率用绿色与红色的 10% 底色块表示，不靠箭头。左侧深色侧栏与浅灰内容区形成固定分区，卡片用 12px 圆角、1px 描边、一级阴影。密度比企业站更高：图表内边距 16px、表格行高 44px、数字用等宽字体对齐。",
    en: "Dashboard Layout solves 'understand at a glance': a row of three or four KPI cards on top, charts and a detail table below. Each KPI card holds exactly three things — the metric name, the number, and the change rate, with the rate shown on a 10% green or red chip rather than an arrow. A dark rail and pale content ground keep the zones fixed, while cards use 12px radii, 1px borders and one shadow step. Density runs higher than a corporate site: 16px chart padding, 44px table rows, and monospaced figures so columns line up.",
  },
  colors: [
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#111827",
      group: "brand",
      role: {
        zh: "侧栏底色、标题与主要数字。仪表盘需要比企业站更强的对比。",
        en: "Rail ground, headings and headline figures — dashboards need more contrast than a corporate site.",
      },
      token: "--color-near-black",
    },
    {
      name: "雾白",
      nameEn: "Mist",
      value: "#f9fafb",
      group: "surface",
      role: { zh: "内容区画布，卡片浮在其上。", en: "Content ground for cards to sit on." },
      token: "--color-mist",
    },
    {
      name: "卡白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: { zh: "KPI 卡、图表容器与表格底。", en: "KPI cards, chart containers and table beds." },
      token: "--color-card-white",
    },
    {
      name: "靛蓝",
      nameEn: "Indigo",
      value: "#6366f1",
      group: "accent",
      role: {
        zh: "主行动与图表主序列。全屏只允许一个蓝紫色系。",
        en: "Primary actions and the lead chart series — only one blue-violet family per screen.",
      },
      token: "--color-indigo",
    },
    {
      name: "正向绿",
      nameEn: "Positive Green",
      value: "#10b981",
      group: "accent",
      role: {
        zh: "增长指标与成功状态。用 10% 底配实色文字，不用实色块。",
        en: "Growth metrics and success, rendered as 10% ground with solid text rather than a solid chip.",
      },
      token: "--color-positive",
    },
    {
      name: "负向红",
      nameEn: "Negative Red",
      value: "#ef4444",
      group: "accent",
      role: {
        zh: "下降指标与错误。与绿色保持同等的面积与字重。",
        en: "Declining metrics and errors, matched to green in both area and weight.",
      },
      token: "--color-negative",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [11, 12, 14, 20, 28, 36],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.5 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。数字用 tabular-nums 保证列对齐，这是仪表盘最重要的排版细节。",
        en: "The only face. Figures use tabular-nums so columns align — the single most important typographic detail here.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, SFMono-Regular, Menlo, monospace",
      weights: [400, 500],
      sizes: [12, 13],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0", label: "0.02em" },
      role: {
        zh: "表格数值、ID 与代码片段。等宽让纵向比较成为可能。",
        en: "Table figures, IDs and code snippets — the monospace makes vertical comparison possible.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 36, lineHeight: 1.15, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 600, size: 20, lineHeight: 1.3, token: "--text-heading" },
    { role: "body-lg", weight: 500, size: 14, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 500, size: 11, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48],
    maxWidth: 1600,
    sectionGap: 24,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "chips", value: "8px" },
  ],
  surfaces: [
    { level: 0, name: "Mist", value: "#f9fafb", purpose: "内容画布" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "KPI 卡、图表、表格" },
    { level: 2, name: "Rail", value: "#111827", purpose: "侧边导航" },
  ],
  elevation: [
    { name: "Card", value: "0 1px 2px rgba(17,24,39,0.06)" },
    { name: "Hover", value: "0 4px 12px rgba(17,24,39,0.08)" },
  ],
  components: [
    {
      name: "KPI Card",
      role: { zh: "顶部指标卡", en: "Top-row metric card" },
      construction: {
        zh: "白底、12px 圆角、1px #f3f4f6 描边、内边距 20px、阴影 0 1px 2px。第一行 13px 灰字指标名，右侧变化率芯片（11px、500 字重、10% 绿或红底、8px 圆角、padding 2px 8px）；第二行 36px/700 数字，用 tabular-nums；第三行 11px 灰字对比说明。hover 时底色转 #f9fafb、阴影升到 0 4px 12px。",
        en: "White fill, 12px radius, 1px #f3f4f6 border, 20px padding, shadow 0 1px 2px. The first row holds a 13px grey metric name with a change chip on the right (11px at weight 500, 10% green or red ground, 8px radius, 2px 8px padding); the second row is a 36px/700 figure in tabular-nums; the third a 11px grey comparison note. Hover shifts the ground to #f9fafb and raises the shadow to 0 4px 12px.",
      },
      states: "hover: ground #f9fafb, shadow up",
    },
    {
      name: "Chart Panel",
      role: { zh: "折线、柱状与面积图容器", en: "Line, bar and area chart container" },
      construction: {
        zh: "白底、12px 圆角、1px 描边、内边距 16px。标题 20px/600 与图例同行，图例 11px、色点 8px 圆角。图表本身不留网格竖线，只留水平虚线 1px #f3f4f6。高度固定 280px 或 320px，避免容器抖动。",
        en: "White fill, 12px radius, 1px border, 16px padding. A 20px/600 title shares a row with the legend, which uses 11px labels and 8px color dots. The chart carries horizontal 1px dashed rules only — no vertical grid. Height is fixed at 280px or 320px so the container never jumps.",
      },
    },
    {
      name: "Data Table",
      role: { zh: "明细表与活动流", en: "Detail tables and activity feeds" },
      construction: {
        zh: "白底、12px 圆角、1px 描边。表头 11px/500 全大写 0.04em、灰底 #f9fafb、高 36px；行高 44px、行间 1px #f3f4f6 分隔、hover 行底色 #f9fafb。数值列右对齐并用等宽字体，状态列用 10% 底芯片。",
        en: "White fill, 12px radius, 1px border. Headers are 11px/500 uppercase at 0.04em on a #f9fafb ground, 36px tall; rows are 44px with 1px #f3f4f6 dividers and a #f9fafb hover. Numeric columns right-align in monospace and status columns use 10% chips.",
      },
    },
    {
      name: "Sidebar Rail",
      role: { zh: "左侧导航", en: "Left navigation" },
      construction: {
        zh: "宽 240px、近黑填充、白字 70%、固定。项目高 40px、8px 圆角、图标 18px；选中项白 10% 底配纯白，hover 白 6%。分组之间 24px 间距加 1px 白 8% 分隔线。",
        en: "240px wide in near black with text at 70% white, pinned. Items are 40px tall on an 8px radius with 18px icons; selection fills 10% white with pure white text and hover fills 6%. Groups sit 24px apart behind a 1px divider at 8% white.",
      },
    },
  ],
  imagery: {
    zh: "图表是主要视觉元素，不用摄影。允许头像、产品缩略图与图标。图表配色必须与强调色同源，不用离线彩虹色。",
    en: "Charts are the imagery; photography is absent. Avatars, product thumbnails and icons are fine. Chart palettes must derive from the accent family, never a rainbow.",
  },
  layout: {
    zh: "侧栏 240px 固定，内容区上限 1600px、内边距 24px。顶部 KPI 行为 12 栏栅格，3 到 4 张卡等宽；下面图表区两栏 2:1；表格满宽。区块间距 24px，卡片间距 16px。",
    en: "A fixed 240px rail beside content capped at 1600px with 24px padding. The KPI row runs on a twelve-column grid with three or four equal cards; charts split 2:1 beneath it; tables span full width. Sections sit 24px apart, cards 16px.",
  },
  dos: [
    { zh: "KPI 卡只放名称、数字、变化率三件事", en: "A KPI card holds the name, the figure and the change — nothing else" },
    { zh: "数字用 tabular-nums 保证列对齐", en: "Figures use tabular-nums so columns line up" },
    { zh: "变化率用 10% 底色芯片，不用箭头与强调色块", en: "Change rates use 10% chips, not arrows or solid chips" },
    { zh: "图表只留水平虚线，不放竖网格", en: "Charts keep horizontal dashed rules and no vertical grid" },
    { zh: "表格行高 44px，数值右对齐", en: "Rows are 44px and numeric columns right-align" },
    { zh: "图表高度固定，避免布局抖动", en: "Fix chart height so the layout never jumps" },
  ],
  donts: [
    { zh: "不要在一张 KPI 卡里塞图表或按钮", en: "Never put a chart or a button inside a KPI card" },
    { zh: "不要用彩虹配色区分数据系列", en: "Do not distinguish series with a rainbow" },
    { zh: "不要用超过 12px 的卡片圆角", en: "No card radius above 12px" },
    { zh: "不要用重阴影或发光", en: "No heavy shadows or glow" },
    { zh: "不要让表格行高低于 40px", en: "Never take table rows below 40px" },
    { zh: "不要把筛选器藏在二级菜单里", en: "Do not bury filters in a secondary menu" },
  ],
  promptGuide: {
    quickColors: {
      text: "#111827",
      background: "#f9fafb",
      card: "#ffffff",
      accent: "#6366f1",
      positive: "#10b981",
      negative: "#ef4444",
    },
    prompts: [
      {
        zh: "做一个仪表盘 KPI 行：三张白卡（12px 圆角、1px #f3f4f6 描边、内边距 20px、阴影 0 1px 2px rgba(17,24,39,0.06)）。每张卡第一行是 13px #6b7280 指标名，右侧 11px 变化率芯片（10% 绿底 + #10b981 文字、8px 圆角、padding 2px 8px）；第二行 36px/700 数字，font-variant-numeric: tabular-nums；第三行 11px #9ca3af 对比说明。hover 时底色 #f9fafb、阴影升到 0 4px 12px。",
        en: "Build a dashboard KPI row: three white cards (12px radius, 1px #f3f4f6 border, 20px padding, shadow 0 1px 2px rgba(17,24,39,0.06)). The first row is a 13px #6b7280 metric name with an 11px change chip on the right (10% green ground, #10b981 text, 8px radius, 2px 8px padding); the second is a 36px/700 figure with tabular-nums; the third is an 11px #9ca3af comparison. Hover shifts the ground to #f9fafb and the shadow to 0 4px 12px.",
      },
    ],
  },
  similar: [
    { name: "Linear", why: { zh: "同样的深色侧栏与应用级密度", en: "Same dark rail and application density" } },
    { name: "Stripe", why: { zh: "同为数据密度高的产品界面，但 Stripe 用紫与网格背景", en: "Also a dense product surface, though Stripe uses violet and a grid backdrop" } },
  ],
  completeness: "full",
};
