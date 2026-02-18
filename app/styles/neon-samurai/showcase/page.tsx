import dynamic from "next/dynamic";

export const metadata = {
  title: "Neon Samurai Style Showcase",
  description: "Japanese tradition meets cyberpunk neon showcase",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
