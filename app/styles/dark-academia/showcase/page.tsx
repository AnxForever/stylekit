import dynamic from "next/dynamic";

export const metadata = {
  title: "Dark Academia Style Showcase",
  description: "Classical literature, leather-bound books and scholarly aesthetics",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
