# 外滩大会 2026 · Issue 投稿草稿

> 这是投稿草稿，不代表已经完成真实百炼 live 运行。`[待补]` 项必须用真实运行结果替换。

## 参赛项目名称

StyleKit × 百炼：AI UI Style Compiler

## 团队 / 作者

@AnxForever

## 我做了什么

StyleKit 是一个面向人类和 AI coding agent 的开源视觉系统。这个参赛版本把阿里云百炼/Qwen 接入 StyleKit 的风格选择和前端工作区生成流程：用户输入一句自然语言的前端需求，百炼提取项目意图并推荐一个 StyleKit 风格；StyleKit 再用自己的 tokens、component recipes、AI rules、accessibility/readiness guidance 和 Workspace Generator，生成可运行的 Next.js Dashboard 项目与 ZIP 产物。

模型只负责理解自然语言和推荐风格，不直接伪造最终 tokens 或组件代码。最终视觉规则、代码生成、质量检查和 artifact hash 都由 StyleKit 的确定性工程链路负责。

## 使用的工具

- OpenWork / 百炼 CLI：`bl text chat`
- 百炼能力 / 模型：[待补：真实运行时模型名]
- Skill 名称：`stylekit` + `bailian-cli`
- 其他：Next.js、TypeScript、Tailwind CSS、Zod、StyleKit Workspace Generator

## 效果展示

- CLI 录屏：[待补：真实 Bailian live 运行录屏]
- 生成 Dashboard 截图：[待补]
- 生成项目 ZIP：[待补：公开 artifact 或仓库 release 链接]
- Replay 证据：`examples/bailian-stylekit/README.md`

## 项目链接

- GitHub：https://github.com/AnxForever/stylekit
- 在线 Demo：https://stylekit.top
- A 工作流：`examples/bailian-stylekit/`
- 计划文档：`docs/submission/bund-summit-2026-plan.md`

## 踩坑记录

1. 模型输出的 style slug 不能直接信任，必须经过 `StyleIntent v1` schema 和已验证生成风格白名单校验。
2. tokens 和组件代码不能由模型临时发明，否则无法保证视觉一致性和可复现性；本项目始终从 StyleKit canonical catalog 读取。
3. API Key 只用于 live 调用，不写入运行日志、fixture 或生成产物；没有 API Key 时可以使用 replay fixture 验证整个生成链路。
4. 当前第一版只开放已通过 Workspace Generator 真实验证的四种风格和 Dashboard/Next.js 生成路径，不把未验证能力包装成完整产品能力。
