# StyleKit 后台运营手册

这份手册记录日常管理路径。后台地址是 `/admin-login`，进入后台后从「运营总览」开始；不要直接修改 `lib/site/support.ts` 或其他内容源文件来更新公开内容。

## 1. 更新赞助截图

1. 打开「运营总览」→「赞助公告」，或直接访问 `/admin/support`。
2. 拖入或选择 JPG、PNG、WebP 截图，单张不超过 10MB。
3. 填写赞助日期、公开显示名称和金额（可选）。
4. 选择「上传后立即公开」：
   - 开启：上传成功后立即出现在支持页和首页感谢弹窗。
   - 关闭：保存为「未公开赞助」，先核对截图、日期和金额，再点击「发布」。
5. 已有记录可以编辑显示名称/金额、隐藏/重新发布，或删除。删除会同时尝试清理 Storage 对象。

服务端还会检查请求大小、图片 MIME 类型和真实文件头；失败时不会写入数据库。上传成功但数据库写入失败时，接口会尝试删除刚上传的文件，避免留下孤立资产。

## 2. 更新全站公告

打开「内容中心」或 `/admin/content`：

- 中文和英文公告分别保存；切换语言后先确认当前语言再保存。
- 右侧实时预览用于核对标题、正文、按钮和启用状态。
- 开始/结束时间可以安排自动上线和下线。
- 按钮链接只能使用站内路径或 `http(s)` URL。
- 关闭公告只会停用，不会删除内容，之后可以重新启用。

## 3. 日常检查顺序

建议每天按这个顺序处理：

1. `/admin/operations`：看未公开赞助、待审核投稿、待复核知识库和近期反馈。
2. `/admin/support`：先处理需要核对的未公开截图。
3. `/admin/content`：需要发布站点通知时再编辑公告，不要为了赞助鸣谢重复改全站公告。
4. `/admin/analytics/audit`：需要追查谁在什么时候新增、编辑、隐藏或删除内容时查看审计记录。
5. `/admin/system`：确认表结构、Storage、健康检查和发布闸门状态。

如果要判断用户是否从浏览风格走到了实施动作，查看 `/admin/analytics/content` 的「价值信号」；
项目实施简报的生成、复制和下载会在待应用的 `031_project_brief_analytics_signal.sql` 迁移后计入「实现意向」。
这类行为只能说明实施兴趣，不能当作付款或安装成功。

## 4. 发布前闸门

`ops/verify-stylekit-release.sh` 是本地只读验收，不是部署命令。收付尚未核对时，保持默认状态运行会得到阻断提示：

```bash
pnpm run verify:release
```

只有在你明确确认收付和截图已经核对完成后，才可以在当前终端临时设置：

```bash
STYLEKIT_PAYMENT_CONFIRMED=1 pnpm run verify:release
```

这个闸门仍然不会自动执行部署、Supabase migration、Storage 上传或服务器写入；生产迁移和部署必须作为下一步单独的人工动作。
确认收付后运行该命令会顺序检查公开承诺、目录、赞助资源、Experience Pack、干净安装、工作区生成、类型、单元测试、视觉基线和生产构建。
其中的 runtime config 检查会验证管理员密码哈希、会话密钥、Supabase 配置成对性和本地环境文件权限，不会输出密钥。

## 5. Supabase 不可用时

- 公开支持页保留静态鸣谢 fallback，不要为了恢复页面临时关闭鉴权。
- 后台会明确提示 migration 或 Storage 不可用，不要反复点击提交。
- 公告与赞助表对应 migration 是 `029_support_acknowledgments.sql` 和 `030_site_announcements.sql`；实施意向聚合为 `031_project_brief_analytics_signal.sql`；应用前先在 `/admin/system` 复核状态。
- 任何远程 migration、部署或数据清理都要等收付确认后再进行，并保留执行前后的只读验收结果。
