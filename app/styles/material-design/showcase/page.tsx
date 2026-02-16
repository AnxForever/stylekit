import dynamic from "next/dynamic";

export const metadata = {
  title: "Material Design Showcase - StyleKit",
  description: "Live demonstration of Google's Material Design with elevation shadows, bold colors, and meaningful motion.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MaterialDesignShowcasePage() {
  return <ShowcaseContent />;
}
