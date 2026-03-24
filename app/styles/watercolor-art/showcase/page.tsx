import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Watercolor Art Style Showcase",
  description: "Soft watercolor washes and artistic brush strokes showcase",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
