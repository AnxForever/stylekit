import type { DesignSpec } from "../types";

export const japaneseFreshSpec: DesignSpec = {
  slug: "japanese-fresh",
  name: "日系清新风",
  nameEn: "Japanese Fresh",
  cover: "/styles/japanese-fresh.svg",
  theme: "light",
  northStar: {
    zh: "「間」是主要设计工具：留白比元素更重要，字重永远不到 400。",
    en: "Ma is the primary tool: whitespace outweighs elements, and no weight ever reaches 400.",
  },
  summary: {
    zh: "日系清新风建立在「間」（Ma）这个概念上：元素之间的空，和元素本身一样重要甚至更重要。所以它的首要参数是留白——区块之间 128 到 160px，元素之间 32px 起。第二条是「轻」：所有文字只用 200 与 300 字重，永不使用粗体，永不使用大写，因为大写在这套语言里是冒犯性的。第三条是「细」：边框只有 1px 的 30% 透明度，无可见阴影，元素像浮在纸上没有重量。动效 500ms，慢得像呼吸。",
    en: "Japanese Fresh rests on the idea of Ma: the space between elements matters as much as the elements, sometimes more. So whitespace comes first — 128 to 160px between sections, 32px or more between elements. Second comes lightness: every text run uses weight 200 or 300, never bold, and never uppercase, which reads as aggressive in this language. Third comes thinness: borders are 1px at 30% opacity, shadows are invisible, and elements float on the paper without weight. Motion runs 500ms, slow as breathing.",
  },
  colors: [
    {
      name: "淡蓝",
      nameEn: "Pale Blue",
      value: "#64b5f6",
      group: "brand",
      role: {
        zh: "唯一的彩色强调，用于链接与图标。必须小面积、低饱和地出现。",
        en: "The one colored accent, on links and icons — always small and quiet.",
      },
      token: "--color-pale-blue",
    },
    {
      name: "纸白",
      nameEn: "Paper",
      value: "#fafaf8",
      group: "surface",
      role: {
        zh: "页面画布。比纯白更柔和，接近和纸。",
        en: "The canvas, softer than white and close to washi paper.",
      },
      token: "--color-paper",
    },
    {
      name: "暖灰线",
      nameEn: "Warm Line",
      value: "#d4d4cf",
      group: "neutral",
      role: {
        zh: "所有分隔线。只在 30% 不透明度下使用，绝不用冷灰。",
        en: "Every divider, always at 30% opacity and never cool grey.",
      },
      token: "--color-warm-line",
    },
    {
      name: "薄荷",
      nameEn: "Mint",
      value: "#98d8c8",
      group: "accent",
      role: {
        zh: "植物与自然语义，用于图标底与标签。",
        en: "Plant and nature semantics, on icon beds and tags.",
      },
      token: "--color-mint",
    },
    {
      name: "樱粉",
      nameEn: "Sakura",
      value: "#ffb7c5",
      group: "accent",
      role: {
        zh: "季节性的柔和强调，出现频率最低。",
        en: "A seasonal soft emphasis, used least.",
      },
      token: "--color-sakura",
    },
    {
      name: "雾蓝",
      nameEn: "Mist Blue",
      value: "#b8d4e3",
      group: "accent",
      role: {
        zh: "信息与天空语义，比主色更浅一档。",
        en: "Information and sky semantics, one step lighter than the primary.",
      },
      token: "--color-mist-blue",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Hiragino Sans', 'PingFang SC', system-ui, sans-serif",
      weights: [200, 300],
      sizes: [12, 14, 16, 20, 26, 32],
      lineHeight: { display: 1.3, heading: 1.45, body: 1.9 },
      tracking: { display: "0.02em", label: "0.1em" },
      role: {
        zh: "全站唯一字体，只用 200 与 300。行高 1.9，字距微开，永不使用大写与粗体。",
        en: "The only face, in 200 and 300 only. Leading at 1.9 with slightly open tracking, and never uppercase or bold.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 200, size: 32, lineHeight: 1.3, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 300, size: 26, lineHeight: 1.4, token: "--text-heading" },
    { role: "subheading", weight: 300, size: 20, lineHeight: 1.5, token: "--text-subheading" },
    { role: "body-lg", weight: 300, size: 16, lineHeight: 1.9, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 14, lineHeight: 1.9, token: "--text-body" },
    { role: "label", weight: 300, size: 12, lineHeight: 1.6, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128, 160],
    maxWidth: 960,
    sectionGap: 160,
    cardPadding: 32,
    elementGap: 32,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "icons", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#fafaf8", purpose: "页面画布" },
    { level: 1, name: "Soft White", value: "#ffffff", purpose: "卡片（几乎与底同色）" },
  ],
  elevation: [
    { name: "None", value: "none — a 1px line at 30% separates" },
    { name: "Hover line", value: "1px solid rgba(212,212,207,0.60)" },
  ],
  components: [
    {
      name: "Quiet Link",
      role: { zh: "链接与次级行动", en: "Links and secondary actions" },
      construction: {
        zh: "无填充、无边框、14px/300、字距 0.02em，文字下方一条 1px 的暖灰线（30% 不透明度）作为唯一提示。hover 时线条升到 60%、文字转淡蓝，过渡 500ms。无位移、无缩放。",
        en: "No fill, no border, 14px/300 at 0.02em tracking, with a 1px warm-grey line at 30% beneath as the only cue. Hover raises the line to 60% and shifts the text to pale blue over 500ms. No translation, no scale.",
      },
      states: "hover: line 60%, text pale blue",
    },
    {
      name: "Ma Card",
      role: { zh: "内容卡与作品卡", en: "Content and work cards" },
      construction: {
        zh: "纸白填充（与页面几乎同色）、12px 圆角、1px 暖灰线 30%、内边距 32px，无阴影。标题 26px/300，正文 14px/300 行高 1.9。hover 时边框升到 60%，不加阴影不上浮。",
        en: "Paper fill (nearly the page color), 12px radius, a 1px warm line at 30%, 32px padding, no shadow. Title at 26px/300, body at 14px/300 on 1.9 leading. Hover raises the border to 60% with no shadow and no lift.",
      },
    },
    {
      name: "Line Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "透明底、仅底部 1px 暖灰线 30%、无左右边框、8px 圆角、padding 8px 4px、14px/300 字。聚焦时底线转淡蓝并保持 1px，不加外环、不改背景。",
        en: "Transparent fill with a 1px warm line at 30% along the bottom only, no side borders, 8px radius, 8px 4px padding at 14px/300. Focus turns the rule pale blue while keeping it at 1px, with no ring and no background change.",
      },
    },
    {
      name: "Botanical Accent",
      role: { zh: "植物线稿装饰", en: "Botanical line ornament" },
      construction: {
        zh: "单线条植物图形（枝叶、茎），stroke 1px、颜色暖灰 40% 或薄荷 50%，尺寸 48px 到 96px。置于卡片角落或区块之间作为呼吸点，绝不覆盖文字。单屏不超过两处。",
        en: "A single-stroke botanical form (leaf, stem) with a 1px stroke in 40% warm grey or 50% mint, sized 48px to 96px. It sits at a card corner or between blocks as a point of breath and never covers text. At most two per screen.",
      },
    },
    {
      name: "Breath Section",
      role: { zh: "区块容器", en: "Section container" },
      construction: {
        zh: "区块间距 160px，标题与正文之间 32px，正文行宽上限 32em。区块之间不加分隔线，只靠留白；需要分隔时用一条 1px 暖灰线 30%，横跨内容宽而非全宽。",
        en: "Sections sit 160px apart with 32px between heading and body, at a 32em measure. Sections divide by whitespace alone; where a rule is needed, it is 1px warm grey at 30% spanning the content width rather than the viewport.",
      },
    },
  ],
  imagery: {
    zh: "自然光下的静物：一枝花、一碗水、和纸纹理、竹影。低饱和、留白极多、可只占画面三分之一。不使用高对比摄影、人物特写与装饰插画。",
    en: "Still life in natural light: a single stem, a bowl of water, washi texture, bamboo shadow. Low saturation with abundant empty space, and the subject may occupy only a third of the frame. No high-contrast photography, close-up people or decorative illustration.",
  },
  layout: {
    zh: "上限 960px、容器内边距 32px，区块间距 160px。单栏偏左或非对称双栏，右侧常留大片空白。元素之间至少 32px，标题上下各 48px。整页的空白占比目标超过 60%。",
    en: "Capped at 960px with 32px padding, sections 160px apart. One column set off-centre or an asymmetric pair, with large emptiness on the right. Elements keep 32px between them and headings reserve 48px above and below. The target is over sixty percent empty page.",
  },
  dos: [
    { zh: "字重只用 200 与 300", en: "Weights only at 200 and 300" },
    { zh: "永不使用大写", en: "Never use uppercase" },
    { zh: "留白占页面的六成以上", en: "Keep over sixty percent of the page empty" },
    { zh: "边框只有 1px 的 30%", en: "Borders are 1px at 30%" },
    { zh: "无可见阴影", en: "No visible shadow" },
    { zh: "过渡 500ms，慢如呼吸", en: "Transitions run 500ms, slow as breathing" },
  ],
  donts: [
    { zh: "不要用粗体或半粗", en: "No bold or semibold" },
    { zh: "不要用大写文字", en: "No uppercase text" },
    { zh: "不要用 2px 以上边框", en: "No border at 2px or above" },
    { zh: "不要用可见阴影", en: "No visible shadows" },
    { zh: "不要用深色背景", en: "No dark grounds" },
    { zh: "不要用快于 200ms 的过渡", en: "No transition under 200ms" },
  ],
  promptGuide: {
    quickColors: {
      text: "#4a4a46",
      background: "#fafaf8",
      accent: "#64b5f6",
      mint: "#98d8c8",
      sakura: "#ffb7c5",
      border: "rgba(212,212,207,0.30)",
    },
    prompts: [
      {
        zh: "做一个日系清新卡片：背景 #fafaf8、12px 圆角、1px rgba(212,212,207,0.3) 描边、内边距 32px、无阴影。标题 26px/300 #4a4a46、字距 0.02em；正文 14px/300、行高 1.9。hover 时描边升到 rgba(212,212,207,0.6)，不位移不加阴影，transition 500ms。卡片之间留 160px 空白。",
        en: "Build a Japanese Fresh card: background #fafaf8, 12px radius, a 1px rgba(212,212,207,0.3) border, 32px padding, no shadow. Title at 26px/300 in #4a4a46 with 0.02em tracking; body at 14px/300 on 1.9 leading. Hover raises the border to rgba(212,212,207,0.6) with no translation and no shadow, over 500ms. Leave 160px of empty space between cards.",
      },
    ],
  },
  similar: [
    { name: "Wabi-Sabi", why: { zh: "同源美学，但那边更强调残缺、材质与时间痕迹", en: "Shares the aesthetic root, though wabi-sabi emphasises imperfection, material and time" } },
    { name: "Zen Garden", why: { zh: "同样的留白与静，但禅园更图形化", en: "Same emptiness and stillness, though zen garden is more graphic" } },
  ],
  completeness: "full",
};
