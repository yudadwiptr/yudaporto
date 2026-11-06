import React, { useState } from "react";
import { ArrowUpRight, ArrowRight, CheckIcon, DownloadIcon } from "./Icons";
import { CV_URL, CV_FILENAME } from "../data/portfolioData";

export default function FooterSection({ lang, setActivePage }) {
  const [copied, setCopied] = useState(false);
  const email = "yudadwiputra@gmail.com";
  const phone = "+62 895 2521 4959";

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer className="relative overflow-hidden flex flex-col justify-end pt-[clamp(40px,8vh,110px)] pb-[clamp(56px,8vh,84px)] border-t border-white/10 bg-[#0a0a0a]">
      {/* Top Row: Elsewhere list + Contact page link */}
      <div className="relative z-10 px-[clamp(18px,4vw,40px)] pb-[clamp(24px,6vh,90px)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-[clamp(14px,2.4vh,26px)] sm:flex-row sm:items-start sm:justify-between">
          <p className="text-xs tracking-wide text-[#f1eec0]/45 lowercase">
            {lang === "en" ? "elsewhere" : "di tempat lain"}
          </p>
          <ul className="flex flex-col gap-[2px] sm:border-l sm:border-[#f1eec0]/15 sm:pl-[clamp(20px,3vw,52px)] sm:min-w-[clamp(180px,26vw,420px)]">
            <li>
              <a
                href="https://www.linkedin.com/in/yudadputra"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[clamp(20px,2.4vw,34px)] leading-[1.28] tracking-[-0.01em] font-ui text-[#f1eec0]/85 transition-colors duration-300 hover:text-[#3aa1d8]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yudadwiptr"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[clamp(20px,2.4vw,34px)] leading-[1.28] tracking-[-0.01em] font-ui text-[#f1eec0]/85 transition-colors duration-300 hover:text-[#3aa1d8]"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6289525214959"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[clamp(20px,2.4vw,34px)] leading-[1.28] tracking-[-0.01em] font-ui text-[#f1eec0]/85 transition-colors duration-300 hover:text-[#3aa1d8]"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-block text-[clamp(20px,2.4vw,34px)] leading-[1.28] tracking-[-0.01em] font-ui text-[#f1eec0]/85 transition-colors duration-300 hover:text-[#3aa1d8]"
              >
                Mail
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={CV_URL}
            download={CV_FILENAME}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-xs sm:text-sm tracking-wide text-[#f1eec0]/60 hover:text-[#f1eec0] lowercase"
          >
            <DownloadIcon />
            <span>{lang === "en" ? "download cv" : "unduh cv"}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setActivePage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-xs sm:text-sm tracking-wide text-[#f1eec0]/60 underline-offset-4 hover:text-[#f1eec0] hover:underline cursor-pointer lowercase"
          >
            <span>{lang === "en" ? "contact page" : "halaman kontak"}</span>
            <ArrowRight />
          </button>

          <a
            href={`mailto:${email}`}
            className="md:hidden inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-4 py-2 transition-colors shadow-lg bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] lowercase"
          >
            <span>{lang === "en" ? "let's talk" : "mari ngobrol"}</span>
            <ArrowUpRight />
          </a>
        </div>
      </div>

      {/* Bottom Mega Email Marquee (Exact Kenji Lambert lowercase layout) */}
      <div className="relative z-10">
        <div
          className="overflow-hidden whitespace-nowrap select-none pt-[0.08em] pb-0 cursor-pointer"
          onClick={handleCopyEmail}
          title="Click to copy email address"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex animate-marquee text-[clamp(56px,13.5vw,190px)] tracking-tight lowercase font-stamp leading-[1.0]">
            {[0, 1, 2, 3].map((item) => (
              <span
                key={item}
                className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
              >
                <span className="hover:text-[#3aa1d8] transition-colors">
                  {email}
                </span>
                <span
                  style={{
                    color: "var(--accent-red)",
                    transform: "translateY(0.14em)",
                  }}
                >
                  *
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Floating Right CTA Overlay Pill */}
        <div className="absolute inset-0 flex items-center pointer-events-none justify-end pr-[clamp(18px,4vw,40px)]">
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-4 py-2 transition-colors shadow-lg bg-[#f1eec0] text-[#0a0a0a] hover:bg-[#ea4530] hover:text-[#f1eec0] cursor-pointer lowercase"
            >
              {copied ? (
                <>
                  <span>{lang === "en" ? "copied to clipboard" : "email tersalin"}</span>
                  <CheckIcon />
                </>
              ) : (
                <span>{lang === "en" ? "copy email" : "salin email"}</span>
              )}
            </button>
            <a
              href={`mailto:${email}`}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-4 py-2 transition-colors shadow-lg bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] hover:text-[#0a0a0a] lowercase"
            >
              <span>{lang === "en" ? "let's talk" : "mari ngobrol"}</span>
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
