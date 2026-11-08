import type { DesignSpec } from "../types";

export const comicStyleSpec: DesignSpec = {
  slug: "comic-style",
  name: "漫画风格",
  nameEn: "Comic Style",
  cover: "/styles/comic-style.svg",
  theme: "light",
  northStar: {
    zh: "粗墨线、硬阴影、对话气泡与爆炸字：屏幕上的一本漫画分镜。",
    en: "Heavy ink lines, hard shadows, speech bubbles and burst lettering — a comic panel on screen.",
  },
  summary: {
    zh: "漫画风格把印刷漫画的语汇搬到界面上：4px 纯黑墨线包围每个元素，4px 零模糊阴影模拟套印偏移，网点（halftone）作为背景纹理，信息装在对话气泡里而不是卡片里。字体必须粗、必须全大写、字距放宽，像标题框。动效要夸张但短：hover 时元素放大 1.05 并旋转 1 度，时长不超过 100ms，像分镜之间的跳切。圆角只允许给气泡，其它一律直角。",
    en: "Comic Style moves print comics onto the interface: a 4px pure black ink line around every element, a 4px zero-blur shadow imitating print misregistration, halftone dots as background texture, and information carried in speech bubbles rather than cards. Type is heavy, uppercase and widely tracked, like a title panel. Motion is exaggerated but short: hover scales to 1.05 and rotates a degree within 100ms, cutting like a panel change. Radius is granted to bubbles only; everything else stays square.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "所有边框、阴影、正文与气泡描边。墨线是这套风格唯一的结构语言。",
        en: "Every border, shadow, body run and bubble stroke — the ink line is the only structural device here.",
      },
      token: "--color-ink",
    },
    {
      name: "纸白",
      nameEn: "Paper",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "分镜底色。保持印刷纸的干净，网点才显得出来。",
        en: "Panel ground, kept clean so the halftone dots stay visible.",
      },
      token: "--color-paper",
    },
    {
      name: "漫画红",
      nameEn: "Comic Red",
      value: "#ff3333",
      group: "accent",
      role: {
        zh: "动作、警告与冲击字。用来标记「这一格很重要」。",
        en: "Action, alerts and impact lettering — it marks the panel that matters.",
      },
      token: "--color-comic-red",
    },
    {
      name: "漫画黄",
      nameEn: "Comic Yellow",
      value: "#ffcc00",
      group: "accent",
      role: {
        zh: "高亮与爆炸效果，通常配红色使用。",
        en: "Highlights and burst effects, usually paired with red.",
      },
      token: "--color-comic-yellow",
    },
    {
      name: "漫画蓝",
      nameEn: "Comic Blue",
      value: "#3366ff",
      group: "accent",
      role: {
        zh: "链接、信息气泡与「系统」语义。",
        en: "Links, info bubbles and system-voice semantics.",
      },
      token: "--color-comic-blue",
    },
    {
      name: "漫画绿",
      nameEn: "Comic Green",
      value: "#33cc33",
      group: "accent",
      role: {
        zh: "成功与「过关」状态，出现频率最低。",
        en: "Success and level-cleared states, the least frequent.",
      },
      token: "--color-comic-green",
    },
  ],
  fonts: [
    {
      family: "Bangers",
      substitute: "'Impact', 'Arial Black', sans-serif",
      weights: [400],
      sizes: [20, 28, 40, 56],
      lineHeight: { display: 1, heading: 1.05, body: 1.5 },
      tracking: { display: "0.02em", label: "0.08em" },
      role: {
        zh: "标题与冲击字。漫画字体带手绘的不规则，是这套风格的语气。",
        en: "Headings and impact words. A comic face carries hand-drawn irregularity, which is this style's voice.",
      },
      token: "--font-display",
    },
    {
      family: "Comic Neue",
      substitute: "'Comic Sans MS', 'Segoe UI', sans-serif",
      weights: [400, 700],
      sizes: [13, 15, 18],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.55 },
      tracking: { display: "0.01em", label: "0.08em" },
      role: {
        zh: "气泡内文字与正文。必须可读，且保持手写感。",
        en: "Bubble copy and body text — readable while keeping the hand-lettered feel.",
      },
      token: "--font-body",
    },
  ],
  typeScale: [
    { role: "display", font: "Bangers", weight: 400, size: 56, lineHeight: 1, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Bangers", weight: 400, size: 40, lineHeight: 1.05, token: "--text-heading" },
    { role: "subheading", font: "Bangers", weight: 400, size: 28, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body-lg", font: "Comic Neue", weight: 700, size: 18, lineHeight: 1.45, token: "--text-body-lg" },
    { role: "body", font: "Comic Neue", weight: 400, size: 15, lineHeight: 1.55, token: "--text-body" },
    { role: "label", font: "Comic Neue", weight: 700, size: 13, lineHeight: 1.3, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "bubbles", value: "24px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#ffffff", purpose: "分镜底色" },
    { level: 1, name: "Halftone", value: "radial-gradient(#1a1a1a 1px, transparent 1px) 6px", purpose: "网点纹理层" },
  ],
  elevation: [
    { name: "Print offset", value: "4px 4px 0 #1a1a1a" },
    { name: "Offset red", value: "4px 4px 0 #ff3333" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Ink Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "纸白填充、4px 墨黑边框、零圆角、4px 硬阴影、18px 全大写粗体、字距 0.08em、padding 14px 28px。hover 时填充硬切到漫画黄、放大 1.05、旋转 1 度、时长 100ms；按下时位移 4px 4px 且阴影归零。",
        en: "Paper white fill, a 4px ink border, zero radius, a 4px hard shadow, 18px bold uppercase at 0.08em tracking, 14px 28px padding. Hover cuts the fill to comic yellow, scales 1.05 and rotates a degree within 100ms; press translates 4px 4px and removes the shadow.",
      },
      sizes: "padding 14px 28px; label 18px",
      states: "hover: yellow fill, scale 1.05, rotate 1deg; active: translate 4px, shadow none",
    },
    {
      name: "Speech Bubble",
      role: { zh: "信息容器（替代卡片）", en: "The information container, replacing cards" },
      construction: {
        zh: "纸白填充、3px 墨黑描边、24px 圆角（唯一允许圆角的元素）、内边距 20px、4px 硬阴影。用两个伪元素画尾巴：一个 3px 描边的三角，一个盖住描边的白色三角，形成中空的对话尖端。文字 15px，行高 1.55。",
        en: "Paper white fill, a 3px ink stroke, 24px radius (the only element allowed radius), 20px padding, a 4px hard shadow. The tail is two pseudo elements: a 3px-stroked triangle and a white triangle covering the stroke, leaving the tip hollow. Copy at 15px on 1.55 leading.",
      },
    },
    {
      name: "Halftone Panel",
      role: { zh: "背景分镜块", en: "Background panel" },
      construction: {
        zh: "白底上叠一层 6px 间距的径向网点（半径 1px、墨黑），整体不透明度 12%。用于给一块区域加印刷质感，面积不超过一屏的 40%。块本身可加 4px 墨线边框，形成分镜格。",
        en: "A white ground carrying radial halftone dots at 6px spacing (1px radius, ink) at 12% opacity. It adds print texture to a region and never covers more than forty percent of a screen. The block may take a 4px ink border to read as a panel.",
      },
    },
    {
      name: "Burst Lettering",
      role: { zh: "冲击字与强调标题", en: "Impact words and emphatic headings" },
      construction: {
        zh: "漫画字体 40 到 56px、全大写、填充漫画红或黄、2px 墨黑描边（-webkit-text-stroke）、4px 4px 的墨黑偏移阴影。允许旋转 -3 到 3 度。一屏最多一处。",
        en: "Comic display type at 40 to 56px, uppercase, filled with comic red or yellow, a 2px ink stroke via -webkit-text-stroke, and a 4px 4px ink offset shadow. Rotation ranges from -3 to 3 degrees. One per screen.",
      },
    },
    {
      name: "Panel Grid",
      role: { zh: "分镜格容器", en: "The panel grid" },
      construction: {
        zh: "2 到 3 列网格、12px 间隙、每格 4px 墨线边框、零圆角。格子高度可以不同，允许一格跨两列作为主镜头。网格外留 48px 白边，模拟印刷页的页边距。",
        en: "A two or three column grid with 12px gutters, each cell bordered by a 4px ink line, no radius. Cells may differ in height and one may span two columns as the establishing shot. A 48px margin surrounds the grid, standing in for a printed page's edge.",
      },
    },
  ],
  imagery: {
    zh: "漫画分镜与原稿风格的插画：粗描边、平涂、网点阴影。允许把照片处理成网点单色后放入分镜格。不使用写实摄影、渐变与柔和阴影。",
    en: "Comic panels and inked illustration: heavy outlines, flat fills, halftone shading. A photo may be reduced to a single-tone halftone inside a panel. No realistic photography, gradients or soft shadows.",
  },
  layout: {
    zh: "上限 1120px、2 到 3 列分镜格、12px 间隙，页面外留 48px 白边。区块之间用一条贯穿的 4px 墨线分隔，像翻页。首屏通常是一整格全幅标题加一个对话气泡。",
    en: "Capped at 1120px with two or three panel columns, 12px gutters and a 48px outer margin. Sections divide with a full-width 4px ink line like a page turn. The hero is usually one full-width panel with the title and a single speech bubble.",
  },
  dos: [
    { zh: "4px 墨线包住每个元素", en: "Wrap every element in a 4px ink line" },
    { zh: "硬阴影模拟套印偏移", en: "Hard shadows imitate print misregistration" },
    { zh: "圆角只给对话气泡", en: "Radius belongs to speech bubbles only" },
    { zh: "网点作为背景纹理", en: "Halftone dots serve as background texture" },
    { zh: "动效不超过 100ms，动作要夸张", en: "Motion stays under 100ms and lands big" },
    { zh: "标题用漫画体，全大写", en: "Headings use a comic face, uppercase" },
  ],
  donts: [
    { zh: "不要用 2px 以下的细边框", en: "No borders thinner than 3px" },
    { zh: "不要用柔和阴影", en: "No soft shadows" },
    { zh: "不要把渐变当主要视觉", en: "Never make a gradient the main visual" },
    { zh: "不要给卡片加圆角", en: "No rounding on cards" },
    { zh: "不要用超过 100ms 的动效", en: "No motion longer than 100ms" },
    { zh: "不要用正式的无衬线体做标题", en: "Do not set headings in a formal sans" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#ffffff",
      red: "#ff3333",
      yellow: "#ffcc00",
      blue: "#3366ff",
      green: "#33cc33",
    },
    prompts: [
      {
        zh: "做一个漫画风按钮：白底、4px solid #1a1a1a 边框、border-radius 0、box-shadow 4px 4px 0 #1a1a1a、18px 粗体全大写 0.08em 字距、padding 14px 28px。hover 时背景硬切到 #ffcc00、transform scale(1.05) rotate(1deg)、transition 100ms；active 时 translate(4px,4px)、box-shadow none。",
        en: "Build a comic button: white fill, a 4px solid #1a1a1a border, border-radius 0, box-shadow 4px 4px 0 #1a1a1a, 18px bold uppercase at 0.08em tracking, 14px 28px padding. Hover cuts the background to #ffcc00 with transform scale(1.05) rotate(1deg) over 100ms; active applies translate(4px,4px) and box-shadow none.",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist", why: { zh: "同样的粗黑边与硬阴影，但漫画多了气泡与网点", en: "Same heavy borders and hard shadows, though comics adds bubbles and halftone" } },
    { name: "Cel Shading", why: { zh: "同一套平涂与描边逻辑的动画版本", en: "The animation-side version of the same flat-fill and outline logic" } },
  ],
  completeness: "full",
};
