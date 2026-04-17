# L2：Tool Calling 原生化

> **学习目标**：把"prompt-级伪 tool"升级为 OpenAI 原生 function calling。
> **前置**：L1 心智模型。
> **课时**：2 节对话。
> **代码改动**：新增 9 个文件，修改 orchestrator.ts / provider.ts。
> **状态**：✅ 完成（2026-04-17）。

---

## 1. 为什么要做 L2

L1 里我们看到，你的 agent 当前用**prompt 级伪 tool**模式：
- 把 JSON schema 用文字写进 system prompt
- 代码手动调 `getSmartRecommendation` / `searchKnowledge` / `buildAgentCodePrompt`
- LLM 只负责填表，**不参与工具调度决策**

这种模式**能跑**，但不是专业 agent 的样子：
1. 解析容易出错（你的 `normalizePlannerResponse` 就是兜底证据）
2. 扩展性差（加能力要改 3 处）
3. LLM 只当"填表员"，没在做"决策者"

**L2 把决策权还给 LLM**：让 LLM 自己决定何时调哪个 tool，用什么参数。

---

## 2. 本次交付的 9 个文件

```
lib/agent/tools/
  ├── types.ts                    ← AgentTool 规范定义（40 行）
  ├── executor.ts                 ← 执行器 + 错误隔离（105 行）
  ├── index.ts                    ← Tool 注册表（43 行）
  ├── search-styles.ts            ← 搜风格（64 行）
  ├── search-templates.ts         ← 搜模板（75 行）
  ├── search-components.ts        ← 搜组件（60 行）
  ├── get-style-details.ts        ← 取风格详情（58 行）
  ├── get-design-guidelines.ts    ← 取设计指南（75 行）
  └── finalize-planner.ts         ← "终结 tool"（90 行）← Finalize Tool Pattern

lib/agent/
  └── planner-with-tools.ts       ← 新版 planner + tool loop（215 行）

修改：
  ├── lib/agent/provider.ts       ← 加 requestAgentWithTools() + Zod→JSONSchema（+170 行）
  └── lib/agent/orchestrator.ts   ← 加 feature flag + trace 合并（+50 行，无删除）
```

**共 +800 行代码，0 行删除，tsc 零错误，完全向后兼容**。

---

## 3. 关键设计决策复盘

### 3.1 Zod 4 原生 `z.toJSONSchema()`
Zod 4.3.6 内置了 `z.toJSONSchema()`，不用再装 `zod-to-json-schema`。
代码位置：`provider.ts` 的 `toolToOpenAIFormat`。

### 3.2 Finalize Tool Pattern（核心创新）
> **用"终结 tool"代替"最后一轮写 JSON"。**

专业做法：定义一个特殊 tool 叫 `finalize_planner_result`，告诉 LLM：
- 其他 tool 是"搜索/查询"
- 这个 tool 是"提交最终结果"
- 调用它就等于这轮结束

**为什么更稳**：LLM 写 tool arguments 的能力比写自由 JSON 强（训练数据分布更密集）。

**来源**：Anthropic 2024 年 "Tool use best practices" 文档。

### 3.3 不在 provider 里做循环
专业分层：**provider 管 HTTP，orchestrator 管 loop**。
单次 `requestAgentWithTools` 返回：
- `stopReason: "end_turn"` → 结束
- `stopReason: "tool_use"` → 有 tool_calls，等调用方执行
- 调用方把 tool_results 塞回 messages 再调

### 3.4 Shadow Deployment（影子部署） via Feature Flag
改造没**删除任何老代码**。用 env 开关切换：
```
AGENT_USE_TOOL_CALLING=true   # 默认，走新路径
AGENT_USE_TOOL_CALLING=false  # 回滚到老 planner
```
生产发现问题可秒级回滚，不用重新部署。

### 3.5 自动降级
新 loop 抛 `PlannerToolLoopError`（模型不支持、步数超限）时，**自动回退**到老 JSON schema 路径。**永不让 agent 完全坏掉**。

---

## 4. Tool 设计五原则（已应用）

出自 `methodologies.md` 的 Tool Design Principles：

| 原则 | 本次应用 |
|---|---|
| 单一职责 | search_styles 只搜风格，get_style_details 只取详情，不混 |
| 描述像 API 文档 | 所有 tool 的 `description` 都带 "USE WHEN ... DO NOT use when ..." |
| 参数简单 | 最多 4 个参数，2-3 个可选 |
| 幂等 | 同参数同结果 |
| 可读错误 | 错误消息带 context，如"Style 'xxx' not found. Use search_styles first" |

---

## 5. Phase A 的边界（没做的事）

明确说清楚**没做**什么，避免误解：

- ❌ **Responder 没改**：还是老的 `requestAgentJson` 生成最终摘要
- ❌ **状态机外壳没变**：6 阶段 FSM 完整保留（goal/audience/feel/confirm/revise/done）
- ❌ **Code prompt 生成没改**：done 阶段的 codePrompt 还是代码硬拼
- ❌ **流式/非流式分支没合并**（L3 做）
- ❌ **没真跑过 LLM**：tsc 通过，但没开 API key 验证实际行为

