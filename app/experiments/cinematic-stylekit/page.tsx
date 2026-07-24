import type { Metadata } from "next";
import { CinematicStylekitContent } from "./_content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "同一份 Brief，四种视觉答案 — StyleKit",
  description:
    "用同一份产品 Brief、同一个视觉主体，比较 Neo-Brutalist、Editorial、Glassmorphism 与 Japanese Fresh 四种可执行的前端方向。",
};

export default function CinematicStylekitPage() {
  return <CinematicStylekitContent />;
}
