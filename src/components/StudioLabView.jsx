import React, { useState } from "react";
import {
  HERO_PRESETS,
  KENJI_FRAMEWORK_PILLARS,
} from "../data/portfolioData";

export default function StudioLabView({
  lang,
  mode,
  setMode,
  presetIndex,
  setPresetIndex,
  setActivePage,
}) {
  const [customName, setCustomName] = useState("Yuda Dwi Putra");
  const [customRole, setCustomRole] = useState(
    "UI/UX designer and creative developer"
  );
  const [customClients, setCustomClients] = useState(
    "Gojek, Tokopedia, Mandiri Kopra, and YUMASHOP"
  );
  const [customPhilosophy, setCustomPhilosophy] = useState(
    "design must be both functional and quietly beautiful"
  );
  const [copiedBio, setCopiedBio] = useState(false);

  const generatedBio =
    lang === "en"
      ? `* I'm ${customName}, a ${customRole} who moves between product strategy, interactive web, and design systems — always convinced that ${customPhilosophy}. Previously collaborating with ${customClients}. Make yourself at home!`
      : `* Saya ${customName}, seorang ${customRole} yang bergerak di antara strategi produk, web interaktif, dan sistem desain — selalu percaya bahwa ${customPhilosophy}. Sebelumnya berkolaborasi bersama ${customClients}. Anggap rumah sendiri!`;

  const copyGenerated = () => {
    navigator.clipboard?.writeText(generatedBio);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <div className="pt-[calc(var(--nav-top)+24px)] pb-20">
      {/* Giant STUDIO * Marquee */}
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
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
            >
              <span>studio &amp; copy lab</span>
              <span className="text-[#ea4530] translate-y-[0.12em]">*</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-[clamp(18px,4vw,40px)] max-w-6xl mx-auto pt-12 space-y-16">
        {/* Section 1: Live Site Persona & Headline Switcher */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[#f1eec0]/15 bg-[#121212] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#ea4530] font-bold">
                {lang === "en"
                  ? "LIVE WEBSITE PERSONA CONTROLLER"
                  : "KONTROL PERSONA WEBSITE LANGSUNG"}
              </span>
              <h2 className="font-stamp text-3xl sm:text-4xl uppercase mt-1">
                {lang === "en"
                  ? "Switch Portfolio vs. Agency Mode"
                  : "Pilih Mode Portofolio Pribadi vs. Agensi"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setActivePage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-xs font-bold uppercase tracking-wider rounded-full px-4 py-2.5 bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] transition-colors cursor-pointer"
            >
              {lang === "en"
                ? "Preview on Home ↗"
                : "Lihat Hasil di Beranda ↗"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setMode("personal");
                setPresetIndex(0);
              }}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                mode === "personal"
                  ? "border-[#3aa1d8] bg-[#3aa1d8]/10"
                  : "border-[#f1eec0]/10 bg-[#0a0a0a] hover:border-[#f1eec0]/30"
              }`}
            >
              <div className="text-xs uppercase tracking-widest text-[#3aa1d8] font-bold">
                MODE A — PERSONAL PORTFOLIO
              </div>
              <div className="font-bold text-xl mt-1">
                Yuda Dwi Putra (UI/UX &amp; Creative Dev)
              </div>
              <p className="text-xs text-[#f1eec0]/65 mt-2">
                “making ( ) things is the job. loving it is the ( ) bonus.”
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("agency");
                setPresetIndex(0);
              }}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                mode === "agency"
                  ? "border-[#ea4530] bg-[#ea4530]/10"
                  : "border-[#f1eec0]/10 bg-[#0a0a0a] hover:border-[#f1eec0]/30"
              }`}
            >
              <div className="text-xs uppercase tracking-widest text-[#ea4530] font-bold">
                MODE B — CREATIVE AGENCY (VIDEO PRODUCTION)
              </div>
              <div className="font-bold text-xl mt-1">
                Studio Yuma (Commercial Film &amp; Motion)
              </div>
              <p className="text-xs text-[#f1eec0]/65 mt-2">
                “telling ( ) stories is the job. making people feel them is the
                ( ) bonus.”
              </p>
            </button>
          </div>

          {mode === "personal" && (
            <div className="pt-2 space-y-2">
              <div className="text-xs uppercase tracking-wider text-[#f1eec0]/50">
                {lang === "en"
                  ? "Select Hero Headline Variation:"
                  : "Pilih Variasi Headline Hero:"}
              </div>
              <div className="flex flex-wrap gap-2">
                {HERO_PRESETS.personal.map((preset, idx) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPresetIndex(idx)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      presetIndex === idx
                        ? "bg-[#f1eec0] text-[#0a0a0a]"
                        : "bg-[#0a0a0a] text-[#f1eec0]/65 border border-[#f1eec0]/15 hover:text-[#f1eec0]"
                    }`}
                  >
                    {preset.label[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: The Extracted Kenji Lambert Copywriting Framework */}
        <div className="space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#3aa1d8] font-bold">
              EXTRACTED ARCHITECTURE
            </span>
            <h2 className="font-stamp text-3xl sm:text-5xl uppercase mt-1">
              {lang === "en"
                ? "The 4-Pillar Copywriting Formula"
                : "4 Pilar Formula Copywriting Kenji Lambert"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {KENJI_FRAMEWORK_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="p-6 rounded-xl border border-[#f1eec0]/15 bg-[#121212] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-stamp text-2xl text-[#ea4530]">
                      {pillar.num}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#f1eec0]/10 text-[#f1eec0]/70">
                      FRAMEWORK RULE
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#f1eec0]">
                    {pillar.title[lang]}
                  </h3>
                  <p className="text-sm text-[#f1eec0]/75 leading-relaxed">
                    {pillar.desc[lang]}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/10 font-mono text-xs text-[#3aa1d8]">
                  {pillar.formula}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Interactive Copy Generator */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[#f1eec0]/15 bg-[#121212] space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#ea4530] font-bold">
              INTERACTIVE GENERATOR
            </span>
            <h3 className="font-stamp text-2xl sm:text-3xl uppercase mt-1">
              {lang === "en"
                ? "Customize Your Bio With The Formula"
                : "Kustomisasi Bio Anda dengan Formula Ini"}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="space-y-1.5 block">
              <span className="text-xs uppercase tracking-wider text-[#f1eec0]/60">
                {lang === "en" ? "Your Name" : "Nama Anda"}
              </span>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/20 text-sm text-[#f1eec0] focus:border-[#3aa1d8] focus:outline-none"
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs uppercase tracking-wider text-[#f1eec0]/60">
                {lang === "en" ? "Profession / Craft" : "Profesi / Keahlian"}
              </span>
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/20 text-sm text-[#f1eec0] focus:border-[#3aa1d8] focus:outline-none"
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs uppercase tracking-wider text-[#f1eec0]/60">
                {lang === "en"
                  ? "Previous Clients / Companies"
                  : "Klien / Perusahaan Sebelumnya"}
              </span>
              <input
                type="text"
                value={customClients}
                onChange={(e) => setCustomClients(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/20 text-sm text-[#f1eec0] focus:border-[#3aa1d8] focus:outline-none"
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs uppercase tracking-wider text-[#f1eec0]/60">
                {lang === "en" ? "Work Philosophy" : "Filosofi Kerja"}
              </span>
              <input
                type="text"
                value={customPhilosophy}
                onChange={(e) => setCustomPhilosophy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/20 text-sm text-[#f1eec0] focus:border-[#3aa1d8] focus:outline-none"
              />
            </label>
          </div>

          <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[#3aa1d8]/30 space-y-4">
            <p className="text-lg sm:text-xl leading-relaxed text-[#f1eec0]">
              {generatedBio}
            </p>
            <button
              type="button"
              onClick={copyGenerated}
              className="text-xs font-bold uppercase tracking-wider rounded-full px-4 py-2 bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors cursor-pointer"
            >
              {copiedBio
                ? lang === "en"
                  ? "Copied! ✓"
                  : "Tersalin! ✓"
                : lang === "en"
                ? "Copy Generated Copy"
                : "Salin Teks"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

