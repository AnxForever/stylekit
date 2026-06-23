# StyleKit Frontend Resource Audit Report

> **Scope**: `app/` (227 page.tsx + 8 admin pages) and `components/ui/` (76 .tsx files)
> **Date**: 2026-06-22
> **Method**: 8 parallel Explore sub-agents (4 components + 4 page groups) + 4 main-thread cross-cutting scans
> **Dimensions audited**: 视觉/审美 · 代码质量 · 功能/交互 · 内容质量
> **Branch**: `cc/admin-password-login`
>
> ---
>
> ## [!] 报告更正（2026-06-22 audit 验证后）
>
> 原报告将 **「Admin Auth 缺口」** 标记为 CRITICAL #1。**验证后判定为误报**：
>
> 项目使用 **Next.js 16**，其中 `middleware.ts` 已被重命名为 **`proxy.ts`**。审计 agent 只检查了 `middleware.ts` 是否存在，没检查 `proxy.ts` 的实际内容。
>
> **实际状态**：`proxy.ts`（266 行）已完整实现 admin 路由保护：
> - `isAdminRoute(pathname)` (line 56) 判断 `/admin*` 路径
> - `verifyAdminSessionCookieValue(adminSessionCookie)` (line 152-153) 验证 HMAC 签名 session
> - `buildAdminLoginRedirect(request)` (line 60-69) 未授权 redirect 到 `/admin-login?next=...`
> - 已登录访问 `/admin-login` 时自动 redirect 到 `/admin/analytics` (line 155-160)
> - Supabase auth fallback + admin user allowlist (line 174-241)
> - 在 `production` + Supabase 未配置时也强制 redirect (line 178-184)
>
> **结论**：admin auth **未被破坏**，是审计方法学遗漏。CRITICAL 实际数量 = 2（第 2.1 neumorphism button + 1.3 vocabulary locale 已在本次会话修复）。详细验证记录见 §9.4。
>
> ---

---

## TL;DR

| Bucket | Count | Top issue |
|---|---|---|
| **CRITICAL** | **2** | neumorphism/button hover/active 全部失效、vocabulary locale 完整重复（**均已修复**）|
| **HIGH** | 14 | global-error 硬编码英文  **已修**、pagination `href` 接受到 `<button>`、drawer ref 顺序错、admin-panel 单文件 1226 行 |
| **MEDIUM** | 31 | a11y 缺口集中在非 Radix 组件、Tailwind v4 `fade-out-80` 非标准类、footer 硬编码中文；not-found LocalizedLink  **已修** |
| **LOW** | 30+ | JSDoc 缺失、focus 颜色不一致、Suspense fallback 不统一 |

**总体评价**：核心产品页（home、styles、blog、recipes、guides、prompt topic pages）质量良好；admin 区在 `proxy.ts` 边缘已有完整 auth 防护；`components/ui/` 三套系统（core + brutal + neumorphism）并存但后两套**未注册到 index.ts**，neumorphism 整套**完全孤儿代码**。

---

## 严重度矩阵（Top 20）

