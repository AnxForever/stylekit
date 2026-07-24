import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <div className="relative p-6 rounded-xl overflow-hidden" style={{ backgroundImage: "linear-gradient(135deg,#2A3A5C,#D98A6A)" }}>
        <div className="absolute inset-0 bg-black/25" />
        <button className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/12 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/20 transition-all">
          View the series <span aria-hidden>&rarr;</span>
        </button>
      </div>
    ),
    card: () => (
      <div className="p-4 bg-[#0C0D10] rounded-xl">
        <div className="relative aspect-[4/5] max-h-40 mx-auto overflow-hidden rounded-2xl" style={{ backgroundImage: "linear-gradient(160deg,#2A3A5C,#7C6A8A 45%,#D98A6A 75%,#F2C79B)" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.1) 55%, transparent)" }} />
          <div className="absolute bottom-0 p-4">
            <p className="text-[10px] uppercase tracking-widest text-[#E8B04B] mb-0.5">Field notes</p>
            <h3 className="text-white text-sm font-semibold">First light on the ridge</h3>
          </div>
        </div>
      </div>
    ),
    input: () => (
      <div className="relative p-6 rounded-xl overflow-hidden" style={{ backgroundImage: "linear-gradient(135deg,#0E1630,#8A3E5C)" }}>
        <div className="absolute inset-0 bg-black/30" />
        <input
          type="email"
          placeholder="Your email"
          className="relative w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-all"
        />
      </div>
    ),
    coverPreview: () => (
      <div className="relative w-full h-full overflow-hidden" style={{ backgroundImage: "linear-gradient(165deg,#2A3A5C 0%,#7C6A8A 42%,#D98A6A 70%,#F2C79B 100%)" }}>
        {/* warm light glow, sampled-accent source */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 72% 60%, rgba(255,217,160,0.7) 0%, transparent 45%)" }} />
        {/* scrim */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.28))" }} />
        {/* nav hint */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
          <span className="text-white font-semibold text-xs tracking-tight">Atlas</span>
          <span className="text-white/70 text-[10px]">Series &middot; About</span>
        </div>
        {/* caption */}
        <div className="absolute bottom-0 p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#E8B04B] mb-1">Chapter One</p>
          <h3 className="text-white text-lg font-semibold leading-tight max-w-[80%]">The light arrives before the sound</h3>
          <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/30 text-white text-[10px]">
            View the series &rarr;
          </span>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
