import type { StyleAtoms } from "./types";

/**
 * Bento Grid atoms.
 */
export const bentoGridAtoms: StyleAtoms = {
  philosophy: {
    zh: "像装便当一样装界面——每一格一道菜，大小不等却彼此咬合，一眼扫过就能尝出全部信息的味道。",
    en: "Pack the interface like a bento — each cell a dish, unequal in size yet perfectly locked together, letting one glance taste every piece of information.",
  },
  layout: {
    zh: "核心是不规则但严密咬合的模块网格：大卡、中卡、小卡按 2-3 种尺寸混排，卡片之间等距（通常 12-16px）且永不重叠；每张卡片独立完整、内部可有不同对齐与密度，但外部对齐线必须整齐。",
    en: "The core is an irregular but tightly interlocked module grid: large/medium/small cards in 2-3 size classes mixed together, equal gaps (typically 12-16px) and never overlapping; each card is a self-contained unit with its own internal alignment, while outer edges stay strictly aligned.",
  },
  motion: {
    zh: "交互聚焦单格：hover 时该卡片轻微放大（1.01-1.03）并抬升阴影，其它卡片保持静止；过渡 180-240ms、ease-out；禁止整网格级联动画和长时间循环；reduced-motion 时仅保留边框或阴影高亮。",
    en: "Interaction focuses on one cell: hover scales that card 1.01-1.03 and lifts its shadow while others stay still; 180-240ms ease-out; no grid-wide cascading animations or long loops; under reduced-motion only border or shadow highlight remains.",
  },
  color: {
    zh: "整体中性底（近白或近黑），每张卡片可以有自己的主色甚至渐变表面，使格子像不同食材一样区分；跨卡片的强调色要克制（2-4 种主色在整屏内循环），避免每格都抢话。",
    en: "Neutral canvas overall (near-white or near-black), while each card may own its dominant color or gradient surface so cells feel like distinct ingredients; cross-card accents stay disciplined (2-4 hues cycling over the whole screen) so no single cell overpowers the rest.",
  },
  typography: {
    zh: "同一字体家族贯穿全部卡片，以字号与字重区分主次（大卡可放大标题 2-3 倍）；每格内部排版紧凑、左对齐优先；禁止为了装饰在不同卡片里混用字体家族。",
    en: "One type family across every card, hierarchy expressed by size and weight (large cards may blow titles up 2-3x); inside each cell keep typography compact and flush-left; never mix font families across cards for decoration.",
  },
  forbiddens: [
    {
      zh: "禁止卡片重叠、不规则外边缘以及破坏等距间隙的自由排版。",
      en: "No overlapping cards, no ragged outer edges, no free-form layouts that break the equal gap.",
    },
    {
      zh: "禁止通屏级联动画与连续滚动视差，动效只作用于单个卡片。",
      en: "No grid-wide cascading animations or continuous parallax — motion is scoped to a single card at a time.",
    },
  ],
};
