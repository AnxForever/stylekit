import type { DesignSpec } from "../types";

export const cinematicVideoHeroSpec: DesignSpec = {
  slug: "cinematic-video-hero",
  name: "电影视频首屏",
  nameEn: "Cinematic Video Hero",
  cover: "/styles/cinematic-video-hero.svg",
  theme: "dark",
  northStar: {
    zh: "一帧海报先到，然后画面开始动——像预告片的第一镜。",
    en: "A poster frame lands first, then the picture starts to move — the opening shot of a trailer.",
  },
  summary: {
    zh: "电影视频首屏用一个短片建立氛围：海报帧先渲染成为 LCP，静音视频在进入视口后才加载并自动循环，文字压在可读性遮罩上。它的技术纪律比视觉更严格——视频绝不能是 LCP 依赖，必须有 poster，绝不能 preload=auto，关键信息绝不能放进视频（视频可能不播或被降级），不能有声自动播，循环必须无缝且运动要慢。prefers-reduced-motion 与移动端降级都必须处理，否则在弱网设备上会直接变成一片黑。",
    en: "Cinematic Video Hero establishes atmosphere with a short film: a poster frame renders first as the LCP, a muted video loads and loops only once in view, and text sits on a readability scrim. Its technical discipline outranks its look — the video must never be the LCP dependency, a poster is mandatory, preload=auto is forbidden, key information must never live inside the video (it may not play or may be downgraded), sound never autoplays, and loops must seam with slow motion. Reduced motion and a mobile downgrade both need handling, or weak devices simply see black.",
  },
  colors: [
    {
      name: "影黑",
      nameEn: "Film Black",
      value: "#05060a",
      group: "surface",
      role: {
        zh: "视频区与页面底。近黑带蓝，让金色强调显得更暖。",
        en: "The video area and page ground — a blue-leaning near-black that makes the gold read warmer.",
      },
      token: "--color-film-black",
    },
    {
      name: "暖白",
      nameEn: "Warm White",
      value: "#f3efe8",
      group: "surface",
      role: {
        zh: "浅色区块与文字。偏暖的米白，像放映厅的银幕。",
        en: "Light sections and text — a warm off-white, like a projection screen.",
      },
      token: "--color-warm-white",
    },
    {
      name: "暖金",
      nameEn: "Warm Gold",
      value: "#e4c063",
      group: "accent",
      role: {
        zh: "唯一的强调色：主按钮、场景编号与高亮。",
        en: "The only accent: primary buttons, scene numbers and highlights.",
      },
      token: "--color-warm-gold",
    },
    {
      name: "卡面深",
      nameEn: "Card Dark",
      value: "#141821",
      group: "surface",
      role: {
        zh: "卡片与信息块。比影黑亮一点，用于在不破坏暗场的前提下分区。",
        en: "Cards and info blocks — a step above film black, dividing space without breaking the dark.",
      },
      token: "--color-card-dark",
    },
    {
      name: "银灰",
      nameEn: "Silver",
      value: "#9aa6b8",
      group: "neutral",
      role: {
        zh: "次级文字与元数据，像字幕的灰。",
        en: "Secondary text and metadata — the grey of subtitles.",
      },
      token: "--color-silver",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [11, 13, 16, 24, 40, 56],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.55 },
      tracking: { display: "-0.02em", label: "0.16em" },
      role: {
        zh: "全站唯一字体。首屏标题 40 到 56px、500 字重，小标签 11px 全大写 0.16em。",
        en: "The only face: hero headlines 40 to 56px at weight 500, labels 11px uppercase at 0.16em.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 500, size: 56, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", weight: 500, size: 40, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 24, lineHeight: 1.2, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 500, size: 11, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 128,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Film Black", value: "#05060a", purpose: "视频区与页面底" },
    { level: 1, name: "Card Dark", value: "#141821", purpose: "卡片" },
    { level: 2, name: "Warm White", value: "#f3efe8", purpose: "浅色区块" },
  ],
  elevation: [
    { name: "Gold CTA", value: "0 8px 24px rgba(228,192,99,0.28)" },
    { name: "Card", value: "0 20px 50px rgba(0,0,0,0.45)" },
  ],
  components: [
    {
      name: "Gold Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "暖金填充、影黑文字、999px 全圆角、无描边，16px/600、padding 14px 28px。hover 时填充提亮到 #efce78；按下缩放 0.98。可带一个 12px 的播放三角图标，间距 8px。过渡 300ms。",
        en: "Warm gold fill, film black text, fully rounded, no border, 16px/600, 14px 28px padding. Hover brightens the fill to #efce78; press scales 0.98. A 12px play triangle may sit 8px from the label. 300ms.",
      },
      sizes: "padding 14px 28px; label 16px",
      states: "hover: #efce78; active: scale 0.98",
    },
    {
      name: "Video Stage",
      role: { zh: "视频首屏（签名组件）", en: "The video hero — the signature" },
      construction: {
        zh: "高 100vh、overflow hidden、影黑底。先渲染 poster 图（AVIF，作为 LCP），video 元素设 muted、loop、playsInline、preload=\"none\"，用 IntersectionObserver 在 25% 入视时调用 load 与 play。上覆一层从底部黑 75% 到透明的渐变遮罩。prefers-reduced-motion 时完全不播放，只保留 poster。移动端可降级为 poster 加一张静帧。",
        en: "100vh tall with overflow hidden on a film black ground. The poster (AVIF) renders first as the LCP; the video element is muted, looping, playsInline with preload none, and an IntersectionObserver calls load and play at 25% visibility. A gradient scrim runs from 75% black at the bottom to transparent above. Reduced motion means no playback at all, poster only, and mobile may downgrade to poster plus a still.",
      },
      sizes: "100vh; poster as LCP",
    },
    {
      name: "Scene Card",
      role: { zh: "场景卡与影片条目", en: "Scene cards and film entries" },
      construction: {
        zh: "16:9 比例、12px 圆角、overflow hidden，底图用 poster 静帧并叠一层从底部黑 75% 到透明的遮罩。左下角放 11px 全大写 0.16em 的暖金场景编号，下方 18px/600 白色标题。整卡不加边框。",
        en: "16:9 with a 12px radius and overflow hidden, backed by a poster still under a gradient from 75% black to transparent. The bottom-left holds an 11px uppercase 0.16em scene number in gold above an 18px/600 white title. No border on the card.",
      },
    },
    {
      name: "Ghost Button",
      role: { zh: "次级行动", en: "Secondary action" },
      construction: {
        zh: "白 10% 填充、12px 模糊、999px 全圆角、1px 白 25% 描边、白字 16px/500、padding 14px 28px。hover 时填充升到 18%。用于「了解更多」这类次级动作。",
        en: "10% white fill with a 12px blur, fully rounded, a 1px white border at 25%, white 16px/500 text, 14px 28px padding. Hover raises the fill to 18%. It carries secondary actions like 'learn more'.",
      },
    },
    {
      name: "Pill Field",
      role: { zh: "邮箱与订阅输入", en: "Email and subscribe inputs" },
      construction: {
        zh: "白 10% 填充、12px 模糊、999px 全圆角、1px 白 25% 描边、padding 12px 20px、16px 字，占位符白 50%。聚焦时描边转暖金 70%、填充升到 15%。",
        en: "10% white fill with a 12px blur, fully rounded, a 1px white border at 25%, 12px 20px padding at 16px, placeholder at 50% white. Focus turns the border to 70% gold and the fill to 15%.",
      },
    },
  ],
  imagery: {
    zh: "视频与静帧必须同源同调：暗场、慢速运动、无缝循环。允许自然光与夜景。不使用快速剪辑、跳变运动与色彩跳变的素材。",
    en: "Video and stills must share one grade: dark, slow-moving, seamlessly looping. Natural light and night scenes both work. No fast cuts, jump motion or color-shifting footage.",
  },
  layout: {
    zh: "上限 1200px，首屏 100vh 全幅、文字居中或左下三分之一。区块间距 128px。视频区之外全部用影黑或卡面深，不用白色大区块，保持暗场连贯。",
    en: "Capped at 1200px with the hero full-bleed at 100vh and text centred or set in the lower third. Sections sit 128px apart. Everything outside the video stays film black or card dark, with no large white blocks, so the dark grade holds.",
  },
  dos: [
    { zh: "poster 先渲染并作为 LCP", en: "Render the poster first as the LCP" },
    { zh: "video 用 preload=none，入视才加载", en: "preload none, loading only on visibility" },
    { zh: "必须静音、playsInline、无缝循环", en: "Muted, playsInline, seamlessly looping" },
    { zh: "文字必须压在遮罩上", en: "Text always sits on a scrim" },
    { zh: "关键信息放在 DOM，不放视频里", en: "Keep essential copy in DOM, not in the video" },
    { zh: "reduced-motion 时只留 poster", en: "Reduced motion leaves the poster alone" },
  ],
  donts: [
    { zh: "不要让视频成为 LCP 依赖", en: "Never make the video the LCP dependency" },
    { zh: "不要省略 poster", en: "Never omit the poster" },
    { zh: "不要用 preload=auto 加载大视频", en: "No preload auto on large video" },
    { zh: "不要把关键信息放进视频", en: "Never put key information in the video" },
    { zh: "不要有声自动播", en: "Never autoplay with sound" },
    { zh: "不要用快切或无缝失败的循环", en: "No fast cuts or loops that do not seam" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f3efe8",
      background: "#05060a",
      card: "#141821",
      accent: "#e4c063",
      muted: "#9aa6b8",
      scrim: "rgba(0,0,0,0.75)",
    },
    prompts: [
      {
        zh: "做一个电影视频首屏：section 高 100vh、背景 #05060a、overflow hidden。先渲染 poster 图（AVIF）作为 LCP；video 设 muted、loop、playsInline、preload=\"none\"，用 IntersectionObserver 在 25% 入视时才 load() 与 play()，prefers-reduced-motion 时完全不播。上覆 linear-gradient(to top, rgba(0,0,0,0.75), transparent)。文字区放 56px/500 标题（字距 -0.02em）、11px 全大写 0.16em 的 #e4c063 场景标签，与一个 999px 圆角暖金按钮（#e4c063 填充、#05060a 文字、padding 14px 28px）。",
        en: "Build a cinematic video hero: a 100vh section on #05060a with overflow hidden. The AVIF poster renders first as the LCP; the video is muted, looping and playsInline with preload none, loaded and played only at 25% visibility through IntersectionObserver, and never played under reduced motion. Overlay a linear-gradient(to top, rgba(0,0,0,0.75), transparent). The text block holds a 56px/500 headline at -0.02em, an 11px uppercase 0.16em scene label in #e4c063, and a fully rounded gold button (#e4c063 fill, #05060a text, 14px 28px padding).",
      },
    ],
  },
  similar: [
    { name: "Immersive Photo", why: { zh: "同样以全幅影像开场，但那边是静帧加漂移，这里是视频", en: "Both open on full-bleed imagery, though that one drifts a still while this plays video" } },
    { name: "Launch Keynote", why: { zh: "同为暗场叙事，但发布会靠帧序列擦洗，这里靠自动播放", en: "Both tell a dark story, though keynote scrubs frames while this autoplays" } },
  ],
  completeness: "full",
};
