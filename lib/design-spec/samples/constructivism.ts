import type { DesignSpec } from "../types";

export const constructivismSpec: DesignSpec = {
  slug: "constructivism",
  name: "构成主义",
  nameEn: "Constructivism",
  cover: "/styles/constructivism.svg",
  theme: "light",
  northStar: {
    zh: "红与黑切进纸里：一切都在斜着喊。",
    en: "Red and black cut into paper — everything shouting on a diagonal.",
  },
  summary: {
    zh: "构成主义来自苏联宣传海报：只用红（#cc0000）、黑（#1a1a1a）与泛黄纸（#f2e8d5）三色，色块以对角线切入画面，元素整体旋转 -6 到 3 度并斜切（skew-x-3），字是超粗全大写（6xl、900 字重），边框 4px 黑，阴影是 4px 的硬偏移模拟版画。它的纪律是「三色、直角、硬边」——禁止圆角、禁止渐变、禁止任何超出这三色的颜色。混乱是表面的，构成是精确的。",
    en: "Constructivism comes from Soviet propaganda posters: only red (#cc0000), black (#1a1a1a) and yellowed paper (#f2e8d5), with planes cutting diagonally across the frame, elements rotated between -6 and 3 degrees and skewed, type ultra-bold and uppercase at 6xl, borders at 4px black, and 4px hard offset shadows imitating print. Its discipline is three colors, right angles, hard edges — no radius, no gradient, nothing outside the triad. The chaos is on the surface; the construction underneath is exact.",
  },
  colors: [
    {
      name: "标语红",
      nameEn: "Poster Red",
      value: "#cc0000",
      group: "brand",
      role: {
        zh: "主色：色块、强调与需要立刻被看到的一切。",
        en: "The primary on blocks, emphasis and everything that must be seen at once.",
      },
      token: "--color-poster-red",
    },
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "文字、4px 边框与硬阴影。结构与冲击都靠它。",
        en: "Type, 4px borders and hard shadows — structure and impact alike.",
      },
      token: "--color-ink",
    },
    {
      name: "旧纸",
      nameEn: "Aged Paper",
      value: "#f2e8d5",
      group: "surface",
      role: {
        zh: "页面底。泛黄，像 1920 年代的印刷纸。",
        en: "The page ground — yellowed like 1920s print stock.",
      },
      token: "--color-aged-paper",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#d4a843",
      group: "accent",
      role: {
        zh: "唯一允许的第三色，只作小面积高亮。",
        en: "The one permitted third tone, used as a small highlight only.",
      },
      token: "--color-gold",
    },
    {
      name: "赭",
      nameEn: "Ochre",
      value: "#8b4513",
      group: "accent",
      role: {
        zh: "压在红色上的文字色，避免红上红。",
        en: "A text tone for use on red, avoiding red-on-red.",
      },
      token: "--color-ochre",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', 'Helvetica Neue', sans-serif",
      weights: [900],
      sizes: [16, 24, 36, 56, 80, 112],
      lineHeight: { display: 0.88, heading: 0.95, body: 1.5 },
      tracking: { display: "-0.03em", label: "0.04em" },
      role: {
        zh: "只有 900 一个字重，全大写。标题 80 到 112px、行高 0.88，字块本身是一块斜切的版面。",
        en: "One weight only — 900 — set uppercase. Headlines run 80 to 112px at 0.88 leading, the text block itself a slanted plane.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 112, lineHeight: 0.88, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 80, lineHeight: 0.92, tracking: "-0.03em", token: "--text-heading-lg" },
    { role: "heading", weight: 900, size: 56, lineHeight: 0.95, token: "--text-heading" },
    { role: "subheading", weight: 900, size: 36, lineHeight: 1, token: "--text-subheading" },
    { role: "body", weight: 900, size: 16, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 900, size: 16, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "compact",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
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
    { level: 0, name: "Aged Paper", value: "#f2e8d5", purpose: "页面底" },
    { level: 1, name: "Red Plane", value: "#cc0000", purpose: "红色斜切块" },
    { level: 2, name: "Ink Plane", value: "#1a1a1a", purpose: "黑色块" },
  ],
  elevation: [
    { name: "Hard offset", value: "4px 4px 0 #1a1a1a" },
    { name: "Hard offset lg", value: "8px 8px 0 #1a1a1a" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Diagonal Plane",
      role: { zh: "斜切色块（核心组件）", en: "The diagonal plane — the core component" },
      construction: {
        zh: "一个填红或黑的矩形，用 transform: rotate(-6deg) skewX(3deg) 倾斜，或直接用 clip-path 切出斜边。零圆角，可选 4px 黑色描边。它不被容器裁切，允许溢出页面边缘，产生「切进纸里」的感觉。",
        en: "A rectangle filled red or black, tilted by rotate(-6deg) skewX(3deg) or cut with a clip-path slant. Zero radius, optionally stroked at 4px black. It is never clipped by its container and may bleed past the page edge, producing the cut-into-paper effect.",
      },
    },
    {
      name: "Agitprop Headline",
      role: { zh: "标语式标题", en: "The agitprop headline" },
      construction: {
        zh: "80 到 112px、900 字重、全大写、行高 0.88、字距 -0.03em，本身旋转 -3 度。允许分三行堆叠并与色块重叠，但文字必须在最上层。部分词可反白（在红色块上）或转红。",
        en: "80 to 112px at weight 900, uppercase, 0.88 leading and -0.03em tracking, rotated -3 degrees. It may stack three lines and overlap a color plane as long as type stays on top. Some words may reverse out on a red block or turn red.",
      },
    },
    {
      name: "Block Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "红填充、旧纸色文字、4px 黑边、零圆角、16px/900 全大写、padding 12px 28px，硬阴影 4px 4px 0 墨。hover 时填充转黑、文字转旧纸、阴影扩到 8px；按下时位移 4px 4px 且阴影归零。过渡 100ms linear。",
        en: "Red fill, aged-paper text, a 4px black border, zero radius, 16px/900 uppercase, 12px 28px padding, hard shadow 4px 4px 0 in ink. Hover flips the fill to black with paper text and widens the shadow to 8px; press translates 4px 4px and zeroes it. 100ms linear.",
      },
      sizes: "padding 12px 28px; label 16px",
      states: "hover: inverted, shadow 8px; active: translate 4px",
    },
    {
      name: "Bar Divider",
      role: { zh: "粗横条分隔", en: "The heavy bar divider" },
      construction: {
        zh: "高 8px 或 16px 的纯黑或纯红横条，横跨全宽，可倾斜 -2 度。它替代留白来分隔区块——构成主义不用空，用块。",
        en: "An 8px or 16px bar in solid black or red spanning the full width, optionally tilted -2 degrees. It divides sections instead of whitespace — Constructivism uses blocks, not gaps.",
      },
    },
    {
      name: "Number Stamp",
      role: { zh: "大号数字标记", en: "The oversized numeral" },
      construction: {
        zh: "80 到 160px 的 900 字重数字，颜色红或黑，可半透明（30%）压在色块上作为背景标记。用于章节编号与数据强调，一屏最多两处。",
        en: "A 900-weight numeral from 80 to 160px in red or black, optionally at 30% opacity over a block as a background mark. It carries section numbers and data emphasis, twice per screen at most.",
      },
    },
  ],
  imagery: {
    zh: "构成主义海报式图形：几何色块、粗黑剪影、工厂与齿轮、工人剪影、放射线。允许把照片处理成红黑双色调并加粗黑描边。不使用彩色摄影、柔和插画与渐变。",
    en: "Constructivist poster graphics: geometric planes, heavy black silhouettes, factories and gears, worker figures, radiating lines. A photo may be reduced to red-and-black duotone behind a heavy outline. No color photography, soft illustration or gradients.",
  },
  layout: {
    zh: "上限 1200px，允许元素溢出容器与页面边缘。整页以对角线为主要构图手段，区块之间用 8 到 16px 粗条分隔。角度只用三档：-6、0、+3 度，混用更多角度会让版面失序。",
    en: "Capped at 1200px, with elements free to bleed past both container and page. The diagonal is the main device, and sections divide with 8 to 16px bars. Only three angles exist — minus six, zero and plus three degrees — and adding more collapses the layout into noise.",
  },
  dos: [
    { zh: "严格三色：红、黑、旧纸", en: "Exactly three colors: red, black, aged paper" },
    { zh: "对角线与斜切色块", en: "Diagonals and slanted planes" },
    { zh: "只有 900 一个字重，全大写", en: "One weight at 900, uppercase" },
    { zh: "4px 黑边加 4px 硬阴影", en: "4px black borders with 4px hard shadows" },
    { zh: "角度只用 -6、0、+3 三档", en: "Only three angles: -6, 0 and +3" },
    { zh: "用粗条分隔区块而不是留白", en: "Divide with bars rather than whitespace" },
  ],
  donts: [
    { zh: "不要用柔和圆角", en: "No soft radii" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要超出三色体系", en: "Never leave the three-color system" },
    { zh: "不要用超过三档角度", en: "Never exceed three angles" },
    { zh: "不要用细边框", en: "No thin borders" },
    { zh: "不要用柔和插画", en: "No soft illustration" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#f2e8d5",
      red: "#cc0000",
      ink: "#1a1a1a",
      gold: "#d4a843",
      ochre: "#8b4513",
    },
    prompts: [
      {
        zh: "做一个构成主义海报版面：旧纸底 #f2e8d5，一个红色 #cc0000 的斜切色块（transform: rotate(-6deg) skewX(3deg)、零圆角、4px 黑边）从左侧切入并溢出容器。标题 112px/900 全大写、行高 0.88、字距 -0.03em、rotate(-3deg)、色 #1a1a1a，与色块重叠但压在最上层。按钮红填充、旧纸色文字、4px 黑边、零圆角、box-shadow 4px 4px 0 #1a1a1a，hover 时黑白反转。区块之间用 16px 纯黑横条分隔。全页只用红、黑、旧纸三色。",
        en: "Build a constructivist poster: aged paper #f2e8d5 with a red #cc0000 plane (transform rotate(-6deg) skewX(3deg), zero radius, 4px black border) cutting in from the left and bleeding past the container. The headline runs 112px/900 uppercase at 0.88 leading and -0.03em, rotated -3 degrees in #1a1a1a, overlapping the plane while staying on top. The button fills red with paper text, a 4px black border, zero radius and box-shadow 4px 4px 0 #1a1a1a, inverting on hover. Sections divide with 16px solid black bars. Only red, black and aged paper appear.",
      },
    ],
  },
  similar: [
    { name: "Swiss Poster", why: { zh: "同样超大标题，但瑞士海报保持水平与网格，构成主义倾斜", en: "Both oversized type, though Swiss poster stays level on a grid while Constructivism tilts" } },
    { name: "Bauhaus", why: { zh: "同为几何与三色，但包豪斯求秩序，构成主义求冲突", en: "Both geometry and primaries, though Bauhaus seeks order while Constructivism seeks conflict" } },
  ],
  completeness: "full",
};
