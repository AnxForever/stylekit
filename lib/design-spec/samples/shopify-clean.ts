import type { DesignSpec } from "../types";

export const shopifyCleanSpec: DesignSpec = {
  slug: "shopify-clean",
  name: "清爽电商",
  nameEn: "Shopify Clean",
  cover: "/styles/shopify-clean.svg",
  theme: "light",
  northStar: {
    zh: "产品图说了算：界面只负责让价格和按钮无法被错过。",
    en: "The product photo decides everything; the interface only ensures price and button cannot be missed.",
  },
  summary: {
    zh: "清爽电商是为独立店铺做的转化型界面，规则由商业逻辑倒推：底色必须白或极浅灰，因为任何深色都会影响产品图的色彩还原；产品卡必须固定比例（1:1 或 3:4）以便网格对齐；价格是页面上对比度最高的元素，18px 加粗；原价用 14px 划线灰字放在现价旁；主按钮只用品牌绿 #008060，而且必须足够饱和，因为它是唯一要人点的东西。列表页禁止大面积装饰元素——它们在和商品抢注意力。",
    en: "Shopify Clean is a conversion interface for independent storefronts, and its rules are derived from commercial logic. The ground must be white or near-white because any dark tone distorts product color. Product cards lock to a fixed ratio (1:1 or 3:4) so the grid aligns. Price carries the highest contrast on the page at 18px bold, with the original 14px struck-through grey beside it. The primary button uses brand green #008060 and must stay saturated, because it is the only thing asking to be clicked. Listing pages forbid large decorative elements — they compete with the goods.",
  },
  colors: [
    {
      name: "纯白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "产品页与卡片底。必须白，任何色偏都会污染产品图。",
        en: "Product pages and card grounds. It must stay white; any cast contaminates the product photography.",
      },
      token: "--color-white",
    },
    {
      name: "浅灰",
      nameEn: "Light Grey",
      value: "#f7f7f8",
      group: "surface",
      role: {
        zh: "列表页底与区块分隔。只差一档，让白卡浮起。",
        en: "Listing grounds and section separation — one step off white so cards lift.",
      },
      token: "--color-light-grey",
    },
    {
      name: "品牌绿",
      nameEn: "Brand Green",
      value: "#008060",
      group: "brand",
      role: {
        zh: "唯一的主行动色。购买、加入购物车、结账全部用它。",
        en: "The single action color: buy, add to cart, checkout all use it.",
      },
      token: "--color-brand-green",
    },
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "标题与价格。价格必须用最高对比。",
        en: "Headings and prices — pricing always takes the highest contrast.",
      },
      token: "--color-ink",
    },
    {
      name: "线灰",
      nameEn: "Line Grey",
      value: "#e3e3e3",
      group: "neutral",
      role: {
        zh: "卡片描边与分隔线。1px，几乎不参与视觉。",
        en: "Card borders and dividers at 1px, barely participating visually.",
      },
      token: "--color-line-grey",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#ffd700",
      group: "accent",
      role: {
        zh: "评分星与「热销」标记，面积必须极小。",
        en: "Rating stars and bestseller tags — the area must stay tiny.",
      },
      token: "--color-gold",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [11, 12, 14, 16, 18, 24, 32],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.55 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "全站唯一字体。价格用 18px/700，标题 24 到 32px，辅助文字 12px 灰。",
        en: "The only face. Prices at 18px/700, headings 24 to 32px, support copy 12px grey.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 32, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 24, lineHeight: 1.3, token: "--text-heading" },
    { role: "price", weight: 700, size: 18, lineHeight: 1.3, token: "--text-price" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1280,
    sectionGap: 64,
    cardPadding: 16,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "images", value: "8px" },
    { element: "badges", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Light Grey", value: "#f7f7f8", purpose: "列表页底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "产品卡与详情页" },
  ],
  elevation: [
    { name: "Card rest", value: "none — 1px border only" },
    { name: "Card hover", value: "0 4px 12px rgba(0,0,0,0.08)" },
    { name: "Sticky bar", value: "0 -4px 12px rgba(0,0,0,0.06)" },
  ],
  components: [
    {
      name: "Buy Button",
      role: { zh: "购买与加入购物车", en: "Buy and add to cart" },
      construction: {
        zh: "品牌绿填充、白字、8px 圆角、无描边，16px/600、padding 12px 24px，无阴影。hover 时填充加深到 #006b50；按下缩放 0.98。全宽版本用于详情页，固定版本用于移动端底部吸附条。禁止用低饱和绿或描边款式。",
        en: "Brand green fill, white text, 8px radius, no border, 16px/600, 12px 24px padding, no shadow. Hover deepens the fill to #006b50; press scales 0.98. A full-width variant serves product pages and a fixed variant rides a mobile sticky bar. Desaturated greens and outlined styles are forbidden.",
      },
      sizes: "padding 12px 24px; label 16px",
      states: "hover: #006b50; active: scale 0.98",
    },
    {
      name: "Product Card",
      role: { zh: "产品卡", en: "The product card" },
      construction: {
        zh: "白底、8px 圆角、1px #e3e3e3 描边、内边距 16px。图片区固定 aspect-ratio 1:1 或 3:4、8px 圆角、无滤镜。图片下方 14px 商品名（最多两行）、18px/700 价格与 14px 划线灰原价并排。hover 时阴影升到 0 4px 12px 黑 8%，图片放大 1.02。",
        en: "White fill, 8px radius, a 1px #e3e3e3 border, 16px padding. The image area locks to a 1:1 or 3:4 ratio on an 8px radius with no filter. Below it sits a 14px product name of two lines at most, an 18px/700 price and a 14px struck-through grey original beside it. Hover raises the shadow to 0 4px 12px at 8% black and scales the image 1.02.",
      },
      sizes: "image aspect 1:1 or 3:4",
      states: "hover: shadow, image scale 1.02",
    },
    {
      name: "Price Stack",
      role: { zh: "价格与折扣标记", en: "Price and discount marks" },
      construction: {
        zh: "现价 18px/700 墨色；原价 14px/400 灰（#6b7280）加 line-through，与现价之间留 8px；折扣用 999px 的金色标签（12px/600、墨色文字、padding 2px 8px）。三者必须在同一行且在移动端不换行溢出。",
        en: "Current price at 18px/700 in ink; original at 14px/400 in #6b7280 with a line-through, 8px away; a discount badge in gold at 12px/600 with ink text on a 999px radius and 2px 8px padding. All three stay on one line and never overflow on mobile.",
      },
    },
    {
      name: "Trust Row",
      role: { zh: "信任标识条", en: "The trust badge row" },
      construction: {
        zh: "三个横向排列的 12px 灰字配 16px 线性图标（免运费、30 天退换、正品保障），间距 24px，图标色用品牌绿。放在购买按钮下方或产品图旁边，不加边框。",
        en: "Three 12px grey labels with 16px line icons (free shipping, thirty-day returns, authenticity), 24px apart, with icons in brand green. They sit under the buy button or beside the product image, without borders.",
      },
    },
    {
      name: "Sticky Buy Bar",
      role: { zh: "移动端吸附购买条", en: "The mobile sticky buy bar" },
      construction: {
        zh: "顶部 1px #e3e3e3 描边、白底、内边距 12px 16px、阴影 0 -4px 12px 黑 6%。左侧显示 18px/700 价格（可含折扣标签），右侧一个全宽的 Buy Button。始终可见，不随滚动隐藏。",
        en: "A 1px #e3e3e3 top border on white, 12px 16px padding, shadow 0 -4px 12px at 6% black. The left shows an 18px/700 price with an optional discount badge, and the right holds a full-width buy button. It stays visible and never hides on scroll.",
      },
    },
  ],
  imagery: {
    zh: "产品摄影是唯一图像，必须白底或极浅底、无滤镜无色彩叠加、统一比例。允许同一商品的多角度图与细节特写。不使用场景图作主图、装饰插画与图标墙。",
    en: "Product photography is the only imagery: white or near-white ground, no filters or overlays, one consistent ratio. Multi-angle and detail shots of the same item are welcome. No lifestyle shots as the main image, decorative illustration or icon walls.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 16px，产品网格 2 列（移动）/ 3 列（平板）/ 4 列（桌面），间距 16px。详情页左图右信息（各 50%），信息栏固定在视口内。列表页禁止任何超过 200px 高的装饰区块。",
    en: "Capped at 1280px with 16px padding. The product grid runs two columns on mobile, three on tablet and four on desktop at 16px gaps. Product pages split fifty-fifty between images and information, with the info column sticky. Listing pages allow no decorative block taller than 200px.",
  },
  dos: [
    { zh: "白或浅灰底，保证产品图准确", en: "White or light grey ground for accurate product color" },
    { zh: "图片固定 1:1 或 3:4 比例", en: "Lock images to a 1:1 or 3:4 ratio" },
    { zh: "价格是页面对比最高的元素", en: "Price carries the highest contrast on the page" },
    { zh: "主按钮只用品牌绿且足够饱和", en: "The primary button uses saturated brand green only" },
    { zh: "原价划线放在现价旁", en: "Put the struck-through original beside the current price" },
    { zh: "信任标识用小图标配 12px 文字", en: "Trust badges use small icons with 12px text" },
  ],
  donts: [
    { zh: "不要用深色主背景", en: "No dark primary ground" },
    { zh: "不要在列表页加大面积装饰", en: "No large decoration on listing pages" },
    { zh: "不要用低对比价格色", en: "No low-contrast pricing color" },
    { zh: "不要让 CTA 低饱和", en: "Never desaturate the CTA" },
    { zh: "不要给产品图加滤镜或色彩叠加", en: "No filters or color overlays on product images" },
    { zh: "不要用不规则图片比例", en: "No inconsistent image ratios" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#ffffff",
      surface: "#f7f7f8",
      primary: "#008060",
      border: "#e3e3e3",
      muted: "#6b7280",
    },
    prompts: [
      {
        zh: "做一个电商产品卡：白底、8px 圆角、1px #e3e3e3 描边、内边距 16px。图片区 aspect-ratio 1/1、8px 圆角、object-fit cover、无滤镜。下方 14px 商品名（最多两行）、18px/700 #1a1a1a 现价与 14px #6b7280 划线原价并排。hover 时阴影 0 4px 12px rgba(0,0,0,0.08)、图片 scale(1.02)。购买按钮用 #008060 填充、8px 圆角、白字 16px/600。",
        en: "Build an ecommerce product card: white fill, 8px radius, a 1px #e3e3e3 border, 16px padding. The image area uses a 1/1 aspect ratio, 8px radius, object-fit cover and no filter. Below it, a 14px product name of at most two lines beside an 18px/700 current price in #1a1a1a and a 14px #6b7280 struck-through original. Hover applies a shadow of 0 4px 12px rgba(0,0,0,0.08) and scale(1.02) on the image. The buy button fills #008060 on an 8px radius with white 16px/600 text.",
      },
    ],
  },
  similar: [
    { name: "Stripe Style", why: { zh: "同样干净的商业界面，但电商的重心是商品图与价格", en: "Both clean commercial interfaces, though ecommerce centers product images and pricing" } },
    { name: "Apple Style", why: { zh: "同样产品优先，但苹果靠留白叙事，电商靠网格与转化", en: "Both product-first, though Apple tells a story through whitespace while ecommerce runs on grids and conversion" } },
  ],
  completeness: "full",
};
