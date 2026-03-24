import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Dark Academia Style Showcase",
  description: "Classical literature, leather-bound books and scholarly aesthetics",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
