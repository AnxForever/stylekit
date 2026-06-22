"use client";

import { PreviewContainer } from "../previews/_shared";

export function ProximityRevealPreview() {
  return (
    <PreviewContainer bg="light">
      <div className="group flex w-72 items-center justify-between border border-zinc-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-sm font-medium text-zinc-900">Design token</p>
          <p className="text-xs text-zinc-500">--color-accent</p>
        </div>
        <div className="flex translate-y-1 gap-1 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button className="border border-zinc-200 px-2 py-1 text-xs">Copy</button>
          <button className="border border-zinc-200 px-2 py-1 text-xs">Edit</button>
        </div>
      </div>
    </PreviewContainer>
  );
}
