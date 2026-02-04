"use client";

import { useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Download, Loader2 } from "lucide-react";
import type { TemplateType, OutputFormat } from "@/lib/generator/types";

interface PreviewStepProps {
  previewHtml: string;
  styleName: string;
  templateType: TemplateType;
  outputFormat: OutputFormat;
  isDownloading: boolean;
  onDownload: () => void;
}

export function PreviewStep({
  previewHtml,
  styleName,
  templateType,
  outputFormat,
  isDownloading,
  onDownload,
}: PreviewStepProps) {
  const { t } = useI18n();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Write preview HTML to iframe
  useEffect(() => {
    if (iframeRef.current && previewHtml) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(previewHtml);
        doc.close();
      }
    }
  }, [previewHtml]);

  const formatLabel = outputFormat === "react" ? t("generator.reactFormat") : t("generator.htmlFormat");

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-xl md:text-2xl mb-2">{t("generator.preview")}</h2>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{styleName}</span>
            <span>/</span>
            <span>{templateType === "landing" ? t("generator.landing") : templateType === "portfolio" ? t("generator.portfolio") : templateType}</span>
            <span>/</span>
            <span>{formatLabel}</span>
          </div>
        </div>

        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50"
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isDownloading ? t("generator.downloading") : t("generator.download")}
        </button>
      </div>

      {/* Preview Frame */}
      <div className="border border-border bg-white overflow-hidden" style={{ height: "70vh" }}>
        <iframe
          ref={iframeRef}
          title="Full Preview"
          className="w-full h-full"
          sandbox="allow-same-origin"
          style={{ border: "none" }}
        />
      </div>

      {/* Info */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 border border-border">
          <p className="text-xs tracking-widest uppercase text-muted mb-1">
            {t("generator.outputFormat")}
          </p>
          <p>{outputFormat === "react" ? t("generator.reactFormatDesc") : t("generator.htmlFormatDesc")}</p>
        </div>
        <div className="p-4 border border-border">
          <p className="text-xs tracking-widest uppercase text-muted mb-1">
            {t("generator.step1")}
          </p>
          <p>{styleName}</p>
        </div>
        <div className="p-4 border border-border">
          <p className="text-xs tracking-widest uppercase text-muted mb-1">
            {t("generator.step2")}
          </p>
          <p>{templateType === "landing" ? t("generator.landing") : templateType === "portfolio" ? t("generator.portfolio") : templateType}</p>
        </div>
      </div>
    </div>
  );
}
