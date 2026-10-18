# StyleKit 宣传片

一支 196 秒（约 3 分 16 秒）、1920×1080、60fps 的品牌短片，全部由代码生成。

**片子里出现的每一个产品画面，都是 StyleKit 自己的组件在渲染**——
`app/styles/*/showcase/_content.tsx`、`app/prompts/page.tsx`、`app/animations/page.tsx`。
不是截图，不是录屏，不是重画的仿制品。

成片：`out/stylekit-promo-final.mp4`

## 构建

```bash
cd tools/promo-video
npm install

# 1. 从 app 生成三样东西：148 套配色、Tailwind、showcase 清单
node scripts/build-assets.mjs

# 2. 合成配乐（196 秒，纯合成，无采样）
node audio/build.mjs

# 3. 帧断言，22 个关键帧必须全 PASS
node scripts/verify-frames.mjs

# 4. 出片
node scripts/render.mjs
```

改过风格库之后只需要重跑第 1、3、4 步。

## 结构

```
src/
  timeline2.ts      唯一的节奏真相：98 小节 = 196 秒 = 11760 帧
  acts.ts           由 cue sheet 派生的段落/镜头时长
  treatments.ts     每套风格的运镜与叠加特效（含标题放置位置）
  Film.tsx          分镜表
  scenes/           九幕
  components/       ShowcaseStage / PageStage / 电影感特效
  generated/        由 build-assets.mjs 生成，不要手改
  catalog.ts        同样生成，148 套真实配色
audio/
  dsp.mjs           手写合成器：鼓、贝斯、pad、riser、混响
  score.mjs         编曲，与小节一一对应
scripts/
  build-assets.mjs  catalog + Tailwind + 清单
  verify-frames.mjs 帧断言
  render.mjs        出片
```

## 三条关键经验

1. **Tailwind 必须用项目自己的构建。** `@tailwindcss/postcss` 以 `@source`
   指向被引用的文件，否则 showcase 只有裸结构没有样式。
2. **真实页面需要三层 Provider**：`I18n → Auth → Kit`，缺一个就抛错。
   另外要给 `@`、`next/link`、`next/navigation` 配别名（见 `remotion.config.ts`）。
3. **`useCurrentFrame()` 在 Sequence 里是局部帧号。** 拿它去比 cue sheet 的
   绝对帧号，画面会静默地永远不出现——不报错，就是黑的。

## 帧断言为什么必须存在

目测抽样一定会漏掉整段黑屏。这套断言抓到过：

- 风格蒙太奇只填满 4/6，后两套整帧纯黑
- 提示词段内部时长算错，采样落在空白
- 揭示幕白闪衰减过慢，整段卡在白里

方法论细节见 `TECHNIQUE.md`。
