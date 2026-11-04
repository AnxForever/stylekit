import type { DesignSpec } from "../types";

export const cyberAnimeSpec: DesignSpec = {
  slug: "cyber-anime",
  name: "赛博动漫风",
  nameEn: "Cyber Anime",
  cover: "/styles/cyber-anime.svg",
  theme: "dark",
  northStar: {
    zh: "驾驶舱 HUD 加动漫光效：斜切角、八角网格、三层霓虹。",
    en: "Cockpit HUD with anime light: chamfered corners, hexagonal grids, triple-layered neon.",
  },
  summary: {
    zh: "赛博动漫把机甲驾驶舱的 HUD 与动漫的光效语言合在一起：主容器四角带斜切角标（clip-path 或用两条边线拼出），背景用六边形网格而不是方形网格，霓虹是多层叠加而非单层发光，微交互像座舱按钮——hover 快速上浮、按下压实、光晕在 180 到 280ms 内 amplify。它的禁令很硬：不许柔和粉彩与自然有机色、不许衬线、不许全圆角（一切形状必须带角）、不许浅色主背景、不许弹跳弹簧动画。",
    en: "Cyber Anime fuses the mecha cockpit HUD with anime lighting: primary containers carry angled bracket corners (clip-path or two edge rules), the backdrop is a hexagonal grid rather than a square one, neon stacks in layers instead of glowing once, and micro-interactions behave like cockpit switches — a quick hover lift, a firm press, and a glow that amplifies within 180 to 280ms. The prohibitions are hard: no soft pastels or natural organic tones, no serif, no fully rounded shapes since everything must keep an edge, no light primary surface, and no bouncy spring motion.",
  },
  colors: [
    {
      name: "深紫黑",
      nameEn: "Deep Violet Black",
      value: "#0f0f1a",
      group: "surface",
      role: {
        zh: "页面底。带紫的近黑，让霓虹与紫主色都能发光。",
        en: "The page ground — a violet-cast near black that lights both neon and the primary violet.",
      },
      token: "--color-deep-violet-black",
    },
    {
      name: "机体紫",
      nameEn: "Frame Violet",
      value: "#7c3aed",
      group: "brand",
      role: {
        zh: "主色：边框、主按钮与座舱框架。",
        en: "The primary on borders, main buttons and the cockpit frame.",
      },
      token: "--color-frame-violet",
    },
    {
      name: "霓虹青",
      nameEn: "Neon Teal",
      value: "#06d6a0",
      group: "accent",
      role: {
        zh: "第一层光晕与「系统在线」状态。",
        en: "The first glow layer and system-online states.",
      },
      token: "--color-neon-teal",
    },
    {
      name: "霓虹粉",
      nameEn: "Neon Pink",
      value: "#ff006e",
      group: "accent",
      role: {
        zh: "第二层光晕，用于警报与高能状态。",
        en: "The second glow layer, on alarms and high-energy states.",
      },
      token: "--color-neon-pink",
    },
    {
      name: "电光蓝",
      nameEn: "Electric Blue",
      value: "#38bdf8",
      group: "accent",
      role: {
        zh: "链接与数据高亮，与青形成冷暖过渡。",
        en: "Links and data highlights, carrying the cool transition from teal.",
      },
      token: "--color-electric-blue",
    },
    {
      name: "浅蓝",
      nameEn: "Pale Blue",
      value: "#51b1ff",
      group: "accent",
      role: {
        zh: "第三层光晕与文字高光，最亮的一站。",
        en: "The third glow layer and text highlight — the brightest stop.",
      },
      token: "--color-pale-blue",
    },
  ],
  fonts: [
    {
      family: "Chakra Petch",
      substitute: "'Segoe UI', 'Arial Narrow', sans-serif",
      weights: [400, 600, 700],
      sizes: [11, 13, 15, 20, 28, 40],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "0.04em", label: "0.16em" },
      role: {
        zh: "几何无衬线，带科技切角感。全大写并放宽字距 0.16em，像 HUD 标签。",
        en: "A geometric sans with a technical cut. Uppercase at 0.16em tracking, like a HUD label.",
      },
      token: "--font-display",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 12, 14],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.55 },
      tracking: { display: "0.04em", label: "0.16em" },
      role: {
        zh: "数值、坐标与状态码。座舱里的读数必须是等宽的。",
        en: "Figures, coordinates and status codes — cockpit readouts must be monospaced.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Chakra Petch", weight: 700, size: 40, lineHeight: 1.15, tracking: "0.04em", token: "--text-display" },
    { role: "heading", font: "Chakra Petch", weight: 700, size: 28, lineHeight: 1.2, tracking: "0.04em", token: "--text-heading" },
    { role: "subheading", font: "Chakra Petch", weight: 600, size: 20, lineHeight: 1.3, tracking: "0.04em", token: "--text-subheading" },
    { role: "body-lg", font: "Chakra Petch", weight: 400, size: 15, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", font: "Chakra Petch", weight: 400, size: 13, lineHeight: 1.6, token: "--text-body" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 11, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1320,
    sectionGap: 48,
    cardPadding: 24,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "dots", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Violet Black", value: "#0f0f1a", purpose: "页面底" },
    { level: 1, name: "Panel", value: "rgba(124,58,237,0.08)", purpose: "面板（紫调半透明）" },
    { level: 2, name: "Hex Grid", value: "hexagonal pattern", purpose: "六边形网格层" },
  ],
  elevation: [
    { name: "Triple glow", value: "0 0 12px #7c3aed, 0 0 24px rgba(6,214,160,0.35), 0 0 48px rgba(255,0,110,0.20)" },
    { name: "Amplified", value: "0 0 18px #7c3aed, 0 0 36px rgba(6,214,160,0.45), 0 0 72px rgba(255,0,110,0.30)" },
  ],
  components: [
    {
      name: "Bracket Panel",
      role: { zh: "斜切角面板（核心组件）", en: "The bracketed panel — the core component" },
      construction: {
        zh: "紫 8% 填充、零圆角、1px 机体紫 40% 描边、内边距 24px。四角各用两条伪元素画 L 形支架（2px 机体紫、长 16px），并用 clip-path 切掉右上与左下各 12px 形成斜切。外发光三层：紫 12px、青 24px 35%、粉 48px 20%。hover 时发光 amplify 到 18/36/72px，整体上浮 2px，过渡 220ms。",
        en: "8% violet fill, zero radius, a 1px frame violet border at 40%, 24px padding. Two pseudo elements draw an L bracket in each corner (2px frame violet, 16px long), and clip-path removes 12px from the top-right and bottom-left. Glow stacks three layers: violet 12px, teal 24px at 35%, pink 48px at 20%. Hover amplifies to 18, 36 and 72px and lifts 2px over 220ms.",
      },
      states: "hover: glow amplified, lift 2px",
    },
    {
      name: "HUD Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "机体紫填充、白字、零圆角、1px 浅蓝 30% 描边，用 clip-path 切掉左上与右下各 10px。11px 等宽全大写 0.16em、padding 12px 28px，三层发光。hover 时填充提亮到 #8b4ff5、发光 amplify；按下时位移 1px 并让发光收到 8/16/28px。过渡 180ms。",
        en: "Frame violet fill, white text, zero radius, a 1px pale blue border at 30%, with clip-path removing 10px from the top-left and bottom-right. 11px monospace uppercase at 0.16em, 12px 28px padding, glow in three layers. Hover brightens the fill to #8b4ff5 and amplifies the glow; press translates 1px and pulls the glow to 8, 16 and 28px. 180ms.",
      },
      states: "hover: brighter, amplified glow; active: translate 1px",
    },
    {
      name: "Hex Field",
      role: { zh: "六边形背景网格", en: "The hexagonal grid bed" },
      construction: {
        zh: "用两层 repeating-linear-gradient 各转 60 度叠出六边形网格，线宽 1px、机体紫 8%，单元尺寸 32px。全页固定覆盖，pointer-events: none。它必须比方形网格更弱，否则会压过内容。",
        en: "Two repeating linear gradients rotated sixty degrees apart form the hexagons at 1px violet lines in 8%, with 32px cells. The layer is fixed across the page with pointer-events none, and must stay weaker than a square grid or it overpowers the content.",
      },
    },
    {
      name: "Holo Projection",
      role: { zh: "全息投影面板", en: "The holographic projection panel" },
      construction: {
        zh: "青色 8% 填充、1px 青 30% 描边、零圆角、16px 模糊，叠一层 4px 间隔的青色扫描线（8%），边缘用 clip-path 做出轻微梯形（上窄下宽 4%）。用于展示角色或机体数据，允许轻微上下浮动 2px（4s 循环）。",
        en: "8% teal fill, a 1px teal border at 30%, zero radius, a 16px blur, plus cyan scanlines every 4px at 8%. clip-path gives the frame a slight trapezoid, four percent narrower at the top, and it may float 2px vertically on a four-second loop.",
      },
    },
    {
      name: "Status Readout",
      role: { zh: "状态读数条", en: "The status readout strip" },
      construction: {
        zh: "高 28px、零圆角、1px 机体紫 25% 描边，左段等宽显示标签（11px 全大写）、中段显示分段条（10 格、间隔 2px）、右段显示数值。正常青、警告粉、离线灰。分段条必须以离散格填充，不用连续渐变。",
        en: "A 28px strip with zero radius and a 1px violet border at 25%, a monospace label on the left at 11px uppercase, a segmented bar in the middle of ten cells with 2px gaps, and a figure on the right. Teal for nominal, pink for warning, grey for offline. The bar fills in discrete cells, never a continuous gradient.",
      },
    },
  ],
  imagery: {
    zh: "动漫角色与机体的霓虹剪影、全息投影、数据可视化与 HUD 叠层。允许把角色立绘处理成双色调加发光边缘。不使用柔和粉彩、自然风景与写实人像。",
    en: "Neon silhouettes of anime characters and mecha, holographic projections, data visualizations and HUD overlays. A character illustration may be graded to duotone with glowing edges. No soft pastels, natural landscapes or realistic portraits.",
  },
  layout: {
    zh: "上限 1320px、容器内边距 16px，面板间距 12px，形成密集座舱。允许面板以 1px 线拼接。所有切角固定 10px 或 12px，混用即为错误。",
    en: "Capped at 1320px with 16px padding and 12px between panels, producing a dense cockpit. Panels may join on 1px lines. Chamfers are fixed at 10px or 12px, and mixing the two is an error.",
  },
  dos: [
    { zh: "四角 L 形支架加斜切角", en: "L brackets in every corner plus chamfers" },
    { zh: "六边形网格而非方形", en: "Hexagonal grid, never square" },
    { zh: "霓虹三层叠加", en: "Stack neon in three layers" },
    { zh: "微交互 180 到 280ms", en: "Micro-interactions run 180 to 280ms" },
    { zh: "深底加半透明面板", en: "Dark ground with translucent panels" },
    { zh: "几何无衬线或等宽", en: "Geometric sans or monospace only" },
  ],
  donts: [
    { zh: "不要用柔和粉彩与自然色", en: "No soft pastels or natural tones" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要用全圆角", en: "No fully rounded shapes" },
    { zh: "不要用浅色主背景", en: "No light primary surface" },
    { zh: "不要用弹跳弹簧动画", en: "No bouncy spring motion" },
    { zh: "不要混用两种切角尺寸", en: "Never mix two chamfer sizes" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e8e6f5",
      background: "#0f0f1a",
      violet: "#7c3aed",
      teal: "#06d6a0",
      pink: "#ff006e",
      blue: "#38bdf8",
    },
    prompts: [
      {
        zh: "做一个赛博动漫风面板：背景 rgba(124,58,237,0.08)、零圆角、1px rgba(124,58,237,0.4) 描边、内边距 24px、clip-path 切掉右上与左下各 12px、box-shadow 0 0 12px #7c3aed, 0 0 24px rgba(6,214,160,0.35), 0 0 48px rgba(255,0,110,0.2)。四角各用 2px 机体紫画 16px 的 L 形支架。全页叠一层 32px 单元的六边形网格（1px 线、rgba(124,58,237,0.08)）。hover 时发光 amplify 到 18/36/72px 并 translateY(-2px)，transition 220ms。页面底色 #0f0f1a。",
        en: "Build a cyber anime panel: background rgba(124,58,237,0.08), zero radius, a 1px rgba(124,58,237,0.4) border, 24px padding, clip-path removing 12px from the top-right and bottom-left, and box-shadow 0 0 12px #7c3aed, 0 0 24px rgba(6,214,160,0.35), 0 0 48px rgba(255,0,110,0.2). Each corner carries a 16px L bracket in 2px frame violet. A 32px hexagonal grid (1px lines in rgba(124,58,237,0.08)) covers the page. Hover amplifies the glow to 18, 36 and 72px with translateY(-2px) over 220ms. The page ground is #0f0f1a.",
      },
    ],
  },
  similar: [
    { name: "Cyberpunk Neon", why: { zh: "同为赛博霓虹，但那边是街头招牌，这里是座舱 HUD 与斜切角", en: "Both cyber neon, though that one is street signage while this is a cockpit HUD with chamfers" } },
    { name: "Mecha", why: { zh: "同为机甲语言，但机甲更军规克制，赛博动漫加动漫光效与紫调", en: "Both mecha, though mecha stays military and restrained while this adds anime lighting and violet" } },
  ],
  completeness: "full",
};
