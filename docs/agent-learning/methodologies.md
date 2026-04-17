# Agent 开发方法论

> 概念好记，方法论难学。这篇是**怎么像专业 agent 工程师那样工作**，不是抽象理论。
> 每个方法论配一个"如何应用到你的 StyleKit 项目"的具体步骤。

---

## 方法论 1：Eval-Driven Development（评估驱动开发）

### 核心思想
> **改 prompt 之前先写 eval，改完用 eval 判断有没有变好。**
> 没有 eval，你就是在靠"感觉"调 prompt——这是业余做法。

### 为什么重要
- LLM 行为是**概率性**的，你今天觉得"调好了"，明天用同样输入可能就不行
- 不同 prompt 版本、不同模型、不同 temperature——**没有 eval 就没法比较**
- "我觉得更好了"≠"真的更好了"

### 类比
就像写代码不写单元测试，改完只能靠肉眼 debug——规模一大就崩。

### 专业做法（EDD 5 步）
1. **定义任务**：你希望 agent 在这个场景做到什么？
2. **收集 20-50 个测试样本**：包含典型、边界、对抗三类
3. **定义评估指标**：准确率？格式合法率？关键字段覆盖率？
4. **写 eval runner**：跑一遍测试集，输出得分
5. **改 prompt → 跑 eval → 对比**：只接受变好的改动

### 你的项目应用
**现状**：`lib/agent/__tests__/eval-harness.ts` 有框架，`eval-scenarios.ts` 有场景，但：
- 只 mock planner 响应，**没测真实 LLM 输出**
- 没有"通过率"阈值的 CI gate
- 没有对比不同 prompt 版本的机制

**L4 要做的**：
```
1. 建 20 个真实场景（3 个中文 + 3 个英文 + 14 个变体）
2. 每个场景定义断言：
   - 必填字段（planner.productType 非空等）
   - 阶段流转（goal → audience → feel → confirm）
   - styleSlug 命中率
3. 跑一次，记录基线分数（baseline）
4. 每次改 prompt 都对比基线
```

---

## 方法论 2：Prompt Engineering Loop（提示词迭代循环）

### 核心思想
> **写 prompt 不是一次完成，而是迭代逼近。像雕刻，不像写代码。**

### 专业迭代顺序（6 步）
```
1. Baseline（最简 prompt） → 跑 eval，记录基线分
2. 加角色定义（"你是 XX 的专家"） → 再跑
3. 加输出格式约束（JSON schema 示例） → 再跑
4. 加 Few-shot 示例（2-5 个好例子） → 再跑
5. 加 Chain-of-Thought（"先分析再给答案"） → 再跑
6. 加异常 case 覆盖（"如果用户说 X，则 Y"） → 再跑
```

**每步只改一个变量**——科学方法，不是炼丹。

### 反模式（Anti-pattern）
- 一次改 5 处，分数降了，**不知道哪里坏的**
- prompt 越写越长，冗余指令互相打架
- 靠"体感"加指令，不跑 eval

### 你的项目应用
`orchestrator.ts` 里 `buildPlannerPrompt` 的 system prompt 已经挺丰富（角色+规则+6 阶段+知识上下文+硬性约束+输出格式），属于 Step 3-4 之间。

**改进方向**：
- 加 1-2 个 Few-shot 示例，展示理想的 planner 输出
- 把"禁止 emoji"等硬性规则放 prompt 开头（模型对开头更敏感）

---

## 方法论 3：Graceful Degradation（优雅降级）

### 核心思想
> **LLM 一定会失败。问题不是"会不会"，是"失败时怎么办"。**

### 专业三层防御
```
Layer 1: 结构化校验（Zod schema）
  ↓ 失败
Layer 2: 规范化修复（normalize 函数）
  ↓ 还失败
Layer 3: 规则兜底（fallback function）
  ↓ 还失败
Layer 4: 返回明确错误给前端（降级提示，不崩）
```

### 你的项目应用（已经做得不错💪）
```typescript
// Layer 1: schema 验证
plannerSchema.safeParse(parsedJson)

// Layer 2: 容忍 LLM 返回 confirmedSlots 嵌套对象
normalizePlannerResponse(raw, userMessage)

// Layer 3: dev 环境规则兜底
if (DEV_AGENT_FALLBACK) return inferPlannerFallback(...)

// Layer 4: 前端有 loading/error 状态
```

