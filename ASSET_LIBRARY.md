# 素材库系统 (Asset Library System)

## 概述

StyleKit 现已集成完整的素材库系统，用于管理和展示由AI工具（如Banana Nano、Midjourney等）生成的可爱卡通图案素材。该系统提供了从素材管理、展示、到UI集成的完整解决方案。

## 系统架构

### 核心模块

#### 1. 素材元数据系统 (`lib/assets/meta.ts`)
- **AssetMeta** 类型：定义素材的完整元数据结构
- **assetsMeta** 数组：存储所有素材的注册表
- 支持的分类：button, decoration, character, background, icon, badge, illustration
- 支持的标签：cute, playful, minimal, colorful, monochrome, 3d, flat, hand-drawn, geometric, organic

#### 2. React Hooks (`lib/assets/hooks.ts`)
- `useAssets()` - 获取所有素材
- `useAssetsByCategory()` - 按分类筛选素材
- `useAssetsByTag()` - 按标签筛选素材
- `useAssetSearch()` - 搜索素材（带防抖）
- `useAssetFavorites()` - 管理素材收藏

#### 3. UI 组件 (`components/assets/`)

##### AssetCard
展示单个素材的卡片组件
```tsx
<AssetCard
  asset={asset}
  variant="default" | "compact"
  onFavorite={(id) => {}}
  isFavorite={false}
  onDownload={(asset) => {}}
/>
```

##### AssetGallery
素材库展示组件，支持搜索和筛选
```tsx
<AssetGallery
  assets={assets}
  title="素材库"
  showSearch={true}
  showFilter={true}
  variant="default" | "compact"
  onDownload={(asset) => {}}
/>
```

##### AssetPicker
素材选择器下拉菜单
```tsx
<AssetPicker
  category="button"
  onSelect={(asset) => {}}
  selectedAssetId="banana-nano-1"
  placeholder="选择素材..."
/>
```

##### AssetButton
集成素材的按钮组件
```tsx
<AssetButton
  asset={asset}
  assetPosition="left" | "right" | "top" | "bottom"
  assetSize="sm" | "md" | "lg"
  variant="primary" | "secondary" | "outline"
>
  点击我
</AssetButton>
```

##### AssetBadge
集成素材的徽章组件
```tsx
<AssetBadge
  asset={asset}
  label="新品"
  variant="primary" | "secondary" | "accent" | "success" | "warning" | "error"
  size="sm" | "md" | "lg"
  assetPosition="left" | "right"
/>
```

##### AssetDecoration
页面装饰组件
```tsx
<AssetDecoration
  asset={asset}
  position="top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  size="sm" | "md" | "lg" | "xl"
  opacity={0.8}
  rotation={-15}
/>
```

##### AssetDownloadDialog
素材详情和下载对话框
```tsx
<AssetDownloadDialog
  asset={asset}
  isOpen={true}
  onClose={() => {}}
/>
```

## 使用指南

### 1. 在首页展示精选素材

```tsx
import { AssetGallery } from "@/components/assets";
import { useAssets } from "@/lib/assets/hooks";

export function HomePage() {
  const assets = useAssets();
  const featured = assets.slice(0, 4);

  return (
    <AssetGallery
      assets={featured}
      showSearch={false}
      showFilter={false}
      variant="compact"
    />
  );
}
```

### 2. 在按钮中使用素材

```tsx
import { AssetButton } from "@/components/assets";
import { getAssetBySlug } from "@/lib/assets";

export function MyButton() {
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

### 3. 在页面中添加装饰元素

```tsx
import { AssetDecoration } from "@/components/assets";
import { getAssetBySlug } from "@/lib/assets";

export function DecoratedPage() {
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
      {/* 页面内容 */}
    </div>
  );
}
```

### 4. 创建带素材的徽章

```tsx
import { AssetBadge } from "@/components/assets";
import { getAssetBySlug } from "@/lib/assets";

export function NewBadge() {
  const asset = getAssetBySlug("badge-star-shine");

  return (
    <AssetBadge
      asset={asset}
      label="新品"
      variant="success"
      size="md"
    />
  );
}
```

### 5. 在导出功能中集成素材选择

```tsx
import { AssetPicker } from "@/components/assets";
import type { AssetMeta } from "@/lib/assets";

export function ExportDialog() {
  const [selectedAsset, setSelectedAsset] = useState<AssetMeta | null>(null);

  return (
    <div>
      <AssetPicker
        category="decoration"
        onSelect={setSelectedAsset}
        placeholder="选择装饰素材..."
      />
      {selectedAsset && (
        <p>已选择: {selectedAsset.name}</p>
      )}
    </div>
  );
}
```

## 页面和路由

### `/assets` - 素材库主页
完整的素材展示页面，包含：
- 素材搜索功能
- 分类筛选
- 详细的使用指南
- 导入代码示例
- 下载对话框

### 首页集成
首页现已添加"可爱卡通素材"部分，展示精选素材。

## 添加新素材

### 步骤 1: 准备素材文件
将素材图片放到 `public/assets/` 目录：
```
public/assets/
├── my-asset.png
└── thumbnails/
    └── my-asset.png
