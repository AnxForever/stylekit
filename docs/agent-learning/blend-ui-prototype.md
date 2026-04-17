# Blend UI Prototype — Phase 3 Atom Composition

> 状态: Draft / 仅前端 + planner 接入设计，未实现。
> 作者: architect agent
> 对应 Phase: 3.x（在 Neo-Brutalist atoms 已落地之上的增量）

## 0. 前置事实核对

在设计前，已阅读以下真实文件，所有决策基于它们：

- `lib/styles/atoms/types.ts`：`StyleAtoms` 5 维 + `forbiddens`，`StyleAtomKey = "philosophy" | "layout" | "motion" | "color" | "typography"`。
- `lib/styles/atoms/index.ts`：`hasCompleteAtoms`、`readAtom` 已存在。
- `lib/styles/atoms/neo-brutalist.ts`：目前唯一挂载 atoms 的数据源。
- `lib/styles/index.ts`：`DesignStyle.atoms?: StyleAtoms` 已是可选字段，130+ 风格大多未填。
- `lib/agent/types.ts`：`AgentConsultPhase` 含 `goal | audience | feel | feel-layout | confirm | revise | refine | done`；`AgentPlannerResult` 已有 `styleSlug`、`layoutHint/motionHint/colorHint/typographyHint`。
- `lib/agent/planner-with-tools.ts`：feel 阶段先调 `search_styles` → 输出 3-4 个 `AgentSuggestedOption` → 用户选定后填 `visualTone` 与 `styleSlug`，进入 feel-layout。
- `lib/agent/prompt-composer.ts`：`buildAtomsSection` 从 **单个** `style.atoms` 读取 5 维并注入 system prompt；是本设计的核心接入点。
- `app/agent/_content.tsx`：`SuggestedOptionsBar`（行 736）、`ConfirmCard`（行 767）、`handleOptionSelect`（行 1320）、`SuggestedOptions` 只在 `phase !== "confirm"` 时渲染。

**关键约束**：App Router 下唯一的 agent 页面是 `app/agent/_content.tsx`（约 2000 行的客户端组件），`app/[locale]/agent/` 目录存在但为空。blend UI 必须作为该文件的子组件落地，不引入新路由。

## 1. 用户故事

### 1.1 (正向) 基础 + 单维度替换
Darling 在 feel 阶段被推荐 Neo-Brutalist，点选后风格卡片上方出现一个文本链接 "混合一点别的风格？"。展开 Blend Panel 后她在 `motion` 维度切到 Glassmorphism，其它 4 维仍跟随 Neo-Brutalist。进入 confirm 阶段时，ConfirmCard 的"视觉方向"行下面多一条 "动效来自 Glassmorphism" 的 badge。

### 1.2 (正向) 双维度组合
用户基础选 Neo-Brutalist，想要"硬朗骨架 + 温柔颜色"，在 Blend Panel 同时覆盖 `color = pastel-dream`。Panel 顶部出现实时预览 chip：`骨架 Neo-Brutalist · 颜色 Pastel Dream · 动效 Neo-Brutalist`。

### 1.3 (反向) 源风格不支持 atoms
用户想把 motion 覆盖为某个仅有 `aiRules` 但未挂 `atoms` 的老风格，`AtomSourcePicker` 会把该选项置灰，hover 提示 "该风格尚未拆分原子，暂不支持混合"。用户被引导回到已启用 atoms 的白名单。

### 1.4 (反向) 用户不想混合
用户看到 "混合一点别的风格？" 链接但不感兴趣，直接点 SuggestedOptionsBar 里的下一个方向或者等 LLM 自动进入 feel-layout。Blend Panel 保持折叠，`atomOverrides` 为空对象，后续流程与 Phase 3 行为完全一致。

