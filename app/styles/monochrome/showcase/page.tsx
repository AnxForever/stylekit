import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Monochrome Showcase - StyleKit",
  description:
    "Live demonstration of Monochrome design with pure grayscale hierarchy, bold typography contrast, and generous negative space.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
