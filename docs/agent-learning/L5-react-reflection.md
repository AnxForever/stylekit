# L5：ReAct + Reflection

> **学习目标**：给 agent 加"第二眼"——Reflection 层，能在低成本下抓住 Planner 的低级错误。
> **前置**：L1-L4，尤其 L2 (Tool Calling) 和 L4 (Eval)。
> **课时**：1 节对话。
> **代码改动**：新增 `reflector.ts`，orchestrator.ts 加 feature flag。
> **状态**：✅ 完成（2026-04-17）。

---

## 1. 概念三角：CoT vs ReAct vs Reflection

这 3 个词业界经常混用，但它们是**完全不同的东西**：

```
┌────────────────────────────────────────────────────────┐
│  💭 CoT (Chain-of-Thought)                             │
│     "想了再说" — 单次、被动                            │
│                                                        │
│  🔁 ReAct (Reasoning + Acting)                         │
│     "边想边做" — 多轮、主动                            │
│     Thought → Action → Observation → Thought...       │
│                                                        │
│  🪞 Reflection                                          │
│     "说完回头看" — 自我批评、自我修正                  │
└────────────────────────────────────────────────────────┘
```

| 机制 | 核心动作 | 轮次 | 成本 | 效益 |
|---|---|---|---|---|
| **CoT** | 写出推理过程再给答案 | 1 | 低 | 中 |
| **ReAct** | Thought + Action + Observation 循环 | 多 | 高 | 高 |
| **Reflection** | 评判自己上一轮，决定要不要改 | 2+ | 中 | 高 |
| **Reflexion** | Reflection + 持久化"反思日记" | 多 | 高 | 最高 |

**你项目现在的状态**：
- ✅ ReAct：L2 的 tool calling loop 就是轻量 ReAct
- ✅ Reflection：**L5 已加**（本关）
- ❌ Reflexion：L6 可选（需要长期记忆）
- ❌ CoT：没显式用（planner system prompt 没写 "step by step"）

---

## 2. 本次交付

### 2.1 文件清单
```
lib/agent/
  ├── reflector.ts                     ← 🆕 220 行
  │   ├── detectSuspiciousPlanner()    — 廉价启发式预筛
  │   ├── runReflection()              — LLM 评审（温度 0.1）
  │   └── runPlannerWithReflection()   — 组合：planner → reflect → retry?
  │
  ├── planner-with-tools.ts             ← 未动（保持职责单一）
  └── orchestrator.ts                    ← 加 USE_REFLECTION feature flag

lib/agent/__tests__/
  └── eval-harness.ts                   ← mock ./reflector 让 eval 确定性
```

### 2.2 Feature flag 双层控制
```bash
AGENT_USE_TOOL_CALLING=true   # L2 开关
AGENT_USE_REFLECTION=true     # L5 开关（需要 L2 也开）
```

关 reflection（秒级回退）：
```bash
AGENT_USE_REFLECTION=false
```

### 2.3 Eval 影响
`eval-harness.ts` mock 了 `runPlannerWithReflection` 直接走 `runPlannerWithTools`——eval 测试**完全不受 reflection 影响**，保持确定性。
当前 baseline 依然 6/6 × 100%。

---

## 3. 关键设计决策

### 3.1 为什么用 Heuristic Pre-Filter（廉价启发式）

**专业做法**：在昂贵的 LLM 之前，**先用代码规则判断**。
`detectSuspiciousPlanner` 检查 6 个可疑信号：
```typescript
- done 阶段但 ready=false
- feel 阶段但 styleSlug 空
- styleSlug 指向不存在的 style
- suggestedOptions 越界（<2 或 >6）
- 非 done/revise 阶段但 followUpQuestion 空
```

80%+ turn 会直接跳过 reflection → 省 API 成本。

**术语**：这是 **Cascade Pattern** 的缩略版——廉价 check → 昂贵 LLM。

### 3.2 为什么只 retry 一次

**无限重试**会变成刷卡消费。**永远不退**又抓不到模型固执的 bug。
**一次 retry** 是最好的平衡：80% 情况下反思会让模型修正；拒不改的模型就保留原始输出别让它继续烧钱。

### 3.3 为什么 reflection 错误时"默认 ok"

关键纪律：**reflection 是 non-blocking 增强，不是 gate**。
如果 reflector LLM 挂了：
- ❌ 错误做法：抛错，阻断用户 turn
- ✅ 我们做法：记 warn 日志，**fall back 到原始 planner 输出**

`runReflection` 内部 `try/catch` 确保任何异常都返回 `{ ok: true, severity: "none" }` 默认通过。

### 3.4 为什么用 synthetic user message 传递反馈

**Retry 时**，我们在消息数组末尾加一条：
```
role: "user"
content: "[INTERNAL_REVIEWER_FEEDBACK]
         The previous planner output had these issues:
         - styleSlug 'glasmorphism' is not a valid slug
         Suggested fix: choose from glassmorphism or neo-brutalist"
```

