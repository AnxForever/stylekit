import type { DesignSpec } from "../types";

export const inkWashSpec: DesignSpec = {
  slug: "ink-wash",
  name: "水墨画风",
  nameEn: "Ink Wash",
  cover: "/styles/ink-wash.svg",
  theme: "light",
  northStar: {
    zh: "墨分五色，纸留大片空白：气韵在没画的地方。",
    en: "Five tones of ink on paper left mostly empty — the spirit lives where nothing is painted.",
  },
  summary: {
    zh: "水墨画风来自传统水墨：墨色的浓淡干湿是唯一的表达手段，纸的大片空白是构图的主体（计白当黑）。落到界面上，纪律很明确——衬线字体呼应书法、边框必须像毛笔一样细（1px 且只有 20% 墨色）、颜色全部压在灰调里、阴影一律不许有。交互也照此收紧：hover 只让墨色加深、边框稍微渗开，绝不做位移、绝不用 spring 或 bounce，因为任何机械弹性都会破坏「静谧」。",
    en: "Ink Wash comes from traditional Chinese painting: the density and wetness of ink are the only expressive means, and the paper's emptiness carries the composition. On screen the discipline is clear — serif type echoes calligraphy, borders must be as fine as a brush at 1px and only 20% ink, every color stays inside the grey range, and shadow is forbidden outright. Interaction tightens the same way: hover deepens the ink and lets a border bleed slightly, never translating and never using spring or bounce, since mechanical elasticity destroys the stillness.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#2c2c2c",
      group: "brand",
      role: {
        zh: "全部文字与线条。不是纯黑，留出「浓墨」与「焦墨」的余地。",
        en: "Every text run and line — not pure black, leaving room for dense and scorched ink.",
      },
      token: "--color-ink",
    },
    {
      name: "宣纸",
      nameEn: "Xuan Paper",
      value: "#f8f5f0",
      group: "surface",
      role: {
        zh: "页面底。略带暖黄的纸色，是所有留白的载体。",
        en: "The page ground — a warm paper tone that carries all the emptiness.",
      },
      token: "--color-xuan",
    },
    {
      name: "灰绿",
      nameEn: "Grey Green",
      value: "#6b7b6e",
      group: "accent",
      role: {
        zh: "第一辅色，用于远景山色与次级强调。",
        en: "The first support color, on distant hills and secondary emphasis.",
      },
      token: "--color-grey-green",
    },
    {
      name: "赭石",
      nameEn: "Ochre",
      value: "#a89279",
      group: "accent",
      role: {
        zh: "温暖的一笔，用于需要人气的元素，出现频率低。",
        en: "The warm stroke, on elements that need a human presence; used sparingly.",
      },
      token: "--color-ochre",
    },
    {
      name: "浅米",
      nameEn: "Pale Sand",
      value: "#c4b9a8",
      group: "accent",
      role: {
        zh: "淡墨层，用于区块底色与分隔。",
        en: "The pale ink layer, on section grounds and dividers.",
      },
      token: "--color-pale-sand",
    },
    {
      name: "青灰",
      nameEn: "Slate Blue",
      value: "#697a7c",
      group: "accent",
      role: {
        zh: "冷侧的一笔，用于水与天空。",
        en: "The cool stroke, on water and sky.",
      },
      token: "--color-slate-blue",
    },
  ],
  fonts: [
    {
      family: "Noto Serif SC",
      substitute: "'Songti SC', 'STSong', Georgia, serif",
      weights: [300, 400, 500],
      sizes: [15, 18, 22, 28, 38, 52],
      lineHeight: { display: 1.2, heading: 1.4, body: 1.9 },
      tracking: { display: "0.02em", label: "0.3em" },
      role: {
        zh: "全站衬线。行高 1.9 是水墨的必要条件——字距与行距都要空出来，像纸上未落笔的部分。",
        en: "Serif throughout. The 1.9 leading is essential — both tracking and leading must open, like untouched paper.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Noto Serif SC", weight: 300, size: 52, lineHeight: 1.2, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Noto Serif SC", weight: 400, size: 38, lineHeight: 1.35, token: "--text-heading" },
    { role: "subheading", font: "Noto Serif SC", weight: 400, size: 28, lineHeight: 1.45, token: "--text-subheading" },
    { role: "body-lg", font: "Noto Serif SC", weight: 400, size: 22, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", font: "Noto Serif SC", weight: 300, size: 18, lineHeight: 1.9, token: "--text-body" },
    { role: "label", font: "Noto Serif SC", weight: 500, size: 15, lineHeight: 1.7, tracking: "0.3em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 144, 192],
    maxWidth: 1000,
    sectionGap: 192,
    cardPadding: 40,
    elementGap: 32,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "seals", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Xuan Paper", value: "#f8f5f0", purpose: "页面底" },
    { level: 1, name: "Pale Ink", value: "rgba(196,185,168,0.30)", purpose: "淡墨区块" },
  ],
  elevation: [{ name: "None", value: "none — shadows break the ethereal mood" }],
  components: [
    {
      name: "Ink Rule",
      role: { zh: "墨线分隔（核心结构）", en: "The ink rule — the core structure" },
      construction: {
        zh: "1px、墨色 20%、横跨内容宽但并不贯穿全宽（左右各收进 15%），两端可以渐隐到透明。整条线必须足够细，像毛笔的收笔。",
        en: "1px at 20% ink, spanning most of the content width with 15% clear at each end, optionally fading to transparent at the tips. It must stay fine enough to read as a brush lifting.",
      },
    },
    {
      name: "Quiet Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 墨色 30% 描边、零圆角、衬线 15px、字距 0.3em、padding 14px 36px，无阴影。hover 时描边升到 60%、文字从 70% 升到 100%、并出现一层极淡的墨晕（0 0 12px 墨 8%，这是唯一允许的「阴影」）。过渡 600ms ease-out，绝不做位移。",
        en: "Transparent fill, a 1px ink border at 30%, zero radius, serif at 15px with 0.3em tracking, 14px 36px padding, no shadow. Hover raises the border to 60%, the text from 70% to full, and adds a faint ink bloom at 0 0 12px 8% — the only shadow this style permits. 600ms ease-out, and nothing translates.",
      },
      states: "hover: border 60%, ink bloom; no displacement",
    },
    {
      name: "Rice Paper Card",
      role: { zh: "内容卡与画卷块", en: "Content cards and scroll blocks" },
      construction: {
        zh: "宣纸色填充、零圆角、1px 墨色 15% 描边、内边距 40px，无阴影。标题 38px/400，正文 18px/300 行高 1.9。hover 时描边升到 35% 并向外渗开 2px（用 outline-offset 或第二层描边模拟墨在纸上洇开）。",
        en: "Xuan paper fill, zero radius, a 1px ink border at 15%, 40px padding, no shadow. Title at 38px/400, body at 18px/300 on 1.9 leading. Hover raises the border to 35% and bleeds it 2px outward, using an outline offset or a second stroke to imitate ink wicking into paper.",
      },
    },
    {
      name: "Seal Stamp",
      role: { zh: "印章", en: "The seal stamp" },
      construction: {
        zh: "32px 见方、4px 圆角、朱红或赭石填充（唯一的非灰颜色，只在此处出现）、内嵌 20px 的白色衬线单字，边缘做 1px 的残缺处理（用 mask 或伪元素切掉几个像素）。用于标记章节与「已读」。",
        en: "32px square on a 4px radius, filled vermilion or ochre — the only non-grey color, confined to this component — with a 20px white serif character inside and a 1px chipped edge cut by mask or pseudo element. It marks chapters and finished states.",
      },
    },
    {
      name: "Emptiness Block",
      role: { zh: "留白区块", en: "The emptiness block" },
      construction: {
        zh: "一个不承载任何内容的区块，高度 128px 到 320px，仅用于让前后的内容呼吸。在文档结构里它是真实存在的（不是 margin），因为在这套风格里留白本身就是内容。",
        en: "A block holding nothing at all, 128px to 320px tall, existing only to let what surrounds it breathe. It is a real element rather than a margin, because emptiness is content here.",
      },
    },
  ],
  imagery: {
    zh: "水墨画：远山、枯枝、孤舟、云气。必须有大量留白，墨色分层但不许鲜艳。允许书法题字。不使用照片、几何插画与饱和色彩。",
    en: "Ink painting: distant hills, bare branches, a lone boat, drifting cloud. It needs abundant emptiness and layered ink without saturation. Calligraphic inscription is welcome. No photography, geometric illustration or saturated color.",
  },
  layout: {
    zh: "上限 1000px、容器内边距 32px，区块间距 192px。构图借鉴卷轴：内容偏一侧，另一侧大面积留白，标题常竖排或偏上。禁止居中的密集排版。",
    en: "Capped at 1000px with 32px padding, sections 192px apart. The composition follows a handscroll: content sits to one side with large emptiness opposite, and headings often run vertically or sit high. Dense centred layouts are refused.",
  },
  dos: [
    { zh: "墨色为主，颜色全在灰调里", en: "Ink leads; every color stays inside the greys" },
    { zh: "边框 1px 且只有 20% 墨色", en: "Borders are 1px at 20% ink" },
    { zh: "留白是结构，不是余量", en: "Emptiness is structure, not leftover space" },
    { zh: "衬线字体，行高 1.9", en: "Serif type at 1.9 leading" },
    { zh: "交互只加深墨色与渗开边框", en: "Interaction deepens ink and bleeds borders" },
    { zh: "印章是唯一允许的彩色", en: "The seal is the only color allowed" },
  ],
  donts: [
    { zh: "不要用鲜艳饱和色彩", en: "No vivid saturated color" },
    { zh: "不要用厚重阴影", en: "No heavy shadows" },
    { zh: "不要用粗边框", en: "No thick borders" },
    { zh: "不要用装饰性动画与弹跳", en: "No decorative animation or bounce" },
    { zh: "不要用 spring 或 bounce 曲线", en: "Never use spring or bounce curves" },
    { zh: "不要在 hover 位移元素", en: "Never translate on hover" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2c2c2c",
      background: "#f8f5f0",
      accent: "#6b7b6e",
      ochre: "#a89279",
      pale: "#c4b9a8",
      border: "rgba(44,44,44,0.20)",
    },
    prompts: [
      {
        zh: "做一个水墨风卡片：宣纸色 #f8f5f0 填充、零圆角、1px rgba(44,44,44,0.15) 描边、内边距 40px、无阴影。标题 38px Noto Serif SC 400、色 #2c2c2c；正文 18px/300、行高 1.9。卡片下方放一条 1px rgba(44,44,44,0.2) 的墨线，左右各收进 15%。hover 时描边升到 rgba(44,44,44,0.35)、并向外渗开 2px，transition 600ms ease-out，元素不位移。页面底色 #f8f5f0，区块间距 192px 留白。",
        en: "Build an ink wash card: xuan paper #f8f5f0 fill, zero radius, a 1px rgba(44,44,44,0.15) border, 40px padding, no shadow. Title at 38px Noto Serif SC 400 in #2c2c2c; body at 18px/300 on 1.9 leading. A 1px rgba(44,44,44,0.2) ink rule sits below, inset 15% at each end. Hover raises the border to rgba(44,44,44,0.35) and bleeds it 2px outward over 600ms ease-out without translating. The page ground is #f8f5f0 with 192px of emptiness between sections.",
      },
    ],
  },
  similar: [
    { name: "Japanese Fresh", why: { zh: "同样讲「間」与留白，但日系清新用浅蓝与薄荷，水墨只有墨", en: "Both work in emptiness, though Japanese Fresh uses pale blue and mint while ink wash has only ink" } },
    { name: "Wabi-Sabi", why: { zh: "同为东方美学，但侘寂更强调残缺与时间，水墨更强调墨的浓淡", en: "Both Eastern aesthetics, though wabi-sabi emphasizes imperfection and time while ink wash emphasizes ink density" } },
  ],
  completeness: "full",
};
