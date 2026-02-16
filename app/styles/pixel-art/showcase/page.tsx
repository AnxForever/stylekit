import dynamic from "next/dynamic";

export const metadata = {
  title: "Pixel Art Showcase - StyleKit",
  description: "Live demonstration of Pixel Art design style with retro 8-bit game aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function PixelArtShowcasePage() {
  return <ShowcaseContent />;
}
