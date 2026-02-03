"use client";

import { useState } from "react";
import { AssetGallery, AssetDownloadDialog } from "@/components/assets";
import { useAssets } from "@/lib/assets/hooks";
import { useI18n } from "@/lib/i18n/context";
import type { AssetMeta } from "@/lib/assets/meta";
import { Check, AlertTriangle, Download, ExternalLink, Copy } from "lucide-react";

export default function AssetsPage() {
  const { t } = useI18n();
  const assets = useAssets();
  const [selectedAsset, setSelectedAsset] = useState<AssetMeta | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAssetSelect = (asset: AssetMeta) => {
    setSelectedAsset(asset);
    setIsDialogOpen(true);
  };

  // 按分类分组
  const groupedAssets = assets.reduce(
    (acc, asset) => {
      if (!acc[asset.category]) {
        acc[asset.category] = [];
      }
      acc[asset.category].push(asset);
      return acc;
    },
    {} as Record<string, AssetMeta[]>
  );

  const categoryLabels: Record<string, { name: string; description: string }> = {
    function: {
      name: "功能图标",
      description: "导航、操作、状态指示",
    },
    emotion: {
      name: "表情图标",
      description: "反馈、状态、情感表达",
    },
    decoration: {
      name: "装饰素材",
      description: "页面装饰、点缀元素",
    },
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-3">
            素材库
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
            Claymorphism Cats v1
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            3D粘土风格的可爱小猫图标集合。包含功能图标、表情、装饰素材等多个系列。
          </p>
        </div>
      </section>

      {/* Icon Collections by Category */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="space-y-16">
            {Object.entries(groupedAssets).map(([category, categoryAssets]) => {
              const label =
                categoryLabels[category as keyof typeof categoryLabels];
              if (!label) return null;

              return (
                <div key={category} className="space-y-4">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                      {label.name}
                    </h2>
                    <p className="text-muted text-sm">{label.description}</p>
                  </div>

                  {/* Grid of icons */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {categoryAssets.map((asset) => (
                      <button
                        key={asset.id}
                        onClick={() => handleAssetSelect(asset)}
                        className="aspect-square rounded border border-border bg-background hover:border-foreground hover:shadow-md transition-all group relative overflow-hidden"
                        title={asset.name}
                      >
                        <img
                          src={asset.image}
                          alt={asset.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Guide - Simplified 3 Steps */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-muted mb-3">
              快速指南
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              3 步生成图标集
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="border border-border bg-background p-6 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">明确需求</h3>
              <p className="text-sm text-muted mb-4">
                确定风格、主角、图标列表和用途。
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-xs font-mono space-y-1">
                <p>• 风格: Claymorphism</p>
                <p>• 主角: Cream Colored Cat</p>
                <p>• 数量: 12 icons</p>
                <p>• 用途: Functional Icons</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-border bg-background p-6 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">生成提示词</h3>
              <p className="text-sm text-muted mb-4">
                使用模板让 AI 生成网格图片。
              </p>
              <button
                onClick={() => {
                  copyToClipboard(
                    `Create a 4×3 grid of 12 cute cream colored cat icons on solid #00FF00 green background.

GRID & LAYOUT:
- Canvas: 1536×2048 pixels
- Each icon: 350×350 pixels, perfectly centered
- Spacing: Uniform, NO overlapping

ICON STYLE:
- 3D clay render, pastel colors
- Cream cat with pink ears

BACKGROUND:
- Solid #00FF00 (pure green)`
                  );
                }}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-2 w-full justify-center"
              >
                <Copy className="w-4 h-4" />
                {copied ? "已复制" : "复制提示词模板"}
              </button>
            </div>

            {/* Step 3 */}
            <div className="border border-border bg-background p-6 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">处理图片</h3>
              <p className="text-sm text-muted mb-4">
                运行脚本去背景、切割、居中。
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-xs font-mono space-y-1">
                <p>$ python</p>
                <p>process_single_icon</p>
                <p>_sheet.py</p>
              </div>
            </div>
          </div>

          {/* Key Tips */}
          <div className="mt-12 border border-border bg-background p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-4">关键要点</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">绿幕背景 (#00FF00)</p>
                  <p className="text-xs text-muted">
                    易于检测，不与3D阴影混淆
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">明确尺寸约束</p>
                  <p className="text-xs text-muted">
                    指定像素尺寸，AI生成一致性强
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">"NO overlapping"</p>
                  <p className="text-xs text-muted">
                    强调间距要求，防止图标相接
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">分行描述图标</p>
                  <p className="text-xs text-muted">
                    按网格行列清晰地列出每个图标
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Links */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">工具和模板</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/docs/PROMPT_TEMPLATE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border bg-background p-6 rounded-lg hover:border-foreground hover:shadow-md transition-all"
            >
              <p className="text-lg font-semibold mb-2">提示词模板</p>
              <p className="text-sm text-muted mb-4">
                完整的提示词模板、为什么这样写、注意事项
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <ExternalLink className="w-4 h-4" />
                查看文档
              </div>
            </a>

            <a
              href="#"
              className="border border-border bg-background p-6 rounded-lg hover:border-foreground hover:shadow-md transition-all"
            >
              <p className="text-lg font-semibold mb-2">处理脚本</p>
              <p className="text-sm text-muted mb-4">
                自动去背景、切割、居中的Python脚本
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <Download className="w-4 h-4" />
                scripts/process_single_icon_sheet.py
              </div>
            </a>

            <div className="border border-border bg-background p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">快速检查清单</p>
              <ul className="text-sm text-muted space-y-2">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>背景完全透明</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>图标大小一致</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>内容居中</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>无变形或断裂</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Download Dialog */}
      {selectedAsset && (
        <AssetDownloadDialog
          asset={selectedAsset}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </main>
  );
}
