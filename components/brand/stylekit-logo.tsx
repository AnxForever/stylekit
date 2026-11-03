import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/lib/brand/assets";

interface StyleKitLogoProps {
  className?: string;
  inverse?: boolean;
}

export function StyleKitLogo({ className, inverse = false }: StyleKitLogoProps) {
  return (
    <Image
      src={inverse ? BRAND_ASSETS.logoInverse : BRAND_ASSETS.logo}
      alt="StyleKit"
      width={760}
      height={256}
      unoptimized
      className={cn("block shrink-0", !inverse && "dark:invert", className)}
    />
  );
}
