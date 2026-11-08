import type { DesignSpec } from "../types";

export const glitchArtSpec: DesignSpec = {
  slug: "glitch-art",
  name: "故障艺术风",
  nameEn: "Glitch Art",
  cover: "/styles/glitch-art.svg",
  theme: "dark",
  northStar: {
    zh: "画面在出错：RGB 分离、屏幕撕裂、丢帧，全都刻意保留。",
    en: "The image is failing on purpose: RGB split, screen tearing, dropped frames — all kept.",
  },
  summary: {
    zh: "故障艺术风把数字错误当成美学：等宽字体全大写加宽字距，文字用 3px 的洋红与青双向 text-shadow 做 RGB 色彩分离，所有状态切换用 transition-none（帧丢失的断裂感），按钮按下时用 skew-x 加 scale-y 制造屏幕撕裂，卡片靠 4 到 8px 的粗左边框标记、hover 时换色。它的禁令同样绝对：不许圆角、不许平滑过渡动画、不许毛玻璃与柔和渐变、不许 CMY 三色以外的装饰色、不许衬线或常规无衬线——只有等宽，阴影只能是纯色块。",
    en: "Glitch Art treats digital failure as aesthetics: monospace uppercase on wide tracking, text split into magenta and cyan with a 3px two-way text-shadow, transition-none on every state change for that dropped-frame snap, buttons skewing and squashing into screen tear on press, and cards marked by a 4 to 8px heavy left border that swaps color on hover. Its refusals are just as absolute: no radius, no smooth transitions, no frosted glass or soft gradients, no decoration outside CMY, and no serif or conventional sans — monospace only, with shadows that are solid blocks.",
  },
  colors: [
    {
      name: "故障黑",
      nameEn: "Glitch Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "页面底。纯到让青与洋红的分离显出重影。",
        en: "The page ground — flat enough that the cyan and magenta split registers as ghosting.",
      },
      token: "--color-glitch-black",
    },
    {
      name: "霓虹青",
      nameEn: "Cyan",
      value: "#00ffff",
      group: "brand",
      role: {
        zh: "RGB 分离的左侧通道，也是主文字色。",
        en: "The left channel of the RGB split and the primary text color.",
      },
      token: "--color-cyan",
    },
    {
      name: "洋红",
      nameEn: "Magenta",
      value: "#ff00ff",
      group: "accent",
      role: {
        zh: "RGB 分离的右侧通道与警告色。",
        en: "The right channel of the split and the warning color.",
      },
      token: "--color-magenta",
    },
    {
      name: "纯黄",
      nameEn: "Yellow",
      value: "#ffff00",
      group: "accent",
      role: {
        zh: "CMY 的第三支，用于高亮与丢帧标记。",
        en: "The third of CMY, on highlights and dropped-frame marks.",
      },
      token: "--color-yellow",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "只用于文字与实心色块，绝不作底色。",
        en: "Type and solid blocks only — never a ground.",
      },
      token: "--color-white",
    },
    {
      name: "警报红",
      nameEn: "Alarm Red",
      value: "#ff0506",
      group: "accent",
      role: {
        zh: "错误与崩溃状态，出现频率最低。",
        en: "Errors and crashes, used least.",
      },
      token: "--color-alarm-red",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 900],
      sizes: [12, 14, 18, 26, 40, 64],
      lineHeight: { display: 1, heading: 1.1, body: 1.5 },
      tracking: { display: "0.06em", label: "0.16em" },
      role: {
        zh: "全站唯一等宽字体。标题 900 字重加全大写加 0.06em 字距，正文 400。",
        en: "The only face, monospace. Headlines at 900 uppercase on 0.06em tracking; body at 400.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 64, lineHeight: 1, tracking: "0.06em", token: "--text-display" },
    { role: "heading", weight: 900, size: 40, lineHeight: 1.05, tracking: "0.06em", token: "--text-heading" },
    { role: "subheading", weight: 900, size: 26, lineHeight: 1.15, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 400, size: 12, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1280,
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
    { level: 0, name: "Glitch Black", value: "#0a0a0a", purpose: "页面底" },
    { level: 1, name: "Panel", value: "#111111", purpose: "卡片与面板" },
  ],
  elevation: [
    { name: "Solid block", value: "4px 4px 0 #00ffff" },
    { name: "Solid block alt", value: "4px 4px 0 #ff00ff" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "RGB Split Text",
      role: { zh: "RGB 分离文字（核心组件）", en: "RGB-split text — the core component" },
      construction: {
        zh: "等宽 900 字重全大写，正常文字为白或青，叠两层伪元素副本：一层偏移 -3px 用洋红、一层偏移 +3px 用青，不透明度 80%。静置时分离量 3px；hover 时分离量硬切到 6px 并加 1px 的垂直抖动（steps(1) 两帧）。绝不用模糊或平滑过渡。",
        en: "Monospace at 900 uppercase with white or cyan text, overlaid by two pseudo copies — one offset -3px in magenta, one +3px in cyan, both at 80% opacity. The split sits at 3px at rest; hover cuts it to 6px with a 1px vertical jitter on steps(1). No blur, no smooth transition.",
      },
      states: "hover: split 6px, jitter",
    },
    {
      name: "Tear Button",
      role: { zh: "撕裂按钮", en: "The tearing button" },
      construction: {
        zh: "青或洋红填充、黑字、零圆角、2px 同色描边、14px/900 全大写 0.16em、padding 10px 24px，硬阴影 4px 4px 0 对色（青配洋红、洋红配青）。hover 时填充硬切到另一色（transition-none）；按下时 skewX(-6deg) 加 scaleY(0.9) 制造屏幕撕裂并位移 2px 2px。所有状态切换 transition-none。",
        en: "Cyan or magenta fill, black text, zero radius, a 2px border in the same hue, 14px/900 uppercase at 0.16em, 10px 24px padding, hard shadow 4px 4px 0 in the opposing color. Hover cuts the fill to the opposite hue with transition-none; press applies skewX(-6deg) with scaleY(0.9) for the tear and translates 2px 2px. Every state change is transition-none.",
      },
      sizes: "padding 10px 24px; label 14px",
      states: "hover: hard color swap; active: skew and squash",
    },
    {
      name: "Marked Card",
      role: { zh: "粗左边框卡片", en: "The left-border card" },
      construction: {
        zh: "深灰 #111 填充、零圆角、4 到 8px 的左边框（青或洋红）、内边距 20px，无阴影。hover 时左边框换色从青到洋红（硬切），标题文字同步换色。边框宽度不变——变化只在颜色。",
        en: "A #111 fill with zero radius and a 4 to 8px left border in cyan or magenta, 20px padding, no shadow. Hover cuts the border from cyan to magenta and the title with it. The width never changes — only the color.",
      },
      states: "hover: border color cut",
    },
    {
      name: "Scanline Bed",
      role: { zh: "扫描线与噪点底", en: "The scanline and noise bed" },
      construction: {
        zh: "全页固定覆盖两层：一层 repeating-linear-gradient 画 3px 间隔的白色 4% 横线，另一层用 base64 噪点图或不规则 clip-path 色块做 2% 的错位噪点。pointer-events: none。可选每 4 秒做一次 60ms 的整体位移抖动（丢帧）。",
        en: "Two fixed full-page layers: a repeating gradient drawing 3px-spaced white lines at 4%, and a 2% band of misaligned noise from a base64 grain or irregular clip-path blocks, both with pointer-events none. Optionally the whole page jitters 60ms every four seconds, like a dropped frame.",
      },
    },
    {
      name: "Error Readout",
      role: { zh: "错误读数与状态码", en: "Error readouts and status codes" },
      construction: {
        zh: "12px 等宽全大写 0.16em，青色或警报红。格式固定为「ERR // 0x0A4F // FRAME DROP」。放在区块角落，作为环境信息而非真实提示。真正的错误提示必须同时给出可读的自然语言。",
        en: "12px monospace uppercase at 0.16em in cyan or alarm red, in a fixed format like 'ERR // 0x0A4F // FRAME DROP'. It sits in a corner as ambient information rather than a real notice — an actual error must also be stated in readable language.",
      },
    },
  ],
  imagery: {
    zh: "故障图像：像素化的截图、错位的色带、压缩伪影、扫描线。允许把照片做 RGB 通道位移与块状压缩。不使用写实摄影、柔和插画与自然图像。",
    en: "Glitch imagery: pixelated screenshots, misaligned color bands, compression artifacts, scanlines. A photo may be channel-shifted and block-compressed. No realistic photography, soft illustration or natural imagery.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 16px，区块间距 48px。允许元素错位 2 到 8px 制造不稳定的感觉，但信息层级保持清晰。所有状态变化必须瞬时，页面整体可以每 4 秒抖一次。",
    en: "Capped at 1280px with 16px padding, sections 48px apart. Elements may misalign by 2 to 8px for instability while hierarchy stays clear. Every state change is instantaneous, and the whole page may jitter once every four seconds.",
  },
  dos: [
    { zh: "等宽字体，全大写加宽字距", en: "Monospace, uppercase, wide tracking" },
    { zh: "用双向 text-shadow 做 RGB 分离", en: "RGB split via two-way text-shadow" },
    { zh: "所有状态切换 transition-none", en: "Every state change is transition-none" },
    { zh: "按下用 skew-x 加 scale-y 撕裂", en: "Press tears with skew-x and scale-y" },
    { zh: "阴影只能是纯色块", en: "Shadows are solid color blocks only" },
    { zh: "装饰色只用 CMY", en: "Decoration stays inside CMY" },
  ],
  donts: [
    { zh: "不要用任何圆角", en: "No border radius at all" },
    { zh: "不要用平滑过渡动画", en: "No smooth transitions" },
    { zh: "不要用毛玻璃或柔和渐变", en: "No frosted glass or soft gradients" },
    { zh: "不要用 CMY 之外的装饰色", en: "No decoration outside CMY" },
    { zh: "不要用衬线或常规无衬线", en: "No serif or conventional sans" },
    { zh: "不要用柔和模糊阴影", en: "No soft blurred shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#00ffff",
      background: "#0a0a0a",
      magenta: "#ff00ff",
      yellow: "#ffff00",
      white: "#ffffff",
      alarm: "#ff0506",
    },
    prompts: [
      {
        zh: "做一个故障艺术风按钮：背景 #00ffff、黑字、零圆角、2px solid #00ffff 边框、900 字重 14px 全大写 0.16em 字距、padding 10px 24px、box-shadow 4px 4px 0 #ff00ff。hover 时背景硬切到 #ff00ff（transition: none）；active 时 skewX(-6deg) scaleY(0.9) translate(2px,2px)。标题用等宽 900 全大写，叠两层伪元素做 RGB 分离：一层 text-shadow 3px 0 #ff00ff、一层 -3px 0 #00ffff。页面底色 #0a0a0a，可叠 3px 间隔的白色 4% 扫描线。全站零圆角、零平滑过渡。",
        en: "Build a glitch button: background #00ffff, black text, zero radius, a 2px solid #00ffff border, weight 900 at 14px uppercase on 0.16em, 10px 24px padding, box-shadow 4px 4px 0 #ff00ff. Hover cuts the background to #ff00ff with transition none; active applies skewX(-6deg) scaleY(0.9) translate(2px,2px). Headlines run monospace 900 uppercase with the RGB split from two text-shadows — 3px 0 #ff00ff and -3px 0 #00ffff. The page ground is #0a0a0a with 3px-spaced white scanlines at 4%. Zero radius and zero smooth transitions throughout.",
      },
    ],
  },
  similar: [
    { name: "Cyberpunk Neon", why: { zh: "同为霓虹，但赛博朋克是稳定发光，故障艺术刻意出错", en: "Both neon, though cyberpunk glows steadily while glitch art fails on purpose" } },
    { name: "Pixel Art", why: { zh: "同样零圆角零平滑，但像素是状态机，故障是错误", en: "Both zero radius and zero smoothing, though pixel art is a state machine while glitch is an error" } },
  ],
  completeness: "full",
};
