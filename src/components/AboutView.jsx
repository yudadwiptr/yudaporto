import React, { useCallback, useEffect, useMemo, useState } from "react";
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

// ISTQB has its own spotlight section, so the card gallery only lists the course certificates.
const ISTQB_ID = "istqb-ctfl";
const ISTQB_ENTRY = CERTIFICATIONS_LIST.find((c) => c.id === ISTQB_ID);
const COURSE_CERTS = CERTIFICATIONS_LIST.filter((c) => c.id !== ISTQB_ID);

const GROUPS = {
  qa: { label: "QA & Testing", accent: "#3aa1d8" },
  agile: { label: "Agile & Product", accent: "#f1eec0" },
  engineering: { label: "Engineering & DB", accent: "#ea4530" },
  security: { label: "Security & Pentest", accent: "#27c93f" },
};

const BARCODE = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 2];

function SectionHeader({ eyebrow, title, meta, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
      <div className="min-w-0">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#ea4530]">
          {eyebrow}
        </span>
        <h2 className="mt-1.5 font-stamp lowercase text-[clamp(32px,4.6vw,56px)] leading-[0.98] text-[#f1eec0] text-balance">
          {title}
        </h2>
      </div>
      {(meta || action) && (
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {meta && (
            <span className="text-xs font-mono text-[#3aa1d8]">{meta}</span>
          )}
          {action}
        </div>
      )}
    </div>
  );
}

