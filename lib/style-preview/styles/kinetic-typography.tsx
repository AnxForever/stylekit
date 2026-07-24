import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <div className="p-4 bg-[#0B0B0C] rounded-xl">
        <button className="px-6 py-3 bg-[#FF4D00] text-[#0B0B0C] text-sm font-semibold uppercase tracking-[0.15em] rounded-none hover:bg-[#F4F1EB] transition-colors duration-500">
          Enter Motion
        </button>
      </div>
    ),
    card: () => (
      <div className="p-5 bg-[#0B0B0C] rounded-xl">
        <div className="border-t border-[#F4F1EB]/15 pt-4">
          <span className="block font-mono text-[10px] text-[#F4F1EB]/40 mb-2">01</span>
          <h3 className="text-2xl font-extrabold text-[#F4F1EB] tracking-tight leading-none mb-2">
            Weight Is <span className="text-[#FF4D00]">Volume</span>
          </h3>
          <p className="text-xs text-[#F4F1EB]/55">字重即音量，文字即界面</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="p-4 bg-[#0B0B0C] rounded-xl">
        <input
          type="text"
          placeholder="Type here"
          className="w-full bg-transparent py-3 text-lg text-[#F4F1EB] placeholder-[#F4F1EB]/25 border-b border-[#F4F1EB]/20 rounded-none focus:outline-none focus:border-[#FF4D00] transition-colors"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#0B0B0C] flex flex-col justify-between p-4 overflow-hidden">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F4F1EB]/40">
          Kinetic Type<span className="text-[#FF4D00]">*</span>
        </div>
        <div className="leading-[0.9] tracking-tight text-[#F4F1EB]">
          <span className="block text-2xl font-light">WORDS</span>
          <span className="block text-3xl font-extrabold">
            IN <span className="text-[#FF4D00]">MOTION</span>
          </span>
        </div>
        <div className="space-y-2">
          <div className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.25em] text-[#F4F1EB]/35">
            Stagger · Breathe · Stretch · Marquee · Stagger · Breathe
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-[#FF4D00] text-[#0B0B0C] text-[9px] font-semibold uppercase tracking-[0.15em]">
              Play
            </span>
            <span className="px-3 py-1.5 border border-[#F4F1EB]/25 text-[#F4F1EB] text-[9px] font-semibold uppercase tracking-[0.15em]">
              Specimen
            </span>
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
