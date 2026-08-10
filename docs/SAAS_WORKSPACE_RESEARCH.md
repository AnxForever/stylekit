# StyleKit SaaS 工作区研究与实现约束

更新日期：2026-07-11

## 研究目的

StyleKit 的目标不是再做一个通用 Dashboard，也不是把现有风格页套进后台壳。真正需要解决的是：独立开发者刚从风格库找到方向后，如何把模糊灵感变成可保存、可恢复、可生成、可验证导出的项目资产。

本研究用于纠正此前“先凭经验写工作区 UI”的做法。现有 `/workspace` 页面只能视作功能原型，不能作为最终视觉设计或上线依据。

## 研究对象

### v0 Projects 与 Versions

官方资料：

- <https://v0.app/docs/projects.md>
- <https://v0.app/docs/versions.md>

可学习点：

- Project 是一个持续演进的应用，不是一次生成任务。
- 多次工作可以汇入同一个 Project，共享文件和部署上下文。
- 每次生成变更产生新版本。
- 恢复旧版本时创建一个新的最新版本，保持线性、不可篡改的历史。
- 用户通过版本选择器查看和恢复，而不是直接覆盖历史记录。

StyleKit 决策：采用“恢复即新版本”的模型；不照搬聊天中心结构，因为 StyleKit 当前没有真实模型执行链。

### Replit Checkpoints / File History

官方资料：

- <https://docs.replit.com/references/version-control/checkpoints-and-rollbacks>
- <https://docs.replit.com/references/version-control/file-history>

可学习点：

- 自动检查点与手动版本控制职责不同。
- 恢复必须让用户知道将影响哪些文件和状态。
- 故障恢复是核心工作流，不是设置页里的附属功能。

StyleKit 决策：保存和生成都应形成明确 Revision；恢复前展示来源版本，冲突时停止，不做静默 last-write-wins。

### Onlook

源码：<https://github.com/onlook-dev/onlook>，Apache-2.0，研究时约 26k Stars。

检查的真实源码包括：

- Project Server Component 在进入编辑器前并行读取 Project 与 Branch。
- Branch List 以当前分支、更新时间和搜索为核心。
- Fork/Clone 是显式操作，包含 loading、error 和完成导航。
- Revision History 强调版本标题、作者/时间、选择后的预览变化。

StyleKit 决策：

- 学习其“进入编辑器前取得完整项目上下文”的结构。
- 学习显式 fork/restore，而不是隐藏覆盖。
- 暂不引入 Branch；第一版保持单线性 Revision，避免在生成器未成熟时制造协作复杂度。
- 不复制其视觉代码或编辑器布局。

### Plasmic

源码：<https://github.com/plasmicapp/plasmic>，MIT。

可学习点：

- 项目版本与代码导出是不同生命周期。
- CLI 的 versioned sync 测试说明导出必须知道源项目版本，不能只从当前浏览器状态生成。
- 导出是可重复的工程操作，不是普通下载按钮。

StyleKit 决策：任何 Export 必须引用已保存 Revision；不允许直接把未保存表单状态冒充可追溯产物。

### Open Lovable

源码：<https://github.com/firecrawl/open-lovable>，MIT。

用途边界：适合学习生成式 Web 工具的工程拆分和预览流程，但其目标是克隆网站，不符合 StyleKit 的“风格规则 → 产品规格 → 工程交付”领域，因此只作实现参考，不作为产品结构模板。

## 产品领域探索

### Domain

- Project Brief：产品为什么存在、给谁使用。
- Delivery Contract：页面、状态、技术栈和质量边界。
- Style Direction：引用 StyleKit 已有风格，而不是复制或改造 Showcase。
- Revision：不可变的项目规格与生成结果快照。
- Restore：从旧快照创建一个新版本。
- Generation：确定性地把已保存规格转换为文件清单和支持文档。
- Export Proof：导出物的哈希、文件清单、构建与运行验证。

### Signature

StyleKit 工作区的专属结构是“交付准备轨”：

