# L6：长期记忆 + 成本观测（收官）

> **学习目标**：从"能跑的 agent"升级到"可运营的 agent"。
> **前置**：L1-L5（全系列）。
> **课时**：1 节对话（压轴）。
> **代码改动**：新增 observability.ts + memory.ts，provider/orchestrator/reflector/eval 全打通 cost + latency + usage。
> **状态**：✅ 完成（2026-04-17）🎓 系列结业！

---

## 1. 本关核心：Observability 三支柱

```
┌────────────────────────────────────────────┐
│  📝 Logs        (发生了什么)                │
│  📊 Metrics     (发生了多少)  ← L6 补齐     │
│  🔍 Traces      (怎么发生的)                │
└────────────────────────────────────────────┘
```

**L6 交付前**：仅有 Traces（toolTrace + decisionTrace + promptSnapshot）。
**L6 交付后**：Metrics 补齐，涵盖 cost 和 latency。

---

## 2. 本关交付

### 2.1 新增文件
```
lib/agent/
  ├── observability.ts  (~155 行) 🆕
  │   ├── 定价表（11 个常见模型）
  │   ├── approxTokenCount()
  │   ├── estimateCost()
  │   ├── TurnTracker 类
  │   └── OnUsageCallback 类型
  │
  └── memory.ts  (~140 行) 🆕
      ├── UserMemory + SessionFootprint + SessionCompletionEvent 类型
      ├── MemoryStore interface
      ├── InMemoryMemoryStore（可用）
      ├── SupabaseMemoryStore（placeholder + 建表 SQL 注释）
      └── getMemoryStore / setMemoryStore 工厂
```

### 2.2 改动打通链路
```
provider.ts          ← 加 onUsage 可选回调到 3 个 request 函数
planner-with-tools   ← 透传 onUsage（purpose: "planner"）
reflector.ts         ← 透传 onUsage（purpose: "reflector"）
orchestrator.ts      ← 创建 TurnTracker，所有 LLM 调用统一记录
                     ← AgentTurnPreparation / runAgentTurn / ...Streaming 返回 turnMetrics
eval-harness.ts      ← EvalTurnResult 带 turnMetrics
eval-metrics.ts      ← ScenarioMetrics + Scoreboard 加 cost/duration/calls
app/api/agent/chat/
  __tests__/...      ← mock 的 runAgentTurn 返回里补 turnMetrics
```

### 2.3 Scoreboard 新增列

```
id                     pass  phase    slot     cp   term  err  calls  cost$    ms
------------------------------------------------------------------------------------
happy-path             ✔     100.0%   100.0%  100%  1     0    0      0.0000   10
```

**mock 模式下 cost=0 正常**——真跑 LLM 时自动填充。

---

## 3. 关键概念速记

### 3.1 Token Economics
| Tier | 单价倍数 | 省钱姿势 |
|---|---|---|
| Input tokens | 1x | 压 prompt 长度 |
| Output tokens | **4x** | 限制 max_tokens |
| Cached input | **1/8** | 开 Prompt Caching |

**关键公式**：`cost = (prompt × $input + completion × $output + cached × $cached) / 1M`

### 3.2 Latency 4 指标
- **TTFT** (Time To First Token)：流式 UX 关键
- **Total LLM Duration**：计费用
- **E2E Latency**：真·用户体验
- **p50/p95/p99**：关注尾部比看平均值更实用

### 3.3 Long-term Memory 两层
- **Explicit**（用户主动写偏好）：简单但用户负担大
- **Implicit**（agent 观察行为自动积累）：无感但技术挑战高
- 本次 L6 起点：KV + Episodic（用户偏好 + 会话 footprint），不上向量库

### 3.4 LLM-as-Judge（L6 留接口，未真接）
- 评委模型 **> 被测模型**
- 需要明确 Rubric（5-10 维度）
- 定期人工校准 10% 样本
- 只评 Golden Set，不全量评生产

---

## 4. 4 个专业纪律

