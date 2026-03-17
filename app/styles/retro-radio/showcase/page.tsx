import dynamic from "next/dynamic";

export const metadata = {
  title: "Retro Radio Showcase - StyleKit",
  description: "Live demonstration of Retro Radio animation style with vintage dial effects and warm analog aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function RetroRadioShowcasePage() {
  return <ShowcaseContent />;
}
