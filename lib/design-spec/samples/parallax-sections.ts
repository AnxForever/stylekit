import type { DesignSpec } from "../types";

export const parallaxSectionsSpec: DesignSpec = {
  slug: "parallax-sections",
  name: "视差滚动",
  nameEn: "Parallax Sections",
  cover: "/styles/parallax-sections.svg",
  theme: "dark",
  northStar: {
    zh: "每一屏都是一张定住的背景，内容从上面滑过去。",
    en: "Each viewport holds a fixed backdrop while the content slides across it.",
  },
  summary: {
    zh: "视差滚动把页面切成若干个 100vh 的区块，每个区块有自己的固定背景（bg-fixed），内容在其上滚动，于是前景与背景产生速度差，深景被模拟出来。可读性靠两层处理：区块内铺一层从深海军蓝 80% 到底部透明的渐变遮罩，内容本身再包一层 90% 白色的半透明卡片。表现力集中在「景深」而不是位移——交互优先改变不透明度与模糊，避免大幅度平移导致眩晕。过渡区块用渐变把两块背景缝起来。",
    en: "Parallax Sections cuts the page into 100vh blocks, each with its own fixed backdrop, so content scrolls across it and the speed difference between layers manufactures depth. Legibility takes two passes: a gradient veil from 80% deep navy fading to transparent at the bottom, and a 90% white semi-transparent card around the content itself. Expression lives in depth of field rather than displacement — interaction prefers opacity and blur over large translations that cause motion sickness. Transitional sections stitch two backdrops together with a gradient.",
  },
  colors: [
    {
      name: "深海军蓝",
      nameEn: "Deep Navy",
      value: "#1e3a5f",
      group: "brand",
      role: {
        zh: "遮罩与深色区块的基调。视差区块的暗部全靠它。",
        en: "The veil tone and the base of dark sections — all parallax shadow comes from it.",
      },
      token: "--color-deep-navy",
    },
    {
      name: "雪白",
      nameEn: "Snow",
      value: "#f8fafc",
      group: "surface",
      role: {
        zh: "内容卡填充与亮色区块底。以 90% 不透明度叠在背景上。",
        en: "Content card fill and light section ground, laid over the backdrop at 90% opacity.",
      },
      token: "--color-snow",
    },
    {
      name: "主蓝",
      nameEn: "Primary Blue",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "主行动与链接，在暗色背景上要提到这一档才够亮。",
        en: "Primary actions and links — it needs this brightness to survive a dark backdrop.",
      },
      token: "--color-primary-blue",
    },
    {
      name: "浅蓝",
      nameEn: "Pale Blue",
      value: "#93c5fd",
      group: "accent",
      role: {
        zh: "次级强调与图标，用于深蓝底上的细节。",
        en: "Secondary emphasis and icons, for detail work on navy.",
      },
      token: "--color-pale-blue",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#0ea5e9",
      group: "accent",
      role: {
        zh: "渐变末端与高亮，用于区块之间的过渡带。",
        en: "Gradient tails and highlights, used in the transitional bands between sections.",
      },
      token: "--color-sky",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#c559f0",
      group: "accent",
      role: {
        zh: "唯一暖偏色，用于区分相邻区块的情绪，出现频率最低。",
        en: "The one warm-leaning accent, used to shift the mood between adjacent sections; the least frequent.",
      },
      token: "--color-violet",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 32, 56, 80],
      lineHeight: { display: 1.02, heading: 1.15, body: 1.65 },
      tracking: { display: "-0.03em", label: "0.08em" },
      role: {
        zh: "全站唯一字体。区块标题 80px 配紧字距，正文 16px 配 1.65 行高，全屏区块里读起来才不费劲。",
        en: "The only face: 80px section titles on tight tracking, 16px body at 1.65 leading so long full-screen sections stay easy.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 80, lineHeight: 1.02, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 56, lineHeight: 1.05, tracking: "-0.025em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 32, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.65, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 0,
    cardPadding: 48,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
    { element: "media", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Fixed backdrop", value: "image, bg-fixed", purpose: "每屏的固定背景" },
    { level: 1, name: "Navy veil", value: "rgba(30,58,95,0.80)", purpose: "压在背景上的渐变遮罩" },
    { level: 2, name: "Snow card", value: "rgba(248,250,252,0.90)", purpose: "内容卡" },
  ],
  elevation: [
    { name: "Card", value: "0 24px 60px rgba(15,23,42,0.18)" },
    { name: "Card hover", value: "0 32px 80px rgba(15,23,42,0.24)" },
  ],
  components: [
    {
      name: "Parallax Section",
      role: { zh: "全屏区块容器", en: "Full-screen section container" },
      construction: {
        zh: "min-height: 100vh、背景图使用 background-attachment: fixed、background-size: cover、background-position: center。上覆一层从深海军蓝 80% 到底部透明的线性渐变。内容垂直居中，最大宽度 1120px、左右内边距 32px。移动端关闭 fixed（性能与视觉都会崩），改为普通滚动。",
        en: "min-height 100vh with background-attachment fixed, cover sizing and centred positioning. A linear gradient from 80% deep navy to transparent sits on top. Content is vertically centred, capped at 1120px with 32px side padding. On mobile the fixed attachment is disabled — both performance and the illusion break — and it falls back to normal scrolling.",
      },
      sizes: "100vh per section",
    },
    {
      name: "Content Card",
      role: { zh: "区块内的内容容器", en: "Container inside a section" },
      construction: {
        zh: "雪白 90% 填充、12px 模糊、24px 圆角、内边距 48px，阴影 0 24px 60px 黑 18%。标题与正文都压在这张卡上以保证可读。hover 时阴影扩到 80px、上浮 4px，过渡 400ms ease-out。",
        en: "Snow at 90% fill, 12px blur, 24px radius, 48px padding, shadow 0 24px 60px at 18% black. Both heading and body sit on this card so they stay readable. Hover widens the shadow to 80px and lifts 4px, over 400ms ease-out.",
      },
    },
    {
      name: "Transition Band",
      role: { zh: "区块之间的缝", en: "The seam between sections" },
      construction: {
        zh: "高 160px 的纯渐变带，从上一区块的末端色过渡到下一区块的起始色，中间可加一层 40px 模糊。它不承载内容，唯一职责是让两块固定背景不出现硬边。",
        en: "A 160px band running from the previous section's end color to the next section's start color, optionally with a 40px blur in the middle. It carries no content; its only job is to keep two fixed backdrops from meeting at a hard edge.",
      },
    },
    {
      name: "Scroll Cue",
      role: { zh: "首屏滚动提示", en: "First-screen scroll cue" },
      construction: {
        zh: "首屏底部居中放一条 1px 白色 50% 的竖线，高 48px，下方配 12px 全大写 0.08em 的白 70% 文字。线与文字做 2.4 秒的往复淡入淡出，只改不透明度，不做位移。",
        en: "A 1px vertical white line at 50% hangs 48px from the bottom centre of the hero, with 12px uppercase 0.08em text at 70% white below it. Line and text fade in and out over 2.4 seconds, animating opacity only.",
      },
    },
  ],
  imagery: {
    zh: "每屏一张全幅背景：风景、建筑、产品特写。背景必须有明确的暗部来承载遮罩与文字，而且要能自然衔接下一屏。不使用白底图与插画。",
    en: "One full-bleed backdrop per screen: landscape, architecture, product detail. The image needs a clear dark region to hold the veil and the copy, and it must hand over naturally to the next screen. No white-background images or illustration.",
  },
  layout: {
    zh: "页面由若干 100vh 区块纵向串起，区块之间用 160px 渐变带缝合。内容宽度上限 1120px，垂直居中。每屏只讲一件事，标题加一段正文加一个行动，不超过三个元素。",
    en: "The page is a vertical chain of 100vh sections joined by 160px gradient bands. Content caps at 1120px and centres vertically. Each screen carries one idea — a heading, a paragraph and one action, never more than three elements.",
  },
  dos: [
    { zh: "每屏 100vh，背景 fixed", en: "Each screen is 100vh with a fixed backdrop" },
    { zh: "遮罩从 80% 渐变到透明", en: "Run the veil from 80% to transparent" },
    { zh: "内容包在 90% 白卡里保证可读", en: "Wrap content in a 90% white card for legibility" },
    { zh: "区块之间用 160px 渐变带缝合", en: "Join sections with 160px gradient bands" },
    { zh: "交互优先改不透明度与模糊", en: "Prefer opacity and blur changes over translation" },
    { zh: "移动端关闭 fixed", en: "Disable fixed attachment on mobile" },
  ],
  donts: [
    { zh: "不要让背景与内容以相同速度滚动", en: "Never scroll backdrop and content at the same speed" },
    { zh: "不要用超过 0.5 的视差比", en: "Do not exceed a 0.5 parallax ratio" },
    { zh: "不要在大幅位移上做动效", en: "No large-displacement animation" },
    { zh: "不要在移动端保留 fixed", en: "Do not keep fixed attachment on mobile" },
    { zh: "不要在一屏里放两个背景", en: "Never stack two backdrops in one screen" },
    { zh: "不要让文字直接压在图上", en: "Never let text sit directly on the image" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1e293b",
      backdrop: "#1e3a5f",
      veil: "rgba(30,58,95,0.80)",
      card: "rgba(248,250,252,0.90)",
      accent: "#3b82f6",
      secondary: "#93c5fd",
    },
    prompts: [
      {
        zh: "做一个视差区块：min-height 100vh、background-image 用 background-attachment: fixed、background-size: cover、background-position: center。上覆一层 linear-gradient(to bottom, rgba(30,58,95,0.8), transparent)。内容放在一张 90% 白卡里（24px 圆角、内边距 48px、backdrop-blur 12px、阴影 0 24px 60px rgba(15,23,42,0.18)），垂直居中，最大宽度 1120px。",
        en: "Build a parallax section: min-height 100vh with background-attachment fixed, background-size cover and centre positioning. Layer a linear-gradient(to bottom, rgba(30,58,95,0.8), transparent) on top. Content sits in a 90% white card (24px radius, 48px padding, backdrop-blur 12px, shadow 0 24px 60px rgba(15,23,42,0.18)), vertically centred and capped at 1120px.",
      },
    ],
  },
  similar: [
    { name: "Fullscreen Hero", why: { zh: "同样以全屏背景为主体，但视差是逐屏持续的", en: "Also built on full-bleed backdrops, though parallax sustains it across every screen" } },
    { name: "Immersive Photo", why: { zh: "同属摄影叙事，沉浸感更强、信息更少", en: "Also photographic storytelling, with deeper immersion and less information" } },
  ],
  completeness: "full",
};
