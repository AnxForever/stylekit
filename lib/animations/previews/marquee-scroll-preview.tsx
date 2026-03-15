"use client";

import { PreviewContainer } from "./_shared";

export function MarqueeScrollPreview() {
  const items = ["StyleKit", "Animations", "CSS Patterns", "Tailwind", "Framer Motion", "React"];

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes sk-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="w-full max-w-sm overflow-hidden">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: "sk-marquee 12s linear infinite" }}
        >
          {[...items, ...items].map((item, i) => (
            <span key={i} className="text-sm text-muted shrink-0">{item}</span>
          ))}
        </div>
      </div>
    </PreviewContainer>
  );
}
