import type { StylePreviewComponents } from "../types";

const preview = {
  button: () => (
    <div className="p-4 bg-[#EFE9DC] flex items-center justify-center">
      <button className="px-6 py-3 bg-[#E0231B] text-[#EFE9DC] text-sm font-extrabold uppercase tracking-[0.12em] border-2 border-[#17130E] rounded-none hover:bg-[#17130E] transition-colors duration-300">
        Build Forward
      </button>
    </div>
  ),
  card: () => (
    <div className="p-4 bg-[#EFE9DC]">
      <div className="relative bg-[#EFE9DC] border-2 border-[#17130E] rounded-none p-5 overflow-hidden">
        <span className="absolute top-0 left-0 right-0 h-1.5 bg-[#1C4A87]" />
        <span className="absolute -right-4 -top-4 w-12 h-12 rounded-full bg-[#F4B301] border-2 border-[#17130E]" />
        <span className="block font-mono text-[10px] text-[#E0231B] tabular-nums mb-2">01</span>
        <h3 className="text-xl font-extrabold uppercase text-[#17130E] tracking-tight leading-none mb-2">
          Motion Is Structure
        </h3>
        <p className="text-xs text-[#17130E]/70">几何是一台机器，运动即结构</p>
      </div>
    </div>
  ),
  input: () => (
    <div className="p-4 bg-[#EFE9DC]">
      <input
        type="text"
        placeholder="Type here"
        className="w-full bg-transparent py-2.5 px-3 text-base text-[#17130E] placeholder-[#17130E]/30 border-2 border-[#17130E] rounded-none focus:outline-none focus:border-[#E0231B] transition-colors"
      />
    </div>
  ),
  coverPreview: () => (
    <div className="w-full h-full bg-[#EFE9DC] relative overflow-hidden flex flex-col justify-between p-4">
      {/* Machine geometry */}
      <span className="absolute right-3 top-3 w-10 h-10 rounded-full bg-[#E0231B] border-2 border-[#17130E]" />
      <span
        className="absolute right-16 top-6 w-0 h-0"
        style={{
          borderLeft: "14px solid transparent",
          borderRight: "14px solid transparent",
          borderBottom: "24px solid #1C4A87",
        }}
      />
      {/* Top label */}
      <div className="relative font-mono text-[9px] uppercase tracking-[0.3em] text-[#17130E]/50">
        Konstrukt · 001
      </div>
      {/* Diagonal headline block */}
      <div className="relative leading-[0.82] tracking-tight text-[#17130E] uppercase font-extrabold">
        <span className="block text-2xl">Build</span>
        <span className="block text-2xl text-[#E0231B]">In</span>
        <span className="inline-block -rotate-3 bg-[#F4B301] border-2 border-[#17130E] px-1.5 text-2xl">
          Motion
        </span>
      </div>
      {/* Bottom: three-color bar + squares */}
      <div className="relative flex items-center gap-1.5">
        <span className="w-8 h-3 bg-[#E0231B]" />
        <span className="w-8 h-3 bg-[#1C4A87]" />
        <span className="w-8 h-3 bg-[#F4B301]" />
        <span className="ml-auto w-3 h-3 bg-[#17130E]" />
        <span className="w-3 h-3 border-2 border-[#17130E]" />
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;
