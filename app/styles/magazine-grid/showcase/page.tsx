import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Magazine Grid Showcase - StyleKit",
  description: "Live demonstration of Magazine Grid layout for news sites and content hubs.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MagazineGridShowcasePage() {
  return <ShowcaseContent />;
}
