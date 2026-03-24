import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Material Design Showcase - StyleKit",
  description: "Live demonstration of Google's Material Design with elevation shadows, bold colors, and meaningful motion.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function MaterialDesignShowcasePage() {
  return <ShowcaseContent />;
}
