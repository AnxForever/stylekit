import dynamic from "next/dynamic";

export const metadata = {
  title: "Surrealism Showcase - StyleKit",
  description: "Live demonstration of Surrealism design style with dreamlike scenes, melting forms, and Dali-inspired visual aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function SurrealismShowcasePage() {
  return <ShowcaseContent />;
}
