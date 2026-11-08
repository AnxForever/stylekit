import type { DesignSpec } from "../types";

export const masonryFlowSpec: DesignSpec = {
  slug: "masonry-flow",
  name: "瀑布流布局",
  nameEn: "Masonry Flow",
  cover: "/styles/masonry-flow.svg",
  theme: "light",
  northStar: {
    zh: "高度不一的卡片顺着列往下淌，扫描线永远不是水平的。",
    en: "Cards of uneven height run down the columns, so the eye never scans a flat line.",
  },
  summary: {
    zh: "瀑布流是一种排布策略：卡片宽度固定、高度随内容变化，用多列容器让它自然错落。它的视觉语言必须让位给内容——卡片白底、8 到 16px 圆角、极浅描边，图片占卡片 60% 以上面积。间距必须严格一致（16px），否则错落会变成混乱。hover 时图片以 1.05 倍缓慢放大并叠加一层 4% 的黑，卡片本身不上浮也不加阴影，因为任何位移都会破坏列的稳定。筛选条用胶囊按钮，选中态填主色。",
    en: "Masonry is a layout strategy before it is a look: fixed card width, height driven by content, and a multi-column container that lets the rows fall unevenly. The visual language has to step back for the content — white cards, 8 to 16px radii, a hairline border, and images covering most of the card. Gaps must stay exactly consistent at 16px, or the stagger turns into noise. On hover the image scales to 1.05 and a 4% black veil settles over it; the card itself neither lifts nor casts a new shadow, because any movement would unsteady the columns. Filters are pills, and the selected one takes the primary fill.",
  },
  colors: [
    {
      name: "午夜",
      nameEn: "Midnight",
      value: "#1a1a2e",
      group: "brand",
      role: {
        zh: "标题、选中态与深色区块。接近黑但带一点紫，与图片内容更协调。",
        en: "Headings, selected states and dark blocks — near black with a violet cast that sits better beside imagery.",
      },
      token: "--color-midnight",
    },
    {
      name: "浅雾",
      nameEn: "Mist",
      value: "#f5f5f5",
      group: "surface",
      role: {
        zh: "页面底色。比白低一档，让白卡片的边界清晰。",
        en: "Page ground, one step below white so card edges stay legible.",
      },
      token: "--color-mist",
    },
    {
      name: "卡白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "所有卡片填充。白卡是为了让图片成为唯一的视觉重量，卡片本身不参与竞争。",
        en: "Every card fill. White cards exist so the images carry the only visual weight; the container never competes.",
      },
      token: "--color-card-white",
    },
    {
      name: "玫红",
      nameEn: "Rose Red",
      value: "#e94560",
      group: "accent",
      role: {
        zh: "主强调：喜欢、收藏与选中胶囊。全站唯一的高饱和色。",
        en: "The primary accent: likes, saves and selected pills — the only saturated color here.",
      },
      token: "--color-rose-red",
    },
    {
      name: "薄荷绿",
      nameEn: "Mint",
      value: "#16c79a",
      group: "accent",
      role: {
        zh: "成功与新内容标记，只用于徽标。",
        en: "Success and new-content marks, on badges only.",
      },
      token: "--color-mint",
    },
    {
      name: "琥珀黄",
      nameEn: "Amber",
      value: "#ffd460",
      group: "accent",
      role: {
        zh: "高亮与推荐位，面积不超过一张卡片的 10%。",
        en: "Highlights and featured slots, never more than ten percent of a card.",
      },
      token: "--color-amber",
    },
    {
      name: "靛",
      nameEn: "Indigo",
      value: "#7579e7",
      group: "accent",
      role: {
        zh: "链接与次级动作，与玫红形成冷暖对位。",
        en: "Links and secondary actions, pairing cool against the rose.",
      },
      token: "--color-indigo",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 13, 15, 18, 24, 32],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.55 },
      tracking: { display: "-0.01em", label: "0.03em" },
      role: {
        zh: "全站唯一字体。卡片标题 600、说明 400，字级偏小以便在密集中保持可读。",
        en: "The only face: 600 for card titles, 400 for captions, sized small so density stays readable.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 32, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 24, lineHeight: 1.3, token: "--text-heading" },
    { role: "body-lg", weight: 500, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.03em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64],
    maxWidth: 1440,
    sectionGap: 64,
    cardPadding: 16,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
    { element: "images", value: "12px" },
  ],
  surfaces: [
    { level: 0, name: "Mist", value: "#f5f5f5", purpose: "页面底色" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "卡片" },
  ],
  elevation: [
    { name: "Card", value: "none — the border separates it" },
    { name: "Card hover", value: "none — only the image moves" },
  ],
  components: [
    {
      name: "Masonry Card",
      role: { zh: "瀑布流中的任意一张卡片", en: "Any card inside the flow" },
      construction: {
        zh: "白底、16px 圆角、1px #e8e8e8 描边、无阴影，内边距 16px。图片占卡片高度的 60% 以上，12px 圆角，懒加载。图片下方依次是 15px/600 标题（最多两行）与 13px 灰色说明（最多一行）。hover 时图片放大 1.05 并叠一层 4% 黑，卡片本身不动。过渡 400ms ease-out。",
        en: "White fill, 16px radius, 1px #e8e8e8 border, no shadow, 16px padding. The image occupies at least 60% of the card height on a 12px radius, lazy-loaded. Below it come a 15px/600 title clamped to two lines and a 13px grey caption clamped to one. Hover scales the image to 1.05 under a 4% black veil; the card itself stays still. 400ms ease-out.",
      },
      sizes: "image ≥ 60% of height; padding 16px",
      states: "hover: image scale 1.05 + 4% black veil",
    },
    {
      name: "Filter Pill",
      role: { zh: "顶部筛选项", en: "Top filter chips" },
      construction: {
        zh: "全圆角、高 36px、padding 0 16px、13px/500。默认白底 1px 描边；选中态午夜填充白字；hover 只加深描边与文字，不改填充。整条筛选横向滚动，不换行。",
        en: "Fully rounded, 36px tall, 0 16px padding at 13px/500. Default is a white fill with a 1px border; selection fills midnight with white text; hover only darkens the border and label without touching the fill. The strip scrolls horizontally and never wraps.",
      },
      states: "hover: darker border; selected: midnight fill",
    },
    {
      name: "Search Bar",
      role: { zh: "顶部搜索", en: "Top search" },
      construction: {
        zh: "浅雾底、12px 圆角、1px #e8e8e8 描边、高 40px、左内边距 40px 放 16px 图标、13px 字。聚焦时描边转午夜并加 2px 午夜 12% 外环。",
        en: "Mist fill, 12px radius, 1px #e8e8e8 border, 40px tall, 40px left padding for a 16px icon, 13px type. Focus turns the border midnight and adds a 2px ring at 12% midnight.",
      },
    },
    {
      name: "Column Container",
      role: { zh: "瀑布流容器", en: "The masonry container" },
      construction: {
        zh: "桌面 4 到 5 列、平板 3 列、移动 2 列，列间距与行间距都固定 16px。用 CSS columns 或 grid 的 row-span 实现，禁止用绝对定位。卡片高度不做统一，但同一列的相邻卡片间距必须等于行间距。",
        en: "Four to five columns on desktop, three on tablet, two on mobile, with both column and row gaps fixed at 16px. Implement with CSS columns or grid row spans — never absolute positioning. Card heights stay free, but the gap between neighbours in one column must equal the row gap.",
      },
    },
  ],
  imagery: {
    zh: "图片是主体，占卡片 60% 以上。风格可以混杂（摄影、插画、截图），但尺寸比例必须由内容决定，不做裁切统一。不使用大面积纯色占位与装饰图形。",
    en: "Images are the subject and take over 60% of each card. Styles may vary — photography, illustration, screenshots — but the aspect ratio is decided by the content, never cropped to a uniform ratio. No large flat placeholders or decorative shapes.",
  },
  layout: {
    zh: "上限 1440px、容器内边距 16px，页码滚动加载。列数随断点变化：≥1280 五列、≥1024 四列、≥768 三列、移动两列。所有间距固定 16px，筛选条固定在顶部下方 8px。",
    en: "Capped at 1440px with 16px padding and infinite scroll. Columns change with breakpoints: five at 1280 and up, four at 1024, three at 768, two on mobile. Every gap stays at 16px, and the filter strip sticks 8px below the top bar.",
  },
  dos: [
    { zh: "列间距与行间距必须是同一个值", en: "Column and row gaps must be the same value" },
    { zh: "卡片高度由内容决定，不做统一裁切", en: "Let content decide card height; never crop to uniform" },
    { zh: "图片占卡片 60% 以上", en: "Images take over 60% of the card" },
    { zh: "hover 只动图片，不动卡片", en: "Hover moves the image, never the card" },
    { zh: "筛选条横向滚动不换行", en: "The filter strip scrolls, it never wraps" },
    { zh: "用 CSS columns 或 grid，不用绝对定位", en: "Use CSS columns or grid, never absolute positioning" },
  ],
  donts: [
    { zh: "不要用绝对定位模拟瀑布流", en: "Do not fake masonry with absolute positioning" },
    { zh: "不要让卡片上浮，会打乱列的对齐", en: "Never lift a card; it breaks the column rhythm" },
    { zh: "不要混用两种间距", en: "Do not mix two gap values" },
    { zh: "不要把标题写成三行以上", en: "Never let a title run past two lines" },
    { zh: "不要给卡片加阴影", en: "No shadows on cards" },
    { zh: "不要用统一裁剪比例", en: "No uniform crop ratio" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a2e",
      background: "#f5f5f5",
      card: "#ffffff",
      accent: "#e94560",
      muted: "#8a8a94",
      border: "#e8e8e8",
    },
    prompts: [
      {
        zh: "做一个瀑布流画廊：CSS columns 四列、列间距与行间距都是 16px。卡片白底、16px 圆角、1px #e8e8e8 描边、无阴影、内边距 16px。图片 12px 圆角、占卡片高度 60% 以上，下面 15px/600 标题（两行截断）与 13px #8a8a94 说明。hover 时图片 scale(1.05) 并叠一层 4% 黑，卡片不动，过渡 400ms ease-out。",
        en: "Build a masonry gallery: four CSS columns with 16px gaps in both directions. Cards are white with a 16px radius, 1px #e8e8e8 border, no shadow and 16px padding. The image takes a 12px radius and at least 60% of the card height, followed by a 15px/600 title clamped to two lines and a 13px caption in #8a8a94. Hover scales the image to 1.05 under a 4% black veil while the card stays put, over 400ms ease-out.",
      },
    ],
  },
  similar: [
    { name: "Bento Grid", why: { zh: "同样是网格叙事，但 Bento 用尺寸分主次，瀑布流靠内容高度", en: "Also grid-driven, though Bento ranks by size while masonry follows content height" } },
    { name: "Gallery Dark", why: { zh: "同为画廊结构，区别在底色与明度", en: "Same gallery structure, differing in ground and luminance" } },
  ],
  completeness: "full",
};
