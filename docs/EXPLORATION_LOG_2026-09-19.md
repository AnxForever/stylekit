# 探索日志：TypeSafe / Jev、Vercel 清理、替代 embedding 服务

> 状态：调研完成，**未改动任何产品代码**
> 日期：2026-09-19
> 起点：安装 `typesafe@typesafe-ai` skill 后，对「模型在边界内做判断、代码负责组装」这一模式的实测

本文记录一次**探索性调研**，不是设计文档。所有数字都是实跑出来的，没跑过的会明确标注为推断。

---

## 1. 结论速览

| 发现 | 证据等级 | 影响 |
|---|---|---|
| 生产 Advisor 路径准确率天花板 **13.3%** | 实测 | 结构性问题：候选集里没有答案 |
| `lib/retrieval/` 检索线 **生产零调用** | 代码核查 | 能力已建好，没接线 |
| Jev **可用、快、便宜** | 实测 | 热调用 250–700ms |
| Jev **置信度是活的**（0.32–1.00） | 单样本观测 | **未经校准验证** |
| 中转站 embedding **每窗口硬限 10 批** | 实测 | 影响索引重建策略 |
| Vercel 账号 70 项目 → 10 项目 | 已执行 | 清理完成 |

---

## 2. StyleKit 的两个结构性问题

### 2.1 Advisor 候选集天花板 = 13.3%

`app/api/ai/style-advisor/route.ts` 调用 `requestStyleIntent` 时不传 `scope`，于是走默认值 `"demo"`（`lib/bailian/client.ts:134`），即只有四个风格：

```
neo-brutalist / glassmorphism / neumorphism / editorial
```

拿这四个去比 60 条标注评估集：

| 类型 | n | primary 命中 | any 命中 |
| --- | --- | --- | --- |
| zh-intent | 20 | 2 (10%) | 2 (10%) |
| zh-term | 15 | 3 (20%) | 5 (33%) |
| en | 15 | 2 (13%) | 3 (20%) |
| cross-lingual | 10 | 1 (10%) | 2 (20%) |
| **整体** | **60** | **8 (13.3%)** | **12 (20.0%)** |

**这不是模型选得准不准的问题**：正确答案不在候选集里，换任何模型数字都一样。

**但要区分两件事**：

- `workspace/[projectId]` 场景用四个候选是**正确的**——`lib/workspace/generation.ts:42` 的 `requireSupportedStyle` 硬拒其他风格，注释写明「其他风格不会降级为通用模板」。这是生成器的真实能力边界。
- `/style-advisor` 独立页**没有这个约束**，却继承了同一个默认值。页面文案写的是「从 StyleKit 的已验证风格中做选择」——这是**过度承诺**。

**待决策**（本文不预设结论）：独立页该推荐「最合适的」还是「能生成的」。

### 2.2 检索线已建好但未接线

`createHybridSearcher` / `hybridSearch` 在 `lib/` 与 `app/` 中**零调用**，只出现在 `tools/scripts/evaluate-retrieval.ts`。

设计文档 §5.4 记录其实测表现（2026-09-17，60 条标注集，DashScope `text-embedding-v4`）：

| 组 | Recall@1 | MRR | NDCG@5 |
| --- | --- | --- | --- |
| B（BM25） | 81.7% | 0.876 | 0.710 |
| C（混合检索） | **96.7%** | 0.978 | 0.811 |

**结论：能力存在、已量化、但没接进产品。** 这也解释了为什么设计文档 §3.4 会否决 rerank——那是在一个尚未通电的架构上做的最优决策。

---

## 3. TypeSafe / Jev 实测

### 3.1 基本信息（核实自 live docs 与 API）

| 项 | 值 |
|---|---|
| 端点 | `POST https://api.typesafe.ai/v1/systemone` |
| 模型 | `jev-latest` → 实测返回 `jev-1.13.0` |
| 价格 | **$0.042 / Mtok 输入，输出免费** |
| 限流 | 250k tok/s，1200 req/min |
| 上下文 | 64k/请求，**32k 用于 state + 最长问题** |
| 输入 | 纯文本（不支持图片/音频/视频） |
| 国内直连 | **可直连，不需要代理** |

### 3.2 API 契约（文档未写清，实测得到）

- **`Score.criteria` 必须是数组**，而 `Choice` / `Noul` 用 map（`{option: desc}` / `{true:_, false:_}`）。传错会返回 Pydantic 校验错误（错误信息很友好，直接指出字段）。
- **Noul 没有独立 confidence 字段**，概率本身就是信号。

