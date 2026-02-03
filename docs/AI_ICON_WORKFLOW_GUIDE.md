# AI 图标批量生成工作流 - 最佳实践

## 核心原则：零风格漂移

本工作流已在多个实战项目中验证，可实现从单体风格探索到数百个图标批量交付的"零风格漂移"控制。

---

## 第一阶段：锚定风格基准

### 1.1 风格迭代三部曲

**A. 同 Prompt 多抽卡**
- 固定描述词（如 "cute cat icon"），调整 Seed
- 观察模型的基础表现力
- 找到满意的质感和比例

**B. 换 Prompt 抽卡**
- 保持 Seed 不变，微调形容词
- 对比 "3d render" vs "flat vector" 等风格词
- 测试不同的形容词组合效果

**C. 风格关键词矩阵**
- 系统地测试 "claymorphism"、"pixel art" 等关键词
- 记录每个关键词对输出的影响
- 锁定最佳的关键词组合

### 1.2 确立"圣杯"参考图

选出最满意的一张结果：
- 导出为 **1024×1024 PNG**（透明背景）
- 重命名为 `style_anchor.png`
- 这张图将作为后续所有 AI 生成任务的垫图

### 1.3 建立《风格配方表》

记录生成参考图的所有参数：

| 参数项 | 设定值示例 | 说明 |
|:---|:---|:---|
| Model | Gemini 2.0 Flash | AI 模型版本 |
| Positive Prompt | cute cream cat, 3d clay render, soft matte texture, pastel colors | 核心风格词需置顶 |
| Negative Prompt | low quality, blurry, text, watermark, shadows | 排除干扰项 |
| Canvas Size | 1536×2048 (4 行 3 列) 或自定义 | 根据图标数量调整 |
| Grid Layout | 等间距网格，无重叠 | 便于自动切割 |

---

## 第二阶段：优化提示词 - 便于自动切割

### 2.1 关键约束条件

```
Create a 4×3 grid of 12 cute cream cat icons on solid #00FF00 green background.

CRITICAL LAYOUT & SPACING:
- Canvas: 1536×2048 pixels with uniform pure #00FF00 background
- Strict 4×3 grid: 3 columns (597px each), 4 rows (600px each)
- Each icon EXACTLY centered in its cell
- Icon size: 350×350 pixels (uniform spacing)
- NO overlapping, NO touching, LARGE clear gaps between icons
- Icons must NOT exceed cell boundaries

ICON UNIFORMITY:
- All cats MUST be identical in size and style
- Same design, pose, colors across all icons
- Each icon occupies exactly 35% of cell width

BACKGROUND:
- Solid uniform #00FF00 (pure green)
- No shadows, no gradients, no texture on background
- Icon edges should be crisp and hard, not soft

STYLE:
- 3D clay render, pastel colors, cute designer toy style
- Cream cat face with pink ears and cheeks
- Simple happy expression
```

### 2.2 为什么选择绿幕背景

- **精确抠图**：纯绿色背离图标颜色，易于检测
- **避免混淆**：不会与 3D 阴影混淆（白色背景容易出现边框）
- **自动化友好**：RGB 值易于程序识别

---

## 第三阶段：AI 辅助批量 Prompt 生产

### 3.1 梳理需求清单

列出所有需要的图标：

```csv
icon_id,name_cn,name_en,description
home,首页,Home,cat with house
settings,设置,Settings,cat with gear
search,搜索,Search,cat with magnifying glass
...
```

### 3.2 生成批量提示词

使用 Claude Code 将清单转化为机器可读的提示词：

**Claude Code 指令：**
> 基于清单和参考图风格，生成批量提示词。要求：
> 1) 主角统一为'cream colored cat'
> 2) 场景与清单对应
> 3) 风格段落嵌入配方表关键词
> 4) 输出 CSV 格式

---

## 第四阶段：生成与批量处理

### 4.1 生成配置

