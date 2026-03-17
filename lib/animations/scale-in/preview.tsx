"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function ScaleInPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="dark">
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 400ms ease-out forwards;
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div
        key={key}
        className="animate-scale-in w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-800 p-6 shadow-2xl"
      >
        <h3 className="text-base font-semibold text-white">
          Confirm Action
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          Are you sure you want to proceed? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button className="rounded bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </PreviewContainer>
  );
}
