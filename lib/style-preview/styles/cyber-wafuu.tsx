import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1e3a5f] text-[#c9a227] font-bold tracking-wide border border-[#c41e3a] hover:bg-[#c41e3a] hover:text-white transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0a0a14] border border-[#1e3a5f]">
        <h3 className="font-bold text-xl text-[#c9a227] mb-2">Cyber Wafuu Card</h3>
        <p className="text-sm text-[#38bdf8]">Digital tradition</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Input..." className="w-full px-4 py-3 bg-[#0a0a14] border border-[#1e3a5f] text-[#c9a227] placeholder-[#c9a227]/40 focus:outline-none focus:border-[#c41e3a] transition-colors" />
    ),
    // Cover archetype: app shell. Torii and wave pattern live in the sidebar and
    // header of a working tool screen.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0a0a14] overflow-hidden relative flex">
        <div className="relative w-[86px] shrink-0 border-r border-[#1e3a5f] bg-[#0d1220] px-2.5 py-2.5">
          <svg viewBox="0 0 60 40" className="w-8 h-6 mb-3">
            <path d="M6 10 H54" stroke="#c41e3a" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M11 17 H49" stroke="#c41e3a" strokeWidth="3" fill="none" />
            <path d="M20 17 V38" stroke="#c41e3a" strokeWidth="4" fill="none" />
            <path d="M40 17 V38" stroke="#c41e3a" strokeWidth="4" fill="none" />
          </svg>
          {[
            ["拠点", true],
            ["回線", false],
            ["記録", false],
            ["設定", false],
          ].map(([label, active]) => (
            <div
              key={label as string}
              className={`mb-1.5 flex items-center gap-1.5 px-1.5 py-1 font-serif text-[8px] tracking-[0.2em] ${
                active ? "bg-[#1e3a5f] text-[#38bdf8]" : "text-white/45"
              }`}
            >
              <span className="w-1 h-1 bg-[#c9a227]" />
              {label as string}
            </div>
          ))}
        </div>
        <div className="relative flex-1">
          <div className="relative border-b border-[#1e3a5f] px-3 py-2 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,transparent_38%,rgba(56,189,248,0.28)_39%,transparent_42%)] bg-[size:30px_18px]" />
            <div className="relative flex items-center justify-between">
              <div className="font-serif text-[11px] tracking-[0.24em] text-[#c9a227]">
                和風 · 制御盤
              </div>
              <div className="pr-[62px] font-mono text-[7px] text-[#38bdf8]">v2.4</div>
            </div>
          </div>
          <div className="px-3 pt-2.5 space-y-2">
            {[
              ["東京 拠点", "稼働", "#38bdf8", "78%"],
              ["京都 拠点", "待機", "#c9a227", "42%"],
              ["大阪 拠点", "遮断", "#c41e3a", "12%"],
            ].map(([name, state, color, value]) => (
              <div key={name} className="border border-[#1e3a5f] bg-[#0d1220] px-2 py-1.5">
                <div className="flex items-center justify-between font-serif text-[8px]">
                  <span className="text-white/70">{name}</span>
                  <span style={{ color }}>{state}</span>
                </div>
                <div className="mt-1 h-[3px] bg-white/10">
                  <div className="h-full" style={{ width: value, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
