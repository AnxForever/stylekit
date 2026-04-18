import type { StyleAtoms } from "./types";

/**
 * Claymorphism atoms.
 */
export const claymorphismAtoms: StyleAtoms = {
  philosophy: {
    zh: "把界面捏成一团会呼吸的粘土——柔软、可爱、触手可及，情绪上让用户想去按压一下。",
    en: "Shape the interface like breathing clay — soft, cute, touchable, emotionally inviting the user to press on it.",
  },
  layout: {
    zh: "分区由圆润肿胀的卡片堆叠而成：卡片间距宽松、卡片本身饱满（padding 大于边距），层级靠抬升而非分割线；避免贴边与直角分区，所有区块都像被托起的软糖。",
    en: "Regions are stacks of plump rounded cards: generous gaps, cards themselves padded fatter than their margins, hierarchy conveyed by elevation rather than dividers; never flush-to-edge or square-cornered — every block feels like a lifted gummy.",
  },
  motion: {
    zh: "动作带弹性却轻盈：hover 时卡片轻微上浮 4-8px 并放大 1.02，使用 cubic-bezier(.2,.8,.2,1.2) 的反弹曲线，过渡 200-280ms；禁止硬切与长时间持续动画；reduced-motion 时只保留阴影深浅变化。",
    en: "Motion is springy but light: on hover cards lift 4-8px and scale to 1.02 with a cubic-bezier(.2,.8,.2,1.2) bounce, 200-280ms; no hard cuts or long sustained loops; under reduced-motion only shadow depth changes remain.",
  },
  color: {
    zh: "粉彩糖果系为底：低饱和度但偏亮的马卡龙色块，表面总是有轻微的同色系渐变以模拟光照；强调色不是高对比，而是相邻色相的另一块糖；禁止纯黑与冷硬工业色。",
    en: "Pastel candy base: low-saturation but bright macaron tones, surfaces always carry a faint same-hue gradient to fake lighting; accents come from neighboring hues, not high contrast; no pure black or cold industrial tones.",
  },
  typography: {
    zh: "圆润无衬线字体，字重中等偏粗（500-700），字母本身带有圆角终端；字号对比温和，行高宽松；标题可以微微放大字间距但不做全大写；避免锐利的几何无衬线。",
    en: "Rounded sans-serif with medium-to-bold weight (500-700) and rounded terminals; gentle size contrast, relaxed line-height; headings may widen tracking slightly but never go all-caps; avoid sharp geometric sans.",
  },
  forbiddens: [
    {
      zh: "禁止小于 16px 的 border-radius、尖角矩形以及单一方向硬阴影。",
      en: "No border-radius under 16px, no sharp rectangles, no single-direction hard shadows.",
    },
    {
      zh: "禁止高饱和撞色、纯黑背景与霓虹发光效果。",
      en: "No highly saturated clashing palettes, no pure black backgrounds, no neon glow.",
    },
  ],
};
