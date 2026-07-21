# StyleKit Workspace SaaS 部署准备审计

更新日期：2026-07-11

## 目标与冻结边界

当前目标是交付一个可创建、保存、恢复、生成和导出的真实 StyleKit Workspace SaaS。

以下区域保持冻结，不属于本次 Workspace 改造范围：

- 首页外观；
- `StyleCard` 与 `HomeStyleCard`；
- 135 个批准预览；
- 所有专属 Showcase；
- 收费、支付、价格实验与 Premium Pack 扩展。

`/workspace` 当前是独立、隐藏、需要登录且 `noindex` 的功能工作区。它没有加入公共导航，当前视觉仍是功能原型，不代表最终视觉定稿。

## 已实现的产品链路

### Project

- Project 归属于唯一的 Supabase `auth.users.id`。
- 创建 Project 时通过 `create_stylekit_project(...)` 数据库函数，在同一事务中创建不可变 Revision 1。
- 创建失败不会留下 `current_revision_number = 0` 的半成品项目。
- Project 可通过 `update_stylekit_project(...)` 编辑和归档，通过 `delete_stylekit_project(...)` 删除；登录用户不能直接写项目表，也不能改写 `current_revision_number`。
- 归档项目重新激活时会在 owner 级事务锁内重新检查 50 个活跃项目上限。
- Revision 历史不可覆盖。

### Revision

- 普通保存只能提交 `manual_save` 快照，客户端不能伪造 `generation`。
- `append_stylekit_project_revision(...)` 使用行锁和乐观版本号。
- 过期版本返回 `PROJECT_REVISION_CONFLICT`。
- 恢复历史版本会创建新的最新 Revision，不会移动指针或修改旧 Revision。
- 已归档项目不能继续保存、恢复或生成。

### Generation

目前只公开经过干净安装和生产构建验证的组合：

- Project type：`dashboard`
- Target：`nextjs`
- Style：`neo-brutalist`、`glassmorphism`、`neumorphism`、`editorial`

其他项目类型、React、HTML 和其他风格返回 `422 UNSUPPORTED_CAPABILITY`，不会降级为通用模板冒充成功。

生成顺序固定为：

```text
sanitize → validate → render → quality → file hash → immutable Revision
```

### Export

- Export 只能引用已经保存且包含真实 Generation 的 Revision。
- ZIP 文件顺序、文件时间和压缩参数固定。
- 每个生成文件在打包前重新计算 SHA-256。
- ZIP artifact 记录整体 SHA-256。
- 相同 Project、Revision、格式和 artifact SHA-256 使用唯一数据库身份；重复请求返回同一条 Export，而不是制造重复记录。
- 下载时根据原 Revision 重新生成 ZIP，并与记录的 artifact SHA-256 对比。
- 非 `generated` 状态不可下载。
- 历史导出文件名使用 Revision 保存时的项目名称，不受后续项目改名影响。

## 权限与安全边界

- 三张表启用并强制 RLS。
- `anon` 没有表权限。
- `authenticated` 对 Project 只有读取权限，创建、更新和删除必须经过受控 RPC。
- `authenticated` 对 Revision 和 Export 只有读取权限。
- Revision 只能由受控数据库函数创建。
- 普通用户直连 RPC 只能写 `manual_save`，不能伪造首版或后续 `generation`、`restore`、`import` 来源；这些来源只允许服务端身份写入，并显式绑定目标 owner。
- Export 记录由服务端在通过用户 RLS 读取 Project 与 Revision 后创建。
- 用户 A 无法读取用户 B 的 Project、Revision 或 Export。
- mutation 校验可信 Origin、严格 JSON Schema 和 Body 大小。
- `/api/workspace/*` 的成功和错误响应统一为 `private, no-store`。
- Workspace 页面服务端鉴权，匿名访问跳转登录页。
- 数据库事务限制每个用户最多 50 个活跃项目。
- 数据库事务限制每个项目最多 200 个 Revision。
- 生成按用户限制为每小时 10 次，ZIP 导出为每小时 30 次。

## 已完成的验证

### 自动测试

最近一次全量结果：

```text
Test Files  137 passed
Tests       6534 passed
TypeScript  PASS
ESLint      0 errors
```

Workspace 浏览器 E2E 在桌面与移动端覆盖：

- 项目列表；
- 保存产生新 Revision；
- 恢复旧版本产生新 Revision；
- Generation Revision；
- Export 记录；
- ZIP 下载；
- API no-store；
- 不出现公共移动导航和公告；
- 原 Showcase 链接保持原路径。

### 真实生成验证

四个开放风格分别在临时干净目录执行：

```text
pnpm install
TypeScript
next build
```

四个工程均生成 20 个文件并通过生产构建。

### 数据库验证

migration 016 已在一次性 PostgreSQL 16 干净环境实际执行，并验证：

- 3 张表与 4 个 RPC 成功创建；
- Project 与 Revision 1 原子创建；
- Revision 2 原子追加；
- 双用户 RLS 隔离；
- authenticated 直接插入、更新或删除 Project 被拒绝；
- authenticated 直接插入 Revision 被拒绝；
- authenticated 伪造首版或后续 Generation 来源被拒绝；
- service role 绑定目标 owner 后可以写入 Generation Revision；
- 受控 Project 更新和删除 RPC 通过；
- stale revision 被拒绝；
- archived Project 被拒绝。

### 视觉冻结验证

未更新任何视觉快照，以下测试均通过：

- 135 个批准预览桌面像素基线；
- 135 个批准预览移动像素基线；
- 共享卡片 default、hover、focus 状态。

### 主项目构建

主项目 production build 成功生成 1523 个页面，Workspace 页面与 API 路由均进入构建产物。

## 当前唯一部署缺口

远端 Supabase 尚未应用 `lib/supabase/migrations/016_stylekit_workspace.sql`。

只读探测结果：

```text
stylekit_projects          HTTP 404 / PGRST205
stylekit_project_revisions HTTP 404 / PGRST205
stylekit_project_exports   HTTP 404 / PGRST205
```

因此生产环境中的 Workspace 当前仍不可用。不得在 migration 未部署时宣称已经上线。

## 获得授权后的部署顺序

1. 确认目标 Supabase Project 和当前生产环境一致。
2. 保存部署前 schema 状态或数据库备份。
3. 在单一事务中执行 migration 016。
4. 只读确认三张表和四个 RPC 存在。
5. 使用两个测试账号执行 RLS smoke test。
6. 使用测试账号创建 Project，确认直接得到 Revision 1。
7. 完成保存、恢复、生成、导出、下载 smoke test。
8. 确认匿名用户和另一账号无法读取资源。
9. 确认原首页、预览卡片和 Showcase 视觉基线未变化。

## 回滚边界

migration 016 只新增 Workspace 专属表、索引、策略和函数，不修改现有风格、预览、Showcase 或公共用户内容表。

如果部署后 smoke test 失败：

1. 立即保持 `/workspace` 隐藏且不加入公共导航；
2. 停止新的 Workspace 写入；
3. 保留错误日志和数据库状态用于诊断；
4. 在确认没有需要保留的 Workspace 用户数据后，才考虑删除新增函数和表；
5. 不通过回退首页、预览或 Showcase 来处理 Workspace 故障。

## 完成判定

本地实现和验证已达到部署准备状态，但完整 Goal 只有在远端 migration 获得明确授权、成功部署，并完成真实账号 smoke test 后才能标记完成。
