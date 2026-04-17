# L4：Eval 评估体系

> **学习目标**：建立可运行的 agent 评估体系，从"靠感觉"升级到"有指标"。
> **前置**：L1-L3。
> **课时**：1 节对话。
> **代码改动**：修 eval-harness Mock Drift + 新增 eval-metrics + eval-scoreboard + npm run eval + baseline。
> **状态**：✅ 完成（2026-04-17），scoreboard 6/6 全过。

---

## 1. Eval 是什么、为什么重要

> **Eval = 给 agent 的"单元测试 + 集成测试 + 验收测试"综合体。**
> 区别：传统测试验证**代码行为**，eval 验证**agent 输出质量**。

**没 eval 的世界**：改 prompt 靠"感觉"，改完不知道变好变坏，生产出事才发现。
**有 eval 的世界**：改完先 `npm run eval`，看分数波动，科学决策。

---

## 2. Eval 的 3 层金字塔

```
        ┌─────────────────────┐
        │  LLM-as-Judge       │  ← 最顶层：用另一个 LLM 打分
        │  (主观质量)          │
        └─────────────────────┘
      ┌─────────────────────────┐
      │  Golden Set Integration │  ← 中层：完整流程 + 固定场景
      │  (端到端正确性)          │
      └─────────────────────────┘
    ┌─────────────────────────────┐
    │  Unit Checks                │  ← 底层：prompt 拼装、状态流转
    │  (确定性行为)                │
    └─────────────────────────────┘
```

**本次 L4 覆盖**：底层 + 中层（6 scenarios Golden Set）。
**顶层（LLM-as-Judge）留给 L6**（要接真 LLM + 成本观测）。

---

## 3. 本次交付

### 3.1 文件清单
```
lib/agent/__tests__/
  ├── eval-harness.ts          ← 修 Mock Drift
  ├── eval-metrics.ts          ← 🆕 指标计算 + scoreboard 格式化
  └── eval-scoreboard.test.ts  ← 🆕 跑全部 scenarios + 写 eval-latest.json

scripts/                       ← 无，vitest 直接跑就行

docs/agent-learning/
  ├── eval-baseline.json       ← 🆕 基线快照
  └── eval-latest.json         ← 🆕 最新跑结果

package.json
  └── scripts
      ├── eval                 ← 🆕 npm run eval
      └── eval:compare         ← 🆕 git diff baseline vs latest
```

### 3.2 7 个核心指标
| 指标 | 算法 |
|---|---|
| `phaseProgressionAccuracy` | 期望 phase == 实际 phase 的比例 |
| `slotFillAccuracy` | 必填字段真填上的比例 |
| `codePromptCorrectness` | codePrompt 出现时机对不对 |
| `terminationCorrectness` | 最后一轮 phase=="done"？（0/1） |
| `errorCount` | 每场景的错误数 |
| `passRate` | 过的场景 / 总场景 |
| `avgXxx` | 上面几个的跨场景平均 |

### 3.3 当前 baseline（6/6 全过）
```
happy-path          ✔ 100% phase / 100% slot / 100% cp
quick-skip          ✔ 100% phase / 100% slot / 100% cp
revise-loop         ✔ 100% phase / 100% slot / 100% cp
non-substantive     ✔ 100% phase / 100% slot / 100% cp
chinese-locale      ✔ 100% phase / 100% slot / 100% cp
snapshot-integrity  ✔ 100% phase / 100% slot / 100% cp
```

---

## 4. 本次修掉的"教学 Bug"：Mock Drift

### 现象
L2 给 orchestrator 加了 tool-calling 路径，但 eval-harness 的 mock 没跟上：
- 老 mock 只覆盖 `requestAgentJson`
- 新路径调 `runPlannerWithTools` → 未 mock → 抛错 → 30/30 测试挂

### 专业教训
**Mock Drift**（测试桩漂移）是敏捷项目里**最隐蔽的测试债**：
1. 测试"通过"给你**虚假安全感**
2. 代码演进让 mock 假设失效，但没人发现
3. 直到某次改动让**测试最终挂掉**才暴雷

