# Agent 行话大全 Glossary

> 按"新手必知"和"进阶必知"分层。每关我会在这里补新词。
> 英文缩写旁边标了中文和你项目里的对应物（如有）。

---

## Tier 1：新手必知（30 个）

### 🧠 LLM 基础

| 术语 | 中文 | 含义 | 你的项目里对应 |
|---|---|---|---|
| **System Prompt** | 系统提示词 | 定义 agent 身份、规则、输出格式的指令，每轮不变 | `buildPlannerPrompt().system` |
| **User Prompt** | 用户提示词 | 每轮动态拼装的上下文（用户输入+历史+知识） | `buildPlannerPrompt().user` |
| **Assistant Message** | 助手消息 | LLM 的输出 | `planner` 返回的 JSON |
| **Context Window** | 上下文窗口 | LLM 一次能处理的 token 总量（GPT-4o 128k, Claude 200k） | 超了要截断历史 |
| **Token** | 令牌 | LLM 的最小计费单位，一个中文字约 1.5-2 token | - |
| **Temperature** | 温度 | 采样随机性，0=死板，1=发散 | planner 用 0.2，responder 用 0.3 |
| **Top-p** | 核采样 | 概率截断，和 temperature 二选一 | 未使用 |
| **Max Tokens** | 最大输出长度 | 限制返回 token 数 | provider.ts 未显式设置 |

### 🛠️ 提示工程基本功

| 术语 | 中文 | 含义 |
|---|---|---|
| **Zero-shot** | 零样本 | 不给例子，直接要 LLM 干活 |
| **Few-shot** | 少样本 | 在 prompt 里塞 2-5 个例子 |
| **Chain-of-Thought (CoT)** | 思维链 | 让 LLM 先写推理过程再给答案，提升复杂任务准确率 |
| **Structured Output** | 结构化输出 | 强制返回 JSON/XML 等可解析格式 |
| **JSON Mode** | JSON 模式 | OpenAI/Anthropic 提供的 API 参数，保证返回合法 JSON |
| **Prompt Template** | 提示模板 | 带占位符的 prompt 结构，动态填值 |
| **Prompt Injection** | 提示注入 | 用户输入里藏恶意指令绕过 system prompt（类似 SQL 注入） |
| **Jailbreak** | 越狱 | 诱导 LLM 突破安全限制 |

### 🎯 Agent 核心概念

| 术语 | 中文 | 含义 | 你的项目对应 |
|---|---|---|---|
| **Agent Loop** | 智能体循环 | observe→think→act→observe 的反复运行 | `runAgentTurn` 一轮就是一个 loop 迭代 |
| **Tool / Function** | 工具/函数 | LLM 可调用的外部能力 | `getSmartRecommendation` 等（目前是代码硬调） |
| **Tool Calling / Function Calling** | 工具调用 | LLM 原生 API 支持的工具调用机制 | **未使用**（L2 会加） |
| **State Machine** | 状态机 | 预定义阶段+流转规则 | `AgentConsultPhase` 6 阶段 |
| **Iteration Cap** | 迭代上限 | 防止 agent 无限循环的最大步数 | 你是状态机，不涉及 |
| **Termination Condition** | 终止条件 | agent 何时停 | `phase === "done" && planner.ready` |

### 📚 记忆与检索

| 术语 | 中文 | 含义 | 你的项目对应 |
|---|---|---|---|
| **Working Memory** | 工作记忆 | 当前 LLM 调用看到的上下文 | 拼装后的 user prompt |
| **Short-term Memory** | 短期记忆 | 会话级持久化 | `agent_messages` 表 |
| **Long-term Memory** | 长期记忆 | 跨会话的事实/偏好 | **无**（L6 会加） |
| **RAG (Retrieval-Augmented Generation)** | 检索增强生成 | 查库拿相关内容塞进 prompt，防幻觉 | `buildPhaseKnowledgeContext` |
| **Grounding** | 接地 | 让回答基于真实数据而非 LLM 臆想 | `topStyles` 注入 planner prompt |
| **Hallucination** | 幻觉 | LLM 一本正经胡说八道 | Zod schema + fuzzy fallback 防御 |
| **Embedding** | 向量嵌入 | 把文本编码成高维向量，用于语义搜索 | 你的检索是关键词匹配，未用 embedding |
| **Vector DB** | 向量数据库 | 专门存 embedding 的数据库（Pinecone, Qdrant, pgvector） | 未用 |
| **Semantic Search** | 语义搜索 | 基于向量距离找相似内容 | 未用（你用字符串匹配） |

