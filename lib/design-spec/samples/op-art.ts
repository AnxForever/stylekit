import type { DesignSpec } from "../types";

export const opArtSpec: DesignSpec = {
  slug: "op-art",
  name: "欧普艺术",
  nameEn: "Op Art",
  cover: "/styles/op-art.svg",
  theme: "light",
  northStar: {
    zh: "黑白条纹让静止的页面看起来在动——眼睛被图案骗了。",
    en: "Black and white stripes make a still page look like it moves — the eye is being fooled.",
  },
  summary: {
    zh: "欧普艺术用几何图案制造视觉错觉：纯黑白的极端对比是底子，同心圆、条纹与棋盘格作为装饰，振动色彩对（红与蓝、黄与紫）作点缀。它的纪律与「乱」相反——所有元素严格对齐网格、居中、用 2px 黑线勾出、零圆角，因为错觉依赖图案的精确性，任何松动都会让效果失效。它禁止大面积密集图案（会造成视觉疲劳与晕眩）、禁止柔和渐变、禁止柔和阴影。",
    en: "Op Art manufactures optical illusion from geometry: pure black-and-white contrast underneath, concentric circles, stripes and checkerboards as ornament, and vibrating color pairs (red against blue, yellow against violet) as accent. Its discipline is the opposite of looseness — everything snaps to a grid, centres, is outlined at 2px and kept square, because the illusion depends on the pattern's precision and any drift breaks it. Dense pattern at large scale is refused for the eye strain and dizziness it causes, along with soft gradients and soft shadows.",
  },
  colors: [
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "图案的一半、文字与 2px 线条。对比的极限。",
        en: "Half of every pattern, all type and the 2px lines — the limit of contrast.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "图案的另一半与画布。纯白，不做任何灰阶过渡。",
        en: "The other half of every pattern and the canvas — pure, with no grey transitions.",
      },
      token: "--color-white",
    },
    {
      name: "振动红",
      nameEn: "Vibrating Red",
      value: "#ff3300",
      group: "accent",
      role: {
        zh: "第一振动色，与蓝并置时边缘会「抖」。",
        en: "The first vibrating color — its edge shakes when set beside blue.",
      },
      token: "--color-vibrating-red",
    },
    {
      name: "振动蓝",
      nameEn: "Vibrating Blue",
      value: "#0066ff",
      group: "accent",
      role: {
        zh: "第二振动色，与红成对使用，绝单独出现。",
        en: "The second vibrating color, always paired with red and never alone.",
      },
      token: "--color-vibrating-blue",
    },
    {
      name: "振动黄",
      nameEn: "Vibrating Yellow",
      value: "#ffcc00",
      group: "accent",
      role: {
        zh: "第三振动色，只作小块点缀。",
        en: "The third vibrating tone, only on small blocks.",
      },
      token: "--color-vibrating-yellow",
    },
    {
      name: "橄榄",
      nameEn: "Olive",
      value: "#5e6d00",
      group: "accent",
      role: {
        zh: "压在黄色上的文字色，避免黄底黄字。",
        en: "A text tone for use on yellow, avoiding yellow on yellow.",
      },
      token: "--color-olive",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "Helvetica, 'Arial Black', sans-serif",
      weights: [500, 700],
      sizes: [13, 16, 22, 30, 44, 64],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.5 },
      tracking: { display: "-0.02em", label: "0.1em" },
      role: {
        zh: "极简无衬线，字重 500 与 700。文字必须克制——图案已经是主角。",
        en: "A minimal sans at 500 and 700. Type must stay restrained — the pattern is already the subject.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 64, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 44, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 30, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 22, lineHeight: 1.45, token: "--text-body-lg" },
    { role: "body", weight: 500, size: 16, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 700, size: 13, lineHeight: 1.4, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "画布" },
    { level: 1, name: "Black Block", value: "#000000", purpose: "反色区块" },
    { level: 2, name: "Pattern Field", value: "repeating gradient", purpose: "图案区" },
  ],
  elevation: [
    { name: "None", value: "none — a shadow would break the flat illusion" },
  ],
  components: [
    {
      name: "Concentric Rings",
      role: { zh: "同心圆图案（签名）", en: "Concentric rings — the signature" },
      construction: {
        zh: "用 repeating-radial-gradient 画 8px 一环的黑白同心圆，覆盖一个 240 到 480px 的方或圆区域。线与线的宽度必须相等（各 8px），一宽一窄就失去欧普的「呼吸」节奏。",
        en: "A repeating radial gradient draws black and white rings at 8px intervals over a 240 to 480px square or circle. Line and gap widths must match at 8px each — uneven widths lose the breathing rhythm of Op.",
      },
    },
    {
      name: "Stripe Field",
      role: { zh: "条纹与棋盘格", en: "Stripe and checker fields" },
      construction: {
        zh: "用 repeating-linear-gradient 画 8px 间隔的黑白条纹，或 16px 的棋盘格，覆盖一个区块。条纹可以 15 度倾斜制造更强的振动。面积上限为单屏 30%——超过会导致视觉疲劳。",
        en: "A repeating linear gradient draws black and white stripes at 8px or a 16px checker over a block. Tilting the stripes fifteen degrees intensifies the vibration. The area never exceeds thirty percent of a screen; beyond that the eye tires.",
      },
    },
    {
      name: "Vibrating Pair",
      role: { zh: "振动色对", en: "The vibrating pair" },
      construction: {
        zh: "红与蓝（或黄与紫）两块等面积的色块紧贴并列，中间加一条 2px 黑线。两色边界会产生震颤感。绝不让其中一块独占大面积，面积必须相等才有振动。",
        en: "Equal areas of red and blue (or yellow and violet) sit flush with a 2px black rule between them, and the boundary trembles. Neither may dominate — the vibration only works at equal area.",
      },
    },
    {
      name: "Op Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "黑填充、白字、零圆角、2px 黑描边（反色时为白描边）、16px/700、padding 12px 28px，无阴影。hover 时填充与文字硬切互换（黑白反转）；按下时内缩 2px 并加 2px 黑内边框。过渡 120ms linear。",
        en: "Black fill, white text, zero radius, a 2px black border (white when inverted), 16px/700, 12px 28px padding, no shadow. Hover cuts fill and text into each other — a black-white inversion; press insets 2px with a 2px black inner border. 120ms linear.",
      },
      sizes: "padding 12px 28px; label 16px",
      states: "hover: invert; active: inset 2px",
    },
    {
      name: "Grid Cell",
      role: { zh: "严格网格单元", en: "The strict grid cell" },
      construction: {
        zh: "所有内容放在严格对齐的网格里（4 或 6 列），单元用 2px 黑线分隔，零圆角。内容居中（items-center justify-center）。禁止错位——欧普的错觉会被任何松动破坏。",
        en: "All content sits on a strictly aligned grid of four or six columns, cells divided by 2px black lines, zero radius, content centred. Nothing may offset — any drift breaks the illusion.",
      },
    },
  ],
  imagery: {
    zh: "图像即图案：同心圆、条纹、棋盘格、莫尔条纹、波动线。允许把照片转成超高高对比的黑白半调。不使用彩色摄影、柔和插画与任何有景深的图像。",
    en: "The imagery is pattern: concentric rings, stripes, checkers, moiré, wavy lines. A photo may be reduced to extremely high-contrast black-and-white halftone. No color photography, soft illustration or anything with depth of field.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 24px，区块间距 96px。一切严格对齐网格并居中，零圆角零阴影。图案区块的面积受控：单屏不超过 30% 是密集图案区，其余留白或纯色。",
    en: "Capped at 1200px with 24px padding, sections 96px apart. Everything snaps to the grid and centres, with zero radius and zero shadow. Pattern coverage is capped — no more than thirty percent of a screen carries dense pattern, the rest stays empty or solid.",
  },
  dos: [
    { zh: "纯黑白的高对比", en: "Pure black-and-white contrast" },
    { zh: "同心圆、条纹与棋盘格", en: "Concentric rings, stripes and checkers" },
    { zh: "条纹与间隔宽度必须相等", en: "Stripe and gap widths must match" },
    { zh: "严格网格对齐并居中", en: "Snap to the grid and centre" },
    { zh: "振动色对大块等面积并列", en: "Vibrating pairs sit at equal area" },
    { zh: "密集图案不超过单屏 30%", en: "Dense pattern stays under 30% of a screen" },
  ],
  donts: [
    { zh: "不要大面积铺密集图案", en: "No dense pattern at large scale" },
    { zh: "不要用柔和渐变", en: "No soft gradients" },
    { zh: "不要用柔和阴影", en: "No soft shadows" },
    { zh: "不要偏移网格", en: "Never offset the grid" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要让振动色对面积不等", en: "Never let a vibrating pair fall out of equal area" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      red: "#ff3300",
      blue: "#0066ff",
      yellow: "#ffcc00",
      olive: "#5e6d00",
    },
    prompts: [
      {
        zh: "做一个欧普艺术版面：白底 #ffffff、纯黑 #000000 图案。左侧一个 320px 见方的同心圆区域，用 repeating-radial-gradient 画 8px 环（线与间隔各 8px）。右侧严格 6 栏网格、居中排版，标题 44px/700 字距 -0.02em，正文 16px/500。中间放一对等面积的振动色块：红 #ff3300 与蓝 #0066ff 紧贴、中间 2px 黑线。按钮黑填充白字、零圆角、2px 黑边，hover 时黑白反转，transition 120ms linear。全站零圆角、零阴影、无渐变。密集图案面积不超过单屏 30%。",
        en: "Build an Op Art layout: white #ffffff ground with pure black #000000 pattern. A 320px concentric-ring area on the left uses a repeating radial gradient at 8px intervals (line and gap both 8px). The right side sits on a strict six-column grid, centred, with a 44px/700 headline at -0.02em and 16px/500 body. Between them, an equal-area vibrating pair — red #ff3300 flush against blue #0066ff with a 2px black rule. The button fills black with white text, zero radius and a 2px black border, inverting on hover over 120ms linear. Zero radius, zero shadow, no gradients, and dense pattern covering no more than thirty percent of a screen.",
      },
    ],
  },
  similar: [
    { name: "Bauhaus", why: { zh: "同样几何与纯色，但包豪斯不制造错觉，欧普的图案就是为了骗眼睛", en: "Both geometry and flat color, though Bauhaus does not aim to fool the eye while Op does" } },
    { name: "Swiss Poster", why: { zh: "同样严格网格与黑白，但瑞士海报靠排版，欧普靠图案", en: "Both strict grid and black-and-white, though Swiss poster works in type while Op works in pattern" } },
  ],
  completeness: "full",
};
