import type { DesignSpec } from "../types";

export const memphisSpec: DesignSpec = {
  slug: "memphis",
  name: "孟菲斯风格",
  nameEn: "Memphis",
  cover: "/styles/memphis.svg",
  theme: "light",
  northStar: {
    zh: "撞色、粗边、几何乱飞：把 1981 年米兰那群人的玩笑做成界面。",
    en: "Clashing color, thick borders, shapes flying about — the 1981 Milan joke, turned into an interface.",
  },
  summary: {
    zh: "孟菲斯是 1981 年米兰设计团体对现代主义的反驳：不要克制，要撞色；不要网格，要不规则。落到界面上有两条硬规则——第一，几何装饰必须存在，而且 hover 时要各自朝不同方向移动或旋转（Playful Chaos）；第二，标题与文字允许在 hover 时瞬间反转成高饱和撞色（Pop Swap），150ms 硬切。边框一律 4px 纯黑，阴影是硬偏移且按下时归零。它禁止单调配色、禁止过于对称的布局、也禁止几何装饰在 hover 时保持静止。",
    en: "Memphis is the 1981 Milan collective's rebuttal to modernism: not restraint but clash, not grid but irregularity. Two rules hold on screen. First, geometric ornament must exist, and on hover each piece travels or rotates in its own direction (Playful Chaos). Second, headings and labels may flip instantly into a saturated clash color (Pop Swap), a 150ms hard cut. Borders are 4px pure black, shadows are hard offsets that vanish on press. Monotone palettes, overly symmetrical layouts and static ornament on hover are all refused.",
  },
  colors: [
    {
      name: "珊瑚",
      nameEn: "Coral",
      value: "#ff6b6b",
      group: "brand",
      role: {
        zh: "第一撞色与主行动。孟菲斯的起点，永远与黄、蓝对撞使用。",
        en: "The first clash color and primary action — always set against yellow and blue.",
      },
      token: "--color-coral",
    },
    {
      name: "蜜黄",
      nameEn: "Honey",
      value: "#feca57",
      group: "accent",
      role: {
        zh: "第二撞色与高亮底。常作为 Coral 的直接对手。",
        en: "The second clash and highlight ground, usually directly opposing coral.",
      },
      token: "--color-honey",
    },
    {
      name: "电蓝",
      nameEn: "Electric Blue",
      value: "#48dbfb",
      group: "accent",
      role: {
        zh: "第三撞色与链接，用于打破红黄的暖调。",
        en: "The third clash and links, breaking the warmth of red and yellow.",
      },
      token: "--color-electric-blue",
    },
    {
      name: "糖果粉",
      nameEn: "Bubblegum",
      value: "#ff9ff3",
      group: "accent",
      role: {
        zh: "几何装饰专用，几乎不用于文字。",
        en: "Reserved for geometric ornament, almost never on text.",
      },
      token: "--color-bubblegum",
    },
    {
      name: "薄荷绿",
      nameEn: "Mint",
      value: "#1dd1a1",
      group: "accent",
      role: {
        zh: "成功状态与第四撞色，面积最小。",
        en: "Success and the fourth clash — the smallest area of the set.",
      },
      token: "--color-mint",
    },
    {
      name: "葡萄紫",
      nameEn: "Grape",
      value: "#5f27cd",
      group: "accent",
      role: {
        zh: "深色撞色，用于压在浅底上做形状或次要按钮。",
        en: "The dark clash, for shapes and secondary buttons on light grounds.",
      },
      token: "--color-grape",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [700, 900],
      sizes: [14, 18, 24, 32, 44, 60],
      lineHeight: { display: 1, heading: 1.1, body: 1.5 },
      tracking: { display: "-0.02em", label: "0.06em" },
      role: {
        zh: "全站唯一字体，只用 700 与 900。标题压到行高 1.0，字块本身就是几何形状。",
        en: "The only face, in 700 and 900 only. Headings run at 1.0 leading so the text block becomes one more shape.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 60, lineHeight: 1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 44, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 32, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 18, lineHeight: 1.45, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 700, size: 14, lineHeight: 1.35, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "shapes", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#fdf6e3", purpose: "页面底（暖白）" },
    { level: 1, name: "Coral Block", value: "#ff6b6b", purpose: "强调区块" },
    { level: 2, name: "Honey Block", value: "#feca57", purpose: "高亮区块" },
  ],
  elevation: [
    { name: "Hard offset", value: "6px 6px 0 #000000" },
    { name: "Hard offset lg", value: "10px 10px 0 #000000" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Pop Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "珊瑚填充、白字、4px 纯黑描边、零圆角、6px 硬偏移阴影，14px/700、0.06em 字距、padding 12px 24px。hover 时填充硬切到蜜黄、文字转黑、阴影扩到 10px，绝不向阴影方向位移；按下时位移 6px 6px 且阴影归零。过渡 150ms。",
        en: "Coral fill, white text, a 4px pure black border, zero radius, a 6px hard offset shadow, 14px/700 at 0.06em tracking, 12px 24px padding. Hover cuts the fill to honey, flips the text to black and widens the shadow to 10px — never moving toward the shadow. Press translates 6px 6px and zeroes the shadow. 150ms.",
      },
      states: "hover: color swap, shadow grows; active: translate 6px, shadow none",
    },
    {
      name: "Playground Card",
      role: { zh: "内容卡与作品卡", en: "Content and work cards" },
      construction: {
        zh: "暖白填充、4px 纯黑描边、零圆角、内边距 28px，6px 硬阴影。卡内放 3 到 4 个几何装饰（圆、三角、波浪线），各自不同色。hover 时每个装饰朝不同方向移动 6 到 10px 并各自旋转 8 到 20 度（Playful Chaos），标题文字硬切到撞色（Pop Swap），卡片本身不动。过渡 150ms。",
        en: "Paper fill, a 4px black border, zero radius, 28px padding, a 6px hard shadow. Inside sit three or four geometric ornaments (circle, triangle, wave) in different colors. On hover each ornament travels 6 to 10px in its own direction and rotates 8 to 20 degrees (Playful Chaos), while the title cuts to a clash color (Pop Swap). The card itself does not move. 150ms.",
      },
    },
    {
      name: "Geometric Ornament",
      role: { zh: "几何装饰元素", en: "Geometric ornaments" },
      construction: {
        zh: "只用圆、三角、波浪线与锯齿四种，填撞色之一，可带 3px 黑描边。尺寸 24px 到 96px，绝对定位在卡片或区块的边角并允许溢出边界 8 到 16px。hover 时按各自方向位移与旋转，绝不同步。",
        en: "Only four forms — circle, triangle, wave and zigzag — filled with one clash color and optionally stroked at 3px. Sizes run 24px to 96px, absolutely positioned at corners and allowed to bleed 8 to 16px past the edge. On hover each moves and rotates in its own direction, never in sync.",
      },
    },
    {
      name: "Memphis Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "白填充、4px 纯黑描边、零圆角、padding 10px 14px、14px/700。聚焦时描边颜色硬切到电蓝并加 4px 蜜黄硬阴影，不改变尺寸。",
        en: "White fill, a 4px black border, zero radius, 10px 14px padding at 14px/700. Focus cuts the border to electric blue and adds a 4px honey hard shadow without resizing.",
      },
    },
    {
      name: "Zigzag Divider",
      role: { zh: "区块分隔", en: "Section divider" },
      construction: {
        zh: "高 16px 的锯齿折线（clip-path 或 SVG），填撞色之一，横跨内容宽。用于替代直线分隔，同一页面不超过三条。",
        en: "A 16px zigzag (clip-path or SVG) filled with one clash color, spanning the content width. It replaces straight dividers, with no more than three per page.",
      },
    },
  ],
  imagery: {
    zh: "几何图形即是图像，不用摄影。允许 80 年代风格的抽象插画与粗描边线稿。不使用写实摄影、渐变与柔和阴影。",
    en: "Geometry is the imagery; photography is absent. 1980s-style abstract illustration and heavy-stroke line art are welcome. No realistic photography, gradients or soft shadow.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 24px，区块间距 96px。刻意打破对称：元素可偏离网格、可倾斜 -3 到 3 度、装饰可溢出容器。信息仍按 8px 网格落点，混乱只发生在视觉层。",
    en: "Capped at 1200px with 24px padding, sections 96px apart. Symmetry is deliberately broken: elements may leave the grid, tilt between -3 and 3 degrees, and ornament may bleed past the container. Placement still lands on an 8px grid; the chaos stays visual.",
  },
  dos: [
    { zh: "撞色成对使用，不与同色系相邻", en: "Pair clash colors; never place two from one family side by side" },
    { zh: "4px 纯黑描边，零圆角", en: "4px pure black borders, zero radius" },
    { zh: "几何装饰必须有，且 hover 时各自移动", en: "Ornament is mandatory, and each piece moves on hover" },
    { zh: "hover 颜色硬切，150ms", en: "Hover cuts color in 150ms" },
    { zh: "按下位移等于阴影偏移并归零", en: "Press translates the shadow offset and zeroes it" },
    { zh: "标题 900 字重、行高 1.0", en: "Headings at weight 900 on 1.0 leading" },
  ],
  donts: [
    { zh: "不要用单调或低饱和配色", en: "No monotone or desaturated palettes" },
    { zh: "不要用对称规整的布局", en: "No symmetrical orderly layouts" },
    { zh: "不要用细边框", en: "No thin borders" },
    { zh: "不要省略几何装饰", en: "Never omit the geometric ornament" },
    { zh: "不要让装饰在 hover 时静止", en: "Never let ornament stay still on hover" },
    { zh: "不要在 hover 时向阴影方向位移", en: "Do not move toward the shadow on hover" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#fdf6e3",
      coral: "#ff6b6b",
      honey: "#feca57",
      blue: "#48dbfb",
      mint: "#1dd1a1",
    },
    prompts: [
      {
        zh: "做一个孟菲斯按钮：背景 #ff6b6b、白字、4px solid #000 边框、border-radius 0、700 字重 14px、0.06em 字距、padding 12px 24px、box-shadow 6px 6px 0 #000。hover 时背景硬切到 #feca57、文字转黑、阴影扩到 10px 10px 0 #000，不做位移。active 时 translate(6px,6px) 且 box-shadow none。transition 150ms。页面底色 #fdf6e3。",
        en: "Build a Memphis button: background #ff6b6b, white text, a 4px solid #000 border, border-radius 0, weight 700 at 14px with 0.06em tracking, 12px 24px padding, box-shadow 6px 6px 0 #000. Hover cuts the background to #feca57, flips the text to black and widens the shadow to 10px 10px 0 #000 without translating. Active applies translate(6px,6px) and box-shadow none. Transition 150ms. The page ground is #fdf6e3.",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist Playful", why: { zh: "同样撞色与硬边，但孟菲斯更依赖几何装饰的乱动", en: "Also clashing color and hard edges, though Memphis depends on ornament moving chaotically" } },
    { name: "Bauhaus", why: { zh: "同一批几何形状，但包豪斯要求秩序，孟菲斯要求混乱", en: "The same geometric family, though Bauhaus demands order where Memphis demands chaos" } },
  ],
  completeness: "full",
};
