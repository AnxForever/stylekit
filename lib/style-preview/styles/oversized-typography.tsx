import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-8 py-4 bg-[#0A0A0A] text-[#FAFAF8] font-mono text-xs uppercase tracking-widest rounded-none border border-[#0A0A0A] hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-colors duration-200">
        Start a Project
      </button>
    ),
    card: () => (
      <div className="group border-t border-b border-[#0A0A0A]/15 py-6 bg-[#FAFAF8] cursor-pointer">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-[#71717A]">01</span>
          <div className="flex-1">
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-[0.9] text-[#0A0A0A] group-hover:text-[#FF4D00] transition-colors duration-200">
              Brand Identity
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-[#71717A] mt-2">Art Direction &mdash; 2026</p>
          </div>
          <span className="text-2xl text-[#0A0A0A] group-hover:translate-x-2 group-hover:text-[#FF4D00] transition-all duration-200">&rarr;</span>
        </div>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="YOUR EMAIL"
        className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/30 rounded-none font-mono text-sm uppercase tracking-widest text-[#0A0A0A] placeholder:text-[#71717A] focus:outline-none focus:border-b-2 focus:border-[#FF4D00] transition-colors"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#FAFAF8] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px]">
          <p className="font-mono text-[8px] uppercase tracking-widest text-[#FF4D00] mb-1.5">Portfolio 2026</p>
          <div className="font-black uppercase tracking-tighter leading-[0.85] text-[#0A0A0A]">
            <span className="block text-3xl">Ava</span>
            <span className="block text-3xl" style={{ WebkitTextStroke: "1.5px #0A0A0A", color: "transparent" }}>
              Carter
            </span>
          </div>
          <div className="h-px bg-[#0A0A0A]/15 my-2.5" />
          <div className="flex items-center justify-between">
            <div className="h-6 px-3 bg-[#0A0A0A] flex items-center">
              <div className="h-1 w-10 bg-[#FAFAF8]/80" />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#71717A]">01 / 03</span>
            <div className="w-2.5 h-2.5 bg-[#FF4D00]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
