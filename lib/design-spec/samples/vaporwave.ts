import type { DesignSpec } from "../types";

export const vaporwaveSpec: DesignSpec = {
  slug: "vaporwave",
  name: "霓虹复古",
  nameEn: "Vaporwave",
  cover: "/styles/vaporwave.svg",
  theme: "dark",
  northStar: {
    zh: "粉紫青三色渐变、扫描线、故障位移：一个坏掉的 1987 年系统。",
    en: "Pink-violet-cyan gradients, scanlines, glitch offsets — a 1987 system that booted wrong.",
  },
  summary: {
    zh: "霓虹复古（Vaporwave / Synthwave）是 80 到 90 年代未来想象的回收：粉、紫、青三色渐变铺底，霓虹发光必须是双色重影（粉与青各偏移 1 到 2px），扫描线与网格背景暗示 CRT 与透视地面。它的交互语汇也来自旧系统——点击时元素做 2px 的错位抖动，像错误弹窗。动效刻意慢：hover 用长时间漂浮而不是快速响应。禁止单调灰、禁止现代极简、禁止单色发光。",
    en: "Vaporwave and synthwave recycle the 1980s and 90s imagination of the future: pink, violet and cyan gradients underneath, neon glow that must ghost in two colors (pink and cyan offset by 1 to 2px), and scanlines with a perspective grid implying a CRT over a wireframe floor. Its interaction vocabulary comes from old systems too — a click jitters the element 2px, like a dialog erroring. Motion is deliberately slow: hover drifts over a long duration instead of snapping. Monotone grey, modern minimalism and single-color glow are all refused.",
  },
  colors: [
    {
      name: "荧光粉",
      nameEn: "Neon Pink",
      value: "#ff71ce",
      group: "brand",
      role: {
        zh: "第一主色与发光重影的暖侧。标题与主按钮的核心。",
        en: "The first primary and the warm half of the ghosting — core to headlines and buttons.",
      },
      token: "--color-neon-pink",
    },
    {
      name: "海水青",
      nameEn: "Seafoam Cyan",
      value: "#01cdfe",
      group: "brand",
      role: {
        zh: "第二主色与发光重影的冷侧。与粉成对出现，不可单独使用。",
        en: "The second primary and the cool half of the ghosting — always paired with pink.",
      },
      token: "--color-cyan",
    },
    {
      name: "深夜",
      nameEn: "Midnight",
      value: "#0d0221",
      group: "surface",
      role: {
        zh: "页面底。带紫的近黑，让粉与青的发光都能浮起来。",
        en: "The page ground — a violet-cast near black that floats both pink and cyan.",
      },
      token: "--color-midnight",
    },
    {
      name: "薄荷绿",
      nameEn: "Mint",
      value: "#05ffa1",
      group: "accent",
      role: {
        zh: "成功与「在线」状态，是第三支霓虹。",
        en: "Success and online states — the third neon.",
      },
      token: "--color-mint",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#b967ff",
      group: "accent",
      role: {
        zh: "渐变的中间站，用于让粉过渡到青。",
        en: "The gradient's middle stop, carrying pink into cyan.",
      },
      token: "--color-violet",
    },
    {
      name: "日光黄",
      nameEn: "Sunlight",
      value: "#fffb96",
      group: "accent",
      role: {
        zh: "高亮与关键数值，面积最小。",
        en: "Highlights and key figures at the smallest area.",
      },
      token: "--color-sunlight",
    },
  ],
  fonts: [
    {
      family: "Space Grotesk",
      substitute: "'Arial Black', 'Courier New', sans-serif",
      weights: [500, 700],
      sizes: [12, 14, 18, 24, 36, 52],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "0.02em", label: "0.24em" },
      role: {
        zh: "标题用方形无衬线，小标签用等宽全大写加 0.24em 的宽字距——宽字距是这套风格最强的年代信号。",
        en: "Squared sans for headlines, monospace uppercase labels at 0.24em — that wide tracking is the strongest period signal here.",
      },
      token: "--font-display",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400],
      sizes: [12, 13, 15],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.6 },
      tracking: { display: "0.04em", label: "0.24em" },
      role: {
        zh: "正文、标签与数据。等宽让整页像一份从旧系统导出的日志。",
        en: "Body, labels and data — the monospace makes the page read as a log exported from an old system.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Space Grotesk", weight: 700, size: 52, lineHeight: 1.05, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Space Grotesk", weight: 700, size: 36, lineHeight: 1.15, tracking: "0.02em", token: "--text-heading" },
    { role: "subheading", font: "Space Grotesk", weight: 500, size: 24, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "JetBrains Mono", weight: 400, size: 15, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", font: "JetBrains Mono", weight: 400, size: 13, lineHeight: 1.6, token: "--text-body" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 12, lineHeight: 1.4, tracking: "0.24em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1160,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "inputs", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Midnight", value: "#0d0221", purpose: "页面底" },
    { level: 1, name: "Panel", value: "rgba(255,113,206,0.06)", purpose: "卡片（粉调）" },
    { level: 2, name: "Grid Overlay", value: "repeating-linear-gradient", purpose: "网格与扫描线" },
  ],
  elevation: [
    { name: "Dual glow", value: "2px 2px 0 #01cdfe, -2px -2px 0 #ff71ce" },
    { name: "Neon bloom", value: "0 0 20px rgba(255,113,206,0.50)" },
    { name: "Text glow", value: "0 0 10px rgba(255,113,206,0.60), 0 0 20px rgba(1,205,254,0.40)" },
  ],
  components: [
    {
      name: "Neon Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "透明底、1px 荧光粉描边、4px 圆角，12px 等宽全大写 0.24em、padding 12px 24px，文字荧光粉并带双色文字发光（粉加青）。hover 时填充粉 12%、上浮 4px、发光扩到 24px，过渡 600ms ease-out（慢漂浮，不能快）；按下时元素做 2px 的 glitch 错位（X 轴 +2px、Y 轴 -2px）并在 120ms 内复位。",
        en: "Transparent fill, a 1px pink border, 4px radius, 12px monospace uppercase at 0.24em, 12px 24px padding, text in pink with dual-color glow (pink plus cyan). Hover fills 12% pink, lifts 4px and widens the glow to 24px over 600ms ease-out — slow drift, never snappy. Press glitches the element 2px out and back within 120ms.",
      },
      sizes: "padding 12px 24px; label 12px",
      states: "hover: fill 12%, lift 4px, slow; active: glitch 2px offset",
    },
    {
      name: "Glitch Card",
      role: { zh: "内容卡与面板", en: "Content cards and panels" },
      construction: {
        zh: "粉 6% 填充、4px 圆角、1px 青 30% 描边、内边距 24px，1px 粉 20% 的偏移重影（2px 2px 0）。标题 24px/500 带双色文字发光，正文 13px 等宽、粉白 75%。hover 时描边转粉 60%、重影换成青、上浮 2px，过渡 600ms。",
        en: "6% pink fill, 4px radius, a 1px cyan border at 30%, 24px padding, with a 1px pink ghost offset by 2px 2px. Title at 24px/500 with dual-color text glow, body at 13px monospace in 75% pink-white. Hover turns the border to 60% pink, swaps the ghost to cyan and lifts 2px over 600ms.",
      },
    },
    {
      name: "Grid Floor",
      role: { zh: "透视网格与扫描线背景", en: "The perspective grid and scanline bed" },
      construction: {
        zh: "底层用 repeating-linear-gradient 画 4px 间隔的青色 6% 横线（扫描线），再叠一层 40px 间隔的品红 8% 竖线构成网格。需要透视时用 transform: perspective(400px) rotateX(60deg) 做出地平线。整个覆盖层 pointer-events: none。",
        en: "A repeating gradient draws cyan scanlines at 6% every 4px, overlaid with magenta verticals at 8% every 40px to form a grid. Where perspective is wanted, transform: perspective(400px) rotateX(60deg) establishes a horizon. The whole layer stays pointer-events none.",
      },
    },
    {
      name: "Chrome Text",
      role: { zh: "铬金属标题（可选装饰）", en: "Chrome headline, optional ornament" },
      construction: {
        zh: "用 background-clip: text 填三段渐变（粉 → 紫 → 青），再叠 2px 的深色描边（-webkit-text-stroke）与双色重影。仅用于首屏主标题，单页最多一处，正文绝不使用。",
        en: "background-clip text filled with a three-stop gradient (pink to violet to cyan), a 2px dark stroke via -webkit-text-stroke, and dual-color ghosting. It belongs to the hero headline only, once per page, and never on body copy.",
      },
    },
    {
      name: "Status Strip",
      role: { zh: "底部状态条", en: "The bottom status strip" },
      construction: {
        zh: "固定在视口底部、高 32px、深夜底、顶部 1px 青 20% 描边，左侧 12px 等宽薄荷绿文字显示「在线」，右侧显示时间与坐标。像旧系统的状态栏。",
        en: "Pinned to the bottom at 32px tall on midnight, with a 1px cyan border at 20% along the top. The left shows a 12px monospace 'online' in mint; the right shows time and coordinates, like an old system's status bar.",
      },
    },
  ],
  imagery: {
    zh: "合成器风景、棕榈剪影、古典雕塑、透视网格与 CRT 扫描线。图像必须带粉紫调色与发光边缘。不使用写实摄影、自然光照片与现代插画。",
    en: "Synthesizer landscapes, palm silhouettes, classical statues, perspective grids and CRT scanlines. Imagery carries a pink-violet grade and glowing edges. No realistic photography, natural-light shots or modern illustration.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 24px，区块间距 96px。首屏常为居中大标题压在透视网格上。允许元素轻微倾斜与重叠，但网格背景必须贯穿全页以保持年代统一。",
    en: "Capped at 1160px with 24px padding, sections 96px apart. The hero is usually a centred headline riding a perspective grid. Elements may tilt and overlap slightly, but the grid bed must run the whole page to hold the era together.",
  },
  dos: [
    { zh: "粉紫青三色渐变", en: "Pink, violet and cyan gradients" },
    { zh: "发光必须是粉青双色重影", en: "Glow must ghost in pink and cyan" },
    { zh: "叠扫描线与透视网格", en: "Layer scanlines and a perspective grid" },
    { zh: "标签全大写、字距 0.24em", en: "Labels uppercase at 0.24em tracking" },
    { zh: "hover 用 600ms 慢漂浮", en: "Hover drifts over 600ms" },
    { zh: "点击做 2px 的 glitch 错位", en: "Click glitches by 2px" },
  ],
  donts: [
    { zh: "不要用单调灰配色", en: "No monotone grey palettes" },
    { zh: "不要做现代简约风", en: "No modern minimalism" },
    { zh: "不要省略霓虹发光", en: "Never omit the neon glow" },
    { zh: "不要用正式字体", en: "No formal typeface" },
    { zh: "不要只用单色发光", en: "Never glow in a single color" },
    { zh: "不要让交互过快", en: "Do not make interaction fast" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ff71ce",
      background: "#0d0221",
      cyan: "#01cdfe",
      violet: "#b967ff",
      mint: "#05ffa1",
      border: "rgba(1,205,254,0.30)",
    },
    prompts: [
      {
        zh: "做一个霓虹复古卡片：背景 rgba(255,113,206,0.06)、4px 圆角、1px rgba(1,205,254,0.3) 描边、内边距 24px、box-shadow 2px 2px 0 #01cdfe, -2px -2px 0 #ff71ce。标题 24px 荧光粉 #ff71ce，text-shadow 0 0 10px rgba(255,113,206,0.6), 0 0 20px rgba(1,205,254,0.4)。正文 13px 等宽。hover 时描边转 rgba(255,113,206,0.6)、translateY(-2px)，transition 600ms ease-out。页面底色 #0d0221，可叠 4px 间隔的青色 6% 扫描线。",
        en: "Build a vaporwave card: background rgba(255,113,206,0.06), 4px radius, a 1px rgba(1,205,254,0.3) border, 24px padding, box-shadow 2px 2px 0 #01cdfe and -2px -2px 0 #ff71ce. The title runs 24px in #ff71ce with text-shadow 0 0 10px rgba(255,113,206,0.6), 0 0 20px rgba(1,205,254,0.4). Body at 13px monospace. Hover turns the border to rgba(255,113,206,0.6) and translates -2px over 600ms ease-out. The page ground is #0d0221 with 4px cyan scanlines at 6%.",
      },
    ],
  },
  similar: [
    { name: "Cyberpunk Neon", why: { zh: "同样霓虹，但赛博朋克是青与品红单向发光，蒸汽波必须双色重影并有年代网格", en: "Also neon, though cyberpunk glows one color while vaporwave ghosts two and keeps a period grid" } },
    { name: "Y2K", why: { zh: "同属复古未来，但千禧是铬金属明亮，蒸汽波是紫黑暗淡", en: "Both retro-futures, though Y2K is bright chrome while vaporwave is violet and dim" } },
  ],
  completeness: "full",
};