### 🧪 评估与迭代

| 术语 | 中文 | 含义 | 你的项目对应 |
|---|---|---|---|
| **Eval / Evaluation Set** | 评估集 | 带期望输出的测试样本集合 | `eval-scenarios.ts` 有雏形 |
| **Golden Set** | 黄金集 | 经过人工审核的标准答案集 | 未建立 |
| **LLM-as-Judge** | 让 LLM 当评委 | 用一个 LLM 打分另一个 LLM 的输出 | 未用 |
| **Regression** | 回归 | 改了之后老功能变差 | eval 可防止 |

### 🔧 生产工程

| 术语 | 中文 | 含义 | 你的项目对应 |
|---|---|---|---|
| **Fallback** | 降级 | 主路径失败时的备用方案 | `DEV_AGENT_FALLBACK` + `inferPlannerFallback` |
| **Observability** | 可观测性 | 运行时看清 agent 在干什么的能力 | decisionTrace + promptSnapshot + toolTrace |
| **Streaming / SSE** | 流式输出 | 边生成边返回，不等完整响应 | `requestAgentStream` 用 SSE |

---

## Tier 2：进阶必知（等你打完 L3-L6 再回来看）

### 🧬 Agent 架构模式

| 术语 | 中文 | 含义 |
|---|---|---|
| **ReAct** | 推理+行动 | LLM 每轮输出 Thought + Action，闭环反思 |
| **Reflexion** | 反思式 | LLM 在失败后生成"反思"，下一轮避免同样错误 |
| **Tree of Thoughts (ToT)** | 思维树 | 同时探索多条推理路径，挑最好的 |
| **ReWOO** | Reasoning without Observation | 先规划再执行，减少 LLM 调用数 |
| **Multi-Agent** | 多智能体 | 多个 agent 协作（Orchestrator-Worker / Debate / Society） |
| **Agent Swarm** | 智能体集群 | 并行多 agent，合并结果 |
| **Handoff** | 交接 | 一个 agent 把任务转给另一个（OpenAI Swarm 模式） |
| **Chain** | 链式 | 固定顺序的多步调用（LangChain 早期模式） |
| **Graph** | 图式 | 带条件分支的 agent 流（LangGraph 模式） |

### 🛡️ 安全与防御

| 术语 | 中文 | 含义 |
|---|---|---|
| **Guardrails** | 护栏 | 输入/输出两端的安全过滤层 |
| **Red Teaming** | 红队测试 | 主动攻击自己的 agent 找漏洞 |
| **Content Moderation** | 内容审核 | 过滤违禁/有害内容（OpenAI Moderation API） |
| **PII Redaction** | 个人信息脱敏 | 把姓名、身份证等敏感信息从 prompt 里去掉 |
| **Rate Limiting** | 限流 | 防止用户滥用 API |
| **Sandboxing** | 沙盒隔离 | agent 调工具时限制权限（特别是 code interpreter） |

### 💰 成本与性能

| 术语 | 中文 | 含义 |
|---|---|---|
| **Prompt Caching** | 提示缓存 | 复用不变的 system prompt 部分，Anthropic/OpenAI 都支持，可降 75%+ 成本 |
| **Batch API** | 批量 API | 24 小时内完成，价格减半，适合离线任务 |
| **Model Routing** | 模型路由 | 简单任务走 Haiku/Mini，复杂任务走 Opus/GPT-4 |
| **Semantic Cache** | 语义缓存 | 相似问题复用旧答案 |
| **Cost per Task** | 单任务成本 | 完成一次业务任务的美元数 |
| **p50/p95/p99 Latency** | 延迟百分位 | 50% 用户的响应时间 / 95% / 99% |
| **TTFT (Time To First Token)** | 首 token 时间 | 流式场景的关键指标 |

### 📊 高级评估

| 术语 | 中文 | 含义 |
|---|---|---|
| **Offline Eval** | 离线评估 | 用固定测试集跑 |
| **Online Eval** | 在线评估 | 生产流量采样打分 |
| **A/B Testing** | AB 测试 | 两版 prompt/模型分流对比 |
| **Human-in-the-Loop (HITL)** | 人在环中 | 关键决策点加人工审核 |
| **DPO / RLHF** | 偏好微调 | 用人类偏好数据微调模型（通常不用自己训） |

### 🗂️ 上下文管理

