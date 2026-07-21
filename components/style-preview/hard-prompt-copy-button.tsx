"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";
import type { Locale } from "@/lib/i18n/translations";

interface HardPromptCopyButtonProps {
  content: string;
  locale: Locale;
  slug: string;
}

export function HardPromptCopyButton({ content, locale, slug }: HardPromptCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const label = copied
    ? locale === "zh"
      ? "已复制硬性提示词"
      : "Hard Prompt Copied"
    : locale === "zh" ? "复制硬性提示词" : "Copy Hard Prompt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopied(true);
    trackEvent("code_copy", { slug, language: "hard" });
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-foreground px-6 py-3 text-sm tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Copy className="h-4 w-4" aria-hidden="true" />
      <span aria-live="polite" aria-atomic="true">
        {label}
      </span>
    </button>
  );
}
