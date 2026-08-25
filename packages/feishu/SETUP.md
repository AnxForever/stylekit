# 上手指南

把一个自然语言需求变成一套可落地的设计风格工程包，再帮你验收 AI 写回来的代码是否守规矩。三步装好，一条消息开用。

## 第一步 · 装依赖

```bash
pnpm install
pnpm --filter stylekit-core build
npx @larksuite/cli@latest install
```

## 第二步 · 配凭据

### 路径 A · 扫码（推荐）

```bash
pnpm --filter stylekit-feishu register
```

终端会打印一个飞书链接，用飞书扫码。确认页上核对权限（读消息 / 发消息 / 读取资源 / 多维表格 / 云文档），完成后终端直接打出凭据。把打印出来的两行 `FEISHU_APP_ID` / `FEISHU_APP_SECRET` 写进 `packages/feishu/.env`。

> 如果网络不稳导致扫码流程中断，重新跑一次命令即可；也可以走路径 B。

### 路径 B · 手动创建

1. 打开 [飞书开放平台](https://open.feishu.cn/) → 创建企业自建应用
2. 权限管理中开通以下权限，然后**发布新版本**（改权限必须发版才生效）：
   - `im:message:send_as_bot`（以机器人的身份发消息）
   - `im:message`（读取群消息）
   - `im:resource`（下载消息里的图片）
   - `bitable:app`（读写多维表格）
   - `docx:document`（导入文档）
   - `drive:drive`（云空间写入）
3. 事件与回调 → 订阅方式选**长连接**（无需公网地址）；订阅 `im.message.receive_v1`；回调订阅 `card.action.trigger`
4. 把 App ID / App Secret 写进 `packages/feishu/.env`

### LLM 配置

同一个 `.env` 里再填三行（任意 OpenAI 兼容接口）：

```bash
LLM_BASE_URL=https://api.example.com/v1
LLM_MODEL=<模型名>
LLM_API_KEY=<key>
```

## 第三步 · 启动

```bash
pnpm --filter stylekit-feishu dev
```

看到 `connected as ...` 即就绪。把机器人拉进群，@它一句需求：

> @StyleKit 做一个面向 Z 世代的潮牌电商落地页，要炸裂但别太吵

机器人会从 146 个设计风格里挑出最合适的 3 个候选，流式输出推理过程，点卡片按钮选定风格后，把 23 件产物的工程包（AI 提示词、Cursor/Claude 规则文件、shadcn 主题、Tailwind preset、Figma tokens、组件代码等）写进多维表格并生成一份飞书文档。

写完代码贴回群里，机器人按该风格的规则引擎体检代码，逐条指出违规类名并给出修复建议。

## 常见问题

- **写入多维表格报 91403**：在 Base 右上角 ⋯ → 更多 → 添加文档应用，把应用加进来并授予「可编辑」。
- **群里 @了没反应**：确认权限已发布新版本；确认机器人已在群里；长连接模式下等 1 分钟生效。
- **换一台机器**：`.env` 复制过去即可，凭据与机器无关。
