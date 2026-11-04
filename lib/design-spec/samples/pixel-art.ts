import type { DesignSpec } from "../types";

export const pixelArtSpec: DesignSpec = {
  slug: "pixel-art",
  name: "像素艺术风",
  nameEn: "Pixel Art",
  cover: "/styles/pixel-art.svg",
  theme: "light",
  northStar: {
    zh: "没有过渡的世界：所有状态变化都是硬切，像 8-bit 游戏机。",
    en: "A world without interpolation: every state change is a hard cut, like an 8-bit console.",
  },
  summary: {
    zh: "像素艺术风的美学来自硬件限制：只有几种颜色、没有抗锯齿、没有过渡。落到网页上就是三条硬规则——零圆角、4px 纯黑边框、4px 零模糊的偏移阴影。最关键的一条是 transition-none：像素游戏是状态机而不是动画引擎，hover 与按下必须是瞬间完成，任何淡入淡出都会毁掉这个错觉。交互语义也照搬游戏：hover 直接把调色板里的某一个颜色换成另一个（红的按钮变蓝），按下时元素位移 4px 且阴影归零，像按钮被真正按到底。",
    en: "Pixel Art's aesthetic came from hardware limits: a handful of colors, no anti-aliasing, no interpolation. On the web it becomes three hard rules — zero radius, a 4px pure black border, and a 4px zero-blur offset shadow. The most important rule is transition-none: a pixel game is a state machine, not an animation engine, so hover and press must be instantaneous, and any fade destroys the illusion. Interaction semantics come from games too: hover swaps one palette color for another (a red button turns blue), and press translates the element 4px while the shadow collapses to zero, as if the button were pushed flush.",
  },
  colors: [
    {
      name: "深靛",
      nameEn: "Deep Indigo",
      value: "#1a1c2c",
      group: "brand",
      role: {
        zh: "所有边框、阴影、深色区块与正文。8-bit 调色板里最暗的一档。",
        en: "Every border, shadow, dark block and text run — the darkest step in the 8-bit palette.",
      },
      token: "--color-deep-indigo",
    },
    {
      name: "纸白",
      nameEn: "Paper",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "面板填充。只与深靛配对，不做灰度过渡。",
        en: "Panel fill, always paired with deep indigo; there are no grey transitions.",
      },
      token: "--color-paper",
    },
    {
      name: "像素红",
      nameEn: "Pixel Red",
      value: "#ff004d",
      group: "accent",
      role: {
        zh: "主行动与危险动作。hover 时会被换成像素蓝。",
        en: "Primary actions and hazards; hover swaps it for pixel blue.",
      },
      token: "--color-pixel-red",
    },
    {
      name: "像素绿",
      nameEn: "Pixel Green",
      value: "#00e436",
      group: "accent",
      role: {
        zh: "成功与生命值，游戏语义里的正向状态。",
        en: "Success and health — the positive state in game semantics.",
      },
      token: "--color-pixel-green",
    },
    {
      name: "像素蓝",
      nameEn: "Pixel Blue",
      value: "#29adff",
      group: "accent",
      role: {
        zh: "链接、选中态与 hover 替换色。",
        en: "Links, selection and the hover replacement color.",
      },
      token: "--color-pixel-blue",
    },
    {
      name: "像素黄",
      nameEn: "Pixel Yellow",
      value: "#ffec27",
      group: "accent",
      role: {
        zh: "金币、得分与高亮，用于需要立刻被看到的小元素。",
        en: "Coins, scores and highlights — anything that must be seen at once.",
      },
      token: "--color-pixel-yellow",
    },
  ],
  fonts: [
    {
      family: "Press Start 2P",
      substitute: "'Courier New', ui-monospace, monospace",
      weights: [400],
      sizes: [10, 12, 16, 24, 32],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.7 },
      tracking: { display: "0.05em", label: "0.12em" },
      role: {
        zh: "标题与按钮用像素字体，全大写；正文用等宽字体保持可读。字距必须偏宽，否则像素会粘在一起。",
        en: "Pixel type for headings and buttons, uppercase; monospace for body so it stays readable. Tracking stays wide or the pixels smear together.",
      },
      token: "--font-pixel",
    },
  ],
  typeScale: [
    { role: "display", weight: 400, size: 32, lineHeight: 1.2, tracking: "0.05em", token: "--text-display" },
    { role: "heading", weight: 400, size: 24, lineHeight: 1.3, tracking: "0.05em", token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 12, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 400, size: 10, lineHeight: 1.4, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1024,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#ffffff", purpose: "面板与卡片" },
    { level: 1, name: "Deep Indigo", value: "#1a1c2c", purpose: "深色区块与导航" },
  ],
  elevation: [
    { name: "Hard offset", value: "4px 4px 0 #1a1c2c" },
    { name: "Hover offset", value: "4px 4px 0 #ff004d" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Pixel Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "像素红填充、纸白字、4px 深靛边框、零圆角、4px 硬偏移阴影。字级 12px、全大写、字距 0.12em、padding 12px 24px。hover 时填充硬切到像素蓝、阴影硬切到像素红；按下时位移 4px 4px 且阴影归零。全程 transition-none。",
        en: "Pixel red fill, paper white text, a 4px deep indigo border, zero radius and a 4px hard offset shadow. 12px type, uppercase, 0.12em tracking, 12px 24px padding. Hover cuts the fill to pixel blue and the shadow to pixel red; press translates 4px 4px and collapses the shadow. transition-none throughout.",
      },
      sizes: "padding 12px 24px; label 12px",
      states: "hover: palette swap, no fade; active: translate 4px, shadow none",
    },
    {
      name: "Pixel Card",
      role: { zh: "内容卡与关卡卡片", en: "Content and level cards" },
      construction: {
        zh: "纸白填充、4px 深靛边框、零圆角、内边距 24px、4px 硬阴影。标题 24px 全大写，正文 12px 等宽。hover 时边框与阴影硬切到像素红、标题文字同步变红，元素本身不位移。",
        en: "Paper white fill, a 4px deep indigo border, zero radius, 24px padding and a 4px hard shadow. Title at 24px uppercase, body at 12px monospace. Hover cuts border and shadow to pixel red and the title with them; nothing translates.",
      },
    },
    {
      name: "Pixel Input",
      role: { zh: "输入框", en: "Input field" },
      construction: {
        zh: "纸白填充、4px 深靛边框、零圆角、padding 12px 16px、12px 等宽全大写。占位符用深靛 50%。聚焦时用 2px 像素蓝的内描边（inset 0 0 0 2px），不改外框尺寸。",
        en: "Paper white fill, a 4px deep indigo border, zero radius, 12px 16px padding, 12px monospace uppercase. The placeholder sits at 50% deep indigo. Focus draws a 2px pixel blue inset ring without resizing the outer box.",
      },
    },
    {
      name: "Pixel Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "深靛填充、底部 4px 像素红边框、白字全大写、字距 0.05em。链接 12px，hover 直接换成纸白（硬切），选中项用像素黄。高度 56px，无圆角无阴影。",
        en: "Deep indigo fill, a 4px pixel red bottom border, uppercase white type at 0.05em tracking. Links are 12px and cut straight to paper white on hover; the active item takes pixel yellow. 56px tall, no radius, no shadow.",
      },
    },
  ],
  imagery: {
    zh: "像素画与 8-bit 图标是唯一图像语言。允许把照片降采样成像素图。不使用矢量插画、柔和摄影与任何抗锯齿图形。",
    en: "Pixel art and 8-bit icons are the only imagery. A photograph may be downsampled into pixels. No vector illustration, soft photography or anti-aliased graphics.",
  },
  layout: {
    zh: "上限 1024px、容器内边距 24px，区块间距 64px。所有尺寸取 4 的倍数，元素按 4px 网格对齐。允许用点阵棋盘格作为区块背景，但面积不超过一屏的 30%。",
    en: "Capped at 1024px with 24px padding, sections 64px apart. Every dimension is a multiple of four and elements snap to a 4px grid. A checkerboard may back a section, never more than thirty percent of a screen.",
  },
  dos: [
    { zh: "零圆角、4px 边框、4px 硬阴影", en: "Zero radius, 4px borders, 4px hard shadows" },
    { zh: "全程 transition-none，状态硬切", en: "transition-none everywhere; states cut" },
    { zh: "hover 做调色板替换，不做淡入", en: "Hover swaps palette colors, never fades" },
    { zh: "按下位移等于阴影偏移量", en: "Press translates exactly the shadow offset" },
    { zh: "字号取 8-bit 值：10、12、16、24、32", en: "Sizes come from the 8-bit set: 10, 12, 16, 24, 32" },
    { zh: "所有尺寸是 4 的倍数", en: "Every dimension is a multiple of four" },
  ],
  donts: [
    { zh: "不要用任何圆角", en: "No border radius anywhere" },
    { zh: "不要用渐变或柔和阴影", en: "No gradients or soft shadows" },
    { zh: "不要用 transition-* 除 none", en: "No transition-* except none" },
    { zh: "不要用细边框", en: "No thin borders" },
    { zh: "不要在 hover 里做 opacity 过渡", en: "No opacity transitions on hover" },
    { zh: "不要用超出调色板的颜色", en: "Never step outside the palette" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1c2c",
      background: "#ffffff",
      red: "#ff004d",
      green: "#00e436",
      blue: "#29adff",
      yellow: "#ffec27",
    },
    prompts: [
      {
        zh: "做一个像素风按钮：背景 #ff004d、白字、4px solid #1a1c2c 边框、border-radius 0、box-shadow 4px 4px 0 #1a1c2c、12px 全大写 0.12em 字距、padding 12px 24px、transition: none。hover 时背景硬切到 #29adff、阴影硬切到 #ff004d；active 时 transform: translate(4px, 4px)、box-shadow 设为 none。",
        en: "Build a pixel button: background #ff004d, white text, a 4px solid #1a1c2c border, border-radius 0, box-shadow 4px 4px 0 #1a1c2c, 12px uppercase at 0.12em tracking, 12px 24px padding and transition: none. Hover cuts the background to #29adff and the shadow to #ff004d; active applies transform translate(4px, 4px) and box-shadow none.",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist", why: { zh: "同样是硬阴影与零圆角，但像素风禁止过渡与调色板渐变", en: "Also hard shadows and zero radius, though pixel art forbids transitions and palette drift" } },
    { name: "Arcade CRT", why: { zh: "同一套游戏语义，但那边加了屏幕扫描线与发光", en: "Same game semantics, though that one adds scanlines and phosphor glow" } },
  ],
  completeness: "full",
};
