"use client";

import { useRef, useState } from "react";
import { PreviewContainer } from "./_shared";

export function MagneticHoverPreview() {
  const ref = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setTransform(`translate(${x}px, ${y}px)`);
  };

  const reset = () => setTransform("");

  return (
    <PreviewContainer bg="light">
      <div className="flex gap-6 items-center">
        <button
          ref={ref}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          className="px-6 py-3 bg-foreground text-background text-sm font-medium transition-transform duration-200 ease-out will-change-transform"
          style={{ transform }}
        >
          Hover me
        </button>
        <span className="text-xs text-muted">Move cursor slowly</span>
      </div>
    </PreviewContainer>
  );
}
