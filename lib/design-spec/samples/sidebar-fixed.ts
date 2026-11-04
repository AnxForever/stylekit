import type { DesignSpec } from "../types";

export const sidebarFixedSpec: DesignSpec = {
  slug: "sidebar-fixed",
  name: "固定侧边栏布局",
  nameEn: "Fixed Sidebar",
  cover: "/styles/sidebar-fixed.svg",
  theme: "light",
  northStar: {
    zh: "一条 240px 的常驻侧边栏，主区只负责滚动内容。",
    en: "A permanent 240px sidebar with a content column that does nothing but scroll.",
  },
  summary: {
    zh: "固定侧边栏是一种结构风格而非视觉风格：导航常驻左侧 240px（收起时 64px），主内容区独立滚动，顶栏只放搜索与账号。视觉上它几乎是中性的——白卡、浅描边、一级阴影、8 到 12px 圆角，全部为结构与可扫描性让路。选中项用主色 10% 底配主色文字，hover 只加深到 6%，150ms 内完成。密度是关键：侧边栏项目高 40px、主区卡片内边距 24px。",
    en: "Fixed Sidebar is a structural style, not a visual one: a permanent 240px navigation rail (64px when collapsed), an independently scrolling content column, and a top bar that only holds search and account. Visually it stays close to neutral — white cards, hairline borders, one shadow step, 8 to 12px radii — all in service of structure and scannability. The selected item takes a 10% primary ground with primary text; hover only deepens it to 6%, within 150ms. Density is the point: 40px nav items and 24px card padding.",
  },
  colors: [
    {
      name: "石墨蓝",
      nameEn: "Slate Ink",
      value: "#1e293b",
      group: "brand",
      role: {
        zh: "侧边栏底色、标题与主按钮。深而不黑，避免长时间使用疲劳。",
        en: "Sidebar ground, headings and primary buttons — deep without being black, easier to live in.",
      },
      token: "--color-slate-ink",
    },
    {
      name: "纸灰",
      nameEn: "Paper Grey",
      value: "#f8fafc",
      group: "surface",
      role: {
        zh: "主内容区底色。白卡浮在它上面。",
        en: "Content-column ground that white cards lift off.",
      },
      token: "--color-paper-grey",
    },
    {
      name: "卡白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "卡片、面板与浮层。全站唯一的高光面。",
        en: "Cards, panels and overlays — the only bright surface.",
      },
      token: "--color-card-white",
    },
    {
      name: "主蓝",
      nameEn: "Primary Blue",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "选中项、链接与焦点环。不做大面积填充。",
        en: "Selection, links and focus rings; never a large fill.",
      },
      token: "--color-primary-blue",
    },
    {
      name: "状态绿",
      nameEn: "Status Green",
      value: "#10b981",
      group: "accent",
      role: { zh: "在线与成功状态，小面积圆点或徽标。", en: "Presence and success as small dots or badges." },
      token: "--color-status-green",
    },
    {
      name: "告警红",
      nameEn: "Alert Red",
      value: "#ef4444",
      group: "accent",
      role: { zh: "错误与未读数，只用于计数与图标。", en: "Errors and unread counts, used on figures and icons only." },
      token: "--color-alert-red",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 13, 14, 16, 20, 28],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.55 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "全站唯一字体，字级偏小（13 到 14px 为主），这是应用密度而非网页密度。",
        en: "The only face, running small — 13 to 14px — at application density rather than web density.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 28, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 20, lineHeight: 1.3, token: "--text-heading" },
    { role: "body-lg", weight: 500, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1440,
    sectionGap: 32,
    cardPadding: 24,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "nav-items", value: "8px" },
  ],
  surfaces: [
    { level: 0, name: "Sidebar Ink", value: "#1e293b", purpose: "常驻导航栏" },
    { level: 1, name: "Paper Grey", value: "#f8fafc", purpose: "内容区底色" },
    { level: 2, name: "Card White", value: "#ffffff", purpose: "卡片与面板" },
  ],
  elevation: [
    { name: "Card", value: "0 1px 2px rgba(15,23,42,0.06)" },
    { name: "Hover", value: "0 8px 20px rgba(15,23,42,0.08)" },
    { name: "Sidebar", value: "0 0 0 1px rgba(15,23,42,0.06)" },
  ],
  components: [
    {
      name: "Sidebar Rail",
      role: { zh: "常驻侧边导航", en: "The permanent navigation rail" },
      construction: {
        zh: "宽 240px（收起 64px）、石墨蓝填充、白字 70%、固定不随内容滚动。项目高 40px、8px 圆角、水平内边距 12px、图标 18px、图标与文字间距 10px。选中项用白 10% 底配纯白文字，hover 用白 6% 底，过渡 150ms。分区之间留 24px 并加一条 1px 白 8% 分隔线。",
        en: "240px wide (64px collapsed) in slate ink with text at 70% white, pinned while content scrolls. Items are 40px tall on an 8px radius with 12px horizontal padding, an 18px icon and a 10px gap. Selection fills 10% white with pure white text; hover fills 6%, over 150ms. Groups sit 24px apart behind a 1px divider at 8% white.",
      },
      sizes: "240px / 64px collapsed; item 40px",
      states: "hover: 6% white; selected: 10% white + white text",
    },
    {
      name: "Content Card",
      role: { zh: "主区内容卡与列表容器", en: "Content cards and list containers" },
      construction: {
        zh: "白底、12px 圆角、1px #e4e4e7 描边、内边距 24px、阴影 0 1px 2px。标题 20px/600，正文 14px 灰。hover 上浮 2px、阴影升到 0 8px 20px，过渡 150ms。",
        en: "White fill, 12px radius, 1px #e4e4e7 border, 24px padding, shadow 0 1px 2px. Title at 20px/600, body at 14px grey. Hover lifts 2px and raises the shadow to 0 8px 20px, over 150ms.",
      },
    },
    {
      name: "Search Field",
      role: { zh: "顶栏搜索", en: "Toolbar search" },
      construction: {
        zh: "纸灰底、1px #e4e4e7 描边、8px 圆角、高 36px、左内边距 36px 放 16px 图标、13px 字。聚焦时描边转主蓝并加 2px 主蓝 20% 外环。",
        en: "Paper grey fill, 1px #e4e4e7 border, 8px radius, 36px tall, 36px left padding for a 16px icon, 13px type. Focus turns the border primary blue and adds a 2px ring at 20% blue.",
      },
    },
    {
      name: "Toolbar",
      role: { zh: "顶栏", en: "Top bar" },
      construction: {
        zh: "高 56px、白底、底部 1px #e4e4e7 描边、无阴影。左侧面包屑 13px，中间搜索框最大 360px，右侧图标按钮 32px 见方、8px 圆角。",
        en: "56px tall, white fill, a 1px #e4e4e7 border along the bottom, no shadow. Breadcrumb at 13px on the left, a search field capped at 360px in the middle, and 32px icon buttons on an 8px radius on the right.",
      },
    },
  ],
  imagery: {
    zh: "以界面截图、头像与图标为主，几乎不出现摄影。侧边栏允许 18px 线性图标，主区允许产品截图。不使用装饰性插画与大图，它们会挤掉结构感。",
    en: "Interface screenshots, avatars and icons — photography is almost absent. The rail takes 18px line icons and the content area takes product shots. No decorative illustration or large imagery; both crowd out the structure.",
  },
  layout: {
    zh: "左侧 240px 固定栏加右侧自适应内容区，顶栏 56px 固定在内容区顶部。内容区最大宽度 1200px、内边距 24px，卡片间距 16px。断点 1024px 以下侧边栏收起为 64px，768px 以下改为抽屉。",
    en: "A fixed 240px rail beside a fluid content column, with a 56px toolbar pinned to the top of that column. Content caps at 1200px with 24px padding and 16px card gaps. Below 1024px the rail collapses to 64px; below 768px it becomes a drawer.",
  },
  dos: [
    { zh: "侧边栏固定，内容区独立滚动", en: "Pin the rail and let the content column scroll on its own" },
    { zh: "侧边栏项目 40px 高，保持应用密度", en: "Keep rail items at 40px for application density" },
    { zh: "选中态用主色 10% 底而不是实色", en: "Selection uses a 10% primary ground, not a solid fill" },
    { zh: "卡片用 1px 描边加一级阴影", en: "Cards take a 1px border plus one shadow step" },
    { zh: "顶栏只放搜索、面包屑与账号", en: "The toolbar holds search, breadcrumb and account only" },
    { zh: "过渡 150ms，快而不突兀", en: "Transitions run 150ms — quick without snapping" },
  ],
  donts: [
    { zh: "不要让侧边栏跟随内容滚动", en: "Never let the rail scroll with the content" },
    { zh: "不要把主内容塞进侧边栏", en: "Never put primary content in the rail" },
    { zh: "不要用超过 12px 的卡片圆角", en: "No card radius above 12px" },
    { zh: "不要在顶栏堆超过三个动作", en: "No more than three actions in the toolbar" },
    { zh: "不要用大面积主色填充", en: "No large primary fills" },
    { zh: "不要在侧边栏用两套以上图标风格", en: "Never mix more than one icon style in the rail" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1e293b",
      background: "#f8fafc",
      card: "#ffffff",
      rail: "#1e293b",
      accent: "#3b82f6",
      border: "#e4e4e7",
    },
    prompts: [
      {
        zh: "做一个固定侧边栏布局：左侧 240px 石墨蓝 #1e293b 固定栏（白字 70%，项目高 40px、8px 圆角、选中白 10% 底），右侧内容区底色 #f8fafc、顶部 56px 白色工具栏（底部 1px #e4e4e7）。内容区卡片白底、12px 圆角、1px #e4e4e7 描边、内边距 24px、阴影 0 1px 2px rgba(15,23,42,0.06)。所有过渡 150ms。",
        en: "Build a fixed-sidebar layout: a 240px slate-ink rail (#1e293b) with text at 70% white, 40px items on an 8px radius and a 10% white selection, beside a content column on #f8fafc with a 56px white toolbar and a 1px #e4e4e7 bottom border. Content cards are white with a 12px radius, 1px #e4e4e7 border, 24px padding and a shadow of 0 1px 2px rgba(15,23,42,0.06). Every transition runs 150ms.",
      },
    ],
  },
  similar: [
    { name: "Linear", why: { zh: "同样的固定侧栏密度与克制的选中态", en: "Same rail density and restrained selection" } },
    { name: "Notion Style", why: { zh: "同为文档型结构，但 Notion 侧栏可折叠且更轻", en: "Also document-shaped, though Notion's rail collapses and stays lighter" } },
  ],
  completeness: "full",
};
