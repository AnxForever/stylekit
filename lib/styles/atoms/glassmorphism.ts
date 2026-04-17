import type { StyleAtoms } from "./types";

/**
 * Glassmorphism (Liquid Glass) atoms.
 *
 * Captures Apple WWDC25 Liquid Glass: the surface is not paint but a real
 * piece of optically active glass floating above a colorful world, refracting
 * and dispersing whatever sits behind it.
 */
export const glassmorphismAtoms: StyleAtoms = {
  philosophy: {
    zh: "界面不是平面涂层，而是悬浮在彩色世界之上的真实玻璃——通过折射、色散与内发光让背景的色彩在玻璃中流动，传达高级、轻盈、可触摸的现代感。",
    en: "The interface is not flat paint but a real piece of glass floating over a colorful world; refraction, chromatic dispersion, and inner luminance let background colors flow inside the glass, communicating a premium, weightless, touchable modernity.",
  },
  layout: {
    zh: "玻璃面板悬浮于多彩或带渐变的底层之上，模块以柔和大圆角矩形浮动，常采用居中对齐与单一焦点的层级；面板之间留有充足的空气感，必要时多层玻璃叠放，每层的尺寸与位置错开以暗示纵深。",
    en: "Glass panels hover above a colorful or gradient underlayer, modules float as soft, generously-rounded rectangles, and hierarchies tend to centre on a single focal point; panels are spaced with abundant air and, when needed, multiple glass layers stack with offset size and position to imply depth.",
  },
  motion: {
    zh: "过渡走 spring 物理曲线，时长偏慢（400-600ms）以模拟玻璃的惯性；hover 时面板轻微上浮、辉光与边框透明度同步抬升，禁止短促硬切；尊重 prefers-reduced-motion 时取消位移与边缘色散，仅保留亮度与边框的静态加强。",
    en: "Transitions use spring physics on the slower side (400-600ms) to simulate glass inertia; hover lifts the panel slightly while glow and border opacity rise in sync, and short hard cuts are forbidden; under prefers-reduced-motion, drop the lift and edge dispersion and keep only a static brightness and border boost.",
  },
  color: {
    zh: "玻璃自身使用近白半透加高斯模糊与饱和度增强，颜色不来自填色而来自背景被折射后的混合；强调色出现在边缘高光与微妙色散，而非大色块；整体呈现冷暖混合、低对比但层次丰富的光学色质感。",
    en: "Glass itself relies on near-white translucency, high gaussian blur, and saturation boost; color comes from the refracted background mix rather than fills; accents live on edge highlights and subtle dispersion instead of large color blocks, producing a cool-warm-mixed, low-contrast yet richly layered optical palette.",
  },
  typography: {
    zh: "字体走现代人文无衬线路线，字重以中等为主，依赖字号阶梯与行高呼吸建立层级；正文字色保持柔和（near-white 或 dark with reduced opacity）以避免压过玻璃质感，标题不追求重量，靠尺寸与留白形成张力。",
    en: "Type uses a modern humanist sans-serif at predominantly mid-weights, building hierarchy through size steps and generous line-height; body text stays soft (near-white, or dark with reduced opacity) so it never overpowers the glass, and headlines earn presence through size and surrounding space rather than weight.",
  },
  forbiddens: [
    {
      zh: "禁止在纯色或无图层的扁平背景上使用，玻璃必须有被折射的对象。",
      en: "Do not use over flat solid-color or empty backgrounds; the glass must have something to refract.",
    },
    {
      zh: "禁止使用低模糊、单层扁平阴影或不透明填色面板冒充玻璃，也禁止任何高频闪烁或频闪辉光。",
      en: "Do not fake glass with low blur, single-layer flat shadows, or opaque-fill panels, and never use high-frequency flicker or strobing glow.",
    },
  ],
};
