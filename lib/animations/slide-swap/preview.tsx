"use client";

import { useEffect, useRef, useState } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

const steps = ["Step 1", "Step 2", "Step 3"];

function StepCard({ step }: { step: number }) {
  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <h4 className="text-sm font-medium text-foreground">{steps[step]}</h4>
      <p className="mt-2 text-xs text-muted-foreground">
        Content for {steps[step].toLowerCase()}. Click next to see the slide transition.
      </p>
    </div>
  );
}

export function SlideSwapPreview() {
  const [step, setStep] = useState(0);
  const [exitingStep, setExitingStep] = useState<number | null>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const exitingRef = useRef<HTMLDivElement>(null);
  const activeAnimationRef = useRef<AnimeAnimation | null>(null);
  const exitingAnimationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    const active = activeRef.current;
    if (!active || prefersReducedMotion()) return;

    const activeElement = active;
    let cancelled = false;

    async function runSwap() {
      const { animate } = await loadAnime();
      if (cancelled || activeRef.current !== activeElement) return;

      activeAnimationRef.current?.cancel();
      activeAnimationRef.current = animate(activeElement, {
        x: [30, 0],
        opacity: [0, 1],
        duration: 400,
        ease: "out(4)",
      });

      const exiting = exitingRef.current;
      if (!exiting) return;

      exitingAnimationRef.current?.cancel();
      const exitingAnimation = animate(exiting, {
        x: [0, -30],
        opacity: [1, 0],
        duration: 400,
        ease: "out(4)",
        onComplete: () => {
          if (exitingAnimationRef.current === exitingAnimation) {
            setExitingStep(null);
            exitingAnimationRef.current = null;
          }
        },
      });
      exitingAnimationRef.current = exitingAnimation;
    }

    void runSwap();

    return () => {
      cancelled = true;
    };
  }, [step, exitingStep]);

  useEffect(() => {
    return () => {
      activeAnimationRef.current?.cancel();
      exitingAnimationRef.current?.cancel();
    };
  }, []);

  const goNext = () => {
    const nextStep = (step + 1) % steps.length;

    if (prefersReducedMotion()) {
      setExitingStep(null);
      setStep(nextStep);
      return;
    }

    if (exitingStep !== null) return;

    setExitingStep(step);
    setStep(nextStep);
  };

  return (
    <PreviewContainer bg="light">
      <div className="w-full max-w-sm">
        <div className="mb-3 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-foreground" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <div className="relative min-h-[112px] overflow-hidden">
          {exitingStep !== null && (
            <div
              ref={exitingRef}
              className="absolute inset-0 will-change-[transform,opacity]"
              aria-hidden="true"
            >
              <StepCard step={exitingStep} />
            </div>
          )}
          <div ref={activeRef} className="relative will-change-[transform,opacity]">
            <StepCard step={step} />
          </div>
        </div>
        <button
          type="button"
          onClick={goNext}
          className="mt-3 w-full rounded-lg bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          Next
        </button>
      </div>
    </PreviewContainer>
  );
}
