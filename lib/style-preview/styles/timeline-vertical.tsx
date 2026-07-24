import type { StylePreviewComponents } from "../types";

const preview = {
    coverPreview: () => (
      // Editorial 风格 - 衬线字体、红色强调
      <div className="w-full h-full bg-[#fafafa] flex items-center justify-center p-4">
        <div className="w-full max-w-[180px] relative">
          {/* Central line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
          {/* Timeline items */}
          <div className="space-y-3">
            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1 w-3 h-3 bg-[#e63946] rounded-full border-2 border-[#fafafa]" />
              <div className="bg-white p-2 border border-gray-200">
                <div className="text-[10px] font-semibold text-[#e63946]">2024</div>
                <div className="text-xs font-serif italic text-[#0a0a0a]">Event A</div>
              </div>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-[#fafafa]" />
              <div className="bg-white p-2 border border-gray-200">
                <div className="text-[10px] font-semibold text-gray-500">2023</div>
                <div className="text-xs font-serif italic text-[#0a0a0a]">Event B</div>
              </div>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-1.5 top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-[#fafafa]" />
              <div className="bg-white p-2 border border-gray-200">
                <div className="text-[10px] font-semibold text-gray-500">2022</div>
                <div className="text-xs font-serif italic text-[#0a0a0a]">Event C</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
