import type { DesignSpec } from "../types";

export const fluentDesignSpec: DesignSpec = {
  slug: "fluent-design",
  name: "流利设计",
  nameEn: "Fluent Design",
  cover: "/styles/fluent-design.svg",
  theme: "light",
  northStar: {
    zh: "光、深度、动效、材质、尺度：五个元素叠出一套跨平台的界面语汇。",
    en: "Light, depth, motion, material, scale — five elements stacked into one cross-platform language.",
  },
  summary: {
    zh: "Fluent 是微软那套「材质 + 光」的系统：界面不是平的，而是由亚克力面板、极小的圆角与一层极轻的深度构成。它只用一支主蓝（#0078d4），其余颜色只在状态里出现（黄、红、绿）。圆角刻意做得克制——按钮 2px、卡片 8px、输入 2px，这是它与圆角化风格的区分点。每个可交互元素都必须有 2px 的焦点环并带 offset，这是无障碍底线而非装饰。动效 150ms 到 250ms，强调「响应」而非「表演」。",
    en: "Fluent is Microsoft's material-plus-light system: the interface is not flat but built from acrylic panels, very small radii and a light layer of depth. One primary blue (#0078d4) carries the identity, while the other colors appear only as states — yellow, red, green. Radius is deliberately restrained: 2px buttons, 8px cards, 2px inputs, which is what separates it from the rounded family. Every interactive element carries a 2px focus ring with an offset as an accessibility floor rather than decoration. Motion runs 150ms to 250ms and signals response, not performance.",
  },
  colors: [
    {
      name: "Fluent 蓝",
      nameEn: "Fluent Blue",
      value: "#0078d4",
      group: "brand",
      role: {
        zh: "主行动、链接与焦点环。微软体系里唯一的品牌色，不做渐变。",
        en: "Primary actions, links and focus rings — the single brand color, never used as a gradient.",
      },
      token: "--color-fluent-blue",
    },
    {
      name: "深蓝",
      nameEn: "Deep Blue",
      value: "#106ebe",
      group: "brand",
      role: {
        zh: "hover 态与按下态。同色相压暗一档，保持体积感。",
        en: "Hover and pressed states — the same hue one step darker, preserving volume.",
      },
      token: "--color-deep-blue",
    },
    {
      name: "亚克力白",
      nameEn: "Acrylic White",
      value: "rgba(255,255,255,0.70)",
      group: "surface",
      role: {
        zh: "卡片与面板填充。必须配 20px 模糊，否则失去亚克力质感。",
        en: "Card and panel fill. It requires a 20px blur or the acrylic quality disappears.",
      },
      token: "--color-acrylic",
    },
    {
      name: "警示黄",
      nameEn: "Caution Yellow",
      value: "#ffb900",
      group: "accent",
      role: {
        zh: "警告与需要注意的状态，只用于图标与徽标。",
        en: "Warnings and states that need attention, used on icons and badges only.",
      },
      token: "--color-caution",
    },
    {
      name: "错误红",
      nameEn: "Error Red",
      value: "#e81123",
      group: "accent",
      role: {
        zh: "错误与删除。出现即表示不可撤销。",
        en: "Errors and deletion; appearing at all implies irreversibility.",
      },
      token: "--color-error",
    },
    {
      name: "成功绿",
      nameEn: "Success Green",
      value: "#00cc6a",
      group: "accent",
      role: {
        zh: "成功与完成，多用于对勾与状态条。",
        en: "Success and completion, usually on checks and status bars.",
      },
      token: "--color-success",
    },
  ],
  fonts: [
    {
      family: "Segoe UI Variable",
      substitute: "-apple-system, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 600, 700],
      sizes: [12, 14, 16, 20, 28, 40, 68],
      lineHeight: { display: 1.1, heading: 1.25, body: 1.55 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "全站唯一字体，字重只用 400 与 600。层级靠字号与留白，不靠字重堆叠。",
        en: "The only face, using just 400 and 600. Hierarchy comes from size and spacing rather than weight stacking.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 68, lineHeight: 1.1, tracking: "-0.01em", token: "--text-display" },
    { role: "heading-lg", weight: 600, size: 40, lineHeight: 1.15, token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 600, size: 12, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Page", value: "#f3f2f1", purpose: "页面底色" },
    { level: 1, name: "Acrylic", value: "rgba(255,255,255,0.70)", purpose: "卡片与面板" },
    { level: 2, name: "Solid White", value: "#ffffff", purpose: "弹层与对话框" },
  ],
  elevation: [
    { name: "Card", value: "0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08)" },
    { name: "Card hover", value: "0 4px 8px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.14)" },
    { name: "Focus ring", value: "0 0 0 2px #ffffff, 0 0 0 4px #0078d4" },
  ],
  components: [
    {
      name: "Fluent Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "Fluent 蓝填充、白字、2px 圆角、1px 同色描边。字级 14px、字重 600、padding 10px 24px，阴影 0 2px 4px 蓝 30%。hover 时填充转深蓝、上浮 2px、阴影扩到 0 4px 8px 蓝 40%；按下缩放 0.97、位移归零、阴影移除。焦点环为 2px 蓝加 2px offset。过渡 150ms ease-out。",
        en: "Fluent blue fill, white text, 2px radius, a 1px border in the same hue. 14px type at weight 600, 10px 24px padding, shadow 0 2px 4px at 30% blue. Hover deepens the fill, lifts 2px and widens the shadow to 0 4px 8px at 40%; press scales 0.97, drops the lift and removes the shadow. The focus ring is 2px blue with a 2px offset. 150ms ease-out.",
      },
      sizes: "padding 10px 24px; label 14px",
      states: "hover: lift 2px, deeper fill; active: scale 0.97, no shadow; focus: 2px ring + offset",
    },
    {
      name: "Acrylic Card",
      role: { zh: "内容卡与设置面板", en: "Content card and settings panel" },
      construction: {
        zh: "70% 白填充、20px 模糊、1px 白 30% 描边、8px 圆角、内边距 24px，双层阴影（0 2px 4px 4% 与 0 8px 16px 8%）。图标块 48px 见方、主蓝填充、8px 圆角。hover 时填充升到 85%、描边到 50%、上浮 4px、阴影升到 16px 32px 档。过渡 200ms ease-out。",
        en: "70% white fill, 20px blur, a 1px white border at 30%, 8px radius, 24px padding, with two shadow layers (0 2px 4px at 4% and 0 8px 16px at 8%). The icon tile is 48px square in primary blue on an 8px radius. Hover raises the fill to 85%, the border to 50%, lifts 4px and moves the shadow to the 16px 32px step. 200ms ease-out.",
      },
      states: "hover: fill 70%→85%, lift 4px",
    },
    {
      name: "Fluent Input",
      role: { zh: "表单与搜索", en: "Forms and search" },
      construction: {
        zh: "白底、1px #d1d1d1 描边、2px 圆角、padding 8px 12px、14px 字。下方始终预留 1px 的强调线空间。聚焦时描边转 Fluent 蓝、强调线变 2px 并加 2px offset 焦点环，不改变盒子尺寸。",
        en: "White fill, 1px #d1d1d1 border, 2px radius, 8px 12px padding at 14px. The underline slot is always reserved at 1px. On focus the border turns fluent blue, the underline thickens to 2px and a 2px offset ring appears, without resizing the box.",
      },
    },
    {
      name: "Acrylic Flyout",
      role: { zh: "下拉、菜单与通知浮层", en: "Dropdowns, menus and notification flyouts" },
      construction: {
        zh: "85% 白填充、30px 模糊、1px 白 40% 描边、8px 圆角、内边距 8px，阴影 0 8px 24px 12%。菜单项高 36px、圆角 4px、hover 白 50% 填充并加左侧 3px 主蓝指示条。",
        en: "85% white fill, 30px blur, a 1px white border at 40%, 8px radius, 8px padding, shadow 0 8px 24px at 12%. Items are 36px tall on a 4px radius; hover fills 50% white and adds a 3px primary-blue bar on the left.",
      },
    },
  ],
  imagery: {
    zh: "产品截图、系统图标与抽象几何。允许大面积的柔和光斑作为 hero 背景。图标必须是线性 1.5px 描边，与界面同一套几何语言。不使用写实摄影与装饰插画。",
    en: "Product screenshots, system icons and abstract geometry. Large soft light shapes may back the hero. Icons use a 1.5px line weight that matches the interface geometry. No realistic photography or decorative illustration.",
  },
  layout: {
    zh: "上限 1200px、12 栏、容器内边距 24px，区块间距 96px。hero 可居中或左文右图。设置类页面用左侧 280px 导航栏加右侧单栏表单，表单宽度不超过 640px。所有元素对齐 4px 基线网格。",
    en: "Capped at 1200px over twelve columns with 24px padding, sections 96px apart. The hero is centred or text-left with a visual. Settings pages use a 280px nav rail beside a single-column form capped at 640px. Everything aligns to a 4px baseline grid.",
  },
  dos: [
    { zh: "只用一支主蓝，其余颜色只作为状态", en: "One primary blue; every other color is a state" },
    { zh: "圆角克制：按钮 2px、卡片 8px", en: "Keep radius restrained: 2px buttons, 8px cards" },
    { zh: "焦点环必须 2px 且带 offset", en: "Focus rings are 2px with an offset" },
    { zh: "卡片用亚克力填充加模糊与描边", en: "Cards use acrylic fill with blur and a border" },
    { zh: "动效 150ms 到 250ms，强调响应", en: "Motion runs 150ms to 250ms and signals response" },
    { zh: "所有间距对齐 4px 网格", en: "Align all spacing to a 4px grid" },
  ],
  donts: [
    { zh: "不要用大圆角，会失去 Fluent 的硬朗", en: "No large radii; it loses Fluent's crispness" },
    { zh: "不要把黄红绿当成装饰色", en: "Never treat yellow, red or green as decoration" },
    { zh: "不要省掉焦点环", en: "Do not omit the focus ring" },
    { zh: "不要用玻璃卡片却不加模糊", en: "Do not use acrylic panels without blur" },
    { zh: "不要用超过 250ms 的动效", en: "No motion longer than 250ms" },
    { zh: "不要用纯黑文字，用深灰", en: "Never use pure black text; go to a deep grey" },
  ],
  promptGuide: {
    quickColors: {
      text: "#201f1e",
      background: "#f3f2f1",
      card: "rgba(255,255,255,0.70)",
      primary: "#0078d4",
      muted: "#605e5c",
      border: "#d1d1d1",
    },
    prompts: [
      {
        zh: "做一个 Fluent 卡片：背景 rgba(255,255,255,0.7)、backdrop-filter blur(20px)、1px rgba(255,255,255,0.3) 描边、8px 圆角、内边距 24px，阴影 0 2px 4px rgba(0,0,0,0.04) 与 0 8px 16px rgba(0,0,0,0.08)。左上 48px 主蓝图标块（8px 圆角），标题 20px/600 #201f1e。hover 时背景升到 85%、上浮 4px、阴影升到 0 16px 32px。页面底色 #f3f2f1。",
        en: "Build a Fluent card: background rgba(255,255,255,0.7), backdrop-filter blur(20px), 1px rgba(255,255,255,0.3) border, 8px radius, 24px padding, with shadows 0 2px 4px rgba(0,0,0,0.04) and 0 8px 16px rgba(0,0,0,0.08). A 48px primary-blue icon tile on an 8px radius sits top-left above a 20px/600 title in #201f1e. Hover raises the fill to 85%, lifts 4px and moves the shadow to 0 16px 32px. The page ground is #f3f2f1.",
      },
    ],
  },
  similar: [
    { name: "macOS Vibrancy", why: { zh: "同样用系统材质分层，但那边是暗色与衬线标题", en: "Also layers system material, though that one is dark with serif titles" } },
    { name: "Corporate Clean", why: { zh: "同为企业级，但 Fluent 有明确材质与焦点纪律", en: "Also enterprise-grade, though Fluent adds explicit material and focus discipline" } },
  ],
  completeness: "full",
};
