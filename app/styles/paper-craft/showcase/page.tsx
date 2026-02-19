import dynamic from "next/dynamic";

export const metadata = {
  title: "Paper Craft Showcase - StyleKit",
  description: "Live demonstration of Paper Craft design with layered paper effects, offset shadows, and warm handmade textures.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
