import React, { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import FrameNav from "./components/FrameNav";
import ParenthesisArt from "./components/ParenthesisArt";
import IdCardLanyard from "./components/IdCardLanyard";
import SoftwareIcon from "./components/SoftwareIcon";
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
  const [presetIndex, setPresetIndex] = useState(2); // Option 03 selected by default
  const [activePage, setActivePage] = useState("home"); // "home" | "work" | "about" | "studio" | "contact"
  const [selectedProject, setSelectedProject] = useState(null);

  // Opening Defect Hunter Bug Preloader
  const [isLoading, setIsLoading] = useState(true);

  const presets = HERO_PRESETS[mode] || HERO_PRESETS.personal;
  const activePreset = presets[presetIndex % presets.length] || presets[0];
  const heroCopy = activePreset[lang];

  // Auto-rotate hero copy smoothly without manual 01 02 03 buttons
  useEffect(() => {
    const timer = setInterval(() => {
      setPresetIndex((prev) => (prev + 1) % presets.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [presets.length]);

  const allProjects =
    mode === "personal" ? PROJECTS_PERSONAL : PROJECTS_AGENCY;
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f1eec0] selection:bg-[#ea4530] selection:text-[#f1eec0]">
      {/* Opening Preloader Screen (Defect Hunter Bug) */}
      <Preloader
        isOpen={isLoading}
        onComplete={() => setIsLoading(false)}
        lang={lang}
      />

      {/* Custom Interactive Cursor */}
      <CustomCursor />

      {/* 4-Corner Fixed Frame Navigation (Logo with no dot/text, centered EN/ID) */}
      <FrameNav
        lang={lang}
        setLang={setLang}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content Area */}
      <main id="conteudo" className="flex-1">
        {activePage === "home" && (
          <div>
            {/* ==================== 1. HERO SECTION ==================== */}
            <div className="h-[100dvh] min-h-[100dvh] max-h-[100dvh] md:h-auto md:min-h-[max(100svh,700px)] md:max-h-none flex flex-col items-center justify-center text-center px-[clamp(18px,4vw,40px)] relative overflow-hidden bg-[#0a0a0a] select-none">
              {/* Straight Vertical Lanyard hanging behind the headline (drops down on entrance) */}
              <IdCardLanyard lang={lang} isReady={!isLoading} />

              {/* Headline strictly in FRONT of ID card (z-20 with pointer-events-none so pulling the card behind works effortlessly) */}
              <h1
                key={`${mode}-${lang}-${isLoading}`}
                className="text-[clamp(32px,5.4vw,76px)] sm:text-[clamp(38px,5.8vw,82px)] leading-[1.08] sm:leading-[1.04] tracking-[-0.02em] relative z-20 font-stamp lowercase pointer-events-none -mt-16 sm:mt-0"
              >
                {/* Line 1: solving ( 🥁 ) chaos */}
                <span className="block">
                  <span
                    key={`l1s-${presetIndex}`}
                    className="hero-word inline-block text-[#f1eec0]"
                    style={{ animationDelay: "0ms" }}
                  >
                    {heroCopy.line1Start}
                  </span>{" "}
                  <ParenthesisArt initialIndex={0} delayMs={90} />{" "}
                  <span
                    key={`l1a-${presetIndex}`}
                    className="hero-word inline-block text-[#ea4530]"
                    style={{ animationDelay: "140ms" }}
                  >
                    {heroCopy.line1Accent}
                  </span>
                </span>

                {/* Line 2: is the job. */}
                <span className="block">
                  <span
                    key={`l2m-${presetIndex}`}
                    className="hero-word inline-block text-[#f1eec0]"
                    style={{ animationDelay: "220ms" }}
                  >
                    {heroCopy.line2Mid}
                  </span>{" "}
                  <span
                    key={`l2b-${presetIndex}`}
                    className="hero-word inline-block text-[#3aa1d8]"
                    style={{ animationDelay: "310ms" }}
                  >
                    {heroCopy.line2Blue}
                  </span>
                </span>

                {/* Line 3: hunting bugs is the ( 🐦 ) bonus. */}
                <span className="block">
                  <span
                    key={`l3r-${presetIndex}`}
                    className="hero-word inline-block text-[#ea4530]"
                    style={{ animationDelay: "400ms" }}
                  >
                    {heroCopy.line3Red}
                  </span>{" "}
                  <span
                    key={`l3m-${presetIndex}`}
                    className="hero-word inline-block text-[#f1eec0]"
                    style={{ animationDelay: "490ms" }}
                  >
                    {heroCopy.line3Mid}
                  </span>{" "}
                  <ParenthesisArt initialIndex={1} delayMs={580} />{" "}
                  <span
                    key={`l3b-${presetIndex}`}
                    className="hero-word inline-block text-[#3aa1d8]"
                    style={{ animationDelay: "670ms" }}
                  >
                    {heroCopy.line3Blue}
                  </span>
                </span>
              </h1>

              {/* Scroll Down Bounce Chevron (Desktop only to prevent mobile overlap with center card) */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute bottom-[clamp(28px,4.4vh,46px)] left-1/2 -translate-x-1/2 z-10 scroll-hint pointer-events-none"
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
            </div>

            {/* ==================== 2. BIO STATEMENT + SOFTWARE & QA MARQUEE ==================== */}
            <section className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 flex flex-col overflow-hidden">
              <div className="px-5 sm:px-8 md:px-12 mb-14 sm:mb-20 md:mb-24">
                <div className="text-[clamp(19px,min(3.2vw,4.2vh),36px)] leading-[1.38] sm:leading-[1.3] tracking-tight max-w-[23ch] sm:max-w-[30ch] md:max-w-[42ch] mx-auto text-center">
                  {lang === "en" ? (
                    <>
                      <span className="text-[#ea4530] font-bold">* </span>
                      I&apos;m{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        Yuda Dwi Putra
                      </strong>
                      , a{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        System &amp; Business Analyst
                      </strong>{" "}
                      who moves between{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        core banking,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        treasury &amp; e-FX,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        functional specifications
                      </em>{" "}
                      and{" "}
                      <strong className="font-bold text-[#ea4530]">
                        end-to-end quality validation
                      </strong>{" "}
                      — translating complex banking processes into clear BRDs,
                      as-is / to-be flows, and reliable host integrations. With{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        6+ years
                      </strong>{" "}
                      in financial software delivery, including{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        5 years at PT Bank Mandiri (KOPRA)
                      </strong>{" "}
                      and enterprise modernization at{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT Adi Data Informatika
                      </strong>{" "}
                      for{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        TNI AL (TABPLIN)
                      </strong>{" "}
                      &amp;{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT SMI
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
                      , seorang{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        System &amp; Business Analyst
                      </strong>{" "}
                      yang bergerak di antara{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        core banking,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        treasury &amp; e-FX,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        spesifikasi fungsional
                      </em>{" "}
                      dan{" "}
                      <strong className="font-bold text-[#ea4530]">
                        validasi kualitas end-to-end
                      </strong>{" "}
                      — menerjemahkan proses bisnis perbankan yang kompleks
                      menjadi BRD, alur proses, dan integrasi host yang jernih.
                      Berbekal{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        6+ tahun
                      </strong>{" "}
                      di industri finansial, termasuk{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        5 tahun di PT Bank Mandiri (KOPRA)
                      </strong>{" "}
                      serta modernisasi sistem di{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT Adi Data Informatika
                      </strong>{" "}
                      untuk{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        TNI AL (TABPLIN)
                      </strong>{" "}
                      &amp;{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT SMI
                      </strong>
                      . Anggap rumah{" "}
                      <span className="inline-block bg-[#ea4530] text-[#0a0a0a] rounded-full px-[0.5em] py-[0.05em] text-[0.76em] font-bold align-[0.06em]">
                        sendiri
                      </span>
                      !
                    </>
                  )}
                </div>
              </div>

              {/* Software & QA Tools Infinite Marquee with 3D Icons */}
              <div
                className="overflow-hidden whitespace-nowrap select-none py-8 border-y border-[#f1eec0]/8"
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
                      className="flex items-center gap-[clamp(28px,5vw,56px)] shrink-0 pr-[clamp(28px,5vw,56px)]"
                    >
                      {CLIENT_MARQUEE.map((tool, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-3 text-base sm:text-lg md:text-xl font-semibold tracking-tight text-[#f1eec0]/50 hover:text-[#f1eec0] transition-colors whitespace-nowrap group"
                        >
                          <SoftwareIcon
                            name={tool.id || tool.name}
                            className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-300 group-hover:scale-110"
                          />
                          <span className="font-ui">{tool.name}</span>
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
                  <div className="flex animate-marquee text-[clamp(48px,11vw,144px)] tracking-tight lowercase font-stamp leading-[1.04]">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
                      >
                        <span>
                          {lang === "en" ? "featured works" : "proyek pilihan"}
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
                      className="text-xs sm:text-sm font-semibold tracking-tight rounded-full px-4 py-2 transition-colors shadow-lg bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] cursor-pointer lowercase"
                    >
                      {lang === "en" ? "all works ↗" : "semua proyek ↗"}
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
                className="text-xs sm:text-sm font-semibold tracking-tight rounded-full px-5 py-2.5 transition-colors shadow-lg bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] ring-1 ring-[#ea4530] ring-offset-[3px] ring-offset-[#0a0a0a] cursor-pointer lowercase"
              >
                {lang === "en" ? "see all works ↗" : "lihat semua proyek ↗"}
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
