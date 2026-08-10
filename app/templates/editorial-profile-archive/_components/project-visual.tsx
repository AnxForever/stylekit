import type { ArchiveProject } from "../_data";

export function ProjectVisual({ project, large = false }: { project: ArchiveProject; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden border border-[#24231f]/15 ${large ? "h-[min(54vw,38rem)]" : "h-32 md:h-40"}`}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.colors[0]} 0 38%, ${project.colors[1]} 38% 71%, ${project.colors[2]} 71%)` }} />
      <div className={`absolute left-[18%] top-[19%] rounded-full border border-white/60 ${large ? "h-40 w-40 md:h-64 md:w-64" : "h-16 w-16 md:h-20 md:w-20"}`} />
      <div className={`absolute bottom-[17%] right-[17%] border border-white/70 ${large ? "h-24 w-24 md:h-40 md:w-40" : "h-10 w-10 md:h-14 md:w-14"}`} />
      <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.14em] text-white/80">PLATE / {project.number}</span>
    </div>
  );
}
