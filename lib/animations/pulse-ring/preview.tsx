"use client";

import { PreviewContainer } from "../previews/_shared";

export function PulseRingPreview() {
  return (
    <PreviewContainer bg="dark">
      <style>{`
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes pulseRingBlue {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        @keyframes pulseRingRed {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .animate-pulse-ring-green {
          animation: pulseRing 2s ease-out infinite;
        }
        .animate-pulse-ring-blue {
          animation: pulseRingBlue 2s ease-out infinite;
        }
        .animate-pulse-ring-red {
          animation: pulseRingRed 2s ease-out infinite;
        }
      `}</style>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="animate-pulse-ring-green h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm text-zinc-300">Online</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="animate-pulse-ring-blue h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-sm text-zinc-300">Live</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="animate-pulse-ring-red h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm text-zinc-300">Alert</span>
        </div>
      </div>
    </PreviewContainer>
  );
}
