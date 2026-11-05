import React, { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import FrameNav from "./components/FrameNav";
import ParenthesisArt from "./components/ParenthesisArt";
import FeaturedProjectSection from "./components/FeaturedProjectSection";
import CaseStudyModal from "./components/CaseStudyModal";
import FooterSection from "./components/FooterSection";
import AboutView from "./components/AboutView";
import WorkArchiveView from "./components/WorkArchiveView";
import StudioLabView from "./components/StudioLabView";
import ContactView from "./components/ContactView";
import {
  HERO_PRESETS,
  CLIENT_MARQUEE,
  PROJECTS_PERSONAL,
  PROJECTS_AGENCY,
} from "./data/portfolioData";

export default function App() {
  const [lang, setLang] = useState("en"); // "en" | "id"
  const [mode, setMode] = useState("personal"); // "personal" | "agency"
  const [presetIndex, setPresetIndex] = useState(0);
  const [activePage, setActivePage] = useState("home"); // "home" | "work" | "about" | "studio" | "contact"
  const [selectedProject, setSelectedProject] = useState(null);

  const presets = HERO_PRESETS[mode] || HERO_PRESETS.personal;
  const activePreset = presets[presetIndex % presets.length] || presets[0];
  const heroCopy = activePreset[lang];

  const allProjects =
    mode === "personal" ? PROJECTS_PERSONAL : PROJECTS_AGENCY;
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f1eec0] selection:bg-[#ea4530] selection:text-[#f1eec0]">
      {/* Custom Interactive Cursor */}
      <CustomCursor />

      {/* 4-Corner Fixed Frame Navigation */}
      <FrameNav
        lang={lang}
        setLang={setLang}
        activePage={activePage}
        setActivePage={setActivePage}
        mode={mode}
        setMode={(newMode) => {
          setMode(newMode);
          setPresetIndex(0);
        }}
      />

      {/* Main Content Area */}
      <main id="conteudo" className="flex-1">
        {activePage === "home" && (
          <div>
            {/* ==================== 1. HERO SECTION ==================== */}
            <div className="min-h-[max(100svh,700px)] flex flex-col items-center justify-center text-center px-[clamp(18px,4vw,40px)] relative overflow-hidden bg-[#0a0a0a] select-none">
              <h1
                key={`${mode}-${presetIndex}-${lang}`}
                className="text-[clamp(44px,8.1vw,119px)] leading-[1.06] sm:leading-[1.02] tracking-tight relative z-10 font-stamp uppercase"
              >
                {/* Line 1: making ( ) things */}
                <span className="block">
                  <span
                    className="hero-word inline-block text-[#f1eec0]"
                    style={{ animationDelay: "0ms" }}
                  >
                    {heroCopy.line1Start}
                  </span>{" "}
                  <ParenthesisArt initialIndex={0} delayMs={90} />{" "}
                  <span
                    className="hero-word inline-block text-[#ea4530]"
                    style={{ animationDelay: "140ms" }}
                  >
                    {heroCopy.line1Accent}
                  </span>
                </span>

                {/* Line 2: is the job. */}
                <span className="block">
                  <span
                    className="hero-word inline-block text-[#f1eec0]"
                    style={{ animationDelay: "220ms" }}
                  >
                    {heroCopy.line2Mid}
                  </span>{" "}
                  <span
                    className="hero-word inline-block text-[#3aa1d8]"
                    style={{ animationDelay: "310ms" }}
                  >
                    {heroCopy.line2Blue}
                  </span>
                </span>

                {/* Line 3: loving it is the ( ) bonus. */}
                <span className="block">
                  <span
                    className="hero-word inline-block text-[#ea4530]"
                    style={{ animationDelay: "400ms" }}
                  >
                    {heroCopy.line3Red}
                  </span>{" "}
                  <span
                    className="hero-word inline-block text-[#f1eec0]"
                    style={{ animationDelay: "490ms" }}
                  >
                    {heroCopy.line3Mid}
                  </span>{" "}
                  <ParenthesisArt initialIndex={1} delayMs={580} />{" "}
                  <span
                    className="hero-word inline-block text-[#3aa1d8]"
                    style={{ animationDelay: "670ms" }}
                  >
                    {heroCopy.line3Blue}
                  </span>
                </span>
              </h1>

              {/* Subtle Headline Variation Pill Selector */}
              {mode === "personal" && (
                <div className="relative z-10 mt-8 flex items-center gap-1.5 bg-[#121212]/90 border border-[#f1eec0]/15 rounded-full px-2.5 py-1">
                  <span className="text-[9px] uppercase tracking-widest text-[#f1eec0]/45 px-1.5">
                    {lang === "en" ? "Copy Vibe:" : "Gaya Copy:"}
                  </span>
                  {HERO_PRESETS.personal.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPresetIndex(idx)}
                      className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold transition-colors cursor-pointer ${
                        presetIndex === idx
                          ? "bg-[#f1eec0] text-[#0a0a0a]"
                          : "text-[#f1eec0]/55 hover:text-[#f1eec0]"
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* Scroll Down Bounce Chevron */}
              <div
                aria-hidden="true"
                className="absolute bottom-[clamp(28px,4.4vh,46px)] left-1/2 -translate-x-1/2 z-10 scroll-hint"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 9L12 17L20 9"
                    stroke="var(--accent-blue)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Micro Version Status (Exact Kenji bottom note) */}
              <p className="absolute bottom-[8px] left-0 right-0 z-10 text-center text-[10px] font-light tracking-wide text-[#f1eec0]/35">
                {lang === "en"
                  ? "(v2.0) - Click inside ( ) to swap artifacts · More projects on the way."
                  : "(v2.0) - Klik di dalam ( ) untuk ganti ikon · Proyek baru segera hadir."}
              </p>
            </div>

            {/* ==================== 2. BIO STATEMENT + CLIENT MARQUEE ==================== */}
            <section className="relative min-h-[88svh] flex flex-col justify-between py-[clamp(56px,10vh,110px)] overflow-hidden">
              <div className="my-auto px-[clamp(18px,4vw,40px)]">
                <div className="text-[clamp(22px,min(3.6vw,4.9vh),40px)] leading-[1.26] tracking-tight max-w-[19ch] sm:max-w-[28ch] md:max-w-[40ch] mx-auto text-center">
                  {mode === "personal" ? (
                    lang === "en" ? (
                      <>
                        <span className="text-[#ea4530] font-bold">* </span>
                        I&apos;m{" "}
                        <strong className="font-bold text-[#f1eec0]">
                          Yuda Dwi Putra
                        </strong>
                        , a multidisciplinary designer and creative developer
                        who moves between{" "}
                        <em className="font-accent-serif italic font-normal text-[1.12em]">
                          UI/UX,
                        </em>{" "}
                        <em className="font-accent-serif italic font-normal text-[1.12em]">
                          interactive web,
                        </em>{" "}
                        <em className="font-accent-serif italic font-normal text-[1.12em]">
                          motion
                        </em>{" "}
                        and{" "}
                        <strong className="font-bold text-[#ea4530]">
                          design systems
                        </strong>{" "}
                        — always in love with functional, beautiful craft.
                        Currently{" "}
                        <strong className="font-bold text-[#3aa1d8]">
                          Product &amp; Web Builder
                        </strong>{" "}
                        at Studio Yuma, with work spanning{" "}
                        <strong className="font-bold text-[#ea4530]">
                          Gojek
                        </strong>
                        ,{" "}
                        <strong className="font-bold text-[#3aa1d8]">
                          Tokopedia
                        </strong>
                        ,{" "}
                        <strong className="font-bold text-[#ea4530]">
                          Mandiri Kopra
                        </strong>
                        ,{" "}
                        <strong className="font-bold text-[#3aa1d8]">
                          YUMASHOP
                        </strong>{" "}
                        and{" "}
                        <strong className="font-bold text-[#ea4530]">
                          Freelance
                        </strong>
                        . Make yourself at{" "}
                        <span className="inline-block bg-[#ea4530] text-[#0a0a0a] rounded-full px-[0.5em] py-[0.05em] text-[0.76em] font-bold align-[0.06em]">
                          home
                        </span>
                        !
                      </>
                    ) : (
                      <>
                        <span className="text-[#ea4530] font-bold">* </span>
                        Saya{" "}
                        <strong className="font-bold text-[#f1eec0]">
                          Yuda Dwi Putra
                        </strong>
                        , desainer dan pengembang kreatif multidisiplin yang
                        bergerak di antara{" "}
                        <em className="font-accent-serif italic font-normal text-[1.12em]">
                          UI/UX,
                        </em>{" "}
                        <em className="font-accent-serif italic font-normal text-[1.12em]">
                          web interaktif,
                        </em>{" "}
                        <em className="font-accent-serif italic font-normal text-[1.12em]">
                          motion
                        </em>{" "}
                        dan{" "}
                        <strong className="font-bold text-[#ea4530]">
                          sistem desain
                        </strong>{" "}
                        — selalu percaya desain harus fungsional sekaligus
                        indah. Saat ini{" "}
                        <strong className="font-bold text-[#3aa1d8]">
                          Product &amp; Web Builder
                        </strong>{" "}
                        independen, dengan pengalaman bersama ekosistem{" "}
                        <strong className="font-bold text-[#ea4530]">
                          Gojek
                        </strong>
                        ,{" "}
                        <strong className="font-bold text-[#3aa1d8]">
                          Tokopedia
                        </strong>
                        ,{" "}
                        <strong className="font-bold text-[#ea4530]">
                          Mandiri Kopra
                        </strong>
                        ,{" "}
                        <strong className="font-bold text-[#3aa1d8]">
                          YUMASHOP
                        </strong>{" "}
                        dan{" "}
                        <strong className="font-bold text-[#ea4530]">
                          Freelance
                        </strong>
                        . Anggap rumah{" "}
                        <span className="inline-block bg-[#ea4530] text-[#0a0a0a] rounded-full px-[0.5em] py-[0.05em] text-[0.76em] font-bold align-[0.06em]">
                          sendiri
                        </span>
                        !
                      </>
                    )
                  ) : lang === "en" ? (
                    <>
                      <span className="text-[#ea4530] font-bold">* </span>
                      We are{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        Studio Yuma
                      </strong>
                      , a creative video production &amp; direction house that
                      moves between{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        commercial film,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        3D motion,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        documentary
                      </em>{" "}
                      and{" "}
                      <strong className="font-bold text-[#ea4530]">
                        visual systems
                      </strong>{" "}
                      — always obsessed with the frame. Trusted by{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        Gojek
                      </strong>
                      ,{" "}
                      <strong className="font-bold text-[#ea4530]">
                        Tokopedia
                      </strong>
                      ,{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        Disney+
                      </strong>{" "}
                      and bold brands. Make yourself at{" "}
                      <span className="inline-block bg-[#ea4530] text-[#0a0a0a] rounded-full px-[0.5em] py-[0.05em] text-[0.76em] font-bold align-[0.06em]">
                        home
                      </span>
                      !
                    </>
                  ) : (
                    <>
                      <span className="text-[#ea4530] font-bold">* </span>
                      Kami adalah{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        Studio Yuma
                      </strong>
                      , rumah produksi video kreatif &amp; arahan visual yang
                      bergerak di antara{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        film komersial,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        3D motion,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        dokumenter
                      </em>{" "}
                      dan{" "}
                      <strong className="font-bold text-[#ea4530]">
                        identitas sinematik
                      </strong>{" "}
                      — selalu terobsesi pada kekuatan setiap frame. Dipercaya
                      oleh{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        Gojek
                      </strong>
                      ,{" "}
                      <strong className="font-bold text-[#ea4530]">
                        Tokopedia
                      </strong>
                      , dan berbagai brand. Anggap rumah{" "}
                      <span className="inline-block bg-[#ea4530] text-[#0a0a0a] rounded-full px-[0.5em] py-[0.05em] text-[0.76em] font-bold align-[0.06em]">
                        sendiri
                      </span>
                      !
                    </>
                  )}
                </div>
              </div>

              {/* Client & Ecosystem Infinite Marquee */}
              <div
                className="overflow-hidden whitespace-nowrap select-none py-8"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div className="flex animate-marquee-slow">
                  {[0, 1].map((dup) => (
                    <span
                      key={dup}
                      className="flex items-center gap-[clamp(32px,6vw,64px)] shrink-0 pr-[clamp(32px,6vw,64px)]"
                    >
                      {CLIENT_MARQUEE.map((client, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-2.5 text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-[#f1eec0]/40 hover:text-[#f1eec0]/80 transition-colors whitespace-nowrap"
                        >
                          <span
                            className="h-5 w-5 md:h-6 md:w-6 rounded-[4px] flex items-center justify-center text-[11px] font-black text-[#0a0a0a]"
                            style={{ backgroundColor: client.color }}
                          >
                            {client.name.slice(0, 1)}
                          </span>
                          {client.name}
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ==================== 3. FEATURED WORKS MARQUEE HEADER ==================== */}
            <section className="relative z-10 pt-8 pb-4">
              <div className="relative">
                <div
                  className="overflow-hidden whitespace-nowrap select-none py-2"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                  }}
                >
                  <div className="flex animate-marquee text-[clamp(44px,11vw,140px)] tracking-tight uppercase font-stamp leading-[1.06]">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
                      >
                        <span>
                          {lang === "en" ? "featured works" : "karya pilihan"}
                        </span>
                        <span
                          style={{
                            color: "var(--accent-blue)",
                            transform: "translateY(0.14em)",
                          }}
                        >
                          *
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating Right "all works ↗" Pill */}
                <div className="absolute inset-0 flex items-center pointer-events-none justify-end pr-[clamp(18px,4vw,40px)]">
                  <div className="pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage("work");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.01em] rounded-full px-4 py-2 transition-colors shadow-lg bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] cursor-pointer"
                    >
                      {lang === "en" ? "all works ↗" : "semua karya ↗"}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ==================== 4. FEATURED CASE STUDIES LIST ==================== */}
            <div>
              {featuredProjects.map((project) => (
                <FeaturedProjectSection
                  key={project.id}
                  project={project}
                  lang={lang}
                  onOpenCase={setSelectedProject}
                />
              ))}
            </div>

            {/* Bottom "see all works ↗" Ring Button */}
            <div className="py-14 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setActivePage("work");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs font-semibold uppercase tracking-[0.02em] rounded-full px-5 py-2.5 transition-colors shadow-lg bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] ring-1 ring-[#ea4530] ring-offset-[3px] ring-offset-[#0a0a0a] cursor-pointer"
              >
                {lang === "en" ? "see all works ↗" : "lihat semua karya ↗"}
              </button>
            </div>
          </div>
        )}

        {activePage === "work" && (
          <WorkArchiveView
            projects={allProjects}
            lang={lang}
            onOpenCase={setSelectedProject}
          />
        )}

        {activePage === "about" && (
          <AboutView lang={lang} setActivePage={setActivePage} />
        )}

        {activePage === "studio" && (
          <StudioLabView
            lang={lang}
            mode={mode}
            setMode={setMode}
            presetIndex={presetIndex}
            setPresetIndex={setPresetIndex}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "contact" && <ContactView lang={lang} />}
      </main>

      {/* Mega Footer Section */}
      <FooterSection lang={lang} setActivePage={setActivePage} />

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

