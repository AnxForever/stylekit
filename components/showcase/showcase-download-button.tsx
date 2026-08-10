"use client";

import { useState } from "react";
import { Check, Download, LoaderCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { prepareShowcaseSnapshot } from "@/lib/export/showcase-html";

interface ShowcaseDownloadButtonProps {
  slug: string;
}

type DownloadState = "idle" | "downloading" | "downloaded" | "error";

/**
 * Downloads the rendered showcase as a static HTML snapshot. The base URL keeps
 * the page's existing fonts, images, and CSS resolving when the file is opened.
 */
export function ShowcaseDownloadButton({ slug }: ShowcaseDownloadButtonProps) {
  const { t } = useI18n();
  const [state, setState] = useState<DownloadState>("idle");

  async function handleDownload() {
    if (state === "downloading") return;

    setState("downloading");
    trackEvent("style_export", { slug, format: "showcase-html" });

    try {
      const response = await fetch(`/styles/${encodeURIComponent(slug)}/showcase`, {
        headers: { Accept: "text/html" },
      });

      if (!response.ok) {
        throw new Error(`Showcase request failed with ${response.status}`);
      }

      const html = await response.text();
      const baseHref = `${window.location.origin}/`;
      const snapshot = prepareShowcaseSnapshot(html, baseHref);

      const blob = new Blob([snapshot], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${slug}-showcase.html`;
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
    <button
      type="button"
      onClick={handleDownload}
      disabled={state === "downloading"}
      className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-border px-6 py-3 text-sm tracking-wide transition-colors hover:border-foreground disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-live="polite"
    >
      {state === "downloading" ? (
        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : state === "downloaded" ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Download className="h-4 w-4" aria-hidden="true" />
      )}
      {label}
    </button>
  );
}