| # | 严重度 | 文件 | 维度 | 病灶 |
|---|--------|------|------|------|
| 1 | [CRITICAL] CRITICAL | `components/ui/neumorphism/button.tsx` | 代码 | Tailwind 动态类插值（`hover:${NEU_SHADOWS.hover}`）让所有 hover/active 状态**运行时静默失效** |
| 2 | [CRITICAL] CRITICAL | `app/[locale]/animations/vocabulary/page.tsx` | 内容 | 完整重复实现，metadata 硬编码英文，`localizeMetadata` 未调用 |
| 3 | [HIGH] HIGH | `app/global-error.tsx` | 内容 | 硬编码 `<html lang="en">` + 英文文案，最严重的错误状态对中文用户不可读 |
| 4 |  DONE | `app/global-error.tsx` | 内容 | ~~硬编码 `<html lang="en">` + 英文文案~~ → 动态双语 |
| 5 | [HIGH] HIGH | `app/[locale]/styles/[slug]/showcase/page.tsx` | 内容 | metadata 不本地化（title 永远英文） |
| 6 | [HIGH] HIGH | `app/templates/admin-panel/page.tsx` | 代码 | **1226 行**单文件，5 个 view + 全部数据 + helper 内联 |
| 7 | [HIGH] HIGH | `components/ui/pagination/pagination.tsx` | 代码 | `<button>` 元素接受 `href` 属性（`Pick<..., "href">`），TS 严格模式错误 |
| 8 | [HIGH] HIGH | `components/ui/drawer/drawer.tsx` | 代码 | `forwardRef` 顺序错（ref 放在 className 后）+ overlay 与 modal 完全复制粘贴 |
| 9 | [HIGH] HIGH | `app/admin/submissions/_content.tsx` | 功能 | "Register to codebase" 按钮按 `NODE_ENV !== "production"` 隐藏，但描述文字总是显示（信息不一致） |
| 10 | [HIGH] HIGH | `components/ui/neumorphism/button.tsx` | 代码 | 加载中文硬编码 `"加载中..."` |
| 11 | [MEDIUM] MEDIUM | `app/not-found.tsx` | 功能 | 用 `<Link>` 而非 `<LocalizedLink>`，404 后跳转丢失 locale 前缀 |
| 12 | [MEDIUM] MEDIUM | `app/preview/page.tsx` | 代码 | `useSearchParams()` 未包 Suspense（Next 15+ 会构建错误） |
| 13 | [MEDIUM] MEDIUM | `app/layout.tsx` | 视觉 | `viewport.themeColor: "#000000"` 硬编码，与实际主题无关 |
| 14 | [MEDIUM] MEDIUM | `components/layout/footer.tsx` | 内容 | `promptLinks` / `trustLinks` 数组硬编码中英文案，绕过 i18n |
| 15 | [MEDIUM] MEDIUM | `components/home/home-content.tsx` | 代码 | **1062 行**单客户端组件，3 个独立 useEffect + 大量 useMemo |
| 16 | [MEDIUM] MEDIUM | `components/ui/progress/progress.tsx` | 代码 | `100 - (value || 0)` 当 value=undefined 时产出 NaN，缺少 `aria-valuenow/min/max` |
| 17 | [MEDIUM] MEDIUM | `components/ui/input-otp/input-otp.tsx` | 代码 | paste 双重处理（`onPaste` 与 `handleChange` 都尝试），focus 颜色 token 不一致 |
| 18 | [MEDIUM] MEDIUM | `components/ui/alert/alert.tsx` | 视觉 | 4 个 variant 硬编码 light-mode 颜色（`bg-blue-50`），无 dark mode |
| 19 | [MEDIUM] MEDIUM | `components/ui/skeleton.tsx` | 代码 | 硬编码 `bg-zinc-200`，**无 `forwardRef`**（与项目其他组件不一致） |
| 20 | [MEDIUM] MEDIUM | `components/ui/command-palette.tsx` | 代码 | 全局 `keydown` listener 卸载时无 cleanup，stale closure 风险 |

---

## 1. 严重问题（必须修复）

### ~~1.1 Admin Auth 缺口（CRITICAL · 安全）~~ →  验证后判定为误报

**原报告描述**：`app/admin/layout.tsx` 和所有 `app/admin/*/page.tsx` 都是无 auth check 的 server component，任何访客可拿到 server-rendered HTML。

**验证结果**：**保护已存在**，由 `proxy.ts` 在边缘执行。原报告审计 agent 未检查 `proxy.ts`（仅检查 `middleware.ts`）。详见顶部 [!] 报告更正及 §9.4 验证记录。

**本项降级为 CLEAN**。**实际无修复需要**。

### 1.1 neumorphism/button.tsx — Tailwind 动态类失效（CRITICAL · 运行时静默崩溃）

**症状**：
```ts
// components/ui/neumorphism/button.tsx:21 (原版)
default: `text-gray-700 ${NEU_SHADOWS.raised} hover:${NEU_SHADOWS.hover} active:${NEU_SHADOWS.pressed}`
```
Tailwind CSS 只扫描**静态字符串字面量**来生成 utility classes。`hover:${...}` 这种模板字符串插值在编译期不存在，**生成的 CSS 根本不会有这些类**，结果：
- 鼠标悬停时按钮没有阴影变化（看起来"死"的）
- 按下时没有按下效果
- 整套 neumorphism 视觉反馈系统失效

