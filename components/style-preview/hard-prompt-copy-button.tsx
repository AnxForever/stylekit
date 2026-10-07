"use client";

import { Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";
import type { Locale } from "@/lib/i18n/translations";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";

interface HardPromptCopyButtonProps {
  content: string;
  locale: Locale;
  slug: string;
}

export function HardPromptCopyButton({ content, locale, slug }: HardPromptCopyButtonProps) {
  const { copy, result, isCopied } = useClipboard({ copiedDuration: 2000 });
  const copied = isCopied(slug, content);
  const label = copied
    ? locale === "zh"
      ? "已复制硬性提示词"
      : "Hard Prompt Copied"
    : locale === "zh" ? "复制硬性提示词" : "Copy Hard Prompt";

  const handleCopy = async () => {
    if (await copy(content, slug)) {
      trackEvent("code_copy", { slug, language: "hard" });
    }
  };

  return (
    <div className="min-w-0 max-w-full">
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
      <ClipboardFeedback
        result={result?.state === "failed" && result.id === slug && result.text === content ? result : null}
        locale={locale}
        className="mt-3 mb-0"
      />
    </div>
  );
}
