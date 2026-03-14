"use client";

import { PreviewContainer } from "./_shared";

export function TextGradientFlowPreview() {
  return (
    <PreviewContainer bg="dark">
      <style>{`
        @keyframes textGradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .text-gradient-flow-demo {
          background: linear-gradient(270deg, #6366f1, #ec4899, #8b5cf6, #06b6d4, #6366f1);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGradientFlow 3s linear infinite;
        }
      `}</style>
      <div className="text-center">
        <h2 className="text-gradient-flow-demo text-3xl font-bold tracking-tight">
          Beautiful Gradients
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Text with flowing gradient colors
        </p>
      </div>
    </PreviewContainer>
  );
}
