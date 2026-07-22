import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Scrollytelling Showcase - StyleKit",
  description:
    "Scroll-driven data narrative: a sticky canvas pinned to the viewport, IntersectionObserver-stepped state changes, count-up numbers and one focus per step. Live Scrollytelling demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#0E1116] flex items-center justify-center">
      <p className="text-[#F7F5F0]/40 font-mono text-xs uppercase tracking-[0.3em]">Loading the story...</p>
    </div>
  ),
});

export default function ScrollytellingShowcasePage() {
  return <ShowcaseContent />;
}
