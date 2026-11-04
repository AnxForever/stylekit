import type { DesignSpec } from "../types";

export const sketchStyleSpec: DesignSpec = {
  slug: "sketch-style",
  name: "铅笔手绘风",
  nameEn: "Sketch Style",
  cover: "/styles/sketch-style.svg",
  theme: "light",
  northStar: {
    zh: "线不是画直的：虚线、波浪、轻微歪斜，像在纸上随手勾出来的。",
    en: "Lines are not drawn straight: dashed, wavy, slightly crooked, as if sketched on paper in a hurry.",
  },
  summary: {
    zh: "铅笔手绘风的关键是「拒绝完美」。所有边框都是虚线或波浪线，卡片允许 -1 度倾斜，hover 时回到 0 度，阴影用交叉排线而不是实色模糊。纸底是暖米（#f5f0e8），主色是铅笔灰（#2c2c2c），强调色像彩色铅笔一样只有四支且不饱和。动效必须短促（150 到 200ms），因为铅笔的反馈是「画下去」，不是「飘起来」。这条风格最容易被做坏的地方是——把不规则做得太规律，反而变成装饰图案。",
    en: "Sketch Style is built on refusing precision. Every border is dashed or wavy, cards may tilt by a degree and straighten on hover, and shadows are cross-hatched rather than blurred. The paper is warm cream (#f5f0e8), the primary is pencil grey (#2c2c2c), and the four accents behave like coloured pencils — present but never saturated. Motion must stay short at 150 to 200ms, because a pencil's feedback is a mark being made, not a thing floating. The failure mode is regularity: make the irregularity too even and it becomes a pattern.",
  },
  colors: [
    {
      name: "铅笔灰",
      nameEn: "Pencil Grey",
      value: "#2c2c2c",
      group: "brand",
      role: {
        zh: "全部线条、文字与描边。带一点暖的灰，模拟 2B 铅笔。",
        en: "Every line, text run and border — a warm-leaning grey that reads as a 2B pencil.",
      },
      token: "--color-pencil",
    },
    {
      name: "纸底",
      nameEn: "Paper",
      value: "#f5f0e8",
      group: "surface",
      role: {
        zh: "页面画布。偏黄的米色，比纯白更像速写本。",
        en: "The canvas — a yellow-leaning cream that reads as a sketchbook rather than white.",
      },
      token: "--color-paper",
    },
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#e74c3c",
      group: "accent",
      role: {
        zh: "重点标记与提醒，像红笔批注。",
        en: "Highlights and corrections, like a red pen in the margin.",
      },
      token: "--color-vermilion",
    },
    {
      name: "湖蓝",
      nameEn: "Lake Blue",
      value: "#3498db",
      group: "accent",
      role: {
        zh: "链接与次级标记，是最冷静的一支彩色铅笔。",
        en: "Links and secondary marks — the calmest of the coloured pencils.",
      },
      token: "--color-lake-blue",
    },
    {
      name: "草绿",
      nameEn: "Grass",
      value: "#27ae60",
      group: "accent",
      role: {
        zh: "完成与勾选，用于手绘对勾与状态。",
        en: "Completion and checks, on hand-drawn ticks and statuses.",
      },
      token: "--color-grass",
    },
    {
      name: "橙黄",
      nameEn: "Amber",
      value: "#f39c12",
      group: "accent",
      role: {
        zh: "标注与高亮底色，用于荧光笔式的强调。",
        en: "Annotation and highlight ground, used like a marker stripe.",
      },
      token: "--color-amber",
    },
  ],
  fonts: [
    {
      family: "Caveat",
      substitute: "'Comic Sans MS', 'Segoe Script', cursive",
      weights: [400, 700],
      sizes: [18, 22, 28, 40, 56],
      lineHeight: { display: 1.15, heading: 1.2, body: 1.6 },
      tracking: { display: "0.01em", label: "0.1em" },
      role: {
        zh: "标题与手写标注。笔迹感是这套风格的人格，缺了就只剩虚线边框。",
        en: "Headings and hand-written annotations. The handwriting is the personality; without it only dashed borders remain.",
      },
      token: "--font-hand",
    },
    {
      family: "Georgia",
      substitute: "'Songti SC', serif",
      weights: [400, 700],
      sizes: [14, 16, 18],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.7 },
      tracking: { display: "0", label: "0.1em" },
      role: {
        zh: "正文。衬线正文比手写体更耐读，形成手写标题与印刷正文的对照。",
        en: "Body copy. A serif reads longer than handwriting, setting up the contrast between written headings and printed text.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Caveat", weight: 700, size: 56, lineHeight: 1.15, token: "--text-display" },
    { role: "heading", font: "Caveat", weight: 700, size: 40, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Caveat", weight: 400, size: 28, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Georgia", weight: 400, size: 18, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", font: "Georgia", weight: 400, size: 16, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Caveat", weight: 400, size: 18, lineHeight: 1.3, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1080,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
    { element: "doodles", value: "40% 60% 70% 30%" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#f5f0e8", purpose: "页面画布" },
    { level: 1, name: "Card Paper", value: "#f5f0e8", purpose: "卡片（与底色同，靠边框区分）" },
  ],
  elevation: [
    { name: "Sketch offset", value: "5px 5px 0 rgba(44,44,44,0.15)" },
    { name: "Sketch hover", value: "8px 8px 0 rgba(44,44,44,0.20)" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Sketch Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、2px 虚线铅笔灰描边、2px 圆角、衬线斜体加粗、0.1em 字距、padding 12px 32px，阴影 4px 4px 0 铅笔灰 15%。hover 时填充硬切为铅笔灰、文字转纸色、阴影扩到 6px 并上浮 4px、旋转 1 度；按下时位移 4px 4px、旋转 -2 度、阴影归零。过渡 150ms。",
        en: "Transparent fill, a 2px dashed pencil-grey border, 2px radius, bold serif italic at 0.1em tracking, 12px 32px padding, shadow 4px 4px 0 at 15% pencil. Hover cuts the fill to pencil grey, flips the text to paper, widens the shadow to 6px, lifts 4px and rotates a degree; press translates 4px 4px, rotates -2 degrees and drops the shadow. 150ms.",
      },
      sizes: "padding 12px 32px",
      states: "hover: invert, lift 4px, rotate 1deg; active: translate 4px, rotate -2deg, shadow none",
    },
    {
      name: "Sketch Card",
      role: { zh: "内容卡与便签", en: "Content card and note" },
      construction: {
        zh: "纸底、2px 实线铅笔灰描边（卡片允许实线，按钮用虚线）、2px 圆角、内边距 32px，默认倾斜 -1 度，阴影 5px 5px 0 铅笔灰 15%。hover 时旋转回到 0 度、上浮 4px、阴影扩到 8px，过渡 200ms。右上角可放 32px 的手绘圈（border-radius 40% 60% 70% 30%），hover 时出现并放大到 1.25。",
        en: "Paper fill, a 2px solid pencil border (cards may use solid; buttons stay dashed), 2px radius, 32px padding, tilted -1 degree by default, with a 5px 5px 0 shadow at 15%. Hover returns the rotation to zero, lifts 4px and widens the shadow to 8px over 200ms. A 32px hand-drawn circle (border-radius 40% 60% 70% 30%) may sit top-right, appearing and scaling to 1.25 on hover.",
      },
    },
    {
      name: "Sketch Input",
      role: { zh: "表单与写作输入", en: "Forms and writing input" },
      construction: {
        zh: "透明底、仅底部 2px 波浪线（用 repeating-linear-gradient 模拟）、无左右描边、padding 8px 4px、16px 衬线。聚焦时波浪线转湖蓝并加粗到 3px，不改变盒子尺寸，不加外环。",
        en: "Transparent fill with a 2px wavy rule along the bottom only (drawn with a repeating gradient), no side borders, 8px 4px padding at 16px serif. Focus turns the rule lake blue and thickens it to 3px without resizing or adding a ring.",
      },
    },
    {
      name: "Hand Underline",
      role: { zh: "标题与链接的手绘下划线", en: "Hand-drawn underlines for headings and links" },
      construction: {
        zh: "用一条 2px 的虚线或单周期 SVG 波浪线，长度比文字宽出 8%，位置下沉 2px，允许 1 度倾斜。hover 时下划线从长度 0 展开到 100%，时长 200ms，用 steps 或线性缓动而不是弹簧。",
        en: "A 2px dashed or single-period SVG wave, eight percent wider than the text, sitting 2px below the baseline and tilted up to a degree. Hover grows it from zero to full width over 200ms on a linear or stepped curve, never a spring.",
      },
    },
    {
      name: "Cross Hatched Shadow",
      role: { zh: "排线阴影（替代模糊阴影）", en: "Cross-hatched shading instead of blurred shadow" },
      construction: {
        zh: "用一层 45 度与 -45 度的 1px 线条重复图案（间距 6px、铅笔灰 15%）填充阴影区域，不加模糊。仅用于需要「体积」的插图与手绘元素，界面元素用硬偏移阴影即可。",
        en: "A repeating 1px pattern at ±45 degrees (6px spacing, 15% pencil) fills the shaded region with no blur. Used for illustrations and hand-drawn objects that need volume; UI elements take the hard offset shadow instead.",
      },
    },
  ],
  imagery: {
    zh: "手绘线稿、铅笔草稿、便签涂鸦。允许把照片处理成线稿后再上色。不使用写实摄影、渐变与任何平滑的矢量插画。",
    en: "Hand-drawn line art, pencil drafts and notebook doodles. A photo may be reduced to line art before coloring. No realistic photography, gradients or smooth vector illustration.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 96px。元素允许 ±1 度倾斜制造手写感，但同一区块内倾斜方向要一致。留白可以不完全对称，像手账贴纸的排布。",
    en: "Capped at 1080px with 24px padding, sections 96px apart. Elements may tilt up to a degree for a handwritten feel, though a section keeps one direction. Whitespace may be asymmetric, like stickers arranged in a notebook.",
  },
  dos: [
    { zh: "边框用虚线或波浪，不用完美直线", en: "Borders are dashed or wavy, never perfectly straight" },
    { zh: "卡片允许 ±1 度倾斜", en: "Cards may tilt up to a degree" },
    { zh: "阴影用硬偏移或排线，不用模糊", en: "Shadows are hard offsets or hatching, never blurred" },
    { zh: "纸色底，不用纯白", en: "Ground in paper, never pure white" },
    { zh: "动效 150 到 200ms，短促直接", en: "Motion runs 150 to 200ms, short and direct" },
    { zh: "标题用手写体，正文用衬线", en: "Handwriting for headings, serif for body" },
  ],
  donts: [
    { zh: "不要用完美直线与对称圆角", en: "No perfect lines or symmetrical radii" },
    { zh: "不要用纯白背景", en: "No pure white ground" },
    { zh: "不要用渐变与玻璃模糊", en: "No gradients or glass blur" },
    { zh: "不要用高饱和色", en: "No saturated color" },
    { zh: "不要用超过 200ms 的平滑动画", en: "No smooth animation past 200ms" },
    { zh: "不要让不规则变得有规律", en: "Never let the irregularity become a pattern" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2c2c2c",
      background: "#f5f0e8",
      accent: "#e74c3c",
      link: "#3498db",
      success: "#27ae60",
      highlight: "#f39c12",
    },
    prompts: [
      {
        zh: "做一个手绘风格按钮：透明底、2px dashed #2c2c2c 描边、2px 圆角、衬线斜体 700、0.1em 字距、padding 12px 32px、box-shadow 4px 4px 0 rgba(44,44,44,0.15)。hover 时背景变 #2c2c2c、文字变 #f5f0e8、阴影扩到 6px、transform translateY(-4px) rotate(1deg)。active 时 translate(4px,4px) rotate(-2deg) 且阴影 none。transition 150ms。页面底色 #f5f0e8。",
        en: "Build a sketch button: transparent fill, a 2px dashed #2c2c2c border, 2px radius, bold serif italic at 0.1em tracking, 12px 32px padding, box-shadow 4px 4px 0 rgba(44,44,44,0.15). Hover fills #2c2c2c, flips the text to #f5f0e8, widens the shadow to 6px and applies translateY(-4px) rotate(1deg). Active applies translate(4px,4px) rotate(-2deg) with no shadow. Transition 150ms. The page ground is #f5f0e8.",
      },
    ],
  },
  similar: [
    { name: "Hand Drawn Doodle", why: { zh: "同属手绘，但涂鸦更活泼、装饰更多", en: "Also hand-drawn, though doodle is livelier and heavier on ornament" } },
    { name: "Latex Paper", why: { zh: "同样的纸感，但那边是学术印刷而非铅笔", en: "Same paper feel, though that one is academic typesetting rather than pencil" } },
  ],
  completeness: "full",
};
