# AI 驱动风格提交流程 Research（2026-02-18）

## 1. 背景与研究问题

### 背景
StyleKit 已有风格提交能力，但“让用户把需求交给自己的 AI，一次性生成可提交内容并提交”这条链路还不够顺滑，导致：

- 提交内容结构不稳定（字段缺失、命名不一致、格式漂移）。
- 用户不知道“最小可提交集”与“完整可入库集”的差异。
- 现有能力分散在提交页、脚手架下载、文档、MCP，缺少统一入口。

### 研究问题
如何在不牺牲质量门槛的前提下，建立一条 **AI-first** 的风格提交路径，让外部用户可以：

1. 给 AI 明确规范（结构化输出约束）。
2. 自动生成风格提交所需内容（manifest + 资产 + 校验结果）。
3. 低摩擦提交（先 Issue，再逐步演进到 MCP 自动化）。

---

## 2. 当前仓库现状（事实盘点）

> 以下均来自当前仓库代码与文档。

### 2.1 已有提交流程能力

- `POST /api/submit` 已存在，且有登录校验、速率限制和 payload 大小限制。  
  参考：`app/api/submit/route.ts:22`, `app/api/submit/route.ts:23`, `app/api/submit/route.ts:54`, `app/api/submit/route.ts:57`, `app/api/submit/route.ts:81`
- 提交数据由 `zod` 严格校验，字段较完整（name/nameEn/slug/category/styleType/colors/rules/components 等）。  
  参考：`lib/submit/validator.ts:14`, `lib/submit/validator.ts:16`, `lib/submit/validator.ts:17`, `lib/submit/validator.ts:22`, `lib/submit/validator.ts:23`, `lib/submit/validator.ts:66`, `lib/submit/validator.ts:71`
- 提交向导已支持：
  - URL 抽取（`/api/style-extract`）  
    参考：`components/submit/submission-wizard.tsx:260`, `components/submit/submission-wizard.tsx:264`
  - JSON 复制、脚手架下载、提交到社区  
    参考：`components/submit/steps/submit-step.tsx:177`, `components/submit/steps/submit-step.tsx:197`, `components/submit/steps/submit-step.tsx:75`

### 2.2 当前能力缺口

- `generateStyleScaffoldFiles()` 目前只生成 4 个文件：
  - `lib/styles/{slug}.ts`
  - `lib/styles/{slug}-tokens.ts`
  - `public/styles/{slug}.svg`
  - `scaffold/REGISTER.md`  
  参考：`lib/scaffold/style-scaffold.ts:24`, `lib/scaffold/style-scaffold.ts:41`, `lib/scaffold/style-scaffold.ts:43`, `lib/scaffold/style-scaffold.ts:44`, `lib/scaffold/style-scaffold.ts:45`
- 但完整入库 checklist 要求更多（注册、showcase、资产等），并声明“6 新建 + 4 修改”。  
  参考：`docs/STYLE_ADDITION_CHECKLIST.md:6`, `docs/STYLE_ADDITION_CHECKLIST.md:96`, `docs/STYLE_ADDITION_CHECKLIST.md:129`, `docs/STYLE_ADDITION_CHECKLIST.md:185`, `docs/STYLE_ADDITION_CHECKLIST.md:250`
- MCP server 当前核心工具为 6 个，实验工具默认关闭（需 env 打开）。  
  参考：`tools/mcp/server.ts:10`, `tools/mcp/server.ts:18`, `tools/mcp/server.ts:76`
- README 当前写的是“9 tools available”，与默认运行时能力存在认知落差。  
  参考：`README.md:228`

---

## 3. 外部资料调研结论（与本问题直接相关）

## 3.1 结构化输出（AI 结果稳定性）

- OpenAI 文档对 Structured Outputs 的核心能力是：通过 JSON Schema 约束输出格式，并可用 `strict: true` 提升可预测性。  
  来源：  
  - https://platform.openai.com/docs/api-reference/chat/create  
  - https://platform.openai.com/docs/guides/function-calling

**对本项目的意义**：  
先定义 `style-submission-manifest.schema.json`，让用户把 schema 交给 AI 生成，能显著减少“看起来像对但不可提交”的结果。

## 3.2 MCP 的正确角色划分

