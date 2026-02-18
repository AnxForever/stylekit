import dynamic from "next/dynamic";

export const metadata = {
  title: "Glitch Art Style Showcase",
  description: "Digital corruption and RGB distortion effects showcase",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
