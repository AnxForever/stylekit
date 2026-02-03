#!/usr/bin/env python3
"""
修复图标尺寸一致性和居中问题
"""

import os
from PIL import Image
import numpy as np

ICON_DIR = "public/assets/icons/function"
FINAL_SIZE = 512
TARGET_ICON_SIZE = 380  # 图标目标尺寸


def ensure_square_canvas(img, size=FINAL_SIZE):
    """确保图片是正方形"""
    if img.width == size and img.height == size:
        return img

    # 创建正方形透明画布
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # 计算居中位置
    x = (size - img.width) // 2
    y = (size - img.height) // 2

    canvas.paste(img, (x, y), img)
    return canvas


def crop_and_center(img, target_size=TARGET_ICON_SIZE):
    """先裁剪到内容，再在目标尺寸内居中"""
    # 裁剪到内容
    bbox = img.getbbox()
    if bbox is None:
        return ensure_square_canvas(img)

    left, top, right, bottom = bbox
    # 加入padding
    padding = 5
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)

    cropped = img.crop((left, top, right, bottom))

    # 等比缩放到目标尺寸
    max_dim = max(cropped.width, cropped.height)
    if max_dim > target_size:
        scale = target_size / max_dim
        new_w = int(cropped.width * scale)
        new_h = int(cropped.height * scale)
        cropped = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # 在512x512画布上居中
    return ensure_square_canvas(cropped, FINAL_SIZE)


def main():
    print("修复图标尺寸和居中...")
    print(f"处理目录: {ICON_DIR}")

    for filename in sorted(os.listdir(ICON_DIR)):
        if not filename.endswith('.png'):
            continue

        filepath = os.path.join(ICON_DIR, filename)
        img = Image.open(filepath).convert("RGBA")

        # 修复
        fixed = crop_and_center(img)
        fixed.save(filepath, "PNG", optimize=True)

        # 检查尺寸
        print(f"✓ {filename} -> {fixed.size}")

    print("完成！所有图标已统一为 512x512，内容居中")


if __name__ == "__main__":
    os.chdir("/mnt/d/stylekit")
    main()
