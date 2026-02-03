#!/usr/bin/env python3
"""
改进版本：使用更智能的分割线检测
"""

import os
from PIL import Image
import numpy as np

INPUT_FILE = "public/assets/Gemini_Generated_Image_v5700qv5700qv570.png"
OUTPUT_DIR = "public/assets/icons/function"
FINAL_SIZE = 512

ICON_NAMES = [
    "home", "settings", "search",
    "notification", "profile", "cart",
    "favorite", "share", "download",
    "upload", "edit", "calendar"
]


def remove_green_background(img, threshold=150):
    """去除绿幕背景"""
    img = img.convert("RGBA")
    data = np.array(img)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    green_mask = (g > threshold) & (r < 100) & (b < 100)
    data[:,:,3] = np.where(green_mask, 0, a)
    return Image.fromarray(data)


def find_split_lines_uniform(length: int, num_splits: int) -> list:
    """
    使用均匀分割，不依赖间隙检测
    """
    splits = [int(i * length / num_splits) for i in range(num_splits + 1)]
    return splits


def crop_to_content(img: Image.Image, padding: int = 5) -> Image.Image:
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


def main():
    print("=" * 50)
    print("处理功能图标 (4行3列)")
    print("=" * 50)

    if not os.path.exists(INPUT_FILE):
        print(f"错误：{INPUT_FILE}")
        return

    print(f"\n加载: {INPUT_FILE}")
    img = Image.open(INPUT_FILE).convert("RGBA")
    print(f"尺寸: {img.size}")

    print("去除绿色背景...")
    img = remove_green_background(img, threshold=150)

    print("检测分割线...")
    data = np.array(img)
    alpha = data[:,:,3]

    # 4行3列
    col_splits = find_split_lines_uniform(img.width, 3)
    row_splits = find_split_lines_uniform(img.height, 4)

    print(f"列分割点: {col_splits}")
    print(f"行分割点: {row_splits}")

    print(f"\n切分为 4x3 = 12 个图标")
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    icon_idx = 0
    for row in range(4):
        for col in range(3):
            if icon_idx >= len(ICON_NAMES):
                break

            left = col_splits[col]
            right = col_splits[col + 1]
            top = row_splits[row]
            bottom = row_splits[row + 1]

            cell = img.crop((left, top, right, bottom))
            cell = crop_to_content(cell, padding=5)
            cell = center_on_canvas(cell, FINAL_SIZE)

            name = ICON_NAMES[icon_idx]
            filename = f"function_{name}.png"
            output_path = os.path.join(OUTPUT_DIR, filename)
            cell.save(output_path, "PNG", optimize=True)

            print(f"  [{icon_idx+1:02d}] {filename}")
            icon_idx += 1

    print("\n" + "=" * 50)
    print(f"完成! 4行3列 = {icon_idx} 个图标")
    print("=" * 50)


if __name__ == "__main__":
    os.chdir("/mnt/d/stylekit")
    main()
