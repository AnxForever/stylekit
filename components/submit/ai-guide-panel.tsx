"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check, ClipboardList, AlertTriangle } from "lucide-react";
import type { Locale } from "@/lib/i18n/translations";
import { submitCopy } from "@/lib/i18n/submit-copy";

const MASTER_PROMPT = `You are generating a StyleKit style submission package.

You MUST output exactly three artifacts:
1) manifest.json
2) cover.svg
3) self-check.md

Constraints:
- manifest.json MUST follow this JSON schema:
  schemas/style-submission-manifest.schema.json
- slug must match ^[a-z0-9]+(?:-[a-z0-9]+)*$
- colors must be valid hex
- doList and dontList must each contain at least one non-empty entry
- include buttonCode, cardCode, inputCode
- do not add unknown fields

Required manifest.json fields:
- name (string): Style display name in Chinese
- nameEn (string): Style display name in English
- slug (string): URL-safe identifier, ^[a-z0-9]+(?:-[a-z0-9]+)*$
- description (string): Brief style description
- category: "modern" | "minimal" | "expressive" | "retro"
- styleType: "visual" | "layout" | "animation"
- tags: array of style tags
- primaryColor (hex): Main brand color
- secondaryColor (hex): Secondary/background color
- accentColors (hex[]): Additional accent colors
- doList (string[]): Design rules to follow (min 1)
- dontList (string[]): Anti-patterns to avoid
- buttonCode (string): HTML/JSX code for button component
- cardCode (string): HTML/JSX code for card component
- inputCode (string): HTML/JSX code for input component

Output format:
- Return three fenced blocks in this exact order:
  1) \`\`\`json (manifest.json)
  2) \`\`\`svg (cover.svg)
  3) \`\`\`md (self-check.md)
- Do not include any text outside these three blocks.`;

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

      {isOpen && (
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
      )}
    </div>
  );
}
