import type { DesignSpec } from "../types";

/**
 * Second gold-standard sample. Where Editorial proves the spec can describe a
 * print-derived system, this proves it can describe a system whose entire
 * identity is physical weight: hard edges, offset shadows, zero radius.
 */
export const neoBrutalistSpec: DesignSpec = {
  slug: "neo-brutalist",
  name: "新野兽派",
  nameEn: "Neo-Brutalist",
  cover: "/styles/neo-brutalist.svg",
  theme: "light",
  northStar: {
    zh: "黑框、硬阴影、零圆角：界面由一块块压不扁的实体组成。",
    en: "Black frames, hard shadows, zero radius — an interface built from solid blocks that refuse to be squashed.",
  },
  summary: {
    zh: "新野兽派从建筑取来态度：结构外露，材料不加装饰。网页上的做法是给每个元素一个 2px 到 4px 的纯黑外框、一层无模糊的偏移阴影、以及零圆角，让平面产生真实厚度。交互也必须是物理的——hover 时阴影变大、元素向左上抬起（Brutal Snap）；active 时元素位移量正好等于阴影偏移量，阴影归零，像被手掌压平（Physical Crushing）。颜色只有黑白打底，加四支高饱和强调色，每支承担一个固定职能，不做渐变、不做半透明。",
    en: "Neo-Brutalism borrows its attitude from architecture: structure exposed, material undecorated. On the web that means every element carries a 2px to 4px pure black frame, an offset shadow with zero blur, and no radius at all, so a flat screen acquires real thickness. Interaction stays physical: on hover the shadow grows and the element lifts up-left (Brutal Snap); on active the element travels exactly the shadow's offset while the shadow collapses to zero, as if a palm pressed it flat (Physical Crushing). Black and white carry the structure; four saturated accents each own one job. No gradients, no translucency.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink",
      value: "#000000",
      group: "brand",
      role: {
        zh: "所有边框、文字、硬阴影与反色区块。结构的全部重量都由它承担，不允许换成深灰。",
        en: "Every border, text run, hard shadow and inverted band. All structural weight lives here; never substitute a dark grey.",
      },
      token: "--color-ink",
    },
    {
      name: "纸白",
      nameEn: "Paper",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "页面画布与卡片填充。纯白是为了让黑框与阴影的对比拉到最大。",
        en: "Canvas and card fill. Pure white exists to push the black frames and shadows to maximum contrast.",
      },
      token: "--color-paper",
    },
    {
      name: "荧光粉",
      nameEn: "Hot Pink",
      value: "#ff006e",
      group: "accent",
      role: {
        zh: "选中文字与主强调。也是卡片 hover 时阴影可切换的颜色。",
        en: "Text selection and primary emphasis. Also the color a card shadow may switch to on hover.",
      },
      token: "--color-hot-pink",
    },
    {
      name: "酸柠绿",
      nameEn: "Acid Lime",
      value: "#ccff00",
      group: "accent",
      role: {
        zh: "hover 强调底色。用于标签与主按钮的悬停底；背景过渡遵循通用 token，或具名组件单独声明的状态时长。不要使用渐变或 opacity 淡入淡出。",
        en: "Hover emphasis fill for labels and primary buttons. Follow the shared token timing or an explicit component override. Use no gradients or opacity fade.",
      },
      token: "--color-acid-lime",
    },
    {
      name: "电青",
      nameEn: "Electric Cyan",
      value: "#00d9ff",
      group: "accent",
      role: {
        zh: "数据、状态与次级面板的强调。和粉、绿同时出现时只占小面积。",
        en: "Data, status and secondary panel emphasis. When it appears beside pink and lime, it stays a small area.",
      },
      token: "--color-electric-cyan",
    },
    {
      name: "橘",
      nameEn: "Tangerine",
      value: "#ff9500",
      group: "accent",
      role: {
        zh: "警示与第四强调色。使用频率最低，全站不超过三处同时出现。",
        en: "Warning and the fourth accent. Used least; never more than three instances on one page.",
      },
      token: "--color-tangerine",
    },
  ],
  fonts: [
    {
      family: "sans-serif",
      substitute: "Inter, 'Helvetica Neue', Arial, sans-serif",
      weights: [700, 900],
      sizes: [24, 32, 48, 64, 72],
      lineHeight: { display: 0.95, heading: 1.05, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.12em" },
      role: {
        zh: "所有标题，权重固定 900。标题的力量来自字重与紧缩字距，不来自字号堆叠。",
        en: "All headings, pinned at weight 900. Heading power comes from weight and tight tracking, not from size alone.",
      },
      token: "--font-sans",
    },
    {
      family: "mono",
      substitute: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      weights: [400, 700],
      sizes: [12, 14, 16],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.12em" },
      role: {
        zh: "正文、标签、按钮与数据。等宽字体让界面读起来像终端输出，是这套风格的第二识别点。",
        en: "Body, labels, buttons and data. The monospace face makes the interface read like terminal output; it is the system's second identifier.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "sans-serif", weight: 900, size: 72, lineHeight: 0.95, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", font: "sans-serif", weight: 900, size: 48, lineHeight: 1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", font: "sans-serif", weight: 900, size: 32, lineHeight: 1.1, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", font: "sans-serif", weight: 700, size: 24, lineHeight: 1.2, token: "--text-subheading" },
    { role: "body", font: "mono", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", font: "mono", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body-sm" },
    { role: "label", font: "mono", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "compact",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1280,
    sectionGap: 80,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "badges", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#ffffff", purpose: "页面画布" },
    { level: 1, name: "Slab", value: "#f4f4f4", purpose: "次级面板与分区底" },
  ],
  elevation: [
    { name: "Hard offset sm", value: "4px 4px 0 0 #000000" },
    { name: "Hard offset lg", value: "8px 8px 0 0 #000000" },
    { name: "Hover lift", value: "10px 10px 0 0 #000000" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Block Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "白底、2px 墨黑描边、直角、4px 硬阴影（偏移 4px 4px，模糊 0）。字号 12px、字重 700、全大写、字距 0.12em、等宽；padding 12px 24px。hover 时阴影增到 10px、元素向左上位移 4px，背景转为酸柠绿，按 150ms ease-out 过渡。按下时元素右下位移 6px，阴影归零。",
        en: "Paper fill, 2px ink border, square corners, a 4px hard shadow offset by 4px 4px with zero blur. Type at 12px, weight 700, uppercase, 0.12em tracking, monospace; padding 12px 24px. On hover the shadow grows to 10px, the element lifts 4px up-left and the background transitions to acid lime over 150ms ease-out. On press the element travels 6px down-right and the shadow collapses to zero.",
      },
      sizes: "padding 12px 24px; label 12px",
      states: "hover: fill, shadow, and translate transition 150ms ease-out; active: translate 6px 6px, shadow none",
    },
    {
      name: "Brutal Card",
      role: { zh: "内容卡片与商品卡", en: "Content and product card" },
      construction: {
        zh: "白底、2px 墨黑描边、直角、8px 硬阴影。内边距 24px，卡片间距 32px。hover 时元素上移 4px、阴影增到 10px，阴影色可切到荧光粉，过渡 150ms ease-out。",
        en: "Paper fill, 2px ink border, square corners, 8px hard shadow. Padding 24px, 32px between cards. Hover lifts the card 4px and grows the shadow to 10px, optionally recolored to hot pink, over 150ms ease-out.",
      },
      states: "hover: translate -4px -4px, shadow 10px",
    },
    {
      name: "Mono Label",
      role: { zh: "分类标签与状态徽标", en: "Category tag and status badge" },
      construction: {
        zh: "墨黑填充、白字、直角、无描边。12px 等宽、字重 700、全大写、字距 0.12em；padding 4px 8px。反色用途时改为白底黑框。",
        en: "Ink fill, paper text, square corners, no border. 12px monospace at weight 700, uppercase, 0.12em tracking; padding 4px 8px. Inverted use switches to paper fill with an ink border.",
      },
      sizes: "padding 4px 8px; label 12px",
    },
    {
      name: "Hard Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "白底、2px 墨黑描边、直角、无阴影。14px 等宽、padding 12px 16px。聚焦时出现 4px 硬阴影并保持描边宽度不变，不改变尺寸以避免布局抖动。",
        en: "Paper fill, 2px ink border, square corners, no shadow. 14px monospace with 12px 16px padding. Focus adds a 4px hard shadow while keeping the border width unchanged, so the box never resizes.",
      },
      states: "focus: 4px hard shadow, border width unchanged",
    },
    {
      name: "Marquee Bar",
      role: { zh: "页面顶部或底部的滚动条", en: "Scrolling strip at the top or bottom of a page" },
      construction: {
        zh: "墨黑底、白字、直角、无阴影。16px 等宽、全大写、字距 0.12em、上下 padding 8px，内容横向匀速滚动，间隔用 4px 实心方块分隔。",
        en: "Ink background, paper text, square corners, no shadow. 16px monospace, uppercase, 0.12em tracking, 8px vertical padding, content scrolling at a constant speed with 4px solid squares as separators.",
      },
    },
  ],
  imagery: {
    zh: "不用摄影。用粗描边的几何图形、点阵与棋盘格、像素化的图标，全部单色或四支强调色之一。任何图像都必须能画成 2px 线条与实心块，出现渐变或柔光就破坏风格。",
    en: "No photography. Use heavy-stroke geometry, dot and checker patterns, pixelated icons — monochrome or one of the four accents. Any image must be reducible to 2px strokes and solid fills; a gradient or soft glow breaks the style.",
  },
  layout: {
    zh: "12 栏、上限 1280px，容器内边距 16px 到 32px。区块间距 80px，卡片间距 32px。允许元素相对网格偏移 4px 到 8px 制造碰撞感，但同一区块内偏移方向保持一致。标题与正文的对齐必须是硬对齐，不做居中柔化。",
    en: "Twelve columns capped at 1280px, container padding 16px to 32px. Section rhythm 80px, 32px between cards. Elements may be offset 4px to 8px off the grid to create collision, but a section keeps one offset direction. Alignment is hard: text blocks align to edges, never softened by centering.",
  },
  dos: [
    {
      zh: "所有元素使用 2px 到 4px 纯黑边框，绝不用灰色边框",
      en: "Every element carries a 2px to 4px pure black border, never a grey one",
    },
    {
      zh: "阴影必须是零模糊的硬偏移，4px 与 8px 两档",
      en: "Shadows are zero-blur offsets only, in two steps: 4px and 8px",
    },
    {
      zh: "保持直角，任何圆角都会削弱实体感",
      en: "Keep square corners; any radius weakens the solid-body feel",
    },
    {
      zh: "hover 增大阴影，active 位移等于阴影偏移并把阴影归零",
      en: "Hover grows the shadow, active travels exactly the offset and zeroes it",
    },
    {
      zh: "标题固定 900 字重，正文用等宽字体",
      en: "Headings pinned at weight 900, body set in monospace",
    },
    {
      zh: "共享过渡 token 为 transition-all duration-200；本页具名 showcase 组件示例采用 150ms ease-out",
      en: "The shared transition token is transition-all duration-200; named showcase components in this document use 150ms ease-out",
    },
  ],
  donts: [
    {
      zh: "不要使用任何圆角（rounded-lg、rounded-full 等）",
      en: "No border radius of any kind: rounded-lg, rounded-full, none",
    },
    {
      zh: "不要用模糊阴影（shadow-lg、shadow-xl），它们会毁掉物理感",
      en: "No blurred shadows such as shadow-lg or shadow-xl; they destroy the physical read",
    },
    {
      zh: "不要用渐变，包括按钮与背景",
      en: "No gradients anywhere, including buttons and backgrounds",
    },
    {
      zh: "不要用灰色或半透明边框",
      en: "No grey or semi-transparent borders",
    },
    {
      zh: "不要用 opacity 淡入淡出；区分共享 token 的 200ms 与具名 showcase 组件的 150ms 覆盖",
      en: "Do not use opacity fades; distinguish the shared 200ms token from the 150ms override for named showcase components",
    },
    {
      zh: "不要在 active 时只位移不归零阴影",
      en: "Never travel on active without collapsing the shadow to zero",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      border: "#000000",
      accent: "#ff006e",
      hoverFill: "#ccff00",
      secondaryPanel: "#f4f4f4",
    },
    prompts: [
      {
        zh: "做一个主按钮：白底、2px 纯黑描边、直角、box-shadow 4px 4px 0 0 #000。文字 12px 等宽、700、全大写、字距 0.12em，padding 12px 24px。hover 时 box-shadow 变 10px 10px 0 0 #000，transform 位移 -4px -4px，背景过渡到 #ccff00，transition 150ms ease-out。active 时 transform 位移 6px 6px，box-shadow 变 none。",
        en: "Build a primary button: white fill, 2px solid black border, square corners, box-shadow 4px 4px 0 0 #000. Label at 12px monospace, weight 700, uppercase, 0.12em tracking, padding 12px 24px. On hover the shadow becomes 10px 10px 0 0 #000, transform moves -4px -4px, background transitions to #ccff00 over 150ms ease-out. On active transform moves 6px 6px and the shadow becomes none.",
      },
      {
        zh: "做一个卡片网格：三列，间距 32px。每张卡白底、2px 纯黑描边、直角、8px 硬阴影，内边距 24px，内部依次是 12px 全大写等宽标签（墨黑底白字）、32px 900 字重标题、14px 等宽正文。hover 时卡片位移 -4px -4px，阴影变 10px。",
        en: "Build a three-column card grid with 32px gaps. Each card: white fill, 2px solid black border, square corners, 8px hard shadow, 24px padding. Inside, a 12px uppercase monospace label on an ink fill, a 32px weight-900 heading, and 14px monospace body. On hover the card moves -4px -4px and the shadow grows to 10px.",
      },
    ],
  },
  similar: [
    {
      name: "Gumroad",
      why: {
        zh: "同样的黑框硬阴影与彩色强调，交互干脆且无渐变",
        en: "Same black frames, hard shadows and saturated accents, with crisp interaction and no gradients",
      },
    },
    {
      name: "Figma Config",
      why: {
        zh: "用等宽标签与粗描边图形堆出印刷海报式的版面",
        en: "Stacks monospace labels and heavy-stroke graphics into a printed-poster layout",
      },
    },
  ],
  completeness: "full",
};
