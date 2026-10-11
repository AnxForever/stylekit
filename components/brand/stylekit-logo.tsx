import Image from "next/image";
import { cn } from "@/lib/utils";

interface StyleKitLogoProps {
  className?: string;
  inverse?: boolean;
}

export function StyleKitLogo({ className, inverse = false }: StyleKitLogoProps) {
  return (
    <Image
      src={`/brand/stylekit-horizontal-${inverse ? "white" : "ink"}.svg`}
      alt="StyleKit"
      width={760}
      height={256}
      unoptimized
      className={cn("block shrink-0", !inverse && "dark:invert", className)}
    />
  );
}
