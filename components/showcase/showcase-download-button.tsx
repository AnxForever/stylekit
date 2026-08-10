"use client";

import { useState } from "react";
import { Check, ExternalLink, FileArchive, FileCode, LoaderCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { prepareShowcaseSnapshot } from "@/lib/export/showcase-html";
import { buildShowcasePackage } from "@/lib/export/showcase-package";
import { LocalizedLink } from "@/components/i18n/localized-link";

interface ShowcaseDownloadButtonProps {
  slug: string;
}

type DownloadState = "idle" | "downloading" | "downloaded" | "error";
type DownloadKind = "html" | "zip";

/**
 * Downloads either a self-contained-ish offline ZIP or a lightweight HTML
 * snapshot. External resources that reject browser fetching remain online.
 */
export function ShowcaseDownloadButton({ slug }: ShowcaseDownloadButtonProps) {
  const { t } = useI18n();
  const [state, setState] = useState<DownloadState>("idle");

  async function handleDownload(kind: DownloadKind) {
    if (state === "downloading") return;

    setState("downloading");
    trackEvent("style_export", { slug, format: `showcase-${kind}` });

    try {
      const response = await fetch(`/styles/${encodeURIComponent(slug)}/showcase`, {
        headers: { Accept: "text/html" },
      });

      if (!response.ok) {
        throw new Error(`Showcase request failed with ${response.status}`);
      }

      const html = await response.text();
      const baseHref = `${window.location.origin}/`;
      const blob =
        kind === "zip"
          ? (await buildShowcasePackage(html, window.location.origin)).blob
          : new Blob([prepareShowcaseSnapshot(html, baseHref)], {
              type: "text/html;charset=utf-8",
            });

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${slug}-showcase.${kind === "zip" ? "zip" : "html"}`;
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
        onClick={() => handleDownload("zip")}
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
      <button
        type="button"
        onClick={() => handleDownload("html")}
        disabled={state === "downloading"}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-border px-4 py-3 text-sm tracking-wide text-muted transition-colors hover:border-foreground hover:text-foreground disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <FileCode className="h-4 w-4" aria-hidden="true" />
        {t("styleDetail.downloadShowcaseHtml")}
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
