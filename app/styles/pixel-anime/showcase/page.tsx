import dynamic from "next/dynamic";

export const metadata = {
  title: "Pixel Anime Showcase - StyleKit",
  description: "Live demonstration of Pixel Anime style with 8-bit pixel art, retro game UI elements, and anime character aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function PixelAnimeShowcasePage() {
  return <ShowcaseContent />;
}
