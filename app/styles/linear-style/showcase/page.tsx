import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Linear Style Showcase - StyleKit",
  description:
    "Live demonstration of Linear Style: precise dark UI, restrained typography, subtle borders, and developer-focused aesthetics.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function LinearStyleShowcase() {
  return <ShowcaseContent />;
}
