"use client";

import { useEffect, useRef } from "react";
import { PreviewContainer } from "./_shared";

export function RippleClickPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  // Auto-play ripple loop for demo
  useEffect(() => {
    const el = containerRef.current;
    const btn = btnRef.current;
    if (!el || !btn) return;

    let timer: ReturnType<typeof setInterval>;

    const spawnRipple = () => {
      const rect = btn.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      // Random position within button area
      const x = rect.left - elRect.left + Math.random() * rect.width;
      const y = rect.top - elRect.top + Math.random() * rect.height;
      const ripple = document.createElement("span");
      ripple.className = "sk-ripple-effect";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      el.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };

    timer = setInterval(spawnRipple, 1800);
    // Fire one immediately
    const initial = setTimeout(spawnRipple, 300);

    return () => {
      clearInterval(timer);
      clearTimeout(initial);
    };
  }, []);

  // Manual click also triggers ripple
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "sk-ripple-effect";
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  return (
    <PreviewContainer bg="light">
      <style>{`
        .sk-ripple-container {
          position: relative;
          overflow: hidden;
        }
        .sk-ripple-effect {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: translate(-50%, -50%) scale(0);
          animation: sk-ripple-expand 600ms ease-out forwards;
          pointer-events: none;
        }
        @keyframes sk-ripple-expand {
          to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
      `}</style>
      <div className="flex flex-col items-center gap-4">
        <div
          ref={containerRef}
          onClick={handleClick}
          className="sk-ripple-container px-10 py-4 bg-indigo-500 text-white text-sm cursor-pointer select-none"
        >
          <span ref={btnRef} className="relative z-10 pointer-events-none">Click me</span>
        </div>
        <span className="text-[10px] text-muted uppercase tracking-wider">Auto-playing / click to trigger</span>
      </div>
    </PreviewContainer>
  );
}
