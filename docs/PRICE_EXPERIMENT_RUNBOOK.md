# StyleKit 价格实验操作手册

- 状态：Phase 1 执行规范
- 实验对象：Corporate Clean SaaS Production Pack；Private Brand Kit 作为独立服务实验
- 相关入口：[PRODUCT_VALIDATION_PLAYBOOK.md](./PRODUCT_VALIDATION_PLAYBOOK.md)

## 1. 决策与非目标

本实验判断：目标 ICP 在看到完整条款后，是否对 CNY 199 或 CNY 399 的标准 Pack 采取可验证行动；
以及 CNY 3,000 起的 Private Brand Kit 是否能获得真实服务需求和订金。

不用于：

- 用页面浏览或等待名单证明购买意愿；
- 同时更改价格、交付物和文案后解释价格因果；
- 在没有支付证据时预测长期收入；
- 为建设完整计费、权限、团队或订阅平台提供提前授权；
- 修改现有 135 个预览或任何已批准前端视觉。

任何公开价格页、购买入口或用户可见交互都必须先取得具体视觉方案的明确批准。本手册只定义
实验和数据口径，不授权前端实现。

## 2. 实验登记

开始前填写并冻结：

| 字段 | 示例/要求 |
| --- | --- |
| `experiment_id` | `cc-saas-pack-price-2026-01` |
| `offer_version` | `cc-saas-pack-offer-v1` |
| Pack slug/version |  |
| 开始/结束时间 | 固定 30 天，统一时区 |
| 招募/流量来源 | 每个渠道单独标记 |
| 主指标 | soft intent rate、strong intent rate |
| 最小样本 | 200 位 qualified visitors |
| 分流 | CNY 199 / CNY 399，目标 1:1 |
| 交付物与条款快照 | 内容 hash 或只读文档链接 |
| 机器人排除版本 | 规则版本号 |
| 数据负责人 |  |
| 停止/修订批准人 |  |

实验开始后修改任一核心字段，都必须生成新 `offer_version`；价格结果不得跨版本合并。

## 3. 三条实验轨道

### 3.1 标准 Pack：CNY 199 与 CNY 399

采用用户级、粘性的 1:1 分配。两组的 Pack、交付物、支持版本、商业许可、更新期、退款条款、
交付日期和页面内容相同，唯一实验变量是价格。

- `pack-199`：CNY 199 一次性。
- `pack-399`：CNY 399 一次性。

如果同一页面同时展示 CNY 399 作为划线“锚点”和 CNY 199 售价，只能验证 CNY 199 的组合呈现，
不能声称验证了 CNY 399 支付意愿。

### 3.2 Private Brand Kit：CNY 3,000 起

独立招募已有品牌资产、明确交付项目和预算影响力的客户。它是服务报价实验，不进入标准 Pack 的
200 人分母，也不与 CNY 199/399 转化率比较。

报价必须写清：起价、发现/实施范围、交付物、修订轮次、客户提供材料、验收、时间、许可、付款节点、
订金可退性和超范围费率。不能只展示“3,000 起”而隐藏决定实际价格的范围。

探索闸门（30 天）：至少 5 次合格服务对话、2 人要求基于 CNY 3,000 起的书面方案、至少 1 人支付
不可退订金。未达到时不产品化服务流程；可以记录反证后停止或重新限定 ICP。

### 3.3 访谈价格轨道

访谈和线上实验分开分析。20 名合格访谈样本事先分配：CNY 199 与 CNY 399 各 10 名。访谈中看到
备用价格的反应只算次级探索，不进入主价格接受率。

## 4. Qualified visitor 定义

一位 `qualified visitor` 必须在同一 `offer_version` 内同时满足全部条件：

1. 是去重后的自然人，不是机器人、监控、测试账号、维护者或自动化访问。
2. 自报当前/未来 90 天有真实 B2B SaaS 或生产型 Web 项目。
3. 使用或明确将使用 React/Next.js、Tailwind 和 shadcn/ui。
4. 最近 90 天使用 AI 编码工具处理过真实前端。
5. 对购买开发资源有决策权或直接影响力。
6. 已看到 Pack 的价格、核心交付物、支持范围、商业许可、更新范围和退款条款。

第 6 项的线上最低证据：同一去重身份有 `pack_offer_view` 和 `pack_price_view`，且两者的
`offer_version`、`variant_id` 一致。单独的页面加载或滚动经过价格不够。

如果公开 UI 尚未获批，可以通过人工一对一展示并在证据日志中记录全部字段；人工样本不能伪装成
线上 visitor 数据。

## 5. 身份、去重与分流

### 5.1 身份优先级

