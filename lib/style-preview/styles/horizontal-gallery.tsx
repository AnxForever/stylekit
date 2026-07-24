import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-8 py-3 bg-[#1A1A1A] text-[#FCFCFA] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#2E2E2C] transition-colors duration-300">
        View Works
      </button>
    ),
    card: () => (
      <figure className="max-w-[240px]">
        <div className="aspect-[4/5] bg-gradient-to-br from-[#C9C4BA] to-[#8F8A7E]" />
        <figcaption className="mt-4 pt-3 border-t border-[#E8E6E1]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-1.5">No. 01</p>
          <p className="font-serif font-light text-base text-[#1A1A1A]">Still Field</p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-1">Oil on Linen, 2025</p>
        </figcaption>
      </figure>
    ),
    input: () => (
      <input
        type="text"
        placeholder="YOUR NAME"
        className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#E8E6E1] rounded-none text-sm text-[#1A1A1A] placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[#8A8A85] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-300"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#FCFCFA] flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-[220px]">
          <div className="flex items-baseline justify-between mb-2">
            <div className="h-2 w-16 bg-[#1A1A1A]" />
            <div className="h-1 w-8 bg-[#A85A3A]" />
          </div>
          <div className="flex gap-3">
            <div className="shrink-0 w-16">
              <div className="h-20 bg-gradient-to-br from-[#C9C4BA] to-[#8F8A7E]" />
              <div className="h-px bg-[#E8E6E1] mt-1.5" />
              <div className="h-1 w-6 bg-[#A85A3A] mt-1" />
              <div className="h-1 w-10 bg-[#8A8A85]/60 mt-1" />
            </div>
            <div className="shrink-0 w-24">
              <div className="h-16 bg-gradient-to-br from-[#8E969E] to-[#5A6068]" />
              <div className="h-px bg-[#E8E6E1] mt-1.5" />
              <div className="h-1 w-6 bg-[#A85A3A] mt-1" />
              <div className="h-1 w-14 bg-[#8A8A85]/60 mt-1" />
            </div>
            <div className="shrink-0 w-16">
              <div className="h-20 bg-gradient-to-br from-[#B86E4E] to-[#7E4630]" />
              <div className="h-px bg-[#E8E6E1] mt-1.5" />
              <div className="h-1 w-6 bg-[#A85A3A] mt-1" />
            </div>
          </div>
          <div className="relative h-px bg-[#E8E6E1] mt-3">
            <div className="absolute left-0 top-0 h-px w-1/3 bg-[#1A1A1A]" />
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
