import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Cinematic Video Hero Showcase - StyleKit",
  description:
    "A trailer-like opener: a poster-first looping background video, in-view muted autoplay, readability scrims and reduced-motion fallbacks. Live Cinematic Video Hero demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
      <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">Rolling the reel...</p>
    </div>
  ),
});

export default function CinematicVideoHeroShowcasePage() {
  return <ShowcaseContent />;
}
