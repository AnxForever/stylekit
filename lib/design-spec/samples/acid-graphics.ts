import type { DesignSpec } from "../types";

export const acidGraphicsSpec: DesignSpec = {
  slug: "acid-graphics",
  name: "酸性平面设计",
  nameEn: "Acid Graphics",
  cover: "/styles/acid-graphics.svg",
  theme: "dark",
  northStar: {
    zh: "荧光绿压在纯黑上，字被拉扯变形，一切都在高频振动。",
    en: "Fluorescent green on pure black, letterforms pulled out of shape, everything vibrating at high frequency.",
  },
  summary: {
    zh: "酸性平面设计来自锐舞文化与地下俱乐部视觉：纯黑底（#0a0a0a）上铺荧光绿（#39ff14）、荧光黄（#e6ff00）、紫（#a020f0）与粉（#ff6ec7），颜色必须是纯平面的荧光色而不是渐变，字体用等宽并做 skew 与 rotate 的扭曲，阴影是硬边偏移。它的动效语言反抛光——禁止 ease-in-out 与缓慢微交互，一切反馈都在 100ms 内完成，像设备在跳帧。禁令还有：不许柔和粉彩与低饱和、不许圆角、不许衬线、不许白色或浅色背景。",
    en: "Acid Graphics comes from rave culture and underground club visuals: fluorescent green (#39ff14), yellow (#e6ff00), violet (#a020f0) and pink (#ff6ec7) on pure black (#0a0a0a), in flat fluorescent fills rather than gradients, with monospace type skewed and rotated out of shape and hard offset shadows. Its motion is anti-polish — ease-in-out and slow micro-interactions are banned, and every response completes within 100ms like a device skipping frames. Soft pastels and desaturated color, radius, serif and light grounds are excluded too.",
  },
  colors: [
    {
      name: "荧光绿",
      nameEn: "Acid Green",
      value: "#39ff14",
      group: "brand",
      role: {
        zh: "第一主色。在纯黑上几乎在振动，是整套风格的标志。",
        en: "The first primary — it nearly vibrates on black, and it is the style's signature.",
      },
      token: "--color-acid-green",
    },
    {
      name: "纯黑",
      nameEn: "Pure Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "页面底。必须近乎纯黑，让荧光色刺眼。",
        en: "The page ground — near pure so the fluorescents sting.",
      },
      token: "--color-pure-black",
    },
    {
      name: "荧光黄",
      nameEn: "Acid Yellow",
      value: "#e6ff00",
      group: "accent",
      role: {
        zh: "第二荧光色，与绿形成最近的频率冲突。",
        en: "The second fluorescent, clashing at the closest frequency to the green.",
      },
      token: "--color-acid-yellow",
    },
    {
      name: "电紫",
      nameEn: "Electric Violet",
      value: "#a020f0",
      group: "accent",
      role: {
        zh: "第三荧光色，用于拉开冷暖。",
        en: "The third fluorescent, opening a cool-warm gap.",
      },
      token: "--color-electric-violet",
    },
    {
      name: "hot 粉",
      nameEn: "Hot Pink",
      value: "#ff6ec7",
      group: "accent",
      role: {
        zh: "第四荧光色，用于情绪化强调与故障感。",
        en: "The fourth fluorescent, on emotional emphasis and glitch accents.",
      },
      token: "--color-hot-pink",
    },
    {
      name: "电青",
      nameEn: "Electric Cyan",
      value: "#00ffff",
      group: "accent",
      role: {
        zh: "第五荧光色，出现频率最低，用于数据与刻度。",
        en: "The fifth fluorescent, used least, on data and ticks.",
      },
      token: "--color-electric-cyan",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [12, 14, 18, 26, 40, 64],
      lineHeight: { display: 0.95, heading: 1.05, body: 1.45 },
      tracking: { display: "-0.02em", label: "0.08em" },
      role: {
        zh: "全站等宽，标题用 700 并压到行高 0.95，允许 skew 与 rotate 变形。",
        en: "Monospace throughout, headings at 700 on 0.95 leading and free to skew and rotate.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 64, lineHeight: 0.95, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 40, lineHeight: 1, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 26, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.45, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.45, token: "--text-body" },
    { role: "label", weight: 400, size: 12, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1360,
    sectionGap: 48,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Pure Black", value: "#0a0a0a", purpose: "页面底" },
    { level: 1, name: "Panel", value: "#141414", purpose: "卡片与面板" },
  ],
  elevation: [
    { name: "Acid offset", value: "6px 6px 0 #39ff14" },
    { name: "Violet offset", value: "6px 6px 0 #a020f0" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Skewed Headline",
      role: { zh: "扭曲标题（核心组件）", en: "The skewing headline — the core component" },
      construction: {
        zh: "等宽 700、行高 0.95、字距 -0.02em，整块 skewX(-8deg) 并 rotate(-2deg)，颜色用荧光绿或黄。允许与色块重叠、允许超出容器边缘。hover 时 skew 量硬切到 -14 度（抖一下），transition-none 或 80ms linear。",
        en: "Monospace 700 on 0.95 leading and -0.02em, the whole block at skewX(-8deg) with rotate(-2deg), in acid green or yellow. It may overlap blocks and bleed past the container. Hover cuts the skew to -14 degrees for a jolt, either transition-none or 80ms linear.",
      },
      states: "hover: skew to -14deg, instant",
    },
    {
      name: "Acid Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "荧光绿填充、黑字、零圆角、2px 黑描边、14px/700、字距 0.08em、padding 10px 24px，硬阴影 6px 6px 0 电紫。hover 时填充硬切到荧光黄、阴影换到电紫→黑；按下时位移 6px 6px 且阴影归零。transition-none 或 80ms linear。",
        en: "Acid green fill, black text, zero radius, a 2px black border, 14px/700 at 0.08em, 10px 24px padding, hard shadow 6px 6px 0 in violet. Hover cuts the fill to acid yellow and swaps the shadow; press translates 6px 6px and zeroes it. transition-none or 80ms linear.",
      },
      sizes: "padding 10px 24px; label 14px",
      states: "hover: hard color cut; active: translate 6px",
    },
    {
      name: "Liquid Form",
      role: { zh: "液态流动形状", en: "The liquid form" },
      construction: {
        zh: "用 SVG 的 feTurbulence 加 feDisplacementMap（baseFrequency 0.015、scale 30）让一个纯色块或粗描边图形的边缘流动。填充用一支荧光色，每秒或每帧位移噪声种子形成蠕动。只作用于装饰块，绝不作用于文字。",
        en: "feTurbulence with feDisplacementMap (baseFrequency 0.015, scale 30) makes the edge of a solid block or heavy-stroke shape flow. Filled with one fluorescent, the noise seed shifts each second or frame to crawl. It touches decorative blocks only, never text.",
      },
    },
    {
      name: "Acid Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "纯黑 90% 填充、零圆角、2px 荧光绿描边、内边距 20px，硬阴影 6px 6px 0 电紫。标题 26px/700 荧光绿，正文 14px 白 80%。hover 时描边硬切到荧光黄、阴影转绿，transition-none。",
        en: "90% black fill, zero radius, a 2px acid green border, 20px padding, hard shadow 6px 6px 0 in violet. The title runs 26px/700 in acid green with body at 14px in 80% white. Hover cuts the border to acid yellow and the shadow to green, transition-none.",
      },
      states: "hover: hard color swap",
    },
    {
      name: "Tick Rail",
      role: { zh: "刻度与数据条", en: "The tick rail" },
      construction: {
        zh: "高 32px 的一段，用 repeating-linear-gradient 每 8px 画一条 2px 的荧光青或荧光绿竖线，模拟音频电平表。数值用等宽荧光色叠加在右侧。用于装饰与数据可视化，单屏不超过三处。",
        en: "A 32px strip where a repeating gradient draws a 2px cyan or green tick every 8px like an audio meter, with monospace figures in a fluorescent overlaid at the right. It serves decoration and data display, three per screen at most.",
      },
    },
  ],
  imagery: {
    zh: "锐舞传单式图像：扭曲的金属质感图形、液态色块、故障条纹、ASCII 与栅格化照片。允许把照片压成 8 色荧光调色板。不使用精致摄影、柔和插画与低饱和图像。",
    en: "Rave flyer imagery: distorted chrome forms, liquid blocks, glitch stripes, ASCII and rasterized photos. A photo may be crushed into an eight-color fluorescent palette. No polished photography, soft illustration or desaturated imagery.",
  },
  layout: {
    zh: "上限 1360px、容器内边距 16px，区块间距 48px。允许元素大量重叠、倾斜 -8 到 8 度、溢出容器。混乱必须有节奏：每屏至少一个元素与其他元素角度不同。",
    en: "Capped at 1360px with 16px padding, sections 48px apart. Elements overlap freely, tilt between -8 and 8 degrees and bleed past containers. The chaos needs rhythm: every screen has at least one element at an angle the others do not share.",
  },
  dos: [
    { zh: "纯黑底配荧光色", en: "Pure black ground with fluorescents" },
    { zh: "颜色必须是平面荧光，不用渐变", en: "Colors stay flat fluorescent, never gradient" },
    { zh: "用 skew 与 rotate 扭曲字", en: "Skew and rotate the type" },
    { zh: "硬边偏移阴影", en: "Hard offset shadows" },
    { zh: "反馈在 100ms 内完成", en: "Responses complete within 100ms" },
    { zh: "等宽字体", en: "Monospace type" },
  ],
  donts: [
    { zh: "不要用柔和粉彩与低饱和色", en: "No soft pastels or desaturated color" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要用白色或浅色背景", en: "No white or light grounds" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要用 ease-in-out 与缓慢微交互", en: "No ease-in-out or slow micro-interactions" },
  ],
  promptGuide: {
    quickColors: {
      text: "#39ff14",
      background: "#0a0a0a",
      yellow: "#e6ff00",
      violet: "#a020f0",
      pink: "#ff6ec7",
      cyan: "#00ffff",
    },
    prompts: [
      {
        zh: "做一个酸性平面设计按钮：荧光绿 #39ff14 填充、黑字、零圆角、2px solid #0a0a0a 边框、14px/700 字距 0.08em、padding 10px 24px、box-shadow 6px 6px 0 #a020f0。hover 时背景硬切到 #e6ff00、阴影换色，transition: none；active 时 translate(6px,6px) 且阴影 none。标题用等宽 700、行高 0.95、skewX(-8deg) rotate(-2deg)、色 #39ff14。页面底色 #0a0a0a，全站零圆角、无渐变、无柔和过渡。",
        en: "Build an acid graphics button: #39ff14 fill, black text, zero radius, a 2px solid #0a0a0a border, 14px/700 at 0.08em, 10px 24px padding, box-shadow 6px 6px 0 #a020f0. Hover cuts the background to #e6ff00 and swaps the shadow with transition none; active applies translate(6px,6px) with no shadow. The headline runs monospace 700 at 0.95 leading with skewX(-8deg) rotate(-2deg) in #39ff14. The page ground is #0a0a0a, with zero radius, no gradients and no soft transitions anywhere.",
      },
    ],
  },
  similar: [
    { name: "Glitch Art", why: { zh: "同为高频故障感，但故障艺术用 RGB 分离，酸性设计用荧光色与扭曲", en: "Both high-frequency and broken, though glitch art uses RGB split while acid uses fluorescents and distortion" } },
    { name: "Vaporwave", why: { zh: "同样来自俱乐部文化，但蒸汽波怀旧缓慢，酸性设计当下且急促", en: "Both club-derived, though vaporwave is nostalgic and slow while acid is immediate and fast" } },
  ],
  completeness: "full",
};
