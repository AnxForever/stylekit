import type { StyleAtoms } from "./types";

/**
 * Bauhaus atoms.
 *
 * Captures the 1919 Bauhaus doctrine of form-follows-function: design as a
 * machine of pure circles, squares, and triangles, painted in primary colours
 * and aligned by an unforgiving grid.
 */
export const bauhausAtoms: StyleAtoms = {
  philosophy: {
    zh: "形式追随功能——把界面还原为最基础的几何与原色，用纯粹、理性、机械精度的视觉语言表达：好的设计是一台精密运行的工具，不是一件被装饰的物品。",
    en: "Form follows function: reduce the interface to elementary geometry and primary colour, and speak in a pure, rational, mechanically precise visual language that says good design is a precision tool rather than a decorated object.",
  },
  layout: {
    zh: "严格的模块化网格驱动布局，所有元素吸附到看得见或看不见的栅格线；圆形、正方形、三角形作为构图主角而不是装饰，常用大色块拼贴的非对称平衡，留白被当作积极的几何形状参与构图，而非缓冲。",
    en: "A strict modular grid drives layout and every element snaps to a visible or implied gridline; circles, squares, and triangles act as compositional protagonists rather than ornaments, large colour blocks form asymmetric balance through collage, and whitespace participates as an active geometric shape rather than a buffer.",
  },
  motion: {
    zh: "动效像精密仪器：过渡极短（150-250ms），缓动用 ease-out 或 linear，hover 时几何块沿网格滑入、覆盖或旋转 90 度，强调一种咔哒的机械感；禁止柔滑回弹，prefers-reduced-motion 时直接以瞬时颜色硬切替代位移。",
    en: "Motion behaves like a precision instrument: transitions are very short (150-250ms) with ease-out or linear easing, and on hover geometric blocks slide along the grid, overlay, or rotate exactly 90 degrees with a mechanical click; no soft bounce is allowed, and under prefers-reduced-motion, displacement is replaced by an instant hard colour swap.",
  },
  color: {
    zh: "调色板严格限定在红、黄、蓝三原色加黑白，颜色之间不调和、不渐变、不透明度过渡——只用纯色硬切；颜色按功能分配（例如蓝表行动、黄表强调、红表警示），整体读起来像一张构成主义海报而不是 UI。",
    en: "The palette is strictly red, yellow, blue plus black and white; colours never blend, gradient, or fade through opacity — only hard solid switches are allowed; colour is allocated by function (e.g. blue for action, yellow for emphasis, red for alert), and the whole reads like a constructivist poster rather than a UI surface.",
  },
  typography: {
    zh: "几何无衬线独占舞台，字重以 Bold 与 Regular 两极为主；常用全大写、紧凑字距与左对齐造成强烈的水平节奏；标题尺寸夸张并直接落在网格交点，正文体量克制；禁止任何衬线、手写体或装饰字。",
    en: "Geometric sans-serif owns the stage with weight polarised into Bold and Regular; all-caps, tight tracking, and left alignment generate a strong horizontal rhythm; headlines are oversized and land directly on grid intersections while body text stays restrained, and no serif, handwritten, or decorative face is permitted.",
  },
  forbiddens: [
    {
      zh: "禁止使用任何渐变、装饰性插画或非原色的复杂配色——这会立即背离功能主义内核。",
      en: "Do not use any gradient, decorative illustration, or complex non-primary palette; it instantly betrays the functionalist core.",
    },
    {
      zh: "禁止使用大圆角与厚阴影，几何形状必须保持硬边缘；除圆形外不引入额外圆角。",
      en: "Do not use large border radii or heavy shadows; geometric shapes must keep hard edges, and no extra rounding is added beyond the pure circle itself.",
    },
  ],
};
