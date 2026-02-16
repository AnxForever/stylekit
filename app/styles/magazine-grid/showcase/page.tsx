import dynamic from "next/dynamic";

export const metadata = {
  title: "Magazine Grid Showcase - StyleKit",
  description: "Live demonstration of Magazine Grid layout for news sites and content hubs.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MagazineGridShowcasePage() {
  return <ShowcaseContent />;
}
