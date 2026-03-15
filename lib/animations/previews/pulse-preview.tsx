"use client";

import { PreviewContainer } from "./_shared";

export function PulsePreview() {
  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes sk-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
        }
      `}</style>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full bg-red-500"
            style={{ animation: "sk-pulse 2s ease-in-out infinite" }}
          />
          <span className="text-xs text-muted">Recording</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
            style={{ animation: "sk-pulse 2s ease-in-out infinite 0.5s" }}
          >
            <span className="text-white text-[10px]">3</span>
          </div>
          <span className="text-xs text-muted">Notifications</span>
        </div>
      </div>
    </PreviewContainer>
  );
}
