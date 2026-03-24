import dynamicImport from "next/dynamic";
export const dynamic = "force-static";


export const metadata = {
  title: "Frutiger Aero Showcase - StyleKit",
  description: "Live demonstration of Frutiger Aero design style with sky-blue glass aesthetic inspired by Windows Vista/7.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function FrutigerAeroShowcasePage() {
  return <ShowcaseContent />;
}
