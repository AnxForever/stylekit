import dynamic from "next/dynamic";

export const metadata = {
  title: "Swiss Poster Style Showcase",
  description: "Bold experimental typography and grid-based poster design showcase",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
