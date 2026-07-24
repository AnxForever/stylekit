import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <div className="p-4 rounded-xl bg-[#0B1322] [background-image:radial-gradient(120px_circle_at_80%_20%,rgba(124,156,196,0.35),transparent_65%)]">
        <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-2xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-white/15 hover:border-white/35 transition-all">
          点击按钮
        </button>
      </div>
    ),
    card: () => (
      <div className="p-4 rounded-xl bg-[#0B1322] [background-image:radial-gradient(140px_circle_at_85%_15%,rgba(124,156,196,0.3),transparent_65%),radial-gradient(120px_circle_at_10%_90%,rgba(51,81,122,0.35),transparent_65%)]">
        <div className="p-6 bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
          <h3 className="font-semibold text-lg mb-2 text-white">Nocturne Glass</h3>
          <p className="text-sm text-white/60">夜景毛玻璃，玻璃只借光不带色</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="p-4 rounded-xl bg-[#0B1322] [background-image:radial-gradient(120px_circle_at_20%_20%,rgba(228,184,99,0.18),transparent_60%)]">
        <input
          type="text"
          placeholder="输入内容..."
          className="w-full px-4 py-3 bg-white/6 backdrop-blur-md rounded-2xl border border-white/15 text-white placeholder-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] focus:outline-none focus:border-white/35"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0B1322] [background-image:radial-gradient(180px_circle_at_85%_10%,rgba(124,156,196,0.32),transparent_60%),radial-gradient(160px_circle_at_8%_90%,rgba(51,81,122,0.35),transparent_60%),radial-gradient(120px_circle_at_35%_45%,rgba(228,184,99,0.12),transparent_55%)] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 p-4 shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]">
            <div className="font-semibold text-base mb-2 text-white">Nocturne Glass</div>
            <p className="text-xs text-white/60 mb-3">玻璃无色，色彩属于夜景</p>
            <div className="flex gap-2">
              <button className="bg-[#E4B863]/15 text-[#F3DCA8] text-xs font-medium px-4 py-2 rounded-lg border border-[#E4B863]/40">
                Button
              </button>
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#7C9CC4] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
