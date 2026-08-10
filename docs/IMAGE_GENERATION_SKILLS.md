# StyleKit 生图 Skill 整理

更新时间：2026-08-03

这份清单来自 AnxForever 的 GitHub Stars，重点筛选和 StyleKit 的杂志编辑风格、网页视觉素材、提示词工程有关的项目。它不是“看到生图仓库就都安装”，而是把每个项目放进合适的工作环节。

## 先说结论

StyleKit 当前不需要真人肖像、泛用风景照或一组随机氛围图。现有样式的核心是：

- 编辑杂志排版：衬线标题、无衬线正文、暖米白、留白、网格、克制的线条交互。
- 纸艺手作：暖纸色、层叠纸张、手工边缘，但不适合被做成儿童插画或高饱和贴纸。
- 风格预览：收藏卡片由 `StyleCoverPreview` 生成样式图形，不是照片图库。

因此，图片必须先有明确的页面位置和职责，再决定是否生图。优先考虑“编辑封面条、纸张/墨迹纹理、抽象构成、可裁切的横向视觉”，不做没有落位的独立照片。

## 推荐分层

| 层级 | 项目 | 作用 | 对 StyleKit 的判断 |
| --- | --- | --- | --- |
| A | [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | Prompt as Code、案例库、工业模板、风格与场景分类 | 最值得作为主提示词库。优先看 `Illustration & Art`、`Posters & Typography`、`Documents & Publishing`、`History & Classical Chinese Themes`；暂时跳过 `Characters & People` 和泛 `Photography & Realism`。 |
| A | [style-extractor](https://github.com/Lucent-Snow/style-extractor) | 从真实网页提取颜色、字体、间距、状态、动效与证据 | 适合先分析参考站和 StyleKit 自身，解决“图片好看但放进网站不对”的问题。它不是生图器，而是生图前的约束提取器。 |
| A | [taste-skill](https://github.com/Leonxlnx/taste-skill) | 降低模板化、无聊、AI slop 的网页视觉输出；也包含参考板生图能力 | 适合做审美门禁和方向筛选，尤其用于拒绝泛化照片、渐变 blob、卡片堆叠和无意义装饰。 |
| B | [gc-minimal-zine-poster](https://github.com/LiamGvchi/gc-minimal-zine-poster) | 安静、留白、纸张质感、实验排版的 zine 海报提示词 | 和 StyleKit 的杂志编辑方向最接近。适合做横向封面、文章视觉或弹窗顶部的单张编辑图，但要限制纸张纹理和装饰密度。 |
| B | [ian-xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) | 16:9 白底手绘解释图，单图表达一个认知动作 | 不把整张正文配图塞进主页，但可以提炼“小黑”作为侧栏编辑注释；让 IP 只承担陪伴和提示，不承担主视觉。 |
| B | [CoolLanding-Skill](https://github.com/veithly/CoolLanding-Skill) | 诊断品牌、选择 Style World、组合交互机制、生成项目素材并做视觉 QA | 对落地页方法论有价值，但它偏 cinematic/WebGL 和签名动效。当前网站强调轻量、流畅，不应照搬生成式 WebGL。 |
| C | [impeccable](https://github.com/pbakaus/impeccable) | 设计上下文、审查、排版、布局、动效和反模板化命令 | 主要服务网页代码和视觉 QA，不是生图 skill；适合在素材落位后检查主页和编辑资料弹窗。 |
| C | [kill-ai-slop](https://github.com/yetone/kill-ai-slop) | 扫描并清理 AI 生成网页里的视觉和文案套路 | 不是生图器，但适合作为最终拒绝清单。 |
| C | [hallmark](https://github.com/Nutlope/hallmark) | Anti-AI-slop 设计 skill | 与 `kill-ai-slop` 能力重叠，二选一即可，不建议叠加多个审美审查器。 |
| C | [canvas-ui](https://github.com/DavidHDev/canvas-ui) / [sticker-forge](https://github.com/CatsJuice/sticker-forge) | Canvas/WebGL 视觉效果、贴纸交互 | 是前端视觉效果和工具，不是图片生成 skill；只在未来做交互式素材编辑器时考虑。 |
| C | [nature-skills](https://github.com/Yuan1z0825/nature-skills) | Nature 论文和科研绘图 | 与 StyleKit 个人主页和杂志素材无关，归档即可。 |

## 我建议保留的实际工作链路

```text
参考网页 / StyleKit 现有样式
        ↓
style-extractor + design-dna：提取视觉约束
        ↓
awesome-gpt-image-2：选择插画 / 海报 / 出版物模板
        ↓
gc-minimal-zine-poster：收敛为安静的编辑构图
        ↓
imagegen：只生成一个有明确页面位置的素材
        ↓
taste-skill + kill-ai-slop：审查是否泛化、喧宾夺主、不可落位
        ↓
落入 profile-cover / modal-header 等明确槽位，做裁切和响应式验证
```

## 针对 StyleKit 的提示词方向

### 第一优先：编辑构成，不是“照片”

适合收藏页或个人主页的素材应该是：

- 横向、可裁切，优先 3:1、21:9 或 16:9。
- 暖白或极浅纸色底，主体只占画面一小部分，保留文字和界面呼吸空间。
- 少量靛蓝、玫红、青绿、琥珀作为纸片、墨迹或印刷套色，不做大面积渐变。
- 以纸张、版面、线稿、色块、印刷错位、局部古典物件为语言，不生成真人主体。
- 画面不承担标题、按钮、长文本；文字由网页 HTML 负责，避免生成图中文字错误。

### 第二优先：古典人文主义的“物件语言”

可以借用古典人文主义的书籍、纸张、雕版、植物标本、测量工具、建筑片段，但要做成编辑构成或出版物图版，而不是一张写实博物馆静物照。重点是秩序、留白、比例和材质，不是堆满“古典元素”。

### 明确排除

- 真人肖像、半身人物、泛艺术写真。
- 大理石纹、流场、复杂烟雾和不可控的重 shader 视觉。
- 为了“有艺术感”而加入随机花瓶、书本、雕像的静物拼贴。
- 没有页面槽位、没有裁切规则、没有响应式验证的单张图片。

## 当前页面如何使用图片

现在的收藏卡片使用 `StyleCoverPreview`，它本身是样式预览渲染器，不应该被一组照片替换。图片素材最多先进入两个明确位置：

1. `profile-cover`：个人主页顶部的一条编辑封面，用于建立页面气质。
2. `modal-header`：编辑资料弹窗顶部的一小块纸张/印刷构成，作为弹窗的视觉锚点。

头像仍然是用户上传的本地图片，不和生图素材混用。小黑只作为个人主页加载状态出现，不进入头像、侧栏常驻内容和收藏卡片。

## 本次整理后的取舍

- 主力：`awesome-gpt-image-2` + `gc-minimal-zine-poster`。
- 前置约束：`style-extractor` + 当前项目已有的 `design-dna`。
- 审美门禁：`taste-skill`，再配合 `kill-ai-slop` 或 `impeccable` 其中一个做网页检查。
- 暂不使用：`CoolLanding-Skill` 的 WebGL 重视觉、`ian-xiaohei` 的整张正文配图、`nature-skills`、真人摄影方向；小黑 IP 仅保留为个人主页加载动画。
- 不安装重复能力：`kill-ai-slop` 与 `hallmark` 不必同时启用；`impeccable` 更适合网页代码审查。

这套整理的核心变化是：先确定“这张图在页面里承担什么工作”，再从 skill 里选风格和提示词，而不是先生成一张看起来有艺术感的图片再硬塞进网站。
