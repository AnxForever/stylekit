import type { StyleAtoms } from "./types";

/**
 * Swiss Style (International Typographic Style) atoms.
 */
export const swissStyleAtoms: StyleAtoms = {
  philosophy: {
    zh: "排版即秩序——用网格、对齐与留白承载信息的客观性，设计退到幕后让内容自己发声。",
    en: "Typography is order — grids, alignment, and whitespace carry information objectively, while the designer steps aside to let content speak.",
  },
  layout: {
    zh: "一切服从栅格：12/6 列基线网格严格对齐，分区靠留白与位置切分而非边框；左对齐优先，章节之间以大尺度空白段落断句，密度偏疏朗但信息块内部紧凑。",
    en: "Everything obeys the grid: strict 12/6-column baseline alignment, regions separated by whitespace and position rather than borders; left-aligned by default, sections broken by generous vertical rhythm, loose overall density but tight inside each block.",
  },
  motion: {
    zh: "动效克制到几乎不可见：hover 仅改变下划线或权重，过渡 150-200ms 纯线性；无入场动画、无弹性曲线；reduced-motion 下所有 transform 归零只保留颜色切换。",
    en: "Motion is nearly invisible: hover changes only an underline or weight, 150-200ms linear transitions; no entrance animations, no elastic curves; under reduced-motion all transforms collapse to color-only feedback.",
  },
  color: {
    zh: "极简二元底（黑/白或黑/灰）上点缀一个结构性强调色（常为红或蓝），色彩作为信号而非装饰；无渐变、无半透明、无叠色；整体冷静、印刷品质感。",
    en: "Minimal binary base (black/white or black/grey) accented by one structural signal color (often red or blue); color is a signal, not decoration; no gradients, no translucency, no color blending — a calm, print-grade palette.",
  },
  typography: {
    zh: "无衬线字体家族通吃标题到正文，字重跨度收敛（regular/medium/bold 三级），字号按等比阶跃；紧贴基线、左对齐、偶用全大写小字距；忌用衬线装饰和花体。",
    en: "One neo-grotesque sans family spans heading to body, weights restrained to three tiers (regular/medium/bold), sizes stepped on a modular scale; hugging the baseline, flush-left, occasional all-caps with tight tracking; no decorative serifs or scripts.",
  },
  forbiddens: [
    {
      zh: "禁止装饰性插画、渐变背景、手写/花体字以及居中排版。",
      en: "No decorative illustrations, gradient backgrounds, handwritten or script type, or centered typography.",
    },
    {
      zh: "禁止破坏栅格的随意偏移与倾斜，禁止弹性/反弹缓动曲线。",
      en: "No grid-breaking offsets or tilts, no elastic or bounce easing curves.",
    },
  ],
};
