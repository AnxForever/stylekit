import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Luxe Lookbook Showcase - StyleKit",
  description:
    "A fashion-maison digital flagship: a porcelain ground, ink Didone serif display, a silk-motion film hero and a hover-reveal lookbook grid. Live Luxe Lookbook demo.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => (
    <div className="min-h-screen bg-[#F7F5F1] flex items-center justify-center">
      <p className="text-[#141210]/40 uppercase tracking-[0.3em] text-xs">Dressing the maison...</p>
    </div>
  ),
});

export default function LuxeLookbookShowcasePage() {
  return <ShowcaseContent />;
}
