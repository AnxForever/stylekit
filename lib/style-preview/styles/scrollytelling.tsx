import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <div className="p-6 bg-[#0E1116] rounded-xl">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#2F6FED] text-white font-semibold text-sm hover:bg-[#2560d4] transition-colors">
          Next chapter <span aria-hidden>&darr;</span>
        </button>
      </div>
    ),
    card: () => (
      <div className="p-6 bg-[#0E1116] rounded-xl">
        <div className="relative pl-6 border-l-2 border-[#2F6FED] py-3">
          <span className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-[#2F6FED] ring-4 ring-[#0E1116]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#2F6FED]">Step 02</span>
          <h3 className="text-lg font-bold text-[#F7F5F0] mt-1.5 mb-1">The line crosses zero</h3>
          <p className="text-sm text-[#F7F5F0]/70 leading-relaxed">滚动到此步，上方图表点亮趋势翻转的瞬间。</p>
        </div>
      </div>
    ),
    input: () => (
      <div className="p-6 bg-[#0E1116] rounded-xl">
        <input
          type="number"
          placeholder="2024"
          className="w-full px-4 py-2.5 rounded-md bg-[#1C2530] border border-white/10 text-[#F7F5F0] placeholder-[#F7F5F0]/30 focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/30 transition-all"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="relative w-full h-full bg-[#0E1116] overflow-hidden p-5 flex flex-col justify-between">
        {/* mock sticky chart canvas */}
        <div className="relative h-24 mb-3">
          <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
            <polyline points="0,70 40,55 80,60 120,30 160,35 200,10" fill="none" stroke="#2F6FED" strokeWidth="2.5" />
            <circle cx="120" cy="30" r="5" fill="#E8503A" />
            <line x1="120" y1="0" x2="120" y2="80" stroke="#E8503A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </svg>
          <span className="absolute top-0 right-0 font-mono text-[9px] text-[#2F6FED]">crossover</span>
        </div>
        <div className="relative pl-4 border-l-2 border-[#2F6FED]">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#2F6FED]">Step 03 / 05</span>
          <h3 className="text-xl font-bold text-[#F7F5F0] mt-1 leading-tight">
            <span className="text-[#E8503A]">1,240</span> cross the line
          </h3>
          <p className="text-[10px] text-[#F7F5F0]/60 mt-1">Scroll drives the story, one focus per step.</p>
        </div>
        <div className="relative flex gap-1.5 mt-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${i === 2 ? "bg-[#2F6FED]" : "bg-white/15"}`} />
          ))}
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
