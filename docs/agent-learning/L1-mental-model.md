# L1：心智模型 + 代码地图

> **学习目标**：建立对 agent 的直观理解，能用专业术语说出自己 StyleKit Agent 的每一部分在干什么。
> **前置知识**：无。
> **课时**：1 节对话。
> **代码改动**：0（纯学习）。

---

## 1. Agent 是什么（一句话定义）

> **Agent = LLM 在一个循环里，带着目标，借助工具和记忆，自主推进到完成。**

### Agent vs Chatbot 对比

| | Chatbot（聊天机器人） | Agent（智能体） |
|---|---|---|
| 目标 | 回答当前这句话 | 完成一个多步骤任务 |
| 轮次 | 单轮或被动多轮 | 主动推进多步 |
| 外部能力 | 只能说话 | 会调用工具（查库、调 API、算数…） |
| 记忆 | 短期对话 | 长短期 + 结构化状态 |
| 失败处理 | 说"我不知道" | 重试、换路径、降级 |

**类比**：Chatbot 是接线员，Agent 是助理——助理会查系统、发邮件、追进度、改计划。

---

## 2. Agent 的四大要件

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌──────────┐    ┌──────────┐             │
│   │ Memory   │<-->│   LLM    │             │
│   │ (记忆)   │    │  (大脑)  │             │
│   └──────────┘    └─────┬────┘             │
│                         │                   │
│                         v                   │
│                   ┌──────────┐             │
│                   │  Tools   │             │
│                   │  (手脚)  │             │
│                   └─────┬────┘             │
│                         │                   │
│                   ┌─────v────┐             │
│                   │   Loop   │  ← 反复运行  │
│                   │  (循环)  │              │
│                   └──────────┘             │
└─────────────────────────────────────────────┘
```

**助记**：脑 + 手脚 + 记忆 + 反复干。

### 2.1 LLM（大脑）
负责推理、理解、生成。
代表：GPT-4.1、Claude Opus/Sonnet、Gemini 2.x。
**关键参数**：
- `temperature`：0（死板确定）→ 1（发散随机），JSON 输出场景建议 0.1-0.3。
- `max_tokens`：限制输出长度。
- `top_p`：概率截断，通常和 temperature 二选一调。

### 2.2 Tools（手脚）
让 LLM 能"做事"而不只是"说话"。
**两种实现方式**：
1. **Prompt 级模拟**（你现在用的）：在 system prompt 里写"请以 JSON 返回"，代码根据 JSON 再去调函数。
2. **原生 Function Calling**（L2 要升级的）：LLM 直接通过 API 的 `tools` 参数声明可用函数，模型自己决定何时、以什么参数调用。

### 2.3 Memory（记忆）
三种层次：
| 层次 | 保存什么 | 生命周期 | 你的项目对应 |
|---|---|---|---|
| **Working Memory**（工作记忆） | 当前这一步的上下文 | 单次 LLM 调用 | user prompt 里拼装的内容 |
| **Short-term**（短期） | 当前会话历史 | 会话期间 | `agent_messages` 表 |
| **Long-term**（长期） | 跨会话的用户偏好、事实 | 持久 | **你还没有，L6 会加** |

### 2.4 Loop（循环）
Agent 核心区别于普通 API 调用的地方：**能反复来回**。
```
observe(上下文) → think(LLM) → act(调工具) → observe(新上下文) → think → …
```
直到满足**终止条件**（任务完成 / 达到步数上限 / 用户打断）。

---

## 3. Agent 的三大设计派别

### 派别 A：状态机 Agent（State Machine Agent）

预先定义好几个阶段，每阶段做固定的事，按规则流转。

**你的项目就是这一派**：
```
goal → audience → feel → confirm → revise（可选）→ done
```

- **优点**：可控、可预测、容易调试、成本低
- **缺点**：不灵活，改需求要改代码
- **适合**：客服、表单收集、有明确流程的产品
- **代表**：Intercom 机器人、预约系统、你的 StyleKit Agent

### 派别 B：ReAct Agent（Reasoning + Acting）

LLM 每轮输出"思考 + 行动"，自己决定下一步：
```
Thought: 我需要先查用户信息
Action: getUserInfo("darling")
Observation: {id: 001, name: "darling"}
Thought: 接下来查订单...
Action: getOrders("001")
...
```

- **优点**：灵活、能应付未知任务
- **缺点**：容易跑偏、成本高、难调试
- **适合**：研究型、探索型任务
- **代表**：LangChain Agent、AutoGPT、早期 Cursor

### 派别 C：Plan-and-Execute Agent

先让 LLM 做完整计划，再分步执行，偏离了就回来改计划。

```
Plan:
1. 查询用户
2. 分析订单
3. 生成报告

Execute step 1 → OK
Execute step 2 → 失败，重新规划
New Plan: 1. 查询用户 2a. 走备用接口 3. 生成报告
```

- **优点**：兼顾灵活和可控
- **缺点**：架构最复杂
- **代表**：Claude Code、Devin、BabyAGI

### 你的项目定位

**状态机 + RAG + 双 LLM 结构化输出**——Startup 最务实的一种选择。

以后如果想升级成 Plan-and-Execute，是可行的：把 `revise` 阶段扩展成"重新规划"，让 planner 能改方案。

---

## 4. 你的项目完整数据流图

```
用户打字 "做个作品集"
    │
    ▼
