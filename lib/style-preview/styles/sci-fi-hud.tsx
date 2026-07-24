import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-transparent text-[#06B6D4] font-mono border border-[#06B6D4]/60 shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:bg-[#06B6D4]/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all uppercase tracking-widest text-sm">
        ACTIVATE
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#020617]/90 border border-[#06B6D4]/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        <h3 className="font-mono text-[#22D3EE] text-lg mb-2 uppercase tracking-wider">System Status</h3>
        <p className="font-mono text-[#06B6D4]/70 text-sm">All systems operational</p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="Enter command..."
        className="w-full px-4 py-3 bg-[#020617]/80 border border-[#06B6D4]/40 text-[#22D3EE] font-mono placeholder:text-[#06B6D4]/30 focus:outline-none focus:border-[#06B6D4] focus:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#020617] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <div className="bg-[#020617]/90 border border-[#06B6D4]/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] p-4">
            <div className="font-mono text-[#22D3EE] text-xs uppercase tracking-widest mb-3">SYS // HUD</div>
            <div className="h-px bg-[#06B6D4]/30 mb-3" />
            <p className="font-mono text-[#06B6D4]/60 text-xs mb-3">All systems nominal</p>
            <button className="text-[#06B6D4] text-xs font-mono px-3 py-1.5 border border-[#06B6D4]/50 shadow-[0_0_8px_rgba(6,182,212,0.2)] uppercase tracking-wider">
              ENGAGE
            </button>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
