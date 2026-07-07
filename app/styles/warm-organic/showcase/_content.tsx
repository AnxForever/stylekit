"use client";

const projects = [
  { title: "Kōchi House", type: "Architecture", year: "2026", desc: "A weekend retreat nestled in the mountain forest of Kōchi Prefecture, built with locally sourced cedar and clay." },
  { title: "Terracotta Vessels", type: "Product Design", year: "2025", desc: "Hand-thrown ceramic vessel collection exploring the interaction of glaze and temperature across three clay bodies." },
  { title: "Clay Studio Interior", type: "Interior", year: "2025", desc: "Complete interior design for a working pottery studio in Seto, Japan's ancient kiln city." },
  { title: "Earth Table", type: "Furniture", year: "2024", desc: "A dining table crafted from a single slab of reclaimed keyaki wood, finished with natural oils." },
  { title: "Garden Pavilion", type: "Architecture", year: "2024", desc: "A tea pavilion designed around an existing百年 (100-year-old) pine tree, using traditional joinery." },
  { title: "Olive Press", type: "Brand Identity", year: "2026", desc: "Visual identity and packaging for a small-batch olive oil producer in Ehime Prefecture." },
];

export default function WarmOrganicShowcase() {
  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#2D2A24] font-sans">
      {/* Hero */}
      <section className="relative px-6 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Decorative organic shape */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4BFA5]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C86A4A]/10 rounded-full blur-2xl" />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-[#C86A4A] text-xs tracking-[0.25em] font-medium mb-6">PORTFOLIO · 2026</p>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">
            Made by<br />
            <span className="text-[#C86A4A] italic">human hands</span>
          </h1>
          <p className="text-base md:text-lg text-[#6B5D4E] mt-6 max-w-xl leading-relaxed">
            I create spaces, objects, and experiences rooted in material honesty —
            where craft meets function, and every detail tells a story.
          </p>
          <div className="flex items-center gap-8 mt-10 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C86A4A]" />
              <span className="text-[#6B5D4E]">Architecture</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7A8B5E]" />
              <span className="text-[#6B5D4E]">Product</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4BFA5]" />
              <span className="text-[#6B5D4E]">Interior</span>
            </span>
          </div>
        </div>
      </section>

      {/* Featured work grid */}
      <section className="px-6 md:px-16 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-[#D4BFA5]" />
            <span className="text-xs tracking-[0.25em] text-[#8B7D6B] font-medium">SELECTED PROJECTS</span>
            <div className="h-px flex-1 bg-[#D4BFA5]" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <div
                key={i}
                className={`group bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(45,42,36,0.06)] hover:shadow-[0_8px_30px_rgba(45,42,36,0.12)] transition-all duration-500 cursor-pointer ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className={`${i === 0 ? "aspect-[3/1]" : "aspect-[4/3]"} bg-[#E8DED1] relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8DED1] to-[#D4BFA5]" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm text-xs text-[#2D2A24] rounded-full font-medium">
                      {p.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-serif font-semibold text-[#2D2A24]">{p.title}</h3>
                    <span className="text-xs text-[#8B7D6B]">{p.year}</span>
                  </div>
                  <p className="text-sm text-[#6B5D4E] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Philosophy */}
      <section className="px-6 md:px-16 py-20 bg-[#E8DED1]/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-[#D4BFA5]" />
            <span className="text-xs tracking-[0.25em] text-[#8B7D6B] font-medium">MY APPROACH</span>
            <div className="h-px flex-1 bg-[#D4BFA5]" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "◯", title: "Listen", desc: "Every project begins with deep listening — to the site, the material, the client's unspoken needs." },
              { icon: "◑", title: "Shape", desc: "Ideas are refined through sketching, modeling, and prototyping. Form emerges from constraint." },
              { icon: "◕", title: "Realize", desc: "Built with care, using honest materials and time-honored techniques adapted for today." },
            ].map((p) => (
              <div key={p.title} className="text-center p-6">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="text-xl font-serif font-semibold mt-3 mb-2">{p.title}</h3>
                <p className="text-sm text-[#6B5D4E] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-[#D4BFA5]" />
            <span className="text-xs tracking-[0.25em] text-[#8B7D6B] font-medium">CONTACT</span>
            <div className="h-px flex-1 bg-[#D4BFA5]" />
          </div>
          <div className="text-center max-w-md mx-auto">
            <p className="text-[#6B5D4E] text-sm mb-8 leading-relaxed">
              Available for commissioned projects and collaborations worldwide.
            </p>
            <div className="space-y-3 mb-10">
              <div className="flex justify-center items-center gap-2 text-sm">
                <span className="text-[#C86A4A]">●</span>
                <a href="mailto:hello@example.com" className="text-[#2D2A24] hover:text-[#C86A4A] transition-colors">
                  hello@example.com
                </a>
              </div>
              <p className="text-xs text-[#8B7D6B]">@warm_organic_studio</p>
            </div>
            <div className="w-12 h-px bg-[#C86A4A] mx-auto mb-4" />
            <p className="text-[10px] text-[#8B7D6B] tracking-[0.25em]">WARM ORGANIC · PORTFOLIO STYLE</p>
          </div>
        </div>
      </section>
    </div>
  );
}
