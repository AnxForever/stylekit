import type { StylePreviewComponents } from "../types";
import { QuantizedLineCover, QuantizedLineCardPreview } from "@/components/styles/quantized-line-field/cover";
const preview = {
  coverPreview: () => <QuantizedLineCover />,
  card: () => <QuantizedLineCardPreview />,
  button: () => <button type="button" className="border border-[#d9dbd5] rounded-full bg-transparent px-5 py-2.5 text-sm text-[#202220] hover:border-[#267dff] focus-visible:outline-2 focus-visible:outline-[#267dff]">Reveal the source →</button>,
  input: () => <input aria-label="Project name" placeholder="Project name" className="w-full rounded-xl border border-[#d9dbd5] bg-[#fafaf8] p-3 text-sm text-[#202220] focus-visible:outline-2 focus-visible:outline-[#267dff]" />,
} satisfies StylePreviewComponents;
export default preview;