```text
目标与受众 → 技术栈 → 页面清单 → 必要状态 → 风格方向 → 保存版本 → 验证导出
```

它不是装饰进度条，而是生成与导出的硬性输入门槛。缺少哪一项，就明确指出下一步；不能用一个巨大“AI 生成”按钮掩盖输入缺失。

### 明确拒绝的默认方案

- 通用左侧 Dashboard/Analytics/Billing/Settings 导航。
- 四张 KPI 卡作为工作区首页。
- 把聊天框当作唯一产品入口。
- 未实现功能的空菜单和假按钮。
- 把 localStorage 场景预设称为云项目或版本。
- 把提示词文档称为已经生成的应用。
- 让 135 个风格统一落入低保真通用模板后宣称全部支持。

## 对当前代码的判断

### 可复用

- Supabase Auth 与 `auth.users.id` 所有权。
- Workspace Project Brief Schema。
- 现有 135 风格 registry 的只读 metadata。
- Prompt Pair 作为支持文档。
- Generator 的确定性模板、输入清理和基础质量检查。
- Experience Pack 的 registry:block 和干净安装验证思路。

### 需要改造

- `lib/generator` 不是公开生成器产品，但 Workspace 的已验证生成路径仍调用其中的模板与
  renderer；多数风格只是替换颜色，不能直接开放。删除前必须先完成架构路线图 Phase 4 的
  依赖抽取。
- `buildDesignSpec` 含跨风格硬编码规则，会违背 Glassmorphism、Apple 等风格。
- ZIP 需要固定文件顺序、时间戳和哈希，才能保证同 Revision 得到相同产物。
- 生成项目的直接运行与构建依赖必须使用精确版本，并声明 `packageManager`；当前 ZIP 尚未携带 lockfile，因此每次发布前仍需执行干净安装、构建和 HTTP 运行验证，不能把直接依赖固定误称为完整传递依赖锁定。
- 生成的 `tsconfig.json` 与 `next-env.d.ts` 必须直接符合固定 Next.js 版本的契约；安装、构建和运行验证结束后逐文件对比原始生成内容，任何框架自动改写都视为交付失败。
- Revision 必须由数据库原子事务提交，客户端不能直写。
- Export 的 `verified` 状态只能由服务端构建验证器写入。

### 暂不采用

- Branch、团队协作、评论、计费、分析面板。
- 直接 LLM Generation；仓库当前没有真实模型执行链。
- CodeSandbox/StackBlitz 作为权威导出证明。
- 公开导航入口；工作区先通过 direct link 内测。

## 第一版产品结构

### `/workspace`

- 项目列表、搜索、活跃/归档状态。
- 每个项目直接显示交付准备缺口和唯一下一步。
- 没有项目时只显示创建入口。

### `/workspace/new`

- 基本信息。
- 受众、目标、技术栈、品牌与反例。
- 页面清单、必要状态和现有风格引用。

### `/workspace/[projectId]`

- 交付准备轨。
- 项目规格编辑。
- 线性版本历史。
- 恢复旧版本时创建新版本。
- 选定风格只提供原风格页和原 Showcase 链接。
- 生成与导出只有在真实能力和验证器完成后才显示。

## 实施门槛

在继续做最终工作区视觉前，必须先满足：

1. Project 读取使用用户 JWT 和 RLS；创建、更新、删除全部通过 owner-scoped RPC，登录用户没有项目表直写权限。
2. Revision 原子提交并支持并发冲突。
3. Restore 创建新 Revision。
4. Generation 对不支持的类型/风格明确拒绝，不能低保真降级。
5. Export 引用固定 Revision，结果确定且带 SHA-256。
6. 每个实际开放的导出目标都通过干净安装、类型检查、生产构建和运行验证；当前只开放已完成这套验证的 Next.js 数据后台，React/HTML 必须明确拒绝，不能冒充成功。
7. 现有首页、StyleCard、HomeStyleCard、135 个预览和 Showcase 视觉基线继续通过。

满足以上功能门槛后，再使用独立原型和用户确认决定最终视觉；不能把当前功能骨架直接当成完成设计。