- MCP 文档将能力分为 tools / resources / prompts：  
  - tools：模型触发动作  
  - resources：结构化上下文供模型读取  
  - prompts：可复用提示模板  
  来源：  
  - https://modelcontextprotocol.io/docs/concepts/tools  
  - https://modelcontextprotocol.io/docs/concepts/resources  
  - https://modelcontextprotocol.io/docs/concepts/prompts

**对本项目的意义**：  
“提交能力”应拆成多个可组合动作（生成、校验、打包、投递），不是单个黑盒 `submit`。

## 3.3 低摩擦收口（Issue Form）

- GitHub Issue Forms 支持结构化字段与必填控制，最终落地为可审核的 issue 记录。  
  来源：https://docs.github.com/en/issues/tracking-your-work-with-issues/configuring-issues/about-issue-forms

**对本项目的意义**：  
即使用户不用 MCP，也可以通过 “AI 生成 manifest + Issue Form 填报” 完成低成本提交。

## 3.4 客户端生态（Claude / Cursor）

- Anthropic 文档确认 MCP 在 Claude 侧的接入方式与注意事项（工具调用/安全确认）。  
  来源：https://docs.anthropic.com/en/docs/mcp  
- Cursor 文档支持通过 `~/.cursor/mcp.json` 或项目级 `.cursor/mcp.json` 集成 MCP。  
  来源：https://docs.cursor.com/context/model-context-protocol

**对本项目的意义**：  
可以同时覆盖“个人本地 AI”与“团队项目级 AI 配置”。

---

## 4. 方案对比（混合方案评估）

评分维度：上线速度、实现成本、输出一致性、自动化深度、长期可维护性（5 分制）。

| 方案 | 描述 | 速度 | 成本 | 一致性 | 自动化 | 维护性 | 结论 |
|---|---|---:|---:|---:|---:|---:|---|
| A | 仅文档 + Prompt | 5 | 5 | 2 | 1 | 2 | 上线快，但质量波动大 |
| B | Issue Form + Schema + 本地校验 | 4 | 4 | 4 | 2 | 4 | 当前最稳的低成本方案 |
| C | 全 MCP 自动提交 | 2 | 2 | 4 | 5 | 3 | 体验最好，但改造周期长 |
| D | **混合分阶段（推荐）** | 4 | 4 | 5 | 4 | 5 | 先稳再强，风险最可控 |

---

## 5. 推荐路线（决策）

采用 **混合分阶段**：P0（低成本落地）→ P1（服务化校验）→ P2（MCP 自动投递）。

## P0（1-2 周）：先让用户“能交且不乱”

### 交付物

1. **Research 文档**（本文件）
2. **提交契约 Schema**  
   - `schemas/style-submission-manifest.schema.json`
3. **AI Prompt Pack（中英）**  
   - `docs/submission/ai-submission-pack.md`
   - 包含 Claude/Cursor/ChatGPT 三套模板 + few-shot
4. **GitHub Issue Form**  
   - `.github/ISSUE_TEMPLATE/style_submission.yml`
5. **本地校验脚本（非破坏）**  
   - `tools/submission/validate-manifest.ts`

### 提交格式（P0 统一标准）

- `manifest.json`（必选）
- `cover.svg`（必选）
- `self-check.md`（AI 自检报告，必选）
- 可选附件：`tokens.ts`、`style.ts`、`recipes.ts` 草稿

### P0 验收标准

- 80% 以上 AI 产出的 manifest 可通过 schema 校验。
- Issue 模板可在 10 分钟内完成一次完整提报。
- 审核者可仅看 issue 即判断“可补充”或“可进入开发”。

## P1（2-4 周）：把校验做成服务

### 新增接口（建议）

- `POST /api/submit/validate`  
  入参：`manifest` + `cover`（base64 或 URL）  
  出参：`{ ok, errors[], warnings[], qualityScore }`
- `POST /api/submit/bundle`  
  入参：`manifest`  
  出参：标准 zip（含脚手架与注册说明）

### 质量门禁

- Schema 合法性
- 必填代码片段完整性（button/card/input）
- 基础风险检查（slug 冲突、颜色值、超长字段）
- 与 `wizardFormSchema` 对齐校验（单一真值）

## P2（4+ 周）：MCP 端到端自动化

### 新 MCP tools（建议）

1. `generate_submission_manifest`
2. `validate_submission_manifest`
3. `generate_submission_bundle`
4. `create_submission_issue`

