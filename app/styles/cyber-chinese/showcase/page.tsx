import dynamic from "next/dynamic";

export const metadata = {
  title: "Cyber Chinese Style Showcase",
  description: "Traditional Chinese culture fused with cyberpunk neon aesthetics",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
