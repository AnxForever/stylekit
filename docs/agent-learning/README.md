# Agent 学习手册

> Darling 的私人 agent 开发教程，用 **StyleKit Agent** 项目当活教材。
> 不是抽象理论——每个概念都对应你代码里的真实位置。

---

## 学习路径（6 关）

| 关卡 | 主题 | 状态 | 改动 | 难度 |
|---|---|---|---|---|
| **L1** | 心智模型 + 代码地图 | ✅ 已完成 (2026-04-17) | 0 行代码 | ⭐ |
| **L2** | Tool Calling 原生化 | ✅ 已完成 (2026-04-17) | +800 行 | ⭐⭐⭐ |
| **L3** | 消除流式/非流式重复 | ✅ 已完成 (2026-04-17) | -237 行 | ⭐⭐ |
| **L4** | Eval 评估体系 | ✅ 已完成 (2026-04-17) | +3 文件 +400 行 | ⭐⭐ |
| **L5** | ReAct + Reflection | ✅ 已完成 (2026-04-17) | +reflector.ts 220 行 | ⭐⭐⭐⭐ |
| **L6** | 长期记忆 + 成本观测 | ✅ 已完成 (2026-04-17) | +observability +memory 295 行 | ⭐⭐⭐ |

🎓 **系列结业！** 全部 6 关完成。

---

## 文件索引

### 📖 课程内容
- [L1-mental-model.md](./L1-mental-model.md) — **心智模型 + 你项目的数据流全景图**
- [L2-tool-calling.md](./L2-tool-calling.md) — **Tool Calling 原生化 + Finalize Tool Pattern**
- [L3-unify-streaming.md](./L3-unify-streaming.md) — **Extract Function + Discriminated Union 消除重复**
- [L4-eval-framework.md](./L4-eval-framework.md) — **Eval 体系 + Mock Drift + Baseline-as-Code**
- [L5-react-reflection.md](./L5-react-reflection.md) — **Reflection 层 + Cascade Pattern + Conditional Trigger**
- [L6-memory-cost.md](./L6-memory-cost.md) — **Observability 三支柱 + Token Economics + Long-term Memory**
- [production-checklist.md](./production-checklist.md) — **生产就绪检查 40 项**（结业附录）
- L4-eval-framework.md — 待开课
- L5-react-reflection.md — 待开课
- L6-memory-cost.md — 待开课

### 📚 工具书（持续更新）
- [glossary.md](./glossary.md) — **行话大全**，Tier 1 新手必知 + Tier 2 进阶必知
- [methodologies.md](./methodologies.md) — **方法论合集**，8 种生产级做法 + 你项目的 3 个亮点案例

---

## 使用方式

### 每关的固定流程
1. **概念讲解**：在对话里开讲
2. **代码走读**：对照项目实际代码理解
3. **增量改造**：动手改一小块
4. **验证效果**：跑测试/eval/手动验
5. **保存笔记**：更新本目录对应文件

### 什么时候翻这个目录
- 看代码遇到陌生词 → `glossary.md`
- 遇到决策犹豫 → `methodologies.md` 找对应方法论
- 忘了当时学的内容 → 对应 L*.md
- 新同事进组 → 给他读 `README.md` + `L1-mental-model.md`

---

## 你的项目当前定位速查

```
类型：State Machine Agent（状态机派）
  └ 6 阶段 FSM: goal → audience → feel → confirm → revise → done

架构：Dual LLM Pipeline
  ├ Planner (temperature 0.2, JSON output)
  └ Responder (temperature 0.3, streamable)

增强：Agentic RAG
  └ 每阶段动态检索 styles / templates / patterns / prompts

持久化：Supabase
  └ agent_sessions + agent_messages 两张表

可观测性：三件套完整
  ├ promptSnapshot (记 prompt)
  ├ toolTrace (记工具调用)
  └ decisionTrace (记决策理由)

缺失：
  ├ ✅ 原生 Tool Calling (L2 已完成)
  ├ ✅ Eval 评估体系 (L4 已完成)
  ├ ✅ Reflection 层 (L5 已完成)
  ├ ✅ Cost + Latency 观测 (L6 已完成)
  ├ ✅ Long-term memory 接口 (L6 已完成)
  ├ 🟡 真接 LLM-as-Judge（L6 留占位，上线前可接）
  └ 🟡 Input guardrails（production-checklist 红标）
  ├ ❌ 真实 LLM eval (L4)
  ├ ❌ 长期记忆 (L6)
  ├ ❌ 成本/延迟指标 (L6)
  └ ❌ Input guardrails (暂不紧急)
```

---

## 专业推荐阅读（可选，英文为主）

### 必读（按重要性）
1. **Anthropic: Building Effective Agents** (2024) — 工业界最清醒的 agent 设计指南，强烈推荐
   `https://www.anthropic.com/research/building-effective-agents`
2. **Lilian Weng: LLM Powered Autonomous Agents** (2023) — 学术综述，完整讲清 agent 各组件
3. **OpenAI: A Practical Guide to Building Agents** (2024) — 偏实战
4. **Andrew Ng: Agentic Design Patterns** — 四种模式（Reflection / Tool Use / Planning / Multi-Agent）

### 深入学习
- **ReAct Paper (Yao et al., 2022)** — ReAct 模式原论文
- **Reflexion Paper (Shinn et al., 2023)** — 反思式 agent
- **Tool Learning with Foundation Models (Qin et al., 2023)** — tool use 综述
- **LangChain / LangGraph 文档** — 工程实现参考
- **CrewAI / AutoGen 文档** — 多 agent 框架

### 中文资源
- 李沐《动手学机器学习》—— 基础打底
- 腾讯混元、Kimi、智谱 AI 的技术博客——本土实践

---

## 课程铁律

1. **一关一次对话**，扎实吃透再走下一关
2. **不抽象谈**：每个概念必对照你代码里的实际位置
3. **不过度工程化**：只学你项目**现在**或**即将**用到的
4. **学完能解释给别人听**：用自己的话复述一遍才算真懂

---

## 课程进度记录

| 日期 | 关卡 | 关键收获 | 改动 |
|---|---|---|---|
| 2026-04-17 | L1 | Agent 心智模型、3 大派别、项目数据流、10 文件职责 | 仅建学习手册 |
| 2026-04-17 | L2 | Tool Calling、Finalize Tool Pattern、Feature Flag、Zod 4 toJSONSchema | +9 新文件 +800 行 |
| 2026-04-17 | L3 | Extract Function、Discriminated Union、Behavior-Preserving Refactor | orchestrator.ts -237 行 |
| 2026-04-17 | L4 | Eval Pyramid、Mock Drift、Mock at the Seam、Baseline-as-Code | +eval-metrics +eval-scoreboard +npm run eval |
| 2026-04-17 | L5 | Reflection、Cascade Pattern、Conditional Trigger、Synthetic Feedback | +reflector.ts 220 行 |
| 2026-04-17 | L6 | Observability 三支柱、Token Economics、MemoryStore interface、TurnTracker | +observability +memory 295 行 |

---

**开始你的下一关：随时回来说 "开 L2" 就行。** 🌺
