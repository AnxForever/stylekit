# Paddle 接入操作清单（中国大陆个人开发者）

目标：以个人身份接入 Paddle（Merchant of Record），让海外用户能用银行卡付款/打赏，
收入经 Payoneer 提现到国内银行卡。调研时间 2026-07-26，平台政策可能变化，
操作前以 Paddle Help Center 为准。

## 网站侧前置（已就绪）

| 项 | 状态 | 位置 |
|---|---|---|
| Terms of Use | 已上线 | /terms |
| Privacy Policy | 已上线 | /privacy |
| Refund Policy | 已上线（本次新增） | /refunds |
| 联系方式 | 已上线 | /contact |
| 独立域名 + HTTPS | 已上线 | www.stylekit.top |
| 支持页（挂支付入口的落点） | 已上线（本次新增） | /support |

## 你需要亲手做的事（按顺序）

### 第 0 步：Ko-fi 占位（5 分钟，可选但推荐）

1. 用邮箱在 ko-fi.com 注册创作者账号（页面名建议 stylekit 或 anxforever）。
2. 把页面链接告诉 Claude，填入 `app/support/page.tsx` 顶部的 `KOFI_URL` 常量，
   国际支持区块会自动从"建设中"切换为 Ko-fi 按钮。
3. 注意：Ko-fi 提现走 PayPal，中国大陆提现手续费高（电汇约 $35/笔），
   小额先攒着，它的作用是"外国人熟悉的打赏入口"，主力通道等 Paddle。

### 第 1 步：注册准备（材料清单）

- [ ] 有效护照（姓名拼音与注册信息完全一致；需高清扫描件，可能要求视频验证：
      真人出镜、读数字、转头）
- [ ] 独立域名邮箱或企业邮箱（如 Zoho 免费版绑定 stylekit.top；不要用 Gmail/QQ 直接注册）
- [ ] 大陆地址的拼音写法（注册时填写）
- [ ] Payoneer 账户（payoneer.com 注册个人账户，绑定国内银行卡；
      提现费率约 1.2%，按中行现汇买入价结汇，个人年结汇 5 万美元额度内自由）

### 第 2 步：Paddle 注册（约 20 分钟 + 3-5 个工作日审核）

1. paddle.com 注册，类型选 Individual（个人）。
2. 填业务信息：网站 www.stylekit.top，品类选 SaaS / digital design assets
  （避免任何 AI 生成内容转卖类描述——是风控敏感品类）。
3. 网站审核（约 1 个工作日）：Paddle 会检查 terms/privacy/refund 三页 + 产品真实性。
4. 身份验证（2-3 个工作日）：收到 "Verify my identity" 邮件后上传护照 + 视频验证。
5. 通过后先在 Sandbox 环境走一遍测试单，再开正式收款。

### 第 3 步：提现链路配置

1. Paddle Dashboard -> Payouts -> 选择 Payoneer。
2. 起付阈值 $100，每月 1 日结算、2-15 日到账。
3. Payoneer 收到美元后提现至国内银行卡（1.2% 手续费，无汇损）。

## 风险提示

- Paddle 有无预警关户先例（风控），务必：法务页保持在线、退款请求积极处理、
  不碰敏感品类；建议后续并行注册 Creem（新兴 MoR，支持支付宝提现）分散风险。
- 收入报税：个人经营所得需自行申报，金额小前期影响不大，起量后咨询专业人士。

## 通道决策速查（2026-07 核实）

| 平台 | 大陆个人 | 说明 |
|---|---|---|
| Paddle | 可用（主力） | Payoneer 提现，本清单 |
| Creem | 可用（备胎） | 支持支付宝提现 |
| Ko-fi / BMAC | 半可用 | 曝光位；PayPal 提现费高 |
| Polar.sh | 不可用 | 官方国家列表无大陆 |
| Lemon Squeezy | 不可用 | 被 Stripe 收购后 payout 不含大陆 |
| Gumroad | 不可用 | payout 国家列表无大陆 |
| GitHub Sponsors | 不可用 | 支持地区不含大陆 |
| Stripe 直连 | 需海外实体 | 后期规模大再考虑（Atlas/香港公司） |

## Paddle 通过后的网站侧动作（告诉 Claude 即可）

1. /support 页把 Ko-fi 占位换成 Paddle checkout（支持 pay-what-you-want 打赏商品）。
2. 上架第一批数字商品（建议从模板包开始，$9-19）。
3. Refund 页确认与 Paddle 买家条款的衔接文案。
