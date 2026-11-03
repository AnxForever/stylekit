import type { StylePreviewComponents } from "../types";
import { DiffractionFoilButtonPreview, DiffractionFoilCardPreview, DiffractionFoilCover } from "@/components/styles/diffraction-foil/cover";

const preview = {
  coverPreview: () => <DiffractionFoilCover />,
  card: () => <DiffractionFoilCardPreview />,
  button: () => <DiffractionFoilButtonPreview />,
  input: () => (
    <input
      aria-label="Redeem code"
      placeholder="XXXX-XXXX-XXXX"
      className="w-full rounded-xl border border-white/15 bg-[#141319] px-4 py-3 font-mono tracking-[0.2em] text-[#ececf2] placeholder:text-[#6c6b78] focus:border-[#c9c8d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9c8d4]/40"
    />
  ),
} satisfies StylePreviewComponents;

export default preview;
