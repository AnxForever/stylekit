import dynamic from "next/dynamic";

export const metadata = {
  title: "Zen Garden Showcase - StyleKit",
  description: "Live demonstration of Zen Garden (Karesansui) design with sand textures, moss greens, and meditative minimalism.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
