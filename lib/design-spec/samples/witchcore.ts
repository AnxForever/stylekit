import type { DesignSpec } from "../types";

export const witchcoreSpec: DesignSpec = {
  slug: "witchcore",
  name: "巫术核心",
  nameEn: "Witchcore",
  cover: "/styles/witchcore.svg",
  theme: "dark",
  northStar: {
    zh: "月相、塔罗、紫水晶与金符文：一次摆在深夜桌面上的占卜。",
    en: "Moon phases, tarot, amethyst and gold runes — a reading laid out late at night.",
  },
  summary: {
    zh: "巫术核心是神秘学美学：深紫到午夜黑的垂直渐变作底（#4a1942 到 #0d0b14），金色符文文字（#c9a74e）带 0 0 8px 的微光，边框是 30% 的金色半透明细线、hover 时升到 60%，卡片用 #0d0b14 的 80% 加轻微模糊营造朦胧感，紫水晶（#7b68ae）作次级信息色，背景点缀星尘（radial-gradient 的小光点）。衬线字体加宽字距，让文字有仪式感。月相、塔罗牌、水晶与草药是它的图形语汇。",
    en: "Witchcore is occult aesthetics: a vertical gradient from deep violet to midnight (#4a1942 into #0d0b14), gold rune text (#c9a74e) under a 0 0 8px shimmer, borders at 30% gold hairline rising to 60% on hover, cards on 80% #0d0b14 with a slight blur for haze, amethyst (#7b68ae) as the secondary information tone, and stardust — small radial-gradient lights — scattered behind. Serif type on wide tracking gives the words a ritual cadence, and moon phases, tarot, crystal and herb are the graphic vocabulary.",
  },
  colors: [
    {
      name: "深紫",
      nameEn: "Deep Violet",
      value: "#4a1942",
      group: "surface",
      role: {
        zh: "渐变顶端。黄昏的紫，往午夜黑过渡。",
        en: "The gradient's top — dusk violet falling into midnight.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "午夜",
      nameEn: "Midnight",
      value: "#0d0b14",
      group: "surface",
      role: {
        zh: "渐变底端与卡片底。带紫的近黑。",
        en: "The gradient's bottom and the card ground — a violet near-black.",
      },
      token: "--color-midnight",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#c9a74e",
      group: "accent",
      role: {
        zh: "符文、边框与所有发光。仪式感的来源。",
        en: "Runes, borders and every glow — the source of the ritual feel.",
      },
      token: "--color-gold",
    },
    {
      name: "紫水晶",
      nameEn: "Amethyst",
      value: "#7b68ae",
      group: "accent",
      role: {
        zh: "次级信息与月光语义。",
        en: "Secondary information and moonlight.",
      },
      token: "--color-amethyst",
    },
    {
      name: "苔绿",
      nameEn: "Herb Green",
      value: "#3d8b6e",
      group: "accent",
      role: {
        zh: "草药与「生长」的语义，出现频率较低。",
        en: "Herbs and growth semantics, used less often.",
      },
      token: "--color-herb-green",
    },
    {
      name: "亮绿",
      nameEn: "Sprout",
      value: "#6bc15e",
      group: "accent",
      role: {
        zh: "最亮的一支，只在草药细节与「新增」标记上出现。",
        en: "The brightest tone, only on herb detail and new marks.",
      },
      token: "--color-sprout",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [14, 17, 21, 28, 36, 48],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.75 },
      tracking: { display: "0.04em", label: "0.24em" },
      role: {
        zh: "衬线体，标题加 0.04em 字距、标签加 0.24em。宽字距让文字像被念出来的咒语。",
        en: "Serif type: headings at 0.04em, labels at 0.24em. The wide tracking makes the words feel spoken aloud.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 48, lineHeight: 1.2, tracking: "0.04em", token: "--text-display" },
    { role: "heading", weight: 600, size: 36, lineHeight: 1.25, tracking: "0.04em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 28, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 21, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 17, lineHeight: 1.75, token: "--text-body" },
    { role: "label", weight: 600, size: 14, lineHeight: 1.55, tracking: "0.24em", token: "--text-label" },
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
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "moons", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Sky Gradient", value: "linear-gradient(#4a1942, #0d0b14)", purpose: "页面底" },
    { level: 1, name: "Haze Card", value: "rgba(13,11,20,0.80)", purpose: "卡片" },
    { level: 2, name: "Gold Ground", value: "rgba(201,167,78,0.12)", purpose: "符文底" },
  ],
  elevation: [
    { name: "Gold shimmer", value: "0 0 8px rgba(201,167,78,0.40)" },
    { name: "Gold bloom", value: "0 0 24px rgba(201,167,78,0.30)" },
  ],
  components: [
    {
      name: "Haze Card",
      role: { zh: "朦胧卡片（核心组件）", en: "The hazy card — the core component" },
      construction: {
        zh: "午夜 80% 填充、8px 模糊、12px 圆角、1px 金 30% 描边、内边距 32px。标题 36px/600 金并带 0 0 8px 金字微光，正文 17px 白 80%。hover 时描边升到 60%、金字光晕扩到 24px。",
        en: "80% midnight fill with an 8px blur, 12px radius, a 1px gold border at 30%, 32px padding. The title runs 36px/600 in gold under a 0 0 8px shimmer, body at 17px in 80% white. Hover raises the border to 60% and the gold bloom to 24px.",
      },
    },
    {
      name: "Rune Label",
      role: { zh: "符文标签", en: "The rune label" },
      construction: {
        zh: "透明底、1px 金 30% 描边、8px 圆角、14px/600、字距 0.24em、padding 4px 12px，文字金色带 0 0 8px 微光。左右可各放一个 6px 的金色菱形作为符文分隔。",
        en: "Transparent fill, a 1px gold border at 30%, 8px radius, 14px/600 at 0.24em, 4px 12px padding, with gold text under a 0 0 8px shimmer. A 6px gold diamond may sit at each end as a rune mark.",
      },
    },
    {
      name: "Moon Phase Row",
      role: { zh: "月相装饰", en: "The moon phase row" },
      construction: {
        zh: "一排 5 到 8 个 16px 的月相图标（新月到满月），间距 12px，颜色金或紫水晶，当前相带 0 0 12px 微光。它既是装饰也是「现在处于哪一阶段」的指示，用于章节与状态。",
        en: "A row of five to eight 16px moon phases from new to full, 12px apart, in gold or amethyst, with the current phase carrying a 0 0 12px shimmer. It decorates and also indicates which stage is active, on chapters and status.",
      },
    },
    {
      name: "Tarot Frame",
      role: { zh: "塔罗牌卡片", en: "The tarot card" },
      construction: {
        zh: "竖向 2:3 比例、12px 圆角、1px 金 40% 描边、内边距 20px，午夜 90% 填充。顶部与底部各一条 1px 金线内框，中央放图形（月相、水晶、草药线稿）。hover 时卡片上浮 4px、金线描边升到 80%、并让星尘在 600ms 内亮起。",
        en: "A 2:3 portrait on a 12px radius, a 1px gold border at 40%, 20px padding, filled 90% midnight. A 1px gold rule frames top and bottom with a figure between — a moon, a crystal, herb line work. Hover lifts the card 4px, raises the gold to 80% and brightens the stardust over 600ms.",
      },
    },
    {
      name: "Stardust Bed",
      role: { zh: "星尘背景", en: "The stardust bed" },
      construction: {
        zh: "在渐变底上叠 20 到 40 个 1 到 2px 的白色或淡金光点（radial-gradient 或 box-shadow 多重投影），不透明度 20% 到 50%，分布不均。可做极慢的闪烁（每点周期 4 到 8 秒、错峰），但绝不做快速闪烁。",
        en: "Twenty to forty 1 to 2px points in white or pale gold (a radial gradient or stacked box-shadows) at 20% to 50% opacity, unevenly spread over the gradient. They may twinkle very slowly — four to eight seconds each, staggered — but never flash.",
      },
    },
  ],
  imagery: {
    zh: "神秘学图像：塔罗牌面、月相、水晶、草药、烛光、星图。必须暗调、金紫配色、有朦胧感。不使用明亮摄影、现代插画与高饱和图像。",
    en: "Occult imagery: tarot faces, moon phases, crystals, herbs, candlelight, star charts. Dark in tone, gold and violet in color, and hazy in finish. No bright photography, modern illustration or saturated imagery.",
  },
  layout: {
    zh: "上限 1040px、容器内边距 24px，区块间距 112px。允许元素轻微旋转（-1 到 1 度）与错位，像牌被摊开。留白宽松，星尘填补空白但不承载内容。",
    en: "Capped at 1040px with 24px padding, sections 112px apart. Elements may rotate between -1 and 1 degree and offset slightly, like cards laid out. Whitespace stays generous, with stardust filling it without carrying content.",
  },
  dos: [
    { zh: "深紫到午夜黑的垂直渐变", en: "Vertical gradient from deep violet to midnight" },
    { zh: "金色符文配 8px 微光", en: "Gold runes under an 8px shimmer" },
    { zh: "边框 30% 金，hover 升到 60%", en: "Borders at 30% gold, rising to 60% on hover" },
    { zh: "卡片 80% 午夜加轻微模糊", en: "Cards at 80% midnight with a slight blur" },
    { zh: "衬线加宽字距", en: "Serif on wide tracking" },
    { zh: "月相与塔罗作图形语汇", en: "Moon phases and tarot carry the graphics" },
  ],
  donts: [
    { zh: "不要用明亮摄影", en: "No bright photography" },
    { zh: "不要用高饱和图像", en: "No saturated imagery" },
    { zh: "不要让星尘快速闪烁", en: "Never let stardust flash quickly" },
    { zh: "不要用粗边框", en: "No thick borders" },
    { zh: "不要用现代无衬线作标题", en: "No modern sans on headings" },
    { zh: "不要让星尘承载内容", en: "Never let stardust carry content" },
  ],
  promptGuide: {
    quickColors: {
      text: "#c9a74e",
      background: "#0d0b14",
      violet: "#4a1942",
      amethyst: "#7b68ae",
      herb: "#3d8b6e",
      gold: "#c9a74e",
    },
    prompts: [
      {
        zh: "做一个巫术核心卡片：背景 rgba(13,11,20,0.8) 加 8px 模糊、12px 圆角、1px rgba(201,167,78,0.3) 描边、内边距 32px。标题 36px/600 Cormorant Garamond、色 #c9a74e、text-shadow 0 0 8px rgba(201,167,78,0.4)、字距 0.04em；正文 17px、行高 1.75、色 rgba(255,255,255,0.8)。上方放一排 16px 的月相图标（金色，当前相带 0 0 12px 微光），间距 12px。页面底用 linear-gradient(#4a1942, #0d0b14)，叠 30 个 1-2px 的淡金光点（不透明度 30%）作星尘。hover 时描边升到 rgba(201,167,78,0.6)。",
        en: "Build a witchcore card: rgba(13,11,20,0.8) fill with an 8px blur, 12px radius, a 1px rgba(201,167,78,0.3) border, 32px padding. The title runs 36px/600 Cormorant Garamond in #c9a74e with text-shadow 0 0 8px rgba(201,167,78,0.4) at 0.04em tracking; body at 17px on 1.75 leading in rgba(255,255,255,0.8). A row of 16px gold moon phases sits above, 12px apart, with the current phase under a 0 0 12px shimmer. The page ground is linear-gradient(#4a1942, #0d0b14) carrying thirty 1–2px pale gold points at 30% opacity as stardust. Hover raises the border to rgba(201,167,78,0.6).",
      },
    ],
  },
  similar: [
    { name: "Magic Circle", why: { zh: "同为神秘学，但魔法阵是几何阵法，巫术核心是塔罗与草药", en: "Both occult, though magic circle is geometric sigil while witchcore is tarot and herb" } },
    { name: "Dark Academia", why: { zh: "同为暗色古典，但暗黑学院无超自然元素", en: "Both dark and classical, though dark academia carries nothing supernatural" } },
  ],
  completeness: "full",
};
