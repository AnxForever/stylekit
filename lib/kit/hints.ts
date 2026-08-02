// Pairing hints for the Kit workbench - honest, meta-level design guidance.
// Rules only use data we actually have (categories, counts, intensity);
// no fabricated compatibility scores.

import type { AnimationMeta } from "@/lib/animations/types";

export type KitHintTone = "good" | "info" | "warn";

export interface KitHint {
  tone: KitHintTone;
  zh: string;
  en: string;
}

export interface KitHintInput {
  styleCount: number;
  fontPairingCount: number;
  animations: Pick<AnimationMeta, "category" | "intensity">[];
  /** Whether the reader can reorder styles in this context (default true). */
  interactive?: boolean;
}

export function buildKitHints(input: KitHintInput): KitHint[] {
  const hints: KitHint[] = [];
  const { styleCount, fontPairingCount, animations, interactive = true } = input;

  if (styleCount > 2) {
    hints.push({
      tone: "warn",
      zh: `选了 ${styleCount} 个风格：超过 2 个混搭很难压住场。建议 1 主 + 1 点缀，其余移除或另建方案。`,
      en: `${styleCount} styles selected: blending more than 2 rarely holds together. Aim for 1 base + 1 accent.`,
    });
  } else if (styleCount === 2) {
    hints.push({
      tone: "info",
      zh: interactive
        ? "双风格混搭：第一个是主风格，第二个作点缀。点击上方风格名可切换主次。"
        : "双风格混搭：第一个是主风格，第二个作点缀。导入自己的工具箱后可切换主次。",
      en: interactive
        ? "Two styles: the first acts as the base, the second as an accent. Click a style name above to swap."
        : "Two styles: the first acts as the base, the second as an accent. Import to your kit to swap them.",
    });
  }

  const entranceCount = animations.filter((a) => a.category === "entrance").length;
  if (entranceCount > 2) {
    hints.push({
      tone: "warn",
      zh: `${entranceCount} 个入场动效：同一页面混用多种入场节奏会显得杂乱，建议全站统一 1-2 种。`,
      en: `${entranceCount} entrance animations: mixing many entrance rhythms reads as noise. Standardize on 1-2 site-wide.`,
    });
  }

  const ambientCount = animations.filter(
    (a) => a.category === "background" || a.category === "loading"
  ).length;
  if (ambientCount > 1) {
    hints.push({
      tone: "warn",
      zh: `${ambientCount} 个持续型动效（背景/加载类）：多个常驻动效会互相抢注意力，同屏最多保留 1 个。`,
      en: `${ambientCount} ambient animations (background/loading): more than one competes for attention. Keep at most 1 per view.`,
    });
  }

  const highIntensityCount = animations.filter((a) => a.intensity === "high").length;
  if (highIntensityCount >= 2) {
    hints.push({
      tone: "warn",
      zh: `${highIntensityCount} 个高强度动效：高冲击动效应当稀缺使用，只留给最关键的一处。`,
      en: `${highIntensityCount} high-intensity animations: high-impact motion works when scarce - reserve it for one key moment.`,
    });
  }

  if (fontPairingCount > 1) {
    hints.push({
      tone: "info",
      zh: `${fontPairingCount} 套字体配对：一个项目通常一套就够。导出会全部包含，正式落地时定一套即可。`,
      en: `${fontPairingCount} font pairings: one per project is usually enough. All are exported - settle on one when you build.`,
    });
  }

  if (
    hints.length === 0 &&
    styleCount >= 1 &&
    fontPairingCount <= 1 &&
    animations.length > 0 &&
    animations.length <= 3
  ) {
    hints.push({
      tone: "good",
      zh: "组合很克制：主风格明确、字体系统单一、动效数量合理。可以直接导出开工。",
      en: "A disciplined combination: clear base style, single type system, restrained motion. Ready to export.",
    });
  }

  return hints;
}
