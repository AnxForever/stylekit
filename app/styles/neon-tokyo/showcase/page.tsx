import dynamic from "next/dynamic";

export const metadata = {
  title: "Neon Tokyo Showcase - StyleKit",
  description: "Live demonstration of Neon Tokyo design with multi-color neon glows, rain-slicked reflections, and urban nightscape aesthetic.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