### 1.5 (反向) 中途放弃混合
用户已覆盖了 motion 和 color，但在 confirm 阶段反悔，点 ConfirmCard 上的 `ResetBlendButton`，state 清空回到纯基础风格，planner 在下一轮 finalize 时不再带 `atomOverrides`。

**单风格路径 vs Blend 路径**：
- 两条路径共用同一基础风格选择交互（SuggestedOptionsBar），Blend 面板默认**折叠且可选**。
- `atomOverrides` 为空对象 ≡ 单风格路径；非空即 Blend 路径。
- 二者不需要独立入口，用户无需预先声明自己要走哪条。

## 2. 组件树

```
<BlendPanel>                     # feel 阶段基础风格已定后渲染；职责: 承载混合交互容器
  props:
    baseStyleSlug: string        # 来自 planner.styleSlug
    overrides: AtomOverrides     # 当前覆盖
    candidateStyles: DesignStyle[]  # 预过滤过 hasCompleteAtoms 的候选
    locale: Locale
    disabled: boolean
  emits:
    onChange(next: AtomOverrides)
    onReset()
│
├── <BlendPreviewStrip>          # 职责: 顶部实时展示当前 5 维来源的 chip 带
│     props: baseStyleSlug, overrides, candidateStyles, locale
│     emits: (none)
│
├── <AtomSourcePicker>           # 职责: 针对单一维度选择源风格（核心子组件）
│     props:
│       dimension: StyleAtomKey
│       baseStyleSlug: string
│       currentSource?: string            # undefined 表示仍用 base
│       candidateStyles: DesignStyle[]
│       locale: Locale
│       disabled: boolean
│     emits:
│       onPick(sourceSlug: string | null)  # null 表示回到 base
│   重复渲染 N 次（MVP: N=2，后续 N=5）
│
├── <AtomOverrideBadge>          # 职责: 展示某个维度"已被覆盖"的可关闭小标
│     props: dimension, sourceStyleName, locale
│     emits: onDismiss()
│   仅在对应维度存在覆盖时出现，跟随 AtomSourcePicker 一起渲染
│
└── <ResetBlendButton>           # 职责: 一键清空所有覆盖
      props: visible: boolean, disabled: boolean, locale
      emits: onReset()
```

**挂载位置**：`<BlendPanel>` 作为 `ChatMessageBubble` 之外的独立块，插入点与现有 `ConfirmCard` 对称——在 `app/agent/_content.tsx` 约 1711 行的 `SuggestedOptionsBar` 块**同级**条件渲染：

```
{!isWorking && planner?.phase === "feel" && planner.styleSlug ? (
  <BlendPanel ... />
) : null}
```

## 3. 状态模型

### 3.1 类型定义（新增 `lib/agent/atom-overrides.ts`）

```typescript
import type { StyleAtomKey } from "@/lib/styles/atoms";

/**
 * Key = 被覆盖的维度; Value = 源风格 slug（必须指向 hasCompleteAtoms 的 style）。
 * 不在表中的维度 → 跟随 baseStyleSlug。
 */
export type AtomOverrides = Partial<Record<StyleAtomKey, string>>;

/** 维度白名单：MVP 只开两个维度，后续逐步放开。 */
export const BLENDABLE_DIMENSIONS_MVP: readonly StyleAtomKey[] = ["motion", "color"] as const;
export const BLENDABLE_DIMENSIONS_FULL: readonly StyleAtomKey[] = [
  "philosophy", "layout", "motion", "color", "typography",
] as const;

export function isEmptyOverrides(ov: AtomOverrides): boolean {
  return Object.keys(ov).length === 0;
}
```

### 3.2 扩展 `AgentPlannerResult`（`lib/agent/types.ts`）

```typescript
export interface AgentPlannerResult {
  /* ...existing fields... */
  /** Phase 3.x: per-dimension atom source overrides. */
  atomOverrides?: AtomOverrides;
}
```

### 3.3 state 位置决策

