import type { StyleAtoms } from "./types";

/**
 * Apple Style atoms.
 *
 * Captures the restraint and pixel-perfect calm of Apple's product surfaces:
 * generous breathing room, near-invisible craft, and a single confident
 * accent — quality felt through what is removed, not what is added.
 */
export const appleStyleAtoms: StyleAtoms = {
  philosophy: {
    zh: "用克制与精确传达高端科技产品的品质——所有的态度都来自被去掉的东西，不是被加上的东西，让用户在第一眼就感受到信任与从容。",
    en: "Convey the quality of premium tech products through restraint and precision: every statement comes from what is removed rather than what is added, so trust and calm land in the first glance.",
  },
  layout: {
    zh: "极大留白驱动的中心化叙事，单屏聚焦一个产品/一个关键句，垂直长卷式分段；网格严格对齐到中线，模块圆角统一且较大，关键卡片之间的间距远大于卡片内部 padding 以拉开层级。",
    en: "Whitespace-driven, centred storytelling: each viewport focuses on a single product or hero statement and the page reads as a long vertical scroll; modules align strictly to a centre axis with consistent generous rounded corners, and inter-card spacing far exceeds intra-card padding to open up the hierarchy.",
  },
  motion: {
    zh: "动效讲究几乎察觉不到的优雅：过渡 300-500ms，缓动用平滑 cubic-bezier(0.25,0.1,0.25,1)，hover 仅做微小的位移、阴影抬升或亮度微调；禁止弹性回弹与夸张缩放，prefers-reduced-motion 时仅保留颜色或亮度的两态切换。",
    en: "Motion aims for elegance at the edge of perception: transitions sit at 300-500ms with a smooth cubic-bezier(0.25,0.1,0.25,1), and hover offers only a tiny translate, shadow lift, or brightness nudge; no springy bounce, no exaggerated scale, and under prefers-reduced-motion only a two-state colour or brightness swap remains.",
  },
  color: {
    zh: "底座是纯白与浅灰的层次差，主文字接近纯黑，配色策略是大面积中性 + 单一高纯度品牌色作为行动指引；禁止彩色装饰堆叠，色彩出现的地方就是结构上需要被点击或被关注的地方。",
    en: "The base is layered tiers of pure white and light grey with body copy approaching true black; the strategy is large neutral fields with a single high-purity brand colour reserved for guidance, so wherever colour appears, it must mark something structurally clickable or worth attention — never decoration.",
  },
  typography: {
    zh: "现代几何无衬线作为唯一字族，字重以 Regular/Medium/Semibold 三档为主，靠夸张的字号阶梯（hero 比正文大 4-6 倍）建立层级；行高宽松，标题字距收紧、正文字距自然，避免装饰字体与全大写。",
    en: "A single modern geometric sans-serif family carries everything, weight stays within Regular/Medium/Semibold, and hierarchy comes from a dramatic size ladder (hero is 4-6x body); line-height is generous, headlines tighten tracking while body stays natural, and decorative faces or all-caps blocks are avoided.",
  },
  forbiddens: [
    {
      zh: "禁止使用厚重阴影、高饱和大色块或多色渐变背景，那会破坏中性底座带来的高级感。",
      en: "Do not use heavy shadows, large high-saturation colour blocks, or multi-colour gradient backgrounds; they break the premium feel that the neutral base provides.",
    },
    {
      zh: "禁止把同屏信息塞满，禁止使用花哨装饰元素或拥挤的多焦点布局。",
      en: "Do not pack the viewport with information, and avoid flashy ornaments or crowded multi-focus layouts.",
    },
  ],
};
