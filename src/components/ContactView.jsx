import React, { useState } from "react";

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
      <div className="max-w-5xl mx-auto w-full space-y-10 text-center">
        <p className="text-xs sm:text-sm tracking-wide text-[#ea4530] font-bold lowercase">
          {lang === "en"
            ? "* jakarta, indonesia · system & business analyst | core banking & treasury"
            : "* jakarta, indonesia · system & business analyst | core banking & treasury"}
        </p>

        {/* Exact Kenji /contact lowercase headline */}
        <h1 className="font-stamp text-[clamp(48px,9vw,122px)] leading-[0.98] lowercase text-[#f1eec0]">
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
            ? "Need a Business Analyst, System Analyst, or QA Leader for Core Banking, Treasury, H2H APIs, or Enterprise Modernization? Reach out directly via email or WhatsApp."
            : "Butuh Business Analyst, System Analyst, atau QA Leader untuk Core Banking, Treasury, H2H API, atau Modernisasi Enterprise? Hubungi langsung lewat email atau WhatsApp."}
        </p>

        {/* Big Email Pill + WhatsApp + Copy Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`mailto:${email}`}
            className="text-lg sm:text-2xl font-bold px-7 py-4 rounded-full bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors lowercase"
          >
            {email} ↗
          </a>
          <a
            href="https://wa.me/6289525214959"
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg font-bold px-7 py-4 rounded-full bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] transition-colors"
          >
            WhatsApp ↗
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="text-xs font-bold px-5 py-4 rounded-full border border-[#f1eec0]/25 text-[#f1eec0] hover:border-[#3aa1d8] hover:text-[#3aa1d8] transition-colors cursor-pointer lowercase"
          >
            {copied
              ? lang === "en"
                ? "copied ✓"
                : "tersalin ✓"
              : lang === "en"
              ? "copy email"
              : "salin email"}
          </button>
        </div>

        {/* Social Links Row */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-lg sm:text-xl font-bold text-[#f1eec0]/75">
          <a
            href="https://www.linkedin.com/in/yudadputra"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#3aa1d8] transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/yudadwiptr"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#3aa1d8] transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://wa.me/6289525214959"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#3aa1d8] transition-colors"
          >
            WhatsApp ↗
          </a>
        </div>
      </div>
    </div>
  );
}
