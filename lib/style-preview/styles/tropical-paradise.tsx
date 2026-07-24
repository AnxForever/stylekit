import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#fffde7] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-white border border-[#00897b]/20 rounded-2xl p-4">
          <div className="text-[#00897b] text-sm font-bold mb-2">Tropical Paradise</div>
          <p className="text-[#00897b]/60 text-xs mb-3">Vibrant island vibes</p>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#00897b]" />
            <div className="w-3 h-3 rounded-full bg-[#ff6f00]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
