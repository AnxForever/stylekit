import type { DesignSpec } from "../types";

export const collageArtSpec: DesignSpec = {
  slug: "collage-art",
  name: "拼贴艺术风",
  nameEn: "Collage Art",
  cover: "/styles/collage-art.svg",
  theme: "light",
  northStar: {
    zh: "剪下来、撕开口、歪着贴上去：一页手工拼贴的杂志内页。",
    en: "Cut out, torn and pasted askew — a hand-assembled magazine spread.",
  },
  summary: {
    zh: "拼贴艺术风模拟手工拼贴：纸片被剪下、撕出毛边、用胶粘在旧纸上，边缘对不齐，角度也不统一。技术上靠四件事——clip-path polygon 做撕纸边、任意角度旋转（rotate-[Ndeg] 而不是 inline transform，避免与 hover 冲突）、硬偏移阴影模拟纸片厚度、以及混合字体交替（衬线、无衬线、等宽在同一页轮流出现）。它禁止平滑渐变、禁止 8px 以上的圆角、禁止毛玻璃，因为手工拼贴的每一块都是实体纸。",
    en: "Collage Art imitates the handmade: paper cut, torn with a ragged edge and glued onto aged stock, edges misaligned and angles inconsistent. Four techniques carry it — clip-path polygons for torn edges, arbitrary rotations (rotate-[Ndeg] rather than inline transforms, which would fight hover), hard offset shadows for paper thickness, and alternating type families with serif, sans and monospace taking turns on one page. Smooth gradients, radii above 8px and frosted glass are all refused, because every piece of a collage is solid paper.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#2d2d2d",
      group: "brand",
      role: {
        zh: "文字与剪影描边。像黑色记号笔。",
        en: "Text and cut-out strokes — a black marker.",
      },
      token: "--color-ink",
    },
    {
      name: "旧纸",
      nameEn: "Aged Paper",
      value: "#f5f0e8",
      group: "surface",
      role: {
        zh: "页面底。泛黄的纸，所有纸片都贴在上面。",
        en: "The page ground — yellowed stock that every piece is glued onto.",
      },
      token: "--color-aged-paper",
    },
    {
      name: "剪报红",
      nameEn: "Clipping Red",
      value: "#e74c3c",
      group: "accent",
      role: {
        zh: "第一块撞色纸片，也是最常见的强调。",
        en: "The first clashing paper block and the usual emphasis.",
      },
      token: "--color-clipping-red",
    },
    {
      name: "剪报蓝",
      nameEn: "Clipping Blue",
      value: "#3498db",
      group: "accent",
      role: {
        zh: "第二块撞色，与红形成主对位。",
        en: "The second clash, opposing red as the primary pair.",
      },
      token: "--color-clipping-blue",
    },
    {
      name: "剪报橙",
      nameEn: "Clipping Orange",
      value: "#f39c12",
      group: "accent",
      role: {
        zh: "暖色纸片与高亮标签。",
        en: "Warm paper blocks and highlight tags.",
      },
      token: "--color-clipping-orange",
    },
    {
      name: "剪报紫",
      nameEn: "Clipping Violet",
      value: "#9b59b6",
      group: "accent",
      role: {
        zh: "最异质的一支，用于让画面失去秩序感。",
        en: "The most foreign tone, used to break the page's order.",
      },
      token: "--color-clipping-violet",
    },
  ],
  fonts: [
    {
      family: "Playfair Display",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [700, 900],
      sizes: [18, 24, 34, 48, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.06em" },
      role: {
        zh: "大标题用衬线，模拟从杂志上剪下来的标题块。",
        en: "Serif for big headlines, imitating a title clipped out of a magazine.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, 'Segoe UI', sans-serif",
      weights: [400, 700, 900],
      sizes: [13, 15, 18],
      lineHeight: { display: 1.4, heading: 1.35, body: 1.6 },
      tracking: { display: "0", label: "0.06em" },
      role: {
        zh: "正文与标签用的无衬线，字体在页面中交替出现是本风格的语法。",
        en: "Sans for body and labels; alternating families across the page is this style's grammar.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 13],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0.04em", label: "0.12em" },
      role: {
        zh: "编号、坐标与注释标签，像打字机打的标签条。",
        en: "Numbers, coordinates and annotation labels — like a typewritten strip.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Playfair Display", weight: 900, size: 64, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", font: "Playfair Display", weight: 700, size: 48, lineHeight: 1.1, token: "--text-heading" },
    { role: "subheading", font: "Inter", weight: 900, size: 34, lineHeight: 1.15, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 18, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 15, lineHeight: 1.6, token: "--text-body" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 13, lineHeight: 1.4, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "stickers", value: "999px" },
    { element: "torn", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Aged Paper", value: "#f5f0e8", purpose: "页面底" },
    { level: 1, name: "Cutout Paper", value: "#fbf7ef", purpose: "纸片" },
    { level: 2, name: "Clipping", value: "#e74c3c", purpose: "撞色纸片" },
  ],
  elevation: [
    { name: "Paper lift", value: "6px 6px 0 rgba(45,45,45,0.28)" },
    { name: "Paper lift sm", value: "3px 3px 0 rgba(45,45,45,0.22)" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Torn Paper Card",
      role: { zh: "撕纸卡片（核心组件）", en: "The torn paper card — the core component" },
      construction: {
        zh: "旧纸色或撞色填充、零圆角，用 clip-path 的多边形（8 到 12 个顶点，各点上下随机偏移 2 到 6px）做出撕开的毛边。硬偏移阴影 6px 6px 0 墨色 28%。默认旋转 -2 到 -1 度。hover 时旋转归零并上浮 2px，阴影扩到 8px。过渡 200ms。",
        en: "Aged paper or clash fill, zero radius, with a clip-path polygon of eight to twelve vertices randomly offset 2 to 6px to make the torn edge. A hard offset shadow runs 6px 6px 0 at 28% ink. It sits rotated between -2 and -1 degrees. Hover returns the rotation to zero, lifts 2px and widens the shadow to 8px over 200ms.",
      },
      states: "hover: rotation to 0, lift 2px",
    },
    {
      name: "Cutout Tag",
      role: { zh: "剪下来的标签条", en: "The clipped tag strip" },
      construction: {
        zh: "高 28px、内边距 0 12px、零圆角，左右两端用 clip-path 切成斜角（各 8px），填撞色之一，文字用等宽 13px 全大写 0.12em。整体旋转 1 到 3 度，硬阴影 3px 3px 0 墨 22%。",
        en: "28px tall with 0 12px padding and zero radius, both ends chamfered 8px by clip-path, filled with one clash color, and the label in 13px monospace uppercase at 0.12em. It sits rotated one to three degrees with a 3px 3px 0 hard shadow at 22% ink.",
      },
    },
    {
      name: "Mixed Type Stack",
      role: { zh: "混合字体排版组", en: "The mixed type stack" },
      construction: {
        zh: "同一区块内故意混用三种字体：标题衬线 900、副标题无衬线 900、标签等宽。三者各自带不同的旋转（-2、0、+2 度）与不同的底色条，形成「分别剪下来再拼」的效果。",
        en: "Three families deliberately share one block: a serif headline at 900, a sans subhead at 900 and a monospace label, each with its own rotation (-2, 0 and +2 degrees) and its own background strip, so the pieces read as separately cut and pasted.",
      },
    },
    {
      name: "Tape Strip",
      role: { zh: "胶带", en: "The tape strip" },
      construction: {
        zh: "96 到 160px 长、20px 高、旋转 -6 到 6 度，填半透明撞色（60%）或半透明白，两端用 clip-path 切锯齿。压在纸片的角上，跨过边缘 8px。无边框无阴影。",
        en: "96 to 160px long, 20px tall, rotated between -6 and 6 degrees, filled with a 60% clash color or a translucent white, with a zigzag cut at each end by clip-path. It sits across a paper corner, overlapping the edge by 8px, with no border and no shadow.",
      },
    },
    {
      name: "Cut Mark Border",
      role: { zh: "剪切痕迹边框", en: "The cut-mark border" },
      construction: {
        zh: "2px 虚线或实线边框，颜色取墨 40%，配合一个小剪刀图标或沿边的短刻度线，暗示「这块是沿着这条线剪下来的」。只用于强调某一个元素，不滥用。",
        en: "A 2px dashed or solid border at 40% ink, optionally paired with a small scissors glyph or short tick marks along the edge, implying the piece was cut along that line. It marks one element only and is never scattered.",
      },
    },
  ],
  imagery: {
    zh: "剪报照片、杂志碎片、手绘涂鸦、标签与印花。图像必须有清晰剪裁边缘（可带白边），允许叠两层不同来源的碎片。不使用平滑渐变、圆形裁切与统一风格的摄影。",
    en: "Clipped photographs, magazine fragments, hand-drawn scribbles, labels and stamps. Imagery needs a clear cut edge, optionally with a white margin, and two fragments from different sources may overlap. No smooth gradients, circular crops or uniform photography.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 24px，区块间距 96px。元素允许互相覆盖与错位，旋转范围 -3 到 3 度。整体保持一条隐形的中轴让拼贴不至于失控，但每块都偏离它一点。",
    en: "Capped at 1200px with 24px padding, sections 96px apart. Elements may overlap and misalign, rotating between -3 and 3 degrees. An invisible central axis keeps the collage from collapsing, while every piece drifts off it slightly.",
  },
  dos: [
    { zh: "用 clip-path 做撕纸与斜角", en: "Use clip-path for torn edges and chamfers" },
    { zh: "旋转用 rotate-[Ndeg] 不用 inline transform", en: "Rotate with rotate-[Ndeg], not inline transforms" },
    { zh: "硬偏移阴影模拟纸片厚度", en: "Hard offset shadows for paper thickness" },
    { zh: "三种字体在同页交替", en: "Alternate three families across one page" },
    { zh: "旧纸底，纸片贴在上面", en: "Aged paper ground with pieces glued on" },
    { zh: "每块旋转 -3 到 3 度", en: "Keep each piece between -3 and 3 degrees" },
  ],
  donts: [
    { zh: "不要用平滑渐变", en: "No smooth gradients" },
    { zh: "不要用 8px 以上圆角", en: "No radius above 8px" },
    { zh: "不要用毛玻璃", en: "No frosted glass" },
    { zh: "不要让所有块角度一致", en: "Never align every block to one angle" },
    { zh: "不要用统一字体", en: "Never use one typeface throughout" },
    { zh: "不要让撕边完全规律", en: "Do not make the torn edges regular" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2d2d2d",
      background: "#f5f0e8",
      paper: "#fbf7ef",
      red: "#e74c3c",
      blue: "#3498db",
      orange: "#f39c12",
    },
    prompts: [
      {
        zh: "做一个拼贴风卡片：背景 #fbf7ef、零圆角、用 clip-path: polygon(0 2%,8% 0,20% 3%,35% 0,50% 2%,65% 0,80% 3%,92% 0,100% 2%,100% 98%,90% 100%,75% 97%,60% 100%,45% 98%,30% 100%,15% 97%,0 100%) 做出撕纸边、box-shadow 6px 6px 0 rgba(45,45,45,0.28)、transform rotate(-1.5deg)。标题用衬线 48px/700，副标题用无衬线 34px/900 并 rotate(1deg)，左上角贴一条 120px 长、旋转 -4 度的半透明红色胶带（clip-path 切锯齿）。hover 时 rotate(0)、translateY(-2px)，transition 200ms。页面底色 #f5f0e8。",
        en: "Build a collage card: background #fbf7ef, zero radius, with clip-path polygon(0 2%,8% 0,20% 3%,35% 0,50% 2%,65% 0,80% 3%,92% 0,100% 2%,100% 98%,90% 100%,75% 97%,60% 100%,45% 98%,30% 100%,15% 97%,0 100%) for the torn edge, box-shadow 6px 6px 0 rgba(45,45,45,0.28) and transform rotate(-1.5deg). The headline runs 48px/700 serif, the subhead 34px/900 sans at rotate(1deg), and a 120px tape strip rotated -4 degrees with a zigzag cut sits top-left in translucent red. Hover applies rotate(0) and translateY(-2px) over 200ms. The page ground is #f5f0e8.",
      },
    ],
  },
  similar: [
    { name: "Hand Drawn Doodle", why: { zh: "同属手工感，但涂鸦靠笔迹，拼贴靠剪贴与层叠", en: "Both handmade, though doodle relies on pen strokes while collage relies on cutting and layering" } },
    { name: "Retro Vintage", why: { zh: "同样有旧纸，但复古怀旧是印刷品本身，拼贴是剪下来重排", en: "Both involve old paper, though retro vintage is the printed object while collage cuts it up" } },
  ],
  completeness: "full",
};
