import type { DesignSpec } from "../types";

export const neonGradientSpec: DesignSpec = {
  slug: "neon-gradient",
  name: "霓虹渐变",
  nameEn: "Neon Gradient",
  cover: "/styles/neon-gradient.svg",
  theme: "dark",
  northStar: {
    zh: "深紫底上一张张渐变卡片，边缘发着光。",
    en: "Gradient cards on deep violet, each one glowing at the edge.",
  },
  summary: {
    zh: "霓虹渐变是近年 SaaS 与年轻品牌最常见的视觉：深紫黑底（#0f0a1e）上放一张张渐变填充的卡片（紫到粉、青到绿等对角渐变），卡片用 16 到 24px 的大圆角与粗彩色描边，边缘带同色霓虹发光，标题可以是纯白或渐变文字，按钮是渐变加外发光。它的规则是「渐变必须有明确的两极」——从一支饱和色到另一支饱和色，不允许三色以上的浑浊过渡；而且发光必须与渐变同色，否则会显脏。",
    en: "Neon Gradient is the most common look in recent SaaS and youth brands: gradient-filled cards (violet into pink, cyan into lime) on a deep violet-black ground (#0f0a1e), radii of 16 to 24px, a heavy colored border, and neon glow at the edge in the same hue. Headlines may be pure white or gradient text, and buttons pair a gradient with an outer glow. The rule is that a gradient needs two clear poles — one saturated color into another — never a muddy three-color wash, and the glow must match the gradient or the surface reads as dirty.",
  },
  colors: [
    {
      name: "深紫底",
      nameEn: "Deep Violet Ground",
      value: "#0f0a1e",
      group: "surface",
      role: {
        zh: "页面底。带紫的近黑，让所有渐变都显得更亮。",
        en: "The page ground — a violet near-black that makes every gradient read brighter.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#a855f7",
      group: "brand",
      role: {
        zh: "渐变的第一极，也是主按钮的起点。",
        en: "The first pole of the gradient and the start of the primary button.",
      },
      token: "--color-violet",
    },
    {
      name: "粉",
      nameEn: "Pink",
      value: "#f472b6",
      group: "brand",
      role: {
        zh: "渐变的第二极，与紫成对出现。",
        en: "The second pole, always paired with violet.",
      },
      token: "--color-pink",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#22d3ee",
      group: "accent",
      role: {
        zh: "第二组渐变的冷极，用于数据与科技语义。",
        en: "The cool pole of the second gradient, on data and tech semantics.",
      },
      token: "--color-cyan",
    },
    {
      name: "青柠",
      nameEn: "Lime",
      value: "#a3e635",
      group: "accent",
      role: {
        zh: "第二组渐变的暖极与成功状态。",
        en: "The warm pole of the second gradient and success.",
      },
      token: "--color-lime",
    },
    {
      name: "琥珀",
      nameEn: "Amber",
      value: "#fbbf24",
      group: "accent",
      role: {
        zh: "第三组渐变与徽标高亮。",
        en: "The third gradient pair and badge highlights.",
      },
      token: "--color-amber",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 600, 700],
      sizes: [12, 14, 17, 24, 34, 48],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.1em" },
      role: {
        zh: "全站唯一字体。标题 34 到 48px 配紧字距，可用渐变文字。",
        en: "The only face. Headlines run 34 to 48px on tight tracking and may take gradient text.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 48, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 34, lineHeight: 1.15, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 24, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 17, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 600, size: 12, lineHeight: 1.45, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Violet", value: "#0f0a1e", purpose: "页面底" },
    { level: 1, name: "Violet→Pink", value: "linear-gradient(135deg, #a855f7, #f472b6)", purpose: "卡片渐变" },
    { level: 2, name: "Cyan→Lime", value: "linear-gradient(135deg, #22d3ee, #a3e635)", purpose: "第二组渐变" },
  ],
  elevation: [
    { name: "Violet glow", value: "0 0 32px rgba(168,85,247,0.45)" },
    { name: "Pink glow", value: "0 0 40px rgba(244,114,182,0.40)" },
    { name: "Button glow", value: "0 8px 32px rgba(168,85,247,0.50)" },
  ],
  components: [
    {
      name: "Gradient Card",
      role: { zh: "渐变卡片（核心组件）", en: "The gradient card — the core component" },
      construction: {
        zh: "135 度的双极渐变填充（紫到粉，或青到青柠）、24px 圆角、1px 白 20% 描边、内边距 28px，外发光 0 0 32px 紫 45%——发光必须取渐变的主极色。标题纯白 34px/700，正文白 85%。hover 时渐变角度转为 180 度并让发光扩到 40px。",
        en: "A two-pole 135-degree gradient (violet into pink, or cyan into lime), 24px radius, a 1px white border at 20%, 28px padding, and a 0 0 32px glow at 45% violet — the glow always takes the gradient's dominant pole. The title is pure white at 34px/700 with body at 85%. Hover rotates the gradient to 180 degrees and widens the glow to 40px.",
      },
      states: "hover: gradient rotates, glow 40px",
    },
    {
      name: "Gradient Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "紫到粉横向渐变、白字、16px 圆角、无描边、17px/600、padding 12px 28px，外发光 0 8px 32px 紫 50%。hover 时渐变横向位移（background-position 从 left 到 right）、发光扩到 40px；按下缩放 0.98。渐变必须设 background-size: 200% 才有可动的余量。",
        en: "A horizontal violet-to-pink gradient, white text, 16px radius, no border, 17px/600, 12px 28px padding, with a 0 8px 32px glow at 50% violet. Hover slides the gradient from left to right and widens the glow to 40px; press scales 0.98. The gradient needs background-size at 200% to have room to travel.",
      },
      sizes: "padding 12px 28px; label 17px",
      states: "hover: gradient slides, glow 40px; active: scale 0.98",
    },
    {
      name: "Gradient Text",
      role: { zh: "渐变标题", en: "Gradient headline" },
      construction: {
        zh: "用 background: linear-gradient(90deg, 紫, 粉) 配 background-clip: text 与 color: transparent。只用于首屏与关键区块标题，且同一页不超过两处——用多了整页会失去重点。绝不用于正文。",
        en: "background: linear-gradient(90deg, violet, pink) with background-clip text and transparent color. Reserved for the hero and one key section heading, never more than twice per page, since overuse flattens the emphasis. Never on body copy.",
      },
    },
    {
      name: "Glow Border",
      role: { zh: "发光描边", en: "The glow border" },
      construction: {
        zh: "1px 渐变描边（用 padding 1px 的渐变层加内层深底实现），外带 0 0 24px 的同色发光。用于次级卡片与输入框，替代实色描边。描边颜色必须与卡片的渐变同族。",
        en: "A 1px gradient border built from a gradient layer at 1px padding over an inner dark panel, carrying a 0 0 24px glow in the same hue. It replaces solid borders on secondary cards and inputs, and its color must belong to the card's gradient family.",
      },
    },
    {
      name: "Sparkle Badge",
      role: { zh: "徽标与图标底", en: "Badges and icon beds" },
      construction: {
        zh: "999px 全圆或 12px 圆角的小块，填渐变或渐变 20% 底，内放一个 16 到 20px 的线性图标（星、火箭、闪光）。图标用白色，绝不用彩色图标压在彩色渐变上——那会糊。",
        en: "A small block, fully rounded or on a 12px radius, filled with the gradient or a 20% version of it, holding a 16 to 20px line icon (star, rocket, sparkle) in white. Never place a colored icon on a colored gradient — it muddies.",
      },
    },
  ],
  imagery: {
    zh: "以渐变、抽象图形与图标为主。允许产品截图放在渐变卡片里。不使用写实摄影、灰度图像与柔和插画，它们会与渐变抢亮度。",
    en: "Gradients, abstract shapes and icons lead; product screenshots may sit inside a gradient card. No realistic photography, greyscale imagery or soft illustration, all of which compete with the gradient's brightness.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 24px，区块间距 96px。卡片可大小不一（1×1 与 2×1），但同一屏的渐变不超过三组。整页保持深紫底，渐变块之间留出足够暗区，否则发光会互相污染。",
    en: "Capped at 1200px with 24px padding, sections 96px apart. Cards may vary in size (1×1 and 2×1) while no screen carries more than three gradient pairs. The page stays deep violet with enough dark between blocks, or the glows contaminate each other.",
  },
  dos: [
    { zh: "渐变必须有两个饱和极", en: "Gradients have two saturated poles" },
    { zh: "发光与渐变同色", en: "The glow matches the gradient" },
    { zh: "卡片圆角 24px，按钮 16px", en: "Cards at 24px, buttons at 16px" },
    { zh: "渐变文字最多两处", en: "Gradient text at most twice" },
    { zh: "按钮渐变设 background-size 200%", en: "Button gradients set background-size to 200%" },
    { zh: "同屏渐变不超过三组", en: "Three gradient pairs per screen at most" },
  ],
  donts: [
    { zh: "不要用三色以上的浑浊渐变", en: "No muddy gradients of three or more colors" },
    { zh: "不要让发光与渐变不同色", en: "Never let glow and gradient disagree" },
    { zh: "不要在正文用渐变文字", en: "No gradient text on body copy" },
    { zh: "不要用彩色图标压彩色渐变", en: "No colored icon on a colored gradient" },
    { zh: "不要用写实摄影抢亮度", en: "Never let photography compete for brightness" },
    { zh: "不要用锐角", en: "No sharp corners" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#0f0a1e",
      violet: "#a855f7",
      pink: "#f472b6",
      cyan: "#22d3ee",
      lime: "#a3e635",
    },
    prompts: [
      {
        zh: "做一个霓虹渐变卡片：background linear-gradient(135deg, #a855f7, #f472b6)、24px 圆角、1px rgba(255,255,255,0.2) 描边、内边距 28px、box-shadow 0 0 32px rgba(168,85,247,0.45)。标题 34px/700 纯白，正文 14px rgba(255,255,255,0.85)。按钮紫到粉横向渐变、background-size 200%、16px 圆角、白字 17px/600、padding 12px 28px、box-shadow 0 8px 32px rgba(168,85,247,0.5)，hover 时 background-position 从 left 移到 right、发光扩到 40px。页面底色 #0f0a1e，同屏渐变不超过三组。",
        en: "Build a neon gradient card: background linear-gradient(135deg, #a855f7, #f472b6), 24px radius, a 1px rgba(255,255,255,0.2) border, 28px padding, box-shadow 0 0 32px rgba(168,85,247,0.45). The title runs 34px/700 in pure white with body at 14px in rgba(255,255,255,0.85). The button takes a horizontal violet-to-pink gradient at background-size 200%, 16px radius, white 17px/600 text, 12px 28px padding and box-shadow 0 8px 32px rgba(168,85,247,0.5), sliding its background-position left to right and widening the glow to 40px on hover. The page ground is #0f0a1e, with no more than three gradient pairs per screen.",
      },
    ],
  },
  similar: [
    { name: "Holographic", why: { zh: "同样渐变，但全息是多色虹彩且禁止纯色元素，霓虹渐变只允许双极", en: "Both gradient-led, though holographic is multi-hue and bans flat elements while this allows two poles only" } },
    { name: "Modern Gradient", why: { zh: "同族，但现代渐变更克制少发光，霓虹渐变强调边缘发光", en: "Same family, though modern gradient is restrained with little glow while this leans on edge glow" } },
  ],
  completeness: "full",
};