这样 planner LLM 看到后能理解"反馈"概念并调整。**比改 system prompt 干净**（不破坏 prompt 模板）。

---

## 4. Reflection 的 7 类常见失误类型

本 reflector 当前检测的信号（每个对应一个代码里的 return 语句）：

| # | 错误类型 | 触发信号 | 业务影响 |
|---|---|---|---|
| 1 | Phase 矛盾 | done + !ready | 用户看到不完整生成 |
| 2 | Feel 无 slug | feel + styleSlug="" | 后续生成用错风格 |
| 3 | Slug 不存在 | getStyleBySlug(x)==undef | 运行时报错 |
| 4 | 选项过少 | 非终态 + options<2 | 用户没得选 |
| 5 | 选项过多 | options>6 | 选择疲劳 |
| 6 | 问题为空 | 非终态 + followUp="" | UI 空白 |
| 7 | ~~语种错误~~ | 待 L6 加 | 翻译混乱 |

---

## 5. 性能与成本

### 成本估算
假设：1000 turns/day，其中：
- 80% 健康 turn → 只跑 planner（1 LLM call）= 800 次
- 20% 可疑 turn → planner + reflection（2 calls）= 200 × 2 = 400 次
- 其中 1/4 触发 retry → + 50 次 planner retry

**每天总 LLM 调用**：800 + 400 + 50 = **1250 次**
**纯 planner**：1000 次
**Reflection 溢价**：**+25%**

这是 **"可接受的"Reflection 成本**——比全量 reflection（+100%）低 4 倍。

### 延迟
- 健康 turn：0 额外延迟
- 触发 reflection：+0.5-1.5s
- 触发 retry：+2-4s

**UX 建议**：done 阶段的 reflection+retry 可能让用户等 ~5s，建议前端加 loading tip "正在自我审核..."。

---

## 6. L5 自测清单

- [ ] 我能区分 CoT / ReAct / Reflection / Reflexion 4 个概念
- [ ] 我知道 Conditional Reflection 为什么比 Always-on 好
- [ ] 我理解 Cascade Pattern（廉价 check → 昂贵 LLM）
- [ ] 我能说出 Reflection 失败时为什么要"默认 ok"
- [ ] 我知道为什么 eval 里要 mock reflector
- [ ] 我能用 env 开关关/开 reflection

---

## 7. 本关新增术语（进 glossary）

- **Chain-of-Thought (CoT)** — 让 LLM 先推理再给答案
- **Reflection** — LLM 评判自己上一轮
- **Reflexion** — Reflection + 持久化反思日记
- **Self-Consistency** — 多次生成投票
- **Self-RAG** — 检索辅助的自我纠错
- **Tree of Thoughts (ToT)** — 多分支探索
- **Constitutional AI** — 用宪法原则做自我审查
- **Heuristic Pre-Filter** — 用代码规则先筛，省 LLM 调用
- **Cascade Pattern** — 廉价 check → 昂贵 LLM 分层
- **Conditional Reflection** — 只在可疑时反思
- **Always-on Reflection** — 每轮都反思（反模式）
- **Synthetic Feedback Message** — 注入虚拟 user 消息传递反馈
- **Non-blocking Enhancement** — 失败时默默降级不阻断主流程
- **Deterministic Eval** — eval 必须稳定可重现

---

## 8. 下一关预告

**L6：长期记忆 + 成本观测**
是 6 关的**收官**——从"能跑的 agent"升级到"可运营的 agent"。
核心内容：
- 跨会话记忆（用户偏好、历史风格）→ 开启 Reflexion 可能
- 成本追踪（per-turn tokens, per-day spend）
- 延迟观测（p50/p95 latency）
- LLM-as-Judge 接真 LLM（L4 埋的坑可以填了）

## 附录 A：为什么没做 Option C（纯 ReAct 重写）

**当时考虑的 3 个选项**：

| 方案 | 改动 | 风险 | 收益 |
|---|---|---|---|
| A（保守） | +reflector 层 | 低 | 中 |
| B（中级） | A + codePrompt 也 reflect | 中 | 中+ |
| C（激进） | 丢 6 阶段状态机 | **高** | 高 |

**没选 C 的理由**：
1. StyleKit 的"网页策划顾问"角色**本来就有明确流程**（了解需求 → 选风格 → 生成）
2. 纯 ReAct 适合**探索型任务**，不适合**引导型任务**
3. eval baseline 6/6 这么宝贵，不值得冒险换架构
4. 如果真要做，应该先有数据支持（eval 对比 A 和 C 的跨 scenario 质量）

**教学点**：**不是所有场景都适合最 fancy 的架构**。业务形态决定 agent 形态。