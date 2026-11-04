import type { DesignSpec } from "../types";

export const darkAcademiaSpec: DesignSpec = {
  slug: "dark-academia",
  name: "暗黑学院风",
  nameEn: "Dark Academia",
  cover: "/styles/dark-academia.svg",
  theme: "dark",
  northStar: {
    zh: "深棕皮革、墨绿书脊、暗金烫印：一间只在夜里开放的图书馆。",
    en: "Brown leather, green spines, gold tooling — a library that only opens at night.",
  },
  summary: {
    zh: "暗黑学院风来自古典校园与旧书的质感：深棕、墨绿、暗金三色构成主调，奶白作纸面，衬线字体承担全部文字，字距放开到 0.15em 像烫金。它的节奏极慢——过渡用 700 到 1000ms 的 ease-in-out，因为这套语言的参照是烛光与翻页，不是屏幕。卡片用内阴影制造纸面凹陷的光晕（inset 0 0 35px 暗金 5%），hover 时把光晕扩到 60px。禁止霓虹、禁止现代科技感、禁止花哨动画、禁止冷灰蓝。",
    en: "Dark Academia draws on the texture of old campuses and old books: deep brown, forest green and antique gold set the key, cream stands in for paper, serif type carries every word, and tracking opens to 0.15em like gold tooling. Its tempo is very slow — transitions run 700 to 1000ms ease-in-out, because the reference is candlelight and a turning page rather than a screen. Cards use an inner shadow to suggest paper's recessed glow (inset 0 0 35px at 5% gold), widening to 60px on hover. Neon, modern tech surfaces, flashy animation and cold blue-greys are all refused.",
  },
  colors: [
    {
      name: "深棕",
      nameEn: "Deep Brown",
      value: "#3d2b1f",
      group: "brand",
      role: {
        zh: "页头、主按钮与最深区块。皮革书封的颜色。",
        en: "Headers, primary buttons and the darkest blocks — the color of a leather binding.",
      },
      token: "--color-deep-brown",
    },
    {
      name: "墨绿",
      nameEn: "Forest",
      value: "#2d4a3e",
      group: "surface",
      role: {
        zh: "次级区块与对比面。像旧书脊的布面。",
        en: "Secondary blocks and contrasting panels, like the cloth of an old spine.",
      },
      token: "--color-forest",
    },
    {
      name: "暗金",
      nameEn: "Antique Gold",
      value: "#8b7355",
      group: "accent",
      role: {
        zh: "描边、烫印与次级强调。所有金属感来自它。",
        en: "Strokes, tooling and secondary emphasis — all the metal comes from this.",
      },
      token: "--color-antique-gold",
    },
    {
      name: "奶白",
      nameEn: "Cream",
      value: "#f5f0e1",
      group: "surface",
      role: {
        zh: "纸面与卡片底。略带黄的旧纸色。",
        en: "Paper and card grounds — a yellowed old-stock white.",
      },
      token: "--color-cream",
    },
    {
      name: "焦棕",
      nameEn: "Umber",
      value: "#5c4033",
      group: "accent",
      role: {
        zh: "hover 深化与压印效果，比深棕更暗。",
        en: "Hover deepening and debossing, darker than deep brown.",
      },
      token: "--color-umber",
    },
    {
      name: "苔绿",
      nameEn: "Moss",
      value: "#647f53",
      group: "accent",
      role: {
        zh: "成功与「在读」状态，来自旧书页边缘的霉绿。",
        en: "Success and in-progress states, borrowed from the green at a page's edge.",
      },
      token: "--color-moss",
    },
  ],
  fonts: [
    {
      family: "EB Garamond",
      substitute: "Garamond, Georgia, 'Songti SC', serif",
      weights: [400, 500, 600],
      sizes: [14, 16, 19, 24, 32, 44],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.8 },
      tracking: { display: "0.02em", label: "0.15em" },
      role: {
        zh: "全站唯一字体。正文行高 1.8、字距微开，标题加 0.15em 的烫金字距。",
        en: "The only face. Body at 1.8 leading with slightly open tracking; headings take 0.15em like gold tooling.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 44, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 600, size: 32, lineHeight: 1.25, tracking: "0.02em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 24, lineHeight: 1.35, tracking: "0.02em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 19, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.8, token: "--text-body" },
    { role: "label", weight: 500, size: 14, lineHeight: 1.5, tracking: "0.15em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1080,
    sectionGap: 128,
    cardPadding: 40,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Brown", value: "#3d2b1f", purpose: "页面底" },
    { level: 1, name: "Forest", value: "#2d4a3e", purpose: "次级区块" },
    { level: 2, name: "Cream", value: "#f5f0e1", purpose: "卡片与纸面" },
  ],
  elevation: [
    { name: "Paper inset", value: "inset 0 0 35px rgba(139,115,85,0.05), 0 4px 14px rgba(61,43,31,0.05)" },
    { name: "Paper hover", value: "inset 0 0 60px rgba(139,115,85,0.14), 0 8px 24px rgba(61,43,31,0.10)" },
    { name: "Button", value: "0 4px 10px rgba(61,43,31,0.20)" },
  ],
  components: [
    {
      name: "Leather Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "深棕填充、奶白 85% 文字、1px 暗金 45% 描边、2px 圆角、衬线 14px、字距 0.15em、padding 16px 40px，阴影 0 4px 10px 棕 20%。hover 时填充转焦棕、文字升到 100%、描边升到 80%、阴影扩到 18px；按下再暗一档。过渡 700ms ease-in-out。",
        en: "Deep brown fill, cream text at 85%, a 1px antique gold border at 45%, 2px radius, serif at 14px with 0.15em tracking, 16px 40px padding, shadow 0 4px 10px at 20% brown. Hover moves the fill to umber, the text to full, the border to 80% and the shadow to 18px; press darkens one more step. 700ms ease-in-out.",
      },
      sizes: "padding 16px 40px; label 14px",
      states: "hover: umber fill, deeper shadow; active: darker still",
    },
    {
      name: "Paper Card",
      role: { zh: "内容卡与书页块", en: "Content cards and page blocks" },
      construction: {
        zh: "奶白填充、2px 圆角、1px 暗金 25% 描边、内边距 40px，内阴影 0 0 35px 暗金 5% 制造纸面光晕。hover 时描边升到 55%、内阴影扩到 60px 且加深到 14%、右上角出现一层 20% 的暖黄径向光（radial-gradient 从右上）。过渡 1000ms ease-in-out。",
        en: "Cream fill, 2px radius, a 1px antique gold border at 25%, 40px padding, and an inner shadow of 0 0 35px at 5% gold for the paper glow. Hover raises the border to 55%, widens the inner shadow to 60px at 14%, and reveals a 20% warm radial light from the top-right corner. 1000ms ease-in-out.",
      },
    },
    {
      name: "Gilt Rule",
      role: { zh: "烫金分隔线", en: "The gilt divider" },
      construction: {
        zh: "1px 暗金 40% 的横线，两端各收进 24px，中央可放一个 8px 的菱形装饰。用于区块之间的分隔，比留白更有书页感。",
        en: "A 1px antique gold rule at 40%, inset 24px at each end, optionally carrying an 8px diamond at its centre. It separates sections with more book-page feel than whitespace alone.",
      },
    },
    {
      name: "Study Input",
      role: { zh: "表单与检索输入", en: "Forms and search inputs" },
      construction: {
        zh: "奶白 90% 填充、2px 圆角、1px 暗金 30% 描边、padding 14px 18px、16px 衬线。占位符焦棕 50%。聚焦时描边转暗金 80% 并加上 0 0 0 2px 的暗金 15% 外环。",
        en: "90% cream fill, 2px radius, a 1px antique gold border at 30%, 14px 18px padding at 16px serif. The placeholder sits at 50% umber. Focus turns the border to 80% gold and adds a 2px ring at 15%.",
      },
    },
    {
      name: "Wax Seal",
      role: { zh: "印章式标记与徽标", en: "Wax-seal marks and badges" },
      construction: {
        zh: "48px 的圆形印章，填深棕或墨绿，内嵌 24px 的衬线单字母，边缘用 2px 暗金 40% 描边，外带 0 8px 16px 棕 30% 的短阴影。用于章节标记与「已读完」状态。",
        en: "A 48px circular seal filled deep brown or forest with a 24px serif initial inside, a 2px antique gold border at 40%, and a short 0 8px 16px shadow at 30% brown. It marks chapters and finished states.",
      },
    },
  ],
  imagery: {
    zh: "古典静物与建筑摄影：旧书、烛台、拱窗、石廊。必须暖调、低饱和、有明显的暗部。允许把照片处理成棕褐单色。不使用现代城市、科技产品与高饱和图像。",
    en: "Classical still life and architecture: old books, candlesticks, arched windows, stone corridors. Warm, low-saturation, with clear shadow. A photo may be graded to sepia. No modern cities, tech products or saturated imagery.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 128px。允许非对称两栏（黄金比 1:1.618）与居中对称两种，但同一页只用一种。整页以深棕为底，纸面卡片浮在上面。",
    en: "Capped at 1080px with 24px padding, sections 128px apart. Either an asymmetric pair at the golden ratio (1:1.618) or centred symmetry works, but one page uses one. Deep brown is the ground with paper cards floating above.",
  },
  dos: [
    { zh: "深棕、墨绿、暗金三色主调", en: "Key on deep brown, forest and antique gold" },
    { zh: "衬线字体承担全部文字", en: "Serif carries every word" },
    { zh: "过渡 700 到 1000ms ease-in-out", en: "Transitions run 700 to 1000ms ease-in-out" },
    { zh: "卡片用内阴影做纸面光晕", en: "Cards use an inner shadow for the paper glow" },
    { zh: "字距放到 0.15em 像烫金", en: "Open tracking to 0.15em like gold tooling" },
    { zh: "奶白作纸面", en: "Cream stands in for paper" },
  ],
  donts: [
    { zh: "不要用鲜艳的霓虹配色", en: "No vivid neon palettes" },
    { zh: "不要用现代科技感设计", en: "No modern tech surfaces" },
    { zh: "不要用过于花哨的动画", en: "No flashy animation" },
    { zh: "不要用冰冷的灰蓝调", en: "No cold blue-greys" },
    { zh: "不要用小圆角以外的夸张弧线", en: "No exaggerated curves beyond the tiny radius" },
    { zh: "不要用快于 700ms 的过渡", en: "No transition under 700ms" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f5f0e1",
      background: "#3d2b1f",
      card: "#f5f0e1",
      accent: "#8b7355",
      forest: "#2d4a3e",
      umber: "#5c4033",
    },
    prompts: [
      {
        zh: "做一个暗黑学院风卡片：奶白 #f5f0e1 填充、2px 圆角、1px rgba(139,115,85,0.25) 描边、内边距 40px、box-shadow inset 0 0 35px rgba(139,115,85,0.05), 0 4px 14px rgba(61,43,31,0.05)。标题 32px 衬线、字距 0.02em、色 #3d2b1f；正文 16px 衬线、行高 1.8。hover 时描边升到 rgba(139,115,85,0.55)、内阴影扩到 60px，transition 1000ms ease-in-out。页面底色 #3d2b1f。",
        en: "Build a dark academia card: cream #f5f0e1 fill, 2px radius, a 1px rgba(139,115,85,0.25) border, 40px padding, box-shadow inset 0 0 35px rgba(139,115,85,0.05) and 0 4px 14px rgba(61,43,31,0.05). The title runs 32px serif at 0.02em in #3d2b1f; body at 16px serif on 1.8 leading. Hover raises the border to rgba(139,115,85,0.55) and widens the inner shadow to 60px over 1000ms ease-in-out. The page ground is #3d2b1f.",
      },
    ],
  },
  similar: [
    { name: "Art Deco", why: { zh: "同样用暗金与深底，但装饰艺术是几何与对称，暗黑学院是书页与皮革", en: "Both use antique gold on dark, though Art Deco is geometry while this is paper and leather" } },
    { name: "Retro Vintage", why: { zh: "同为年代感，但复古怀旧是亮底印刷，暗黑学院是暗底书房", en: "Both period pieces, though retro vintage is light print while this is a dark study" } },
  ],
  completeness: "full",
};
