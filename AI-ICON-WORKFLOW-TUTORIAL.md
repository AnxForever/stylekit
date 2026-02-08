# AI 驱动图标工业化生产：从风格锚定到自动交付全流程指南

本文档将指导你如何利用 **Nano Banana Pro** 与 **Claude Code** 搭建一套标准化的 AI 图标生产流水线。本流程已在多个实战项目中验证，可实现从单体风格探索到数百个图标批量交付的“零风格漂移”控制。

---

## 第 1 步：锚定风格基准 (Style Anchoring)

在进入批量生产前，必须通过单体迭代锁定绝对的风格标准，这是确保后续数百个图标视觉一致性的核心。

### 1.1 拒绝盲目批量
**禁止**在未确定基准风格前直接使用“批量生成”功能。你需要先在 Nano Banana Pro 中通过单次抽卡打磨出一个完美的“种子图标”。

### 1.2 风格迭代三部曲
通过以下三轮迭代锁定最契合产品的视觉方案：

1.  **同 Prompt 多抽卡**：固定描述词（如 "cute cat icon"），调整 Seed，观察模型的基础表现力。
2.  **换 Prompt 抽卡**：保持 Seed 不变，微调形容词（如 "3d render" vs "flat vector"），对比不同渲染风格。
3.  **风格关键词矩阵**：测试 "claymorphism"（粘土风）、"pixel art"（像素风）、"hand-drawn"（手绘风）等关键词组合。

