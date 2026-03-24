import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Outrun Retro-Future Style Showcase",
  description: "80s sunset gradients, chrome typography and grid horizons",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
