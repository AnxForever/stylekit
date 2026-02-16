"use client";

import type { AccessibilityScore } from "@/lib/accessibility";

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

const gradeLabels: Record<AccessibilityScore["grade"], string> = {
  A: "Excellent",
  B: "Good",
  C: "Fair",
  D: "Poor",
  F: "Failing",
};

export function ScoreBadge({ score, compact = false }: ScoreBadgeProps) {
  if (compact) {
    return (
      <span
        className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold ${gradeColors[score.grade]}`}
        title={`Accessibility: ${score.overall}/100 (${gradeLabels[score.grade]})`}
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
        <span className="text-[10px] text-muted">{gradeLabels[score.grade]}</span>
      </div>
    </div>
  );
}
