import type { DesignSpec } from "../types";

export const cubismSpec: DesignSpec = {
  slug: "cubism",
  name: "立体主义",
  nameEn: "Cubism",
  cover: "/styles/cubism.svg",
  theme: "light",
  northStar: {
    zh: "把同一件东西从三个角度看，再压回一个平面。",
    en: "Look at one thing from three angles, then press it back into a single plane.",
  },
  summary: {
    zh: "立体主义来自毕加索与布拉克：把对象拆成棱角分明的几何块，从多个视角同时呈现，再用 skew 与 rotate 把这些碎片压回画面。配色是低饱和的大地色（棕 #5c4033、米 #e8dcc8、赭 #8b7355、灰蓝 #3d5c6e、砖红 #9b3d25、苔绿 #647f53），边框 2px 粗线、圆角只有 2 到 4px、布局刻意不对称并带倾斜，文字用粗体全大写字强调几何感。它禁止柔和渐变与模糊——立体主义是硬的。",
    en: "Cubism comes from Picasso and Braque: the subject is broken into angular geometric planes shown from several viewpoints at once, then pressed back into the picture with skew and rotate. The palette stays low-saturation and earthy (brown #5c4033, cream #e8dcc8, ochre #8b7355, slate blue #3d5c6e, brick #9b3d25, moss #647f53), with 2px heavy borders, radii of only 2 to 4px, deliberately asymmetric tilted layout, and bold uppercase type to stress the geometry. Soft gradients and blur are refused — Cubism is hard.",
  },
  colors: [
    {
      name: "棕",
      nameEn: "Umber",
      value: "#5c4033",
      group: "brand",
      role: {
        zh: "主色：文字、粗边框与最深色块。",
        en: "The primary on type, heavy borders and the darkest planes.",
      },
      token: "--color-umber",
    },
    {
      name: "米",
      nameEn: "Cream",
      value: "#e8dcc8",
      group: "surface",
      role: {
        zh: "页面底与浅色面。像旧画布的米色。",
        en: "The page ground and light planes — the cream of an old canvas.",
      },
      token: "--color-cream",
    },
    {
      name: "赭",
      nameEn: "Ochre",
      value: "#8b7355",
      group: "accent",
      role: {
        zh: "中间调色面，用于制造第三个明度层。",
        en: "The middle-value plane, creating a third tonal layer.",
      },
      token: "--color-ochre",
    },
    {
      name: "灰蓝",
      nameEn: "Slate Blue",
      value: "#3d5c6e",
      group: "accent",
      role: {
        zh: "冷侧的碎面，与棕形成分析立体主义的冷暖交错。",
        en: "The cool fragment, interlacing with brown the way analytical Cubism does.",
      },
      token: "--color-slate-blue",
    },
    {
      name: "砖红",
      nameEn: "Brick",
      value: "#9b3d25",
      group: "accent",
      role: {
        zh: "最暖的碎面，用于强调与关键块。",
        en: "The warmest fragment, on emphasis and key planes.",
      },
      token: "--color-brick",
    },
    {
      name: "苔绿",
      nameEn: "Moss",
      value: "#647f53",
      group: "accent",
      role: {
        zh: "第四碎面色，出现频率最低。",
        en: "The fourth fragment tone, used least.",
      },
      token: "--color-moss",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Georgia, sans-serif",
      weights: [700, 900],
      sizes: [14, 18, 24, 32, 44, 60],
      lineHeight: { display: 1, heading: 1.1, body: 1.55 },
      tracking: { display: "-0.02em", label: "0.06em" },
      role: {
        zh: "粗无衬线、全大写。字形必须方正，因为立体主义的文字也是被切的块。",
        en: "A heavy sans, uppercase. Letterforms stay squared, since Cubist type is itself a cut plane.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 60, lineHeight: 1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 44, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 32, lineHeight: 1.15, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 24, lineHeight: 1.45, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 18, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 900, size: 14, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Cream", value: "#e8dcc8", purpose: "页面底" },
    { level: 1, name: "Ochre Plane", value: "#8b7355", purpose: "中间调面" },
    { level: 2, name: "Umber Plane", value: "#5c4033", purpose: "最深面" },
  ],
  elevation: [
    { name: "None", value: "none — planes stack by overlap, not shadow" },
  ],
  components: [
    {
      name: "Fragmented Panel",
      role: { zh: "碎片化面板（核心组件）", en: "The fragmented panel — the core component" },
      construction: {
        zh: "一个容器被 clip-path 切成 3 到 5 个不规则多边形，每块填不同的大地色，块与块之间留 2px 的米色缝（模拟画布的底色透出）。整块 rotate(-2deg) 或 skewX(-4deg)。零阴影。",
        en: "A container cut by clip-path into three to five irregular polygons, each filled with a different earth tone and separated by a 2px cream gap where the canvas shows through. The whole block sits at rotate(-2deg) or skewX(-4deg). No shadow.",
      },
    },
    {
      name: "Multi-View Block",
      role: { zh: "多视角叠加", en: "The multi-view overlay" },
      construction: {
        zh: "同一内容的副本叠两层：一层正常、一层偏移 8px 并 skewX(-8deg)、不透明度 45%，形成「同时从两个角度看」的错觉。仅用于标题与图像，正文绝不叠加。",
        en: "Duplicate a single element into two layers: one normal, one offset 8px with skewX(-8deg) at 45% opacity, producing the sense of two viewpoints at once. Reserved for headings and images — body copy is never overlaid.",
      },
    },
    {
      name: "Angular Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "棕填充、米色文字、2px 圆角、2px 棕描边、14px/900 全大写、字距 0.06em、padding 14px 28px，无阴影。用 clip-path 切掉右上角 12px。hover 时填充换砖红；按下时位移 2px 2px。过渡 150ms linear。",
        en: "Umber fill, cream text, 2px radius, a 2px umber border, 14px/900 uppercase at 0.06em, 14px 28px padding, no shadow. clip-path removes 12px from the top-right. Hover swaps the fill to brick; press translates 2px 2px. 150ms linear.",
      },
      sizes: "padding 14px 28px; label 14px",
      states: "hover: brick fill; active: translate 2px",
    },
    {
      name: "Skewed Card",
      role: { zh: "倾斜卡片", en: "The skewed card" },
      construction: {
        zh: "米色或大地色填充、4px 圆角、2px 棕描边、内边距 28px。整张卡 skewX(-3deg) 并 rotate(1deg)，相邻卡片角度不同（-3、+2、-1 度），刻意不对称。内容在内层反向 skew 以保持文字直立。",
        en: "A cream or earth fill, 4px radius, a 2px umber border, 28px padding. The card sits at skewX(-3deg) and rotate(1deg), with neighbours at different angles (-3, +2, -1) for deliberate asymmetry. Content counter-skews inside so the type stays upright.",
      },
    },
    {
      name: "Fragmented Edge",
      role: { zh: "碎片边缘", en: "The fragmented edge" },
      construction: {
        zh: "用 clip-path 的一个不规则多边形让图像的边缘像被打碎，或沿边缘叠 3 到 4 个小的三角与梯形色块。它替代圆角与装饰边框。",
        en: "A clip-path polygon breaks an image's edge as if struck, or three to four small triangles and trapezoids stack along the boundary. It replaces rounding and decorative borders.",
      },
    },
  ],
  imagery: {
    zh: "图像必须被切碎：把照片用 clip-path 分成多块并各自偏移、或转成大地色的多面体构成。允许同一张脸的三个角度并置。不使用完整清晰的照片、柔和插画与渐变图像。",
    en: "Imagery must be broken: a photo cut into pieces by clip-path and offset, or rendered as an earth-toned polyhedron. Three angles of one face may sit side by side. No intact photographs, soft illustration or gradient imagery.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 96px。允许元素重叠、倾斜与错位，角度只用 -3、-1.5、+2 三档。布局必须不对称——居中对称会立刻失去立体主义。",
    en: "Capped at 1120px with 24px padding, sections 96px apart. Elements overlap, tilt and offset, with angles limited to -3, -1.5 and +2 degrees. The layout must stay asymmetric — centred symmetry loses Cubism immediately.",
  },
  dos: [
    { zh: "大地色系，低饱和", en: "Earth tones at low saturation" },
    { zh: "用 clip-path 把面切成碎片", en: "Cut planes into fragments with clip-path" },
    { zh: "多视角叠加同一内容", en: "Overlay multiple views of one subject" },
    { zh: "2px 粗边框、2 到 4px 圆角", en: "2px heavy borders, radii of 2 to 4px" },
    { zh: "布局不对称并倾斜", en: "Asymmetric, tilted layout" },
    { zh: "粗体全大写字", en: "Bold uppercase type" },
  ],
  donts: [
    { zh: "不要用柔和渐变与模糊", en: "No soft gradients or blur" },
    { zh: "不要用对称居中布局", en: "No symmetrical centred layout" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要用过亮的饱和色", en: "No bright saturated color" },
    { zh: "不要把完整照片直接放上", en: "Never place an intact photograph" },
    { zh: "不要给碎面加阴影", en: "Never shadow the fragments" },
  ],
  promptGuide: {
    quickColors: {
      text: "#5c4033",
      background: "#e8dcc8",
      ochre: "#8b7355",
      slate: "#3d5c6e",
      brick: "#9b3d25",
      moss: "#647f53",
    },
    prompts: [
      {
        zh: "做一个立体主义面板：米色 #e8dcc8 为底，用 clip-path 把一个矩形切成 4 个不规则多边形，分别填 #5c4033、#8b7355、#3d5c6e、#9b3d25，块间留 2px 米色缝，整块 rotate(-2deg) skewX(-4deg)、零阴影。标题 44px/900 全大写，叠一层偏移 8px、skewX(-8deg)、45% 不透明度的副本。按钮 #5c4033 填充、米色文字、2px 圆角、2px 描边、padding 14px 28px、clip-path 切掉右上角 12px，hover 时填充换 #9b3d25。布局不对称，全站无渐变无阴影。",
        en: "Build a Cubist panel: cream #e8dcc8 ground with a rectangle cut by clip-path into four irregular polygons filled #5c4033, #8b7355, #3d5c6e and #9b3d25, separated by 2px cream gaps, the whole block at rotate(-2deg) skewX(-4deg) with no shadow. The headline runs 44px/900 uppercase under an offset copy shifted 8px with skewX(-8deg) at 45% opacity. The button fills #5c4033 with cream text on a 2px radius, a 2px border, 14px 28px padding and clip-path removing 12px from the top-right, swapping to #9b3d25 on hover. The layout stays asymmetric, with no gradients and no shadows anywhere.",
      },
    ],
  },
  similar: [
    { name: "Constructivism", why: { zh: "同为几何与硬边，但构成主义有政治秩序，立体主义拆解视角", en: "Both geometric and hard-edged, though Constructivism asserts order while Cubism dismantles viewpoint" } },
    { name: "Asymmetric Grid", why: { zh: "同样不对称，但网格仍保持矩形，立体主义切成多边形", en: "Both asymmetric, though the grid keeps rectangles while Cubism cuts polygons" } },
  ],
  completeness: "full",
};
