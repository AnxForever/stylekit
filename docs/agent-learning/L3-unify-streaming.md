# L3：消除流式/非流式重复

> **学习目标**：用 Extract Function + Discriminated Union 消除 `runAgentTurn` 和 `runAgentTurnStreaming` 之间 88% 的重复代码。
> **前置**：L1 心智模型、L2 Tool Calling。
> **课时**：1 节对话。
> **代码改动**：修改 `orchestrator.ts`（-237 行），行为完全一致。
> **状态**：✅ 完成（2026-04-17）。

---

## 1. L3 前的"病理"

```
runAgentTurn           runAgentTurnStreaming
    │                        │
    │  🔴 88% 重复            │
    │  (320 行一模一样)        │
    │                        │
    ▼                        ▼
 JSON 响应                 Stream 响应
 (~40 行独有)              (~60 行独有)
```

### 风险量化

- 改一个 bug 忘了改另一个的历史发生率：**100%**
- 两份代码走到不同分支的分叉风险：**随时间指数上升**
- 测试覆盖 2 个副本的成本：**×2**

---

## 2. L3 后的架构

```
                     prepareAgentTurn()
                            │
                   ┌────────┴────────┐
                   │                 │
             kind: "resolved"   kind: "responder_pending"
             (已有完整答案)       (done 阶段，待 responder)
                   │                 │
         ┌─────────┴───┐     ┌───────┴──────────┐
         │             │     │                  │
  runAgentTurn   runAgentTurnStreaming
  (JSON 响应)    (Stream 响应 + fallback)
```

---

## 3. 本次用的 3 个专业手段

### 3.1 Extract Function（函数提取）

> **Martin Fowler《重构》第一章**的经典手法。把重复/可命名的代码块抽成函数。

**什么时候用**：两段代码做**相同逻辑**，分叉点在少数几处。
**别滥用**：如果两段代码"看起来像但语义不同"，强行 Extract 会把**两种概念塞进一个函数**，更糟。

### 3.2 Discriminated Union（判别式联合类型）

```typescript
type AgentTurnPreparation =
  | { kind: "resolved"; assistantMessage: string; ... }
  | { kind: "responder_pending"; responderPrompt: {...}; ... };
```

**优势**：
- **类型系统自动缩窄**：`if (prep.kind === "resolved")` 后 TS 知道能访问 `assistantMessage`
- **显式状态**：读者一眼看清"这个函数有哪几种输出形态"
- **扩展友好**：加一种形态只加一个 union 成员

**反模式**：
```typescript
// ❌ 糟糕的等价物
interface Result {
  resolved: boolean;
  assistantMessage?: string;  // 有时有有时没有
  responderPrompt?: {...};     // 有时有有时没有
}
```
这种写法让 TS **无法帮你验证**访问合法性。

### 3.3 Behavior-Preserving Refactor（行为保持重构）

**核心纪律**：**重构 PR 不加功能**。
- 重构 = 改结构不改行为
- 新功能 = 改行为不改结构
- 混起来做 = 掉坑

本次严格遵守：
- 返回类型**完全一致**
- 所有分支覆盖**完全一致**
- 所有 toolTrace 条目**完全一致**
- 错误处理**完全一致**

验收标准：`tsc` 零错 + 逐段 diff 确认语义相同。

---

## 4. 具体改动

### 4.1 新增共享函数
```
lib/agent/orchestrator.ts
└── async function prepareAgentTurn(args) → AgentTurnPreparation
    ├── handles follow-up conversation branch
    ├── handles planner invocation (tool-calling + legacy fallback chain)
    ├── handles phase routing (consulting / confirm / done)
    └── preps responderPrompt for done phase
```

### 4.2 瘦身两个 caller
```
runAgentTurn           377 → 111 行  (−266)
runAgentTurnStreaming  391 → 90  行  (−301)
```

每个 caller 现在只剩 3 部分：
1. 调 `prepareAgentTurn`
2. `if (kind === "resolved") return 直接包装`
3. `else` 跑各自的 responder（JSON 或 Stream）

### 4.3 新增 import
```typescript
import type { ..., AgentPromptSnapshotEntry, ... } from "./types";
```

---

## 5. L3 自测清单

- [ ] 我能说出 Extract Function 的 2 个判断标准（"相同逻辑" + "少数分叉点"）
- [ ] 我知道 Discriminated Union 为什么比 optional fields 好
- [ ] 我理解 "Behavior-Preserving" 纪律的含义
- [ ] 我能指出 `prepareAgentTurn` 的两种返回形态各自代表什么
- [ ] 我知道为什么共享函数里不能调 responder（职责分离）

---

## 6. 本关新学到的术语（进 glossary）

- **Extract Function** — 函数提取重构手法
- **Discriminated Union** — 判别式联合类型（TS 最 idiomatic 的"多出口"表达）
- **Behavior-Preserving Refactor** — 行为保持重构
- **Template Method / Strategy Pattern** — 上一档重构手段（本次不需要）
- **Rule of Three** → 已在 L2 glossary

---

## 7. 下一关预告

**L4：Eval 评估体系**
L3 让你的代码变短了，但**没有测试保障"行为真的没变"**。
L4 就是建评估体系——从此**改 prompt 不再靠感觉**。

---

## 附录 A：为什么没走 Template Method

当时有 3 个方案：

| 方案 | 代码量 | 理解成本 | 灵活性 |
|---|---|---|---|
| **Extract Function**（选这个） | 最小 | 最低 | 够用 |
| Template Method | 中 | 中 | 多钩子可扩展 |
| Strategy Pattern | 大 | 高 | 策略可独立演进 |

**选择逻辑**：分叉点只有 1 个（responder 调法），且未来不会长出 5 种 responder。
**教学点**：**代码不是越 OOP 越好**——简单任务别上大招。