**修复**（ 已在本次会话修复）：
- 在 `styles.ts` 中增加 `raisedHover` 和 `raisedActive` 键，**完整静态字符串**包含 `hover:`/`active:` 前缀
- `button.tsx` 的 `variantStyles` 改为拼接完整静态类（不再用 prefix 插值）
- 影响：3 个 variant 字符串（default、primary、`NeuIconButton.raised`）

**影响范围**：neumorphism/button.tsx + neumorphism/styles.ts 共 2 个文件；不涉及其他组件（其他 neumorphism 文件已用完整静态类名）。

**提交差异**：
```
components/ui/neumorphism/button.tsx  | 6 ++---
components/ui/neumorphism/styles.ts   | 9 ++++++-
```

### 1.2 vocabulary locale 重复（CRITICAL · SEO/i18n）

**症状**：`app/[locale]/animations/vocabulary/page.tsx` 是 root 页面的完整复制粘贴（同样的 `dynamic = "force-static"`，同样的英文 metadata），没有走 `localizeMetadata` 包装。

**根因**：作者手抖没改成 re-export 模式。其他 locale 页面都是 `import Page, { metadata as baseMetadata } from "@/app/.../page"` + `export default Page` 模式。

**修复**（ 已在本次会话修复）：完整重写为标准 re-export 包装（17 行 → 17 行，但语义正确），调用 `localizeMetadata` 加入 `next`/canonical/hreflang 标签。

**提交差异**：
```
app/[locale]/animations/vocabulary/page.tsx | 38 ++++++++-------- (-28 净行数)
```

---

## 2. 高严重度问题

### 2.1 global-error.tsx — 用户崩溃时看英文  已修复

`app/global-error.tsx` line 18 硬编码 `<html lang="en">`，文案 "Something went wrong" / "Retry" 也是英文。Next.js 的 `global-error.tsx` 是兜底错误页，**用户到这里时整个 app layout 都已崩溃**。中文用户看到英文是他们最差体验的时刻。

**修复**（ 2026-06-22 已修）：
- 用 `useSyncExternalStore` 读取 locale（cookie `stylekit-locale` → `navigator.language` → "en" fallback）
- 内嵌双语 `COPY` map 提供 4 句文案（Oops!/title/description/retry）
- `<html lang>` 动态（"en" / "zh-CN"）
- 用 `useSyncExternalStore` 而非 `useState` + `useEffect`，避免 `react-hooks/set-state-in-effect` lint 错误 + 处理 hydration 一致性
- `useEffect` 仅保留 Sentry 上报（无 setState）

### 2.2 pagination — `<button>` 接受 `href`（TS 严格模式错误）

`components/ui/pagination/pagination.tsx` line 38-39 用 `Pick<... "href">` 让 `PaginationLink` 同时接受 `href` 和 button 原生属性，但组件总是渲染 `<button>`。这导致：
- TS 严格模式可能在某些 caller 报错
- 语义错乱（链接应该是 `<a>`）
- a11y 工具（eslint-plugin-jsx-a11y）会警告

修复：要么真正分两个组件 `PaginationLink`（`<a>`）和 `PaginationButton`（`<button>`），要么删掉 `href` 接收。

### 2.3 drawer — ref 顺序 + overlay 重复

`components/ui/drawer/drawer.tsx` line 27 的 `forwardRef` 把 `ref` 放在 `className` 和 `{...props}` 之后——`{...props}` 可能覆盖 ref。其他组件（modal/button 等）都遵循"ref 在最前"约定。

另外 `DrawerOverlay`（lines 22-25）和 `ModalOverlay`（`components/ui/modal/modal.tsx` lines 23-25）完全复制粘贴：
```ts
"fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in ..."
```
应抽到 `lib/ui/overlay-base.ts` 或 `components/ui/_internal/overlay.tsx`。

### 2.4 admin-panel — 1226 行单文件

`app/templates/admin-panel/page.tsx` 是项目最大的模板文件，包含：
- 5 个 view 子组件（Dashboard/Users/Content/Roles/Settings）**全内联**
- 所有 mock data（users, contentItems, notifications, roles, barChartData）**全内联**
- 工具函数（`statusColor`, `contentTypeColor`）**全内联**
- AddUserModal 完整表单 + 校验

