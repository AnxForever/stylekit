import dynamic from "next/dynamic";

export const metadata = {
  title: "Outrun Retro-Future Style Showcase",
  description: "80s sunset gradients, chrome typography and grid horizons",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
