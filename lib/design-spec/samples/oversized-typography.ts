import type { DesignSpec } from "../types";

export const oversizedTypographySpec: DesignSpec = {
  slug: "oversized-typography",
  name: "超大字体排版",
  nameEn: "Oversized Typography",
  cover: "/styles/oversized-typography.svg",
  theme: "light",
  northStar: {
    zh: "字就是版面：用 clamp() 让它随视口长满宽度，其余全退开。",
    en: "The type is the layout — clamp() lets it fill the width as the viewport grows, and everything else steps back.",
  },
  summary: {
    zh: "超大字体排版是 2026 年前后设计作品集的主流语汇：标题用 clamp(3rem, 12vw, 10rem) 随视口连续缩放并顶满宽度，名字与主张本身就是首屏，图像退为点缀。导航、标注与元信息一律用小号等宽全大写加宽字距，形成极端的尺寸对立。配色只有三档——近黑（#0a0a0a）、暖白（#fafaf8）与国际橙（#ff4d00），橙色之外不得出现任何彩色。它禁止渐变、禁止圆角卡片堆砌、禁止投影、禁止装饰性图标替代文字——层次只靠字号、字重与留白。",
    en: "Oversized Typography is the dominant portfolio vocabulary of recent years: headlines take clamp(3rem, 12vw, 10rem) to scale continuously with the viewport and fill the width, so a name or a claim becomes the hero and imagery recedes to accent. Navigation, labels and metadata sit at small monospace uppercase on wide tracking, forming an extreme size opposition. The palette holds exactly three values — near-black (#0a0a0a), warm white (#fafaf8) and international orange (#ff4d00) — with no other color permitted. Gradients, stacks of rounded cards, shadows and decorative icons standing in for words are all refused; hierarchy comes only from size, weight and whitespace.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#0a0a0a",
      group: "brand",
      role: {
        zh: "文字与 hairline。极深的黑，在暖白上对比最强。",
        en: "Type and hairlines — a very deep black with maximum contrast on warm white.",
      },
      token: "--color-ink",
    },
    {
      name: "暖白",
      nameEn: "Warm White",
      value: "#fafaf8",
      group: "surface",
      role: {
        zh: "页面底。微暖的白，让大字不显得冷。",
        en: "The page ground — a barely warm white that keeps huge type from feeling cold.",
      },
      token: "--color-warm-white",
    },
    {
      name: "国际橙",
      nameEn: "International Orange",
      value: "#ff4d00",
      group: "accent",
      role: {
        zh: "唯一强调色：一个词、一条线、一个按钮。绝不出现在第二处语义上。",
        en: "The single accent on one word, one rule, one button — never on a second meaning.",
      },
      token: "--color-international-orange",
    },
    {
      name: "中灰",
      nameEn: "Mid Grey",
      value: "#71717a",
      group: "neutral",
      role: {
        zh: "元信息、标注与页脚小字。",
        en: "Metadata, labels and small footer type.",
      },
      token: "--color-mid-grey",
    },
    {
      name: "线灰",
      nameEn: "Rule Grey",
      value: "#e4e4e7",
      group: "surface",
      role: {
        zh: "hairline 分隔线与极浅的分区底。",
        en: "Hairline dividers and the palest section grounds.",
      },
      token: "--color-rule-grey",
    },
    {
      name: "近黑面",
      nameEn: "Off Black",
      value: "#18181b",
      group: "surface",
      role: {
        zh: "反色区块底，只比墨亮一档。",
        en: "Inverted section grounds, one step above ink.",
      },
      token: "--color-off-black",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 900],
      sizes: [12, 16, 24, 48, 96, 160],
      lineHeight: { display: 0.85, heading: 0.9, body: 1.5 },
      tracking: { display: "-0.05em", label: "0.2em" },
      role: {
        zh: "标题用无衬线 900 并压到行高 0.85、字距 -0.05em；字号用 clamp(3rem, 12vw, 10rem) 连续缩放。",
        en: "Headlines run sans 900 at 0.85 leading and -0.05em tracking, sized by clamp(3rem, 12vw, 10rem) for continuous scaling.",
      },
      token: "--font-display",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400],
      sizes: [11, 12],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.5 },
      tracking: { display: "0.2em", label: "0.2em" },
      role: {
        zh: "导航、标注与元信息一律 11 到 12px 等宽全大写 0.2em，与大标题形成 10 倍以上的尺寸对立。",
        en: "Navigation, labels and metadata all run 11 to 12px monospace uppercase at 0.2em, opposing the headline at a tenfold size gap.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Inter", weight: 900, size: 160, lineHeight: 0.85, tracking: "-0.05em", token: "--text-display" },
    { role: "heading", font: "Inter", weight: 900, size: 96, lineHeight: 0.88, tracking: "-0.04em", token: "--text-heading" },
    { role: "subheading", font: "Inter", weight: 500, size: 48, lineHeight: 1.05, tracking: "-0.03em", token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 24, lineHeight: 1.4, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 16, lineHeight: 1.5, token: "--text-body" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 11, lineHeight: 1.5, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160, 240],
    maxWidth: 1600,
    sectionGap: 160,
    cardPadding: 24,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Warm White", value: "#fafaf8", purpose: "页面底" },
    { level: 1, name: "Off Black", value: "#18181b", purpose: "反色区块" },
  ],
  elevation: [{ name: "None", value: "none — hierarchy comes from size alone" }],
  components: [
    {
      name: "Fluid Headline",
      role: { zh: "流式超大标题（核心）", en: "The fluid headline — the core" },
      construction: {
        zh: "font-size: clamp(3rem, 12vw, 10rem)、900 字重、行高 0.85、字距 -0.05em，左对齐并顶满容器宽度。允许单个词换成国际橙或用 -webkit-text-stroke 做成描边字（作为第二行）。绝不设固定字级——固定字级在窄屏会溢出、宽屏会显小。",
        en: "font-size clamp(3rem, 12vw, 10rem) at weight 900, 0.85 leading and -0.05em tracking, flush left and filling the container. One word may take international orange, or a -webkit-text-stroke outline may carry a second line. The size is never fixed — a fixed size overflows narrow screens and looks small on wide ones.",
      },
      sizes: "clamp(3rem, 12vw, 10rem)",
    },
    {
      name: "Mono Label",
      role: { zh: "等宽小标签", en: "The monospace label" },
      construction: {
        zh: "11 到 12px 等宽、全大写、字距 0.2em、中灰或墨。用于导航、区块编号（01 / 02）、元信息与页脚。它是大标题之外的唯一文字尺寸，不许出现中间的第三档。",
        en: "11 to 12px monospace uppercase at 0.2em, in mid grey or ink, carrying navigation, section numbers (01 / 02), metadata and footer. It is the only size besides the headline — no third tier in between.",
      },
    },
    {
      name: "Hairline Section",
      role: { zh: "hairline 区块分隔", en: "The hairline section divider" },
      construction: {
        zh: "区块之间用 1px 墨色 15% 的 border-top 加 160px 的垂直留白。绝不用阴影或色块分区分隔——分隔与留白就是全部。",
        en: "Sections meet on a 1px ink border at 15% with 160px of vertical emptiness. Never divide with shadow or filled blocks — the rule and the space are the whole device.",
      },
    },
    {
      name: "Orange Arrow",
      role: { zh: "国际橙行动标记", en: "The international orange action mark" },
      construction: {
        zh: "国际橙填充、白字、零圆角、16px/500、padding 14px 28px。或更常见的形式：一行国际橙文字加一个右箭头符号（→），箭头只作为文字的从属，绝不单独出现。",
        en: "International orange fill, white text, zero radius, 16px/500, 14px 28px padding. The more common form is one line of orange text with a right arrow — the arrow subordinates itself to the words and never appears alone.",
      },
    },
    {
      name: "Index Row",
      role: { zh: "作品索引行", en: "The work index row" },
      construction: {
        zh: "每行用 1px 墨色 15% 的下边框分为四段：编号（等宽 11px）、项目名（48px/500）、类别（等宽 11px）、年份（等宽 11px）。hover 时整行文字换国际橙、项目名不换字号不位移。",
        en: "Each row divides by a 1px ink border at 15% into four parts: index (11px monospace), project name (48px/500), category (11px monospace) and year (11px monospace). Hover turns the row orange without changing the name's size or position.",
      },
    },
  ],
  imagery: {
    zh: "图像退为点缀：小尺寸、单张、无边框。允许作品截图与肖像。不使用大图横幅与画廊网格，任何图像的视觉重量都必须低于字。",
    en: "Imagery recedes to accent: small, single, unbordered. Work screenshots and portraits are fine. No hero banners or gallery grids — every image must weigh less than the type.",
  },
  layout: {
    zh: "上限 1600px、容器内边距 32px，区块间距 160px。首屏只有一段巨大的名字或主张，占据视口 60% 以上。导航固定顶部、极薄、只有等宽小字。留白是主要构图手段。",
    en: "Capped at 1600px with 32px padding, sections 160px apart. The hero holds only a huge name or claim, occupying over sixty percent of the viewport. Navigation pins to the top, very thin, carrying only monospace small type. Whitespace does the composing.",
  },
  dos: [
    { zh: "标题用 clamp() 连续缩放", en: "Size headlines with clamp()" },
    { zh: "只用近黑、暖白与国际橙", en: "Only near-black, warm white and international orange" },
    { zh: "小字一律等宽全大写 0.2em", en: "Small type is monospace uppercase at 0.2em" },
    { zh: "区块用 hairline 加 160px 留白", en: "Sections divide with a hairline and 160px of space" },
    { zh: "零圆角、零投影", en: "Zero radius, zero shadow" },
    { zh: "允许描边字做第二行", en: "Outline type is allowed on a second line" },
  ],
  donts: [
    { zh: "不要用渐变背景或渐变文字", en: "No gradient backgrounds or gradient text" },
    { zh: "不要堆砌圆角卡片", en: "No stacks of rounded cards" },
    { zh: "不要用任何投影", en: "No shadows at all" },
    { zh: "不要引入第二种强调色", en: "No second accent" },
    { zh: "不要用装饰图标代替文字", en: "No decorative icons standing in for words" },
    { zh: "不要给标题设固定字级", en: "Never fix the headline size" },
  ],
  promptGuide: {
    quickColors: {
      text: "#0a0a0a",
      background: "#fafaf8",
      accent: "#ff4d00",
      muted: "#71717a",
      rule: "#e4e4e7",
      dark: "#18181b",
    },
    prompts: [
      {
        zh: "做一个超大字体排版首屏：暖白 #fafaf8 底、墨 #0a0a0a 字。标题 font-size: clamp(3rem, 12vw, 10rem)、900 字重、行高 0.85、字距 -0.05em、左对齐顶满宽度，其中一个词用国际橙 #ff4d00。上方导航用 11px 等宽全大写 0.2em 的 #71717a。区块之间用 1px rgba(10,10,10,0.15) 的 border-top 加 160px 留白。全站零圆角、零投影、无渐变，只用三档颜色加两档灰。",
        en: "Build an oversized typography hero: warm white #fafaf8 under ink #0a0a0a. The headline uses font-size clamp(3rem, 12vw, 10rem) at weight 900, 0.85 leading and -0.05em tracking, flush left and filling the width, with one word in international orange #ff4d00. Navigation above runs 11px monospace uppercase at 0.2em in #71717a. Sections divide with a 1px rgba(10,10,10,0.15) top border and 160px of emptiness. Zero radius, zero shadow, no gradients — three colors plus two greys and nothing else.",
      },
    ],
  },
  similar: [
    { name: "Swiss Poster", why: { zh: "同样字大到成为图形，但瑞士海报靠网格与色块，这里靠 fluid 缩放与留白", en: "Both at graphic scale, though Swiss poster uses grid and blocks while this uses fluid sizing and emptiness" } },
    { name: "Kinetic Typography", why: { zh: "同样以字为主体，但动力学排印让字动起来，这里让字长大", en: "Both make type the subject, though kinetic sets it in motion while this sets it growing" } },
  ],
  completeness: "full",
};
