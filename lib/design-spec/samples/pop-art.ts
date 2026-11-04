import type { DesignSpec } from "../types";

export const popArtSpec: DesignSpec = {
  slug: "pop-art",
  name: "波普艺术",
  nameEn: "Pop Art",
  cover: "/styles/pop-art.svg",
  theme: "light",
  northStar: {
    zh: "粗黑轮廓、Ben-Day 网点、喊出来的对话框：漫画印在画布上。",
    en: "Heavy black outlines, Ben-Day dots and shouting speech bubbles — a comic page printed as a painting.",
  },
  summary: {
    zh: "波普艺术来自沃霍尔与利希滕斯坦：4px 粗黑边框包住一切，背景铺 Ben-Day 网点（等距圆点），颜色是高饱和的平涂黄、粉、蓝，文字用 900 字重全大写像漫画标题，按钮与卡片带 4px 4px 0 黑的硬阴影。它禁止渐变（一切必须平涂）、禁止低饱和与灰调、禁止 2px 以下细边框、禁止全圆角、禁止极简无装饰——空白的波普等于没画完。",
    en: "Pop Art comes from Warhol and Lichtenstein: 4px black outlines around everything, Ben-Day dot fields behind, flat saturated yellow, pink and blue, type at 900 uppercase like a comic title, and 4px 4px 0 hard shadows on buttons and cards. Gradients are refused since every surface must be flat, along with desaturated and grey palettes, borders under 2px, fully rounded shapes, and minimal undecorated layouts — an empty Pop page is an unfinished one.",
  },
  colors: [
    {
      name: "波普黄",
      nameEn: "Pop Yellow",
      value: "#ffdd00",
      group: "brand",
      role: {
        zh: "主底色与最大色块。整套风格的亮度来源。",
        en: "The main ground and the largest block — the source of all the brightness.",
      },
      token: "--color-pop-yellow",
    },
    {
      name: "波普粉",
      nameEn: "Pop Pink",
      value: "#ff69b4",
      group: "brand",
      role: {
        zh: "第二主色，常与黄直接相撞。",
        en: "The second primary, usually slamming straight into the yellow.",
      },
      token: "--color-pop-pink",
    },
    {
      name: "波普蓝",
      nameEn: "Pop Blue",
      value: "#00bfff",
      group: "accent",
      role: {
        zh: "第三撞色与对话气泡底。",
        en: "The third clash and the speech bubble ground.",
      },
      token: "--color-pop-blue",
    },
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "4px 轮廓、硬阴影与文字。一切形状都由它勾出。",
        en: "The 4px outlines, hard shadows and type — every shape is drawn by it.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "画布与网点底色，也用于反白文字。",
        en: "The canvas and dot ground, also reversed-out type.",
      },
      token: "--color-white",
    },
    {
      name: "淡紫",
      nameEn: "Light Violet",
      value: "#a486ff",
      group: "accent",
      role: {
        zh: "第四撞色，出现频率最低，用于打破黄粉蓝的固定组合。",
        en: "The fourth clash, used least, breaking the fixed yellow-pink-blue set.",
      },
      token: "--color-light-violet",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Impact, sans-serif",
      weights: [900],
      sizes: [16, 20, 28, 40, 56, 80],
      lineHeight: { display: 0.95, heading: 1.05, body: 1.4 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "只有 900 一个字重，全大写。标题 56 到 80px、行高 0.95，像漫画封面。",
        en: "One weight only — 900 — set uppercase. Headlines run 56 to 80px at 0.95 leading like a comic cover.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 80, lineHeight: 0.95, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 56, lineHeight: 1, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 900, size: 40, lineHeight: 1.05, token: "--text-subheading" },
    { role: "body-lg", weight: 900, size: 20, lineHeight: 1.35, token: "--text-body-lg" },
    { role: "body", weight: 900, size: 16, lineHeight: 1.4, token: "--text-body" },
    { role: "label", weight: 900, size: 16, lineHeight: 1.3, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1160,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "bubbles", value: "24px" },
  ],
  surfaces: [
    { level: 0, name: "Pop Yellow", value: "#ffdd00", purpose: "黄底区块" },
    { level: 1, name: "White", value: "#ffffff", purpose: "白底区块" },
    { level: 2, name: "Pop Pink", value: "#ff69b4", purpose: "粉底区块" },
  ],
  elevation: [
    { name: "Hard offset", value: "4px 4px 0 #000000" },
    { name: "Hard offset lg", value: "6px 6px 0 #000000" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Comic Headline",
      role: { zh: "漫画式标题（核心）", en: "The comic headline — the core" },
      construction: {
        zh: "56 到 80px、900 字重、全大写、行高 0.95、字距 -0.02em，颜色黑或白。可叠 2px 的文字描边（-webkit-text-stroke）与 4px 4px 0 黑的偏移阴影，形成漫画标题的立体感。允许旋转 -2 到 2 度。",
        en: "56 to 80px at weight 900, uppercase, 0.95 leading and -0.02em tracking, in black or white. A 2px stroke via -webkit-text-stroke with a 4px 4px 0 black offset shadow gives the comic-title dimension. Rotation runs -2 to 2 degrees.",
      },
    },
    {
      name: "Pop Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "波普黄或粉填充、黑字、4px 黑边、2px 圆角、16px/900 全大写、padding 12px 28px，硬阴影 4px 4px 0 黑。hover 时填充硬切到另一撞色、阴影扩到 6px；按下时位移 4px 4px 且阴影归零。过渡 100ms linear。",
        en: "A pop yellow or pink fill, black text, a 4px black border, 2px radius, 16px/900 uppercase, 12px 28px padding, hard shadow 4px 4px 0 in black. Hover cuts the fill to another clash and widens the shadow to 6px; press translates 4px 4px and zeroes it. 100ms linear.",
      },
      sizes: "padding 12px 28px; label 16px",
      states: "hover: color cut, shadow 6px; active: translate 4px",
    },
    {
      name: "Ben-Day Bed",
      role: { zh: "Ben-Day 网点底（签名）", en: "The Ben-Day dot bed — the signature" },
      construction: {
        zh: "用 radial-gradient 做 6px 间距、1.5px 半径的圆点，颜色取撞色之一（黄、粉或蓝）的 100%，铺在白底上。网格角度 45 度（避免摩尔纹）。它必须清晰可见——网点是利希滕斯坦的签名，模糊它就等于丢掉风格。",
        en: "A radial gradient lays 6px-spaced dots of 1.5px radius in one clash color (yellow, pink or blue) at full strength on white, angled 45 degrees to avoid moiré. It must stay clearly visible — the dots are Lichtenstein's signature, and blurring them loses the style.",
      },
    },
    {
      name: "Speech Bubble",
      role: { zh: "对话气泡", en: "The speech bubble" },
      construction: {
        zh: "白或黄填充、4px 黑边、24px 圆角（气泡是唯一允许圆角的元素）、内边距 20px，硬阴影 4px 4px 0 黑。尾巴用两个伪元素画：一个 4px 黑边三角、一个覆盖描边的白三角。文字 20px/900 全大写。",
        en: "A white or yellow fill, a 4px black border, 24px radius (bubbles are the only element allowed radius), 20px padding, hard shadow 4px 4px 0 in black. The tail is two pseudo elements — a 4px-stroked triangle and a white one covering the stroke — with copy at 20px/900 uppercase.",
      },
    },
    {
      name: "Dot Card",
      role: { zh: "网点内容卡", en: "The dot-field card" },
      construction: {
        zh: "白底叠 45 度 Ben-Day 网点、4px 黑边、2px 圆角、内边距 24px，硬阴影 4px 4px 0 黑。标题 40px/900，正文 16px/900。hover 时网点颜色换到另一撞色、阴影扩到 6px。",
        en: "White under 45-degree Ben-Day dots, a 4px black border, 2px radius, 24px padding, hard shadow 4px 4px 0 in black. The title runs 40px/900 with body at 16px/900. Hover swaps the dot color to another clash and widens the shadow to 6px.",
      },
    },
  ],
  imagery: {
    zh: "波普化图像：把照片压成 4 到 6 个平涂色块加黑轮廓（像丝网印刷），或处理成网点单色。允许重复排列同一张图（沃霍尔式）。不使用渐变图像、写实摄影与极简构图。",
    en: "Pop-treated imagery: a photo crushed into four to six flat fills with black contour like a screenprint, or reduced to single-tone dots. Repeating one image in a grid is welcome, Warhol style. No gradient images, realistic photography or minimal composition.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 24px，区块间距 96px。允许元素重叠与旋转 -2 到 2 度。整页以大色块分区（黄、白、粉），每个区块必须至少有网点或粗边，不能出现无装饰的空区。",
    en: "Capped at 1160px with 24px padding, sections 96px apart. Elements may overlap and rotate between -2 and 2 degrees. The page divides into large color fields (yellow, white, pink), and every block carries dots or a heavy border — no undecorated void is allowed.",
  },
  dos: [
    { zh: "4px 粗黑边框包住一切", en: "Wrap everything in a 4px black border" },
    { zh: "Ben-Day 网点作背景纹理", en: "Ben-Day dots serve as background texture" },
    { zh: "高饱和平涂，绝不用渐变", en: "Flat saturated fills, never a gradient" },
    { zh: "900 字重全大写标题", en: "Headlines at 900 uppercase" },
    { zh: "硬阴影 4px 4px 0 黑", en: "Hard shadows of 4px 4px 0 in black" },
    { zh: "对话气泡承载引语", en: "Speech bubbles carry the quotes" },
  ],
  donts: [
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要用低饱和或灰色系", en: "No desaturated or grey palettes" },
    { zh: "不要用 2px 以下边框", en: "No border under 2px" },
    { zh: "不要用全圆角（气泡除外）", en: "No fully rounded shapes except bubbles" },
    { zh: "不要做极简无装饰的页面", en: "No minimal undecorated pages" },
    { zh: "不要把网点做糊", en: "Never blur the dots" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffdd00",
      pink: "#ff69b4",
      blue: "#00bfff",
      white: "#ffffff",
      violet: "#a486ff",
    },
    prompts: [
      {
        zh: "做一个波普风卡片：白底叠 45 度 Ben-Day 网点（6px 间距、1.5px 半径、色 #ff69b4）、4px solid #000 边框、2px 圆角、内边距 24px、box-shadow 4px 4px 0 #000。标题 40px/900 全大写、行高 0.95、黑色，正文 16px/900。按钮 #ffdd00 填充、黑字、4px 黑边、2px 圆角、硬阴影 4px 4px 0 #000，hover 时填充硬切到 #ff69b4、阴影扩到 6px。页面以黄、白、粉三种大色块分区，全站不用渐变。",
        en: "Build a pop art card: white under 45-degree Ben-Day dots (6px spacing, 1.5px radius in #ff69b4), a 4px solid #000 border, 2px radius, 24px padding, box-shadow 4px 4px 0 #000. The title runs 40px/900 uppercase at 0.95 leading in black, body at 16px/900. The button fills #ffdd00 with black text, a 4px black border, 2px radius and a 4px 4px 0 hard shadow, cutting to #ff69b4 with a 6px shadow on hover. The page divides into large yellow, white and pink fields, with no gradients anywhere.",
      },
    ],
  },
  similar: [
    { name: "Comic Style", why: { zh: "同源于漫画印刷，但波普更抽象、更强调网点与重复", en: "Both comic-print derived, though pop art is more abstract and pushes dots and repetition" } },
    { name: "Neo-Brutalist Playful", why: { zh: "同样粗黑边硬阴影，但波普有网点与气泡的印刷底子", en: "Both heavy black borders and hard shadows, though pop carries dots and bubbles from print" } },
  ],
  completeness: "full",
};