| 候选位置 | 选择 | 理由 |
|---|---|---|
| **`AgentPlannerResult.atomOverrides`（server round-trip）** | **采用** | planner-with-tools 已有 `layoutHint/motionHint/...` 的 echo-back 机制，与现有 "finalize 原样回传 hint" 策略一致；composer 是服务端，必须拿到此字段才能多风格 merge |
| 客户端 local useState（不写回服务端） | 否决 | composer 在 server，拿不到就废 |
| URL query (`?blend=motion:glass,color:pastel`) | 部分备选 | 可做为"分享某个 blend 链接"的增强，不作为主干 |
| 全局 store (zustand/context) | 否决 | 不跨页面共享，无必要 |

**回传流程**：
1. 客户端 `BlendPanel` 维护 `local overrides` state。
2. 用户每次修改 → 客户端把 overrides 序列化为"用户消息"的 sidecar（在 `AgentChatRequest` 新增 `atomOverrides?: AtomOverrides` 字段）一并 POST 到 `/api/agent/chat`。
3. Planner 在 finalize 时读取请求中的 overrides 并写入 `AgentPlannerResult.atomOverrides`；后续每轮与 hint 字段一起 echo。
4. composer 从 `planner.atomOverrides` 读取，切换到多风格 merge 路径（见 §5）。

## 4. 交互流程图

```
┌─ feel 阶段 ─────────────────────────────────────────────────────────┐
│                                                                    │
│  user 发送 "我想做 landing"                                         │
│        │                                                           │
│        ▼                                                           │
│  planner.phase = "feel", suggestedOptions = [Neo-Brutalist, ...]    │
│        │                                                           │
│        ▼                                                           │
│  user 点 Neo-Brutalist chip  ──────────►  planner.styleSlug set    │
│        │                                                           │
│        ▼                                                           │
│  UI 渲染 <BlendPanel>（折叠态，链接文本: "混合一点别的风格？"）    │
│        │                                                           │
│        ▼                                                           │
│  user 展开 Panel → 点 motion 维度 → 弹出 AtomSourcePicker          │
│        │                                                           │
│        ▼                                                           │
│  user 选 "Glassmorphism"                                            │
│        │                                                           │
│        ▼                                                           │
│  setOverrides({ motion: "glassmorphism" })                         │
│  BlendPreviewStrip 更新: [骨架 Neo-B | 动效 Glass | ...]           │
│  AtomOverrideBadge(motion) 出现                                     │
│        │                                                           │
│        ▼                                                           │
│  user 点 "下一步" (复用原 composerSubmit) 或等 SuggestedOptionsBar  │
│  → handleSubmit POST { message, atomOverrides }                    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─ server /api/agent/chat ───────────────────────────────────────────┐
│  planner-with-tools.runPlanner 合并请求中的 atomOverrides           │
│  → finalize 输出 planner.atomOverrides                              │
│  → composeAgentCodePrompt 读取 overrides，进入 multi-atoms 合并路径 │
│  → buildAtomsSection 按维度分别从 base.atoms / source.atoms 抓取   │
└────────────────────────────────────────────────────────────────────┘
```

## 5. 对 planner / composer 的接入点

### 5.1 `lib/agent/types.ts`
- 新增 `AgentPlannerResult.atomOverrides?: AtomOverrides`。
- 新增 `AgentChatRequest.atomOverrides?: AtomOverrides`（用户 turn 时携带）。

### 5.2 `app/api/agent/chat/route.ts` + `app/api/agent/chat/stream/route.ts`
- 解析请求体中的 `atomOverrides` 并透传给 planner runner。
- 写入数据库时序列化存储（便于 session 回放）。

### 5.3 `lib/agent/planner-with-tools.ts`
- 在 `accumulateHints` 类似的辅助函数里新增 `accumulateOverrides(messages)`：遍历历史 assistant planner 找到最新非空 `atomOverrides` 作为默认值。
- Finalize JSON schema 扩一个可选字段 `atomOverrides`。
- System prompt 中补一条规则：
  > "若 request 中带 atomOverrides，必须在 finalize 中原样回传；不允许自行修改维度来源。"
