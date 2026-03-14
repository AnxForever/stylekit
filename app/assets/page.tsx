"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AssetDownloadDialog } from "@/components/assets";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { useAssets } from "@/lib/assets/hooks";
import type { AssetMeta } from "@/lib/assets/meta";
import {
  Copy,
  ImageIcon,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

type AssetTab = "images" | "components";

/* ── Component Assets Data ── */
const componentAssets = [
  {
    id: "kokonutui-dashboard",
    name: { zh: "KokonutUI 财务面板", en: "KokonutUI Finance Dashboard" },
    description: {
      zh: "现代财务管理仪表盘，包含账户概览、交易记录和事件追踪。侧边栏 + 多列表布局。",
      en: "Modern finance dashboard with account overview, transactions, and event tracking. Sidebar + multi-list layout.",
    },
    href: "/templates/kokonutui-dashboard",
    source: "v0.dev / KokonutUI",
    tags: ["dashboard", "finance", "sidebar"],
    colors: { bg: "from-zinc-900 to-zinc-800", accent: "bg-emerald-500" },
  },
  {
    id: "crm-frosted-glass",
    name: { zh: "毛玻璃 CRM 面板", en: "Frosted Glass CRM Dashboard" },
    description: {
      zh: "磨砂玻璃效果的 CRM 管理面板，包含联系人管理、销售目标和团队绩效。",
      en: "Frosted glass CRM dashboard with contact management, sales targets, and team performance.",
    },
    href: "/templates/crm-frosted-glass",
    source: "v0.dev",
    tags: ["dashboard", "crm", "glassmorphism"],
    colors: { bg: "from-purple-900 via-blue-900 to-teal-900", accent: "bg-purple-500" },
  },
  {
    id: "shadcn-analytics",
    name: { zh: "shadcn 数据分析面板", en: "shadcn Analytics Dashboard" },
    description: {
      zh: "基于 shadcn 风格的数据分析仪表盘，包含统计卡片、交互式图表和数据表格。",
      en: "shadcn-style analytics dashboard with stat cards, interactive charts, and data tables.",
    },
    href: "/templates/shadcn-analytics",
    source: "v0.dev / shadcn",
    tags: ["dashboard", "analytics", "charts"],
    colors: { bg: "from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900", accent: "bg-zinc-900 dark:bg-zinc-100" },
  },
];

/* ── Main Component ── */
export default function AssetsPage() {
  const { locale } = useI18n();
  const pick = <T,>(obj: { zh: T; en: T }) => (locale === "zh" ? obj.zh : obj.en);
  const assets = useAssets();
  const [activeTab, setActiveTab] = useState<AssetTab>("images");
  const [selectedAsset, setSelectedAsset] = useState<AssetMeta | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAssetSelect = (asset: AssetMeta) => {
    setSelectedAsset(asset);
    setIsDialogOpen(true);
  };

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
    function: { name: "功能图标", description: "导航、操作、状态指示" },
    emotion: { name: "表情图标", description: "反馈、状态、情感表达" },
    decoration: { name: "装饰素材", description: "页面装饰、点缀元素" },
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { key: AssetTab; label: string; icon: React.ElementType }[] = [
    { key: "images", label: locale === "zh" ? "图片素材" : "Image Assets", icon: ImageIcon },
    { key: "components", label: locale === "zh" ? "组件素材" : "Component Assets", icon: LayoutGrid },
  ];
  const imageTabId = "assets-tab-images";
  const componentTabId = "assets-tab-components";
  const imagePanelId = "assets-panel-images";
  const componentPanelId = "assets-panel-components";

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
          <div className="flex items-center gap-2 sm:gap-4 mb-6">
            <ScrollBackButton label={locale === "zh" ? "返回" : "Back"} />
          </div>
          <p className="text-xs tracking-widest uppercase text-muted mb-2 sm:mb-3">
            {locale === "zh" ? "素材库" : "Asset Library"}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight sm:leading-[1.2] md:leading-[1.1] mb-3 sm:mb-4">
            {locale === "zh" ? "素材库" : "Asset Library"}
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {locale === "zh"
              ? "图片素材和组件素材集合。可直接下载使用或作为参考。"
              : "Collection of image assets and component assets. Download directly or use as reference."}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border sticky top-0 z-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex gap-0" role="tablist" aria-label={locale === "zh" ? "素材类别" : "Asset categories"}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                id={tab.key === "images" ? imageTabId : componentTabId}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={tab.key === "images" ? imagePanelId : componentPanelId}
                tabIndex={activeTab === tab.key ? 0 : -1}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted hover:text-foreground hover:border-border"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === "images" && (
        <div role="tabpanel" id={imagePanelId} aria-labelledby={imageTabId}>
          {/* Image Assets: Icon Collections */}
          <section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
                  Claymorphism Cats v1
                </h2>
                <p className="text-sm text-muted">
                  {locale === "zh"
                    ? "3D粘土风格的可爱小猫图标集合"
                    : "Cute cat icon collection in 3D clay style"}
                </p>
              </div>
              <div className="space-y-10 sm:space-y-12 md:space-y-16">
                {Object.entries(groupedAssets).map(([category, categoryAssets]) => {
                  const label = categoryLabels[category as keyof typeof categoryLabels];
                  if (!label) return null;
                  return (
                    <div key={category} className="space-y-3 sm:space-y-4">
                      <div className="mb-4 sm:mb-6">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1 sm:mb-2">
                          {label.name}
                        </h3>
                        <p className="text-muted text-xs sm:text-sm">{label.description}</p>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
                        {categoryAssets.map((asset) => (
                          <button
                            key={asset.id}
                            onClick={() => handleAssetSelect(asset)}
                            className="aspect-square rounded border border-border bg-background hover:border-foreground hover:shadow-md transition-all group relative overflow-hidden active:scale-95"
                            title={asset.name}
                          >
                            <Image
                              src={asset.image}
                              alt={asset.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover group-hover:scale-110 active:scale-100 transition-transform"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 active:bg-black/30 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Workflow Guide */}
          <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
              <div className="mb-8 sm:mb-12">
                <p className="text-xs tracking-widest uppercase text-muted mb-2 sm:mb-3">
                  {locale === "zh" ? "快速指南" : "Quick Guide"}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  {locale === "zh" ? "3 步生成图标集" : "3 Steps to Generate Icon Sets"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="border border-border bg-background p-4 sm:p-6 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4">1</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{locale === "zh" ? "明确需求" : "Define Requirements"}</h3>
                  <p className="text-xs sm:text-sm text-muted mb-3 sm:mb-4">
                    {locale === "zh" ? "确定风格、主角、图标列表和用途。" : "Determine style, character, icon list, and usage."}
                  </p>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-2 sm:p-3 rounded text-xs font-mono space-y-1 leading-tight">
                    <p>Style: Claymorphism</p>
                    <p>Character: Cream Cat</p>
                    <p>Count: 12 icons</p>
                    <p>Usage: Functional Icons</p>
                  </div>
                </div>
                <div className="border border-border bg-background p-4 sm:p-6 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-bold mb-4">2</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{locale === "zh" ? "生成提示词" : "Generate Prompt"}</h3>
                  <p className="text-xs sm:text-sm text-muted mb-3 sm:mb-4">
                    {locale === "zh" ? "使用模板让 AI 生成网格图片。" : "Use template to generate grid images with AI."}
                  </p>
                  <button
                    onClick={() => copyToClipboard(`Create a 4x3 grid of 12 cute cream colored cat icons on solid #00FF00 green background.\n\nGRID & LAYOUT:\n- Canvas: 1536x2048 pixels\n- Each icon: 350x350 pixels, perfectly centered\n- Spacing: Uniform, NO overlapping\n\nICON STYLE:\n- 3D clay render, pastel colors\n- Cream cat with pink ears\n\nBACKGROUND:\n- Solid #00FF00 (pure green)`)}
                    className="text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? (locale === "zh" ? "已复制" : "Copied") : (locale === "zh" ? "复制提示词" : "Copy Prompt")}</span>
                  </button>
                </div>
                <div className="border border-border bg-background p-4 sm:p-6 rounded-lg sm:col-span-2 md:col-span-1">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4">3</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{locale === "zh" ? "处理图片" : "Process Images"}</h3>
                  <p className="text-xs sm:text-sm text-muted mb-3 sm:mb-4">
                    {locale === "zh" ? "运行脚本去背景、切割、居中。" : "Run script to remove background, slice, and center."}
                  </p>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-2 sm:p-3 rounded text-xs font-mono space-y-1 leading-tight">
                    <p>$ python</p>
                    <p>process_single_icon</p>
                    <p>_sheet.py</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === "components" && (
        <div role="tabpanel" id={componentPanelId} aria-labelledby={componentTabId}>
          <section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
              <div className="mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                  {locale === "zh" ? "Dashboard 组件" : "Dashboard Components"}
                </h2>
                <p className="text-sm text-muted max-w-2xl">
                  {locale === "zh"
                    ? "从 v0.dev 移植的 Dashboard 模板组件，已转换为纯 Tailwind CSS 单文件实现，可直接复制使用。"
                    : "Dashboard template components ported from v0.dev, converted to pure Tailwind CSS single-file implementations. Copy and use directly."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {componentAssets.map((comp) => (
                  <div
                    key={comp.id}
                    className="group border border-border rounded-xl overflow-hidden bg-background hover:border-foreground hover:shadow-lg transition-all"
                  >
                    {/* Preview area */}
                    <div className={`h-40 bg-gradient-to-br ${comp.colors.bg} relative overflow-hidden`}>
                    {/* Abstract dashboard layout preview */}
                    <div className="absolute inset-3 flex gap-2 opacity-60">
                      <div className="w-10 rounded-lg bg-white/10 flex flex-col gap-1.5 p-1.5">
                        <div className="w-full h-4 rounded bg-white/20" />
                        <div className="w-full h-2 rounded bg-white/10" />
                        <div className="w-full h-2 rounded bg-white/10" />
                        <div className="w-full h-2 rounded bg-white/10" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <div className="flex-1 h-8 rounded-lg bg-white/10" />
                          <div className="flex-1 h-8 rounded-lg bg-white/10" />
                          <div className="flex-1 h-8 rounded-lg bg-white/10" />
                        </div>
                        <div className="flex-1 rounded-lg bg-white/10" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {comp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    </div>
                    {/* Info */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base font-semibold mb-1 text-foreground">
                        {pick(comp.name)}
                      </h3>
                      <p className="text-xs text-muted mb-3 line-clamp-2">
                        {pick(comp.description)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted">
                          {locale === "zh" ? "来源" : "Source"}: {comp.source}
                        </span>
                        <Link
                          href={comp.href}
                          className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
                        >
                          {locale === "zh" ? "查看" : "View"}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* How to use */}
              <div className="mt-10 sm:mt-12 border border-border bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold mb-4">
                  {locale === "zh" ? "如何使用" : "How to Use"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium">{locale === "zh" ? "浏览预览" : "Browse Previews"}</p>
                      <p className="text-xs text-muted">{locale === "zh" ? "点击查看完整的交互式预览" : "Click to view full interactive preview"}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-bold shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium">{locale === "zh" ? "复制源码" : "Copy Source"}</p>
                      <p className="text-xs text-muted">{locale === "zh" ? "每个组件都是单文件，直接复制 page.tsx" : "Each component is a single file, copy page.tsx directly"}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium">{locale === "zh" ? "自定义修改" : "Customize"}</p>
                      <p className="text-xs text-muted">{locale === "zh" ? "纯 Tailwind CSS，无外部依赖，随意改" : "Pure Tailwind CSS, no external deps, modify freely"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

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