function CertCard({ cert, lang, onOpen }) {
  const group = GROUPS[cert.group] || GROUPS.qa;
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ "--accent": group.accent }}
      className="group relative text-left rounded-[18px] bg-[#131313] border border-[#f1eec0]/10 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.65)] focus-visible:-translate-y-1"
    >
      {/* Badge header band with lanyard slot */}
      <div
        className="relative h-7 sm:h-8 flex items-center justify-center"
        style={{ backgroundColor: group.accent }}
      >
        <span className="w-9 sm:w-11 h-[7px] sm:h-2 rounded-full bg-[#0a0a0a]/85 shadow-inner" />
      </div>

      <div className="flex-1 flex flex-col gap-2.5 sm:gap-3 p-3 sm:p-4">
        {/* Group + year */}
        <div className="flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.12em]">
          <span className="truncate font-bold" style={{ color: group.accent }}>
            {group.label}
          </span>
          <span className="shrink-0 text-[#f1eec0]/45">{cert.year}</span>
        </div>

        {/* Certificate "photo" */}
        <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-[#f5f2cb] ring-1 ring-white/10">
          <img
            src={encodeURI(cert.thumb.replace("/thumbs/", "/cards/"))}
            alt={cert.title}
            width="720"
            height="535"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
          />
          {cert.badge && (
            <span className="absolute top-1.5 left-1.5 max-w-[calc(100%-12px)] truncate text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0a0a0a]/85 text-[#f1eec0]">
              {cert.badge}
            </span>
          )}
          <span className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-[#0a0a0a]/85 text-[#f1eec0] flex items-center justify-center text-xs opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ExpandIcon />
          </span>
        </div>

        {/* Title + issuer */}
        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-[13px] sm:text-[15px] leading-snug text-[#f1eec0] line-clamp-3 sm:line-clamp-2 transition-colors group-hover:text-[color:var(--accent)]">
            {cert.title}
          </h3>
          <p className="text-[10.5px] sm:text-xs text-[#f1eec0]/50 truncate">
            {cert.issuer}
          </p>
        </div>

        {/* Footer: barcode + action */}
        <div className="pt-2.5 border-t border-dashed border-[#f1eec0]/15 flex items-center justify-between gap-2">
          <span className="hidden sm:flex h-3 w-20 items-stretch gap-[1.5px] opacity-40" aria-hidden="true">
            {BARCODE.map((w, i) => (
              <span key={i} className="bg-[#f1eec0]" style={{ flex: w }} />
            ))}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-mono text-[#f1eec0]/60 transition-colors group-hover:text-[#f1eec0]">
            {lang === "en" ? "view" : "lihat"}
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function AboutView({ lang, setActivePage }) {
  // { list, index } — the list the lightbox steps through
  const [viewer, setViewer] = useState(null);
  const [certFilter, setCertFilter] = useState("all");

  const filteredCerts = useMemo(
    () =>
      certFilter === "all"
        ? COURSE_CERTS
        : COURSE_CERTS.filter((c) => c.group === certFilter),
    [certFilter]
  );

  const filterTabs = [
    { id: "all", label: lang === "en" ? "all" : "semua", count: COURSE_CERTS.length },
    ...Object.entries(GROUPS).map(([id, g]) => ({
      id,
      label: g.label,
      count: COURSE_CERTS.filter((c) => c.group === id).length,
    })),
  ];

  const selectedCert = viewer ? viewer.list[viewer.index] : null;
  const canStep = viewer && viewer.list.length > 1;

  const step = useCallback((dir) => {
    setViewer((v) =>
      v && v.list.length > 1
        ? { ...v, index: (v.index + dir + v.list.length) % v.list.length }
        : v
    );
  }, []);

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e) => {
      if (e.key === "Escape") setViewer(null);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [viewer, step]);

  const openIstqb = () => setViewer({ list: [ISTQB_ENTRY], index: 0 });

  return (
    <div className="pt-[calc(var(--nav-top)+24px)] pb-16">
      {/* Giant about * marquee */}
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

      <div className="px-[clamp(18px,4vw,40px)] max-w-6xl mx-auto pt-[clamp(36px,7vh,80px)] space-y-[clamp(64px,11vh,120px)]">
        {/* ==================== INTRO ==================== */}
        <div className="max-w-4xl">
          <div className="text-[clamp(24px,3.3vw,42px)] leading-[1.24] tracking-tight">
            {lang === "en" ? (
              <p>
                Hi, I&apos;m{" "}
                <strong className="font-bold text-[#ea4530]">Yuda Dwi Putra</strong>{" "}
                (<span className="font-accent-serif italic">Jakarta, ID</span>),{" "}
                <strong className="font-bold text-[#f1eec0]">System &amp; Business Analyst</strong>{" "}
                and{" "}
                <span className="inline-block bg-[#3aa1d8] text-[#0a0a0a] font-bold px-2.5 py-0.5 rounded-full text-[0.62em] align-middle">
                  ISTQB® Certified Tester
                </span>{" "}
                with{" "}
                <strong className="font-bold text-[#ea4530]">6 years 7 months</strong>{" "}
                in software delivery for banking and financial services.
              </p>
            ) : (
              <p>
                Halo, saya{" "}
                <strong className="font-bold text-[#ea4530]">Yuda Dwi Putra</strong>{" "}
                (<span className="font-accent-serif italic">Jakarta, ID</span>),{" "}
                <strong className="font-bold text-[#f1eec0]">System &amp; Business Analyst</strong>{" "}
                dan{" "}
                <span className="inline-block bg-[#3aa1d8] text-[#0a0a0a] font-bold px-2.5 py-0.5 rounded-full text-[0.62em] align-middle">
                  ISTQB® Certified Tester
                </span>{" "}
                dengan pengalaman{" "}
                <strong className="font-bold text-[#ea4530]">6 tahun 7 bulan</strong>{" "}
                di industri perbankan dan layanan keuangan.
              </p>
            )}
          </div>
          <p className="mt-6 text-[15px] sm:text-base text-[#f1eec0]/70 leading-relaxed max-w-3xl">
            {lang === "en"
              ? "Including 5 years at PT Bank Mandiri on the KOPRA wholesale banking platform. Strong hands-on exposure to core banking and treasury domains: branch and host transactions (BDS, Host/AS400), account & ledger posting, multi-currency & Non-IDR accounts, FX (e-FX), remittance, custody, escrow, cash management, balance forecasting, trade finance, and BI-FAST payments."
              : "Termasuk 5 tahun di PT Bank Mandiri pada platform wholesale banking KOPRA. Berpengalaman mendalam pada domain core banking & treasury: transaksi cabang dan host (BDS, Host/AS400), pembukuan akun & buku besar, rekening multi-currency & Non-IDR, FX (e-FX), remitansi, kustodi, escrow, cash management, balance forecasting, trade finance, dan pembayaran BI-FAST."}
          </p>
        </div>

        {/* ==================== EXPERIENCE ==================== */}
        <section className="space-y-7">
          <SectionHeader
            eyebrow={lang === "en" ? "career" : "karier"}
            title={lang === "en" ? "professional experience" : "pengalaman profesional"}
            meta={lang === "en" ? "6 yrs 7 mos" : "6 thn 7 bln"}
          />
          <div className="divide-y divide-[#f1eec0]/12 border-y border-[#f1eec0]/12">
            {EXPERIENCE_LIST.map((exp, idx) => (
              <div
                key={idx}
                className="py-5 sm:py-6 space-y-2 group hover:bg-white/[0.02] sm:px-2 transition-colors"
              >
                <div className="grid sm:grid-cols-[1.1fr_1.4fr_auto] gap-1 sm:gap-6 items-baseline">
                  <div className="text-lg sm:text-xl font-bold leading-snug text-[#f1eec0] group-hover:text-[#3aa1d8] transition-colors">
                    {exp.role[lang]}
                  </div>
                  <div className="text-sm sm:text-base font-semibold" style={{ color: exp.highlight }}>
                    {exp.company}
                  </div>
                  <div className="text-xs font-mono text-[#f1eec0]/50 sm:text-right">
                    {exp.period[lang]}
                  </div>
                </div>
                {exp.bullets && (
                  <p className="text-[13px] sm:text-sm text-[#f1eec0]/65 leading-relaxed max-w-4xl">
                    {exp.bullets[lang]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SKILLS ==================== */}
        <section className="space-y-7">
          <SectionHeader
            eyebrow={lang === "en" ? "toolkit" : "keahlian"}
            title={lang === "en" ? "skills & domain expertise" : "keahlian & domain perbankan"}
          />
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {SKILLS_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#f1eec0]/12 bg-[#121212] space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.accent }} />
                  <h3 className="font-bold text-base text-[#f1eec0]">{group.category[lang]}</h3>
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
        </section>

        {/* ==================== ISTQB SPOTLIGHT ==================== */}
        <section className="space-y-7">
          <SectionHeader
            eyebrow={lang === "en" ? "primary credential" : "kredensial utama"}
            title="istqb® certified tester — foundation level"
            action={
              <button
                type="button"
                onClick={openIstqb}
                className="text-xs font-bold rounded-full px-4 py-2 bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] transition-colors cursor-pointer lowercase inline-flex items-center gap-1.5"
              >
                <span>{lang === "en" ? "view certificate" : "lihat sertifikat"}</span>
                <ArrowUpRight />
              </button>
            }
          />

          <div className="p-4 sm:p-8 rounded-2xl border border-[#3aa1d8]/40 bg-[#121212] grid lg:grid-cols-[1.6fr_1fr] gap-6 sm:gap-8 items-center">
            <div className="space-y-6 min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="px-3 py-1 rounded-full bg-[#ea4530] text-[#f1eec0] text-xs font-bold tracking-wider">
                  {ISTQB_CREDENTIAL.badge}
                </span>
                <span className="text-xs text-[#f1eec0]/70 font-mono">No. {ISTQB_CREDENTIAL.certNo}</span>
                <span className="text-xs text-[#3aa1d8] font-mono">
                  {lang === "en" ? "Passed" : "Lulus"} {ISTQB_CREDENTIAL.datePassed}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug text-[#f1eec0]">
                  {ISTQB_CREDENTIAL.title}
                </h3>
                <p className="text-sm text-[#f1eec0]/70 mt-2 leading-relaxed">
                  {lang === "en"
                    ? `Awarded to ${ISTQB_CREDENTIAL.recipient} by ${ISTQB_CREDENTIAL.issuer} (${ISTQB_CREDENTIAL.cityCountry}) under ${ISTQB_CREDENTIAL.standards}.`
                    : `Diberikan kepada ${ISTQB_CREDENTIAL.recipient} oleh ${ISTQB_CREDENTIAL.issuer} (${ISTQB_CREDENTIAL.cityCountry}) berdasarkan ${ISTQB_CREDENTIAL.standards}.`}
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#f1eec0]/45">
                  {lang === "en" ? "certified syllabus scope" : "lingkup silabus teruji"}
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {ISTQB_CREDENTIAL.syllabus.map((item) => (
                    <div
                      key={item.num}
                      className="p-3 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/10 flex items-start gap-2.5"
                    >
                      <span className="font-mono text-xs font-bold text-[#ea4530]">{item.num}</span>
                      <div className="min-w-0">
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

            {/* Clickable certificate preview */}
            <button
              type="button"
              onClick={openIstqb}
              className="relative group cursor-pointer rounded-xl overflow-hidden border border-[#f1eec0]/20 bg-[#0a0a0a] shadow-[0_15px_35px_rgba(0,0,0,0.6)] aspect-[3/4] max-h-[360px] mx-auto w-full max-w-[280px] lg:max-w-none flex items-center justify-center p-2"
            >
              <img
                src={ISTQB_CREDENTIAL.certImage}
                alt="Official ISTQB CTFL Certificate Scan"
                className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-center p-4">
                <span className="w-10 h-10 rounded-full bg-[#f1eec0] text-[#0a0a0a] flex items-center justify-center text-lg">
                  <ExpandIcon />
                </span>
                <span className="text-xs font-bold text-[#f1eec0] uppercase tracking-wider">
                  {lang === "en" ? "inspect certificate" : "lihat detail"}
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* ==================== COURSE CERTIFICATES (CARD GALLERY) ==================== */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow={lang === "en" ? "continuous learning" : "terus belajar"}
            title={lang === "en" ? "professional certifications" : "sertifikasi profesional"}
            meta={`${filteredCerts.length} / ${COURSE_CERTS.length} ${
              lang === "en" ? "certificates" : "sertifikat"
            }`}
          />

          {/* Filter pills — scroll sideways on small screens */}
          <div className="-mx-[clamp(18px,4vw,40px)] px-[clamp(18px,4vw,40px)] overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
              {filterTabs.map((tab) => {
                const active = certFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCertFilter(tab.id)}
                    aria-pressed={active}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-mono lowercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      active
                        ? "bg-[#ea4530] text-[#f1eec0] font-bold"
                        : "bg-[#141414] text-[#f1eec0]/60 hover:text-[#f1eec0] hover:bg-[#1a1a1a] border border-[#f1eec0]/10"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 rounded-full ${
                        active ? "bg-black/30 text-[#f1eec0]" : "bg-white/10 text-[#f1eec0]/70"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filteredCerts.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                lang={lang}
                onOpen={() => setViewer({ list: filteredCerts, index: i })}
              />
            ))}
          </div>
        </section>

        {/* ==================== AWARDS ==================== */}
        <section className="space-y-7">
          <SectionHeader
            eyebrow={lang === "en" ? "recognition" : "prestasi"}
            title={lang === "en" ? "awards & honors" : "penghargaan & prestasi"}
            meta={lang === "en" ? "5× first place" : "5× juara 1"}
          />
          <div className="divide-y divide-[#f1eec0]/12 border-y border-[#f1eec0]/12">
            {RECOGNITION_LIST.map((rec, idx) => (
              <div
                key={idx}
                className="py-4 sm:py-5 grid sm:grid-cols-[1.4fr_1fr_auto_auto] gap-1 sm:gap-6 items-baseline sm:px-2"
              >
                <div className="text-base sm:text-lg font-medium text-[#f1eec0]">
                  <strong className="font-bold text-[#ea4530]">{rec.tier}</strong>, {rec.category[lang]}
                </div>
                <div className="text-sm text-[#f1eec0]/70">{rec.work}</div>
                <div className="text-xs text-[#3aa1d8] font-semibold">{rec.org}</div>
                <div className="text-xs font-mono text-[#f1eec0]/45 sm:text-right">{rec.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== LET'S TALK ==================== */}
        <div className="p-6 sm:p-10 rounded-2xl border border-[#f1eec0]/15 bg-[#121212] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-stamp text-[clamp(34px,4.6vw,52px)] leading-none lowercase text-[#f1eec0]">
              {lang === "en" ? "let's talk" : "mari ngobrol"}
            </h3>
            <p className="text-sm sm:text-base text-[#f1eec0]/70 leading-relaxed">
              {lang === "en"
                ? "Need a System & Business Analyst or QA Leader for Core Banking, Treasury, or Enterprise Modernization? Let's connect."
                : "Butuh System & Business Analyst atau QA Leader untuk Core Banking, Treasury, atau Modernisasi Sistem? Mari berdiskusi."}
            </p>
            <p className="text-xs font-mono text-[#3aa1d8] break-words">
              yudadwiputra@gmail.com · +62 895 2521 4959
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

      {/* ==================== CERTIFICATE LIGHTBOX ==================== */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setViewer(null)}
          className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#121212] border border-[#f1eec0]/25 rounded-t-2xl sm:rounded-2xl max-w-4xl w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-4 sm:p-5 border-b border-[#f1eec0]/15 gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span
                    className="font-bold"
                    style={{ color: (GROUPS[selectedCert.group] || GROUPS.qa).accent }}
                  >
                    {(GROUPS[selectedCert.group] || GROUPS.qa).label}
                  </span>
                  <Dot className="text-[#f1eec0]/40" />
                  <span className="text-[#f1eec0]/60">
                    {selectedCert.certNo || selectedCert.year}
                  </span>
                  {canStep && (
                    <>
                      <Dot className="text-[#f1eec0]/40" />
                      <span className="text-[#f1eec0]/40">
                        {viewer.index + 1}/{viewer.list.length}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-base sm:text-xl font-bold text-[#f1eec0] leading-snug">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewer(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-[#0a0a0a] border border-[#f1eec0]/20 text-[#f1eec0] hover:bg-[#ea4530] hover:border-[#ea4530] transition-colors flex items-center justify-center text-sm cursor-pointer shrink-0"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Image */}
            <div className="relative flex-1 overflow-auto p-3 sm:p-6 bg-[#0a0a0a] flex items-center justify-center min-h-[220px] sm:min-h-[320px]">
              <img
                key={selectedCert.id}
                src={encodeURI(selectedCert.thumb || selectedCert.file)}
                alt={selectedCert.title}
                className="max-h-[60dvh] sm:max-h-[66vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              />

              {canStep && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous certificate"
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-[#3aa1d8] hover:text-[#0a0a0a] border border-white/15 text-[#f1eec0] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next certificate"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-[#3aa1d8] hover:text-[#0a0a0a] border border-white/15 text-[#f1eec0] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
                  >
                    <ArrowRight />
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#121212] border-t border-[#f1eec0]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#f1eec0]/70">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span>
                  {lang === "en" ? "Issuer" : "Penerbit"}:{" "}
                  <strong className="text-[#f1eec0]">{selectedCert.issuer}</strong>
                </span>
                <Dot className="text-[#f1eec0]/30" />
                <span>
                  {lang === "en" ? "Year" : "Tahun"}:{" "}
                  <strong className="text-[#f1eec0]">{selectedCert.year}</strong>
                </span>
              </div>
              <a
                href={encodeURI(selectedCert.file)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#3aa1d8] text-[#0a0a0a] font-bold hover:bg-[#f1eec0] transition-colors lowercase inline-flex items-center gap-1.5"
              >
                <span>
                  {selectedCert.file.endsWith(".pdf")
                    ? lang === "en" ? "open original pdf" : "buka dokumen pdf"
                    : lang === "en" ? "open high-res scan" : "buka gambar asli"}
                </span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
