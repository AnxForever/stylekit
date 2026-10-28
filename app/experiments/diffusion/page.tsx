import type { Metadata } from "next";

import { DiffusionLab } from "./_content";

export const metadata: Metadata = {
  title: "扩散语言模型演示",
  description:
    "Mercury 3 的实时去噪轨迹：看着一段文字从噪声中逐帧浮现，每个字符标出自己被改写的次数。",
  robots: { index: false, follow: false },
};

export default function DiffusionLabPage() {
  return <DiffusionLab />;
}
