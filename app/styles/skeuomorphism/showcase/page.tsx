import dynamic from "next/dynamic";

export const metadata = {
  title: "Skeuomorphism Showcase - StyleKit",
  description: "Live demonstration of Skeuomorphism design with realistic textures, 3D effects, and tactile feedback.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SkeuomorphismShowcasePage() {
  return <ShowcaseContent />;
}
