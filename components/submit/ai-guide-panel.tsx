"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check, ClipboardList, AlertTriangle } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";
import { submitCopy } from "@/lib/i18n/submit-copy";

const MASTER_PROMPT = `You are generating a StyleKit style submission manifest.

# Output
Output ONE fenced JSON block containing the complete manifest.json object.
No commentary, no extra files, no markdown outside the JSON block.

\`\`\`json
{ ... }
\`\`\`

# Schema (strict)

{
  "schemaVersion": "1.0.0",
  "generatedAt": "<ISO 8601 datetime>",
  "source": {
    "assistant": "claude" | "chatgpt" | "cursor" | "manual" | "other",
    "model": "<model name>",
    "notes": "<optional brief note>"
  },
  "formData": {
    "name": "<Chinese name>",
    "nameEn": "<English name>",
    "slug": "<kebab-case, ^[a-z0-9]+(?:-[a-z0-9]+)*$>",
    "description": "<1-2 sentence description>",
    "category": "modern" | "retro" | "minimal" | "expressive",
    "styleType": "visual" | "layout" | "animation",
    "tags": ["modern", "minimal", "expressive", "retro", "high-contrast", "responsive", "brand-inspired"],
    "primaryColor": "#hex",
    "secondaryColor": "#hex",
    "accentColors": ["#hex", "#hex"],
    "background": "#hex",
    "foreground": "#hex",
    "muted": "#hex",
    "keywords": ["keyword1", "keyword2", ...],  // 5+ recommended
    "philosophy": "<design philosophy statement>",
    "headingFont": "<CSS font-family>",
    "bodyFont": "<CSS font-family>",
    "fontSizeBase": "1rem",
    "fontSizeHeading": "2.25rem",
    "fontSizeSmall": "0.875rem",
    "fontWeightNormal": "400",
    "fontWeightBold": "700",
    "lineHeightNormal": "1.5",
    "lineHeightTight": "1.25",
    "borderRadius": "0.5rem",
    "spacingSm": "0.5rem",
    "spacingMd": "1rem",
    "spacingLg": "2rem",
    "doList": ["rule1", "rule2", "rule3"],      // 3+ required
    "dontList": ["rule1", "rule2", "rule3"],     // 3+ required
    "aiRules": ["rule1", "rule2", "rule3"],      // 3+ required, actionable
    "buttonCode": "<JSX string>",
    "cardCode": "<JSX string>",
    "inputCode": "<JSX string>",
    "navCode": "<JSX string>",       // recommended
    "heroCode": "<JSX string>",      // recommended
    "footerCode": "<JSX string>"     // recommended
  },
  "assets": {
    "coverSvg": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 1200 630\\" ...>...</svg>"
  },
  "selfCheck": {
    "schemaValid": true,
    "requiredFilesPrepared": ["manifest.json", "cover.svg", "self-check.md"],
    "componentCoverage": ["buttonCode", "cardCode", "inputCode", "navCode", "heroCode", "footerCode"],
    "notes": "<quality assessment>"
  }
}

# Component Quality Rules

ALL component code must be self-contained JSX/HTML with Tailwind CSS classes.
No imports, no React hooks, no external dependencies.

## buttonCode
- Must include: background color, text color, padding, font weight
- Must include hover state (hover:...) and active state (active:...)
- Must include transition or intentional transition-none
- Text should be descriptive (not just "Click")

## cardCode
- Must include: background, border or shadow, padding, heading, body text
- Heading and body must use different font sizes/weights
- Must show clear visual hierarchy

## inputCode
- Must include: width (w-full), padding, border, background
- Must include focus state (focus:...)
- Must include placeholder text

## navCode (recommended)
- Must be a full navigation bar with brand/logo area and links
- Must use the style's color palette consistently
- Should include hover states on links

## heroCode (recommended)
- Must be a full-width hero section with heading, subtitle, and CTA button
- Heading should use fontSizeHeading or larger
- CTA button must match buttonCode visual language

## footerCode (recommended)
- Must include brand area and secondary content
- Must use muted/secondary colors appropriately
- Should complement the navCode visually

# Color Consistency Rules

- buttonCode background MUST use primaryColor or a color from accentColors
- cardCode border/accent MUST reference primaryColor or secondaryColor
- All components MUST use the same foreground/background/muted palette
- Never use arbitrary colors not defined in the color fields

# coverSvg Rules

- viewBox MUST be "0 0 1200 630" (OG image aspect ratio)
- Content MUST be visually centered (use text-anchor="middle" or x="50%")
- Must include the style name as prominent text
- Background must use the style's background color or a gradient from the palette
- Decorative elements must reflect the style language (e.g., grid lines for swiss, glitch effects for cyberpunk)
- Do NOT left-align all content at x="72" - center the composition

# doList / dontList / aiRules Quality

- Each entry must be specific and actionable
- Reference actual Tailwind classes when possible
  Good: "Use border-2 border-black on all interactive elements"
  Bad:  "Make things look bold"
- aiRules are instructions for AI code generators - they must be precise enough that an AI can follow them to produce correct component code
- Include at least one aiRules entry about color usage
- Include at least one aiRules entry about hover/interaction states
- Include at least one aiRules entry about typography hierarchy

# Common Mistakes to Avoid

- Do NOT add fields not in the schema (no "globalCss", no "tokens", no extra nesting)
- Do NOT use RGB/HSL colors - only hex (#000000 or #000)
- Do NOT leave any component code empty if listed in componentCoverage
- Do NOT use placeholder text like "Lorem ipsum" or "TODO"
- Do NOT mix visual languages (e.g., rounded corners in a brutalist style)
- Ensure slug does not conflict with existing styles`;

