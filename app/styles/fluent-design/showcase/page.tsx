import dynamic from "next/dynamic";

export const metadata = {
  title: "Fluent Design Showcase - StyleKit",
  description: "Live demonstration of Microsoft's Fluent Design with acrylic effects, depth, and light-based interactions.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function FluentDesignShowcasePage() {
  return <ShowcaseContent />;
}
