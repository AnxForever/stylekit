/**
 * The film's design system. Deliberately tiny: a handful of tokens and every
 * motion primitive the whole picture is allowed to use. Scenes should not
 * invent easings or colours locally, or the film stops feeling like one film.
 */

export const INK = "#0A0A0B";
export const INK_SOFT = "#15151A";
export const PAPER = "#F4F1EA";
export const PAPER_DIM = "#D9D4C7";
export const NEON = "#C6FF3D";
export const ALERT = "#FF2E63";
export const CYAN = "#22D3EE";

export const FONT_DISPLAY =
  '"Inter Display","Inter","PingFang SC","Microsoft YaHei","HarmonyOS Sans SC",system-ui,sans-serif';
export const FONT_MONO =
  '"JetBrains Mono","SF Mono","Cascadia Code","Consolas",monospace';
export const FONT_SC = '"PingFang SC","Microsoft YaHei","Noto Sans SC",' + FONT_DISPLAY;
/**
 * Serif CJK stack for the film's display lines. No font file is bundled, so this
 * resolves against what the render machine has; the last entries are fallbacks
 * that every supported OS reports, which keeps rendered frames deterministic.
 */
export const FONT_SERIF_SC =
  '"Songti SC","Noto Serif SC","Source Han Serif SC","SimSun","STSong",serif';

/**
 * Motion vocabulary from the treatment. Entrances are 0.35-0.45s, exits
 * 0.2-0.3s, group stagger 0.08-0.16s. Anything slower reads as soft, anything
 * faster reads as a glitch.
 */
export const EASE = {
  /** Decelerating - enters and settles. Default for anything that appears. */
  out: (t: number) => 1 - Math.pow(1 - t, 3),
  /** Symmetric - continuous travel, pans, pushes. */
  inOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  /** Accelerating - leaving frame, or accelerating into a cut. */
  in: (t: number) => t * t * t,
  /** Overshoot - impact beats only. */
  back: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  linear: (t: number) => t,
};

export type EaseName = keyof typeof EASE;

/** Total budget for an entrance animation, in seconds. */
export const ENTER = 0.4;
export const EXIT = 0.26;
export const STAGGER = 0.11;

/** Type scale at 1080p. Hero numbers live on a separate rail. */
export const TYPE = {
  micro: 18,
  caption: 24,
  body: 34,
  lead: 48,
  sub: 64,
  head: 96,
  hero: 180,
};

export const SAFE = {
  x: 120,
  y: 90,
};
