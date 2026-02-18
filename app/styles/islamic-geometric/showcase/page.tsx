import dynamic from "next/dynamic";

export const metadata = {
  title: "Islamic Geometric Showcase - StyleKit",
  description:
    "Live demonstration of Islamic Geometric design with tessellation patterns, golden ornaments, and deep blue elegance.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
