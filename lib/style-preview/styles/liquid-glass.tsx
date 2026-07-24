import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <div className="p-4 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-xl">
        <button className="relative px-6 py-3 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[20px] text-white font-medium shadow-lg before:absolute before:inset-0 before:rounded-[20px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[19px] after:-z-10 after:bg-gradient-to-b after:from-white/20 after:to-transparent hover:bg-white/15 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500">
          Liquid Button
        </button>
      </div>
    ),
    card: () => (
      <div className="p-4 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-xl">
        <div className="relative p-6 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] shadow-xl before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10 after:bg-gradient-to-b after:from-white/15 after:to-transparent [box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]">
          <h3 className="font-semibold text-lg mb-2 text-white">Liquid Glass Card</h3>
          <p className="text-sm text-white/80">Apple WWDC 2025 style</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="p-4 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-xl">
        <input
          type="text"
          placeholder="Type here..."
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/20 rounded-[16px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-transparent focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)] transition-all duration-500"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Rainbow glow effects */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#ff6b6b]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#a855f7]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#4ecdc4]/15 rounded-full blur-2xl" />
        <div className="relative w-full max-w-[200px]">
          {/* Main card with rainbow border */}
          <div className="relative bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[20px] p-4 shadow-xl before:absolute before:inset-0 before:rounded-[20px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[19px] after:-z-10 after:bg-gradient-to-b after:from-white/20 after:to-transparent">
            <div className="font-semibold text-base mb-2 text-white">Liquid Glass</div>
            <p className="text-xs text-white/70 mb-3">WWDC 2025 Design</p>
            <div className="flex gap-2">
              <button className="relative flex-1 py-1.5 bg-white/10 rounded-[12px] text-white text-xs font-medium before:absolute before:inset-0 before:rounded-[12px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:to-[#a855f7]">
                Action
              </button>
              <div className="relative w-7 h-7 bg-white/15 rounded-full flex items-center justify-center before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#4ecdc4] before:to-[#a855f7]">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
