import type { DesignSpec } from "../types";

export const antiDesignSpec: DesignSpec = {
  slug: "anti-design",
  name: "反设计",
  nameEn: "Anti-Design",
  cover: "/styles/anti-design.svg",
  theme: "light",
  northStar: {
    zh: "把界面设计的所有规矩一次违反掉，但每一条都违反得有意。",
    en: "Break every interface convention at once, and break each one on purpose.",
  },
  summary: {
    zh: "反设计是故意对抗 UI 常规的实验性野兽派：4 到 8px 的超粗黑边框包住一切，边框不对称（右与下更厚），只用直角，阴影是 8px 的硬偏移，颜色用最高饱和的原色（红蓝黄品红青绿），间距与对齐刻意不一致，字体大小忽大忽小。它的「乱」是有成本核算的——每条违规都必须可复现、可解释，而不是随手乱放。这也是它与普通劣质页面的区别：反设计的混乱是受控的。",
    en: "Anti-Design is experimental brutalism that deliberately opposes UI convention: 4 to 8px heavy black borders on everything, asymmetric with thicker right and bottom edges, right angles only, 8px hard offset shadows, maximum-saturation primaries (red, blue, yellow, magenta, cyan, green), inconsistent spacing and alignment, and type sizes that jump. Its disorder is costed — every violation is reproducible and explainable rather than careless. That is what separates it from an ordinary bad page: the chaos is controlled.",
  },
  colors: [
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "超粗边框、硬阴影与文字。整套结构的重量来源。",
        en: "The heavy borders, hard shadows and type — all the structural weight.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "画布。保留纯白，让原色更刺眼。",
        en: "The canvas, kept pure so the primaries sting more.",
      },
      token: "--color-white",
    },
    {
      name: "原红",
      nameEn: "Red",
      value: "#ff0000",
      group: "accent",
      role: {
        zh: "第一撞色，常与黑边并存于同一块。",
        en: "The first clash, often sharing a block with the black border.",
      },
      token: "--color-red",
    },
    {
      name: "原蓝",
      nameEn: "Blue",
      value: "#0000ff",
      group: "accent",
      role: {
        zh: "第二撞色与链接色。",
        en: "The second clash and the link color.",
      },
      token: "--color-blue",
    },
    {
      name: "原黄",
      nameEn: "Yellow",
      value: "#ffff00",
      group: "accent",
      role: {
        zh: "高亮底，用于让黑字跳出来。",
        en: "The highlight ground that makes black type jump.",
      },
      token: "--color-yellow",
    },
    {
      name: "品红",
      nameEn: "Magenta",
      value: "#ff00ff",
      group: "accent",
      role: {
        zh: "第三撞色，用于打破红蓝黄的三原色秩序。",
        en: "The third clash, breaking the red-blue-yellow order.",
      },
      token: "--color-magenta",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#00ffff",
      group: "accent",
      role: {
        zh: "第四撞色，常作背景让其他色块浮起来。",
        en: "The fourth clash, often a ground that floats other blocks.",
      },
      token: "--color-cyan",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [400, 700, 900],
      sizes: [11, 16, 28, 48, 72, 110],
      lineHeight: { display: 0.9, heading: 1, body: 1.4 },
      tracking: { display: "-0.04em", label: "0" },
      role: {
        zh: "全站无衬线，但字级刻意不统一——同一个区块里可能同时出现 11px 与 110px。",
        en: "Sans throughout, with sizes deliberately unaligned — one block may hold 11px and 110px at once.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 110, lineHeight: 0.9, tracking: "-0.04em", token: "--text-display" },
    { role: "heading", weight: 900, size: 72, lineHeight: 0.95, tracking: "-0.03em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 48, lineHeight: 1, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 28, lineHeight: 1.3, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.4, token: "--text-body" },
    { role: "label", weight: 700, size: 11, lineHeight: 1.3, tracking: "0", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [0, 4, 12, 20, 36, 60, 92],
    maxWidth: 1440,
    sectionGap: 36,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "画布" },
    { level: 1, name: "Yellow Block", value: "#ffff00", purpose: "高亮块" },
    { level: 2, name: "Cyan Block", value: "#00ffff", purpose: "反色块" },
  ],
  elevation: [
    { name: "Hard offset", value: "8px 8px 0 #000000" },
    { name: "Hard offset sm", value: "4px 4px 0 #000000" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Asymmetric Frame",
      role: { zh: "不对称粗框（核心组件）", en: "The asymmetric frame — the core component" },
      construction: {
        zh: "4 到 8px 纯黑边框，四边不等宽（例如上 4、右 8、下 8、左 4），零圆角，内边距 20px，硬阴影 8px 8px 0 黑。填充一支原色。同一屏的所有框必须用同一套不对称规则，否则就只是杂乱。",
        en: "A 4 to 8px black border with unequal sides (say 4 top, 8 right, 8 bottom, 4 left), zero radius, 20px padding and an 8px 8px 0 hard shadow on a primary fill. Every frame on a screen follows the same asymmetry rule, or it is merely messy.",
      },
    },
    {
      name: "Slam Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "原色填充（红或蓝）、白或黑字、4px 黑边、零圆角、28px/900、padding 12px 24px，硬阴影 8px 8px 0 黑。hover 时填充硬切到另一个原色并让阴影扩到 12px；按下时位移 8px 8px 且阴影归零。过渡 80ms linear。",
        en: "A primary fill (red or blue), white or black text, a 4px black border, zero radius, 28px/900, 12px 24px padding, hard shadow 8px 8px 0 in black. Hover cuts the fill to another primary and widens the shadow to 12px; press translates 8px 8px and zeroes it. 80ms linear.",
      },
      sizes: "padding 12px 24px; label 28px",
      states: "hover: color swap, shadow 12px; active: translate 8px",
    },
    {
      name: "Broken Grid",
      role: { zh: "刻意的错位网格", en: "The deliberately broken grid" },
      construction: {
        zh: "12 栏网格，但元素按规则偏移 1 到 3 栏（不是随机）：每行至少有一个元素越界，且偏移方向交替。间距在 4、12、20、36 之间跳动。偏移规则一旦写定就必须全局一致。",
        en: "A twelve-column grid where elements offset by one to three columns by rule rather than at random: each row has at least one element out of bounds, and the direction alternates. Gaps jump between 4, 12, 20 and 36. Once the offset rule is written, it holds everywhere.",
      },
    },
    {
      name: "Oversized Numeral",
      role: { zh: "超大数字与字母", en: "Oversized numerals and letters" },
      construction: {
        zh: "110px/900 的数字或单个字母，填原色或黑，可旋转 0 到 12 度，压在区块角落或跨在边框上。用于章节标记与装饰，它的尺寸与旁边的 11px 标签形成极端对比。",
        en: "A 110px/900 numeral or single letter in a primary or black, rotated up to 12 degrees, sitting at a block corner or straddling a border. It marks sections and decorates, its size forming an extreme contrast with the 11px label beside it.",
      },
    },
    {
      name: "Raw Marquee",
      role: { zh: "生硬跑马灯", en: "The raw marquee" },
      construction: {
        zh: "内容复制两份、24s linear 无限循环 translateX 0 到 -50%，字用 48px/900 全大写加原色底。hover 时暂停。不装饰、不淡出，就这么滚过去。",
        en: "Content duplicated twice, looping translateX 0 to -50% over 24s linear and infinite, set at 48px/900 uppercase on a primary ground. It pauses on hover. No fade, no polish — it simply rolls past.",
      },
    },
  ],
  imagery: {
    zh: "图像本身也要反设计：低分辨率截图、被拉伸的照片、贴错位置的图标、ASCII 图形。允许把图像故意压到 20% 质量。不使用精致摄影与柔和插画，因为「精致」在这里是失格。",
    en: "Imagery should misbehave too: low-resolution screenshots, stretched photographs, icons in the wrong place, ASCII graphics. An image may be deliberately compressed to 20% quality. No polished photography or soft illustration — polish is a disqualification here.",
  },
  layout: {
    zh: "上限 1440px，间距在 4、12、20、36、60、92 之间跳动。元素允许重叠、越界、旋转 0 到 12 度。但偏移与重叠必须服从一套写定的规则，混乱要能复现。",
    en: "Capped at 1440px with gaps jumping between 4, 12, 20, 36, 60 and 92. Elements may overlap, break bounds and rotate up to 12 degrees, but the offsets and overlaps follow a written rule so the chaos reproduces.",
  },
  dos: [
    { zh: "4 到 8px 超粗黑边，四边不等宽", en: "4 to 8px black borders with unequal sides" },
    { zh: "零圆角，只用直角", en: "Zero radius, right angles only" },
    { zh: "8px 硬偏移阴影", en: "8px hard offset shadows" },
    { zh: "最高饱和的原色", en: "Maximum-saturation primaries" },
    { zh: "间距与对齐刻意不一致", en: "Spacing and alignment deliberately inconsistent" },
    { zh: "混乱必须可复现、有规则", en: "The chaos must reproduce from a rule" },
  ],
  donts: [
    { zh: "不要用任何圆角", en: "No rounded corners at all" },
    { zh: "不要用低饱和或柔和的颜色", en: "No muted or soft color" },
    { zh: "不要用一致的对齐", en: "No consistent alignment" },
    { zh: "不要用柔和阴影", en: "No soft shadows" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要随手乱放——违规必须有规则", en: "Never place things carelessly — violations need rules" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      red: "#ff0000",
      blue: "#0000ff",
      yellow: "#ffff00",
      cyan: "#00ffff",
    },
    prompts: [
      {
        zh: "做一个反设计区块：白底、一个红填充的方块、边框上 4px 右 8px 下 8px 左 4px 纯黑、零圆角、box-shadow 8px 8px 0 #000。标题 110px/900 字距 -0.04em 跨在边框上并旋转 -3 度，旁边放一个 11px 的标签形成极端对比。按钮黄填充、4px 黑边、28px/900、硬阴影 8px 8px 0 #000，hover 时填充硬切到青。间距在 4、12、20、36 之间跳动，元素按写定的规则错位 1 到 3 栏。全站零圆角、无渐变。",
        en: "Build an anti-design block: a white ground with a red-filled square framed by 4px top, 8px right, 8px bottom and 4px left black borders, zero radius and box-shadow 8px 8px 0 #000. The headline runs 110px/900 at -0.04em, straddling the border and rotated -3 degrees, with an 11px label beside it for extreme contrast. The button fills yellow with a 4px black border, 28px/900 and an 8px 8px 0 hard shadow, cutting to cyan on hover. Gaps jump between 4, 12, 20 and 36 while elements offset one to three columns by rule. Zero radius and no gradients anywhere.",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist", why: { zh: "同族，但新野兽派遵守对称与统一间距，反设计故意破坏", en: "Same family, though neo-brutalism keeps symmetry and even spacing while anti-design breaks them" } },
    { name: "Brutalist Web", why: { zh: "同为粗野，但网页粗野主义反而极简克制，反设计极度喧闹", en: "Both raw, though web brutalism is austere while anti-design is loud" } },
  ],
  completeness: "full",
};
