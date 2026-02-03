# 素材库快速参考

## 导入

```tsx
// 组件
import {
  AssetCard,
  AssetGallery,
  AssetPicker,
  AssetButton,
  AssetBadge,
  AssetDecoration,
  AssetDownloadDialog,
} from "@/components/assets";

// Hooks
import {
  useAssets,
  useAssetsByCategory,
  useAssetsByTag,
  useAssetSearch,
  useAssetFavorites,
} from "@/lib/assets/hooks";

// 工具函数
import {
  getAssetBySlug,
  getAssetsByCategory,
  getAssetsByTag,
  getAssetsForStyle,
  searchAssets,
} from "@/lib/assets/meta";

// 类型
import type { AssetMeta, AssetCategory, AssetTag } from "@/lib/assets/meta";
```

## 常用组件

### AssetGallery - 素材库展示
```tsx
<AssetGallery
  assets={assets}
  title="我的素材库"
  showSearch={true}
  showFilter={true}
  variant="default"  // 或 "compact"
  onDownload={(asset) => console.log(asset)}
/>
```

### AssetButton - 按钮
```tsx
<AssetButton
  asset={asset}
  assetPosition="left"      // left | right | top | bottom
  assetSize="md"            // sm | md | lg
  variant="primary"         // primary | secondary | outline
>
  按钮文本
</AssetButton>
```

### AssetBadge - 徽章
```tsx
<AssetBadge
  asset={asset}
  label="新品"
  variant="success"         // primary | secondary | accent | success | warning | error
  size="md"                 // sm | md | lg
  assetPosition="left"      // left | right
/>
```

### AssetDecoration - 装饰
```tsx
<AssetDecoration
  asset={asset}
  position="top-right"      // top-left | top-right | bottom-left | bottom-right | center
  size="lg"                 // sm | md | lg | xl
  opacity={0.8}
  rotation={-15}
/>
```

### AssetPicker - 选择器
```tsx
<AssetPicker
  category="button"
  onSelect={(asset) => setSelected(asset)}
  selectedAssetId="banana-nano-1"
  placeholder="选择素材..."
/>
```

### AssetCard - 卡片
```tsx
<AssetCard
  asset={asset}
  variant="default"         // default | compact
  onFavorite={(id) => {}}
  isFavorite={false}
  onDownload={(asset) => {}}
/>
```

### AssetDownloadDialog - 下载对话框
```tsx
<AssetDownloadDialog
  asset={asset}
  isOpen={true}
  onClose={() => {}}
/>
```

## 常用 Hooks

### useAssets - 获取所有素材
```tsx
const assets = useAssets();
```

### useAssetsByCategory - 按分类获取
```tsx
const buttons = useAssetsByCategory("button");
```

### useAssetsByTag - 按标签获取
```tsx
const cute = useAssetsByTag("cute");
```

### useAssetSearch - 搜索
```tsx
const { query, results, handleSearch } = useAssetSearch();

// 使用
handleSearch("banana");
```

### useAssetFavorites - 管理收藏
```tsx
const { favorites, toggleFavorite, isFavorite } = useAssetFavorites();

// 使用
toggleFavorite("asset-id");
const liked = isFavorite("asset-id");
```

## 常用工具函数

### getAssetBySlug - 按 slug 获取
```tsx
const asset = getAssetBySlug("banana-nano-button-1");
```

### getAssetsByCategory - 按分类获取
```tsx
const decorations = getAssetsByCategory("decoration");
```

### getAssetsByTag - 按标签获取
```tsx
const playful = getAssetsByTag("playful");
```

### getAssetsForStyle - 获取兼容素材
```tsx
const compatible = getAssetsForStyle("soft-ui");
```

### searchAssets - 搜索
```tsx
const results = searchAssets("flower");
```

## 素材分类

| 分类 | 用途 | 示例 |
|------|------|------|
| button | 按钮装饰 | 香蕉、星星 |
| decoration | 页面装饰 | 花朵、叶子 |
| character | 角色形象 | 卡通人物、动物 |
| background | 背景元素 | 图案、纹理 |
| icon | 图标 | 小图标、符号 |
| badge | 徽章标记 | 新品、推荐 |
| illustration | 插图 | 场景、故事 |