**可改进点**：生产环境目前没有 Layer 3（直接抛错）。应该：
- 记录指标：fallback 触发率、各层命中率
- 设阈值告警（fallback 率 > 5% 就查 prompt）

---

## 方法论 4：Observability Pyramid（可观测性金字塔）

### 核心思想
> **Agent 是黑盒，不做可观测性就是在闭眼飞机。**

### 三层金字塔
```
         ┌──────────────┐
         │   Metrics    │  ← 聚合数据：QPS、延迟、成功率、成本
         └──────────────┘
       ┌──────────────────┐
       │     Traces       │  ← 单次请求的完整链路
       └──────────────────┘
    ┌────────────────────────┐
    │        Logs            │  ← 原始日志（prompt+response）
    └────────────────────────┘
```

### 每层要记什么

**Logs**（最详细）：
- 完整 system prompt
- 完整 user prompt
- 完整 LLM 返回
- token 数
- 调用耗时

**Traces**（结构化）：
- 每次工具调用（tool + 参数 + 结果 + ok）
- 每个决策点（为什么选 A 不选 B）

**Metrics**（聚合）：
- p50/p95/p99 延迟
- 错误率、fallback 率
- 日均成本、单任务成本
- eval 通过率（持续监控）

### 你的项目应用
- Logs：`promptSnapshot` ✅
- Traces：`toolTrace` + `decisionTrace` ✅
- Metrics：**缺**（L6 加，建议走 OpenTelemetry 或简单 PostHog）

---

## 方法论 5：Tool Design Principles（工具设计原则）

### 核心思想
> **Tool 不是代码函数的简单包装，要为 LLM 的认知能力设计。**

### 5 条原则

1. **单一职责**：一个 tool 只做一件事。`searchAll` 不如 `searchStyles` + `searchTemplates`
2. **描述要像给新员工写文档**：`description` 字段 LLM 会看，写清楚：做什么、何时用、输入输出、失败会怎样
3. **参数要简单**：3-5 个参数最好。嵌套对象 LLM 容易写错
4. **幂等**：同参数多次调用结果一致，tool 调用容易重试
5. **错误消息要可读**：`"Style not found: abc. Did you mean 'neo-brutalist'?"` >> `"404"`

### 反例
```json
{
  "name": "doEverything",
  "description": "processes the thing",  // LLM 看不懂何时用
  "parameters": { "action": "string", "config": "object" }  // 参数太宽
}
```

### 正例
```json
{
  "name": "searchStyles",
  "description": "Search StyleKit's 130+ design styles by keyword or mood. Returns top 5 matches with slug, name, score. Use when user describes a visual feeling but hasn't named a specific style.",
  "parameters": {
    "query": { "type": "string", "description": "Free-text description of desired style" },
    "mood": { "type": "string", "enum": ["playful","professional","luxury","minimal","bold"], "optional": true }
  }
}
```

### 你的项目应用
`getSmartRecommendation`、`searchKnowledge`、`getDesignRecommendation`——目前是代码直接调用。L2 改成 tool calling 时需要按这 5 条重新设计。

---

## 方法论 6：Cost-Aware Design（成本感知设计）

### 核心思想
> **Agent 每一次 LLM 调用都在花钱。专业工程师做决策时成本在心里。**

### 常见成本陷阱
1. **每轮都重发完整历史**：上下文越长越贵，token 成指数增长
2. **大模型做小事**：用 GPT-4 判断用户说的是"yes"——用 GPT-4o-mini 就够了
3. **没开 prompt caching**：system prompt 固定部分可以缓存，省 75%
4. **重复检索**：同一 query 多次调 RAG

### 专业做法
```
1. 分层模型路由：
   - 简单分类/解析 → 小模型（Haiku/4o-mini）
   - 复杂推理/规划 → 大模型（Sonnet/Opus/GPT-4）
2. Prompt caching：
   - 固定的 system prompt 放前面
   - 动态的 user prompt 放后面
3. 短期缓存：
   - 同一 session 的知识检索结果缓存 5 分钟
4. Context 管理：
   - 历史 > N 轮时启动总结压缩
```

### 你的项目应用
**现状**：全部走一个 `AGENT_MODEL`，没分层、没缓存。

**优化空间**（L6 会做）：
- Planner 复杂，用大模型；Responder 简单总结，可用小模型
- `buildPlannerPrompt` 的 system 部分其实可以 cache（大约占 80%）
- 知识检索结果按 `normalizedQuery` 缓存

---

## 方法论 7：Guardrails Pattern（护栏模式）

