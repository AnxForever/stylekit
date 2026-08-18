import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#1e1b4b] text-[#fbbf24] font-medium tracking-wide border border-[#818cf8] rounded hover:bg-[#818cf8] hover:text-[#1e1b4b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#0f0e2e] border border-[#818cf8] rounded">
        <h3 className="text-xl text-[#fbbf24] mb-2">Magic Circle Card</h3>
        <p className="text-sm text-[#e2e8f0]/60">Arcane symbols</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Cast spell..." className="w-full px-4 py-3 bg-[#0f0e2e] border border-[#818cf8] rounded text-[#fbbf24] placeholder-[#fbbf24]/40 focus:outline-none focus:border-[#fbbf24] transition-colors" />
    ),
    // Cover archetype: app shell. The runic circle is artwork inside a spell
    // picker, with real list rows, meters and a cast bar around it.
    coverPreview: () => (
      <div className="w-full h-full bg-[#0f0e2e] overflow-hidden relative flex">
        <div className="w-[104px] shrink-0 border-r border-[#818cf8]/30 bg-[#141234] px-2.5 py-2.5">
          <div className="mb-2 text-[9px] tracking-[0.24em] text-[#fbbf24]">GRIMOIRE</div>
          {[
            ["Seal", true],
            ["Ward", false],
            ["Summon", false],
            ["Banish", false],
          ].map(([label, active]) => (
            <div
              key={label as string}
              className={`mb-1 px-1.5 py-1 text-[9px] tracking-[0.16em] ${
                active
                  ? "border border-[#fbbf24]/70 bg-[#1e1b4b] text-[#fbbf24]"
                  : "text-[#e2e8f0]/75"
              }`}
            >
              {label as string}
            </div>
          ))}
          <div className="mt-3 text-[7px] tracking-[0.2em] text-[#818cf8]">MANA</div>
          <div className="mt-1 h-[5px] bg-[#e2e8f0]/15">
            <div className="h-full w-[72%] bg-[#818cf8]" />
          </div>
          <div className="mt-2 text-[7px] tracking-[0.2em] text-[#e2e8f0]/60">FOCUS</div>
          <div className="mt-1 h-[5px] bg-[#e2e8f0]/15">
            <div className="h-full w-[45%] bg-[#fbbf24]" />
          </div>
        </div>
        <div className="relative flex-1">
          <div className="flex items-center justify-between border-b border-[#818cf8]/30 px-3 py-2">
            <div className="text-[11px] tracking-[0.2em] text-[#e2e8f0]">Circle of Binding</div>
            <div className="pr-[62px] text-[8px] text-[#fbbf24]">rank IV</div>
          </div>
          <div className="relative h-[136px] flex items-center justify-center">
            <div className="relative w-[124px] h-[124px]">
              <div className="absolute inset-0 rounded-full border border-[#fbbf24]/80" />
              <div className="absolute inset-[14px] rounded-full border border-[#818cf8]/70" />
              <div className="absolute inset-[32px] rounded-full border border-[#e2e8f0]/35" />
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {[0, 30, 60, 90, 120, 150].map((angle) => (
                  <div
                    key={angle}
                    className="absolute left-1/2 top-1/2 h-[1px] w-[124px] bg-[#818cf8]/40"
                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                  />
                ))}
              </div>
              <div className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#fbbf24] bg-[#1e1b4b]" />
            </div>
            <div className="absolute left-3 top-2 text-[8px] tracking-[0.28em] text-[#e2e8f0]/55">
              ᚦ ᛉ ᛟ ᛞ
            </div>
            <div className="absolute right-3 bottom-2 text-[7px] tracking-[0.2em] text-[#818cf8]">
              cast 2.4s
            </div>
          </div>
          <div className="border-t border-[#818cf8]/30 px-3 py-2">
            <div className="mb-1.5 h-[4px] bg-[#e2e8f0]/12">
              <div className="h-full w-[58%] bg-[#fbbf24]" />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#fbbf24] px-3 py-1 text-[8px] font-medium tracking-[0.16em] text-[#0f0e2e]">
                Invoke
              </div>
              <div className="border border-[#818cf8]/70 px-3 py-1 text-[8px] tracking-[0.16em] text-[#818cf8]">
                Dispel
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
