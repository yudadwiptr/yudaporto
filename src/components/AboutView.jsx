import React, { useState, useEffect } from "react";
import {
  EXPERIENCE_LIST,
  RECOGNITION_LIST,
  SKILLS_GROUPS,
  ISTQB_CREDENTIAL,
  CERTIFICATIONS_LIST,
} from "../data/portfolioData";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  CloseIcon,
  ExpandIcon,
  Dot,
} from "./Icons";

export default function AboutView({ lang, setActivePage }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [certFilter, setCertFilter] = useState("all");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
      if (selectedCert) {
        if (e.key === "ArrowLeft") handlePrevCert();
        if (e.key === "ArrowRight") handleNextCert();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  const filteredCerts =
    certFilter === "all"
      ? CERTIFICATIONS_LIST
      : CERTIFICATIONS_LIST.filter((c) => c.group === certFilter);

  const filterTabs = [
    { id: "all", label: lang === "en" ? "all credentials" : "semua sertifikat", count: CERTIFICATIONS_LIST.length },
    { id: "qa", label: "QA & Testing", count: CERTIFICATIONS_LIST.filter((c) => c.group === "qa").length },
    { id: "agile", label: "Agile & Product", count: CERTIFICATIONS_LIST.filter((c) => c.group === "agile").length },
    { id: "engineering", label: "Engineering & DB", count: CERTIFICATIONS_LIST.filter((c) => c.group === "engineering").length },
    { id: "security", label: "Security & Pentest", count: CERTIFICATIONS_LIST.filter((c) => c.group === "security").length },
  ];

  const handlePrevCert = (e) => {
    e?.stopPropagation?.();
    if (!selectedCert) return;
    const curIdx = CERTIFICATIONS_LIST.findIndex((c) => c.id === selectedCert.id);
    const prevIdx = (curIdx - 1 + CERTIFICATIONS_LIST.length) % CERTIFICATIONS_LIST.length;
    setSelectedCert(CERTIFICATIONS_LIST[prevIdx]);
  };

  const handleNextCert = (e) => {
    e?.stopPropagation?.();
    if (!selectedCert) return;
    const curIdx = CERTIFICATIONS_LIST.findIndex((c) => c.id === selectedCert.id);
    const nextIdx = (curIdx + 1) % CERTIFICATIONS_LIST.length;
    setSelectedCert(CERTIFICATIONS_LIST[nextIdx]);
  };

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
        <div className="max-w-4xl">
          <div className="text-[clamp(22px,3.3vw,42px)] leading-[1.26] tracking-tight">
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

            <p className="mt-6 text-sm sm:text-base text-[#f1eec0]/75 font-normal leading-relaxed max-w-3xl">
              {lang === "en"
                ? "Including 5 years at PT Bank Mandiri on the KOPRA wholesale banking platform. Strong hands-on exposure to core banking and treasury domains: branch and host transactions (BDS, Host/AS400), account & ledger posting, multi-currency & Non-IDR accounts, FX (e-FX), remittance, custody, escrow, cash management, balance forecasting, trade finance, and BI-FAST payments."
                : "Termasuk 5 tahun di PT Bank Mandiri pada platform wholesale banking KOPRA. Berpengalaman mendalam pada domain core banking & treasury: transaksi cabang dan host (BDS, Host/AS400), pembukuan akun & buku besar, rekening multi-currency & Non-IDR, FX (e-FX), remitansi, kustodi, escrow, cash management, balance forecasting, trade finance, dan pembayaran BI-FAST."}
            </p>
          </div>
        </div>

        {/* Professional Experience Table (Full CV History) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
            <h2 className="text-sm tracking-wide text-[#f1eec0]/55 font-semibold lowercase">
              {lang === "en"
                ? "professional experience (6 yrs 7 mos)"
                : "pengalaman profesional (6 thn 7 bln)"}
            </h2>
            <span className="text-xs text-[#3aa1d8] break-words">
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
              onClick={() => setSelectedCert(CERTIFICATIONS_LIST[0])}
              className="text-xs font-bold rounded-full px-4 py-2 bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] transition-colors cursor-pointer lowercase flex items-center gap-1.5"
            >
              <span>{lang === "en" ? "view certificate scan" : "lihat sertifikat asli"}</span>
              <ArrowUpRight />
            </button>
          </div>

          <div className="p-4 sm:p-8 rounded-2xl border border-[#3aa1d8]/40 bg-[#121212] grid lg:grid-cols-[1.6fr_1fr] gap-6 sm:gap-8 items-center">
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
              onClick={() => setSelectedCert(CERTIFICATIONS_LIST[0])}
              className="relative group cursor-pointer rounded-xl overflow-hidden border border-[#f1eec0]/20 bg-[#0a0a0a] shadow-[0_15px_35px_rgba(0,0,0,0.6)] aspect-[3/4] max-h-[360px] mx-auto w-full flex items-center justify-center p-2"
            >
              <img
                src={ISTQB_CREDENTIAL.certImage}
                alt="Official ISTQB CTFL Certificate Scan"
                className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#f1eec0] text-[#0a0a0a] flex items-center justify-center text-lg">
                  <ExpandIcon />
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

        {/* ==================== ALL PROFESSIONAL CERTIFICATION CARDS ==================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs text-[#ea4530] font-bold lowercase tracking-wider">
                {lang === "en" ? "credentials & qualifications" : "kredensial & kualifikasi"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-stamp lowercase text-[#f1eec0] mt-0.5">
                {lang === "en"
                  ? "professional certifications"
                  : "sertifikasi profesional"}
              </h2>
            </div>
            <span className="text-xs text-[#3aa1d8] font-mono">
              {filteredCerts.length} {lang === "en" ? "of" : "dari"} {CERTIFICATIONS_LIST.length} {lang === "en" ? "verified credentials" : "sertifikat terverifikasi"}
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
            {filterTabs.map((tab) => {
              const active = certFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCertFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono lowercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    active
                      ? "bg-[#ea4530] text-[#f1eec0] font-bold shadow-md"
                      : "bg-[#141414] text-[#f1eec0]/60 hover:text-[#f1eec0] hover:bg-[#1a1a1a] border border-[#f1eec0]/10"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active
                        ? "bg-black/30 text-[#f1eec0]"
                        : "bg-white/10 text-[#f1eec0]/70"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group relative rounded-2xl border border-[#f1eec0]/15 bg-[#121212] overflow-hidden flex flex-col justify-between hover:border-[#3aa1d8]/70 hover:shadow-[0_14px_34px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Thumbnail Preview Area */}
                <div className="relative aspect-[16/10] w-full bg-[#0a0a0a] overflow-hidden border-b border-[#f1eec0]/10 flex items-center justify-center p-2.5">
                  <img
                    src={cert.thumb}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[#3aa1d8] border border-[#3aa1d8]/30 font-semibold truncate max-w-[70%]">
                      {cert.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[#f1eec0]/80 border border-[#f1eec0]/20">
                      {cert.year}
                    </span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-[#3aa1d8] text-[#0a0a0a] text-xs font-bold font-mono tracking-tight shadow-xl transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                      <span>{lang === "en" ? "inspect credential" : "buka kartu"}</span>
                      <ArrowUpRight />
                    </span>
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#ea4530] font-semibold truncate max-w-[75%]">
                        {cert.issuer}
                      </span>
                      {cert.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ea4530]/20 text-[#ea4530] font-bold shrink-0">
                          {cert.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-[#f1eec0] leading-snug group-hover:text-[#3aa1d8] transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-[#f1eec0]/10 flex items-center justify-between text-xs text-[#f1eec0]/60">
                    <span className="font-mono text-[11px] text-[#3aa1d8] truncate max-w-[60%]">
                      {cert.certNo || "verified credential"}
                    </span>
                    <span className="text-[11px] text-[#f1eec0]/50 font-mono group-hover:text-[#f1eec0] transition-colors inline-flex items-center gap-1">
                      <span>{lang === "en" ? "preview" : "detail"}</span>
                      <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
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
        <div className="p-6 sm:p-10 rounded-2xl border border-[#f1eec0]/15 bg-[#121212] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
            className="text-xs sm:text-sm font-bold rounded-full px-5 py-3 bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors shrink-0 cursor-pointer lowercase inline-flex items-center gap-1.5"
          >
            <span>{lang === "en" ? "contact page" : "halaman kontak"}</span>
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* ==================== CERTIFICATE LIGHTBOX MODAL ==================== */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#121212] border border-[#f1eec0]/25 rounded-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-4 sm:p-5 border-b border-[#f1eec0]/15 gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#ea4530] font-bold font-mono">
                    {selectedCert.category}
                  </span>
                  <Dot className="text-[#f1eec0]/40" />
                  <span className="text-xs text-[#3aa1d8] font-mono">
                    {selectedCert.certNo || `Credential // ${selectedCert.year}`}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#f1eec0] leading-snug">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-[#0a0a0a] border border-[#f1eec0]/20 text-[#f1eec0] hover:bg-[#ea4530] hover:border-[#ea4530] transition-colors flex items-center justify-center text-sm cursor-pointer shrink-0"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Modal Certificate Image Preview */}
            <div className="relative flex-1 overflow-auto p-3 sm:p-6 bg-[#0a0a0a] flex items-center justify-center min-h-[220px] sm:min-h-[320px]">
              <img
                src={selectedCert.thumb || selectedCert.file}
                alt={selectedCert.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              />

              {/* Prev / Next Floating Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrevCert}
                title="Previous certificate (Arrow Left)"
                aria-label="Previous certificate"
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-[#3aa1d8] hover:text-[#0a0a0a] border border-white/15 text-[#f1eec0] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={handleNextCert}
                title="Next certificate (Arrow Right)"
                aria-label="Next certificate"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-[#3aa1d8] hover:text-[#0a0a0a] border border-white/15 text-[#f1eec0] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
              >
                <ArrowRight />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#121212] border-t border-[#f1eec0]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#f1eec0]/70">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span>Issuer: <strong className="text-[#f1eec0]">{selectedCert.issuer}</strong></span>
                <Dot className="text-[#f1eec0]/30" />
                <span>Year: <strong className="text-[#f1eec0]">{selectedCert.year}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={encodeURI(selectedCert.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#3aa1d8] text-[#0a0a0a] font-bold hover:bg-[#f1eec0] transition-colors lowercase flex items-center gap-1.5"
                >
                  <span>
                    {selectedCert.file.endsWith(".pdf")
                      ? (lang === "en" ? "open original pdf" : "buka dokumen pdf")
                      : (lang === "en" ? "open high-res scan" : "buka gambar asli")}
                  </span>
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
