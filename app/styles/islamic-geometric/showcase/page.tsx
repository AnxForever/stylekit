import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Islamic Geometric Showcase - StyleKit",
  description:
    "Live demonstration of Islamic Geometric design with tessellation patterns, golden ornaments, and deep blue elegance.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
