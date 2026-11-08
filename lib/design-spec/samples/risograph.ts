import type { DesignSpec } from "../types";

export const risographSpec: DesignSpec = {
  slug: "risograph",
  name: "Risograph 印刷风",
  nameEn: "Risograph",
  cover: "/styles/risograph.svg",
  theme: "light",
  northStar: {
    zh: "两个墨版印歪了：套印错位加网点，才是 Riso 的样子。",
    en: "Two ink plates printed out of register — that offset and those dots are what make it Riso.",
  },
  summary: {
    zh: "Risograph 是一种真实的孔版印刷：每次只上一个色版，纸走一遍印一层，所以会有套印错位、网点、以及三色以内的限制。界面上的还原靠两条硬规则——第一是 Misregistration Offset：hover 时必须用双向硬阴影模拟两个墨版错开，一个往右下（蓝版）、一个往左上（橙版），单方向阴影是错的；第二是 Instant Print：所有过渡 100ms 且必须 ease-linear，因为是机械印刷而不是有机运动，绝不允许 ease-in-out 或用 opacity 过渡来换色。",
    en: "Risograph is a real stencil printing process: one ink drum per pass, the sheet running through again for each layer, which produces misregistration, halftone dots and a hard limit of three inks. On screen two rules carry it. First, Misregistration Offset: hover must show two hard shadows simulating offset plates, one to the bottom-right in blue and one to the top-left in orange — a single-direction shadow is wrong. Second, Instant Print: every transition runs 100ms on ease-linear, because this is a machine rather than organic motion; ease-in-out and opacity-based color changes are forbidden.",
  },
  colors: [
    {
      name: "荧光粉",
      nameEn: "Riso Pink",
      value: "#ff6b9d",
      group: "brand",
      role: {
        zh: "第一个墨版。Riso 的粉墨饱和度极高，是它的签名色。",
        en: "The first ink drum — Riso pink runs hot and is the signature.",
      },
      token: "--color-riso-pink",
    },
    {
      name: "墨蓝",
      nameEn: "Riso Blue",
      value: "#2563eb",
      group: "brand",
      role: {
        zh: "第二个墨版。与粉叠印后会产出紫，这个混合是 Riso 的核心。",
        en: "The second drum; overprinted on pink it produces violet, and that blend is the heart of Riso.",
      },
      token: "--color-riso-blue",
    },
    {
      name: "橙墨",
      nameEn: "Riso Orange",
      value: "#ff8a00",
      group: "accent",
      role: {
        zh: "第三个墨版与套印错位的第二个方向。",
        en: "The third drum and the second direction of the registration offset.",
      },
      token: "--color-riso-orange",
    },
    {
      name: "奶白纸",
      nameEn: "Cream Stock",
      value: "#faf5eb",
      group: "surface",
      role: {
        zh: "纸张底。Riso 从不印纯白，纸本身是米白的。",
        en: "The stock — Riso never prints on pure white; the paper itself is cream.",
      },
      token: "--color-cream-stock",
    },
    {
      name: "草绿",
      nameEn: "Riso Green",
      value: "#22c55e",
      group: "accent",
      role: {
        zh: "可选墨版，用于第三色或替换橙。",
        en: "An optional drum for a third color, or in place of orange.",
      },
      token: "--color-riso-green",
    },
    {
      name: "薰衣草",
      nameEn: "Riso Lavender",
      value: "#a38bff",
      group: "accent",
      role: {
        zh: "粉与蓝叠印后的产物色，也可直接作为墨版使用。",
        en: "What pink over blue produces — also usable as a drum on its own.",
      },
      token: "--color-riso-lavender",
    },
  ],
  fonts: [
    {
      family: "Space Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [12, 14, 17, 24, 34, 48],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.7 },
      tracking: { display: "0.02em", label: "0.14em" },
      role: {
        zh: "等宽或粗无衬线，字距略开。Riso 印刷的边缘会略微涨墨，所以字形要选笔直有力的。",
        en: "Monospace or heavy sans on slightly open tracking. Riso ink spreads slightly at the edge, so the letterforms need to be blunt and strong.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 48, lineHeight: 1.1, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 34, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 700, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 17, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Cream Stock", value: "#faf5eb", purpose: "纸张底" },
    { level: 1, name: "Pink Layer", value: "rgba(255,107,157,0.28)", purpose: "第一个墨版层" },
    { level: 2, name: "Blue Layer", value: "rgba(37,99,235,0.22)", purpose: "第二个墨版层" },
  ],
  elevation: [
    { name: "Misregistration", value: "6px 6px 0 #2563eb, -4px -4px 0 #ff8a00" },
    { name: "Misregistration sm", value: "4px 4px 0 #2563eb, -3px -3px 0 #ff8a00" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Overprint Card",
      role: { zh: "叠印卡片（核心组件）", en: "The overprint card — the core component" },
      construction: {
        zh: "奶白纸底上叠两层墨版：第一层粉 28%，第二层蓝 22%，两层用 multiply 混合模式并各偏移 2px（一个右下、一个左上）。零圆角、1px 墨蓝 30% 描边、内边距 28px。hover 时双向硬阴影出现：6px 6px 0 蓝 与 -4px -4px 0 橙，过渡 100ms ease-linear。",
        en: "Two ink layers over cream stock — 28% pink then 22% blue, blended in multiply with each offset 2px, one down-right and one up-left. Zero radius, a 1px blue border at 30%, 28px padding. Hover brings the dual hard shadows: 6px 6px 0 in blue and -4px -4px 0 in orange, over 100ms ease-linear.",
      },
      states: "hover: dual-direction hard shadows appear",
    },
    {
      name: "Riso Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "荧光粉填充、奶白文字、零圆角、无描边，14px/700、字距 0.14em、padding 12px 28px。hover 时出现双向硬阴影 4px 4px 0 蓝 与 -3px -3px 0 橙，同时填充硬切到橙（不做透明度过渡）；按下时位移 2px 2px 且阴影归零。全程 100ms ease-linear。",
        en: "Riso pink fill, cream text, zero radius, no border, 14px/700 at 0.14em, 12px 28px padding. Hover adds the dual hard shadows 4px 4px 0 in blue and -3px -3px 0 in orange while cutting the fill straight to orange — no opacity fade. Press translates 2px 2px and zeroes the shadow. 100ms ease-linear throughout.",
      },
      sizes: "padding 12px 28px; label 14px",
      states: "hover: dual shadows, hard color cut; active: translate 2px",
    },
    {
      name: "Halftone Bed",
      role: { zh: "网点底", en: "The halftone bed" },
      construction: {
        zh: "用 radial-gradient 做 4px 间距、半径 1px 的网点，颜色取墨蓝 20% 或粉 20%，作为区块背景。网点角度在不同版本间应略有不同（15 度或 45 度），避免出现摩尔纹。",
        en: "A radial gradient lays 4px-spaced dots of 1px radius in 20% blue or pink as a section ground. Dot angles differ between sections — fifteen or forty-five degrees — so moiré never appears.",
      },
    },
    {
      name: "Registration Mark",
      role: { zh: "套印对位标记", en: "The registration mark" },
      construction: {
        zh: "十字加圆的经典对位标：一个 16px 的圆环（1px 墨蓝）叠一个 24px 的十字（1px 橙），中心留空。放在页面四角或卡片角上，作为纯装饰但它证明了这是印刷品。",
        en: "The classic cross-in-circle: a 16px ring in 1px blue under a 24px cross in 1px orange, hollow at the centre. It sits at page corners or on a card, purely decorative, and it is what proves this is print.",
      },
    },
    {
      name: "Ink Counter",
      role: { zh: "用色计数标记", en: "The ink-count mark" },
      construction: {
        zh: "在页面角落放一行 12px 等宽小字标注本次用了几版墨（如「2 INKS / PINK + BLUE」），颜色取墨黑 50%。这是 Riso 工作流的真实痕迹，也是这套风格最有说服力的细节。",
        en: "A 12px monospace line in a page corner stating how many drums ran — '2 INKS / PINK + BLUE' — in 50% ink. It is a real trace of the Riso workflow and the most convincing detail the style has.",
      },
    },
  ],
  imagery: {
    zh: "双色或三色网点图像：把照片分解成两到三块墨版，允许套印错位与边缘涨墨。允许手绘线稿叠印。不使用全彩摄影、写实阴影与渐变图像。",
    en: "Two or three spot-color halftone images: a photo separated into two or three plates, with registration offset and ink spread. Hand-drawn line art overprints well. No full-color photography, realistic shadow or gradient imagery.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 96px。零圆角，版式可略微歪斜（0.5 到 1 度）模拟手工对位。所有色块必须来自二到三支墨版，绝不超过四支。",
    en: "Capped at 1120px with 24px padding, sections 96px apart. Zero radius, and the layout may tilt half a degree to one degree like hand registration. Every block comes from two or three drums, never more than four.",
  },
  dos: [
    { zh: "只用二到三支墨版色", en: "Two or three ink drums only" },
    { zh: "hover 必须双向硬阴影", en: "Hover always shows dual-direction hard shadows" },
    { zh: "过渡 100ms ease-linear", en: "Transitions run 100ms ease-linear" },
    { zh: "阴影零模糊", en: "Shadows carry zero blur" },
    { zh: "米白纸张底", en: "Ground on cream stock" },
    { zh: "叠印用 multiply 混合", en: "Overprint in multiply mode" },
  ],
  donts: [
    { zh: "不要用复杂渐变", en: "No complex gradients" },
    { zh: "不要超过四支颜色", en: "Never exceed four colors" },
    { zh: "不要用写实阴影或光照", en: "No realistic shadow or lighting" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要用单方向阴影", en: "Never use a single-direction shadow" },
    { zh: "不要用 ease-in-out 或 opacity 过渡", en: "No ease-in-out and no opacity transitions" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#faf5eb",
      pink: "#ff6b9d",
      blue: "#2563eb",
      orange: "#ff8a00",
      green: "#22c55e",
    },
    prompts: [
      {
        zh: "做一个 Riso 印刷风按钮：背景 #ff6b9d、奶白文字、零圆角、14px/700 字距 0.14em、padding 12px 28px。hover 时 box-shadow 6px 6px 0 #2563eb, -4px -4px 0 #ff8a00（双向套印错位），同时背景硬切到 #ff8a00；active 时 translate(2px,2px) 且阴影 none。transition: 100ms linear。页面底 #faf5eb，可叠 4px 间距的 #2563eb 20% 网点。全页只用三支墨版色。",
        en: "Build a Riso button: background #ff6b9d, cream text, zero radius, 14px/700 at 0.14em tracking, 12px 28px padding. Hover applies box-shadow 6px 6px 0 #2563eb, -4px -4px 0 #ff8a00 for the registration offset while cutting the background straight to #ff8a00; active applies translate(2px,2px) with no shadow. Transition 100ms linear. The page ground is #faf5eb with 4px-spaced dots in 20% #2563eb. Only three drums run across the page.",
      },
    ],
  },
  similar: [
    { name: "Comic Style", why: { zh: "同为印刷错位，但漫画用黑墨线与气泡，Riso 用双色墨版", en: "Both print-derived offset, though comics uses black ink and bubbles while Riso uses two spot drums" } },
    { name: "Pixel Art", why: { zh: "同样有零模糊硬边，但像素讲状态机，Riso 讲机械印刷速度", en: "Both use zero-blur hard edges, though pixel art is a state machine while Riso is press speed" } },
  ],
  completeness: "full",
};
