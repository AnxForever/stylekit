import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type TemplateButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
};

export function TemplateButton({ href, children, variant = "solid" }: TemplateButtonProps) {
  const styles = {
    solid: "bg-[#24231f] text-[#f5f2ec] hover:bg-[#5149cf]",
    outline: "border border-[#24231f]/25 text-[#24231f] hover:border-[#24231f] hover:bg-[#ebe7dc]",
    text: "border-b border-[#24231f]/30 text-[#24231f] hover:border-[#ef6b7a]",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 px-4 py-3 font-mono text-[10px] tracking-[0.14em] no-underline transition-colors ${variant === "text" ? "px-0 py-1" : ""} ${styles}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </Link>
  );
}
