import type { DesignSpec } from "../types";

export const midCenturyModernSpec: DesignSpec = {
  slug: "mid-century-modern",
  name: "中世纪现代",
  nameEn: "Mid-Century Modern",
  cover: "/styles/mid-century-modern.svg",
  theme: "light",
  northStar: {
    zh: "1950 年代的原子时代：星芒、有机曲线、饱和暖色平涂。",
    en: "The atomic age of the 1950s: starbursts, organic curves, flat saturated warmth.",
  },
  summary: {
    zh: "中世纪现代来自 1950 年代的原子时代设计：伊姆斯椅子、原子钟与星芒图案。它用饱和但偏暖的颜色（橙 #e8572a、青绿 #2a6e5e、芥黄 #c4a35a、灰蓝 #44628c）压在奶油底（#f5f0e1）上，形状是几何平涂加有机曲线（中等圆角 8 到 12px），排版靠宽字距（tracking-wide 到 wider）营造复古感，边框用 2px 风格色强调结构。禁令是：不许荧光与霓虹、不许衬线或手写字体、不许渐变背景——平面色块是它的地基。",
    en: "Mid-Century Modern comes from 1950s atomic-age design: Eames chairs, atomic clocks, starburst motifs. It sets saturated but warm tones (orange #e8572a, teal #2a6e5e, mustard #c4a35a, slate blue #44628c) on cream (#f5f0e1), builds forms from flat geometry plus organic curves at 8 to 12px radii, uses wide tracking for the period feel, and outlines structure with a 2px border in a style color. Fluorescent and neon color, serif or script faces, and gradient backgrounds are all refused — flat blocking is the foundation.",
  },
  colors: [
    {
      name: "原子橙",
      nameEn: "Atomic Orange",
      value: "#e8572a",
      group: "brand",
      role: {
        zh: "第一主色：主按钮、星芒与最抢眼的色块。",
        en: "The first primary on buttons, starbursts and the loudest blocks.",
      },
      token: "--color-atomic-orange",
    },
    {
      name: "奶油",
      nameEn: "Cream",
      value: "#f5f0e1",
      group: "surface",
      role: {
        zh: "页面底。略黄的奶油色，是那个年代的家居色。",
        en: "The page ground — a yellow-leaning cream straight out of period interiors.",
      },
      token: "--color-cream",
    },
    {
      name: "青绿",
      nameEn: "Teal",
      value: "#2a6e5e",
      group: "brand",
      role: {
        zh: "第二主色：文字、次级按钮与对位色块。",
        en: "The second primary on text, secondary buttons and opposing blocks.",
      },
      token: "--color-teal",
    },
    {
      name: "芥黄",
      nameEn: "Mustard",
      value: "#c4a35a",
      group: "accent",
      role: {
        zh: "暖色点缀与高亮底，常与橙相邻。",
        en: "Warm accent and highlight grounds, often set beside the orange.",
      },
      token: "--color-mustard",
    },
    {
      name: "灰蓝",
      nameEn: "Slate Blue",
      value: "#44628c",
      group: "accent",
      role: {
        zh: "冷侧平衡色，用于信息与第三区块。",
        en: "The cool balancing tone, on information and third blocks.",
      },
      token: "--color-slate-blue",
    },
    {
      name: "炭灰",
      nameEn: "Charcoal",
      value: "#3d3d3d",
      group: "neutral",
      role: {
        zh: "正文与描边。比纯黑柔，适合 50 年代的印刷。",
        en: "Body and strokes — softer than black, suited to 1950s print.",
      },
      token: "--color-charcoal",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Futura', 'Century Gothic', sans-serif",
      weights: [400, 600, 700],
      sizes: [14, 16, 20, 28, 38, 52],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.65 },
      tracking: { display: "0.02em", label: "0.14em" },
      role: {
        zh: "几何无衬线，字距放宽（正文 0.02em、标签 0.14em）。宽字距是它最直接的年代信号。",
        en: "A geometric sans with open tracking — 0.02em in body, 0.14em in labels. That tracking is the most direct period signal it has.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 52, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 38, lineHeight: 1.2, tracking: "0.02em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 28, lineHeight: 1.3, tracking: "0.02em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 20, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.65, token: "--text-body" },
    { role: "label", weight: 600, size: 14, lineHeight: 1.5, tracking: "0.14em", token: "--text-label" },
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
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "motifs", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Cream", value: "#f5f0e1", purpose: "页面底" },
    { level: 1, name: "Orange Block", value: "#e8572a", purpose: "强调块" },
    { level: 2, name: "Teal Block", value: "#2a6e5e", purpose: "对位块" },
  ],
  elevation: [
    { name: "None", value: "none — flat blocking carries everything" },
    { name: "Max allowed", value: "0 2px 6px rgba(61,61,61,0.08)" },
  ],
  components: [
    {
      name: "Block Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "原子橙填充、奶油文字、8px 圆角、无描边、16px/600、字距 0.02em、padding 12px 28px。hover 时填充加深到 #cf4a20；按下缩放 0.98。过渡 200ms ease-out。允许在文字前放一个 12px 的星芒图形。",
        en: "Atomic orange fill, cream text, 8px radius, no border, 16px/600 at 0.02em, 12px 28px padding. Hover deepens the fill to #cf4a20; press scales 0.98. 200ms ease-out. A 12px starburst may lead the label.",
      },
      sizes: "padding 12px 28px; label 16px",
      states: "hover: #cf4a20; active: scale 0.98",
    },
    {
      name: "Blocks Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "奶油或一支纯色填充、12px 圆角、2px 风格色描边（橙、青绿或芥黄之一）、内边距 28px，无阴影。标题 28px/600，正文 16px/400 行高 1.65。卡内右上角可放一个 48px 的星芒或椭圆装饰。",
        en: "Cream or a flat style color, 12px radius, a 2px border in orange, teal or mustard, 28px padding, no shadow. Title at 28px/600 with body at 16px/400 on 1.65 leading. A 48px starburst or oval ornament may sit top-right inside.",
      },
    },
    {
      name: "Starburst",
      role: { zh: "星芒装饰（签名）", en: "The starburst — the signature" },
      construction: {
        zh: "从中心放射的 8 到 16 条等长尖角线（用 clip-path polygon 或 SVG），尺寸 48 到 120px，填原子橙或芥黄。它是最能标识这个年代的图形，放在卡片角落或标题旁，单屏 2 到 4 处。",
        en: "Eight to sixteen equal tapered rays radiating from a centre (a clip-path polygon or SVG), 48 to 120px across, in atomic orange or mustard. It identifies the era more than anything else, sitting at card corners or beside headings, two to four per screen.",
      },
    },
    {
      name: "Organic Oval",
      role: { zh: "有机椭圆", en: "The organic oval" },
      construction: {
        zh: "160 到 320px 的椭圆（border-radius 取 50% / 60% 40%），填一支纯色并降到 25% 或全不透明，绝对定位在区块角落，允许溢出容器。它模拟伊姆斯时代的有机线条。",
        en: "An ellipse 160 to 320px across (border-radius 50% / 60% 40%) filled with one flat color at 25% or full opacity, absolutely positioned at a section corner and free to bleed. It echoes the organic line of the Eames era.",
      },
    },
    {
      name: "Wide Label",
      role: { zh: "宽字距标签", en: "The wide-tracked label" },
      construction: {
        zh: "14px/600、字距 0.14em、全大写、炭灰或青绿。它是复古感的来源之一，用在区块编号、年份与分类上。绝不低于 12px，否则宽字距会让字挤在一起。",
        en: "14px/600 at 0.14em tracking, uppercase, in charcoal or teal. It carries section numbers, years and categories, and is one of the period cues. It never drops below 12px, where wide tracking would crush the letters together.",
      },
    },
  ],
  imagery: {
    zh: "1950 年代风格插画与摄影：家具、原子图案、星芒、抽象椭圆、家居内景。图像必须平涂或高对比，配饱和暖色。不使用渐变图像、霓虹色与当代写实摄影。",
    en: "1950s-style illustration and photography: furniture, atomic motifs, starbursts, abstract ovals, interior scenes. Imagery is flat or high-contrast with saturated warmth. No gradient imagery, neon color or contemporary realistic photography.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 96px。允许元素重叠与错位。整页由大平涂色块分区，色块形状可以是矩形带圆角或有机曲线。",
    en: "Capped at 1120px with 24px padding, sections 96px apart. Elements may overlap and offset. The page divides into large flat color fields, their shapes either rounded rectangles or organic curves.",
  },
  dos: [
    { zh: "饱和暖色平涂，绝不用渐变", en: "Flat saturated warmth, never a gradient" },
    { zh: "几何无衬线加宽字距", en: "Geometric sans on wide tracking" },
    { zh: "圆角 8 到 12px 模拟有机曲线", en: "Radius 8 to 12px for organic curves" },
    { zh: "2px 风格色描边强调结构", en: "2px borders in a style color for structure" },
    { zh: "星芒与椭圆作装饰", en: "Starbursts and ovals carry the ornament" },
    { zh: "奶油底压暖色", en: "Cream ground under warm color" },
  ],
  donts: [
    { zh: "不要用荧光或霓虹色", en: "No fluorescent or neon color" },
    { zh: "不要用衬线或手写字体", en: "No serif or script faces" },
    { zh: "不要用渐变背景", en: "No gradient backgrounds" },
    { zh: "不要用全圆角按钮", en: "No fully rounded buttons" },
    { zh: "不要用冷灰作中性色", en: "No cool grey neutrals" },
    { zh: "不要省略星芒装饰", en: "Never omit the starburst" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3d3d3d",
      background: "#f5f0e1",
      orange: "#e8572a",
      teal: "#2a6e5e",
      mustard: "#c4a35a",
      slate: "#44628c",
    },
    prompts: [
      {
        zh: "做一个中世纪现代风格卡片：奶油 #f5f0e1 填充、12px 圆角、2px solid #e8572a 描边、内边距 28px、无阴影。标题 28px/600、字距 0.02em、色 #2a6e5e；正文 16px/400、行高 1.65、色 #3d3d3d。右上角放一个 48px 的原子橙星芒（8 条放射尖角，clip-path）。标签 14px/600 全大写、字距 0.14em。主按钮 #e8572a 填充、奶油文字、8px 圆角。页面底色 #f5f0e1，区块之间用大平涂色块分区，全站不用渐变。",
        en: "Build a mid-century modern card: cream #f5f0e1 fill, 12px radius, a 2px solid #e8572a border, 28px padding, no shadow. The title runs 28px/600 at 0.02em in #2a6e5e with body at 16px/400 on 1.65 leading in #3d3d3d. A 48px atomic orange starburst with eight tapered rays (a clip-path) sits top-right. Labels are 14px/600 uppercase at 0.14em. The primary button fills #e8572a with cream text on an 8px radius. The page ground is #f5f0e1, with large flat color fields dividing sections and no gradients anywhere.",
      },
    ],
  },
  similar: [
    { name: "Bauhaus", why: { zh: "同样几何与纯色，但包豪斯更理性，中世纪现代更暖更俏皮", en: "Both geometry and flat color, though Bauhaus is rational while mid-century is warm and playful" } },
    { name: "Retro Vintage", why: { zh: "同为年代感，但复古怀旧是 70 年代印刷，中世纪现代是 50 年代原子时代", en: "Both period pieces, though retro vintage is 1970s print while this is 1950s atomic" } },
  ],
  completeness: "full",
};