### 3.3 延迟

| 场景 | 实测 |
|---|---|
| 冷启动 | 1.3–2.6s |
| 热调用 | **250–700ms** |
| 官方宣称 | 70–500ms（测试环境在美西） |

热态落在官方区间附近。**冷启动是主要波动来源。**

### 3.4 候选集规模实验

用真实 StyleKit catalog（148 风格）测试同一 brief 在不同候选集下的表现：

| 规模 | 选中目标 | 平均置信度 | 输入 tokens | 延迟 |
| --- | --- | --- | --- | --- |
| 5 选 1 | 2/2 | 1.00 | 886 | 764/2252ms |
| 20 选 1 | 1/2 | 0.98 | 2,459 | 274/286ms |
| 50 选 1 | 0/2 | 0.85 | 5,658 | 451/486ms |
| 148 选 1 | 0/2 | 0.78 | **16,042** | 683/535ms |
| 130（仅 visual） | 0/2 | 0.82 | 14,190 | 500/1492ms |

**表面读法**：候选集一大就选错。
**实际读法**：**它找到了更好的答案。**

brief 写的是「dense tables and numbers, analysts staring at it all day」，148 规模下它稳定选 `data-dense`（定义即为「紧凑间距、优先数据表格」），而手写的「正确答案」`swiss-style` 掉到 0.03。

**唯一一个 0/2 的靶子是我自己标的，而它可能选得比我标的对。**

**最重要的副产品**：token 成本实测 **16,042**，比事前的公式估算（8,663）**高 1.85 倍**。32k 预算占用 50%——**意味着双语版本装不下**（中文 token 密度更高）。

### 3.5 未验证的部分（重要）

- **置信度是否校准，完全没测。** 观察到它输出过 0.32（median 0.35 vs 0.28 两个候选几乎并列）和 1.00，说明这个数字是活的；但「说 80% 时是否真有 80% 正确」**从未验证**。
- **Jev 是否比普通 LLM 更好，毫无证据。**
- 上述实验 n 都很小（每档 2 次），**不足以支撑统计结论**。

**要验证校准，方法很具体**：拿标注集跑 Jev 与一个普通 LLM，画校准曲线（说 80% 的样本实际正确率）。这是判断「Jev 适合什么角色」的分水岭。

---

## 4. 替代 embedding 服务实测

### 4.1 服务画像

`https://ai.hybgzs.com` —— 第三方 API 聚合中转站（响应体含 `one_hub_error`，落地页标题 `Done Hub`）。**不是官方服务，无 SLA，无隐私保证。**

### 4.2 可用性

| 项 | 结果 |
|---|---|
| 端点 | `POST /v1/embeddings`（OpenAI 兼容） |
| 模型 | `Qwen/Qwen3-Embedding-8B`（正确回显） |
| 原生维度 | 4096 |
| `dimensions: 1024` | **生效** |
| 批量 | 10 条/批 |
| `/v1/models` | 需管理员权限（**不代表 key 无效**） |

### 4.3 吞吐限制（关键发现）

**每约 100 秒窗口硬性允许约 10 批（≈15,000 tokens），之后返回「当前分组上游负载已饱和」。**

错误以**普通错误文本返回，不是 429**，需要靠错误内容判断。两次独立运行在同一批次（第 11 批）失败，规律固定。

**实际影响**：1,030 个 chunk 的索引需要 **约 30 分钟**才能建完。作为一次性成本可接受（之后走缓存），但**对需要频繁重建索引或实时查询 embed 的场景是真实瓶颈**。

### 4.4 相关脚本

新增 `tools/scripts/evaluate-retrieval-alt-embedding.ts`——复用现有评估口径（同 chunk、同 BM25、同 RRF、同评估集），只换 embedding provider。**写入独立缓存 `.data/style-embeddings-alt.json`，不触碰生产缓存。**

---

## 5. Vercel 账号清理（已执行）

### 5.1 执行结果

| 项 | 之前 | 之后 |
|---|---|---|
| 项目总数 | **70** | **10** |
| `stylekit` 域名声明 | 3 个 | **0** |
| `stylekit` Git 自动构建 | 每次 push 构建 5–7 分钟 | **已断开** |
| 注册域名 | 4 个 | 4 个（一个未丢） |

**保留的 10 个**：`stylekit`、`frontend`、`schwarzschild-blackhole`、`mine-safety`、`anx-journal`、`dog-game`、`comfyui`、`hks-frontend`、`ai-text-detection-front`、`brand-promo-frontend`