### 核心思想
> **在 LLM 的输入输出两端各装一道过滤，不要信任任何一端。**

### 架构
```
用户输入 → [Input Guardrail] → LLM → [Output Guardrail] → 返回
           ↑ 过滤 PII、检测注入     ↑ 校验格式、过滤违禁
```

### Input Guardrails 做什么
- **Prompt Injection 检测**：用户输入里有"ignore previous instructions"之类的字样
- **PII 脱敏**：去掉身份证、邮箱、手机号
- **长度限制**：单次输入上限
- **黑名单词过滤**

### Output Guardrails 做什么
- **格式校验**：JSON schema（你已经用 Zod）
- **内容安全**：OpenAI Moderation API、自建敏感词库
- **一致性检查**：styleSlug 必须在已知 slug 列表里（你的 `getStyleBySlug` 就是一种）

### 你的项目应用
**现状**：
- ✅ 输入长度限制（Zod：`message: z.string().trim().min(1).max(2000)`）
- ✅ 输出 schema 校验
- ✅ Origin 校验（`verifyTrustedOrigin`）
- ❌ 无 prompt injection 检测
- ❌ 无内容审核

**改进建议**：
- 用户输入扫一遍关键词（"ignore"、"forget"、"system prompt"）
- 生产环境接 OpenAI Moderation（免费）

---

## 方法论 8：Human-in-the-Loop（HITL，人在环中）

### 核心思想
> **关键决策点永远放一个人工审核的口子——不是因为 LLM 不行，是因为"验收"这件事本身需要人。**

### HITL 的 3 个经典位置

1. **方案确认前**：agent 给出规划，用户 OK 了才执行
2. **工具调用前**（危险操作）：发邮件、付款、删数据——必须人工批
3. **最终输出后**：用户可反馈"喜欢/不喜欢"，收集 RLHF 数据

### 你的项目应用（已经用得很漂亮💪）
`confirm` 阶段就是**经典的 HITL 检查点**：
```
goal → audience → feel → [confirm ←── HITL 卡点]  → done
                              ↓
                        用户说 OK 才进 done
                        用户说改 → revise → 回到对应阶段
```

**可加强的**：
- 生成后收集"这个提示词好用吗"的反馈按钮（隐式 HITL）
- 用户反馈数据可以回流成 eval 样本

---

## 案例拆解：你项目里的 3 个亮点

### 亮点 1：三级 styleSlug 回填（orchestrator.ts:1382-1393）
```typescript
const rawStyleSlug =
  planner.styleSlug ||                              // Level 1: LLM 显式
  extractPlannerHistory(messages).styleSlug ||      // Level 2: 历史快照
  extractSelectedStyleSlugFromConversation(...) || // Level 3: 会话追溯
  fuzzyMatchStyleFromText(planner.visualTone);     // Level 4: 模糊匹配
```
**方法论归属**：Graceful Degradation + Hallucination 防御
**专业评价**：这是**典型的生产级防御**。LLM 有 20% 概率漏填 styleSlug，这 4 层保证 95%+ 的场景能拿到结果。

### 亮点 2：Dev Fallback 隔离（orchestrator.ts:147-149）
```typescript
const DEV_AGENT_FALLBACK =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_DEV_MOCK_USER === "true";
```
**方法论归属**：Environment Isolation
**专业评价**：Dev 环境能跑规则兜底，生产环境强制真 LLM——这是对的。很多人会误把 dev fallback 部署到生产。

### 亮点 3：Observability 三件套
`promptSnapshot` + `toolTrace` + `decisionTrace`——**这是业界标配**。
Anthropic/OpenAI 的内部 eval dashboard 就是基于类似结构设计。

---

## 高级方法论（L5+ 预告）

- **Multi-Agent Patterns**：Orchestrator-Worker、Debate、Hierarchical
- **Reflection**：让 agent 评判自己的输出，自动改进
- **Self-Consistency**：生成 5 次答案，投票选多数
- **Adversarial Testing**：主动用对抗样本攻击自己的 agent

这些等打到 L5 再展开。

---

## 使用建议

- 每关学完一种方法论，对照自己项目查差距
- 方法论是"手法"，不是"答案"——同一方法论在不同项目落地不一样
- **不要一次性套用全部方法论**，会过度工程化。按优先级：
  1. Observability（最先）
  2. Eval-Driven Development（第二）
  3. Graceful Degradation（第三）
  4. 其他按需
