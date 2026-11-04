import type { DesignSpec } from "../types";

export const scrollytellingSpec: DesignSpec = {
  slug: "scrollytelling",
  name: "滚动叙事",
  nameEn: "Scrollytelling",
  cover: "/styles/scrollytelling.svg",
  theme: "dark",
  northStar: {
    zh: "滚动手势就是时间轴：画面钉住，文字一步步走过，每步换一个状态。",
    en: "Scrolling is the timeline: the canvas pins while text steps past, each step switching a state.",
  },
  summary: {
    zh: "滚动叙事是数据长报道的语法：一个 sticky 画布钉在视口里，文字步骤从它旁边滚过，每一步触发一次离散的状态变化（数字滚动、形状变形、图层点亮）。它与「滚动擦洗」的关键区别在于离散而非连续——用 IntersectionObserver 检测每一步进入视口再切换状态，绝不在 scroll 事件里读 offsetTop 或 getBoundingClientRect 做连续计算，那会卡顿。画布只改 transform 与 opacity，绝不改 top、width、height。数值必须有 DOM 里的静态文本作为真实来源，因为计数器读屏与 SEO 都读不到。",
    en: "Scrollytelling is the grammar of the long-form data feature: a sticky canvas pins in the viewport while text steps scroll past, and each step fires one discrete state change — figures counting, shapes morphing, layers lighting up. What separates it from scroll scrubbing is discreteness: an IntersectionObserver detects each step entering and switches the canvas, never reading offsetTop or getBoundingClientRect inside a scroll handler for continuous work. The canvas changes transform and opacity only, never top, width or height. Figures need static DOM text as their real source, because a counter is invisible to screen readers and search engines alike.",
  },
  colors: [
    {
      name: "深底",
      nameEn: "Deep Base",
      value: "#0e1116",
      group: "surface",
      role: {
        zh: "页面底。数据长报道的沉浸底色。",
        en: "The page ground — the immersive base of a long data feature.",
      },
      token: "--color-deep-base",
    },
    {
      name: "暖白",
      nameEn: "Warm White",
      value: "#f7f5f0",
      group: "brand",
      role: {
        zh: "正文与画布标注。比纯白暖，长时间阅读不刺眼。",
        en: "Body text and canvas labels — warmer than white over a long read.",
      },
      token: "--color-warm-white",
    },
    {
      name: "信号蓝",
      nameEn: "Signal Blue",
      value: "#2f6fed",
      group: "accent",
      role: {
        zh: "当前焦点的唯一标记：活动步骤、高亮数据点、进度。",
        en: "The single mark of current focus: active step, highlighted datum, progress.",
      },
      token: "--color-signal-blue",
    },
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#e8503a",
      group: "accent",
      role: {
        zh: "只用于对比与警示，不参与常规强调。",
        en: "Reserved for contrast and alarms, never routine emphasis.",
      },
      token: "--color-vermilion",
    },
    {
      name: "中墨",
      nameEn: "Mid Ink",
      value: "#1c2530",
      group: "surface",
      role: {
        zh: "卡片与画布衬底，比深底亮一档。",
        en: "Cards and canvas backing, one step above the deep base.",
      },
      token: "--color-mid-ink",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 600, 700],
      sizes: [12, 14, 17, 24, 36, 48],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.14em" },
      role: {
        zh: "全站唯一字体。步骤标题 24 到 36px、600 字重，正文 17px、行高 1.6。",
        en: "The only face. Step headings run 24 to 36px at weight 600, body at 17px on 1.6 leading.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 13],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0.04em", label: "0.14em" },
      role: {
        zh: "步骤编号、坐标轴刻度与数值标签。等宽让数据可被比较。",
        en: "Step numbers, axis ticks and value labels — the monospace makes data comparable.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Inter", weight: 700, size: 48, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", font: "Inter", weight: 700, size: 36, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", font: "Inter", weight: 600, size: 24, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 17, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 11, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 128,
    cardPadding: 24,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "6px" },
    { element: "dots", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Base", value: "#0e1116", purpose: "页面底" },
    { level: 1, name: "Mid Ink", value: "#1c2530", purpose: "卡片与画布衬底" },
  ],
  elevation: [
    { name: "None", value: "none — the canvas carries the depth" },
    { name: "Card", value: "0 8px 24px rgba(0,0,0,0.35)" },
  ],
  components: [
    {
      name: "Sticky Canvas",
      role: { zh: "钉住的画布（核心组件）", en: "The pinned canvas — the core component" },
      construction: {
        zh: "外层高 300vh，内层 sticky top-0、高 100vh、含一个 canvas 或 SVG。每一步由 IntersectionObserver 触发，把画布切到该步的离散状态（不做连续擦洗）。所有状态切换只改 transform 与 opacity，绝不改 top、width、height。prefers-reduced-motion 时直接跳到各步的终态。",
        en: "The outer section runs 300vh with a sticky 100vh inner layer holding a canvas or SVG. Each step fires through IntersectionObserver and switches the canvas to that step's discrete state — no continuous scrubbing. Every transition changes transform and opacity only, never top, width or height. Reduced motion jumps straight to each step's final state.",
      },
      sizes: "outer 300vh; sticky 100vh",
    },
    {
      name: "Step Block",
      role: { zh: "叙事步骤块", en: "The narrative step block" },
      construction: {
        zh: "左侧 2px 信号蓝竖线、内边距 0 0 0 24px，行高 96px 以上。上方 11px 等宽全大写步骤编号（Step 02），标题 24 到 36px/600，正文 17px 暖白 70%、最大宽度 28rem。当前步骤的竖线与编号升到 100% 不透明度，非当前降到 30%。",
        en: "A 2px signal blue rule on the left with 24px of left padding and at least 96px of vertical space. An 11px monospace uppercase step number sits above a 24 to 36px/600 heading and 17px body in 70% warm white capped at 28rem. The active step's rule and number reach full opacity while the rest sit at 30%.",
      },
    },
    {
      name: "Progress Rail",
      role: { zh: "进度轨", en: "The progress rail" },
      construction: {
        zh: "固定在视口右侧中部，宽 2px、高 40vh，底槽为暖白 15%。已完成部分填信号蓝，高度按当前步骤索引递增。旁边等宽显示「02 / 07」。",
        en: "Fixed at the right edge, vertically centred, 2px wide and 40vh tall on a 15% warm white track. The completed portion fills signal blue, growing with the step index, with a monospace '02 / 07' beside it.",
      },
    },
    {
      name: "Figure Label",
      role: { zh: "图注与数值标注", en: "Figure captions and value labels" },
      construction: {
        zh: "图注 11px 等宽全大写、暖白 50%、位于图下方 12px。关键数值必须同时以静态 DOM 文本存在（而不是只由计数器渲染），字体 13px 等宽、信号蓝。",
        en: "Captions run 11px monospace uppercase in 50% warm white, 12px under the figure. Key figures must also exist as static DOM text rather than only being rendered by a counter, at 13px monospace in signal blue.",
      },
    },
    {
      name: "Next Button",
      role: { zh: "章节推进按钮", en: "The chapter advance button" },
      construction: {
        zh: "信号蓝填充、白字、6px 圆角、14px/600、padding 10px 20px，hover 时填充加深到 #2560d4；按下缩放 0.98。焦点环 2px 信号蓝 50% 且 offset 必须取深底色，否则在暗底上看不见。",
        en: "Signal blue fill, white text, 6px radius, 14px/600, 10px 20px padding, with hover deepening the fill to #2560d4 and press scaling 0.98. The focus ring is 2px at 50% signal blue with an offset in the deep base color, or it disappears.",
      },
    },
  ],
  imagery: {
    zh: "图表即图像：折线、面积、散点、地图与流程，全部由画布绘制并随步骤切换状态。允许一条底线示意与少量标注。不使用装饰摄影与插画，任何图像都必须承担数据。",
    en: "Charts are the imagery: lines, areas, scatter plots, maps and flows, drawn on the canvas and changing state with each step. A baseline and a few annotations are welcome. No decorative photography or illustration — every image must carry data.",
  },
  layout: {
    zh: "上限 1200px。桌面为左右分栏：左侧 45% 放钉住的画布或右侧 55% 放滚动的文字（或反之），文字列最大宽度 28rem。移动端改为上图下文，画布高度降到 50vh，绝不挤掉文字。",
    en: "Capped at 1200px. Desktop splits: a pinned canvas on one side at 45% with scrolling text at 55% on the other, the text column capped at 28rem. Mobile stacks figure above text with the canvas reduced to 50vh — never crowding the copy out.",
  },
  dos: [
    { zh: "用 IntersectionObserver 触发离散状态", en: "Trigger discrete states with IntersectionObserver" },
    { zh: "画布只改 transform 与 opacity", en: "Change only transform and opacity on the canvas" },
    { zh: "一步只讲一个新信息", en: "One new piece of information per step" },
    { zh: "数值必须有静态 DOM 文本", en: "Figures need static DOM text" },
    { zh: "只用两个强调色", en: "Use exactly two accents" },
    { zh: "reduced-motion 时跳到终态", en: "Jump to final states under reduced motion" },
  ],
  donts: [
    { zh: "不要在 scroll 里读 offsetTop 做连续擦洗", en: "No continuous scrubbing from offsetTop in scroll" },
    { zh: "不要一步塞多个新信息", en: "Never stack multiple new facts in one step" },
    { zh: "不要改画布的布局属性", en: "Never change canvas layout properties" },
    { zh: "不要让计数器成为唯一数值来源", en: "Never let a counter be the only value source" },
    { zh: "不要在移动端让画布挤掉文字", en: "Do not let the canvas crowd out text on mobile" },
    { zh: "不要超过两个强调色", en: "Never exceed two accents" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f7f5f0",
      background: "#0e1116",
      accent: "#2f6fed",
      alert: "#e8503a",
      card: "#1c2530",
      muted: "#8b94a3",
    },
    prompts: [
      {
        zh: "做一个滚动叙事页面：深底 #0e1116、暖白文字 #f7f5f0。左侧一块 sticky top-0、高 100vh 的画布（外层 300vh），右侧是滚动的步骤块（左边 2px #2f6fed 竖线、11px 等宽全大写步骤编号、24px/600 标题、17px 正文）。用 IntersectionObserver 检测每步进入视口后把画布切到该步的离散状态，画布只改 transform 与 opacity。当前步骤的竖线与编号 100% 不透明、其余 30%。关键数值必须有静态 DOM 文本。reduced-motion 时直接跳到终态。",
        en: "Build a scrollytelling page: deep base #0e1116 with warm white #f7f5f0 text. A sticky 100vh canvas sits on the left inside a 300vh section, with scrolling step blocks on the right (a 2px #2f6fed left rule, an 11px monospace uppercase step number, a 24px/600 heading, 17px body). IntersectionObserver detects each step entering and switches the canvas to its discrete state, changing transform and opacity only. The active step's rule and number sit at full opacity while the rest hold at 30%. Key figures must exist as static DOM text, and reduced motion jumps straight to final states.",
      },
    ],
  },
  similar: [
    { name: "Launch Keynote", why: { zh: "同样钉住画布，但发布会是连续擦洗帧，滚动叙事是离散步骤切换", en: "Both pin a canvas, though keynote scrubs frames continuously while scrollytelling switches discrete steps" } },
    { name: "Parallax Editorial", why: { zh: "同样以滚动驱动叙事，但那边是层速度差，这里是状态机", en: "Both drive narrative by scroll, though that one varies layer speed while this is a state machine" } },
  ],
  completeness: "full",
};
