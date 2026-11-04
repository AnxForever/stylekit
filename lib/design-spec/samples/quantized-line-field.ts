import type { DesignSpec } from "../types";

export const quantizedLineFieldSpec: DesignSpec = {
  slug: "quantized-line-field",
  name: "量化线场",
  nameEn: "Quantized Line Field",
  cover: "/styles/quantized-line-field.svg",
  theme: "light",
  northStar: {
    zh: "把一张标记的明暗翻译成四档竖线，结构和留白都交给它。",
    en: "Translate a mark's luminance into four weights of vertical lines and let them carry the whole surface.",
  },
  summary: {
    zh: "量化线场是一套生成式身份系统：任意一张标记图被采样成网格，每个格子的亮度被量化到四档之一，再用对应线宽的竖线画出来。核心规则是「不允许连续线宽」——只有四档，一旦变成渐变就失去了它的机械感。线场会缓慢漂移，交互时给一次带衰减的弹簧位移，并尊重 prefers-reduced-motion。版面上纸面是暖白（#fafaf8），线场装在 17px 圆角的卡片里，卡片底色决定对比：浅灰、纯蓝或近黑。文字三层：衬线标题、无衬线界面文字、等宽坐标。",
    en: "Quantized Line Field is a generative identity system: any mark is sampled into a grid, each cell's luminance is quantised into one of four levels, and vertical lines of the matching weight draw it back. The core rule is that continuous stroke weights are forbidden — four discrete levels only, because a gradient would cost it the mechanical quality. The field drifts slowly, takes a decaying spring impulse on interaction, and honours prefers-reduced-motion. The page is warm white (#fafaf8), the field lives inside a 17px-radius card whose ground sets the contrast: pale grey, pure blue or near black. Type runs in three registers: serif display, sans interface, mono coordinates.",
  },
  colors: [
    {
      name: "纸面",
      nameEn: "Paper",
      value: "#fafaf8",
      group: "surface",
      role: {
        zh: "页面画布。暖白偏灰，让线场的细线不至于扎眼。",
        en: "The canvas — a warm grey-white that keeps the thin lines from stinging.",
      },
      token: "--color-paper",
    },
    {
      name: "墨",
      nameEn: "Ink",
      value: "#202220",
      group: "brand",
      role: {
        zh: "全部文字与最深一档线。带一点绿的黑，比纯黑柔和。",
        en: "All type and the darkest line level — a black with a green cast, softer than pure black.",
      },
      token: "--color-ink",
    },
    {
      name: "淡灰卡",
      nameEn: "Pale Card",
      value: "#eeeeeb",
      group: "surface",
      role: {
        zh: "浅色线场卡片底。适合展示低对比的标记。",
        en: "The pale field card ground, for marks that need low contrast.",
      },
      token: "--color-pale-card",
    },
    {
      name: "电蓝",
      nameEn: "Electric Blue",
      value: "#2152e7",
      group: "brand",
      role: {
        zh: "高对比线场卡片底与主强调。是这套系统唯一的彩色场。",
        en: "The high-contrast field ground and the primary accent — the only colored field in the system.",
      },
      token: "--color-electric-blue",
    },
    {
      name: "检测蓝",
      nameEn: "Detection Blue",
      value: "#267dff",
      group: "accent",
      role: {
        zh: "聚焦环、扫描线与交互反馈。只做 2px 以下的线。",
        en: "Focus rings, scan lines and interaction feedback, never thicker than 2px.",
      },
      token: "--color-detection-blue",
    },
    {
      name: "信号红",
      nameEn: "Signal Red",
      value: "#ec353e",
      group: "accent",
      role: {
        zh: "唯一的警示色，用于越界参数与错误状态。",
        en: "The only alert color, for out-of-range parameters and errors.",
      },
      token: "--color-signal-red",
    },
    {
      name: "近黑场",
      nameEn: "Night Field",
      value: "#111212",
      group: "surface",
      role: {
        zh: "深色线场卡片底，用于展示高亮度标记。",
        en: "The dark field ground, for marks with high luminance.",
      },
      token: "--color-night-field",
    },
  ],
  fonts: [
    {
      family: "Instrument Serif",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400],
      sizes: [24, 32, 48, 60],
      lineHeight: { display: 1.02, heading: 1.1, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.12em" },
      role: {
        zh: "标题与展览式大字。衬线提供人文的一侧，与线场的机械形成对位。",
        en: "Headings and exhibition-scale type — the serif supplies the human side against the field's machine.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, sans-serif",
      weights: [400, 500],
      sizes: [12, 13, 14, 15],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.6 },
      tracking: { display: "0", label: "0.08em" },
      role: {
        zh: "界面文字、注释与按钮。保持极小，不与线场抢注意力。",
        en: "Interface text, captions and buttons, kept small so they never compete with the field.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, SFMono-Regular, Menlo, monospace",
      weights: [400],
      sizes: [11, 12],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0", label: "0.04em" },
      role: {
        zh: "坐标、参数与四档线宽标注。等宽让参数表可以对齐。",
        en: "Coordinates, parameters and the four weight labels — the monospace lets the parameter table align.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Instrument Serif", weight: 400, size: 60, lineHeight: 1.02, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", font: "Instrument Serif", weight: 400, size: 48, lineHeight: 1.05, token: "--text-heading-lg" },
    { role: "heading", font: "Instrument Serif", weight: 400, size: 32, lineHeight: 1.1, token: "--text-heading" },
    { role: "body", font: "Inter", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", font: "Inter", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", font: "Inter", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
    { role: "coordinate", font: "JetBrains Mono", weight: 400, size: 11, lineHeight: 1.4, tracking: "0.04em", token: "--text-coordinate" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 28, 48, 56, 64, 96, 112],
    maxWidth: 1280,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "17px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#fafaf8", purpose: "页面画布" },
    { level: 1, name: "Pale Card", value: "#eeeeeb", purpose: "浅色线场" },
    { level: 2, name: "Electric Blue", value: "#2152e7", purpose: "高对比线场" },
    { level: 3, name: "Night Field", value: "#111212", purpose: "深色线场" },
  ],
  elevation: [
    { name: "None", value: "none — line fields carry their own depth" },
    { name: "Card hover", value: "0 12px 32px rgba(32,34,32,0.08)" },
  ],
  components: [
    {
      name: "Line Field Card",
      role: { zh: "线场容器与作品卡", en: "Field container and work card" },
      construction: {
        zh: "17px 圆角、内边距 28px、宽高比 0.70、最小高度 460px、overflow hidden。底色三选一（#eeeeeb、#2152e7、#111212）。线场画布铺满卡片，线条只有四档宽度（1px、2px、3px、4px），颜色取卡片底色的对比色（浅底用墨、深底用纸白）。hover 时线场给一次带衰减的弹簧位移（幅度 8px），并加一层 8% 的阴影。",
        en: "17px radius, 28px padding, a 0.70 aspect ratio, 460px minimum height and overflow hidden. The ground is one of three (#eeeeeb, #2152e7, #111212). The canvas fills the card and lines take only four widths (1px, 2px, 3px, 4px) in the ground's contrast color — ink on pale, paper on dark. Hover delivers a decaying spring impulse of 8px plus an 8% shadow.",
      },
      sizes: "aspect 0.70; min-height 460px; padding 28px",
      states: "hover: spring impulse 8px, shadow 8%",
    },
    {
      name: "Source Button",
      role: { zh: "揭示来源与次级行动", en: "Reveal the source, and secondary actions" },
      construction: {
        zh: "透明底、1px #d9dbd5 描边、999px 全圆角、padding 10px 20px、14px 无衬线。hover 时描边转检测蓝；聚焦时 2px 检测蓝外环、offset 4px。无填充变化。过渡 150ms。",
        en: "Transparent fill, a 1px #d9dbd5 border, fully rounded, 10px 20px padding at 14px sans. Hover turns the border detection blue; focus draws a 2px blue ring at a 4px offset. The fill never changes. 150ms.",
      },
    },
    {
      name: "Parameter Input",
      role: { zh: "参数与项目名输入", en: "Parameter and project-name input" },
      construction: {
        zh: "纸面底、1px #d9dbd5 描边、12px 圆角、padding 12px 16px、14px 无衬线。标签 14px 置于上方 8px。聚焦时 2px 检测蓝外环、offset 2px，不改变盒子尺寸。越界时描边转信号红。",
        en: "Paper fill, a 1px #d9dbd5 border, 12px radius, 12px 16px padding at 14px. The label sits 8px above at 14px. Focus draws a 2px detection-blue ring at a 2px offset without resizing. Out-of-range turns the border signal red.",
      },
    },
    {
      name: "Studio Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "纸面底、底部 1px #d9dbd5 描边、水平内边距 24px、垂直 20px。左侧字标用衬线 24px，右侧链接 14px 无衬线加下划线（offset 4px）。无阴影、无背景变化。",
        en: "Paper fill, a 1px #d9dbd5 bottom border, 24px horizontal and 20px vertical padding. The wordmark runs 24px serif on the left; links are 14px sans underlined at a 4px offset on the right. No shadow and no background change.",
      },
    },
    {
      name: "Annotation Footer",
      role: { zh: "作品注释与参数条", en: "Work annotations and the parameter strip" },
      construction: {
        zh: "顶部 1px #d9dbd5 描边、padding 24px、12px 无衬线、字色 #686b64。左右两端对齐摆放注释与「一条路径，四档线宽」式的说明。参数值用等宽字体，与说明之间用 16px 间距分隔。",
        en: "A 1px #d9dbd5 top border, 24px padding, 12px sans in #686b64. Annotations sit at one end and notes like 'one path, four line weights' at the other. Parameter values run monospace, separated from their labels by 16px.",
      },
    },
  ],
  imagery: {
    zh: "图像即线场：所有视觉由四档竖线构成，不允许位图与插画。允许把真实标记（logo、字形）采样后重建为线场。不使用摄影作为主体，最多作为线场的采样来源。",
    en: "The field is the imagery: everything is built from four line weights, with no bitmaps or illustration. A real mark — logo, glyph — may be sampled and rebuilt as a field. Photography never leads; at most it is the source the field samples.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 24px，区块间距 96px。作品以卡片阵列排布，卡片固定宽高比 0.70、间距 24px。标题区左对齐，注释在区块底部两端对齐。线场画布必须与容器同宽高，不做裁切。",
    en: "Capped at 1280px with 24px padding, sections 96px apart. Works arrange as a card array at a fixed 0.70 ratio with 24px gaps. Headers align left and annotations spread to both ends at the bottom of a block. The canvas matches its container exactly, never cropped.",
  },
  dos: [
    { zh: "线段只有四档宽度", en: "Lines take exactly four widths" },
    { zh: "线场尊重 prefers-reduced-motion", en: "The field honours prefers-reduced-motion" },
    { zh: "卡片圆角固定 17px", en: "Card radius is fixed at 17px" },
    { zh: "三种字体各司其职：衬线、无衬线、等宽", en: "Three registers: serif, sans, mono" },
    { zh: "卡片底色三选一，不在同一屏重复", en: "One of three grounds per card, not repeated on a screen" },
    { zh: "交互位移用带衰减的弹簧", en: "Interaction uses a decaying spring" },
  ],
  donts: [
    { zh: "不要用连续线宽或渐变线", en: "Never use continuous or graded stroke weights" },
    { zh: "不要把线场裁切成非原比例", en: "Do not crop the field off its ratio" },
    { zh: "不要在同一卡片混两种底色", en: "Never mix two grounds in one card" },
    { zh: "不要用大幅位移或旋转", en: "No large displacement or rotation" },
    { zh: "不要把检测蓝用作填充", en: "Do not use detection blue as a fill" },
    { zh: "不要在减少动效模式下仍漂移", en: "Do not drift when reduced motion is requested" },
  ],
  promptGuide: {
    quickColors: {
      text: "#202220",
      background: "#fafaf8",
      card: "#eeeeeb",
      accent: "#2152e7",
      detection: "#267dff",
      alert: "#ec353e",
    },
    prompts: [
      {
        zh: "做一个量化线场卡片：17px 圆角、内边距 28px、宽高比 0.70、最小高度 460px、overflow hidden，底色 #eeeeeb。内部画布用四档竖线（1px、2px、3px、4px）按亮度量化绘制，线色 #202220。卡片顶部 14px/500 标签，底部 36px 衬线标题（行高 1.0、字距 -0.02em）与一个透明全圆角按钮（1px #d9dbd5 描边，hover 描边转 #267dff）。",
        en: "Build a quantized line field card: 17px radius, 28px padding, 0.70 aspect ratio, 460px minimum height, overflow hidden, on #eeeeeb. Inside, a canvas draws with four line widths (1px, 2px, 3px, 4px) chosen by quantised luminance, in #202220. A 14px/500 label sits at the top, and the bottom carries a 36px serif headline at 1.0 leading and -0.02em tracking plus a transparent pill button with a 1px #d9dbd5 border that turns #267dff on hover.",
      },
    ],
  },
  similar: [
    { name: "Editorial", why: { zh: "同样用衬线做大字、留白做节奏，但那边没有生成式机制", en: "Also uses serif display and whitespace rhythm, though without a generative mechanism" } },
    { name: "Generative Art", why: { zh: "同属生成式，但那边的规则由随机性驱动", en: "Also generative, though that one is driven by randomness rather than luminance" } },
  ],
  completeness: "full",
};
