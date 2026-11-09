import dynamicImport from "next/dynamic";

export const dynamic = "force-static";
export const dynamicParams = false;

export const metadata = {
  title: "E-Ink Showcase | StyleKit",
  description: "An original grayscale, paper-toned web interface reference.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen bg-[#f5f3ea]" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
