import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Neon Samurai Style Showcase",
  description: "Japanese tradition meets cyberpunk neon showcase",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
