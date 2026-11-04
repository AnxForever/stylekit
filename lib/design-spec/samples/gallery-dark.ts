import type { DesignSpec } from "../types";

export const galleryDarkSpec: DesignSpec = {
  slug: "gallery-dark",
  name: "暗色画廊风",
  nameEn: "Gallery Dark",
  cover: "/styles/gallery-dark.svg",
  theme: "dark",
  northStar: {
    zh: "近黑的展厅里只有照片发光，其余一切退到看不见。",
    en: "In a near-black room only the photographs emit light; everything else withdraws.",
  },
  summary: {
    zh: "暗色画廊风为摄影师与影像作者服务：近黑底（#0a0a0a）让全幅照片获得绝对注意力，抬升面用 #1a1a1a，分隔线 #2a2a2a，元信息（日期、标签、地点、展签）一律用暖琥珀（#c4956a）的 10 到 11px 全大写 0.15em 细体，正文用白色细体，大标题 4xl 到 7xl 细体紧字距。卡片只加 1px 描边与 2px 圆角、绝不加阴影。它的禁令是：不许彩色阴影与渐变背景、不许亮色背景——任何提亮都会破坏暗场沉浸。",
    en: "Gallery Dark serves photographers and moving-image artists: a near-black ground (#0a0a0a) gives full-bleed photographs absolute attention, elevated surfaces take #1a1a1a, dividers #2a2a2a, and metadata (dates, tags, locations, wall labels) runs in warm amber (#c4956a) at 10 to 11px uppercase 0.15em light. Body is white light-weight, headlines 4xl to 7xl light on tight tracking. Cards carry a 1px border and 2px radius with no shadow at all. Color shadows and gradient backgrounds are banned, and so is any light ground — brightening anything breaks the immersion.",
  },
  colors: [
    {
      name: "展厅黑",
      nameEn: "Gallery Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "页面底。近黑，让照片成为唯一光源。",
        en: "The page ground — near black, making photographs the only light source.",
      },
      token: "--color-gallery-black",
    },
    {
      name: "抬升面",
      nameEn: "Raised",
      value: "#1a1a1a",
      group: "surface",
      role: {
        zh: "卡片与侧面板，只比底色亮一档。",
        en: "Cards and side panels, one step above the ground.",
      },
      token: "--color-raised",
    },
    {
      name: "分隔线",
      nameEn: "Divider",
      value: "#2a2a2a",
      group: "neutral",
      role: {
        zh: "所有 1px 描边与分隔线。暗场里唯一的结构手段。",
        en: "Every 1px border and divider — the only structural device in the dark.",
      },
      token: "--color-divider",
    },
    {
      name: "暖琥珀",
      nameEn: "Amber",
      value: "#c4956a",
      group: "accent",
      role: {
        zh: "唯一强调色：元信息、展签、链接与聚焦描边。",
        en: "The only accent on metadata, wall labels, links and focus borders.",
      },
      token: "--color-amber",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "brand",
      role: {
        zh: "正文与标题，一律用 300 细体。",
        en: "Body and headlines, always at weight 300.",
      },
      token: "--color-white",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [300, 400],
      sizes: [10, 11, 14, 20, 36, 56, 72],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.15em" },
      role: {
        zh: "全站唯一字体，只用 300 与 400。大标题 56 到 72px 细体紧字距，元信息 10px 全大写 0.15em。",
        en: "The only face, in 300 and 400 only. Headlines run 56 to 72px light on tight tracking; metadata sits at 10px uppercase 0.15em.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 300, size: 72, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 300, size: 56, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 300, size: 36, lineHeight: 1.2, token: "--text-subheading" },
    { role: "body-lg", weight: 300, size: 20, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 300, size: 11, lineHeight: 1.5, tracking: "0.15em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1440,
    sectionGap: 128,
    cardPadding: 0,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Gallery Black", value: "#0a0a0a", purpose: "页面底" },
    { level: 1, name: "Raised", value: "#1a1a1a", purpose: "卡片与侧栏" },
  ],
  elevation: [
    { name: "None", value: "none — a shadow would interrupt the dark" },
  ],
  components: [
    {
      name: "Full Bleed Frame",
      role: { zh: "全幅作品（核心）", en: "The full-bleed work — the core" },
      construction: {
        zh: "容器 overflow hidden、内边距 0，图片 object-fit: cover、占满、宽高 100%。零圆角零边框零阴影。上方或下方距离 48px 处放展签：10px 全大写 0.15em 的琥珀色元信息，加白色 20px 的作品名。图片绝不加遮罩或文字。",
        en: "The container clips with overflow hidden and zero padding; the image uses object-fit cover at full width and height with no radius, border or shadow. A wall label sits 48px away: 10px uppercase 0.15em amber metadata above a 20px white title. The image never carries a scrim or text.",
      },
    },
    {
      name: "Work Card",
      role: { zh: "作品卡与缩略图格", en: "Work cards and thumbnail cells" },
      construction: {
        zh: "抬升面 #1a1a1a 填充、2px 圆角、1px #2a2a2a 描边、无内边距（图片铺满）、无阴影。下方 16px 处放展签。hover 时图片整体不透明度降到 90%（亮度微变），不加缩放、不加阴影。",
        en: "A #1a1a1a fill on a 2px radius with a 1px #2a2a2a border, no padding so the image fills it, and no shadow. The label sits 16px below. Hover drops the image to 90% opacity for a subtle brightness shift, with no scale and no shadow.",
      },
      states: "hover: opacity 90%",
    },
    {
      name: "Quiet Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "内边距 24px 32px、底部 1px #2a2a2a 描边、无模糊无底色变化。链接 11px 全大写 0.15em 细体白色，hover 时转琥珀。字标 20px/300。",
        en: "24px 32px padding with a 1px #2a2a2a rule along the bottom, no blur and no background change. Links run 11px uppercase 0.15em light in white, turning amber on hover, with a 20px/300 wordmark.",
      },
    },
    {
      name: "Amber Field",
      role: { zh: "搜索与订阅输入", en: "Search and subscribe inputs" },
      construction: {
        zh: "展厅黑填充、2px 圆角、1px #2a2a2a 描边、padding 10px 14px、14px 细体。占位符白 40%。聚焦时描边转琥珀并加 1px 的琥珀 30% 外环。",
        en: "Gallery black fill, 2px radius, a 1px #2a2a2a border, 10px 14px padding at 14px light. The placeholder sits at 40% white. Focus turns the border amber and adds a 1px ring at 30%.",
      },
    },
    {
      name: "Wall Label",
      role: { zh: "展签元信息", en: "The wall label" },
      construction: {
        zh: "固定格式：日期 · 地点 · 媒介，10px 全大写 0.15em 细体琥珀色，行高 1.5。它是这套风格唯一有颜色的文字，也是它区别于「极简暗色」的身份标记。",
        en: "A fixed format — date, location, medium — at 10px uppercase 0.15em light in amber on 1.5 leading. It is the only colored text in the style and the mark that separates it from generic dark minimalism.",
      },
    },
  ],
  imagery: {
    zh: "摄影是唯一内容，必须全幅、精确裁切、无滤镜。允许不同比例但同一系列的调色一致。不使用插画、图标装饰与任何非摄影图像。",
    en: "Photography is the only content, and it must be full-bleed with precise crops and no filter. Ratios may vary as long as one series shares a grade. No illustration, icon ornament or non-photographic imagery.",
  },
  layout: {
    zh: "上限 1440px，全幅作品可突破到 100vw。缩略图网格 2 列（移动）到 3 列（桌面）、间距 16 到 24px。区块间距 128px。垂直留白让每张照片单独成立。",
    en: "Capped at 1440px, with full-bleed works free to reach 100vw. The thumbnail grid runs two columns on mobile and three on desktop at 16 to 24px gaps. Sections sit 128px apart, and the vertical emptiness lets each photograph stand alone.",
  },
  dos: [
    { zh: "近黑底，抬升面只亮一档", en: "Near-black ground with raised surfaces one step up" },
    { zh: "元信息用琥珀色 10px 全大写 0.15em", en: "Metadata in amber at 10px uppercase 0.15em" },
    { zh: "标题与正文都用 300 细体", en: "Headlines and body both at weight 300" },
    { zh: "卡片只加 1px 描边，不加阴影", en: "Cards take a 1px border and no shadow" },
    { zh: "照片全幅、无遮罩无文字", en: "Photographs full-bleed, no scrim, no text" },
    { zh: "hover 只做 opacity 到 90%", en: "Hover only drops opacity to 90%" },
  ],
  donts: [
    { zh: "不要用彩色阴影与渐变背景", en: "No color shadows or gradient backgrounds" },
    { zh: "不要用亮色背景", en: "No light grounds" },
    { zh: "不要在照片上加文字或遮罩", en: "No text or scrim on a photograph" },
    { zh: "不要用粗字重", en: "No heavy weights" },
    { zh: "不要给卡片加阴影", en: "No shadow on cards" },
    { zh: "不要引入第二个强调色", en: "No second accent" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#0a0a0a",
      raised: "#1a1a1a",
      amber: "#c4956a",
      divider: "#2a2a2a",
      muted: "#8a8a8a",
    },
    prompts: [
      {
        zh: "做一个暗色画廊页面：页面底 #0a0a0a、卡片 #1a1a1a、描边 #2a2a2a。作品图全幅 object-fit cover、零圆角零阴影、容器 overflow hidden 且无内边距。图片下方 48px 放展签：10px 全大写 0.15em 的 #c4956a 元信息（日期 · 地点 · 媒介）加 20px/300 白色作品名。大标题 72px/300、字距 -0.02em。卡片 2px 圆角、1px 描边、无阴影，hover 时图片 opacity 90%。全站只用 300 与 400 字重，不用任何亮色背景。",
        en: "Build a dark gallery page: ground #0a0a0a, cards #1a1a1a, borders #2a2a2a. Work images are full-bleed with object-fit cover, zero radius and zero shadow inside an overflow-hidden container with no padding. A wall label sits 48px below: 10px uppercase 0.15em amber #c4956a metadata (date, location, medium) above a 20px/300 white title. Headlines run 72px/300 at -0.02em. Cards take a 2px radius and a 1px border with no shadow, and hover drops the image to 90% opacity. Only weights 300 and 400 appear, and no light ground is ever used.",
      },
    ],
  },
  similar: [
    { name: "Immersive Photo", why: { zh: "同样以摄影为主体，但暗色画廊更克制、几乎没有动效", en: "Both photography-led, though gallery dark is far more restrained and nearly motionless" } },
    { name: "Horizontal Gallery", why: { zh: "同为展厅逻辑，但那边是白盒横滚，这里是暗场纵向", en: "Both gallery logic, though that one is a white cube scrolling sideways while this is a dark room scrolling down" } },
  ],
  completeness: "full",
};
