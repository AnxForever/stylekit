import type { Animation } from "../types";

export const dragPhysics: Animation = {
  slug: "drag-physics",
  name: "拖拽物理",
  nameEn: "Drag Physics",
  description: "拖拽对象带有惯性、吸附或回弹，提升画布类工具的手感。",
  descriptionEn: "Dragged objects include inertia, snap, or spring-back behavior to improve canvas-like tools.",
  category: "pointer",
  tags: ["drag", "physics", "inertia", "pointer"],
  trigger: "manual",
  difficulty: "advanced",
  duration: "continuous",
  easing: "spring",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["drag physics", "inertia", "spring drag", "pointer capture"],
  useCases: ["Canvas tools", "Whiteboards", "Sortable cards"],
  relatedAnimations: ["elastic-snap", "magnetic-hover"],
  recommendedStyles: ["dashboard-layout", "data-dense", "soft-ui"],
  playgroundMode: "js-driven",
  intensity: "medium",
  input: "pointer-any",
  performanceNotes: "Use pointer capture, transform writes, and clamp boundaries before applying spring/inertia.",
  accessibilityNotes: "Provide keyboard alternatives for drag targets and announce reorder changes when relevant.",
  recommendedUseCases: ["Whiteboards", "Kanban cards", "Creative tools"],
  codeSnippets: [
    {
      label: "Pointer Capture",
      language: "tsx",
      code: `function onPointerDown(event: React.PointerEvent<HTMLElement>) {
  event.currentTarget.setPointerCapture(event.pointerId);
  // Store start pointer and element positions in refs.
}

function onPointerMove(event: React.PointerEvent<HTMLElement>) {
  if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
  // Write translate3d(x, y, 0), then snap or spring on release.
}`,
    },
  ],
};
