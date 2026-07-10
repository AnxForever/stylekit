# StyleKit ICP 与价格验证执行入口

- 状态：Phase 1 执行材料
- 建立日期：2026-07-10
- 适用对象：StyleKit 维护者、访谈执行者、数据分析者
- 适用范围：Corporate Clean SaaS Production Pack 与 Private Brand Kit 的需求、价格和承诺验证

## 1. 本阶段要回答的问题

在开始建设完整 Pack、计费平台或新的产品前端之前，只回答四个问题：

1. 目标用户是否真的在近期项目中遇到视觉一致性、素材、状态、动效和交付问题？
2. 现有替代方案为什么没有解决这些问题，用户已经为替代方案付出了什么？
3. 在看到明确交付物、许可、退款、更新范围和价格后，用户是否会采取有成本的行动？
4. 即使有人付款，这个产品能否在生产、资产、支付、退款、安装和支持成本后形成正贡献？

本阶段不以“用户说喜欢”“愿意加入等待名单”或页面点击量证明需求。真实全额付款或
不可退订金是最高权重证据。

## 2. 执行文件

按以下顺序使用：

1. [ICP_PRICE_VALIDATION_BASELINE.md](./ICP_PRICE_VALIDATION_BASELINE.md) — 当前流量、风格信号、
   ICP、Pack 1 和价格假设。
2. [ICP_INTERVIEW_SCRIPT.md](./ICP_INTERVIEW_SCRIPT.md) — 招募筛选、40 分钟访谈、非诱导问法和
   价格展示规则。
3. [ICP_EVIDENCE_LOG_TEMPLATE.md](./ICP_EVIDENCE_LOG_TEMPLATE.md) — 单次访谈、逐字证据、价格反应、
   承诺强度、反证和汇总模板。
4. [PRICE_EXPERIMENT_RUNBOOK.md](./PRICE_EXPERIMENT_RUNBOOK.md) — CNY 199、CNY 399 和 CNY 3,000 起
   的实验设计、事件口径、去重、通过/停止闸门、单位经济和隐私规则。
5. [PRODUCT_MONETIZATION_ROADMAP.md](./PRODUCT_MONETIZATION_ROADMAP.md) — 上位产品路线、阶段依赖和
   不可变约束。

## 3. 证据层级

| 层级 | 证据 | 可以支持的结论 |
| --- | --- | --- |
| E0 | 看过页面、浏览风格、停留 | 只证明曝光 |
| E1 | 表达喜欢、愿意关注、等待名单点击 | 只证明低成本兴趣 |
| E2 | 在看到准确价格后明确接受，并留下已验证联系方式 | 软购买意向 |
| E3 | 请求真实报价/订金链接、服务端创建结账会话或实际开始结账 | 强购买意向 |
| E4 | 支付可退订金 | 有金额风险但仍可逆 |
| E5 | 支付不可退订金或全额付款，且支付服务端确认成功 | 最高权重需求证据 |

证据不能向上“推定”。例如：等待名单点击不能算 E2；结账按钮点击但没有成功创建结账会话
不能算 E3；成功页访问不能算 E5。

## 4. 执行顺序

### 第 1 步：冻结实验对象

- 固定 Pack 名称、版本、交付物、支持栈、许可、更新期、退款条款和预计交付日期。
- CNY 199 与 CNY 399 如果用于价格比较，除价格外必须完全相同。
- 如果 CNY 399 包含更多内容或更长更新期，它是另一个产品方案，不能用于判断纯价格差异。
- Private Brand Kit 是独立服务实验，不与标准 Pack 的分母或转化率混算。

### 第 2 步：完成访谈

- 至少完成 20 次符合 ICP 的访谈。
- 在问题访谈结束前不展示 Pack，不先告诉受访者希望得到的答案。
- 标准 Pack 主价格使用事先分配的 CNY 199 或 CNY 399；每位受访者只有一个可计入的主价格。
- 逐字证据必须写入日志，结论不能只依赖访谈者印象。

### 第 3 步：准备线上或人工价格实验

- 任何公开 Pack 页面、价格入口、购买入口都属于用户可见前端变化，必须先取得明确视觉批准。
- 在批准前，可以使用一对一访谈、定向邮件后的人工报价或私下支付链接，不修改公开 UI。
- 上线前完成事件字典、机器人过滤、身份去重、价格粘性分流和支付服务端校验。

### 第 4 步：运行且不移动门槛

