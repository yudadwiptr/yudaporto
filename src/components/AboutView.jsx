import React, { useState } from "react";
import { EXPERIENCE_LIST, RECOGNITION_LIST } from "../data/portfolioData";

const COLLECTIBLES = [
  { id: "keycap", label: "GMK Red Artisan", year: "Item #01", color: "#ea4530" },
  { id: "v60", label: "Copper V60 Dripper", year: "Item #02", color: "#f1eec0" },
  { id: "lanyard", label: "Canva × Liquid Tag", year: "Item #03", color: "#3aa1d8" },
  { id: "cassette", label: "Lo-Fi Synth Tape", year: "Item #04", color: "#ea4530" },
];

export default function AboutView({ lang, setActivePage }) {
  const [activeArtifact, setActiveArtifact] = useState(0);

  return (
    <div className="pt-[calc(var(--nav-top)+24px)] pb-16">
      {/* Giant ABOUT * Marquee */}
      <div
        className="overflow-hidden whitespace-nowrap select-none py-2 border-b border-[#f1eec0]/10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex animate-marquee text-[clamp(48px,11vw,144px)] tracking-tight uppercase font-stamp leading-[1.04]">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
            >
              <span>{lang === "en" ? "about" : "tentang"}</span>
              <span className="text-[#ea4530] translate-y-[0.12em]">*</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Intro Statement (Exact Kenji /about anatomy) */}
      <div className="px-[clamp(18px,4vw,40px)] max-w-6xl mx-auto pt-[clamp(36px,7vh,80px)] space-y-[clamp(48px,9vh,96px)]">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div className="text-[clamp(24px,3.6vw,46px)] leading-[1.2] tracking-tight">
            {lang === "en" ? (
              <p>
                Hi, I&apos;m{" "}
                <strong className="font-bold text-[#ea4530]">
                  Yuda Dwi Putra
                </strong>{" "}
                (<span className="font-accent-serif italic">yudadwiptr</span>),
                product &amp; UI/UX designer, creative web developer and{" "}
                <span className="inline-block bg-[#3aa1d8] text-[#0a0a0a] font-bold px-2.5 py-0.5 rounded-full text-[0.72em] align-middle">
                  mechanical keycap collector
                </span>{" "}
                from{" "}
                <strong className="font-bold text-[#f1eec0]">
                  Indonesia
                </strong>
                . Currently building independent digital products &amp; design
                systems.
              </p>
            ) : (
              <p>
                Halo, saya{" "}
                <strong className="font-bold text-[#ea4530]">
                  Yuda Dwi Putra
                </strong>{" "}
                (<span className="font-accent-serif italic">yudadwiptr</span>),
                desainer produk &amp; UI/UX, pengembang web kreatif, dan{" "}
                <span className="inline-block bg-[#3aa1d8] text-[#0a0a0a] font-bold px-2.5 py-0.5 rounded-full text-[0.72em] align-middle">
                  kolektor keycap mekanikal
                </span>{" "}
                dari{" "}
                <strong className="font-bold text-[#f1eec0]">
                  Indonesia
                </strong>
                . Saat ini fokus membangun produk digital &amp; sistem desain.
              </p>
            )}

            <p className="mt-6 text-base sm:text-lg text-[#f1eec0]/70 font-normal leading-relaxed max-w-2xl">
              {lang === "en"
                ? "Philosophy: I believe design must be both functional and quietly beautiful. If an interface needs a manual, the craft isn't finished yet."
                : "Filosofi kerja: Saya percaya desain harus fungsional sekaligus indah. Jika sebuah antarmuka masih butuh buku panduan, berarti karyanya belum selesai."}
            </p>
          </div>

          {/* Interactive Collectible Card / ID Lanyard */}
          <div className="p-6 rounded-2xl border border-[#f1eec0]/15 bg-[#121212] space-y-4">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#f1eec0]/50">
              <span>
                {lang === "en"
                  ? "DESK ARTIFACTS (CLICK TO INSPECT)"
                  : "KOLEKSI MEJA KERJA (KLIK)"}
              </span>
              <span className="text-[#ea4530] font-bold">
                0{activeArtifact + 1} / 04
              </span>
            </div>

            <div className="h-44 rounded-xl bg-[#0a0a0a] border border-[#f1eec0]/10 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-stamp text-3xl mb-3 transition-transform duration-300 hover:scale-110 hover:rotate-6"
                style={{
                  backgroundColor: COLLECTIBLES[activeArtifact].color,
                  color: "#0a0a0a",
                }}
              >
                0{activeArtifact + 1}
              </div>
              <div className="font-bold text-lg text-[#f1eec0]">
                {COLLECTIBLES[activeArtifact].label}
              </div>
              <div className="text-xs uppercase tracking-widest text-[#f1eec0]/45 mt-1">
                {COLLECTIBLES[activeArtifact].year}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {COLLECTIBLES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveArtifact(idx)}
                  className={`py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    activeArtifact === idx
                      ? "border-[#3aa1d8] bg-[#3aa1d8]/15 text-[#f1eec0]"
                      : "border-[#f1eec0]/10 text-[#f1eec0]/45 hover:text-[#f1eec0]"
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Table (Kenji /about style) */}
        <div className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.16em] text-[#f1eec0]/45 font-bold">
            {lang === "en" ? "Experience" : "Pengalaman"}
          </h2>
          <div className="divide-y divide-[#f1eec0]/12 border-y border-[#f1eec0]/12">
            {EXPERIENCE_LIST.map((exp, idx) => (
              <div
                key={idx}
                className="py-5 grid sm:grid-cols-[1.2fr_1.4fr_auto] gap-2 sm:gap-6 items-baseline group hover:bg-white/[0.02] px-2 transition-colors"
              >
                <div className="text-lg sm:text-xl font-bold text-[#f1eec0] group-hover:text-[#3aa1d8] transition-colors">
                  {exp.role[lang]}
                </div>
                <div
                  className="text-sm sm:text-base font-medium"
                  style={{ color: exp.highlight }}
                >
                  {exp.company}
                </div>
                <div className="text-xs uppercase tracking-[0.08em] text-[#f1eec0]/45 sm:text-right">
                  {exp.period[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition Table */}
        <div className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.16em] text-[#f1eec0]/45 font-bold">
            {lang === "en" ? "Recognition & Highlights" : "Penghargaan & Sorotan"}
          </h2>
          <div className="divide-y divide-[#f1eec0]/12 border-y border-[#f1eec0]/12">
            {RECOGNITION_LIST.map((rec, idx) => (
              <div
                key={idx}
                className="py-4 grid sm:grid-cols-[1.3fr_1fr_auto_auto] gap-2 sm:gap-6 items-baseline px-2"
              >
                <div className="text-base sm:text-lg font-medium text-[#f1eec0]">
                  <strong className="font-bold text-[#ea4530]">
                    {rec.tier}
                  </strong>
                  , {rec.category[lang]}
                </div>
                <div className="text-sm text-[#f1eec0]/70">{rec.work}</div>
                <div className="text-xs uppercase tracking-wider text-[#3aa1d8] font-semibold">
                  {rec.org}
                </div>
                <div className="text-xs text-[#f1eec0]/45 sm:text-right">
                  {rec.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Let's Talk Block */}
        <div className="p-8 sm:p-10 rounded-2xl border border-[#f1eec0]/15 bg-[#121212] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-stamp text-3xl sm:text-4xl uppercase text-[#f1eec0]">
              {lang === "en" ? "Let's talk" : "Mari ngobrol"}
            </h3>
            <p className="text-sm sm:text-base text-[#f1eec0]/75">
              {lang === "en"
                ? "Got a project, a brand, or just want to say hi? This is where people usually reach me."
                : "Punya proyek, brand, atau sekadar ingin menyapa? Di sini orang-orang biasa menghubungi saya."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActivePage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-bold uppercase tracking-[0.08em] rounded-full px-5 py-3 bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors shrink-0 cursor-pointer"
          >
            {lang === "en" ? "Contact page →" : "Halaman kontak →"}
          </button>
        </div>
      </div>
    </div>
  );
}

