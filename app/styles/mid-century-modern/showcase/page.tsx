import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Mid-Century Modern Showcase - StyleKit",
  description:
    "Live demonstration of Mid-Century Modern design with atomic age optimism, organic curves, and warm saturated colors.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
