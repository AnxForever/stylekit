import dynamic from "next/dynamic";

export const metadata = {
  title: "Tropical Paradise Showcase - StyleKit",
  description:
    "Live demonstration of Tropical Paradise design with sun-kissed palettes, vibrant coral and teal, and a breezy resort aesthetic.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
