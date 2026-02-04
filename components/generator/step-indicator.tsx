"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : isCompleted
                    ? "bg-foreground text-background"
                    : "border-2 border-border text-muted"
                }`}
              >
                {isCompleted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`mt-2 text-xs tracking-wide ${
                  isActive ? "text-foreground" : "text-muted"
                }`}
              >
                {labels[step - 1]}
              </span>
            </div>

            {/* Connector line */}
            {step < totalSteps && (
              <div
                className={`w-12 md:w-24 h-0.5 mx-2 ${
                  isCompleted ? "bg-foreground" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
