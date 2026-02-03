# Banana Nano AI 素材生成指南

## 什么是 Banana Nano？

Banana Nano 是 Google Gemini 的快速图像生成模型，可以快速生成高质量的 AI 图像。它特别适合生成卡通、插图和装饰性素材。

## 快速开始

### 1. 访问 Banana Nano

**方式 1: 通过 Google Gemini**
- 访问 [gemini.google.com](https://gemini.google.com)
- 点击左侧菜单的 "🍌 Create images"
- 选择 "Fast" 模型（Banana Nano）

**方式 2: 通过专门网站**
- 访问 [nano-banana.ai](https://www.nano-banana.ai)
- 注册账户
- 开始生成

### 2. 基本界面

```
┌─────────────────────────────────┐
│  提示词输入框                    │
│  (输入你的描述)                  │
├─────────────────────────────────┤
│  [生成] [编辑] [下载]            │
├─────────────────────────────────┤
│                                 │
│  生成的图像显示区域              │
│                                 │
└─────────────────────────────────┘
```

## 提示词 (Prompt) 写法

### 核心公式

```
[主体] + [动作/特征] + [场景] + [风格] + [质量]
```

### 详细结构

#### 1. 主体 (Subject)
描述你要生成的对象

**示例:**
- "一个可爱的香蕉角色"
- "一朵彩色的花朵"
- "一个微笑的卡通人物"

**关键词:**
- 外观: cute, adorable, beautiful, colorful
- 材质: soft, fluffy, smooth, shiny
- 情绪: happy, playful, cheerful, friendly

#### 2. 动作/特征 (Action/Characteristics)
描述对象在做什么或它的特点

**示例:**
- "跳舞"
- "拿着一个星星"
- "穿着蓝色衣服"
- "闪闪发光"

**常用动词:**
- dancing, jumping, flying, running
- holding, wearing, sitting, standing
- smiling, waving, playing

#### 3. 场景 (Scene/Context)
描述背景和环境

**示例:**
- "在彩虹背景上"
- "在花园里"
- "在白色背景上"
- "在星空下"

**常用场景:**
- white background (白色背景)
- colorful background (彩色背景)
- garden (花园)
- space (太空)
- sunny day (晴天)

#### 4. 风格 (Style)
描述艺术风格

**推荐用于卡通素材的风格:**
- flat design (扁平设计) ⭐ 最适合按钮
- cartoon (卡通)
- illustration (插图)
- cute art style (可爱艺术风格)
- vector art (矢量艺术)
- hand-drawn (手绘)
- 3D render (3D 渲染)
- watercolor (水彩)

#### 5. 质量 (Quality)
描述图像质量

**常用词:**
- high quality (高质量)
- detailed (详细)
- professional (专业)
- vibrant colors (鲜艳颜色)
- sharp (清晰)
- 8k resolution (8K 分辨率)

### 负面提示词 (Negative Prompt)

告诉 AI 你**不想要**什么

**常用负面词:**
- blurry (模糊)
- low quality (低质量)
- distorted (扭曲)
- ugly (丑陋)
- watermark (水印)
- text (文字)
- extra fingers (多余的手指)
- deformed (变形)

## 实战示例

### 示例 1: 可爱的香蕉按钮

**提示词:**
```
A cute cartoon banana character with a big smile,
wearing a blue shirt, holding a star,
on a white background,
flat design style,
vibrant colors,
high quality,
professional illustration
```

**负面提示词:**
```
blurry, low quality, distorted, watermark, text
```

**参数设置:**
- 尺寸: 512x512 (正方形，适合按钮)
- 步数: 25-30
- CFG: 7-8

### 示例 2: 微笑的卡通角色

**提示词:**
```
A friendly cartoon character with a warm smile,
round face, big eyes, cheerful expression,
wearing colorful clothes,
on a soft pastel background,
cute art style,
hand-drawn illustration,
detailed, vibrant, professional
```

**负面提示词:**
```
blurry, low quality, scary, distorted, watermark
```

### 示例 3: 花朵装饰

**提示词:**
```
A beautiful colorful flower with petals,
blooming, vibrant colors,
on a white background,
flat design style,
cute and playful,
high quality illustration,
professional, detailed
```

**负面提示词:**
```
blurry, low quality, watermark, text, realistic
```

### 示例 4: 闪耀徽章

**提示词:**
```
A shining star badge with sparkles,
glowing effect, golden and silver colors,
3D render style,
on a white background,
cute and magical,
high quality, detailed,
professional illustration
```

**负面提示词:**
```
blurry, low quality, watermark, text, flat
```

### 示例 5: 装饰性图案

**提示词:**
```
Cute decorative pattern with flowers, leaves, and butterflies,
colorful and playful,
flat design style,
on a white background,
vector art,
high quality, detailed,
professional, vibrant colors
```

**负面提示词:**
```
blurry, low quality, watermark, text, realistic
```

## 提示词写作技巧

### 1. 具体性原则

❌ **不好:**
```
一个可爱的东西
```

✅ **好:**
```
A cute cartoon banana character with a big smile,
wearing a blue shirt, holding a golden star,
on a white background, flat design style
```

### 2. 分层描述

从大到小描述:
1. 主体是什么
2. 主体的特征
3. 主体在做什么
4. 背景是什么
5. 整体风格

### 3. 使用逗号分隔

```
主体, 特征1, 特征2, 动作, 背景, 风格, 质量
```

### 4. 避免过度描述

❌ **太长:**
```
一个非常非常可爱的香蕉角色，有着非常大的笑脸，
穿着非常蓝的衣服，拿着一个非常闪闪发光的星星...
```

✅ **简洁:**
```
Cute cartoon banana character with big smile,
wearing blue shirt, holding shiny star,
flat design, white background, high quality
```

### 5. 使用强调词

**强调词:**
- very (非常)
- extremely (极其)
- highly (高度)
- ultra (超级)
- professional (专业)
- detailed (详细)

## 参数设置指南

### 尺寸 (Size)

| 用途 | 推荐尺寸 | 说明 |
|------|---------|------|
| 按钮 | 512x512 | 正方形，适合按钮 |
| 装饰 | 512x512 | 正方形，通用 |
| 徽章 | 256x256 | 小尺寸 |
| 背景 | 1024x1024 | 大尺寸 |
| 宽屏 | 1024x512 | 横向 |

### 步数 (Steps)

- **快速**: 20-25 步 (快，质量一般)
- **平衡**: 25-30 步 (推荐) ⭐
- **高质量**: 30-40 步 (慢，质量好)

### CFG (Classifier Free Guidance)

- **低** (5-6): 更有创意，可能偏离提示词
- **中** (7-8): 平衡 ⭐ (推荐)
- **高** (9-10): 严格遵循提示词，可能不够创意

### 种子 (Seed)

- 用于重现相同结果
- 如果喜欢某个生成结果，记下种子号
- 下次使用相同种子会生成类似的图像

## 迭代优化流程

### 第一步: 生成初稿
```
提示词 → 生成 → 查看结果
```

### 第二步: 评估
- ✓ 满意? → 下载
- ✗ 不满意? → 继续优化

### 第三步: 优化
根据问题调整:

**问题: 颜色不够鲜艳**
```
添加: vibrant colors, bright, saturated
```

**问题: 风格不对**
```
改变: flat design → cartoon illustration
```

**问题: 背景不对**
```
改变: on a white background → on a colorful gradient background
```

**问题: 细节不够**
```
添加: highly detailed, professional, intricate
```

### 第四步: 重新生成
```
修改提示词 → 生成 → 查看结果 → 重复
```

## 实用提示词模板

### 模板 1: 可爱角色

```
A cute [动物/物体] character with [特征],
[表情/动作],
wearing [衣服],
on a [背景] background,
[风格] style,
[质量词], professional illustration
```

**填空示例:**
```
A cute banana character with big eyes,
smiling happily,
wearing a blue shirt,
on a white background,
flat design style,
vibrant colors, professional illustration
```

### 模板 2: 装饰元素

```
A beautiful [物体] with [特征],
[颜色描述],
on a [背景] background,
[风格] style,
[质量词], detailed
```

**填空示例:**
```
A beautiful flower with colorful petals,
bright and vibrant colors,
on a white background,
flat design style,
high quality, detailed
```

### 模板 3: 徽章/图标

```
A [形容词] [物体] badge with [特征],
[效果],
on a [背景] background,
[风格] style,
[质量词], professional
```

**填空示例:**
```
A shining star badge with sparkles,
glowing effect,
on a white background,
3D render style,
high quality, professional
```

## 常用形容词库

### 可爱相关
- cute (可爱)
- adorable (迷人)
- charming (迷人)
- playful (活泼)
- friendly (友好)
- cheerful (欢快)
- sweet (甜蜜)
- lovable (可爱的)

### 颜色相关
- vibrant (鲜艳)
- bright (明亮)
- colorful (彩色)
- pastel (柔和)
- saturated (饱和)
- vivid (生动)
- warm (温暖)
- cool (冷色)

### 质量相关
- high quality (高质量)
- detailed (详细)
- professional (专业)
- sharp (清晰)
- crisp (清脆)
- polished (精致)
- refined (精细)
- intricate (复杂)

### 风格相关
- flat design (扁平设计)
- cartoon (卡通)
- illustration (插图)
- vector (矢量)
- hand-drawn (手绘)
- 3D render (3D 渲染)
- watercolor (水彩)
- minimalist (极简)

## 常见问题

### Q: 生成的图像质量不好？
A:
1. 增加步数 (30-40)
2. 提高 CFG (8-9)
3. 添加质量词: "high quality, detailed, professional"
4. 移除负面词中可能冲突的词

### Q: 图像不符合我的描述？
A:
1. 提示词更具体
2. 降低 CFG (6-7)
3. 使用更清晰的关键词
4. 避免模糊的表达

### Q: 如何生成一致的风格？
A:
1. 使用相同的种子 (Seed)
2. 保持相同的风格关键词
3. 使用相同的参数设置
4. 只改变主体描述

### Q: 如何下载图像？
A:
1. 右键点击图像
2. 选择 "Save image as"
3. 或点击下载按钮
4. 保存为 PNG 格式 (支持透明背景)

### Q: 生成的图像可以商用吗？
A:
- 取决于你的 Banana Nano 账户类型
- 免费账户: 通常仅供个人使用
- 付费账户: 可能支持商用
- 查看服务条款确认

## 工作流程建议

### 为你的网站生成素材

#### 第 1 天: 规划
- 列出需要的素材类型 (按钮、装饰、徽章等)
- 确定风格 (卡通、扁平、3D 等)
- 确定颜色方案

#### 第 2 天: 生成
- 为每种类型写 3-5 个提示词
- 生成多个变体
- 选择最好的 3-5 个

#### 第 3 天: 优化
- 对选中的图像进行微调
- 调整颜色、大小、细节
- 生成最终版本

#### 第 4 天: 处理
- 下载所有图像
- 压缩文件大小
- 生成缩略图
- 上传到项目

## 快速参考

### 最佳实践清单

- [ ] 提示词具体明确
- [ ] 包含风格关键词
- [ ] 包含质量关键词
- [ ] 使用负面提示词
- [ ] 参数设置合理 (步数 25-30, CFG 7-8)
- [ ] 尺寸适合用途 (按钮 512x512)
- [ ] 多生成几个变体
- [ ] 选择最好的结果
- [ ] 压缩文件大小
- [ ] 记录成功的提示词

### 快速命令

**生成可爱按钮:**
```
Cute cartoon character, smiling, on white background,
flat design style, vibrant colors, high quality
```

**生成装饰元素:**
```
Beautiful colorful decoration, playful style,
on white background, flat design, professional
```

**生成徽章:**
```
Shiny badge with sparkles, glowing effect,
on white background, 3D render, high quality
```

## 下一步

1. 访问 [gemini.google.com](https://gemini.google.com)
2. 选择 "🍌 Create images" → "Fast"
3. 复制上面的提示词示例
4. 开始生成你的第一个素材！
5. 根据结果调整提示词
6. 保存满意的图像
7. 上传到你的项目

---

**提示:** 第一次生成可能不完美，这很正常！通过多次迭代和调整，你会越来越熟练。祝你生成出漂亮的素材！🎨
