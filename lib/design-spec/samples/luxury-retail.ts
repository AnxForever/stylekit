import type { DesignSpec } from "../types";

export const luxuryRetailSpec: DesignSpec = {
  slug: "luxury-retail",
  name: "奢品零售",
  nameEn: "Luxury Retail",
  cover: "/styles/luxury-retail.svg",
  theme: "light",
  northStar: {
    zh: "暖白、3:4 的产品大图、细边框按钮：价格不必喊出来。",
    en: "Warm white, a 3:4 product shot, hairline buttons — the price never has to shout.",
  },
  summary: {
    zh: "奢品零售是精品店的电商语言：暖白底（#faf9f6）而非纯白、衬线标题（#1a1a1a）、金色（#c9a96e）只出现在边框、分隔线与图标上、产品图必须大面积展示（至少 3:4）、按钮用细边框透明底、hover 时反色填充、正文加宽字距与松行高。分隔线一律 1px 暖灰（#e8e0d4）而非粗分割。它的克制来自「不解释」——没有促销标签、没有折扣角标、没有滚动横幅。",
    en: "Luxury Retail is the language of a boutique: warm white (#faf9f6) rather than pure, serif headings (#1a1a1a), gold (#c9a96e) confined to borders, dividers and icons, product photography shown large at 3:4 minimum, buttons as a hairline outline on transparency that inverts to a filled ground on hover, and body copy on open tracking and loose leading. Dividers are always 1px warm grey (#e8e0d4), never a heavy rule. The restraint comes from not explaining — no promo tags, no discount corners, no scrolling banner.",
  },
  colors: [
    {
      name: "暖白",
      nameEn: "Warm White",
      value: "#faf9f6",
      group: "surface",
      role: {
        zh: "页面底。带一丝暖的白，比纯白贵。",
        en: "The page ground — a faintly warm white that reads richer than pure.",
      },
      token: "--color-warm-white",
    },
    {
      name: "黑",
      nameEn: "Black",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "标题、正文与按钮描边。",
        en: "Headings, body and button borders.",
      },
      token: "--color-black",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#c9a96e",
      group: "accent",
      role: {
        zh: "唯一强调：边框、分隔线与图标。绝不作底色。",
        en: "The only accent on borders, dividers and icons — never a ground.",
      },
      token: "--color-gold",
    },
    {
      name: "古棕",
      nameEn: "Antique Brown",
      value: "#8b7355",
      group: "accent",
      role: {
        zh: "次级文字与材质的暗示。",
        en: "Secondary text and a hint of material.",
      },
      token: "--color-antique-brown",
    },
    {
      name: "浅砂",
      nameEn: "Pale Sand",
      value: "#e8e0d4",
      group: "surface",
      role: {
        zh: "所有 1px 分隔线与次级区块。",
        en: "Every 1px divider and secondary block.",
      },
      token: "--color-pale-sand",
    },
    {
      name: "石墨",
      nameEn: "Graphite",
      value: "#2c2c2c",
      group: "neutral",
      role: {
        zh: "hover 反色后的填充与深色区块。",
        en: "The inverted hover fill and dark blocks.",
      },
      token: "--color-graphite",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [300, 400],
      sizes: [13, 16, 19, 26, 34, 46],
      lineHeight: { display: 1.25, heading: 1.35, body: 1.85 },
      tracking: { display: "0.02em", label: "0.2em" },
      role: {
        zh: "细衬线，标题 300 字重、字距 0.02em；正文加宽字距并按 1.85 行高排。",
        en: "A light serif: headings at 300 on 0.02em, body on open tracking at 1.85 leading.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 300, size: 46, lineHeight: 1.25, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 300, size: 34, lineHeight: 1.3, tracking: "0.02em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 26, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 19, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.85, token: "--text-body" },
    { role: "label", weight: 400, size: 13, lineHeight: 1.6, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160, 240],
    maxWidth: 1280,
    sectionGap: 160,
    cardPadding: 32,
    elementGap: 32,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "media", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Warm White", value: "#faf9f6", purpose: "页面底" },
    { level: 1, name: "Pale Sand", value: "#e8e0d4", purpose: "次级区块" },
    { level: 2, name: "Graphite", value: "#2c2c2c", purpose: "反色区块" },
  ],
  elevation: [{ name: "None", value: "none — a shadow would suggest a discount" }],
  components: [
    {
      name: "Product Frame",
      role: { zh: "产品展示（核心组件）", en: "The product frame — the core component" },
      construction: {
        zh: "产品图固定 3:4 最小比例（可为 3:4 或更高），铺满容器宽、零圆角零边框零阴影。图片下方 24px 处放产品名（19px 衬线）与价格（16px，不加粗不标红）。图片必须是唯一的主角，周围留白至少是其宽度的 10%。",
        en: "A product image at 3:4 minimum (or taller), full width, zero radius, zero border, zero shadow. Twenty-four pixels below sit the name in 19px serif and the price at 16px — never bolded, never red. The image is the only subject, with at least ten percent of its width left empty around it.",
      },
      sizes: "aspect 3:4 or taller",
    },
    {
      name: "Outline Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 黑 60% 描边、零圆角、13px/400、字距 0.2em、padding 16px 40px，无阴影。hover 时填充转黑、文字转暖白（反色）；按下时保持反色但描边不加粗。过渡 300ms ease-out。",
        en: "Transparent fill, a 1px black border at 60%, zero radius, 13px/400 at 0.2em, 16px 40px padding, no shadow. Hover fills black and flips the text to warm white; press holds the inversion without thickening the border. 300ms ease-out.",
      },
      sizes: "padding 16px 40px; label 13px",
      states: "hover: inverted; active: inverted, border unchanged",
    },
    {
      name: "Gold Hairline",
      role: { zh: "金线与暖灰分隔", en: "Gold and warm-grey hairlines" },
      construction: {
        zh: "两种 1px 线：语义分隔用暖灰 #e8e0d4（横跨内容宽），强调分隔用金 #c9a96e（两端各收进 15%）。绝不用 2px 以上，也不用虚线。",
        en: "Two kinds of 1px rule: a warm grey #e8e0d4 spanning the content for structural division, and a gold #c9a96e inset 15% at each end for emphasis. Nothing at 2px or above, and nothing dashed.",
      },
    },
    {
      name: "Quiet Field",
      role: { zh: "表单输入", en: "Input field" },
      construction: {
        zh: "透明底、仅底部 1px 暖灰描边（无包围边框）、padding 12px 0、16px 衬线。聚焦时底线转金并保持 1px。",
        en: "Transparent fill with a 1px warm grey rule along the bottom only, no surrounding border, 12px 0 padding at 16px serif. Focus turns the rule gold while keeping it at 1px.",
      },
    },
    {
      name: "Range Label",
      role: { zh: "系列与分类标签", en: "Collection and category labels" },
      construction: {
        zh: "13px/400、字距 0.2em、全大写、金或古棕、无底无边框。它是页面上唯一的装饰性小字，用于系列名与季别（如「SPRING · 2026」）。",
        en: "13px/400 at 0.2em in gold or antique brown, uppercase, no ground and no border. It is the only decorative small type, naming collections and seasons such as SPRING · 2026.",
      },
    },
  ],
  imagery: {
    zh: "产品摄影：白或浅砂底、单光源、精确构图，必须 3:4 以上并大面积展示。允许材质特写。不使用模特生活照、促销图与多色背景。",
    en: "Product photography on white or pale sand, a single light source, precise framing, 3:4 or taller and shown large. Material close-ups work. No lifestyle model shots, promotional imagery or multi-color backgrounds.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 32px，区块间距 160px。产品网格 2 列（移动）到 3 列（桌面）、间距 32px。留白占页面六成以上。零圆角零阴影贯穿全站。",
    en: "Capped at 1280px with 32px padding, sections 160px apart. The product grid runs two columns on mobile and three on desktop at 32px gaps. Over sixty percent of the page stays empty, with zero radius and zero shadow throughout.",
  },
  dos: [
    { zh: "暖白底，不用纯白", en: "Warm white ground, never pure" },
    { zh: "金只出现在线与图标上", en: "Gold appears only on rules and icons" },
    { zh: "产品图至少 3:4 并大面积展示", en: "Products at 3:4 minimum, shown large" },
    { zh: "按钮细边框，hover 反色", en: "Buttons are hairlines that invert on hover" },
    { zh: "分隔线 1px 暖灰", en: "Dividers are 1px warm grey" },
    { zh: "价格不加粗不标红", en: "Prices are never bolded or reddened" },
  ],
  donts: [
    { zh: "不要用促销标签与折扣角标", en: "No promo tags or discount corners" },
    { zh: "不要用滚动横幅", en: "No scrolling banner" },
    { zh: "不要用 2px 以上分隔线", en: "No divider at 2px or above" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要用阴影", en: "No shadows" },
    { zh: "不要把金铺成底色", en: "Never flood the gold as a ground" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#faf9f6",
      gold: "#c9a96e",
      brown: "#8b7355",
      sand: "#e8e0d4",
      graphite: "#2c2c2c",
    },
    prompts: [
      {
        zh: "做一个奢品零售产品卡：暖白 #faf9f6 底、零圆角零边框零阴影，产品图 3:4 铺满卡宽、四周留白为宽度的 10%。图片下方 24px 放 19px 衬线产品名与 16px 价格（不加粗）。按钮透明底、1px rgba(26,26,26,0.6) 描边、零圆角、13px 字距 0.2em、padding 16px 40px，hover 时填充转 #1a1a1a、文字转 #faf9f6。分隔线用 1px #e8e0d4，强调分隔用 1px #c9a96e 且两端各收进 15%。系列标签 13px 全大写 0.2em 金色。页面底色 #faf9f6。",
        en: "Build a luxury retail product card: warm white #faf9f6 ground with zero radius, border and shadow; the product image at 3:4 fills the card width with ten percent of that width left empty around it. Twenty-four pixels below sit a 19px serif product name and a 16px price, unbolded. The button is transparent with a 1px rgba(26,26,26,0.6) border, zero radius, 13px text at 0.2em and 16px 40px padding, filling #1a1a1a with #faf9f6 text on hover. Dividers use 1px #e8e0d4, with emphasis rules of 1px #c9a96e inset 15% at each end. Collection labels run 13px uppercase at 0.2em in gold. The page ground is #faf9f6.",
      },
    ],
  },
  similar: [
    { name: "Marble Luxury", why: { zh: "同属奢侈，但大理石讲材质与空间，奢品零售讲产品陈列", en: "Both luxury, though marble is about material and space while this is product display" } },
    { name: "Shopify Clean", why: { zh: "同为电商，但奢品零售禁促销元素且留白更多", en: "Both ecommerce, though luxury bans promotional elements and carries far more emptiness" } },
  ],
  completeness: "full",
};
