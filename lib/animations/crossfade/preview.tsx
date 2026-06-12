"use client";

import { useEffect, useRef, useState } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

const tabs = ["Profile", "Settings"];

function TabPanel({ active }: { active: number }) {
  return active === 0 ? (
    <div className="space-y-2 rounded-b-lg border-x border-b border-border bg-background p-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-500/20" />
        <div className="text-sm font-medium text-foreground">John Doe</div>
      </div>
      <p className="text-xs text-muted-foreground">Frontend Developer</p>
    </div>
  ) : (
    <div className="space-y-2 rounded-b-lg border-x border-b border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Dark mode</span>
        <div className="h-5 w-9 rounded-full bg-muted" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Notifications</span>
        <div className="h-5 w-9 rounded-full bg-blue-500" />
      </div>
    </div>
  );
}

export function CrossfadePreview() {
  const [active, setActive] = useState(0);
  const [exitingActive, setExitingActive] = useState<number | null>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const exitingRef = useRef<HTMLDivElement>(null);
  const activeAnimationRef = useRef<AnimeAnimation | null>(null);
  const exitingAnimationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    const activePanel = activeRef.current;
    if (!activePanel || prefersReducedMotion()) return;

    const activeElement = activePanel;
    let cancelled = false;

    async function runFade() {
      const { animate } = await loadAnime();
      if (cancelled || activeRef.current !== activeElement) return;

      activeAnimationRef.current?.cancel();
      activeAnimationRef.current = animate(activeElement, {
        opacity: [0, 1],
        duration: 500,
        ease: "inOut(2)",
      });

      const exitingPanel = exitingRef.current;
      if (!exitingPanel) return;

      exitingAnimationRef.current?.cancel();
      const exitingAnimation = animate(exitingPanel, {
        opacity: [1, 0],
        duration: 500,
        ease: "inOut(2)",
        onComplete: () => {
          if (exitingAnimationRef.current === exitingAnimation) {
            setExitingActive(null);
            exitingAnimationRef.current = null;
          }
        },
      });
      exitingAnimationRef.current = exitingAnimation;
    }

    void runFade();

    return () => {
      cancelled = true;
    };
  }, [active, exitingActive]);

  useEffect(() => {
    return () => {
      activeAnimationRef.current?.cancel();
      exitingAnimationRef.current?.cancel();
    };
  }, []);

  const selectTab = (nextActive: number) => {
    if (nextActive === active) return;

    if (prefersReducedMotion()) {
      setExitingActive(null);
      setActive(nextActive);
      return;
    }

    if (exitingActive !== null) return;

    setExitingActive(active);
    setActive(nextActive);
  };

  return (
    <PreviewContainer bg="light">
      <div className="w-full max-w-sm">
        <div className="flex gap-1 border-b border-border">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => selectTab(i)}
              className={`px-4 py-2 text-sm transition-colors ${
                active === i
                  ? "border-b-2 border-foreground font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative min-h-[96px] overflow-hidden">
          {exitingActive !== null && (
            <div
              ref={exitingRef}
              className="absolute inset-0 will-change-opacity"
              aria-hidden="true"
            >
              <TabPanel active={exitingActive} />
            </div>
          )}
          <div ref={activeRef} className="relative will-change-opacity">
            <TabPanel active={active} />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
