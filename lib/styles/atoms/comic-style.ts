import type { StyleAtoms } from "./types";

/**
 * Comic Style atoms.
 */
export const comicStyleAtoms: StyleAtoms = {
  philosophy: {
    zh: "把界面当作一页漫画——粗墨线、分镜、拟声词一起上，信息不是被展示而是被「演」出来，情绪外放、戏剧感强。",
    en: "Treat the interface like a comic page — heavy ink lines, panels, and onomatopoeia team up so information is performed rather than displayed; emotion is loud and dramatic.",
  },
  layout: {
    zh: "分镜式面板排版：矩形/不规则面板相邻拼接，面板边缘有 3-5px 粗黑描边；允许单个面板倾斜 2-6° 或突破边界；焦点元素可挂气泡/爆炸框作为强调。",
    en: "Panel-based comic layout: rectangular or irregular panels butted together with 3-5px thick black borders; any single panel may tilt 2-6° or burst past its edge; focal elements may carry speech bubbles or burst-frames as emphasis.",
  },
  motion: {
    zh: "动作像翻页：hover 时元素快速弹出并伴随轻微旋转（-3° 到 3°），过渡 100-160ms、带一个小反弹；点击可触发「POW」式缩放脉冲但禁止持续循环；reduced-motion 时改为边框闪烁一次。",
    en: "Motion feels like a page turn: on hover elements pop out with a slight rotate (-3° to 3°), 100-160ms with a tiny bounce; clicks may trigger a POW-style scale pulse but never loop continuously; under reduced-motion a single border flash replaces motion.",
  },
  color: {
    zh: "四色印刷质感：红/黄/蓝/绿中挑 2-3 种高饱和色作为面板填充，阴影用黑色网点（halftone）而非渐变；描边永远是纯黑、底色偏米白以模拟纸张；禁止柔和粉彩。",
    en: "Four-color-print feel: pick 2-3 highly saturated tones from red/yellow/blue/green as panel fills, shade with black halftone dots instead of gradients; outlines stay pure black and the paper-tinted off-white base mimics newsprint; no soft pastels.",
  },
  typography: {
    zh: "标题用粗体位图式漫画字体，可倾斜并带描边/错位阴影；正文用无衬线中等字重；拟声词可超大并旋转，但每屏最多两个；避免纤细衬线与书法体。",
    en: "Headings use heavy display comic lettering, often tilted with an outline or offset shadow; body uses a medium-weight sans; onomatopoeia can be oversized and rotated but limited to two per screen; avoid thin serifs and calligraphic scripts.",
  },
  forbiddens: [
    {
      zh: "禁止柔和粉彩/莫兰迪配色、玻璃模糊与 neumorphism 阴影。",
      en: "No pastel/Morandi palettes, no glass blur, no neumorphism shadows.",
    },
    {
      zh: "禁止无描边的扁平卡片与持续循环动画。",
      en: "No flat cards without ink outlines and no continuously looping animations.",
    },
  ],
};
