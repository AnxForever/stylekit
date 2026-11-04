import type { DesignSpec } from "../types";

export const magicCircleSpec: DesignSpec = {
  slug: "magic-circle",
  name: "魔法阵风",
  nameEn: "Magic Circle",
  cover: "/styles/magic-circle.svg",
  theme: "dark",
  northStar: {
    zh: "同心环、六芒星、符文沿圆周排列：一条还没启动的法阵。",
    en: "Concentric rings, a hexagram core, runes set along the circumference — a circle before it activates.",
  },
  summary: {
    zh: "魔法阵风来自奇幻作品的施法视觉：深海军黑底（#0a0920）上叠多层次同心圆环，核心是六芒星或六边形，符文沿圆周排布，生命之花等神圣几何作暗纹，金色（#fbbf24）作唯一的暖光。它的核心动效叫 Arcane Rotation——卡片 hover 时内部虚线同心环在 3000ms 内线性旋转 180 度，像法阵被启动；按钮按下必须缩到 0.95，因为施法需要能量聚焦。焦点环必须带深底色的 offset，否则在暗场上看不见。",
    en: "Magic Circle takes its visual from spellcasting: layered concentric rings over a deep navy black (#0a0920), a hexagram or hexagon at the core, runes set around the circumference, sacred geometry such as the Flower of Life as a faint substrate, and gold (#fbbf24) as the only warm light. Its core motion is Arcane Rotation — hovering a card spins the dashed inner rings 180 degrees over 3000ms linear, as if the circle engaged. A button press must scale to 0.95, since casting demands a point of focus. Focus rings need an offset in the ground color or they vanish on the dark.",
  },
  colors: [
    {
      name: "阵底",
      nameEn: "Circle Ground",
      value: "#0a0920",
      group: "surface",
      role: {
        zh: "页面底。深海军黑，让金环与靛蓝符文都能浮起来。",
        en: "The page ground — a deep navy black that floats both gold rings and indigo runes.",
      },
      token: "--color-circle-ground",
    },
    {
      name: "阵紫",
      nameEn: "Circle Indigo",
      value: "#1e1b4b",
      group: "surface",
      role: {
        zh: "面板与抬升面。法阵内部的底色。",
        en: "Panels and raised surfaces — the interior of the circle.",
      },
      token: "--color-circle-indigo",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#fbbf24",
      group: "brand",
      role: {
        zh: "唯一的暖光：圆环、符文与主按钮。",
        en: "The only warm light on rings, runes and the primary button.",
      },
      token: "--color-gold",
    },
    {
      name: "银",
      nameEn: "Silver",
      value: "#e2e8f0",
      group: "surface",
      role: {
        zh: "主要文字与次级圆环。冷侧的亮。",
        en: "Primary text and secondary rings — the bright cool side.",
      },
      token: "--color-silver",
    },
    {
      name: "靛蓝",
      nameEn: "Indigo",
      value: "#818cf8",
      group: "accent",
      role: {
        zh: "符文文字与数据。与金形成冷暖对位。",
        en: "Runes and data, opposing the gold in temperature.",
      },
      token: "--color-indigo",
    },
    {
      name: "灵绿",
      nameEn: "Spirit Green",
      value: "#56ed40",
      group: "accent",
      role: {
        zh: "「已充能」状态与成功，出现频率最低。",
        en: "Charged states and success, used least.",
      },
      token: "--color-spirit-green",
    },
  ],
  fonts: [
    {
      family: "Cinzel",
      substitute: "'Trajan Pro', Georgia, serif",
      weights: [400, 700],
      sizes: [11, 13, 16, 22, 32, 44],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.7 },
      tracking: { display: "0.08em", label: "0.24em" },
      role: {
        zh: "标题用纪念碑式衬线加宽字距，符文与标签用等宽。正文用衬线保证可读。",
        en: "Headings take a monumental serif on wide tracking, runes and labels use monospace, and body stays serif for legibility.",
      },
      token: "--font-display",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400],
      sizes: [11, 13],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.6 },
      tracking: { display: "0.12em", label: "0.24em" },
      role: {
        zh: "符文、坐标与咒文。等宽让符文沿圆周排列时宽度一致。",
        en: "Runes, coordinates and incantations — the monospace keeps width consistent along the circumference.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Cinzel", weight: 700, size: 44, lineHeight: 1.15, tracking: "0.08em", token: "--text-display" },
    { role: "heading", font: "Cinzel", weight: 700, size: 32, lineHeight: 1.2, tracking: "0.08em", token: "--text-heading" },
    { role: "subheading", font: "Cinzel", weight: 400, size: 22, lineHeight: 1.35, tracking: "0.06em", token: "--text-subheading" },
    { role: "body", font: "Cinzel", weight: 400, size: 16, lineHeight: 1.7, token: "--text-body" },
    { role: "body-sm", font: "Cinzel", weight: 400, size: 13, lineHeight: 1.65, token: "--text-body-sm" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 11, lineHeight: 1.5, tracking: "0.24em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "2px" },
    { element: "circles", value: "999px" },
    { element: "hexagons", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Circle Ground", value: "#0a0920", purpose: "页面底" },
    { level: 1, name: "Circle Indigo", value: "#1e1b4b", purpose: "面板" },
    { level: 2, name: "Gold Rim", value: "rgba(251,191,36,0.20)", purpose: "金环" },
  ],
  elevation: [
    { name: "Gold glow", value: "0 0 15px rgba(251,191,36,0.15)" },
    { name: "Gold glow strong", value: "0 0 30px rgba(251,191,36,0.40), inset 0 0 15px rgba(251,191,36,0.10)" },
    { name: "Cast", value: "inset 0 0 30px rgba(251,191,36,0.60)" },
  ],
  components: [
    {
      name: "Arcane Circle",
      role: { zh: "法阵圆环组（核心组件）", en: "The arcane circle — the core component" },
      construction: {
        zh: "由 3 到 5 层同心环组成：最外 1px 金 40% 实线、次外 1px 金 25% 虚线圈（dash 8 gap 6）、中间 2px 金 60% 实线、内部虚线环。核心放一个六芒星（两个三角形交叠）或六边形。所有环在 hover 时以 3000ms linear 旋转 180 度——绝不允许静止不动。prefers-reduced-motion 时静止。",
        en: "Three to five concentric rings: an outer 1px gold solid at 40%, then a 1px gold dashed ring at 25% (8px dash, 6px gap), a 2px gold solid at 60% mid-way, and a dashed ring inside. The core holds a hexagram (two overlapping triangles) or a hexagon. Every ring spins 180 degrees over 3000ms linear on hover — never sitting still. Under reduced motion they hold.",
      },
      sizes: "240–480px; rotation 3000ms linear",
    },
    {
      name: "Rune Path",
      role: { zh: "圆周符文", en: "Runes along the circumference" },
      construction: {
        zh: "沿圆周均匀排列 8 到 24 个 11px 等宽字符，每个字符按其在圆上的角度旋转（transform: rotate(角度) 后反向旋转文字以保持直立或沿切线排列）。使用几何符号或拉丁大写，不用真实文字。颜色金 60%。",
        en: "Eight to twenty-four 11px monospace glyphs spaced evenly around a circle, each rotated to its angle — either counter-rotated to stay upright or set along the tangent. Use geometric marks or Latin capitals, never real words. Gold at 60%.",
      },
    },
    {
      name: "Sigil Button",
      role: { zh: "施法按钮", en: "The casting button" },
      construction: {
        zh: "阵底填充、金文字、2px 圆角、1px 金 40% 描边、16px/700、字距 0.24em、padding 12px 32px，外发光 0 0 15px 金 15%。hover 时描边升到 100%、发光扩到 30px 并加内发光；按下时缩到 0.95 且内发光加深到 60%——这是施法的能量聚焦。过渡 500ms。",
        en: "Circle ground fill, gold text, 2px radius, a 1px gold border at 40%, 16px/700 at 0.24em, 12px 32px padding, with a 0 0 15px glow at 15%. Hover takes the border to full, widens the glow to 30px and adds an inner glow; press scales 0.95 and deepens the inner glow to 60% — the point of focus for a cast. 500ms.",
      },
      sizes: "padding 12px 32px; label 16px",
      states: "hover: border full, glow 30px; active: scale 0.95, inner glow",
    },
    {
      name: "Hex Card",
      role: { zh: "六边形卡片", en: "The hexagonal card" },
      construction: {
        zh: "用 clip-path polygon 切出正六边形（或 8px 圆角矩形配六边形角标），阵紫填充、1px 金 30% 描边、内边距 32px。内容居中。hover 时描边升到 60% 并触发内部圆环旋转。",
        en: "A clip-path polygon cuts a regular hexagon (or an 8px rounded rect with hexagon corner marks), filled circle indigo with a 1px gold border at 30% and 32px padding. Content centres. Hover raises the border to 60% and fires the inner ring rotation.",
      },
    },
    {
      name: "Sacred Geometry Bed",
      role: { zh: "神圣几何暗纹", en: "The sacred geometry substrate" },
      construction: {
        zh: "全页或区块底层叠一层生命之花或六边形网格，线宽 1px、金 6% 或靛蓝 8%，不透明度极低。它只在被注意到时才存在，绝不能压过内容。",
        en: "A Flower of Life or hex grid sits beneath a section at 1px in 6% gold or 8% indigo, at very low opacity. It exists only when noticed and never overpowers the content.",
      },
    },
  ],
  imagery: {
    zh: "符阵插画、炼金术符号、星图、魔法书页扫描。必须线稿式、金色或靛蓝、深底。不使用写实摄影、柔和插画与彩色图像。",
    en: "Sigil illustration, alchemical symbols, star charts, scans of grimoire pages — line-based, in gold or indigo, on a dark ground. No realistic photography, soft illustration or color imagery.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 128px。允许圆形与六边形打破矩形容器。法阵常作为首屏的中心视觉，文字围绕或压在其上但必须可读。",
    en: "Capped at 1120px with 24px padding, sections 128px apart. Circles and hexagons may break the rectangular container. The circle usually anchors the hero, with text around or over it as long as it stays readable.",
  },
  dos: [
    { zh: "多层同心环加六芒星核心", en: "Layered concentric rings with a hexagram core" },
    { zh: "hover 时圆环 3000ms 线性旋转", en: "Rings spin 180 degrees over 3000ms linear on hover" },
    { zh: "符文沿圆周等距排列", en: "Runes sit evenly around the circumference" },
    { zh: "金是唯一暖光，靛蓝为冷侧", en: "Gold is the only warmth, indigo the cool side" },
    { zh: "按钮按下缩到 0.95", en: "Buttons scale to 0.95 on press" },
    { zh: "焦点环带深底色 offset", en: "Focus rings carry a ground-colored offset" },
  ],
  donts: [
    { zh: "不要用明亮霓虹色", en: "No bright neon color" },
    { zh: "不要让圆环在 hover 时静止", en: "Never let the rings sit still on hover" },
    { zh: "不要用缺少 offset 的焦点环", en: "No focus ring without an offset" },
    { zh: "不要让按钮按下无缩放", en: "Never skip the press scale" },
    { zh: "不要让暗纹压过内容", en: "Never let the substrate overpower content" },
    { zh: "不要用真实文字作符文", en: "Never use real words as runes" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e2e8f0",
      background: "#0a0920",
      panel: "#1e1b4b",
      gold: "#fbbf24",
      indigo: "#818cf8",
      green: "#56ed40",
    },
    prompts: [
      {
        zh: "做一个魔法阵风卡片：阵底 #0a0920 填充、8px 圆角、1px rgba(251,191,36,0.3) 描边、内边距 32px。内部放 4 层同心环：外 1px 金 40% 实线、次 1px 金 25% 虚线（dash 8 gap 6）、中间 2px 金 60%、内部虚线环，核心一个六芒星。hover 时所有环以 3000ms linear 旋转 180 度。沿圆周排 12 个 11px 等宽符文（金 60%，各自按角度旋转）。按钮阵底填充、金文字、2px 圆角、1px 金 40% 描边，hover 发光扩到 0 0 30px rgba(251,191,36,0.4)，active 时 scale(0.95)。页面底色 #0a0920，焦点环带 offset-2 offset-[#0a0920]。",
        en: "Build a magic circle card: #0a0920 fill, 8px radius, a 1px rgba(251,191,36,0.3) border, 32px padding. Four concentric rings sit inside — an outer 1px gold solid at 40%, a 1px dashed gold ring at 25% (8px dash, 6px gap), a 2px gold at 60%, and a dashed inner ring — around a hexagram core. Hover spins every ring 180 degrees over 3000ms linear. Twelve 11px monospace runes at 60% gold sit around the circumference, each rotated to its angle. The button fills the circle ground with gold text on a 2px radius and a 1px gold border at 40%, widening its glow to 0 0 30px rgba(251,191,36,0.4) on hover and scaling to 0.95 on press. The page ground is #0a0920 with focus rings offset in the same color.",
      },
    ],
  },
  similar: [
    { name: "Gothic", why: { zh: "同为神秘暗调，但哥特是建筑与彩窗，魔法阵是同心环与符文", en: "Both dark and mystic, though Gothic is architecture and glass while this is rings and runes" } },
    { name: "Sci-Fi HUD", why: { zh: "同样有环状仪表，但 HUD 是青绿发光，魔法阵是金色暖光", en: "Both use circular gauges, though the HUD glows cyan while the circle glows gold" } },
  ],
  completeness: "full",
};
