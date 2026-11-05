import React, { useState } from "react";
import { ArrowUpRight, CheckIcon } from "./Icons";

export default function ContactView({ lang }) {
  const [copied, setCopied] = useState(false);
  const email = "yudadwiputra@gmail.com";
  const phone = "+62 895 2521 4959";

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-[85svh] flex flex-col justify-center px-[clamp(18px,4vw,40px)] pt-[calc(var(--nav-top)+24px)] pb-20">
      <div className="max-w-5xl mx-auto w-full space-y-8 sm:space-y-10 text-center">
        <p className="text-xs sm:text-sm tracking-wide text-[#ea4530] font-bold">
          {lang === "en"
            ? "Jakarta, Indonesia"
            : "Jakarta, Indonesia"}
        </p>

        {/* Exact Kenji /contact lowercase headline */}
        <h1 className="font-stamp text-[clamp(44px,11vw,122px)] leading-[0.98] lowercase text-[#f1eec0] text-balance">
          {lang === "en" ? (
            <>
              got a system to build?{" "}
              <span className="text-[#3aa1d8]">let&apos;s talk</span>
            </>
          ) : (
            <>
              punya sistem untuk dirancang?{" "}
              <span className="text-[#3aa1d8]">mari ngobrol</span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg text-[#f1eec0]/75 max-w-xl mx-auto">
          {lang === "en"
            ? "Need a Business Analyst, System Analyst, or QA Leader for Core Banking, Treasury or Enterprise Modernization? Reach out directly via email or WhatsApp."
            : "Butuh Business Analyst, System Analyst, atau QA Leader untuk Core Banking, Treasury atau Modernisasi Enterprise? Hubungi langsung lewat email atau WhatsApp."}
        </p>

        {/* Big Email Pill + WhatsApp + Copy Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center gap-2 max-w-full text-[clamp(15px,4.4vw,24px)] font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors lowercase break-all"
          >
            <span>{email}</span>
            <ArrowUpRight />
          </a>
          <a
            href="https://wa.me/6289525214959"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-base sm:text-lg font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] transition-colors"
          >
            <span>WhatsApp</span>
            <ArrowUpRight />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-3.5 sm:py-4 rounded-full border border-[#f1eec0]/25 text-[#f1eec0] hover:border-[#3aa1d8] hover:text-[#3aa1d8] transition-colors cursor-pointer lowercase"
          >
            {copied ? (
              <>
                <span>{lang === "en" ? "copied" : "tersalin"}</span>
                <CheckIcon className="text-[#27c93f]" />
              </>
            ) : (
              <span>{lang === "en" ? "copy email" : "salin email"}</span>
            )}
          </button>
        </div>

        {/* Social Links Row */}
        <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg sm:text-xl font-bold text-[#f1eec0]/75">
          <a
            href="https://www.linkedin.com/in/yudadputra"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#3aa1d8] transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight />
          </a>
          <a
            href="https://github.com/yudadwiptr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#3aa1d8] transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight />
          </a>
          <a
            href="https://wa.me/6289525214959"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#3aa1d8] transition-colors"
          >
            <span>WhatsApp</span>
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
}
