import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Kinetic Constructivism Showcase - StyleKit",
  description:
    "Constructivism set in motion: orbiting discs, swinging triangles, marching squares and diagonal sweeps in red, blue and yellow on bone paper. Live Kinetic Constructivism demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#EFE9DC] flex items-center justify-center">
      <p className="text-[#17130E]/50 font-mono text-xs uppercase tracking-[0.3em]">Loading motion...</p>
    </div>
  ),
});

export default function KineticConstructivismShowcasePage() {
  return <ShowcaseContent />;
}
