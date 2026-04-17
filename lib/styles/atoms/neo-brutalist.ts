import type { StyleAtoms } from "./types";

/**
 * Neo-Brutalist atoms.
 *
 * First reference sample for Phase 3 atomic decomposition. Each field is kept
 * focused on ONE dimension so the composer can swap them across styles without
 * semantic collisions (e.g. "apply Neo-Brutalist motion on top of Glassmorphism
 * color behavior" should remain internally consistent).
 */
export const neoBrutalistAtoms: StyleAtoms = {
  philosophy: {
    zh: "原始、诚实、功能先行的视觉宣言——拒绝精致与装饰，通过硬边缘与直白的信息层级让界面本身成为态度表达。",
    en: "A raw, honest, function-first visual manifesto — rejecting polish and decoration, using hard edges and blunt information hierarchy so the interface itself becomes a statement.",
  },
  layout: {
    zh: "宽松大留白但模块边界极硬：大块分区以粗边框与明显偏移包住，不使用阴影过渡；卡片可略微旋转制造手工感，但同一屏内最多出现一种倾斜节奏。",
    en: "Generous whitespace yet module boundaries are rigid: large regions are boxed by thick borders with deliberate offsets, never softened by gradients; cards may tilt slightly for handmade rhythm, but keep at most one tilt pattern per screen.",
  },
  motion: {
    zh: "动作直截了当：hover 时元素向某一方向位移 2-4px 或阴影抽离，过渡时长 80-120ms、缓动用 step 或 linear；禁止 ease-in-out 曲线与淡入淡出；尊重 prefers-reduced-motion 时直接取消位移只保留颜色反馈。",
    en: "Motion is blunt: on hover elements shift 2-4px in a single direction or drop their offset shadow; transitions 80-120ms with step/linear easing; no ease-in-out curves, no crossfades; when prefers-reduced-motion is set, drop the displacement and keep only color feedback.",
  },
  color: {
    zh: "高对比、低饱和度的底座（黑/白/米）上投放一至两个高饱和色块作为结构性强调；颜色不做渐变、不做半透明，边界靠纯色硬切；配色像印刷海报而非 UI 皮肤。",
    en: "High-contrast, low-saturation base (black/white/cream) punctuated by one or two saturated blocks used as structural accents; no gradients, no translucency, boundaries are solid hard cuts; the palette reads like a printed poster, not a UI skin.",
  },
  typography: {
    zh: "极端字重对比：超粗无衬线标题与常规衬线正文并置；字号跨度夸张（hero 是正文的 8-10 倍），行高偏紧，偶尔使用全大写配大字距制造横幅感；忌讳柔和手写体。",
    en: "Extreme weight contrast: ultra-bold sans-serif headlines paired with regular serif body; exaggerated size ratio (hero is 8-10x body), tight line-height, occasional all-caps with wide tracking for banner energy; no soft handwritten scripts.",
  },
  forbiddens: [
    {
      zh: "禁止使用 border-radius > 4px、box-shadow 的 blur 大于 0、rgba 半透明色或任何玻璃/模糊效果。",
      en: "Do not use border-radius > 4px, box-shadow with non-zero blur, rgba translucency, or any glass/blur effects.",
    },
    {
      zh: "禁止 ease-in-out 长过渡、淡入淡出式动画以及装饰性 gradient 背景。",
      en: "Do not use long ease-in-out transitions, crossfade-style animations, or decorative gradient backgrounds.",
    },
  ],
};
