"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { DesignStyle } from "@/lib/styles";
import type { ExportFormat } from "@/lib/export/figma-tokens";
import { exportStyleTokens } from "@/lib/export/figma-tokens";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";

interface TokenCopyButtonProps {
  style: DesignStyle;
  format: ExportFormat;
  label: string;
}

/**
 * One click, one clipboard payload.
 *
 * The tokens used to open a dialog with a format picker, a preview pane and a
 * second copy button inside it. The payload is a few hundred bytes; the reader
 * came here to paste it somewhere, so this copies it and says so.
 */
export function TokenCopyButton({ style, format, label }: TokenCopyButtonProps) {
  const { locale } = useI18n();
  const { copy } = useClipboard({ copiedDuration: 2000 });
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copy(exportStyleTokens(style, format), `tokens:${format}`);
    trackEvent("style_export", { slug: style.slug, format });
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="inline-flex min-h-11 items-center gap-2 border border-border px-4 py-2 text-sm tracking-wide transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {copied ? (
        <Check className="h-4 w-4 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? (locale === "zh" ? "已复制" : "Copied") : label}
    </button>
  );
}
