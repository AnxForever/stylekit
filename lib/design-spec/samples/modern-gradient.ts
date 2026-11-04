import type { DesignSpec } from "../types";

export const modernGradientSpec: DesignSpec = {
  slug: "modern-gradient",
  name: "现代渐变风",
  nameEn: "Modern Gradient",
  cover: "/styles/modern-gradient.svg",
  theme: "dark",
  northStar: {
    zh: "深靛夜空上的一束紫粉光，玻璃卡片把光切成层次。",
    en: "A violet-pink beam over a deep indigo night, sliced into layers by glass cards.",
  },
  summary: {
    zh: "现代渐变风属于创业公司发布页那一路：深靛底（#1e1b4b）压住整个画面，紫到品红的渐变作为唯一光源，玻璃卡片把光切成层次。它的关键是渐变必须「有方向」——按钮用 200% 宽的三色渐变，hover 时背景滑到另一端，颜色随之流动，而不是简单换色。卡片用 10% 白填充加 20% 白描边，hover 时透明度提升并注入紫色光晕。动效偏慢（500ms ease-out），配合轻微上浮与 1.02 放大，让「光在动」这件事被感知。",
    en: "Modern Gradient belongs to the startup launch page: a deep indigo ground (#1e1b4b) holds the frame while a violet-to-fuchsia gradient acts as the single light source, and glass cards slice that light into layers. The key is that the gradient has direction — buttons carry a three-stop 200%-wide gradient that slides to the far end on hover, so the color itself moves rather than merely swapping. Cards use a 10% white fill with a 20% white border, and on hover the fill rises while a violet glow bleeds in. Motion runs slow at 500ms ease-out, paired with a slight lift and 1.02 scale, so the movement of light is felt.",
  },
  colors: [
    {
      name: "紫",
      nameEn: "Violet",
      value: "#8b5cf6",
      group: "brand",
      role: {
        zh: "渐变起点与主强调。所有发光效果都从它出发。",
        en: "The gradient's start and the primary accent; every glow originates here.",
      },
      token: "--color-violet",
    },
    {
      name: "深靛",
      nameEn: "Deep Indigo",
      value: "#1e1b4b",
      group: "surface",
      role: {
        zh: "页面底色。比纯黑暖，能让紫光显得是在发光而不是发灰。",
        en: "Page ground. Warmer than black, letting violet read as light rather than grey.",
      },
      token: "--color-deep-indigo",
    },
    {
      name: "品红",
      nameEn: "Fuchsia",
      value: "#ec4899",
      group: "accent",
      role: {
        zh: "渐变终点与 hover 态。只与紫同时出现，构成那条光。",
        en: "The gradient's far end and hover state; appears only with violet to form the beam.",
      },
      token: "--color-fuchsia",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#06b6d4",
      group: "accent",
      role: {
        zh: "数据、图表第二序列与对比高亮。与紫形成冷暖对位。",
        en: "Data, second chart series and contrast highlights, pairing cool against the violet.",
      },
      token: "--color-cyan",
    },
    {
      name: "橙",
      nameEn: "Amber",
      value: "#f59e0b",
      group: "accent",
      role: {
        zh: "稀缺提示与徽标。全屏不超过一处，用来打破冷色。",
        en: "Scarcity cues and badges, at most once per screen to break the cool palette.",
      },
      token: "--color-amber",
    },
    {
      name: "玻璃白",
      nameEn: "Glass White",
      value: "rgba(255,255,255,0.10)",
      group: "surface",
      role: {
        zh: "卡片填充。必须配描边与模糊，否则在深底上会消失。",
        en: "Card fill. It needs a border and blur or it vanishes on the dark ground.",
      },
      token: "--color-glass",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 28, 40, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.03em", label: "0.06em" },
      role: {
        zh: "全站唯一字体。标题 700 与紧字距压住发光背景，正文 400 保证暗底可读。",
        en: "The only face: 700 with tight tracking holds the glowing backdrop, while 400 keeps body copy legible on dark.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 64, lineHeight: 1.05, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 40, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 600, size: 12, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "icons", value: "16px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Indigo", value: "#1e1b4b", purpose: "页面底" },
    { level: 1, name: "Glass", value: "rgba(255,255,255,0.10)", purpose: "卡片与面板" },
    { level: 2, name: "Glass Hover", value: "rgba(255,255,255,0.15)", purpose: "hover 态填充" },
  ],
  elevation: [
    { name: "Button glow", value: "0 8px 20px rgba(167,139,250,0.30)" },
    { name: "Button hover", value: "0 15px 30px rgba(217,70,239,0.40)" },
    { name: "Card hover", value: "0 20px 50px rgba(167,139,250,0.18)" },
  ],
  components: [
    {
      name: "Gradient Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "紫→品红→紫三色线性渐变，宽度 200%，白字、16px 圆角、无描边，字级 16px、字重 700、字距 0.02em、padding 16px 32px。静态阴影 0 8px 20px 紫 30%。hover 时背景位置滑到右端（渐变反向流动）、阴影扩到 0 15px 30px 品红 40%、上浮 4px、放大 1.02；按下缩放 0.95。过渡 500ms ease-out。",
        en: "A violet-to-fuchsia-to-violet linear gradient at 200% width, white text, 16px radius, no border, 16px type at weight 700 with 0.02em tracking and 16px 32px padding. The resting shadow is 0 8px 20px at 30% violet. Hover slides the background position to the far end (so the gradient runs in reverse), widens the shadow to 0 15px 30px at 40% fuchsia, lifts 4px and scales 1.02; press scales 0.95. 500ms ease-out.",
      },
      sizes: "padding 16px 32px; label 16px",
      states: "hover: gradient slides, lift 4px, glow widens; active: scale 0.95",
    },
    {
      name: "Glass Card",
      role: { zh: "功能卡与内容卡", en: "Feature and content card" },
      construction: {
        zh: "10% 白填充、20px 模糊、1px 20% 白描边、24px 圆角、内边距 32px。图标块 56px 见方、渐变填充、16px 圆角、白图标。hover 时填充升到 15%、描边转紫 50%、上浮 8px、放大 1.02、注入 0 20px 50px 紫 18% 光晕，图标块放大 1.1 并旋转 12 度，过渡 500ms ease-out。",
        en: "10% white fill, 20px blur, a 1px white border at 20%, 24px radius, 32px padding. The icon tile is 56px square with a gradient fill, 16px radius and a white glyph. Hover raises the fill to 15%, turns the border to 50% violet, lifts 8px, scales 1.02 and adds a 0 20px 50px glow at 18% violet, while the tile scales to 1.1 and rotates 12 degrees, over 500ms ease-out.",
      },
      states: "hover: fill 10%→15%, border violet, lift 8px, icon rotate 12deg",
    },
    {
      name: "Gradient Input",
      role: { zh: "表单与订阅输入", en: "Form and newsletter input" },
      construction: {
        zh: "8% 白填充、10px 模糊、1px 18% 白描边、16px 圆角、padding 14px 18px、14px 字。占位符用白 45%。聚焦时描边转紫 60%，并加一圈 3px 紫 25% 外环。",
        en: "8% white fill, 10px blur, a 1px white border at 18%, 16px radius, 14px 18px padding at 14px. The placeholder sits at 45% white. Focus turns the border to 60% violet and adds a 3px ring at 25% violet.",
      },
    },
    {
      name: "Aurora Backdrop",
      role: { zh: "首屏背景光", en: "Hero backdrop light" },
      construction: {
        zh: "深靛底上放两到三个 600px 半径的径向渐变光斑（紫 40%、品红 30%、青 20%），模糊 120px，整体不透明度 60%。只出现在首屏与一两个区块，滚动时固定不动。",
        en: "Two or three 600px radial light wells on the indigo ground (40% violet, 30% fuchsia, 20% cyan) with a 120px blur at 60% opacity. Confined to the hero and one or two sections, pinned while the page scrolls.",
      },
    },
  ],
  imagery: {
    zh: "抽象渐变、光斑、3D 渲染的几何体。允许把产品界面裁切后叠在渐变上。不使用人物摄影、写实插画或纯色平面背景——没有光就没有这套风格。",
    en: "Abstract gradients, light wells and 3D-rendered geometry. Cropped product UI may sit over a gradient. No people photography, realistic illustration or flat solid grounds — without light this style stops existing.",
  },
  layout: {
    zh: "上限 1200px、12 栏、容器内边距 24px，区块间距 112px。hero 居中且占满首屏，标题不超过两行。功能区用三栏玻璃卡片。整页保持深色，只在页脚允许一次反色。",
    en: "Capped at 1200px over twelve columns with 24px padding, sections 112px apart. The hero is centred and fills the first viewport with a headline of two lines at most. Features run as three glass cards. The page stays dark throughout, with at most one inverted footer.",
  },
  dos: [
    { zh: "渐变必须有方向，hover 时让颜色流动", en: "Gradients need direction; let the color travel on hover" },
    { zh: "玻璃卡片必须同时有模糊、描边与填充", en: "Glass cards need blur, border and fill together" },
    { zh: "深靛底，不用纯黑", en: "Ground in deep indigo, never pure black" },
    { zh: "动效 500ms，配合上浮与 1.02 放大", en: "Motion runs 500ms with a lift and 1.02 scale" },
    { zh: "光斑只在首屏与少数区块出现", en: "Keep light wells to the hero and a few sections" },
    { zh: "正文对比度不低于 4.5:1", en: "Keep body contrast at 4.5:1 or better" },
  ],
  donts: [
    { zh: "不要用纯黑背景", en: "No pure black ground" },
    { zh: "不要用无描边的玻璃卡片", en: "No borderless glass cards" },
    { zh: "不要让渐变出现在正文文字上", en: "Never run a gradient through body text" },
    { zh: "不要同时用三支以上强调色", en: "Do not use more than three accents at once" },
    { zh: "不要用快速过渡，光不会瞬移", en: "No fast transitions; light does not teleport" },
    { zh: "不要让光斑铺满整页", en: "Do not tile light wells across the page" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f8fafc",
      background: "#1e1b4b",
      card: "rgba(255,255,255,0.10)",
      accent: "#8b5cf6",
      secondary: "#ec4899",
      border: "rgba(255,255,255,0.20)",
    },
    prompts: [
      {
        zh: "做一个渐变主按钮：background: linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)，background-size: 200% auto，白字、16px 圆角、700 字重、padding 16px 32px，阴影 0 8px 20px rgba(167,139,250,0.3)。hover 时 background-position 移到 right、阴影扩到 0 15px 30px rgba(217,70,239,0.4)、transform 上浮 4px 并放大 1.02，transition 500ms ease-out。页面底色 #1e1b4b。",
        en: "Build a gradient primary button: background linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6) at 200% auto, white text, 16px radius, weight 700, 16px 32px padding, shadow 0 8px 20px rgba(167,139,250,0.3). On hover move background-position to the right, widen the shadow to 0 15px 30px rgba(217,70,239,0.4), lift 4px and scale 1.02 over 500ms ease-out. The page ground is #1e1b4b.",
      },
    ],
  },
  similar: [
    { name: "Stripe", why: { zh: "同样用渐变与网格制造技术感，但 Stripe 克制得多", en: "Also uses gradients for a technical feel, though far more restrained" } },
    { name: "Glassmorphism", why: { zh: "同一套玻璃材质，但这里的光来自渐变而非夜景", en: "Same glass material, though the light here comes from a gradient rather than a night scene" } },
  ],
  completeness: "full",
};
