import type { DesignSpec } from "../types";

export const y2kSpec: DesignSpec = {
  slug: "y2k",
  name: "千禧风格",
  nameEn: "Y2K",
  cover: "/styles/y2k.svg",
  theme: "light",
  northStar: {
    zh: "铬金属、透明塑料、彩虹渐变：一个对未来过度乐观的界面。",
    en: "Chrome, clear plastic and rainbow gradients — an interface that was wildly optimistic about the future.",
  },
  summary: {
    zh: "千禧风格来自 1999 到 2003 年的数码美学：一切都要亮、要反光、要像刚从包装盒里拆出来。技术上靠三件事模拟——铬金属用多段线性渐变做出镜面反射，透明塑料用半透明白底加 1px 亮边和顶部高光，气泡用径向渐变加内高光做出球体感。颜色是高饱和的粉、青、品红与天蓝，常常叠在银灰底上。圆角极大（胶囊与球体），排版偏几何无衬线加宽字距，模拟当年的产品名。",
    en: "Y2K comes from the digital aesthetic of 1999 to 2003: everything had to be bright, reflective and fresh out of the box. Three techniques carry it — chrome built from multi-stop linear gradients to fake a mirror, clear plastic from a translucent white fill with a 1px bright edge and a top highlight, and bubbles from a radial gradient with an inner highlight. Colors are saturated pink, cyan, magenta and sky blue, often over silver. Radii run large, pills and spheres, and type leans geometric sans with wide tracking, imitating product names of the era.",
  },
  colors: [
    {
      name: "铬银",
      nameEn: "Chrome",
      value: "#c0c0c0",
      group: "surface",
      role: {
        zh: "金属面板与按钮底。必须叠多段渐变才有镜面感，单色会变成灰。",
        en: "Metal panels and button grounds; they need multi-stop gradients to mirror, or the tone collapses into grey.",
      },
      token: "--color-chrome",
    },
    {
      name: "塑料白",
      nameEn: "Plastic White",
      value: "rgba(255,255,255,0.55)",
      group: "surface",
      role: {
        zh: "透明塑料外壳填充，配 1px 亮边与顶部高光。",
        en: "The clear-plastic shell fill, paired with a 1px bright edge and a top highlight.",
      },
      token: "--color-plastic",
    },
    {
      name: "泡泡糖粉",
      nameEn: "Bubblegum",
      value: "#ff69b4",
      group: "accent",
      role: {
        zh: "主强调与气泡填充，是千禧审美最典型的颜色。",
        en: "Primary emphasis and bubble fill — the tone most identified with the era.",
      },
      token: "--color-bubblegum",
    },
    {
      name: "电子青",
      nameEn: "Electric Cyan",
      value: "#00ffff",
      group: "accent",
      role: {
        zh: "高光、边缘光与数据，与粉形成对比。",
        en: "Highlights, edge light and data, set against the pink.",
      },
      token: "--color-cyan",
    },
    {
      name: "品红",
      nameEn: "Magenta",
      value: "#ff00ff",
      group: "accent",
      role: {
        zh: "彩虹渐变的中段，用于按钮与边框。",
        en: "The middle of the rainbow gradient, used on buttons and borders.",
      },
      token: "--color-magenta",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#87ceeb",
      group: "accent",
      role: {
        zh: "渐变起点与背景，代表那个年代的「科技蓝」。",
        en: "Gradient start and background — the era's idea of tech blue.",
      },
      token: "--color-sky",
    },
  ],
  fonts: [
    {
      family: "Eurostile",
      substitute: "'Trebuchet MS', 'Arial Black', sans-serif",
      weights: [400, 700],
      sizes: [12, 14, 18, 24, 32, 44],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.55 },
      tracking: { display: "0.04em", label: "0.14em" },
      role: {
        zh: "标题与产品名用的几何无衬线，宽字距、全大写。字形的方与圆是那个年代的签名。",
        en: "The geometric sans for headings and product names, widely tracked and uppercase — its square-round forms are the era's signature.",
      },
      token: "--font-display",
    },
    {
      family: "Verdana",
      substitute: "'Segoe UI', system-ui, sans-serif",
      weights: [400, 700],
      sizes: [12, 13, 15],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.55 },
      tracking: { display: "0", label: "0.14em" },
      role: {
        zh: "正文与说明。选 Verdana 是因为它在 1024×768 时代最常出现。",
        en: "Body and captions. Verdana is chosen because it was everywhere at 1024×768.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Eurostile", weight: 700, size: 44, lineHeight: 1.1, tracking: "0.04em", token: "--text-display" },
    { role: "heading", font: "Eurostile", weight: 700, size: 32, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", font: "Eurostile", weight: 400, size: 24, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Verdana", weight: 400, size: 15, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", font: "Verdana", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body" },
    { role: "label", font: "Eurostile", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 80,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "24px" },
    { element: "bubbles", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Sky Gradient", value: "linear-gradient(#dff4ff, #ffffff)", purpose: "页面底" },
    { level: 1, name: "Plastic", value: "rgba(255,255,255,0.55)", purpose: "面板与卡片外壳" },
    { level: 2, name: "Chrome", value: "linear-gradient(#f0f0f0, #b8b8b8, #e8e8e8)", purpose: "金属条与按钮" },
  ],
  elevation: [
    { name: "Plastic shell", value: "0 8px 24px rgba(0,80,140,0.18), inset 0 1px 0 rgba(255,255,255,0.90)" },
    { name: "Bubble", value: "inset -8px -8px 16px rgba(255,105,180,0.45), inset 8px 8px 16px rgba(255,255,255,0.70)" },
    { name: "Chrome lip", value: "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.15)" },
  ],
  components: [
    {
      name: "Chrome Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "999px 全圆角、多段铬渐变（#f5f5f5 → #c8c8c8 → #9e9e9e → #e6e6e6）、深灰文字、1px #8a8a8a 描边，阴影 0 4px 10px 深蓝 20% 加 inset 0 1px 0 白 95% 与 inset 0 -1px 0 黑 15%。14px/700、0.1em 字距、padding 10px 28px。hover 时渐变整体上移（模拟光源变化）；按下时渐变反向并压暗。过渡 150ms。",
        en: "Fully rounded, a multi-stop chrome gradient (#f5f5f5 to #c8c8c8 to #9e9e9e to #e6e6e6), dark grey text, a 1px #8a8a8a border, shadow 0 4px 10px at 20% deep blue plus inset 0 1px 0 white at 95% and inset 0 -1px 0 black at 15%. 14px/700, 0.1em tracking, 10px 28px padding. Hover shifts the gradient to imply a moving light; press inverts and darkens it. 150ms.",
      },
      states: "hover: gradient shifts; active: inverted, darker",
    },
    {
      name: "Plastic Card",
      role: { zh: "内容卡与产品卡", en: "Content and product cards" },
      construction: {
        zh: "55% 白填充、24px 圆角、1px 白 80% 描边、内边距 24px，阴影 0 8px 24px 深蓝 18% 加 inset 0 1px 0 白 90%。hover 时填充升到 70%、阴影扩到 32px。卡片右上角可放一个 96px 的彩虹气泡（径向渐变 + 内高光）。",
        en: "55% white fill, 24px radius, a 1px white border at 80%, 24px padding, shadow 0 8px 24px at 18% deep blue plus inset 0 1px 0 white at 90%. Hover raises the fill to 70% and the shadow to 32px. A 96px rainbow bubble (radial gradient with an inner highlight) may sit top-right.",
      },
    },
    {
      name: "Bubble Element",
      role: { zh: "装饰气泡与图标底", en: "Decorative bubbles and icon beds" },
      construction: {
        zh: "全圆角球体，径向渐变从左上白 80% 过渡到主色的 100%，再叠一层 inset -8px -8px 16px 的深色内阴影与 inset 8px 8px 16px 的白色内高光，形成玻璃球质感。尺寸 48px 到 160px，可浮动在卡片外。",
        en: "A fully rounded sphere: a radial gradient from 80% white at the top-left into the full accent, then inset -8px -8px 16px of dark shade and inset 8px 8px 16px of white highlight, producing a glass ball. Sizes run 48px to 160px and may float outside a card.",
      },
    },
    {
      name: "Rainbow Border",
      role: { zh: "高亮边框与选中态", en: "Highlight borders and selection" },
      construction: {
        zh: "用 2px 的 conic 或线性彩虹渐变（天蓝→青→品红→粉→天蓝）作为边框，背景保持白色。实现上用 padding 1px 的渐变层加内层白底覆盖。只允许出现在一个主行动上。",
        en: "A 2px conic or linear rainbow gradient (sky to cyan to magenta to pink back to sky) as the border over a white fill, built from a gradient layer with 1px padding masked by an inner white panel. Only one primary action may carry it.",
      },
    },
    {
      name: "Pill Input",
      role: { zh: "搜索与表单输入", en: "Search and form input" },
      construction: {
        zh: "白 70% 填充、999px 全圆角、1px #b8d8e8 描边、padding 10px 20px、13px 字。聚焦时描边转电子青并加 0 0 0 3px 青色 30% 外环，同时叠一层顶部白色高光。",
        en: "70% white fill, fully rounded, a 1px #b8d8e8 border, 10px 20px padding at 13px. Focus turns the border electric cyan and adds a 3px ring at 30% cyan, with a white top highlight layered on.",
      },
    },
  ],
  imagery: {
    zh: "铬金属、透明塑料、彩色气泡、星芒与光线。允许把产品图放进透明塑料壳里。不使用哑光材质、极简摄影与任何沉静的图形。",
    en: "Chrome, clear plastic, colored bubbles, starbursts and light streaks. A product shot may sit inside a clear plastic shell. No matte materials, minimal photography or anything quiet.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 80px。允许元素大范围重叠与浮动，气泡可以溢出容器。首屏常见为居中标题加左右各一个大气泡。整体密度中等，但视觉元素很多。",
    en: "Capped at 1120px with 24px padding, sections 80px apart. Elements may overlap generously and float, with bubbles bleeding past the container. The hero is usually a centred headline flanked by two large bubbles. Density is moderate while visual elements are many.",
  },
  dos: [
    { zh: "铬金属用多段渐变，单色会变灰", en: "Chrome needs multi-stop gradients; one tone turns to grey" },
    { zh: "透明塑料必须有亮边与顶部高光", en: "Clear plastic needs a bright edge and a top highlight" },
    { zh: "气泡用径向渐变加双层内阴影", en: "Bubbles use a radial gradient plus two inner shadows" },
    { zh: "圆角大：胶囊与球体", en: "Large radii: pills and spheres" },
    { zh: "彩虹渐变只给一个主行动", en: "The rainbow gradient belongs to one primary action" },
    { zh: "全大写加宽字距的产品名", en: "Uppercase product names on wide tracking" },
  ],
  donts: [
    { zh: "不要用哑光纯色面板", en: "No matte flat panels" },
    { zh: "不要让铬金属只有单色", en: "Never leave chrome monochrome" },
    { zh: "不要把彩虹渐变用在多处", en: "Do not repeat the rainbow gradient" },
    { zh: "不要用小圆角", en: "No small radii" },
    { zh: "不要用沉静或极简的语言", en: "Nothing quiet or minimal" },
    { zh: "不要让气泡遮挡正文", en: "Never let a bubble cover the copy" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3a3a4a",
      background: "#dff4ff",
      chrome: "#c0c0c0",
      pink: "#ff69b4",
      cyan: "#00ffff",
      magenta: "#ff00ff",
    },
    prompts: [
      {
        zh: "做一个月 Y2K 铬金属按钮：border-radius 999px、background linear-gradient(to bottom, #f5f5f5, #c8c8c8, #9e9e9e, #e6e6e6)、1px #8a8a8a 边框、文字 #3a3a4a 700、0.1em 字距、padding 10px 28px、box-shadow 0 4px 10px rgba(0,80,140,0.2), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.15)。页面底色用 linear-gradient(#dff4ff, #ffffff)。",
        en: "Build a Y2K chrome button: border-radius 999px, background linear-gradient(to bottom, #f5f5f5, #c8c8c8, #9e9e9e, #e6e6e6), a 1px #8a8a8a border, #3a3a4a text at weight 700, 0.1em tracking, 10px 28px padding, box-shadow 0 4px 10px rgba(0,80,140,0.2), inset 0 1px 0 rgba(255,255,255,0.95) and inset 0 -1px 0 rgba(0,0,0,0.15). The page ground uses linear-gradient(#dff4ff, #ffffff).",
      },
    ],
  },
  similar: [
    { name: "Frutiger Aero", why: { zh: "同为 2000 年代数码美学，但那边更讲通透与自然", en: "Also 2000s digital aesthetics, though that one leans on clarity and nature" } },
    { name: "Vaporwave", why: { zh: "同一时代来源，但蒸汽波更怀旧、更暗", en: "Same era, though vaporwave is more nostalgic and darker" } },
  ],
  completeness: "full",
};
