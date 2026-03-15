"use client";

import { PreviewContainer } from "./_shared";

export function MorphTransitionPreview() {
  return (
    <PreviewContainer bg="gradient">
      <style>{`
        @keyframes morphTransition {
          0%, 100% {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: #6366f1;
          }
          50% {
            width: 120px;
            height: 40px;
            border-radius: 12px;
            background-color: #ec4899;
          }
        }
        .animate-morph-transition {
          animation: morphTransition 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      <div className="animate-morph-transition shadow-lg" />
    </PreviewContainer>
  );
}
