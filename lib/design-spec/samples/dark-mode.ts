import type { DesignSpec } from "../types";

export const darkModeSpec: DesignSpec = {
  slug: "dark-mode",
  name: "暗黑模式",
  nameEn: "Dark Mode",
  cover: "/styles/dark-mode.svg",
  theme: "dark",
  northStar: {
    zh: "深板岩底上的一支蓝，靠内发光而不是投影说明层次。",
    en: "One blue on a slate ground, where inner glow rather than cast shadow explains depth.",
  },
  summary: {
    zh: "暗黑模式不是把白色反过来，而是重建一套明度秩序：最深的一层是 #0f172a（绝不用纯黑，纯黑会让阴影失效），往上每一级只提亮 4% 到 6%，最多三级。边框用 1px 的白色 6% 到 10%，靠它切分区块而不是靠阴影。所有发光都朝内：按钮顶边一层 inset 白色高光，模拟屏幕自下而上的光，这才是暗色界面里真实的物理。强调色只有一支蓝，其余（绿、橙、红）仅作为状态。",
    en: "Dark Mode is not white inverted; it rebuilds a luminance order. The base is #0f172a — never pure black, because pure black kills shadow — and each level above lifts only four to six percent, at most three levels. Borders are 1px white at 6% to 10%, and they divide regions instead of shadows. All glow points inward: a button carries an inset white highlight along its top edge, modelling light coming from the screen itself, which is what actually happens on a dark surface. One blue carries emphasis; green, orange and red appear only as states.",
  },
  colors: [
    {
      name: "深板岩",
      nameEn: "Deep Slate",
      value: "#0f172a",
      group: "surface",
      role: {
        zh: "页面底，全站最深的一层。用它替代纯黑，阴影才有落点。",
        en: "The page base and the deepest layer. Using it instead of black gives shadows somewhere to land.",
      },
      token: "--color-deep-slate",
    },
    {
      name: "石板 800",
      nameEn: "Slate 800",
      value: "#1e293b",
      group: "surface",
      role: {
        zh: "卡片与面板。比底色亮 4%，是主要的承载层。",
        en: "Cards and panels, four percent above the base — the main carrying layer.",
      },
      token: "--color-slate-800",
    },
    {
      name: "石板 700",
      nameEn: "Slate 700",
      value: "#334155",
      group: "surface",
      role: {
        zh: "浮层与 hover 态。第三级，不再往上加。",
        en: "Overlays and hover states, the third and final level.",
      },
      token: "--color-slate-700",
    },
    {
      name: "主蓝",
      nameEn: "Primary Blue",
      value: "#3b82f6",
      group: "brand",
      role: {
        zh: "主行动、链接与选中态。深底上要提起一档亮度才够读。",
        en: "Primary actions, links and selection; on dark it needs one step more brightness to read.",
      },
      token: "--color-primary-blue",
    },
    {
      name: "状态绿",
      nameEn: "State Green",
      value: "#22c55e",
      group: "accent",
      role: { zh: "成功与在线，用 15% 底配实色文字。", en: "Success and presence, rendered as 15% ground with solid text." },
      token: "--color-state-green",
    },
    {
      name: "状态橙",
      nameEn: "State Amber",
      value: "#f59e0b",
      group: "accent",
      role: { zh: "警告与待处理，只在图标与徽标上出现。", en: "Warnings and pending items, on icons and badges only." },
      token: "--color-state-amber",
    },
    {
      name: "状态红",
      nameEn: "State Red",
      value: "#ef4444",
      group: "accent",
      role: { zh: "错误与删除，出现即代表代价。", en: "Errors and deletion; its presence implies cost." },
      token: "--color-state-red",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 30, 40, 60],
      lineHeight: { display: 1.1, heading: 1.25, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。暗底上需要比亮色版更宽松的行高（1.6）与略低的最大字重，避免光晕。",
        en: "The only face. On dark it needs looser leading (1.6) and a slightly lower maximum weight to avoid halation.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 60, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 40, lineHeight: 1.15, tracking: "-0.015em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 30, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
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
    { level: 0, name: "Deep Slate", value: "#0f172a", purpose: "页面底" },
    { level: 1, name: "Slate 800", value: "#1e293b", purpose: "卡片与面板" },
    { level: 2, name: "Slate 700", value: "#334155", purpose: "浮层与 hover" },
  ],
  elevation: [
    { name: "Card", value: "none — 1px border carries it" },
    { name: "Card hover", value: "0 8px 30px rgba(0,0,0,0.50)" },
    { name: "Inset glow", value: "inset 0 1px 0 rgba(255,255,255,0.15)" },
  ],
  components: [
    {
      name: "Primary Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "主蓝填充、白字、8px 圆角、无描边。字级 14px、字重 500、padding 8px 16px。核心是顶边内高光：inset 0 1px 0 白 15%，模拟屏幕自身的光。hover 时填充提亮到蓝 500 并叠一层 0 0 10px 蓝 30% 的外发光；按下缩放 0.98，内阴影换成 inset 0 2px 4px 黑 30%。过渡 200ms ease-out。",
        en: "Primary blue fill, white text, 8px radius, no border. 14px type at weight 500, 8px 16px padding. The key is the inset top highlight — inset 0 1px 0 at 15% white — modelling light from the screen itself. Hover brightens the fill and adds a 0 0 10px glow at 30% blue; press scales 0.98 and swaps to inset 0 2px 4px at 30% black. 200ms ease-out.",
      },
      sizes: "padding 8px 16px; label 14px",
      states: "hover: brighter fill + outer glow; active: inset shadow, scale 0.98",
    },
    {
      name: "Surface Card",
      role: { zh: "内容卡与列表容器", en: "Content card and list container" },
      construction: {
        zh: "石板 800 的 50% 填充、1px 石板 700 描边、12px 圆角、内边距 24px，无阴影——暗色里阴影几乎不可见，靠描边分层。hover 时填充升到完全不透明、描边转石板 500、上浮 2px、加 0 8px 30px 黑 50%。过渡 300ms ease-out。",
        en: "Slate 800 at 50% fill, a 1px slate 700 border, 12px radius, 24px padding, no shadow — shadows barely register on dark, so the border does the layering. Hover takes the fill to full opacity, the border to slate 500, lifts 2px and adds 0 8px 30px at 50% black. 300ms ease-out.",
      },
      states: "hover: fill opaque, border lighter, lift 2px",
    },
    {
      name: "Dark Input",
      role: { zh: "表单与搜索", en: "Forms and search" },
      construction: {
        zh: "石板 800 填充、1px 石板 700 描边、8px 圆角、padding 8px 12px、14px 字。占位符用石板 400。聚焦时描边转主蓝并加 2px 主蓝 30% 外环，焦点环 offset 用深板岩本色以免出现白边。",
        en: "Slate 800 fill, a 1px slate 700 border, 8px radius, 8px 12px padding at 14px. The placeholder sits in slate 400. Focus turns the border primary blue and adds a 2px ring at 30% blue, with the offset painted in deep slate so no white edge appears.",
      },
    },
    {
      name: "Status Chip",
      role: { zh: "状态与分类标记", en: "Status and category markers" },
      construction: {
        zh: "全圆角、12px 字、500 字重、padding 2px 10px。成功用绿 15% 底配绿 400 文字，警告用橙 15% 配橙 400，错误用红 15% 配红 400。必须带一个小圆点，不只靠色相传达状态。",
        en: "Fully rounded, 12px type at weight 500, 2px 10px padding. Success uses a 15% green ground with green 400 text, warning 15% amber, error 15% red. Each carries a dot so status never rests on hue alone.",
      },
    },
  ],
  imagery: {
    zh: "产品界面截图与暗色场景摄影。允许在 hero 使用一层极暗的径向渐变光。所有素材必须本身偏暗，把亮部留给界面。不使用白底图、彩色插画与大面积纯色块。",
    en: "Product interface shots and dark-scene photography. A very dark radial glow may back the hero. Every asset must already be dark so the highlights belong to the interface. No white-background images, color illustration or large flat blocks.",
  },
  layout: {
    zh: "上限 1200px、12 栏、容器内边距 24px，区块间距 96px。区块之间用 1px 白色 6% 的分隔线而不是阴影。允许侧栏与主区同时存在，但两者明度至少相差一级。",
    en: "Capped at 1200px over twelve columns with 24px padding, sections 96px apart. Sections divide with a 1px white line at 6% rather than a shadow. A rail may sit beside the content, but the two must differ by at least one luminance level.",
  },
  dos: [
    { zh: "用深板岩 #0f172a 而不是纯黑做底", en: "Ground in deep slate #0f172a, not pure black" },
    { zh: "明度分三级，每级只差 4% 到 6%", en: "Keep three luminance levels, four to six percent apart" },
    { zh: "用 1px 白色 6% 到 10% 的描边分层", en: "Layer with 1px white borders at 6% to 10%" },
    { zh: "按钮带顶边内高光", en: "Buttons carry a top-edge inset highlight" },
    { zh: "正文行高 1.6，字重不超过 700", en: "Body leading at 1.6 and weight at 700 or below" },
    { zh: "焦点环的 offset 用底色而不是白色", en: "Paint the focus offset in the ground color, not white" },
  ],
  donts: [
    { zh: "不要用纯黑 #000000 做底", en: "Never ground in pure black #000000" },
    { zh: "不要靠投影分层，暗色里看不见", en: "Do not rely on shadows for layering; they vanish on dark" },
    { zh: "不要把状态色当装饰色", en: "Never use state colors as decoration" },
    { zh: "不要用低于 4.5:1 的正文对比", en: "No body contrast below 4.5:1" },
    { zh: "不要用纯白文字，用 90% 到 95%", en: "Avoid pure white text; use 90% to 95%" },
    { zh: "不要在暗底上使用亮色大色块", en: "No large bright blocks on a dark ground" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e2e8f0",
      background: "#0f172a",
      card: "#1e293b",
      accent: "#3b82f6",
      muted: "#94a3b8",
      border: "rgba(255,255,255,0.08)",
    },
    prompts: [
      {
        zh: "做一个暗色卡片：背景 #1e293b（可用 50% 不透明）、1px rgba(255,255,255,0.08) 描边、12px 圆角、内边距 24px、无阴影。标题 20px/600 #e2e8f0，正文 14px #94a3b8。hover 时背景变完全不透明、描边升到 rgba(255,255,255,0.16)、translateY(-2px)、加 0 8px 30px rgba(0,0,0,0.5)。页面底色 #0f172a。",
        en: "Build a dark card: background #1e293b (50% opacity is fine), 1px rgba(255,255,255,0.08) border, 12px radius, 24px padding, no shadow. Title at 20px/600 in #e2e8f0, body at 14px in #94a3b8. Hover makes the fill opaque, raises the border to rgba(255,255,255,0.16), translates -2px and adds 0 8px 30px rgba(0,0,0,0.5). The page ground is #0f172a.",
      },
    ],
  },
  similar: [
    { name: "macOS Vibrancy", why: { zh: "同为暗色分层，但那边有系统材质与衬线标题", en: "Also layers on dark, though that one adds system material and serif titles" } },
    { name: "Linear", why: { zh: "同样的深底加单一强调色，Linear 更强调发光", en: "Same dark ground with one accent, though Linear leans harder on glow" } },
  ],
  completeness: "full",
};
