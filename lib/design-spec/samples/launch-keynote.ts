import type { DesignSpec } from "../types";

export const launchKeynoteSpec: DesignSpec = {
  slug: "launch-keynote",
  name: "发布会主题",
  nameEn: "Launch Keynote",
  cover: "/styles/launch-keynote.svg",
  theme: "dark",
  northStar: {
    zh: "纯黑舞台，产品自己发光，一屏一个主张，滚动即播放。",
    en: "A pitch-black stage, the product lighting itself, one claim per viewport, scroll as playback.",
  },
  summary: {
    zh: "发布会主题模仿科技产品发布页：舞台是纯黑（#000000），没有边框与纹理，产品图自己发光，留白本身就是张力。整页只有一支强调色——电蓝 #2997FF，其余全是黑白灰。它的签名是滚动擦洗的帧序列：一个 sticky 画布按滚动进度播放预渲染的产品动画，一屏只讲一个产品、一句主张。技术约束比视觉更硬——帧必须用 IntersectionObserver 懒加载而不是一载就全部预载、滚动处理器里绝不能读 offsetTop 或 getBoundingClientRect（会 layout thrash）、关键信息绝不能烘焙进帧图、必须尊重 prefers-reduced-motion 并给 devicePixelRatio 封顶。",
    en: "Launch Keynote reproduces the product reveal page: a pitch-black stage (#000000) with no borders or texture, product imagery that lights itself, and whitespace standing in as tension. The page carries exactly one accent — electric blue #2997FF — and everything else is black, near-white or mid grey. Its signature is a scroll-scrubbed frame sequence: a sticky canvas plays a pre-rendered animation driven by scroll position, one product and one claim per viewport. The technical constraints are harder than the look — frames must lazy-load through IntersectionObserver rather than preloading on mount, the scroll handler must never read offsetTop or getBoundingClientRect, key information must never be baked into a frame, and both prefers-reduced-motion and a devicePixelRatio cap are mandatory.",
  },
  colors: [
    {
      name: "舞台黑",
      nameEn: "Stage Black",
      value: "#000000",
      group: "surface",
      role: {
        zh: "页面底。纯黑无纹理，让产品图的边缘消失，形成无限深的舞台。",
        en: "The page ground — pure black with no texture, so product edges dissolve into an infinitely deep stage.",
      },
      token: "--color-stage-black",
    },
    {
      name: "近白",
      nameEn: "Near White",
      value: "#f5f5f7",
      group: "surface",
      role: {
        zh: "主要文字与高对比元素。比纯白柔，长时间看不刺眼。",
        en: "Primary text and high-contrast elements — softer than white over a long read.",
      },
      token: "--color-near-white",
    },
    {
      name: "中灰",
      nameEn: "Mid Grey",
      value: "#86868b",
      group: "neutral",
      role: {
        zh: "次级文字、说明与规格。永远是第三层级。",
        en: "Secondary text, captions and specs — always the third tier.",
      },
      token: "--color-mid-grey",
    },
    {
      name: "电蓝",
      nameEn: "Electric Blue",
      value: "#2997ff",
      group: "accent",
      role: {
        zh: "唯一强调色：链接、主 CTA 与关键数字。全页不得出现第二种彩色。",
        en: "The only accent: links, primary CTAs and key figures. No second color appears anywhere.",
      },
      token: "--color-electric-blue",
    },
    {
      name: "卡面深灰",
      nameEn: "Card Graphite",
      value: "#1d1d1f",
      group: "surface",
      role: {
        zh: "卡片与信息块。只比舞台亮一点，用来在不破坏纯黑的前提下分区。",
        en: "Cards and info blocks — barely above the stage, dividing space without breaking the black.",
      },
      token: "--color-card-graphite",
    },
  ],
  fonts: [
    {
      family: "SF Pro Display",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 17, 21, 28, 40, 56, 80],
      lineHeight: { display: 1.02, heading: 1.1, body: 1.5 },
      tracking: { display: "-0.035em", label: "0.2em" },
      role: {
        zh: "全站唯一字体。大标题 56 到 80px 配 -0.035em 的紧字距，小标签 12px 全大写 0.2em 宽字距——两种极端并置是这套风格的声音。",
        en: "The only face. Headlines run 56 to 80px at -0.035em, while small labels sit at 12px uppercase on 0.2em — holding those two extremes together is the style's voice.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 80, lineHeight: 1.02, tracking: "-0.035em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 56, lineHeight: 1.05, tracking: "-0.03em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 40, lineHeight: 1.1, tracking: "-0.025em", token: "--text-heading" },
    { role: "subheading", weight: 500, size: 28, lineHeight: 1.2, tracking: "-0.02em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 21, lineHeight: 1.45, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 17, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160, 240],
    maxWidth: 1120,
    sectionGap: 240,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
    { element: "media", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Stage Black", value: "#000000", purpose: "页面舞台" },
    { level: 1, name: "Card Graphite", value: "#1d1d1f", purpose: "卡片与信息块" },
    { level: 2, name: "Glass Nav", value: "rgba(0,0,0,0.70)", purpose: "顶部导航（带模糊）" },
  ],
  elevation: [
    { name: "None", value: "none — the stage has no depth cues" },
    { name: "Card", value: "0 24px 60px rgba(0,0,0,0.60)" },
  ],
  components: [
    {
      name: "Buy Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "电蓝填充、白字、999px 全圆角、无描边，17px/500、紧字距、padding 12px 24px。hover 时填充转 #0071e3；按下缩到 0.98。过渡 300ms。全页只有一个这样的按钮。",
        en: "Electric blue fill, white text, fully rounded, no border, 17px/500 on tight tracking, 12px 24px padding. Hover moves the fill to #0071e3; press scales 0.98. 300ms. Only one such button exists on the page.",
      },
      sizes: "padding 12px 24px; label 17px",
      states: "hover: #0071e3; active: scale 0.98",
    },
    {
      name: "Spec Card",
      role: { zh: "规格与特性卡", en: "Spec and feature cards" },
      construction: {
        zh: "卡面深灰填充、24px 圆角、无描边、内边距 32px。上方 12px 全大写 0.2em 的电蓝标签，中间 28px/600 白标题，下方 17px 中灰说明。卡片本身不加边框与阴影——纯黑舞台上加边框会毁掉无限深。",
        en: "Graphite fill, 24px radius, no border, 32px padding. A 12px uppercase 0.2em label in electric blue sits above a 28px/600 white title, with 17px mid-grey copy below. The card takes no border and no shadow — a border on a black stage destroys the infinite depth.",
      },
    },
    {
      name: "Scrub Stage",
      role: { zh: "滚动擦洗帧序列（签名组件）", en: "The scroll-scrubbed frame sequence — the signature" },
      construction: {
        zh: "外层高度为视口的 3 到 4 倍，内层 sticky top-0、高 100vh，内含一个 canvas。帧以 WebP 存放，用 IntersectionObserver 在区块接近视口时才加载（绝不首次渲染就预载全部 96 帧），画布尺寸按 devicePixelRatio 封顶 2 倍。滚动进度用 requestAnimationFrame 读取 window.scrollY 一次并缓存，绝不在处理器里读 getBoundingClientRect 或 offsetTop。prefers-reduced-motion 时只画关键帧。所有关键文字必须叠在 canvas 之外的 DOM 里。",
        en: "The outer section runs three to four viewports tall with a sticky 100vh inner layer holding a canvas. Frames ship as WebP and load through IntersectionObserver only when the section nears the viewport — never all 96 on first render — with the canvas backing store capped at 2x devicePixelRatio. Scroll progress is read once per frame from window.scrollY inside requestAnimationFrame and cached; the handler never touches getBoundingClientRect or offsetTop. Under reduced motion only the key frames draw. All essential copy lives in DOM above the canvas, never inside the frames.",
      },
      sizes: "outer 3–4 × 100vh; sticky 100vh",
    },
    {
      name: "Glass Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "固定顶部、高 48px、黑 70% 底加 24px 模糊、底部 1px 白 10% 描边。左侧 17px/600 近白字标，右侧链接 14px 近白 80%，购买链接用电蓝。hover 时链接转纯白。",
        en: "Fixed at 48px tall on a 70% black ground with a 24px blur and a 1px white border at 10% along the bottom. A 17px/600 wordmark sits left in near white with 14px links at 80% on the right; the buy link uses electric blue. Hover takes links to pure white.",
      },
    },
    {
      name: "Dark Field",
      role: { zh: "邮箱与表单输入", en: "Email and form inputs" },
      construction: {
        zh: "卡面深灰填充、1px 白 10% 描边、12px 圆角、padding 12px 20px、17px 字。占位符中灰。聚焦时描边转电蓝，不加外环、不加光晕。",
        en: "Graphite fill, a 1px white border at 10%, 12px radius, 12px 20px padding at 17px. The placeholder is mid grey. Focus turns the border electric blue with no ring and no glow.",
      },
    },
  ],
  imagery: {
    zh: "产品渲染图是唯一图像，且必须自带光源、边缘融入纯黑。允许产品特写、内部结构剖视与帧序列动画。不使用人物摄影、多彩渐变与背景纹理。",
    en: "Product renders are the only imagery, and they must light themselves with edges that dissolve into black. Close-ups, cutaway internals and frame sequences are welcome. No people photography, colorful gradients or background texture.",
  },
  layout: {
    zh: "上限 1120px，一屏一个产品一句主张。区块间距 240px，几乎全部居中。文字块宽度不超过 20 个汉字或 40 个字符，因为短句才配得上这么大的留白。帧序列区块占 3 到 4 屏滚动高度。",
    en: "Capped at 1120px with one product and one claim per viewport. Sections sit 240px apart, almost everything centred. Copy blocks never run past twenty characters per line, because only short lines earn that much space. The frame sequence occupies three to four screens of scroll.",
  },
  dos: [
    { zh: "纯黑舞台，无边框无纹理", en: "A pure black stage, no borders or texture" },
    { zh: "只用一支电蓝强调色", en: "Exactly one accent: electric blue" },
    { zh: "帧用 IntersectionObserver 懒加载", en: "Lazy-load frames with IntersectionObserver" },
    { zh: "滚动进度在 rAF 里读一次并缓存", en: "Read scroll progress once in rAF and cache it" },
    { zh: "关键文字放在 DOM，不放帧图", en: "Keep essential copy in DOM, not in frames" },
    { zh: "尊重 reduced-motion，给 DPR 封顶", en: "Honour reduced motion and cap the DPR" },
  ],
  donts: [
    { zh: "不要用多彩渐变或第二个强调色", en: "No rainbow gradients or a second accent" },
    { zh: "不要在滚动处理器里读布局属性", en: "Never read layout properties in the scroll handler" },
    { zh: "不要在首屏预载全部帧", en: "Do not preload every frame on mount" },
    { zh: "不要把关键信息烘焙进帧图", en: "Never bake key information into frames" },
    { zh: "不要堆砌边框与圆角装饰", en: "No piled-up borders or radius ornament" },
    { zh: "不要忽略 reduced-motion 与 DPR 封顶", en: "Do not skip reduced motion or the DPR cap" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f5f5f7",
      background: "#000000",
      card: "#1d1d1f",
      accent: "#2997ff",
      muted: "#86868b",
      border: "rgba(255,255,255,0.10)",
    },
    prompts: [
      {
        zh: "做一个发布会风格的产品区块：纯黑 #000000 舞台、居中 56px/700 标题（字距 -0.03em、色 #f5f5f7）、下方 17px #86868b 一行说明、一个 999px 全圆角电蓝按钮（#2997ff 填充、白字、padding 12px 24px）。区块上下留 240px 空白。若需要滚动动画，用 sticky 100vh 的 canvas 播放帧序列：帧以 WebP 存放、用 IntersectionObserver 懒加载、DPR 封顶 2 倍、滚动进度在 requestAnimationFrame 内读一次 window.scrollY。",
        en: "Build a keynote-style product section: a pure black #000000 stage with a centred 56px/700 headline (tracking -0.03em in #f5f5f7), one line of 17px #86868b copy below, and a fully rounded electric-blue button (#2997ff fill, white text, 12px 24px padding). Reserve 240px above and below. If a scroll animation is needed, run a frame sequence on a sticky 100vh canvas: frames as WebP, lazy-loaded through IntersectionObserver, DPR capped at 2x, with scroll progress read once from window.scrollY inside requestAnimationFrame.",
      },
    ],
  },
  similar: [
    { name: "Apple Style", why: { zh: "同源美学，但发布会主题更极端：纯黑、单一主张、帧序列", en: "Same root aesthetic, though keynote is more extreme: black, one claim, frame sequences" } },
    { name: "Immersive Photo", why: { zh: "同样以一图一屏为主，但那边是摄影，这里是产品渲染与帧动画", en: "Also one image per screen, though that one is photography while this is product renders and frame animation" } },
  ],
  completeness: "full",
};
