"""
AI 图标批量生成工作流 - 快速指南

三个步骤，从零到生产级图标集。
"""

# ============================================================
# 第一步：明确需求
# ============================================================

需求清单示例：
- 风格：Claymorphism（3D粘土风格）
- 主角：Cream Colored Cat（奶油色小猫）
- 数量：12 个图标
- 用途：Functional Icons（功能性图标）
- 分类：home, settings, search, notification, profile, cart, favorite, share, download, upload, edit, calendar


# ============================================================
# 第二步：使用提示词模板生成
# ============================================================

**核心模板（复制即用）：**

```
Create a 4×3 grid of 12 cute cream colored cat icons on solid #00FF00 green background.

GRID & LAYOUT:
- Canvas: 1536×2048 pixels (4 rows × 3 columns)
- Each icon: 350×350 pixels, perfectly centered in its cell
- Spacing: Uniform, NO overlapping, NO touching
- Each icon exactly the same size

ICON STYLE:
- 3D clay render, pastel colors, cute designer toy aesthetic
- Cream/beige cat with pink ears and cheeks
- Simple happy expression
- Material: smooth matte texture

BACKGROUND:
- Solid pure #00FF00 (green)
- No shadows, no gradients, no texture
- Clean edges on icons

ICON DESCRIPTIONS (row by row):
1. home, settings, search
2. notification, profile, cart
3. favorite, share, download
4. upload, edit, calendar
```

**为什么这样写 - 关键要点：**

| 要素 | 原因 | 注意 |
|:---|:---|:---|
| 4×3 网格 + 像素尺寸 | 精确切割，自动化处理 | 改成 3×4 改行数 |
| #00FF00 绿幕背景 | 易于检测，不与阴影混淆 | 不要用白色背景 |
| "identical size" | 保证风格一致 | 强调这个 |
| "350×350 pixels" | 给AI明确的约束 | 留 12% 边距 |
| "NO overlapping" | 防止图标相互接触 | 强调"LARGE clear gaps" |
| 分行描述 icons | AI 按顺序理解 | 保持这个结构 |

**易犯的错误：**
- 不指定背景颜色 -> AI 会随意添加阴影
- 不说网格尺寸 -> 图标大小不一
- 用"beautiful"这类虚词 -> AI 理解不一致
- 一次要50+个图标 -> 概率失败，分批更好

**调整模板的方式：**

改数量：把 "4×3" 改成需要的行列，把像素调整为 `总高÷行数`

改风格：替换 "3D clay render" 和 "cream colored cat"，比如：
- Flat vector style + colorful abstract shapes
- Pixel art style + retro 8-bit cat
- Minimalist line art + geometric shapes

改背景颜色：如果 #00FF00 不适合，用 #FF00FF（洋红）也可以


# ============================================================
# 第三步：处理图片 - 透明背景 + 切割
# ============================================================

**处理流程（Python 脚本）：**

1. 去除背景颜色（绿幕检测）
2. 按网格均匀切分
3. 自动裁剪到内容边界
4. 居中放在 512×512 画布上
5. 保存为透明 PNG

**脚本用法：**

```python
# 修改这三行
INPUT_FILE = "生成的网格图片.png"
OUTPUT_DIR = "输出目录"
ROWS, COLS = 4, 3  # 网格行列数

# 运行
python process_single_icon_sheet.py
```

**质检（10% 抽检）：**
- 背景完全透明？
- 图标有断裂或变形？
- 尺寸一致（都是 512x512）？
- 内容居中？


# ============================================================
# 快速参考
# ============================================================

**一张图速记 - 3步流程**

需求 → 提示词 → 处理脚本 → ✓完成

**文件清单**

- `scripts/process_single_icon_sheet.py` - 切割脚本
- `docs/prompt_template.md` - 完整模板（本文件）
- `style_anchor.png` - 保存成功的参考图

**团队协作**

1. 确定风格 → 共享参考图（style_anchor.png）
2. 写配方表 → 记录所有参数
3. 批量生成 → 用脚本自动处理
4. 快速验收 → 检查清单 5 min 完成


# ============================================================
# 常见问题
# ============================================================

**Q: 生成的图标大小不一样**
A: 提示词中加上 "EXACTLY 350×350 pixels" 和 "identical size"

**Q: 图标周围有白色/绿色残留**
A: 检查背景阈值，或重新生成纯色背景

**Q: 切割脚本报错**
A: 确保输入图片是 PNG 格式，背景颜色是纯 #00FF00

**Q: 不同 Seed 生成的图标风格差异大**
A: 这是正常的。用参考图（垫图）功能锁定风格
