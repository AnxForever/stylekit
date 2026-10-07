"use client";

import type { ClipboardResult } from "@/lib/hooks/use-clipboard";
import { cn } from "@/lib/utils";

type ClipboardFeedbackProps = {
  result: ClipboardResult | null;
  locale: "zh" | "en";
  className?: string;
  currentText?: string;
};

export function ClipboardFeedback({ result, locale, className, currentText }: ClipboardFeedbackProps) {
  if (!result) return null;
  if (result.state === "copied" && currentText !== undefined && result.text !== currentText) {
    return null;
  }

  const zh = locale === "zh";
  const isFailure = result.state === "failed";

  return (
    <div
      className={cn(
        "mb-6 border px-4 py-3 text-sm",
        isFailure
          ? "border-amber-500/40 bg-amber-500/[0.06] text-foreground"
          : "border-border bg-foreground/[0.025] text-muted",
        className,
      )}
      role="status"
      aria-live="polite"
      lang={zh ? "zh-CN" : "en"}
    >
      <p>
        {isFailure
          ? zh
            ? "无法访问剪贴板，请选中下方代码并手动复制。"
            : "Clipboard access failed. Select the code below and copy it manually."
          : zh
            ? "已复制到剪贴板。"
            : "Copied to clipboard."}
      </p>
      {isFailure && (
        <label className="mt-2 block">
          <span className="sr-only">
            {zh ? "需要手动复制的代码" : "Code to copy manually"}
          </span>
          <textarea
            readOnly
            rows={4}
            value={result.text}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-2 block max-h-48 min-h-20 w-full resize-y select-text border border-border bg-background px-3 py-2 font-mono text-xs leading-relaxed text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={zh ? "需要手动复制的代码" : "Code to copy manually"}
          />
          <span className="mt-1 block text-xs opacity-80">
            {zh ? "点击文本框即可全选。" : "Focus the field to select all text."}
          </span>
        </label>
      )}
    </div>
  );
}
