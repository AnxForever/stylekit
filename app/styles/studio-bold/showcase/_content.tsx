"use client";

const projects = [
  { title: "BRØD", tag: "Brand Identity", sector: "Food & Beverage", w: 2, h: 1 },
  { title: "Atlas", tag: "Web Platform", sector: "SaaS / Tech", w: 1, h: 1 },
  { title: "Maison Noire", tag: "Art Direction", sector: "Luxury", w: 1, h: 2 },
  { title: "Drift", tag: "Product Design", sector: "Consumer", w: 2, h: 1 },
  { title: "Signal", tag: "Digital Product", sector: "Fintech", w: 1, h: 1 },
  { title: "Terra", tag: "Environmental", sector: "Sustainability", w: 2, h: 1 },
  { title: "Form", tag: "Editorial Design", sector: "Publishing", w: 1, h: 1 },
];

const clients = ["ACME CORP", "BRANDCO", "LAYER", "FRAME", "STUDIO X", "DESIGN LAB", "VOID", "MOTIF"];

export default function StudioBoldShowcase() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Bold hero */}
      <section className="relative min-h-screen flex items-center px-6 md:px-16">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6B6B]" />
        <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
          <p className="text-[#FF6B6B] text-xs tracking-[0.25em] mb-6 font-medium">EST. 2018</p>
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            STUDIO
          </h1>
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.92] tracking-[-0.04em] mt-[-0.08em]">
            BOLD
          </h1>
          <p className="text-lg md:text-xl text-[#888888] mt-8 max-w-xl leading-relaxed font-light">
            We design brands, products, and experiences
            that leave a mark. A creative studio built for
            ambitious teams.
          </p>
          <div className="flex items-center gap-6 mt-10">
            <a href="#" className="inline-flex items-center px-6 py-3 bg-[#FF6B6B] text-white text-sm font-medium tracking-[0.08em] hover:bg-[#E55A5A] transition-colors rounded-none">
              VIEW WORK →
            </a>
            <a href="#" className="text-xs text-[#666666] tracking-[0.15em] hover:text-white transition-colors">
              OUR PROCESS
            </a>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-md">
            {[
              { n: "150+", l: "Projects" },
              { n: "12", l: "Team" },
              { n: "8", l: "Awards" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-bold text-[#FF6B6B]">{s.n}</p>
                <p className="text-xs text-[#666666] tracking-[0.1em] mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects grid */}
      <section className="px-6 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10 border-b border-[#333333] pb-4">
            <h2 className="text-xs tracking-[0.25em] text-[#666666] font-medium">FEATURED WORK</h2>
            <a href="#" className="text-xs text-[#FF6B6B] tracking-[0.1em] hover:underline">VIEW ALL →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {projects.map((p, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden bg-[#222222] cursor-pointer ${
                  p.w === 2 ? "col-span-2" : "col-span-1"
                } ${p.h === 2 ? "row-span-2" : "row-span-1"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]" />
                {/* Project info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-0.5 bg-[#FF6B6B] text-[10px] tracking-[0.1em] font-medium text-white rounded-none">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-xl font-bold tracking-tight">{p.title}</p>
                  <p className="text-xs text-[#888888] mt-0.5">{p.sector}</p>
                </div>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / How we work */}
      <section className="px-6 md:px-16 py-24 border-t border-[#333333]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.25em] text-[#666666] mb-10 font-medium">HOW WE WORK</p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discover", desc: "Research, audit, and deep understanding of your audience and market." },
              { step: "02", title: "Define", desc: "Strategy, positioning, and creative direction aligned with your goals." },
              { step: "03", title: "Design", desc: "Iterative exploration, refinement, and delivery of the complete system." },
              { step: "04", title: "Deliver", desc: "Production-ready assets, documentation, and launch support." },
            ].map((p) => (
              <div key={p.step} className="group">
                <p className="text-[#FF6B6B] text-sm font-bold mb-2">{p.step}</p>
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-[#888888] leading-relaxed">{p.desc}</p>
                <div className="h-px bg-[#333333] mt-4 w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="px-6 md:px-16 py-16 border-t border-[#333333]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.25em] text-[#666666] mb-10 text-center font-medium">CLIENTS</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {clients.map((c) => (
              <span key={c} className="text-sm text-[#555555] font-light tracking-[0.15em] hover:text-[#888888] transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-20 bg-[#111111]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] text-[#666666] mb-4 font-medium">GET IN TOUCH</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Have a project in mind?
          </h2>
          <p className="text-[#888888] max-w-md mx-auto text-sm mb-8 leading-relaxed">
            We are always looking for ambitious partners. Tell us about your next project.
          </p>
          <a href="#" className="inline-flex items-center px-8 py-4 bg-[#FF6B6B] text-white text-sm font-medium tracking-[0.08em] hover:bg-[#E55A5A] transition-colors rounded-none">
            START A CONVERSATION →
          </a>
          <div className="mt-12 text-xs text-[#444444] tracking-[0.3em]">
            CREATIVE STUDIO · PORTFOLIO STYLE
          </div>
        </div>
      </section>
    </div>
  );
}
