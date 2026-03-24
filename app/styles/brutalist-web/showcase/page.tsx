import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Brutalist Web Showcase - StyleKit",
  description:
    "Live demonstration of Brutalist Web design with raw HTML aesthetics, system fonts, and 90s internet simplicity.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
