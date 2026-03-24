import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Cyber Chinese Style Showcase",
  description: "Traditional Chinese culture fused with cyberpunk neon aesthetics",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
