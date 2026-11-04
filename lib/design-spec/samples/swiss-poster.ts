import type { DesignSpec } from "../types";

export const swissPosterSpec: DesignSpec = {
  slug: "swiss-poster",
  name: "瑞士海报风",
  nameEn: "Swiss Poster",
  cover: "/styles/swiss-poster.svg",
  theme: "light",
  northStar: {
    zh: "字大到成为图形，区块紧贴不留缝，层级靠尺寸与色块。",
    en: "Type so large it becomes the image, regions flush with no gaps, hierarchy from size and blocks.",
  },
  summary: {
    zh: "瑞士海报风是国际主义风格的海报分支：与常规瑞士风格的区别在于它把字推到海报尺度——字大到成为图形本身，行宽与栏宽由内容决定，允许单字占半屏。它的版面规则极其硬：黑白为主，原色（红 #ff0000、蓝 #0057b8、黄 #ffcc00）只作色块强调；区域之间用 2px 黑线分隔而不是留白，元素之间 gap-0 紧贴；圆角不超过 2px。禁止装饰性字体与等宽字体、禁止渐变、禁止虚线边框。",
    en: "Swiss Poster is the poster branch of the International Style: unlike the regular Swiss approach, it pushes type to poster scale so the letters become the image, with line and column width determined by the words themselves and a single character permitted to take half a screen. The layout rules are rigid — black and white lead, primaries (red #ff0000, blue #0057b8, yellow #ffcc00) appear only as blocks, regions divide with 2px black rules rather than whitespace, elements sit flush at gap-0, and radius never exceeds 2px. Decorative and monospace faces are refused, as are gradients and dashed borders.",
  },
  colors: [
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "文字、分隔线与最大色块。海报的骨架全靠它。",
        en: "Type, dividers and the largest blocks — the poster's skeleton.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "画布与反白文字。与黑成对，不做灰阶过渡。",
        en: "Canvas and reversed type, always paired with black and never stepped through greys.",
      },
      token: "--color-white",
    },
    {
      name: "原红",
      nameEn: "Red",
      value: "#ff0000",
      group: "accent",
      role: {
        zh: "第一强调色块。用于标记最重要的信息，面积不超过一屏 20%。",
        en: "The first accent block, marking what matters most at under twenty percent of a screen.",
      },
      token: "--color-red",
    },
    {
      name: "原蓝",
      nameEn: "Blue",
      value: "#0057b8",
      group: "accent",
      role: {
        zh: "第二强调色块，常与红形成对角关系。",
        en: "The second accent block, often set diagonally against red.",
      },
      token: "--color-blue",
    },
    {
      name: "原黄",
      nameEn: "Yellow",
      value: "#ffcc00",
      group: "accent",
      role: {
        zh: "第三强调与高亮条，用于需要跳出的细节。",
        en: "The third accent and highlight bars for detail that must jump out.",
      },
      token: "--color-yellow",
    },
    {
      name: "赭",
      nameEn: "Ochre",
      value: "#6c3b00",
      group: "accent",
      role: {
        zh: "唯一暗暖色，用于压在黄色块上的文字。",
        en: "The one dark warm tone, for text sitting on yellow blocks.",
      },
      token: "--color-ochre",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "Helvetica, 'Arial Black', sans-serif",
      weights: [700, 900],
      sizes: [14, 18, 24, 40, 72, 120, 180],
      lineHeight: { display: 0.85, heading: 0.92, body: 1.4 },
      tracking: { display: "-0.045em", label: "0.04em" },
      role: {
        zh: "全站唯一字体，只用 700 与 900。海报标题 120 到 180px、行高压到 0.85，字块本身就是图形。",
        en: "The only face, in 700 and 900. Poster headlines run 120 to 180px at 0.85 leading so the text block becomes the graphic.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 180, lineHeight: 0.85, tracking: "-0.045em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 120, lineHeight: 0.88, tracking: "-0.04em", token: "--text-heading-lg" },
    { role: "heading", weight: 900, size: 72, lineHeight: 0.92, tracking: "-0.03em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 40, lineHeight: 1, token: "--text-subheading" },
    { role: "body", weight: 700, size: 18, lineHeight: 1.4, token: "--text-body" },
    { role: "label", weight: 700, size: 14, lineHeight: 1.3, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 0,
    density: "compact",
    scale: [0, 8, 16, 24, 40, 64, 96],
    maxWidth: 1440,
    sectionGap: 0,
    cardPadding: 24,
    elementGap: 0,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "画布" },
    { level: 1, name: "Black Block", value: "#000000", purpose: "反色区域" },
    { level: 2, name: "Red Block", value: "#ff0000", purpose: "强调区域" },
  ],
  elevation: [{ name: "None", value: "none — nothing floats on a poster" }],
  components: [
    {
      name: "Poster Headline",
      role: { zh: "海报主标题（核心）", en: "The poster headline — the core" },
      construction: {
        zh: "120 到 180px、900 字重、行高 0.85、字距 -0.045em，字块左对齐或贴顶部，允许单行占满 1440px 宽。可与色块重叠（文字永远在上），与相邻区块之间不加空隙而是用 2px 黑线分割。",
        en: "120 to 180px at weight 900, 0.85 leading and -0.045em tracking, flush left or hung from the top, with one line free to fill all 1440px. It may overlap a color block — type always stays on top — and it divides from neighbours with a 2px black rule rather than a gap.",
      },
    },
    {
      name: "Flush Grid",
      role: { zh: "紧贴网格（gap-0）", en: "The flush grid at gap-0" },
      construction: {
        zh: "12 栏网格、gap 为 0，区域之间只用 2px 黑线分隔。每个区域填纯色（白、黑或一支原色），区域内边距 24px。禁止用 gap-4 之类的间距做分隔——在瑞士海报里线就是间距。",
        en: "A twelve-column grid at zero gap where regions divide with 2px black rules alone. Each region fills solid — white, black or one primary — with 24px padding. Using a spacing gap as a divider is refused; here the line is the spacing.",
      },
    },
    {
      name: "Block Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "纯黑填充、白字、零圆角、无描边、无阴影，14px/700、字距 0.04em、padding 16px 40px。hover 时填充硬切到原红；按下时填充换原蓝并位移 2px 2px（模拟套印偏移）。过渡 120ms linear。",
        en: "Black fill, white text, zero radius, no border, no shadow, 14px/700 at 0.04em, 16px 40px padding. Hover cuts the fill to red; press swaps to blue and offsets 2px 2px like a misregistered print. 120ms linear.",
      },
      sizes: "padding 16px 40px; label 14px",
      states: "hover: red fill; active: blue fill, offset 2px",
    },
    {
      name: "Color Field",
      role: { zh: "色块区域", en: "The color field" },
      construction: {
        zh: "整块填一支原色（红、蓝或黄）或纯黑，零圆角、无描边（由网格的 2px 线代替），内边距 24px。块内文字用黑或白按对比选择，最小 24px。一块只用一色。",
        en: "A full block of one primary — red, blue, yellow — or solid black, with zero radius and no border, since the grid's 2px line does that work. Padding is 24px and text inside is black or white chosen for contrast at 24px minimum. One block, one color.",
      },
    },
    {
      name: "Rule Divider",
      role: { zh: "2px 分隔线", en: "The 2px divider" },
      construction: {
        zh: "2px 纯黑实线，横跨或纵贯，用于切割区域。绝不用虚线（这在瑞士语言里等于软弱），也绝不用留白代替线。",
        en: "A 2px solid black rule, horizontal or vertical, cutting regions apart. Never dashed, which in this language reads as weakness, and never replaced by whitespace.",
      },
    },
  ],
  imagery: {
    zh: "黑白摄影、几何构成、单色图形。图像必须能被裁剪成严格的矩形并贴齐网格，允许高对比双色调叠加一支原色。不使用柔和摄影、插画与装饰图形。",
    en: "Black-and-white photography, geometric composition, monochrome graphics. Imagery must crop to strict rectangles aligned to the grid, and a high-contrast duotone with one primary may overlay it. No soft photography, illustration or ornament.",
  },
  layout: {
    zh: "上限 1440px、零间距、12 栏、区域用 2px 线分隔。海报允许极端非对称：标题占 10 栏、正文占 2 栏。禁止居中的对称排版，也禁止用留白代替分隔线。",
    en: "Capped at 1440px with zero gaps over twelve columns, regions divided by 2px rules. Extreme asymmetry is welcome — a headline spanning ten columns against two columns of body. Centred symmetry is refused, as is whitespace standing in for a divider.",
  },
  dos: [
    { zh: "字大到成为图形（120 到 180px）", en: "Push type to graphic scale, 120 to 180px" },
    { zh: "黑白为主，原色只作色块", en: "Black and white lead; primaries appear as blocks" },
    { zh: "区域用 2px 黑线分隔，gap 为 0", en: "Divide regions with 2px black rules at gap 0" },
    { zh: "行高压到 0.85 到 0.92", en: "Compress leading to 0.85–0.92" },
    { zh: "允许极端非对称", en: "Allow extreme asymmetry" },
    { zh: "圆角不超过 2px", en: "Radius never exceeds 2px" },
  ],
  donts: [
    { zh: "不要用装饰性字体或等宽字体", en: "No decorative or monospace faces" },
    { zh: "不要用超过 2px 的圆角", en: "No radius above 2px" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要用虚线边框", en: "No dashed borders" },
    { zh: "不要用间距代替分隔线", en: "Never use gaps in place of rules" },
    { zh: "不要做居中的对称排版", en: "No centred symmetric layout" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      red: "#ff0000",
      blue: "#0057b8",
      yellow: "#ffcc00",
      ochre: "#6c3b00",
    },
    prompts: [
      {
        zh: "做一个瑞士海报版面：12 栏网格、gap 为 0、区域之间用 2px solid #000 分隔。主标题 180px/900、行高 0.85、字距 -0.045em、左对齐并占满 10 栏。右侧两栏放 18px/700 正文。一块区域填 #ff0000、一块填 #0057b8、一块纯黑，块内文字按对比取黑或白、最小 24px。按钮纯黑填充、白字、零圆角、padding 16px 40px，hover 时硬切到 #ff0000。页面底色 #ffffff。",
        en: "Build a Swiss poster layout: a twelve-column grid at zero gap with regions divided by 2px solid #000. The headline runs 180px/900 at 0.85 leading and -0.045em tracking, flush left across ten columns, with two columns of 18px/700 body at the right. One region fills #ff0000, one #0057b8 and one solid black, with text inside set in black or white for contrast at 24px minimum. The button is solid black with white text, zero radius, 16px 40px padding, cutting to #ff0000 on hover. The page ground is #ffffff.",
      },
    ],
  },
  similar: [
    { name: "Swiss Style", why: { zh: "同一传统，但常规瑞士风格讲留白与克制，海报风把字推到极限", en: "Same tradition, though regular Swiss uses whitespace and restraint while poster pushes type to the limit" } },
    { name: "Bauhaus", why: { zh: "同样用原色与几何，但包豪斯更讲功能位置，海报更讲尺度冲击", en: "Both use primaries and geometry, though Bauhaus is about function placement while poster is about scale" } },
  ],
  completeness: "full",
};
