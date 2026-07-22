import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Immersive Photo Showcase - StyleKit",
  description:
    "Photography is the interface: full-bleed AVIF imagery, slow Ken Burns drift, blur-up LQIP loading and readability scrims. Live Immersive Photo demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#0C0D10] flex items-center justify-center">
      <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">Developing the frames...</p>
    </div>
  ),
});

export default function ImmersivePhotoShowcasePage() {
  return <ShowcaseContent />;
}
