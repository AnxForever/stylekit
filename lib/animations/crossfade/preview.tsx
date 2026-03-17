"use client";

import { useState } from "react";
import { PreviewContainer } from "../previews/_shared";

const tabs = ["Profile", "Settings"];

export function CrossfadePreview() {
  const [active, setActive] = useState(0);

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes crossfadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-crossfade-in {
          animation: crossfadeIn 500ms ease-in-out forwards;
        }
      `}</style>
      <div className="w-full max-w-sm">
        <div className="flex gap-1 border-b border-border">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm transition-colors ${active === i ? "border-b-2 border-foreground font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div key={active} className="animate-crossfade-in rounded-b-lg border-x border-b border-border bg-background p-4">
          {active === 0 ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-500/20" />
                <div className="text-sm font-medium text-foreground">John Doe</div>
              </div>
              <p className="text-xs text-muted-foreground">Frontend Developer</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Dark mode</span>
                <div className="h-5 w-9 rounded-full bg-muted" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Notifications</span>
                <div className="h-5 w-9 rounded-full bg-blue-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewContainer>
  );
}
