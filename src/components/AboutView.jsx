import React, { useState } from "react";
import {
  EXPERIENCE_LIST,
  RECOGNITION_LIST,
  SKILLS_GROUPS,
  ISTQB_CREDENTIAL,
  CERTIFICATIONS_LIST,
} from "../data/portfolioData";

const COLLECTIBLES = [
  {
    id: "istqb",
    label: "ISTQB® CTFL Badge",
    sub: "Cert #23-CTFL-227561-12",
    color: "#ea4530",
  },
  {
    id: "as400",
    label: "Host / AS400 & BDS",
    sub: "Core Banking Ledger",
    color: "#3aa1d8",
  },
  {
    id: "defect",
    label: "5× 1st Place Trophy",
    sub: "Defect & Perf Hunter",
    color: "#f1eec0",
  },
  {
    id: "brd",
    label: "BRD & Sequence Spec",
    sub: "As-Is / To-Be Flows",
    color: "#ea4530",
  },
];

export default function AboutView({ lang, setActivePage }) {
  const [activeArtifact, setActiveArtifact] = useState(0);
  const [certModalOpen, setCertModalOpen] = useState(false);

  return (
    <div className="pt-[calc(var(--nav-top)+24px)] pb-16">
      {/* Giant about * Marquee (lowercase matching Kenji original) */}
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

      {/* Main Intro Statement (Exact Kenji /about anatomy with Yuda's CV data) */}
      <div className="px-[clamp(18px,4vw,40px)] max-w-6xl mx-auto pt-[clamp(36px,7vh,80px)] space-y-[clamp(48px,9vh,96px)]">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div className="text-[clamp(22px,3.3vw,42px)] leading-[1.22] tracking-tight">
            {lang === "en" ? (
              <p>
                Hi, I&apos;m{" "}
                <strong className="font-bold text-[#ea4530]">
                  Yuda Dwi Putra
                </strong>{" "}
                (<span className="font-accent-serif italic">Jakarta, ID</span>),{" "}
                <strong className="font-bold text-[#f1eec0]">
                  System &amp; Business Analyst
                </strong>{" "}
                and{" "}
                <span className="inline-block bg-[#3aa1d8] text-[#0a0a0a] font-bold px-2.5 py-0.5 rounded-full text-[0.72em] align-middle">
                  ISTQB® Certified Tester
                </span>{" "}
                with{" "}
                <strong className="font-bold text-[#ea4530]">
                  6 years 7 months
                </strong>{" "}
                in software delivery for banking and financial services.
              </p>
            ) : (
              <p>
                Halo, saya{" "}
                <strong className="font-bold text-[#ea4530]">
                  Yuda Dwi Putra
                </strong>{" "}
                (<span className="font-accent-serif italic">Jakarta, ID</span>),{" "}
                <strong className="font-bold text-[#f1eec0]">
                  System &amp; Business Analyst
                </strong>{" "}
                dan{" "}
                <span className="inline-block bg-[#3aa1d8] text-[#0a0a0a] font-bold px-2.5 py-0.5 rounded-full text-[0.72em] align-middle">
                  ISTQB® Certified Tester
                </span>{" "}
                dengan pengalaman{" "}
                <strong className="font-bold text-[#ea4530]">
                  6 tahun 7 bulan
                </strong>{" "}
                di industri perbankan dan layanan keuangan.
              </p>
            )}

            <p className="mt-6 text-sm sm:text-base text-[#f1eec0]/75 font-normal leading-relaxed max-w-2xl">
              {lang === "en"
                ? "Including 5 years at PT Bank Mandiri on the KOPRA wholesale banking platform. Strong hands-on exposure to core banking and treasury domains: branch and host transactions (BDS, Host/AS400), account & ledger posting, multi-currency & Non-IDR accounts, FX (e-FX), remittance, custody, escrow, cash management, balance forecasting, trade finance, and BI-FAST payments."
                : "Termasuk 5 tahun di PT Bank Mandiri pada platform wholesale banking KOPRA. Berpengalaman mendalam pada domain core banking & treasury: transaksi cabang dan host (BDS, Host/AS400), pembukuan akun & buku besar, rekening multi-currency & Non-IDR, FX (e-FX), remitansi, kustodi, escrow, cash management, balance forecasting, trade finance, dan pembayaran BI-FAST."}
            </p>
          </div>

          {/* Interactive Desk Artifacts / Credentials Card */}
          <div className="p-6 rounded-2xl border border-[#f1eec0]/15 bg-[#121212] space-y-4">
            <div className="flex items-center justify-between text-xs tracking-wide text-[#f1eec0]/50">
              <span>
                {lang === "en"
                  ? "core credentials (click to inspect)"
                  : "kredensial utama (klik)"}
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
              <div className="text-xs tracking-wide text-[#f1eec0]/50 mt-1">
                {COLLECTIBLES[activeArtifact].sub}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {COLLECTIBLES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveArtifact(idx)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
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

        {/* Professional Experience Table (Full CV History) */}
        <div className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm tracking-wide text-[#f1eec0]/55 font-semibold lowercase">
              {lang === "en"
                ? "professional experience (6 yrs 7 mos)"
                : "pengalaman profesional (6 thn 7 bln)"}
            </h2>
            <span className="text-xs text-[#3aa1d8]">
              yudadwiputra@gmail.com · +62 895 2521 4959
            </span>
          </div>
          <div className="divide-y divide-[#f1eec0]/12 border-y border-[#f1eec0]/12">
            {EXPERIENCE_LIST.map((exp, idx) => (
              <div
                key={idx}
                className="py-5 space-y-2 group hover:bg-white/[0.02] px-2 transition-colors"
              >
                <div className="grid sm:grid-cols-[1.1fr_1.4fr_auto] gap-2 sm:gap-6 items-baseline">
                  <div className="text-lg sm:text-xl font-bold text-[#f1eec0] group-hover:text-[#3aa1d8] transition-colors">
                    {exp.role[lang]}
                  </div>
                  <div
                    className="text-sm sm:text-base font-semibold"
                    style={{ color: exp.highlight }}
                  >
                    {exp.company}
                  </div>
                  <div className="text-xs text-[#f1eec0]/50 sm:text-right font-medium">
                    {exp.period[lang]}
                  </div>
                </div>
                {exp.bullets && (
                  <p className="text-xs sm:text-sm text-[#f1eec0]/65 leading-relaxed max-w-4xl">
                    {exp.bullets[lang]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Domain Matrix from CV */}
        <div className="space-y-6">
          <h2 className="text-sm tracking-wide text-[#f1eec0]/55 font-semibold lowercase">
            {lang === "en"
              ? "skills & domain expertise"
              : "keahlian & domain perbankan"}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {SKILLS_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#f1eec0]/12 bg-[#121212] space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: group.accent }}
                  />
                  <h3 className="font-bold text-base text-[#f1eec0]">
                    {group.category[lang]}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#0a0a0a] border border-[#f1eec0]/12 text-[#f1eec0]/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== FEATURED ISTQB® CERTIFICATION SPOTLIGHT ==================== */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <span className="text-xs text-[#ea4530] font-bold lowercase">
                {lang === "en" ? "primary credential" : "kredensial utama"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-stamp lowercase text-[#f1eec0] mt-0.5">
                {lang === "en"
                  ? "istqb® certified tester — foundation level"
                  : "istqb® certified tester — foundation level"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCertModalOpen(true)}
              className="text-xs font-bold rounded-full px-4 py-2 bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] transition-colors cursor-pointer lowercase flex items-center gap-1.5"
            >
              <span>{lang === "en" ? "view certificate scan ↗" : "lihat sertifikat asli ↗"}</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-[#3aa1d8]/40 bg-[#121212] grid lg:grid-cols-[1.6fr_1fr] gap-8 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ea4530] text-[#f1eec0] text-xs font-bold tracking-wider">
                  {ISTQB_CREDENTIAL.badge}
                </span>
                <span className="text-xs text-[#f1eec0]/70 font-mono">
                  Cert No. {ISTQB_CREDENTIAL.certNo}
                </span>
                <span className="text-xs text-[#3aa1d8] font-mono">
                  Passed {ISTQB_CREDENTIAL.datePassed}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#f1eec0]">
                  {ISTQB_CREDENTIAL.title}
                </h3>
                <p className="text-sm text-[#f1eec0]/75 mt-1 leading-relaxed">
                  {lang === "en"
                    ? `Awarded to ${ISTQB_CREDENTIAL.recipient} by ${ISTQB_CREDENTIAL.issuer} (${ISTQB_CREDENTIAL.cityCountry}) under ${ISTQB_CREDENTIAL.standards}.`
                    : `Diberikan kepada ${ISTQB_CREDENTIAL.recipient} oleh ${ISTQB_CREDENTIAL.issuer} (${ISTQB_CREDENTIAL.cityCountry}) berdasarkan ${ISTQB_CREDENTIAL.standards}.`}
                </p>
              </div>

              {/* Syllabus Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="text-xs text-[#f1eec0]/50 lowercase">
                  {lang === "en"
                    ? "certified syllabus scope & competency contents:"
                    : "lingkup silabus & kompetensi resmi teruji:"}
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {ISTQB_CREDENTIAL.syllabus.map((item) => (
                    <div
                      key={item.num}
                      className="p-3 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/10 flex items-start gap-2.5"
                    >
                      <span className="font-mono text-xs font-bold text-[#ea4530]">
                        {item.num}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#f1eec0]">
                          {lang === "en" ? item.en : item.id}
                        </div>
                        <div className="text-[11px] text-[#f1eec0]/55 mt-0.5 leading-snug">
                          {item.desc[lang]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clickable Certificate Preview Card */}
            <div
              onClick={() => setCertModalOpen(true)}
              className="relative group cursor-pointer rounded-xl overflow-hidden border border-[#f1eec0]/20 bg-[#0a0a0a] shadow-[0_15px_35px_rgba(0,0,0,0.6)] aspect-[3/4] max-h-[360px] mx-auto w-full flex items-center justify-center p-2"
            >
              <img
                src={ISTQB_CREDENTIAL.certImage}
                alt="Official ISTQB CTFL Certificate Scan"
                className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#f1eec0] text-[#0a0a0a] flex items-center justify-center font-bold text-lg">
                  ⤢
                </div>
                <span className="text-xs font-bold text-[#f1eec0] uppercase tracking-wider">
                  {lang === "en" ? "click to inspect certificate" : "klik untuk lihat detail"}
                </span>
                <span className="text-[11px] text-[#3aa1d8] font-mono">
                  {ISTQB_CREDENTIAL.certNo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== OTHER PROFESSIONAL CERTIFICATIONS ==================== */}
        <div className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm tracking-wide text-[#f1eec0]/55 font-semibold lowercase">
              {lang === "en"
                ? "other professional certifications & qualifications"
                : "sertifikasi profesional & kualifikasi lainnya"}
            </h2>
            <span className="text-xs text-[#3aa1d8] font-mono">
              {CERTIFICATIONS_LIST.length} {lang === "en" ? "credentials" : "sertifikat"}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {CERTIFICATIONS_LIST.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl border border-[#f1eec0]/12 bg-[#121212] flex flex-col justify-between space-y-2 hover:border-[#f1eec0]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#ea4530] mb-1">
                    <span>{cert.category}</span>
                    <span className="text-[#f1eec0]/45">{cert.year}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#f1eec0] leading-snug">
                    {cert.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#f1eec0]/10 text-xs text-[#f1eec0]/60">
                  <span>{cert.issuer}</span>
                  {cert.certNo && (
                    <span className="text-[#3aa1d8] font-mono text-[11px]">
                      {cert.certNo}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== AWARDS & RECOGNITION ==================== */}
        <div className="space-y-6">
          <h2 className="text-sm tracking-wide text-[#f1eec0]/55 font-semibold lowercase">
            {lang === "en"
              ? "awards & honors (5× first place winner)"
              : "penghargaan & prestasi (5× juara 1)"}
          </h2>
          <div className="divide-y divide-[#f1eec0]/12 border-y border-[#f1eec0]/12">
            {RECOGNITION_LIST.map((rec, idx) => (
              <div
                key={idx}
                className="py-4 grid sm:grid-cols-[1.4fr_1fr_auto_auto] gap-2 sm:gap-6 items-baseline px-2"
              >
                <div className="text-base sm:text-lg font-medium text-[#f1eec0]">
                  <strong className="font-bold text-[#ea4530]">
                    {rec.tier}
                  </strong>
                  , {rec.category[lang]}
                </div>
                <div className="text-sm text-[#f1eec0]/70">{rec.work}</div>
                <div className="text-xs text-[#3aa1d8] font-semibold">
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
            <h3 className="font-stamp text-3xl sm:text-4xl lowercase text-[#f1eec0]">
              {lang === "en" ? "let's talk" : "mari ngobrol"}
            </h3>
            <p className="text-sm sm:text-base text-[#f1eec0]/75">
              {lang === "en"
                ? "Need a System & Business Analyst or QA Leader for Core Banking, Treasury, or Enterprise Modernization? Let's connect."
                : "Butuh System & Business Analyst atau QA Leader untuk Core Banking, Treasury, atau Modernisasi Sistem? Mari berdiskusi."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActivePage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs sm:text-sm font-bold rounded-full px-5 py-3 bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors shrink-0 cursor-pointer lowercase"
          >
            {lang === "en" ? "contact page →" : "halaman kontak →"}
          </button>
        </div>
      </div>

      {/* ==================== OFFICIAL ISTQB CERTIFICATE LIGHTBOX MODAL ==================== */}
      {certModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setCertModalOpen(false)}
          className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#121212] border border-[#f1eec0]/25 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#f1eec0]/15">
              <div>
                <span className="text-xs text-[#ea4530] font-bold font-mono">
                  VERIFIED CREDENTIAL // {ISTQB_CREDENTIAL.certNo}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#f1eec0]">
                  {ISTQB_CREDENTIAL.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="w-9 h-9 rounded-full bg-[#0a0a0a] border border-[#f1eec0]/20 text-[#f1eec0] hover:bg-[#ea4530] hover:border-[#ea4530] transition-colors flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Certificate Image */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#0a0a0a] flex items-center justify-center">
              <img
                src={ISTQB_CREDENTIAL.certImage}
                alt="Official ISTQB Certified Tester Foundation Level Certificate - Yuda Dwi Putra"
                className="max-h-[72vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#121212] border-t border-[#f1eec0]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#f1eec0]/70">
              <div>
                <span>Passed: <strong>{ISTQB_CREDENTIAL.datePassed}</strong></span>
                <span className="mx-2 text-[#f1eec0]/30">•</span>
                <span>Issuer: <strong>iSQI GmbH, Potsdam, Germany</strong></span>
              </div>
              <a
                href={ISTQB_CREDENTIAL.certImage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#3aa1d8] text-[#0a0a0a] font-bold hover:bg-[#f1eec0] transition-colors lowercase"
              >
                {lang === "en" ? "open high-res scan ↗" : "buka gambar resolusi penuh ↗"}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
