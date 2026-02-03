"use client";

import { useState } from "react";
import { AssetGallery } from "@/components/assets";
import { useAssets } from "@/lib/assets/hooks";
import { useI18n } from "@/lib/i18n/context";

export default function AssetsPage() {
  const { t } = useI18n();
  const assets = useAssets();
  const [downloadingAssetId, setDownloadingAssetId] = useState<string | null>(
    null
  );

  const handleDownload = async (assetId: string, imageUrl: string, name: string) => {
    setDownloadingAssetId(assetId);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("下载失败:", error);
    } finally {
      setDownloadingAssetId(null);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            素材库
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            可爱卡通素材
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            精选由AI工具生成的高质量卡通图案素材。可用于按钮装饰、页面点缀、徽章标记等多种场景。
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <AssetGallery
            assets={assets}
            showSearch
            showFilter
            variant="default"
            onDownload={(asset) =>
              handleDownload(asset.id, asset.image, asset.slug)
            }
          />
        </div>
      </section>

      {/* Usage Guide */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl mb-8">使用指南</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AssetButton */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">按钮组件</h3>
              <p className="text-sm text-muted">
                使用 AssetButton 组件在按钮中集成素材装饰。支持多种位置和大小配置。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`<AssetButton
  asset={asset}
  assetPosition="left"
  variant="primary"
>
  点击我
</AssetButton>`}
              </pre>
            </div>

            {/* AssetBadge */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">徽章组件</h3>
              <p className="text-sm text-muted">
                使用 AssetBadge 组件创建带有素材的徽章。适合标记新品、推荐等。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`<AssetBadge
  asset={asset}
  label="新品"
  variant="success"
/>`}
              </pre>
            </div>

            {/* AssetDecoration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">装饰组件</h3>
              <p className="text-sm text-muted">
                使用 AssetDecoration 组件在页面中添加装饰元素。支持位置、大小、旋转等配置。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`<AssetDecoration
  asset={asset}
  position="top-right"
  size="lg"
  rotation={-15}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl mb-8">集成示例</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Example 1 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">样式卡片集成</h3>
              <p className="text-sm text-muted mb-4">
                在样式卡片中添加素材装饰，增强视觉吸引力。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 在 StyleCard 中添加
<AssetDecoration
  asset={getRandomAsset()}
  position="top-right"
  size="sm"
  opacity={0.6}
/>`}
              </pre>
            </div>

            {/* Example 2 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">首页特色展示</h3>
              <p className="text-sm text-muted mb-4">
                在首页展示精选素材，吸引用户注意。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 在首页添加
<AssetGallery
  assets={featuredAssets}
  variant="compact"
  showSearch={false}
/>`}
              </pre>
            </div>

            {/* Example 3 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">导出功能集成</h3>
              <p className="text-sm text-muted mb-4">
                在导出对话框中支持素材选择和打包。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 在导出功能中
<AssetPicker
  category="decoration"
  onSelect={handleAssetSelect}
/>`}
              </pre>
            </div>

            {/* Example 4 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">交互反馈</h3>
              <p className="text-sm text-muted mb-4">
                使用素材增强用户交互反馈体验。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 成功提示
<AssetButton
  asset={successAsset}
  variant="primary"
>
  操作成功
</AssetButton>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Import Guide */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl mb-8">导入指南</h2>

          <div className="space-y-4">
            <p className="text-sm text-muted">
              在你的组件中导入素材相关的组件和hooks：
            </p>

            <pre className="bg-background p-4 rounded text-sm overflow-x-auto border border-border">
              {`// 导入组件
import {
  AssetCard,
  AssetGallery,
  AssetPicker,
  AssetButton,
  AssetBadge,
  AssetDecoration,
} from "@/components/assets";

// 导入hooks
import {
  useAssets,
  useAssetsByCategory,
  useAssetSearch,
  useAssetFavorites,
} from "@/lib/assets";

// 导入类型
import type { AssetMeta, AssetCategory } from "@/lib/assets";`}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
