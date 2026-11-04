import type { DesignSpec } from "../types";

export const shaderGradientSpec: DesignSpec = {
  slug: "shader-gradient",
  name: "着色器渐变",
  nameEn: "Shader Gradient",
  cover: "/styles/shader-gradient.svg",
  theme: "dark",
  northStar: {
    zh: "一块真的在计算的虹彩场，玻璃面板浮在上面。",
    en: "An iridescent field that is actually computing, with glass panels floating above it.",
  },
  summary: {
    zh: "着色器渐变是近年高级 SaaS 首屏的标准做法：一个实时运行的 WebGL 片元着色器在近黑画布上渲染流动的网格渐变，颜色缓慢呼吸，磨砂玻璃面板浮在上面，全站只用一支紫色做 UI 强调。它的难点不在视觉而在纪律——绝不能拿静态渐变图或 CSS 关键帧冒充实时着色器（这是廉价感的根源）；必须给 devicePixelRatio 设上限；离屏时必须用 IntersectionObserver 暂停 requestAnimationFrame；必须提供 WebGL 不可用时的回退；文字绝不能直接压在渐变场上。",
    en: "Shader Gradient is the current standard for premium SaaS heroes: a real-time WebGL fragment shader rendering a flowing mesh gradient on a near-black canvas, its colors breathing slowly, frosted-glass panels floating above, and one violet reserved for UI emphasis. The difficulty is discipline rather than appearance — a static gradient image or CSS keyframe loop posing as a live shader is the root of cheapness; devicePixelRatio must be capped; requestAnimationFrame must pause via IntersectionObserver when offscreen; a fallback must exist for missing WebGL; and text must never sit directly on the field.",
  },
  colors: [
    {
      name: "画布黑",
      nameEn: "Canvas Black",
      value: "#08090d",
      group: "surface",
      role: {
        zh: "着色器画布的底色。近黑但不纯黑，让虹彩有暗部可以沉下去。",
        en: "The shader canvas base — near black rather than pure, so the iridescence has somewhere to sink.",
      },
      token: "--color-canvas-black",
    },
    {
      name: "亮白",
      nameEn: "Bright White",
      value: "#edeef2",
      group: "surface",
      role: {
        zh: "主要文字与高对比元素。略带冷的白。",
        en: "Primary text and high-contrast elements — a slightly cool white.",
      },
      token: "--color-bright-white",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#7c5cff",
      group: "brand",
      role: {
        zh: "唯一的 UI 强调色：主按钮、聚焦态与图标。着色器里的虹彩不算 UI 色。",
        en: "The single UI accent on buttons, focus and icons. The shader's iridescence does not count as UI color.",
      },
      token: "--color-violet",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#22d3ee",
      group: "accent",
      role: {
        zh: "只出现在着色器场里，用于让渐变有冷暖过渡。",
        en: "Appearing only inside the shader field, giving the gradient a warm-cool transition.",
      },
      token: "--color-cyan",
    },
    {
      name: "粉",
      nameEn: "Pink",
      value: "#f472b6",
      group: "accent",
      role: {
        zh: "同样只属于着色器，是虹彩的第三支。",
        en: "Also confined to the shader — the third note of the iridescence.",
      },
      token: "--color-pink",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 14, 16, 20, 32, 48, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.03em", label: "0.14em" },
      role: {
        zh: "全站唯一字体。标题 48 到 64px 配紧字距，小标签 12px 全大写。",
        en: "The only face. Headlines 48 to 64px on tight tracking, with 12px uppercase labels.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 64, lineHeight: 1.05, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 600, size: 48, lineHeight: 1.1, tracking: "-0.025em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 32, lineHeight: 1.2, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 20, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 128,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "icons", value: "8px" },
  ],
  surfaces: [
    { level: 0, name: "Canvas Black", value: "#08090d", purpose: "着色器画布" },
    { level: 1, name: "Glass 6%", value: "rgba(255,255,255,0.06)", purpose: "卡片与面板" },
    { level: 2, name: "Glass 12%", value: "rgba(255,255,255,0.12)", purpose: "hover 与次级按钮" },
  ],
  elevation: [
    { name: "Glass card", value: "0 20px 60px rgba(0,0,0,0.45)" },
    { name: "Violet CTA", value: "0 8px 30px rgba(124,92,255,0.35)" },
  ],
  components: [
    {
      name: "Violet CTA",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "紫色填充、白字、12px 圆角、无描边，16px/500、padding 12px 24px，阴影 0 8px 30px 紫 35%。hover 时填充提亮到 #8f72ff；按下缩放 0.98。过渡 300ms。全页只有一个。",
        en: "Violet fill, white text, 12px radius, no border, 16px/500, 12px 24px padding, shadow 0 8px 30px at 35% violet. Hover brightens the fill to #8f72ff; press scales 0.98. 300ms. One per page.",
      },
      sizes: "padding 12px 24px; label 16px",
      states: "hover: #8f72ff; active: scale 0.98",
    },
    {
      name: "Glass Card",
      role: { zh: "内容卡与特性卡", en: "Content and feature cards" },
      construction: {
        zh: "白 6% 填充、24px 模糊、16px 圆角、1px 白 10% 描边、内边距 24px，阴影 0 20px 60px 黑 45%。左上角一个 36px 的紫色 20% 底图标块（8px 圆角、1px 紫 30% 描边）。标题 20px/600 白色，正文 14px 白 60%。",
        en: "6% white fill with a 24px blur, 16px radius, a 1px white border at 10%, 24px padding, shadow 0 20px 60px at 45% black. A 36px violet icon tile at 20% sits top-left on an 8px radius with a 1px violet border at 30%. Title at 20px/600 white, body at 14px in 60% white.",
      },
    },
    {
      name: "Shader Field",
      role: { zh: "实时着色器画布（签名组件）", en: "The live shader canvas — the signature" },
      construction: {
        zh: "一个满幅 canvas 固定在最底层，运行片元着色器渲染三支色（紫、青、粉）的网格渐变，颜色随时间缓慢呼吸（周期 20 到 30 秒）。必须给 devicePixelRatio 设上限（通常 2），必须用 IntersectionObserver 在离屏时暂停 requestAnimationFrame，WebGL 不可用时回退为一张静态渐变图（同一配色），prefers-reduced-motion 时只渲染单帧。全页只能有一个 canvas。",
        en: "One full-bleed canvas fixed at the bottom layer runs a fragment shader producing a three-color mesh gradient (violet, cyan, pink) whose colors breathe over a twenty-to-thirty-second cycle. devicePixelRatio must be capped, typically at 2; requestAnimationFrame must pause offscreen via IntersectionObserver; a missing WebGL context falls back to a single static gradient in the same palette; reduced motion renders one frame only. One canvas per page.",
      },
      sizes: "full-bleed; DPR capped at 2",
    },
    {
      name: "Glass Input",
      role: { zh: "邮箱与表单输入", en: "Email and form inputs" },
      construction: {
        zh: "白 6% 填充、12px 模糊、12px 圆角、1px 白 12% 描边、padding 12px 16px、16px 字。占位符白 40%。聚焦时描边转紫 70%、填充升到 9%、加 2px 紫 25% 外环。",
        en: "6% white fill with a 12px blur, 12px radius, a 1px white border at 12%, 12px 16px padding at 16px. The placeholder sits at 40% white. Focus turns the border to 70% violet, raises the fill to 9% and adds a 2px ring at 25%.",
      },
    },
    {
      name: "Scrim Layer",
      role: { zh: "文字可读性遮罩", en: "The text readability scrim" },
      construction: {
        zh: "在着色器与文字之间必须有一层遮罩：垂直渐变从黑 60% 到透明，或一块 24px 模糊的玻璃面板。目的只有一个——保证文字与场的对比度至少 4.5:1。禁止省略。",
        en: "A layer must sit between the shader and any text: a vertical gradient from 60% black to transparent, or a glass panel with a 24px blur. Its only job is holding text contrast at 4.5:1 or better, and it is never omitted.",
      },
    },
  ],
  imagery: {
    zh: "图像即是着色器本身，不使用摄影与插画。允许产品截图放在玻璃面板内。禁止额外的背景图，它会与场打架。",
    en: "The shader is the imagery; photography and illustration are absent. Product screenshots may sit inside glass panels. No additional background image — it would fight the field.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 128px。首屏为 100vh，内容垂直居中并包在玻璃面板里。整个页面只有一个 canvas，其余内容全部是 DOM 层。",
    en: "Capped at 1120px with 24px padding, sections 128px apart. The hero fills 100vh with content centred inside a glass panel. The page holds one canvas; everything else is DOM.",
  },
  dos: [
    { zh: "用真实的 WebGL 片元着色器", en: "Use a real WebGL fragment shader" },
    { zh: "给 devicePixelRatio 设上限", en: "Cap devicePixelRatio" },
    { zh: "离屏时用 IntersectionObserver 暂停 rAF", en: "Pause rAF offscreen with IntersectionObserver" },
    { zh: "提供 WebGL 不可用的静态回退", en: "Provide a static fallback for missing WebGL" },
    { zh: "文字下必须有玻璃板或遮罩", en: "Text always sits on glass or a scrim" },
    { zh: "UI 只用一支紫色强调", en: "UI emphasis uses one violet only" },
  ],
  donts: [
    { zh: "不要用静态渐变图冒充实时着色器", en: "Never fake a live shader with a static gradient" },
    { zh: "不要不限 DPR（会掉帧）", en: "Do not leave DPR uncapped" },
    { zh: "不要在离屏时继续跑 rAF", en: "Do not keep rAF running offscreen" },
    { zh: "不要忽略 reduced-motion 与 WebGL 回退", en: "Do not skip reduced motion or the WebGL fallback" },
    { zh: "不要让文字直接压场", en: "Never put text straight on the field" },
    { zh: "不要放多个 canvas 或多支抢眼强调色", en: "No multiple canvases or loud extra accents" },
  ],
  promptGuide: {
    quickColors: {
      text: "#edeef2",
      background: "#08090d",
      accent: "#7c5cff",
      cyan: "#22d3ee",
      pink: "#f472b6",
      glass: "rgba(255,255,255,0.06)",
    },
    prompts: [
      {
        zh: "做一个着色器渐变首屏：底层一个满幅 canvas 跑 WebGL 片元着色器，用 #7c5cff、#22d3ee、#f472b6 三色做流动的网格渐变，颜色 25 秒缓慢呼吸；devicePixelRatio 封顶 2；用 IntersectionObserver 在离屏时暂停 requestAnimationFrame；WebGL 不可用时回退到同配色的静态渐变。上层放一块玻璃面板（rgba(255,255,255,0.06) 填充、24px 模糊、16px 圆角、1px rgba(255,255,255,0.1) 描边、内边距 24px），板内是 64px/600 标题（字距 -0.03em）与一个紫色 CTA（#7c5cff 填充、12px 圆角、16px/500）。",
        en: "Build a shader gradient hero: a full-bleed canvas at the bottom runs a WebGL fragment shader producing a flowing mesh gradient in #7c5cff, #22d3ee and #f472b6, breathing over 25 seconds, with devicePixelRatio capped at 2, requestAnimationFrame paused offscreen via IntersectionObserver, and a same-palette static gradient fallback when WebGL is unavailable. Above it sits a glass panel (rgba(255,255,255,0.06) fill, 24px blur, 16px radius, a 1px rgba(255,255,255,0.1) border, 24px padding) holding a 64px/600 headline at -0.03em and a violet CTA (#7c5cff fill, 12px radius, 16px/500).",
      },
    ],
  },
  similar: [
    { name: "Modern Gradient", why: { zh: "同样以渐变为视觉主体，但现代渐变是静态的，这里是实时计算的", en: "Both make the gradient the subject, though modern gradient is static while this computes live" } },
    { name: "Linear Style", why: { zh: "同样近黑加单一强调，但 Linear 没有着色器场", en: "Both near-black with a single accent, though Linear has no shader field" } },
  ],
  completeness: "full",
};
