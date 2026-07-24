import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#c9a96e]/30 bg-[#1a1a1a] p-4">
          <div className="h-px bg-[#c9a96e]/40 mb-3" />
          <div className="h-2 w-20 rounded bg-[#faf9f6]/80 mb-2 mx-auto" />
          <div className="h-1.5 w-28 rounded bg-[#faf9f6]/30 mb-3 mx-auto" />
          <div className="h-7 w-24 mx-auto border border-[#c9a96e]/50 flex items-center justify-center">
            <div className="h-1.5 w-12 rounded bg-[#c9a96e]/70" />
          </div>
          <div className="h-px bg-[#c9a96e]/40 mt-3" />
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
