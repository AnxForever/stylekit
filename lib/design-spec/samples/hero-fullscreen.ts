import type { DesignSpec } from "../types";

export const heroFullscreenSpec: DesignSpec = {
  slug: "hero-fullscreen",
  name: "全屏英雄区布局",
  nameEn: "Fullscreen Hero",
  cover: "/styles/hero-fullscreen.svg",
  theme: "dark",
  northStar: {
    zh: "一整屏的画面先说话，文字只是画面上的标注。",
    en: "A full viewport of image speaks first; the copy is only a caption on top of it.",
  },
  summary: {
    zh: "全屏英雄区把首屏让给一张图或一段视频：视口高度 100vh，背景铺满，上面盖一层 30% 到 50% 的黑色遮罩保证文字可读。它的排版是反过来的——标题极大（56 到 96px）、副标题短、只放两个行动按钮，其余信息全部下移。按钮用反色（白底黑字）才能在深色遮罩上跳出。视觉细节只有一个：CTA 的「重力浮起」，hover 时上浮 4px 并让阴影爆发到 28px，像被光托起来。往下滚动时背景可做 0.3 到 0.5 的视差。",
    en: "Fullscreen Hero hands the first viewport to an image or a video: 100vh, a full-bleed background, and a 30% to 50% black veil so text stays readable. The typography inverts the usual order — headline very large at 56 to 96px, subtitle short, exactly two actions, everything else pushed below the fold. Buttons invert (white fill, black text) so they break out of the dark veil. There is one visual flourish only: the CTA's gravity float, lifting 4px on hover while its shadow bursts to 28px, as if light were holding it up. The background may parallax at 0.3 to 0.5 as the page scrolls.",
  },
  colors: [
    {
      name: "纯白",
      nameEn: "White",
      value: "#ffffff",
      group: "brand",
      role: {
        zh: "主按钮填充与标题文字。在全屏画面之上，白是唯一能保证可读的色。",
        en: "Primary button fill and headline text — above full-bleed imagery, white is the only reliable ground.",
      },
      token: "--color-white",
    },
    {
      name: "纯黑",
      nameEn: "Black",
      value: "#000000",
      group: "surface",
      role: {
        zh: "遮罩与按钮文字。遮罩用 30% 到 50% 不透明度铺在图上。",
        en: "Veil and button text. The veil sits on the image at 30% to 50% opacity.",
      },
      token: "--color-black",
    },
    {
      name: "珊瑚",
      nameEn: "Coral",
      value: "#ff6b6b",
      group: "accent",
      role: {
        zh: "次要强调与徽标，用于需要从画面中跳出的信息。",
        en: "Secondary emphasis and badges, for details that must break out of the image.",
      },
      token: "--color-coral",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#4ecdc4",
      group: "accent",
      role: {
        zh: "链接与次级按钮的悬停色，与暖色画面形成对位。",
        en: "Link and secondary button hover, pairing cool against warm imagery.",
      },
      token: "--color-cyan",
    },
    {
      name: "亮黄",
      nameEn: "Yellow",
      value: "#ffe66d",
      group: "accent",
      role: {
        zh: "高亮与数字，只用在小面积标注上。",
        en: "Highlights and figures, only as small annotations.",
      },
      token: "--color-yellow",
    },
    {
      name: "靛",
      nameEn: "Indigo",
      value: "#6c5ce7",
      group: "accent",
      role: {
        zh: "品牌色，用于 logo 与一处强调。不与珊瑚、黄同屏面积相当。",
        en: "The brand tone, on the logo and one accent — never at equal area with coral or yellow.",
      },
      token: "--color-indigo",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [13, 15, 18, 24, 40, 64, 96],
      lineHeight: { display: 0.98, heading: 1.1, body: 1.6 },
      tracking: { display: "-0.035em", label: "0.08em" },
      role: {
        zh: "全站唯一字体。首屏标题靠 96px 与 -0.035em 字距制造压迫感，其余字级迅速回落。",
        en: "The only face. The hero headline gets its force from 96px and -0.035em tracking; every other size drops away quickly.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 96, lineHeight: 0.98, tracking: "-0.035em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 64, lineHeight: 1.02, tracking: "-0.03em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 40, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 600, size: 13, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128, 192],
    maxWidth: 1280,
    sectionGap: 160,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
    { element: "media", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Full-bleed media", value: "image or video at 100vh", purpose: "首屏背景" },
    { level: 1, name: "Veil", value: "rgba(0,0,0,0.40)", purpose: "压在媒体上的遮罩" },
    { level: 2, name: "Frosted panel", value: "rgba(255,255,255,0.10)", purpose: "首屏内的特性卡" },
  ],
  elevation: [
    { name: "CTA rest", value: "0 4px 14px rgba(0,0,0,0.30)" },
    { name: "CTA hover", value: "0 8px 28px rgba(0,0,0,0.50)" },
    { name: "Card hover", value: "0 16px 40px rgba(0,0,0,0.50)" },
  ],
  components: [
    {
      name: "Hero CTA",
      role: { zh: "首屏主行动按钮", en: "Primary hero action" },
      construction: {
        zh: "白底、黑字、999px 全圆角、无描边，字级 18px、字重 600、padding 16px 32px，阴影 0 4px 14px 黑 30%。hover 时填充降到 95%、上浮 4px、阴影爆发到 0 8px 28px 黑 50%；按下缩放 0.98、位移归零、阴影回到 8px。焦点环用白色 80% 并带黑色 offset。过渡 200ms ease-out。",
        en: "White fill, black text, fully rounded at 999px, no border. 18px type at weight 600, 16px 32px padding, shadow 0 4px 14px at 30% black. Hover takes the fill to 95%, lifts 4px and bursts the shadow to 0 8px 28px at 50%; press scales 0.98, drops the lift and pulls the shadow back to 8px. The focus ring is 80% white with a black offset. 200ms ease-out.",
      },
      sizes: "padding 16px 32px; label 18px",
      states: "hover: lift 4px, shadow burst; active: scale 0.98",
    },
    {
      name: "Frosted Feature Card",
      role: { zh: "首屏内的特性卡与数据块", en: "Feature and stat cards inside the hero" },
      construction: {
        zh: "白 10% 填充、8px 模糊、1px 白 20% 描边、16px 圆角、内边距 32px。图标块 48px 见方、白 20% 底、12px 圆角。hover 时填充升到 15%、描边到 30%、上浮 8px、阴影 0 16px 40px 黑 50%，图标放大 1.1。过渡 300ms ease-out。",
        en: "10% white fill, 8px blur, a 1px white border at 20%, 16px radius, 32px padding. The icon tile is 48px square on a 20% white ground with a 12px radius. Hover raises the fill to 15%, the border to 30%, lifts 8px, applies a 0 16px 40px shadow at 50% black and scales the icon to 1.1. 300ms ease-out.",
      },
    },
    {
      name: "Transparent Nav",
      role: { zh: "首屏顶部导航", en: "Navigation over the hero" },
      construction: {
        zh: "完全透明，无边框无阴影。高 80px、水平内边距 32px，字标与链接均为白色，链接 13px/500、字距 0.08em、间距 32px，hover 转白 70%。滚动超过一屏后切换到实色底并加 1px 白 10% 下边框。",
        en: "Fully transparent, no border, no shadow. 80px tall with 32px horizontal padding; wordmark and links are white, links at 13px/500 with 0.08em tracking and 32px gaps, fading to 70% white on hover. Past the first viewport it switches to a solid ground with a 1px bottom border at 10% white.",
      },
    },
    {
      name: "Hero Media",
      role: { zh: "首屏背景图或视频", en: "Hero background image or video" },
      construction: {
        zh: "100vh 高、铺满宽度、object-fit: cover、直角。上覆一层 40% 黑遮罩（顶部可深到 55% 保证导航可读）。允许 0.3 到 0.5 的视差速度。视频必须静音、循环、poster 必填。",
        en: "100vh tall, full width, object-fit cover, square corners. A 40% black veil sits on top, reaching 55% at the top so the navigation stays legible. Parallax runs at 0.3 to 0.5. Video must be muted, looping and always carry a poster.",
      },
    },
  ],
  imagery: {
    zh: "全屏摄影或视频是这套布局的全部内容：风景、产品、现场。图片必须有明确的明暗区域来安放文字，四角不要有重要信息。不使用插画与图案背景。",
    en: "Full-bleed photography or video is the entire content of this layout: landscape, product, event. The image needs clear light and dark zones for the copy to sit in, and nothing important in the corners. No illustration or pattern backgrounds.",
  },
  layout: {
    zh: "首屏 100vh，内容垂直居中或偏下 60% 处，最大宽度 1280px、左右内边距 32px。标题最多两行，副标题一行，两个按钮横排。首屏内不放超过三个信息块。往下每个区块至少 160px 间距。",
    en: "The hero is 100vh with content centred or sitting at 60% height, capped at 1280px with 32px side padding. The headline runs two lines at most, the subtitle one, and the two buttons sit side by side. No more than three blocks live inside the hero. Sections below sit at least 160px apart.",
  },
  dos: [
    { zh: "首屏必须占满一个视口", en: "The hero fills exactly one viewport" },
    { zh: "遮罩 40% 起，保证文字可读", en: "Start the veil at 40% so copy stays readable" },
    { zh: "按钮用反色（白底黑字）", en: "Invert the buttons: white fill, black text" },
    { zh: "标题最多两行，副标题一行", en: "Two lines of headline, one of subtitle" },
    { zh: "CTA hover 上浮并爆发阴影", en: "The CTA lifts and bursts its shadow on hover" },
    { zh: "视差控制在 0.3 到 0.5", en: "Keep parallax between 0.3 and 0.5" },
  ],
  donts: [
    { zh: "不要在首屏放超过两个按钮", en: "No more than two buttons in the hero" },
    { zh: "不要把正文塞进首屏", en: "Do not add body copy to the hero" },
    { zh: "不要在图片角落放关键信息", en: "Never place key information in the image corners" },
    { zh: "不要用低于 30% 的遮罩", en: "Never go below a 30% veil" },
    { zh: "不要用自动播放带声音的视频", en: "No autoplaying video with sound" },
    { zh: "不要让视差超过 0.6", en: "Do not push parallax past 0.6" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      veil: "rgba(0,0,0,0.40)",
      ctaFill: "#ffffff",
      ctaText: "#000000",
      accent: "#ff6b6b",
      secondary: "#4ecdc4",
    },
    prompts: [
      {
        zh: "做一个全屏英雄区：容器 100vh、背景图 object-fit: cover、上面盖一层 rgba(0,0,0,0.4) 遮罩。内容垂直居中，标题 96px/700 白色、字距 -0.035em、最多两行；副标题 24px 白 80%；下面横排两个按钮，第一个白底黑字全圆角（18px/600、padding 16px 32px、阴影 0 4px 14px rgba(0,0,0,0.3)，hover 时 translateY(-4px) 阴影扩到 0 8px 28px）。",
        en: "Build a fullscreen hero: a 100vh container with a cover-fitted background image under a rgba(0,0,0,0.4) veil. Content is vertically centred with a 96px/700 white headline at -0.035em tracking, two lines maximum, a 24px subtitle at 80% white, and two buttons in a row — the first white on black-clear with a full radius (18px/600, 16px 32px padding, shadow 0 4px 14px rgba(0,0,0,0.3), lifting translateY(-4px) on hover with the shadow widening to 0 8px 28px).",
      },
    ],
  },
  similar: [
    { name: "Cinematic Video Hero", why: { zh: "同源的全屏叙事，但那边以视频调度为主", en: "Same full-bleed storytelling, though that one is driven by video editing" } },
    { name: "Immersive Photo", why: { zh: "同样以摄影为主体，节奏更慢、文字更少", en: "Also photography-led, with a slower pace and even less copy" } },
  ],
  completeness: "full",
};
