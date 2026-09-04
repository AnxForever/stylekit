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
  <strong>开源的视觉风格、设计令牌与 AI 提示词，让 AI 生成的界面不再千篇一律。</strong><br>
  148 套精选风格 —— 既可以直接安装为 shadcn 主题，也可以把它的设计约束用在 Cursor、Claude Code、v0 或 Windsurf 里。中英文双语风格检索。
</p>

<p align="center">
  <a href="https://stylekit.top"><img src="https://img.shields.io/badge/Live-www.stylekit.top-black?style=flat-square" alt="Live Site"></a>
  <a href="https://github.com/AnxForever/stylekit/stargazers"><img src="https://img.shields.io/github/stars/AnxForever/stylekit?style=flat-square&color=f59e0b" alt="Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
</p>

<p align="center">
  <a href="README.md">English</a> &middot; <strong>简体中文</strong>
</p>

<br>

<p align="center">
  <a href="https://stylekit.top">
    <img src="public/readme/home-hero.png" alt="StyleKit 预览" width="100%">
  </a>
</p>

<p align="center">
  <a href="https://stylekit.top/styles"><strong>风格展示</strong></a> &middot;
  <a href="https://stylekit.top/templates"><strong>页面模板</strong></a> &middot;
  <a href="https://stylekit.top/animations"><strong>动效</strong></a> &middot;
  <a href="#参与贡献"><strong>参与贡献</strong></a>
</p>

<br>

---

## StyleKit 是什么？

StyleKit 帮助人和 AI 从一个统一的视觉方向出发。选定一个风格，即可获得结构化的设计令牌、组件配方、提示词指引和实现参考；至于能否落地到生产环境、覆盖是否完整，仍然取决于你的目标项目。

## AI 前端资源

如果你正在用 AI 设计或搭建前端，这几篇指南覆盖了实际工作流：

