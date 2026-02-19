import dynamic from "next/dynamic";

export const metadata = {
  title: "Terracotta Showcase - StyleKit",
  description:
    "Live demonstration of Terracotta design with warm earth tones, handcrafted textures, and Mediterranean warmth.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