- 实验开始后，不因短期数据改变价格、文案、交付物、许可或流量来源。
- 任何变化都产生新 `offer_version`，并从新的观察窗口重新计数。
- 30 天结束后再按预先定义的闸门判断；过程数据用于检查埋点，不用于提前宣布胜负。

### 第 5 步：作出单一决策

- **继续 Pack 1：** 需求闸门与预估单位经济同时通过。
- **修订一次：** 有清晰、重复出现的反证指向可修复的 ICP 或方案问题。
- **转向 Private Brand Kit：** 标准 Pack 证据弱，但定制服务获得真实订金或付款。
- **停止扩展：** 一次修订后仍未通过，或单位经济在合理售价下不可成立。

## 5. 机器校验

实验开始前复制并冻结匿名证据文件：

```bash
cp docs/examples/product-validation-empty.json .data/product-validation.json
pnpm run validate:product-experiment -- .data/product-validation.json
```

需要供其他工具读取时输出 JSON：

```bash
pnpm run validate:product-experiment -- .data/product-validation.json --format json
```

校验器执行以下不可移动规则：

- 身份只能使用 `hmac:`、`anon:` 或低置信度 `session:` 键，拒绝邮箱等直接标识符；
- 同一身份固定到一个变体，事件必须匹配实验、offer、变体和时间窗口；
- 重复 `event_id` 只计一次；session-only、机器人、内部、测试、非生产和非 ICP 流量不进入分母；
- qualified visitor 必须同时满足 offer 与价格的冻结可见时长和可见比例；
- 只有服务端核验的价格接受/结账和支付来源能进入软/强意向；
- 需求与预估单位经济必须同时通过，才会输出 `continue_pack_1`；样本不足始终输出
  `inconclusive_sample`，一次修订后失败输出 `stop_expansion`。
- 标准 Pack 未通过，但 Private Brand Kit 达到 5 次合格对话、2 次书面方案请求、至少 1 笔真实
  不可退订金/全款且服务贡献毛利过闸时，才输出 `reposition_to_private_brand_kit`。

证据文件不得提交联系人映射、姓名、邮箱、录音、逐字稿或支付卡数据。原始证据应保存在受限位置，
仓库中的示例永远保持空样本，因此不会误授权 Pack。

示例里的 `maximumBreakEvenUnits: 25` 是待维护者在实验开始前确认的经营阈值，不是已经验证的市场
事实。修改该值、工时成本率、退款率或支持成本都必须产生新的冻结证据版本，不能在看到结果后移动。

线上实验部署前还必须确认远端 Supabase 已应用
`lib/supabase/migrations/014_lock_down_analytics_inserts.sql`。当前仓库环境没有 Supabase CLI 或数据库
连接串，不能无侵入证明远端状态；在该迁移被核验前，公共 anon key 可能绕过分析 API，线上证据不得
进入主结论。

## 6. 方法依据

这些材料采用并适配了以下外部原则：

- [Nielsen Norman Group — Interviewing Users](https://www.nngroup.com/articles/interviewing-users/)：
  访谈适合探索态度和具体案例，但对未来行为预测很弱；避免诱导，并用行为数据交叉验证。
- [GOV.UK — Getting informed consent for user research](https://www.gov.uk/service-manual/user-research/getting-users-consent-for-research)：
  参与者需要知道研究目的、收集的数据、用途、保存时间、录音方式和退出权利。
- [Stripe — Fulfill orders](https://docs.stripe.com/payments/checkout/fulfill-orders)：
  支付与履约应以服务端支付状态和 webhook 为准，并对同一会话进行幂等处理，而不是依赖浏览器重定向。
- [GrowthBook JS SDK sticky assignments](https://github.com/growthbook/growthbook/blob/588462310cea98205c79b0290124dfbecc0af1bb/packages/sdk-js/src/sticky-bucket-service.ts)：
  身份、实验版本和变体分配需要持久且可审计；重复触发不能把同一人重复计入实验。
- [Unleash flexible rollout](https://github.com/Unleash/unleash-client-node/blob/76971008988ca91c74c71fff3a34a2dab3e44b71/src/strategy/flexible-rollout-strategy.ts)：
  稳定身份优先于 session，随机降级不能进入主要效果结论；失败上报需要保留原计数而不是静默丢失。

这些链接提供方法参考，不替代适用地区的法律、税务、消费者保护或支付合规意见。
