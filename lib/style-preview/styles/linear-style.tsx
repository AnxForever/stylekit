import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] border border-[#2a2a3e] bg-[#14141f] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded bg-[#5e6ad2]/80" />
            <div className="h-2 w-14 rounded bg-[#e0e0e8]/50" />
          </div>
          <div className="h-px bg-[#2a2a3e] mb-3" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full border border-[#5e6ad2]/60" />
              <div className="h-1.5 w-24 rounded bg-[#e0e0e8]/30" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5e6ad2]/30 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#5e6ad2]" />
              </div>
              <div className="h-1.5 w-20 rounded bg-[#e0e0e8]/20" />
              <div className="h-3 px-1.5 rounded bg-[#3b9b6d]/15 flex items-center">
                <span className="text-[6px] text-[#3b9b6d]/70">done</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full border border-[#f2c94c]/40" />
              <div className="h-1.5 w-28 rounded bg-[#e0e0e8]/20" />
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
