import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Tropical Paradise Showcase - StyleKit",
  description:
    "Live demonstration of Tropical Paradise design with sun-kissed palettes, vibrant coral and teal, and a breezy resort aesthetic.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
