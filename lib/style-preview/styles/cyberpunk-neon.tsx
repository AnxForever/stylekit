import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:bg-cyan-400/10 transition-all duration-300 font-mono uppercase tracking-wider">
        Initialize
      </button>
    ),
    card: () => (
      <div className="bg-gray-950 border border-cyan-400/30 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,255,0.2)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
            <h3 className="text-cyan-400 font-mono uppercase tracking-wider text-sm">System</h3>
          </div>
          <h4 className="text-white text-xl font-bold mb-3" style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>Cyberpunk</h4>
          <p className="text-gray-400 leading-relaxed">赛博朋克霓虹风格</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="relative">
        <input
          type="text"
          placeholder="Enter credentials..."
          className="w-full px-4 py-3 bg-gray-950 border border-cyan-400/30 rounded-lg text-cyan-400 font-mono placeholder:text-cyan-400/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-gray-950 border border-cyan-400/30 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-wider">System</span>
              </div>
              <div className="text-white font-bold text-sm mb-2" style={{textShadow: '0 0 10px rgba(0,255,255,0.5)'}}>Cyberpunk</div>
              <p className="text-gray-500 text-xs mb-3">霓虹发光效果</p>
              <button className="bg-transparent border border-cyan-400 text-cyan-400 text-[10px] font-mono uppercase px-3 py-1.5 rounded shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                Execute
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
