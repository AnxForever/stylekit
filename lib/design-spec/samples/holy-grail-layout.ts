import type { DesignSpec } from "../types";

export const holyGrailLayoutSpec: DesignSpec = {
  slug: "holy-grail-layout",
  name: "圣杯布局",
  nameEn: "Holy Grail Layout",
  cover: "/styles/holy-grail-layout.svg",
  theme: "light",
  northStar: {
    zh: "页头、三栏、页脚：网页布局的原型，二十五年没过时。",
    en: "Header, three columns, footer — the web's original layout, and it has not aged.",
  },
  summary: {
    zh: "圣杯布局是最早被讨论的网页结构：固定页头、等高的三栏中段（左导航、中间主内容、右侧边栏）、固定页脚。它的价值不在视觉而在分配——中间列用弹性宽度吃掉剩余空间，两侧列固定宽度，页头页脚不随内容滚动。视觉必须保持中性：白卡、1px 描边、一级阴影、8 到 12px 圆角，全部为可读性让路。中段三列高度必须相等，靠 grid 的 stretch 而不是 min-height 硬撑。",
    en: "The holy grail is the first layout the web argued about: fixed header, equal-height three-column middle (left nav, main content, right rail), fixed footer. Its value is allocation, not looks — the centre column flexes to eat the remaining width, the sides hold fixed widths, and header and footer stay put while content scrolls. Visuals stay neutral: white cards, 1px borders, one shadow step, 8 to 12px radii, all serving legibility. The three middle columns must match in height through grid stretch, never a forced min-height.",
  },
  colors: [
    {
      name: "墨板岩",
      nameEn: "Slate Ink",
      value: "#1e293b",
      group: "brand",
      role: {
        zh: "标题、主按钮与页头文字。结构型布局需要一支足够稳的深色。",
        en: "Headings, primary buttons and header text — a structural layout needs one steady dark.",
      },
      token: "--color-slate-ink",
    },
    {
      name: "浅雾",
      nameEn: "Haze",
      value: "#f1f5f9",
      group: "surface",
      role: {
        zh: "中段三列的共同底色。白卡浮在它上面。",
        en: "The shared ground behind all three columns, with white cards lifting off it.",
      },
      token: "--color-haze",
    },
    {
      name: "卡白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "页头、页脚、卡片与侧栏面板的填充。",
        en: "Header, footer, cards and sidebar panels.",
      },
      token: "--color-card-white",
    },
    {
      name: "主蓝",
      nameEn: "Primary Blue",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "主行动、链接与焦点环。三栏里唯一允许的强调色。",
        en: "Primary actions, links and focus rings — the only accent across the three columns.",
      },
      token: "--color-primary-blue",
    },
    {
      name: "成功绿",
      nameEn: "Success",
      value: "#10b981",
      group: "accent",
      role: {
        zh: "状态与完成标记，只用于徽标。",
        en: "Status and completion marks, on badges only.",
      },
      token: "--color-success",
    },
    {
      name: "警示橙",
      nameEn: "Warning",
      value: "#f59e0b",
      group: "accent",
      role: {
        zh: "提醒与待办，用于侧栏的计数与提示。",
        en: "Nudges and pending items, on rail counters and notices.",
      },
      token: "--color-warning",
    },
    {
      name: "错误红",
      nameEn: "Danger",
      value: "#ef4444",
      group: "accent",
      role: {
        zh: "错误与删除，出现即表示代价。",
        en: "Errors and deletion; its presence implies cost.",
      },
      token: "--color-danger",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 13, 14, 16, 20, 28],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "全站唯一字体，字级偏应用化（13 到 14px 为主）。三栏并存时字太大反而难读。",
        en: "The only face, sized like an application (13 to 14px). With three columns alive, larger type hurts more than it helps.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 28, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 20, lineHeight: 1.3, token: "--text-heading" },
    { role: "body-lg", weight: 500, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48],
    maxWidth: 1440,
    sectionGap: 24,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "panels", value: "12px" },
  ],
  surfaces: [
    { level: 0, name: "Haze", value: "#f1f5f9", purpose: "中段底色" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "卡片、侧栏面板" },
    { level: 2, name: "Header White", value: "#ffffff", purpose: "页头与页脚（带下边框）" },
  ],
  elevation: [
    { name: "Card", value: "0 1px 2px rgba(15,23,42,0.06)" },
    { name: "Card hover", value: "0 4px 12px rgba(15,23,42,0.08)" },
    { name: "Header", value: "0 1px 2px rgba(15,23,42,0.04)" },
  ],
  components: [
    {
      name: "Three Column Grid",
      role: { zh: "中段三列容器", en: "The three-column middle" },
      construction: {
        zh: "grid-template-columns: 240px minmax(0, 1fr) 280px；列间距 24px；三列高度由 grid 的 stretch 拉齐，禁止用 min-height 硬撑。窄于 1024px 时右栏折叠到主内容下方，窄于 768px 时左栏变为抽屉。",
        en: "grid-template-columns: 240px minmax(0, 1fr) 280px with a 24px gutter. Height is equalised by grid stretch; never force it with min-height. Below 1024px the right rail drops under the main column, and below 768px the left column becomes a drawer.",
      },
      sizes: "240px / fluid / 280px",
    },
    {
      name: "Content Card",
      role: { zh: "主内容卡", en: "Main content card" },
      construction: {
        zh: "白底、12px 圆角、1px #f1f5f9 描边、内边距 20px、阴影 0 1px 2px。标题 20px/600，正文 14px。hover 上浮 2px、阴影升到 0 4px 12px，过渡 150ms ease-out。",
        en: "White fill, 12px radius, a 1px #f1f5f9 border, 20px padding, shadow 0 1px 2px. Title at 20px/600, body at 14px. Hover lifts 2px and raises the shadow to 0 4px 12px over 150ms ease-out.",
      },
    },
    {
      name: "Rail Panel",
      role: { zh: "侧栏面板（左导航与右信息栏）", en: "Sidebar panel, both rails" },
      construction: {
        zh: "白底、12px 圆角、无描边（靠底色差区分）、内边距 16px。分组标签 12px 全大写 0.04em 灰字，项目高 32px、8px 圆角、hover 浅雾底。选中项用主蓝 8% 底配主蓝文字。",
        en: "White fill, 12px radius, no border (the ground difference separates it), 16px padding. Group labels sit at 12px uppercase 0.04em in grey; items are 32px tall on an 8px radius with a haze hover. Selection uses an 8% primary ground with primary text.",
      },
    },
    {
      name: "Sticky Header",
      role: { zh: "页头", en: "Header" },
      construction: {
        zh: "高 56px、白底、底部 1px #e2e8f0 描边、阴影 0 1px 2px，sticky 固定在顶部。左侧字标 16px/600，中间导航 13px、间距 24px，右侧一个主按钮与一个头像。",
        en: "56px tall, white fill, a 1px #e2e8f0 bottom border, shadow 0 1px 2px, stuck to the top. Wordmark at 16px/600 on the left, 13px navigation 24px apart in the middle, one primary button and an avatar on the right.",
      },
    },
    {
      name: "Fixed Footer",
      role: { zh: "页脚", en: "Footer" },
      construction: {
        zh: "高 48px、白底、顶部 1px #e2e8f0 描边、12px 灰字。左侧版本号，右侧三到四条链接，与主内容同为 1440px 上限对齐。",
        en: "48px tall, white fill, a 1px #e2e8f0 top border, 12px grey text. A version string on the left and three or four links on the right, aligned to the same 1440px cap as the content.",
      },
    },
  ],
  imagery: {
    zh: "以图标、头像与产品截图为主，几乎没有大图。允许在主内容列放一张宽度铺满的截图。不使用全幅摄影、背景纹理与插画，它们会挤压三栏的可用宽度。",
    en: "Icons, avatars and product screenshots — large imagery is nearly absent. The main column may take one full-width screenshot. No full-bleed photography, background texture or illustration; each squeezes the width all three columns depend on.",
  },
  layout: {
    zh: "页头 56px、中段三栏（240px / 弹性 / 280px）、页脚 48px，整页上限 1440px、内边距 24px。中段最小高度为视口高度减去页头页脚。三栏各自独立滚动是可选项，但默认整页滚动。",
    en: "A 56px header, three middle columns at 240px / fluid / 280px, and a 48px footer, all capped at 1440px with 24px padding. The middle minimum height equals the viewport minus header and footer. Per-column scrolling is optional; the default is one page scroll.",
  },
  dos: [
    { zh: "中列弹性、两侧固定", en: "Flex the centre, fix the sides" },
    { zh: "三列等高用 grid stretch", en: "Equalise column heights with grid stretch" },
    { zh: "页头页脚固定，不随内容滚动", en: "Pin header and footer" },
    { zh: "焦点环 2px 带 offset", en: "Focus rings are 2px with an offset" },
    { zh: "动效不超过 200ms", en: "Motion stays under 200ms" },
    { zh: "窄屏折叠右栏，再窄转抽屉", en: "Drop the right rail first, then turn the left into a drawer" },
  ],
  donts: [
    { zh: "不要用 min-height 硬撑三列高度", en: "Do not force equal heights with min-height" },
    { zh: "不要在主内容列加大幅位移动画", en: "No large displacement animation in the content column" },
    { zh: "不要让三列各自滚动加页面滚动", en: "Do not stack per-column scrolling on top of page scrolling" },
    { zh: "不要在三栏里塞第四栏", en: "Never add a fourth column" },
    { zh: "不要省略页头的 sticky", en: "Do not drop the sticky header" },
    { zh: "不要用超过 12px 的面板圆角", en: "No panel radius above 12px" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1e293b",
      background: "#f1f5f9",
      card: "#ffffff",
      accent: "#3b82f6",
      muted: "#64748b",
      border: "#e2e8f0",
    },
    prompts: [
      {
        zh: "做一个圣杯布局：外层 min-h-screen flex-col。页头 56px sticky top-0 白底、底部 1px #e2e8f0。中段 grid-template-columns: 240px minmax(0,1fr) 280px、gap 24px、flex-1。三列都用 grid 的 stretch 等高。页脚 48px 白底、顶部 1px #e2e8f0。卡片白底、12px 圆角、内边距 20px、阴影 0 1px 2px rgba(15,23,42,0.06)。",
        en: "Build a holy grail layout: an outer min-h-screen flex-col. The header is 56px, sticky at the top, white with a 1px #e2e8f0 bottom border. The middle uses grid-template-columns: 240px minmax(0,1fr) 280px with a 24px gap and flex-1, all three columns equalising through grid stretch. The footer is 48px white with a 1px #e2e8f0 top border. Cards are white with a 12px radius, 20px padding and a shadow of 0 1px 2px rgba(15,23,42,0.06).",
      },
    ],
  },
  similar: [
    { name: "Fixed Sidebar", why: { zh: "同样是常驻导航结构，但只有两栏", en: "Also a persistent-nav structure, though with two columns instead of three" } },
    { name: "Dashboard Layout", why: { zh: "同为应用型布局，右栏换成图表区", en: "Also an application layout, with the right rail replaced by charts" } },
  ],
  completeness: "full",
};
