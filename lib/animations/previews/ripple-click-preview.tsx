"use client";

import { useRef, useCallback } from "react";
import { PreviewContainer } from "./_shared";

export function RippleClickPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  return (
    <PreviewContainer bg="light">
      <style>{`
        .ripple-btn {
          position: relative;
          overflow: hidden;
        }
        .ripple-effect {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.35);
          transform: translate(-50%, -50%) scale(0);
          animation: ripple-expand 600ms ease-out forwards;
          pointer-events: none;
        }
        @keyframes ripple-expand {
          to {
            transform: translate(-50%, -50%) scale(12);
            opacity: 0;
          }
        }
      `}</style>
      <div className="flex flex-col items-center gap-3">
        <div
          ref={containerRef}
          onClick={handleClick}
          className="ripple-btn px-8 py-3 bg-indigo-500 text-white text-sm cursor-pointer select-none"
        >
          Click me
        </div>
        <span className="text-[10px] text-muted uppercase tracking-wider">Click to see ripple</span>
      </div>
    </PreviewContainer>
  );
}