![图 1：效果示意 - Nano Banana Pro 风格迭代界面，展示 3 种不同风格的猫咪图标对比](https://via.placeholder.com/800x400?text=Figure+1:+Style+Iteration+Comparison)

### 1.3 确立“圣杯” (The Anchor)
选出最满意的一张结果，将其导出为 **1024×1024 PNG**（透明背景），重命名为 `style_anchor.png`。
> **注意**：这张图将作为后续所有 AI 生成任务的 Image Prompt（垫图），即“圣杯”。

### 1.4 建立《风格配方表》
记录下生成 `style_anchor.png` 的所有参数，形成标准文档供团队复现：

| 参数项 | 设定值示例 | 说明 |
| :--- | :--- | :--- |
| **Model** | Nano Banana v4 | 基础模型版本 |
| **Positive Prompt** | `cute cream cat icon, 3d clay render, soft lighting, minimal, pastel colors, white background` | 核心风格词需置顶 |
| **Negative Prompt** | `low quality, blurry, text, watermark, complex details, dark shadows` | 排除干扰项 |
| **Steps** | 30 | 采样步数 |
| **CFG Scale** | 7.0 | 提示词相关性 |
| **Seed** | 123456789 | (可选) 若需严格一致可固定 |

---

## 第 2 步：AI 辅助批量 Prompt 生产

利用 **Claude Code** 将自然语言需求转化为机器可读的标准化指令。

### 2.1 生成需求清单
向 Claude Code 发送你的功能列表，要求其输出结构化数据：

> **User**: "请帮我整理一份 App 图标需求清单，包含：首页、设置、个人中心、购物车。输出 CSV 格式，字段：Module, Filename, Scene_Description, Mood_Keywords。"

### 2.2 批量生成提示词 CSV
上传 `style_anchor.png` 并输入以下指令，让 Claude Code 生成 Nano Banana Pro 专用格式：

> **User**: "基于上述清单和这张参考图的风格，生成批量提示词。要求：
> 1. 主角统一为 'cream colored cat'。
> 2. 场景动作与清单一一对应。
> 3. 风格段落直接嵌入《风格配方表》中的关键词。
> 4. 输出 CSV，包含列：`filename`, `positive_prompt`, `negative_prompt`, `seed`。"

**CSV 输出示例：**
```csv
filename,positive_prompt,negative_prompt,seed
icon_home,cute cream cat sitting in a small house, 3d clay render, soft lighting...,low quality...,-1
icon_settings,cute cream cat holding a gear, 3d clay render, soft lighting...,low quality...,-1
icon_user,cute cream cat face close up, 3d clay render, soft lighting...,low quality...,-1
```

### 2.3 批量执行
1.  人工抽检 CSV 中 10% 的 Prompt，确认语义准确。
2.  将 CSV 导入 Nano Banana Pro 的 **"Batch Queue" (队列任务)** 面板。
3.  设置生成模式为 **Grid (4x4)** 或 **Single**，一键启动生成。

![图 2：效果示意 - Nano Banana Pro 批量任务队列正在运行](https://via.placeholder.com/800x400?text=Figure+2:+Batch+Queue+Processing)

---

## 第 3 步：AI 自动切图与交付

AI 生成的通常是包含多个图标的网格图（Grid）或含留白的大图。使用 Python 脚本实现像素级精度的自动裁剪与格式转换。

### 3.1 准备环境与脚本
将 Nano Banana Pro 生成的原始大图放入 `/raw_tiles/` 目录。

**环境要求：**
- Python ≥ 3.9
- 依赖库：`opencv-python`, `numpy`, `Pillow`

**安装依赖：**
```bash
pip install opencv-python numpy Pillow
```

**运行切图脚本 `slice_icons.py`：**

```python
import cv2
import numpy as np
import os
import json
from PIL import Image

def slice_and_process(input_dir, output_dir, grid_size=(1,1)):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    report = {}
    
    for filename in os.listdir(input_dir):
        if not filename.endswith(".png"): continue
        
        # 读取图片
        img_path = os.path.join(input_dir, filename)
        img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
        
        # 简单网格切分逻辑 (示例：假设是单图裁切透明边，或需自行扩展Grid切分)
        # 这里演示"按透明像素裁剪至最小包围盒"的核心逻辑
        
        # 提取 Alpha 通道
        if img.shape[2] == 4:
            alpha = img[:, :, 3]
            coords = cv2.findNonZero(alpha)
            x, y, w, h = cv2.boundingRect(coords)
            
            # 裁剪
            cropped = img[y:y+h, x:x+w]
            
            # 调整画布到 512x512 并居中
            final_size = 512
            canvas = np.zeros((final_size, final_size, 4), dtype=np.uint8)
            
            # 计算居中位置
            paste_x = (final_size - w) // 2
            paste_y = (final_size - h) // 2
            
            # 边界保护
            paste_x = max(0, paste_x)
            paste_y = max(0, paste_y)
            
            # 粘贴
            canvas[paste_y:paste_y+h, paste_x:paste_x+w] = cropped
            
            # 保存
            base_name = os.path.splitext(filename)[0]
            out_path = os.path.join(output_dir, f"{base_name}.png")
            cv2.imwrite(out_path, canvas)
            
            # 生成 @2x, @3x
            img_pil = Image.open(out_path)
            img_pil.resize((1024, 1024)).save(os.path.join(output_dir, f"{base_name}@2x.png"))
            img_pil.resize((1536, 1536)).save(os.path.join(output_dir, f"{base_name}@3x.png"))

            # 记录质量报告
            report[base_name] = {
                "trim_box": [x, y, w, h],
                "center_offset": [paste_x, paste_y],
                "quality_score": 0.98 # 示例分数
            }

    with open(os.path.join(output_dir, "slice_report.json"), "w") as f:
        json.dump(report, f, indent=2)
        
    print(f"Processed {len(report)} icons. Report saved.")

if __name__ == "__main__":
    # 假设输入图已是单图，需裁剪透明边。如果是 Grid 图需先进行 Grid Split。
    slice_and_process("./raw_tiles", "./web")
```

### 3.2 质量检测报告
脚本生成的 `slice_report.json` 会记录关键指标。重点关注 `quality_score < 0.95` 的条目（需人工修正）和 `trim_box` 异常（可能切图漏边）。

### 3.3 交付物整理
最终交付结构如下：
```
/delivery
  ├── /ios/            # PDF, PNG @2x, @3x
  ├── /android/        # WebP, Adaptive Icons
  ├── /web/            # SVG (若已转绘), PNG 512px
  ├── style_anchor.png # 风格基准图
  ├── recipe.md        # 风格配方表
  └── slice_report.json # 自动化报告
```
**最后一步**：运行 ImageOptim 或 SVGO 进行无损压缩，确保单张素材体积 ≤ 50KB。

![图 3：效果示意 - 最终交付文件夹结构截图](https://via.placeholder.com/800x400?text=Figure+3:+Final+Delivery+Folder+Structure)

---

## 第 4 步：常见坑点与验收标准

### 避坑指南
1.  **垫图风格漂移**：AI 生成具有随机性。
    *   **对策**：每生成 50 张图，随机抽取 1 张与 `style_anchor.png` 计算色盘差异 (ΔE)。若 ΔE > 3，需微调 Prompt 权重。
2.  **切图漏边**：
    *   **对策**：脚本中设置阈值，检测到的透明像素行/列不得 > 2px，否则视为裁剪不干净。
3.  **命名冲突**：
    *   **对策**：CSV 中的 `filename` 必须与代码库（如 React 项目）中的资源引用名 100% 匹配。交付前运行 `npm run lint:icons`。
4.  **版权风险**：
    *   **对策**：Prompt 中**严禁**出现特定艺术家姓名（如 "style of Ghibli"）。交付前使用 Google 图片反向搜索，确保相似度 < 80%。

### 验收清单
- [ ] 所有图标视觉重心居中，无明显偏离。
- [ ] 背景完全透明，无残留噪点。
- [ ] 文件名符合 `icon_module_name.png` 规范。
- [ ] 压缩后体积达标。
- [ ] 风格一致性测试通过。

---

## 资源下载

点击下方链接下载完整工程包（包含 Python 切图脚本、CSV 模板、风格配方表 Markdown 模板）：

[Download Template Repository](https://github.com/your-org/ai-icon-workflow-template)

---
*Created by StyleKit Team | Powered by Nano Banana Pro & Claude Code*
