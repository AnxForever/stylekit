"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/lib/i18n/context";
import type { DesignStyle } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateStylePack, downloadFile, downloadAllAsZip, type StylePackFile } from "@/lib/export/style-pack";
import { generateSkillPack, getSkillPackFileInfo } from "@/lib/export/skill-pack";
import { Download, Check, Package, FileJson, FileCode, Palette, Code2, Copy, BookOpen, X } from "lucide-react";

interface StylePackExportProps {
  style: DesignStyle;
}

const iconMap: Record<string, React.ReactNode> = {
  tokens: <FileJson className="w-5 h-5" />,
  tailwind: <Code2 className="w-5 h-5" />,
  css: <FileCode className="w-5 h-5" />,
  shadcn: <Palette className="w-5 h-5" />,
  variables: <FileCode className="w-5 h-5" />,
  skill: <BookOpen className="w-5 h-5" />,
};

export function StylePackExport({ style }: StylePackExportProps) {
  const { t, locale } = useI18n();
  const tokens = getStyleTokens(style.slug);
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<StylePackFile | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // For portal rendering
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valid hydration pattern
    setMounted(true);
  }, []);

  const files = useMemo(() => {
    const packFiles = generateStylePack(style, tokens);
    const skillPackInfo = getSkillPackFileInfo(style);
    const skillPackContent = generateSkillPack({ style, tokens });

    // Add SKILL.md to files array
    const skillFile: StylePackFile = {
      name: skillPackInfo.name,
      filename: skillPackInfo.filename,
      description: skillPackInfo.description,
      descriptionEn: skillPackInfo.descriptionEn,
      content: skillPackContent,
      mimeType: "text/markdown",
      icon: "skill",
    };

    return [...packFiles, skillFile];
  }, [style, tokens]);

  const handleDownload = (file: StylePackFile) => {
    downloadFile(file);
    setDownloadedFiles((prev) => new Set([...prev, file.filename]));
  };

  const handleDownloadAll = () => {
    downloadAllAsZip(style, tokens);
    setDownloadedFiles(new Set(files.map((file) => file.filename)));
  };

  const handleCopyContent = async () => {
    if (!previewFile) return;
    await navigator.clipboard.writeText(previewFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* File Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
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
                onClick={() => handleDownload(file)}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
              >
                {downloadedFiles.has(file.filename) ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Download className="w-3 h-3" />
                )}
              </button>
              <button
                onClick={() => setPreviewFile(file)}
                className="flex-1 px-2 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
              >
                {t("stylePack.preview")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Download All */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadAll}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
        >
          <Package className="w-4 h-4" />
          {t("stylePack.downloadAll")}
        </button>
      </div>

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
                <p className="text-xs tracking-widest uppercase text-muted mb-1">Preview</p>
                <p className="font-medium">{previewFile.name}</p>
                <p className="text-xs text-muted">{previewFile.filename}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyContent}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                >
                  {copied ? (
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
                  onClick={() => setPreviewFile(null)}
                  className="p-1.5 border border-border hover:border-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
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
