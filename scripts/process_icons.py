#!/usr/bin/env python3
"""
AI 图标处理脚本
- 去除白色背景（改为透明）
- 按网格分割图标
- 自动裁剪透明边缘并居中
"""

import os
from PIL import Image
import numpy as np

# 配置
INPUT_DIR = "public/assets"
OUTPUT_DIR = "public/assets/icons"
FINAL_SIZE = 512  # 最终图标尺寸

# 图片配置：文件名 -> (行数, 列数, 图标名称列表)
GRID_CONFIG = {
    "Gemini_Generated_Image_9xwzid9xwzid9xwz.png": {
        "rows": 3,
        "cols": 5,
        "category": "function",
        "names": [
            "home", "settings", "search", "search-alt", "loading",
            "notification", "profile", "cart", "favorite", "share",
            "download", "share-alt", "upload", "edit", "calendar"
        ]
    },
    "Gemini_Generated_Image_keheh9keheh9kehe.png": {
        "rows": 3,
        "cols": 3,
        "category": "emotion",
        "names": [
            "success", "error", "warning",
            "running", "happy", "sad",
            "thinking", "sleeping", "surprised"
        ]
    },
    "Gemini_Generated_Image_b6g74kb6g74kb6g7.png": {
        "rows": 3,
        "cols": 3,
        "category": "decoration",
        "names": [
            "star", "heart", "cloud",
            "flower", "ribbon", "balloon",
            "sparkle", "leaf", "crown"
        ]
    }
}


def remove_white_background(img: Image.Image, threshold: int = 240) -> Image.Image:
    """将白色/浅灰色背景转为透明"""
    img = img.convert("RGBA")
    data = np.array(img)

    # 检测接近白色的像素 (R, G, B 都大于阈值)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    white_mask = (r > threshold) & (g > threshold) & (b > threshold)

    # 将白色像素的 alpha 设为 0
    data[:, :, 3] = np.where(white_mask, 0, a)

    return Image.fromarray(data)


def crop_to_content(img: Image.Image, padding: int = 10) -> Image.Image:
    """裁剪到内容边界，保留一定 padding"""
    bbox = img.getbbox()
    if bbox is None:
        return img

    left, top, right, bottom = bbox
    # 添加 padding
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)

    return img.crop((left, top, right, bottom))


def center_on_canvas(img: Image.Image, size: int) -> Image.Image:
    """将图片居中放置在正方形画布上"""
    # 先等比缩放，确保能放入画布
    max_dim = max(img.width, img.height)
    target_size = int(size * 0.85)  # 留出边距

    if max_dim > target_size:
        scale = target_size / max_dim
        new_w = int(img.width * scale)
        new_h = int(img.height * scale)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # 创建透明画布并居中粘贴
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x = (size - img.width) // 2
    y = (size - img.height) // 2
    canvas.paste(img, (x, y), img)

    return canvas


def slice_grid(img: Image.Image, rows: int, cols: int) -> list[Image.Image]:
    """将网格图切分为独立图标"""
    w, h = img.size
    cell_w = w // cols
    cell_h = h // rows

    icons = []
    for row in range(rows):
        for col in range(cols):
            left = col * cell_w
            top = row * cell_h
            right = left + cell_w
            bottom = top + cell_h

            cell = img.crop((left, top, right, bottom))
            icons.append(cell)

    return icons


def process_grid_image(filepath: str, config: dict, output_dir: str) -> list[str]:
    """处理单个网格图片"""
    print(f"\n处理: {os.path.basename(filepath)}")

    # 加载图片
    img = Image.open(filepath).convert("RGBA")
    print(f"  原始尺寸: {img.size}")

    # 去除白色背景
    img = remove_white_background(img)
    print(f"  已去除白色背景")

    # 切分网格
    rows, cols = config["rows"], config["cols"]
    icons = slice_grid(img, rows, cols)
    print(f"  切分为 {rows}x{cols} = {len(icons)} 个图标")

    # 创建输出目录
    category = config["category"]
    category_dir = os.path.join(output_dir, category)
    os.makedirs(category_dir, exist_ok=True)

    # 处理并保存每个图标
    saved_files = []
    names = config["names"]

    for i, icon in enumerate(icons):
        if i >= len(names):
            break

        name = names[i]

        # 裁剪到内容
        icon = crop_to_content(icon)

        # 居中放置到正方形画布
        icon = center_on_canvas(icon, FINAL_SIZE)

        # 保存
        filename = f"{category}_{name}.png"
        output_path = os.path.join(category_dir, filename)
        icon.save(output_path, "PNG", optimize=True)

        saved_files.append(output_path)
        print(f"    [{i+1:02d}] {filename}")

    return saved_files


def main():
    print("=" * 50)
    print("AI 图标处理脚本")
    print("=" * 50)

    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_files = []

    # 处理每个网格图片
    for filename, config in GRID_CONFIG.items():
        filepath = os.path.join(INPUT_DIR, filename)
        if not os.path.exists(filepath):
            print(f"\n警告: 文件不存在 - {filepath}")
            continue

        saved = process_grid_image(filepath, config, OUTPUT_DIR)
        all_files.extend(saved)

    print("\n" + "=" * 50)
    print(f"处理完成! 共生成 {len(all_files)} 个图标")
    print(f"输出目录: {OUTPUT_DIR}")
    print("=" * 50)

    return all_files


if __name__ == "__main__":
    os.chdir("/mnt/d/stylekit")
    main()