## 素材标签

| 标签 | 含义 |
|------|------|
| cute | 可爱风格 |
| playful | 活泼风格 |
| minimal | 极简风格 |
| colorful | 彩色 |
| monochrome | 单色 |
| 3d | 3D 效果 |
| flat | 扁平设计 |
| hand-drawn | 手绘风格 |
| geometric | 几何风格 |
| organic | 有机风格 |

## 实际示例

### 示例 1: 首页展示
```tsx
export function HomePage() {
  const assets = useAssets();
  const featured = assets.slice(0, 4);

  return (
    <section>
      <h2>精选素材</h2>
      <AssetGallery
        assets={featured}
        showSearch={false}
        showFilter={false}
        variant="compact"
      />
    </section>
  );
}
```

### 示例 2: 带素材的按钮
```tsx
export function CtaButton() {
  const asset = getAssetBySlug("banana-nano-button-1");

  return (
    <AssetButton
      asset={asset}
      assetPosition="left"
      variant="primary"
    >
      开始使用
    </AssetButton>
  );
}
```

### 示例 3: 装饰页面
```tsx
export function DecoratedSection() {
  const asset = getAssetBySlug("decoration-flower-bloom");

  return (
    <div className="relative">
      <AssetDecoration
        asset={asset}
        position="top-right"
        size="lg"
        rotation={-15}
        opacity={0.6}
      />
      <div className="relative z-10">
        {/* 内容 */}
      </div>
    </div>
  );
}
```

### 示例 4: 搜索和筛选
```tsx
export function AssetBrowser() {
  const assets = useAssets();
  const { query, results, handleSearch } = useAssetSearch();

  return (
    <div>
      <input
        type="text"
        placeholder="搜索素材..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <AssetGallery
        assets={results}
        showSearch={false}
        showFilter={true}
      />
    </div>
  );
}
```

### 示例 5: 素材选择器
```tsx
export function AssetSelector() {
  const [selected, setSelected] = useState<AssetMeta | null>(null);

  return (
    <div>
      <AssetPicker
        category="button"
        onSelect={setSelected}
        placeholder="选择按钮素材..."
      />
      {selected && (
        <p>已选择: {selected.name}</p>
      )}
    </div>
  );
}
```

## 添加新素材

### 步骤 1: 准备文件
```bash
# 将素材放到 public/assets/
cp my-asset.png public/assets/
cp my-asset-thumb.png public/assets/thumbnails/
```

### 步骤 2: 编辑 meta.ts
```typescript
// lib/assets/meta.ts
export const assetsMeta: AssetMeta[] = [
  // ... 现有素材
  {
    id: "my-asset-1",
    slug: "my-asset-name",
    name: "我的素材",
    nameEn: "My Asset",
    description: "这是一个可爱的素材",
    image: "/assets/my-asset.png",
    thumbnail: "/assets/thumbnails/my-asset-thumb.png",
    category: "button",
    tags: ["cute", "playful"],
    source: "banana-nano",
    colors: ["#FF69B4", "#FFB6C1"],
    size: { width: 200, height: 200 },
    useCases: ["按钮装饰"],
    compatibleStyles: ["soft-ui"],
    createdAt: "2025-02-03",
  },
];
```

## 常见问题

**Q: 如何改变素材大小？**
A: 使用 `AssetDecoration` 的 `size` 属性，或在 `AssetButton`/`AssetBadge` 中使用 `assetSize`。

**Q: 如何旋转素材？**
A: 在 `AssetDecoration` 中使用 `rotation` 属性（单位：度）。

**Q: 如何调整透明度？**
A: 在 `AssetDecoration` 中使用 `opacity` 属性（0-1）。

**Q: 如何搜索素材？**
A: 使用 `useAssetSearch()` hook 或 `searchAssets()` 函数。

**Q: 如何按分类筛选？**
A: 使用 `useAssetsByCategory()` hook 或 `getAssetsByCategory()` 函数。

## 相关文档

- 完整文档: `ASSET_LIBRARY.md`
- 实现总结: `ASSET_LIBRARY_SUMMARY.md`
- 素材库页面: `/assets`
