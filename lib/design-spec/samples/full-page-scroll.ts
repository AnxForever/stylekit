import type { DesignSpec } from "../types";

export const fullPageScrollSpec: DesignSpec = {
  slug: "full-page-scroll",
  name: "全屏滚动布局",
  nameEn: "Full Page Scroll",
  cover: "/styles/full-page-scroll.svg",
  theme: "dark",
  northStar: {
    zh: "一屏一个场景，滚动一下换一幕：页面即分镜。",
    en: "One scene per screen, one scroll per cut — the page as a storyboard.",
  },
  summary: {
    zh: "全屏滚动布局把每个 section 做成 100vh 的独立场景，用 scroll-snap 强制吸附（scroll-snap-type: y mandatory），再配 scroll-behavior: smooth。它的成败全在细节：内容绝不能溢出单屏、必须给滚动提示、动画必须轻、锁定滚动的时间不能太长。最容易被忽略的一条是过渡延迟必须错落——如果所有元素同时进场，景深消失，页面就会像幻灯片而不是场景。",
    en: "Full Page Scroll turns each section into a 100vh scene, snapping hard with scroll-snap-type: y mandatory on top of scroll-behavior: smooth. Success lives in the details: content must never overflow a screen, a scroll indicator must exist, animation must stay light, and scroll locking never lasts long. The easiest rule to miss is staggering — if everything enters at once, depth collapses and the page reads as slides rather than scenes.",
  },
  colors: [
    {
      name: "幕黑",
      nameEn: "Curtain Black",
      value: "#000000",
      group: "surface",
      role: {
        zh: "场景默认底。无纹理无渐变，让每屏的内容自己成立。",
        en: "The default scene ground — no texture, no gradient, letting each screen stand on its own.",
      },
      token: "--color-curtain-black",
    },
    {
      name: "场白",
      nameEn: "Stage White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "反色场景底。黑白场景交替是这套布局最常用的节奏工具。",
        en: "The inverted scene ground — alternating black and white is the layout's main rhythm device.",
      },
      token: "--color-stage-white",
    },
    {
      name: "靛蓝",
      nameEn: "Indigo",
      value: "#6366f1",
      group: "accent",
      role: {
        zh: "主行动与进度指示，跨所有场景保持一致。",
        en: "Primary actions and progress, held consistent across every scene.",
      },
      token: "--color-indigo",
    },
    {
      name: "品红",
      nameEn: "Magenta",
      value: "#ec4899",
      group: "accent",
      role: {
        zh: "情绪转折场景的强调色，用于打破黑白节奏。",
        en: "Emphasis in emotional turning-point scenes, breaking the black-and-white rhythm.",
      },
      token: "--color-magenta",
    },
    {
      name: "青绿",
      nameEn: "Teal",
      value: "#14b8a6",
      group: "accent",
      role: {
        zh: "数据与功能场景，作为「理性」的一侧。",
        en: "Data and feature scenes — the rational side of the palette.",
      },
      token: "--color-teal",
    },
    {
      name: "橙",
      nameEn: "Amber",
      value: "#f59e0b",
      group: "accent",
      role: {
        zh: "提示与行动号召，出现频率最低。",
        en: "Nudges and calls to action, the least used.",
      },
      token: "--color-amber",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 700],
      sizes: [12, 14, 18, 28, 44, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.55 },
      tracking: { display: "-0.03em", label: "0.12em" },
      role: {
        zh: "全站唯一字体。场景标题 44 到 64px 配紧字距，小标签 12px 全大写。",
        en: "The only face. Scene titles run 44 to 64px on tight tracking, with 12px uppercase labels.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 64, lineHeight: 1.05, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 44, lineHeight: 1.1, tracking: "-0.025em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.2, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 0,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "20px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
  ],
  surfaces: [
    { level: 0, name: "Curtain Black", value: "#000000", purpose: "深色场景" },
    { level: 1, name: "Stage White", value: "#ffffff", purpose: "浅色场景" },
    { level: 2, name: "Scene Image", value: "full-bleed photo", purpose: "图像场景" },
  ],
  elevation: [
    { name: "Card", value: "0 16px 40px rgba(0,0,0,0.30)" },
    { name: "Button", value: "0 8px 20px rgba(99,102,241,0.30)" },
  ],
  components: [
    {
      name: "Snap Section",
      role: { zh: "全屏场景容器", en: "The full-screen scene container" },
      construction: {
        zh: "高 100vh（移动端用 100dvh 避免地址栏跳动）、scroll-snap-align: start、内容垂直居中、最大宽度 1120px、内边距 48px。内容必须能在单屏内看完，不允许内部再滚动。相邻场景底色交替（黑 / 白 / 图）形成剪辑感。",
        en: "100vh tall (100dvh on mobile to avoid address-bar jumps) with scroll-snap-align start, content centred vertically at a 1120px cap and 48px padding. Everything must fit within the screen — no inner scrolling. Adjacent scenes alternate grounds (black, white, image) to read as cuts.",
      },
      sizes: "100vh per scene",
    },
    {
      name: "Staggered Reveal",
      role: { zh: "场景内元素进场", en: "Element entry within a scene" },
      construction: {
        zh: "当一个场景进入视口时，元素依次以 80ms 的间隔上浮并淡入（translateY 24px → 0，opacity 0 → 1，600ms ease-out）。第一个元素延迟 0，第二个 80ms，第三个 160ms，最多延到 320ms。所有元素同时进场会让景深消失，这是硬禁令。",
        en: "When a scene enters, elements rise and fade in sequence at 80ms intervals (translateY 24px to 0, opacity 0 to 1, 600ms ease-out). The first starts at zero, the second at 80ms, the third at 160ms, capped at 320ms. Entering all at once destroys depth, and that is a hard prohibition.",
      },
    },
    {
      name: "Scroll Cue",
      role: { zh: "滚动提示（必须存在）", en: "The scroll indicator, which is mandatory" },
      construction: {
        zh: "固定在视口底部居中，距底 32px：一个 24px 高的细箭头或 1px 竖线，下方 12px 全大写 0.12em 的提示文字，整体做 2 秒的往复淡入淡出。最后一个场景切换为「回到顶部」。",
        en: "Pinned 32px from the bottom centre: a 24px arrow or 1px vertical line with 12px uppercase 0.12em text beneath, fading in and out on a two-second cycle. On the last scene it becomes a back-to-top.",
      },
    },
    {
      name: "Scene Progress",
      role: { zh: "场景进度指示", en: "Scene progress indicator" },
      construction: {
        zh: "固定在右侧中部，竖排 n 个 8px 圆点，间距 12px。当前场景的圆点拉伸为 24px 的短竖条并填充靛蓝，其余为白 30%。点击圆点跳转到对应场景，跳转用 smooth 但不做长时锁定。",
        en: "Fixed at the right edge, vertically centred: n 8px dots 12px apart. The active dot stretches into a 24px bar filled indigo while the rest sit at 30% white. Clicking a dot jumps to that scene with smooth behaviour, without a long lock.",
      },
    },
    {
      name: "Scene CTA",
      role: { zh: "场景内行动按钮", en: "The in-scene call to action" },
      construction: {
        zh: "靛蓝填充、白字、999px 全圆角、16px/500、padding 14px 32px，阴影 0 8px 20px 靛蓝 30%。hover 时提亮并上浮 2px；按下缩放 0.98。每个场景最多一个。",
        en: "Indigo fill, white text, fully rounded, 16px/500, 14px 32px padding, shadow 0 8px 20px at 30% indigo. Hover brightens and lifts 2px; press scales 0.98. One per scene at most.",
      },
    },
  ],
  imagery: {
    zh: "每个图像场景用一张全幅照片或渲染图，必须能承载白色或黑色文字（自带明暗区）。允许 20% 的暗角遮罩。不用装饰插画与图标墙。",
    en: "Each image scene takes one full-bleed photo or render that can carry either white or black text by itself, optionally with a 20% vignette. No decorative illustration or icon walls.",
  },
  layout: {
    zh: "上限 1120px，每个 section 100vh 且 scroll-snap-align: start，容器设 scroll-snap-type: y mandatory。内容垂直居中、单列、行宽不超过 40 字符。场景之间不加留白与分隔线——吸附本身就是分隔。",
    en: "Capped at 1120px with every section at 100vh and scroll-snap-align start, inside a container using scroll-snap-type: y mandatory. Content centres vertically in one column under a forty-character measure. No whitespace or dividers between scenes — the snap is the divider.",
  },
  dos: [
    { zh: "用 scroll-snap-type: y mandatory 吸附", en: "Snap with scroll-snap-type: y mandatory" },
    { zh: "一屏内容必须装得下", en: "Every scene must fit one screen" },
    { zh: "必须有滚动提示", en: "A scroll indicator is mandatory" },
    { zh: "进场延迟按 80ms 错落", en: "Stagger entry by 80ms" },
    { zh: "移动端用 100dvh", en: "Use 100dvh on mobile" },
    { zh: "场景底色交替形成剪辑感", en: "Alternate scene grounds to read as cuts" },
  ],
  donts: [
    { zh: "不要让内容溢出单屏", en: "Never let content overflow the screen" },
    { zh: "不要省略滚动提示", en: "Never omit the scroll cue" },
    { zh: "不要用过于复杂的动画", en: "No overly complex animation" },
    { zh: "不要长时间锁定滚动", en: "Do not lock scroll for long" },
    { zh: "不要忽略移动端体验", en: "Do not ignore mobile" },
    { zh: "不要让所有元素同一延迟进场", en: "Never give every element the same delay" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#000000",
      accent: "#6366f1",
      magenta: "#ec4899",
      teal: "#14b8a6",
      muted: "#a1a1aa",
    },
    prompts: [
      {
        zh: "做一个全屏滚动页面：容器设 scroll-snap-type: y mandatory、scroll-behavior: smooth。每个 section 高 100dvh、scroll-snap-align: start、内容垂直居中、最大宽度 1120px、内边距 48px。相邻场景底色交替黑与白。场景进入视口时元素按 80ms 间隔依次 translateY(24px) → 0、opacity 0 → 1、600ms ease-out。底部固定一个 24px 的滚动提示箭头与 12px 全大写文字，2 秒往复淡入淡出。",
        en: "Build a full-page scroll page: the container uses scroll-snap-type: y mandatory with scroll-behavior: smooth. Each section is 100dvh with scroll-snap-align start, content centred vertically at a 1120px cap and 48px padding. Adjacent scenes alternate black and white grounds. As a scene enters, its elements rise from translateY(24px) to 0 with opacity 0 to 1, staggered 80ms apart over 600ms ease-out. A 24px scroll arrow with 12px uppercase text pins to the bottom, fading on a two-second cycle.",
      },
    ],
  },
  similar: [
    { name: "Parallax Sections", why: { zh: "同样是全屏区块，但那边靠固定背景，这里靠吸附与场景切换", en: "Both use full-screen blocks, though that one moves fixed backdrops while this snaps between scenes" } },
    { name: "Immersive Photo", why: { zh: "同样一屏一图，但那边没有强制吸附", en: "Also one image per screen, though without forced snapping" } },
  ],
  completeness: "full",
};
