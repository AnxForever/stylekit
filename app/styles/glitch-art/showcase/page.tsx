import dynamic from "next/dynamic";

export const metadata = {
  title: "Glitch Art Showcase - StyleKit",
  description: "Live demonstration of Glitch Art digital corruption aesthetic with RGB separation, scan lines, and pixel displacement.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function GlitchArtShowcasePage() {
  return <ShowcaseContent />;
}
