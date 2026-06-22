import type { Animation } from "../types";

export const contextCursor: Animation = {
  slug: "context-cursor",
  name: "上下文光标",
  nameEn: "Context Cursor",
  description: "根据不同区域显示简短状态提示，例如拖拽、查看、复制或禁用。",
  descriptionEn: "Shows a compact status cue near the pointer depending on the hovered region: drag, view, copy, or disabled.",
  category: "pointer",
  tags: ["cursor", "context", "status", "feedback"],
  trigger: "on-hover",
  difficulty: "intermediate",
  duration: "continuous",
  easing: "ease-out",
  cssProperties: ["transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["context cursor", "cursor label", "pointer status", "hover hint"],
  useCases: ["Media galleries", "Canvas tools", "Interactive demos"],
  relatedAnimations: ["cursor-aura", "proximity-reveal"],
  recommendedStyles: ["data-dense", "sci-fi-hud", "linear-style"],
  playgroundMode: "js-driven",
  intensity: "medium",
  input: "pointer-fine",
  performanceNotes: "Use event delegation with data-cursor labels and a single floating node.",
  accessibilityNotes: "Treat cursor labels as supplemental only; visible controls and ARIA labels still need real names.",
  recommendedUseCases: ["Gallery controls", "Canvas modes", "Inspection tools"],
  codeSnippets: [
    {
      label: "Markup",
      language: "tsx",
      code: `<button data-cursor="Copy">Copy token</button>
<a data-cursor="Open" href="/demo">Open demo</a>`,
    },
    {
      label: "Event Delegation",
      language: "tsx",
      code: `const target = event.target instanceof Element
  ? event.target.closest<HTMLElement>("[data-cursor]")
  : null;

cursorLabel.textContent = target?.dataset.cursor ?? "";`,
    },
  ],
};
