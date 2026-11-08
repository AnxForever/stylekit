import type { DesignSpec } from "../types";

/**
 * Fifth sample: the hardest one for a token model, because every surface is the
 * same color as its background. Depth exists only in two shadows — one warm
 * light from the top-left, one cool shade from the bottom-right. If the spec
 * can describe "no contrast at all, only light", it can describe anything.
 */
export const neumorphismSpec: DesignSpec = {
  slug: "neumorphism",
  name: "新拟物派",
  nameEn: "Neumorphism",
  cover: "/styles/neumorphism.svg",
  theme: "light",
  northStar: {
    zh: "元素和背景同色，只有两个方向的阴影在说明它凸起还是凹陷。",
    en: "Elements share their background's color; only two opposing shadows say whether a surface is raised or pressed in.",
  },
  summary: {
    zh: "新拟物派用一束固定的光塑造所有界面：光源在左上，所以每个元素都有左上白色高光与右下冷灰暗影。元素本身与背景同色，一旦换了深浅就立刻失去材质感。凸起用外阴影对，凹陷用 inset 阴影对，按下就是把凸起翻成凹陷。这套系统里没有边框、没有实色填充、没有强烈对比，全部层次由两段模糊值承担，字号与字重必须比常规更保守，否则内容会压过材质。",
    en: "Neumorphism lights every surface from one fixed direction: the light sits top-left, so each element carries a white highlight there and a cool grey shadow bottom-right. The element shares the background's color — change the tone and the material vanishes. Raised states use an outer shadow pair, pressed states an inset pair, and pressing is literally turning one into the other. There are no borders, no solid fills and no strong contrast: two blur radii carry all depth, so type has to stay conservative or it overwhelms the material.",
  },
  colors: [
    {
      name: "基底",
      nameEn: "Base",
      value: "#e0e5ec",
      group: "surface",
      role: {
        zh: "页面与所有元素的共同颜色。凸起和凹陷都从它出发，不允许任何元素换底色。",
        en: "The shared color of the page and every element. Both raised and pressed states start here; nothing may switch grounds.",
      },
      token: "--color-base",
    },
    {
      name: "暗面",
      nameEn: "Shadow Grey",
      value: "#b8bcc2",
      group: "neutral",
      role: {
        zh: "右下阴影色。唯一允许用来表达凹陷的颜色，不用于文字或边框。",
        en: "The bottom-right shadow color. The only tone allowed to express recession; never used for text or borders.",
      },
      token: "--color-shadow-grey",
    },
    {
      name: "高光",
      nameEn: "Highlight",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "左上高光色。以模糊阴影形式出现，不直接作为面板填充。",
        en: "The top-left highlight, always applied as a blurred shadow rather than a panel fill.",
      },
      token: "--color-highlight",
    },
    {
      name: "紫罗兰",
      nameEn: "Blurple",
      value: "#6d5dfc",
      group: "brand",
      role: {
        zh: "主行动与选中态。全系统唯一允许压在基底上的饱和色，面积控制在按钮与图标内。",
        en: "Primary action and selection. The one saturated tone allowed on top of the base, kept inside buttons and icons.",
      },
      token: "--color-blurple",
    },
    {
      name: "珊瑚",
      nameEn: "Coral",
      value: "#ff6b6b",
      group: "accent",
      role: {
        zh: "警示与删除操作。出现即表示不可逆，不做装饰用途。",
        en: "Alerts and destructive actions. Appearing at all signals irreversibility; never decorative.",
      },
      token: "--color-coral",
    },
    {
      name: "薄荷",
      nameEn: "Mint",
      value: "#4ecdc4",
      group: "accent",
      role: {
        zh: "成功与数据正向变化。与珊瑚同屏时面积不得超过其一。",
        en: "Success and positive change. When it shares a screen with coral, neither may dominate.",
      },
      token: "--color-mint",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "Nunito, system-ui, -apple-system, sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 14, 16, 20, 28, 36],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.08em" },
      role: {
        zh: "全站唯一字体，字重克制。材质已经是主角，字体再加戏会显得廉价。",
        en: "The only face, kept at conservative weights. The material is the lead; louder type cheapens it.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 36, lineHeight: 1.15, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 20, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1080,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Base", value: "#e0e5ec", purpose: "页面与元素的共同基底" },
    { level: 1, name: "Raised", value: "#e0e5ec", purpose: "凸起面板，靠外阴影区分而非换色" },
  ],
  elevation: [
    { name: "Raised", value: "8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff" },
    { name: "Recessed", value: "inset 8px 8px 16px #b8bcc2, inset -8px -8px 16px #ffffff" },
    { name: "Hover (light dimmed)", value: "4px 4px 8px #b8bcc2, -4px -4px 8px #ffffff" },
    { name: "Pressed", value: "inset 4px 4px 8px #b8bcc2, inset -4px -4px 8px #ffffff" },
  ],
  components: [
    {
      name: "Raised Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "与背景同色 #e0e5ec 填充、无描边、16px 圆角。凸起状态用双阴影：8px 8px 16px #b8bcc2 与 -8px -8px 16px #ffffff。字级 14px、字重 500、深灰字。hover 时两段模糊减半到 4px，模拟手指靠近遮光；按下时整对翻成 inset，位移为 0。过渡 200ms ease-out。",
        en: "Filled with the base #e0e5ec, no border, 16px radius. The raised state uses the dual shadow pair: 8px 8px 16px #b8bcc2 and -8px -8px 16px #ffffff. Type at 14px weight 500 in dark grey. Hover halves both blurs to 4px, as if a hand approached and cast shade; press flips the pair to inset with no translation. 200ms ease-out.",
      },
      states: "hover: blur 8px to 4px; active: inset pair; focus-visible: blurple outline, 3px offset",
    },
    {
      name: "Recessed Input",
      role: { zh: "输入框与搜索", en: "Input and search field" },
      construction: {
        zh: "与背景同色填充、inset 双阴影（8px 8px 16px #b8bcc2 与 inset -8px -8px 16px #ffffff）、16px 圆角、padding 12px 16px。占位符用中灰。聚焦时保持凹陷，只把阴影色相转向紫罗兰 30% 透明度，不移动元素。",
        en: "Base-colored fill with the inset pair (8px 8px 16px #b8bcc2 and inset -8px -8px 16px #ffffff), 16px radius, 12px 16px padding. The placeholder sits in mid grey. Focus keeps the recess and only tints the shadow toward blurple at 30% opacity; nothing moves.",
      },
      states: "focus: recess preserved, blurple-tinted shadow",
    },
    {
      name: "Soft Card",
      role: { zh: "内容卡片与统计块", en: "Content card and stat block" },
      construction: {
        zh: "凸起双阴影、24px 圆角、内边距 32px、无描边无换色。卡片之间至少留 32px，否则两套阴影会互相污染。hover 时阴影模糊减半并整体上浮 2px，表示可点击。",
        en: "Raised dual shadow, 24px radius, 32px padding, no border and no color change. Cards need at least 32px between them or the shadow pairs bleed into each other. Hover halves the blur and lifts 2px to signal clickability.",
      },
    },
    {
      name: "Soft Toggle",
      role: { zh: "开关与分段控件", en: "Switch and segmented control" },
      construction: {
        zh: "轨道为凹陷状态（inset 对，16px 圆角，高 32px），旋钮为凸起状态（外阴影对、直径 24px、与轨道同色）。开启时旋钮填紫罗兰，关闭时与基底同色。切换过渡 200ms，只动阴影与位置，不用缩放。",
        en: "The track is recessed (inset pair, 16px radius, 32px tall) and the knob is raised (outer pair, 24px diameter, same color as the track). On, the knob fills blurple; off, it matches the base. The 200ms transition animates only shadow and position, never scale.",
      },
    },
  ],
  imagery: {
    zh: "不用摄影。材质本身是内容：可用同色系的柔和图形、极浅的线性图标，或与基底同色的产品渲染。任何强对比、深色背景、纯白图标都会破坏统一光源的假设。",
    en: "No photography. The material is the content: same-tone soft shapes, very light line icons, or product renders tinted to the base. Any high contrast, dark background or pure-white icon breaks the single-light assumption.",
  },
  layout: {
    zh: "上限 1080px，12 栏，容器内边距 24px。区块间距 96px，卡片间距 32px 起。版面必须留白充足，元素之间至少一个阴影的模糊半径的距离，否则阴影互相叠加会显脏。深色文字只出现在内容层，界面层用中灰。",
    en: "Capped at 1080px over twelve columns, container padding 24px. Section rhythm 96px, 32px minimum between cards. The layout needs air: elements sit at least one blur radius apart or the shadows muddy each other. Dark text belongs to content only; chrome stays in mid grey.",
  },
  dos: [
    {
      zh: "所有元素与背景同色，深浅差异只由阴影承担",
      en: "Keep every element the same color as its background; let shadows carry all tonal difference",
    },
    {
      zh: "固定单一光源：左上高光、右下暗影，全站一致",
      en: "Fix one light source: highlight top-left, shade bottom-right, everywhere",
    },
    {
      zh: "凸起用外阴影对，凹陷用 inset 对，不混用",
      en: "Raised uses the outer pair, recessed the inset pair; never mix them",
    },
    {
      zh: "圆角 16px 起，卡片用 24px",
      en: "Radius starts at 16px; cards take 24px",
    },
    {
      zh: "hover 时减小阴影模糊，模拟手靠近遮光",
      en: "Hover reduces the blur radius, as if a hand approached and cast shade",
    },
    {
      zh: "字重不超过 600，让材质当主角",
      en: "Keep weights at 600 or below; the material is the lead",
    },
  ],
  donts: [
    {
      zh: "不要用纯黑阴影，会立刻变成脏灰",
      en: "No pure black shadows; they turn the base muddy",
    },
    {
      zh: "不要在深色背景上做新拟物，没有可用光",
      en: "Do not apply neumorphism on a dark ground; there is no light to model",
    },
    {
      zh: "不要加实色边框，材质不再连续",
      en: "No solid borders; the material stops being continuous",
    },
    {
      zh: "不要让元素换底色来区分层级",
      en: "Never re-tint an element to signal a level",
    },
    {
      zh: "不要用锐利描边图标或高对比插画",
      en: "No sharp-stroke icons or high-contrast illustration",
    },
    {
      zh: "不要把两套阴影的元素放得比阴影模糊半径更近",
      en: "Never place two shadowed elements closer than one blur radius",
    },
  ],
  promptGuide: {
    quickColors: {
      base: "#e0e5ec",
      shadow: "#b8bcc2",
      highlight: "#ffffff",
      text: "#3d4451",
      primary: "#6d5dfc",
      danger: "#ff6b6b",
    },
    prompts: [
      {
        zh: "做一个新拟物按钮：背景 #e0e5ec、无边框、16px 圆角、文字 14px/500 深灰。凸起用 box-shadow: 8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff。hover 时两段模糊减到 4px；按下时改成 inset 8px 8px 16px #b8bcc2、inset -8px -8px 16px #ffffff。页面底色同为 #e0e5ec。",
        en: "Build a neumorphic button: background #e0e5ec, no border, 16px radius, 14px/500 dark grey label. Raised state uses box-shadow: 8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff. Hover halves both blurs to 4px; press switches to inset 8px 8px 16px #b8bcc2, inset -8px -8px 16px #ffffff. The page ground is the same #e0e5ec.",
      },
    ],
  },
  similar: [
    {
      name: "Apple",
      why: {
        zh: "同样用固定光源塑造材质，但苹果更克制，只在控件上使用",
        en: "Same single-light material modelling, applied more sparingly and only to controls",
      },
    },
    {
      name: "Skeuomorphism",
      why: {
        zh: "同一支光源逻辑的写实版本，新拟物是它的极简抽象",
        en: "The literal ancestor of this shadow logic; neumorphism is its minimal abstraction",
      },
    },
  ],
  completeness: "full",
};