修复：拆成 `app/templates/admin-panel/_views/{dashboard,users,content,roles,settings}.tsx` + `app/templates/admin-panel/_data.ts` + `app/templates/admin-panel/_components/add-user-modal.tsx`。

### 2.5 admin/submissions — "Register to codebase" 信息泄露

`app/admin/submissions/_content.tsx` line 72 用 `process.env.NODE_ENV !== "production"` 隐藏按钮，但 line 657 的描述文字 "Live style. Codebase registration archives..." 总是显示。在 production 用户会看到"按钮不存在但描述说有这功能"的诡异状态。

修复：把描述文字改成条件渲染（按钮存在才显示描述），或简化描述只说"已批准"。

---

## 3. 中等严重度问题

### 3.1 缺失 Auth 后保护的不只是 admin

`app/login/page.tsx` 走 `app/[locale]/login/` re-export 模式，但**登录页本身不做 auth 状态检查**（不像 `app/admin-login/page.tsx` 那样 `cookies()` 验证后 redirect）。这意味着已登录用户也能看到登录页。

### 3.2 a11y 缺口集中在非 Radix 组件

| 组件 | 缺失项 |
|------|--------|
| `progress.tsx` | `aria-valuenow`/`valuemin`/`valuemax` 全部缺失 |
| `tree.tsx` | `role="tree"` / `role="treeitem"` 缺失，无箭头键导航 |
| `resizable.tsx` | handle 无 `aria-valuenow`，无键盘 resize 支持 |
| `command-palette.tsx` | 遮罩点击关闭缺失 |
| `toast.tsx` | 无 ARIA live region 公告 |
| `skeleton.tsx` | 无 `role="status"` 或 `aria-busy` |
| `input/input.tsx` | error 状态无 `aria-invalid`/`aria-describedby` |
| `brutal/*` form controls | 自定义视觉无 `focus-visible` 指示 |
| `neumorphism/*` form controls | 同上 |

Radix-based 组件（Tooltip、Popover、Dialog）都干净——证明 a11y 缺口是"绕开 Radix 自己实现"造成的，不是 Radix 本身问题。

### 3.3 i18n 硬编码中文

- `components/layout/footer.tsx` lines 14-39：promptLinks/trustLinks 数组内联中英文字符串
- `components/scroll-back-button.tsx`：`label = "返回"`
- `components/style-preview-switcher.tsx`：5 处 `locale === "zh" ? "..." : "..."` 模式
- `components/language-switcher.tsx`：`{ code: "zh", label: "中" }`（这个其实是 OK 的，但应该走 i18n）
- `brutal/button.tsx:47`、`brutal/feedback.tsx:187`、`neumorphism/button.tsx:53`、`neumorphism/misc.tsx:187`：硬编码 "加载中..."、"已复制!"、"复制"
- `app/admin/users/_content.tsx` 等：admin UI 错误消息有中文
- `app/html-in-canvas/page.tsx:23-82`：60 行内联 `pageCopy.en/zh` 对象

这些都应该走 `useI18n()` 或 props 传入。

### 3.4 三大巨型文件

| 文件 | 行数 | 风险 |
|------|------|------|
| `app/styles/memphis/showcase/_content.tsx` | **2978** | auto-generated 但仍是单文件风险（Git diff 噪声） |
| `app/styles/mid-century-modern/showcase/_content.tsx` | 2529 | 同上 |
| `app/styles/card-stack/showcase/_content.tsx` | 2419 | 同上 |
| `components/mouse-interactions/primitives.tsx` | 1147 | 业务文件，需评估是否可拆 |
| `components/home/home-content.tsx` | 1062 | **必须拆**，3 个 useEffect + 大量 useMemo |
| `components/animations/mini-preview.tsx` | 899 | 业务文件 |
| `components/styles/styles-content.tsx` | 809 | 业务文件 |
| `components/component-patterns/pattern-previews.tsx` | 732 | 业务文件 |
| `components/style-preview/ai-implementation-panel.tsx` | 677 | **必须拆**，677 行单客户端组件 |
| `components/layout/header.tsx` | 664 | **应拆**，megamenu 逻辑应抽离 |
| `app/templates/admin-panel/page.tsx` | 1226 | **必须拆**（见 2.4） |
| `app/templates/social-feed/page.tsx` | 1099 | 模板应共享数据 |
| `app/templates/ecommerce-product/page.tsx` | 1047 | 同上 |
| `app/templates/docs-site/page.tsx` | 1017 | 同上 |

