import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ArchiveNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f2ec] px-5 text-[#24231f]">
      <section className="max-w-xl text-center">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/45">404 / NOT IN THE ARCHIVE</p>
        <h1 className="mt-6 font-serif text-7xl leading-[0.8] tracking-[-0.07em]">This page<br /><em className="text-[#5149cf]">drifted away.</em></h1>
        <p className="mx-auto mt-7 max-w-sm text-sm leading-7 text-[#24231f]/60">The entry may have moved, or it was never part of this collection.</p>
        <Link href="/templates/editorial-profile-archive" className="mt-8 inline-flex items-center gap-2 bg-[#24231f] px-5 py-3 font-mono text-[10px] tracking-[0.14em] text-[#f5f2ec] no-underline transition-colors hover:bg-[#5149cf]">RETURN TO ARCHIVE <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