```

### 步骤 2: 添加元数据
编辑 `lib/assets/meta.ts`，在 `assetsMeta` 数组中添加新素材：

```typescript
{
  id: "my-asset-1",
  slug: "my-asset-name",
  name: "我的素材",
  nameEn: "My Asset",
  description: "这是一个可爱的素材",
  image: "/assets/my-asset.png",
  thumbnail: "/assets/thumbnails/my-asset.png",
  category: "button",
  tags: ["cute", "playful"],
  source: "banana-nano",
  colors: ["#FF69B4", "#FFB6C1"],
  size: { width: 200, height: 200 },
  useCases: ["按钮装饰", "交互反馈"],
  compatibleStyles: ["soft-ui", "neo-brutalist-playful"],
  createdAt: "2025-02-03",
}
```

## 最佳实践

### 1. 素材命名
- 使用清晰的英文名称
- 使用 kebab-case 格式（如 `banana-nano-button-1`）
- 包含分类前缀（如 `button-`, `decoration-`）

### 2. 素材优化
- 推荐尺寸：200x200px 到 300x300px
- 使用 PNG 格式（支持透明背景）
- 文件大小控制在 100KB 以内
- 提供缩略图（推荐 80x80px）

### 3. 元数据完整性
- 提供中英文名称和描述
- 标记适用的样式风格
- 列出主要使用场景
- 记录素材来源

### 4. 组件使用
- 优先使用专用组件（AssetButton、AssetBadge 等）
- 避免直接使用 Image 组件
- 合理设置透明度和旋转角度
- 考虑响应式设计

## 技术细节

### 文件结构
```
lib/assets/
├── meta.ts          # 元数据定义和注册表
├── hooks.ts         # React hooks
└── index.ts         # 导出文件

components/assets/
├── asset-card.tsx           # 素材卡片
├── asset-gallery.tsx        # 素材库
├── asset-picker.tsx         # 素材选择器
├── asset-button.tsx         # 按钮组件
├── asset-badge.tsx          # 徽章组件
├── asset-decoration.tsx     # 装饰组件
├── asset-download-dialog.tsx # 下载对话框
└── index.ts                 # 导出文件

app/assets/
└── page.tsx         # 素材库主页

public/assets/
├── *.png            # 素材图片
└── thumbnails/      # 缩略图
```

### 类型定义
```typescript
type AssetCategory =
  | "button" | "decoration" | "character"
  | "background" | "icon" | "badge" | "illustration";

type AssetTag =
  | "cute" | "playful" | "minimal" | "colorful"
  | "monochrome" | "3d" | "flat" | "hand-drawn"
  | "geometric" | "organic";

interface AssetMeta {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  thumbnail?: string;
  category: AssetCategory;
  tags: AssetTag[];
  source?: "banana-nano" | "midjourney" | "dalle" | "custom";
  colors?: string[];
  size?: { width: number; height: number };
  useCases?: string[];
  compatibleStyles?: string[];
  createdAt?: string;
}
```

## 未来扩展

### 计划中的功能
1. **素材上传界面** - 允许用户上传自己的素材
2. **素材分享** - 社区素材分享和评分
3. **动画素材** - 支持 GIF 和 Lottie 动画
4. **素材打包** - 按分类或标签打包下载
5. **AI 生成集成** - 直接集成 Banana Nano API
6. **素材版本管理** - 跟踪素材的更新历史
7. **使用统计** - 追踪素材的使用频率

## 常见问题

### Q: 如何修改现有素材？
A: 编辑 `lib/assets/meta.ts` 中对应素材的元数据，或替换 `public/assets/` 中的图片文件。

### Q: 素材支持哪些格式？
A: 目前支持 PNG 格式。建议使用透明背景的 PNG 以获得最佳效果。

### Q: 如何在自定义组件中使用素材？
A: 导入 `AssetMeta` 类型和相关 hooks，然后在组件中使用素材数据。

### Q: 素材可以用于商业用途吗？
A: 取决于素材的来源和许可证。请确保遵守相应的许可协议。

## 相关资源

- [Banana Nano](https://www.banana.dev/) - AI 图像生成工具
- [Midjourney](https://www.midjourney.com/) - AI 艺术生成平台
- [DALL-E](https://openai.com/dall-e-3/) - OpenAI 图像生成
- [Lucide React](https://lucide.dev/) - 图标库（用于替代 emoji）

## 许可证

素材库系统遵循 StyleKit 的许可证。具体素材的许可证取决于其来源。
