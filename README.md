# StyleKit

StyleKit 是一个设计风格工具包，帮助 AI 生成一致的 UI 代码。通过清晰的风格规范和组件模板，让 AI 在明确的边界内输出高质量、风格统一的前端代码。

## 技术栈

- **Next.js 16** + Turbopack
- **React 19**
- **Tailwind CSS 4**
- **Radix UI** 无障碍基础组件
- **TypeScript**

## 功能特性

- 4 种设计风格：新野兽派、柔和野兽派、俏皮野兽派、编辑杂志风
- 30+ Neo-Brutalist 组件库
- 风格规范导出（Trae Rules / Cursor Rules / Prompt）
- 完整的无障碍支持 (a11y)
- 响应式设计

## 快速开始

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
app/
  ├── page.tsx              # 首页
  ├── about/                # 关于页
  ├── components/           # 组件展示页
  └── styles/
      ├── page.tsx          # 风格列表
      ├── [slug]/           # 风格详情（动态路由）
      └── */showcase/       # 各风格 Showcase
components/
  ├── ui/brutal/            # Neo-Brutalist 组件库
  └── layout/               # 布局组件
lib/
  └── styles/               # 风格定义数据
```

## 命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 生产构建
npm run lint     # 代码检查
```

## 许可

MIT
