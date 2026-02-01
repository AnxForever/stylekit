# StyleKit UI 组件库开发计划

## 概述

为 StyleKit 项目开发完整的 UI 组件库，基于 Radix Primitives + Tailwind CSS 4 + Framer Motion。

## 技术栈

- **框架**: Next.js 16 + React 19
- **样式**: Tailwind CSS 4 + CSS 变量
- **无头组件**: Radix Primitives
- **动画**: Framer Motion
- **类型**: TypeScript 严格模式
- **变体管理**: class-variance-authority (CVA)

## 目录结构

```
components/
└── ui/                    # 通用 UI 组件库
    ├── button/
    │   ├── index.ts       # 导出
    │   └── button.tsx     # 组件实现
    ├── input/
    ├── select/
    ├── checkbox/
    ├── radio/
    ├── card/
    ├── modal/
    ├── drawer/
    ├── tooltip/
    ├── popover/
    ├── table/
    ├── list/
    ├── pagination/
    ├── tree/
    ├── toast/
    ├── alert/
    ├── loading/
    ├── progress/
    └── index.ts           # barrel export

lib/
└── utils.ts               # cn() 工具函数
```

## Radix 组件映射

| 组件 | 方案 | Radix 包 |
|------|------|----------|
| Button | 自研 | - |
| Input | 自研 | - |
| Select | Radix | @radix-ui/react-select |
| Checkbox | Radix | @radix-ui/react-checkbox |
| Radio | Radix | @radix-ui/react-radio-group |
| Card | 自研 | - |
| Modal | Radix | @radix-ui/react-dialog |
| Drawer | Radix | @radix-ui/react-dialog |
| Tooltip | Radix | @radix-ui/react-tooltip |
| Popover | Radix | @radix-ui/react-popover |
| Table | 自研 | - |
| List | 自研 | - |
| Pagination | 自研 | - |
| Tree | 自研 | @radix-ui/react-accordion (可选) |
| Toast | Radix | @radix-ui/react-toast |
| Alert | 自研 | - |
| Loading | 自研 | - |
| Progress | Radix | @radix-ui/react-progress |

## 组件 API 设计原则

### 1. Props 命名规范

```tsx
interface ComponentProps {
  // 变体
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  // 尺寸
  size?: 'sm' | 'md' | 'lg';
  // 状态
  disabled?: boolean;
  loading?: boolean;
  // 样式扩展
  className?: string;
}
```

### 2. CVA 样式变体

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center font-sans transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-accent/90',
        secondary: 'bg-muted text-foreground hover:bg-muted/80',
        ghost: 'hover:bg-accent/10',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

### 3. forwardRef + displayName

所有组件必须：
- 使用 `React.forwardRef` 支持 ref 转发
- 设置 `displayName` 便于调试

## 设计 Token 系统

继续使用现有 CSS 变量：

```css
:root {
  --background: #fafafa;
  --foreground: #0a0a0a;
  --accent: #e63946;
  --muted: #6b7280;
  --border: #e5e5e5;
}
```

Tailwind 主题映射（已配置）：

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-muted: var(--muted);
  --color-border: var(--border);
}
```

## 动画规范 (Framer Motion)

### 通用动画配置

```tsx
// 淡入淡出
const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

// 缩放弹出
const scaleAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.15, ease: 'easeOut' },
};

// 侧边滑入
const slideAnimation = (direction: 'left' | 'right' | 'top' | 'bottom') => ({
  initial: { x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0 },
  animate: { x: 0 },
  exit: { x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0 },
  transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
});
```

## 无障碍清单

- [ ] 所有交互元素可通过 Tab 键聚焦
- [ ] Modal/Drawer 实现焦点陷阱
- [ ] 正确使用 ARIA 属性
- [ ] 颜色对比度 >= 4.5:1
- [ ] 清晰的 focus 样式
- [ ] 键盘快捷键支持 (Escape 关闭)

## 分阶段实施计划

### 第一阶段：基础设施 + 核心组件

**目标**: 搭建组件库基础，实现最常用组件

1. 安装依赖 (clsx, tailwind-merge, class-variance-authority, Radix 包)
2. 创建 `lib/utils.ts` (cn 函数)
3. 实现组件：
   - Button (自研)
   - Input (自研)
   - Card (自研)
   - Alert (自研)
   - Loading (自研)

### 第二阶段：表单组件

**目标**: 完成表单相关组件

1. Select (Radix)
2. Checkbox (Radix)
3. Radio (Radix)

### 第三阶段：覆盖层组件

**目标**: 实现弹出层类组件

1. Modal (Radix Dialog)
2. Drawer (Radix Dialog 变体)
3. Tooltip (Radix)
4. Popover (Radix)
5. Toast (Radix)

### 第四阶段：数据展示组件

**目标**: 实现数据展示类组件

1. Table (自研)
2. List (自研)
3. Pagination (自研)
4. Progress (Radix)

### 第五阶段：高级组件

**目标**: 实现复杂交互组件

1. Tree (自研 + Radix Accordion)

## 依赖安装命令

```bash
npm install clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-radio-group
npm install @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-popover
npm install @radix-ui/react-toast @radix-ui/react-progress @radix-ui/react-accordion
```

## 文件命名规范

- 组件文件：`kebab-case.tsx` (如 `button.tsx`)
- 类型文件：`kebab-case.types.ts` (如需拆分)
- 导出文件：`index.ts`
- 组件命名：`PascalCase` (如 `Button`)
