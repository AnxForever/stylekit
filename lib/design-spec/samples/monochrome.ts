import type { DesignSpec } from "../types";

export const monochromeSpec: DesignSpec = {
  slug: "monochrome",
  name: "单色极简",
  nameEn: "Monochrome",
  cover: "/styles/monochrome.svg",
  theme: "light",
  northStar: {
    zh: "没有颜色：层次全靠五档灰、字重与负空间。",
    en: "No color at all — hierarchy comes from five greys, weight and negative space.",
  },
  summary: {
    zh: "单色极简是最严格的减法：整个页面只有黑、白与三档灰（#111111、#444444、#666666、#999999、#cccccc、#e5e5e5）。层级靠三件事建立——字重对比（300 对 500）、灰度深浅、以及负空间。它禁止任何带色相的颜色、禁止全圆角、禁止重阴影、禁止渐变。节奏刻意放慢：过渡 700ms 的 ease-in-out，而且只改颜色不改位置，因为在这套语言里位移本身就是噪音。",
    en: "Monochrome is the strictest subtraction: the page holds only black, white and three or four greys (#111111, #444444, #666666, #999999, #cccccc, #e5e5e5). Hierarchy rises from three sources — weight contrast (300 against 500), grey depth, and negative space. Any hue, any fully round corner, any heavy shadow and any gradient are banned. Tempo is deliberately slow at 700ms ease-in-out, and transitions change color only, never position, because in this language movement itself is noise.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#111111",
      group: "brand",
      role: {
        zh: "主文字、主按钮与最深区块。整套风格的唯一「强调」。",
        en: "Primary text, primary buttons and the darkest blocks — the only emphasis available.",
      },
      token: "--color-ink",
    },
    {
      name: "纸",
      nameEn: "Paper",
      value: "#fafafa",
      group: "surface",
      role: {
        zh: "页面底。极浅的灰白，让卡片能靠 #f5f5f5 分层。",
        en: "The page ground — a very light grey-white so cards can layer with #f5f5f5.",
      },
      token: "--color-paper",
    },
    {
      name: "深灰",
      nameEn: "Deep Grey",
      value: "#444444",
      group: "neutral",
      role: {
        zh: "hover 后的次级文字，比 #666666 再深一档。",
        en: "Secondary text after hover, one step deeper than #666666.",
      },
      token: "--color-deep-grey",
    },
    {
      name: "中灰",
      nameEn: "Mid Grey",
      value: "#666666",
      group: "neutral",
      role: {
        zh: "正文与说明文字。与 #111111 形成第一层对比。",
        en: "Body and captions, forming the first contrast against #111111.",
      },
      token: "--color-mid-grey",
    },
    {
      name: "浅灰",
      nameEn: "Light Grey",
      value: "#999999",
      group: "neutral",
      role: {
        zh: "元数据与占位符，第三层级。",
        en: "Metadata and placeholders — the third tier.",
      },
      token: "--color-light-grey",
    },
    {
      name: "边框灰",
      nameEn: "Border Grey",
      value: "#e5e5e5",
      group: "surface",
      role: {
        zh: "所有 1px 分隔线。几乎不可见，但缺了结构会散。",
        en: "Every 1px divider — nearly invisible, yet the structure collapses without it.",
      },
      token: "--color-border-grey",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Helvetica Neue', system-ui, sans-serif",
      weights: [300, 400, 500],
      sizes: [11, 13, 16, 22, 32, 44],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.8 },
      tracking: { display: "-0.01em", label: "0.2em" },
      role: {
        zh: "全站唯一字体，只用 300 到 500。字重差是这套风格建立层级的主要手段。",
        en: "The only face, in 300 through 500. Weight difference is the main device for hierarchy here.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 300, size: 44, lineHeight: 1.15, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 300, size: 32, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 22, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 300, size: 16, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 13, lineHeight: 1.8, token: "--text-body" },
    { role: "label", weight: 500, size: 11, lineHeight: 1.5, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160],
    maxWidth: 1040,
    sectionGap: 160,
    cardPadding: 40,
    elementGap: 32,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#fafafa", purpose: "页面底" },
    { level: 1, name: "Panel", value: "#f5f5f5", purpose: "卡片" },
    { level: 2, name: "Hover Panel", value: "#ebebeb", purpose: "卡片 hover" },
  ],
  elevation: [
    { name: "None", value: "none — a 1px #e5e5e5 border does the work" },
    { name: "Max allowed", value: "0 1px 2px rgba(17,17,17,0.04)" },
  ],
  components: [
    {
      name: "Mono Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "墨色填充、纸色文字、2px 圆角、无描边、无阴影，11px/500、全大写、字距 0.2em、padding 16px 32px。hover 时填充转 #2a2a2a；按下再暗一档。过渡 700ms ease-in-out，只改颜色。",
        en: "Ink fill, paper text, 2px radius, no border, no shadow, 11px/500, uppercase, 0.2em tracking, 16px 32px padding. Hover moves the fill to #2a2a2a; press darkens further. 700ms ease-in-out, color only.",
      },
      sizes: "padding 16px 32px; label 11px",
      states: "hover: #2a2a2a; active: darker still",
    },
    {
      name: "Grey Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "#f5f5f5 填充、2px 圆角、1px #e5e5e5 描边、内边距 40px，无阴影。标题 32px/300 墨色、字距微开；正文 13px/300 中灰、行高 1.8。hover 时填充转 #ebebeb、描边转 #cccccc、正文转 #444444，全部在 700ms 内完成，元素不动。",
        en: "#f5f5f5 fill, 2px radius, a 1px #e5e5e5 border, 40px padding, no shadow. The title runs 32px/300 in ink on slightly open tracking; body at 13px/300 in mid grey on 1.8 leading. Hover moves the fill to #ebebeb, the border to #cccccc and the body to #444444, all over 700ms with nothing moving.",
      },
    },
    {
      name: "Hairline Divider",
      role: { zh: "极细分隔线", en: "The hairline divider" },
      construction: {
        zh: "1px #e5e5e5 横线，横跨内容宽，不做渐变淡出。它是这套风格唯一的结构工具，比留白更明确、比阴影更安静。",
        en: "A 1px #e5e5e5 rule spanning the content width with no gradient fade. It is the style's only structural tool — more explicit than whitespace, quieter than shadow.",
      },
    },
    {
      name: "Ghost Field",
      role: { zh: "输入框", en: "Input field" },
      construction: {
        zh: "纸色填充、2px 圆角、1px #e5e5e5 描边、padding 14px 16px、13px 字。占位符 #999999。聚焦时描边转墨色并保持 1px，不加外环、不改背景。",
        en: "Paper fill, 2px radius, a 1px #e5e5e5 border, 14px 16px padding at 13px, with a #999999 placeholder. Focus turns the border to ink while keeping it at 1px, with no ring and no background change.",
      },
    },
    {
      name: "Weight Ladder",
      role: { zh: "字重层级规则", en: "The weight ladder" },
      construction: {
        zh: "标题只用 300，正文只用 300，标签与按钮用 500，元数据用 400。禁止出现 600 以上字重——一旦出现，灰度的细腻感会被压死。层级靠字号、灰度与留白三重叠加。",
        en: "Headings use 300, body uses 300, labels and buttons use 500, metadata uses 400. Nothing above 500 is allowed — the moment a heavier weight appears, the subtlety of the greys collapses. Hierarchy stacks size, grey and whitespace together.",
      },
    },
  ],
  imagery: {
    zh: "黑白摄影与建筑摄影：必须有明确的形状与光影结构，不能靠颜色成立。允许灰度图注。不使用彩色图像、插画与图标装饰。",
    en: "Black-and-white photography and architecture: form and light must carry it, never color. Greyscale captions are fine. No color imagery, illustration or decorative icons.",
  },
  layout: {
    zh: "上限 1040px、容器内边距 32px，区块间距 160px。以负空间为主要构图手段，元素间距至少 32px。单栏或严格对齐的双栏，禁止错位与旋转。",
    en: "Capped at 1040px with 32px padding, sections 160px apart. Negative space does the composing, with at least 32px between elements. One column or a strictly aligned pair; no offsetting and no rotation.",
  },
  dos: [
    { zh: "只用五到六档灰，无色相", en: "Five or six greys, no hue" },
    { zh: "层级靠字重与灰度", en: "Build hierarchy from weight and grey" },
    { zh: "字重不超过 500", en: "Keep weights at 500 or below" },
    { zh: "过渡 700ms，只改颜色", en: "Transitions run 700ms and change color only" },
    { zh: "边框 1px #e5e5e5", en: "Borders are 1px #e5e5e5" },
    { zh: "留白作为主要构图手段", en: "Let negative space compose the page" },
  ],
  donts: [
    { zh: "不要用任何带色相的颜色", en: "No color with hue at all" },
    { zh: "不要用全圆角", en: "No fully round corners" },
    { zh: "不要用重阴影", en: "No heavy shadows" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要在 hover 时位移元素", en: "Never move an element on hover" },
    { zh: "不要用 600 以上的字重", en: "No weight above 500" },
  ],
  promptGuide: {
    quickColors: {
      text: "#111111",
      background: "#fafafa",
      card: "#f5f5f5",
      muted: "#666666",
      light: "#999999",
      border: "#e5e5e5",
    },
    prompts: [
      {
        zh: "做一个单色极简卡片：背景 #f5f5f5、2px 圆角、1px #e5e5e5 描边、内边距 40px、无阴影。标题 32px/300 #111111、字距微开；正文 13px/300 #666666、行高 1.8。hover 时背景 #ebebeb、描边 #cccccc、正文 #444444，transition 700ms ease-in-out，元素不位移。页面底色 #fafafa。禁止出现任何带色相的颜色。",
        en: "Build a monochrome card: background #f5f5f5, 2px radius, a 1px #e5e5e5 border, 40px padding, no shadow. Title at 32px/300 in #111111 on slightly open tracking; body at 13px/300 in #666666 on 1.8 leading. Hover moves the background to #ebebeb, the border to #cccccc and the body to #444444 over 700ms ease-in-out with nothing moving. The page ground is #fafafa, and no hue appears anywhere.",
      },
    ],
  },
  similar: [
    { name: "Minimalist Flat", why: { zh: "同样极简，但极简扁平还保留一支强调色，单色连强调都没有", en: "Both minimal, though flat minimal keeps one accent while monochrome has none" } },
    { name: "Editorial", why: { zh: "同样靠字重与留白，但编辑风有彩色图片", en: "Both lean on weight and whitespace, though editorial carries color imagery" } },
  ],
  completeness: "full",
};
