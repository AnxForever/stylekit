import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-3 bg-[#e8a87c] text-[#f5f0e1] font-serif tracking-wide rounded hover:bg-[#c0392b] transition-colors">
        Click
      </button>
    ),
    card: () => (
      <div className="p-6 bg-[#f5f0e1] border border-[#e8a87c] rounded">
        <h3 className="font-serif text-xl text-[#2c3e50] mb-2">Impressionist Card</h3>
        <p className="text-sm text-[#e8a87c]">Brushstroke textures</p>
      </div>
    ),
    input: () => (
      <input type="text" placeholder="Paint words..." className="w-full px-4 py-3 bg-[#f5f0e1] border border-[#e8a87c] rounded text-[#2c3e50] placeholder-[#2c3e50]/40 focus:outline-none focus:border-[#c0392b] transition-colors" />
    ),
    // Cover archetype: gallery. Broken colour lives inside the artwork tiles of a
    // real exhibition page.
    coverPreview: () => (
      <div className="w-full h-full bg-[#f5f0e1] overflow-hidden relative">
        <div className="relative flex items-center justify-between border-b border-[#2c3e50]/25 px-4 py-2">
          <div className="font-serif text-[14px] italic text-[#2c3e50]">Galerie Lumière</div>
          <div className="flex gap-3 pr-[68px] font-serif text-[8px] tracking-[0.22em] text-[#2c3e50]/60">
            <span>ROOMS</span>
            <span>VISIT</span>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2.5 px-4 pt-3">
          {[
            { title: "Matinée", year: "1874", seed: 0 },
            { title: "Étang", year: "1881", seed: 5 },
            { title: "Voiles", year: "1886", seed: 11 },
          ].map((item) => (
            <div key={item.title} className="border border-[#2c3e50]/20 bg-white p-1">
              <div className="relative h-[62px] overflow-hidden bg-[linear-gradient(#cfe3ef,#e9e0cd_60%,#f0e2c8)]">
                <svg viewBox="0 0 110 70" className="absolute inset-0 w-full h-full">
                  {Array.from({ length: 42 }).map((_, index) => {
                    const column = index % 7;
                    const row = Math.floor(index / 7);
                    const x = 4 + column * 15 + ((row % 2) * 6);
                    const y = 5 + row * 11;
                    const palette = ["#e8a87c", "#c0392b", "#2c3e50", "#1abc9c", "#f5f0e1"];
                    const fill = palette[(column + row + item.seed) % palette.length];
                    const rotate = ((column * 31 + row * 47 + item.seed * 13) % 90) - 45;
                    return (
                      <rect
                        key={index}
                        x={x}
                        y={y}
                        width="13"
                        height="6"
                        rx="3"
                        fill={fill}
                        opacity={0.5 + (((column + row) % 3) * 0.16)}
                        transform={`rotate(${rotate} ${x + 6} ${y + 3})`}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="px-0.5 pt-1">
                <div className="font-serif text-[8px] italic text-[#2c3e50]">{item.title}</div>
                <div className="font-serif text-[7px] text-[#2c3e50]/50">{item.year}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 flex items-center gap-2 px-4">
          <div className="bg-[#2c3e50] px-3.5 py-1 font-serif text-[8px] tracking-[0.16em] text-[#f5f0e1]">
            Book a visit
          </div>
          <div className="font-serif text-[8px] italic text-[#c0392b] underline decoration-[#e8a87c]">
            current exhibition
          </div>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
