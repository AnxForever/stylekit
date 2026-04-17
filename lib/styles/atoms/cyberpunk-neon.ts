import type { StyleAtoms } from "./types";

/**
 * Cyberpunk Neon atoms.
 *
 * Captures the dark-room-with-glowing-signs aesthetic: deep voids punctured by
 * saturated emission, treating the screen as a piece of hardware caught in a
 * neon downpour rather than a flat document.
 */
export const cyberpunkNeonAtoms: StyleAtoms = {
  philosophy: {
    zh: "把界面当成霓虹雨夜中的一块发光硬件——黑暗承担结构，光线承担情绪，用人造光的过曝感唤起对未来都市的赛博想象。",
    en: "Treat the interface as a glowing piece of hardware in a neon-drenched night: darkness carries the structure, light carries the emotion, and overexposed artificial glow evokes a cybernetic future-city imagination.",
  },
  layout: {
    zh: "以全屏深色为底，模块沿正交网格紧密排布，常出现 HUD 风格的扇区分割与角标切角；信息密度偏高，关键面板以 1px 描边线和扫描线纹理勾勒边界，留白用于强化屏幕外的虚空而非呼吸感。",
    en: "Full-bleed dark canvas with modules tightly packed along an orthogonal grid, often broken up by HUD-style sectors and clipped corners; information density runs high, critical panels are framed by 1px outlines and scanline textures, and whitespace exists to enhance the surrounding void rather than provide breathing room.",
  },
  motion: {
    zh: "动效偏机械与电流：hover 触发瞬时的辉光强化、扫描线推移或一次性故障抖动，过渡常落在 100-200ms、缓动用 linear 或带轻微回弹的 ease-out；尊重 prefers-reduced-motion 时立刻关闭故障与闪烁以及扫描线滚动，仅保留辉光强度的两态切换。",
    en: "Motion feels mechanical and electric: hover triggers an instant glow ramp, a scanline sweep, or a one-shot glitch jitter; transitions land at 100-200ms with linear or lightly bouncy ease-out; under prefers-reduced-motion, kill all glitch, flicker, and scanline scrolling and keep only a two-state glow intensity swap.",
  },
  color: {
    zh: "几乎纯黑的背景作为光学黑场，主色靠 1-2 种高饱和霓虹（青、品红、酸黄）以自发光姿态出现——通过外辉光、内辉光与文本投影制造发射感；中性灰几乎不出现，对比策略是无光对过曝，而不是浅色对深色。",
    en: "Near-black background acts as an optical black field; one or two high-saturation neons (cyan, magenta, acid yellow) appear as self-emitting accents through outer glow, inner glow, and text-shadow halos; mid-grays barely exist, and the contrast strategy is unlit-versus-overexposed rather than light-versus-dark.",
  },
  typography: {
    zh: "等宽或几何无衬线主导，标题常用全大写配宽字距营造终端铭牌感，正文则保持紧凑的小字号；字重对比克制，张力主要来自字距、大小写与发光描边，避免衬线与手写体打破科技氛围。",
    en: "Monospace or geometric sans-serif dominates; headlines lean on all-caps with wide tracking for terminal/nameplate energy while body text stays compact and small; weight contrast is restrained, tension comes from tracking, casing, and glow outlines, and serifs or handwritten faces are avoided so the tech mood holds.",
  },
  forbiddens: [
    {
      zh: "禁止使用浅色或纯白背景，禁止用普通柔和阴影替代发光阴影。",
      en: "Do not use light or pure-white backgrounds, and do not replace glow shadows with ordinary soft drop shadows.",
    },
    {
      zh: "禁止使用低饱和度暖色调或柔和手写体作为主体语言，那会立刻杀死赛博感。",
      en: "Do not adopt low-saturation warm palettes or soft handwritten faces as the primary language; it instantly kills the cyber mood.",
    },
  ],
};
