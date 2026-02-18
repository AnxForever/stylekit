import dynamic from "next/dynamic";

export const metadata = {
  title: "GitHub Style Showcase - StyleKit",
  description:
    "Live demonstration of GitHub Style design with clean gray-scale hierarchy, blue interaction color, and developer-friendly information architecture.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
