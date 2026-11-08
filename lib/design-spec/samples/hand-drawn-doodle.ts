import type { DesignSpec } from "../types";

export const handDrawnDoodleSpec: DesignSpec = {
  slug: "hand-drawn-doodle",
  name: "手绘涂鸦风",
  nameEn: "Hand Drawn Doodle",
  cover: "/styles/hand-drawn-doodle.svg",
  theme: "light",
  northStar: {
    zh: "笔记本上的随手涂画：虚线、彩色马克笔、胶带与图钉。",
    en: "Scribbles in a notebook: dashed lines, marker colors, tape and pushpins.",
  },
  summary: {
    zh: "手绘涂鸦风把界面做成一页贴满便签的笔记：奶白纸底（#fffef5），所有边框都是 2 到 3px 的虚线，阴影不是灰的而是彩色的实心偏移（黄、红或青），标题允许 -3 度的斜切，卡片 hover 时轻微旋转。装饰语言包括胶带条、图钉、回形针——它们是这套风格区别于「铅笔手绘」的关键：铅笔更安静，涂鸦更热闹。字体用无衬线加粗，绝不使用等宽，因为笔记里的字是随手写的。",
    en: "Hand Drawn Doodle turns the interface into a page of sticky notes: a cream paper ground (#fffef5), every border a 2 to 3px dashed line, and shadows that are solid colored offsets — yellow, red or teal — rather than grey. Headings may skew three degrees and cards rotate slightly on hover. The ornament set includes tape strips, pushpins and paperclips, and it is what separates this from the quieter pencil sketch: doodle is loud. Type runs bold sans, never monospace, because notebook writing is casual.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#2c2c2c",
      group: "brand",
      role: {
        zh: "虚线边框、标题与主要文字。像黑色签字笔。",
        en: "Dashed borders, headings and primary text — a black fineliner.",
      },
      token: "--color-ink",
    },
    {
      name: "奶白纸",
      nameEn: "Cream",
      value: "#fffef5",
      group: "surface",
      role: {
        zh: "页面与卡片底色。极浅的暖黄，像再生纸。",
        en: "Page and card ground — a very pale warm yellow, like recycled paper.",
      },
      token: "--color-cream",
    },
    {
      name: "标记红",
      nameEn: "Marker Red",
      value: "#ff6b6b",
      group: "accent",
      role: {
        zh: "第一强调与阴影色。卡片 hover 时阴影会换成它。",
        en: "The first accent and a shadow color; a card's hover shadow switches to it.",
      },
      token: "--color-marker-red",
    },
    {
      name: "标记青",
      nameEn: "Marker Teal",
      value: "#4ecdc4",
      group: "accent",
      role: {
        zh: "链接与次级强调，按钮 hover 时的阴影色。",
        en: "Links and secondary emphasis, and the shadow color on button hover.",
      },
      token: "--color-marker-teal",
    },
    {
      name: "标记黄",
      nameEn: "Marker Yellow",
      value: "#ffd93d",
      group: "accent",
      role: {
        zh: "高亮与默认阴影色，用于强调一块区域。",
        en: "Highlights and the default shadow color, used to flag a region.",
      },
      token: "--color-marker-yellow",
    },
    {
      name: "橄榄",
      nameEn: "Olive",
      value: "#a98d16",
      group: "accent",
      role: {
        zh: "唯一的暗色强调，用于压在黄色上的文字。",
        en: "The one dark accent, for text sitting on yellow.",
      },
      token: "--color-olive",
    },
  ],
  fonts: [
    {
      family: "Baloo 2",
      substitute: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
      weights: [600, 800],
      sizes: [14, 18, 24, 32, 44],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.55 },
      tracking: { display: "0.02em", label: "0.12em" },
      role: {
        zh: "标题与按钮，字重 800 并允许 -3 度斜切。圆润的无衬线是涂鸦的语气。",
        en: "Headings and buttons at weight 800, allowed a three-degree skew — the rounded sans is the doodle's voice.",
      },
      token: "--font-sans",
    },
    {
      family: "Nunito",
      substitute: "'Segoe UI', system-ui, sans-serif",
      weights: [400, 600],
      sizes: [14, 16, 18],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.65 },
      tracking: { display: "0", label: "0.12em" },
      role: {
        zh: "正文与说明，保持可读但仍有手写气质。",
        en: "Body and captions — readable while keeping the hand-written tone.",
      },
      token: "--font-body",
    },
  ],
  typeScale: [
    { role: "display", font: "Baloo 2", weight: 800, size: 44, lineHeight: 1.1, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Baloo 2", weight: 800, size: 32, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", font: "Baloo 2", weight: 600, size: 24, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Nunito", weight: 600, size: 18, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", font: "Nunito", weight: 400, size: 16, lineHeight: 1.65, token: "--text-body" },
    { role: "label", font: "Baloo 2", weight: 600, size: 14, lineHeight: 1.35, tracking: "0.12em", token: "--text-label" },
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
    { element: "doodles", value: "60% 40% 50% 50%" },
  ],
  surfaces: [
    { level: 0, name: "Cream", value: "#fffef5", purpose: "页面画布" },
    { level: 1, name: "Note", value: "#fffef5", purpose: "卡片（同色，靠虚线与彩影区分）" },
  ],
  elevation: [
    { name: "Default", value: "5px 5px 0 #ffd93d" },
    { name: "Hover", value: "8px 8px 0 #ff6b6b" },
    { name: "Button default", value: "4px 4px 0 #ff6b6b" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Doodle Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "奶白底、2px 虚线墨黑描边、2px 圆角、18px/800 全大写 0.12em 字距、padding 12px 24px，阴影 4px 4px 0 标记红。hover 时填充硬切墨黑、文字转奶白、上浮 4px、右移 1px、旋转 1 度、阴影换成标记青并扩到 6px；按下时位移 3px 3px、缩放 0.98、旋转归零、阴影去除。过渡 150ms 线性。",
        en: "Cream fill, a 2px dashed ink border, 2px radius, 18px at weight 800 uppercase on 0.12em, 12px 24px padding, shadow 4px 4px 0 in marker red. Hover cuts the fill to ink, flips the text to cream, lifts 4px, shifts 1px right, rotates a degree and swaps the shadow to marker teal at 6px; press translates 3px 3px, scales 0.98, returns the rotation to zero and removes the shadow. 150ms linear.",
      },
      sizes: "padding 12px 24px; label 18px",
      states: "hover: invert, rotate 1deg, teal shadow; active: translate 3px, shadow none",
    },
    {
      name: "Note Card",
      role: { zh: "便签卡与内容卡", en: "Sticky note and content card" },
      construction: {
        zh: "奶白底、3px 虚线墨黑描边、2px 圆角、内边距 32px，阴影 5px 5px 0 标记黄。标题 32px/800，默认 -3 度斜切，hover 时归零。hover 卡片上浮 4px、旋转 -1 度、阴影换标记红并扩到 8px。过渡 150ms 线性。",
        en: "Cream fill, a 3px dashed ink border, 2px radius, 32px padding, shadow 5px 5px 0 in marker yellow. Titles run 32px/800 skewed three degrees by default and straighten on hover. The card itself lifts 4px, rotates -1 degree and swaps the shadow to marker red at 8px. 150ms linear.",
      },
    },
    {
      name: "Tape Strip",
      role: { zh: "装饰胶带", en: "Decorative tape" },
      construction: {
        zh: "宽 96px、高 24px、旋转 -4 度、半透明标记黄 80%、左右两端各一个 2px 的锯齿（clip-path），无边框无阴影。放在卡片的左上或右上角，压住边框 4px。纯装饰，不承载交互。",
        en: "96px wide, 24px tall, rotated -4 degrees, 80% marker yellow with a 2px zigzag cut on each short end via clip-path, no border, no shadow. It sits on a card corner, overlapping the border by 4px. Purely decorative, never interactive.",
      },
    },
    {
      name: "Scribble Input",
      role: { zh: "表单与笔记输入", en: "Forms and note input" },
      construction: {
        zh: "奶白底、2px 虚线墨黑描边、2px 圆角、padding 12px 16px、16px 无衬线。占位符墨黑 30%。聚焦时描边转标记红并加 2px 2px 0 标记黄的硬阴影，不改变盒子尺寸。过渡 200ms。",
        en: "Cream fill, a 2px dashed ink border, 2px radius, 12px 16px padding at 16px sans. The placeholder sits at 30% ink. Focus turns the border marker red and adds a 2px 2px 0 hard shadow in marker yellow without resizing. 200ms.",
      },
    },
    {
      name: "Doodle Underline",
      role: { zh: "手绘下划线与圈注", en: "Hand-drawn underlines and circles" },
      construction: {
        zh: "用单周期 SVG 波浪线（stroke 2px、颜色取标记色之一）压在文字下方 4px，长度比文字宽 6%。圈注用椭圆、倾斜 6 度、不闭合（留 12px 缺口），只用一次以保持强调的稀缺。",
        en: "A single-period SVG wave with a 2px stroke in one marker color, sitting 4px under the text and six percent wider. A circle annotation uses an ellipse tilted six degrees and left unclosed by 12px, deployed once so the emphasis stays scarce.",
      },
    },
  ],
  imagery: {
    zh: "涂鸦插画、便签照片、手写步骤图。允许把照片贴成「拍立得」并加胶带。不使用写实摄影、渐变与精确矢量插画。",
    en: "Doodle illustration, photos of sticky notes, hand-drawn step diagrams. A photo may be presented as a Polaroid with tape on it. No realistic photography, gradients or precise vector art.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 96px。卡片允许 ±2 度旋转，同屏最多三张带旋转。元素可略微错位，像贴在墙上的便签。整体保持可读的网格，不追求整齐。",
    en: "Capped at 1080px with 24px padding, sections 96px apart. Cards may rotate up to two degrees, with at most three rotated on one screen. Elements may sit slightly out of line like notes on a wall. The grid stays readable; tidiness is not the goal.",
  },
  dos: [
    { zh: "所有边框用虚线，2 到 3px", en: "Every border is dashed at 2 to 3px" },
    { zh: "阴影用彩色实心偏移", en: "Shadows are solid colored offsets" },
    { zh: "卡片允许 ±2 度旋转", en: "Cards may rotate up to two degrees" },
    { zh: "用胶带、图钉等实物装饰", en: "Use tape, pushpins and other physical ornament" },
    { zh: "标题加粗并允许 -3 度斜切", en: "Bold headings, skewed up to three degrees" },
    { zh: "动效 150ms 线性", en: "Motion runs 150ms on a linear curve" },
  ],
  donts: [
    { zh: "不要用实线边框", en: "No solid borders" },
    { zh: "不要用灰色模糊阴影", en: "No grey blurred shadows" },
    { zh: "不要用等宽字体", en: "No monospace type" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要用精确的直角与几何", en: "No precise right angles or geometry" },
    { zh: "不要用大圆角", en: "No large radii" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2c2c2c",
      background: "#fffef5",
      red: "#ff6b6b",
      teal: "#4ecdc4",
      yellow: "#ffd93d",
      olive: "#a98d16",
    },
    prompts: [
      {
        zh: "做一个涂鸦风按钮：背景 #fffef5、2px dashed #2c2c2c 边框、2px 圆角、18px/800 全大写 0.12em 字距、padding 12px 24px、box-shadow 4px 4px 0 #ff6b6b。hover 时背景变 #2c2c2c、文字变 #fffef5、translate(-1px, -4px) rotate(1deg)、阴影换成 6px 6px 0 #4ecdc4。active 时 translate(3px,3px) scale(0.98) 且阴影 none。transition 150ms linear。页面底色 #fffef5。",
        en: "Build a doodle button: background #fffef5, a 2px dashed #2c2c2c border, 2px radius, 18px/800 uppercase at 0.12em tracking, 12px 24px padding and box-shadow 4px 4px 0 #ff6b6b. Hover fills #2c2c2c, flips the text to #fffef5, applies translate(-1px, -4px) rotate(1deg) and swaps the shadow to 6px 6px 0 #4ecdc4. Active applies translate(3px,3px) scale(0.98) with no shadow. Transition 150ms linear. The page ground is #fffef5.",
      },
    ],
  },
  similar: [
    { name: "Sketch Style", why: { zh: "同为手绘，但铅笔更安静、涂鸦更热闹", en: "Also hand-drawn, though pencil is quieter and doodle is louder" } },
    { name: "Collage Art", why: { zh: "同样的实物拼贴语言，但拼贴更强调材质与剪贴", en: "Same physical-collage language, though collage pushes material and cutting harder" } },
  ],
  completeness: "full",
};
