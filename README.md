<p align="center">
  <a href="https://stylekit.top">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/readme/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="public/readme/logo-light.svg">
      <img alt="StyleKit" src="public/readme/logo-light.svg" width="280">
    </picture>
  </a>
</p>

<p align="center">
  <strong>面向 AI 生成网页的开源视觉风格库。</strong><br>
  148 套精选风格，每套都包含设计令牌、组件配方、Tailwind 约束与可直接复制的提示词。
</p>

<p align="center">
  <a href="https://stylekit.top"><img src="https://img.shields.io/badge/Live-www.stylekit.top-black?style=flat-square" alt="Live Site"></a>
  <a href="https://github.com/AnxForever/stylekit/stargazers"><img src="https://img.shields.io/github/stars/AnxForever/stylekit?style=flat-square&color=f59e0b" alt="Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
</p>

<p align="center">
  <strong>简体中文</strong> &middot; <a href="README.en.md">English</a>
</p>

<br>

<p align="center">
  <a href="https://stylekit.top">
    <img src="public/readme/home-hero.png" alt="StyleKit 预览" width="100%">
  </a>
</p>

<p align="center">
  <a href="https://www.stylekit.top/zh/styles"><strong>风格展示</strong></a> &middot;
  <a href="https://www.stylekit.top/zh/templates"><strong>页面模板</strong></a> &middot;
  <a href="https://www.stylekit.top/zh/animations"><strong>动效</strong></a> &middot;
  <a href="#参与贡献"><strong>参与贡献</strong></a>
</p>

<br>

---

## StyleKit 是什么？

让 AI 帮你做个落地页，出来的东西能跑，但和所有 AI 做的落地页长得一样。问题不在模型 —— 而是「做得好看点」本来就不算一句规格。

StyleKit 把一个视觉方向变成代理真正能照着做的东西：一个有名字的风格，配上真实的令牌、硬性约束，以及可以先看的示例。选定一个，产出就不再漂移。

它不保证产出可以直接上线的界面。集成与完整度仍然取决于你的项目。

## 快速开始

```bash
git clone https://github.com/AnxForever/stylekit.git
cd stylekit
pnpm install
pnpm dev
```

打开 [localhost:3000](http://localhost:3000)。Supabase 与管理员相关的可选配置见 [`.env.example`](.env.example)。

## 三种使用方式

### 1. 把风格装进现有的 shadcn 项目

每套风格都以 [shadcn registry](https://ui.shadcn.com/docs/registry) 主题的形式发布。一条命令即可把它的亮色与暗色 `cssVars` 加进你的 `globals.css`：

```bash
npx shadcn add https://stylekit.top/r/glassmorphism.json
```

把 `glassmorphism` 换成任意 slug，兼容 Tailwind v4。

> 目标项目必须包含 `tsconfig.json`，否则 shadcn CLI 会以 `Couldn't find tsconfig.json` 退出。完整指南见 [`docs/registry.md`](docs/registry.md)。

### 2. 把整个库交给你的编码代理

```bash
npx skills add AnxForever/stylekit-skill
```

之后 Claude Code、Cursor、Windsurf 以及任何兼容 Agent Skills 的工具，都能按需套用这 148 套风格 ——「做成 Stripe 的样子」「赛博朋克仪表盘」—— 并使用正确的令牌与规则。技能本体在 [`AnxForever/stylekit-skill`](https://github.com/AnxForever/stylekit-skill)。

### 3. 通过 MCP 调用

```bash
npx -y stylekit-mcp
```

提供风格检索、设计令牌、组件配方，以及一个 `stylekit_lint_code` 工具，用来检查生成的 UI 代码是否真的守住了该风格的规则。见 [`packages/mcp/README.md`](packages/mcp/README.md)。

## 风格目录

148 套风格，分属十大类 —— 现代与科技、粗野主义、品牌启发（Apple、Stripe、Notion、GitHub）、复古与怀旧、艺术、日式与动漫、赛博朋克与科幻、布局模式、文化与地域、自然与温馨。

每套风格都自带设计令牌、组件代码、AI 规则和整页实时演示。

**[浏览全部 148 套 →](https://www.stylekit.top/zh/styles)**

## 仓库里还有什么

- **60 个动效** —— 实时预览，一键复制
- **36 个页面模板** —— SaaS、仪表盘、电商、作品集、博客
- **随处导出** —— Tailwind preset、shadcn 主题、CSS 变量、Figma tokens
- **IDE 规则** —— `.cursorrules`、`claude-rules`、`windsurf-rules`
- **双语** —— 完整的中英文内容与本地化路由
- **面向机器可读** —— [`/llms.txt`](https://stylekit.top/llms.txt)、[`/llms.md`](https://stylekit.top/llms.md)、[`/llms-full.txt`](https://stylekit.top/llms-full.txt)，以及有文档的 HTTP API（[`docs/API.md`](docs/API.md)）

## 用 AI 构建前端的实战指南

站点上的实操文章 —— 当问题出在工作流而不是风格本身时看这些：

- [AI 生成的网站不好看怎么修](https://www.stylekit.top/zh/ai-generated-website-fix)
- [怎么选 AI 网页设计工具](https://www.stylekit.top/zh/ai-web-design-tools)
- [AI 生成 UI 界面](https://www.stylekit.top/zh/ai-ui-generator) —— 把一句话需求变成可用的界面结构
- [AI 前端工作流](https://www.stylekit.top/zh/ai-frontend-workflow)
- English: [Fix an AI-generated website](https://www.stylekit.top/en/ai-generated-website-fix) · [AI frontend workflow](https://www.stylekit.top/en/ai-frontend-workflow)

## 参与贡献

欢迎贡献。提交 PR 前请先阅读：

1. [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md)
2. [`docs/STYLE_ADDITION_CHECKLIST.md`](docs/STYLE_ADDITION_CHECKLIST.md) —— 新增风格必读
3. [`docs/STYLE_AUTHORING.md`](docs/STYLE_AUTHORING.md) —— 风格是怎么写的，动手前先看

```bash
git checkout -b feat/your-feature
pnpm lint && pnpm test && pnpm build
git commit -m "feat: add your feature"
```

在改代码？[`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) 是仓库导览，[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) 说明线上是怎么跑的。

## 支持这个项目

如果 StyleKit 恰好帮到了你，点个 star 就已经很够了。想再往前一步的话，网站上有专门的支持页面，写明了服务器与域名成本 —— [stylekit.top/contact#support-maintenance](https://stylekit.top/contact#support-maintenance)。

也欢迎扫码支持我把它继续做下去，金额随意，每一份心意我都很感谢。

## Star 趋势

<a href="https://star-history.com/#AnxForever/stylekit&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=AnxForever/stylekit&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=AnxForever/stylekit&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=AnxForever/stylekit&type=Date" />
  </picture>
</a>

## 贡献者

<a href="https://github.com/AnxForever/stylekit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AnxForever/stylekit" alt="StyleKit 贡献者" />
</a>

## 许可证

MIT —— 详见 [LICENSE](LICENSE)。

---

<p align="center">
  <a href="https://stylekit.top"><strong>www.stylekit.top</strong></a>
  <br>
  由 <a href="https://github.com/AnxForever">AnxForever</a> 构建
</p>
