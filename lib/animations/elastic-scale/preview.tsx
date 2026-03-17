"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function ElasticScalePreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="gradient">
      <style>{`
        @keyframes elasticScale {
          0% { opacity: 0; transform: scale(0); }
          40% { opacity: 1; transform: scale(1.16); }
          60% { transform: scale(0.92); }
          75% { transform: scale(1.05); }
          90% { transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-elastic-scale {
          animation: elasticScale 800ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div key={key} className="flex gap-4">
        <div
          className="animate-elastic-scale flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg"
        >
          <span className="text-2xl font-bold">!</span>
        </div>
        <div
          className="animate-elastic-scale flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg"
          style={{ animationDelay: "150ms" }}
        >
          <span className="text-lg font-bold">OK</span>
        </div>
      </div>
    </PreviewContainer>
  );
}
