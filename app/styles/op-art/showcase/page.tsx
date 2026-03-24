import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Op Art Showcase - StyleKit",
  description:
    "Live demonstration of Op Art design with optical illusions, geometric precision, and high-contrast black-white patterns.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