interface AiGuidePanelProps {
  locale: Locale;
  defaultOpen?: boolean;
}

export function AiGuidePanel({ locale, defaultOpen }: AiGuidePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<"claude" | "chatgpt" | "cursor">("claude");
  const copy = submitCopy[locale];

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(MASTER_PROMPT);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      // Clipboard API may fail in certain environments
    }
  };

  return (
    <div className="border border-border bg-background">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-foreground/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4" />
          <span className="text-sm font-medium">{copy.aiGuide.title}</span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {isOpen ? (
        <div className="px-4 pb-4 space-y-5 border-t border-border pt-4">
          {/* Master Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">{copy.aiGuide.subtitle}</p>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3 h-3" />
                    {copy.aiGuide.copied}
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    {copy.aiGuide.copyPrompt}
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-border text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
              {MASTER_PROMPT}
            </pre>
          </div>

          {/* Input Checklist */}
          <div>
            <p className="text-sm font-medium mb-2">{copy.aiGuide.inputChecklist}</p>
            <ul className="space-y-1.5">
              {copy.aiGuide.inputChecklistItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted">
                  <span className="text-foreground mt-0.5 shrink-0">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistant-Specific Tabs */}
          <div>
            <p className="text-sm font-medium mb-2">{copy.aiGuide.assistantTips}</p>
            <div className="flex gap-1 mb-2">
              {(["claude", "chatgpt", "cursor"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    activeTab === tab
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {tab === "claude" ? "Claude" : tab === "chatgpt" ? "ChatGPT" : "Cursor"}
                </button>
              ))}
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-border text-xs">
              {activeTab === "claude" && copy.aiGuide.claudeTip}
              {activeTab === "chatgpt" && copy.aiGuide.chatgptTip}
              {activeTab === "cursor" && copy.aiGuide.cursorTip}
            </div>
          </div>

          {/* Common Failure Modes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-medium">{copy.aiGuide.commonErrors}</p>
            </div>
            <ul className="space-y-1.5">
              {copy.aiGuide.commonErrorItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted">
                  <span className="text-red-500 mt-0.5 shrink-0">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
