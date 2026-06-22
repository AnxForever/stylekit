import type { Animation } from "../types";

export const cursorAura: Animation = {
  slug: "cursor-aura",
  name: "光晕指针",
  nameEn: "Cursor Aura",
  description: "在鼠标附近显示克制的柔和光晕，增强空间感但不替换系统光标。",
  descriptionEn: "A restrained soft aura follows the pointer to add depth without replacing the system cursor.",
  category: "pointer",
  tags: ["cursor", "aura", "ambient", "pointer"],
  trigger: "continuous",
  difficulty: "intermediate",
  duration: "continuous",
  easing: "lerp",
  cssProperties: ["transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["cursor aura", "custom cursor", "pointer follow", "ambient cursor"],
  useCases: ["Creative landing pages", "Interactive galleries", "Subtle desktop polish"],
  relatedAnimations: ["cursor-trail", "spotlight-card"],
  recommendedStyles: ["editorial", "holographic", "macos-vibrancy"],
  playgroundMode: "js-driven",
  intensity: "low",
  input: "pointer-fine",
  performanceNotes: "Track pointer coordinates in refs and write transform in requestAnimationFrame.",
  accessibilityNotes: "Do not hide the native cursor. Disable for reduced motion, coarse pointers, inputs, code blocks, and admin tools.",
  recommendedUseCases: ["Creative pages", "Gallery browsers", "Demo surfaces"],
  codeSnippets: [
    {
      label: "React Provider",
      language: "tsx",
      code: `"use client";

import { useEffect } from "react";

export function CursorAuraProvider() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const aura = document.createElement("div");
    aura.className = "cursor-aura";
    document.body.appendChild(aura);

    let raf = 0;
    let x = 0;
    let y = 0;
    const render = () => {
      raf = 0;
      aura.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      aura.remove();
    };
  }, []);

  return null;
}`,
    },
    {
      label: "CSS",
      language: "css",
      code: `.cursor-aura {
  position: fixed;
  left: 0;
  top: 0;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  translate: -50% -50%;
  pointer-events: none;
  background: radial-gradient(circle, rgb(255 255 255 / 0.18), transparent 62%);
  will-change: transform;
}`,
    },
  ],
};
