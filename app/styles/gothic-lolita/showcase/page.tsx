import dynamic from "next/dynamic";

export const metadata = {
  title: "Gothic Lolita Style Showcase",
  description: "Victorian lace, dark ribbons and elegant porcelain doll aesthetics",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
