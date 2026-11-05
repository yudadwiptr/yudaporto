import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChatIcon,
  LockIcon,
  ExpandIcon,
  CloseIcon,
  GlobeIcon,
  InviteIcon,
  CartIcon,
  BoltIcon,
} from "./Icons";

const SERVICES = [
  {
    Icon: GlobeIcon,
    color: "#3aa1d8",
    hover: "hover:border-[#3aa1d8]/40",
    title: "Website Bisnis & Profil",
    desc: "Next.js, Tailwind CSS, animasi halus, dan SEO prima untuk kredibilitas bisnis.",
  },
  {
    Icon: InviteIcon,
    color: "#ea4530",
    hover: "hover:border-[#ea4530]/40",
    title: "Undangan Online",
    desc: "RSVP real-time, musik latar, kisah cinta, hitung mundur, dan amplop digital.",
  },
  {
    Icon: CartIcon,
    color: "#f1eec0",
    hover: "hover:border-[#f1eec0]/40",
    title: "Toko Online & WA",
    desc: "Katalog produk elegan dengan sistem pemesanan langsung otomatis ke WhatsApp.",
  },
  {
    Icon: BoltIcon,
    color: "#3aa1d8",
    hover: "hover:border-[#3aa1d8]/40",
    title: "Custom Web App",
    desc: "Dashboard analitik, portal internal, form interaktif, dan integrasi API.",
  },
];

