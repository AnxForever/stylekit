import type { DesignSpec } from "../types";

export const steampunkSpec: DesignSpec = {
  slug: "steampunk",
  name: "蒸汽朋克",
  nameEn: "Steampunk",
  cover: "/styles/steampunk.svg",
  theme: "dark",
  northStar: {
    zh: "黄铜、铜管、铆钉与齿轮：一台还在冒气的维多利亚机器。",
    en: "Brass, copper pipe, rivets and gears — a Victorian machine still venting steam.",
  },
  summary: {
    zh: "蒸汽朋克来自维多利亚时代的工业机械：深棕底（#3d2b1f 或更深的 #2a1f15）上装黄铜（#b5a642）与铜（#b87333）的金属件，文字用奶油色或黄铜色，衬线字体承担全部排版，边框是铜色半透明细线并配铆钉圆点，按钮用黄铜上下渐变模拟受光的金属面，黄铜光泽靠 0 0 15px 的暖色外发光表现。它禁止纯白背景、禁止现代极简、禁止霓虹与荧光、禁止扁平无质感。",
    en: "Steampunk comes from Victorian industrial machinery: brass (#b5a642) and copper (#b87333) fitted onto deep brown (#3d2b1f or the darker #2a1f15), with cream or brass text, serif type carrying all the setting, copper-toned translucent hairlines studded with rivet dots, and buttons using a top-to-bottom brass gradient to imitate a lit metal face. The brass lustre comes from a 0 0 15px warm glow. Pure white grounds, modern minimalism, neon and fluorescent color, and flat surfaces without material are all refused.",
  },
  colors: [
    {
      name: "黄铜",
      nameEn: "Brass",
      value: "#b5a642",
      group: "brand",
      role: {
        zh: "主金属色：按钮、描边与文字高光。",
        en: "The primary metal on buttons, strokes and text highlights.",
      },
      token: "--color-brass",
    },
    {
      name: "深棕",
      nameEn: "Deep Brown",
      value: "#3d2b1f",
      group: "surface",
      role: {
        zh: "页面底与面板。皮革与旧木的颜色。",
        en: "The page ground and panels — leather and old wood.",
      },
      token: "--color-deep-brown",
    },
    {
      name: "铜",
      nameEn: "Copper",
      value: "#b87333",
      group: "accent",
      role: {
        zh: "第二金属色：管道、铆钉与边框。",
        en: "The second metal on pipes, rivets and borders.",
      },
      token: "--color-copper",
    },
    {
      name: "奶油",
      nameEn: "Cream",
      value: "#f5f0e1",
      group: "surface",
      role: {
        zh: "主要文字与标签纸色。",
        en: "Primary text and label stock.",
      },
      token: "--color-cream",
    },
    {
      name: "铁灰",
      nameEn: "Iron",
      value: "#4a4a4a",
      group: "neutral",
      role: {
        zh: "次级金属件与压印槽。",
        en: "Secondary metal fittings and debossed grooves.",
      },
      token: "--color-iron",
    },
    {
      name: "氧绿",
      nameEn: "Verdigris",
      value: "#5a9025",
      group: "accent",
      role: {
        zh: "铜氧化的绿，用于「已使用」的痕迹与状态。",
        en: "Oxidised copper green, on wear marks and status.",
      },
      token: "--color-verdigris",
    },
  ],
  fonts: [
    {
      family: "Playfair Display",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700],
      sizes: [15, 18, 22, 30, 40, 54],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.7 },
      tracking: { display: "0.02em", label: "0.16em" },
      role: {
        zh: "全站衬线，标题加宽字距像铭牌，正文行高 1.7。",
        en: "Serif throughout, headings on wide tracking like an engraved plate, body at 1.7 leading.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 54, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 40, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 30, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 22, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 18, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 700, size: 15, lineHeight: 1.5, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1080,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "inputs", value: "4px" },
    { element: "gauges", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Dark Brown", value: "#2a1f15", purpose: "页面底" },
    { level: 1, name: "Deep Brown", value: "#3d2b1f", purpose: "面板" },
    { level: 2, name: "Brass Plate", value: "#b5a642", purpose: "金属件" },
  ],
  elevation: [
    { name: "Brass glow", value: "0 0 15px rgba(181,166,66,0.30)" },
    { name: "Brass glow strong", value: "0 0 30px rgba(181,166,66,0.50)" },
    { name: "Metal drop", value: "0 6px 16px rgba(0,0,0,0.45)" },
  ],
  components: [
    {
      name: "Brass Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "黄铜上下渐变（#c9b84e 到 #8a7d32）、深棕文字、4px 圆角、1px 铜色 50% 描边、18px/700、字距 0.08em、padding 14px 32px，外发光 0 0 15px 黄铜 30% 加 inset 0 1px 0 白 30% 的顶部高光。hover 时发光扩到 30px、渐变整体提亮；按下时渐变反向并加深内阴影。过渡 200ms。",
        en: "A brass gradient (#c9b84e to #8a7d32), deep brown text, 4px radius, a 1px copper border at 50%, 18px/700 at 0.08em, 14px 32px padding, with a 0 0 15px glow at 30% brass and an inset 0 1px 0 white at 30% for the top highlight. Hover widens the glow to 30px and brightens the gradient; press inverts it and deepens the inner shadow. 200ms.",
      },
      sizes: "padding 14px 32px; label 18px",
      states: "hover: glow 30px, brighter; active: inverted gradient",
    },
    {
      name: "Riveted Panel",
      role: { zh: "铆钉面板（核心组件）", en: "The riveted panel — the core component" },
      construction: {
        zh: "深棕填充、4px 圆角、1px 铜色 50% 描边、内边距 32px，边缘每隔 24px 放一个 6px 的铜色圆点（铆钉），四角各一个 8px 的铆钉。外发光 0 0 15px 黄铜 30%。耳钉必须等距——手工感不等于随意。",
        en: "Deep brown fill, 4px radius, a 1px copper border at 50%, 32px padding, with a 6px copper dot every 24px along the edge and an 8px rivet at each corner. A 0 0 15px glow at 30% brass surrounds it. The rivets stay evenly spaced — handmade does not mean careless.",
      },
    },
    {
      name: "Gear Ornament",
      role: { zh: "齿轮装饰", en: "The gear ornament" },
      construction: {
        zh: "一个 48 到 120px 的齿轮（12 到 20 个齿，用 clip-path polygon 或 SVG），填黄铜或铜，中心挖一个 20% 直径的孔，缓慢旋转（20s linear 无限）。可两三个咬合排列。单屏不超过三处，旋转必须慢，快转会变成游乐场。",
        en: "A gear 48 to 120px across with twelve to twenty teeth (a clip-path polygon or SVG), filled brass or copper, a hole at 20% of its diameter, rotating slowly on a twenty-second linear loop. Two or three may mesh. At most three per screen, and rotation stays slow — speed turns it into a carnival.",
      },
    },
    {
      name: "Pressure Gauge",
      role: { zh: "压力表盘读数", en: "The pressure gauge readout" },
      construction: {
        zh: "96 到 160px 的圆形表盘：黄铜描边 3px、奶油色盘面、12 个刻度（每 30 度一个，长 8px）、一根铜色指针按数值旋转、中心一个 8px 铆钉。数值用衬线 18px 放在表盘下方。",
        en: "A 96 to 160px dial with a 3px brass ring, cream face, twelve ticks (one per thirty degrees, 8px long), a copper needle rotating to the value and an 8px rivet at the centre. The figure sits beneath in 18px serif.",
      },
    },
    {
      name: "Pipe Divider",
      role: { zh: "管道分隔", en: "The pipe divider" },
      construction: {
        zh: "一条 8px 高的铜色横条，两端各一个 12px 的圆形法兰（带 4 个铆钉），中间可加一个 90 度弯头。它替代普通分隔线，用来表达「这是同一套管路」。",
        en: "An 8px copper bar with a 12px circular flange at each end (carrying four rivets), optionally bending through a right angle. It replaces the ordinary divider to say that this belongs to the same plumbing.",
      },
    },
  ],
  imagery: {
    zh: "工业摄影与机械插画：齿轮、管道、压力表、飞艇、怀表。必须有金属反光与暖调。允许把照片处理成棕褐单色。不使用现代城市、极简产品与冷调摄影。",
    en: "Industrial photography and mechanical illustration: gears, pipes, gauges, airships, pocket watches. It needs metal highlights and a warm cast, and a photo may be graded sepia. No modern cities, minimal products or cool-toned photography.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 112px。允许面板层叠与铆钉边框。整页保持暗棕，金属件只在需要被注意的地方出现，绝不整屏都是黄铜。",
    en: "Capped at 1080px with 24px padding, sections 112px apart. Panels may layer and every panel may carry rivets. The page stays dark brown, and metal appears only where attention is wanted — never a screen entirely of brass.",
  },
  dos: [
    { zh: "深棕底配黄铜与铜", en: "Deep brown ground with brass and copper" },
    { zh: "衬线字体，宽字距像铭牌", en: "Serif on wide tracking, like an engraved plate" },
    { zh: "面板边缘必须有铆钉", en: "Panel edges carry rivets" },
    { zh: "按钮用黄铜渐变显受光", en: "Buttons use a brass gradient for the lit face" },
    { zh: "黄铜光泽用暖色外发光", en: "Brass lustre comes from a warm glow" },
    { zh: "齿轮转动 20s 起，很慢", en: "Gears turn over 20s or slower" },
  ],
  donts: [
    { zh: "不要用纯白背景", en: "No pure white grounds" },
    { zh: "不要做现代极简", en: "No modern minimalism" },
    { zh: "不要用霓虹或荧光色", en: "No neon or fluorescent color" },
    { zh: "不要用扁平无质感的设计", en: "No flat surface without material" },
    { zh: "不要让整屏都是黄铜", en: "Never fill a screen with brass" },
    { zh: "不要让齿轮转快", en: "Never speed up the gears" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f5f0e1",
      background: "#2a1f15",
      panel: "#3d2b1f",
      brass: "#b5a642",
      copper: "#b87333",
      cream: "#f5f0e1",
    },
    prompts: [
      {
        zh: "做一个蒸汽朋克按钮：background linear-gradient(to bottom, #c9b84e, #8a7d32)、深棕文字 #2a1f15、4px 圆角、1px rgba(184,115,51,0.5) 描边、18px/700 字距 0.08em、padding 14px 32px、box-shadow 0 0 15px rgba(181,166,66,0.3), inset 0 1px 0 rgba(255,255,255,0.3)。hover 时发光扩到 0 0 30px rgba(181,166,66,0.5)。页面底 #2a1f15，面板 #3d2b1f 带 1px 铜色描边与每 24px 一个 6px 铜色铆钉。标题用 Playfair Display 40px/700、字距 0.16em、色 #f5f0e1。",
        en: "Build a steampunk button: background linear-gradient(to bottom, #c9b84e, #8a7d32), deep brown text #2a1f15, 4px radius, a 1px rgba(184,115,51,0.5) border, 18px/700 at 0.08em, 14px 32px padding, box-shadow 0 0 15px rgba(181,166,66,0.3) with inset 0 1px 0 rgba(255,255,255,0.3). Hover widens the glow to 0 0 30px rgba(181,166,66,0.5). The page ground is #2a1f15 with #3d2b1f panels carrying a 1px copper border and a 6px copper rivet every 24px. Headings run Playfair Display 40px/700 at 0.16em in #f5f0e1.",
      },
    ],
  },
  similar: [
    { name: "Retro Vintage", why: { zh: "同为年代感，但复古怀旧是印刷，蒸汽朋克是机械", en: "Both period pieces, though retro vintage is print while steampunk is machinery" } },
    { name: "Dark Academia", why: { zh: "同为暗棕与金，但暗黑学院是书，蒸汽朋克是机器", en: "Both dark brown and gold, though dark academia is books while steampunk is machines" } },
  ],
  completeness: "full",
};
