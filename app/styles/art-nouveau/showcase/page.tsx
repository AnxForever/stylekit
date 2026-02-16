import dynamic from "next/dynamic";

export const metadata = {
  title: "Art Nouveau Showcase - StyleKit",
  description: "Live demonstration of Art Nouveau design style with organic curves, flowing vines, and Mucha-inspired decorative aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function ArtNouveauShowcasePage() {
  return <ShowcaseContent />;
}