| 术语 | 中文 | 含义 |
|---|---|---|
| **Context Compression** | 上下文压缩 | 历史太长时用 LLM 总结后替换原文 |
| **Sliding Window** | 滑动窗口 | 只保留最近 N 轮对话 |
| **Summarization Buffer** | 总结缓冲 | 旧对话总结，新对话原文，合并塞进 prompt |
| **Conversation Memory** | 会话记忆 | LangChain 里的 memory 概念 |

---

## 速查表：你最该记住的 10 个词

1. **System Prompt / User Prompt**（系统提示 vs 用户提示）
2. **Tool Calling**（你升级的关键）
3. **RAG / Grounding**（防幻觉的核心）
4. **State Machine**（你的派别）
5. **Structured Output**（JSON 输出）
6. **Fallback**（降级）
7. **Observability**（可观测性三件套）
8. **Eval Set**（评估集）
9. **Hallucination**（幻觉）
10. **Context Window**（上下文窗口）

---

## 使用建议

- 看代码/文档遇到陌生词，先来这里查
- 每关学完会补充新词
- Tier 2 不用现在记，学到对应关卡自然会懂

---

## L2 新增术语（Tool Calling 关卡）

### 🔧 Tool Calling 模式

| 术语 | 中文 | 含义 | 你代码中对应 |
|---|---|---|---|
| **Finalize Tool Pattern** | 终结工具模式 | 定义专用 tool 作为本轮结束信号，LLM 通过调用它"提交"最终结果，比让 LLM 写自由 JSON 更稳定 | `tools/finalize-planner.ts` |
| **Schema-first Retrieval** | schema 优先检索 | 能用结构化字段（enum/filter）就别硬上全文搜索——更精准、更省 token | `search_components` 的 `family` 参数 |
| **Fetch vs Search Pattern** | 取 vs 查模式 | Fetch = 取一个（要 id/slug）；Search = 查多个（要 query）。一个 tool 只做一件 | `get_style_details` vs `search_styles` |
| **Usage Boundary** | 使用边界 | tool description 必须写 "USE WHEN ... DO NOT use when ..."，LLM 才知道何时调用 | 所有 tool 的 description 字段 |
| **Tool Registry** | 工具注册表 | 所有 tool 的集中注册点，`Map<name, tool>` 结构，executor 按名查找 | `tools/index.ts` |
| **Error Isolation** | 错误隔离 | tool 内部可以 throw，executor 必须接住并转成 `{ok: false, error}` | `tools/executor.ts` 的 try-catch 层 |
| **Terminal Tool** | 终结型工具 | 调用后该轮对话结束的 tool；和 search/fetch 型 tool 区分 | `finalize_planner_result` |

### 🚀 生产工程模式

| 术语 | 中文 | 含义 | 你代码中对应 |
|---|---|---|---|
| **Feature Flag** | 功能开关 | 用 env 变量或配置切换新/老代码路径，生产可秒级回滚 | `AGENT_USE_TOOL_CALLING` |
| **Shadow Deployment** | 影子部署 | 新代码部署但不默认启用，通过 flag 控制流量比例 | 同上 |
| **Graceful Fallback Chain** | 优雅降级链 | 新路径失败 → 老路径 → 规则兜底，多层防御 | `PlannerToolLoopError` 被 catch 后回退 `invokeLegacyPlanner` |
| **API Facade / Adapter Layer** | API 门面/适配层 | 抹平不同厂商 API 差异的薄层，易替换底层实现 | `mapFinishReason` 把 OpenAI 术语抹平 |
| **Idempotency** | 幂等性 | 同参数多次调用结果一致，tool retry 的前提 | 所有 search/get tool 都幂等 |

### 📡 OpenAI API 术语（tool calling 专属）

| 术语 | 含义 |
|---|---|
| `tools` | 请求字段，数组，每项 `{type: "function", function: {name, description, parameters}}` |
| `tool_choice` | `"auto"` / `"none"` / `"required"` / `{type: "function", function: {name: X}}` |
| `tool_calls` | 响应字段，LLM 决定调的工具列表 |
| `finish_reason` | `"stop"` / `"tool_calls"` / `"length"` / `"content_filter"` 等 |
| `role: "tool"` | 消息角色，必须搭配 `tool_call_id` 返回工具结果 |

### 🔁 Agent 迭代模式