- feel 阶段的 `search_styles` 结果需额外标注"是否支持混合"（即 `hasCompleteAtoms`）—— 返回给前端用来过滤候选。

### 5.4 `lib/agent/prompt-composer.ts`（本方案的工程重心）

当前 `buildAtomsSection(atoms, locale)` 接收单一 `StyleAtoms` 对象；改造为按维度分别解析：

```typescript
interface BlendedAtomSources {
  base: StyleAtoms;
  overrides: Partial<Record<StyleAtomKey, StyleAtoms>>;  // 已按 slug resolve
}

function resolveAtomsForBlend(
  baseSlug: string,
  overrides: AtomOverrides | undefined
): BlendedAtomSources | undefined { /* getStyleBySlug + hasCompleteAtoms */ }

function buildBlendedAtomsSection(sources: BlendedAtomSources, locale: Locale): string[] {
  // 每个维度打印 "来自 <style name>: <atom text>" 前缀，
  // forbiddens 取 base 的；若有来源风格带 forbiddens，附加但标注 "仅动效" 等作用域。
}
```

- `composeAgentCodePrompt` 在构造 user payload 时，当 `planner.atomOverrides && !isEmpty` → 走 `buildBlendedAtomsSection`，否则走现有 `buildAtomsSection`。
- system prompt 硬规则补一条：
  > "当 atoms 来自多个源风格，每一维的风格约束只在该维度生效，不得跨维度复用（例如源 A 的 motion 描述不得反向影响 color）。"

### 5.5 前端接入文件清单
| 文件 | 改动 |
|---|---|
| `app/agent/_content.tsx` | 引入 `<BlendPanel>`、`atomOverrides` 本地 state、`handleSubmit` 携带 overrides |
| `components/agent/blend/BlendPanel.tsx`（新） | 主容器 |
| `components/agent/blend/AtomSourcePicker.tsx`（新） | 单维度选择器 |
| `components/agent/blend/AtomOverrideBadge.tsx`（新） | 状态徽标 |
| `components/agent/blend/ResetBlendButton.tsx`（新） | 清空按钮 |
| `components/agent/blend/BlendPreviewStrip.tsx`（新） | 顶部 chip 带 |
| `lib/agent/atom-overrides.ts`（新） | 类型与维度白名单常量 |
| `lib/i18n/translations.ts` | `agent.blend.*` key 补全 |

## 6. 风险与待决问题

### 6.1 风格原子相互冲突
Neo-Brutalist 的 layout（"模块边界极硬，禁 border-radius > 4px"）与 Glassmorphism 的 layout（含软边界与 blur）放在一起，composer 理论上按维度分拣后不会打架；但若用户同时覆盖 layout + color 跨到两个强对立风格，仍可能产出"硬边框配玻璃渐变"的矛盾输出。
> **待决**：是否在 `AtomSourcePicker` 里引入"兼容性评分"矩阵（每对风格 × 每个维度 score 0-2），把低于阈值的选项标黄提醒？MVP 暂时不做，先靠 `forbiddens` 做硬约束过滤。

### 6.2 Forbiddens 的作用域
`StyleAtoms.forbiddens` 是风格级的（例如 Neo-Brutalist 禁 `rgba 半透明`），但如果用户把 color 维度换到 Glassmorphism，Glassmorphism 的核心就是半透明——base 的 forbiddens 会打脸 override。
> **待决方向**：composer 中对 `base.forbiddens` 按维度归类过滤：当 forbidden 文本匹配某被覆盖维度的典型关键词（color/motion 词库），自动豁免。需要新增一个轻量分类函数或在 atom data 上加 `scope: StyleAtomKey[]` 字段（向后兼容）。

