import type { DesignSpec } from "../types";

export const liquidGlassSpec: DesignSpec = {
  slug: "liquid-glass",
  name: "Apple 流动玻璃",
  nameEn: "Apple Liquid Glass",
  cover: "/styles/liquid-glass.svg",
  theme: "dark",
  northStar: {
    zh: "玻璃不只是模糊：它折射背后、边缘泛出彩虹，还会流动。",
    en: "Glass does not merely blur — it refracts what is behind it, glows rainbow at the rim, and flows.",
  },
  summary: {
    zh: "流动玻璃是玻璃拟态的下一步：不再满足于把背景模糊掉，而是试图模拟光穿过材质的折射。做法有三层堆叠——最外是一圈由红、青、紫组成的一像素渐变边（像棱镜的色散），中间是 40px 模糊加 1.8 倍饱和度增强的玻璃体，最内是一道顶部白色高光。容器在深靛底上堆成 20 到 32px 圆角，圆角越大，边缘光越明显。形变是这套语言的核心动词：按钮按下时不是缩放，而是轻微形变流动。",
    en: "Liquid Glass is the next step after glassmorphism: no longer content to blur the backdrop, it tries to model light refracting through a material. Three layers stack up — a one-pixel gradient rim of red, cyan and violet like a prism's dispersion; a body at 40px blur and 1.8x saturation; and a white highlight along the top edge. Containers sit on a deep indigo ground at 20 to 32px radii, and the larger the radius the more visible the rim light. Deformation is the core verb of this language: pressing a button flows the shape rather than scaling it.",
  },
  colors: [
    {
      name: "玻璃体",
      nameEn: "Glass Body",
      value: "rgba(255,255,255,0.10)",
      group: "surface",
      role: {
        zh: "所有玻璃容器的填充。必须配 40px 模糊与 1.8 倍饱和度，单独使用会变成灰片。",
        en: "The fill of every glass container. It requires 40px blur and 1.8x saturation; alone it reads as a grey sheet.",
      },
      token: "--color-glass-body",
    },
    {
      name: "玻璃抬起",
      nameEn: "Glass Raised",
      value: "rgba(255,255,255,0.15)",
      group: "surface",
      role: {
        zh: "hover 态与需要靠近观者一层的容器。",
        en: "Hover states and containers that should sit one layer closer to the viewer.",
      },
      token: "--color-glass-raised",
    },
    {
      name: "棱镜红",
      nameEn: "Prism Red",
      value: "#ff6b6b",
      group: "accent",
      role: {
        zh: "边缘光的第一段。只出现在 1px 边框渐变里，从不作为填充。",
        en: "The first stop of the rim light, appearing only in the 1px gradient border, never as a fill.",
      },
      token: "--color-prism-red",
    },
    {
      name: "棱镜青",
      nameEn: "Prism Cyan",
      value: "#4ecdc4",
      group: "accent",
      role: {
        zh: "边缘光的中段，也是标题描边与副标题发光的颜色。",
        en: "The middle stop of the rim, and the color used for headline strokes and subtitle glow.",
      },
      token: "--color-prism-cyan",
    },
    {
      name: "棱镜紫",
      nameEn: "Prism Violet",
      value: "#a855f7",
      group: "accent",
      role: {
        zh: "边缘光的末段与聚焦环。是这套系统里唯一的「电」色。",
        en: "The last stop of the rim and the focus ring — the only electric tone in the system.",
      },
      token: "--color-prism-violet",
    },
    {
      name: "深靛底",
      nameEn: "Deep Indigo",
      value: "#1a1a2e",
      group: "surface",
      role: {
        zh: "页面底色，向下渐变到 #0f0f23。玻璃必须有深底才折射得出来。",
        en: "Page ground fading to #0f0f23. Glass only refracts against a deep base.",
      },
      token: "--color-deep-indigo",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 28, 40, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.03em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。标题允许 3px 描边与渐变填充，正文保持纯白以维持可读。",
        en: "The only face. Headlines may take a 3px stroke and gradient fill; body stays solid white for legibility.",
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
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "20px" },
    { element: "inputs", value: "16px" },
    { element: "panels", value: "32px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Indigo", value: "#1a1a2e", purpose: "页面底，向下渐变到 #0f0f23" },
    { level: 1, name: "Glass Body", value: "rgba(255,255,255,0.10)", purpose: "标准玻璃容器" },
    { level: 2, name: "Glass Raised", value: "rgba(255,255,255,0.15)", purpose: "hover 与非模态浮层" },
  ],
  elevation: [
    { name: "Glass rest", value: "0 12px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.40)" },
    { name: "Glass hover", value: "0 18px 42px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.45)" },
  ],
  components: [
    {
      name: "Prism Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "10% 白玻璃体、40px 模糊、1.8 倍饱和度、20px 圆角、白字 500、padding 16px 32px。最关键的是两层伪元素：外层 inset 0、1px 内边距，填充红→青→紫渐变，作为棱镜边；内层 inset 1px、19px 圆角，填充 10% 白，把边缘光只留在 1px 上。hover 时玻璃升到 15%、描边转白 40%、阴影扩到 42px、整体放大 1.02。过渡 500ms ease-out。",
        en: "A 10% white glass body at 40px blur and 1.8x saturation, 20px radius, white 500-weight label, 16px 32px padding. The critical part is two pseudo elements: an outer layer inset 0 with 1px padding filled by a red-to-cyan-to-violet gradient, forming the prism rim, and an inner layer inset 1px on a 19px radius filled with 10% white so the rim stays exactly 1px. Hover raises the glass to 15%, the border to 40% white, the shadow to 42px and scales to 1.02. 500ms ease-out.",
      },
      sizes: "padding 16px 32px; radius 20px",
      states: "hover: glass 15%, prism rim visible, scale 1.02",
    },
    {
      name: "Prism Card",
      role: { zh: "内容卡与功能卡", en: "Content and feature card" },
      construction: {
        zh: "10% 白玻璃、40px 模糊、1.8 倍饱和度、24px 圆角、1px 白 20% 描边、内边距 32px。棱镜边用 1px 渐变伪元素实现，内层用从上到下 15% 白到透明的渐变制造顶部受光。hover 时玻璃升到 15%、描边转白、阴影扩到 42px、上浮 4px。过渡 500ms。",
        en: "10% white glass at 40px blur and 1.8x saturation, 24px radius, a 1px white border at 20%, 32px padding. The prism rim is a 1px gradient pseudo element, and an inner layer runs a 15% white-to-transparent vertical gradient for top-light. Hover raises the glass to 15%, turns the border white, widens the shadow to 42px and lifts 4px. 500ms.",
      },
    },
    {
      name: "Glass Input",
      role: { zh: "表单与搜索", en: "Forms and search" },
      construction: {
        zh: "10% 白玻璃、40px 模糊、16px 圆角、1px 白 20% 描边、padding 12px 16px、14px 字。占位符白 50%。聚焦时描边消失，改为 2px 紫 50% 的外环加 20px 紫 20% 的光晕，玻璃升到 15%。过渡 500ms ease-out。",
        en: "10% white glass at 40px blur, 16px radius, a 1px white border at 20%, 12px 16px padding at 14px. The placeholder sits at 50% white. Focus drops the border and applies a 2px ring at 50% violet plus a 20px glow at 20% violet, with the glass rising to 15%. 500ms ease-out.",
      },
    },
    {
      name: "Floating Glass Bar",
      role: { zh: "固定导航与底部工具条", en: "Pinned navigation and bottom toolbars" },
      construction: {
        zh: "5% 白玻璃、40px 模糊、仅一侧 1px 白 10% 描边。整条阴影用一条 1px 白 10% 的外线加上一条 1px 紫 20% 的内线，制造「玻璃边缘被光照到」的感觉。链接白 70%，hover 转纯白。",
        en: "5% white glass at 40px blur with a 1px white border at 10% on one side only. The whole bar takes one 1px outer white line at 10% plus one 1px inner violet line at 20%, so the glass edge reads as lit. Links sit at 70% white and go solid on hover.",
      },
    },
    {
      name: "Chromatic Headline",
      role: { zh: "首屏大标题", en: "Hero headline" },
      construction: {
        zh: "紫→品红→紫的横向渐变填充（background-clip: text）、3px 青色描边（-webkit-text-stroke）、4px 4px 的深色偏移阴影制造立体。副标题另用 0 0 20px 青色发光。全页只允许一个这样的标题。",
        en: "A violet-to-fuchsia-to-violet horizontal gradient clipped to the text, a 3px cyan stroke via -webkit-text-stroke, and a 4px 4px dark offset shadow for depth. Subtitles separately take a 0 0 20px cyan glow. One such headline per page.",
      },
    },
  ],
  imagery: {
    zh: "必须有可折射的内容：夜景、光线、彩色渐变背景或产品渲染。允许在玻璃后放动态光斑。不使用纯色平面背景，没有内容可折射时玻璃会退化成灰片。",
    en: "Something must exist to refract: night scenes, light, colored gradients or product renders, with light wells allowed behind the glass. No flat solid grounds — without content to bend, the glass degrades into a grey sheet.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 128px。hero 居中，玻璃面板叠在渐变底上，允许 2 到 3 层玻璃前后堆叠（最远一层不透明度最低）。固定导航条贴顶，滚动时保持模糊。",
    en: "Capped at 1120px with 24px padding, sections 128px apart. The hero is centred with glass panels stacked over a gradient ground, allowing two or three layers front to back, the farthest at the lowest opacity. A pinned navigation bar keeps its blur while scrolling.",
  },
  dos: [
    { zh: "棱镜边必须只有 1px", en: "The prism rim must be exactly 1px" },
    { zh: "玻璃体配 40px 模糊与 1.8 倍饱和度", en: "Pair the glass body with 40px blur and 1.8x saturation" },
    { zh: "深靛底，不用纯黑", en: "Ground in deep indigo, never pure black" },
    { zh: "圆角 20px 起，容器 32px", en: "Radius starts at 20px, panels at 32px" },
    { zh: "每页只允许一个彩虹标题", en: "One chromatic headline per page" },
    { zh: "玻璃后面必须有内容可折射", en: "Glass needs content behind it to refract" },
  ],
  donts: [
    { zh: "不要把棱镜边做成 2px 以上", en: "Never take the prism rim past 2px" },
    { zh: "不要在纯色平面上用这套材质", en: "Do not use this material on a flat solid ground" },
    { zh: "不要给玻璃上色，颜色属于背景", en: "Never tint the glass; color belongs to the background" },
    { zh: "不要用低模糊值", en: "No low blur values" },
    { zh: "不要在多处使用彩虹标题", en: "Do not repeat the chromatic headline" },
    { zh: "不要用快速过渡，玻璃流动是慢的", en: "No fast transitions; glass flows slowly" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#1a1a2e",
      glass: "rgba(255,255,255,0.10)",
      rimA: "#ff6b6b",
      rimB: "#4ecdc4",
      rimC: "#a855f7",
    },
    prompts: [
      {
        zh: "做一个流动玻璃按钮：background rgba(255,255,255,0.1)、backdrop-filter blur(40px) saturate(1.8)、20px 圆角、白字 500、padding 16px 32px。用 before 伪元素 inset:0、padding:1px、background linear-gradient(to right, #ff6b6b, #4ecdc4, #a855f7) 做 1px 棱镜边，用 after 伪元素 inset:1px、border-radius 19px、background rgba(255,255,255,0.1) 盖住内部。hover 时 background 升到 0.15、scale(1.02)、阴影扩到 0 18px 42px rgba(0,0,0,0.22)，过渡 500ms ease-out。页面底色 #1a1a2e。",
        en: "Build a liquid glass button: background rgba(255,255,255,0.1), backdrop-filter blur(40px) saturate(1.8), 20px radius, white 500-weight label, 16px 32px padding. A before pseudo element with inset 0, 1px padding and background linear-gradient(to right, #ff6b6b, #4ecdc4, #a855f7) forms the 1px prism rim, while an after element with inset 1px, 19px radius and rgba(255,255,255,0.1) masks the interior. Hover raises the background to 0.15, scales 1.02 and widens the shadow to 0 18px 42px rgba(0,0,0,0.22), over 500ms ease-out. The page ground is #1a1a2e.",
      },
    ],
  },
  similar: [
    { name: "Glassmorphism", why: { zh: "同一材质的上一代：只模糊，不折射也没有棱镜边", en: "The previous generation of this material: blur only, no refraction or rim" } },
    { name: "Apple Style", why: { zh: "同源的克制与系统感，但那边是亮色与实色", en: "Shares the restraint and system feel, though that one is light and solid" } },
  ],
  completeness: "full",
};