| 术语 | 中文 | 含义 | 应用场景 |
|---|---|---|---|
| **Nudge-Retry Pattern** | 温和重试 | Tool loop 失败时给一次"你应该调 X tool"的提示再重试，比严格 throw 宽容，比无限重试有界 | `planner-with-tools.ts` 的 end_turn 处理 |
| **Rule of Three** | 三现抽离规则 | 同一逻辑出现 3 处时抽共用函数；2 处容忍，4 处一定抽 | 打分函数虽才 2 处，但"同签名 + 未来会加"可提前抽 |
| **Lazy Computation** | 懒计算 | 只在需要时才计算，避免"未激活路径过度计算" | `buildPhaseKnowledgeContext` 在 tool 模式下跳过 |
| **Independent Review** | 独立评审 | 多个评审员彼此不知情，避免锚定偏差 | 派 agent team 时各 agent prompt 互不提及 |
| **Split Role Sub-Agents** | 角色分工子 agent | 同任务从 4 个视角（质量/安全/架构/冗余）并行评审，结论重合处是真问题 | `.claude/rules/agents.md` Multi-Perspective Analysis |

### 🧩 重构手法（L3）

| 术语 | 中文 | 含义 | 应用场景 |
|---|---|---|---|
| **Extract Function** | 函数提取 | 重复/可命名的代码块抽成函数，Martin Fowler《重构》第一招 | 两段代码 320 行 88% 重合时 |
| **Template Method Pattern** | 模板方法模式 | 骨架函数 + 可变"钩子"参数，调用方传入 | 分叉点 ≥2 个时优于 Extract Function |
| **Strategy Pattern** | 策略模式 | 把变化的部分封装成策略对象，主流程持有策略调用 | 变化维度正交、独立演进时最合适 |
| **Discriminated Union** | 判别式联合类型 | TS 用 `kind` 字段区分多种形态，类型系统自动缩窄 | 函数有多种返回形态时；比 optional fields 好一个数量级 |
| **Behavior-Preserving Refactor** | 行为保持重构 | 重构 PR 只改结构不改行为，和加功能严格分开 | 《Refactoring》核心纪律 |
| **Tagged Union** | 标签联合 | Discriminated Union 的别名 | 同义术语 |

### 🧪 Eval 体系（L4）

| 术语 | 中文 | 含义 | 你代码中对应 |
|---|---|---|---|
| **Eval Pyramid** | 评估金字塔 | 三层：Unit Checks / Golden Set Integration / LLM-as-Judge | 当前覆盖底层+中层 |
| **Golden Set** | 黄金集 | 人工审核过的标准测试场景集 | `evalScenarios` 6 个场景 |
| **Mock Drift** | 测试桩漂移 | 代码演进但 mock 未跟上，给虚假安全感 | L2 加 tool-calling 但 eval-harness 没更新 |
| **Mock at the Seam** | 接缝处打桩 | 在抽象接缝而不是底层 HTTP 打桩 | mock `runPlannerWithTools` 而非 `requestAgentWithTools` |
| **Baseline-as-Code** | 基线入代码 | 把"期望表现"固化到仓库，git diff 看变化 | `docs/agent-learning/eval-baseline.json` |
| **Regression Detection** | 回归检测 | 对比新旧 baseline 判断是否变差 | `npm run eval:compare` git diff |
| **Pass Rate Threshold** | 通过率阈值 | CI gate 的底线（通常 0.8 给缓冲） | `expect(passRate).toBeGreaterThanOrEqual(0.8)` |
| **LLM-as-Judge** | LLM 评委 | 用（更强的）LLM 给 agent 输出打分 | L6 做 |
| **Rubric** | 评分细则 | 告诉评委怎么打分的 prompt | L6 引入 |
| **Eval-Driven Development (EDD)** | 评估驱动开发 | 改 prompt 之前先写 eval，改完对比分数 | L4 基础设施已就位 |

### 🪞 Reflection 与迭代模式（L5）

