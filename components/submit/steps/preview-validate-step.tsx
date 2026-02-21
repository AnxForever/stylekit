"use client";

import { useMemo } from "react";
import { Check, X, AlertTriangle } from "lucide-react";

interface PreviewFormData {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  philosophy: string;
  primaryColor: string;
  secondaryColor: string;
  accentColors: string[];
  background: string;
  foreground: string;
  muted: string;
  headingFont: string;
  bodyFont: string;
  fontSizeHeading: string;
  fontSizeBase: string;
  fontWeightBold: string;
  fontWeightNormal: string;
  lineHeightNormal: string;
  lineHeightTight: string;
  borderRadius: string;
  spacingSm: string;
  spacingMd: string;
  spacingLg: string;
  doList: string[];
  dontList: string[];
  aiRules: string[];
  keywords: string[];
  buttonCode: string;
  cardCode: string;
  inputCode: string;
  navCode: string;
  heroCode: string;
  footerCode: string;
}

interface PreviewValidateStepProps {
  formData: PreviewFormData;
  manifestCoverSvg: string | null;
  isAnimating: boolean;
  onGoToStep?: (step: number) => void;
}

const FIELD_TO_STEP: Record<string, number> = {
  "Name": 1,
  "Slug": 1,
  "Primary Color": 2,
  "Secondary Color": 2,
  "Description": 1,
  "Philosophy": 1,
  "Do List": 4,
  "Don't List": 4,
  "AI Rules": 4,
  "Keywords": 1,
  "Components": 5,
  "Nav Component": 5,
  "Hero Component": 5,
  "Footer Component": 5,
};

function fieldToStep(field: string): number | undefined {
  if (field.startsWith("Accent Color")) return 2;
  return FIELD_TO_STEP[field];
}

interface ValidationIssue {
  severity: "error" | "warning";
  field: string;
  message: string;
}

const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function validateSubmission(formData: PreviewFormData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!formData.name.trim() && !formData.nameEn.trim()) {
    issues.push({ severity: "error", field: "Name", message: "At least one style name is required" });
  }
  if (!formData.slug.trim()) {
    issues.push({ severity: "error", field: "Slug", message: "Slug is required" });
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug.trim())) {
    issues.push({ severity: "error", field: "Slug", message: "Invalid slug format" });
  }
  if (!HEX_PATTERN.test(formData.primaryColor.trim())) {
    issues.push({ severity: "error", field: "Primary Color", message: "Must be valid hex" });
  }
  if (!HEX_PATTERN.test(formData.secondaryColor.trim())) {
    issues.push({ severity: "error", field: "Secondary Color", message: "Must be valid hex" });
  }
  for (const [i, c] of formData.accentColors.entries()) {
    if (!HEX_PATTERN.test(c.trim())) {
      issues.push({ severity: "error", field: `Accent Color #${i + 1}`, message: "Must be valid hex" });
    }
  }
  if (!formData.doList.some((item) => item.trim())) {
    issues.push({ severity: "error", field: "Do List", message: "At least one Do rule is required" });
  }
  if (![formData.buttonCode, formData.cardCode, formData.inputCode].some((c) => c.trim())) {
    issues.push({ severity: "error", field: "Components", message: "At least one component code is required" });
  }

  // Warnings
  if (!formData.description.trim()) {
    issues.push({ severity: "warning", field: "Description", message: "Description recommended" });
  }
  if (!formData.philosophy.trim()) {
    issues.push({ severity: "warning", field: "Philosophy", message: "Design philosophy recommended" });
  }
  if (formData.doList.filter((i) => i.trim()).length < 3) {
    issues.push({ severity: "warning", field: "Do List", message: "Recommend 3+ rules for quality score" });
  }
  if (formData.dontList.filter((i) => i.trim()).length < 3) {
    issues.push({ severity: "warning", field: "Don't List", message: "Recommend 3+ rules for quality score" });
  }
  if (formData.aiRules.filter((i) => i.trim()).length < 3) {
    issues.push({ severity: "warning", field: "AI Rules", message: "Recommend 3+ AI rules" });
  }
  if (formData.keywords.length < 3) {
    issues.push({ severity: "warning", field: "Keywords", message: "Recommend 3+ keywords" });
  }

  // Extended component warnings
  const extCount = [formData.navCode, formData.heroCode, formData.footerCode].filter((c) => c.trim()).length;
  if (extCount === 0) {
    issues.push({ severity: "warning", field: "Nav Component", message: "Nav/Hero/Footer recommended for quality score" });
  } else if (extCount < 2) {
    issues.push({ severity: "warning", field: "Nav Component", message: "Recommend at least 2 of Nav/Hero/Footer" });
  }

  return issues;
}

