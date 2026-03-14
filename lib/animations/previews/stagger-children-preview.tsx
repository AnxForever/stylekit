"use client";

import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

const items = ["Design System", "Components", "Animations", "Tokens", "Themes"];

export function StaggerChildrenPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes staggerFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger-demo > *:nth-child(1) { animation: staggerFadeIn 500ms cubic-bezier(0.16,1,0.3,1) 0ms both; }
        .stagger-demo > *:nth-child(2) { animation: staggerFadeIn 500ms cubic-bezier(0.16,1,0.3,1) 75ms both; }
        .stagger-demo > *:nth-child(3) { animation: staggerFadeIn 500ms cubic-bezier(0.16,1,0.3,1) 150ms both; }
        .stagger-demo > *:nth-child(4) { animation: staggerFadeIn 500ms cubic-bezier(0.16,1,0.3,1) 225ms both; }
        .stagger-demo > *:nth-child(5) { animation: staggerFadeIn 500ms cubic-bezier(0.16,1,0.3,1) 300ms both; }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div key={key} className="stagger-demo w-full max-w-xs space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-md border border-border bg-background p-3"
          >
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </PreviewContainer>
  );
}