| 术语 | 中文 | 含义 | 你代码中对应 |
|---|---|---|---|
| **Chain-of-Thought (CoT)** | 思维链 | Prompt 引导 LLM 先写推理再给答案，单轮 | 未用（planner system prompt 没写） |
| **Reflection** | 反思 | LLM 评判自己上一轮输出，决定要不要改 | `reflector.ts` 的 `runReflection` |
| **Reflexion** | 升级版反思 | Reflection + 持久化"反思日记"，跨轮学习 | L6 可选 |
| **Self-Consistency** | 自一致性 | 多次生成投票选多数 | 未用 |
| **Self-RAG** | 自检索 | 检索辅助的自我纠错 | 未用 |
| **Tree of Thoughts (ToT)** | 思维树 | 多分支探索，挑最好的 | 未用 |
| **Constitutional AI** | 宪法式 AI | 用宪法原则做自我审查 | Anthropic 专利 |
| **Heuristic Pre-Filter** | 启发式预筛 | 用代码规则先判断，省 LLM 调用 | `detectSuspiciousPlanner` |
| **Cascade Pattern** | 级联模式 | 廉价 check → 昂贵 LLM 分层 | reflector 的两层判断 |
| **Conditional Reflection** | 条件反思 | 只在可疑时 reflect，≠ always-on | env flag + heuristic 双重门控 |
| **Always-on Reflection** | 总反思 | 每轮都 reflect，反模式 | 本项目刻意没用 |
| **Synthetic Feedback Message** | 合成反馈消息 | 注入虚拟 user 消息传递反馈 | retry 时的 `[INTERNAL_REVIEWER_FEEDBACK]` |
| **Non-blocking Enhancement** | 非阻断增强 | 失败时默默降级，不让主流程崩 | `runReflection` 默认 ok |
| **Deterministic Eval** | 确定性评估 | eval 必须稳定可重现 | eval-harness mock reflector |

### 📊 Observability & Cost（L6）

| 术语 | 中文 | 含义 | 你代码中对应 |
|---|---|---|---|
| **Three Pillars of Observability** | 可观测性三支柱 | Logs / Metrics / Traces | L6 补齐 Metrics |
| **Logs** | 日志 | 离散事件流 | console.warn |
| **Metrics** | 指标 | 聚合时序数据 | TurnMetrics + Scoreboard |
| **Traces** | 链路 | 单请求完整调用树 | toolTrace + decisionTrace |
| **TTFT (Time To First Token)** | 首 token 时间 | 流式 UX 关键指标 | 未测（L6 TODO） |
| **E2E Latency** | 端到端延迟 | 用户点击到结果的总时间 | turnMetrics.totalDurationMs |
| **p50 / p95 / p99** | 百分位延迟 | 50%/95%/99% 用户的耗时 | 未聚合（需要日志平台） |
| **Tail Latency** | 尾部延迟 | 最糟糕 1% / 5% 的响应时间 | 同上 |
| **Token Economics** | Token 经济学 | LLM 的计费体系 | observability.ts 定价表 |
| **Input Tokens** | 输入 token | prompt 部分，单价最低 | LLMUsage.promptTokens |
| **Output Tokens** | 输出 token | completion 部分，~4x 单价 | LLMUsage.completionTokens |
| **Cached Tokens** | 缓存 token | Prompt Caching 命中部分，1/8 单价 | LLMUsage.cachedTokens |
| **Prompt Caching** | 提示缓存 | 对固定前缀复用，省 75% | L6 留 TODO，provider 未接 |
| **Explicit Memory** | 显式记忆 | 用户主动写偏好 | memory.ts userNotes |
| **Implicit Memory** | 隐式记忆 | agent 观察行为自动积累 | memory.ts recentSessions |
| **Episodic Memory** | 情节记忆 | 按时间顺序的事件流 | SessionFootprint |
| **Key-Value Memory** | KV 记忆 | 简单 userId → preferences | UserMemory.preferredStyleSlugs |
| **Semantic Search (Memory)** | 语义搜索 | 向量库找相似历史 | 未接（需 vector DB） |
| **LLM-as-Judge** | LLM 评委 | 用（更强的）LLM 打分 | L6 placeholder，未真接 |
| **Judge Rubric** | 评委准则 | 明确的评分维度 prompt | L6 设计指引 |
| **Judge Calibration** | 评委校准 | 定期人工抽检对比评委打分 | 生产前补 |
| **Non-breaking API Evolution** | 非破坏性 API 演进 | 加可选参数而不改原签名 | requestAgentJson 加 onUsage |
| **Zero-cost Instrumentation** | 零成本埋点 | 关闭时无运行时开销 | TurnTracker 禁用时只是 no-op |
| **Fire-and-forget Callback** | 异步回调 | 不阻塞主流程的回调 | OnUsageCallback |
| **Strategy + Interface Segregation** | 策略 + 接口隔离 | 抽象 interface + 多实现 | MemoryStore + InMemory/Supabase |
| **Factory Function** | 工厂函数 | 返回接口实现 | getMemoryStore() |
| **Default Singleton** | 默认单例 | 模块级默认实例 | defaultStore in memory.ts |
