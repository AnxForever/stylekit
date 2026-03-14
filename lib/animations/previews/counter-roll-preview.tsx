"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

export function CounterRollPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <ReplayButton onReplay={replay} />
      <style>{`
        @keyframes counter-roll {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      <div className="flex items-baseline gap-1 font-mono text-3xl tabular-nums">
        {[0, 0.15, 0.3, 0.4, 0.5].map((d, i) => (
          <span key={`${key}-${i}`} className="inline-block overflow-hidden h-[1.2em]">
            <span
              className="inline-block"
              style={{
                animation: `counter-roll 2s cubic-bezier(0.16, 1, 0.3, 1) ${d}s both`,
              }}
            >
              {"98765"[i]}
            </span>
          </span>
        ))}
      </div>
    </PreviewContainer>
  );
}
