"use client";

import { PreviewContainer } from "./_shared";

export function GlitchTextPreview() {
  return (
    <PreviewContainer bg="dark">
      <style>{`
        @keyframes glitchText {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(40% 0 20% 0); transform: translate(2px, -1px); }
          60% { clip-path: inset(60% 0 10% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(1px, -2px); }
        }
        .glitch-text-demo {
          position: relative;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: white;
        }
        .glitch-text-demo::before,
        .glitch-text-demo::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
        }
        .glitch-text-demo::before {
          color: #ff00ff;
          animation: glitchText 3s steps(2, end) infinite;
          mix-blend-mode: screen;
        }
        .glitch-text-demo::after {
          color: #00ffff;
          animation: glitchText 3s steps(2, end) 150ms infinite reverse;
          mix-blend-mode: screen;
        }
      `}</style>
      <span className="glitch-text-demo" data-text="GLITCH">GLITCH</span>
    </PreviewContainer>
  );
}