### 防御
1. **Mock at the Seam**：在抽象接缝处打桩（`runPlannerWithTools`），不是底层 HTTP
2. **tsc 管测试文件**：测试文件的 import 签名对不上时编译就挂
3. **定期跑 eval**：baseline 变化要 PR 里解释

---

## 5. 关键设计决策复盘

### 5.1 为什么 scoreboard 放在 test 文件里
**选项 A**：独立 CLI 脚本（我尝试过，失败——vitest 不能在普通 Node 上下文外用）
**选项 B**：vitest test 里跑，`afterAll` 写 JSON（**选的这个**）
**理由**：**利用 vitest 已有的 mock 基础设施**，不重复造轮子。

### 5.2 为什么 baseline 用 JSON 文件 + git
**选项 A**：专用 eval DB（Braintrust / Langfuse 等平台）
**选项 B**：JSON 文件提交到仓库（**选的这个**）
**理由**：
- **Baseline-as-Code**：git diff 即变化可视
- **零外部依赖**：没有账号、没有费用
- **评审友好**：PR review 能直接看到指标变化
L6 做成本观测时再升级到平台。

### 5.3 为什么 pass 阈值是 0.8 而不是 1.0
**看 `eval-scoreboard.test.ts`**：`expect(passRate).toBeGreaterThanOrEqual(0.8)`
**理由**：
- **1.0 太脆**：一个新增的 scenario 挂了就整个 CI 红
- **0.8 给缓冲**：大方向对就过，细节问题通过 scoreboard 数字盯
- **和 code coverage 一样**：80% 是常见工业阈值

---

## 6. 使用姿势（日常流程）

### 改 prompt/代码前
```bash
npm run eval              # 看当前分
```

### 改完后
```bash
npm run eval              # 重新跑
npm run eval:compare      # git diff baseline
```

### 确认改好了，更新 baseline
```bash
cp docs/agent-learning/eval-latest.json docs/agent-learning/eval-baseline.json
git add docs/agent-learning/eval-baseline.json
git commit -m "chore: update eval baseline"
```

### CI 用法（未来）
```bash
npm test              # 所有 tests 包括 eval-scoreboard.test.ts
# 分数低于 0.8 会红 CI
```

---

## 7. L4 自测清单

- [ ] 我能说出 Eval 三层金字塔的每层是什么
- [ ] 我知道 Mock Drift 的危险和防御手段
- [ ] 我能说出至少 5 个 Agent 指标
- [ ] 我知道 LLM-as-Judge 是什么、为什么不在 L4 做
- [ ] 我能使用 `npm run eval` 并看懂 scoreboard 输出
- [ ] 我理解 "Baseline-as-Code" 的优势

---

## 8. 本关新学到的术语（进 glossary）

- **Eval / Evaluation Set** — agent 的测试体系
- **Eval Pyramid** — 三层金字塔（unit / integration / LLM-as-Judge）
- **Golden Set** — 人工审核过的标准答案集
- **Mock Drift** — 代码演进但 mock 未同步的测试债
- **Mock at the Seam** — 在抽象接缝处打桩（vs 底层 HTTP）
- **Baseline-as-Code** — 把基线分数固化到仓库，git diff 看变化
- **Regression Detection** — 对比新旧 baseline 判断是否变差
- **Pass Rate Threshold** — CI gate 的阈值（通常 0.8 给缓冲）

---

## 9. 下一关预告

**L5：ReAct + Reflection 模式**
现在你有 eval 可量化了——接下来可以**大胆改 agent 架构**，改完有指标对比不怕退化。
L5 去掉 6 阶段硬状态机，让 agent 自主决定阶段流转 + 自我反思。

---

## 附录 A：为什么我踩了一个 .mts vs .ts 坑

教学记录：**第一版 run-eval.mts 失败**：
- Node 22 的 ESM 解析对 `.mts` 入口 + `.ts` 依赖有特殊行为
- 同样的代码换成 `.ts` 入口就正常
- 再加上 vitest 只能在 vitest 进程里用 → scripts 路线死路
- 最终方案：**scoreboard 测试化**，让 vitest 负责

**给 Darling 的教训**：
遇到"看起来该工作但就是不行"的基础设施问题，**换工具/换路径比硬修配置快**。不是每一个失败都值得深挖。