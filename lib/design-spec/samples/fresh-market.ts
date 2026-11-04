import type { DesignSpec } from "../types";

export const freshMarketSpec: DesignSpec = {
  slug: "fresh-market",
  name: "鲜活市集",
  nameEn: "Fresh Market",
  cover: "/styles/fresh-market.svg",
  theme: "light",
  northStar: {
    zh: "暖奶油、南瓜橙、菜叶绿：一个让人想买菜的界面。",
    en: "Warm cream, pumpkin orange and leaf green — an interface that makes you want to shop.",
  },
  summary: {
    zh: "鲜活市集是食品、生鲜与有机品牌的电商语言：暖奶油底（#fef9f0）、南瓜橙主按钮（#e8722a 全圆角）、深绿（#2d5016）承担标题与「有机」语义、类目标签用淡绿（#d4e4bc）的圆药丸、价格用金黄色块（#f5c542）配棕字（#8b4513）、产品卡大圆角（16px）配柔和阴影、图片 12px 圆角柔化边缘。它的信任感来自温度而不是装饰——颜色都偏暖、圆角都偏大、阴影都极轻。",
    en: "Fresh Market is the ecommerce language of food, grocery and organic brands: warm cream (#fef9f0), a pumpkin orange primary button (#e8722a, fully rounded), deep green (#2d5016) carrying headings and the organic claim, category tags as pale green pills (#d4e4bc), prices in a marigold block (#f5c542) with brown text (#8b4513), product cards at 16px radius with a soft shadow, and images softened by a 12px radius. Its trust comes from temperature rather than ornament — warm color, generous radii, extremely light shadow.",
  },
  colors: [
    {
      name: "暖奶油",
      nameEn: "Warm Cream",
      value: "#fef9f0",
      group: "surface",
      role: {
        zh: "页面底。偏黄的奶油白，让食材照片显得新鲜。",
        en: "The page ground — a yellow-leaning cream that makes food photography look fresh.",
      },
      token: "--color-warm-cream",
    },
    {
      name: "深绿",
      nameEn: "Leaf Green",
      value: "#2d5016",
      group: "brand",
      role: {
        zh: "标题与「有机」语义。整套风格的信任来源。",
        en: "Headings and the organic claim — where the style's trust comes from.",
      },
      token: "--color-leaf-green",
    },
    {
      name: "南瓜橙",
      nameEn: "Pumpkin",
      value: "#e8722a",
      group: "accent",
      role: {
        zh: "主按钮与关键强调，是唯一的行动色。",
        en: "The primary button and key emphasis — the only action color.",
      },
      token: "--color-pumpkin",
    },
    {
      name: "金黄",
      nameEn: "Marigold",
      value: "#f5c542",
      group: "accent",
      role: {
        zh: "价格标签底与促销徽标。",
        en: "Price tag grounds and promotion badges.",
      },
      token: "--color-marigold",
    },
    {
      name: "棕",
      nameEn: "Brown",
      value: "#8b4513",
      group: "accent",
      role: {
        zh: "压在金黄上的文字，以及木箱与包装语义。",
        en: "Text on marigold, and the semantics of crates and packaging.",
      },
      token: "--color-brown",
    },
    {
      name: "淡绿",
      nameEn: "Pale Green",
      value: "#d4e4bc",
      group: "surface",
      role: {
        zh: "分类药丸与轻量区块底。",
        en: "Category pills and light block grounds.",
      },
      token: "--color-pale-green",
    },
  ],
  fonts: [
    {
      family: "Nunito",
      substitute: "system-ui, -apple-system, 'PingFang SC', sans-serif",
      weights: [400, 600, 700],
      sizes: [12, 14, 16, 20, 26, 34],
      lineHeight: { display: 1.25, heading: 1.35, body: 1.65 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "圆润无衬线，字重 600 与 700 用在标题，正文 400。字形不能太尖——食物不该有棱角。",
        en: "A rounded sans with 600 and 700 for headings and 400 for body. Nothing too pointed — food should not have edges.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 34, lineHeight: 1.25, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 700, size: 26, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.65, token: "--text-body" },
    { role: "label", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1200,
    sectionGap: 64,
    cardPadding: 16,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
    { element: "images", value: "12px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Warm Cream", value: "#fef9f0", purpose: "页面底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "产品卡" },
    { level: 2, name: "Pale Green", value: "#d4e4bc", purpose: "分类区块" },
  ],
  elevation: [
    { name: "Soft", value: "0 2px 8px rgba(45,80,22,0.06)" },
    { name: "Soft hover", value: "0 6px 20px rgba(45,80,22,0.10)" },
  ],
  components: [
    {
      name: "Pumpkin Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "南瓜橙填充、白字、999px 全圆角、无描边、16px/700、padding 12px 24px，阴影 0 2px 8px 绿 6%。hover 时填充加深到 #d0621f、阴影扩到 20px；按下缩放 0.98。触控高度不小于 48px。",
        en: "Pumpkin fill, white text, fully rounded, no border, 16px/700, 12px 24px padding, shadow 0 2px 8px at 6% green. Hover deepens the fill to #d0621f and widens the shadow to 20px; press scales 0.98. Touch height never drops below 48px.",
      },
      sizes: "min-height 48px; padding 12px 24px",
      states: "hover: #d0621f; active: scale 0.98",
    },
    {
      name: "Produce Card",
      role: { zh: "产品卡", en: "The product card" },
      construction: {
        zh: "白底、16px 圆角、1px 淡绿 60% 描边、内边距 16px，阴影 0 2px 8px 绿 6%。图片 12px 圆角铺满卡宽、固定 1:1。图片下方 14px 商品名（最多两行）、16px/700 深绿价格配 999px 的金黄 20% 底标签。hover 时阴影扩到 20px、上浮 2px。",
        en: "White fill, 16px radius, a 1px pale green border at 60%, 16px padding, shadow 0 2px 8px at 6% green. The image takes a 12px radius at full card width and a fixed 1:1 ratio. Below sit a 14px product name of two lines and a 16px/700 deep green price on a fully rounded 20% marigold tag. Hover widens the shadow to 20px and lifts 2px.",
      },
    },
    {
      name: "Category Pill",
      role: { zh: "分类药丸标签", en: "The category pill" },
      construction: {
        zh: "淡绿填充、深绿文字、999px 全圆角、无描边、12px/700、字距 0.04em、padding 6px 14px。选中态底升到深绿并把文字转奶油。用于分类筛选与商品属性。",
        en: "Pale green fill, deep green text, fully rounded, no border, 12px/700 at 0.04em, 6px 14px padding. Selection raises the ground to deep green with cream text. It filters categories and marks attributes.",
      },
    },
    {
      name: "Price Tag",
      role: { zh: "价格标签", en: "The price tag" },
      construction: {
        zh: "金黄色块、棕色文字、8px 圆角、内边距 2px 8px、16px/700。原价用 12px 划线棕字放在旁边，间距 8px。价格永远是卡片上对比最高的元素。",
        en: "A marigold block with brown text on an 8px radius, 2px 8px padding at 16px/700. The original price sits 8px away at 12px struck through in brown. Price is always the highest-contrast element on the card.",
      },
    },
    {
      name: "Fresh Badge",
      role: { zh: "新鲜度徽标", en: "The freshness badge" },
      construction: {
        zh: "48px 圆形、淡绿或金黄填充、深绿图标或单字、1px 白 60% 描边。放在产品图左上角，用来标记「当季」「有机」「本地」。必须带文字或图标，不只靠颜色。",
        en: "A 48px circle filled pale green or marigold with a deep green icon or letter, ringed by a 1px white border at 60%. It sits top-left on a product image marking seasonal, organic or local — and it always carries a word or icon, never color alone.",
      },
    },
  ],
  imagery: {
    zh: "食品与食材摄影：蔬果、面包、乳制品、市场场景。必须自然光、暖调、背景干净。允许俯拍平铺。不使用暗调摄影、加工食品特写与冷光。",
    en: "Food photography: produce, bread, dairy, market scenes. Natural light, warm cast, clean backgrounds, flat-lay overheads welcome. No dark photography, processed-food close-ups or cool lighting.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 16px，产品网格 2 列（移动）到 4 列（桌面）、间距 12 到 16px。区块间距 64px。圆角统一偏好大值，最小 8px。",
    en: "Capped at 1200px with 16px padding. The product grid runs two columns on mobile and four on desktop at 12 to 16px gaps, with sections 64px apart. Radii favour the larger values, never below 8px.",
  },
  dos: [
    { zh: "暖奶油底配南瓜橙与深绿", en: "Warm cream with pumpkin and deep green" },
    { zh: "主按钮全圆角，最小 48px 高", en: "The primary button is fully rounded at 48px minimum" },
    { zh: "价格是卡片上对比最高的元素", en: "Price carries the highest contrast on the card" },
    { zh: "分类用淡绿药丸标签", en: "Categories use pale green pills" },
    { zh: "产品图固定 1:1 且 12px 圆角", en: "Product images lock to 1:1 on a 12px radius" },
    { zh: "阴影极轻且带绿调", en: "Shadows stay very light with a green cast" },
  ],
  donts: [
    { zh: "不要用暗调或冷光摄影", en: "No dark or cool-lit photography" },
    { zh: "不要用小于 8px 的圆角", en: "No radius below 8px" },
    { zh: "不要用重阴影", en: "No heavy shadows" },
    { zh: "不要让价格低对比", en: "Never let price fall to low contrast" },
    { zh: "不要用冷灰作中性色", en: "No cool grey neutrals" },
    { zh: "不要只靠颜色标记新鲜度", en: "Never mark freshness by color alone" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2d5016",
      background: "#fef9f0",
      card: "#ffffff",
      pumpkin: "#e8722a",
      marigold: "#f5c542",
      pale: "#d4e4bc",
    },
    prompts: [
      {
        zh: "做一个鲜活市集产品卡：白底、16px 圆角、1px rgba(212,228,188,0.6) 描边、内边距 16px、阴影 0 2px 8px rgba(45,80,22,0.06)。图片 1:1、12px 圆角、铺满卡宽。下方 14px 商品名与一个金黄色 #f5c542 的价格标签（8px 圆角、棕字 #8b4513、16px/700）。左上角放一个 48px 的淡绿 #d4e4bc 圆形徽标。主按钮南瓜橙 #e8722a 填充、白字、999px 全圆角、最小高度 48px。页面底色 #fef9f0，网格 2 到 4 列、间距 12px。",
        en: "Build a fresh market product card: white fill, 16px radius, a 1px rgba(212,228,188,0.6) border, 16px padding, shadow 0 2px 8px rgba(45,80,22,0.06). The image takes a 1:1 ratio on a 12px radius at full card width. Below sit a 14px product name and a marigold #f5c542 price tag (8px radius, brown #8b4513 text, 16px/700). A 48px pale green #d4e4bc circle marks the top-left. The primary button fills pumpkin #e8722a with white text, fully rounded, 48px minimum height. The page ground is #fef9f0 across a two-to-four column grid at 12px gaps.",
      },
    ],
  },
  similar: [
    { name: "Shopify Clean", why: { zh: "同为电商，但清爽电商是白灰冷净，鲜活市集是暖奶油加圆角", en: "Both ecommerce, though Shopify Clean is white and cool while Fresh Market is warm cream with rounded forms" } },
    { name: "Natural Organic", why: { zh: "同为自然语义，但自然有机更中性，鲜活市集更食欲导向", en: "Both natural semantics, though natural organic is neutral while this is appetite-driven" } },
  ],
  completeness: "full",
};
