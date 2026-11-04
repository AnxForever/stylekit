import type { DesignSpec } from "../types";

export const ukiyoEDigitalSpec: DesignSpec = {
  slug: "ukiyo-e-digital",
  name: "浮世绘数字风",
  nameEn: "Ukiyo-e Digital",
  cover: "/styles/ukiyo-e-digital.svg",
  theme: "light",
  northStar: {
    zh: "靛蓝、朱红、金箔压在粗线条里：一版套一版的木刻。",
    en: "Indigo, vermilion and gold leaf inside heavy outlines — one woodblock after another.",
  },
  summary: {
    zh: "浮世绘数字风来自日本木版画的套色工艺：靛蓝、朱红、金箔三色为主，形用粗线条勾出，色块平涂，构图取北斋式的斜向动势与波浪纹。它的交互语言也照搬版画——hover 时元素做硬边偏移位移（像第二版印歪了一点），绝不允许柔和模糊。禁令很硬：不许渐变阴影与柔和模糊、不许透明度与玻璃效果、不许西式圆角与圆形按钮、不许霓虹、不许弹簧回弹与丝滑动效。",
    en: "Ukiyo-e Digital comes from Japanese woodblock color printing: indigo, vermilion and gold leaf lead, forms are drawn with heavy outlines, fills are flat, and the composition borrows Hokusai's diagonal momentum and wave patterns. Its interaction language follows the medium too — hover applies a hard-edged offset shift, as if the second block printed slightly off, and soft blur is never allowed. The prohibitions are firm: no gradient shadows or soft blur, no transparency or glass, no Western radii or circular buttons, no neon, and no spring or silky modern motion.",
  },
  colors: [
    {
      name: "靛蓝",
      nameEn: "Indigo",
      value: "#1a3055",
      group: "brand",
      role: {
        zh: "主色：文字、粗线条与深色区块。木版画里的「蓝摺」。",
        en: "The primary on text, heavy outlines and dark blocks — the aizuri blue of woodblock printing.",
      },
      token: "--color-indigo",
    },
    {
      name: "和纸",
      nameEn: "Washi",
      value: "#f5f0e1",
      group: "surface",
      role: {
        zh: "纸底。米白的和纸色，所有色块压在它上面。",
        en: "The paper ground — cream washi that every block sits on.",
      },
      token: "--color-washi",
    },
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#d4553a",
      group: "accent",
      role: {
        zh: "第一强调：印章、日出与警示。是画面里唯一的暖色重音。",
        en: "The first accent on seals, sunrise and warnings — the one warm accent in the frame.",
      },
      token: "--color-vermilion",
    },
    {
      name: "金箔",
      nameEn: "Gold Leaf",
      value: "#c9a227",
      group: "accent",
      role: {
        zh: "贵重与高光，面积必须小，像贴上去的金箔。",
        en: "Preciousness and highlight at a small area, like applied leaf.",
      },
      token: "--color-gold-leaf",
    },
    {
      name: "群青",
      nameEn: "Ultramarine",
      value: "#2a5a8c",
      group: "accent",
      role: {
        zh: "第二层蓝，用于水与远景，比主靛更亮。",
        en: "The second blue on water and distance, brighter than the primary indigo.",
      },
      token: "--color-ultramarine",
    },
    {
      name: "若草",
      nameEn: "Young Grass",
      value: "#747800",
      group: "accent",
      role: {
        zh: "植物与苔，出现频率最低。",
        en: "Plants and moss, used least.",
      },
      token: "--color-young-grass",
    },
  ],
  fonts: [
    {
      family: "Noto Serif SC",
      substitute: "'Songti SC', Georgia, serif",
      weights: [600, 700],
      sizes: [16, 20, 26, 34, 46, 60],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.7 },
      tracking: { display: "0.02em", label: "0.2em" },
      role: {
        zh: "标题用粗衬线并放宽字距，像版画上的题签。正文同族但更细，行高 1.7。",
        en: "Headings in heavy serif on wide tracking, like a cartouche on a print; body in the same family at a lighter weight on 1.7 leading.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Noto Serif SC", weight: 700, size: 60, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Noto Serif SC", weight: 700, size: 46, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", font: "Noto Serif SC", weight: 600, size: 34, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", font: "Noto Serif SC", weight: 600, size: 20, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", font: "Noto Serif SC", weight: 600, size: 16, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Noto Serif SC", weight: 700, size: 16, lineHeight: 1.5, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1100,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "seals", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Washi", value: "#f5f0e1", purpose: "纸底" },
    { level: 1, name: "Indigo Block", value: "#1a3055", purpose: "深色区块" },
    { level: 2, name: "Vermilion Block", value: "#d4553a", purpose: "强调区块" },
  ],
  elevation: [
    { name: "Woodblock offset", value: "4px 4px 0 #1a3055" },
    { name: "Woodblock hover", value: "6px 6px 0 #1a3055" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Woodblock Card",
      role: { zh: "版画卡片（核心组件）", en: "The woodblock card — the core component" },
      construction: {
        zh: "和纸填充、零圆角、3px 靛蓝描边、内边距 32px，硬阴影 4px 4px 0 靛蓝。顶部或底部用 4px 的朱红横条压边。hover 时硬阴影扩到 6px 并整体位移 2px 2px（模拟第二版印歪），过渡 150ms linear。",
        en: "Washi fill, zero radius, a 3px indigo border, 32px padding, hard shadow 4px 4px 0 in indigo. A 4px vermilion bar caps the top or bottom. Hover widens the shadow to 6px and shifts the whole block 2px 2px, as if the second block printed off, over 150ms linear.",
      },
      states: "hover: shadow 6px, offset 2px",
    },
    {
      name: "Seal Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "朱红填充、和纸文字、零圆角（绝不是圆形）、3px 靛蓝描边、20px/700、字距 0.2em、padding 14px 32px，硬阴影 4px 4px 0 靛蓝。hover 时阴影扩到 6px 且整体位移 2px 2px；按下时阴影归零并下沉。过渡 120ms linear。",
        en: "Vermilion fill, washi text, zero radius (never circular), a 3px indigo border, 20px/700 at 0.2em tracking, 14px 32px padding, hard shadow 4px 4px 0 in indigo. Hover widens the shadow to 6px with a 2px 2px shift; press zeroes the shadow and sinks. 120ms linear.",
      },
      sizes: "padding 14px 32px; label 20px",
      states: "hover: shadow 6px, offset 2px; active: shadow none",
    },
    {
      name: "Wave Pattern",
      role: { zh: "波浪纹装饰", en: "The wave pattern" },
      construction: {
        zh: "用重复的圆弧（SVG path 或 border-radius 拼合）画出北斋式波浪，线宽 3px、靛蓝或群青，高度 48 到 120px。只出现在区块的上下边，单屏不超过两处。",
        en: "Repeating arcs (an SVG path or assembled radii) draw Hokusai waves at a 3px stroke in indigo or ultramarine, 48 to 120px tall. They cap a section's top or bottom and appear at most twice per screen.",
      },
    },
    {
      name: "Gold Seal",
      role: { zh: "印章标记", en: "The seal mark" },
      construction: {
        zh: "32px 见方的朱红或金箔方块（4px 圆角）、内嵌 20px 的和纸色衬线单字、边缘做 1px 的残缺（mask 切掉几像素）。用于标记章节与「已阅」。",
        en: "A 32px square in vermilion or gold leaf on a 4px radius, holding a 20px washi serif character, with a 1px chipped edge cut by mask. It marks chapters and read states.",
      },
    },
    {
      name: "Cartouche Label",
      role: { zh: "题签标签", en: "The cartouche label" },
      construction: {
        zh: "靛蓝填充、和纸文字、零圆角、16px/700、字距 0.2em、padding 6px 14px，左侧加一条 3px 金箔竖线。用于栏目名与编号，位置常在区块左上。",
        en: "Indigo fill, washi text, zero radius, 16px/700 at 0.2em, 6px 14px padding, with a 3px gold leaf rule on the left. It names a section and carries its number, usually top-left of a block.",
      },
    },
  ],
  imagery: {
    zh: "木版画风插画：波浪、富士、花鸟、人物侧面，必须粗描边加平涂。允许把照片处理成三色木刻效果。不使用柔和渐变、写实摄影与玻璃质感。",
    en: "Woodblock-style illustration: waves, Fuji, birds and flowers, figures in profile, all heavy outline with flat fill. A photo may be reduced to a three-color woodcut. No soft gradients, realistic photography or glass.",
  },
  layout: {
    zh: "上限 1100px、容器内边距 24px，区块间距 112px。允许斜向构图与元素错位（模拟套版），但正文保持可读。零圆角贯穿全站。",
    en: "Capped at 1100px with 24px padding, sections 112px apart. Diagonal composition and offset elements are welcome as a nod to registration, while body text stays readable. Zero radius runs throughout.",
  },
  dos: [
    { zh: "靛蓝、朱红、金箔三色为主", en: "Lead with indigo, vermilion and gold leaf" },
    { zh: "3px 粗描边勾形", en: "Outline forms at 3px" },
    { zh: "硬边偏移阴影，零模糊", en: "Hard offset shadows with zero blur" },
    { zh: "零圆角，绝不圆形按钮", en: "Zero radius; never circular buttons" },
    { zh: "hover 做版画式偏移位移", en: "Hover shifts like a block printing off" },
    { zh: "粗衬线配宽字距", en: "Heavy serif on wide tracking" },
  ],
  donts: [
    { zh: "不要用渐变阴影或柔和模糊", en: "No gradient shadows or soft blur" },
    { zh: "不要用透明度与玻璃效果", en: "No transparency or glass" },
    { zh: "不要用西式圆角与圆形按钮", en: "No Western radii or circular buttons" },
    { zh: "不要用霓虹或高饱和现代色", en: "No neon or saturated modern color" },
    { zh: "不要用弹簧回弹", en: "No spring rebound" },
    { zh: "不要用丝滑的现代动效", en: "No silky modern motion" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a3055",
      background: "#f5f0e1",
      vermilion: "#d4553a",
      gold: "#c9a227",
      ultramarine: "#2a5a8c",
      ink: "#1a3055",
    },
    prompts: [
      {
        zh: "做一个浮世绘风卡片：和纸色 #f5f0e1 填充、零圆角、3px solid #1a3055 描边、内边距 32px、box-shadow 4px 4px 0 #1a3055。顶部压一条 4px #d4553a 横条。标题 46px 粗衬线、字距 0.02em、色 #1a3055。hover 时阴影扩到 6px 6px 0 #1a3055 并 translate(2px,2px)，transition 150ms linear。按钮用 #d4553a 填充、和纸色文字、零圆角、3px 靛蓝描边、硬阴影。页面底色 #f5f0e1。全站零圆角、零模糊。",
        en: "Build a ukiyo-e card: washi #f5f0e1 fill, zero radius, a 3px solid #1a3055 border, 32px padding, box-shadow 4px 4px 0 #1a3055. A 4px #d4553a bar caps the top. The title runs 46px heavy serif at 0.02em in #1a3055. Hover widens the shadow to 6px 6px 0 #1a3055 with translate(2px,2px) over 150ms linear. Buttons fill #d4553a with washi text, zero radius, a 3px indigo border and a hard shadow. The page ground is #f5f0e1, with zero radius and zero blur throughout.",
      },
    ],
  },
  similar: [
    { name: "Ink Wash", why: { zh: "同属日本传统，但水墨讲墨色浓淡，浮世绘讲套色与粗线", en: "Both Japanese tradition, though ink wash works in ink density while ukiyo-e works in spot color and heavy line" } },
    { name: "Retro Vintage", why: { zh: "同为印刷工艺感，但复古怀旧是西方油墨，浮世绘是木版套色", en: "Both print-craft, though retro vintage is Western ink while ukiyo-e is woodblock color" } },
  ],
  completeness: "full",
};
