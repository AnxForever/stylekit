import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Mecha Style Showcase",
  description: "Giant robot aesthetics with tactical HUD, warning labels and mechanical blueprints",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
