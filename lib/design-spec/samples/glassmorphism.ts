import type { DesignSpec } from "../types";

/**
 * Third gold-standard sample, chosen for the opposite reason to the other two:
 * this system has almost no solid color. Its depth comes from blur, saturation
 * and a lit edge. If the spec can carry "no fill, only optics", it can carry
 * anything in the catalogue.
 */
export const glassmorphismSpec: DesignSpec = {
  slug: "glassmorphism",
  name: "玻璃拟态",
  nameEn: "Glassmorphism",
  cover: "/styles/glassmorphism.svg",
  theme: "dark",
  northStar: {
    zh: "夜色里的光学：玻璃没有自己的颜色，它只借用、弯曲、柔化背后的光。",
    en: "Optics at night: glass has no color of its own — it borrows, bends and softens the light behind it.",
  },
  summary: {
    zh: "玻璃拟态的本质是光学，不是配色。真实玻璃是无色的，它从内容层取色、保持自身中性，这也是 Apple Liquid Glass 的原则。整套系统由三件事构成：一是深墨夜景底加两到三个大半径柔光斑，玻璃必须有东西可模糊；二是面板本身只用 5% 到 12% 的白，配 40px 到 60px 的 backdrop-blur 与 180% 的 backdrop-saturate；三是光必须有方向——顶边 1px 白色内高光、底边 1px 深色内暗缘、外层深阴影，三层同时存在才有厚度。唯一允许的颜色是香槟金，只给主 CTA 与关键数字。",
    en: "Glassmorphism is optics, not a palette. Real glass is colourless: it takes colour from the content layer and stays neutral itself, which is exactly the rule Apple's Liquid Glass follows. The system has three parts. First, a deep night canvas with two or three large-radius light wells — glass needs something to blur. Second, panels built from 5% to 12% white with 40px to 60px of backdrop-blur and 180% saturation. Third, direction of light: a 1px white inner highlight on the top edge, a 1px dark inner edge along the bottom, and a deep outer shadow. All three together produce thickness. The only permitted color is champagne gold, reserved for the primary CTA and key figures.",
  },
  colors: [
    {
      name: "深夜底",
      nameEn: "Night Deep",
      value: "#060a13",
      group: "surface",
      role: {
        zh: "最深一层底，用于全屏背景与最底层区块。玻璃浮在它上面才有对比。",
        en: "The deepest layer: full-screen backdrops and base sections. Glass only reads when it floats above this.",
      },
      token: "--color-night-deep",
    },
    {
      name: "夜",
      nameEn: "Night",
      value: "#0b1322",
      group: "surface",
      role: {
        zh: "默认页面底色。比深夜底亮一档，用来区分相邻区块而不引入第二条色带。",
        en: "The default page ground, one step lighter than the deepest tone so adjacent sections separate without a second color band.",
      },
      token: "--color-night",
    },
    {
      name: "钢夜",
      nameEn: "Night Steel",
      value: "#16233a",
      group: "surface",
      role: {
        zh: "次级面板与输入框底。用于需要在玻璃下层再分一层的地方。",
        en: "Secondary panels and input beds, for the places that need one more level beneath the glass.",
      },
      token: "--color-night-steel",
    },
    {
      name: "月光钢",
      nameEn: "Moon Steel",
      value: "#33517a",
      group: "neutral",
      role: {
        zh: "次级文字、图表对比与分隔线。是夜景里最接近「结构线」的颜色。",
        en: "Secondary text, chart contrast and dividers. The closest thing the night palette has to a structural line.",
      },
      token: "--color-moon-steel",
    },
    {
      name: "月光",
      nameEn: "Moonlight",
      value: "#7c9cc4",
      group: "neutral",
      role: {
        zh: "高光文字、图标与数据点。用于需要发亮但不抢主 CTA 的位置。",
        en: "Highlighted text, icons and data points — bright enough to register without competing with the CTA.",
      },
      token: "--color-moonlight",
    },
    {
      name: "香槟金",
      nameEn: "Champagne",
      value: "#e4b863",
      group: "accent",
      role: {
        zh: "全站唯一强调色。只给主 CTA、关键数字与最重要的一条链接。",
        en: "The only accent in the system. Reserved for the primary CTA, key figures and the single most important link.",
      },
      token: "--color-champagne",
    },
    {
      name: "玻璃层",
      nameEn: "Glass Fill",
      value: "rgba(255,255,255,0.08)",
      group: "surface",
      role: {
        zh: "面板填充。始终半透明，绝不超过 15%，否则退化成实心色块。",
        en: "Panel fill. Always translucent and never above 15%, or it degrades into a solid block.",
      },
      token: "--color-glass-fill",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "SF Pro Display, system-ui, -apple-system, sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 14, 16, 24, 40, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.14em" },
      role: {
        zh: "全站唯一字体。层级靠字重（400/500/600）与字号，不靠第二套字体。",
        en: "The only face in the system. Hierarchy comes from weight (400/500/600) and size, never from a second family.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Inter", weight: 600, size: 64, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", font: "Inter", weight: 600, size: 40, lineHeight: 1.15, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", font: "Inter", weight: 500, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", font: "Inter", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1280,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "panels", value: "32px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "14px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Night", value: "#0b1322", purpose: "页面底，所有光斑画在它上面" },
    { level: 1, name: "Glass", value: "rgba(255,255,255,0.08)", purpose: "标准玻璃面板" },
    { level: 2, name: "Glass Raised", value: "rgba(255,255,255,0.14)", purpose: "hover 态与需要更靠前的浮层" },
  ],
  elevation: [
    {
      name: "Glass rest",
      value: "0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35)",
    },
    {
      name: "Glass hover",
      value: "0 24px 64px rgba(3,7,18,0.6), inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(2,6,16,0.35)",
    },
  ],
  components: [
    {
      name: "Glass Panel",
      role: { zh: "所有内容容器：卡片、面板、弹层", en: "Every content container: cards, panels, overlays" },
      construction: {
        zh: "白色 8% 填充、40px backdrop-blur、180% backdrop-saturate、1px 白色 15% 描边、24px 圆角。阴影必须三层同时存在：外层 0 16px 40px 深色、顶边 inset 0 1px 0 白色 22%、底边 inset 0 -1px 0 深色 35%。内边距 32px。hover 时填充升到 14%、描边到 30%、阴影升到 64px 档、面板上浮 2px，过渡 500ms cubic-bezier(0.16, 1, 0.3, 1)。",
        en: "8% white fill, 40px backdrop-blur, 180% saturation, 1px white-at-15% border, 24px radius. The shadow is always three layers at once: an outer 0 16px 40px dark spread, a 1px white inset highlight on the top edge, and a 1px dark inset edge along the bottom. Padding 32px. On hover the fill rises to 14%, the border to 30%, the outer shadow to the 64px step and the panel lifts 2px, over 500ms with cubic-bezier(0.16, 1, 0.3, 1).",
      },
      sizes: "padding 32px; radius 24px",
      states: "hover: fill 8% to 14%, border 15% to 30%, translateY -2px",
    },
    {
      name: "Champagne CTA",
      role: { zh: "主行动按钮，全页只允许一个", en: "Primary action; one per page" },
      construction: {
        zh: "香槟金填充、深墨文字、999px 全圆角、无描边。16px 字体、500 字重、padding 14px 28px。hover 时填充提到 92% 不透明度、上浮 1px、加一层 0 12px 32px 金色 25% 的光晕，过渡 500ms 同一缓动。",
        en: "Champagne fill, deep-night text, fully rounded at 999px, no border. 16px type at weight 500, padding 14px 28px. On hover the fill goes to 92% opacity, the button lifts 1px and gains a 0 12px 32px glow at 25% champagne, over the same 500ms easing.",
      },
      sizes: "padding 14px 28px; radius 999px",
      states: "hover: lift 1px, glow; focus-visible: 2px champagne outline, 2px offset",
    },
    {
      name: "Glass Input",
      role: { zh: "表单输入与搜索框", en: "Form input and search field" },
      construction: {
        zh: "透明底、1px 白色 15% 描边、14px 圆角、无外阴影。内边距 12px 16px、14px 字体、占位符用月光钢。聚焦时描边升到 40%，并加一圈 0 0 0 3px 白色 8% 的外环，不改变尺寸。",
        en: "Transparent fill, 1px white-at-15% border, 14px radius, no outer shadow. Padding 12px 16px, 14px type, placeholder in moon steel. Focus raises the border to 40% and adds a 3px outer ring at 8% white without changing the box size.",
      },
      states: "focus: border 40%, 3px outer ring",
    },
    {
      name: "Stat Tile",
      role: { zh: "关键数字与仪表盘指标", en: "Key figures and dashboard metrics" },
      construction: {
        zh: "玻璃面板的轻量版：白色 5% 填充、24px 模糊、16px 圆角、内边距 24px。上方 12px 全大写 0.14em 标签用月光钢，下方 40px 数字用 600 字重白色，数字下方留 8px 放趋势说明。数字本身不允许用香槟金，除非它是页面上唯一的强调。",
        en: "A lighter glass panel: 5% white fill, 24px blur, 16px radius, 24px padding. A 12px uppercase 0.14em label in moon steel sits above a 40px figure at weight 600 in white, with 8px of air below for the trend note. The figure takes champagne only if it is the single emphasis on the page.",
      },
    },
    {
      name: "Night Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "高 72px，白色 4% 填充、20px 模糊、仅底部 1px 白色 10% 描边。左侧字标 16px 500 字重，中间链接 14px 月光钢、hover 转月光，右侧放一个香槟金 CTA。滚动超过一屏后填充升到 8%。",
        en: "72px tall, 4% white fill, 20px blur, border only along the bottom at 10% white. Wordmark at 16px weight 500 on the left, 14px moon-steel links in the middle that shift to moonlight on hover, one champagne CTA on the right. Past the first viewport the fill rises to 8%.",
      },
    },
  ],
  imagery: {
    zh: "必须有光源。用夜景摄影、暗场产品照，或纯 CSS 的两到三个大半径径向光斑。图像低饱和、深色、带明显的高光区域，因为玻璃要靠这些高光才能读出折射。不使用插画、图标墙与纯色平面背景。",
    en: "There must be a light source. Use night photography, dark product shots, or two to three large-radius radial gradients drawn in CSS. Images stay low-saturation and dark with obvious highlight areas, because glass needs those highlights to read as refraction. No illustration, no icon walls, no flat solid backgrounds.",
  },
  layout: {
    zh: "12 栏、上限 1280px。区块间距 128px，面板内边距 32px，元素间距 16px。内容浮在光斑之上：光斑固定于背景层，滚动时保持视差。一屏内玻璃面板不超过三个，超过就没有「实心」参照物，玻璃感会失效。",
    en: "Twelve columns capped at 1280px. Section rhythm 128px, panel padding 32px, 16px between elements. Content floats above the light wells, which stay pinned to the background layer and move with slight parallax. No more than three glass panels per viewport; past that there is no solid reference left and the material stops reading as glass.",
  },
  dos: [
    {
      zh: "背景必须先有光：深墨底加两到三个大半径柔光斑",
      en: "Light the background first: deep night ground plus two or three large-radius light wells",
    },
    {
      zh: "玻璃面板只用 5% 到 12% 的白，绝不超 15%",
      en: "Glass panels use 5% to 12% white and never exceed 15%",
    },
    {
      zh: "模糊 40px 起，并始终叠加 180% 饱和度增强",
      en: "Blur starts at 40px and always pairs with 180% saturation",
    },
    {
      zh: "阴影必须三层：外层深阴影、顶边白色内高光、底边深色内暗缘",
      en: "Shadows carry three layers: outer spread, white top inset highlight, dark bottom inset edge",
    },
    {
      zh: "唯一强调色香槟金只给主 CTA 与关键数字",
      en: "Champagne is the only accent, reserved for the CTA and key figures",
    },
    {
      zh: "圆角 16px 起，面板用 24px 到 32px",
      en: "Radius starts at 16px; panels take 24px to 32px",
    },
    {
      zh: "过渡统一 500ms 与 cubic-bezier(0.16, 1, 0.3, 1)",
      en: "Transitions run 500ms on cubic-bezier(0.16, 1, 0.3, 1)",
    },
  ],
  donts: [
    {
      zh: "不要用紫粉 AI 渐变背景（#667eea、#764ba2、#f093fb 一类）",
      en: "No purple-pink AI gradients such as #667eea, #764ba2 or #f093fb",
    },
    {
      zh: "不要在纯色平面背景上用玻璃，没有可模糊的东西",
      en: "Do not place glass on a flat solid background; there is nothing to blur",
    },
    {
      zh: "不要给玻璃面板本身上色，颜色属于背景",
      en: "Never tint the glass itself — color belongs to the background",
    },
    {
      zh: "不要用 backdrop-blur-sm 或低于 40px 的模糊",
      en: "No backdrop-blur-sm or any blur below 40px",
    },
    {
      zh: "不要省略 backdrop-saturate",
      en: "Do not omit backdrop-saturate",
    },
    {
      zh: "不要用不透明填充（bg-white、bg-black）",
      en: "No opaque fills such as bg-white or bg-black",
    },
    {
      zh: "不要用直角或小于 16px 的圆角",
      en: "No square corners and no radius under 16px",
    },
    {
      zh: "不要用单层扁平阴影",
      en: "No single-layer flat shadow",
    },
    {
      zh: "不要用 100ms 到 150ms 的快过渡，玻璃需要慢",
      en: "No 100ms to 150ms transitions; glass moves slowly",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#0b1322",
      muted: "#7c9cc4",
      accent: "#e4b863",
      glassFill: "rgba(255,255,255,0.08)",
      glassBorder: "rgba(255,255,255,0.15)",
    },
    prompts: [
      {
        zh: "做一个玻璃面板：背景 rgba(255,255,255,0.08)，backdrop-filter: blur(40px) saturate(180%)，1px 描边 rgba(255,255,255,0.15)，圆角 24px，内边距 32px。阴影写成 box-shadow: 0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35)。页面底色 #0b1322，并在面板后面放两个大半径径向光斑（一个 #33517a、一个 #e4b863，opacity 0.25）。",
        en: "Build a glass panel: background rgba(255,255,255,0.08), backdrop-filter blur(40px) saturate(180%), 1px border rgba(255,255,255,0.15), 24px radius, 32px padding. The shadow is box-shadow: 0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35). The page ground is #0b1322 with two large radial light wells behind the panel (one #33517a, one #e4b863 at 0.25 opacity).",
      },
      {
        zh: "做一个夜间 hero：左栏 12px 全大写 0.14em 标签（#7c9cc4），下面 64px 600 字重标题（#ffffff，字距 -0.02em），再接 16px 正文（#7c9cc4，行高 1.6），底部一个香槟金全圆角按钮（#e4b863 底、#060a13 文字、padding 14px 28px）。右栏一张玻璃卡片，hover 过渡 500ms，填充升到 14%、上浮 2px。",
        en: "Build a night hero: left column starts with a 12px uppercase 0.14em label in #7c9cc4, then a 64px weight-600 headline in #ffffff at -0.02em tracking, then 16px body copy in #7c9cc4 at 1.6 line height, and a champagne pill button (#e4b863 fill, #060a13 text, 14px 28px padding) underneath. The right column holds a glass card whose 500ms hover raises the fill to 14% and lifts it 2px.",
      },
    ],
  },
  similar: [
    {
      name: "Apple",
      why: {
        zh: "同一套光学原则：玻璃取背景色，自身保持中性，靠顶边高光读出厚度",
        en: "Same optical principle: glass takes the background's color, stays neutral itself, and reads its thickness from a top-edge highlight",
      },
    },
    {
      name: "Linear",
      why: {
        zh: "深色底加单一强调色，用面板层级而非边框划分区域",
        en: "Dark ground with a single accent, dividing space through panel levels rather than borders",
      },
    },
    {
      name: "Vercel",
      why: {
        zh: "夜景式暗底与克制的光，界面靠明度分层而不是装饰",
        en: "Night-toned ground and restrained light; hierarchy from luminance rather than ornament",
      },
    },
  ],
  completeness: "full",
};
