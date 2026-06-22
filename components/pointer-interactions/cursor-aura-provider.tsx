"use client";

import { useEffect, useRef } from "react";

const EXCLUDED_SELECTOR = [
  "input",
  "textarea",
  "select",
  "button",
  "a",
  "pre",
  "code",
  "[inert]",
  "[contenteditable='true']",
  "[data-style-cover-preview]",
  "[data-cursor-aura='off']",
  ".admin-shell",
].join(",");

function shouldDisableForPath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.includes("/admin/");
}

export function CursorAuraProvider() {
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldDisableForPath(window.location.pathname)) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const aura = document.createElement("div");
    aura.className = "sk-cursor-aura";
    aura.setAttribute("aria-hidden", "true");
    document.body.appendChild(aura);
    document.body.classList.add("sk-cursor-hidden");
    auraRef.current = aura;

    let frame = 0;
    // lerp 跟随 (0.4): 光晕快跟手 + 微柔顺, 不僵硬贴住也不脱手。
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let visible = false;

    const loop = () => {
      frame = requestAnimationFrame(loop);
      current.x += (target.x - current.x) * 0.4;
      current.y += (target.y - current.y) * 0.4;
      aura.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      aura.style.opacity = visible ? "1" : "0";
    };
    const onMove = (event: PointerEvent) => {
      const t = event.target instanceof Element ? event.target : null;
      visible = Boolean(t && !t.closest(EXCLUDED_SELECTOR));
      target.x = event.clientX;
      target.y = event.clientY;
    };
    const hide = () => {
      visible = false;
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", hide, { passive: true });
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", hide);
      window.removeEventListener("blur", hide);
      window.cancelAnimationFrame(frame);
      aura.remove();
      document.body.classList.remove("sk-cursor-hidden");
      auraRef.current = null;
    };
  }, []);

  return null;
}
