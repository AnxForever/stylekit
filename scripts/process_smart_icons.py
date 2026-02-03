#!/usr/bin/env python3
"""
智能分割：基于图标中心检测而不是间隙检测
"""

import os
from PIL import Image
import numpy as np
from scipy import ndimage

INPUT_FILE = "public/assets/Gemini_Generated_Image_v5700qv5700qv570.png"
OUTPUT_DIR = "public/assets/icons/function"
FINAL_SIZE = 512

ICON_NAMES = [
    "home", "settings", "search", "search-alt",
    "notification", "profile", "cart", "favorite",
    "share", "download", "upload", "edit"
]


def remove_green_background(img, threshold=150):
    img = img.convert("RGBA")
    data = np.array(img)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    green_mask = (g > threshold) & (r < 100) & (b < 100)
    data[:,:,3] = np.where(green_mask, 0, a)
    return Image.fromarray(data)


def find_icon_centers(alpha):
    """
    检测所有图标的中心点
    """
    # 二值化
    binary = (alpha > 20).astype(np.uint8)

    # 标记连通区域
    labeled, num_features = ndimage.label(binary)

    # 计算每个区域的中心
    centers = ndimage.center_of_mass(binary, labeled, range(1, num_features + 1))

    return np.array(centers) if centers else np.array([])


def assign_to_grid(centers, grid_rows=3, grid_cols=4):
    """
    将中心点分配到网格
    """
    if len(centers) == 0:
        return None

    # 按 y 坐标排序（行）
    sorted_by_y = centers[np.argsort(centers[:, 0])]

    # 分组到行
    grid_assignment = []
    row_size = len(centers) // grid_rows

    for row in range(grid_rows):
        if row == grid_rows - 1:
            row_centers = sorted_by_y[row * row_size:]
        else:
            row_centers = sorted_by_y[row * row_size:(row + 1) * row_size]

        # 按 x 坐标排序（列）
        sorted_by_x = row_centers[np.argsort(row_centers[:, 1])]

        for col, center in enumerate(sorted_by_x):
            grid_assignment.append((row, col, tuple(center)))

    return grid_assignment


def crop_around_center(img, center_y, center_x, size=450):
    """从中心点裁剪"""
    h, w = img.height, img.width
    half = size // 2

    left = max(0, int(center_x - half))
    top = max(0, int(center_y - half))
    right = min(w, left + size)
    bottom = min(h, top + size)

    return img.crop((left, top, right, bottom))


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
    print("智能分割：基于图标检测")
    print("=" * 50)

    if not os.path.exists(INPUT_FILE):
        print(f"错误：{INPUT_FILE}")
        return

    print(f"\n加载: {INPUT_FILE}")
    img = Image.open(INPUT_FILE).convert("RGBA")
    print(f"尺寸: {img.size}")

    print("去除绿色背景...")
    img = remove_green_background(img, threshold=150)

    print("检测图标中心...")
    data = np.array(img)
    alpha = data[:,:,3]

    centers = find_icon_centers(alpha)
    print(f"找到 {len(centers)} 个图标")

    if len(centers) != 12:
        print(f"警告：期望 12 个图标，但找到 {len(centers)} 个")

    # 分配到网格
    print("分配到网格...")
    grid_assignment = assign_to_grid(centers, grid_rows=3, grid_cols=4)

    print(f"\n切分为 3x4 = 12 个图标")
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for idx, (row, col, (center_y, center_x)) in enumerate(grid_assignment[:12]):
        if idx >= len(ICON_NAMES):
            break

        # 从中心裁剪
        cell = crop_around_center(img, center_y, center_x, size=450)
        cell = crop_to_content(cell, padding=5)
        cell = center_on_canvas(cell, FINAL_SIZE)

        name = ICON_NAMES[idx]
        filename = f"function_{name}.png"
        output_path = os.path.join(OUTPUT_DIR, filename)
        cell.save(output_path, "PNG", optimize=True)

        print(f"  [{idx+1:02d}] {filename} (grid: {row},{col})")

    print("\n" + "=" * 50)
    print(f"完成! {len(grid_assignment)} 个图标")
    print("=" * 50)


if __name__ == "__main__":
    os.chdir("/mnt/d/stylekit")
    main()
