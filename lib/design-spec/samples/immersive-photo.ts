import type { DesignSpec } from "../types";

export const immersivePhotoSpec: DesignSpec = {
  slug: "immersive-photo",
  name: "沉浸摄影",
  nameEn: "Immersive Photo",
  cover: "/styles/immersive-photo.svg",
  theme: "dark",
  northStar: {
    zh: "照片就是界面：它不装饰内容，它就是内容本身。",
    en: "The photograph is the interface: it does not decorate the content, it is the content.",
  },
  summary: {
    zh: "沉浸摄影把所有界面元素减到最少，让全幅照片占据视口，文字浮在可读性遮罩之上。它的技术纪律比视觉更重要——每张图必须有 aspect-ratio（防 CLS）、用 AVIF 或 WebP 配 srcset、首屏给 LQIP 占位再淡入、缓慢的 Ken Burns 漂移只用 transform（8 秒起，且尊重 prefers-reduced-motion）。强调色只有一支，而且必须从照片的暖光里采样（例如琥珀金），不允许硬塞品牌色去和照片打架。",
    en: "Immersive Photo strips the interface down so a full-bleed image fills the viewport and text floats on a readability scrim. Its technical discipline matters more than its look: every image carries an aspect ratio to prevent CLS, ships as AVIF or WebP with srcset, arrives behind an LQIP placeholder that fades in, and drifts with a slow Ken Burns that animates transform only (eight seconds minimum, honouring prefers-reduced-motion). There is exactly one accent, and it must be sampled from the photo's own warm light — an amber, say — never a brand color forced to fight the image.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#0c0d10",
      group: "surface",
      role: {
        zh: "遮罩、页脚与照片之间的空隙。近黑但不纯黑，避免与照片的暗部糊在一起。",
        en: "Scrims, footer and the gaps between photos — near black, so it never merges with a photo's shadows.",
      },
      token: "--color-ink",
    },
    {
      name: "纸",
      nameEn: "Paper",
      value: "#f4f1ea",
      group: "surface",
      role: {
        zh: "浅色区块与图注。暖白，用于在照片之外提供呼吸。",
        en: "Light sections and captions — a warm white that gives the eye a rest between photographs.",
      },
      token: "--color-paper",
    },
    {
      name: "琥珀金",
      nameEn: "Amber",
      value: "#e8b04b",
      group: "accent",
      role: {
        zh: "唯一强调色，从照片的暖光采样。只用于关键 CTA 与小标签。",
        en: "The single accent, sampled from the photo's warm light — only on key CTAs and small labels.",
      },
      token: "--color-amber",
    },
    {
      name: "深灰",
      nameEn: "Deep Grey",
      value: "#1a1c22",
      group: "surface",
      role: {
        zh: "次级区块底与卡片，比墨亮一档，用于分层。",
        en: "Secondary sections and cards, one step above ink for layering.",
      },
      token: "--color-deep-grey",
    },
    {
      name: "雾",
      nameEn: "Mist",
      value: "#b8bcc4",
      group: "neutral",
      role: {
        zh: "图注、元数据与次级文字。永远不与琥珀金同屏竞争。",
        en: "Captions, metadata and secondary text — never competing with amber on the same screen.",
      },
      token: "--color-mist",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [11, 12, 14, 18, 28, 44, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.16em" },
      role: {
        zh: "全站唯一字体。照片上的标题用 44 到 64px、500 字重，图注用 11px 全大写加 0.16em 字距。",
        en: "The only face: 44 to 64px at weight 500 for headlines over a photo, 11px uppercase at 0.16em for captions.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 500, size: 64, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", weight: 500, size: 44, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.2, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 11, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1440,
    sectionGap: 128,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "999px" },
    { element: "media", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Photo", value: "full-bleed image", purpose: "首屏与画廊" },
    { level: 1, name: "Ink", value: "#0c0d10", purpose: "遮罩与页脚" },
    { level: 2, name: "Deep Grey", value: "#1a1c22", purpose: "次级区块" },
  ],
  elevation: [
    { name: "Photo card", value: "0 24px 60px rgba(0,0,0,0.35)" },
    { name: "Photo hover", value: "0 32px 80px rgba(0,0,0,0.45)" },
    { name: "CTA", value: "0 8px 24px rgba(232,176,75,0.30)" },
  ],
  components: [
    {
      name: "Photo Stage",
      role: { zh: "首屏与全幅图片区块", en: "The hero and full-bleed image sections" },
      construction: {
        zh: "100vh 高、object-fit: cover、带 aspect-ratio（首屏 16:9，卡片 4:5），底部到顶部叠一层从黑 70% 到透明的渐变遮罩。图片带 20s 的 Ken Burns 漂移（scale 1.00 到 1.06，只用 transform，ease-out），prefers-reduced-motion 时静止。加载前显示 LQIP 模糊占位并在 400ms 内淡入。",
        en: "100vh tall with object-fit cover and an enforced aspect ratio (16:9 for the hero, 4:5 for cards), under a gradient scrim running from 70% black at the bottom to transparent at the top. The image drifts with a 20s Ken Burns (scale 1.00 to 1.06, transform only, ease-out) and holds still under reduced motion. An LQIP placeholder shows first and fades out over 400ms.",
      },
      sizes: "16:9 hero, 4:5 card",
    },
    {
      name: "Caption Block",
      role: { zh: "图片说明与元数据", en: "Image captions and metadata" },
      construction: {
        zh: "贴在图片底部或左下方，距边 24px。上方 11px 全大写 0.16em 的琥珀金系列标签，中间 18 到 28px 白色标题，下方 12px 雾色元数据（地点、时间、器材）。文字必须落在遮罩较暗的一侧，保证至少 4.5:1 的对比。",
        en: "Anchored 24px from the bottom or left edge of the image. An 11px uppercase 0.16em label in amber sits above an 18 to 28px white title, with 12px mist metadata below (place, time, gear). The text always lands on the darker side of the scrim for at least 4.5:1 contrast.",
      },
    },
    {
      name: "Amber CTA",
      role: { zh: "关键行动按钮", en: "Key call to action" },
      construction: {
        zh: "琥珀金填充、墨色文字、999px 全圆角、无描边，14px/600、padding 12px 28px，阴影 0 8px 24px 琥珀 30%。hover 时填充提亮 8%、阴影扩到 32px；按下缩放 0.98。全页只允许一个。",
        en: "Amber fill, ink text, fully rounded, no border, 14px/600, 12px 28px padding, shadow 0 8px 24px at 30% amber. Hover brightens the fill eight percent and widens the shadow to 32px; press scales 0.98. One per page.",
      },
    },
    {
      name: "Photo Grid",
      role: { zh: "画廊与作品列表", en: "Gallery and work listings" },
      construction: {
        zh: "两到三列、间距 16px、每张卡片固定 4:5 比例、16px 圆角、overflow hidden。图片 hover 时 scale 到 1.05、过渡 1200ms ease-out，卡片阴影同时加深。卡片内不加边框，靠照片本身分隔。",
        en: "Two or three columns with 16px gaps, every card locked to a 4:5 ratio on a 16px radius with overflow hidden. Hover scales the image to 1.05 over 1200ms ease-out while the card shadow deepens. No borders inside a card — the photographs do the dividing.",
      },
      states: "hover: image scale 1.05, shadow deepens",
    },
    {
      name: "Minimal Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "绝对定位在首屏之上，高 72px、透明底、无边框。字标与链接为白色，11px 全大写 0.16em；hover 时链接转琥珀金。滚动后切换为墨色 90% 底加 12px 模糊。",
        en: "Absolutely positioned over the hero at 72px tall, transparent with no border. Wordmark and links are white at 11px uppercase 0.16em; hover shifts links to amber. Past the first viewport it becomes 90% ink with a 12px blur.",
      },
    },
  ],
  imagery: {
    zh: "全部是全幅摄影，且照片必须具备明确的光线方向与可安放文字的暗部。允许同一位摄影师的一组作品形成系列感。不使用插画、图标墙、渐变背景与非摄影图像。",
    en: "Everything is full-bleed photography, and each frame needs a clear light direction plus a dark region where text can land. A single photographer's series gives the page its coherence. No illustration, icon walls, gradient backgrounds or non-photographic imagery.",
  },
  layout: {
    zh: "上限 1440px，首屏 100vh 全幅，画廊三列、间距 16px。区块之间的过渡用全幅照片而不是留白，或在照片之间插一段墨色 128px 的空白作为呼吸。文字块宽度不超过 40em。",
    en: "Capped at 1440px with a 100vh hero and a three-column gallery at 16px gaps. Sections hand over through full-bleed photographs rather than whitespace, or pause on a 128px ink band between them. Text blocks stay under 40em.",
  },
  dos: [
    { zh: "每张图必须有 aspect-ratio", en: "Every image carries an aspect ratio" },
    { zh: "用 AVIF 或 WebP 配 srcset", en: "Ship AVIF or WebP with srcset" },
    { zh: "首屏给 LQIP 占位再淡入", en: "Show an LQIP placeholder, then fade in" },
    { zh: "Ken Burns 只用 transform，8 秒起", en: "Ken Burns animates transform only, eight seconds minimum" },
    { zh: "文字必须落在遮罩暗侧", en: "Text always lands on the dark side of the scrim" },
    { zh: "尊重 prefers-reduced-motion", en: "Honour prefers-reduced-motion" },
  ],
  donts: [
    { zh: "不要把照片当背景再铺卡片挡住它", en: "Never bury the photo under a wall of cards" },
    { zh: "不要让文字直接压在图上不加遮罩", en: "Never put text on a photo without a scrim" },
    { zh: "不要用未优化的全尺寸 JPG", en: "No unoptimised full-size JPEGs" },
    { zh: "不要用无 aspect-ratio 的图片", en: "No image without an aspect ratio" },
    { zh: "不要引入第二个强调色", en: "Do not add a second accent" },
    { zh: "不要用快于 8 秒的漂移", en: "No drift faster than eight seconds" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f4f1ea",
      scrim: "rgba(0,0,0,0.70)",
      background: "#0c0d10",
      accent: "#e8b04b",
      muted: "#b8bcc4",
      card: "#1a1c22",
    },
    prompts: [
      {
        zh: "做一个沉浸摄影卡片：容器 aspect-ratio 4/5、overflow hidden、16px 圆角。图片 object-fit: cover、占满容器、hover 时 scale(1.05)、过渡 1200ms ease-out。底部叠 linear-gradient(to top, rgba(0,0,0,0.7), transparent) 遮罩。左下角放 11px 全大写 0.16em 的 #e8b04b 标签、18px 白色标题与 12px #b8bcc4 元数据。页面底色 #0c0d10。",
        en: "Build an immersive photo card: a container at a 4:5 aspect ratio with overflow hidden and a 16px radius. The image uses object-fit cover at full size and scales to 1.05 on hover over 1200ms ease-out. A linear-gradient(to top, rgba(0,0,0,0.7), transparent) scrim covers the bottom. Bottom-left carries an 11px uppercase 0.16em label in #e8b04b, an 18px white title and 12px metadata in #b8bcc4. The page ground is #0c0d10.",
      },
    ],
  },
  similar: [
    { name: "Fullscreen Hero", why: { zh: "同样以全幅图开场，但沉浸摄影把整页都交给照片", en: "Also opens on a full-bleed image, though immersive photo hands the whole page to photography" } },
    { name: "Parallax Sections", why: { zh: "同为摄影叙事，但那边靠滚动视差，这里靠镜头漂移", en: "Also photographic storytelling, though that one moves with scroll while this drifts the frame" } },
  ],
  completeness: "full",
};
