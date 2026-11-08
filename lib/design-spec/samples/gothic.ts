import type { DesignSpec } from "../types";

export const gothicSpec: DesignSpec = {
  slug: "gothic",
  name: "哥特式风",
  nameEn: "Gothic",
  cover: "/styles/gothic.svg",
  theme: "dark",
  northStar: {
    zh: "尖拱、玫瑰窗、手抄本边饰：一座还没点灯的大教堂。",
    en: "Pointed arches, a rose window, manuscript borders — a cathedral before the lights come up.",
  },
  summary: {
    zh: "哥特式风来自中世纪教堂建筑与手抄本装饰：深紫（#2d1b4e）、血红（#8b1a1a）与黑为底，金色（#c9a227）作装饰线，形状一律是尖拱、三叶饰与玫瑰花窗，标题必须用衬线并带装饰性，页面必须有边饰与首字下沉这类手抄本语汇。它的禁令是：不许明亮欢快的配色、不许圆润可爱的元素、不许现代无衬线做标题、不许过度简约、不许轻浮的快速抖动或弹性跳动——庄严感不容许任何轻快。",
    en: "Gothic draws on medieval church architecture and manuscript decoration: deep violet (#2d1b4e), blood red (#8b1a1a) and black underneath, gold (#c9a227) as ornamental line, pointed arches, trefoils and rose windows for every form, decorative serif for headings, and a page carrying manuscript grammar such as borders and drop caps. The prohibitions: no bright cheerful palette, no round cute elements, no modern sans on headings, no over-simplification, and no frivolous jitter or elastic bounce — solemnity tolerates no lightness.",
  },
  colors: [
    {
      name: "深紫",
      nameEn: "Deep Violet",
      value: "#2d1b4e",
      group: "surface",
      role: {
        zh: "页面底与主色。教堂夜里的紫，比黑更有层次。",
        en: "The page ground and primary — the violet of a church at night, layered where black would be flat.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "血红",
      nameEn: "Blood Red",
      value: "#8b1a1a",
      group: "brand",
      role: {
        zh: "第二主色：彩窗、印章与关键强调。",
        en: "The second primary on glass, seals and key emphasis.",
      },
      token: "--color-blood-red",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#c9a227",
      group: "accent",
      role: {
        zh: "装饰线、描边与高光。所有镶边的颜色。",
        en: "Ornamental lines, strokes and highlights — the color of every gilded edge.",
      },
      token: "--color-gold",
    },
    {
      name: "黑",
      nameEn: "Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "最深的区块与阴影。",
        en: "The deepest blocks and the shadows.",
      },
      token: "--color-black",
    },
    {
      name: "中紫",
      nameEn: "Mid Violet",
      value: "#4a2d6e",
      group: "surface",
      role: {
        zh: "抬升面与卡片，比底色亮一档。",
        en: "Raised surfaces and cards, one step above the ground.",
      },
      token: "--color-mid-violet",
    },
    {
      name: "苔绿",
      nameEn: "Verdigris",
      value: "#4bc542",
      group: "accent",
      role: {
        zh: "彩窗里的一抹绿与「生」的语义，面积最小。",
        en: "A note of green from stained glass and the sense of life, at the smallest area.",
      },
      token: "--color-verdigris",
    },
  ],
  fonts: [
    {
      family: "UnifrakturMaguntia",
      substitute: "'Cinzel', 'Playfair Display', Georgia, serif",
      weights: [400, 700],
      sizes: [18, 24, 32, 44, 60, 84],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.7 },
      tracking: { display: "0.02em", label: "0.18em" },
      role: {
        zh: "标题用哥特体或高对比装饰衬线，正文用可读衬线。哥特体只做标题，正文用它读不动。",
        en: "Headings in a blackletter or high-contrast decorative serif; body in a readable serif. Blackletter is for headings only — body set in it cannot be read.",
      },
      token: "--font-display",
    },
    {
      family: "EB Garamond",
      substitute: "Garamond, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [15, 17, 20],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.75 },
      tracking: { display: "0.01em", label: "0.18em" },
      role: {
        zh: "正文与说明。可读衬线，行高 1.75，像手抄本的正文栏。",
        en: "Body and captions — a readable serif at 1.75 leading, like the text column of a manuscript.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "UnifrakturMaguntia", weight: 400, size: 84, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "UnifrakturMaguntia", weight: 400, size: 60, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "UnifrakturMaguntia", weight: 400, size: 44, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "EB Garamond", weight: 400, size: 20, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", font: "EB Garamond", weight: 400, size: 17, lineHeight: 1.75, token: "--text-body" },
    { role: "label", font: "EB Garamond", weight: 600, size: 15, lineHeight: 1.6, tracking: "0.18em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1080,
    sectionGap: 128,
    cardPadding: 36,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "arches", value: "50% 50% 0 0" },
    { element: "windows", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Violet", value: "#2d1b4e", purpose: "页面底" },
    { level: 1, name: "Mid Violet", value: "#4a2d6e", purpose: "卡片与抬升面" },
    { level: 2, name: "Black", value: "#0a0a0a", purpose: "最深区块" },
  ],
  elevation: [
    { name: "None", value: "none — depth comes from arch and shadow shape" },
    { name: "Gold rim", value: "inset 0 0 0 1px rgba(201,162,39,0.40)" },
  ],
  components: [
    {
      name: "Pointed Arch Frame",
      role: { zh: "尖拱框架（核心组件）", en: "The pointed arch frame — the core component" },
      construction: {
        zh: "容器顶部用 clip-path 切出尖拱（两侧圆弧在顶部相交，或直接 polygon 画尖顶），零圆角，1px 金描边沿边勾出。内部填中紫或深紫，可嵌彩窗式色块。整块高宽比常见 1:2 到 1:2.5，像教堂的窗。",
        en: "The container's top is cut into a pointed arch by clip-path — two arcs meeting at the apex, or a polygon — with zero radius and a 1px gold stroke tracing the edge. Inside, mid or deep violet may hold stained-glass blocks. The proportion usually runs 1:2 to 1:2.5, like a church window.",
      },
    },
    {
      name: "Gilt Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "血红填充、金文字、1px 金描边、零圆角、衬线 15px、字距 0.18em、padding 14px 36px，无阴影。hover 时填充转深紫、文字转金 100%、描边升到 80%；按下时整体下沉 1px。过渡 400ms ease-out。",
        en: "Blood red fill, gold text, a 1px gold border, zero radius, serif at 15px with 0.18em tracking, 14px 36px padding, no shadow. Hover moves the fill to deep violet, the text to full gold and the border to 80%; press sinks 1px. 400ms ease-out.",
      },
      sizes: "padding 14px 36px; label 15px",
      states: "hover: violet fill, gold border 80%; active: sink 1px",
    },
    {
      name: "Rose Window",
      role: { zh: "玫瑰花窗装饰", en: "The rose window" },
      construction: {
        zh: "一个 96 到 240px 的圆形，内部用 conic-gradient 分成 8 或 12 个扇形，各取红、紫、绿、金之一并降到 40% 不透明度，外圈 2px 金描边加 4 个同心细环。放在区块顶部居中或角落，像教堂的窗。",
        en: "A circle 96 to 240px across divided by conic gradient into eight or twelve wedges in red, violet, green or gold at 40% opacity, ringed by a 2px gold stroke and four thin concentric circles. It sits centred at a section's top or in a corner, like the window it names.",
      },
    },
    {
      name: "Manuscript Border",
      role: { zh: "手抄本边饰", en: "The manuscript border" },
      construction: {
        zh: "页边 24 到 48px 的装饰带：1px 金线加重复的小菱形或三叶饰，四角各放一个 16px 的十字或花饰。它框住整个内容区，让页面像一页手抄本。",
        en: "A 24 to 48px ornamental band at the page edge: a 1px gold line with repeating diamonds or trefoils and a 16px cross or floret at each corner. It frames the content so the page reads as a manuscript leaf.",
      },
    },
    {
      name: "Drop Cap",
      role: { zh: "首字下沉", en: "The drop cap" },
      construction: {
        zh: "段落首字母 float: left、字号为正文的 3.2 倍、行高对齐三行、颜色金或血红、字体用装饰衬线。每个内容区块只允许一次，且只在第一段。",
        en: "The paragraph's first letter floats left at 3.2x the body size, spanning three lines, in gold or blood red, set in the decorative serif. One per content block, and only on the opening paragraph.",
      },
    },
  ],
  imagery: {
    zh: "教堂建筑摄影、彩窗局部、手抄本插图、木刻版画。必须暗调、有明确的拱形构图。允许把照片处理成深紫与血红的双色调。不使用明亮摄影、现代插画与任何轻快的图形。",
    en: "Cathedral photography, stained glass details, manuscript illumination, woodcut. It must be dark with a clear arched composition, and a photo may be graded to violet and blood red. No bright photography, modern illustration or anything light.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 32px，区块间距 128px。允许严格轴对称（与暗黑学院不同，哥特更讲仪式性的对称）。页边保留装饰带，内容区收窄。",
    en: "Capped at 1080px with 32px padding, sections 128px apart. Strict axial symmetry is welcome here — unlike dark academia, Gothic leans ritual. The ornamental band holds the page edge while the content column narrows.",
  },
  dos: [
    { zh: "深紫、血红、黑配金线", en: "Deep violet, blood red and black with gold line" },
    { zh: "形状用尖拱、三叶与玫瑰窗", en: "Forms are pointed arches, trefoils and rose windows" },
    { zh: "标题用哥特体，正文用可读衬线", en: "Blackletter headings, readable serif body" },
    { zh: "页边必须有手抄本式边饰", en: "A manuscript border holds the page edge" },
    { zh: "首字下沉", en: "Drop caps appear" },
    { zh: "过渡 400ms 起，动作庄重", en: "Transitions run 400ms and move gravely" },
  ],
  donts: [
    { zh: "不要用明亮欢快的配色", en: "No bright cheerful palette" },
    { zh: "不要用圆润可爱的元素", en: "No round cute elements" },
    { zh: "不要用现代无衬线做标题", en: "No modern sans on headings" },
    { zh: "不要过度简约", en: "No over-simplification" },
    { zh: "不要用快速抖动与弹性跳动", en: "No rapid jitter or elastic bounce" },
    { zh: "不要用哥特体排正文", en: "Never set body copy in blackletter" },
  ],
  promptGuide: {
    quickColors: {
      text: "#c9a227",
      background: "#2d1b4e",
      red: "#8b1a1a",
      gold: "#c9a227",
      black: "#0a0a0a",
      mid: "#4a2d6e",
    },
    prompts: [
      {
        zh: "做一个哥特式卡片：深紫 #2d1b4e 底、顶部用 clip-path 切出尖拱、零圆角、1px 金 #c9a227 描边、内边距 36px。标题用哥特体 60px、字距 0.02em、色 #c9a227；正文 EB Garamond 17px、行高 1.75、色 rgba(233,225,245,0.85)。首段首字母下沉 3.2 倍、色 #c9a227。按钮血红 #8b1a1a 填充、金字、1px 金边、零圆角、hover 时填充转深紫。页面底 #2d1b4e，页边保留 32px 手抄本式金线边饰。",
        en: "Build a Gothic card: #2d1b4e fill with a pointed arch cut by clip-path at the top, zero radius, a 1px gold #c9a227 stroke, 36px padding. The heading runs blackletter at 60px on 0.02em in #c9a227; body in EB Garamond at 17px on 1.75 leading in rgba(233,225,245,0.85). The opening letter drops at 3.2x in #c9a227. The button fills blood red #8b1a1a with gold text and a 1px gold border on zero radius, moving to deep violet on hover. The page ground is #2d1b4e with a 32px manuscript gold border at the page edge.",
      },
    ],
  },
  similar: [
    { name: "Dark Academia", why: { zh: "同为古典暗调，但暗黑学院是书房与皮革，哥特是教堂与彩窗", en: "Both classical and dark, though dark academia is a study with leather while Gothic is a church with glass" } },
    { name: "Art Deco", why: { zh: "同样用金线，但装饰艺术是几何与机器时代，哥特是中世纪拱券", en: "Both use gold line, though Art Deco is geometry and the machine age while Gothic is medieval arch" } },
  ],
  completeness: "full",
};
