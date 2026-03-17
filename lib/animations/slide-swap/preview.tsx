"use client";

import { useState } from "react";
import { PreviewContainer } from "../previews/_shared";

const steps = ["Step 1", "Step 2", "Step 3"];

export function SlideSwapPreview() {
  const [step, setStep] = useState(0);

  return (
    <PreviewContainer bg="light">
      <style>{`
        @keyframes slideSwapIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-swap-in {
          animation: slideSwapIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className="w-full max-w-sm">
        <div className="flex gap-2 mb-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-foreground" : "bg-muted"}`}
            />
          ))}
        </div>
        <div
          key={step}
          className="animate-slide-swap-in rounded-lg border border-border bg-background p-5"
        >
          <h4 className="text-sm font-medium text-foreground">{steps[step]}</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Content for {steps[step].toLowerCase()}. Click next to see the slide transition.
          </p>
        </div>
        <button
          onClick={() => setStep((s) => (s + 1) % steps.length)}
          className="mt-3 w-full rounded-lg bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          Next
        </button>
      </div>
    </PreviewContainer>
  );
}