> 设计原则：先“生成 + 校验 + 打包”，最后再“投递”，确保每一步可观测、可回滚。

---

## 6. 接口与类型草案（供后续实现）

## 6.1 Manifest 顶层结构（建议）

```json
{
  "meta": {
    "schemaVersion": "1.0.0",
    "generatedBy": "claude|cursor|chatgpt|manual",
    "generatedAt": "2026-02-18T12:00:00.000Z"
  },
  "style": {
    "name": "新粗野主义",
    "nameEn": "Neo Brutalist",
    "slug": "neo-brutalist-alt",
    "description": "..."
  },
  "design": {
    "category": "modern",
    "styleType": "visual",
    "tags": ["modern", "high-contrast"],
    "colors": {
      "primaryColor": "#111111",
      "secondaryColor": "#ffffff",
      "accentColors": ["#ff3b30"]
    }
  },
  "content": {
    "keywords": ["粗野", "强对比"],
    "philosophy": "...",
    "doList": ["..."],
    "dontList": ["..."],
    "aiRules": ["..."]
  },
  "components": {
    "buttonCode": "...",
    "cardCode": "...",
    "inputCode": "..."
  },
  "assets": {
    "coverSvg": "<svg>...</svg>"
  }
}
```

## 6.2 与现有后端契约对齐策略

- `wizardFormSchema` 继续作为后端真值。
- `manifest schema` 为外部输入层（更友好）；服务端在 validate/submit 时做映射到现有字段。
- 不在 P0 改动现有 `/api/submit` 行为，避免影响线上提交链路。

---

## 7. 质量策略（防“玩具化”）

建立三层质量闸门：

1. **L0 结构闸门**：JSON Schema + 字段约束（必填、枚举、长度、颜色格式）。
2. **L1 规则闸门**：Do/Don't 完整性、组件代码可读性、slug 唯一性预检查。
3. **L2 人审闸门**：是否符合风格哲学、是否值得入库（人工最终裁决）。

---

## 8. 指标与实验设计

核心指标（按周统计）：

- 首次提交通过率（不需要补字段）
- 平均补交次数
- 审核退回率
- 从“开始生成”到“成功提交”的中位耗时

建议目标（首月）：

- 首次结构通过率 >= 70%
- 平均补交次数 <= 1.5
- 提交流程中位耗时下降 >= 40%

---

## 9. 风险与缓解

### 风险 1：AI 生成内容看似完整但质量低
- 缓解：强制 self-check 模板 + L1 规则闸门 + 人审。

### 风险 2：契约分裂（schema 与后端校验漂移）
- 缓解：将 `wizardFormSchema` 字段映射自动生成到 schema（后续可脚本化）。

### 风险 3：MCP 工具权限过大
- 缓解：工具拆分、默认只读校验、显式确认后才执行投递动作。

### 风险 4：文档入口过多导致用户迷路
- 缓解：统一在一个 “AI Submission Pack” 文档中给不同 AI 的入口片段。

---

## 10. 默认决策（本研究结论）

- 采用“混合分阶段”路线，不直接跳到全自动 MCP 提交。
- P0 先建设契约（schema）和收口（Issue Form），确保质量和可执行性。
- 后端 `/api/submit` 暂不破坏性改动，所有增强通过新增 validate/bundle 能力演进。
- 对外统一术语使用 `Style Submission Manifest`，减少歧义。

---

## 11. 附录：资料来源

1. OpenAI Chat Completions API（含 `response_format` / `json_schema` / strict）  
   https://platform.openai.com/docs/api-reference/chat/create
2. OpenAI Function Calling（strict schema 相关约束）  
   https://platform.openai.com/docs/guides/function-calling
3. MCP Concepts: Tools  
   https://modelcontextprotocol.io/docs/concepts/tools
4. MCP Concepts: Resources  
   https://modelcontextprotocol.io/docs/concepts/resources
5. MCP Concepts: Prompts  
   https://modelcontextprotocol.io/docs/concepts/prompts
6. Anthropic MCP 文档  
   https://docs.anthropic.com/en/docs/mcp
7. GitHub Issue Forms 文档  
   https://docs.github.com/en/issues/tracking-your-work-with-issues/configuring-issues/about-issue-forms
8. Cursor MCP 配置文档  
   https://docs.cursor.com/context/model-context-protocol

