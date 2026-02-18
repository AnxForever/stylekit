import dynamic from "next/dynamic";

export const metadata = {
  title: "Art Nouveau Style Showcase",
  description: "Organic curves, floral ornaments and elegant flowing lines",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