### 6.3 支持 blend 的风格过少
当前仅 Neo-Brutalist 挂了 atoms，MVP 发布时候选集为空 → Blend Panel 形同虚设。
> **待决**：MVP 上线前必须把 Glassmorphism、Minimal、Bento Grid 三个主力风格的 atoms 补齐（独立 PR，阻塞 Blend UI 发布）。

### 6.4 移动端 UI 密度
feel 阶段已经有 `SuggestedOptionsBar`（4 个 chip）+ 即将出现的 Blend Panel，移动端纵向滚动会很重。
> **待决**：移动端把 Blend Panel 降级为一个 "Advanced" bottom-sheet 入口，默认完全隐藏；仅在用户主动点击时弹出全屏层。桌面端保留 inline 展开。

### 6.5 i18n 与 atom 文本兜底
`readAtom` 已支持 zh→en 回落，但覆盖提示文案（例如 "动效来自 Glassmorphism"）需要新的 i18n key；同时若用户切 locale 到 en 而源风格的 `StyleAtomField.en` 缺失，前端 preview 需走相同 fallback 路径，避免 UI 与 LLM 输入不一致。
> **待决**：`BlendPreviewStrip` 内部统一调 `readAtom`，不自行拼接。

### 6.6 会话回放 (session replay)
现有 `app/agent/_content.tsx` 的 `getReplayEntries` 依赖 `message.planner`，若 `atomOverrides` 只出现在最新 planner，历史回放里会丢失上下文。
> **待决**：把 `atomOverrides` 纳入 `AgentMessage.planner` 的持久化字段，与 hint 字段同等级。

## 7. MVP 切片

### Phase 3.1 — Blend MVP（2 维度 / 固定底座）
- 维度白名单：`["motion", "color"]`。
- 基础风格白名单：只允许 `neo-brutalist`（后面扩）。
- 源风格候选：所有 `hasCompleteAtoms === true` 的 style（初期需与 §6.3 的数据补齐 PR 同步）。
- UI：`BlendPanel` 折叠默认态 + 展开后 2 个 `AtomSourcePicker`。
- 服务端：`AgentPlannerResult.atomOverrides` 字段落地，composer 仅对这两个维度执行 blend，其它维度仍走单 style 路径。
- 不做：兼容性评分、forbiddens scope 归类、URL 分享。

### Phase 3.2 — 扩维度 + 扩底座
- 白名单扩展到 `["layout", "motion", "color", "typography"]`（philosophy 最后开放）。
- 基础风格白名单放开到所有 `hasCompleteAtoms` 风格。
- `forbiddens` 按维度 scope 归类（types 新增可选字段）。
- `BlendPreviewStrip` 增加实时预览缩略图（从 `lib/styles/*-tokens.ts` 派生颜色条）。

### Phase 3.3 — 智能冲突提示 + 分享
- 兼容性评分矩阵：静态打分表 + composer 层的 post-generation 校验。
- URL query 编码 overrides，支持"把这个 blend 分享给 Darling"一键链接。
- 引入一次 eval run（`docs/agent-learning/eval-latest.json`）量化 blend 质量。

---

### 附：关键文件绝对路径速查
- `/home/anx4758/stylekit/lib/styles/atoms/types.ts`
- `/home/anx4758/stylekit/lib/styles/atoms/index.ts`
- `/home/anx4758/stylekit/lib/styles/atoms/neo-brutalist.ts`
- `/home/anx4758/stylekit/lib/agent/types.ts`
- `/home/anx4758/stylekit/lib/agent/prompt-composer.ts`
- `/home/anx4758/stylekit/lib/agent/planner-with-tools.ts`
- `/home/anx4758/stylekit/app/agent/_content.tsx`
- `/home/anx4758/stylekit/app/api/agent/chat/route.ts`
- `/home/anx4758/stylekit/app/api/agent/chat/stream/route.ts`
