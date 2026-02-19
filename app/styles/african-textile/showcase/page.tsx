import dynamic from "next/dynamic";

export const metadata = {
  title: "African Textile Showcase - StyleKit",
  description: "Live demonstration of African Textile design with bold Kente-inspired geometry, earth tones, and handcrafted textures.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
