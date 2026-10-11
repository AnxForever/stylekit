"use client";

import { useRef, useState } from "react";
import type { DesignStyle } from "@/lib/styles";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface StylePackDownloadButtonProps {
  style: DesignStyle;
  version?: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onDownloaded?: () => void;
}

/** Load the style registry and ZIP implementation only after a download is requested. */
export async function downloadStylePackZip(style: DesignStyle, version?: string): Promise<void> {
  const [{ downloadAllAsZip }, { getStyleTokens }] = await Promise.all([
    import("@/lib/export/style-pack"),
    import("@/lib/styles/tokens-registry"),
  ]);

  await downloadAllAsZip(style, getStyleTokens(style.slug), { version });
}

export function StylePackDownloadButton({
  style,
  version,
  label,
  variant = "primary",
  className,
  onDownloaded,
}: StylePackDownloadButtonProps) {
  const { locale, t } = useI18n();
  const [state, setState] = useState<"idle" | "downloading" | "downloaded" | "failed">("idle");
  const downloadInProgress = useRef(false);

  const handleDownload = async () => {
    if (downloadInProgress.current) return;
    downloadInProgress.current = true;
    setState("downloading");

    try {
      await downloadStylePackZip(style, version);
      setState("downloaded");
      onDownloaded?.();
    } catch {
      setState("failed");
    } finally {
      downloadInProgress.current = false;
    }
  };

  const buttonLabel = state === "downloading"
    ? locale === "zh" ? "正在打包…" : "Preparing ZIP…"
    : state === "downloaded"
      ? locale === "zh" ? "下载已开始" : "Download started"
      : label ?? t("stylePack.downloadAll");

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={handleDownload}
        disabled={state === "downloading"}
        aria-busy={state === "downloading"}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 border px-5 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-wait disabled:opacity-60",
          variant === "primary"
            ? "border-foreground bg-foreground text-background hover:bg-foreground/90"
            : "border-border bg-background text-foreground hover:border-foreground",
          className,
        )}
      >
        <Package className="h-4 w-4" aria-hidden="true" />
        <span aria-live="polite" aria-atomic="true">{buttonLabel}</span>
      </button>
      {state === "failed" && (
        <p role="alert" className="mt-3 text-sm text-foreground">
          {locale === "zh"
            ? "风格包打包失败，请重试或展开下方列表逐个下载。"
            : "Could not prepare the style pack. Try again or download files individually below."}
        </p>
      )}
    </div>
  );
}