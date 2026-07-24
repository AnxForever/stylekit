import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <div className="relative p-6 rounded-xl overflow-hidden" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #1E3A5F, #05060A 70%)" }}>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E4C063] text-[#05060A] font-semibold text-sm hover:bg-[#efce78] transition-all">
            Watch the film <span aria-hidden>&#9654;</span>
          </button>
          <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white text-sm hover:bg-white/18 transition-all">
            Learn more
          </button>
        </div>
      </div>
    ),
    card: () => (
      <div className="p-4 bg-[#05060A] rounded-xl">
        <div className="relative aspect-video overflow-hidden rounded-lg" style={{ backgroundImage: "radial-gradient(circle at 65% 35%, #7A3B5E, #05060A 70%)" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,6,10,0.78), transparent 65%)" }} />
          <div className="absolute bottom-0 p-4">
            <p className="text-[10px] uppercase tracking-widest text-[#E4C063] mb-0.5">Scene 01</p>
            <h3 className="text-white text-sm font-semibold">The long dissolve</h3>
          </div>
          <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-[10px]">&#9654;</span>
        </div>
      </div>
    ),
    input: () => (
      <div className="relative p-6 rounded-xl overflow-hidden" style={{ backgroundImage: "radial-gradient(circle at 40% 50%, #2A6F6B, #05060A 70%)" }}>
        <input
          type="email"
          placeholder="Email for the premiere"
          className="relative w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-[#E4C063]/70 transition-all"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="relative w-full h-full overflow-hidden bg-[#05060A]">
        {/* aurora-mesh mock */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(360px circle at 22% 62%, #1E3A5F, transparent 60%), radial-gradient(320px circle at 74% 34%, #7A3B5E, transparent 60%), radial-gradient(280px circle at 52% 80%, #C9743B, transparent 55%)" }} />
        {/* vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 45%, transparent 30%, rgba(5,6,10,0.7) 100%)" }} />
        {/* letterbox bars */}
        <div className="absolute top-0 inset-x-0 h-4 bg-[#05060A]" />
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#05060A]" />
        {/* play chip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/12 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-sm">&#9654;</div>
        {/* caption */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#E4C063] mb-1">Now screening</p>
          <h3 className="text-white text-lg font-semibold leading-tight max-w-[85%]">Some stories only move</h3>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
