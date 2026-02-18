import dynamic from "next/dynamic";

export const metadata = {
  title: "Surrealism Style Showcase",
  description: "Dreamlike scenes, impossible spaces and subconscious beauty",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
