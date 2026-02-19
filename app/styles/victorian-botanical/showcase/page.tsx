import dynamic from "next/dynamic";

export const metadata = {
  title: "Victorian Botanical Showcase - StyleKit",
  description:
    "Live demonstration of Victorian Botanical design with delicate line drawings, floral ornaments, and the timeless elegance of the natural history museum.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
