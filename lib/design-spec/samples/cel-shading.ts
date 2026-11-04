import type { DesignSpec } from "../types";

export const celShadingSpec: DesignSpec = {
  slug: "cel-shading",
  name: "赛璐璐动画风",
  nameEn: "Cel Shading",
  cover: "/styles/cel-shading.svg",
  theme: "light",
  northStar: {
    zh: "粗墨线、平涂、硬阴影：手绘动画的每一帧都只有两种颜色。",
    en: "Heavy ink lines, flat fills, hard shadows — every frame of hand-drawn animation holds only two values.",
  },
  summary: {
    zh: "赛璐璐来自传统动画的赛璐璐片上色法：每个色块都是平的，阴影只有一层并且是硬的，边缘用 3px 墨线勾出来。落到界面上有一条独特的时间规则——过渡只有 75ms，因为动画是抽帧的，不是流体缓动的；缓动必须用 linear 或 ease-in，绝不使用 ease-in-out。按下时元素做挤压变形（横向 110%、纵向 90%）并下沉，这是卡通物理而不是材料物理。",
    en: "Cel shading reproduces the hand-painted cels of traditional animation: every fill is flat, shadows come in exactly one hard layer, and edges are inked at 3px. On the web it carries a distinctive timing rule — transitions run at 75ms, because animation skips frames rather than easing fluidly, and easing must be linear or ease-in, never ease-in-out. Press deforms the element into a squash (110% wide, 90% tall) and sinks it, which is cartoon physics rather than material physics.",
  },
  colors: [
    {
      name: "墨线",
      nameEn: "Ink",
      value: "#1a1a2e",
      group: "brand",
      role: {
        zh: "所有 3px 描边、硬阴影与文字。墨线是这套风格的骨架。",
        en: "Every 3px stroke, hard shadow and text run — the ink is the skeleton.",
      },
      token: "--color-ink",
    },
    {
      name: "纸白",
      nameEn: "Cel White",
      value: "#fafaf5",
      group: "surface",
      role: {
        zh: "平涂底色。略带暖调，像动画用的赛璐璐片。",
        en: "The flat base tone, slightly warm like a paint cel.",
      },
      token: "--color-cel-white",
    },
    {
      name: "赤",
      nameEn: "Red",
      value: "#e63946",
      group: "accent",
      role: {
        zh: "主行动与高能状态。平涂、不渐变。",
        en: "Primary actions and high-energy states, flat filled with no gradient.",
      },
      token: "--color-red",
    },
    {
      name: "水蓝",
      nameEn: "Aqua",
      value: "#4ea8de",
      group: "accent",
      role: {
        zh: "信息与次级行动，是画面里的冷色块。",
        en: "Information and secondary actions — the cool block in the frame.",
      },
      token: "--color-aqua",
    },
    {
      name: "草绿",
      nameEn: "Grass",
      value: "#2ecc71",
      group: "accent",
      role: {
        zh: "成功与生命值，卡通语义里的正向。",
        en: "Success and health — the positive value in cartoon language.",
      },
      token: "--color-grass",
    },
    {
      name: "橙黄",
      nameEn: "Sunset",
      value: "#f1c40f",
      group: "accent",
      role: {
        zh: "高亮与能量，用于强调条与徽标。",
        en: "Highlights and energy, on emphasis bars and badges.",
      },
      token: "--color-sunset",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [700, 900],
      sizes: [14, 16, 20, 28, 40, 56],
      lineHeight: { display: 1, heading: 1.1, body: 1.5 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "全站唯一字体，只用 700 与 900。全大写、行高 1.0，让文字像标题框。",
        en: "The only face, in 700 and 900 only. Uppercase at 1.0 leading so text reads as a title card.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 56, lineHeight: 1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 40, lineHeight: 1.05, token: "--text-heading" },
    { role: "subheading", weight: 700, size: 28, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 700, size: 14, lineHeight: 1.35, tracking: "0.04em", token: "--text-label" },
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
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "badges", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Cel White", value: "#fafaf5", purpose: "页面底" },
    { level: 1, name: "Red Block", value: "#e63946", purpose: "强调区块" },
    { level: 2, name: "Aqua Block", value: "#4ea8de", purpose: "信息区块" },
  ],
  elevation: [
    { name: "Hard shadow", value: "4px 4px 0 #1a1a2e" },
    { name: "Hard shadow hover", value: "6px 6px 0 #1a1a2e" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Cel Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "赤色平涂、白字、3px 墨线描边、零圆角、4px 硬阴影，14px/900 全大写、padding 12px 24px。hover 时填充提亮到 #ff4d5a、上浮 4px、阴影扩到 6px，并有一道斜切白色 30% 的高光从左掠到右（300ms linear）。按下时横向缩放 1.1、纵向 0.9、位移 4px 8px、阴影归零——这是挤压变形，不是位移。过渡 75ms linear。",
        en: "Flat red fill, white text, a 3px ink border, zero radius, a 4px hard shadow, 14px/900 uppercase, 12px 24px padding. Hover brightens the fill to #ff4d5a, lifts 4px, widens the shadow to 6px and sweeps a skewed 30% white highlight across in 300ms linear. Press applies scaleX 1.1 and scaleY 0.9, translates 4px 8px and drops the shadow — that is a squash, not a move. 75ms linear.",
      },
      sizes: "padding 12px 24px; label 14px",
      states: "hover: lift 4px, shadow 6px; active: scaleX 1.1, scaleY 0.9, shadow none",
    },
    {
      name: "Cel Card",
      role: { zh: "内容卡与分镜卡", en: "Content and panel cards" },
      construction: {
        zh: "纸白平涂、3px 墨线描边、零圆角、内边距 24px、4px 硬阴影。标题 28px/900 全大写，正文 14px/700，字色 60% 墨。hover 时上浮并左移各 2px、阴影扩到 6px。过渡 75ms linear。",
        en: "Paper fill, a 3px ink border, zero radius, 24px padding, a 4px hard shadow. Titles at 28px/900 uppercase, body at 14px/700 in 60% ink. Hover translates -2px on both axes and widens the shadow to 6px. 75ms linear.",
      },
    },
    {
      name: "Ink Divider",
      role: { zh: "分区与描边线", en: "Section dividers and rules" },
      construction: {
        zh: "3px 纯墨线，横跨内容宽或全宽。用于分隔区块而不是留白——这套风格更依赖线条分区。允许 8px 的短粗线作为强调标记。",
        en: "A 3px pure ink rule spanning the content or viewport width. It divides sections instead of whitespace, since this style relies on lines. An 8px short stroke may serve as an emphasis mark.",
      },
    },
    {
      name: "Impact Badge",
      role: { zh: "状态与能量徽标", en: "Status and energy badges" },
      construction: {
        zh: "橙黄或草绿平涂、3px 墨线、999px 全圆角、14px/900 全大写、padding 4px 12px，可带 3px 硬阴影。用于「新」「完成」「关键」等一次性标记。",
        en: "Flat sunset or grass fill, a 3px ink border, fully rounded, 14px/900 uppercase, 4px 12px padding, optionally with a 3px hard shadow. It marks one-time states: new, done, critical.",
      },
    },
    {
      name: "Speed Lines",
      role: { zh: "速度线与动势装饰", en: "Speed lines and motion marks" },
      construction: {
        zh: "3 到 5 条 3px 墨线，长度 24px 到 64px 不等，以 15 度斜向排列在元素一侧，间距 8px。用于暗示运动方向，只出现在交互元素上，静态区块不加。",
        en: "Three to five 3px ink lines between 24px and 64px, arranged at a 15-degree angle on one side of an element, 8px apart. They imply direction and appear only on interactive elements, never on static blocks.",
      },
    },
  ],
  imagery: {
    zh: "平涂插画与赛璐璐上色：两种明度、硬边阴影、3px 描边。允许角色与道具插画。不使用摄影、渐变与柔和阴影。",
    en: "Flat illustration and cel painting: two values, hard-edged shadow, 3px outlines. Character and prop art is welcome. No photography, gradients or soft shadows.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 80px。元素可以轻微重叠与错位，像分镜排列。所有区块用 3px 墨线分隔，留白比其它硬边风格略少，因为线条本身承担了分隔。",
    en: "Capped at 1120px with 24px padding, sections 80px apart. Elements may overlap and offset slightly, like panels on a page. Every section divides with a 3px ink rule, and whitespace runs lighter than other hard-edge styles because the lines do the dividing.",
  },
  dos: [
    { zh: "3px 墨线包住每个元素", en: "Wrap every element in a 3px ink line" },
    { zh: "平涂填充，不用渐变", en: "Flat fills only, no gradients" },
    { zh: "阴影只有一层且无模糊", en: "One hard shadow layer, zero blur" },
    { zh: "过渡 75ms，缓动 linear 或 ease-in", en: "Transitions at 75ms on linear or ease-in" },
    { zh: "按下做挤压变形（110%/90%）", en: "Press squashes: 110% wide, 90% tall" },
    { zh: "零圆角，徽标除外", en: "Zero radius except on badges" },
  ],
  donts: [
    { zh: "不要用渐变色", en: "No gradient color" },
    { zh: "不要用细边框", en: "No thin borders" },
    { zh: "不要用低饱和或灰色调", en: "No desaturated or grey palettes" },
    { zh: "不要用 300ms 以上的丝滑过渡", en: "No smooth transition above 300ms" },
    { zh: "不要用 ease-in-out", en: "Never use ease-in-out" },
    { zh: "不要用模糊阴影", en: "No blurred shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a2e",
      background: "#fafaf5",
      red: "#e63946",
      aqua: "#4ea8de",
      grass: "#2ecc71",
      sunset: "#f1c40f",
    },
    prompts: [
      {
        zh: "做一个赛璐璐动画风按钮：背景 #e63946、白字、3px solid #1a1a2e 边框、border-radius 0、900 字重 14px 全大写、padding 12px 24px、box-shadow 4px 4px 0 #1a1a2e。hover 时背景 #ff4d5a、translateY(-4px)、阴影扩到 6px 6px 0 #1a1a2e。active 时 scaleX(1.1) scaleY(0.9) translate(4px,8px) 且阴影 none。transition 75ms linear。页面底色 #fafaf5。",
        en: "Build a cel-shaded button: background #e63946, white text, a 3px solid #1a1a2e border, border-radius 0, weight 900 at 14px uppercase, 12px 24px padding, box-shadow 4px 4px 0 #1a1a2e. Hover sets the background to #ff4d5a, translates -4px and widens the shadow to 6px 6px 0 #1a1a2e. Active applies scaleX(1.1) scaleY(0.9) translate(4px,8px) with no shadow. Transition 75ms linear. The page ground is #fafaf5.",
      },
    ],
  },
  similar: [
    { name: "Comic Style", why: { zh: "同为粗描边平涂，但漫画用对话气泡与网点，赛璐璐用挤压物理", en: "Both use heavy outlines and flat fills, though comics adds bubbles and halftone while cel shading adds squash physics" } },
    { name: "Neo-Brutalist Soft", why: { zh: "同样硬阴影与粗边，但那边更柔和克制、没有挤压变形", en: "Also hard shadows and heavy borders, though that one is softer and never squashes" } },
  ],
  completeness: "full",
};
