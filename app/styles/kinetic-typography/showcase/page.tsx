import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Kinetic Typography Showcase - StyleKit",
  description:
    "Type is the interface: staggered mask entrances, variable-font weight breathing, scroll-velocity width stretch and seamless marquees on an ink-black stage. Live Kinetic Typography demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center">
      <p className="text-[#F4F1EB]/40 font-mono text-xs uppercase tracking-[0.3em]">Loading motion...</p>
    </div>
  ),
});

export default function KineticTypographyShowcasePage() {
  return <ShowcaseContent />;
}