按以下稳定键去重：

1. 已认证 `user_id`；
2. 已验证邮箱的服务端 HMAC（不可使用可逆加密或裸邮箱作为分析键）；
3. 第一方 `anonymous_id`；
4. 仅在无法取得以上键时使用会话 ID，此类样本标记为低置信度。

哈希或 HMAC 邮箱仍属于可关联个人的数据，必须受访问、目的和保留期控制。

### 5.2 去重窗口

- 主窗口：首次合格曝光起 30 天。
- 同一人多次访问只进入 qualified visitor 分母一次。
- 同一人多次触发同级事件只计一次，保留首次时间和最终最高承诺。
- 跨设备后验证邮箱时，把匿名历史并入已验证身份；不能新增一个分母。
- 一个用户在窗口内只分配一个价格。清 Cookie、换设备或重新访问不得换价。
- 无法确认是否重复时，保留原始事件但从主分析中排除，并做敏感性分析。

### 5.3 分流规则

- 服务端或稳定身份首次进入实验时分配 `variant_id`，推荐对稳定身份键做确定性 hash 后 50/50 分桶。
- 分配结果保存 30 天，并传递到访谈/邮件/结账，避免页面价与结账价不同。
- 内部人员、QA 和机器人使用明确测试标记，不参与随机分流和分母。
- 每组目标至少 100 位 qualified visitors。样本不平衡超过 55/45 时先调查实现，不解释价格结果。

## 6. 机器人与无效流量

从主分析排除：

- 已知搜索爬虫、监控、预渲染、链接展开、性能测试和自动化测试 user agent；
- 带内部测试标记的请求、维护者账号和本地/预览环境；
- 单个身份在不可能时间内产生大量重复事件；
- 没有完整 offer/price 暴露证据的直接 API 或结账探测；
- 支付平台或安全扫描器产生的回访。

排除规则必须在实验开始前版本化。实验结束后可做异常审计，但不能只删除“不符合预期”的真实用户。

## 7. 事件字典

### 7.1 公共属性

所有事件至少包含：

`event_id`、`occurred_at`、`experiment_id`、`offer_version`、`variant_id`、`pack_id`、
`pack_version`、`session_id`、去标识化 identity key、`source_channel`、`environment`。

不要把裸邮箱、姓名、IP、完整 user agent、支付卡数据、访谈原文或公司机密写入通用分析事件。

信任边界：`pack_offer_view` 与 `pack_price_view` 可以来自经过运行时校验的客户端可见性事件；
`pack_purchase_intent`、`pack_checkout_start`、`pack_purchase`、`pack_refund` 和
`pack_install_success` 只能由受信服务端写入，公共分析接口必须拒绝这些事件。

### 7.2 事件语义

| 事件 | 触发条件 | 权威来源 | 不得替代为 |
| --- | --- | --- | --- |
| `pack_offer_view` | 核心交付物与支持范围实际可见，并达到预定可见时长 | 客户端可见性事件 | 页面加载 |
| `pack_price_view` | 价格、许可、更新和退款摘要实际可见，并达到预定可见时长 | 客户端可见性事件 | 滚动经过/按钮曝光 |
| `pack_purchase_intent` | 用户明确勾选接受当前准确价格和条款，并完成联系方式验证 | 服务端验证完成 | 等待名单、CTA 点击、未验证邮箱 |
| `pack_checkout_start` | 服务端为该身份和变体成功创建真实结账/订金会话 | 服务端 | 结账按钮点击、失败请求 |
| `pack_purchase` | 支付平台服务端确认已付款/已捕获；同一会话幂等入账 | webhook 或人工核验收据 | 成功页、客户端回调、授权未捕获 |
| `pack_refund` | 支付服务端确认全部或部分退款 | webhook/人工核验 | 用户口头要求 |
| `pack_install_success` | 支持版本的干净项目安装、构建和运行成功，或客户提交可核验证据 | 安装检查/人工核验 | 下载、复制命令、开始安装 |

建议可见性阈值在实现前固定，例如目标区域至少 50% 可见并持续 2 秒。阈值改变会生成新的埋点版本，
不能在实验中途追溯重算。

### 7.3 购买与订金字段

`pack_purchase` 额外记录：

- 去标识化 `order_id` 和支付会话引用；
- `purchase_type`: `full/preorder/deposit`；
- `deposit_refundability`: `refundable/non_refundable/not_applicable`；
- `currency`、`gross_amount`、`discount_amount`、`tax_amount`、`payment_fee`、`net_cash_received`；
- `payment_status`、`paid_at`；
- `fulfillment_status`。

