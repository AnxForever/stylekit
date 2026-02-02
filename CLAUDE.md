# StyleKit 项目规范

## 代码风格

### 禁止使用 Emoji
- **绝对禁止**在代码、UI、文档中使用 emoji 字符
- 使用专业的 UI 元素替代：
  - 图标：使用 Lucide React 图标库
  - 状态指示：使用颜色块、徽章、图标
  - 装饰元素：使用 CSS 形状、SVG 图形
- 示例替换：
  - ❌ `✨` → ✅ `<Sparkles className="w-4 h-4" />`
  - ❌ `🚀` → ✅ `<Rocket className="w-4 h-4" />`
  - ❌ `✔️` → ✅ `<Check className="w-4 h-4" />`
  - ❌ `🚫` → ✅ `<Ban className="w-4 h-4" />` 或红色圆点

### 技术栈
- Next.js 16 (App Router)
- TypeScript (严格模式)
- Tailwind CSS v4
- Radix UI 基础组件
- Lucide React 图标

### UI 规范
- 保持专业、简洁的视觉风格
- 使用图标库而非 emoji
- 状态使用颜色区分（绿色成功、红色错误、黄色警告）
- 装饰使用几何形状或 SVG

## 项目结构

```
app/                    # Next.js App Router 页面
components/             # React 组件
  ├── layout/          # 布局组件 (Header, Footer)
  ├── style-preview/   # 风格预览组件
  └── ui/              # 通用 UI 组件
lib/                    # 工具库
  ├── styles/          # 风格定义和 tokens
  └── i18n/            # 国际化
```

## AI 生成规则

生成代码时：
1. 不使用 emoji，用专业图标替代
2. 遵循现有代码风格
3. 使用 TypeScript 类型
4. 响应式优先 (mobile-first)
5. 使用项目已有的组件和工具函数
