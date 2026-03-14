"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import type { AnimationCodeSnippet } from "@/lib/animations/types";
import { useI18n } from "@/lib/i18n/context";

interface AnimationCodeTabsProps {
  snippets: AnimationCodeSnippet[];
}

export function AnimationCodeTabs({ snippets }: AnimationCodeTabsProps) {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const code = snippets[activeIndex]?.code;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [snippets, activeIndex]);

  if (snippets.length === 0) return null;

  const active = snippets[activeIndex];

  return (
    <div className="border border-border overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30">
        <div className="flex">
          {snippets.map((snippet, i) => (
            <button
              key={snippet.label}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                i === activeIndex
                  ? "text-foreground border-b-2 border-foreground bg-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {snippet.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 mr-1 text-xs text-muted hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              {t("animations.copied")}
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              {t("animations.copyCode")}
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <div className="bg-zinc-950 p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed">
          <code className={`language-${active?.language || "css"} text-zinc-300`}>
            {active?.code || ""}
          </code>
        </pre>
      </div>
    </div>
  );
}
