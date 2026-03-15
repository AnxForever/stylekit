"use client";

import { PreviewContainer } from "./_shared";

export function BorderTracePreview() {
  return (
    <PreviewContainer bg="dark">
      <style>{`
        .border-trace-demo {
          position: relative;
          padding: 24px 32px;
        }
        .border-trace-demo svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .border-trace-demo rect {
          fill: none;
          stroke: #6366f1;
          stroke-width: 2;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 600ms ease-in-out;
        }
        .border-trace-demo:hover rect {
          stroke-dashoffset: 0;
        }
      `}</style>
      <div className="border-trace-demo cursor-pointer">
        <svg>
          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="8" />
        </svg>
        <span className="text-sm text-zinc-300">Hover me</span>
      </div>
    </PreviewContainer>
  );
}
