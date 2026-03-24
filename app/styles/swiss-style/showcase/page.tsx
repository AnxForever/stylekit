import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Swiss International Showcase - StyleKit",
  description: "Live demonstration of Swiss International Style with grid systems, Helvetica typography, and rational design.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SwissStyleShowcasePage() {
  return <ShowcaseContent />;
}
