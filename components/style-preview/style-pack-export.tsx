"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/lib/i18n/context";
import type { DesignStyle } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateStylePack, downloadFile, downloadAllAsZip, type StylePackFile } from "@/lib/export/style-pack";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { Download, Check, Package, FileJson, FileCode, Palette, Code2, Copy, BookOpen, X } from "lucide-react";

interface StylePackExportProps {
  style: DesignStyle;
  version?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  tokens: <FileJson className="w-5 h-5" />,
  tailwind: <Code2 className="w-5 h-5" />,
  css: <FileCode className="w-5 h-5" />,
  shadcn: <Palette className="w-5 h-5" />,
  variables: <FileCode className="w-5 h-5" />,
  skill: <BookOpen className="w-5 h-5" />,
};

export function StylePackExport({ style, version }: StylePackExportProps) {
  const { t, locale } = useI18n();
  const tokens = getStyleTokens(style.slug);
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<StylePackFile | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { copy, result: clipboardResult, isCopied } = useClipboard({ copiedDuration: 2000 });

  // For portal rendering
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valid hydration pattern
    setMounted(true);
  }, []);

  const files = useMemo(() => {
    return generateStylePack(style, tokens, { version });
  }, [style, tokens, version]);

  const handleDownload = (file: StylePackFile) => {
    downloadFile(file);
    setDownloadedFiles((prev) => new Set([...prev, file.filename]));
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    setDownloadFailed(false);
    try {
      await downloadAllAsZip(style, tokens, { version });
      setDownloadedFiles(new Set(files.map((file) => file.filename)));
    } catch {
      setDownloadFailed(true);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyContent = async () => {
    if (!previewFile) return;
    await copy(previewFile.content, previewFile.filename);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {locale === "zh"
            ? `${files.length} 个风格文件，包含 SKILL.md。`
            : `${files.length} style files, including SKILL.md.`}
        </p>
        <button
          type="button"
          onClick={handleDownloadAll}
          disabled={isDownloading}
          aria-busy={isDownloading}
          className="flex min-h-11 items-center gap-2 px-4 py-2 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors disabled:opacity-60"
        >
          <Package className="w-4 h-4" />
          {isDownloading ? (locale === "zh" ? "正在打包…" : "Preparing ZIP…") : t("stylePack.downloadAll")}
        </button>
      </div>
      {downloadFailed && (
        <p role="alert" className="mt-3 text-sm text-foreground">
          {locale === "zh" ? "打包失败，请重试或展开下方列表逐个下载。" : "Could not prepare the ZIP. Try again or download the files individually below."}
        </p>
      )}

      <details className="mt-5 border border-border">
        <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {locale === "zh" ? "逐个预览或下载文件" : "Preview or download individual files"}
        </summary>
        <div className="border-t border-border p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <div
                key={file.filename}
                className="border border-border p-4 hover:border-foreground transition-colors"
              >
                <div className="flex items-center gap-2 mb-2 text-muted">
                  {iconMap[file.icon] || <Package className="w-5 h-5" />}
                </div>
                <p className="font-medium text-sm mb-1">{file.name}</p>
                <p className="text-xs text-muted mb-3 line-clamp-2">
                  {locale === "zh" ? file.description : file.descriptionEn}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(file)}
                    aria-label={locale === "zh" ? `下载 ${file.name}` : `Download ${file.name}`}
                    className="flex-1 flex min-h-10 items-center justify-center gap-1 px-2 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                  >
                    {downloadedFiles.has(file.filename) ? (
                      <Check className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <Download className="w-3 h-3" aria-hidden="true" />
                    )}
                    <span>{locale === "zh" ? "下载" : "Download"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewFile(file)}
                    className="flex-1 min-h-10 px-2 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                  >
                    {t("stylePack.preview")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </details>

      {/* Preview Modal - rendered via Portal to body */}
      {mounted && previewFile && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewFile(null);
          }}
        >
          <div className="w-full max-w-3xl max-h-[80vh] bg-background border border-border flex flex-col shadow-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-1">
                  {locale === "zh" ? "预览" : "Preview"}
                </p>
                <p className="font-medium">{previewFile.name}</p>
                <p className="text-xs text-muted">{previewFile.filename}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyContent}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                >
                  {isCopied(previewFile.filename, previewFile.content) ? (
                    <>
                      <Check className="w-3 h-3" />
                      {t("export.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      {t("export.copy")}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewFile(null)}
                  className="p-1.5 border border-border hover:border-foreground transition-colors"
                  aria-label={locale === "zh" ? "关闭预览" : "Close preview"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ClipboardFeedback
              result={clipboardResult?.id === previewFile.filename ? clipboardResult : null}
              locale={locale}
              currentText={previewFile.content}
              className="mx-6 mt-4 mb-0"
            />
            <div className="flex-1 overflow-auto p-6">
              <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
                {previewFile.content}
              </pre>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
