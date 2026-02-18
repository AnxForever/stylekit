import dynamic from "next/dynamic";

export const metadata = {
  title: "Gothic Style Showcase",
  description: "Dark medieval aesthetics with pointed arches and stained glass",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
