"use client";

import type { AccessibilityScore } from "@/lib/accessibility";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";

interface ScoreBadgeProps {
  score: AccessibilityScore;
  compact?: boolean;
}

const gradeColors: Record<AccessibilityScore["grade"], string> = {
  A: "bg-green-600 text-white",
  B: "bg-lime-600 text-white",
  C: "bg-yellow-500 text-black",
  D: "bg-orange-500 text-white",
  F: "bg-red-600 text-white",
};

const gradeI18nKeys: Record<AccessibilityScore["grade"], TranslationKey> = {
  A: "a11y.excellent",
  B: "a11y.good",
  C: "a11y.fair",
  D: "a11y.poor",
  F: "a11y.failing",
};

export function ScoreBadge({ score, compact = false }: ScoreBadgeProps) {
  const { t } = useI18n();
  const label = t(gradeI18nKeys[score.grade]);

  if (compact) {
    return (
      <span
        className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold ${gradeColors[score.grade]}`}
        title={`${t("a11y.section")}: ${score.overall}/100 (${label})`}
      >
        {score.grade}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`inline-flex items-center justify-center w-8 h-8 text-sm font-bold ${gradeColors[score.grade]}`}
      >
        {score.grade}
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-medium">{score.overall}/100</span>
        <span className="text-[10px] text-muted">{label}</span>
      </div>
    </div>
  );
}
