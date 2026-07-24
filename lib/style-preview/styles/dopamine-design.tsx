import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a0a2e] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-2 left-3 w-20 h-20 rounded-full bg-[#ff006e]/20 blur-xl" />
        <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-[#3a86ff]/15 blur-xl" />
        <div className="w-full max-w-[200px] relative">
          <div className="rounded-2xl bg-[#ff006e] p-4 mb-2 shadow-lg">
            <div className="h-2 w-16 rounded bg-white/30 mb-2" />
            <div className="h-1.5 w-10 rounded bg-white/15" />
          </div>
          <div className="flex gap-1.5 justify-center">
            <div className="w-8 h-8 rounded-lg bg-[#ff006e]" />
            <div className="w-8 h-8 rounded-lg bg-[#8338ec]" />
            <div className="w-8 h-8 rounded-lg bg-[#ffbe0b]" />
            <div className="w-8 h-8 rounded-lg bg-[#3a86ff]" />
            <div className="w-8 h-8 rounded-lg bg-[#06d6a0]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
