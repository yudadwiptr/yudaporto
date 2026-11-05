import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ProjectVisualCard from "./ProjectVisuals";
import { ShotFrame } from "./FeaturedProjectSection";
import { ArrowUpRight } from "./Icons";
import { PROJECT_LOG } from "../data/portfolioData";

const LOG_TOTAL = PROJECT_LOG.reduce((n, g) => n + g.items.length, 0);

const noop = () => {};

// Floating preview that trails the cursor while hovering a row (fine pointers only)
function HoverPreview({ project, index }) {
  const ref = useRef(null);

  useEffect(() => {
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let primed = false;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!primed) {
        x = tx;
        y = ty;
        primed = true;
      }
    };
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      if (ref.current) {
        const px = Math.min(x + 28, window.innerWidth - 370);
        const py = Math.max(12, Math.min(y - 150, window.innerHeight - 290));
        ref.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return createPortal(
    <div
      ref={ref}
      aria-hidden="true"
      inert
      className="hidden md:block fixed left-0 top-0 z-[90] pointer-events-none will-change-transform"
    >
      <div
        className={`origin-top-left scale-[0.62] transition-opacity duration-200 rotate-[-2deg] shadow-[0_30px_60px_rgba(0,0,0,0.7)] ${
          project ? "opacity-100" : "opacity-0"
        }`}
      >
        {project?.gallery?.length > 0 && (
          <div className="w-[560px]">
            <ShotFrame shot={project.gallery[0]} label={project.title.split(/[—(:]/)[0].trim()} sizes="560px" eager />
          </div>
        )}
        {project && !project.gallery?.length && project.slides?.[0] && (
          <ProjectVisualCard
            key={project.id}
            slide={project.slides[0]}
            project={project}
            index={index}
            onOpenCase={noop}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

export default function WorkArchiveView({ projects, lang, onOpenCase }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hovered, setHovered] = useState(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false);
  }, []);

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-[calc(var(--nav-top)+24px)] pb-24">
      {/* Giant work * marquee */}
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
              <span>{lang === "en" ? "work" : "karya"}</span>
              <span className="text-[#3aa1d8] translate-y-[0.12em]">*</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-[clamp(18px,4vw,40px)]">
        {/* Intro + filters */}
        <div className="pt-8 sm:pt-12 pb-6 sm:pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#ea4530]">
              {lang === "en" ? "selected projects" : "proyek pilihan"} · {filtered.length}
            </span>
            <p className="text-[15px] sm:text-base text-[#f1eec0]/65 leading-relaxed">
              {lang === "en"
                ? "Banking, treasury and enterprise systems I analysed, specified and validated. Open any project for the full case study."
                : "Sistem perbankan, treasury dan enterprise yang saya analisis, spesifikasikan dan validasi. Buka proyek untuk studi kasus lengkap."}
            </p>
          </div>

          <div className="-mx-[clamp(18px,4vw,40px)] px-[clamp(18px,4vw,40px)] lg:mx-0 lg:px-0 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max lg:w-auto lg:flex-wrap lg:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`shrink-0 text-xs font-semibold px-3.5 py-2 rounded-full transition-colors cursor-pointer lowercase ${
                    selectedCategory === cat
                      ? "bg-[#ea4530] text-[#f1eec0]"
                      : "bg-[#f1eec0]/8 text-[#f1eec0]/70 hover:bg-[#f1eec0]/15"
                  }`}
                >
                  {cat === "all" ? (lang === "en" ? "all" : "semua") : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column labels (desktop) */}
        <div className="hidden md:grid grid-cols-[56px_minmax(0,1fr)_minmax(0,0.55fr)_120px_56px] gap-6 pb-3 text-[11px] font-mono uppercase tracking-[0.14em] text-[#f1eec0]/35 border-b border-[#f1eec0]/12">
          <span>no.</span>
          <span>{lang === "en" ? "project" : "proyek"}</span>
          <span>{lang === "en" ? "client" : "klien"}</span>
          <span>{lang === "en" ? "year" : "tahun"}</span>
          <span />
        </div>

        {/* Index list */}
        <ol onMouseLeave={() => setHovered(null)} className="border-b border-[#f1eec0]/12 md:border-b-0">
          {filtered.map((project, i) => (
            <li key={project.id} className="border-t md:border-t-0 md:border-b border-[#f1eec0]/12 first:border-t-0 md:first:border-t-0">
              <button
                type="button"
                onClick={() => onOpenCase(project)}
                onMouseEnter={() => setHovered({ project, index: i })}
                onFocus={() => setHovered(null)}
                className="group w-full text-left grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[56px_minmax(0,1fr)_minmax(0,0.55fr)_120px_56px] items-center gap-x-4 md:gap-x-6 gap-y-2 py-5 sm:py-6 md:py-7 cursor-pointer"
              >
                <span className="hidden md:block font-mono text-xs text-[#f1eec0]/40 group-hover:text-[#ea4530] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="md:hidden block font-mono text-[11px] text-[#f1eec0]/40 mb-1.5">
                    {String(i + 1).padStart(2, "0")} · {project.category}
                  </span>
                  <span className="block font-stamp lowercase text-[clamp(28px,3.6vw,52px)] leading-[0.98] text-[#f1eec0] transition-all duration-300 group-hover:text-[#ea4530] md:group-hover:translate-x-2 text-balance">
                    {project.title}
                  </span>
                  <span className="md:hidden block mt-2 text-xs text-[#f1eec0]/50">
                    {project.client} · {project.year}
                  </span>
                </span>

                <span className="hidden md:block min-w-0">
                  <span className="block text-sm text-[#f1eec0]/75 truncate">{project.client}</span>
                  <span className="block text-[11px] font-mono text-[#3aa1d8] mt-1 truncate">{project.category}</span>
                </span>

                <span className="hidden md:block text-sm font-mono text-[#f1eec0]/55">
                  {project.year}
                </span>

                <span className="justify-self-end w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#f1eec0]/20 flex items-center justify-center text-base sm:text-lg text-[#f1eec0] transition-all duration-300 group-hover:bg-[#ea4530] group-hover:border-[#ea4530] group-hover:rotate-45">
                  <ArrowUpRight />
                </span>
              </button>
            </li>
          ))}
        </ol>

        {/* ---------- Project log (from CV) ---------- */}
        <section className="mt-24 sm:mt-32" aria-labelledby="project-log-title">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 sm:pb-10">
            <div className="max-w-2xl">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#ea4530]">
                {lang === "en" ? "project log" : "catatan proyek"}
              </span>
              <h2
                id="project-log-title"
                className="mt-2 font-stamp lowercase text-[clamp(40px,6.4vw,92px)] leading-[0.94] text-[#f1eec0]"
              >
                {lang === "en" ? "50+ projects delivered" : "50+ proyek terselesaikan"}
              </h2>
              <p className="mt-4 text-[15px] sm:text-base text-[#f1eec0]/65 leading-relaxed">
                {lang === "en"
                  ? "Most of them on PT Bank Mandiri's KOPRA wholesale banking platform, as tester, QA coordinator and QA leader, then analysis work for PT SMI and TNI AL."
                  : "Sebagian besar di platform wholesale banking KOPRA PT Bank Mandiri, sebagai tester, QA coordinator, dan QA leader, lalu pekerjaan analisis untuk PT SMI dan TNI AL."}
              </p>
            </div>
            <span className="text-xs font-mono text-[#3aa1d8] shrink-0">
              {LOG_TOTAL} {lang === "en" ? "listed in CV" : "tercantum di CV"}
            </span>
          </div>

          <div className="border-t border-[#f1eec0]/12">
            {PROJECT_LOG.map((group) => (
              <div
                key={`${group.org}-${group.period}`}
                className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-5 lg:gap-12 py-8 sm:py-10 border-b border-[#f1eec0]/12"
              >
                <div className="space-y-1.5">
                  <div className="text-xs font-mono" style={{ color: group.accent }}>
                    {group.period}
                  </div>
                  <div className="text-lg sm:text-xl font-bold leading-snug text-[#f1eec0]">{group.org}</div>
                  <div className="text-sm text-[#f1eec0]/55">
                    {group.role[lang]}
                    {group.via ? ` · ${group.via}` : ""}
                  </div>
                  <div className="pt-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[#f1eec0]/35">
                    {group.items.length} {lang === "en" ? (group.items.length === 1 ? "project" : "projects") : "proyek"}
                  </div>
                </div>
                <ul className="flex flex-wrap content-start gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] leading-snug px-3 py-1.5 rounded-full bg-[#121212] border border-[#f1eec0]/12 text-[#f1eec0]/80 transition-colors hover:text-[#f1eec0] hover:border-[color:var(--accent)]"
                      style={{ "--accent": group.accent }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {finePointer && (
        <HoverPreview project={hovered?.project || null} index={hovered?.index ?? 0} />
      )}
    </div>
  );
}
