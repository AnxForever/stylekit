"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function FadeInUpPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="gradient">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 500ms ease-out forwards;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div
        key={key}
        className="animate-fade-in-up w-full max-w-sm rounded-lg border border-border bg-background p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-foreground">
          Notification
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your changes have been saved successfully. The deployment will begin
          shortly.
        </p>
      </div>
    </PreviewContainer>
  );
}
