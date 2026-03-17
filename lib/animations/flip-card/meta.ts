import type { AnimationMeta } from "../types";

export const flipCardMeta: AnimationMeta = {
  slug: "flip-card",
  name: "3D 卡片翻转",
  nameEn: "Flip Card",
  description:
    "卡片沿 Y 轴进行 3D 翻转，显示背面内容，需要透视容器和 backface-visibility 控制。",
  category: "hover",
  tags: ["flip", "3d", "card", "hover", "perspective"],
  trigger: "on-hover",
  difficulty: "advanced",
  duration: "600ms",
  keywords: [
    "flip",
    "card",
    "3d",
    "rotate",
    "perspective",
    "backface",
    "two-sided",
  ],
};