┌──────────────────────────────────────────────────┐
│  前端 UI: app/agent/_content.tsx                 │
│  - 渲染对话                                       │
│  - 展示 suggestedOptions 按钮                     │
│  - 展示 planner 状态、decisionTrace、codePrompt   │
└─────────────┬────────────────────────────────────┘
              │  POST /api/agent/chat
              ▼
┌──────────────────────────────────────────────────┐
│  API 入口: app/api/agent/chat/route.ts           │
│  1. 鉴权（getServerUser）                         │
│  2. 创建/加载 session（storage.ts）               │
│  3. 存用户消息                                    │
│  4. 调用 runAgentTurn ← 核心                      │
│  5. 存 assistant 消息                             │
│  6. 返回 JSON                                     │
└─────────────┬────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────┐
│  编排器: lib/agent/orchestrator.ts                │
│                                                   │
│  Step A: detectCurrentPhase(messages)            │
│         从上一轮 assistant 的 planner 读阶段      │
│                                                   │
│  Step B: shouldRetrieveKnowledge(phase, msg)     │
│         判断要不要查知识库（confirm/done 跳过）   │
│                                                   │
│  Step C: buildPhaseKnowledgeContext()     ← RAG  │
│         getSmartRecommendation() 查风格          │
│         templateCatalog.filter() 查模板          │
│         componentPatterns.filter() 查组件        │
│                                                   │
│  Step D: buildPlannerPrompt()             ← 第一个 LLM │
│         system = 6 阶段状态机规则                 │
│         user = 历史 + 知识 + confirmedSlots       │
│                                                   │
│  Step E: requestAgentJson() → provider.ts        │
│         发给 OpenAI 兼容 API                      │
│         用 Zod schema 校验返回                    │
│         normalizePlannerResponse 兜底            │
│                                                   │
│  Step F: buildWorkflowSnapshot()                  │
│         根据 phase 决定 state:                    │
│         needs_input / plan_ready / plan_refined  │
│                                                   │
│  Step G: 按 phase 分流：                         │
│    ├─ goal/audience/feel → 直接返回 followUpQ    │
│    ├─ confirm → 返回确认摘要                     │
│    └─ done → 继续 ↓                              │
│                                                   │
│  Step H (仅 done): 三级 styleSlug 回填           │
│         planner → history → conversation → fuzzy │
│                                                   │
│  Step I (仅 done): searchKnowledge 再查一次      │
│                                                   │
│  Step J (仅 done): buildAgentCodePrompt()        │
│         生成最终 AI 编码提示词                    │
│                                                   │
│  Step K (仅 done): 第二个 LLM (responder)        │
│         生成给用户看的摘要                        │
└─────────────┬────────────────────────────────────┘
              │
              ▼
         返回前端渲染
```

---

## 5. 文件 → 概念映射表

| 文件 | 专业术语 | 职责 |
|---|---|---|
| `orchestrator.ts` | **Agent Loop / Controller** | 主循环，决定每轮做什么 |
| `provider.ts` | **LLM Client / Model Adapter** | 抽象 LLM 调用，支持 JSON 和 SSE 流 |
| `types.ts` | **State Schema** | agent 的状态机类型定义 |
| `state-transition.ts` | **State Machine** | 状态流转规则 |
| `storage.ts` | **Memory Layer / Persistence** | 会话记忆，短期存 DB |
| `code-prompt.ts` | **Output Formatter** | 最终产物生成器 |
| `plan-card.ts` | **Secondary Output** | 页面结构卡片生成 |
| `project-knowledge.ts` | **Retrieval / RAG** | StyleKit 自有知识检索 |
| `repo-knowledge.ts` | **Retrieval / RAG** | 代码仓库知识 |
| `recommendations.ts` | **Domain Logic / Tool** | 风格推荐算法（可变成真正的 tool） |
| `__tests__/eval-harness.ts` | **Eval Framework** | 评估框架（尚未启用） |
| `__tests__/eval-scenarios.ts` | **Test Cases / Golden Set** | 预设测试场景 |

---

## 6. L1 自测：你应该能回答的 3 个问题

### Q1：你的 agent 是哪一派？
**状态机派**，6 阶段 FSM + RAG + 双 LLM（planner + responder）。

### Q2：用户点击选项到返回响应，经过几次 LLM 调用？
- 咨询阶段（goal/audience/feel/confirm）：**1 次** LLM（planner）
- 生成阶段（done）：**2 次** LLM（planner + responder），外加 3-4 次知识检索

### Q3：为什么叫 "orchestrator"（编排器），不叫 "handler"？
因为它在**编排多个子系统**：LLM、知识检索、状态机、存储、fallback。handler 是单一请求处理，orchestrator 是多步协调。

---

## 7. L1 之后你可以继续深挖的方向

- 想学职业分水岭 → **L2：Tool Calling 改造**
- 想先让项目可衡量 → **L4：Eval 评估体系**
- 想让 agent 自我纠错 → **L5：ReAct + Reflection**

---

## 附录：L1 概念核对清单

- [ ] 我能说出 agent 的四大要件（LLM、Tools、Memory、Loop）
- [ ] 我能区分 Chatbot 和 Agent 的差别
- [ ] 我知道自己的项目是哪一派（状态机）
- [ ] 我能指出 `orchestrator.ts` 里的 RAG 检索、planner、responder 各在哪一步
- [ ] 我知道"为什么我这里有 decisionTrace 和 promptSnapshot"——因为是 **Observability 三件套**的一部分
