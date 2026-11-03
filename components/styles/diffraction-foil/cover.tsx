import type { CSSProperties } from "react";
import { DIFFRACTION_FOIL_SPECTRUM } from "@/lib/styles/diffraction-foil-art";
import styles from "./showcase.module.css";

/**
 * Static previews for the catalog. No lamp script runs here, so each foil gets a fixed
 * lamp direction and spectrum window chosen to show silver with two or three bands.
 */
const sheet = { "--spectrum": DIFFRACTION_FOIL_SPECTRUM } as CSSProperties;
const lamp = (k: number, size: number, position: number, lx: string, ly: string) =>
  ({ "--k": `${k}deg`, "--bs": `${size}px`, "--bp": `${position}px`, "--lx": lx, "--ly": ly }) as CSSProperties;

export function DiffractionFoilCover() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0c0b10] p-5" style={sheet} aria-hidden="true">
      <div className="absolute inset-3 rounded-md border border-dashed border-white/10" />
      <div className={`${styles.foil} relative flex aspect-[1.8] w-[74%] max-w-[300px] items-end overflow-hidden rounded-lg p-3 shadow-[0_18px_30px_-18px_rgba(0,0,0,0.9)]`} style={lamp(28, 900, -380, "78%", "8%")}>
        <span className={`${styles.text} text-3xl font-extrabold tracking-tight`} style={lamp(0, 700, -310, "70%", "0%")}>Lumen</span>
      </div>
      <div className={`${styles.seal} absolute bottom-4 right-5 h-12 w-12`} style={{ "--la": "52deg", "--sc": "#4fd4c0", "--sc2": "#f2c96a" } as CSSProperties} />
    </div>
  );
}

export function DiffractionFoilCardPreview() {
  return (
    <div className="w-full max-w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#141319] p-4 text-[#ececf2]" style={sheet}>
      <div className={`${styles.foil} relative mb-3 flex aspect-[1.8] items-end overflow-hidden rounded-xl p-3`} style={lamp(30, 820, -330, "75%", "10%")}>
        <span className={`${styles.text} text-2xl font-extrabold tracking-tight`} style={lamp(0, 600, -250, "70%", "0%")}>Lumen</span>
      </div>
      <p className="font-semibold">Lumen · No. 042</p>
      <p className="mt-1 text-sm text-[#a9a8b6]">Hot-stamped diffraction foil</p>
    </div>
  );
}

export function DiffractionFoilButtonPreview() {
  return (
    <button
      type="button"
      className={`${styles.foil} ${styles.light} relative inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 font-semibold tracking-wide text-[#16151c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c8d4]`}
      style={{ ...sheet, ...lamp(24, 520, -200, "70%", "0%") }}
    >
      Open a pack
    </button>
  );
}