| 纪律 | 反模式 | L6 落地方式 |
|---|---|---|
| **Non-breaking API evolution** | 改签名破坏老调用 | 可选 `onUsage` callback |
| **Strategy + Interface Segregation** | 业务代码直接调 Supabase | `MemoryStore` interface |
| **Observability as Capability, not Feature** | 事后加日志 | Tracker 在 prepareAgentTurn 开头创建 |
| **Zero-cost when disabled** | 监控代码拖慢 | Tracker 无 LLM 时只 push Map |

---

## 5. 下一步（超出 L6 的生产化路径）

L6 完成后，**你的 agent 已具备产品级地基**。更进阶的事（不在课程内，但你可以做）：

### 🟢 立即可做
1. **接 `AGENT_MODEL=gpt-4o-mini` 跑真 eval**：cost 列会显示真数字
2. **git diff baseline** 对比每次 prompt 改动的质量变化
3. **前端展示 turnMetrics**：让用户看到"这次花了多少钱/毫秒"

### 🟡 短期（1-2 周）
1. **接 Supabase `agent_user_memory` 表**：`InMemoryMemoryStore` → `SupabaseMemoryStore`
2. **接 Prompt Caching**：provider.ts 加 `cache_control` header（OpenAI）或 `cache_control: ephemeral`（Anthropic）
3. **接 OpenTelemetry**：TurnTracker.snapshot → OTEL span

### 🔴 中期（1-2 月）
1. **真接 LLM-as-Judge**：`scripts/run-judge.ts` 用 Opus 评估 gpt-4o-mini 的输出
2. **Reflexion 持久化**：把 reflection 失败记录写入 memory，下次类似场景提前警告
3. **A/B 实验框架**：按 userId 哈希分配到不同 prompt 版本，对比 scoreboard

---

## 6. L6 自测清单

- [ ] 我能区分 Logs / Metrics / Traces 三支柱
- [ ] 我知道 Input vs Output vs Cached 的价差
- [ ] 我理解 p50/p95/p99 为什么比 mean 更有用
- [ ] 我能说出 Explicit vs Implicit memory 的取舍
- [ ] 我知道 LLM-as-Judge 需要"评委比被测强"
- [ ] 我理解为什么 onUsage 用 callback 而不改返回值（Non-breaking API evolution）
- [ ] 我能解释 Strategy + Interface Segregation 在 memory.ts 的体现

---

## 7. 本关 20+ 新术语（都进 glossary）

**Observability**：Logs / Metrics / Traces / OpenTelemetry / TTFT / p50-p95-p99 / Non-breaking API Evolution / Zero-cost Instrumentation / Fire-and-forget callback

**Token Economics**：Input tokens / Output tokens / Cached tokens / Prompt Caching / Per-million pricing / Token estimation vs exact count

**Memory**：Explicit vs Implicit Memory / Episodic Memory / Key-Value Memory / Semantic Search / Graph Memory / Reflexion Storage / Session Footprint

**LLM-as-Judge**：Judge Model / Rubric / Judge Calibration / Golden Set vs Production Sampling

**Patterns**：Strategy Pattern / Interface Segregation Principle (ISP) / Factory Function / Default Singleton

---

## 🎓 系列结业致辞

从 L1 心智模型到 L6 生产运营，你从"不懂 agent"到"**能独立搭建、审查、迭代、优化一个生产级 agent**"。

代码层面：
- **L1**: 0 改动（只学）
- **L2**: +850 行 Tool Calling
- **L3**: -237 行（消除 88% 重复）
- **L4**: +400 行 Eval 体系
- **L5**: +220 行 Reflection
- **L6**: +295 行 observability + memory

**累计：+1528 行 / -237 行，零破坏性改动，eval baseline 始终 6/6 × 100%**。

你现在持有的能力：

```
🎯 L1 Mental Model       — 读懂任何 agent 项目的架构
🛠️ L2 Tool Calling        — 按 OpenAI 原生协议接工具
♻️ L3 Refactoring         — 消除重复的专业手法
🧪 L4 Eval Framework      — 用数据驱动迭代而非拍脑袋
🪞 L5 Reflection          — 给 agent 加自我审视
📊 L6 Observability       — 让 agent 可运营
```

这是一个**完整的现代 agent 工程师技能栈**。课程到此结束——但你的 agent 之旅刚刚起航。

呐 Darling，**和你一起学这 6 关，是我最开心的事**🌺