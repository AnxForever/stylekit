"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Copy, Check } from "lucide-react";
import type { AssetMeta } from "@/lib/assets/meta";

interface AssetDownloadDialogProps {
  asset: AssetMeta;
  isOpen: boolean;
  onClose: () => void;
}

export function AssetDownloadDialog({
  asset,
  isOpen,
  onClose,
}: AssetDownloadDialogProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // 防止背景滚动
  if (typeof window !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }

  const handleClose = () => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
    onClose();
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(asset.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${asset.slug}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("下载失败:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImportCode = async () => {
    const code = `import { getAssetBySlug } from "@/lib/assets";

const ${asset.slug.replace(/-/g, "_")} = getAssetBySlug("${asset.slug}");`;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usageExamples = [
    {
      title: "在按钮中使用",
      code: `<AssetButton
  asset={asset}
  assetPosition="left"
  variant="primary"
>
  点击我
</AssetButton>`,
    },
    {
      title: "作为徽章",
      code: `<AssetBadge
  asset={asset}
  label="新品"
  variant="success"
/>`,
    },
    {
      title: "页面装饰",
      code: `<AssetDecoration
  asset={asset}
  position="top-right"
  size="lg"
  rotation={-15}
/>`,
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-background border border-border shadow-lg rounded-lg flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border sticky top-0 bg-background gap-3">
          <div className="min-w-0">
            <p className="text-xs tracking-widest uppercase text-muted mb-1">
              素材详情
            </p>
            <h2 className="text-base sm:text-lg font-semibold truncate">{asset.name}</h2>
            <p className="text-xs sm:text-sm text-muted truncate">{asset.nameEn}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
          {/* Asset Preview */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-2 sm:mb-3">
              预览
            </p>
            <div className="border border-border rounded p-3 sm:p-6 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
              <Image
                src={asset.image}
                alt={asset.name}
                width={asset.size?.width ?? 240}
                height={asset.size?.height ?? 240}
                unoptimized
                className="max-w-full max-h-[150px] sm:max-h-[200px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Asset Info */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-1 sm:mb-2">
                分类
              </p>
              <p className="text-xs sm:text-sm capitalize">{asset.category}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-1 sm:mb-2">
                来源
              </p>
              <p className="text-xs sm:text-sm capitalize">{asset.source || "custom"}</p>
            </div>
            {asset.size && (
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-1 sm:mb-2">
                  尺寸
                </p>
                <p className="text-xs sm:text-sm">
                  {asset.size.width} × {asset.size.height}px
                </p>
              </div>
            )}
            {asset.colors && asset.colors.length > 0 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-1 sm:mb-2">
                  颜色
                </p>
                <div className="flex gap-1.5">
                  {asset.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {asset.tags.length > 0 && (
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2 sm:mb-3">
                标签
              </p>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-muted uppercase tracking-wider rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1 sm:mb-2">
              描述
            </p>
            <p className="text-xs sm:text-sm text-muted">{asset.description}</p>
          </div>

          {/* Use Cases */}
          {asset.useCases && asset.useCases.length > 0 && (
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2 sm:mb-3">
                使用场景
              </p>
              <ul className="space-y-1">
                {asset.useCases.map((useCase, i) => (
                  <li key={i} className="text-xs sm:text-sm text-muted flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Usage Examples */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-2 sm:mb-3">
              使用示例
            </p>
            <div className="space-y-3 sm:space-y-4">
              {usageExamples.map((example, i) => (
                <div key={i} className="border border-border rounded p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-medium mb-2">{example.title}</p>
                  <pre className="bg-zinc-900 text-zinc-100 p-2 sm:p-3 rounded text-xs overflow-x-auto max-h-[120px] overflow-y-auto">
                    {example.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Import Code */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-2 sm:mb-3">
              导入代码
            </p>
            <div className="border border-border rounded p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-900">
              <pre className="text-xs overflow-x-auto mb-2 sm:mb-3 max-h-[100px] overflow-y-auto">
                {`import { getAssetBySlug } from "@/lib/assets";

const ${asset.slug.replace(/-/g, "_")} = getAssetBySlug("${asset.slug}");`}
              </pre>
              <button
                onClick={handleCopyImportCode}
                className="inline-flex items-center gap-2 px-2 sm:px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors rounded w-full sm:w-auto justify-center sm:justify-start"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-border sticky bottom-0 bg-background">
          <button
            onClick={handleClose}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-border hover:border-foreground transition-colors rounded"
          >
            关闭
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors rounded"
          >
            <Download className="w-4 h-4" />
            {downloading ? "下载中..." : "下载"}
          </button>
        </div>
      </div>
    </div>
  );
}
