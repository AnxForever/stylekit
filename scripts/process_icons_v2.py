#!/usr/bin/env python3
"""
AI 图标处理脚本 v2
- 基于内容检测的智能切分
- 去除白色背景（改为透明）
- 自动裁剪透明边缘并居中
"""

import os
from PIL import Image
import numpy as np

# 配置
INPUT_DIR = "public/assets"
OUTPUT_DIR = "public/assets/icons"
FINAL_SIZE = 512  # 最终图标尺寸

# 图片配置
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


def remove_white_background(img: Image.Image, threshold: int = 245) -> Image.Image:
    """将白色/浅灰色背景转为透明"""
    img = img.convert("RGBA")
    data = np.array(img)

    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    white_mask = (r > threshold) & (g > threshold) & (b > threshold)
    data[:, :, 3] = np.where(white_mask, 0, a)

    return Image.fromarray(data)


def find_content_bounds(img: Image.Image) -> tuple:
    """找到图片中非透明内容的边界"""
    data = np.array(img)
    if data.shape[2] == 4:
        alpha = data[:, :, 3]
        rows = np.any(alpha > 10, axis=1)
        cols = np.any(alpha > 10, axis=0)

        if not np.any(rows) or not np.any(cols):
            return None

        rmin, rmax = np.where(rows)[0][[0, -1]]
        cmin, cmax = np.where(cols)[0][[0, -1]]
        return (cmin, rmin, cmax + 1, rmax + 1)
    return None


def find_main_content(img: Image.Image) -> Image.Image:
    """
    找到图片中的主要内容（最大连通区域）
    用于去除切分边缘的残留部分
    只在边缘有明显的孤立碎片时才裁剪
    """
    data = np.array(img)
    if data.shape[2] != 4:
        return img

    alpha = data[:, :, 3]
    h, w = alpha.shape

    # 如果图片很小或透明度很低，直接返回
    if h < 50 or w < 50 or np.sum(alpha > 10) < 100:
        return img

    # 检查边缘是否有残留内容（检查左右各 10% 的区域）
    edge_width = int(w * 0.10)
    center_start = int(w * 0.3)
    center_end = int(w * 0.7)

    # 计算中心区域的内容量
    center_region = alpha[:, center_start:center_end]
    center_content = np.sum(center_region > 50)

    # 左边缘 - 只有当中心有足够内容且边缘内容明显少于中心时才裁剪
    left_edge = alpha[:, :edge_width]
    left_content = np.sum(left_edge > 50)

    # 右边缘
    right_edge = alpha[:, -edge_width:]
    right_content = np.sum(right_edge > 50)

    # 只有当边缘内容是"碎片"（远少于中心内容）时才裁剪
    # 阈值：边缘内容 < 中心内容的 5%，且边缘确实有内容
    crop_left = 0
    crop_right = w

    if left_content > 200 and left_content < center_content * 0.08:
        crop_left = edge_width

    if right_content > 200 and right_content < center_content * 0.08:
        crop_right = w - edge_width

    # 只有当裁剪后仍有足够内容时才裁剪
    if crop_left > 0 or crop_right < w:
        if crop_right - crop_left > w * 0.6:
            cropped = img.crop((crop_left, 0, crop_right, h))
            return cropped

    return img


def crop_to_content(img: Image.Image, padding: int = 5) -> Image.Image:
    """裁剪到内容边界"""
    bounds = find_content_bounds(img)
    if bounds is None:
        return img

    left, top, right, bottom = bounds
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)

    return img.crop((left, top, right, bottom))


def center_on_canvas(img: Image.Image, size: int) -> Image.Image:
    """将图片居中放置在正方形画布上"""
    # 等比缩放
    max_dim = max(img.width, img.height)
    target_size = int(size * 0.88)

    if max_dim > target_size:
        scale = target_size / max_dim
        new_w = int(img.width * scale)
        new_h = int(img.height * scale)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # 创建透明画布并居中
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x = (size - img.width) // 2
    y = (size - img.height) // 2
    canvas.paste(img, (x, y), img)

    return canvas


def slice_grid_smart(img: Image.Image, rows: int, cols: int) -> list:
    """
    智能切分网格图
    精确按网格切分，然后对每个单元格进行内容检测和裁剪
    """
    w, h = img.size
    cell_w = w // cols
    cell_h = h // rows

    icons = []
    for row in range(rows):
        for col in range(cols):
            # 精确切分，不扩展 margin
            left = col * cell_w
            top = row * cell_h
            right = (col + 1) * cell_w
            bottom = (row + 1) * cell_h

            cell = img.crop((left, top, right, bottom))

            # 先清理边缘残留内容
            cell = find_main_content(cell)

            # 再对单元格进行内容检测裁剪，去除多余空白
            cell = crop_to_content(cell, padding=5)

            icons.append(cell)

    return icons


def process_grid_image(filepath: str, config: dict, output_dir: str) -> list:
    """处理单个网格图片"""
    print(f"\n处理: {os.path.basename(filepath)}")

    img = Image.open(filepath).convert("RGBA")
    print(f"  原始尺寸: {img.size}")

    # 去除白色背景
    img = remove_white_background(img)
    print(f"  已去除白色背景")

    # 智能切分
    rows, cols = config["rows"], config["cols"]
    icons = slice_grid_smart(img, rows, cols)
    print(f"  切分为 {rows}x{cols} = {len(icons)} 个图标")

    # 创建输出目录
    category = config["category"]
    category_dir = os.path.join(output_dir, category)
    os.makedirs(category_dir, exist_ok=True)

    saved_files = []
    names = config["names"]

    for i, icon in enumerate(icons):
        if i >= len(names):
            break

        name = names[i]

        # 居中放置
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
    print("AI 图标处理脚本 v2 (智能切分)")
    print("=" * 50)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_files = []

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
