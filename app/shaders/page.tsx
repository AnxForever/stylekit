import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShaderLab } from "@/components/shaders/shader-lab";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Shader Lab — Zero-Dependency WebGL2 Backgrounds, Tuned Live",
  description:
    "Zero-dependency WebGL2 background shaders from Paper's open-source library: gradients, fluids, noise, patterns and optics. Tune every parameter live and copy the React snippet.",
};

export default function ShadersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ShaderLab />
      </main>
      <Footer />
    </div>
  );
}
