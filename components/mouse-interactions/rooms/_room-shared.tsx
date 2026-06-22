"use client";

/**
 * Cursor Lab — 风格驱动的鼠标交互实验室 (共享入口)
 *
 * 三个房间 (Neo-Brutalist / Glassmorphism / Editorial) 各自内联 rAF 调度,
 * 遵循项目既有模式 (见 lib/animations/magnetic-hover/preview.tsx 与
 * components/pointer-interactions/magnetic-target.tsx): 事件处理更新 ref,
 * requestAnimationFrame 里集中写 transform, 同帧只写一次。
 *
 * 共享守卫来自 @/components/pointer-interactions (同层, 非反向依赖):
 *  - usePointerInteractionEnabled = pointer-fine && !reduced-motion
 *  - 桌面增强 (磁吸 / zone 光标 / 光晕跟随) 仅在 enabled 时跑
 *  - 拖拽对所有指针开放 (触屏可拖), 惯性仅 !reduced-motion
 *
 * 设计依据见 motion.dev (magnetic + zoning, 2025) 与
 * 100daysofcraft (magnetic cursor that feels good, 2025)。
 */

export type { RoomProps } from "./types";
export {
  usePointerFine,
  useReducedMotion,
  usePointerInteractionEnabled,
} from "@/components/pointer-interactions";