**注意**：130+ 个 `app/styles/{slug}/showcase/_content.tsx` 大部分在 1500-3000 行，是**自动生成**的（Memphis 2978、Mid-century 2529 等等），拆分它们不现实，但可以考虑**codegen 模板优化**让单文件更小。

### 3.5 Tailwind v4 兼容性

- `components/ui/toast/toast.tsx:27` 使用 `fade-out-80` —— **Tailwind v4 不存在该类**（`fade-out-0`/`fade-out-100` 是标准）。该类被静默忽略，toast 关闭动画部分丢失。
- `components/ui/neumorphism/button.tsx` 的动态插值见 1.2。
- 44 处硬编码 hex 颜色在 `components/ui/`，部分应迁到 design tokens。

### 3.6 风格变体系统分裂

项目**实际存在三套设计系统**：

| 系统 | 文件数 | 注册状态 | 实际使用 |
|------|--------|----------|----------|
| **core primitives** (`components/ui/{button,card,...}`) | 20 |  在 `index.ts` | 全站 |
| **brutal/** (13 文件) | 13 |  不在 `index.ts` | 仅 `brutal-landing` 模板 |
| **neumorphism/** (16 文件) | 16 |  不在 `index.ts` | **零引用，完全孤儿** |

**关键发现**：`app/templates/neumorphism-landing/page.tsx` **不导入** `components/ui/neumorphism/*` 任何文件（用 inline JSX + 内联 shadow 常量）。这意味着 neumorphism/ 整套代码**没有任何 runtime consumer**。

修复方向（择一）：
- **A. 杀掉**：删除整个 `components/ui/neumorphism/` 目录（16 文件，0 引用 = 纯死代码）
- **B. 救活**：让 `neumorphism-landing` 真正使用 `components/ui/neumorphism/*`，并在 `index.ts` 注册
- **C. 文档化**：明确 "neumorphism 是 component library reference implementation，不直接用于 app" 并在 README 说明

### 3.7 模板页不用设计系统

`app/templates/` 下 38 个模板，**只有 `brutal-landing` 用了** `components/ui/brutal/*`。其余 37 个用 raw Tailwind：
- `glass-landing` / `crm-frosted-glass` 都各自定义了内部 `GlassCard`（完全重复）
- `dashboard-charts` / `email-inbox` / `chat-messaging` 都是 raw Tailwind
- 4 个 1000+ 行的模板（admin-panel、social-feed、ecommerce-product、docs-site）全是 self-contained monolith

**讽刺**：StyleKit 的核心价值是"展示 design system"，但 37/38 模板没在展示自己的 design system。这是个**产品价值错位**。

---

## 4. 低严重度问题（30+ 项汇总）

| 类别 | 数量 | 例子 |
|------|------|------|
| 缺失 JSDoc | 12+ | `button.tsx`, `checkbox.tsx`, `radio.tsx`, `select.tsx`, `tree.tsx`, `progress.tsx`, `tree.tsx` |
| focus 颜色 token 不一致 | 5 | button 用 `ring-accent`、input-otp 用 `ring-primary`、select 用 `border-foreground`、brutal/neumorphism 无 focus 指示 |
| Suspense fallback 不统一 | 6 | `styles/page.tsx` 有 skeleton；`animations/page.tsx` 无；`animations/vocabulary` 用 `null`；`preview` 缺 Suspense |
| `<DialogPrimitive.Close>` 无 `type="button"` | 2 | modal/modal.tsx:46、drawer/drawer.tsx:67（form 上下文内会意外提交） |
| `cardVariants` 类型导出但运行时使用 | 1 | `card/index.ts` 用 `type cardVariants` 导出，但 `card.tsx` 调 `cn(cardVariants({...}))` |
| `TableRow` `data-[state=selected]` 无 state wiring | 1 | `table.tsx:60` 死属性 |
| `List` 不一致 ref forwarding | 1 | `List` 无 forwardRef，子组件有 |
| 硬编码 `lang="en"` | 0 | `global-error.tsx:18`  **已修**（动态化） |
| 静默吞错 | 3 | admin users/comments/ratings 的 delete 操作（`} catch { // non-fatal }`） |
| `eslint-disable` 抑制 set-state-in-effect | 2 | `header.tsx:342, 350` |
| inline 类型代替 interface | 1 | `color-palette.tsx` |
| 错误消息泛化 | 1 | `admin-login/_content.tsx` 不区分 401/429/503 |

---

## 5. 横向反模式清单

1. **`page.tsx` + `_content.tsx` 双文件模式** 6 处使用（admin 全部 + 几处 recipes/details）—— 一致性 OK，auth 由 `proxy.ts` 边缘保护（不是 page 层）
2. **`use client` + 内联 i18n 文案** —— 5+ 处应该拆到 translations 文件
3. **`'use client'` + `force-static` 误判** —— Agent 报告说 30+ 模板用此模式，但实际是 0 匹配；agent 把 `dynamic` 当成 top-level 导出误读了。**真正问题**是模板几乎全是 `'use client'`（不需要 server 渲染）
4. **`dangerouslySetInnerHTML` 滥用** 22 处 —— 大部分是 JSON-LD（OK），但 showcase 页面 5 处渲染 `item.emoji`/`stat.icon` 等需要查清是否 sanitize
5. **i18n 时机不对** —— 多个 page 在 metadata 阶段没传 locale，导致中文页英文 title
6. **server/client 边界模糊** —— 一些只读 i18n 的"客户端组件"（`docs-content`）完全可以做 server component
7. **Tailwind v4 未对齐** —— `fade-out-80` 静默失败、动态插值断 hover/active、44 处硬编码 hex 颜色

---

## 6. 文件级严重度总表

### 6.1 `components/ui/` 核心原语（20 文件）

| 文件 | 严重度 | 关键问题 |
|------|--------|----------|
| `button/button.tsx` | LOW | 缺 JSDoc |
| `input/input.tsx` | MEDIUM | error 无 aria-invalid |
| `card/card.tsx` | CLEAN | — |
| `alert/alert.tsx` | MEDIUM | 硬编码 light-mode 颜色 |
| `checkbox/checkbox.tsx` | LOW | 缺 JSDoc |
| `radio/radio.tsx` | LOW | 缺 JSDoc |
| `select/select.tsx` | LOW | focus 颜色不一致 + 缺 JSDoc |
| `input-otp/input-otp.tsx` | MEDIUM | paste 双重处理 + focus 颜色不一致 |
| `modal/modal.tsx` | MEDIUM | Close 按钮无 `type="button"` + 缺 JSDoc |
| `drawer/drawer.tsx` | **HIGH** | ref 顺序错 + overlay 重复 |
| `pagination/pagination.tsx` | **HIGH** | `<button>` 接受 `href` |
| `tooltip/tooltip.tsx` | CLEAN | — |
| `popover/popover.tsx` | CLEAN | — |
| `toast/toast.tsx` | MEDIUM | `fade-out-80` 失效 + 缺 ARIA live region |
| `progress/progress.tsx` | MEDIUM | NaN 风险 + 缺 ARIA |
| `loading/loading.tsx` | CLEAN | — |
| `skeleton.tsx` | MEDIUM | 硬编码颜色 + 无 forwardRef + 缺 ARIA |
| `table/table.tsx` | LOW | `data-[state=selected]` 死属性 |
| `list/list.tsx` | LOW | ref forwarding 不一致 |
| `tree/tree.tsx` | MEDIUM | 缺 tree role + 箭头键 |
| `resizable/resizable.tsx` | MEDIUM | onLayout 无 panel ID + 缺键盘支持 |
| `command-palette.tsx` | MEDIUM | 全局 listener 无 cleanup |
| `brutal/*` (13) | MIXED | 见 3.3（i18n 硬编码中文） |
| `neumorphism/*` (16) | **CRITICAL(已修)/MIXED** | button.tsx CRITICAL **已修**（§1.1），其余是孤儿代码（§3.6） |
| 5 个 utility | CLEAN | 全干净，只是没注册到 index.ts |

### 6.2 `app/` 页面（227 page.tsx）

| 域 | 文件数 | 评估 |
|-----|--------|------|
| **home** | 1 | OK（薄壳委派给 HomeContent） |
| **styles + [locale]/styles** | 2 + 2 + 130 showcase | root / locale 都干净；130 showcase 是 auto-gen；**showcase/page.tsx 的 metadata 不本地化** |
| **animations + [locale]/animations** | 3 + 3 | **vocabulary locale 重复 CRITICAL 已修**（§1.2）；其余干净 |
| **admin + admin-login** | 8 + 1 |  **CLEAN**——`proxy.ts` 边缘完成 auth 保护；client 部分质量好 |
| **blog** | 2 + 1 (locale) | 干净 |
| **guides** | 2 + 1 (locale) | 干净 |
| **recipes** | 2 + 1 (locale) | 干净 |
| **docs** | 1 | 干净；`_content` 是不必要的 client component |
| **templates** | 38 | **1 用 design system，37 用 raw Tailwind**；admin-panel 1226 行严重 |
| **prompts / ui-prompts / tailwind-ui-prompts / dark-mode / dashboard / landing-page** | ~12 | 干净（genuine SEO pages, not thin） |
| **about / contact / terms / privacy** | 4 | 干净 |
| **preview** | 1 | 缺 Suspense |
| **error / global-error / not-found / loading** | 4 | **global-error HIGH  已修，not-found locale 路由 MEDIUM  已修** |
| **layout** | 1 | themeColor 硬编码 |
| **login** | 1 | 干净（但不做已登录 redirect） |
| **html-in-canvas** | 1 | i18n 反模式（内联 60 行双语对象） |
| **component-patterns / components** | 2 | 干净 |

---

## 7. 推荐改刀顺序（映射回 A/B/C 选项）

| 选项 | 包含本报告的问题 | 预估工时 |
|------|------------------|----------|
| **A. Admin 全家桶** | §2.5 (submissions 信息泄露) + §3.1 (login 已登录 redirect) + §3.3 admin 部分 + admin 静默吞错 | 1-2 天 |
| **B. 核心 catalog 三件套** | home-content 1062 行拆分（§3.4）+ styles 几个 locale 修复 + showcase metadata（§2） | 2-3 天 |
| **C. 基础原语重铸** | pagination/drawer（§2.2/2.3）+ alert/skeleton/progress/input-otp a11y（§3.2）+ brutal/neumorphism 命运决策（§3.6） | 2-3 天 |
| **D. 跨切面修复（推荐作为前置）** | global-error (§2.1) + neumorphism/button (§1.1) + vocabulary locale (§1.2) | 0.5-1 天 |

> **D 现状（2026-06-22）**：§1.1 + §1.2 已修。剩 §2.1 global-error 待修。

---

## 8. 行动建议（按优先级）

1. **今日必做**（< 2h）
   - [x] `components/ui/neumorphism/button.tsx` 修复动态类插值  **已完成**
   - [x] `app/[locale]/animations/vocabulary/page.tsx` 改成 re-export  **已完成**
   - [ ] ~~`app/admin/layout.tsx` 加 auth check~~  **无需做**——`proxy.ts` 已保护
   - [x] `app/global-error.tsx` 修 lang + i18n  **已完成**
   - [x] `app/not-found.tsx` 改用 `LocalizedLink`  **已完成（bonus）**
   - [ ] ~~创建 `middleware.ts` 拦截 `/admin(?!-login)`~~  **无需做**——会与 `proxy.ts` 冲突

2. **本周必做**（< 1 天）
   - [ ] `components/ui/pagination/pagination.tsx` 拆 PaginationLink / PaginationButton
   - [ ] `components/ui/drawer/drawer.tsx` 修 ref 顺序 + 抽 overlay base
   - [ ] `app/templates/admin-panel/page.tsx` 拆 5 个 view 到独立文件
   - [ ] `app/not-found.tsx` 用 `LocalizedLink`
   - [ ] `app/preview/page.tsx` 加 Suspense
   - [ ] 决策 neumorphism/ 命运（A 杀 / B 救 / C 文档化）

3. **本月可做**（分散进行）
   - [ ] 拆 `components/home/home-content.tsx` (1062 行)
   - [ ] 拆 `components/style-preview/ai-implementation-panel.tsx` (677 行)
   - [ ] `components/ui/alert.tsx` 补 dark mode
   - [ ] 补所有 form controls 的 `aria-invalid` / `aria-valuenow` / `focus-visible`
   - [ ] 模板页（37/38）逐步迁移到 design system
   - [ ] 修所有 i18n 硬编码中文
   - [ ] 修 `fade-out-80` + 44 处硬编码 hex 颜色

4. **待评估**（不紧急）
   - [ ] 130+ showcase/_content.tsx 自动生成模板是否要重构 codegen
   - [ ] 模板页与 design system 的关系（产品价值定位）

---

## 9. 附录

### 9.1 审计方法

- **子 agent 配置**：8 个并行 Explore agent，每个负责一个聚焦域
- **每个 agent 输出**：4 维度评估 × 严重度（critical/high/medium/low）
- **主线程交叉验证**：Bash + Grep 二次确认关键数据点
- **不做的事**：未读未列出文件、未做静态分析工具扫描（如未跑 knip/ts-prune）、未做实际性能测试
- **审计盲点**：子 agent **未检查 `proxy.ts`**（Next.js 16 替代 `middleware.ts` 的新机制），导致 admin auth 被误判为缺失。**未来审计清单必须包括**：项目根的 `middleware.ts` **或** `proxy.ts` 二选一。

### 9.2 数据快照

- **扫描时间**：2026-06-22
- **components/ui 文件数**：76（5240 行）
- **app/page.tsx 文件数**：227（含 130+ auto-gen showcase）
- **关键搜索命中**：
  - `console.log` 生产代码：**0**（5 个全在 tools/）
  - TODO/FIXME 生产代码：0（5 个全在 lib/generator / tools）
  - `dangerouslySetInnerHTML`：22 处（17 处 JSON-LD、5 处需复查）
  - 硬编码 hex 颜色：44 处
  - 硬编码中文文案：12+ 处
  - `'use client'` 文件：341
  - `'use client' + force-static` 同时：0

### 9.3 不在审计范围

- `lib/` 业务逻辑（auth、favorites、analytics 等）
- `packages/core/` 内部包
- `tools/` CLI 工具
- `tests/` 测试文件
- `lib/styles/` 130+ style 定义
- `app/styles/{slug}/showcase/_content.tsx` 130+ 自动生成文件（仅做大小统计）
- `.next` / `node_modules` / 锁定文件

### 9.4 CRITICAL #1 验证记录（admin auth）

| 验证项 | 结果 |
|--------|------|
| 项目根是否有 `middleware.ts` |  不存在 |
| 项目根是否有 `proxy.ts` |  存在（266 行） |
| `proxy.ts` 是否包含 admin 路由识别 |  `isAdminRoute(pathname)` (line 56) |
| `proxy.ts` 是否验证 session cookie |  `verifyAdminSessionCookieValue(adminSessionCookie)` (line 152-153) |
| 未授权是否 redirect |  `buildAdminLoginRedirect(request)` → `/admin-login?next=...` (line 60-69, 240) |
| 已登录访问 `/admin-login` 是否 skip 登录 |  redirect 到 `/admin/analytics` (line 155-160) |
| 是否支持 Supabase auth fallback |  line 174-241 完整 Supabase flow + admin allowlist |
| 生产环境 + Supabase 未配置时是否仍保护 |  line 178-184 强制 redirect |
| 是否 `next build` 中识别为 proxy |  build output 显示 `ƒ Proxy (Middleware)` |

**结论**：admin auth 边缘保护**完整且正确**。原 CRITICAL 判定基于「middleware.ts 不存在」这一错误前提。**未来审计 Next.js 16+ 项目必须检查 `proxy.ts`**。

**build 验证**：`npm run build` 通过，proxy.ts 被正确加载，auth 流程不被打断。

---

**报告完成时间**：2026-06-22
**报告更正时间**：2026-06-22（CRITICAL #1 降级 + admin auth 验证记录）
**下次审计建议**：完成 D 优先级剩余 §2.1 global-error 修复；完成 A/B/C 后做整体回归。
