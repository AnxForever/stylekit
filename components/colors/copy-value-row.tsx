"use client";

import { useI18n } from "@/lib/i18n/context";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";

interface CopyValueProps {
  label: string;
  value: string;
}

/** One spec-sheet row: mono label, value, copy affordance. */
export function CopyValueRow({ label, value }: CopyValueProps) {
  const { locale } = useI18n();
  const { copy, isCopied, result } = useClipboard();
  const copied = isCopied(value);

  return (
    <div>
      <button
        type="button"
        onClick={() => { void copy(value, value); }}
        className="group grid w-full grid-cols-[6rem_1fr_auto] items-baseline gap-3 border-b border-white/10 py-3 text-left transition-colors duration-150 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
        aria-label={locale === "zh" ? `复制 ${label} 色值 ${value}` : `Copy ${label} value ${value}`}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
          {label}
        </span>
        <span className="min-w-0 break-words font-mono text-sm text-white/85">{value}</span>
        <span role="status" className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/65 group-hover:text-white/90">
          {locale === "zh" ? (copied ? "已复制" : "复制") : (copied ? "copied" : "copy")}
        </span>
      </button>
      <ClipboardFeedback
        result={result?.state === "failed" ? result : null}
        locale={locale}
        className="mt-2 mb-0 text-white/85"
      />
    </div>
  );
}
