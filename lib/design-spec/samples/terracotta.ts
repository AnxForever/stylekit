import type { DesignSpec } from "../types";

export const terracottaSpec: DesignSpec = {
  slug: "terracotta",
  name: "赤陶暖调",
  nameEn: "Terracotta",
  cover: "/styles/terracotta.svg",
  theme: "light",
  northStar: {
    zh: "赤陶、沙、奶油：地中海的午后，一切都在阳光里慢慢干。",
    en: "Terracotta, sand and cream — a Mediterranean afternoon drying slowly in the sun.",
  },
  summary: {
    zh: "赤陶暖调来自地中海的手工陶器与土墙：奶油底（#faf5ef）、赤陶主色（#b5654a）、沙（#d4a373）与土棕（#7a6350）作大地色系层次、橄榄绿（#8b9d77）作自然元素。阴影是暖色调的柔光（赤陶 10%）而不是灰的黑，点击反馈用下沉压印（active 时 translateY 而非缩放），因为陶器被按下去是陷进去不是弹出来。它禁止一切冷色——蓝与紫在这套语言里是不存在的。",
    en: "Terracotta comes from Mediterranean pottery and earth walls: cream (#faf5ef) underneath, terracotta (#b5654a) as the primary, sand (#d4a373) and earth brown (#7a6350) layering the range, and olive (#8b9d77) for natural elements. Shadows are warm light at 10% terracotta rather than grey black, and click feedback presses down with translateY instead of scaling, because pressing a pot makes it sink rather than bounce back. Cool color is refused outright — blue and violet do not exist in this language.",
  },
  colors: [
    {
      name: "赤陶",
      nameEn: "Terracotta",
      value: "#b5654a",
      group: "brand",
      role: {
        zh: "主色：主按钮、主强调与陶器语义。",
        en: "The primary on buttons, emphasis and anything ceramic.",
      },
      token: "--color-terracotta",
    },
    {
      name: "奶油",
      nameEn: "Cream",
      value: "#faf5ef",
      group: "surface",
      role: {
        zh: "页面底。暖白的墙面色。",
        en: "The page ground — the warm white of a rendered wall.",
      },
      token: "--color-cream",
    },
    {
      name: "沙",
      nameEn: "Sand",
      value: "#d4a373",
      group: "accent",
      role: {
        zh: "第一层次色，用于区块底与装饰。",
        en: "The first layering tone, on section grounds and ornament.",
      },
      token: "--color-sand",
    },
    {
      name: "土棕",
      nameEn: "Earth Brown",
      value: "#7a6350",
      group: "brand",
      role: {
        zh: "正文与第二层次。像烧过的黏土。",
        en: "Body text and the second layer — fired clay.",
      },
      token: "--color-earth-brown",
    },
    {
      name: "橄榄",
      nameEn: "Olive",
      value: "#8b9d77",
      group: "accent",
      role: {
        zh: "植物与「自然」语义，用于标签与点缀。",
        en: "Plants and nature semantics, on tags and accents.",
      },
      token: "--color-olive",
    },
    {
      name: "嫩绿",
      nameEn: "Fresh Green",
      value: "#8fb86a",
      group: "accent",
      role: {
        zh: "最亮的一支，只在「新芽」与春季主题出现。",
        en: "The brightest tone, only on new growth and spring themes.",
      },
      token: "--color-fresh-green",
    },
  ],
  fonts: [
    {
      family: "Lora",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [14, 17, 21, 28, 36, 48],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.75 },
      tracking: { display: "0.01em", label: "0.1em" },
      role: {
        zh: "衬线字体，行高 1.75。手作感需要一点不精确，所以字距只微开不加宽。",
        en: "Serif at 1.75 leading. Handmade wants a little imprecision, so tracking opens only slightly.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 48, lineHeight: 1.2, tracking: "0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 36, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 28, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 21, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 17, lineHeight: 1.75, token: "--text-body" },
    { role: "label", weight: 600, size: 14, lineHeight: 1.55, tracking: "0.1em", token: "--text-label" },
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
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "pots", value: "999px 999px 40% 40%" },
  ],
  surfaces: [
    { level: 0, name: "Cream", value: "#faf5ef", purpose: "页面底" },
    { level: 1, name: "Sand Block", value: "rgba(212,163,115,0.18)", purpose: "次级区块" },
    { level: 2, name: "Terracotta Block", value: "#b5654a", purpose: "强调块" },
  ],
  elevation: [
    { name: "Warm soft", value: "0 6px 20px rgba(181,101,74,0.10)" },
    { name: "Warm hover", value: "0 12px 32px rgba(181,101,74,0.16)" },
    { name: "Pressed", value: "0 2px 6px rgba(181,101,74,0.12)" },
  ],
  components: [
    {
      name: "Clay Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "赤陶填充、奶油文字、8px 圆角、无描边、17px/600、padding 14px 32px，暖阴影 0 6px 20px 赤陶 10%。hover 时填充加深到 #a1563f、阴影扩到 32px；按下时 translateY(2px) 且阴影收到 6px——是压印而不是缩放。过渡 200ms ease-out。",
        en: "Terracotta fill, cream text, 8px radius, no border, 17px/600, 14px 32px padding, with a warm 0 6px 20px shadow at 10% terracotta. Hover deepens the fill to #a1563f and widens the shadow to 32px; press applies translateY(2px) and pulls the shadow to 6px — a press, never a scale. 200ms ease-out.",
      },
      sizes: "padding 14px 32px; label 17px",
      states: "hover: deeper fill; active: translateY 2px",
    },
    {
      name: "Clay Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "奶油或沙 18% 填充、12px 圆角、1px 土棕 12% 描边、内边距 32px，暖阴影 0 6px 20px 赤陶 10%。标题 36px/600 土棕，正文 17px 土棕 80%。hover 时阴影扩到 32px 并上浮 2px。",
        en: "Cream or 18% sand fill, 12px radius, a 1px earth brown border at 12%, 32px padding, warm shadow 0 6px 20px at 10% terracotta. The title runs 36px/600 in earth brown with body at 17px in 80%. Hover widens the shadow to 32px and lifts 2px.",
      },
    },
    {
      name: "Pot Silhouette",
      role: { zh: "陶罐轮廓装饰", en: "The pot silhouette" },
      construction: {
        zh: "用 border-radius 的四值（如 999px 999px 40% 40%）做出罐子的轮廓，填沙或赤陶并降到 20% 到 35%，尺寸 64 到 160px。放在卡片角落或区块之间，作为「手工器物」的暗示，单屏 2 到 3 处。",
        en: "Four-value radii such as 999px 999px 40% 40% draw a pot's silhouette, filled sand or terracotta at 20% to 35%, sized 64 to 160px. It sits at card corners or between sections as a hint of the handmade object, two to three per screen.",
      },
    },
    {
      name: "Earth Gradient",
      role: { zh: "大地色渐变层", en: "The earth gradient layer" },
      construction: {
        zh: "从沙到土棕的 135 度渐变（不透明度 20% 到 40%），叠在区块背景上，模拟墙面受光的变化。绝不做到 60% 以上——它应该是气息而不是色块。",
        en: "A 135-degree gradient from sand into earth brown at 20% to 40% over a section ground, imitating light moving across a wall. It never goes past 60% — it should be atmosphere rather than a block.",
      },
    },
    {
      name: "Clay Field",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "奶油填充、8px 圆角、1px 土棕 25% 描边、padding 12px 16px、17px 衬线。占位符土棕 45%。聚焦时描边转赤陶并加 2px 的赤陶 20% 外环。",
        en: "Cream fill, 8px radius, a 1px earth brown border at 25%, 12px 16px padding at 17px serif. The placeholder sits at 45% earth brown. Focus turns the border terracotta and adds a 2px ring at 20%.",
      },
    },
  ],
  imagery: {
    zh: "手作器物与地中海场景：陶罐、土墙、橄榄树、亚麻、食物。必须自然光、暖调、可见材质纹理。不使用冷调摄影、蓝色与紫色图像、金属高光。",
    en: "Handmade objects and Mediterranean scenes: pots, earth walls, olive trees, linen, food. Natural light, warm cast, visible material texture. No cool-toned photography, blue or violet imagery, or metal highlights.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 112px。允许轻微的不对称（5:7 双栏）。留白宽松，暖阴影负责把元素从底上抬起，而不是边框。",
    en: "Capped at 1080px with 24px padding, sections 112px apart. A slight 5:7 asymmetry is welcome. Whitespace runs generous, and warm shadow — not border — lifts elements off the ground.",
  },
  dos: [
    { zh: "奶油底配赤陶与大地色", en: "Cream ground with terracotta and earth" },
    { zh: "阴影是暖色调而非灰黑", en: "Shadows are warm, never grey black" },
    { zh: "点击下沉压印，不缩放", en: "Press sinks, never scales" },
    { zh: "橄榄绿作自然元素", en: "Olive carries the natural element" },
    { zh: "圆角 8 到 12px", en: "Radius runs 8 to 12px" },
    { zh: "用陶罐轮廓暗示手作", en: "Pot silhouettes imply the handmade" },
  ],
  donts: [
    { zh: "不要用蓝、紫等冷色", en: "No blue, violet or other cool color" },
    { zh: "不要用灰黑阴影", en: "No grey-black shadow" },
    { zh: "不要用弹性缩放反馈", en: "No elastic scale feedback" },
    { zh: "不要用金属高光", en: "No metal highlights" },
    { zh: "不要让渐变超过 60%", en: "Never push a gradient past 60%" },
    { zh: "不要用冷调摄影", en: "No cool-toned photography" },
  ],
  promptGuide: {
    quickColors: {
      text: "#7a6350",
      background: "#faf5ef",
      terracotta: "#b5654a",
      sand: "#d4a373",
      brown: "#7a6350",
      olive: "#8b9d77",
    },
    prompts: [
      {
        zh: "做一个赤陶暖调卡片：奶油 #faf5ef 填充、12px 圆角、1px rgba(122,99,80,0.12) 描边、内边距 32px、box-shadow 0 6px 20px rgba(181,101,74,0.1)。标题 36px/600 Lora、色 #7a6350；正文 17px、行高 1.75、色 rgba(122,99,80,0.8)。左上角放一个 96px 的陶罐轮廓（border-radius 999px 999px 40% 40%、填 rgba(212,163,115,0.3)）。主按钮 #b5654a 填充、奶油文字、8px 圆角、padding 14px 32px、暖阴影，hover 时填充加深到 #a1563f，active 时 translateY(2px) 而非缩放。页面底色 #faf5ef，全站禁用蓝紫等冷色。",
        en: "Build a terracotta card: cream #faf5ef fill, 12px radius, a 1px rgba(122,99,80,0.12) border, 32px padding, box-shadow 0 6px 20px rgba(181,101,74,0.1). The title runs 36px/600 Lora in #7a6350 with body at 17px on 1.75 leading in rgba(122,99,80,0.8). A 96px pot silhouette (border-radius 999px 999px 40% 40%, filled rgba(212,163,115,0.3)) sits top-left. The primary button fills #b5654a with cream text on an 8px radius, 14px 32px padding and the warm shadow, deepening to #a1563f on hover and applying translateY(2px) rather than a scale on press. The page ground is #faf5ef, with no cool color anywhere.",
      },
    ],
  },
  similar: [
    { name: "Warm Organic", why: { zh: "同为暖调自然，但暖感有机更偏建筑极简，赤陶更偏器物与食欲", en: "Both warm and natural, though warm organic leans architectural while terracotta leans craft and appetite" } },
    { name: "Natural Organic", why: { zh: "同族，但自然有机用更多绿色，赤陶以红棕为主", en: "Same family, though natural organic brings more green while terracotta leads with red-brown" } },
  ],
  completeness: "full",
};