同一支付 webhook 可能重复或并发到达，必须按支付会话/订单 ID 幂等。浏览器访问成功页只能改善体验，
不能创建购买事实。

## 8. 指标计算

所有比率按去重后的独立 qualified visitors 计算：

```text
soft_intent_rate = 至少一次有效 pack_purchase_intent 的人数 / qualified visitors
strong_intent_rate = 至少一次有效 pack_checkout_start 或 pack_purchase 的人数 / qualified visitors
purchase_rate = 至少一次服务端确认 pack_purchase 的人数 / qualified visitors
refund_rate = 发生全额退款的付费订单数 / 已付款订单数
install_success_rate = 成功安装人数 / 尝试安装且有可判定结果的人数
```

规则：

- 同一人只占每个指标一次，购买者不因多次付款变成多个人。
- 强意向与软意向独立计算；只有实际完成了价格接受步骤的人才进入软意向分子。
- 等待名单、普通 CTA、`code_copy`、`shadcn_command_copy` 不进入上述分子。
- 同时报告每个价格组和总体结果。价格选择必须看组内结果，不能用总体达标替代某一价格达标。
- 报告绝对人数和分母，不能只报百分比。

## 9. 通过、修订与停止闸门

### 9.1 30 天定量闸门

在同一冻结 offer 下，至少 200 位 qualified visitors，并满足：

- 软意向率至少 5%（200 人时至少 10 人）；
- 强意向率至少 2%（200 人时至少 4 人）；
- 两个价格组各目标至少 100 人，才能比较 CNY 199 与 CNY 399。

某个价格可被选为 Pack 1 价格，需要该组自己达到 5% 软意向和 2% 强意向，同时预估单位经济成立。
若 CNY 199 达标但无法覆盖合理生产/支持成本，不能只因转化较高而开始建设。

### 9.2 访谈闸门

- 20 名合格 ICP；
- 至少 6 人明确接受自己看到的主价格；
- 至少 3 人愿意接收真实订金链接。

如果真实订金机制已经存在，则以真实结账开始、可退订金、不可退订金/全款逐级替代口头意愿。
“愿意接收链接”只支持访谈证据路径，不等于线上 `pack_checkout_start` 或购买。

### 9.3 样本不足

30 天少于 200 位 qualified visitors 时，结果为 `inconclusive_sample`，不算通过，也不授权建设。
可以进行一次只改变招募/流量来源、不改变 offer 的补充窗口；必须单独登记渠道，并报告原窗口和合并结果。
不能用大量非 ICP 流量补足分母。

### 9.4 修订一次

只有当访谈和行为数据出现重复、明确且可修复的反证时，允许一次修订，例如：许可不清、交付日期不可信、
缺少一个阻止安装的必要交付物。修订后创建新 `offer_version`，重新运行完整闸门。

不能把“降价直到有人点”作为无限修订。一次修订仍同时错过定量和访谈证据路径时：

- 停止 Pack 平台和 Pack 2/3 扩展；
- 重新评估 ICP、结果承诺或 Private Brand Kit；
- 不使用等待名单或免费使用量推翻停止决定。

### 9.5 决策矩阵

| 需求证据 | 单位经济 | 决策 |
| --- | --- | --- |
| 通过 | 通过 | 进入最小 Pack 1 tracer bullet |
| 通过 | 不通过 | 调整范围/成本/价格，不开始内容扩展 |
| 不通过 | 通过 | 最多修订 offer 一次；仍失败则停止 |
| 标准 Pack 不通过，Brand Kit 有 E5 | 服务经济通过 | 转向产品化服务探索 |
| 两者不通过 | 任意 | 停止扩展，保留免费 Explore |

## 10. 单位经济字段与公式

### 10.1 Pack 固定投入

- 产品发现与设计小时；
- 实现、测试、可访问性、文档、发布小时；
- 资产创作、购买、授权和法律审查成本；
- 一次性工具、外包与设置成本；
- 维护者小时成本率及依据。

Pack 1 默认上限：维护者生产不超过 80 小时，外部资产不超过 CNY 1,500；例外必须在投入前批准。

### 10.2 每单变量

- 标价、折扣、实际收款；
- 税费、支付费、渠道/联盟费；
- 退款、拒付和坏账；
- 每客户授权/交付成本；
- 支持分钟 × 支持小时成本率；
- 获客成本（若能可靠归因）。

### 10.3 公式

```text
net_collected_revenue = gross_collected - discounts - taxes - refunds - chargebacks
per_order_contribution = net_collected_revenue - payment_fees - channel_fees
                         - per_customer_delivery_cost - support_cost - attributable_CAC
contribution_margin = per_order_contribution / gross_collected
break_even_units = ceil(fixed_pack_cost / median_positive_per_order_contribution)
```

