"use client";

import { useState } from "react";
import { Check, ExternalLink, FileArchive, LoaderCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { LocalizedLink } from "@/components/i18n/localized-link";

interface ShowcaseDownloadButtonProps {
  slug: string;
}

type DownloadState = "idle" | "downloading" | "downloaded" | "error";

/**
 * Downloads either a complete offline ZIP or a lightweight HTML snapshot.
 */
export function ShowcaseDownloadButton({ slug }: ShowcaseDownloadButtonProps) {
  const { t } = useI18n();
  const [state, setState] = useState<DownloadState>("idle");

  async function handleDownload() {
    if (state === "downloading") return;

    setState("downloading");
    trackEvent("style_export", { slug, format: "showcase-zip" });

    try {
      const response = await fetch(
        `/api/styles/${encodeURIComponent(slug)}/showcase/download`,
      );
      if (!response.ok) {
        throw new Error(`Showcase export failed with ${response.status}`);
      }
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${slug}-showcase.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      // Give the browser time to start the download before releasing the blob.
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setState("downloaded");
      window.setTimeout(() => setState("idle"), 2400);
    } catch {
      setState("error");
    }
  }

  const label =
    state === "downloading"
      ? t("styleDetail.downloadingShowcase")
      : state === "downloaded"
        ? t("styleDetail.showcaseDownloaded")
        : state === "error"
          ? t("styleDetail.showcaseDownloadError")
          : t("styleDetail.downloadShowcase");

  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      <button
        type="button"
        onClick={handleDownload}
        disabled={state === "downloading"}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-border px-6 py-3 text-sm tracking-wide transition-colors hover:border-foreground disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {state === "downloading" ? (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : state === "downloaded" ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FileArchive className="h-4 w-4" aria-hidden="true" />
        )}
        {label}
      </button>
      <LocalizedLink
        href={`/styles/${slug}/showcase`}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 px-3 py-3 text-sm text-muted underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        {t("styleDetail.viewShowcase")}
      </LocalizedLink>
    </div>
  );
}
