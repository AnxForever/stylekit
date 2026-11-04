import type { DesignSpec } from "../types";

export const naturalOrganicSpec: DesignSpec = {
  slug: "natural-organic",
  name: "自然有机风",
  nameEn: "Natural Organic",
  cover: "/styles/natural-organic.svg",
  theme: "light",
  northStar: {
    zh: "大地色、纸与布的质感、不规则的形状——像手工做出来的东西。",
    en: "Earth tones, paper and cloth texture, irregular shapes — objects that look made by hand.",
  },
  summary: {
    zh: "自然有机风服务于健康、有机食品、环保与手作品牌。它拒绝一切冷色与精确几何：底色是暖米（#faf6f1），文字用深棕（#5c4033）而不是黑，形状用 32px 以上的大圆角甚至 blob 曲线，边界从不完全平行。四支辅色全部来自自然——鼠尾草绿、陶土橘、亚麻米、湖水青——饱和度都在 40% 以下。质感靠一层极淡的纸纹或织物噪点承担，不能有明显图案。动效平缓，hover 只是让底色变深一档，不做位移。",
    en: "Natural Organic serves wellness, organic food, sustainable and handmade brands. It rejects every cool color and every precise geometry: the ground is warm cream (#faf6f1), text is deep brown (#5c4033) rather than black, corners start at 32px and sometimes bend into blobs, and no two edges run perfectly parallel. The four supporting colors all come from nature — sage, terracotta, linen, lake teal — none above 40% saturation. Texture is a very light paper or cloth grain, never a visible pattern. Motion stays gentle: hover only deepens the ground, with no translation.",
  },
  colors: [
    {
      name: "深棕",
      nameEn: "Deep Bark",
      value: "#5c4033",
      group: "brand",
      role: {
        zh: "正文、标题与描边。替代黑色，让页面保持暖调。",
        en: "Body, headings and borders — the warm replacement for black.",
      },
      token: "--color-bark",
    },
    {
      name: "暖米",
      nameEn: "Warm Cream",
      value: "#faf6f1",
      group: "surface",
      role: {
        zh: "页面画布。所有区块默认底色，接近未漂白的纸。",
        en: "Page canvas, the default ground for every section, close to unbleached paper.",
      },
      token: "--color-cream",
    },
    {
      name: "亚麻",
      nameEn: "Linen",
      value: "#e9e0d4",
      group: "surface",
      role: {
        zh: "卡片与次级区块。只比米色深一档，靠质感而非对比分层。",
        en: "Cards and secondary blocks, one step deeper than the canvas so texture rather than contrast does the layering.",
      },
      token: "--color-linen",
    },
    {
      name: "鼠尾草",
      nameEn: "Sage",
      value: "#8b9d77",
      group: "accent",
      role: {
        zh: "植物性与「天然」语义的主强调，用于标签与成功状态。",
        en: "The botanical accent for 'natural' semantics: tags, success states.",
      },
      token: "--color-sage",
    },
    {
      name: "陶土",
      nameEn: "Terracotta",
      value: "#d4a373",
      group: "accent",
      role: {
        zh: "暖色强调与手作感，用于价格、徽标与小面积填充。",
        en: "Warm emphasis and the handmade cue, used on prices, badges and small fills.",
      },
      token: "--color-terracotta",
    },
    {
      name: "湖水青",
      nameEn: "Lake Teal",
      value: "#75a191",
      group: "accent",
      role: {
        zh: "唯一允许的冷色，只作为对比出现，面积不超过一屏的 10%。",
        en: "The one cool tone allowed, used for contrast and kept under ten percent of a viewport.",
      },
      token: "--color-lake",
    },
  ],
  fonts: [
    {
      family: "Fraunces",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 500],
      sizes: [24, 32, 40, 56],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.7 },
      tracking: { display: "-0.01em", label: "0.14em" },
      role: {
        zh: "所有标题。带一点手写感的衬线是这套风格的人格来源。",
        en: "All headings. A serif with a hint of the hand is where this style's personality lives.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "-apple-system, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500],
      sizes: [13, 15, 17],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.7 },
      tracking: { display: "0", label: "0.14em" },
      role: {
        zh: "正文、说明与表单。保持中性，避免与衬线标题抢戏。",
        en: "Body, notes and forms, kept neutral so the serif keeps the stage.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Fraunces", weight: 400, size: 56, lineHeight: 1.15, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", font: "Fraunces", weight: 400, size: 40, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Fraunces", weight: 500, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 17, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 15, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Inter", weight: 500, size: 13, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1180,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "32px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "20px" },
    { element: "images", value: "32px" },
  ],
  surfaces: [
    { level: 0, name: "Warm Cream", value: "#faf6f1", purpose: "页面画布" },
    { level: 1, name: "Linen", value: "#e9e0d4", purpose: "卡片与次级区块" },
  ],
  elevation: [
    { name: "None", value: "none" },
    { name: "Soft", value: "0 8px 24px rgba(92,64,51,0.08)" },
  ],
  components: [
    {
      name: "Handmade Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "深棕填充、暖米文字、999px 全圆角、无描边，字级 15px/500、padding 14px 28px、字距 0.02em。hover 只把填充提亮到深棕 90%，不加位移与阴影；按下填充换鼠尾草。过渡 300ms ease-out。",
        en: "Deep bark fill, cream text, fully rounded at 999px, no border. 15px type at weight 500, 14px 28px padding, 0.02em tracking. Hover only lightens the fill to 90% bark, with no lift or shadow; press switches the fill to sage. 300ms ease-out.",
      },
      states: "hover: lighter fill only; active: sage fill",
    },
    {
      name: "Paper Card",
      role: { zh: "产品卡与故事卡", en: "Product and story card" },
      construction: {
        zh: "亚麻底、32px 圆角、无描边、内边距 32px，阴影 0 8px 24px 棕 8%（可省略）。上方图片直角改 32px 圆角、宽高比 4:5；标题用衬线 24px/500，正文 15px 深棕 70%。hover 时底色加深到鼠尾草 12%，其余不动。",
        en: "Linen fill, 32px radius, no border, 32px padding, shadow 0 8px 24px at 8% bark (optional). The image above keeps a 32px radius at a 4:5 ratio; the title is 24px serif at weight 500, body 15px at 70% bark. Hover deepens the ground to 12% sage and moves nothing else.",
      },
    },
    {
      name: "Rounded Input",
      role: { zh: "表单与订阅输入", en: "Forms and newsletter input" },
      construction: {
        zh: "暖米底、1px 深棕 20% 描边、20px 圆角、padding 14px 18px、15px 字。聚焦时描边转鼠尾草并加 3px 鼠尾草 20% 外环，不改变尺寸。",
        en: "Cream fill, 1px bark border at 20%, 20px radius, 14px 18px padding at 15px. Focus turns the border sage and adds a 3px ring at 20% sage without resizing.",
      },
    },
    {
      name: "Blob Badge",
      role: { zh: "标签与「有机」徽标", en: "Tags and 'organic' badges" },
      construction: {
        zh: "不规则的 blob 形状（border-radius 用 60% 40% 55% 45% / 45% 55% 45% 55% 一类），填充用鼠尾草或陶土 15%，文字 13px/500 深棕。不描边，不加阴影。",
        en: "An irregular blob (border-radius such as 60% 40% 55% 45% / 45% 55% 45% 55%) filled with 15% sage or terracotta, label at 13px/500 in bark. No border, no shadow.",
      },
    },
  ],
  imagery: {
    zh: "自然光下的实物摄影：植物、陶器、织物、食材，暖调、低饱和、允许轻微颗粒。构图可留出大片空白。不使用冷光、高对比、科技感产品或几何插画。",
    en: "Objects in natural light: plants, ceramics, cloth, produce — warm, low-saturation, with a little grain. Compositions may leave large empty areas. No cool lighting, high contrast, tech products or geometric illustration.",
  },
  layout: {
    zh: "上限 1180px，容器内边距 24px 到 48px。区块间距 112px，留白不求对称，允许左右不等。两栏时比例用 5:7 而不是 1:1，避免过于规整。图片可用 blob 或拱形裁切。",
    en: "Capped at 1180px with 24px to 48px padding. Sections sit 112px apart, and the whitespace is deliberately asymmetric. Two-column blocks split 5:7 rather than 1:1 so nothing looks mechanical. Images may be cropped into blobs or arches.",
  },
  dos: [
    { zh: "用大地色系，饱和度控制在 40% 以下", en: "Keep to earth tones under 40% saturation" },
    { zh: "圆角 20px 起，卡片 32px，允许 blob 形状", en: "Radius starts at 20px, cards at 32px, blobs allowed" },
    { zh: "用深棕替代纯黑", en: "Use deep bark instead of black" },
    { zh: "加一层极淡的纸纹或织物噪点", en: "Add a very light paper or cloth grain" },
    { zh: "标题用带手写感的衬线", en: "Set headings in a serif with a touch of the hand" },
    { zh: "hover 只加深底色，不做位移", en: "Hover deepens the ground; nothing moves" },
  ],
  donts: [
    { zh: "不要用纯黑 #000000", en: "No pure black #000000" },
    { zh: "不要用冷色调作为主色", en: "No cool tone as the primary" },
    { zh: "不要用锐利直角与完美圆形", en: "No sharp corners or perfect circles" },
    { zh: "不要用霓虹或高饱和色", en: "No neon or highly saturated color" },
    { zh: "不要用科技感的深色仪表盘", en: "No tech-styled dark dashboards" },
    { zh: "不要让纹理变成可见图案", en: "Never let the texture become a visible pattern" },
  ],
  promptGuide: {
    quickColors: {
      text: "#5c4033",
      background: "#faf6f1",
      card: "#e9e0d4",
      accent: "#8b9d77",
      warm: "#d4a373",
      border: "rgba(92,64,51,0.20)",
    },
    prompts: [
      {
        zh: "做一个自然有机风卡片：亚麻底色 #e9e0d4、32px 圆角、无边框、内边距 32px。上方 4:5 图片、同样 32px 圆角；下面 24px 衬线标题（深棕 #5c4033）与 15px 正文（深棕 70%），底部一个鼠尾草标签（13px、blob 形状、15% 底色）。hover 时底色变成鼠尾草 12%，不加位移与阴影。",
        en: "Build a natural organic card: linen #e9e0d4 fill, 32px radius, no border, 32px padding. A 4:5 image with the same radius sits above a 24px serif title in #5c4033 and 15px body at 70% bark, with a sage tag below (13px, blob shape, 15% fill). Hover shifts the ground to 12% sage with no lift or shadow.",
      },
    ],
  },
  similar: [
    { name: "Aesop", why: { zh: "同样的暖色、纸感与克制的排版", en: "Same warmth, paper feel and restrained typography" } },
    { name: "Cottagecore", why: { zh: "同一套自然语义，但更偏装饰与怀旧", en: "Same natural semantics, leaning more decorative and nostalgic" } },
  ],
  completeness: "full",
};