export default function StudioLabView({
  lang,
  setActivePage,
}) {
  const [screenshotModal, setScreenshotModal] = useState(false);

  return (
    <div className="pt-[calc(var(--nav-top)+24px)] pb-24">
      {/* Giant Studio Marquee (Kenji brutalist aesthetic) */}
      <div
        className="overflow-hidden whitespace-nowrap select-none py-2 border-b border-[#f1eec0]/10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex animate-marquee text-[clamp(48px,11vw,144px)] tracking-tight lowercase font-stamp leading-[1.04]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
            >
              <span>yuma studio</span>
              <span className="text-[#ea4530] translate-y-[0.12em]">*</span>
              <span className="text-[#3aa1d8]">digital builds</span>
              <span className="text-[#ea4530] translate-y-[0.12em]">*</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-[clamp(18px,4vw,40px)] max-w-6xl mx-auto pt-10 space-y-12">
        {/* ==================== YUMA STUDIO HERO SHOWCASE ==================== */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse" />
                <span className="text-xs text-[#ea4530] font-bold font-mono tracking-wider">
                  PRODUCTION STUDIO // JAKARTA
                </span>
              </div>
              <h1 className="font-stamp text-[clamp(30px,7vw,48px)] leading-[1.02] lowercase mt-1 text-[#f1eec0] text-balance">
                yuma studio — creative web &amp; digital builds
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://yumastudio.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold rounded-full px-5 py-2.5 bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors cursor-pointer lowercase flex items-center gap-1.5"
              >
                <span>{lang === "en" ? "visit yumastudio.digital" : "kunjungi yumastudio.digital"}</span>
                <ArrowUpRight />
              </a>
              <a
                href="https://wa.me/6289525214959?text=Halo%20Yuma%20Studio%2C%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold rounded-full px-4 py-2.5 bg-[#0a0a0a] text-[#f1eec0] border border-[#f1eec0]/20 hover:border-[#3aa1d8] hover:text-[#3aa1d8] transition-colors cursor-pointer lowercase flex items-center gap-1.5"
              >
                <ChatIcon className="text-[1.15em]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ==================== BROWSER WINDOW FRAME WITH OFFICIAL SCREENSHOT ==================== */}
          <div className="rounded-2xl border border-[#f1eec0]/20 bg-[#121212] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            {/* Browser Top Navigation Bar */}
            <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-3 bg-[#0a0a0a] border-b border-[#f1eec0]/10">
              {/* Traffic Light Dots */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* URL Address Bar with SSL Lock */}
              <a
                href="https://yumastudio.digital/"
                target="_blank"
                rel="noopener noreferrer"
                title="Buka https://yumastudio.digital/"
                className="group flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#161616] border border-[#f1eec0]/15 text-[11px] sm:text-xs font-mono text-[#f1eec0]/80 hover:border-[#3aa1d8] hover:text-[#f1eec0] transition-colors max-w-md w-full min-w-0 justify-center"
              >
                <LockIcon className="text-[#27c93f]" />
                <span className="text-[#f1eec0] underline-offset-2 group-hover:underline truncate">
                  https://yumastudio.digital/
                </span>
                <ArrowUpRight className="text-[#3aa1d8] opacity-70 group-hover:opacity-100" />
              </a>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#27c93f] shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Official Screenshot Banner Container */}
            <div className="relative group overflow-hidden bg-[#0a0a0a]">
              <a
                href="https://yumastudio.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden"
              >
                <img
                  src="/yumastudio-preview.jpg"
                  alt="Yuma Studio Official Website Preview - Kami Merancang Website"
                  className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                />
                {/* Floating overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-5 py-2.5 rounded-full bg-[#ea4530] text-[#f1eec0] font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2">
                    <span>{lang === "en" ? "Launch yumastudio.digital" : "Buka yumastudio.digital"}</span>
                    <ArrowUpRight />
                  </div>
                </div>
              </a>

              {/* Expand Screenshot Button */}
              <button
                type="button"
                onClick={() => setScreenshotModal(true)}
                title="Zoom Screenshot"
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black text-[#f1eec0] border border-[#f1eec0]/20 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ExpandIcon />
                <span>Zoom</span>
              </button>
            </div>

            {/* Information & Services Detail Bar */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-[#141414] to-[#0c0c0c] border-t border-[#f1eec0]/10 space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-[#3aa1d8] uppercase tracking-wider">
                  Yu Mau Bikin Apa?
                </span>
                <h3 className="font-stamp text-2xl sm:text-3xl text-[#f1eec0] lowercase">
                  kami merancang website yang bikin bisnismu naik kelas
                </h3>
                <p className="text-sm sm:text-base text-[#f1eec0]/75 leading-relaxed">
                  {lang === "en"
                    ? "Fast, beautiful, and effortless to open on mobile devices. Specializing in high-converting landing pages, interactive digital invitations, online stores with WhatsApp checkout flows, and bespoke corporate websites."
                    : "Cepat, cantik, dan nyaman dibuka di HP. Melayani pembuatan landing page berkonversi tinggi, undangan online interaktif, toko online dengan integrasi order WhatsApp, serta website profil bisnis profesional."}
                </p>
              </div>

              {/* Service Matrix */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {SERVICES.map(({ Icon, color, hover, title, desc }) => (
                  <div
                    key={title}
                    className={`p-4 rounded-xl bg-[#0a0a0a] border border-[#f1eec0]/12 space-y-2 transition-colors ${hover}`}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center border border-current/25"
                      style={{ color, backgroundColor: `${color}14` }}
                    >
                      <Icon className="text-[18px]" />
                    </div>
                    <div className="font-bold text-sm text-[#f1eec0]">{title}</div>
                    <p className="text-xs text-[#f1eec0]/60 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#f1eec0]/10">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://yumastudio.digital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#ea4530] text-[#f1eec0] font-bold text-xs sm:text-sm hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-all lowercase flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
                  >
                    <span>{lang === "en" ? "open yumastudio.digital" : "buka yumastudio.digital"}</span>
                    <ArrowUpRight />
                  </a>

                  <a
                    href="https://wa.me/6289525214959?text=Halo%20Yuma%20Studio%2C%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-[#0a0a0a] border border-[#f1eec0]/20 text-[#f1eec0] font-bold text-xs sm:text-sm hover:border-[#27c93f] hover:text-[#27c93f] transition-colors lowercase flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <ChatIcon className="text-[1.15em]" />
                    <span>Hubungi via WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActivePage("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-[#f1eec0]/60 hover:text-[#f1eec0] transition-colors lowercase underline underline-offset-4 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{lang === "en" ? "or message via contact page" : "atau kirim pesan lewat halaman kontak"}</span>
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== HIGH-RES SCREENSHOT LIGHTBOX MODAL ==================== */}
      {screenshotModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setScreenshotModal(false)}
          className="fixed inset-0 z-[260] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#121212] border border-[#f1eec0]/25 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#f1eec0]/15">
              <div className="flex items-center gap-2 min-w-0">
                <LockIcon className="text-[#27c93f]" />
                <span className="font-mono text-xs sm:text-sm text-[#f1eec0] truncate">
                  https://yumastudio.digital/
                </span>
              </div>
              <button
                type="button"
                onClick={() => setScreenshotModal(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-[#0a0a0a] text-[#f1eec0] hover:bg-[#ea4530] flex items-center justify-center text-sm cursor-pointer transition-colors shrink-0"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="overflow-auto p-4 bg-[#0a0a0a] flex items-center justify-center">
              <img
                src="/yumastudio-preview.jpg"
                alt="Yuma Studio Screenshot Full View"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="p-3 bg-[#121212] border-t border-[#f1eec0]/15 flex items-center justify-between gap-3 text-xs text-[#f1eec0]/70">
              <span className="truncate">Yuma Studio Official Website Preview</span>
              <a
                href="https://yumastudio.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full bg-[#ea4530] text-[#f1eec0] font-bold hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Kunjungi Website</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
