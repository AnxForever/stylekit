# 海外收款接入操作清单（中国大陆个人开发者，无护照可行）

目标：以个人身份接入 Merchant of Record 平台，让海外用户能用银行卡付款/打赏。
**2026-07-26 核实：全程只需身份证，不需要护照**——Creem 与 Paddle 的 KYC
（均为 Sumsub）都接受中国居民身份证正反面 + 人脸识别；PayPal 中国 2026 年 1 月
起开放个人卖家账户（身份证注册）。平台政策可能变化，操作前以各平台官方为准。

## 推荐顺序（身份证路线）

1. **Creem（首选，最快见效）**：身份证 KYC，几小时到 1 天审核，**提现直接到支付宝**
   （单笔上限约 5 万 CNY；初期若提现卡审核可走 Wise 中转）。creem.io 注册 →
   建 Store → Payout Account 选 China → 上传身份证+人脸 → 绑支付宝（姓名用拼音
   "姓 名"格式）。
2. **PayPal 中国个人卖家账户**：paypal.cn 注册，身份证正反面+人脸+网站链接，
   30 分钟到 3 个工作日审核 → 回 Ko-fi 绑定 → 通知 Claude 小额实测后点亮
   /support 页按钮。
3. **Paddle（成熟大额，可后上）**：按下文流程走，身份验证环节直接上身份证
   （若被要求护照再补办不迟）。

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

### 第 0 步：Ko-fi 占位（进行中）

1. [x] Ko-fi 账号已注册：https://ko-fi.com/anxforever（2026-07-26）
2. [ ] **绑定收款方式（当前卡点）**：Ko-fi 收款二选一——Stripe（大陆个人开不了，
      放弃）或 PayPal。需先注册 PayPal 国际版个人账户（paypal.com，大陆手机号 +
      身份证 + 国内银行卡即可注册，能接收境外个人付款），再到 Ko-fi ->
      Settings -> Payment options 绑定。
3. [ ] 绑定后告诉 Claude 做一笔小额真实测试，确认收款闭环走通，再点亮
      `app/support/page.tsx` 的 `KOFI_URL`。**未绑定前绝不挂按钮**——访客付款
      会在最后一步失败，比没有更伤。
4. 定位提醒：Ko-fi 只是"外国人熟悉的打赏曝光位"。**Paddle 不依赖 PayPal/Stripe
   账号**（它自己是收单方，提现走 Payoneer）——所以就算 PayPal 不想弄，
   直接跳到第 1 步走 Paddle 也完全成立。
5. 提现注意：Ko-fi -> PayPal 的钱提现到国内成本高（电汇约 $35/笔），小额先攒着。

### 第 1 步：注册准备（材料清单）

- [ ] 中国居民身份证（正反面高清照片；姓名拼音与注册信息完全一致；
      可能要求人脸/视频验证：真人出镜、读数字、转头。有护照更好但非必需）
- [ ] 独立域名邮箱或企业邮箱（如 Zoho 免费版绑定 stylekit.top；不要用 Gmail/QQ 直接注册）
- [ ] 大陆地址的拼音写法（注册时填写）
- [ ] Payoneer 账户（payoneer.com 注册个人账户，绑定国内银行卡；
      提现费率约 1.2%，按中行现汇买入价结汇，个人年结汇 5 万美元额度内自由）

### 第 2 步：Paddle 注册（约 20 分钟 + 3-5 个工作日审核）

1. paddle.com 注册，类型选 Individual（个人）。
2. 填业务信息：网站 www.stylekit.top，品类选 SaaS / digital design assets
  （避免任何 AI 生成内容转卖类描述——是风控敏感品类）。
3. 网站审核（约 1 个工作日）：Paddle 会检查 terms/privacy/refund 三页 + 产品真实性。
4. 身份验证（2-3 个工作日）：收到 "Verify my identity" 邮件后上传身份证 + 人脸/视频验证
   （Sumsub 支持中国身份证；若个别环节要求护照，届时再补办即可）。
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
