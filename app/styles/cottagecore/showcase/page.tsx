import dynamic from "next/dynamic";

export const metadata = {
  title: "Cottagecore Style Showcase",
  description: "Rural idyll aesthetics with flowers, honey and handcraft warmth",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