- **模型**：Gemini 2.0 Flash 或更新版本
- **背景**：纯 #00FF00 绿色
- **尺寸**：4:3 网格布局（或 3:4，根据需要）
- **质量**：默认最高质量

### 4.2 自动化处理脚本

**Python 脚本工作流：**

```python
# 1. 去除绿幕背景
def remove_green_background(img, threshold=150):
    # 检测绿色像素并转为透明

# 2. 均匀网格分割
def slice_uniform_grid(img, rows=4, cols=3):
    # 按均匀比例切分网格单元格

# 3. 智能内容检测与裁剪
def crop_to_content(cell):
    # 自动检测非透明内容边界
    # 去除多余空白

# 4. 居中放置
def center_on_canvas(icon, size=512):
    # 将图标居中放置在 512x512 画布上
    # 保留 12% 的边距
```

---

## 第五阶段：质量控制

### 5.1 自动化检测指标

```
quality_score: 0.0 - 1.0 (目标 > 0.95)
- 图标完整性（无断裂）
- 边界清晰度（无模糊）
- 大小一致性（偏差 < 5%）
- 位置居中度（偏差 < 10px）
```

### 5.2 人工抽检流程

- **抽检比例**：10% 的生成结果
- **检查项**：
  - 背景完全去除？
  - 图标清晰完整？
  - 风格与参考图一致？
  - 大小和位置合理？
- **异常处理**：quality_score < 0.95 需人工修正

### 5.3 关键检查点

| 检查项 | 标准 | 处理方式 |
|:---|:---|:---|
| 图标大小不一 | 偏差 > 5% | 重新生成或手工调整 |
| 背景未完全去除 | 边缘有白/绿色 | 提高阈值重新处理 |
| 图标模糊或变形 | 质量评分 < 0.8 | 标记为需要修正 |
| 位置偏离中心 | 偏差 > 15px | 重新居中或标记 |

---

## 最佳实践总结

### 快速检查清单

- [ ] 提示词中明确指定网格尺寸和单元格大小
- [ ] 强调"NO overlapping, NO touching"
- [ ] 使用纯色背景（推荐绿幕）
- [ ] 明确要求"identical size"和"centered"
- [ ] 测试不同的 Seed 值找到最稳定的输出
- [ ] 保存《风格配方表》供团队复用
- [ ] 编写自动化脚本处理批量图片
- [ ] 建立 10% 抽检的质控机制

### 常见问题排查

**Q: 生成的图标大小不一**
- A: 提示词需要更明确的尺寸约束（如"350×350 pixels"）

**Q: 图标之间有重叠或接触**
- A: 需要在提示词中强调间距（如"MINIMUM 50px gap"）

**Q: 背景未完全去除**
- A: 调整绿色阈值（threshold），或重新生成纯色背景

**Q: 每个图标的风格不一致**
- A: 增加 Seed 的稳定性，使用"Identical size and style"约束

---

## 工作流成本效益

| 工作量 | 耗时 | 产出 |
|:---|:---|:---|
| 风格探索（A-B-C 三部曲） | 30 min | 1 张参考图 + 配方表 |
| 提示词生成（12 个图标） | 10 min | 12 个标准化提示词 |
| AI 生成（批量） | 5 min | 12 张原始网格图 |
| 自动化处理 | 1 min | 12 张透明背景图标 |
| 人工抽检（10%） | 5 min | 质量验证 |
| **总耗时** | **~50 min** | **12 个生产级图标** |

**规模效益**：100 个图标只需 3-4 小时，1000 个图标仅需 30-40 小时。

---

## 下一步

1. **文件组织**
   - 在项目中建立 `assets/icons/` 目录
   - 按分类存储：`function/`、`emotion/`、`decoration/`

2. **版本控制**
   - 保存 `style_anchor.png` 作为基准
   - 保存 `recipe.md` 作为团队文档

3. **团队协作**
   - 共享《风格配方表》
   - 建立统一的提示词库
   - 定期同步质控标准
