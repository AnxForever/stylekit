"use client";

import { useI18n } from "@/lib/i18n/context";
import type { AccessibilityScore } from "@/lib/accessibility";
import { Eye, Type, Contrast } from "lucide-react";

interface ScoreDetailProps {
  score: AccessibilityScore;
}

export function ScoreDetail({ score }: ScoreDetailProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 border border-border">
          <span className="text-2xl font-bold">{score.overall}</span>
        </div>
        <div>
          <p className="text-sm font-medium">{t("a11y.overallScore")}</p>
          <p className="text-xs text-muted">
            {t("a11y.grade")}: {score.grade} - {score.grade === "A" ? t("a11y.excellent") : score.grade === "B" ? t("a11y.good") : score.grade === "C" ? t("a11y.fair") : score.grade === "D" ? t("a11y.poor") : t("a11y.failing")}
          </p>
        </div>
      </div>

      {/* Contrast Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Contrast className="w-4 h-4 text-muted" />
          <p className="text-xs tracking-widest uppercase text-muted">
            {t("a11y.contrastRatios")}
          </p>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex gap-3 text-sm">
            <span>
              {t("a11y.score")}: <strong>{score.contrast.score}/100</strong>
            </span>
            <span>
              {t("a11y.avgRatio")}: <strong>{score.contrast.ratio}:1</strong>
            </span>
          </div>
          <div className="flex gap-2">
            <span className={`text-xs px-2 py-0.5 ${score.contrast.meetsAA ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              AA {score.contrast.meetsAA ? t("a11y.pass") : t("a11y.fail")}
            </span>
            <span className={`text-xs px-2 py-0.5 ${score.contrast.meetsAAA ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              AAA {score.contrast.meetsAAA ? t("a11y.pass") : t("a11y.fail")}
            </span>
          </div>
        </div>

        {/* Color Pairs Table */}
        {score.contrast.pairs.length > 0 && (
          <div className="border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-zinc-50 dark:bg-zinc-900">
                  <th className="text-left px-3 py-2 text-xs uppercase text-muted">{t("a11y.context")}</th>
                  <th className="text-left px-3 py-2 text-xs uppercase text-muted">{t("a11y.colors")}</th>
                  <th className="text-left px-3 py-2 text-xs uppercase text-muted">{t("a11y.ratio")}</th>
                  <th className="text-center px-3 py-2 text-xs uppercase text-muted">AA</th>
                  <th className="text-center px-3 py-2 text-xs uppercase text-muted">AAA</th>
                </tr>
              </thead>
              <tbody>
                {score.contrast.pairs.map((pair, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0">
                    <td className="px-3 py-2 text-xs">{pair.context}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 border border-border inline-block"
                          style={{ backgroundColor: pair.fg }}
                          title={pair.fg}
                        />
                        <span className="text-xs text-muted">/</span>
                        <span
                          className="w-4 h-4 border border-border inline-block"
                          style={{ backgroundColor: pair.bg }}
                          title={pair.bg}
                        />
                        <span className="text-[10px] text-muted ml-1">
                          {pair.fg} / {pair.bg}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs font-mono">{pair.ratio}:1</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${pair.aa ? "bg-green-500" : "bg-red-500"}`} />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${pair.aaa ? "bg-green-500" : "bg-red-500"}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Readability Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-muted" />
          <p className="text-xs tracking-widest uppercase text-muted">
            {t("a11y.readability")}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-border p-3">
            <p className="text-xs text-muted mb-1">{t("a11y.score")}</p>
            <p className="text-lg font-bold">{score.readability.score}/100</p>
          </div>
          <div className="border border-border p-3">
            <p className="text-xs text-muted mb-1">{t("a11y.fontSize")}</p>
            <p className="text-xs font-mono truncate" title={score.readability.fontSize}>
              {score.readability.fontSize}
            </p>
          </div>
          <div className="border border-border p-3">
            <p className="text-xs text-muted mb-1">{t("a11y.fontWeight")}</p>
            <p className="text-xs font-mono truncate" title={score.readability.fontWeight}>
              {score.readability.fontWeight}
            </p>
          </div>
          <div className="border border-border p-3">
            <p className="text-xs text-muted mb-1">{t("a11y.lineHeight")}</p>
            <p className="text-xs font-mono">{score.readability.lineHeight}</p>
          </div>
        </div>
      </div>

      {/* WCAG Reference */}
      <div className="flex items-start gap-2 p-3 bg-zinc-50 dark:bg-zinc-900 border border-border">
        <Eye className="w-4 h-4 text-muted mt-0.5 shrink-0" />
        <p className="text-xs text-muted leading-relaxed">
          {t("a11y.wcagReference")}
        </p>
      </div>
    </div>
  );
}
