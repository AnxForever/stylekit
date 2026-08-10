"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  if (status === "sent") {
    return (
      <div className="border border-[#24231f]/15 bg-[#ebe7dc] p-8 sm:p-10">
        <Check className="h-5 w-5 text-[#5149cf]" aria-hidden="true" />
        <h2 className="mt-6 font-serif text-5xl leading-[0.9] tracking-[-0.05em]">Message received.</h2>
        <p className="mt-5 max-w-md text-sm leading-7 text-[#24231f]/60">This demo form is ready to connect to your email provider or API route. The local interaction is complete.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 inline-flex items-center gap-1 border-b border-[#24231f] pb-2 text-xs tracking-[0.12em]">SEND ANOTHER <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></button>
      </div>
    );
  }

  return (
    <form onSubmit={async (event) => { event.preventDefault(); setStatus("submitting"); try { await new Promise((resolve) => window.setTimeout(resolve, 550)); setStatus("sent"); } catch { setStatus("error"); } }} className="space-y-7 border border-[#24231f]/15 bg-[#fbfaf7] p-7 sm:p-10">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="text-xs">Name<input required name="name" className="mt-3 block w-full border-0 border-b border-[#24231f]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-[#5149cf]" placeholder="Your name" /></label>
        <label className="text-xs">Email<input required type="email" name="email" className="mt-3 block w-full border-0 border-b border-[#24231f]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-[#5149cf]" placeholder="you@example.com" /></label>
      </div>
      <label className="block text-xs">What are you working on?<textarea required name="message" rows={5} className="mt-3 block w-full resize-y border border-[#24231f]/15 bg-transparent p-3 text-sm outline-none transition-colors focus:border-[#5149cf]" placeholder="A short note is enough." /></label>
      {status === "error" ? <p role="alert" className="text-sm text-[#b24756]">Something went wrong. Please try again or use the direct email.</p> : null}
      <button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"} className="inline-flex items-center gap-2 bg-[#24231f] px-5 py-3 text-xs tracking-[0.1em] text-[#f5f2ec] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
        {status === "submitting" ? "SENDING…" : "SEND NOTE"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