同时报告现金口径和含维护者人工成本的经济口径。不能因为维护者没有领取工资就把生产/支持时间记为零。

### 10.4 Pack 1 付费后闸门

进入 Pack 2 前：

- 至少 10 位付费客户；
- 退款率低于 20%；
- 干净项目安装成功率至少 90%；
- 每次成功安装的客户支持中位数低于 30 分钟；
- 贡献毛利和盈亏平衡销量已记录且支持继续投入。

十位客户只是初始需求信号，不代表已经形成可持续业务。

## 11. 隐私与研究伦理

### 11.1 最小收集

只收集判断 ICP、价格反应和后续交易所需信息。不收集身份证号、精确住址、支付卡数据、私人仓库
代码、客户生产数据或与研究无关的敏感信息。

### 11.2 同意与用途

- 参与研究、录音、匿名引用和后续联系分别取得明确同意。
- 招募时说明研究主体、目的、收集内容、用途、共享范围、保存期限、退出/删除方式。
- 不同意录音仍可通过人工笔记参加。
- 不把研究联系方式自动加入营销列表；营销需要独立、明确的同意。

### 11.3 分离与访问

- 产品仓库和分析表只使用匿名受访者 ID。
- 姓名/邮箱与匿名 ID 的映射单独加密保存，限制给必要人员。
- 录音、逐字稿、支付信息和分析事件分库存放，按职责授权。
- 分析导出不包含裸邮箱、IP 或可识别公司内部信息。

### 11.4 建议保留期

- 原始录音：完成转写和核对后 30 天内删除。
- 联系方式映射：实验结束后 90 天内删除，除非用户明确同意继续联系或交易/法律要求保留。
- 去标识化证据与聚合结果：最长 12 个月后复核是否仍有必要。
- 付款、税务和消费者记录：按适用法律和支付服务要求单独保留，不沿用研究数据期限。

收到撤回或删除请求时，停止新的研究使用，并按适用法律和已说明流程处理。具体实践需遵守用户所在地区
的数据保护、消费者保护、税务和支付规定。

## 12. 运行检查单

### 开始前

- [ ] 公开视觉变化已获得明确批准，或采用不修改公开 UI 的人工路径。
- [ ] Offer、价格、许可、更新、退款和交付日期已冻结。
- [ ] CNY 199/399 除价格外完全一致。
- [ ] 实验、offer、事件和排除规则已版本化。
- [ ] 分流粘性、结账价格一致性和支付幂等已测试。
- [ ] 机器人、内部流量和 QA 流量可排除。
- [ ] 同意文本、数据分离和删除计划可执行。
- [ ] 单位经济成本率和生产预算已登记。

### 每周质量检查

- [ ] 只检查埋点完整性，不因转化波动改 offer。
- [ ] 价格分组保持在合理比例，身份没有跨组。
- [ ] `pack_purchase` 与支付服务端记录可对账。
- [ ] 等待名单和 CTA 没有进入购买意向分子。
- [ ] 访谈的 ICP、主价格、逐字证据和反证完整。
- [ ] 退款、拒付、支持和安装结果持续记录。

### 结束后

- [ ] 等到预定窗口结束再锁定数据集。
- [ ] 报告总样本、每组样本、绝对人数、比率和排除数量。
- [ ] 分开展示线上、访谈、标准 Pack 和 Brand Kit 结果。
- [ ] 报告反证、协议偏差、样本不足和可能的渠道偏差。
- [ ] 计算预估或实际单位经济。
- [ ] 只选择继续、修订一次、转向服务、停止或样本不足之一。

## 13. 实验结果模板

```text
Experiment:
Offer version:
Window:
Qualified visitors: total / pack-199 / pack-399
Excluded: bots / internal / duplicates / incomplete exposure / protocol deviations

Pack-199:
- soft intent: n / denominator / rate
- strong intent: n / denominator / rate
- purchases: n / denominator / rate

Pack-399:
- soft intent: n / denominator / rate
- strong intent: n / denominator / rate
- purchases: n / denominator / rate

Interviews:
- qualified: n
- primary-price acceptance: n
- deposit-link requested: n
- checkout started: n
- refundable deposits: n
- non-refundable deposits/full payments: n

Private Brand Kit:
- qualified conversations / written proposals / deposits / payments

Economics:
- fixed pack cost / median per-order contribution / break-even units
- projected or actual refund, install success, median support

Strongest supporting evidence:
Strongest counterevidence:
Known bias or protocol deviation:
Decision: continue / revise once / service pivot / stop / inconclusive
```