- [AI 生成的网站不好看怎么修](https://www.stylekit.top/zh/ai-generated-website-fix) —— 视觉层次、间距、字体排版与组件一致性。
- [怎么选 AI 网页设计工具](https://www.stylekit.top/zh/ai-web-design-tools) —— 对比提示词、设计与代码生成三类工作流。
- [AI 生成 UI 界面](https://www.stylekit.top/zh/ai-ui-generator) —— 把一份页面需求变成可用的界面结构。
- [AI 前端工作流](https://www.stylekit.top/zh/ai-frontend-workflow) —— 从想法走到 React、Tailwind 与实现约束。
- English guides: [Fix an AI-generated website](https://www.stylekit.top/en/ai-generated-website-fix) · [AI frontend workflow](https://www.stylekit.top/en/ai-frontend-workflow)

<table>
<tr>
<td width="50%" valign="top">

### 设计系统

- **148 套视觉与布局风格**，包含设计令牌、配色方案与字体排版
- **在线示例** —— 每套风格都配有整页交互演示
- **组件配方** —— 按钮、卡片、输入框等可直接复制的代码
- **随处导出** —— Tailwind preset、shadcn 主题、CSS 变量、Figma tokens

</td>
<td width="50%" valign="top">

### AI 原生工作流

- **AI 实现指引** —— 硬性提示词、设计规格与创意简报
- **IDE 规则导出** —— `.cursorrules`、`claude-rules`、`windsurf-rules`
- **shadcn 主题安装** —— 为现有项目提供亮色与暗色 CSS 变量
- **llms.txt** —— 可被 AI 发现的文档，见 [`/llms.txt`](https://stylekit.top/llms.txt)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 创意工具

- **60 个动效**，支持实时预览与一键复制
- **36 个页面模板演示** —— SaaS、仪表盘、电商、作品集、博客
- **提示词库** —— 可复制的 UI、落地页、仪表盘、Tailwind 与暗色模式提示词
- **设计资源** —— 渐变、阴影、背景、排版与组件模式

</td>
<td width="50%" valign="top">

### 平台能力

- **双语支持** —— 完整的中英文内容
- **本地化路由** —— 中英文独立的公开页面
- **面向 LLM 的文档** —— `/llms.txt`、`/llms.md` 与 `/llms-full.txt`
- **生产运维手册** —— 部署、发版评审与风格编写文档

</td>
</tr>
</table>

## 风格目录

148 套风格，覆盖多个视觉与布局类别。每套风格都包含设计令牌、组件代码、AI 规则和精选预览。

<details>
<summary><strong>现代 / 科技</strong> —— 玻璃拟态、液态玻璃、新拟态、Bento 网格、Fluent Design、Material Design、Linear 风格 ...</summary>

面向 SaaS 产品、仪表盘和开发者工具的干净、专业风格。强调细腻的层次感、模糊效果与系统化的间距。

</details>

<details>
<summary><strong>粗野主义</strong> —— 新粗野主义、新粗野主义（活泼）、新粗野主义（柔和）、Brutalist Web、反设计</summary>

厚重边框、原始字体排版、高对比度。根据变体不同，从激进到俏皮各有取舍。

</details>

<details>
<summary><strong>品牌启发</strong> —— Apple 风格、Stripe 风格、Notion 风格、GitHub 风格、Shopify Clean、Linear 风格</summary>

从标志性产品中逆向提炼出的设计语言，非常适合作为产品 UI 的起点。

</details>

<details>
<summary><strong>复古 / 怀旧</strong> —— Art Deco、蒸汽波、VHS 美学、Y2K、Outrun、Synthwave、复古怀旧、Frutiger Aero</summary>

跨越数十年的怀旧美学，从 1920 年代的 Art Deco 到 2000 年代的 Y2K 与 Frutiger Aero。

</details>

<details>
<summary><strong>艺术</strong> —— 水彩、印象派油画、波普艺术、Risograph、拼贴艺术、水墨、生成艺术</summary>

把美术流派转译到 UI 设计中：绘画质感、半调网点与有机形态。

</details>

<details>
<summary><strong>日式 / 动漫</strong> —— 吉卜力风格、赛博动漫、少女漫画、浮世绘、像素动漫、霓虹武士、Kawaii 极简</summary>

从传统木版画到现代动漫美学的日本视觉文化。

</details>

<details>
<summary><strong>赛博朋克 / 科幻</strong> —— 赛博朋克霓虹、霓虹东京、科幻 HUD、机甲、全息、街机 CRT</summary>

霓虹浸染的高科技界面：终端绿、扫描线与全息效果。

</details>

<details>
<summary><strong>布局模式</strong> —— 杂志网格、瀑布流、分屏、视差、仪表盘布局、圣杯布局、F 型、Z 型</summary>

可与任意视觉风格搭配的结构模式：响应式网格、滚动驱动布局与经典页面结构。

</details>

<details>
<summary><strong>文化 / 地域</strong> —— 伊斯兰几何、印度节庆、非洲织物、韩式极简、赛博中国风、暗黑学院风</summary>

来自世界各地的设计传统，为现代 Web 界面重新适配。

</details>

<details>
<summary><strong>自然 / 温馨</strong> —— 田园核、北欧、侘寂、自然有机、太阳朋克、禅意庭院、热带天堂</summary>

温暖、有机、平静。大地色系、柔和质感与充裕留白。

</details>

<p align="center">
  <a href="https://stylekit.top/styles"><strong>浏览全部风格 &rarr;</strong></a>
</p>

## 快速开始

```bash
git clone https://github.com/AnxForever/stylekit.git
cd stylekit
pnpm install
pnpm dev
```

打开 [localhost:3000](http://localhost:3000)。Supabase 与管理员相关的可选配置见 [`.env.example`](.env.example)。

## 项目结构

- 仓库结构、运行时流程、源码边界与清理指引：[`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md)
- 新增或修改目录中的风格前请先阅读：[`docs/STYLE_AUTHORING.md`](docs/STYLE_AUTHORING.md)
- 生产部署：本地构建后，用你自己的进程管理器托管 `.next` 产物（`ecosystem.config.cjs` 提供了 PM2 示例）

## API 接口

稳定的 JSON 接口对外暴露已发布风格的元数据、令牌、配方与规则。

```http
GET  /api/styles                      # 列出全部风格
GET  /api/styles/{slug}               # 单个风格记录（tokens + recipes + rules）
GET  /api/styles/{slug}/tokens        # 仅设计令牌
GET  /api/styles/{slug}/recipes       # 仅组件配方
GET  /api/styles/stats                # 每个风格的浏览量、收藏数与评分聚合
```

## 在你的 shadcn 项目中使用

每套风格都同时发布为 [shadcn registry](https://ui.shadcn.com/docs/registry) 主题。一条命令即可把任意风格的亮色 + 暗色配色主题安装到现有 shadcn 项目：

```bash
npx shadcn add https://stylekit.top/r/glassmorphism.json
```

把 `glassmorphism` 换成任意 slug 即可 —— 完整列表见 [`/registry.json`](https://stylekit.top/registry.json) 或[风格画廊](https://stylekit.top/styles)。CLI 会把该风格的 `cssVars`（亮色 + 暗色）注入到你的 `globals.css`，并兼容 Tailwind v4。

> 前置条件：目标项目必须包含 `tsconfig.json`，否则 shadcn CLI 会以 `Couldn't find tsconfig.json` 退出。

完整指南见 [`docs/registry.md`](docs/registry.md)。

## 作为 Agent Skill 使用

一条命令，让 Cursor、Claude Code、Windsurf 或任何兼容 Agent Skills 的编码代理内置 StyleKit 的知识 —— 包括如何浏览风格、如何安装：

```bash
npx skills add AnxForever/stylekit-skill
```

之后你的代理就能按需套用这 148 套风格中的任意一套（比如「做成 Stripe 的样子」「赛博朋克风的仪表盘」），并使用正确的令牌与规则。技能本体在独立仓库 [`AnxForever/stylekit-skill`](https://github.com/AnxForever/stylekit-skill)；构建与发布方式见 [`docs/AGENT_SKILL_GUIDE.md`](docs/AGENT_SKILL_GUIDE.md)。

## 支持这个项目

如果 StyleKit 恰好帮到了你，欢迎扫码支持我把它继续做下去。金额随意，每一份心意我都很感谢。这也能帮忙分担服务器、域名与维护成本。

- 在网站的支持页面通过微信或支付宝打赏
- GitHub 仓库赞助入口：[`https://github.com/AnxForever/stylekit`](https://github.com/AnxForever/stylekit)
- 网站支持页面：[`https://stylekit.top/contact#support-maintenance`](https://stylekit.top/contact#support-maintenance)
- 公开的赞助反馈：[`GitHub Discussions`](https://github.com/AnxForever/stylekit/discussions)

当前收款码资源：

- 支付宝：[`public/alipay-qr.jpg`](public/alipay-qr.jpg)
- 微信赞赏：[`public/wechat-qr.png`](public/wechat-qr.png)

网站的支持板块由单个配置文件驱动：[`lib/site/support.ts`](lib/site/support.ts)。

## 技术栈

| 层级 | 技术 |
|-------|-----------|
| 框架 | Next.js 16 + Turbopack |
| UI | React 19、Radix UI、Lucide Icons |
| 样式 | Tailwind CSS 4、CVA |
| 认证与数据库 | Supabase（PostgreSQL + auth helpers） |
| 校验 | Zod 4 |
| 测试 | Vitest + Playwright |
| 部署 | 阿里云 ECS + Nginx + PM2 |

## 生产部署

`www.stylekit.top` 目前运行在北京地域的一台阿里云 ECS 实例上。

- 边缘与 TLS：ECS 主机上的 Nginx
- 应用进程：PM2 应用 `stylekit`
- 应用目录：`/www/stylekit`，由本地校验过的检出目录 rsync 同步
- 运行命令：PM2 直接托管 `next start -p 13000`（`node_modules/next/dist/bin/next`，不经 npm wrapper）

`vercel.json` 已不属于当前生效的生产部署路径，不应被当作 StyleKit 托管位置的事实来源。

发版前先跑上面的校验闸门；服务启动后可用 `/api/health` 查看运行状态。

## 参与贡献

欢迎贡献。提交 PR 前请先阅读：

1. [`CONTRIBUTING.md`](docs/CONTRIBUTING.md)
2. [`STYLE_ADDITION_CHECKLIST.md`](docs/STYLE_ADDITION_CHECKLIST.md) —— 新增风格必读

```bash
git checkout -b feat/your-feature
pnpm lint && pnpm test && pnpm build
git commit -m "feat: add your feature"
```

## Star 趋势

<img alt="Star History Chart" src="https://raw.githubusercontent.com/AnxForever/stylekit/main/public/readme/star-history.svg" />

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
