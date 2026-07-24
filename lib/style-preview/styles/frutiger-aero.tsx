import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-[#8bd9ff] via-[#d8f6ff] to-[#9cebb2] flex items-center justify-center p-4">
        <div className="w-full max-w-[210px] bg-white/70 border border-white/80 rounded-2xl p-4 shadow-[0_14px_30px_rgba(59,130,246,0.2)] backdrop-blur">
          <div className="text-[#0f4f7a] text-sm font-semibold mb-2">Frutiger Aero</div>
          <p className="text-[#0f4f7a]/70 text-xs mb-3">Glossy, airy, optimistic</p>
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-[#4cc9f0]" />
            <div className="w-7 h-7 rounded-full bg-[#90e0ef]" />
            <div className="w-7 h-7 rounded-full bg-[#80ed99]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
