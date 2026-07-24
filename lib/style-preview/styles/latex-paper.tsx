import type { StylePreviewComponents } from "../types";

const preview = {
    button: () => (
      <button className="px-6 py-2.5 bg-[#111111] text-[#FFFFFF] font-serif text-sm tracking-tight rounded-none border border-[#111111] hover:bg-[#FFFFFF] hover:text-[#111111] transition-colors duration-200">
        Download PDF
      </button>
    ),
    card: () => (
      <div className="bg-[#F5F5F0] border-l-2 border-[#111111] rounded-none px-6 py-5 font-serif">
        <p className="text-[15px] leading-relaxed text-[#111111]">
          <span className="font-bold">Theorem 1.</span>{" "}
          <span className="italic">Order, once visible, reads as credibility.</span>
        </p>
        <p className="text-sm text-[#6B6B66] mt-2">
          See Section <span className="text-[#0B5394]">2.1</span> for the proof.
        </p>
      </div>
    ),
    input: () => (
      <input
        type="text"
        placeholder="name@university.edu"
        className="w-full px-3 py-2 bg-[#FFFFFF] font-serif text-sm text-[#111111] placeholder:text-[#6B6B66] placeholder:italic border border-[#D4D4D0] rounded-none focus:outline-none focus:border-[#111111] transition-colors duration-200"
      />
    ),
    coverPreview: () => (
      <div className="w-full h-full bg-[#F5F5F0] flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] bg-white border border-[#D4D4D0] px-4 py-3 font-serif">
          <div className="h-1.5 w-24 bg-[#111111] mx-auto mb-1.5" />
          <div className="h-1 w-16 bg-[#6B6B66]/60 mx-auto mb-2" />
          <div className="space-y-1 px-3 mb-2">
            <div className="h-0.5 w-full bg-[#D4D4D0]" />
            <div className="h-0.5 w-full bg-[#D4D4D0]" />
            <div className="h-0.5 w-2/3 bg-[#D4D4D0]" />
          </div>
          <p className="text-center italic text-[8px] text-[#111111] leading-none mb-2">
            Better = (A+O)/(A+O+M+I)&nbsp;&nbsp;(1)
          </p>
          <div className="border-t-2 border-b-2 border-[#111111] py-1 space-y-1">
            <div className="flex justify-between px-1">
              <div className="h-0.5 w-8 bg-[#6B6B66]" />
              <div className="h-0.5 w-4 bg-[#6B6B66]" />
            </div>
            <div className="border-t border-[#111111]" />
            <div className="flex justify-between px-1">
              <div className="h-0.5 w-10 bg-[#D4D4D0]" />
              <div className="h-0.5 w-4 bg-[#D4D4D0]" />
            </div>
            <div className="flex justify-between px-1">
              <div className="h-0.5 w-7 bg-[#D4D4D0]" />
              <div className="h-0.5 w-5 bg-[#D4D4D0]" />
            </div>
          </div>
          <p className="text-center text-[7px] text-[#0B5394] mt-1.5">[1] Osgood et al., 1957</p>
        </div>
      </div>
    ),
  } satisfies StylePreviewComponents;

export default preview;
