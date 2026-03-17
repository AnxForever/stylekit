"use client";

import { PreviewContainer } from "../previews/_shared";

export function BackgroundGradientShiftPreview() {
  return (
    <PreviewContainer bg="dark">
      <style>{`
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div
        className="w-full max-w-sm h-40 rounded-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "400% 400%",
          animation: "bgShift 8s ease infinite",
        }}
      >
        <span className="text-white font-semibold text-lg drop-shadow-md">
          Dynamic Background
        </span>
      </div>
    </PreviewContainer>
  );
}
