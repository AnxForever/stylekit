import type { StylePreviewComponents } from "../types";

const SERIF = '"Playfair Display", "Times New Roman", Georgia, serif';

const preview = {
  button: () => (
    <div className="relative p-6 bg-[#F7F5F1]">
      <div className="flex flex-wrap gap-3">
        <button className="px-7 py-3.5 bg-[#141210] text-[#F7F5F1] uppercase tracking-[0.2em] text-[11px] hover:bg-[#9A7B4F] transition-all duration-500">
          Book appointment
        </button>
        <button className="px-7 py-3.5 bg-transparent text-[#141210] border border-[#141210] uppercase tracking-[0.2em] text-[11px] hover:bg-[#141210] hover:text-[#F7F5F1] transition-all duration-500">
          View collection
        </button>
      </div>
    </div>
  ),
  card: () => (
    <div className="p-4 bg-[#F7F5F1]">
      <article className="group bg-[#F7F5F1]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E3DB]" style={{ backgroundImage: "linear-gradient(150deg, #E8E3DB, #CFC7BB 60%, #9A7B4F)" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,18,16,0.28), transparent 60%)" }} />
        </div>
        <div className="pt-4 border-t border-[#141210]/15 mt-4">
          <p className="uppercase tracking-[0.3em] text-[10px] text-[#9A7B4F] mb-1">Look 01</p>
          <h3 className="text-xl text-[#141210]" style={{ fontFamily: SERIF }}>The Camel Coat</h3>
        </div>
      </article>
    </div>
  ),
  input: () => (
    <div className="relative p-6 bg-[#F7F5F1]">
      <input
        type="email"
        placeholder="Your email"
        className="w-full px-0 py-3 bg-transparent border-b border-[#141210]/25 text-[#141210] placeholder-[#141210]/40 uppercase tracking-[0.15em] text-xs focus:outline-none focus:border-[#9A7B4F] transition-all duration-500"
      />
    </div>
  ),
  coverPreview: () => (
    <div className="relative w-full h-full overflow-hidden bg-[#F7F5F1]">
      {/* silk-motion plate mock */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #F7F5F1 0%, #E8E3DB 45%, #CFC4B4 72%, #9A7B4F 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(140% 90% at 78% 18%, rgba(247,245,241,0.55), transparent 55%)" }} />
      {/* scrim */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,18,16,0.42), transparent 55%)" }} />
      {/* masthead */}
      <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
        <span className="text-lg tracking-tight text-[#141210]" style={{ fontFamily: SERIF }}>Maison</span>
        <span className="uppercase tracking-[0.3em] text-[9px] text-[#141210]/70">Lookbook - Atelier</span>
      </div>
      {/* hairline */}
      <div className="absolute top-14 left-6 right-6 border-t border-[#141210]/20" />
      {/* headline block */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="uppercase tracking-[0.3em] text-[10px] text-[#F7F5F1] mb-2">Autumn Maison</p>
        <h3 className="text-[#F7F5F1] text-3xl leading-[0.95] max-w-[80%]" style={{ fontFamily: SERIF }}>The Silk Season</h3>
      </div>
    </div>
  ),
} satisfies StylePreviewComponents;

export default preview;
