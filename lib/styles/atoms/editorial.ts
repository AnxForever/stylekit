import type { StyleAtoms } from "./types";

/**
 * Editorial (magazine) atoms.
 */
export const editorialAtoms: StyleAtoms = {
  philosophy: {
    zh: "把屏幕当作一本被仔细编辑过的杂志——节奏、章法、呼吸感优先于功能铺陈，让读者愿意停下来翻页。",
    en: "Treat the screen like a carefully edited magazine — rhythm, structure, and breath matter more than feature density, inviting the reader to slow down and turn the page.",
  },
  layout: {
    zh: "章节叙事式分布：超宽首屏留白、引导线式小标题、正文控制在舒适阅读列宽（60-75 字符）；采用非对称但稳定的网格，允许图片跨列出血制造节奏变化。",
    en: "Narrative sectioning: oversized opening whitespace, lead-line subheads, body text kept to a comfortable measure (60-75 characters); an asymmetric but stable grid, with images bleeding across columns to shift rhythm.",
  },
  motion: {
    zh: "动作属于阅读仪式：链接下划线从左到右徐徐展开（300-400ms，ease-out），图片在滚动进入时轻微淡入和 2-4px 位移；禁止弹跳、摇摆、连续循环；reduced-motion 时下划线直接显示为静态。",
    en: "Motion serves the reading ritual: link underlines sweep left-to-right over 300-400ms ease-out, images fade in with a 2-4px nudge as they scroll into view; no bounces, wobbles, or continuous loops; under reduced-motion underlines render statically.",
  },
  color: {
    zh: "暖米色或象牙底配柔和近黑文字，层级通过透明度阶梯（100/70/50%）而非额外色相实现；强调色用极少量深墨或酒红作为引号；整体像旧纸张而非屏幕。",
    en: "Warm cream or ivory base with soft near-black text, hierarchy built through opacity tiers (100/70/50%) rather than new hues; a sparing ink-dark or oxblood accent functions like quotation marks; the palette reads as aged paper, not screen.",
  },
  typography: {
    zh: "衬线字体承担标题与引语（大字号、窄字距、偶尔斜体），无衬线承担正文与导航；字号对比强烈（hero 8-12x 正文），段首可用大写首字母（drop cap）但整屏只一次。",
    en: "Serif carries headlines and pull-quotes (large, tight tracking, occasional italics), sans-serif carries body and navigation; strong scale contrast (hero 8-12x body), a drop cap is permissible but limited to once per screen.",
  },
  forbiddens: [
    {
      zh: "禁止屏幕满铺高饱和色块与霓虹强调，禁止无网格的自由堆叠。",
      en: "No screen-wide saturated color blocks or neon accents, no free-floating non-gridded stacks.",
    },
    {
      zh: "禁止圆角卡片式 UI 皮肤、禁止弹性/反弹动效。",
      en: "No rounded-card UI-skin look, no elastic or bounce motion.",
    },
  ],
};
