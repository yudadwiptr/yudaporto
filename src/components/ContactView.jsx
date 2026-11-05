import React, { useState } from "react";

export default function ContactView({ lang }) {
  const [copied, setCopied] = useState(false);
  const email = "yudadwiputra@gmail.com";

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-[85svh] flex flex-col justify-center px-[clamp(18px,4vw,40px)] pt-[calc(var(--nav-top)+24px)] pb-20">
      <div className="max-w-5xl mx-auto w-full space-y-10 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-[#ea4530] font-bold">
          {lang === "en"
            ? "* AVAILABLE FOR SELECTED PROJECTS & COLLABORATIONS"
            : "* TERSEDIA UNTUK PROYEK & KOLABORASI PILIHAN"}
        </p>

        {/* Exact Kenji /contact headline */}
        <h1 className="font-stamp text-[clamp(44px,8.5vw,116px)] leading-[0.98] uppercase text-[#f1eec0]">
          {lang === "en" ? (
            <>
              got a project in mind?{" "}
              <span className="text-[#3aa1d8]">let&apos;s talk</span>
            </>
          ) : (
            <>
              punya ide proyek?{" "}
              <span className="text-[#3aa1d8]">mari ngobrol</span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg text-[#f1eec0]/75 max-w-xl mx-auto">
          {lang === "en"
            ? "Got a product to design, a web experience to engineer, or just want to say hi? Drop a line directly."
            : "Punya produk untuk dirancang, web interaktif untuk dibangun, atau sekadar ingin menyapa? Kirim pesan langsung."}
        </p>

        {/* Big Email Pill + Copy Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`mailto:${email}`}
            className="text-lg sm:text-2xl font-bold px-7 py-4 rounded-full bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors"
          >
            {email} ↗
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="text-xs font-bold uppercase tracking-[0.1em] px-5 py-4 rounded-full border border-[#f1eec0]/25 text-[#f1eec0] hover:border-[#3aa1d8] hover:text-[#3aa1d8] transition-colors cursor-pointer"
          >
            {copied
              ? lang === "en"
                ? "Copied ✓"
                : "Tersalin ✓"
              : lang === "en"
              ? "Copy Email"
              : "Salin Email"}
          </button>
        </div>

        {/* Social Links Row */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-lg sm:text-xl font-bold text-[#f1eec0]/75">
          <a
            href="https://github.com/yudadwiptr"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#3aa1d8] transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#3aa1d8] transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#3aa1d8] transition-colors"
          >
            Instagram ↗
          </a>
          <a
            href="https://www.behance.net/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#3aa1d8] transition-colors"
          >
            Behance ↗
          </a>
        </div>
      </div>
    </div>
  );
}

