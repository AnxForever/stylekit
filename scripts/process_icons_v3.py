#!/usr/bin/env python3
"""
AI 图标处理脚本 v3
- 基于空白间隙检测实际分割线
- 去除白色背景
- 自动裁剪并居中
"""

import os
from PIL import Image
import numpy as np

INPUT_DIR = "public/assets"
OUTPUT_DIR = "public/assets/icons"
FINAL_SIZE = 512

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


def find_split_lines(alpha: np.ndarray, num_splits: int, axis: int) -> list:
    """
    沿指定轴找到空白分割线位置
    axis=0: 找垂直分割线（沿列方向投影）
    axis=1: 找水平分割线（沿行方向投影）
    """
    # 投影：计算每行/列的非透明像素数
    projection = np.sum(alpha > 20, axis=axis)

    length = len(projection)
    approx_size = length // num_splits

    # 在每个预期分割点附近搜索最小值
    splits = [0]
    for i in range(1, num_splits):
        center = i * approx_size
        search_start = max(0, center - approx_size // 4)
        search_end = min(length, center + approx_size // 4)

        region = projection[search_start:search_end]
        min_idx = np.argmin(region) + search_start
        splits.append(min_idx)
    splits.append(length)

    return splits


def crop_to_content(img: Image.Image, padding: int = 5) -> Image.Image:
    """裁剪到内容边界"""
    bbox = img.getbbox()
    if bbox is None:
        return img

    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)
    return img.crop((left, top, right, bottom))


def center_on_canvas(img: Image.Image, size: int) -> Image.Image:
    """将图片居中放置在正方形画布上"""
    max_dim = max(img.width, img.height)
    target_size = int(size * 0.88)

    if max_dim > target_size:
        scale = target_size / max_dim
        new_w = int(img.width * scale)
        new_h = int(img.height * scale)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x = (size - img.width) // 2
    y = (size - img.height) // 2
    canvas.paste(img, (x, y), img)
    return canvas


def slice_grid_by_gaps(img: Image.Image, rows: int, cols: int) -> list:
    """
    基于空白间隙检测分割线，切分网格图
    """
    data = np.array(img)
    alpha = data[:, :, 3]

    # 找到水平和垂直分割线
    # axis=0: 沿行方向求和 -> 得到每列的内容量（用于找垂直分割线）
    # axis=1: 沿列方向求和 -> 得到每行的内容量（用于找水平分割线）
    col_splits = find_split_lines(alpha, cols, axis=0)
    row_splits = find_split_lines(alpha, rows, axis=1)

    print(f"    列分割点: {col_splits}")
    print(f"    行分割点: {row_splits}")

    icons = []
    for row in range(rows):
        for col in range(cols):
            left = col_splits[col]
            right = col_splits[col + 1]
            top = row_splits[row]
            bottom = row_splits[row + 1]

            cell = img.crop((left, top, right, bottom))
            cell = crop_to_content(cell, padding=5)
            icons.append(cell)

    return icons


def process_grid_image(filepath: str, config: dict, output_dir: str) -> list:
    """处理单个网格图片"""
    print(f"\n处理: {os.path.basename(filepath)}")

    img = Image.open(filepath).convert("RGBA")
    print(f"  原始尺寸: {img.size}")

    img = remove_white_background(img)
    print(f"  已去除白色背景")

    rows, cols = config["rows"], config["cols"]
    icons = slice_grid_by_gaps(img, rows, cols)
    print(f"  切分为 {rows}x{cols} = {len(icons)} 个图标")

    category = config["category"]
    category_dir = os.path.join(output_dir, category)
    os.makedirs(category_dir, exist_ok=True)

    saved_files = []
    names = config["names"]

    for i, icon in enumerate(icons):
        if i >= len(names):
            break
        name = names[i]
        icon = center_on_canvas(icon, FINAL_SIZE)
        filename = f"{category}_{name}.png"
        output_path = os.path.join(category_dir, filename)
        icon.save(output_path, "PNG", optimize=True)
        saved_files.append(output_path)
        print(f"    [{i+1:02d}] {filename}")

    return saved_files


def main():
    print("=" * 50)
    print("AI 图标处理脚本 v3 (空白间隙检测)")
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
    print("=" * 50)
    return all_files


if __name__ == "__main__":
    os.chdir("/mnt/d/stylekit")
    main()
