import type { DesignSpec } from "../types";

export const asymmetricGridSpec: DesignSpec = {
  slug: "asymmetric-grid",
  name: "非对称网格",
  nameEn: "Asymmetric Grid",
  cover: "/styles/asymmetric-grid.svg",
  theme: "light",
  northStar: {
    zh: "列宽不相等、元素互相压着：张力来自失衡，而不是来自装饰。",
    en: "Unequal columns, elements pressing on each other — the tension comes from imbalance, not ornament.",
  },
  summary: {
    zh: "非对称网格用不等的列宽制造张力：grid-template-columns 写成 1fr 2fr 0.6fr 这样的比例，元素用 -translate 与 z-index 互相压着，字号层级拉开极大的差距（小到 12px、大到 120px），阴影用硬边偏移强化「物理剥离感」。它的禁令是可操作的质量线——不许所有列宽相等、不许元素整齐对齐毫无变化、不许忽略移动端、不许过度杂乱失去可读性、不许所有元素大小相近。前四条给出张力，后两条防止张力变成噪音。",
    en: "Asymmetric Grid manufactures tension from unequal columns: grid-template-columns written as ratios like 1fr 2fr 0.6fr, elements pressing on each other through negative translate and z-index, type sizes pulled far apart (12px up to 120px), and hard offset shadows that reinforce a sense of physical separation. Its prohibitions are quality gates — no equal columns, no tidy uniform alignment, no ignoring mobile, no chaos that destroys readability, and no elements all at similar sizes. The first four supply the tension; the last two keep tension from becoming noise.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#0f0f0f",
      group: "brand",
      role: {
        zh: "文字、色块与硬阴影。结构的全部重量。",
        en: "Text, blocks and hard shadows — all the structural weight.",
      },
      token: "--color-ink",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "画布。纯白让色块与阴影都更锐利。",
        en: "The canvas, kept pure so blocks and shadows stay sharp.",
      },
      token: "--color-white",
    },
    {
      name: "张力红",
      nameEn: "Tension Red",
      value: "#ff3366",
      group: "accent",
      role: {
        zh: "主强调：最大那块色与最粗的那个标题。",
        en: "The primary emphasis on the largest block and the heaviest headline.",
      },
      token: "--color-tension-red",
    },
    {
      name: "信号青",
      nameEn: "Signal Cyan",
      value: "#00d4ff",
      group: "accent",
      role: {
        zh: "第二强调，与红形成冷暖对位。",
        en: "The second emphasis, setting cool against the red.",
      },
      token: "--color-signal-cyan",
    },
    {
      name: "警示黄",
      nameEn: "Alert Yellow",
      value: "#ffcc00",
      group: "accent",
      role: {
        zh: "高亮与标签底，用于让元素从重叠中跳出来。",
        en: "Highlights and label grounds, pulling an element out of an overlap.",
      },
      token: "--color-alert-yellow",
    },
    {
      name: "锈橙",
      nameEn: "Rust",
      value: "#b45700",
      group: "accent",
      role: {
        zh: "最暗的一支强调，用于压在黄色上的文字。",
        en: "The darkest accent, for text on yellow.",
      },
      token: "--color-rust",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 700, 900],
      sizes: [12, 16, 24, 40, 72, 120],
      lineHeight: { display: 0.95, heading: 1.05, body: 1.55 },
      tracking: { display: "-0.03em", label: "0.06em" },
      role: {
        zh: "全站唯一字体。字号层级必须拉开——12px 与 120px 同时出现在一屏是常态。",
        en: "The only face. The size ladder must open wide — 12px and 120px on one screen is normal here.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 120, lineHeight: 0.95, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 72, lineHeight: 1, tracking: "-0.03em", token: "--text-heading-lg" },
    { role: "heading", weight: 700, size: 40, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 24, lineHeight: 1.2, token: "--text-subheading" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1440,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "画布" },
    { level: 1, name: "Ink Block", value: "#0f0f0f", purpose: "深色块" },
    { level: 2, name: "Red Block", value: "#ff3366", purpose: "强调块" },
  ],
  elevation: [
    { name: "Hard offset", value: "6px 6px 0 #0f0f0f" },
    { name: "Hard offset color", value: "6px 6px 0 #ff3366" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Uneven Grid",
      role: { zh: "不等宽网格（核心结构）", en: "The uneven grid — the core structure" },
      construction: {
        zh: "grid-template-columns 用 1fr 2.2fr 0.6fr 或 2fr 1fr 1.4fr 这类比例，绝不出现三等分。12 栏基准、间距 16px，但每行的列组合可以不同。移动端降为单列并取消负位移。",
        en: "grid-template-columns uses ratios like 1fr 2.2fr 0.6fr or 2fr 1fr 1.4fr — never an even three-way split. The base is twelve columns with 16px gaps, while each row may combine them differently. Mobile drops to one column and removes the negative offsets.",
      },
    },
    {
      name: "Overlap Block",
      role: { zh: "重叠色块", en: "The overlapping block" },
      construction: {
        zh: "一个填色块用 -translate-x-8 与 -translate-y-4 压到相邻元素上，z-index 显式设定（相邻两层差 10）。零圆角，硬阴影 6px 6px 0 墨或红。重叠量控制在 16 到 48px，超过就吃掉内容。",
        en: "A filled block offsets by -translate-x-8 and -translate-y-4 onto its neighbour with an explicit z-index (ten apart per layer). Zero radius, hard shadow 6px 6px 0 in ink or red. Overlap stays between 16 and 48px; beyond that it eats the content.",
      },
    },
    {
      name: "Contrast Headline",
      role: { zh: "极端对比标题", en: "The extreme-contrast headline" },
      construction: {
        zh: "120px/900、行高 0.95、字距 -0.03em，与其下方的 12px 标签形成 10 倍的尺寸差。允许标题跨越两列并压在其他元素上，但文字必须始终在最上层且保持可读。",
        en: "120px/900 at 0.95 leading and -0.03em, sitting beside a 12px label for a tenfold size gap. The headline may span two columns and press on other elements as long as type stays on top and readable.",
      },
    },
    {
      name: "Label Chip",
      role: { zh: "小标签", en: "The small label chip" },
      construction: {
        zh: "警示黄填充、墨色文字、零圆角、12px/700、字距 0.06em、padding 4px 10px。它常被压在重叠区的边缘，作为「这块是什么」的说明，与大标题形成尺寸反差。",
        en: "Alert yellow fill, ink text, zero radius, 12px/700 at 0.06em, 4px 10px padding. It often sits at an overlap edge explaining what the block is, forming a size contrast with the huge headline.",
      },
    },
    {
      name: "Edge Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "张力红填充、白字、零圆角、16px/700、padding 14px 28px，硬阴影 6px 6px 0 墨。hover 时阴影换到信号青；按下时位移 6px 6px 且阴影归零。过渡 120ms linear。",
        en: "Tension red fill, white text, zero radius, 16px/700, 14px 28px padding, hard shadow 6px 6px 0 in ink. Hover swaps the shadow to signal cyan; press translates 6px 6px and zeroes it. 120ms linear.",
      },
    },
  ],
  imagery: {
    zh: "图像可以尺寸悬殊：一张横跨三列的巨图配一张 120px 的小图。允许裁切与局部特写。不使用等尺寸网格与整齐对齐的画廊式排列。",
    en: "Images may vary wildly in size: one spanning three columns beside a 120px thumbnail. Crops and detail shots are welcome. No equal-size grid or tidily aligned gallery arrangement.",
  },
  layout: {
    zh: "上限 1440px、容器内边距 24px，区块间距 96px。每行的列组合都要不同，允许负位移与重叠。移动端降为单列、取消重叠、字号层级压缩到 4 倍以内。",
    en: "Capped at 1440px with 24px padding, sections 96px apart. Every row combines columns differently, with negative offsets and overlap permitted. Mobile collapses to one column, removes the overlap and compresses the size ladder to within four times.",
  },
  dos: [
    { zh: "列宽必须不相等", en: "Column widths must differ" },
    { zh: "用负位移与 z-index 做重叠", en: "Overlap with negative offsets and z-index" },
    { zh: "字号层级拉开到 10 倍", en: "Pull the size ladder out to ten times" },
    { zh: "硬边偏移阴影强化剥离感", en: "Hard offset shadows reinforce the separation" },
    { zh: "移动端降单列并取消重叠", en: "Collapse to one column and drop overlap on mobile" },
    { zh: "重叠量控制在 16 到 48px", en: "Keep overlap between 16 and 48px" },
  ],
  donts: [
    { zh: "不要让列宽完全相等", en: "Never make columns equal" },
    { zh: "不要让元素整齐对齐毫无变化", en: "Never align everything tidily" },
    { zh: "不要忽略移动端响应式", en: "Do not skip mobile adaptation" },
    { zh: "不要杂乱到失去可读性", en: "Never let it become unreadable" },
    { zh: "不要让元素大小相近", en: "Do not keep elements at similar sizes" },
    { zh: "不要让重叠吃掉内容", en: "Never let overlap eat the content" },
  ],
  promptGuide: {
    quickColors: {
      text: "#0f0f0f",
      background: "#ffffff",
      red: "#ff3366",
      cyan: "#00d4ff",
      yellow: "#ffcc00",
      ink: "#0f0f0f",
    },
    prompts: [
      {
        zh: "做一个非对称网格版面：grid-template-columns: 1fr 2.2fr 0.6fr、间距 16px、上限 1440px。左侧一块张力红 #ff3366 色块用 translate(-32px,-16px) 压到中间列、z-index 显式设定、零圆角、硬阴影 6px 6px 0 #0f0f0f。标题 120px/900、行高 0.95、字距 -0.03em，跨两列；旁边一个 12px 警示黄小标签形成 10 倍反差。移动端降为单列、取消位移、字号层级压到 4 倍以内。页面底色 #ffffff。",
        en: "Build an asymmetric grid layout: grid-template-columns 1fr 2.2fr 0.6fr with 16px gaps capped at 1440px. A #ff3366 block offsets translate(-32px,-16px) onto the middle column at an explicit z-index, zero radius, hard shadow 6px 6px 0 #0f0f0f. The headline runs 120px/900 at 0.95 leading and -0.03em across two columns, with a 12px alert-yellow label beside it for a tenfold gap. Mobile collapses to one column, drops the offsets and compresses the ladder within four times. The page ground is #ffffff.",
      },
    ],
  },
  similar: [
    { name: "Magazine Grid", why: { zh: "同样用不等大区块，但杂志网格贴齐栏线，非对称网格故意越线", en: "Both use unequal blocks, though magazine grid honors its column edges while this deliberately breaks them" } },
    { name: "Bento Grid", why: { zh: "同样格子大小不同，但便当盒靠整齐间隙，非对称靠重叠与负位移", en: "Both vary cell sizes, though bento relies on even gaps while this relies on overlap and negative offsets" } },
  ],
  completeness: "full",
};
