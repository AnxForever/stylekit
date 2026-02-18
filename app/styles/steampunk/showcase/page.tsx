import dynamic from "next/dynamic";

export const metadata = {
  title: "Steampunk Showcase - StyleKit",
  description: "Live demonstration of Steampunk design with brass textures, gears, and Victorian-industrial aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
