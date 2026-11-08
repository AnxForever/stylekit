import type { DesignSpec } from "../types";

export const victorianBotanicalSpec: DesignSpec = {
  slug: "victorian-botanical",
  name: "维多利亚植物",
  nameEn: "Victorian Botanical",
  cover: "/styles/victorian-botanical.svg",
  theme: "light",
  northStar: {
    zh: "钢笔线描的枝叶、旧纸、暗绿与金：一页自然史图鉴。",
    en: "Pen-drawn foliage on aged paper in dark green and gold — a page from a natural history folio.",
  },
  summary: {
    zh: "维多利亚植物模仿 19 世纪的自然史图鉴与植物学插图：仿旧纸底（#faf5ef）、暗绿主色（#2d4a2d）、金（#8b6914）作强调、绛红（#6b3a3a）作花的点缀。核心图形是钢笔线描的植物——1px 的细线与不规则的自然曲线，绝不填充成色块。边框是 30% 暗绿的细线呼应线描，圆角克制在 8px，阴影是极淡的暖绿。交互状态把描边换成金色。",
    en: "Victorian Botanical imitates nineteenth-century natural history plates and botanical illustration: aged paper (#faf5ef), dark green (#2d4a2d) leading, gold (#8b6914) for emphasis and a muted crimson (#6b3a3a) for blossoms. The core graphic is pen-drawn botany — 1px hairlines in natural irregular curves, never filled into blocks. Borders are 30% dark green hairlines echoing the drawing, radii stay restrained at 8px, and shadow is the faintest warm green. Interactive states turn the border gold.",
  },
  colors: [
    {
      name: "暗绿",
      nameEn: "Dark Green",
      value: "#2d4a2d",
      group: "brand",
      role: {
        zh: "主色：文字、线描与主按钮。植物标本的墨绿。",
        en: "The primary on type, line work and buttons — the green of a pressed specimen.",
      },
      token: "--color-dark-green",
    },
    {
      name: "旧纸",
      nameEn: "Aged Paper",
      value: "#faf5ef",
      group: "surface",
      role: {
        zh: "页面底。带暖调的仿旧纸，像图鉴的页面。",
        en: "The page ground — a warm aged paper, like a folio leaf.",
      },
      token: "--color-aged-paper",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#8b6914",
      group: "accent",
      role: {
        zh: "强调与 hover 态：描边、小标记与标题细节。",
        en: "Emphasis and hover on borders, small marks and heading detail.",
      },
      token: "--color-gold",
    },
    {
      name: "绛红",
      nameEn: "Crimson",
      value: "#6b3a3a",
      group: "accent",
      role: {
        zh: "花与果实，出现频率低但很醒目。",
        en: "Blossoms and fruit — infrequent but unmistakable.",
      },
      token: "--color-crimson",
    },
    {
      name: "中绿",
      nameEn: "Mid Green",
      value: "#3d5c3d",
      group: "accent",
      role: {
        zh: "线描的次级线条与叶脉。",
        en: "Secondary line work and leaf veins.",
      },
      token: "--color-mid-green",
    },
    {
      name: "嫩绿",
      nameEn: "Sprout",
      value: "#308323",
      group: "accent",
      role: {
        zh: "新叶与「新增」标记，最亮的一支。",
        en: "New growth and new marks — the brightest tone.",
      },
      token: "--color-sprout",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [13, 16, 20, 26, 34, 46],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.8 },
      tracking: { display: "0.04em", label: "0.18em" },
      role: {
        zh: "衬线体，标题加 0.04em 字距、标签 0.18em。行高 1.8 让长文像图鉴的说明栏。",
        en: "Serif type: headings at 0.04em, labels at 0.18em, body at 1.8 leading so long copy reads like a plate description.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 46, lineHeight: 1.2, tracking: "0.04em", token: "--text-display" },
    { role: "heading", weight: 600, size: 34, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 26, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 20, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.8, token: "--text-body" },
    { role: "label", weight: 600, size: 13, lineHeight: 1.6, tracking: "0.18em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1040,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "6px" },
    { element: "inputs", value: "6px" },
  ],
  surfaces: [
    { level: 0, name: "Aged Paper", value: "#faf5ef", purpose: "页面底" },
    { level: 1, name: "Green Wash", value: "rgba(45,74,45,0.06)", purpose: "次级区块" },
  ],
  elevation: [
    { name: "Warm green", value: "0 2px 8px rgba(45,74,45,0.10)" },
    { name: "Warm green hover", value: "0 6px 18px rgba(45,74,45,0.14)" },
  ],
  components: [
    {
      name: "Plant Plate",
      role: { zh: "植物线描图版（核心组件）", en: "The botanical plate — the core component" },
      construction: {
        zh: "一个 1:1 或 3:4 的区域，内部用 1px 的暗绿线描出植物（茎、叶、花），线条必须自然弯曲、粗细一致、绝不填充。叶脉用中绿 1px。下方放 13px 等宽的学名（斜体衬线）与编号（如「图版 XII」）。整块零背景、零边框。",
        en: "A 1:1 or 3:4 area holding a plant drawn in 1px dark green — stem, leaves, blossoms — with naturally curving, even-weight lines and no fill. Veins run 1px in mid green. Below sits the Latin name in 13px italic serif with a plate number such as Plate XII. No ground, no border.",
      },
    },
    {
      name: "Fine Card",
      role: { zh: "细线卡片", en: "The fine-line card" },
      construction: {
        zh: "旧纸填充、8px 圆角、1px 暗绿 30% 描边、内边距 32px，阴影 0 2px 8px 暗绿 10%。标题 34px/600 暗绿，正文 16px 行高 1.8。hover 时描边转金 60%、阴影扩到 18px——交互状态的主要变化是那根线换色。",
        en: "Aged paper fill, 8px radius, a 1px dark green border at 30%, 32px padding, shadow 0 2px 8px at 10% green. The title runs 34px/600 in dark green with body at 16px on 1.8 leading. Hover turns the border gold at 60% and widens the shadow to 18px — the line changing color is the interaction.",
      },
      states: "hover: gold border, wider shadow",
    },
    {
      name: "Gold Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "暗绿填充、旧纸文字、6px 圆角、1px 金 40% 描边、13px/600、字距 0.18em、padding 12px 28px，阴影 0 2px 8px 暗绿 10%。hover 时描边升到 100%、文字转金；按下时位移 1px 2px。过渡 250ms ease-out。",
        en: "Dark green fill, aged paper text, 6px radius, a 1px gold border at 40%, 13px/600 at 0.18em, 12px 28px padding, shadow 0 2px 8px at 10% green. Hover takes the border to full and the text to gold; press offsets 1px 2px. 250ms ease-out.",
      },
      sizes: "padding 12px 28px; label 13px",
      states: "hover: gold border and text; active: offset 1px 2px",
    },
    {
      name: "Sprig Rule",
      role: { zh: "枝叶分隔线", en: "The sprig divider" },
      construction: {
        zh: "一条 1px 暗绿 30% 的横线，中央嵌入一段 32px 的枝叶线描（两片叶加一截茎），两端延伸出细的卷须。它替代普通分隔线，也是版面上最典型的装饰。",
        en: "A 1px dark green rule at 30% with a 32px sprig drawn at its centre — two leaves on a stem — trailing fine tendrils to either side. It replaces the ordinary divider and is the page's most characteristic ornament.",
      },
    },
    {
      name: "Index Label",
      role: { zh: "图鉴编号", en: "The plate index" },
      construction: {
        zh: "13px/600、字距 0.18em、暗绿或金。格式固定为「图版 XII · 1836」或「PL. XII」。它是页面上唯一的装饰性文字，模仿图鉴的标注。",
        en: "13px/600 at 0.18em in dark green or gold, in a fixed form like Plate XII · 1836 or PL. XII. It is the only decorative text the style permits, imitating a folio's annotation.",
      },
    },
  ],
  imagery: {
    zh: "植物学线描、标本摄影、图鉴页面扫描。线描必须 1px 且不填充；照片必须柔和、暖调、去饱和。不使用彩色插画、现代排版与高饱和图像。",
    en: "Botanical line drawing, specimen photography, scanned folio pages. Line work stays at 1px and unfilled; photographs stay soft, warm and desaturated. No color illustration, modern typesetting or saturated imagery.",
  },
  layout: {
    zh: "上限 1040px、容器内边距 32px，区块间距 112px。允许不对称双栏（图版在左、说明在右）。留白宽松，线描与文字之间至少 32px，让图版能独立呼吸。",
    en: "Capped at 1040px with 32px padding, sections 112px apart. An asymmetric pair works well — plate left, description right. Whitespace runs generous with at least 32px between drawing and text, letting each plate breathe.",
  },
  dos: [
    { zh: "旧纸底配暗绿与金", en: "Aged paper with dark green and gold" },
    { zh: "线描必须 1px 且不填充", en: "Line work is 1px and never filled" },
    { zh: "边框 1px 的 30% 暗绿", en: "Borders are 1px dark green at 30%" },
    { zh: "hover 把描边换成金", en: "Hover turns the border gold" },
    { zh: "圆角克制在 8px", en: "Radii stay restrained at 8px" },
    { zh: "标注用图版编号", en: "Annotations use plate numbers" },
  ],
  donts: [
    { zh: "不要给线描填色", en: "Never fill the line drawing" },
    { zh: "不要用粗边框", en: "No thick borders" },
    { zh: "不要用高饱和图像", en: "No saturated imagery" },
    { zh: "不要用全圆角", en: "No fully rounded corners" },
    { zh: "不要用现代无衬线", en: "No modern sans" },
    { zh: "不要用冷灰阴影", en: "No cool grey shadow" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2d4a2d",
      background: "#faf5ef",
      gold: "#8b6914",
      crimson: "#6b3a3a",
      mid: "#3d5c3d",
      sprout: "#308323",
    },
    prompts: [
      {
        zh: "做一个维多利亚植物卡片：旧纸 #faf5ef 填充、8px 圆角、1px rgba(45,74,45,0.3) 描边、内边距 32px、box-shadow 0 2px 8px rgba(45,74,45,0.1)。左侧放一个 3:4 的植物线描图版：1px 暗绿线条画出茎与两片叶，叶脉用 #3d5c3d，绝不填充。下方 13px 斜体学名与「图版 XII」标注。标题 34px/600 Cormorant Garamond、字距 0.04em、色 #2d4a2d；正文 16px、行高 1.8。hover 时描边转 #8b6914、阴影扩到 18px。页面底色 #faf5ef。",
        en: "Build a Victorian botanical card: aged paper #faf5ef fill, 8px radius, a 1px rgba(45,74,45,0.3) border, 32px padding, box-shadow 0 2px 8px rgba(45,74,45,0.1). A 3:4 botanical plate sits on the left: 1px dark green lines drawing a stem and two leaves with #3d5c3d veins and no fill. Below it, a 13px italic Latin name with a Plate XII annotation. The title runs 34px/600 Cormorant Garamond at 0.04em in #2d4a2d with body at 16px on 1.8 leading. Hover turns the border #8b6914 and widens the shadow to 18px. The page ground is #faf5ef.",
      },
    ],
  },
  similar: [
    { name: "Dark Academia", why: { zh: "同为旧书气质，但暗黑学院是暗底皮革，植物图鉴是亮纸线描", en: "Both old-book, though dark academia is dark leather while this is bright paper and line art" } },
    { name: "Natural Organic", why: { zh: "同为自然，但自然有机偏现代极简，植物图鉴偏历史图录", en: "Both natural, though natural organic is modern minimal while this is historical catalogue" } },
  ],
  completeness: "full",
};
