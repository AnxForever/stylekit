import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Art Nouveau Style Showcase",
  description: "Organic curves, floral ornaments and elegant flowing lines",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
