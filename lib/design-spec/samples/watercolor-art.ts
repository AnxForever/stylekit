import type { DesignSpec } from "../types";

export const watercolorArtSpec: DesignSpec = {
  slug: "watercolor-art",
  name: "水彩艺术风",
  nameEn: "Watercolor Art",
  cover: "/styles/watercolor-art.svg",
  theme: "light",
  northStar: {
    zh: "颜料在水里散开：边缘是渗的，颜色是层叠的，纸是湿的。",
    en: "Pigment spreading in water — bleeding edges, layered washes, damp paper.",
  },
  summary: {
    zh: "水彩艺术风模拟真实水彩的物理行为：颜料从中心向边缘池化（用 radial-gradient 做按钮）、边缘不规则地渗开、颜色以极低不透明度层层叠加、纸面有颗粒纹理（feTurbulence）。它的技术参数刻意压到极低——边框只有 8% 到 18% 不透明度、阴影极柔且带色、圆角 24px 以上。禁令也很明确：禁止硬边偏移阴影、禁止 2px 以上粗边框、禁止纯黑与霓虹、禁止等宽字体、禁止全大写，因为水彩里没有尖锐的东西。",
    en: "Watercolor Art reproduces real watercolor physics: pigment pooling from the centre outward (buttons use a radial gradient), edges bleeding irregularly, color layered at very low opacity, and paper carrying grain via feTurbulence. Its technical numbers are deliberately tiny — borders at 8% to 18% opacity, shadows ultra-soft and tinted, radius at 24px or more. The prohibitions are equally clear: no hard offset shadows, no borders at 2px or above, no pure black or neon, no monospace and no uppercase, because nothing in watercolor is sharp.",
  },
  colors: [
    {
      name: "藕粉",
      nameEn: "Blush",
      value: "#d4a0a0",
      group: "brand",
      role: {
        zh: "主色：主按钮与主要色块，像一层薄薄的赭红。",
        en: "The primary on buttons and main blocks — a thin wash of red ochre.",
      },
      token: "--color-blush",
    },
    {
      name: "湿纸",
      nameEn: "Wet Paper",
      value: "#faf6f0",
      group: "surface",
      role: {
        zh: "页面底。带纹理的暖白，模拟水彩纸。",
        en: "The page ground — a textured warm white standing in for watercolor stock.",
      },
      token: "--color-wet-paper",
    },
    {
      name: "水蓝",
      nameEn: "Water Blue",
      value: "#7bb8d4",
      group: "accent",
      role: {
        zh: "第二色，用于水与天空的意象。",
        en: "The second color, on water and sky.",
      },
      token: "--color-water-blue",
    },
    {
      name: "叶绿",
      nameEn: "Leaf Green",
      value: "#8cc5a8",
      group: "accent",
      role: {
        zh: "植物语义与成功状态。",
        en: "Plant semantics and success.",
      },
      token: "--color-leaf-green",
    },
    {
      name: "花紫",
      nameEn: "Petal Violet",
      value: "#c3a0d4",
      group: "accent",
      role: {
        zh: "情绪化强调与花卉点缀。",
        en: "Emotional emphasis and floral accents.",
      },
      token: "--color-petal-violet",
    },
    {
      name: "藤黄",
      nameEn: "Gamboge",
      value: "#e8c87a",
      group: "accent",
      role: {
        zh: "高光与阳光的一层，最常作为叠加色。",
        en: "Highlights and a layer of sunlight, most often as an overlay wash.",
      },
      token: "--color-gamboge",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [300, 400, 600],
      sizes: [15, 18, 22, 30, 40, 54],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.85 },
      tracking: { display: "0.02em", label: "0.14em" },
      role: {
        zh: "全站衬线，字距 0.14em 放宽，行高 1.85。禁止等宽与全大写。",
        en: "Serif throughout with 0.14em tracking and 1.85 leading. Monospace and uppercase are excluded.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Cormorant Garamond", weight: 300, size: 54, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Cormorant Garamond", weight: 400, size: 40, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", font: "Cormorant Garamond", weight: 400, size: 30, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", font: "Cormorant Garamond", weight: 400, size: 22, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", font: "Cormorant Garamond", weight: 400, size: 18, lineHeight: 1.85, token: "--text-body" },
    { role: "label", font: "Cormorant Garamond", weight: 600, size: 15, lineHeight: 1.6, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1060,
    sectionGap: 128,
    cardPadding: 36,
    elementGap: 28,
  },
  radii: [
    { element: "cards", value: "32px" },
    { element: "buttons", value: "24px" },
    { element: "inputs", value: "24px" },
  ],
  surfaces: [
    { level: 0, name: "Wet Paper", value: "#faf6f0", purpose: "页面底（带纸纹）" },
    { level: 1, name: "Wash Card", value: "rgba(212,160,160,0.10)", purpose: "卡片（极淡色层）" },
    { level: 2, name: "Pool", value: "radial-gradient", purpose: "颜料池化区域" },
  ],
  elevation: [
    { name: "Soft tinted", value: "0 4px 20px rgba(212,160,160,0.30), inset 0 1px 0 rgba(255,255,255,0.20)" },
    { name: "Soft tinted hover", value: "0 10px 40px rgba(212,160,160,0.50), inset 0 1px 0 rgba(255,255,255,0.20)" },
    { name: "Pressed", value: "inset 0 2px 4px rgba(90,62,62,0.10)" },
  ],
  components: [
    {
      name: "Wet Button",
      role: { zh: "行动按钮（颜料池化）", en: "Action button with pigment pooling" },
      construction: {
        zh: "藕粉填充并叠一层 radial-gradient（中心亮 110%、边缘降到 90%）模拟颜料池化、24px 圆角、1px 藕粉 18% 描边、衬线 15px、字距 0.14em、padding 16px 40px，阴影 0 4px 20px 藕粉 30% 加 inset 0 1px 0 白 20%。hover 时填充加深到 #c99595、阴影扩到 40px；按下缩到 0.98 并加内阴影。过渡 500ms ease-in-out。",
        en: "Blush fill under a radial gradient (110% at the centre falling to 90% at the edge) for the pooling, 24px radius, a 1px blush border at 18%, serif at 15px with 0.14em tracking, 16px 40px padding, shadow 0 4px 20px at 30% blush plus inset 0 1px 0 white at 20%. Hover deepens the fill to #c99595 and widens the shadow to 40px; press scales 0.98 with an inner shadow. 500ms ease-in-out.",
      },
      sizes: "padding 16px 40px; label 15px",
      states: "hover: deeper wash, wider shadow; active: scale 0.98",
    },
    {
      name: "Wash Card",
      role: { zh: "内容卡（多色层叠）", en: "Content card with layered washes" },
      construction: {
        zh: "白底上叠两层极淡色块（第一层 10% 藕粉、第二层 8% 水蓝，各自用 radial-gradient 从一角散开）、32px 圆角、1px 藕粉 12% 描边、内边距 36px，柔阴影 0 4px 20px 藕粉 30%。三层叠加后边缘应显得不匀，模仿湿画法。",
        en: "A white ground carrying two pale washes — 10% blush then 8% water blue, each spreading from a corner via radial gradient — on a 32px radius with a 1px blush border at 12%, 36px padding and a soft 0 4px 20px shadow at 30%. After three layers the color should look uneven, imitating wet-on-wet.",
      },
    },
    {
      name: "Bleed Edge",
      role: { zh: "渗化边缘装饰", en: "The bleeding edge ornament" },
      construction: {
        zh: "用 SVG 的 feTurbulence 加 feDisplacementMap（baseFrequency 0.02、scale 8）作用在色块或图片边缘上，让边界轻微抖动与晕开。只作用于装饰块，绝不作用于文字。",
        en: "An SVG feTurbulence with feDisplacementMap (baseFrequency 0.02, scale 8) applied to a block's or image's edge so the boundary wobbles and blooms. It touches decorative blocks only, never text.",
      },
    },
    {
      name: "Paper Grain",
      role: { zh: "纸纹叠加层", en: "The paper grain overlay" },
      construction: {
        zh: "全页固定覆盖一层 2% 到 4% 不透明度的噪点纹理（feTurbulence 或 base64 噪点图），pointer-events: none，混合模式 multiply。这层让所有色块看起来是画在纸上的。",
        en: "A fixed full-page noise layer at 2% to 4% opacity (feTurbulence or a base64 grain), pointer-events none, in multiply mode. It makes every wash look painted onto paper rather than onto glass.",
      },
    },
    {
      name: "Botanical Sprig",
      role: { zh: "植物水彩点缀", en: "Botanical watercolor accents" },
      construction: {
        zh: "一枝 64 到 160px 的水彩叶或花（半透明、边缘渗开），颜色取叶绿或花紫并降到 40% 到 60%，置于卡片角落或标题旁。单屏最多三处。",
        en: "A watercolor leaf or flower branch between 64px and 160px, translucent with a bleeding edge, colored leaf green or petal violet at 40% to 60% and placed at a card corner or beside a heading. Three per screen at most.",
      },
    },
  ],
  imagery: {
    zh: "水彩画与湿画法插画：植物、风景、静物，必须有渗化边缘与颜色层叠。允许把照片处理成水彩效果。不使用硬边矢量插画、高饱和图像与纯黑背景。",
    en: "Watercolor painting and wet-on-wet illustration: plants, landscapes, still life, all with bleeding edges and layered color. A photo may be rendered into a watercolor treatment. No hard-edged vector art, saturated imagery or black grounds.",
  },
  layout: {
    zh: "上限 1060px、容器内边距 24px，区块间距 128px。允许元素轻微错位与旋转（-2 到 2 度）。色块可以溢出容器边缘一点，像颜料画出了界。留白宽松，密度低于常规。",
    en: "Capped at 1060px with 24px padding, sections 128px apart. Elements may offset and rotate between -2 and 2 degrees. A wash may spill slightly past its container like paint going over the edge. Whitespace stays generous and density low.",
  },
  dos: [
    { zh: "边框只有 8% 到 18% 不透明度", en: "Borders sit at 8% to 18% opacity" },
    { zh: "用 radial-gradient 做颜料池化", en: "Use radial gradients for pigment pooling" },
    { zh: "叠一层 2% 到 4% 的纸纹", en: "Layer paper grain at 2% to 4%" },
    { zh: "圆角 24px 以上", en: "Radius at 24px or more" },
    { zh: "阴影极柔且带色", en: "Shadows stay ultra-soft and tinted" },
    { zh: "过渡 500ms ease-in-out", en: "Transitions run 500ms ease-in-out" },
  ],
  donts: [
    { zh: "不要用硬边偏移阴影", en: "No hard offset shadows" },
    { zh: "不要用 2px 以上边框", en: "No border at 2px or above" },
    { zh: "不要用纯黑或霓虹色", en: "No pure black or neon" },
    { zh: "不要用等宽字体", en: "No monospace type" },
    { zh: "不要用全大写文字", en: "No uppercase text" },
    { zh: "不要给文字加渗化滤镜", en: "Never apply a bleed filter to text" },
  ],
  promptGuide: {
    quickColors: {
      text: "#5a3e3e",
      background: "#faf6f0",
      blush: "#d4a0a0",
      blue: "#7bb8d4",
      green: "#8cc5a8",
      violet: "#c3a0d4",
    },
    prompts: [
      {
        zh: "做一个水彩风按钮：背景 #d4a0a0 叠 radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 60%) 模拟颜料池化、24px 圆角、1px rgba(212,160,160,0.18) 描边、衬线 15px 字距 0.14em、padding 16px 40px、box-shadow 0 4px 20px rgba(212,160,160,0.3), inset 0 1px 0 rgba(255,255,255,0.2)。hover 时背景 #c99595、阴影扩到 0 10px 40px rgba(212,160,160,0.5)；active 时 scale(0.98) 并加 inset 0 2px 4px rgba(90,62,62,0.1)。transition 500ms ease-in-out。页面底色 #faf6f0，可叠 3% 纸纹噪点。",
        en: "Build a watercolor button: background #d4a0a0 under radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 60%) for the pooling, 24px radius, a 1px rgba(212,160,160,0.18) border, serif at 15px with 0.14em tracking, 16px 40px padding, box-shadow 0 4px 20px rgba(212,160,160,0.3) and inset 0 1px 0 rgba(255,255,255,0.2). Hover moves the background to #c99595 and the shadow to 0 10px 40px rgba(212,160,160,0.5); active scales 0.98 with inset 0 2px 4px rgba(90,62,62,0.1). Transition 500ms ease-in-out. The page ground is #faf6f0 with 3% paper grain.",
      },
    ],
  },
  similar: [
    { name: "Watercolor Style", why: { zh: "同源，但本风格更强调颜料池化与纸纹的物理细节", en: "Same root, though this one pushes the physics of pooling and grain further" } },
    { name: "Shoujo Manga", why: { zh: "同为柔和粉调，但少女漫画用硬边与缎带，水彩用渗化与层叠", en: "Both soft and pink, though shoujo uses hard edges and ribbons while watercolor bleeds and layers" } },
  ],
  completeness: "full",
};