### 5.2 「每次新建仓库都会自动部署」——诊断更正

**原判断（错误）**：GitHub App 授权是 All repositories，所以新仓库自动部署。
**实际**：只有 5 个仓库连着 Vercel。**授权本来就是 Only select。**

真正的原因是**只有 `stylekit` 一个项目**连着 `AnxForever/stylekit` 的 `main`，每个 feature 分支 push 都触发构建，5 天内堆了 20 次部署。**现已断开。**

### 5.3 拆掉的三颗雷

1. **`stylekit.top` / `www.stylekit.top`** 声明在 Vercel 项目上，但 DNS 指向自有服务器（nginx）。**若哪天把 A 记录指向 Vercel，生产会静默切到陈旧副本。**（已移除声明）
2. **`stylekit.vercel.app` → 307 → `anxforever.shop`**，而该域名 **NXDOMAIN**（从未在 Vercel 注册）。**死重定向，访客被送进无效地址。**（已移除）
3. 悄悄在服务流量的两个项目：`ai-text-detection-front`（`baxfor.fun`）与 `brand-promo-frontend`（`anxforever.linuxdo.space`），创建于 183/196 天前。

### 5.4 遗留问题

- **`baxfor.fun` 目前是坏的**：根域 CNAME → `www.baxfor.fun`，而 `www` 在 DNS 中不存在（NXDOMAIN）。**这是 DNS 问题，不是 Vercel 问题**，需要在 DNS 服务商补一条 `www` 记录。
- `anxforever.linuxdo.space` 仍在服务（200），归属未确认。

---

## 6. 「模型选、代码组装」模式的实测形态

本次探索顺带实现了一个最小验证：`~/GitHub/brief-to-page`（**独立项目，不在本仓库内**）。

**四步公式**：

```
① 划定边界    Catalog 声明可用组件与参数（全是枚举/布尔/整数/状态指针）
② 模型选择    Jev 回答有界问题（Choice / Noul / Score）
③ 代码组装    把答案变成确定性 Spec —— 模型不参与
④ 渲染        Registry 映射到真实组件
```

**关键的硬约束**：Catalog 中**没有任何自由文本 prop**。模型不能写 headline、不能写段落——因为一旦它能写字，它就能写出关于你产品的、你无法核实真假的句子。文案必须来自 state（用户输入 / 内容库），**不来自做选择的那个模型**。

**这个约束的代价是真实的**：文案需要有别的来源。

---

## 7. 未决事项

| # | 事项 | 状态 |
|---|---|---|
| 1 | StyleKit 独立页该推荐「最合适的」还是「能生成的」 | **待决策** |
| 2 | 是否把 `lib/retrieval/` 接线到生产 | 待决策（取决于 3） |
| 3 | Jev 置信度的校准验证 | **未做**（半天工作量，决定 Jev 的角色） |
| 4 | 候选集是否按 `styleType` 过滤 | 已倾向 visual-only，未实施 |
| 5 | `baxfor.fun` 的 DNS 修复 | 未做 |
| 6 | 中转站 embedding 是否用于生产 | 取决于吞吐限制能否接受 |

---

## 8. 复现方式

```bash
# 候选集天花板（零成本，纯本地计算）
# 见 §2.1 的脚本逻辑：demo 四风格 × 60 条标注集的交集

# Jev 连通性与延迟
curl -X POST https://api.typesafe.ai/v1/systemone \
  -H "Authorization: Bearer $TYPESAFE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"state":"...","model":"jev-latest","questions":{...}}'

# 替代 embedding 检索评估
ALT_EMBEDDING_API_KEY=... ALT_EMBEDDING_BASE_URL=https://ai.hybgzs.com/v1 \
ALT_EMBEDDING_MODEL=Qwen/Qwen3-Embedding-8B \
npx --no-install tsx tools/scripts/evaluate-retrieval-alt-embedding.ts

# Vercel 只读盘点
vercel whoami && vercel project ls && vercel domains ls
```

---

## 9. 一句话总结

**这一轮最有价值的发现不是「Jev 能做什么」，而是两个结构性问题**：生产 Advisor 的候选集天花板只有 13.3%，而已经建好、实测 96.7% 的检索线根本没接线。

**Jev 是一个好用的、结构化的决策器——但它不做「选项该是什么」这件事。** 而选项错了，多贵的模型都救不回来。
