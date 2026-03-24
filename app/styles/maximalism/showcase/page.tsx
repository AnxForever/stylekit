import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Maximalism Showcase - StyleKit",
  description:
    "Live demonstration of Maximalism design with layered decorations, gradient backgrounds, multi-layer shadows, and mixed typography.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
