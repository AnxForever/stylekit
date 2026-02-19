import dynamic from "next/dynamic";

export const metadata = {
  title: "Cubism Showcase - StyleKit",
  description:
    "Live demonstration of Cubism design with geometric fragmentation, multiple perspectives, and earth-toned palettes inspired by Picasso and Braque.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  return <ShowcaseContent />;
}
