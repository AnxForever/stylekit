import type { DesignSpec } from "../types";

export const holographicSpec: DesignSpec = {
  slug: "holographic",
  name: "全息渐变",
  nameEn: "Holographic",
  cover: "/styles/holographic.svg",
  theme: "dark",
  northStar: {
    zh: "彩虹色谱在深空底上随角度流动：像镭射膜在光里翻转。",
    en: "A rainbow spectrum drifting with angle over deep space — holographic foil turning in the light.",
  },
  summary: {
    zh: "全息渐变模拟镭射全息膜的棱镜折射：底色是深紫或深海军（#0a0a1f），所有元素都带三色以上的渐变，而且渐变会随交互横向流动——这是它独有的规则叫 Spectrum Shift，用 background-size: 200% 加 hover 时 background-position 从左侧移到右侧来实现，模拟箔片随视角变色。它禁止纯色元素（没有渐变的实心块在这套语言里等于失去材质）、禁止浅色背景（会直接杀掉全息感）、禁止低饱和色、也禁止没有光晕的锐角。",
    en: "Holographic simulates the prismatic refraction of foil: the ground is a deep violet or navy (#0a0a1f), every element carries a gradient of three or more stops, and that gradient flows laterally on interaction. The rule is Spectrum Shift — background-size at 200% with background-position shifting from left to right on hover, imitating foil changing hue with the angle. Flat solid elements are banned, since without a gradient the material disappears; light grounds kill the effect outright, as do desaturated colors and sharp corners with no glow.",
  },
  colors: [
    {
      name: "深空",
      nameEn: "Deep Space",
      value: "#0a0a1f",
      group: "surface",
      role: {
        zh: "页面底。深到让所有虹彩都能浮起来。",
        en: "The page ground — dark enough to float every iridescence above it.",
      },
      token: "--color-deep-space",
    },
    {
      name: "深紫",
      nameEn: "Deep Violet",
      value: "#1a0b2e",
      group: "surface",
      role: {
        zh: "次级面板底，比深空偏紫。",
        en: "Secondary panel grounds, more violet than the deep space.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "全息紫",
      nameEn: "Hologram Violet",
      value: "#a855f7",
      group: "brand",
      role: {
        zh: "渐变的主站与品牌色，最常用于按钮起点。",
        en: "The gradient's anchor and the brand tone, most often where a button begins.",
      },
      token: "--color-hologram-violet",
    },
    {
      name: "品红",
      nameEn: "Magenta",
      value: "#ff0080",
      group: "accent",
      role: {
        zh: "光谱的暖端，用于让渐变跨过紫与青。",
        en: "The spectrum's warm end, carrying the gradient from violet into cyan.",
      },
      token: "--color-magenta",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#00d4ff",
      group: "accent",
      role: {
        zh: "光谱的冷端，是渐变里最亮的一站。",
        en: "The spectrum's cool end and the brightest stop in the gradient.",
      },
      token: "--color-cyan",
    },
    {
      name: "金黄",
      nameEn: "Gold",
      value: "#ffd700",
      group: "accent",
      role: {
        zh: "高光与「箔片反光」，只在渐变中出现，不做填充。",
        en: "Highlights and foil flare — appearing only inside gradients, never as a fill.",
      },
      token: "--color-gold",
    },
    {
      name: "荧光绿",
      nameEn: "Neon Green",
      value: "#00ff88",
      group: "accent",
      role: {
        zh: "光谱的第五站，用于让渐变多一层不规则。",
        en: "The spectrum's fifth stop, giving the gradient an irregular edge.",
      },
      token: "--color-neon-green",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 700],
      sizes: [12, 14, 17, 24, 36, 52],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.14em" },
      role: {
        zh: "全站唯一字体。标题用渐变文字（background-clip: text），标签全大写。",
        en: "The only face. Headlines use gradient text via background-clip, with labels uppercase.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 52, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 36, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 17, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1160,
    sectionGap: 112,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "20px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "16px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Space", value: "#0a0a1f", purpose: "页面底" },
    { level: 1, name: "Glass Panel", value: "rgba(255,255,255,0.06)", purpose: "卡片（半透明）" },
    { level: 2, name: "Spectrum", value: "linear-gradient 3+ stops", purpose: "渐变元素" },
  ],
  elevation: [
    { name: "Iridescent glow", value: "0 0 40px rgba(168,85,247,0.35)" },
    { name: "Magenta glow", value: "0 0 32px rgba(255,0,128,0.30)" },
  ],
  components: [
    {
      name: "Spectrum Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "紫到品红到青的三色线性渐变填充（每站约 1/3）、白色文字、999px 全圆角、无描边，15px/700、padding 12px 28px，外发光 0 0 32px 品红 30%。渐变设 background-size: 200% auto，hover 时 background-position 从 left 移到 right（1.2s ease），这就是 Spectrum Shift。按下缩放 0.98。",
        en: "A three-stop violet-to-magenta-to-cyan linear gradient, white text, fully rounded, no border, 15px/700, 12px 28px padding, with a 0 0 32px glow at 30% magenta. background-size sits at 200% auto and hover moves background-position from left to right over 1.2s ease — that is Spectrum Shift. Press scales 0.98.",
      },
      sizes: "padding 12px 28px; label 15px",
      states: "hover: background-position left→right; active: scale 0.98",
    },
    {
      name: "Prism Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "白 6% 填充、20px 圆角、1px 白 12% 描边、内边距 24px，外加一层紫到青的柔光晕（0 0 40px 紫 35%）。顶部放一条 2px 的三色渐变横线（紫→品红→青）作为「箔片边缘」。hover 时渐变横线的 background-position 反向流动，卡片外发光转品红。",
        en: "6% white fill, 20px radius, a 1px white border at 12%, 24px padding, with a soft violet-to-cyan halo at 0 0 40px 35%. A 2px three-stop gradient rule (violet, magenta, cyan) caps it as the foil edge. Hover reverses the gradient's flow and turns the halo magenta.",
      },
    },
    {
      name: "Spectrum Text",
      role: { zh: "渐变标题", en: "Gradient headline" },
      construction: {
        zh: "用 background: linear-gradient(90deg, 紫, 品红, 青, 金) 配 background-clip: text 与 color: transparent，background-size 200%，hover 时位置移动。仅用于首屏与章节标题，正文绝不使用（可读性会崩）。",
        en: "background: linear-gradient(90deg, violet, magenta, cyan, gold) with background-clip text and transparent color, at 200% size and shifting on hover. Reserved for the hero and section headings; body copy never takes it, or legibility collapses.",
      },
    },
    {
      name: "Glass Field",
      role: { zh: "输入框", en: "Input field" },
      construction: {
        zh: "白 6% 填充、16px 圆角、1px 白 15% 描边、padding 12px 18px、15px 字。聚焦时描边换 1px 渐变（用 border-image 或伪元素），并加 0 0 0 3px 的紫 25% 环——焦点环必须带 offset 到深空色，否则在暗底上看不见。",
        en: "6% white fill, 16px radius, a 1px white border at 15%, 12px 18px padding at 15px. Focus swaps the border for a 1px gradient via border-image or a pseudo element and adds a 3px ring at 25% violet — and that ring must carry an offset in the deep space color or it vanishes.",
      },
    },
    {
      name: "Iridescent Orb",
      role: { zh: "装饰光球", en: "Decorative orb" },
      construction: {
        zh: "96px 到 240px 的圆，径向渐变从紫中心渐隐到品红与青，无边框，外发光 0 0 60px 紫 30%。放在卡片背后或区块角落，允许溢出容器。单屏最多两个。",
        en: "A circle from 96px to 240px on a radial gradient fading from violet at the centre through magenta into cyan, no border, with a 0 0 60px halo at 30% violet. It sits behind a card or in a section corner and may bleed past the container. Two per screen at most.",
      },
    },
  ],
  imagery: {
    zh: "镭射材质、棱镜、箔片、流体与晶体。所有图像必须带多色虹彩。允许把照片叠一层 30% 的彩虹渐变后用 overlay 混合。不使用单色摄影、纯白背景与灰调插画。",
    en: "Foil, prisms, laminate, fluid and crystal, all carrying multi-hue iridescence. A photo may take a 30% rainbow gradient overlay in blend mode. No monochrome photography, white backgrounds or grey illustration.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 24px，区块间距 112px。允许元素大范围重叠与溢出的光球。相邻两个元素不得都是无渐变的纯色块——这条规则强制整页始终有光谱在场。",
    en: "Capped at 1160px with 24px padding, sections 112px apart. Elements may overlap widely with orbs bleeding out. No two adjacent elements may both be flat solid blocks — the rule keeps a spectrum present across the page.",
  },
  dos: [
    { zh: "所有元素带三色以上渐变", en: "Every element carries a gradient of three or more stops" },
    { zh: "深紫或深海军底", en: "Ground in deep violet or navy" },
    { zh: "用 Spectrum Shift 让渐变横向流动", en: "Use Spectrum Shift to flow the gradient laterally" },
    { zh: "锐角必须配光晕", en: "Any sharp corner needs a glow" },
    { zh: "焦点环带深空色 offset", en: "Focus rings carry a deep-space offset" },
    { zh: "高饱和色，保持虹彩强度", en: "Keep saturation high enough for iridescence" },
  ],
  donts: [
    { zh: "不要用无渐变的纯色块", en: "No flat solid blocks without a gradient" },
    { zh: "不要用浅色或白色背景", en: "No light or white grounds" },
    { zh: "不要用低饱和或灰调色", en: "No desaturated or muted color" },
    { zh: "不要给锐角不加光晕", en: "Do not leave a sharp corner unlit" },
    { zh: "不要连续两个以上的非渐变元素", en: "Never two or more non-gradient elements in a row" },
    { zh: "不要让焦点环在暗底上消失", en: "Never let a focus ring disappear on the dark" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#0a0a1f",
      violet: "#a855f7",
      magenta: "#ff0080",
      cyan: "#00d4ff",
      gold: "#ffd700",
    },
    prompts: [
      {
        zh: "做一个全息渐变按钮：background linear-gradient(90deg, #a855f7, #ff0080, #00d4ff)、background-size 200% auto、白字 15px/700、999px 圆角、padding 12px 28px、box-shadow 0 0 32px rgba(255,0,128,0.3)。hover 时 background-position 从 left 移到 right，transition 1.2s ease；active 时 scale(0.98)。页面底色 #0a0a1f。相邻元素中不允许连续出现两个无渐变的纯色块。",
        en: "Build a holographic button: background linear-gradient(90deg, #a855f7, #ff0080, #00d4ff), background-size 200% auto, white 15px/700 text, fully rounded, 12px 28px padding, box-shadow 0 0 32px rgba(255,0,128,0.3). Hover moves background-position from left to right over 1.2s ease; active scales 0.98. The page ground is #0a0a1f, and no two adjacent elements may both be flat solids.",
      },
    ],
  },
  similar: [
    { name: "Modern Gradient", why: { zh: "同样以渐变为核心，但全息要求渐变随交互流动、且禁止纯色元素", en: "Both center on gradients, though holographic makes them flow on interaction and bans flat elements" } },
    { name: "Shader Gradient", why: { zh: "同样虹彩，但全息是静态 CSS 渐变加位移，着色器是实时计算", en: "Both iridescent, though holographic uses CSS gradients with position shifts while a shader computes live" } },
  ],
  completeness: "full",
};
