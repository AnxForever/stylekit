import type { DesignSpec } from "../types";

export const stripeStyleSpec: DesignSpec = {
  slug: "stripe-style",
  name: "Stripe 风格",
  nameEn: "Stripe Style",
  cover: "/styles/stripe-style.svg",
  theme: "light",
  northStar: {
    zh: "紫、深海军蓝与一层网格底纹：把金融基础设施画成工程图纸。",
    en: "Violet, deep navy and a grid backdrop — financial infrastructure drawn as an engineering drawing.",
  },
  summary: {
    zh: "Stripe 风格的可信感来自克制与精度的组合：主色紫（#635bff）只出现在行动与链接上，正文用深海军蓝（#0a2540）而不是黑，底色是带一点蓝的浅灰（#f6f9fc）。标志性手法是 40px 网格底纹——它把页面变成图纸，暗示严谨。卡片用两段叠加的柔和阴影制造浮起（而不是单层），hover 时上浮并让阴影扩散。按钮带内高光，按下时换成内阴影，形成实体按压感。",
    en: "Stripe's credibility comes from restraint plus precision: violet (#635bff) appears only on actions and links, body text is deep navy (#0a2540) rather than black, and the ground is a slightly blue grey (#f6f9fc). The signature move is a 40px grid backdrop that turns the page into a blueprint. Cards use two stacked soft shadows instead of one, lifting on hover as the shadow spreads. Buttons carry an inner highlight and switch to an inner shadow on press, so the click feels physical.",
  },
  colors: [
    {
      name: "条纹紫",
      nameEn: "Stripe Violet",
      value: "#635bff",
      group: "brand",
      role: {
        zh: "主行动、链接与选中态。全站唯一的品牌色，一屏只出现两到三处。",
        en: "Primary actions, links and selection — the only brand color, appearing two or three times per screen.",
      },
      token: "--color-violet",
    },
    {
      name: "深海军蓝",
      nameEn: "Deep Navy",
      value: "#0a2540",
      group: "brand",
      role: {
        zh: "正文、标题与深色区块。比黑柔和，读起来像印刷油墨。",
        en: "Body, headings and dark sections. Softer than black, reading like printed ink.",
      },
      token: "--color-navy",
    },
    {
      name: "浅雾底",
      nameEn: "Haze",
      value: "#f6f9fc",
      group: "surface",
      role: {
        zh: "页面画布，上面叠 40px 网格线。白色卡片在它之上形成第二层。",
        en: "Canvas that carries the 40px grid; white cards form the layer above it.",
      },
      token: "--color-haze",
    },
    {
      name: "卡白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: { zh: "卡片、表单与浮层。", en: "Cards, forms and overlays." },
      token: "--color-card-white",
    },
    {
      name: "电青",
      nameEn: "Electric Cyan",
      value: "#00d4ff",
      group: "accent",
      role: {
        zh: "渐变与图表第二序列。只与紫搭配，不单独作为主色。",
        en: "Gradients and the second chart series, always paired with violet, never alone.",
      },
      token: "--color-cyan",
    },
    {
      name: "浅紫",
      nameEn: "Lilac",
      value: "#7a73ff",
      group: "accent",
      role: {
        zh: "渐变末端与 hover 态。与主紫同一色相，只提高明度。",
        en: "Gradient tails and hover states — same hue as the primary, only lighter.",
      },
      token: "--color-lilac",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 28, 44, 64],
      lineHeight: { display: 1.1, heading: 1.25, body: 1.6 },
      tracking: { display: "-0.03em", label: "0.02em" },
      role: {
        zh: "全站唯一字体。标题用 700 与紧字距，正文 400，与深海军蓝搭配形成印刷感。",
        en: "The only face: 700 with tight tracking for headings, 400 for body, paired with navy for a printed feel.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, SFMono-Regular, Menlo, monospace",
      weights: [400],
      sizes: [13],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.7 },
      tracking: { display: "0", label: "0" },
      role: {
        zh: "代码示例与 API 片段。是 Stripe 面向开发者的一半语言。",
        en: "Code samples and API snippets — half of Stripe's language is developer-facing.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 64, lineHeight: 1.1, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 44, lineHeight: 1.15, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 112,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "code-blocks", value: "12px" },
  ],
  surfaces: [
    { level: 0, name: "Haze", value: "#f6f9fc", purpose: "画布，叠 40px 网格" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "卡片与表单" },
    { level: 2, name: "Navy Stage", value: "#0a2540", purpose: "深色区块与页脚" },
  ],
  elevation: [
    { name: "Card", value: "0 2px 10px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)" },
    { name: "Card hover", value: "0 12px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)" },
    { name: "Button", value: "0 2px 5px rgba(99,91,255,0.40), inset 0 1px 0 rgba(255,255,255,0.20)" },
  ],
  components: [
    {
      name: "Primary Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "条纹紫填充、白字、8px 圆角、无描边。字级 14px、字重 500、padding 10px 24px。阴影为外阴影 0 2px 5px 紫 40% 加内高光 inset 0 1px 0 白 20%。hover 时填充转深紫 #5851ea、上浮 2px、外阴影扩到 10px；按下缩放 0.98 并换成内阴影 inset 0 2px 4px 黑 20%。过渡 300ms ease-out。",
        en: "Violet fill, white text, 8px radius, no border. 14px type at weight 500, 10px 24px padding. The shadow pairs an outer 0 2px 5px at 40% violet with an inset 0 1px 0 white highlight. Hover deepens the fill to #5851ea, lifts 2px and widens the outer shadow to 10px; press scales 0.98 and swaps to an inset 0 2px 4px at 20% black. 300ms ease-out.",
      },
      states: "hover: lift 2px, deeper fill; active: inset shadow, scale 0.98",
    },
    {
      name: "Floating Card",
      role: { zh: "功能卡与产品卡", en: "Feature and product card" },
      construction: {
        zh: "白底、12px 圆角、无描边、内边距 24px。阴影用两段叠加：0 2px 10px 6% 加 0 4px 20px 4%。图标块 40px 见方、10px 圆角、紫 10% 底、图标紫。hover 时上浮 4px、阴影扩到 0 12px 30px 8%、图标块放大 1.1，过渡 400ms ease-out。",
        en: "White fill, 12px radius, no border, 24px padding. The shadow stacks two layers: 0 2px 10px at 6% plus 0 4px 20px at 4%. The icon tile is 40px square with a 10px radius on 10% violet. Hover lifts 4px, widens the shadow to 0 12px 30px at 8% and scales the tile to 1.1, over 400ms ease-out.",
      },
    },
    {
      name: "Grid Backdrop",
      role: { zh: "页面底纹与 hero 背景", en: "Page backdrop and hero ground" },
      construction: {
        zh: "两层 40px 线性渐变网格交叉，颜色为紫 10%，叠在浅雾底上，整体不透明度 40%。只出现在首屏与少数区块，不做全页铺满，否则会盖过内容。",
        en: "Two 40px linear-gradient grids crossing at 10% violet, layered on the haze ground at 40% opacity. Confined to the hero and a few sections, never the whole page — it would otherwise overtake the content.",
      },
    },
    {
      name: "Code Block",
      role: { zh: "API 示例与配置片段", en: "API samples and config snippets" },
      construction: {
        zh: "深海军蓝底、白字 90%、12px 圆角、内边距 20px、等宽 13px、行高 1.7。左上角允许一个圆点行（三个 8px 圆点）。不描边、不加阴影。",
        en: "Navy fill, text at 90% white, 12px radius, 20px padding, 13px monospace at 1.7 line height. A traffic-light row of three 8px dots may sit top-left. No border, no shadow.",
      },
    },
  ],
  imagery: {
    zh: "以界面截图、抽象几何图解与代码为主。允许紫色到青色的渐变作为图像替代，但只出现在一张卡片上。不使用人物摄影与装饰插画。",
    en: "Interface screenshots, abstract diagrams and code. A violet-to-cyan gradient may stand in for imagery on one card. No people photography and no decorative illustration.",
  },
  layout: {
    zh: "上限 1120px、12 栏、容器内边距 24px。区块间距 112px。hero 常见为左文右图或居中大字配下方产品截图。网格底纹铺满首屏，往下逐渐淡出。",
    en: "Capped at 1120px over twelve columns with 24px padding. Sections sit 112px apart. The hero is usually text-left with a visual on the right, or a centred headline over a product shot. The grid backdrop fills the first viewport and fades out below it.",
  },
  dos: [
    { zh: "紫只给行动与链接，一屏两到三处", en: "Violet belongs to actions and links, two or three per screen" },
    { zh: "正文用深海军蓝而不是黑", en: "Set body in deep navy, not black" },
    { zh: "卡片用两段叠加阴影", en: "Stack two shadow layers on cards" },
    { zh: "网格底纹只铺首屏", en: "Keep the grid backdrop to the first viewport" },
    { zh: "按钮带内高光，按下换内阴影", en: "Buttons carry an inner highlight and press into an inner shadow" },
    { zh: "代码块用深海军蓝底", en: "Code blocks sit on navy" },
  ],
  donts: [
    { zh: "不要把紫用于大面积背景", en: "Never flood the page with violet" },
    { zh: "不要让网格铺满全页", en: "Do not tile the grid across the whole page" },
    { zh: "不要用单层阴影，会失去浮起感", en: "No single-layer card shadows; the lift disappears" },
    { zh: "不要引入第二支独立强调色", en: "Do not add a second independent accent" },
    { zh: "不要用纯黑正文", en: "Never use pure black for body text" },
    { zh: "不要用超过 12px 的卡片圆角", en: "No card radius above 12px" },
  ],
  promptGuide: {
    quickColors: {
      text: "#0a2540",
      background: "#f6f9fc",
      card: "#ffffff",
      accent: "#635bff",
      secondary: "#00d4ff",
      grid: "rgba(99,91,255,0.10)",
    },
    prompts: [
      {
        zh: "做一个 Stripe 风格卡片：白底、12px 圆角、内边距 24px、阴影 0 2px 10px rgba(0,0,0,0.06) 与 0 4px 20px rgba(0,0,0,0.04) 叠加。左上 40px 见方图标块（10px 圆角、#635bff 10% 底）。标题 20px/600 #0a2540。hover 时上浮 4px、阴影扩到 0 12px 30px rgba(0,0,0,0.08)。页面底色 #f6f9fc，并叠一层 40px 紫色 10% 网格。",
        en: "Build a Stripe-style card: white fill, 12px radius, 24px padding, with stacked shadows 0 2px 10px rgba(0,0,0,0.06) and 0 4px 20px rgba(0,0,0,0.04). A 40px icon tile (10px radius, 10% #635bff ground) sits top-left above a 20px/600 title in #0a2540. Hover lifts 4px and widens the shadow to 0 12px 30px rgba(0,0,0,0.08). The page ground is #f6f9fc with a 40px grid at 10% violet.",
      },
    ],
  },
  similar: [
    { name: "Linear", why: { zh: "同样的紫系强调与工程感，但 Linear 用暗色", en: "Same violet family and engineering tone, though Linear goes dark" } },
    { name: "Vercel", why: { zh: "同样是开发者向，用网格与等宽代码建立可信", en: "Also developer-facing, building trust with grids and monospace" } },
  ],
  completeness: "full",
};