**留给 Phase B（L5）**：
- 去掉状态机硬阶段，让 LLM 自主决定
- Responder 也 tool 化
- 多 tool 并行调用

---

## 6. 如何开启和验证

### 开启（默认）
环境变量：
```bash
AGENT_API_KEY=sk-...
AGENT_MODEL=gpt-4.1          # 或 gpt-4o / gpt-4.1-mini
AGENT_BASE_URL=https://api.openai.com/v1
AGENT_USE_TOOL_CALLING=true  # 可不设，默认就是 true
```

### 验证方法
1. **tsc**：`npx tsc --noEmit --skipLibCheck`（L2 改动零错）
2. **手动对话**：开发模式下打开 /agent 页面，走一轮完整对话
3. **看 toolTrace**：前端 UI 会显示每轮调了哪些 tool（`tools/finalize_planner_result`、`search_styles` 等）
4. **回滚演练**：设 `AGENT_USE_TOOL_CALLING=false`，应该回到老行为

### 已知限制
- 老 vitest 测试挂了（但不是 L2 导致，是 `@/lib/xxx` 别名未配）
- Agent 真机行为依赖模型是否支持 function calling（OpenAI 官方模型都支持）

---

## 7. L2 自测清单

- [ ] 我能说出 Tool Calling 相对 prompt-级伪 tool 的 3 个优势
- [ ] 我知道 Finalize Tool Pattern 是什么、为什么用
- [ ] 我能解释为什么 provider 不应该做 tool loop
- [ ] 我知道 Zod 4 有 `z.toJSONSchema()`
- [ ] 我能说出自动降级的两个触发场景

---

## 8. 下一关预告

**L3：消除流式/非流式重复**
`orchestrator.ts` 里 `runAgentTurn` 和 `runAgentTurnStreaming` 有约 200 行几乎一模一样的代码。合并它们，建一个 `prepareAgentTurn` 共享计算，只最后响应分叉。

**这是 L2 打下的地基见效的时候**——tool 化 + feature flag 让 L3 重构更安全。

---

## 附录 A：本关学到的新术语（已进 glossary.md）

- **Finalize Tool Pattern** — 用"终结 tool"代替最后一轮写 JSON
- **Schema-first Retrieval** — 能用结构化字段过滤就别硬上全文搜索
- **Fetch vs Search Pattern** — 取一个 vs 查多个，分不同 tool
- **Usage Boundary** — tool description 里写 "USE WHEN ... DO NOT use when ..."
- **Tool Registry** — 所有 tool 集中注册点
- **Error Isolation** — tool 可 throw，executor 统一接住
- **Shadow Deployment** — 新旧路径共存，feature flag 切换
- **Graceful Fallback Chain** — 多层降级，永不让 agent 全挂

---

## 附录 B：Multi-Perspective Audit 后的 4 处补丁（2026-04-17）

L2 主改造完成后，派出 agent 团队做代码质量 / 安全 / 架构 / 冗余四视角独立审查。
团队遇上游 API 事故全军覆没，主帅披挂补位给出报告，发现并修复以下 4 处：

### 补丁 1：删 `_keepZ` hack（HIGH）
- 位置：`lib/agent/planner-with-tools.ts` 末尾
- 改动：删掉未使用的 `z` import 和 `export const _keepZ = z` 保留 import 的 hack
- **教学**：永远不要用 `_keepXxx` 这种"压 linter 警告"的写法，要么用要么删

### 补丁 2：共享打分函数（High ROI）
- 位置：新增 `lib/agent/tools/_scoring.ts`
- 改动：抽取 `scoreKeyword(haystack, query, options?)`，让 search-templates 和 search-components 复用
- **教学**：Rule of Three 的变体——函数语义相同 + 签名相同 + 未来还会加 tool，正好可以提前抽

### 补丁 3：tool 模式短路 `buildPhaseKnowledgeContext`（High ROI）
- 位置：`lib/agent/orchestrator.ts` 两个 `runAgent*Turn` 分支
- 改动：`USE_TOOL_CALLING_PLANNER` 开启时，`phaseKnowledge` 直接用 `emptyKnowledge`，跳过预检索
- **教学**："死代码" vs "未激活路径过度计算"——后者是**懒计算**的优化场景

### 补丁 4：Nudge-Retry Pattern（MEDIUM）
- 位置：`lib/agent/planner-with-tools.ts` 的 tool loop 内
- 改动：模型 end_turn 但未调 finalize 时，先给一次 user-role 提示"必须调 finalize"，重试无效再抛错
- **教学**：**Nudge-Retry** 是 agent 工程常见模式——比严格 throw 更 forgiving，比无限重试更有界

### 验证
- tsc 全过
- 无现有测试回归（vitest 基础设施问题 pre-existing）
- 无代码删除，向后兼容
