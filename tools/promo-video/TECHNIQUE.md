# 影片工程笔记（质量优先）

## 不可动摇的两条原则

1. **产品画面必须来自项目自己的代码。**
   每套风格渲染的是 `app/styles/<slug>/showcase/_content.tsx`，
   每个功能页渲染的是 `app/prompts/page.tsx` 等真实 Next 页面。
   不截图、不录屏、不重画。

2. **所有时间从同一张 cue sheet 推导。**
   `src/timeline2.ts` 定义 98 小节（120BPM、60fps、1 小节 = 120 帧 = 2 秒）。
   段落、镜头、音乐全部由它派生，任何地方都不写死帧号。

## 已验证的渲染栈

| 层 | 做法 | 为什么 |
|---|---|---|
| Tailwind | 项目自己的 `@tailwindcss/postcss`，`@source` 指向被引用的文件 | 少了这层，showcase 只有裸结构没有样式 |
| Provider | `I18nProvider → AuthProvider → KitProvider` | 真实页面依赖这三层，缺一个就抛错 |
| Next 别名 | `@`→仓库根、`next/link`、`next/navigation` → shims | 页面代码零改动 |
| 图片 | 挂载后给 `img[src^="/"]` 补 `/public` 前缀 | Remotion 把 public 挂在 `/public` |
| 滚动 | 按时间轴 `translateY`，页面真的在滚动 | IntersectionObserver 才会触发，动画才是活的 |

## 帧断言（这一轮最重要的产出）

`scripts/verify-frames.mjs` 对 19 个关键帧做像素检查：
亮度区间 + 标准差。它抓到过：

- 风格蒙太奇只填满了 4/6，后两套整帧黑（段落长度算错 1080 帧）
- 提示词段内部 `Sequence` 时长算错，采样点落在空白
- 揭示幕白闪衰减时长远长于设计，整段卡在白里

**目测一定会漏掉这些。** 每次出片前跑一遍，全部 PASS 才算数。

所以现在的流程是：

```bash
node scripts/build-assets.mjs    # 重编 Tailwind + showcase 清单
node scripts/make-css-module.mjs # CSS 转 TS 模块
node scripts/verify-frames.mjs   # 19 个断言必须全 PASS
node scripts/render.mjs          # 出片
```