function computeCompletenessScore(formData: PreviewFormData): number {
  let score = 0;

  // Name (8)
  if (formData.name.trim() || formData.nameEn.trim()) score += 4;
  if (formData.name.trim() && formData.nameEn.trim()) score += 4;

  // Slug (4)
  if (formData.slug.trim()) score += 4;

  // Description (4)
  if (formData.description.trim()) score += 4;

  // Philosophy (4)
  if (formData.philosophy.trim()) score += 4;

  // Colors (12)
  if (HEX_PATTERN.test(formData.primaryColor.trim())) score += 4;
  if (HEX_PATTERN.test(formData.secondaryColor.trim())) score += 4;
  if (formData.accentColors.filter((c) => HEX_PATTERN.test(c.trim())).length >= 2) score += 4;

  // Background/Foreground/Muted (4)
  if (HEX_PATTERN.test(formData.background.trim()) && HEX_PATTERN.test(formData.foreground.trim())) score += 4;

  // Typography (4)
  if (formData.headingFont && formData.bodyFont) score += 4;

  // Do List (8)
  const doCount = formData.doList.filter((i) => i.trim()).length;
  score += Math.min(8, Math.round(doCount * 2.67));

  // Don't List (8)
  const dontCount = formData.dontList.filter((i) => i.trim()).length;
  score += Math.min(8, Math.round(dontCount * 2.67));

  // AI Rules (8)
  const aiCount = formData.aiRules.filter((i) => i.trim()).length;
  score += Math.min(8, Math.round(aiCount * 2.67));

  // Keywords (4)
  score += Math.min(4, Math.round(formData.keywords.length * 1.33));

  // Core Components (12) - button/card/input
  if (formData.buttonCode.trim()) score += 4;
  if (formData.cardCode.trim()) score += 4;
  if (formData.inputCode.trim()) score += 4;

  // Extended Components (20) - nav/hero/footer
  if (formData.navCode.trim()) score += 7;
  if (formData.heroCode.trim()) score += 7;
  if (formData.footerCode.trim()) score += 6;

  return Math.min(100, Math.round(score));
}

