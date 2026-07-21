# Corporate Clean SaaS Pack

一个面向 Next.js 16 和 React 19 的完整 B2B SaaS 数据工作区切片。

## 包含内容

- 响应式侧边栏和工作区导航；
- 关键指标、收入趋势、转化漏斗和账户表格；
- Loading、Empty、Error、Success、Focus 与移动导航状态；
- `prefers-reduced-motion` 静态降级；
- Scoped CSS Module，不写入或覆盖项目全局视觉；
- StyleKit 自有 SVG 产品主视觉；
- 无远程图片、无第三方图库、无额外运行时依赖。

## 安装目标

文件默认安装到：

```text
app/corporate-clean/
components/corporate-clean/
lib/corporate-clean/
public/experience-packs/corporate-clean-saas/
```

安装器采用冲突即失败策略，不覆盖目标项目已有文件。删除以上目录即可完整回滚。

Registry 还会在项目根目录安装 `STYLEKIT_PACK.json`。它是面向 Codex、Claude、Cursor、CI
和未来 StyleKit 工具的确定性机器合同，记录本版本的视觉证据、可验证声明、资产、动效生命周期、
交互契约、兼容范围和许可摘要。

## 支持边界

- 验证组合：Next.js 16.1、React 19.2；
- CSS Module 为必需能力；Tailwind CSS 4 与 shadcn 可共存但不是运行前提；
- 购买后 30 天安装问题支持；
- 购买后 12 个月内提供本 Pack 的兼容性更新；
- 不包含客户数据接入、品牌定制和业务 API 实现。

## 演示数据

界面中的公司、人员、金额和趋势均为虚构演示数据，不代表 StyleKit 或任何真实客户的经营结果。