function gradeFromScore(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export function PreviewValidateStep({ formData, manifestCoverSvg, isAnimating, onGoToStep }: PreviewValidateStepProps) {
  const issues = useMemo(() => validateSubmission(formData), [formData]);
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  const score = useMemo(() => computeCompletenessScore(formData), [formData]);
  const grade = gradeFromScore(score);
  const isValid = errors.length === 0;

  return (
    <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      {/* Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border border-border bg-background text-center">
          <p className="text-xs text-muted mb-1">Quality Score</p>
          <p className="text-4xl font-bold">{score}</p>
          <p className="text-sm text-muted">/100</p>
        </div>
        <div className="p-6 border border-border bg-background text-center">
          <p className="text-xs text-muted mb-1">Grade</p>
          <p className={`text-4xl font-bold ${
            grade === "A" ? "text-green-600" :
            grade === "B" ? "text-blue-600" :
            grade === "C" ? "text-amber-600" :
            "text-red-600"
          }`}>
            {grade}
          </p>
        </div>
        <div className="p-6 border border-border bg-background text-center">
          <p className="text-xs text-muted mb-1">Status</p>
          {isValid ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Check className="w-6 h-6" />
              <span className="text-lg font-medium">Ready</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-red-600">
              <X className="w-6 h-6" />
              <span className="text-lg font-medium">{errors.length} Error{errors.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
      </div>

      {/* Component Coverage */}
      <div className="border border-border">
        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
          <p className="text-sm font-medium">Component Coverage</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-border">
          {([
            ["Button", formData.buttonCode],
            ["Card", formData.cardCode],
            ["Input", formData.inputCode],
            ["Nav", formData.navCode],
            ["Hero", formData.heroCode],
            ["Footer", formData.footerCode],
          ] as const).map(([label, code]) => (
            <div key={label} className="p-3 text-center">
              <p className="text-xs text-muted mb-1">{label}</p>
              {code.trim() ? (
                <Check className="w-4 h-4 text-green-600 mx-auto" />
              ) : (
                <X className="w-4 h-4 text-zinc-300 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Validation Issues */}
      {issues.length > 0 && (
        <div className="border border-border">
          <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
            <p className="text-sm font-medium">Validation Results</p>
          </div>
          <div className="divide-y divide-border">
            {errors.map((issue, i) => {
              const targetStep = fieldToStep(issue.field);
              return (
                <div key={`e-${i}`} className="flex items-center gap-3 px-4 py-3">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-sm font-medium w-32 shrink-0">{issue.field}</span>
                  <span className="text-sm text-muted flex-1">{issue.message}</span>
                  {onGoToStep && targetStep != null && (
                    <button
                      type="button"
                      onClick={() => onGoToStep(targetStep)}
                      className="text-xs text-muted underline underline-offset-2 hover:text-foreground transition-colors shrink-0"
                    >
                      Step {targetStep}
                    </button>
                  )}
                </div>
              );
            })}
            {warnings.map((issue, i) => {
              const targetStep = fieldToStep(issue.field);
              return (
                <div key={`w-${i}`} className="flex items-center gap-3 px-4 py-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-sm font-medium w-32 shrink-0">{issue.field}</span>
                  <span className="text-sm text-muted flex-1">{issue.message}</span>
                  {onGoToStep && targetStep != null && (
                    <button
                      type="button"
                      onClick={() => onGoToStep(targetStep)}
                      className="text-xs text-muted underline underline-offset-2 hover:text-foreground transition-colors shrink-0"
                    >
                      Step {targetStep}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cover SVG Preview */}
      {manifestCoverSvg && (
        <div className="border border-border">
          <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
            <p className="text-sm font-medium">Cover Preview</p>
          </div>
          <div className="p-4 flex justify-center">
            <div
              className="w-full max-w-lg aspect-[1200/630] border border-border overflow-hidden"
              dangerouslySetInnerHTML={{ __html: manifestCoverSvg }}
            />
          </div>
        </div>
      )}

      {/* Live Preview */}
      <div className="border border-border">
        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
          <p className="text-sm font-medium">Live Preview</p>
        </div>
        <div
          className="p-8"
          style={{
            backgroundColor: formData.background || "#ffffff",
            color: formData.foreground || "#0f172a",
            fontFamily: formData.bodyFont || "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Sample Card */}
          <div
            className="max-w-md mx-auto p-6 border"
            style={{
              borderColor: formData.primaryColor || "#000",
              borderRadius: formData.borderRadius || "0.5rem",
              backgroundColor: formData.background || "#ffffff",
            }}
          >
            <h3
              style={{
                fontFamily: formData.headingFont || "system-ui, -apple-system, sans-serif",
                fontSize: formData.fontSizeHeading || "1.5rem",
                fontWeight: Number(formData.fontWeightBold) || 700,
                lineHeight: formData.lineHeightTight || "1.25",
                color: formData.foreground || "#0f172a",
                marginBottom: formData.spacingSm || "0.5rem",
              }}
            >
              {formData.nameEn || formData.name || "Style Name"}
            </h3>
            <p
              style={{
                fontSize: formData.fontSizeBase || "1rem",
                lineHeight: formData.lineHeightNormal || "1.5",
                color: formData.muted || "#64748b",
                marginBottom: formData.spacingMd || "1rem",
              }}
            >
              {formData.description || "A sample card demonstrating this style's visual identity."}
            </p>
            <div className="flex gap-3">
              <button
                style={{
                  backgroundColor: formData.primaryColor || "#000",
                  color: formData.background || "#fff",
                  padding: `${formData.spacingSm || "0.5rem"} ${formData.spacingMd || "1rem"}`,
                  borderRadius: formData.borderRadius || "0.5rem",
                  fontWeight: Number(formData.fontWeightBold) || 700,
                  fontSize: formData.fontSizeBase || "1rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Primary
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: formData.primaryColor || "#000",
                  padding: `${formData.spacingSm || "0.5rem"} ${formData.spacingMd || "1rem"}`,
                  borderRadius: formData.borderRadius || "0.5rem",
                  border: `1px solid ${formData.primaryColor || "#000"}`,
                  fontSize: formData.fontSizeBase || "1rem",
                  cursor: "pointer",
                }}
              >
                Secondary
              </button>
            </div>
          </div>

          {/* Color Palette Strip */}
          <div className="flex h-8 mt-6 max-w-md mx-auto overflow-hidden" style={{ borderRadius: formData.borderRadius || "0.5rem" }}>
            <div className="flex-1" style={{ backgroundColor: formData.primaryColor }} />
            <div className="flex-1" style={{ backgroundColor: formData.secondaryColor }} />
            {formData.accentColors.map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
            <div className="flex-1" style={{ backgroundColor: formData.muted }} />
          </div>
        </div>
      </div>
    </div>
  );
}
